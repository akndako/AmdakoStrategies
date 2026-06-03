import { useEffect, useState } from "react";
import styled from "styled-components";
import type { PageView } from "../App"; // Import PageView

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
  onNavigate: (page: PageView) => void; // Use PageView type
};

const Page = styled.section`
  min-height: calc(100vh - 120px);
  padding: 100px 80px;
  background: linear-gradient(180deg, rgba(243, 186, 47, 0.08) 0%, transparent 100%);

  @media (max-width: 1024px) {
    padding: 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 600px) {
    padding: 50px 18px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Card = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(11, 14, 17, 0.95);
  border: 1px solid rgba(243, 186, 47, 0.15);
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 600px) {
    padding: 28px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: 16px;
  }
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

  @media (max-width: 480px) {
    gap: 12px;
  }

  h2 {
    font-size: 36px;

    @media (max-width: 768px) {
      font-size: 28px;
    }

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: 15px;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 32px;

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    gap: 18px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px;
  border-radius: 20px;
  text-align: center;

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 16px;
  }

  h3 {
    margin-bottom: 12px;
    font-size: 20px;

    @media (max-width: 480px) {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 28px;
    font-weight: 700;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: 14px;
  padding: 14px 22px;
  background: linear-gradient(135deg, #f3ba2f, #f7a600);
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
    padding: 14px 20px;
  }
`;

const Message = styled.div`
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.85);
`;

export default function DashboardPage({ token, user, onNavigate }: DashboardPageProps) {
  const [dashboardData, setDashboardData] = useState<{ performance: string; balance: string; openPositions: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      }
    }

    loadDashboard();
  }, [token]);

  return (
    <Page>
      <Card>
        <Header>
          <div>
            <h2>Welcome, {user.name} 👋</h2>
            <p>Your dashboard is ready. Review your portfolio, manage your account, and keep track of market performance.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
            <Button onClick={() => onNavigate('agreement')}>Fill Agreement Form</Button>
            {/* <Button onClick={onLogout}>Logout</Button> */}
          </div>
        </Header>

        {error ? (
          <Message>{error}</Message>
        ) : dashboardData ? (
          <>
            <StatsGrid>
              <StatCard>
                <h3>Account Balance</h3>
                <p>{dashboardData.balance}</p>
              </StatCard>
              <StatCard>
                <h3>Performance</h3>
                <p>{dashboardData.performance}</p>
              </StatCard>
              <StatCard>
                <h3>Open Positions</h3>
                <p>{dashboardData.openPositions}</p>
              </StatCard>
            </StatsGrid>
          </>
        ) : (
          <Message>Loading dashboard...</Message>
        )}
      </Card>
    </Page>
  );
}
