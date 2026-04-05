import { FormEvent, useState } from "react";
import styled from "styled-components";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthState = { token: string; user: AuthUser };

type CreateAccountPageProps = {
  onAuthSuccess: (auth: AuthState) => void;
};

const Page = styled.section`
  min-height: calc(100vh - 120px);
  padding: 100px 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, rgba(124,108,246,0.08) 0%, transparent 100%);
`;

const Card = styled.div`
  width: min(600px, 100%);
  background: rgba(12, 16, 34, 0.95);
  border: 1px solid rgba(124, 108, 246, 0.15);
  border-radius: 24px;
  padding: 52px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
`;

const Header = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 36px;
    margin-bottom: 12px;
  }

  p {
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 18px;
`;

const Field = styled.label`
  display: grid;
  gap: 10px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  padding: 16px 18px;
  color: #fff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: rgba(124, 108, 246, 0.8);
    box-shadow: 0 0 0 4px rgba(124, 108, 246, 0.12);
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: 14px;
  padding: 16px 24px;
  font-weight: 600;
  background: linear-gradient(135deg, #7c6cf6, #a855f7);
  color: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 32px rgba(124, 108, 246, 0.25);
  }
`;

const Notice = styled.p`
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.7;
`;

const ErrorMessage = styled.div`
  color: #ffbaba;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 186, 186, 0.4);
  padding: 12px 16px;
  border-radius: 14px;
  margin-top: 8px;
`;

export default function CreateAccountPage({ onAuthSuccess }: CreateAccountPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.message || "Unable to create account.");
        setLoading(false);
        return;
      }

      onAuthSuccess({ token: data.token, user: data.user });
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Header>
          <h2>Create Your Account</h2>
          <p>Join today to start investing in premium Web3 strategies with trusted security and expert guidance.</p>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            Full name
            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your full name" required />
          </Field>

          <Field>
            Email address
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
          </Field>

          <Field>
            Password
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a strong password" required />
          </Field>

          <Field>
            Confirm password
            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Re-enter your password" required />
          </Field>

          <Button type="submit" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Notice>By creating an account, you agree to our terms of service and privacy policy.</Notice>
        </Form>
      </Card>
    </Page>
  );
}
