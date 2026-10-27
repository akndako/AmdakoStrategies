import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, UserPlus } from "lucide-react";
import type { PageView } from "../App";
import { theme } from "../theme";
import MarketingBanner from "./landing/MarketingBanner";
import heroGrowWealth from "../assets/hero-grow-wealth.jpg";

const Section = styled.section.attrs({ id: "home-top" })`
  position: relative;
  background: ${theme.colors.ivory};
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
`;

const GoldLine = styled.div`
  height: 3px;
  background: linear-gradient(90deg, ${theme.colors.gold}, ${theme.colors.primary});
`;

const ActionBar = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    padding: 16px max(16px, env(safe-area-inset-right, 0)) 28px
      max(16px, env(safe-area-inset-left, 0));
    flex-direction: column;
  }
`;

const Button = styled.a`
  padding: 12px 22px;
  border-radius: ${theme.radii.medium};
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${theme.colors.primary};
  color: #fff;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.buttonHover};
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
`;

const SecondaryButton = styled.button`
  padding: 12px 22px;
  border-radius: ${theme.radii.medium};
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.border};

  &:hover {
    background: ${theme.colors.primaryLight};
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
`;

const FinePrint = styled.p`
  width: 100%;
  text-align: center;
  font-size: 11px;
  color: ${theme.colors.textMuted};
  margin: 4px 0 0;
`;

type HeroProps = {
  isAuthenticated?: boolean;
  onOpenDashboard?: () => void;
  onNavigate?: (page: PageView) => void;
};

export default function Hero({ isAuthenticated, onOpenDashboard, onNavigate }: HeroProps) {
  return (
    <Section>
      <GoldLine />
      <MarketingBanner
        flush
        maxWidth={1024}
        priority
        focus="left"
        src={heroGrowWealth}
        alt="Grow your wealth with smart investments — competitive monthly returns and secure plans"
      />
      <ActionBar
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Button href="#investment-plan">
          View plan &amp; ROI
          <ArrowRight size={16} />
        </Button>
        {isAuthenticated && onOpenDashboard ? (
          <SecondaryButton type="button" onClick={onOpenDashboard}>
            <LayoutDashboard size={16} />
            Dashboard
          </SecondaryButton>
        ) : onNavigate ? (
          <>
            <SecondaryButton type="button" onClick={() => onNavigate("create")}>
              <UserPlus size={16} />
              Register
            </SecondaryButton>
            <SecondaryButton type="button" onClick={() => onNavigate("login")}>
              Sign in
            </SecondaryButton>
          </>
        ) : null}
        <FinePrint>RC. 9560518 · From ₦750,000 minimum</FinePrint>
      </ActionBar>
    </Section>
  );
}
