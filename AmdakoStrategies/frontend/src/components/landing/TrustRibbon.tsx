import styled from "styled-components";
import { TrendingUp, Calendar, DollarSign, Wallet } from "lucide-react";
import { theme } from "../../theme";

const Ribbon = styled.div`
  position: relative;
  z-index: 2;
  margin-top: -1px;
  background: ${theme.colors.secondary};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${theme.radii.medium};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(201, 162, 39, 0.35);
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: ${theme.radii.small};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(2, 113, 196, 0.2);
    color: ${theme.colors.gold};
  }

  strong {
    display: block;
    font-family: "Inter", sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
    letter-spacing: -0.02em;
  }

  span {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.62);
    line-height: 1.4;
  }
`;

const metrics = [
  { icon: TrendingUp, value: "10%", label: "Monthly ROI on invested capital" },
  { icon: DollarSign, value: "$30", label: "Referral bonus per confirmed investor" },
  { icon: Calendar, value: "30th", label: "Monthly profit payout date" },
  { icon: Wallet, value: "₦750K", label: "Minimum entry amount" },
];

export default function TrustRibbon() {
  return (
    <Ribbon aria-label="Key investment highlights">
      <Inner>
        {metrics.map(({ icon: Icon, value, label }) => (
          <Item key={label}>
            <div className="icon" aria-hidden>
              <Icon size={18} />
            </div>
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </Item>
        ))}
      </Inner>
    </Ribbon>
  );
}
