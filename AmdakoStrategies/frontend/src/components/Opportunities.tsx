import styled from "styled-components";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { theme } from "../theme";
import type { PageView } from "../App";
import MarketingBanner from "./landing/MarketingBanner";
import referralEarn30 from "../assets/referral-earn-30.jpg";

const Section = styled.section.attrs({ id: "home-partnership" })`
  padding: 56px 0 72px;
  background: ${theme.colors.ivory};
  width: 100%;
  max-width: 100%;
  overflow-x: clip;

  @media (max-width: 768px) {
    padding: 40px 0 56px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
  padding: 0 max(16px, env(safe-area-inset-right, 0)) 0 max(16px, env(safe-area-inset-left, 0));
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 max(24px, env(safe-area-inset-right, 0)) 0 max(24px, env(safe-area-inset-left, 0));
  }
`;

const RegisterButton = styled(motion.button)`
  padding: 14px 28px;
  border-radius: ${theme.radii.medium};
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.buttonHover};
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }
`;

type OpportunitiesProps = {
  onNavigate?: (page: PageView) => void;
};

export default function Opportunities({ onNavigate }: OpportunitiesProps) {
  return (
    <Section>
      <Container>
        <MarketingBanner
          focus="left"
          src={referralEarn30}
          alt="Refer and earn $30 for every client who invests through your referral"
        />
        {onNavigate && (
          <RegisterButton
            type="button"
            onClick={() => onNavigate("create")}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <UserPlus size={18} />
            Register to start referring
          </RegisterButton>
        )}
      </Container>
    </Section>
  );
}
