import type { ReactNode } from "react";
import styled from "styled-components";
import type { PageView } from "../../App";
import HomeSectionNav from "./HomeSectionNav";
import MarketingSiteNav from "./MarketingSiteNav";
import { theme } from "../../theme";
import { PageContainer, PageShell } from "./pageLayout";

const StickyNav = styled.div`
  position: sticky;
  top: 62px;
  z-index: 50;
  padding: 12px 0 4px;
  background: linear-gradient(180deg, ${theme.colors.ivory} 85%, transparent);
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 860px) {
    top: 56px;
  }
`;

type HomePageFrameProps = {
  onNavigate: (page: PageView) => void;
  children: ReactNode;
};

export default function HomePageFrame({ onNavigate, children }: HomePageFrameProps) {
  return (
    <>
      <PageShell style={{ paddingBottom: 0, minHeight: "auto" }}>
        <PageContainer>
          <StickyNav>
            <MarketingSiteNav active="home" onNavigate={onNavigate} />
            <HomeSectionNav />
          </StickyNav>
        </PageContainer>
      </PageShell>
      {children}
    </>
  );
}
