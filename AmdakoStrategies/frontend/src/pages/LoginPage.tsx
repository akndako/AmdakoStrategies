import { type FormEvent, useState } from "react";
import styled from "styled-components";
import { Mail, Lock, ArrowRight } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { theme } from "../theme";
import { logIn } from "../lib/auth";
import type { AuthState } from "../types";

type LoginPageProps = {
  onAuthSuccess: (auth: AuthState) => void;
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
  width: min(480px, 100%);
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

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  background: rgba(214, 69, 69, 0.08);
  border: 1px solid rgba(214, 69, 69, 0.2);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  margin-top: 8px;
  font-size: 14px;
`;

export default function LoginPage({ onAuthSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
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

  return (
    <Page>
      <Card>
        <Header>
          <div className="eyebrow">Investor Portal</div>
          <h2>Welcome Back</h2>
          <p>Access your account to manage investments, view performance, and stay connected with our latest strategies.</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            Email address
            <InputWrapper>
              <Mail size={18} />
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required disabled={loading} />
            </InputWrapper>
          </Field>

          <Field>
            Password
            <InputWrapper>
              <Lock size={18} />
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required disabled={loading} />
            </InputWrapper>
          </Field>

          <Actions>
            <Secondary>Remember me</Secondary>
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={16} />}
            </Button>
          </Actions>
          {loading && <LoadingSpinner message="Signing you in..." />}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </Card>
    </Page>
  );
}