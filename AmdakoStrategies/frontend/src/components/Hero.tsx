﻿import styled from "styled-components";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, TrendingUp, Lock } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: ${theme.colors.ivory};
  border-bottom: 1px solid ${theme.colors.borderLight};
`;

const GoldLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, ${theme.colors.gold}, ${theme.colors.primary});
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px 90px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 64px;
  align-items: center;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 80px 24px 70px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px 55px;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 50px 16px 45px;
    gap: 36px;
  }
`;

const Left = styled.div`
  max-width: 640px;

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
    margin: 0 auto;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 100px;
  background: ${theme.colors.goldLight};
  border: 1px solid rgba(201, 162, 39, 0.35);
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin-bottom: 28px;
`;

const Title = styled(motion.h1)`
  font-size: 3.2rem;
  line-height: 1.1;
  margin-bottom: 24px;
  color: ${theme.colors.text};
  font-weight: 600;

  .gold {
    color: ${theme.colors.gold};
  }

  @media (max-width: 1200px) {
    font-size: 2.8rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    font-size: 2.05rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  line-height: 1.75;
  color: ${theme.colors.textSecondary};
  margin-bottom: 24px;
  max-width: 560px;

  @media (max-width: 1024px) {
    margin: 0 auto 24px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RegulatoryNote = styled(motion.p)`
  font-size: 0.8125rem;
  color: ${theme.colors.textMuted};
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    margin-bottom: 28px;
  }

  strong {
    color: ${theme.colors.primary};
    font-weight: 600;
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

const Button = styled(motion.a)`
  padding: 15px 30px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primary};
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.button};

  &:hover {
    background: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.buttonHover};
    transform: translateY(-1px);
    color: #fff;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
`;

const SecondaryButton = styled.button`
  padding: 14px 30px;
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
    background: #fff;
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
`;

const Right = styled.div`
  position: relative;

  @media (max-width: 1024px) {
    max-width: 560px;
    margin: 0 auto;
    width: 100%;
  }
`;

const FrameCard = styled(motion.div)`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-top: 3px solid ${theme.colors.gold};
  border-radius: ${theme.radii.large};
  box-shadow: ${theme.shadows.cardHover};
  padding: 32px;
  position: relative;

  @media (max-width: 480px) {
    padding: 24px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 24px;
    width: 80px;
    height: 3px;
    background: ${theme.colors.gold};
    border-radius: 0 0 4px 4px;
  }
`;

const FrameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h4 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px;
    font-weight: 600;
    color: ${theme.colors.text};
  }

  span {
    font-size: 13px;
    color: ${theme.colors.success};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const TermList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
`;

const Term = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const TermIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${theme.radii.small};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TermContent = styled.div`
  p {
    font-size: 12.5px;
    color: ${theme.colors.textMuted};
    margin-bottom: 2px;
    line-height: 1.4;
  }

  h5 {
    font-size: 15px;
    font-weight: 600;
    color: ${theme.colors.text};
    line-height: 1.4;
  }
`;

const FrameFooter = styled.div`
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.medium};
  padding: 14px 16px;

  p {
    font-size: 12.5px;
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

export default function Hero() {
  return (
    <Section>
      <GoldLine />
      <Container>
        <Left>
          <Badge>
            <ShieldCheck size={15} />
            Registered & Regulated in Nigeria
          </Badge>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Strategic Wealth Creation, Digital Finance & Institutional Partnership
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            Amdako Strategy Nig. Ltd. empowers individuals, institutions, governments, and organizations
            through strategic wealth creation, digital finance education, and innovative investment
            opportunities in the digital asset economy.
          </Subtitle>
          <RegulatoryNote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            <strong>AMDAKO STRATEGY NIG. LTD.</strong> — RC. 9560518
          </RegulatoryNote>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <Button href="#investment-plan">
              View Investment Plan
              <ArrowRight size={16} />
            </Button>
            <SecondaryButton onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
              Speak with an Advisor
            </SecondaryButton>
          </ButtonGroup>
        </Left>

        <Right>
          <FrameCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <FrameHeader>
              <h4>Official Investment Terms</h4>
              <span>
                <TrendingUp size={14} />
                10% Monthly ROI
              </span>
            </FrameHeader>
            <TermList>
              <Term>
                <TermIcon>
                  <TrendingUp size={17} />
                </TermIcon>
                <TermContent>
                  <p>Monthly Return</p>
                  <h5>10% of invested capital, paid on the 30th of every month</h5>
                </TermContent>
              </Term>
              <Term>
                <TermIcon>
                  <Lock size={17} />
                </TermIcon>
                <TermContent>
                  <p>Capital Lock Period</p>
                  <h5>Minimum 3 months — flexible, open-ended thereafter</h5>
                </TermContent>
              </Term>
              <Term>
                <TermIcon>
                  <ShieldCheck size={17} />
                </TermIcon>
                <TermContent>
                  <p>Capital Protection</p>
                  <h5>100% protection through verified, risk-controlled trading systems</h5>
                </TermContent>
              </Term>
            </TermList>
            <FrameFooter>
              <p>Minimum investment: ₦750,000 · Referral commission: $30 per successful referral</p>
            </FrameFooter>
          </FrameCard>
        </Right>
      </Container>
    </Section>
  );
}