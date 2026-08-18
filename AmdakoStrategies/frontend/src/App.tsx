﻿import { useEffect, useState, useCallback } from "react";
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
import ContactUsPage from "./pages/ContactUsPage";
import DashboardPage from "./pages/DashboardPage";
import AboutUsPage from "./pages/AboutUsPage";
import AgreementFormPage from "./pages/AgreementFormPage";
import SettingsPage from "./pages/SettingsPage";
import EditProfilePage from "./pages/EditProfilePage";
import InvestmentSetupModal from "./components/InvestmentSetupModal";
import LoadingSpinner from "./components/LoadingSpinner";

export type PageView = "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement" | "settings" | "edit-profile";

export default function App() {
  const [page, setPage] = useState<PageView>("home");
  const [auth, setAuth] = useState<AuthState>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  // Restore Supabase session on mount
  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const session = await getSession();
        if (!mounted) return;

        if (session?.user) {
          const meta = session.user.user_metadata || {};
          const firstName = typeof meta.first_name === "string" ? meta.first_name : "";
          const lastName = typeof meta.last_name === "string" ? meta.last_name : "";
          const fullName = typeof meta.full_name === "string" ? meta.full_name : `${firstName} ${lastName}`.trim();
          const phone = typeof meta.phone === "string" ? meta.phone : "";

          const address = typeof meta.address === "string" ? meta.address : "";
          const location = typeof meta.location === "string" ? meta.location : "";
          const stateOfOrigin = typeof meta.state_of_origin === "string" ? meta.state_of_origin : "";
          const avatarUrl = typeof meta.avatar_url === "string" ? meta.avatar_url : null;

          const authUser: AuthUser = {
            id: session.user.id,
            name: fullName || session.user.email?.split("@")[0] || "",
            firstName,
            lastName,
            phone,
            email: session.user.email || "",
            address,
            location,
            stateOfOrigin,
            monthlyRoi: 10,
            avatar_url: avatarUrl,
          };

          setAuth({
            token: session.access_token,
            user: authUser,
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
        return <LoginPage onAuthSuccess={handleAuthSuccess} />;
      case "create":
        return <CreateAccountPage onSignUpSuccess={handleSignUpSuccess} />;
      case "about":
        return <AboutUsPage />;
      case "contact":
        return <ContactUsPage />;
      case "agreement":
        return auth ? <AgreementFormPage user={auth.user} onNavigate={setPage} /> : <LoginPage onAuthSuccess={handleAuthSuccess} />;
      case "settings":
        return auth ? (
          <SettingsPage
            user={auth.user}
            onNavigate={setPage}
            onAuthUpdate={handleAuthUpdate}
          />
        ) : (
          <LoginPage onAuthSuccess={handleAuthSuccess} />
        );
      case "edit-profile":
        return auth ? (
          <EditProfilePage
            user={auth.user}
            onNavigate={setPage}
            onAuthUpdate={handleAuthUpdate}
          />
        ) : (
          <LoginPage onAuthSuccess={handleAuthSuccess} />
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
          <LoginPage onAuthSuccess={handleAuthSuccess} />
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

  const isAuthPage = page === "dashboard" || page === "agreement" || page === "settings" || page === "edit-profile";

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
      <Navbar
        onNavigate={handleNavigate}
        activePage={page}
        auth={auth}
        onLogout={handleLogout}
      />
      {renderPage()}
      {!isAuthPage && auth ? null : <Footer />}
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
