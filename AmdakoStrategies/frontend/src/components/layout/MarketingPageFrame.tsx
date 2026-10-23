import type { ReactNode } from "react";
import styled from "styled-components";
import type { PageView } from "../../App";
import MarketingSiteNav, { type MarketingPage } from "./MarketingSiteNav";
import { PageContainer, PageShell } from "./pageLayout";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type MarketingPageFrameProps = {
  active: MarketingPage;
  onNavigate: (page: PageView) => void;
  children: ReactNode;
};

export default function MarketingPageFrame({ active, onNavigate, children }: MarketingPageFrameProps) {
  return (
    <PageShell>
      <PageContainer>
        <Frame>
          <MarketingSiteNav active={active} onNavigate={onNavigate} />
          {children}
        </Frame>
      </PageContainer>
    </PageShell>
  );
}
