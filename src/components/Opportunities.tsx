import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 100px 80px;
  background: linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.05) 100%);
`;

const Title = styled.h2`
  font-size: 42px;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 18px;
  opacity: 0.7;
  text-align: center;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  padding: 40px;
  border-radius: 16px;
  background: linear-gradient(135deg,rgba(124,108,246,0.25),rgba(168,85,247,0.25));
  border: 1px solid rgba(124, 108, 246, 0.3);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(168, 85, 247, 0.6);
    background: linear-gradient(135deg,rgba(124,108,246,0.4),rgba(168,85,247,0.4));
  }
  
  h3 {
    font-size: 24px;
    margin-bottom: 12px;
  }
  
  p {
    opacity: 0.7;
    line-height: 1.6;
    font-size: 15px;
    margin-bottom: 20px;
  }
  
  .roi {
    font-size: 18px;
    font-weight: 600;
    color: #a78bfa;
  }
`;

const Button = styled(motion.button)`
  margin-top: 40px;
  padding: 16px 36px;
  border-radius: 12px;
  border: 2px solid rgba(124, 108, 246, 0.5);
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    background: linear-gradient(90deg,#7C6CF6,#A855F7);
    border-color: transparent;
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
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