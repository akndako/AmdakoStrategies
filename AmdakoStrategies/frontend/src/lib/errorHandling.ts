/**
 * Error Handling Utilities for Supabase Integration
 * 
 * Provides consistent error handling across all services
 * Maps database/auth errors to application-level error messages
 */

// AppError class for typed application errors
export class AppError extends Error {
  public readonly type: "validation" | "authentication" | "authorization" | "not-found" | "network" | "database";
  public readonly code: string;
  public readonly metadata?: unknown;

  constructor(
    message: string,
    type: "validation" | "authentication" | "authorization" | "not-found" | "network" | "database",
    code: string,
    metadata?: unknown
  ) {
    super(message);
    this.name = "AppError";
    this.type = type;
    this.code = code;
    this.metadata = metadata;
  }
}

// Map Supabase errors to AppError types (singleton export)
export function mapSupabaseError(error: unknown): AppError {
  if (!error) {
    return new AppError(
      "An unexpected error occurred",
      "database",
      "UNEXPECTED_ERROR"
    );
  }

  const errorDetails = typeof error === "object" ? error as Record<string, unknown> : {};
  const errorMessage =
    (typeof errorDetails.message === "string" && errorDetails.message) ||
    (typeof errorDetails.error_description === "string" && errorDetails.error_description) ||
    "Unknown error";
  const rawErrorCode = errorDetails.code || errorDetails.status;
  const errorCode = typeof rawErrorCode === "string" || typeof rawErrorCode === "number"
    ? String(rawErrorCode)
    : "UNKNOWN";

  // Authentication errors
  if (
    errorMessage.includes("invalid login") ||
    errorMessage.includes("invalid credentials") ||
    errorMessage.includes("Email not confirmed") ||
    errorCode === "PGRST301" ||
    errorCode === "401"
  ) {
    return new AppError(
      "Invalid email or password. Please try again.",
      "authentication",
      "INVALID_CREDENTIALS"
    );
  }

  if (errorMessage.includes("Email already exists") || errorCode === "PGRST302") {
    return new AppError(
      "An account with this email already exists. Please use a different email.",
      "validation",
      "EMAIL_EXISTS"
    );
  }

  if (errorMessage.includes("Password should be at least") || errorMessage.includes("minimum length")) {
    return new AppError(
      "Password must be at least 6 characters long.",
      "validation",
      "PASSWORD_TOO_SHORT"
    );
  }

  // Rate limiting / network errors
  if (errorCode === "PGRST116" || errorMessage.includes("rate limit")) {
    return new AppError(
      "Too many requests. Please try again later.",
      "network",
      "RATE_LIMIT"
    );
  }

  if (errorMessage.includes("connection") || errorMessage.includes("network")) {
    return new AppError(
      "Unable to connect to the server. Please check your internet connection.",
      "network",
      "NETWORK_ERROR"
    );
  }

  // Not found errors
  if (errorCode === "PGRST117" || errorMessage.includes("not found")) {
    return new AppError(
      "The requested resource was not found.",
      "not-found",
      "NOT_FOUND"
    );
  }

  // Validation errors
  if (errorCode === "PGRST209" || errorMessage.includes("validation")) {
    const details = Array.isArray(errorDetails.details) ? errorDetails.details : [];
    const messages = details
      .map((detail) => {
        if (typeof detail !== "object" || detail === null) return "";
        const message = (detail as Record<string, unknown>).message;
        return typeof message === "string" ? message : "";
      })
      .filter(Boolean)
      .join(". ");
    return new AppError(
      messages || "Validation error. Please check your input.",
      "validation",
      "VALIDATION_ERROR"
    );
  }

  // Default: return as database error
  return new AppError(
    errorMessage || "A database error occurred.",
    "database",
    errorCode
  );
}

// Format error for display to user - never expose raw database errors
export function formatErrorForDisplay(error: unknown): string {
  const appError = mapSupabaseError(error);

  const errorMessages: Record<string, string> = {
    INVALID_CREDENTIALS: "Unable to sign in. Please check your email and password.",
    EMAIL_EXISTS: "An account with this email already exists.",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters.",
    RATE_LIMIT: "Too many requests. Please try again in a moment.",
    NETWORK_ERROR: "Unable to connect to the server. Please check your internet connection.",
    NOT_FOUND: "The requested information is not available.",
    VALIDATION_ERROR: "Please check your input and try again.",
    UNEXPECTED_ERROR: "An unexpected error occurred. Please try again later.",
  };

  return errorMessages[appError.code] || appError.message;
}

// Async operation state type
export type AsyncOperationState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  empty: boolean;
};