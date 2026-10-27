import styled from "styled-components";
import { theme } from "../../theme";

/** Intrinsic dimensions of hero & referral artwork (keeps layout stable while loading). */
export const MARKETING_BANNER_WIDTH = 1024;
export const MARKETING_BANNER_HEIGHT = 575;

export type BannerFocus = "left" | "center" | "right";

const Outer = styled.div<{ $flush?: boolean }>`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  ${({ $flush }) =>
    $flush
      ? `
    padding-left: env(safe-area-inset-left, 0);
    padding-right: env(safe-area-inset-right, 0);
  `
      : `
    max-width: 1200px;
    margin: 0 auto;
    padding-left: max(16px, env(safe-area-inset-left, 0));
    padding-right: max(16px, env(safe-area-inset-right, 0));

    @media (min-width: 768px) {
      padding-left: max(24px, env(safe-area-inset-left, 0));
      padding-right: max(24px, env(safe-area-inset-right, 0));
    }
  `}
`;

const Figure = styled.figure<{
  $flush?: boolean;
  $focus: BannerFocus;
  $maxWidth?: number;
}>`
  margin: 0;
  width: 100%;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin-left: auto;
  margin-right: auto;
  min-width: 0;
  overflow: hidden;
  border-radius: ${({ $flush }) => ($flush ? 0 : theme.radii.xl)};
  border: ${({ $flush }) => ($flush ? "none" : `1px solid ${theme.colors.borderLight}`)};
  box-shadow: ${({ $flush }) => ($flush ? "none" : theme.shadows.card)};
  background: #fff;
  line-height: 0;
  aspect-ratio: ${MARKETING_BANNER_WIDTH} / ${MARKETING_BANNER_HEIGHT};

  @media (max-width: 640px) {
    border-radius: ${({ $flush }) => ($flush ? 0 : theme.radii.large)};
    /* Slightly taller frame on phones so left-side copy stays readable when cropped */
    aspect-ratio: 4 / 5;
    max-height: min(72vh, 520px);
  }

  @media (max-width: 380px) {
    max-height: min(68vh, 480px);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: ${({ $focus }) => `${$focus} center`};

    @media (max-width: 640px) {
      object-fit: cover;
      object-position: ${({ $focus }) => `${$focus} top`};
    }
  }
`;

type MarketingBannerProps = {
  src: string;
  alt: string;
  flush?: boolean;
  maxWidth?: number;
  /** Where to anchor crop on small screens (artwork text is on the left). */
  focus?: BannerFocus;
  priority?: boolean;
};

export default function MarketingBanner({
  src,
  alt,
  flush,
  maxWidth,
  focus = "left",
  priority,
}: MarketingBannerProps) {
  return (
    <Outer $flush={flush}>
      <Figure $flush={flush} $focus={focus} $maxWidth={maxWidth}>
        <img
          src={src}
          alt={alt}
          width={MARKETING_BANNER_WIDTH}
          height={MARKETING_BANNER_HEIGHT}
          sizes="(max-width: 1200px) 100vw, 1200px"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </Figure>
    </Outer>
  );
}
