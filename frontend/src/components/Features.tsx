import styled from "styled-components";
import { motion } from "framer-motion"; 

const Section = styled.section`
  padding: 120px 100px;
  background: linear-gradient(180deg, rgba(124,108,246,0.05) 0%, transparent 100%);

  @media (max-width: 1200px) {
    padding: 100px 80px;
  }

  @media (max-width: 1024px) {
    padding: 90px 60px;
  }

  @media (max-width: 768px) {
    padding: 70px 30px;
  }

  @media (max-width: 600px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 50px 16px;
  }

  @media (max-width: 360px) {
    padding: 40px 12px;
  }
`;

const Title = styled.h2`
  font-size: 2.75rem;
  margin-bottom: 24px;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 2.5rem;
    margin-bottom: 22px;
  }

  @media (max-width: 1024px) {
    font-size: 2.25rem;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 18px;
  }

  @media (max-width: 600px) {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 1.625rem;
    margin-bottom: 14px;
  }

  @media (max-width: 360px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.75;
  text-align: center;
  margin-bottom: 70px;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1200px) {
    font-size: 1.0625rem;
    margin-bottom: 65px;
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
    margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    font-size: 0.9375rem;
    margin-bottom: 50px;
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
    margin-bottom: 45px;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
    margin-bottom: 40px;
  }

  @media (max-width: 360px) {
    font-size: 0.75rem;
    margin-bottom: 35px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  @media (max-width: 600px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  padding: 45px;
  border-radius: 18px;
  background: rgba(20,26,60,0.6);
  border: 1px solid rgba(124, 108, 246, 0.2);
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
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(124, 108, 246, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(124, 108, 246, 0.15);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(168, 85, 247, 0.15);
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    padding: 40px;
  }

  @media (max-width: 768px) {
    padding: 35px;
  }

  @media (max-width: 600px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 25px;
  }

  @media (max-width: 360px) {
    padding: 20px;
  }
  
  h3 {
    font-size: 1.375rem;
    margin-bottom: 18px;
    position: relative;
    z-index: 1;

    @media (max-width: 1024px) {
      font-size: 1.25rem;
      margin-bottom: 16px;
    }

    @media (max-width: 768px) {
      font-size: 1.1875rem;
      margin-bottom: 14px;
    }

    @media (max-width: 600px) {
      font-size: 1.125rem;
      margin-bottom: 12px;
    }

    @media (max-width: 480px) {
      font-size: 1.0625rem;
      margin-bottom: 10px;
    }

    @media (max-width: 360px) {
      font-size: 1rem;
      margin-bottom: 8px;
    }
  }
  
  p {
    opacity: 0.75;
    line-height: 1.6;
    font-size: 0.9375rem;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8125rem;
    }

    @media (max-width: 360px) {
      font-size: 0.75rem;
    }
  }
`;

const IconBox = styled.div`
  font-size: 56px;
  margin-bottom: 24px;
  display: inline-block;
  background: rgba(168, 85, 247, 0.15);
  padding: 16px;
  border-radius: 12px;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    font-size: 52px;
    margin-bottom: 22px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    font-size: 44px;
    margin-bottom: 18px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
    margin-bottom: 16px;
  }

  @media (max-width: 360px) {
    font-size: 36px;
    margin-bottom: 14px;
  }
`;

export default function Features() {
  const features = [
    {
      icon: "📈",
      title: "High Returns",
      description: "Earn up to 320% annual returns through our diversified portfolio of top-performing Web3 projects."
    },
    {
      icon: "🔒",
      title: "Secure & Transparent",
      description: "Smart contracts audited by leading firms. Real-time blockchain transparency. Your assets, your control."
    },
    {
      icon: "👨‍💼",
      title: "Expert Management",
      description: "Managed by crypto veterans with 15+ years of experience in digital assets and blockchain technology."
    }
  ];

  return (
    <Section>
      <Title>Why Choose Us?</Title>
      <Subtitle>We provide the tools, expertise, and security you need to maximize your Web3 investments</Subtitle>

      <Grid>
        {features.map((feature, idx) => (
          <Card 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <IconBox>{feature.icon}</IconBox>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

