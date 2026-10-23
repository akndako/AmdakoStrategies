import React from "react";
import type { ReactNode, ReactElement } from "react";
import styled from "styled-components";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { theme } from "../theme";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: ${theme.colors.ivory};
  font-family: ${theme.typography.fontFamily};
`;

const Card = styled.div`
  padding: 40px 36px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.card};
  max-width: 480px;
  width: 100%;
  text-align: center;
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: rgba(179, 64, 58, 0.1);
  color: ${theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: ${theme.typography.serif};
  font-size: 1.5rem;
  color: ${theme.colors.text};
  margin: 0 0 12px;
`;

const Message = styled.p`
  color: ${theme.colors.textSecondary};
  margin: 0 0 24px;
  line-height: 1.65;
`;

const RefreshButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${theme.radii.medium};
  font-size: 15px;
  font-weight: 600;
  box-shadow: ${theme.shadows.button};
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const DevDetails = styled.details`
  margin-top: 24px;
  padding: 16px;
  background: ${theme.colors.surfaceAlt};
  border-radius: ${theme.radii.medium};
  text-align: left;
  font-size: 13px;
  color: ${theme.colors.textSecondary};

  summary {
    font-weight: 600;
    cursor: pointer;
    color: ${theme.colors.text};
  }

  pre {
    overflow: auto;
    margin: 12px 0 0;
    padding: 12px;
    background: #fff;
    border-radius: ${theme.radii.small};
    font-size: 12px;
    color: ${theme.colors.danger};
  }
`;

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactElement {
    if (this.state.hasError) {
      return (
        <Page>
          <Card>
            <IconWrap>
              <AlertTriangle size={28} aria-hidden />
            </IconWrap>
            <Title>Something went wrong</Title>
            <Message>
              We hit an unexpected error. Refresh the page to try again. If the problem continues,
              contact our support team.
            </Message>
            <RefreshButton type="button" onClick={() => window.location.reload()}>
              <RefreshCw size={18} aria-hidden />
              Refresh page
            </RefreshButton>
            {import.meta.env.DEV && (
              <DevDetails>
                <summary>Error details (development)</summary>
                <pre>{this.state.error?.toString()}</pre>
              </DevDetails>
            )}
          </Card>
        </Page>
      );
    }

    return this.props.children as ReactElement;
  }
}
