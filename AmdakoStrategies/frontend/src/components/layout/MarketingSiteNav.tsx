import { Home, Mail } from "lucide-react";
import type { PageView } from "../../App";
import { SectionTabNav, type TabNavItem } from "./SectionTabNav";

export type MarketingPage = Extract<PageView, "home" | "contact">;

type MarketingSiteNavProps = {
  active: MarketingPage;
  onNavigate: (page: PageView) => void;
};

const MARKETING_ITEMS: TabNavItem<MarketingPage>[] = [
  { id: "home", label: "Home", icon: <Home size={16} aria-hidden /> },
  { id: "contact", label: "Contact", icon: <Mail size={16} aria-hidden /> },
];

export default function MarketingSiteNav({ active, onNavigate }: MarketingSiteNavProps) {
  return (
    <SectionTabNav
      ariaLabel="Site sections"
      items={MARKETING_ITEMS}
      active={active}
      onChange={onNavigate}
    />
  );
}
