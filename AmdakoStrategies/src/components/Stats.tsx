import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const Section = styled.section`
  padding: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const Card = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  background: rgba(20,26,60,0.6);
  border: 1px solid rgba(255,255,255,0.08);
  text-align: center;
`;

const ChartBox = styled.div`
  padding: 20px;
  border-radius: 12px;
  background: rgba(20,26,60,0.6);
`;

const data = [{ v: 10 }, { v: 25 }, { v: 40 }, { v: 60 }];

export default function Stats() {
  return (
    <Section>
      <div>
        <h2>Our Performance</h2>

        <Row>
          <Card>$4.2M</Card>
          <Card>320%</Card>
          <Card>8,500+</Card>
        </Row>
      </div>

      <ChartBox>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <Line dataKey="v" stroke="#7C6CF6" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
    </Section>
  );
}