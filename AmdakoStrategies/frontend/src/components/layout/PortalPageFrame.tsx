import type { ReactNode } from "react";
import styled from "styled-components";
import type { PageView } from "../../App";
import InvestorPortalNav, { type InvestorPortalPage } from "./InvestorPortalNav";
import { NarrowContainer, PageHeaderBlock, PageShell } from "./pageLayout";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

type PortalPageFrameProps = {
  active: InvestorPortalPage;
  onNavigate: (page: PageView) => void;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  wide?: boolean;
};

const WideContainer = styled.div`
  width: min(1240px, 100%);
  margin: 0 auto;
`;

export default function PortalPageFrame({
  active,
  onNavigate,
  eyebrow,
  title,
  description,
  children,
  wide = false,
}: PortalPageFrameProps) {
  const Container = wide ? WideContainer : NarrowContainer;

  return (
    <PageShell>
      <Container>
        <Frame>
          <InvestorPortalNav active={active} onNavigate={onNavigate} />
          <PageHeaderBlock>
            <div className="eyebrow">{eyebrow}</div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </PageHeaderBlock>
          {children}
        </Frame>
      </Container>
    </PageShell>
  );
}
