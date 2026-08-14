import styled from "styled-components";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
  padding: 100px 24px;
  background: ${theme.colors.surface};

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

const Card = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  background: ${theme.colors.primary};
  padding: 48px 42px;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    padding: 38px 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 24px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -40%;
    left: -20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(201, 162, 39, 0.2), transparent);
    border-radius: 50%;
    pointer-events: none;
  }

  h3 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 14px;

    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9375rem;
    line-height: 1.75;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const LeftStat = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 480px) {
    gap: 14px;
  }

  h4 {
    font-size: 28px;
    font-weight: 700;
    color: ${theme.colors.gold};
    margin-bottom: 4px;
    font-family: 'Playfair Display', Georgia, serif;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  p {
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.4;

    @media (max-width: 480px) {
      font-size: 11.5px;
    }
  }
`;

const RightPanel = styled.div`
  padding: 48px 42px;

  @media (max-width: 900px) {
    padding: 38px 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 24px;
  }
`;

const CheckList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const CheckItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    color: ${theme.colors.gold};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    font-size: 0.9375rem;
    color: ${theme.colors.textSecondary};
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }

  strong {
    color: ${theme.colors.text};
    font-weight: 600;
  }
`;

export default function Testimonials() {
  const benefits = [
    {
      title: "Guaranteed 10% monthly returns on capital",
      detail: "Paid directly to your bank account on the 30th of every month.",
    },
    {
      title: "100% capital protection policy",
      detail: "Your principal is safeguarded under verified, risk-controlled trading systems.",
    },
    {
      title: "Transparent and reliable management system",
      detail: "Periodic performance updates and transparent reporting for all investors.",
    },
    {
      title: "Referral income opportunities",
      detail: "Earn $30 (Thirty US Dollars) per successful referral, paid instantly.",
    },
    {
      title: "Secure three-month capital lock system",
      detail: "Ensures sustainable growth through optimal trading cycles and steady accumulation.",
    },
    {
      title: "Professional team with proven trading experience",
      detail: "All trading conducted exclusively by certified and professional crypto experts.",
    },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Why Amdako</Eyebrow>
          <Title>Why Invest with Amdako Strategy Nig. Ltd.?</Title>
          <Subtitle>
            A track record built on discipline, transparency, and proven trading expertise.
          </Subtitle>
        </Header>

        <Card
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <LeftPanel>
            <h3>Guaranteed Returns, Protected Capital</h3>
            <p>
              Amdako Strategy Nig. Ltd. combines professional market expertise with disciplined risk
              management to deliver consistent, predictable returns for investors.
            </p>
            <LeftStat>
              <div>
                <h4>10%</h4>
                <p>Monthly ROI on invested capital</p>
              </div>
              <div>
                <h4>120%</h4>
                <p>Annualised ROI potential</p>
              </div>
              <div>
                <h4>100%</h4>
                <p>Capital protection policy</p>
              </div>
              <div>
                <h4>$30</h4>
                <p>Per successful referral commission</p>
              </div>
            </LeftStat>
          </LeftPanel>

          <RightPanel>
            <CheckList>
              {benefits.map((benefit, idx) => (
                <CheckItem key={idx}>
                  <BadgeCheck size={20} />
                  <p>
                    <strong>{benefit.title}</strong> — {benefit.detail}
                  </p>
                </CheckItem>
              ))}
            </CheckList>
          </RightPanel>
        </Card>
      </Container>
    </Section>
  );
}