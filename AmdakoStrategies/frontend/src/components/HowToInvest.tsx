import styled from "styled-components";
import { motion } from "framer-motion";
import { PhoneCall, FileText, ArrowDownToLine, ScrollText, TrendingUp } from "lucide-react";
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
  max-width: 1080px;
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

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const StepCard = styled(motion.div)`
  position: relative;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  padding: 32px 24px 28px;
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.gold};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
  }

  @media (max-width: 600px) {
    padding: 26px 20px;
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${theme.colors.gold};
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 2px 8px rgba(201, 162, 39, 0.4);

  @media (max-width: 600px) {
    position: static;
    transform: none;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const StepIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border: 1px solid rgba(2, 113, 196, 0.1);

  @media (max-width: 600px) {
    margin: 0;
    flex-shrink: 0;
  }
`;

const StepContent = styled.div`
  @media (max-width: 600px) {
    flex: 1;
  }
`;

const StepTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 8px;
  color: ${theme.colors.text};

  @media (max-width: 600px) {
    font-size: 0.9375rem;
  }
`;

const StepDescription = styled.p`
  font-size: 0.825rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.65;

  @media (max-width: 600px) {
    font-size: 0.8125rem;
    text-align: left;
  }
`;

const steps = [
  {
    icon: PhoneCall,
    title: "Contact Our Team",
    description: "Reach out to our investment team or an authorized agent to begin the process.",
  },
  {
    icon: FileText,
    title: "Complete the Form",
    description: "Fill out the official Amdako Strategy Investment Form with your details.",
  },
  {
    icon: ArrowDownToLine,
    title: "Transfer Capital",
    description: "Transfer your investment capital to the company's verified account.",
  },
  {
    icon: ScrollText,
    title: "Receive Contract",
    description: "Get your official investment receipt and signed contract agreement.",
  },
  {
    icon: TrendingUp,
    title: "Begin Earning",
    description: "Start earning 10% monthly profits — plus referral commissions where applicable.",
  },
];

export default function HowToInvest() {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Getting Started</Eyebrow>
          <Title>How to Invest</Title>
          <Subtitle>
            A simple, transparent five-step process to begin your investment journey with
            Amdako Strategy Nig. Ltd.
          </Subtitle>
        </Header>

        <Steps>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <StepCard
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <StepNumber>{idx + 1}</StepNumber>
                <StepIcon>
                  <Icon size={21} />
                </StepIcon>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </StepCard>
            );
          })}
        </Steps>
      </Container>
    </Section>
  );
}