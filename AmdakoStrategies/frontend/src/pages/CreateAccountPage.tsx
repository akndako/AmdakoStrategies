import { type FormEvent, useState } from "react";
import styled from "styled-components";
import { User, Mail, Phone, Lock, MapPin, Home, ArrowRight } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { theme } from "../theme";
import { signUp } from "../lib/auth";
import type { AuthState } from "../types";

type CreateAccountPageProps = {
  onSignUpSuccess: (auth: AuthState) => void;
};

const Page = styled.section`
  min-height: calc(100vh - 68px);
  padding: 80px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.ivory};

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Card = styled.div`
  width: min(560px, 100%);
  background: #fff;
  border: 1px solid ${theme.colors.border};
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
  margin-bottom: 30px;

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
  gap: 18px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 18px;
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

export default function CreateAccountPage({ onSignUpSuccess }: CreateAccountPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

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
        phone,
        address,
        location,
        stateOfOrigin
      );

      if (error) {
        setError(error.message || "Unable to create account.");
        return;
      }

      if (requiresEmailConfirmation) {
        setError("Account created. Check your email to confirm before logging in.");
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
          <div className="eyebrow">Investor Registration</div>
          <h2>Create Your Account</h2>
          <p>Join today to start investing in premium digital finance strategies with trusted security and expert guidance.</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Field>
              First name
              <InputWrapper>
                <User size={18} />
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Your first name" required disabled={loading} />
              </InputWrapper>
            </Field>

            <Field>
              Last name
              <InputWrapper>
                <User size={18} />
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Your last name" required disabled={loading} />
              </InputWrapper>
            </Field>
          </Row>

          <Field>
            Phone number
            <InputWrapper>
              <Phone size={18} />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Your phone number" required disabled={loading} />
            </InputWrapper>
          </Field>

          <Field>
            Email address
            <InputWrapper>
              <Mail size={18} />
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required disabled={loading} />
            </InputWrapper>
          </Field>

          <Row>
            <Field>
              Password
              <InputWrapper>
                <Lock size={18} />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a strong password" required disabled={loading} />
              </InputWrapper>
            </Field>

            <Field>
              Confirm password
              <InputWrapper>
                <Lock size={18} />
                <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Re-enter your password" required disabled={loading} />
              </InputWrapper>
            </Field>
          </Row>

          <Field>
            Address
            <InputWrapper>
              <Home size={18} />
              <Input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Your residential address" required disabled={loading} />
            </InputWrapper>
          </Field>

          <Row>
            <Field>
              Location
              <InputWrapper>
                <MapPin size={18} />
                <Input value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="City / Town" required disabled={loading} />
              </InputWrapper>
            </Field>

            <Field>
              State of Origin
              <InputWrapper>
                <MapPin size={18} />
                <Input value={stateOfOrigin} onChange={(e) => setStateOfOrigin(e.target.value)} type="text" placeholder="Your state of origin" required disabled={loading} />
              </InputWrapper>
            </Field>
          </Row>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight size={16} />}
          </Button>
          {loading && <LoadingSpinner message="Creating your account..." />}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Notice>By creating an account, you agree to our terms of service and privacy policy.</Notice>
        </Form>
      </Card>
    </Page>
  );
}
