import styled from "styled-components";
import { motion } from "framer-motion";
import eth from "../assets/eth.png";
import btc from "../assets/btc.png";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 120px 100px;
  min-height: 85vh;
  position: relative;

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
    font-size: 3.125rem;
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

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 45px;
  opacity: 0.85;

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
  background: linear-gradient(90deg,#a78bfa,#f472b6);
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
  background: linear-gradient(90deg,#7C6CF6,#A855F7);
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.0625rem;
  transition: 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
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
  border: 2px solid rgba(124, 108, 246, 0.6);
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.0625rem;
  transition: 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: rgba(168, 85, 247, 1);
    background: rgba(168, 85, 247, 0.1);
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
  background: radial-gradient(circle at 60% 40%, rgba(168, 85, 247, 0.15), transparent);
  border-radius: 20px;
  border: 1px solid rgba(168, 85, 247, 0.2);
  backdrop-filter: blur(8px);

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
  filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.4));

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

export default function Hero() {
  return (
    <Section>
      <Left>
        <Title
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Redefining the Future of Cryptocurrency Trading in 

           <Gradient>Africa</Gradient> 
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Unlock unprecedented returns in decentralized finance, NFT ventures, and next-generation blockchain projects. Join thousands of investors already profiting.
        </Subtitle>

        <ButtonGroup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button whileHover={{ scale: 1.05 }}>
            Start Investing in Crypto Now
          </Button>
          <SecondaryButton whileHover={{ scale: 1.05 }}>
            Learn More
          </SecondaryButton>
        </ButtonGroup>
      </Left>

      <Right>
        <Coin
          src={eth}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          style={{ top: "20%", left: "20%" }}
        />

        <Coin
          src={btc}
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          style={{ bottom: "20%", right: "20%" }}
        />
      </Right>
    </Section>
  );
}
