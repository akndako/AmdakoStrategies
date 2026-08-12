﻿import { useState } from "react";
import styled from "styled-components";
import { Menu, X, LogOut, LayoutDashboard, UserPlus, LogIn } from "lucide-react";
import { theme } from "../theme";

type NavbarProps = {
  activePage: "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement";
  auth: { token: string; user: { id: string; name: string; firstName: string; lastName: string; phone: string; email: string } } | null;
  onNavigate: (page: "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement") => void;
  onLogout: () => void;
};

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${theme.colors.borderLight};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: ${theme.colors.text};
  text-transform: uppercase;

  span {
    color: ${theme.colors.primary};
  }
`;

const BrandMark = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 820px) {
    display: none;
  }
`;

const NavLink = styled.button<{ active?: boolean }>`
  padding: 8px 14px;
  border-radius: ${theme.radii.small};
  background: transparent;
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.textSecondary)};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.surfaceAlt};
    color: ${theme.colors.text};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 820px) {
    display: none;
  }
`;

const Button = styled.button<{ variant?: "primary" | "outline" }>`
  padding: 9px 18px;
  border-radius: ${theme.radii.small};
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  background: ${({ variant }) =>
    variant === "primary" ? theme.colors.primary : "transparent"};
  color: ${({ variant }) =>
    variant === "primary" ? "#fff" : theme.colors.textSecondary};
  border: ${({ variant }) =>
    variant === "primary" ? "none" : `1px solid ${theme.colors.border}`};

  &:hover {
    background: ${({ variant }) =>
      variant === "primary" ? theme.colors.primaryDark : theme.colors.surfaceAlt};
    color: ${({ variant }) =>
      variant === "primary" ? "#fff" : theme.colors.text};
    box-shadow: ${({ variant }) =>
      variant === "primary" ? theme.shadows.buttonHover : "none"};
    transform: ${({ variant }) => (variant === "primary" ? "translateY(-1px)" : "none")};
  }
`;

const MobileToggle = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border-radius: ${theme.radii.small};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  color: ${theme.colors.text};
  align-items: center;
  justify-content: center;

  @media (max-width: 820px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  padding: 12px 20px 20px;
  gap: 6px;
  background: #fff;
  border-top: 1px solid ${theme.colors.borderLight};

  @media (max-width: 820px) {
    display: flex;
  }
`;

const MobileLink = styled.button<{ active?: boolean }>`
  padding: 12px 16px;
  border-radius: ${theme.radii.small};
  background: ${({ active }) => (active ? theme.colors.primaryLight : "transparent")};
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.text)};
  font-weight: 500;
  font-size: 15px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: ${theme.colors.surfaceAlt};
  }
`;

const MobileDivider = styled.div`
  height: 1px;
  background: ${theme.colors.borderLight};
  margin: 8px 0;
`;

export default function Navbar({ activePage, auth, onNavigate, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (page: "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement") => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <Container>
      <Nav>
        <Brand onClick={() => handleNavigate("home")}>
          <BrandMark>A</BrandMark>
          Amdako<span>Strategies</span>
        </Brand>

        <NavLinks>
          <NavLink active={activePage === "home"} onClick={() => handleNavigate("home")}>
            Home
          </NavLink>
          <NavLink active={activePage === "about"} onClick={() => handleNavigate("about")}>
            About Us
          </NavLink>
          <NavLink active={activePage === "contact"} onClick={() => handleNavigate("contact")}>
            Contact
          </NavLink>
        </NavLinks>

        <Actions>
          {auth ? (
            <>
              <Button variant="outline" onClick={() => handleNavigate("dashboard")}>
                <LayoutDashboard size={16} />
                Dashboard
              </Button>
              <Button variant="primary" onClick={onLogout}>
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => handleNavigate("login")}>
                <LogIn size={16} />
                Sign In
              </Button>
              <Button variant="primary" onClick={() => handleNavigate("create")}>
                <UserPlus size={16} />
                Create Account
              </Button>
            </>
          )}
        </Actions>

        <MobileToggle onClick={() => setMenuOpen((current) => !current)} aria-label="Toggle navigation menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </MobileToggle>
      </Nav>

      {menuOpen && (
        <MobileMenu>
          <MobileLink active={activePage === "home"} onClick={() => handleNavigate("home")}>
            Home
          </MobileLink>
          <MobileLink active={activePage === "about"} onClick={() => handleNavigate("about")}>
            About Us
          </MobileLink>
          <MobileLink active={activePage === "contact"} onClick={() => handleNavigate("contact")}>
            Contact
          </MobileLink>

          <MobileDivider />

          {auth ? (
            <>
              <MobileLink active={activePage === "dashboard"} onClick={() => handleNavigate("dashboard")}>
                <LayoutDashboard size={18} />
                Dashboard
              </MobileLink>
              <MobileLink onClick={() => { setMenuOpen(false); onLogout(); }}>
                <LogOut size={18} />
                Logout
              </MobileLink>
            </>
          ) : (
            <>
              <MobileLink active={activePage === "login"} onClick={() => handleNavigate("login")}>
                <LogIn size={18} />
                Sign In
              </MobileLink>
              <MobileLink active={activePage === "create"} onClick={() => handleNavigate("create")}>
                <UserPlus size={18} />
                Create Account
              </MobileLink>
            </>
          )}
        </MobileMenu>
      )}
    </Container>
  );
}