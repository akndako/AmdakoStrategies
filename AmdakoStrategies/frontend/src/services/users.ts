import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import type { Database } from "../types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Record = Database["public"]["Tables"]["records"]["Row"];

export interface UsersService {
  getCurrentProfile: () => Promise<Profile | null>;
  getProfileById: (id: string) => Promise<Profile | null>;
  updateProfile: (data: Partial<Profile>) => Promise<Profile>;
  searchUsers: (query: string) => Promise<Profile[]>;
  getRecords: () => Promise<Record[]>;
  getRecordById: (id: string) => Promise<Record | null>;
  createRecord: (data: { title: string; content?: string; type?: string }) => Promise<Record>;
  updateRecord: (id: string, data: Partial<Record>) => Promise<Record>;
  deleteRecord: (id: string) => Promise<void>;
}

export const usersService: UsersService = {
  getCurrentProfile: async (): Promise<Profile | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data;
  },

  getProfileById: async (id: string): Promise<Profile | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    // Prevent cross-user data access: users can only fetch their own profile
    // Admins can fetch any profile
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (currentProfile?.role !== "admin" && id !== user.id) {
      console.warn("Unauthorized: Attempted to access another user's profile");
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching profile by ID:", error);
      return null;
    }
    return data;
  },

  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const user = await getCurrentUser();
    if (!user) {
      const error = new Error("User not authenticated");
      throw error;
    }

    const { data: result, error: upsertError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: data.full_name,
        phone: data.phone,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      })
      .select()
      .single();

    if (upsertError) {
      console.error("Error updating profile:", upsertError);
      throw upsertError;
    }
    return result;
  },

  searchUsers: async (query: string): Promise<Profile[]> => {
    // Only admins can search users
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", currentUser.id)
      .single();

    if (profile?.role !== "admin") {
      console.warn("Unauthorized: Only admins can search users");
      return [];
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`);

    if (error) {
      console.error("Error searching users:", error);
      return [];
    }
    return data || [];
  },

  // Records methods - all scoped to the current user to prevent cross-user data access
  getRecords: async (): Promise<Record[]> => {
    const user = await getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("records")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching records:", error);
      return [];
    }
    return data || [];
  },

  getRecordById: async (id: string): Promise<Record | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("records")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching record by ID:", error);
      return null;
    }
    return data || null;
  },

  createRecord: async (data: { title: string; content?: string; type?: string }): Promise<Record> => {
    const user = await getCurrentUser();
    if (!user) {
      const error = new Error("User not authenticated");
      throw error;
    }

    const { data: result, error: createError } = await supabase
      .from("records")
      .insert({
        title: data.title,
        content: data.content,
        type: data.type,
        user_id: user.id,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating record:", createError);
      throw createError;
    }
    return result;
  },

  updateRecord: async (id: string, data: Partial<Record>): Promise<Record> => {
    const user = await getCurrentUser();
    if (!user) {
      const error = new Error("User not authenticated");
      throw error;
    }

    const { data: result, error: updateError } = await supabase
      .from("records")
      .update({
        title: data.title,
        content: data.content,
        type: data.type,
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating record:", updateError);
      throw updateError;
    }
    return result;
  },

  deleteRecord: async (id: string): Promise<void> => {
    const user = await getCurrentUser();
    if (!user) {
      const error = new Error("User not authenticated");
      throw error;
    }

    const { error: deleteError } = await supabase
      .from("records")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Error deleting record:", deleteError);
      throw deleteError;
    }
  },
};

export default usersService;
