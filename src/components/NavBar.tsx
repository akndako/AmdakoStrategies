import styled from "styled-components";

type NavbarProps = {
  activePage: "home" | "login" | "create" | "contact" | "dashboard";
  auth: { token: string; user: { id: string; name: string; email: string } } | null;
  onNavigate: (page: "home" | "login" | "create" | "contact" | "dashboard") => void;
  onLogout: () => void;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;

  background: rgba(10, 10, 25, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.05);

  @media (max-width: 760px) {
    flex-direction: column;
    gap: 18px;
    align-items: stretch;
  }
`;

const Brand = styled.h3`
  font-size: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  @media (max-width: 760px) {
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  }
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 18px;
  border-radius: 10px;
  border: ${({ primary }) =>
    primary ? "none" : "1px solid rgba(255,255,255,0.2)"};
  background: ${({ primary }) =>
    primary
      ? "linear-gradient(135deg, #7f00ff, #e100ff)"
      : "transparent"};
  color: white;
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ primary }) =>
      primary ? "0 0 20px rgba(225,0,255,0.6)" : "none"};
  }
`;

export default function Navbar({ activePage, auth, onNavigate, onLogout }: NavbarProps) {
  return (
    <Container>
      <Brand>AMDAKOSTRATEGIES</Brand>

      <Actions>
        <Button
          onClick={() => onNavigate("home")}
          primary={activePage === "home"}
        >
          Home
        </Button>
        <Button
          onClick={() => onNavigate("contact")}
          primary={activePage === "contact"}
        >
          Contact Us
        </Button>
        {auth ? (
          <>
            <Button
              onClick={() => onNavigate("dashboard")}
              primary={activePage === "dashboard"}
            >
              Dashboard
            </Button>
            <Button onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => onNavigate("login")}
              primary={activePage === "login"}
            >
              Login
            </Button>
            <Button
              onClick={() => onNavigate("create")}
              primary={activePage === "create"}
            >
              Create Account
            </Button>
          </>
        )}
      </Actions>
    </Container>
  );
}
