import styled from "styled-components";
import { motion } from "framer-motion"; 
const Section = styled.section`
  padding: 80px;
`;

const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

// const Card = styled.div`
//   padding: 24px;
//   border-radius: 14px;
//   background: rgba(20,26,60,0.6);
//   backdrop-filter: blur(12px);
//   border: 1px solid rgba(255,255,255,0.08);
//   transition: 0.3s;

//   &:hover {
//     transform: translateY(-6px);
//   }
// `;
const Card = styled(motion.div)`
  padding: 24px;
  border-radius: 14px;
  background: rgba(20,26,60,0.6);
`;

<Card whileHover={{ scale: 1.05, y: -5 }}>
  High Returns
</Card>

export default function Features() {
  return (
    <Section>
      <Title>Why Invest With Us?</Title>

      <Grid>
        <Card>High Returns</Card>
        <Card>Secure & Transparent</Card>
        <Card>Expert Management</Card>
      </Grid>
    </Section>
  );
}

