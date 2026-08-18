import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../lib/auth";
import type { Investment, DashboardSummary } from "../types";
import { formatErrorForDisplay } from "../lib/errorHandling";

export async function getInvestments(): Promise<Investment[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching investments:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return (data as Investment[]) || [];
}

export async function getInvestmentById(id: string): Promise<Investment | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("investments")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching investment by ID:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return data as Investment | null;
}

export async function createInvestment(data: Partial<Investment>): Promise<Investment> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: result, error } = await supabase
    .from("investments")
    .insert({
      user_id: user.id,
      investment_name: data.investment_name || "",
      description: data.description || null,
      amount: data.amount || 0,
      current_value: data.current_value ?? data.amount ?? 0,
      profit_loss: data.profit_loss ?? 0,
      monthly_roi: data.monthly_roi ?? 10,
      status: data.status || "active",
      start_date: data.start_date || new Date().toISOString().split("T")[0],
      maturity_date: data.maturity_date || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating investment:", error);
    throw new Error(formatErrorForDisplay(error));
  }
  return result as Investment;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const investments = await getInvestments();

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const currentValue = investments.reduce((sum, inv) => sum + Number(inv.current_value), 0);
  const profitLoss = currentValue - totalInvested;
  const performance = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;
  const openInvestments = investments.filter((inv) => inv.status === "active").length;

  return {
    totalInvested,
    currentValue,
    profitLoss,
    performance,
    openInvestments,
  };
}
