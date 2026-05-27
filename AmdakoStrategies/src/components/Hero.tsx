// import styled from "styled-components";
// import { motion } from "framer-motion";
// import eth from "../assets/eth.png";
// import btc from "../assets/btc.png";

// const Section = styled.section`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   align-items: center;
//   gap: 60px;
//   padding: 100px 64px;
//   min-height: calc(100vh - 120px);

//   @media (max-width: 980px) {
//     grid-template-columns: 1fr;
//     padding: 80px 32px;
//     min-height: auto;
//   }
// `;

// const Left = styled.div`
//   max-width: 620px;

//   p {
//     font-size: 20px;
//     line-height: 1.75;
//     margin-top: 28px;
//     margin-bottom: 12px;
//     color: rgba(238, 242, 255, 0.84);
//   }
// `;

// const Title = styled(motion.h1)`
//   font-size: clamp(3rem, 5vw, 5rem);
//   line-height: 1.05;
//   max-width: 620px;
// `;

// const Gradient = styled.span`
//   background: linear-gradient(90deg, #a855f7, #22d3ee);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const ButtonRow = styled(motion.div)`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 16px;
//   margin-top: 36px;
// `;

// const PrimaryButton = styled(motion.button)`
//   padding: 18px 36px;
//   border-radius: 14px;
//   background: linear-gradient(90deg, #7c6cf6, #a855f7);
//   border: none;
//   color: white;
//   cursor: pointer;
//   font-weight: 700;
//   font-size: 16px;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 18px 50px rgba(124, 108, 246, 0.24);
//   }
// `;

// const SecondaryButton = styled(motion.button)`
//   padding: 18px 36px;
//   border-radius: 14px;
//   background: rgba(255, 255, 255, 0.05);
//   border: 1px solid rgba(124, 108, 246, 0.35);
//   color: white;
//   cursor: pointer;
//   font-weight: 700;
//   font-size: 16px;
//   transition: transform 0.3s ease, background 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     background: rgba(124, 108, 246, 0.12);
//   }
// `;

// const Right = styled.div`
//   position: relative;
//   min-height: 420px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 40px;
//   border-radius: 32px;
//   background: radial-gradient(circle at top right, rgba(124, 108, 246, 0.18), transparent 30%),
//     rgba(255, 255, 255, 0.02);
//   border: 1px solid rgba(255, 255, 255, 0.08);
//   box-shadow: inset 0 0 90px rgba(0, 0, 0, 0.1);

//   @media (max-width: 980px) {
//     min-height: 340px;
//   }
// `;

// const Coin = styled(motion.img)`
//   position: absolute;
//   width: 120px;
//   border-radius: 50%;
//   filter: drop-shadow(0 26px 50px rgba(20, 25, 60, 0.35));

//   @media (max-width: 768px) {
//     width: 100px;
//   }
// `;

// const Glow = styled.div`
//   position: absolute;
//   width: 220px;
//   height: 220px;
//   border-radius: 50%;
//   background: radial-gradient(circle, rgba(124, 108, 246, 0.28), transparent 55%);
//   top: -20px;
//   right: -20px;
//   pointer-events: none;
// `;

// export default function Hero() {
//   return (
//     <Section>
//       <Left>
//         <Title
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Invest in the <Gradient>Future</Gradient> of Web3
//         </Title>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           Unlock unprecedented returns in decentralized finance, NFT ventures, and next-generation blockchain projects. Join thousands of investors already profiting.
//         </motion.p>

//         <ButtonRow
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           <PrimaryButton whileHover={{ scale: 1.03 }}>
//             Start Investing Now
//           </PrimaryButton>
//           <SecondaryButton whileHover={{ scale: 1.03 }}>
//             Learn More
//           </SecondaryButton>
//         </ButtonRow>
//       </Left>

//       <Right>
//         <Glow />
//         <Coin
//           src={eth}
//           animate={{ y: [0, -16, 0] }}
//           transition={{ repeat: Infinity, duration: 4 }}
//           style={{ top: "12%", left: "12%" }}
//         />
//         <Coin
//           src={btc}
//           animate={{ y: [0, 12, 0] }}
//           transition={{ repeat: Infinity, duration: 5 }}
//           style={{ bottom: "18%", right: "14%" }}
//         />
//       </Right>
//     </Section>
//   );
// }
