import { supabase } from "./supabase";

type AuthUser = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type AuthState = {
  token: string;
  user: AuthUser;
} | null;

// Map Supabase User to our AuthUser type
const mapSupabaseUser = (supabaseUser: any): AuthUser => ({
  id: supabaseUser.id,
  name: supabaseUser.user_metadata?.full_name || `${supabaseUser.user_metadata?.first_name || ""} ${supabaseUser.user_metadata?.last_name || ""}`.trim() || supabaseUser.email?.split("@")[0] || "",
  firstName: supabaseUser.user_metadata?.first_name || "",
  lastName: supabaseUser.user_metadata?.last_name || "",
  phone: supabaseUser.user_metadata?.phone || "",
  email: supabaseUser.email,
});

// Create or update a user profile in the profiles table
async function upsertProfile(userId: string, fullName: string, phone: string, firstName: string, lastName: string, email?: string) {
  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      full_name: fullName,
      phone,
      first_name: firstName,
      last_name: lastName,
      email: email || null,
    });

  if (error) {
    console.error("Error creating/updating profile:", error);
  }
}

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        phone,
      },
    },
  });

  if (error) {
    return { authState: null, error };
  }

  if (!data.user) {
    return { authState: null, error: new Error("Failed to create user.") };
  }

  // Create the profile (non-blocking - don't fail signup if profile creation has issues)
  // The database trigger will also attempt to create a profile automatically
  await upsertProfile(data.user.id, `${firstName} ${lastName}`, phone, firstName, lastName, email);

  if (!data.session) {
    return { authState: null, error: null, requiresEmailConfirmation: true };
  }

  return {
    authState: {
      token: data.session.access_token,
      user: mapSupabaseUser(data.user),
    },
    error: null,
  };
}

export async function logIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { authState: null, error };
  }

  if (!data.session || !data.user) {
    return { authState: null, error: new Error("Failed to log in.") };
  }

  return {
    authState: {
      token: data.session.access_token,
      user: mapSupabaseUser(data.user),
    },
    error: null,
  };
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!data.user) return null;

  const authUser = mapSupabaseUser(data.user);

  // Ensure profile exists (non-blocking)
  await upsertProfile(
    data.user.id,
    authUser.name,
    authUser.phone,
    authUser.firstName,
    authUser.lastName,
    authUser.email
  );

  return authUser;
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback`,
  });

  if (error) {
    throw error;
  }

  return { data, error };
}

export async function updateProfile(fullName: string, phone: string) {
  const user = await getCurrentUser();
  if (!user) {
    const error = new Error("User not authenticated");
    throw error;
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: fullName,
      phone,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    });

  if (error) {
    throw error;
  }

  return { data, error };
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role === "admin";
}

export type { AuthUser, AuthState };
