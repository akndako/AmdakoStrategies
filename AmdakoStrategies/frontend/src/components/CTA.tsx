import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 100px;
  background: rgba(30, 35, 41, 0.7);
  border: 1px solid rgba(243, 186, 47, 0.15);
  margin: 80px 100px;
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(243, 186, 47, 0.15), transparent);
    border-radius: 50%;
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    padding: 80px;
    margin: 70px 80px;
  }

  @media (max-width: 1024px) {
    padding: 70px 60px;
    margin: 60px 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 40px;
    margin: 50px 30px;
  }

  @media (max-width: 600px) {
    padding: 50px 30px;
    margin: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 24px;
    margin: 30px 16px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 1200px) {
    font-size: 2.25rem;
    margin-bottom: 18px;
  }

  @media (max-width: 1024px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 14px;
  }

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 1.375rem;
    margin-bottom: 10px;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.125rem;
  opacity: 0.85;
  margin-bottom: 40px;
  line-height: 1.6;

  @media (max-width: 1024px) {
    font-size: 1rem;
    margin-bottom: 36px;
  }

  @media (max-width: 768px) {
    font-size: 0.9375rem;
    margin-bottom: 32px;
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
    margin-bottom: 28px;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
    margin-bottom: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button)<{ primary?: boolean }>`
  padding: 16px 40px;
  border-radius: 12px;
  border: ${({ primary }) => primary ? "none" : "2px solid rgba(243, 186, 47, 0.2)"};
  background: ${({ primary }) => primary ? "linear-gradient(135deg, #F3BA2F 0%, #F7A600 100%)" : "transparent"};
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ primary }) => primary ? "0 16px 32px rgba(243, 186, 47, 0.4)" : "none"};
    ${({ primary }) => !primary && `border-color: #F3BA2F;`}
  }

  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 0.9375rem;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
    padding: 14px 28px;
    font-size: 0.9375rem;
  }

  @media (max-width: 480px) {
    padding: 13px 24px;
    font-size: 0.875rem;
  }
`;

interface CTAProps {
  onNavigate: (page: "login" | "create") => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  return (
    <Section>
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Grow Your Wealth?
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join our community of successful investors and start your journey to financial freedom with Amdako Strategies.
        </Description>
        <ButtonGroup>
          <Button
            primary
            onClick={() => onNavigate("create")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get Started
          </Button>
          <Button
            onClick={() => onNavigate("login")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sign In
          </Button>
        </ButtonGroup>
      </Content>
    </Section>
  );
}
