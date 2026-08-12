import { useEffect, useState } from "react";
import styled from "styled-components";
import { FileText, TrendingUp, Wallet, Briefcase, LogOut, RefreshCw } from "lucide-react";
import type { PageView } from "../App";
import { theme } from "../theme";

type DashboardPageProps = {
  token: string;
  user: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  onLogout: () => void;
  onNavigate: (page: PageView) => void;
};

const Page = styled.section`
  min-height: calc(100vh - 68px);
  padding: 60px 24px;
  background: ${theme.colors.surfaceAlt};

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 16px;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 8px;

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

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: "primary" | "outline" | "danger" }>`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 12px 20px;
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case "outline":
        return `
          background: #fff;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
            background: ${theme.colors.primaryLight};
          }
        `;
      case "danger":
        return `
          background: #fff;
          color: ${theme.colors.danger};
          border: 1px solid ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.danger};
            background: rgba(214, 69, 69, 0.05);
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: #fff;
          box-shadow: ${theme.shadows.button};

          &:hover {
            background: ${theme.colors.primaryDark};
            box-shadow: ${theme.shadows.buttonHover};
            transform: translateY(-1px);
          }
        `;
    }
  }}

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 40px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: ${theme.radii.large};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 32px;

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }
`;

const StatCard = styled.div`
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.large};
  padding: 24px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.cardHover};
  }

  @media (max-width: 480px) {
    padding: 20px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: ${theme.radii.medium};
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 14px;
    color: ${theme.colors.textMuted};
    font-weight: 500;
    margin-bottom: 8px;
  }

  p {
    font-size: 24px;
    font-weight: 700;
    color: ${theme.colors.text};

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

const Message = styled.div`
  margin-top: 24px;
  color: ${theme.colors.textSecondary};
  font-size: 15px;
  text-align: center;
  padding: 40px;
  background: ${theme.colors.surfaceAlt};
  border-radius: ${theme.radii.large};
  border: 1px dashed ${theme.colors.border};
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 0;
  color: ${theme.colors.textMuted};

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default function DashboardPage({ token, user, onLogout, onNavigate }: DashboardPageProps) {
  const [dashboardData, setDashboardData] = useState<{ performance: string; balance: string; openPositions: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("http://localhost:4000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || "Unable to load dashboard.");
          return;
        }
        setDashboardData(data);
      } catch {
        setError("Unable to reach the backend server.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  return (
    <Page>
      <Container>
        <Header>
          <div>
            <h2>Welcome, {user.name}</h2>
            <p>Your dashboard is ready. Review your portfolio, manage your account, and keep track of market performance.</p>
          </div>
          <HeaderActions>
            <Button onClick={() => onNavigate("agreement")}>
              <FileText size={16} />
              Fill Agreement Form
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut size={16} />
              Logout
            </Button>
          </HeaderActions>
        </Header>

        <Card>
          {loading ? (
            <LoadingState>
              <RefreshCw size={24} />
              <span>Loading dashboard...</span>
            </LoadingState>
          ) : error ? (
            <Message>{error}</Message>
          ) : dashboardData ? (
            <StatsGrid>
              <StatCard>
                <div className="stat-icon">
                  <Wallet size={20} />
                </div>
                <h3>Account Balance</h3>
                <p>{dashboardData.balance}</p>
              </StatCard>
              <StatCard>
                <div className="stat-icon">
                  <TrendingUp size={20} />
                </div>
                <h3>Performance</h3>
                <p>{dashboardData.performance}</p>
              </StatCard>
              <StatCard>
                <div className="stat-icon">
                  <Briefcase size={20} />
                </div>
                <h3>Open Positions</h3>
                <p>{dashboardData.openPositions}</p>
              </StatCard>
            </StatsGrid>
          ) : (
            <Message>No dashboard data available.</Message>
          )}
        </Card>
      </Container>
    </Page>
  );
}