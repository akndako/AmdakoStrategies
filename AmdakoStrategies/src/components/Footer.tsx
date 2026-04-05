import styled from "styled-components";

const Section = styled.section`
  padding: 100px 80px;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const CTA = styled.div`
  margin-bottom: 60px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 14px 26px;
  border-radius: 8px;
  background: linear-gradient(90deg,#7C6CF6,#A855F7);
  border: none;
  color: white;
`;

export default function Footer() {
  return (
    <Section>
      <CTA>
        <h2>Get Started Today</h2>
        <p>Start investing in Web3</p>

        <div>
          <Button>Sign Up</Button>
          <Button>Contact</Button>
        </div>
      </CTA>

      <p>© 2024 InvestWeb3</p>
    </Section>
  );
}