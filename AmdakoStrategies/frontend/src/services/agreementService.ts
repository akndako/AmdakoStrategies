import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import type { Agreement } from "../types";
import { formatErrorForDisplay } from "../lib/errorHandling";

export async function getAgreement(): Promise<Agreement | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("agreements")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching agreement:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return data as Agreement | null;
}

export async function saveAgreement(data: Partial<Agreement>): Promise<Agreement> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: result, error } = await supabase
    .from("agreements")
    .upsert({
      user_id: user.id,
      full_name: data.full_name || "",
      address: data.address || null,
      phone: data.phone || "",
      email: data.email || "",
      id_type: data.id_type || null,
      id_number: data.id_number || null,
      investment_amount: data.investment_amount || 0,
      monthly_roi: data.monthly_roi || 10,
      start_date: data.start_date || new Date().toISOString().split("T")[0],
      maturity_date: data.maturity_date || null,
      payment_method: data.payment_method || "Bank Transfer",
      payment_bank_name: data.payment_bank_name || null,
      payment_account_name: data.payment_account_name || null,
      transaction_reference: data.transaction_reference || null,
      returns_bank_name: data.returns_bank_name || null,
      returns_account_number: data.returns_account_number || null,
      returns_account_name: data.returns_account_name || null,
      returns_phone_number: data.returns_phone_number || null,
      signature_url: data.signature_url || null,
      status: data.status || "pending",
      signed_at: data.signed_at || new Date().toISOString(),
      document_url: data.document_url || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving agreement:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return result as Agreement;
}