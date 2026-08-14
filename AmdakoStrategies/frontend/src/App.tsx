﻿import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";
import { logOut } from "./lib/auth";

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

export type PageView = "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement";

type AuthUser = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type AuthState = {
  token: string;
  user: AuthUser;
} | null;

export default function App() {
  const [page, setPage] = useState<PageView>("home");
  const [auth, setAuth] = useState<AuthState>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("amdako-auth");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("amdako-auth", JSON.stringify(auth));
      // Keep authenticated users in the portal — land them on dashboard
      setPage((current) => {
        if (current === "home" || current === "about" || current === "contact") {
          return "dashboard";
        }
        return current;
      });
    } else {
      localStorage.removeItem("amdako-auth");
    }
  }, [auth]);

  const handleAuthSuccess = (authState: AuthState) => {
    setAuth(authState);
    setPage("dashboard");
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

  const handleNavigate = (nextPage: PageView) => {
    // Authenticated users should stay in the investor portal — redirect marketing pages to dashboard
    if (auth && (nextPage === "home" || nextPage === "about" || nextPage === "contact")) {
      setPage("dashboard");
      return;
    }
    setPage(nextPage);
  };

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginPage onAuthSuccess={handleAuthSuccess} />;
      case "create":
        return <CreateAccountPage onAuthSuccess={handleAuthSuccess} />;
      case "about":
        return <AboutUsPage />;
      case "contact":
        return <ContactUsPage />;
      case "agreement":
        return auth ? <AgreementFormPage user={auth.user} onNavigate={setPage} /> : <LoginPage onAuthSuccess={handleAuthSuccess} />;
      case "dashboard":
        return auth ? <DashboardPage token={auth.token} user={auth.user} onLogout={handleLogout} onNavigate={setPage} /> : <LoginPage onAuthSuccess={handleAuthSuccess} />;
      default:
        return auth ? (
          <DashboardPage token={auth.token} user={auth.user} onLogout={handleLogout} onNavigate={setPage} />
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

  const isAuthPage = page === "dashboard" || page === "agreement";

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
    </ThemeProvider>
  );
}