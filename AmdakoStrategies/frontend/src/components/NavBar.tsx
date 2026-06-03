﻿import { useState } from "react";
import styled from "styled-components";

type NavbarProps = {
  activePage: "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement";
  auth: { token: string; user: { id: string; name: string; firstName: string; lastName: string; phone: string; email: string } } | null;
  onNavigate: (page: "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement") => void;
  onLogout: () => void;
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;

  background: rgba(11, 14, 17, 0.95); /* Darker background to match Hero */
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: all 0.3s ease;

  &:hover {
    border-bottom-color: rgba(243, 186, 47, 0.15); /* Gold hover border */
  }

  @media (max-width: 1024px) {
    padding: 20px 40px;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
  }

  @media (max-width: 600px) {
    padding: 14px 18px;
  }

  @media (max-width: 760px) {
    flex-direction: column;
    gap: 18px;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    gap: 12px;
  }
`;

const Brand = styled.h3`
  font-size: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0; /* Remove margin */
  background: linear-gradient(135deg, #f3ba2f, #f7a600); /* Gold gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  @media (max-width: 760px) {
    display: none;
  }

  @media (max-width: 600px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 18px;
  border-radius: 10px;
  border: ${({ primary }) =>
    primary ? "none" : "1px solid rgba(243, 186, 47, 0.3)"}; /* Gold border for secondary */
  background: ${({ primary }) =>
    primary
      ? "linear-gradient(135deg, #f3ba2f, #f7a600)" /* Gold gradient for primary */
      : "transparent"};
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ primary }) => primary ? "0 8px 24px rgba(243, 186, 47, 0.3)" : "0 8px 24px rgba(255, 255, 255, 0.05)"}; /* Gold shadow for primary */
    ${({ primary }) => !primary && "border-color: #f3ba2f;"} /* Gold border on hover for secondary */
  }

  @media (max-width: 600px) {
    padding: 9px 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 14px;
    width: 100%;
    max-width: 240px;
  }
`;

const MenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px; /* Consistent border-radius */
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(30, 35, 41, 0.85); /* Darker background */
  color: white;
  cursor: pointer;
  font-size: 1.3rem;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: scale(1.03); /* Slight scale on hover */
    background: rgba(243, 186, 47, 0.95); /* Gold background on hover */
  }

  @media (max-width: 760px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: static;
  width: 100%;
  margin-top: 12px;
  background: rgba(10, 10, 25, 0.99);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 15;

  @media (min-width: 761px) {
    display: none;
  }
`;

const MobileAction = styled(Button)`
  width: 100%;
  max-width: none;
`;

export default function Navbar({ activePage, auth, onNavigate, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (page: "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement") => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <Container>
      <Brand>AMDAKOSTRATEGIES</Brand>

      <Actions>
        {!auth && (
          <>
            <Button
              onClick={() => onNavigate("home")}
              primary={activePage === "home"}
            >
              Home
            </Button>
            <Button
              onClick={() => onNavigate("about")}
              primary={activePage === "about"}
            >
              About Us
            </Button>
            <Button
              onClick={() => onNavigate("contact")}
              primary={activePage === "contact"}
            >
              Contact Us
            </Button>
          </>
        )}
        {auth ? (
          <>
           
            <Button
              onClick={() => handleNavigate("dashboard")}
              primary={activePage === "dashboard"}
            >
              Dashboard
            </Button>
            <Button onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => handleNavigate("login")}
              primary={activePage === "login"}
            >
              Login
            </Button>
            <Button
              onClick={() => handleNavigate("create")}
              primary={activePage === "create"}
            >
              Create Account
            </Button>
          </>
        )}
      </Actions>

      <MenuToggle onClick={() => setMenuOpen((current) => !current)} aria-label="Toggle navigation menu">
        {menuOpen ? "✕" : "☰"}
      </MenuToggle>

      {menuOpen && (
        <MobileMenu>
          {!auth && (
            <>
              <MobileAction onClick={() => handleNavigate("home")} primary={activePage === "home"}>
                Home
              </MobileAction>
              <MobileAction onClick={() => handleNavigate("contact")} primary={activePage === "contact"}>
                Contact Us
              </MobileAction>
            </>
          )}
          {auth ? (
            <>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', textAlign: 'center', marginBottom: '8px' }}>
                Welcome, {auth.user.name} 👋
              </div>
              <MobileAction onClick={() => handleNavigate("dashboard")} primary={activePage === "dashboard"}>
                Dashboard
              </MobileAction>
              <MobileAction onClick={() => { setMenuOpen(false); onLogout(); }}>
                Logout
              </MobileAction>
            </>
          ) : (
            <>
              <MobileAction onClick={() => handleNavigate("login")} primary={activePage === "login"}>
                Login
              </MobileAction>
              <MobileAction onClick={() => handleNavigate("create")} primary={activePage === "create"}>
                Create Account
              </MobileAction>
            </>
          )}
        </MobileMenu>
      )}
    </Container>
  );
}
