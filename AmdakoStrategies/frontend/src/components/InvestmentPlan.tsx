import styled from "styled-components";
import { motion } from "framer-motion";
import { TrendingUp, Lock, Wallet, Users, ShieldCheck, LineChart, Award } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
  padding: 100px 24px;
  background: ${theme.colors.ivory};

  @media (max-width: 768px) {
    padding: 70px 20px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 45px;
  }
`;

const Eyebrow = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.gold};
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.0625rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const DocLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${theme.colors.primary};
  color: #fff;
  border-radius: ${theme.radii.small};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0 auto 24px;

  @media (max-width: 768px) {
    font-size: 10.5px;
    padding: 7px 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: 38px;
  }
`;

const Card = styled(motion.div)`
  padding: 32px 28px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.gold};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-3px);
  }

  @media (max-width: 720px) {
    padding: 26px 22px;
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  border: 1px solid rgba(2, 113, 196, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 10px;
  color: ${theme.colors.text};

  @media (max-width: 720px) {
    font-size: 1.0625rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9375rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;

  @media (max-width: 720px) {
    font-size: 0.875rem;
  }
`;

const CardList = styled.ul`
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    font-size: 0.875rem;
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
    display: flex;
    align-items: flex-start;
    gap: 8px;

    &::before {
      content: '✓';
      color: ${theme.colors.gold};
      font-weight: 700;
      flex-shrink: 0;
    }

    @media (max-width: 720px) {
      font-size: 0.84375rem;
    }
  }
`;

const HighlightCard = styled(motion.div)`
  padding: 32px 28px;
  border-radius: ${theme.radii.large};
  background: ${theme.colors.primary};
  color: #fff;
  border: 1px solid ${theme.colors.primaryDark};
  transition: all 0.25s ease;

  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-3px);
  }

  @media (max-width: 720px) {
    padding: 26px 22px;
  }

  ${IconBox} {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.2);
  }

  ${CardTitle} {
    color: #fff;
  }

  ${CardDescription} {
    color: rgba(255, 255, 255, 0.85);
  }

  ${CardList} {
    li {
      color: rgba(255, 255, 255, 0.85);

      &::before {
        color: ${theme.colors.gold};
      }
    }
  }
`;

const SecuritySection = styled(motion.div)`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  align-items: center;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 48px 44px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 36px 28px;
  }

  @media (max-width: 480px) {
    padding: 28px 22px;
  }
`;

const SecurityLeft = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 14px;
    color: ${theme.colors.primary};

    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.75;
    font-size: 0.9375rem;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const SecurityRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.medium};

  svg {
    color: ${theme.colors.gold};
    flex-shrink: 0;
    margin-top: 1px;
  }

  p {
    font-size: 0.9rem;
    color: ${theme.colors.textSecondary};
    line-height: 1.65;

    @media (max-width: 480px) {
      font-size: 0.84375rem;
    }
  }
`;

export default function InvestmentPlan() {
  return (
    <Section id="investment-plan">
      <Container>
        <Header>
          <DocLabel>
            <ShieldCheck size={14} />
            Official Investment Plan Document
          </DocLabel>
          <Eyebrow>For Prospective Investors</Eyebrow>
          <Title>Official Investment Plan</Title>
          <Subtitle>
            Transparent, structured, and professionally managed investment terms designed for sustainable
            growth and capital preservation.
          </Subtitle>
        </Header>

        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <Wallet size={22} />
            </IconBox>
            <CardTitle>Investment Range</CardTitle>
            <CardDescription>
              Minimum investment is <strong>₦750,000</strong> (Seven Hundred and Fifty Thousand Naira only).
            </CardDescription>
            <CardList>
              <li>Unlimited maximum — commit as much capital as you wish</li>
              <li>Flexible, open-ended investment duration</li>
              <li>Minimum 3 months capital lock period</li>
            </CardList>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <TrendingUp size={22} />
            </IconBox>
            <CardTitle>Monthly ROI</CardTitle>
            <CardDescription>
              Investors receive <strong>10%</strong> of their invested capital every month as profit.
            </CardDescription>
            <CardList>
              <li>Profits paid directly to your bank account</li>
              <li>Payments made on the 30th of every month</li>
              <li>₦1,000,000 earns ₦100,000 monthly</li>
              <li>₦5,000,000 earns ₦500,000 monthly</li>
            </CardList>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <Users size={22} />
            </IconBox>
            <CardTitle>Referral Commission</CardTitle>
            <CardDescription>
              Rewards investors and partners who help others join our platform.
            </CardDescription>
            <CardList>
              <li>Earn $30 (Thirty US Dollars) per successful referral</li>
              <li>Paid instantly once referral's capital is confirmed</li>
              <li>Eligible for Investor & Partner programs</li>
            </CardList>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <Lock size={22} />
            </IconBox>
            <CardTitle>Capital Safety & Withdrawal Policy</CardTitle>
            <CardDescription>
              Every investor's capital is safe, protected, and actively traded under strict risk management systems.
            </CardDescription>
            <CardList>
              <li>Capital cannot be withdrawn within the first 3 months</li>
              <li>Lock period ensures optimal trading cycles</li>
              <li>Flexible access to capital after 3 months</li>
              <li>Steady profit accumulation throughout</li>
            </CardList>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <ShieldCheck size={22} />
            </IconBox>
            <CardTitle>Security of Investment</CardTitle>
            <CardDescription>
              Funds are managed through verified, risk-controlled trading systems.
            </CardDescription>
            <CardList>
              <li>Certified professional crypto trading experts</li>
              <li>Transparent reporting & periodic updates</li>
              <li>Capital safety is our top priority</li>
              <li>Never exposed to reckless or unmanaged risks</li>
            </CardList>
          </Card>

          <HighlightCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <Award size={22} />
            </IconBox>
            <CardTitle>Why Invest with Amdako</CardTitle>
            <CardDescription>
              Guaranteed returns, full capital protection, and a professional team.
            </CardDescription>
            <CardList>
              <li>Guaranteed 10% monthly returns</li>
              <li>100% capital protection policy</li>
              <li>Transparent & reliable management system</li>
              <li>Professional team with proven trading experience</li>
            </CardList>
          </HighlightCard>
        </Grid>

        <SecuritySection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <SecurityLeft>
            <h3>Security & Investor Protection</h3>
            <p>
              Amdako Strategy Nig. Ltd. maintains the highest standards of capital safety through
              verified risk-management protocols. All trading is conducted by certified professionals
              with strict oversight — never reckless, always calculated.
            </p>
          </SecurityLeft>
          <SecurityRight>
            <SecurityItem>
              <ShieldCheck size={18} />
              <p><strong>100% Capital Protection Policy</strong> — your principal is protected under our verified, risk-controlled trading framework.</p>
            </SecurityItem>
            <SecurityItem>
              <LineChart size={18} />
              <p><strong>Certified Professional Traders</strong> — trading is conducted exclusively by certified crypto experts.</p>
            </SecurityItem>
            <SecurityItem>
              <TrendingUp size={18} />
              <p><strong>Transparent Reporting</strong> — periodic performance updates provided to all investors.</p>
            </SecurityItem>
          </SecurityRight>
        </SecuritySection>
      </Container>
    </Section>
  );
}