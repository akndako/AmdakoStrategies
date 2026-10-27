import { type FormEvent, useState } from "react";
import styled from "styled-components";
import { Mail, Lock, ArrowRight, ArrowLeft, Phone, KeyRound } from "lucide-react";
import { LogoLoader } from "../components/LoadingSpinner";
import { AuthPageShell } from "../components/layout/pageLayout";
import { theme } from "../theme";
import { logIn, sendPasswordResetCodeByPhone, verifyPasswordResetCode } from "../lib/auth";
import type { AuthState } from "../types";
import type { PageView } from "../App";

type LoginPageProps = {
  onAuthSuccess: (auth: AuthState) => void;
  onNavigate: (page: PageView) => void;
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
  box-shadow: ${theme.shadows.cardHover};

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

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 10px;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 10px;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
    font-size: 0.9375rem;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.textMuted};
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  padding: 14px 16px 14px 44px;
  color: ${theme.colors.text};
  font-size: 15px;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 4px ${theme.colors.primaryLight};
  }

  @media (max-width: 480px) {
    padding: 13px 14px 13px 40px;
    font-size: 15px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 14px 24px;
  font-weight: 600;
  font-size: 15px;
  background: ${theme.colors.primary};
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.button};

  &:hover {
    background: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.buttonHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    padding: 13px 20px;
    font-size: 15px;
    width: 100%;
    justify-content: center;
  }
`;

const Secondary = styled.span`
  color: ${theme.colors.textSecondary};
  font-size: 14px;
`;

const FieldHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const ForgotButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.primary};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primaryDark};
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  appearance: none;
  background: transparent;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.medium};
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessNotice = styled.div`
  color: ${theme.colors.success};
  background: rgba(2, 113, 196, 0.08);
  border: 1px solid rgba(2, 113, 196, 0.25);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  font-size: 14px;
  line-height: 1.6;
`;

const ResendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
`;

const ResendButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.primary};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primaryDark};
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Mask "johndoe@example.com" -> "jo***@example.com" so we can show the recipient
// without revealing the full address.
function maskEmail(value: string): string {
  const [name, domain] = value.split("@");
  if (!domain) return value;
  const maskedName = name.length <= 2 ? `${name.charAt(0)}***` : `${name.slice(0, 2)}***`;
  return `${maskedName}@${domain}`;
}

type ForgotStep = "phone" | "code";

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  background: rgba(214, 69, 69, 0.08);
  border: 1px solid rgba(214, 69, 69, 0.2);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  margin-top: 8px;
  font-size: 14px;
`;

const CardFooter = styled.div`
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid ${theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

const InlineLink = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  font-weight: 600;
  color: ${theme.colors.primary};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

export default function LoginPage({ onAuthSuccess, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState<ForgotStep>("phone");
  const [forgotPhone, setForgotPhone] = useState("");
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      const { authState, error } = await logIn(email, password);

      if (error) {
        setError(error.message || "Unable to sign in.");
        return;
      }

      if (!authState) {
        setError("Unable to sign in.");
        return;
      }

      onAuthSuccess(authState);
    } catch (err) {
      setError((err as Error)?.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowForgot = () => {
    setError(null);
    setNotice(null);
    setForgotError(null);
    setForgotMessage(null);
    setForgotStep("phone");
    setForgotPhone("");
    setShowForgot(true);
  };

  const handleShowLogin = () => {
    setShowForgot(false);
    setForgotError(null);
    setForgotMessage(null);
    setForgotStep("phone");
    setResetEmail(null);
    setVerificationCode("");
  };

  // Step 1 — submit the phone number, get a verification code sent to the account's email.
  const handlePhoneSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForgotError(null);
    setForgotMessage(null);

    const phoneDigits = forgotPhone.replace(/[^\d]/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setForgotError("Please enter a valid phone number linked to your account.");
      return;
    }

    setForgotLoading(true);

    try {
      const { success, error, email } = await sendPasswordResetCodeByPhone(forgotPhone);

      if (error) {
        setForgotError(error.message || "Unable to send a verification code. Please try again.");
        return;
      }

      if (!success || !email) {
        setForgotMessage(
          "If an account is linked to this phone number, we've sent a verification code to the email on file. Please check your inbox (and spam folder)."
        );
        return;
      }

      setResetEmail(email);
      setForgotMessage(`We've sent a 6-digit verification code to ${maskEmail(email)}. It expires shortly — don't share it.`);
      setForgotStep("code");
    } catch (err) {
      setForgotError((err as Error)?.message || "Unable to send a verification code. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2 — verify the code from the email.
  const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForgotError(null);
    setForgotMessage(null);

    if (!resetEmail) {
      setForgotError("Please request a new verification code.");
      setForgotStep("phone");
      return;
    }

    if (verificationCode.trim().length < 6) {
      setForgotError("Please enter the full 6-digit verification code from your email.");
      return;
    }

    setForgotLoading(true);
    try {
      const { error } = await verifyPasswordResetCode(resetEmail, verificationCode.trim());

      if (error) {
        setForgotError("The verification code you entered is invalid or has expired. Please request a new one.");
        setVerificationCode("");
        return;
      }

      // Verification succeeded — a session is established. Move to the dedicated
      // new-password page where the user sets + confirms their new password.
      onNavigate("reset-password");
    } catch (err) {
      setForgotError((err as Error)?.message || "Unable to verify the code. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2b — resend a fresh code to the same account's email.
  const handleResendCode = async () => {
    setForgotError(null);
    setForgotMessage(null);
    setForgotLoading(true);

    try {
      const { success, error, email } = await sendPasswordResetCodeByPhone(forgotPhone);

      if (error) {
        setForgotError(error.message || "Unable to resend the code. Please try again.");
        return;
      }

      if (success && email) {
        setResetEmail(email);
        setForgotMessage(`A new verification code has been sent to ${maskEmail(email)}.`);
      }
    } catch (err) {
      setForgotError((err as Error)?.message || "Unable to resend the code. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Header>
          <div className="eyebrow">Investor Portal</div>
          <h2>{showForgot ? "Reset your password" : "Welcome Back"}</h2>
          <p>
            {showForgot
              ? "Enter the phone number linked to your account and we'll send a verification code to the email on file."
              : "Access your account to manage investments, view performance, and stay connected with our latest strategies."}
          </p>
        </Header>

        {showForgot ? (
          <>
            {forgotStep === "phone" && (
              <Form onSubmit={handlePhoneSubmit}>
                <Field>
                  Phone number
                  <InputWrapper>
                    <Phone size={18} />
                    <Input
                      value={forgotPhone}
                      onChange={(e) => setForgotPhone(e.target.value)}
                      type="tel"
                      placeholder="Your registered phone number"
                      required
                      disabled={forgotLoading}
                    />
                  </InputWrapper>
                </Field>

                <Actions>
                  <BackButton type="button" onClick={handleShowLogin} disabled={forgotLoading}>
                    <ArrowLeft size={16} />
                    Back to Sign In
                  </BackButton>
                  <Button type="submit" disabled={forgotLoading}>
                    {forgotLoading ? (
                      <>
                        <LogoLoader compact />
                        Sending code...
                      </>
                    ) : (
                      <>
                        Send Verification Code
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </Actions>
                {forgotError && <ErrorMessage>{forgotError}</ErrorMessage>}
                {forgotMessage && <SuccessNotice>{forgotMessage}</SuccessNotice>}
              </Form>
            )}

            {forgotStep === "code" && (
              <Form onSubmit={handleCodeSubmit}>
                {forgotMessage && <SuccessNotice>{forgotMessage}</SuccessNotice>}

                <Field>
                  Verification code
                  <InputWrapper>
                    <KeyRound size={18} />
                    <Input
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="6-digit code"
                      required
                      disabled={forgotLoading}
                    />
                  </InputWrapper>
                </Field>

                <Actions>
                  <BackButton
                    type="button"
                    onClick={() => {
                      setForgotMessage(null);
                      setForgotStep("phone");
                    }}
                    disabled={forgotLoading}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </BackButton>
                  <Button type="submit" disabled={forgotLoading}>
                    {forgotLoading ? (
                      <>
                        <LogoLoader compact />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Code
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </Actions>

                <ResendRow>
                  <Secondary>Didn't get the code?</Secondary>
                  <ResendButton type="button" onClick={handleResendCode} disabled={forgotLoading}>
                    Resend code
                  </ResendButton>
                </ResendRow>
                {forgotError && <ErrorMessage>{forgotError}</ErrorMessage>}
              </Form>
            )}
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Field>
              Email address
              <InputWrapper>
                <Mail size={18} />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required disabled={loading} />
              </InputWrapper>
            </Field>

            <Field>
              <FieldHeader>
                <span>Password</span>
                <ForgotButton type="button" onClick={handleShowForgot} disabled={loading}>
                  Forgot password?
                </ForgotButton>
              </FieldHeader>
              <InputWrapper>
                <Lock size={18} />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required disabled={loading} />
              </InputWrapper>
            </Field>

            <Actions>
              <Secondary>Remember me</Secondary>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LogoLoader compact />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </Actions>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {notice && <SuccessNotice>{notice}</SuccessNotice>}
          </Form>
        )}

        <CardFooter>
          {!showForgot && (
            <p>
              New to Amdako?{" "}
              <InlineLink type="button" onClick={() => onNavigate("create")}>
                Create an account
              </InlineLink>
            </p>
          )}
          <InlineLink type="button" onClick={() => onNavigate("home")}>
            ← Back to home
          </InlineLink>
        </CardFooter>
      </Card>
    </Page>
  );
}