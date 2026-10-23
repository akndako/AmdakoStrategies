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
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching agreement:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return data as Agreement | null;
}

export type AgreementSubmission = Pick<
  Agreement,
  | "full_name"
  | "occupation"
  | "address"
  | "phone"
  | "email"
  | "id_type"
  | "id_number"
  | "investment_amount"
  | "monthly_roi"
  | "start_date"
  | "maturity_date"
  | "payment_method"
  | "payment_bank_name"
  | "payment_account_name"
  | "transaction_reference"
  | "returns_bank_name"
  | "returns_account_number"
  | "returns_account_name"
  | "returns_phone_number"
>;

export async function saveAgreement(data: AgreementSubmission, agreementId?: string): Promise<Agreement> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const baseValues = {
    ...data,
    status: "pending" as const,
  };
  const query = supabase.from("agreements");
  const { data: result, error } = agreementId
    ? await query
        .update(baseValues)
        .eq("id", agreementId)
        .eq("user_id", user.id)
        .select()
        .single()
    : await query
        .insert({
          ...baseValues,
          user_id: user.id,
          signature_url: null,
          signed_at: null,
          document_url: null,
        })
        .select()
        .single();

  if (error) {
    console.error("Error saving agreement:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return result as Agreement;
}

export async function saveAgreementSignature(agreementId: string, signaturePng: Blob): Promise<Agreement> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const signaturePath = `${user.id}/${agreementId}-signature.png`;
  const { error: uploadError } = await supabase.storage
    .from("agreements")
    .upload(signaturePath, signaturePng, {
      contentType: "image/png",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(formatErrorForDisplay(uploadError));
  }

  const signedAt = new Date().toISOString();
  const { data, error } = await supabase
    .from("agreements")
    .update({
      signature_url: signaturePath,
      signed_at: signedAt,
    })
    .eq("id", agreementId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(formatErrorForDisplay(error));
  }

  return data as Agreement;
}

export async function downloadAgreementSignature(signaturePath: string): Promise<Blob> {
  const user = await getCurrentUser();
  if (!user || signaturePath.split("/")[0] !== user.id) {
    throw new Error("You do not have access to this signature.");
  }

  const { data, error } = await supabase.storage.from("agreements").download(signaturePath);
  if (error) {
    throw new Error(formatErrorForDisplay(error));
  }
  return data;
}

export async function saveAgreementPdf(agreementId: string, pdf: Blob): Promise<string> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const documentPath = `${user.id}/${agreementId}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from("agreements")
    .upload(documentPath, pdf, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(formatErrorForDisplay(uploadError));
  }

  const { error: updateError } = await supabase
    .from("agreements")
    .update({ document_url: documentPath })
    .eq("id", agreementId)
    .eq("user_id", user.id);

  if (updateError) {
    await supabase.storage.from("agreements").remove([documentPath]);
    throw new Error(formatErrorForDisplay(updateError));
  }

  return documentPath;
}

export async function downloadAgreementPdf(documentPath: string): Promise<Blob> {
  const user = await getCurrentUser();
  if (!user || documentPath.split("/")[0] !== user.id) {
    throw new Error("You do not have access to this agreement.");
  }

  const { data, error } = await supabase.storage.from("agreements").download(documentPath);
  if (error) {
    throw new Error(formatErrorForDisplay(error));
  }
  return data;
}