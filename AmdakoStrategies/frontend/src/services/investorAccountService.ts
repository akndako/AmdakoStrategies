import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import type { InvestorAccount } from "../types";
import { formatErrorForDisplay } from "../lib/errorHandling";

export async function getInvestorAccount(): Promise<InvestorAccount | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("investor_accounts")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching investor account:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return data as InvestorAccount | null;
}

export async function createInvestorAccount(): Promise<InvestorAccount> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Generate a unique account number using UUID v4 for guaranteed uniqueness
  const { data: uuidData, error: uuidError } = await supabase.rpc("gen_random_uuid");
  if (uuidError || !uuidData) {
    // Fallback: use user ID + timestamp + random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const accountNumber = `IA${user.id.slice(0, 8)}-${Date.now().toString().slice(-8)}-${randomSuffix}`;
    return insertInvestorAccount(user.id, accountNumber);
  }

  const accountNumber = `IA${String(uuidData).slice(0, 8)}-${Date.now().toString().slice(-6)}`;
  return insertInvestorAccount(user.id, accountNumber);
}

async function insertInvestorAccount(userId: string, accountNumber: string): Promise<InvestorAccount> {
  const { data: result, error } = await supabase
    .from("investor_accounts")
    .insert({
      user_id: userId,
      account_number: accountNumber,
      status: "pending",
      available_balance: 0,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating investor account:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return result as InvestorAccount;
}

export async function getOrCreateInvestorAccount(): Promise<InvestorAccount> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Try to fetch existing account first
  try {
    const existing = await getInvestorAccount();
    if (existing) {
      return existing;
    }
  } catch (err) {
    // If fetch fails (e.g. no account exists yet), proceed to create
    console.warn("Could not fetch existing investor account, will create new one:", err);
  }

  // Create a new account if none exists
  return createInvestorAccount();
}
