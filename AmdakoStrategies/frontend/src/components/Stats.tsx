import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { theme } from "../theme";

const Section = styled.section`
  padding: 100px 24px;
  background: ${theme.colors.surfaceAlt};

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
  max-width: 650px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 45px;
  }
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

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

const StatCard = styled(motion.div)`
  padding: 28px 24px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.cardHover};
  }

  @media (max-width: 480px) {
    padding: 22px 18px;
  }

  h4 {
    font-size: 0.875rem;
    color: ${theme.colors.textMuted};
    margin-bottom: 10px;
    font-weight: 500;
  }

  .value {
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.text};
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
    margin-bottom: 24px;
    color: ${theme.colors.text};
  }
`;

export default function Stats() {
  const monthsLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();

  // Dynamically generate the last 6 months of data
  const dynamicData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(currentMonth - (5 - i));
    return {
      month: monthsLabels[date.getMonth()],
      value: Math.round(15 * Math.pow(1.5, i)),
    };
  });

  return (
    <Section>
      <Container>
        <Header>
          <Title>Our Performance</Title>
          <Subtitle>Proven track record of consistent growth and investor returns</Subtitle>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h4>Assets Under Management</h4>
              <div className="value">$10,000</div>
              <p>Equivalent to approximately ₦15,000,000</p>
            </StatCard>
            <StatCard
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h4>Average Annual Return</h4>
              <div className="value">120%</div>
              <p>Calculated at 10% monthly growth strategy</p>
            </StatCard>
            <StatCard
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h4>Active Investors</h4>
              <div className="value">20</div>
              <p>Exclusive group of verified active investors</p>
            </StatCard>
            <StatCard
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h4>Success Rate</h4>
              <div className="value">98.7%</div>
              <p>Successful investment outcomes</p>
            </StatCard>
          </StatsGrid>

          <ChartBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>6-Month Growth Trajectory</h3>
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
                  width={40}
                />
                <Tooltip
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
                  stroke={theme.colors.primary}
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