import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import type { Transaction } from "../types";
import { formatErrorForDisplay } from "../lib/errorHandling";

export async function getTransactions(): Promise<Transaction[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return (data as Transaction[]) || [];
}

export async function getRecentTransactions(): Promise<Transaction[]> {
  return getTransactions();
}