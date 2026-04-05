import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 80px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

// const Card = styled.div`
//   padding: 24px;
//   border-radius: 14px;
//   background: linear-gradient(
//     135deg,
//     rgba(124,108,246,0.25),
//     rgba(168,85,247,0.25)
//   );
//   border: 1px solid rgba(255,255,255,0.08);
//   transition: 0.3s;

//   &:hover {
//     transform: scale(1.03);
//   }
// `;
//
const Card = styled(motion.div)`
  padding: 24px;
  border-radius: 14px;
  background: linear-gradient(135deg,#7C6CF620,#A855F720);
`;

<Card whileHover={{ scale: 1.05 }}>
  DeFi Projects
</Card>
//
const Button = styled.button`
  margin-top: 40px;
  padding: 12px 26px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: white;
  @media (max-width: 768px) {
  padding: 40px 20px;
}
`;

export default function Opportunities() {
  return (
    <Section>
      <h2>Investment Opportunities</h2>

      <Grid>
        <Card>DeFi Projects</Card>
        <Card>NFT Ventures</Card>
        <Card>Metaverse & Gaming</Card>
      </Grid>

      <Button>View All Projects</Button>
    </Section>
  );
}