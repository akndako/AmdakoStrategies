import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 120px 100px;
  background: linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.05) 100%);

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
  margin-bottom: 50px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin-bottom: 45px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 40px;
  }

  @media (max-width: 600px) {
    gap: 24px;
    margin-bottom: 35px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    margin-bottom: 30px;
  }
`;

const Card = styled(motion.div)`
  padding: 45px;
  border-radius: 18px;
  background: linear-gradient(135deg,rgba(124,108,246,0.25),rgba(168,85,247,0.25));
  border: 1px solid rgba(124, 108, 246, 0.3);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(168, 85, 247, 0.6);
    background: linear-gradient(135deg,rgba(124,108,246,0.4),rgba(168,85,247,0.4));
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
    margin-bottom: 14px;

    @media (max-width: 1024px) {
      font-size: 1.25rem;
      margin-bottom: 12px;
    }

    @media (max-width: 768px) {
      font-size: 1.1875rem;
      margin-bottom: 10px;
    }

    @media (max-width: 600px) {
      font-size: 1.125rem;
      margin-bottom: 8px;
    }

    @media (max-width: 480px) {
      font-size: 1.0625rem;
      margin-bottom: 6px;
    }

    @media (max-width: 360px) {
      font-size: 1rem;
      margin-bottom: 4px;
    }
  }
  
  p {
    opacity: 0.75;
    line-height: 1.6;
    font-size: 0.9375rem;
    margin-bottom: 22px;

    @media (max-width: 768px) {
      font-size: 0.875rem;
      margin-bottom: 20px;
    }

    @media (max-width: 600px) {
      margin-bottom: 18px;
    }

    @media (max-width: 480px) {
      font-size: 0.8125rem;
      margin-bottom: 16px;
    }

    @media (max-width: 360px) {
      font-size: 0.75rem;
      margin-bottom: 14px;
    }
  }
  
  .roi {
    font-size: 1.125rem;
    font-weight: 600;
    color: #a78bfa;

    @media (max-width: 768px) {
      font-size: 1.0625rem;
    }

    @media (max-width: 600px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9375rem;
    }

    @media (max-width: 360px) {
      font-size: 0.875rem;
    }
  }
`;

const Button = styled(motion.button)`
  margin-top: 50px;
  padding: 18px 42px;
  border-radius: 16px;
  border: 2px solid rgba(124, 108, 246, 0.6);
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 1.0625rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    background: linear-gradient(90deg,#7C6CF6,#A855F7);
    border-color: transparent;
  }
  
  @media (max-width: 1024px) {
    margin-top: 45px;
    padding: 16px 38px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 15px 34px;
    font-size: 0.9375rem;
  }

  @media (max-width: 600px) {
    margin-top: 35px;
    padding: 14px 30px;
    width: 100%;
    max-width: 320px;
    font-size: 0.9375rem;
  }

  @media (max-width: 480px) {
    margin-top: 30px;
    padding: 13px 26px;
    max-width: 300px;
    font-size: 0.875rem;
  }

  @media (max-width: 360px) {
    margin-top: 25px;
    padding: 12px 22px;
    max-width: 280px;
    font-size: 0.8125rem;
  }
`;

export default function Opportunities() {
  const opportunities = [
    {
      title: "🏦 DeFi Projects",
      description: "Yield farming, lending protocols, and liquidity provision. Capture value from the fastest-growing DeFi ecosystem.",
      roi: "Avg. 45-85% APY"
    },
    {
      title: "🎨 NFT Ventures",
      description: "Strategic investments in blue-chip NFT collections and emerging digital assets with real utility.",
      roi: "Avg. 120-200% annual"
    },
    {
      title: "🎮 Metaverse & Gaming",
      description: "Early-stage gaming platforms and metaverse projects reshaping digital entertainment and social interaction.",
      roi: "Avg. 150-320% potential"
    }
  ];

  return (
    <Section>
      <Title>Investment Opportunities</Title>
      <Subtitle>Diversify your portfolio with our carefully curated Web3 investment categories</Subtitle>

      <Grid>
        {opportunities.map((opp, idx) => (
          <Card 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{opp.title}</h3>
            <p>{opp.description}</p>
            <div className="roi">{opp.roi}</div>
          </Card>
        ))}
      </Grid>

      <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Explore All Investment Opportunities
      </Button>
    </Section>
  );
}