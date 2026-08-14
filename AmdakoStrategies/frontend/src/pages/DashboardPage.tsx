import styled from "styled-components";
import { FileText, TrendingUp, Wallet, Briefcase, LogOut, Mail, Phone } from "lucide-react";
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
  background: ${theme.colors.ivory};

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

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 8px;
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

const ProfileCard = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 32px;
  align-items: center;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-left: 3px solid ${theme.colors.gold};
  border-radius: ${theme.radii.xl};
  padding: 36px 40px;
  box-shadow: ${theme.shadows.card};
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 28px 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  font-family: 'Playfair Display', Georgia, serif;
  border: 3px solid ${theme.colors.gold};
  margin: 0 auto;

  @media (max-width: 480px) {
    width: 72px;
    height: 72px;
    font-size: 26px;
  }
`;

const ProfileInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 6px;
    color: ${theme.colors.text};

    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  .role {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 16px;
  }
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.medium};

  svg {
    color: ${theme.colors.primary};
    flex-shrink: 0;
  }

  p {
    font-size: 0.875rem;
    color: ${theme.colors.textSecondary};
    line-height: 1.4;

    @media (max-width: 480px) {
      font-size: 0.8125rem;
    }
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

export default function DashboardPage({ token, user, onLogout, onNavigate }: DashboardPageProps) {
  const dashboardData = {
    performance: "+10%",
    balance: "₦1,000,000",
    openPositions: 3,
  };

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Page>
      <Container>
        <Header>
          <div>
            <div className="eyebrow">Investor Dashboard</div>
            <h2>Welcome, {user.name}</h2>
            <p>Your investor portal is ready. Review your profile, manage your account, and track your investment performance.</p>
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

        <ProfileCard>
          <Avatar>{initials}</Avatar>
          <ProfileInfo>
            <h3>{user.name}</h3>
            <div className="role">Verified Investor</div>
            <ProfileDetails>
              <ProfileItem>
                <Mail size={16} />
                <p>{user.email}</p>
              </ProfileItem>
              <ProfileItem>
                <Phone size={16} />
                <p>{user.phone || "Not provided"}</p>
              </ProfileItem>
            </ProfileDetails>
          </ProfileInfo>
        </ProfileCard>

        <Card>
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
        </Card>
      </Container>
    </Page>
  );
}