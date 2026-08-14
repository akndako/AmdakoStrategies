import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
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

const Content = styled.div`
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 80px 60px;
  border-radius: ${theme.radii.xl};
  background: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primaryDark};

  @media (max-width: 1024px) {
    padding: 70px 50px;
  }

  @media (max-width: 768px) {
    padding: 60px 35px;
  }

  @media (max-width: 480px) {
    padding: 50px 24px;
  }
`;

const GoldOverlay = styled.div`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(201, 162, 39, 0.15), transparent);
  border-radius: 50%;
  pointer-events: none;
`;

const GoldLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, ${theme.colors.gold}, transparent);
`;

const ContentInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.gold};
  margin-bottom: 14px;
`;

const Title = styled(motion.h2)`
  font-size: 2.25rem;
  margin-bottom: 16px;
  color: #fff;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 30px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button)<{ variant?: "primary" | "secondary" }>`
  padding: 14px 30px;
  border-radius: ${theme.radii.medium};
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  ${({ variant }) =>
    variant === "secondary"
      ? `
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.25);

    &:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.4);
    }
  `
      : `
    background: ${theme.colors.gold};
    color: ${theme.colors.primaryDark};

    &:hover {
      background: #D4AE2F;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  `}

  @media (max-width: 600px) {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
`;

const ContactRow = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${theme.colors.gold};
    font-weight: 600;
    font-size: 14px;

    &:hover {
      color: #E8BE2F;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 6px;
  }
`;

interface CTAProps {
  onNavigate: (page: "login" | "create") => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  return (
    <Section>
      <Container>
        <Content>
          <GoldLine />
          <GoldOverlay />
          <ContentInner>
            <Eyebrow>Start Today</Eyebrow>
            <Title
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Begin Your Investment Journey
            </Title>
            <Description
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Contact our investment team or authorized agent, complete the Amdako Strategy
              Investment Form, and begin earning guaranteed 10% monthly returns.
            </Description>
            <ButtonGroup>
              <Button
                onClick={() => onNavigate("create")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
                <ArrowRight size={16} />
              </Button>
              <Button
                variant="secondary"
                onClick={() => onNavigate("login")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Sign In
              </Button>
            </ButtonGroup>
            <ContactRow>
              <p>Prefer to speak with an advisor?</p>
              <a href="tel:08035817324">
                <PhoneCall size={14} />
                0803 581 7324
              </a>
            </ContactRow>
          </ContentInner>
        </Content>
      </Container>
    </Section>
  );
}