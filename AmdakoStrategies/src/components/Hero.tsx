import styled from "styled-components";
import { motion } from "framer-motion";
import eth from "../assets/eth.png";
import btc from "../assets/btc.png";

const Section = styled.section`
    display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 90px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: 52px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Gradient = styled.span`
  background: linear-gradient(90deg,#a78bfa,#f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Button = styled(motion.button)`
  padding: 14px 26px;
  border-radius: 8px;
  background: linear-gradient(90deg,#7C6CF6,#A855F7);
  border: none;
  color: white;
  margin-top: 20px;
  cursor: pointer;
`;

const Right = styled.div`
  max-width: 500px;

  h1 {
    font-size: 48px;
    line-height: 1;
    margin-bottom: 20px;
    padding: 50 50px;
    span {
      background: linear-gradient(90deg, #7f00ff, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    opacity: 0.7;
    margin-bottom: 30px;
  }
`;

const Coin = styled(motion.img)`
  width: 80px;
  position: absolute;
  @media (max-width: 768px) {
  padding: 40px;
}
`;
//
// const HeroContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 80px 60px;
// `;

// const Left = styled.div`
//   max-width: 500px;

//   h1 {
//     font-size: 48px;
//     line-height: 1.2;
//     margin-bottom: 20px;

//     span {
//       background: linear-gradient(90deg, #7f00ff, #00d4ff);
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//     }
//   }

//   p {
//     opacity: 0.7;
//     margin-bottom: 30px;
//   }
// `;
//

export default function Hero() {
  return (
    <Section>
      <div>
        <Title
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Invest in the <Gradient>Future</Gradient> of Web3
        </Title>

        <Button whileHover={{ scale: 1.1 }}>
          Invest Now
        </Button>
      </div>

      <Right>
        <Coin
          src={eth}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          style={{ top: "20%" }}
        />

        <Coin
          src={btc}
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          style={{ bottom: "40%" }}
          
          
        />
      </Right>
    </Section>
  );
}
