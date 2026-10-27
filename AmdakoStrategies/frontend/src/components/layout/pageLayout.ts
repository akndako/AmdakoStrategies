import styled from "styled-components";
import { theme } from "../../theme";

/** Shared page shell for authenticated and marketing routes. */
/** Centered auth / narrow flows (login, reset password). */
export const AuthPageShell = styled.section`
  min-height: calc(100vh - 68px);
  min-height: calc(100dvh - 68px);
  padding: 80px max(16px, env(safe-area-inset-right)) 80px max(16px, env(safe-area-inset-left));
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.ivory};
  overflow-x: clip;

  @media (max-width: 768px) {
    padding-top: 56px;
    padding-bottom: max(56px, env(safe-area-inset-bottom));
  }

  @media (max-width: 480px) {
    padding-top: 40px;
    align-items: flex-start;
  }
`;

/** Marketing-style static pages (about, contact). */
export const MarketingPageShell = styled.section`
  min-height: calc(100vh - 68px);
  padding: 60px max(16px, env(safe-area-inset-right)) 60px max(16px, env(safe-area-inset-left));
  background: ${theme.colors.ivory};
  overflow-x: clip;

  @media (max-width: 768px) {
    padding: 40px max(20px, env(safe-area-inset-right)) 40px max(20px, env(safe-area-inset-left));
  }

  @media (max-width: 480px) {
    padding: 28px max(16px, env(safe-area-inset-right)) max(40px, env(safe-area-inset-bottom))
      max(16px, env(safe-area-inset-left));
  }
`;

export const PageShell = styled.section`
  min-height: calc(100vh - 68px);
  min-height: calc(100dvh - 68px);
  padding: 40px max(16px, env(safe-area-inset-right)) 72px max(16px, env(safe-area-inset-left));
  overflow-x: clip;
  background-color: ${theme.colors.ivory};
  background-image:
    radial-gradient(ellipse 100% 60% at 0% 0%, rgba(2, 113, 196, 0.04), transparent 50%),
    radial-gradient(ellipse 80% 40% at 100% 100%, rgba(201, 162, 39, 0.05), transparent 45%);

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
  min-width: 0;
`;

export const NarrowContainer = styled.div`
  width: min(800px, 100%);
  margin: 0 auto;
  min-width: 0;
`;

/** Horizontal scroll for wide data tables on small screens. */
export const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -2px;
  padding-bottom: 6px;
  max-width: 100%;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 6px;
  }
`;

/** Elevated surface for forms and portal cards */
export const SurfaceCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.card};
  padding: 28px;

  @media (max-width: 480px) {
    padding: 22px;
    border-radius: ${theme.radii.large};
  }
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
