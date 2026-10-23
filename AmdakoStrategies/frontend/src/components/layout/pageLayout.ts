import styled from "styled-components";
import { theme } from "../../theme";

/** Shared page shell for authenticated and marketing routes. */
export const PageShell = styled.section`
  min-height: calc(100vh - 68px);
  padding: 40px 24px 72px;
  background: ${theme.colors.ivory};

  @media (max-width: 768px) {
    padding: 28px 20px 56px;
  }

  @media (max-width: 480px) {
    padding: 20px 16px 48px;
    padding-bottom: max(48px, env(safe-area-inset-bottom));
  }
`;

export const PageContainer = styled.div`
  width: min(1240px, 100%);
  margin: 0 auto;
`;

export const NarrowContainer = styled.div`
  width: min(800px, 100%);
  margin: 0 auto;
`;

export const PageHeaderBlock = styled.div`
  margin-bottom: 20px;

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 8px;
  }

  h2 {
    font-size: clamp(1.35rem, 4vw, 1.75rem);
    margin: 0 0 8px;
    line-height: 1.2;
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
    font-size: 0.9375rem;
    margin: 0;
  }
`;
