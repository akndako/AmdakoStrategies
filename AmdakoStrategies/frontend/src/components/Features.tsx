import styled from "styled-components";
import { motion } from "framer-motion";
import { LineChart, ShieldCheck, Target, Eye } from "lucide-react";
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
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const Card = styled(motion.div)`
  padding: 32px 28px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-3px);
  }

  @media (max-width: 600px) {
    padding: 26px 22px;
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 10px;
  color: ${theme.colors.text};

  @media (max-width: 600px) {
    font-size: 1.0625rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9375rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.65;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

export default function Features() {
  const features = [
    {
      icon: LineChart,
      title: "Data-Driven Edge",
      description:
        "We leverage advanced algorithmic models to identify profitable trading opportunities across Bitcoin and emerging altcoins.",
    },
    {
      icon: ShieldCheck,
      title: "Risk Management",
      description:
        "Calculated growth through controlled exposure and capital preservation. We prioritize strategic analysis over emotional trading.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower individuals and businesses with the tools and opportunities to profit confidently in the digital asset world.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become Africa's most trusted cryptocurrency platform where innovation meets integrity and shared success.",
    },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <Title>Why Investors Are Choosing Amdako Strategy Nig. Ltd.</Title>
          <Subtitle>
            We combine human expertise with AI-driven insights to minimize risks and maximize returns, ensuring a stable and intelligent investment experience.
          </Subtitle>
        </Header>

        <Grid>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <IconBox>
                  <Icon size={22} />
                </IconBox>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}