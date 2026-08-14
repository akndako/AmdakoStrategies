import { createClient } from "@supabase/supabase-js";

// These environment variables are defined in .env.example
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set
// If only VITE_SUPABASE_PUBLISHABLE_KEY is available, it will be used as the anon key
// The publishable key and anon key are the same value in Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and either VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY."
  );
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);