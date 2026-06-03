﻿import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";

import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Opportunities from "./components/Opportunities";
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
    } else {
      localStorage.removeItem("amdako-auth");
    }
  }, [auth]);

  const handleAuthSuccess = (authState: AuthState) => {
    setAuth(authState);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setAuth(null);
    setPage("home");
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
        return (
          <>
            <Hero />
            <Features />
            <Testimonials />
            <Opportunities />
            <Stats />
            <CTA onNavigate={setPage} />
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar
        onNavigate={(nextPage) => setPage(nextPage)}
        activePage={page}
        auth={auth}
        onLogout={handleLogout}
      />
      {renderPage()}
      <Footer />
    </ThemeProvider>
  );
}
