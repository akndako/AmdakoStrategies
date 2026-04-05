import styled from "styled-components";
import { motion } from "framer-motion"; 

const Section = styled.section`
  padding: 100px 80px;
  background: linear-gradient(180deg, rgba(124,108,246,0.05) 0%, transparent 100%);
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
  background: rgba(20,26,60,0.6);
  border: 1px solid rgba(124, 108, 246, 0.2);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(124, 108, 246, 0.15);
  }
  
  h3 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  p {
    opacity: 0.7;
    line-height: 1.6;
    font-size: 16px;
  }
`;

const IconBox = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
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

