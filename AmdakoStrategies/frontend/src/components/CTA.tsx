import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
  padding: 100px 24px;
  background: #ffffff;

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
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);

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

const Glow = styled.div`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12), transparent);
  border-radius: 50%;
  pointer-events: none;
`;

const ContentInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 0 auto;
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
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.25);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }
  `
      : `
    background: #fff;
    color: ${theme.colors.primary};

    &:hover {
      background: rgba(255, 255, 255, 0.95);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  `}

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
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
          <Glow />
          <ContentInner>
            <Title
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Grow Your Wealth?
            </Title>
            <Description
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Join our community of successful investors and start your journey to financial freedom with Amdako Strategies.
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
          </ContentInner>
        </Content>
      </Container>
    </Section>
  );
}