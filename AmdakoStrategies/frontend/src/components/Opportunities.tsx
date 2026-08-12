import styled from "styled-components";
import { motion } from "framer-motion";
import { BarChart3, Briefcase, Link2, ArrowRight } from "lucide-react";
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

const Header = styled.div`
  text-align: center;
  max-width: 650px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 45px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.0625rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: 18px;
  }
`;

const Card = styled(motion.div)`
  padding: 36px 30px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
  }

  @media (max-width: 600px) {
    padding: 28px 22px;
  }
`;

const IconBox = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: ${theme.colors.text};

  @media (max-width: 600px) {
    font-size: 1.125rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9375rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.65;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  background: ${theme.colors.primaryLight};
  padding: 6px 12px;
  border-radius: 100px;
`;

const Button = styled(motion.button)`
  margin-top: 50px;
  padding: 14px 32px;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${theme.colors.border};
  background: transparent;
  color: ${theme.colors.text};
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 320px;
    justify-content: center;
    margin-top: 40px;
  }
`;

export default function Opportunities() {
  const opportunities = [
    {
      icon: BarChart3,
      title: "Crypto Trading",
      description:
        "Advanced algorithmic models and real-time market analytics to identify profitable opportunities across Bitcoin, Ethereum, and emerging altcoins.",
      tag: "Intelligent Systems",
    },
    {
      icon: Briefcase,
      title: "Asset Management",
      description:
        "Professional management combining human expertise with AI-driven insight to minimize risks and maximize returns.",
      tag: "Expert Insight",
    },
    {
      icon: Link2,
      title: "Blockchain Investment",
      description:
        "Strategic entry into high-potential projects to bridge Africa's financial potential with global digital markets.",
      tag: "Global Perspective",
    },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <Title>Investment Opportunities</Title>
          <Subtitle>
            Explore our range of professionally managed investment strategies designed for sustainable growth.
          </Subtitle>
        </Header>

        <Grid>
          {opportunities.map((opp, idx) => {
            const Icon = opp.icon;
            return (
              <Card
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <IconBox>
                  <Icon size={24} />
                </IconBox>
                <CardTitle>{opp.title}</CardTitle>
                <CardDescription>{opp.description}</CardDescription>
                <Tag>{opp.tag}</Tag>
              </Card>
            );
          })}
        </Grid>

        <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Explore All Investment Opportunities
          <ArrowRight size={16} />
        </Button>
      </Container>
    </Section>
  );
}