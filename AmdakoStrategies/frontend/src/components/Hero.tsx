﻿import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import eth from "../assets/eth.png";
import btc from "../assets/btc.png";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 140px 100px;
  min-height: 85vh;
  position: relative;
  background: #0b0e11;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 100px 80px;
  }

  @media (max-width: 1024px) {
    padding: 90px 60px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 70px 30px;
    gap: 50px;
    min-height: 75vh;
  }

  @media (max-width: 600px) {
    padding: 60px 20px;
    gap: 40px;
    min-height: 70vh;
  }

  @media (max-width: 480px) {
    padding: 50px 16px;
    gap: 35px;
  }

  @media (max-width: 360px) {
    padding: 40px 12px;
    gap: 30px;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  background-image: radial-gradient(circle at 2px 2px, rgba(243, 186, 47, 0.05) 1px, transparent 0);
  background-size: 40px 40px;
  pointer-events: none;
`;

const Left = styled.div`
  max-width: 650px;
  flex: 1;

  @media (max-width: 1200px) {
    max-width: 600px;
  }

  @media (max-width: 1024px) {
    max-width: 550px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 1.15;
  margin-bottom: 35px;

  @media (max-width: 1200px) {
    font-size: 3rem;
    margin-bottom: 32px;
  }

  @media (max-width: 1024px) {
    font-size: 2.875rem;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 25px;
  }

  @media (max-width: 600px) {
    font-size: 2.125rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.875rem;
    margin-bottom: 18px;
  }

  @media (max-width: 360px) {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }
`;

const SlideContentCard = styled(motion.div)`
  padding: 45px;
  border-radius: 18px;
  background: rgba(30, 35, 41, 0.7);
  border: 1px solid rgba(243, 186, 47, 0.15);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(243, 186, 47, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: #f3ba2f;
    background: rgba(30, 35, 41, 0.9);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) { padding: 40px; }
  @media (max-width: 768px) { padding: 35px; }
  @media (max-width: 480px) { padding: 25px; }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 45px;
  opacity: 0.85;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 1200px) {
    font-size: 1.1875rem;
    margin-bottom: 42px;
  }

  @media (max-width: 1024px) {
    font-size: 1.125rem;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    font-size: 1.0625rem;
    margin-bottom: 35px;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 0.9375rem;
    margin-bottom: 25px;
  }

  @media (max-width: 360px) {
    font-size: 0.875rem;
    margin-bottom: 20px;
  }
`;

const Gradient = styled.span`
  background: linear-gradient(90deg, #f3ba2f, #f7a600);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const Button = styled(motion.button)`
  padding: 18px 40px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f3ba2f 0%, #f7a600 100%);
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.0625rem;
  transition: 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 32px rgba(243, 186, 47, 0.3);
  }

  @media (max-width: 1024px) {
    padding: 16px 36px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 15px 32px;
    font-size: 0.9375rem;
  }

  @media (max-width: 600px) {
    padding: 14px 28px;
    width: 100%;
    max-width: 300px;
    font-size: 0.9375rem;
  }

  @media (max-width: 480px) {
    padding: 13px 24px;
    max-width: 280px;
    font-size: 0.875rem;
  }

  @media (max-width: 360px) {
    padding: 12px 20px;
    max-width: 260px;
    font-size: 0.8125rem;
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 18px 40px;
  border-radius: 14px;
  background: transparent;
  border: 2px solid rgba(243, 186, 47, 0.3);
  color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.0625rem;
  transition: 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #f3ba2f;
    background: rgba(243, 186, 47, 0.05);
  }

  @media (max-width: 1024px) {
    padding: 16px 36px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 15px 32px;
    font-size: 0.9375rem;
  }

  @media (max-width: 600px) {
    padding: 14px 28px;
    width: 100%;
    max-width: 300px;
    font-size: 0.9375rem;
  }

  @media (max-width: 480px) {
    padding: 13px 24px;
    max-width: 280px;
    font-size: 0.875rem;
  }

  @media (max-width: 360px) {
    padding: 12px 20px;
    max-width: 260px;
    font-size: 0.8125rem;
  }
`;

const Right = styled.div`
  flex: 1;
  max-width: 550px;
  height: 450px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 60% 40%, rgba(243, 186, 47, 0.08), transparent);
  border-radius: 20px;
  border: 1px solid rgba(243, 186, 47, 0.15);
  backdrop-filter: blur(16px);

  @media (max-width: 1200px) {
    max-width: 500px;
    height: 420px;
  }

  @media (max-width: 1024px) {
    max-width: 450px;
    height: 380px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 320px;
  }

  @media (max-width: 600px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 240px;
  }

  @media (max-width: 360px) {
    height: 200px;
  }
`;

const Coin = styled(motion.img)`
  width: 90px;
  position: absolute;
  filter: drop-shadow(0 0 20px rgba(243, 186, 47, 0.3));

  @media (max-width: 1200px) {
    width: 85px;
  }

  @media (max-width: 1024px) {
    width: 80px;
  }

  @media (max-width: 768px) {
    width: 70px;
  }

  @media (max-width: 600px) {
    width: 65px;
  }

  @media (max-width: 480px) {
    width: 60px;
  }

  @media (max-width: 360px) {
    width: 55px;
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 40px;
  left: 100px;
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Dot = styled.div<{ active: boolean }>`
  width: ${props => props.active ? '32px' : '12px'};
  height: 6px;
  border-radius: 3px;
  background: ${props => props.active ? '#f3ba2f' : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s ease;
  cursor: pointer;
`;

const slides = [
  {
    title: <>Redefining the Future of Cryptocurrency Trading in <br/><Gradient>Africa</Gradient></>,
    subtitle: "Unlock unprecedented returns in decentralized finance and blockchain projects. Born from a vision to connect Africa's financial potential to the global digital economy.",
    cta: "Start Investing Now"
  },
  {
    title: <>Strategic Wealth Growth Powered by <br/><Gradient>Data Intelligence</Gradient></>,
    subtitle: "We leverage advanced algorithmic models and real-time analytics to identify profitable opportunities. Calculated growth over reckless trading.",
    cta: "View Strategies"
  },
  {
    title: <>Built on Unmatched <br/><Gradient>Transparency & Trust</Gradient></>,
    subtitle: "Every transaction, every result — open and accountable. Join thousands of investors who trust Amdako with their digital assets.",
    cta: "Create Account"
  }
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
      <Left>
        <AnimatePresence mode="wait">
          <SlideContentCard
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <Title>
              {slides[currentSlide].title}
            </Title>

            <Subtitle>
              {slides[currentSlide].subtitle}
            </Subtitle>

            <ButtonGroup>
              <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {slides[currentSlide].cta}
              </Button>
              <SecondaryButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Learn More
              </SecondaryButton>
            </ButtonGroup>
          </SlideContentCard>
        </AnimatePresence>
      </Left>

      <Right>
        <Coin
          src={eth}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          style={{ top: "20%", left: "20%" }}
        />

        <Coin
          src={btc}
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 7, ease: "easeInOut" }
          }}
          style={{ bottom: "20%", right: "20%" }}
        />
      </Right>

      <CarouselDots>
        {slides.map((_, idx) => (
          <Dot 
            key={idx} 
            active={currentSlide === idx} 
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </CarouselDots>
    </Section>
  );
}
