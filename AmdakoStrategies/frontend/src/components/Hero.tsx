﻿import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #F8F9FF 0%, #FFFFFF 100%);
  border-bottom: 1px solid ${theme.colors.borderLight};
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: radial-gradient(circle at 1px 1px, rgba(99, 91, 255, 0.06) 1px, transparent 0);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 100px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 50px;
    padding: 90px 24px 80px;
  }

  @media (max-width: 768px) {
    padding: 70px 20px 60px;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px 50px;
    gap: 35px;
  }
`;

const Left = styled.div`
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 100px;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Title = styled(motion.h1)`
  font-size: 3.25rem;
  line-height: 1.1;
  margin-bottom: 24px;
  color: ${theme.colors.text};

  @media (max-width: 1200px) {
    font-size: 2.9rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.85rem;
  }
`;

const Gradient = styled.span`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  margin-bottom: 36px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button)`
  padding: 14px 28px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primary};
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.button};

  &:hover {
    background: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.buttonHover};
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 14px 28px;
  border-radius: ${theme.radii.medium};
  background: transparent;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.surfaceAlt};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

const Right = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const DashboardMock = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.cardHover};
  padding: 28px;
  position: relative;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const MockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h4 {
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.textSecondary};
  }

  span {
    font-size: 13px;
    color: ${theme.colors.success};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const MockBalance = styled.div`
  margin-bottom: 24px;

  p {
    font-size: 13px;
    color: ${theme.colors.textMuted};
    margin-bottom: 6px;
  }

  h3 {
    font-size: 32px;
    font-weight: 700;
    color: ${theme.colors.text};
  }
`;

const MockChart = styled.div`
  height: 120px;
  border-radius: ${theme.radii.medium};
  background: linear-gradient(180deg, ${theme.colors.primaryLight} 0%, transparent 100%);
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const MockStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const MockStat = styled.div`
  padding: 14px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.borderLight};

  p {
    font-size: 12px;
    color: ${theme.colors.textMuted};
    margin-bottom: 4px;
  }

  h5 {
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.text};
  }
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.medium};
  box-shadow: ${theme.shadows.cardHover};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

const FloatingIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
`;

const FloatingText = styled.div`
  p {
    font-size: 12px;
    color: ${theme.colors.textMuted};
  }

  h5 {
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.text};
  }
`;

const CarouselDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const Dot = styled.div<{ active: boolean }>`
  width: ${(props) => (props.active ? "28px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background: ${(props) => (props.active ? theme.colors.primary : theme.colors.border)};
  transition: all 0.3s ease;
  cursor: pointer;
`;

const slides = [
  {
    title: (
      <>
        Redefining the Future of Cryptocurrency Trading in <Gradient>Africa</Gradient>
      </>
    ),
    subtitle:
      "Unlock unprecedented returns in decentralized finance and blockchain projects. Born from a vision to connect Africa's financial potential to the global digital economy.",
    cta: "Start Investing Now",
  },
  {
    title: (
      <>
        Strategic Wealth Growth Powered by <Gradient>Data Intelligence</Gradient>
      </>
    ),
    subtitle:
      "We leverage advanced algorithmic models and real-time analytics to identify profitable opportunities. Calculated growth over reckless trading.",
    cta: "View Strategies",
  },
  {
    title: (
      <>
        Built on Unmatched <Gradient>Transparency & Trust</Gradient>
      </>
    ),
    subtitle:
      "Every transaction, every result — open and accountable. Join thousands of investors who trust Amdako with their digital assets.",
    cta: "Create Account",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section>
      <BackgroundPattern />
      <Container>
        <Left>
          <Badge>
            <ShieldCheck size={14} />
            Trusted Investment Platform
          </Badge>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Title>{slides[currentSlide].title}</Title>
              <Subtitle>{slides[currentSlide].subtitle}</Subtitle>
              <ButtonGroup>
                <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {slides[currentSlide].cta}
                  <ArrowRight size={16} />
                </Button>
                <SecondaryButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Learn More
                </SecondaryButton>
              </ButtonGroup>
            </motion.div>
          </AnimatePresence>
          <CarouselDots>
            {slides.map((_, idx) => (
              <Dot key={idx} active={currentSlide === idx} onClick={() => setCurrentSlide(idx)} />
            ))}
          </CarouselDots>
        </Left>

        <Right>
          <DashboardMock
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MockHeader>
              <h4>Portfolio Overview</h4>
              <span>
                <TrendingUp size={14} />
                +12.4%
              </span>
            </MockHeader>
            <MockBalance>
              <p>Total Balance</p>
              <h3>$10,000.00</h3>
            </MockBalance>
            <MockChart />
            <MockStats>
              <MockStat>
                <p>ROI</p>
                <h5>120%</h5>
              </MockStat>
              <MockStat>
                <p>Investors</p>
                <h5>20+</h5>
              </MockStat>
              <MockStat>
                <p>Success</p>
                <h5>98.7%</h5>
              </MockStat>
            </MockStats>
          </DashboardMock>

          <FloatingCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ top: "10%", left: "-8%" }}
          >
            <FloatingIcon>
              <BarChart3 size={18} />
            </FloatingIcon>
            <FloatingText>
              <p>Monthly Growth</p>
              <h5>+10% ROI</h5>
            </FloatingText>
          </FloatingCard>

          <FloatingCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ bottom: "8%", right: "-6%" }}
          >
            <FloatingIcon>
              <ShieldCheck size={18} />
            </FloatingIcon>
            <FloatingText>
              <p>Security</p>
              <h5>Fully Protected</h5>
            </FloatingText>
          </FloatingCard>
        </Right>
      </Container>
    </Section>
  );
}