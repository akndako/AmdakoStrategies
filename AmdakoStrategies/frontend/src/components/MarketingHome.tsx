import Hero from "./Hero";
import ProjectionTable from "./ProjectionTable";
import Opportunities from "./Opportunities";
import Testimonials from "./Testimonials";
import HowToInvest from "./HowToInvest";
import CTA from "./CTA";
import type { PageView } from "../App";

type MarketingHomeProps = {
  onNavigate: (page: PageView) => void;
  isAuthenticated?: boolean;
};

export default function MarketingHome({ onNavigate }: MarketingHomeProps) {
  return (
    <>
      <Hero />

      <ProjectionTable flush />
      <Testimonials />

      <Opportunities />
      <HowToInvest />
      <CTA onNavigate={onNavigate} />
    </>
  );
}
