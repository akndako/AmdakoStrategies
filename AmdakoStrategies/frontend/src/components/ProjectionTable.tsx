import styled from "styled-components";
import { motion } from "framer-motion";
import { Table2 } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
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
  max-width: 960px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 50px;

  @media (max-width: 768px) {
    margin-bottom: 38px;
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

const TableWrap = styled(motion.div)`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 28px;
  background: ${theme.colors.primary};
  color: #fff;

  @media (max-width: 600px) {
    padding: 18px 20px;
  }

  h3 {
    font-size: 17px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }

  svg {
    color: ${theme.colors.gold};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 620px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 16px 28px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.textMuted};
  background: ${theme.colors.surfaceAlt};
  border-bottom: 1px solid ${theme.colors.borderLight};

  @media (max-width: 600px) {
    padding: 14px 20px;
    font-size: 11px;
  }
`;

const Td = styled.td`
  padding: 18px 28px;
  font-size: 0.95rem;
  color: ${theme.colors.textSecondary};
  border-bottom: 1px solid ${theme.colors.borderLight};
  font-variant-numeric: tabular-nums;

  @media (max-width: 600px) {
    padding: 15px 20px;
    font-size: 0.875rem;
  }

  strong {
    color: ${theme.colors.text};
    font-weight: 600;
  }
`;

const Tr = styled.tr`
  transition: background 0.15s ease;

  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.colors.ivory};
  }
`;

const TrHighlight = styled(Tr)`
  td {
    background: ${theme.colors.primaryLight};
    font-weight: 600;

    strong {
      color: ${theme.colors.primary};
    }
  }
`;

const Note = styled.div`
  margin-top: 24px;
  padding: 16px 20px;
  background: ${theme.colors.goldLight};
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: ${theme.radii.medium};
  display: flex;
  align-items: flex-start;
  gap: 10px;

  p {
    font-size: 0.875rem;
    color: ${theme.colors.textSecondary};
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: 0.8125rem;
    }
  }
`;

const rows = [
  { capital: "₦750,000", monthly: "₦75,000", yearly: "₦900,000", highlight: false },
  { capital: "₦1,000,000", monthly: "₦100,000", yearly: "₦1,200,000", highlight: true },
  { capital: "₦5,000,000", monthly: "₦500,000", yearly: "₦6,000,000", highlight: false },
  { capital: "₦10,000,000", monthly: "₦1,000,000", yearly: "₦12,000,000", highlight: false },
];

export default function ProjectionTable() {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Projected Returns</Eyebrow>
          <Title>Example of Investment Projection</Title>
          <Subtitle>
            A clear illustration of the monthly and annual returns on your invested capital at the guaranteed 10% monthly ROI.
          </Subtitle>
        </Header>

        <TableWrap
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <TableHeader>
            <Table2 size={18} />
            <h3>Capital Invested (₦)</h3>
          </TableHeader>
          <Table role="table" aria-label="Investment projection table">
            <thead>
              <tr>
                <Th>Capital Invested (₦)</Th>
                <Th>Monthly ROI (10%)</Th>
                <Th>Yearly ROI (120%)</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const RowComponent = row.highlight ? TrHighlight : Tr;
                return (
                  <RowComponent key={row.capital}>
                    <Td><strong>{row.capital}</strong></Td>
                    <Td>{row.monthly}</Td>
                    <Td>{row.yearly}</Td>
                  </RowComponent>
                );
              })}
            </tbody>
          </Table>
        </TableWrap>

        <Note>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>
            Projections are based on the official 10% monthly return policy. Profits are paid directly to investors'
            bank accounts on the 30th of every month. Capital is protected under a 100% capital protection policy with
            a minimum 3-month lock period.
          </p>
        </Note>
      </Container>
    </Section>
  );
}