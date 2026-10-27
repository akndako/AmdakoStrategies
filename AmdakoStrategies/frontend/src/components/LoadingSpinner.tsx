import styled, { keyframes } from "styled-components";
import { theme } from "../theme";
import logoImage from "../assets/amdakostrategies.jpeg";

const breathe = keyframes`
  0%, 100% {
    transform: scale(0.9);
    opacity: 0.88;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
`;

const ringPulse = keyframes`
  0%, 100% {
    opacity: 0.35;
    transform: scale(0.96);
  }
  50% {
    opacity: 0.85;
    transform: scale(1);
  }
`;

/** Animated company logo — max 50×40px (compact: 26×20 for buttons). */
export const LogoLoader = styled(
  ({ compact = false, className }: { compact?: boolean; className?: string }) => (
    <span className={className} role="img" aria-hidden="true">
      <img src={logoImage} alt="" />
    </span>
  ),
)<{ compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ compact }) => (compact ? 28 : 50)}px;
  height: ${({ compact }) => (compact ? 22 : 40)}px;
  max-width: 50px;
  max-height: 40px;
  flex-shrink: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${theme.radii.small};
    border: 1px solid rgba(2, 113, 196, 0.22);
    animation: ${ringPulse} 1.6s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      opacity: 0.5;
    }
  }

  img {
    position: relative;
    z-index: 1;
    display: block;
    max-width: ${({ compact }) => (compact ? 26 : 50)}px;
    max-height: ${({ compact }) => (compact ? 20 : 40)}px;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
    animation: ${breathe} 1.6s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      opacity: 1;
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.45;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 10px;
  }
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 200px;
  padding: 24px;
  color: ${theme.colors.textSecondary};
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
`;

const InlineOnly = styled.span`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
`;

export type LoadingSpinnerProps = {
  message?: string;
  /** Full-page or card-centered layout */
  layout?: "row" | "center";
  /** Smaller logo for buttons and inline actions */
  compact?: boolean;
  /** Icon only (no message), e.g. inside a button */
  iconOnly?: boolean;
};

export default function LoadingSpinner({
  message = "Loading...",
  layout = "row",
  compact = false,
  iconOnly = false,
}: LoadingSpinnerProps) {
  const statusLabel = message || "Loading";

  if (iconOnly) {
    return (
      <InlineOnly role="status" aria-live="polite" aria-busy="true" aria-label={statusLabel}>
        <LogoLoader compact={compact || true} />
      </InlineOnly>
    );
  }

  if (layout === "center") {
    return (
      <Centered role="status" aria-live="polite" aria-busy="true">
        <LogoLoader compact={compact} />
        <span>{message}</span>
      </Centered>
    );
  }

  return (
    <Row role="status" aria-live="polite" aria-busy="true">
      <LogoLoader compact={compact} />
      <span>{message}</span>
    </Row>
  );
}
