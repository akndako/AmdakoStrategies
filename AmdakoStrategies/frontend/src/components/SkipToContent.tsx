import styled from "styled-components";
import { theme } from "../theme";

const Link = styled.a`
  position: absolute;
  left: 16px;
  top: -100px;
  z-index: 1001;
  padding: 12px 18px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: ${theme.shadows.button};
  transition: top 0.2s ease;

  &:focus {
    top: 16px;
    outline: 3px solid ${theme.colors.gold};
    outline-offset: 2px;
  }
`;

export default function SkipToContent() {
  return <Link href="#main-content">Skip to main content</Link>;
}
