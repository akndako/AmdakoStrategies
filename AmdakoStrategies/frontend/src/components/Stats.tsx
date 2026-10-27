import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { theme } from "../theme";

const Section = styled.section.attrs({ id: "home-performance" })`
  padding: 100px 24px;
  background: ${theme.colors.surface};

  @media (max-width: 768px) {
    padding: 70px 20px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 45px;
  }
`;

const Eyebrow = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.gold};
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.0625rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const StatCard = styled(motion.div)`
  padding: 28px 24px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.gold};
    box-shadow: ${theme.shadows.cardHover};
  }

  @media (max-width: 480px) {
    padding: 22px 18px;
  }

  h4 {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${theme.colors.textMuted};
    margin-bottom: 10px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
  }

  .value {
    font-size: 2rem;
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    color: ${theme.colors.primary};
    margin-bottom: 8px;

    @media (max-width: 480px) {
      font-size: 1.625rem;
    }
  }

  p {
    font-size: 0.8125rem;
    color: ${theme.colors.textMuted};
    line-height: 1.5;
  }
`;

const ChartBox = styled(motion.div)`
  padding: 36px 32px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.card};

  @media (max-width: 480px) {
    padding: 26px 20px;
  }

  h3 {
    font-size: 1.125rem;
    margin-bottom: 4px;
    color: ${theme.colors.text};
  }

  p {
    font-size: 0.84375rem;
    color: ${theme.colors.textMuted};
    margin-bottom: 24px;
  }
`;

export default function Stats() {
  const monthsLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();

  // Dynamically generate the last 6 months — illustrating 10% monthly compounding on a ₦1,000,000 base
  const dynamicData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(currentMonth - (5 - i));
    const start = 1000000;
    const value = Math.round(start * Math.pow(1.1, i + 1) / 100000) * 100000;
    return {
      month: monthsLabels[date.getMonth()],
      value,
    };
  });

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Illustration</Eyebrow>
          <Title>How your balance can compound</Title>
          <Subtitle>
            Sample six-month path for ₦1,000,000 at the published monthly rate—your amount scales the same way.
          </Subtitle>
        </Header>

        <Content>
          <ChartBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ gridColumn: "1 / -1" }}
          >
            <h3>6-Month Growth Projection</h3>
            <p>Compound growth on a ₦1,000,000 investment at 10% monthly ROI</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dynamicData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.borderLight} vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke={theme.colors.textMuted}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={theme.colors.textMuted}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={70}
                  tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value) => [
                    `₦${Number(value ?? 0).toLocaleString()}`,
                    "Portfolio Value",
                  ]}
                  contentStyle={{
                    background: "#fff",
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: `${theme.radii.small}`,
                    boxShadow: theme.shadows.card,
                    fontSize: "13px",
                    color: theme.colors.text,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme.colors.gold}
                  strokeWidth={2.5}
                  dot={{ fill: theme.colors.primary, r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
        </Content>
      </Container>
    </Section>
  );
}