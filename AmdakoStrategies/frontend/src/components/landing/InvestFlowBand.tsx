import type { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../theme";

const Band = styled.div`
  position: relative;
  background: linear-gradient(
    165deg,
    ${theme.colors.surface} 0%,
    ${theme.colors.ivory} 35%,
    ${theme.colors.surfaceAlt} 100%
  );

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle at 20% 10%,
      rgba(2, 113, 196, 0.06),
      transparent 45%
    );
    pointer-events: none;
  }

  & > section {
    position: relative;
    z-index: 1;
  }
`;

const Intro = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 72px 24px 8px;
  text-align: center;

  @media (max-width: 768px) {
    padding-top: 56px;
  }

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(1.75rem, 4vw, 2.35rem);
    margin-bottom: 12px;
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.7;
    font-size: 1rem;
  }
`;

type InvestFlowBandProps = {
  children: ReactNode;
};

export default function InvestFlowBand({ children }: InvestFlowBandProps) {
  return (
    <Band>
      <Intro>
        <p className="eyebrow">Investment essentials</p>
        <h2>Plan, projections &amp; official terms</h2>
        <p>
          Review the structured program, model example returns, and policy details before you speak with our team.
        </p>
      </Intro>
      {children}
    </Band>
  );
}
