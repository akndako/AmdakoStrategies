import styled from "styled-components";
import { motion } from "framer-motion";
import { Handshake, Award, CalendarCheck, Users, Headset, ShieldCheck, Trophy } from "lucide-react";
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: 18px;
  }
`;

const Card = styled(motion.div)`
  padding: 36px 30px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.gold};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
  }

  @media (max-width: 600px) {
    padding: 28px 22px;
  }
`;

const IconBox = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid rgba(11, 61, 46, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: ${theme.colors.text};

  @media (max-width: 600px) {
    font-size: 1.125rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9375rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 18px;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.84375rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  background: ${theme.colors.primaryLight};
  padding: 6px 12px;
  border-radius: 100px;
`;

const Banner = styled(motion.div)`
  margin-top: 48px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
  align-items: center;
  background: ${theme.colors.primary};
  border-radius: ${theme.radii.xl};
  padding: 44px;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 34px 28px;
  }

  @media (max-width: 480px) {
    padding: 28px 22px;
    margin-top: 38px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(201, 162, 39, 0.15), transparent);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const CTALeft = styled.div`
  position: relative;
  z-index: 1;

  h3 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 12px;

    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9375rem;
    line-height: 1.7;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const CTARight = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CTARow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  svg {
    color: ${theme.colors.gold};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: 0.84375rem;
    }
  }
`;

export default function Opportunities() {
  const partnershipBenefits = [
    {
      icon: Handshake,
      title: "Investor & Partner Program",
      description:
        "Investors who wish to grow with the company can become Amdako Strategy Partners and enjoy a range of exclusive benefits.",
      tag: "Grow With Us",
    },
    {
      icon: Award,
      title: "Referral & Commission Earnings",
      description:
        "Earn generous referral commissions on every successful referral — $30 (Thirty US Dollars) paid instantly once the referred investor's capital is confirmed.",
      tag: "Earn Instantly",
    },
    {
      icon: CalendarCheck,
      title: "Exclusive Events & Reports",
      description:
        "Exclusive access to company events and detailed performance reports, keeping partners fully informed of company trading performance.",
      tag: "Exclusive Access",
    },
    {
      icon: Users,
      title: "Regional Leadership Roles",
      description:
        "Take leadership roles in regional investor networks and play a key part in growing the Amdako community across Africa.",
      tag: "Leadership",
    },
    {
      icon: Headset,
      title: "Priority Support",
      description:
        "Priority support and timely updates on company trading performance, ensuring partners and investors stay ahead.",
      tag: "Priority",
    },
    {
      icon: ShieldCheck,
      title: "100% Capital Protection",
      description:
        "Every partnership is backed by our verified risk-controlled trading systems and our steadfast 100% capital protection policy.",
      tag: "Protected",
    },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Growth & Partnership</Eyebrow>
          <Title>Partnership Opportunities</Title>
          <Subtitle>
            Investors who wish to grow with the company can become Amdako Strategy Partners, enjoying exclusive
            benefits designed for long-term success.
          </Subtitle>
        </Header>

        <Grid>
          {partnershipBenefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <IconBox>
                  <Icon size={24} />
                </IconBox>
                <CardTitle>{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
                <Tag>{benefit.tag}</Tag>
              </Card>
            );
          })}
        </Grid>

        <Banner
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <CTALeft>
            <h3>Become an Amdako Strategy Partner</h3>
            <p>
              Join a growing network of investors and partners building sustainable wealth across Africa.
              Contact our investment team today to start your partnership journey.
            </p>
          </CTALeft>
          <CTARight>
            <CTARow>
              <Trophy size={17} />
              <p>Guaranteed 10% monthly returns on capital</p>
            </CTARow>
            <CTARow>
              <ShieldCheck size={17} />
              <p>100% capital protection policy</p>
            </CTARow>
            <CTARow>
              <Award size={17} />
              <p>Referral income opportunities — $30 per referral</p>
            </CTARow>
          </CTARight>
        </Banner>
      </Container>
    </Section>
  );
}