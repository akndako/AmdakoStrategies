import { supabase } from "./supabase";
import type { AuthUser, AuthState } from "../types";

// Map Supabase User to our AuthUser type
const mapSupabaseUser = (supabaseUser: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}): AuthUser => {
  const meta = supabaseUser.user_metadata || {};
  const firstName = typeof meta.first_name === "string" ? meta.first_name : "";
  const lastName = typeof meta.last_name === "string" ? meta.last_name : "";
  const fullName = typeof meta.full_name === "string" ? meta.full_name : `${firstName} ${lastName}`.trim();
  const phone = typeof meta.phone === "string" ? meta.phone : "";
  const address = typeof meta.address === "string" ? meta.address : "";
  const location = typeof meta.location === "string" ? meta.location : "";
  const stateOfOrigin = typeof meta.state_of_origin === "string" ? meta.state_of_origin : "";
  const monthlyRoi = typeof meta.monthly_roi === "number" ? meta.monthly_roi : 10;
  const avatarUrl = typeof meta.avatar_url === "string" ? meta.avatar_url : null;

  return {
    id: supabaseUser.id,
    name: fullName || supabaseUser.email?.split("@")[0] || "",
    firstName,
    lastName,
    phone,
    email: supabaseUser.email || "",
    address,
    location,
    stateOfOrigin,
    monthlyRoi,
    avatar_url: avatarUrl,
  };
};

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  address?: string,
  location?: string,
  stateOfOrigin?: string
): Promise<{ authState: AuthState; error: Error | null; requiresEmailConfirmation?: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        phone,
        address: address || "",
        location: location || "",
        state_of_origin: stateOfOrigin || "",
        monthly_roi: 10,
      },
    },
  });

  if (error) {
    return { authState: null, error };
  }

  if (!data.user) {
    return { authState: null, error: new Error("Failed to create user.") };
  }

  // The database trigger automatically creates the profile record.
  // Do NOT manually insert a profile from the browser.

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

export async function logIn(email: string, password: string): Promise<{ authState: AuthState; error: Error | null }> {
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

export async function logOut(): Promise<void> {
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
    // If there's an auth error (e.g. expired session), treat as no user
    if (error.message?.includes("Auth session missing") || error.message?.includes("JWT")) {
      return null;
    }
    throw error;
  }

  if (!data.user) return null;

  return mapSupabaseUser(data.user);
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
