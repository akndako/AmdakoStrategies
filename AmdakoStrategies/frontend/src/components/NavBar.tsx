import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Menu, X, UserPlus, LogIn, ChevronDown, User, Settings, LogOut, FileText, LayoutDashboard } from "lucide-react";
import { theme } from "../theme";
import type { AuthState } from "../types";
import logoImage from "../assets/amdakostrategies.jpeg";
import { useResolvedAvatarUrl } from "../hooks/useResolvedAvatarUrl";

type PageView = "home" | "about" | "login" | "create" | "contact" | "dashboard" | "agreement" | "settings" | "edit-profile" | "reset-password";

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
  background: rgba(248, 246, 241, 0.94);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${theme.colors.borderLight};
  box-shadow: 0 1px 0 rgba(26, 26, 24, 0.04);
`;

const TopBar = styled.div`
  background: ${theme.colors.primary};
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  letter-spacing: 0.4px;
  text-align: center;
  padding: 7px 16px;
  line-height: 1.45;

  strong {
    color: #fff;
    font-weight: 600;
  }

  .top-bar-meta {
    display: inline;
  }

  @media (max-width: 640px) {
    font-size: 11px;
    padding: 6px 12px;

    .top-bar-meta {
      display: none;
    }
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

  @media (max-width: 400px) {
    padding: 0 12px;
    gap: 8px;
  }
`;

const Brand = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  min-width: 0;

  @media (max-width: 400px) {
    gap: 8px;
  }
`;

const BrandMark = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.radii.small};
  border: 1px solid ${theme.colors.gold};
  overflow: hidden;
  flex-shrink: 0;
  background: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BrandMonogram = styled.span`
  color: ${theme.colors.primary};
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
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
  position: relative;
  padding: 8px 14px;
  border-radius: ${theme.radii.small};
  background: ${({ $active }) => ($active ? theme.colors.primaryLight : "transparent")};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  font-size: 14px;
  transition: background 0.2s ease, color 0.2s ease;

  ${({ $active }) =>
    $active &&
    `
    &::after {
      content: '';
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 4px;
      height: 2px;
      border-radius: 2px;
      background: ${theme.colors.gold};
    }
  `}

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

const MobileAuthActions = styled.div`
  display: none;
  align-items: center;
  gap: 8px;
  margin-left: auto;

  @media (max-width: 860px) {
    display: flex;
  }

  @media (max-width: 400px) {
    gap: 6px;
  }
`;

const MobileAuthButton = styled.button<{ $primary?: boolean }>`
  min-height: 44px;
  padding: 8px 12px;
  border-radius: ${theme.radii.small};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ $primary }) => ($primary ? theme.colors.primary : "#fff")};
  color: ${({ $primary }) => ($primary ? "#fff" : theme.colors.textSecondary)};
  border: ${({ $primary }) => ($primary ? "none" : `1px solid ${theme.colors.border}`)};

  &:hover {
    background: ${({ $primary }) =>
      $primary ? theme.colors.primaryDark : theme.colors.primaryLight};
    color: ${({ $primary }) => ($primary ? "#fff" : theme.colors.primary)};
  }

  @media (max-width: 400px) {
    padding: 8px 10px;
  }
`;

const MobileToggle = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  border-radius: ${theme.radii.small};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  color: ${theme.colors.text};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 860px) {
    display: flex;
  }
`;

const MobileMenu = styled.nav`
  display: none;
  flex-direction: column;
  padding: 12px 20px 20px;
  gap: 6px;
  max-height: calc(100dvh - 62px);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #fff;
  border-top: 1px solid ${theme.colors.borderLight};
  transform-origin: top center;
  animation: dropIn 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;

  > * {
    animation: fadeUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  ${Array.from({ length: 8 }, (_, i) => `> *:nth-child(${i + 2}) { animation-delay: ${(i + 1) * 35}ms; }`).join("\n")}

  @media (max-width: 860px) {
    display: flex;
  }
`;

const MobileLink = styled.button<{$active?: boolean}>`
  padding: 12px 16px;
  min-height: 48px;
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
  width: min(220px, calc(100vw - 32px));
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  box-shadow: 0 10px 40px rgba(26, 26, 24, 0.15);
  padding: 8px;
  z-index: 99;
  transform-origin: top right;
  animation: dropIn 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;

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
  const userAvatarUrl = useResolvedAvatarUrl(auth?.user.avatar_url);
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

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    const desktopBreakpoint = window.matchMedia("(min-width: 861px)");
    document.addEventListener("keydown", onKeyDown);
    desktopBreakpoint.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktopBreakpoint.removeEventListener("change", onBreakpointChange);
    };
  }, [menuOpen]);

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
      {/* <TopBar>
        <strong>AMDAKO STRATEGY NIG. LTD.</strong>
        <span className="top-bar-meta"> — RC. 9560518 · Registered Investment & Digital Finance Company</span>
      </TopBar> */}

      <Nav>
        <Brand
          type="button"
          onClick={() => handleNavigate(auth ? "dashboard" : "home")}
          aria-label={auth ? "Go to dashboard" : "Go to home"}
        >
          <BrandMark>
            <img src={logoImage} alt="" />
          </BrandMark>
          <BrandMonogram>AS</BrandMonogram>
        </Brand>

        <NavLinks>
          {!auth && (
            <>
              <NavLink $active={activePage === "home"} onClick={() => handleNavigate("home")}>
                Home
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
                aria-expanded={dropdownOpen}
                aria-controls={dropdownOpen ? "user-menu" : undefined}
              >
                <AvatarCircle>
                  {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt={auth.user.name} />
                  ) : (
                    getInitials(auth.user.name)
                  )}
                </AvatarCircle>
                <span>{auth.user.name}</span>
                <ChevronDown size={14} />
              </AvatarButton>

              {dropdownOpen && (
                <DropdownMenu id="user-menu">
                  <DropdownItem onClick={() => handleNavigate("agreement")}>
                    <FileText size={16} />
                    Agreement
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
                Register
              </Button>
            </>
          )}
        </Actions>

        {!auth && (
          <MobileAuthActions>
            <MobileAuthButton type="button" onClick={() => handleNavigate("login")}>
              <LogIn size={14} />
              Sign In
            </MobileAuthButton>
            <MobileAuthButton type="button" $primary onClick={() => handleNavigate("create")}>
              <UserPlus size={14} />
              Register
            </MobileAuthButton>
          </MobileAuthActions>
        )}

        <MobileToggle
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? "mobile-navigation" : undefined}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </MobileToggle>
      </Nav>

      {menuOpen && (
        <MobileMenu id="mobile-navigation" aria-label="Mobile navigation">
          {!auth && (
            <>
              <MobileLink $active={activePage === "home"} aria-current={activePage === "home" ? "page" : undefined} onClick={() => handleNavigate("home")}>
                Home
              </MobileLink>
              <MobileLink $active={activePage === "contact"} aria-current={activePage === "contact" ? "page" : undefined} onClick={() => handleNavigate("contact")}>
                Contact
              </MobileLink>
              <MobileDivider />
            </>
          )}

          {auth ? (
            <>
              <MobileLink $active={activePage === "dashboard"} aria-current={activePage === "dashboard" ? "page" : undefined} onClick={() => handleNavigate("dashboard")}>
                <LayoutDashboard size={18} />
                Dashboard
              </MobileLink>
              <MobileLink $active={activePage === "agreement"} aria-current={activePage === "agreement" ? "page" : undefined} onClick={() => handleNavigate("agreement")}>
                <FileText size={18} />
                Agreement
              </MobileLink>
              <MobileLink $active={activePage === "edit-profile"} aria-current={activePage === "edit-profile" ? "page" : undefined} onClick={() => handleNavigate("edit-profile")}>
                <User size={18} />
                Edit Profile
              </MobileLink>
              <MobileLink $active={activePage === "settings"} aria-current={activePage === "settings" ? "page" : undefined} onClick={() => handleNavigate("settings")}>
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
          ) : null}
        </MobileMenu>
      )}
    </Container>
  );
}
