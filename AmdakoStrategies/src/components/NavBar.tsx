import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 20px 60px;
//   border-bottom: 1px solid rgba(255,255,255,0.1);
// `;
//
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;

  background: rgba(10, 10, 25, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
`;
//
// const Button = styled.button<{ primary?: boolean }>`
//   padding: 10px 16px;
//   border-radius: 6px;
//   border: ${({ primary }) => (primary ? "none" : "1px solid #444")};
//   background: ${({ primary }) =>
//     primary ? "linear-gradient(90deg,#7C6CF6,#A855F7)" : "transparent"};
//   color: white;
// `;
const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 18px;
gap: 20px;
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

export default function Navbar() {
  return (
    <Container>
      <h3>AMDAKOSTRATEGIES</h3>

      <div>
        <Button>Login</Button>
        
        <Button primary>Create Account to Get Started</Button>
      </div>
    </Container>
  );
}