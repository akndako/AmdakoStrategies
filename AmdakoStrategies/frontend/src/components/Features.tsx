import styled from "styled-components";
import { motion } from "framer-motion";
import { Target, Eye, Building2, ShieldCheck } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
  padding: 100px 24px;
  background: ${theme.colors.surface};

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
  max-width: 680px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 45px;
  }
`;

const Eyebrow = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.gold};
  margin-bottom: 14px;
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

const IntroCard = styled(motion.div)`
  background: ${theme.colors.ivory};
  border: 1px solid ${theme.colors.borderLight};
  border-left: 3px solid ${theme.colors.gold};
  border-radius: ${theme.radii.large};
  padding: 36px 40px;
  margin-bottom: 48px;
  position: relative;

  @media (max-width: 768px) {
    padding: 28px 24px;
    margin-bottom: 38px;
  }

  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px;
    color: ${theme.colors.primary};
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.8;
    font-size: 0.975rem;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  strong {
    color: ${theme.colors.primary};
    font-weight: 600;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const Card = styled(motion.div)`
  padding: 38px 34px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.gold};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-3px);
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
  margin-bottom: 22px;
  border: 1px solid rgba(2, 113, 196, 0.1);
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
  line-height: 1.75;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

export default function Features() {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Who We Are</Eyebrow>
          <Title>Strategic Wealth Creation & Digital Finance</Title>
          <Subtitle>
            A Strategic Wealth Creation, Digital Finance and Institutional Partnership Company — empowering
            individuals, institutions, governments, and organizations through sustainable economic growth.
          </Subtitle>
        </Header>

        <IntroCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>
            <Building2 size={20} />
            Company Overview
          </h3>
          <p>
            <strong>Amdako Strategy Nig. Ltd. (RC. 9560518)</strong> is a forward-thinking cryptocurrency
            trading and investment company dedicated to generating consistent profits through advanced crypto
            market analysis, spot trading, and disciplined risk management.
          </p>
          <p>
            Our team of experienced traders and analysts ensures investors enjoy steady returns while maintaining
            the safety and integrity of their invested capital.
          </p>
        </IntroCard>

        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <Target size={24} />
            </IconBox>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              To empower individuals, institutions, governments, and organizations through strategic wealth
              creation, digital finance education, and innovative investment opportunities.
            </CardDescription>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <Eye size={24} />
            </IconBox>
            <CardTitle>Our Vision</CardTitle>
            <CardDescription>
              To become Africa's most trusted strategic financial ecosystem connecting governments, institutions,
              businesses, and communities to sustainable economic growth.
            </CardDescription>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <ShieldCheck size={24} />
            </IconBox>
            <CardTitle>Risk-Controlled Approach</CardTitle>
            <CardDescription>
              We focus on controlled exposure, capital preservation, and disciplined risk management. Our emphasis
              is calculated growth through strategic analysis — never reckless or unmanaged trading.
            </CardDescription>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <Building2 size={24} />
            </IconBox>
            <CardTitle>Institutional Partnership</CardTitle>
            <CardDescription>
              We connect governments, institutions, businesses, and communities to innovative investment
              opportunities across Africa's rapidly evolving digital finance landscape.
            </CardDescription>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}