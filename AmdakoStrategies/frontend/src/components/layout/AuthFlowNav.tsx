import { LogIn, UserPlus, KeyRound } from "lucide-react";
import type { PageView } from "../../App";
import { SectionTabNav, type TabNavItem } from "./SectionTabNav";

export type AuthFlowPage = Extract<PageView, "login" | "create" | "reset-password">;

type AuthFlowNavProps = {
  active: AuthFlowPage;
  onNavigate: (page: PageView) => void;
};

const AUTH_ITEMS: TabNavItem<AuthFlowPage>[] = [
  { id: "login", label: "Sign in", icon: <LogIn size={16} aria-hidden /> },
  { id: "create", label: "Create account", icon: <UserPlus size={16} aria-hidden /> },
  { id: "reset-password", label: "Reset password", icon: <KeyRound size={16} aria-hidden /> },
];

export default function AuthFlowNav({ active, onNavigate }: AuthFlowNavProps) {
  return (
    <SectionTabNav
      ariaLabel="Account access"
      items={AUTH_ITEMS}
      active={active}
      onChange={onNavigate}
    />
  );
}
