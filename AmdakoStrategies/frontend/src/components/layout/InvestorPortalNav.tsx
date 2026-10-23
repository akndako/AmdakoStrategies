import {
  LayoutDashboard,
  FileText,
  User,
  Settings,
} from "lucide-react";
import type { PageView } from "../../App";
import { SectionTabNav, type TabNavItem } from "./SectionTabNav";

export type InvestorPortalPage = Extract<
  PageView,
  "dashboard" | "agreement" | "edit-profile" | "settings"
>;

type InvestorPortalNavProps = {
  active: InvestorPortalPage;
  onNavigate: (page: PageView) => void;
};

const PORTAL_ITEMS: TabNavItem<InvestorPortalPage>[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} aria-hidden /> },
  { id: "agreement", label: "Agreement", icon: <FileText size={16} aria-hidden /> },
  { id: "edit-profile", label: "Profile", icon: <User size={16} aria-hidden /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} aria-hidden /> },
];

export default function InvestorPortalNav({ active, onNavigate }: InvestorPortalNavProps) {
  return (
    <SectionTabNav
      ariaLabel="Investor portal"
      items={PORTAL_ITEMS}
      active={active}
      onChange={onNavigate}
    />
  );
}
