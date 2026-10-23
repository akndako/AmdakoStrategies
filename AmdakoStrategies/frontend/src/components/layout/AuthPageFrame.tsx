import type { ReactNode } from "react";
import styled from "styled-components";
import type { PageView } from "../../App";
import AuthFlowNav, { type AuthFlowPage } from "./AuthFlowNav";
import { NarrowContainer, PageShell } from "./pageLayout";

const Frame = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

type AuthPageFrameProps = {
  active: AuthFlowPage;
  onNavigate: (page: PageView) => void;
  children: ReactNode;
};

export default function AuthPageFrame({ active, onNavigate, children }: AuthPageFrameProps) {
  return (
    <PageShell style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <NarrowContainer style={{ width: "100%" }}>
        <Frame>
          <AuthFlowNav active={active} onNavigate={onNavigate} />
          {children}
        </Frame>
      </NarrowContainer>
    </PageShell>
  );
}
