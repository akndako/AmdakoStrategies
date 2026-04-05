import { useState } from "react";
import styled from "styled-components";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  activePage: "home" | "login" | "create" | "contact" | "dashboard";
  auth: { token: string; user: { id: string; name: string; email: string } } | null;
  onNavigate: (page: "home" | "login" | "create" | "contact" | "dashboard") => void;
  onLogout: () => void;
};

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  gap: 20px;
  background: rgba(10, 12, 26, 0.78);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
    padding: 18px 24px;
  }
`;

const Brand = styled.button`
  border: none;
  background: transparent;
  color: white;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 760px) {
    display: none;
  }
`;

const MobileToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  width: 46px;
  height: 46px;
  border-radius: 14px;
  color: white;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }

  @media (max-width: 760px) {
    display: flex;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  @media (max-width: 760px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const NavButton = styled.button<{ primary?: boolean }>`
  padding: 12px 18px;
  border-radius: 12px;
  border: ${({ primary }) =>
    primary ? "none" : "1px solid rgba(255, 255, 255, 0.16)"};
  background: ${({ primary }) =>
    primary
      ? "linear-gradient(135deg, #7C6CF6, #A855F7)"
      : "rgba(255, 255, 255, 0.04)"};
  color: white;
  font-weight: 600;
  font-size: 14px;
  min-width: 120px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ primary }) =>
      primary ? "0 16px 40px rgba(124, 108, 246, 0.22)" : "none"};
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 760px) {
    min-width: unset;
    width: 100%;
  }
`;

const MenuContainer = styled.div<{ open: boolean }>`
  display: none;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow: hidden;
  max-height: ${({ open }) => (open ? "320px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  padding: ${({ open }) => (open ? "16px 0 10px" : "0")};
  transition: max-height 0.34s ease, opacity 0.34s ease, padding 0.34s ease;
  background: rgba(8, 10, 22, 0.96);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 760px) {
    display: flex;
  }
`;

const MenuItem = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: ${({ active }) =>
    active ? "rgba(124, 108, 246, 0.2)" : "rgba(255, 255, 255, 0.04)"};
  color: white;
  text-align: left;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;

  &:hover {
    background: rgba(124, 108, 246, 0.18);
    border-color: rgba(124, 108, 246, 0.35);
  }
`;

export default function Navbar({ activePage, auth, onNavigate, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (page: "home" | "login" | "create" | "contact" | "dashboard") => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <Container>
      <Brand onClick={() => handleNavigate("home")}>AMDAKO STRATEGIES</Brand>

      <DesktopLinks>
        <NavButton onClick={() => handleNavigate("home")} primary={activePage === "home"}>
          Home
        </NavButton>
        <NavButton onClick={() => handleNavigate("contact")} primary={activePage === "contact"}>
          Contact Us
        </NavButton>
        {auth ? (
          <NavButton onClick={() => handleNavigate("dashboard")} primary={activePage === "dashboard"}>
            Dashboard
          </NavButton>
        ) : (
          <>
            <NavButton onClick={() => handleNavigate("login")} primary={activePage === "login"}>
              Login
            </NavButton>
            <NavButton onClick={() => handleNavigate("create")} primary={activePage === "create"}>
              Create Account
            </NavButton>
          </>
        )}
      </DesktopLinks>

      <ActionGroup>
        {auth && (
          <NavButton onClick={onLogout}>Logout</NavButton>
        )}
        <MobileToggle onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle navigation menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </MobileToggle>
      </ActionGroup>

      <MenuContainer open={menuOpen}>
        <MenuItem onClick={() => handleNavigate("home")} active={activePage === "home"}>
          Home
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("contact")} active={activePage === "contact"}>
          Contact Us
        </MenuItem>
        {auth ? (
          <>
            <MenuItem onClick={() => handleNavigate("dashboard")} active={activePage === "dashboard"}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => handleNavigate("login")} active={activePage === "login"}>
              Login
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("create")} active={activePage === "create"}>
              Create Account
            </MenuItem>
          </>
        )}
      </MenuContainer>
    </Container>
  );
}
