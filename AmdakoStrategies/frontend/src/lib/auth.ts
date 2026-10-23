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

// ===== Password Recovery & Change (by phone number) =====

// Normalize Nigerian phone numbers for comparison. This allows the local
// 0803... form and the international +234803... form to resolve the same user.
export function normalizePhone(phone: string): string {
  const digits = (phone || "").replace(/[^\d]/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  return digits;
}

// Resolve the email linked to a phone number (via a security-definer RPC on the server)..
// Returns null when no account matches.

export async function findEmailByPhone(phone: string): Promise<string | null> {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;

  const { data, error } = await supabase.rpc("find_email_by_phone", { p_phone: normalized });
  if (error) {
    console.error("Error resolving email by phone:", error);
    throw error;
  }

  const rows = (data ?? []) as Array<{ email?: string | null }>;
  return rows.length > 0 ? (rows[0].email ?? null) : null;
}

// Request a verification code email for the account linked to the given phone number.
// The account's email is resolved on the server (find_email_by_phone), then Supabase
// emails a numerical code to it. Returns a generic success result so we never reveal
// whether an account exists (anti-enumeration). Only hard failures (rate limits,
// network errors) surface. `email` is returned internally so the caller can verify
// the code with verifyPasswordResetCode.
export async function sendPasswordResetCodeByPhone(
  phone: string
): Promise<{ success: boolean; error: Error | null; email: string | null }> {
  try {
    const email = await findEmailByPhone(phone);
    if (!email) {
      // Deliberately generic: never reveal that the phone number is unknown.


      return { success: true, error: null, email: null };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });

    if (error) {
      // If the linked account no longer exists (or signups are blocked), respond
      // generically rather than leaking whether the account is still active.
      const message = (error.message || "").toLowerCase();
      if (message.includes("signup") || message.includes("not found")) {
        return { success: true, error: null, email: null };
      }
      console.error("Error sending verification code:", error);
      return { success: false, error, email: null };
    }

    return { success: true, error: null, email };
  } catch (err) {
    console.error("Error sending verification code:", err);
    return { success: false, error: (err as Error) || new Error("Unable to send a verification code."), email: null };
  }
}

// Verify the code the user received by email. On success supabase-js establishes a
// short-lived session which lets us set a new password via supabase.auth.updateUser.
export async function verifyPasswordResetCode(
  email: string,
  code: string
): Promise<{ error: Error | null }> {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "email",
  });

  if (error) {
    console.error("Error verifying code:", error);
    return { error };
  }
  return { error: null };
}

// Set a new password once the user has verified the recovery link (session established by supabase-js)..
export async function resetPassword(newPassword: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    console.error("Error updating password:", error);
    return { error };
  }
  return { error: null };
}

// Signed-in users: verify the current password and then set a new one..
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ error: Error | null }> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const email = sessionData?.session?.user?.email;
    if (!email) {
      return { error: new Error("Unable to verify your current password. Please sign in again.") };
    }

    // Verify current credentials before allowing the change
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (verifyError) {
      return { error: new Error("Your current password is incorrect.") };
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.error("Error changing password:", error);
      return { error };
    }

    return { error: null };
  } catch (err) {
    return { error: (err as Error) || new Error("Unable to change password.") };
 }
}
