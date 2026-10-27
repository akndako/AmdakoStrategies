import { type FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { Lock, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import LoadingSpinner, { LogoLoader } from "../components/LoadingSpinner";
import { AuthPageShell } from "../components/layout/pageLayout";
import { theme } from "../theme";
import { resetPassword } from "../lib/auth";
import { supabase } from "../lib/supabase";
import type { PageView } from "../App";

type ResetPasswordPageProps = {
  onNavigate: (page: PageView) => void;
  onShowToast?: (message: string) => void;
};

const Page = AuthPageShell;

const Card = styled.div`
  width: min(480px, 100%);
  min-width: 0;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-top: 3px solid ${theme.colors.gold};
  border-radius: ${theme.radii.xl};
  padding: 48px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 36px;
  }

  @media (max-width: 480px) {
    padding: 28px;
    border-radius: ${theme.radii.large};
  }
`;

const Header = styled.div`
  margin-bottom: 32px;

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing:2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom:10px;
  }

  h2 {
    font-size:28px;
    margin-bottom:10px;
    color: ${theme.colors.text};

    @media (max-width: 480px) {
      font-size:24px;
    }
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height:1.6;
    font-size:0.9375rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap:20px;
`;

const Field = styled.label`
  display: grid;
  gap:8px;
  color: ${theme.colors.text};
  font-size:14px;
  font-weight:500;
`;

const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left:14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.textMuted};
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: ${theme.radii.medium};
  border:1px solid ${theme.colors.border};
  background: #fff;
  padding: 14px 16px 14px 44px;
  color: ${theme.colors.text};
  font-size:15px;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 4px ${theme.colors.primaryLight};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:16px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap:12px;
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 14px 24px;
  font-weight:600;
  font-size:15px;
  background: ${theme.colors.primary};
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap:8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.button};

  &:hover {
    background: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.buttonHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity:0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BackButton = styled.button`
  appearance: none;
  background: transparent;
  border:1px solid ${theme.colors.border};
  border-radius: ${theme.radii.medium};
  padding: 12px 18px;
  font-size:14px;
  font-weight:600;
  color: ${theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  gap:8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity:0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  background: rgba(214, 69, 69, 0.08);
  border:1px solid rgba(214, 69, 69, 0.2);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  margin-bottom:8px;
  font-size:14px;
  display: flex;
  align-items: center;
  gap:8px;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap:8px;
  background: rgba(2, 113, 196, 0.08);
  border:1px solid rgba(2, 113, 196, 0.25);
  border-radius: ${theme.radii.medium};
  padding: 12px 16px;
  margin-bottom:16px;
  color: ${theme.colors.success};
  font-size:14px;
`;

export default function ResetPasswordPage({ onNavigate, onShowToast }: ResetPasswordPageProps) {
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");

    const init = async () => {
      try {
        if (tokenHash && params.get("type") === "recovery") {
          // Modern Supabase email links carry ?token_hash=...&type=recovery..
          const { error: verifyError } = await supabase.auth.verifyOtp({
            type: "recovery",
            token_hash: tokenHash,
          });
          if (verifyError) throw verifyError;
          if (mounted) setReady(true);
          return;
        }

        // Legacy flow (#access_token=...&type=recovery): supabase-js consumes the
        // link on init and the recovery session is already available. In that case the
        // password form can be shown right away.


        const { data: sessionData } = await supabase.auth.getSession();
        if (mounted) {
          if (sessionData?.session) {
            setReady(true);
          } else {
            setError("This reset link is invalid or has expired. Please request a new one.");
          }
        }
      } catch {
        if (mounted) {
          setError("This reset link is invalid or has expired. Please request a new one.");
        }
      } finally {
        if (mounted) {
          setChecking(false);
          // Remove the recovery token from the URL so refreshing doesn't re-verify
          // (or linger on a stale link)..
          window.history.replaceState({}, "", window.location.pathname);
        }
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);
    try {
      // Capture the session email before it's invalidated
      const { data: sessionData } = await supabase.auth.getSession();
      const sessionEmail = sessionData?.session?.user?.email;

      const { error: updateError } = await resetPassword(newPassword);
      if (updateError) {
        setError(updateError.message || "Unable to reset your password. Please try again.");
        return;
      }

      // Invalidate the verification session so the user signs in fresh with the new password.
      try {
        await supabase.auth.signOut();
      } catch {
        // Ignore — sign-in will handle any stale session.
      }

      // Re-authenticate with the new password to land on the dashboard as a signed-in user.
      if (sessionEmail) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: sessionEmail,
          password: newPassword,
        });
        if (signInError) {
          // Non-fatal: user can sign in manually; still show the success toast.
          console.error("Auto sign-in after reset failed:", signInError);
        }
      }

      setSuccess("Your password has been reset successfully.");
      setNewPassword("");
      setConfirmPassword("");

      onShowToast?.("Your password has been reset successfully.");

      // Show the toast briefly, then land on the dashboard.
      setTimeout(() => {
        onNavigate("dashboard");
      }, 1500);
    } catch (err) {
      setError((err as Error)?.message || "Unable to reset your password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <Page>
        <Card>
          <LoadingSpinner message="Verifying your reset link..." layout="center" />
        </Card>
      </Page>
    );
  }

  if (!ready) {
    return (
      <Page>
        <Card>
          <Header>
            <div className="eyebrow">Account Recovery</div>
            <h2>Reset your password</h2>
            <p>We couldn't verify your password-reset link. Please request a new one from the sign in page.</p>
          </Header>
          {error && (
            <ErrorMessage>
              <AlertCircle size={16} /> {error}
            </ErrorMessage>
          )}
          <BackButton type="button" onClick={() => onNavigate("login")}>
            <ArrowLeft size={16} /> Back to Sign In
          </BackButton>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <Header>
          <div className="eyebrow">Account Recovery</div>
          <h2>Set a new password</h2>
          <p>Enter a new password for your account. You'll sign in with it next time.</p>
        </Header>

        {error && (
          <ErrorMessage>
            <AlertCircle size={16} /> {error}
          </ErrorMessage>
        )}

        {success ? (
          <>
            <SuccessMessage>
              <CheckCircle size={16} /> {success}
            </SuccessMessage>
            <Button type="button" onClick={() => onNavigate("dashboard")}>
              Go to Dashboard
              <ArrowRight size={16} />
            </Button>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Field>
              New password
              <InputWrapper>
                <Lock size={18} />
                <Input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="Enter a new password"
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </InputWrapper>
            </Field>

            <Field>
              Confirm new password
              <InputWrapper>
                <Lock size={18} />
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Re-enter your new password"
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </InputWrapper>
            </Field>

            <Actions>
              <BackButton type="button" onClick={() => onNavigate("login")} disabled={loading}>
                <ArrowLeft size={16} /> Back
              </BackButton>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LogoLoader compact />
                    Updating password...
                  </>
                ) : (
                  <>
                    Update Password
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </Actions>
          </Form>
        )}
      </Card>
    </Page>
  );
}