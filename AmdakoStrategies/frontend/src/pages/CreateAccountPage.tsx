import { type FormEvent, useState } from "react";
import styled from "styled-components";
import { User, Mail, Phone, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { LogoLoader } from "../components/LoadingSpinner";
import { theme } from "../theme";
import { AuthPageShell } from "../components/layout/pageLayout";
import { signUp } from "../lib/auth";
import type { AuthState } from "../types";
import type { PageView } from "../App";

type CreateAccountPageProps = {
  onSignUpSuccess: (auth: AuthState) => void;
  onNavigate: (page: PageView) => void;
};

const Page = styled(AuthPageShell)`
  background-image:
    radial-gradient(ellipse 75% 55% at 0% 0%, rgba(2, 113, 196, 0.06), transparent 60%),
    radial-gradient(ellipse 65% 45% at 100% 100%, rgba(201, 162, 39, 0.07), transparent 55%);
`;

const Card = styled.div`
  width: min(640px, 100%);
  min-width: 0;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-top: 3px solid ${theme.colors.gold};
  border-radius: ${theme.radii.xl};
  padding: 40px;
  box-shadow: ${theme.shadows.cardHover};

  @media (max-width: 768px) {
    padding: 32px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: ${theme.radii.large};
  }
`;

const Header = styled.div`
  margin-bottom: 28px;

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 10px;

    svg {
      color: ${theme.colors.primary};
    }
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
  gap: 16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
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

  > svg {
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
  padding: 13px 46px 13px 44px;
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
    padding: 13px 44px 13px 40px;
    font-size: 15px;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: ${theme.radii.small};
  background: transparent;
  color: ${theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 1px;
  }

  svg {
    position: static;
    transform: none;
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
  justify-content: center;
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

  @media (max-width: 600px) {
    padding: 13px 20px;
    font-size: 15px;
    width: 100%;
  }
`;

const Notice = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 13px;
  margin-top: 4px;
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  background: rgba(214, 69, 69, 0.08);
  border: 1px solid rgba(214, 69, 69, 0.2);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  margin-top: 8px;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  background: rgba(25, 135, 84, 0.08);
  border: 1px solid rgba(25, 135, 84, 0.22);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  font-size: 14px;
  line-height: 1.5;
`;

const SecurityNote = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
    margin-top: 1px;
    color: ${theme.colors.primary};
  }
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

export default function CreateAccountPage({ onSignUpSuccess, onNavigate }: CreateAccountPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setConfirmationMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { authState, error, requiresEmailConfirmation } = await signUp(
        firstName,
        lastName,
        email,
        password,
        phone
      );

      if (error) {
        setError(error.message || "Unable to create account.");
        return;
      }

      if (requiresEmailConfirmation) {
        setConfirmationMessage("Account created. Check your email to confirm your address before signing in.");
        return;
      }

      if (!authState) {
        setError("Unable to create account.");
        return;
      }

      onSignUpSuccess(authState);
    } catch (err) {
      setError((err as Error)?.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Header>
          <div className="eyebrow"><ShieldCheck size={15} /> Investor Registration</div>
          <h2>Create Your Account</h2>
          <p>Set up your investor account to access your portfolio and manage your investments.</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Field>
              First name
              <InputWrapper>
                <User size={18} />
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Your first name" autoComplete="given-name" required disabled={loading} />
              </InputWrapper>
            </Field>

            <Field>
              Last name
              <InputWrapper>
                <User size={18} />
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Your last name" autoComplete="family-name" required disabled={loading} />
              </InputWrapper>
            </Field>
          </Row>

          <Row>
            <Field>
              Phone number
              <InputWrapper>
                <Phone size={18} />
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Your phone number" autoComplete="tel" required disabled={loading} />
              </InputWrapper>
            </Field>

            <Field>
              Email address
              <InputWrapper>
                <Mail size={18} />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required disabled={loading} />
              </InputWrapper>
            </Field>
          </Row>

          <Row>
            <Field>
              Password
              <InputWrapper>
                <Lock size={18} />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Create a strong password" autoComplete="new-password" required disabled={loading} />
                <PasswordToggle type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </PasswordToggle>
              </InputWrapper>
            </Field>

            <Field>
              Confirm password
              <InputWrapper>
                <Lock size={18} />
                <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter your password" autoComplete="new-password" required disabled={loading} />
                <PasswordToggle type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} aria-pressed={showConfirmPassword}>
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </PasswordToggle>
              </InputWrapper>
            </Field>
          </Row>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LogoLoader compact />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={16} />
              </>
            )}
          </Button>
          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
          {confirmationMessage && <SuccessMessage role="status">{confirmationMessage}</SuccessMessage>}
          <SecurityNote><ShieldCheck size={16} /> You can add or update your profile details after creating your account.</SecurityNote>
          <Notice>By creating an account, you agree to our terms of service and privacy policy.</Notice>
        </Form>

        <CardFooter>
          <p>
            Already registered?{" "}
            <InlineLink type="button" onClick={() => onNavigate("login")}>
              Sign in
            </InlineLink>
          </p>
          <InlineLink type="button" onClick={() => onNavigate("home")}>
            ← Back to home
          </InlineLink>
        </CardFooter>
      </Card>
    </Page>
  );
}
