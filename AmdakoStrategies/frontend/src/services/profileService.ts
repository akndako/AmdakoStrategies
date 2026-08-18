import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import type { Profile } from "../types";
import { formatErrorForDisplay } from "../lib/errorHandling";

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return data as Profile | null;
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Prevent cross-user data access: users can only fetch their own profile
  // Admins can fetch any profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && id !== user.id) {
    console.warn("Unauthorized: Attempted to access another user's profile");
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile by ID:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return data as Profile | null;
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Build update object with only defined fields to support partial updates
  const updateData: Record<string, unknown> = {};
  if (data.full_name !== undefined) updateData.full_name = data.full_name;
  if (data.first_name !== undefined) updateData.first_name = data.first_name;
  if (data.last_name !== undefined) updateData.last_name = data.last_name;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.state_of_origin !== undefined) updateData.state_of_origin = data.state_of_origin;
  if (data.monthly_roi !== undefined) updateData.monthly_roi = data.monthly_roi;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.is_active !== undefined) updateData.is_active = data.is_active;
  if (data.role !== undefined) updateData.role = data.role;
  if (data.last_login !== undefined) updateData.last_login = data.last_login;

  // Use upsert to handle the case where the profile doesn't exist yet (fixes PGRST204)
  const { data: result, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      ...updateData,
    })
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return result as Profile;
}

export async function uploadAvatar(file: File): Promise<string> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("agreements")
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError);
    throw new Error(formatErrorForDisplay(uploadError));
  }

  const { data: publicUrlData } = supabase.storage
    .from("agreements")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
