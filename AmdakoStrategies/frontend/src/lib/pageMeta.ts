import type { PageView } from "../App";

const BASE_TITLE = "Amdako Strategy Nig. Ltd.";

const PAGE_TITLES: Record<PageView, string> = {
  home: "Strategic Wealth Creation & Digital Finance",
  about: "About Us",
  login: "Sign In",
  create: "Create Account",
  contact: "Contact Us",
  dashboard: "Investor Dashboard",
  agreement: "Investment Agreement",
  settings: "Account Settings",
  "edit-profile": "Edit Profile",
  "reset-password": "Reset Password",
};

export function getDocumentTitle(page: PageView): string {
  const section = PAGE_TITLES[page];
  return section ? `${section} | ${BASE_TITLE}` : BASE_TITLE;
}

/** Marketing and focused flows — hide the site footer for a cleaner experience. */
export function shouldShowSiteFooter(page: PageView): boolean {
  const portalOrAuth =
    page === "dashboard" ||
    page === "agreement" ||
    page === "settings" ||
    page === "edit-profile" ||
    page === "login" ||
    page === "create" ||
    page === "reset-password";
  return !portalOrAuth;
}
