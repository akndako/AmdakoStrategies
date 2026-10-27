import Hero from "./Hero";
import InvestmentPlan from "./InvestmentPlan";
import ProjectionTable from "./ProjectionTable";
import Opportunities from "./Opportunities";
import HowToInvest from "./HowToInvest";
import CTA from "./CTA";
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

      <InvestmentPlan flush />
      <ProjectionTable flush />

      <Opportunities onNavigate={onNavigate} />
      <HowToInvest />
      <CTA onNavigate={onNavigate} />
    </>
  );
}
