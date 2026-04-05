import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 100px 80px;
  background: linear-gradient(180deg, rgba(124,108,246,0.05) 0%, transparent 100%);
`;

const Title = styled.h2`
  font-size: 42px;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 18px;
  opacity: 0.7;
  text-align: center;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Card = styled(motion.div)`
  flex: 1;
  padding: 32px;
  border-radius: 16px;
  background: rgba(124, 108, 246, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(12px);
  text-align: left;
  
  h4 {
    font-size: 16px;
    opacity: 0.7;
    margin-bottom: 12px;
    font-weight: 500;
  }
  
  .value {
    font-size: 42px;
    font-weight: 700;
    background: linear-gradient(90deg, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    opacity: 0.6;
  }
`;

const ChartBox = styled(motion.div)`
  padding: 40px;
  border-radius: 16px;
  background: rgba(20, 26, 60, 0.8);
  border: 1px solid rgba(124, 108, 246, 0.2);
  backdrop-filter: blur(12px);
  
  h3 {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const data = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 40 },
  { month: "Apr", value: 60 },
  { month: "May", value: 85 },
  { month: "Jun", value: 120 }
];

export default function Stats() {
  return (
    <Section>
      <Title>Our Performance</Title>
      <Subtitle>Proven track record of consistent growth and investor returns</Subtitle>

      <Container>
        <StatsContainer>
          <StatRow>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0 }}
            >
              <h4>Assets Under Management</h4>
              <div className="value">$4.2M</div>
              <p>Growing portfolio across Web3 projects</p>
            </Card>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h4>Average Annual Return</h4>
              <div className="value">320%</div>
              <p>Consistent outperformance exceeds expectations</p>
            </Card>
          </StatRow>
          
          <StatRow>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4>Active Investors</h4>
              <div className="value">8,500+</div>
              <p>Trusted by thousands worldwide</p>
            </Card>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4>Success Rate</h4>
              <div className="value">98.7%</div>
              <p>Successful investment outcomes</p>
            </Card>
          </StatRow>
        </StatsContainer>

        <ChartBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>6-Month Growth Trajectory</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: "rgba(20, 26, 60, 0.9)",
                  border: "1px solid rgba(124, 108, 246, 0.5)",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#7C6CF6" 
                strokeWidth={3}
                dot={{ fill: "#A855F7", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </Container>
    </Section>
  );
}