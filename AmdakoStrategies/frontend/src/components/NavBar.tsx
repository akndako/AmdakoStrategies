﻿import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Menu, X, LayoutDashboard, UserPlus, LogIn, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { theme } from "../theme";
import type { AuthState } from "../types";

type PageView = "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement" | "settings" | "edit-profile";

type NavbarProps = {
  activePage: PageView;
  auth: AuthState;
  onNavigate: (page: PageView) => void;
  onLogout: () => void;
};

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(248, 246, 241, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${theme.colors.borderLight};
`;

const TopBar = styled.div`
  background: ${theme.colors.primary};
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  letter-spacing: 0.4px;
  text-align: center;
  padding: 7px 16px;

  strong {
    color: #fff;
    font-weight: 600;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 62px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const BrandMark = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.radii.small};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  border: 1px solid ${theme.colors.gold};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

const BrandText = styled.div`
  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: ${theme.colors.text};
    margin: 0 0 2px;
    line-height: 1.2;

    span {
      color: ${theme.colors.primary};
    }
  }

  p {
    font-size: 10.5px;
    color: ${theme.colors.textMuted};
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin: 0;
    line-height: 1.3;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavLink = styled.button<{$active?: boolean}>`
  padding: 8px 14px;
  border-radius: ${theme.radii.small};
  background: transparent;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 860px) {
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
      variant === "primary" ? theme.colors.primaryDark : theme.colors.primaryLight};
    color: ${({ variant }) =>
      variant === "primary" ? "#fff" : theme.colors.primary};
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

  @media (max-width: 860px) {
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

  @media (max-width: 860px) {
    display: flex;
  }
`;

const MobileLink = styled.button<{$active?: boolean}>`
  padding: 12px 16px;
  border-radius: ${theme.radii.small};
  background: ${({ $active }) => ($active ? theme.colors.primaryLight : "transparent")};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
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

// Avatar Dropdown styles
const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: ${theme.radii.small};
  background: transparent;
  color: ${theme.colors.textSecondary};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  }
`;

const AvatarCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Playfair Display', Georgia, serif;
  border: 2px solid ${theme.colors.gold};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 24px;
  width: 200px;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  box-shadow: 0 10px 40px rgba(26, 26, 24, 0.15);
  padding: 8px;
  z-index: 99;

  @media (max-width: 768px) {
    right: 20px;
  }

  @media (max-width: 480px) {
    right: 16px;
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  background: transparent;
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  border-radius: ${theme.radii.small};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${theme.colors.borderLight};
  margin: 6px 0;
`;

const NavBarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export default function Navbar({ activePage, auth, onNavigate, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleNavigate = (page: PageView) => {
    setMenuOpen(false);
    setDropdownOpen(false);
    onNavigate(page);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <Container>
      <TopBar>
        <strong>AMDAKO STRATEGY NIG. LTD.</strong> — RC. 9560518 &nbsp;·&nbsp; Registered Investment & Digital Finance Company
      </TopBar>

      <Nav>
        <Brand onClick={() => handleNavigate("home")}>
          <BrandMark>A</BrandMark>
          <BrandText>
            <h3>Amdako <span>Strategies</span></h3>
            <p>Strategic Wealth & Digital Finance</p>
          </BrandText>
        </Brand>

        <NavLinks>
          {!auth && (
            <>
              <NavLink $active={activePage === "home"} onClick={() => handleNavigate("home")}>
                Home
              </NavLink>
              <NavLink $active={activePage === "about"} onClick={() => handleNavigate("about")}>
                About Us
              </NavLink>
              <NavLink $active={activePage === "contact"} onClick={() => handleNavigate("contact")}>
                Contact
              </NavLink>
            </>
          )}
        </NavLinks>

        <Actions>
          {auth ? (
            <NavBarWrapper ref={dropdownRef}>
              <AvatarButton
                onClick={() => setDropdownOpen((current) => !current)}
                aria-label="Toggle user menu"
              >
                <AvatarCircle>
                  {auth.user.avatar_url ? (
                    <img src={auth.user.avatar_url} alt={auth.user.name} />
                  ) : (
                    getInitials(auth.user.name)
                  )}
                </AvatarCircle>
                <span>{auth.user.name}</span>
                <ChevronDown size={14} />
              </AvatarButton>

              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleNavigate("dashboard")}>
                    <LayoutDashboard size={16} />
                    Dashboard
                  </DropdownItem>
                  <DropdownItem onClick={() => handleNavigate("edit-profile")}>
                    <User size={16} />
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem onClick={() => handleNavigate("settings")}>
                    <Settings size={16} />
                    Settings
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}>
                    <LogOut size={16} />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavBarWrapper>
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
          {!auth && (
            <>
              <MobileLink $active={activePage === "home"} onClick={() => handleNavigate("home")}>
                Home
              </MobileLink>
              <MobileLink $active={activePage === "about"} onClick={() => handleNavigate("about")}>
                About Us
              </MobileLink>
              <MobileLink $active={activePage === "contact"} onClick={() => handleNavigate("contact")}>
                Contact
              </MobileLink>
              <MobileDivider />
            </>
          )}

          {auth ? (
            <>
              <MobileLink $active={activePage === "dashboard"} onClick={() => handleNavigate("dashboard")}>
                <LayoutDashboard size={18} />
                Dashboard
              </MobileLink>
              <MobileLink $active={activePage === "edit-profile"} onClick={() => handleNavigate("edit-profile")}>
                <User size={18} />
                Edit Profile
              </MobileLink>
              <MobileLink $active={activePage === "settings"} onClick={() => handleNavigate("settings")}>
                <Settings size={18} />
                Settings
              </MobileLink>
              <MobileDivider />
              <MobileLink onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}>
                <LogOut size={18} />
                Logout
              </MobileLink>
            </>
          ) : (
            <>
              <MobileLink $active={activePage === "login"} onClick={() => handleNavigate("login")}>
                <LogIn size={18} />
                Sign In
              </MobileLink>
              <MobileLink $active={activePage === "create"} onClick={() => handleNavigate("create")}>
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
