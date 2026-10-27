import Hero from "./Hero";
import InvestmentPlan from "./InvestmentPlan";
import ProjectionTable from "./ProjectionTable";
import Opportunities from "./Opportunities";
import HowToInvest from "./HowToInvest";
import CTA from "./CTA";
import TrustRibbon from "./landing/TrustRibbon";
import LandingSectionNav from "./landing/LandingSectionNav";
import InvestFlowBand from "./landing/InvestFlowBand";
import type { PageView } from "../App";

type MarketingHomeProps = {
  onNavigate: (page: PageView) => void;
  isAuthenticated?: boolean;
};

export default function MarketingHome({ onNavigate, isAuthenticated }: MarketingHomeProps) {
  return (
    <>
      <Hero
        isAuthenticated={isAuthenticated}
        onOpenDashboard={() => onNavigate("dashboard")}
        onNavigate={onNavigate}
      />
      <TrustRibbon />
      <LandingSectionNav />

      <InvestFlowBand>
        <InvestmentPlan flush />
        <ProjectionTable flush />
      </InvestFlowBand>

      <Opportunities onNavigate={onNavigate} />
      <HowToInvest />
      <CTA onNavigate={onNavigate} />
    </>
  );
}
