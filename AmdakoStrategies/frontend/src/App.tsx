import { useEffect, useState, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";
import { logOut, getSession } from "./lib/auth";
import type { AuthState, AuthUser } from "./types";

import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InvestmentPlan from "./components/InvestmentPlan";
import ProjectionTable from "./components/ProjectionTable";
import Opportunities from "./components/Opportunities";
import HowToInvest from "./components/HowToInvest";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ContactUsPage from "./pages/ContactUsPage";
import DashboardPage from "./pages/DashboardPage";
import AboutUsPage from "./pages/AboutUsPage";
import AgreementFormPage from "./pages/AgreementFormPage";
import SettingsPage from "./pages/SettingsPage";
import EditProfilePage from "./pages/EditProfilePage";
import InvestmentSetupModal from "./components/InvestmentSetupModal";
import LoadingSpinner from "./components/LoadingSpinner";
import Toast, { type ToastPayload, type ToastVariant } from "./components/Toast";
import SkipToContent from "./components/SkipToContent";
import PageTransition from "./components/PageTransition";
import { getDocumentTitle, shouldShowSiteFooter } from "./lib/pageMeta";
import { supabase } from "./lib/supabase";

export type PageView = "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement" | "settings" | "edit-profile" | "reset-password";

// Map a Supabase session user to our AuthUser shape
function mapSessionUser(sessionUser: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}): AuthUser {
  const meta = sessionUser.user_metadata || {};
  const firstName = typeof meta.first_name === "string" ? meta.first_name : "";
  const lastName = typeof meta.last_name === "string" ? meta.last_name : "";
  const fullName = typeof meta.full_name === "string" ? meta.full_name : `${firstName} ${lastName}`.trim();
  const phone = typeof meta.phone === "string" ? meta.phone : "";

  const address = typeof meta.address === "string" ? meta.address : "";
  const location = typeof meta.location === "string" ? meta.location : "";
  const stateOfOrigin = typeof meta.state_of_origin === "string" ? meta.state_of_origin : "";
  const avatarUrl = typeof meta.avatar_url === "string" ? meta.avatar_url : null;

  return {
    id: sessionUser.id,
    name: fullName || sessionUser.email?.split("@")[0] || "",
    firstName,
    lastName,
    phone,
    email: sessionUser.email || "",
    address,
    location,
    stateOfOrigin,
    monthlyRoi: 10,
    avatar_url: avatarUrl,
  };
}

// Detect Supabase password-recovery link URLs (modern ?token_hash=...&type=recovery or
// legacy #access_token=...&type=recovery), or our own ?reset=1 redirect target.
function isRecoveryLink(loc: { search: string; hash: string }): boolean {
  const params = new URLSearchParams(loc.search);
  return (
    params.get("reset") === "1" ||
    params.get("type") === "recovery" ||
    params.has("token_hash") ||
    loc.hash.includes("type=recovery")
  );
}

export default function App() {
  const [page, setPage] = useState<PageView>("home");
  const [auth, setAuth] = useState<AuthState>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [toast, setToast] = useState<ToastPayload | null>(null);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    setToast({ message, variant });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    document.title = getDocumentTitle(page);
    window.scrollTo(0, 0);
  }, [page]);

  // Subscribe to auth changes so post-reset sign-ins reflect immediately in the app state
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuth({
          token: session.access_token,
          user: mapSessionUser(session.user),
        });
      } else {
        setAuth(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Restore Supabase session on mount
  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        // Recovery email links should land on the password-reset page, never the dashboard
        if (isRecoveryLink(window.location)) {
          setPage("reset-password");
          return;
        }

        const session = await getSession();
        if (!mounted) return;

        if (session?.user) {
          setAuth({
            token: session.access_token,
            user: mapSessionUser(session.user),
          });
          setPage("dashboard");
        }
      } catch (err) {
        console.error("Error restoring session:", err);
      } finally {
        if (mounted) setAuthLoading(false);
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAuthSuccess = (authState: AuthState) => {
    setAuth(authState);
    setPage("dashboard");
  };

  const handleSignUpSuccess = (authState: AuthState) => {
    setAuth(authState);
    setShowInvestmentModal(true);
  };

  const handleInvestmentComplete = () => {
    setShowInvestmentModal(false);
    setPage("dashboard");
    setDashboardRefreshKey((k) => k + 1);
  };

  const handleAuthUpdate = (updatedUser: AuthUser) => {
    setAuth((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        user: updatedUser,
      };
    });
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch {
      // Ignore logout errors and clear local state anyway
    }
    setAuth(null);
    setPage("home");
    showToast("You have been signed out.", "info");
  };

  const handleNavigate = useCallback((nextPage: PageView) => {
    // Authenticated users should stay in the investor portal — redirect marketing pages to dashboard
    if (auth && (nextPage === "home" || nextPage === "about" || nextPage === "contact")) {
      setPage("dashboard");
      return;
    }
    // Refresh dashboard data when navigating to it
    if (nextPage === "dashboard") {
      setDashboardRefreshKey((k) => k + 1);
    }
    setPage(nextPage);
  }, [auth]);

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginPage onAuthSuccess={handleAuthSuccess} onNavigate={handleNavigate} />;
      case "create":
        return <CreateAccountPage onSignUpSuccess={handleSignUpSuccess} onNavigate={handleNavigate} />;
      case "reset-password":
        return <ResetPasswordPage onNavigate={setPage} onShowToast={showToast} />;
      case "about":
        return <AboutUsPage />;
      case "contact":
        return <ContactUsPage />;
      case "agreement":
        return auth ? <AgreementFormPage user={auth.user} onNavigate={setPage} /> : <LoginPage onAuthSuccess={handleAuthSuccess} onNavigate={handleNavigate} />;
      case "settings":
        return auth ? (
          <SettingsPage
            user={auth.user}
            onNavigate={setPage}
            onAuthUpdate={handleAuthUpdate}
          />
        ) : (
          <LoginPage onAuthSuccess={handleAuthSuccess} onNavigate={handleNavigate} />
        );
      case "edit-profile":
        return auth ? (
          <EditProfilePage
            user={auth.user}
            onNavigate={setPage}
            onAuthUpdate={handleAuthUpdate}
          />
        ) : (
          <LoginPage onAuthSuccess={handleAuthSuccess} onNavigate={handleNavigate} />
        );
      case "dashboard":
        return auth ? (
          <DashboardPage
            user={auth.user}
            onLogout={handleLogout}
            onNavigate={setPage}
            refreshKey={dashboardRefreshKey}
          />
        ) : (
          <LoginPage onAuthSuccess={handleAuthSuccess} onNavigate={handleNavigate} />
        );
      default:
        return auth ? (
          <DashboardPage
            user={auth.user}
            onLogout={handleLogout}
            onNavigate={setPage}
            refreshKey={dashboardRefreshKey}
          />
        ) : (
          <>
            <Hero />
            <Features />
            <InvestmentPlan />
            <ProjectionTable />
            <Opportunities />
            <HowToInvest />
            <Testimonials />
            <Stats />
            <CTA onNavigate={setPage} />
          </>
        );
    }
  };

  const showFooter = shouldShowSiteFooter(page);

  if (authLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LoadingSpinner message="Loading..." />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SkipToContent />
      <Toast toast={toast} onDismiss={dismissToast} />
      <Navbar
        onNavigate={handleNavigate}
        activePage={page}
        auth={auth}
        onLogout={handleLogout}
      />
      <main id="main-content" tabIndex={-1}>
        <PageTransition pageKey={page}>{renderPage()}</PageTransition>
      </main>
      {showFooter && <Footer />}
      {showInvestmentModal && auth && (
        <InvestmentSetupModal
          authState={auth}
          onComplete={handleInvestmentComplete}
          onClose={() => setShowInvestmentModal(false)}
        />
      )}
    </ThemeProvider>
  );
}
