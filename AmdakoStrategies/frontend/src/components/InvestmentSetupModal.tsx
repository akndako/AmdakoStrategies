import { useState } from "react";
import styled from "styled-components";
import { ArrowRight, X } from "lucide-react";
import { theme } from "../theme";
import { createInvestment } from "../services/investmentService";
import { getOrCreateInvestorAccount } from "../services/investorAccountService";
import type { AuthState } from "../types";

type InvestmentSetupModalProps = {
  authState: AuthState;
  onComplete: () => void;
  onClose?: () => void;
};

const MIN_INVESTMENT = 750000;
const MAX_INVESTMENT = 10000000;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 24, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: ${theme.radii.xl};
  box-shadow: 0 20px 60px rgba(26, 26, 24, 0.15);
  width: min(520px, 100%);
  max-height: min(80vh, 600px);
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 32px 36px 20px;
  border-bottom: 1px solid ${theme.colors.borderLight};
  position: relative;

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 12px;
  }

  h2 {
    font-size: 24px;
    color: ${theme.colors.text};
    margin-bottom: 8px;
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: 0.9375rem;
    line-height: 1.6;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.surfaceAlt};
    color: ${theme.colors.text};
  }
`;

const ModalBody = styled.div`
  padding: 32px 36px;

  @media (max-width: 480px) {
    padding: 24px 24px;
  }
`;

const AmountInput = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${theme.colors.surfaceAlt};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.radii.medium};
  padding: 16px 20px;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${theme.colors.primary};
    background: #fff;
  }

  .currency {
    font-size: 18px;
    font-weight: 700;
    color: ${theme.colors.textMuted};
    min-width: 40px;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 20px;
    font-weight: 700;
    color: ${theme.colors.text};
    font-variant-numeric: tabular-nums;

    &::placeholder {
      color: ${theme.colors.textMuted};
    }
  }
`;

const ValidationMessage = styled.div<{ $valid?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: ${theme.radii.medium};
  background: ${({ $valid }) =>
    $valid
      ? "rgba(2, 113, 196, 0.08)"
      : "rgba(179, 64, 58, 0.08)"};
  color: ${({ $valid }) =>
    $valid ? theme.colors.success : theme.colors.danger};
  border: 1px solid
    ${({ $valid }) =>
      $valid
        ? "rgba(2, 113, 196, 0.2)"
        : "rgba(179, 64, 58, 0.2)"};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  background: ${theme.colors.surfaceAlt};
  border-radius: ${theme.radii.medium};
  padding: 16px;
  text-align: center;

  .label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${theme.colors.textMuted};
    margin-bottom: 6px;
  }

  .value {
    font-size: 18px;
    font-weight: 700;
    color: ${theme.colors.text};
    font-variant-numeric: tabular-nums;
  }
`;

const ModalFooter = styled.div`
  padding: 20px 36px 32px;
  border-top: 1px solid ${theme.colors.borderLight};
  display: flex;
  gap: 14px;
  justify-content: flex-end;

  @media (max-width: 480px) {
    padding: 20px 24px 24px;
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: "primary" | "outline" }>`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 14px 24px;
  font-weight: 600;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.button};

  ${({ variant }) =>
    variant === "outline"
      ? `
    background: #fff;
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};
    box-shadow: none;

    &:hover {
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
      background: ${theme.colors.primaryLight};
    }
  `
      : `
    background: ${theme.colors.primary};
    color: #fff;

    &:hover {
      background: ${theme.colors.primaryDark};
      box-shadow: ${theme.shadows.buttonHover};
      transform: translateY(-1px);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  background: rgba(214, 69, 69, 0.08);
  border: 1px solid rgba(214, 69, 69, 0.2);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.5;
`;

export default function InvestmentSetupModal({
  authState,
  onComplete,
  onClose,
}: InvestmentSetupModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!authState) return null;

  const numericAmount = Number(amount);
  const isValidAmount =
    !isNaN(numericAmount) &&
    numericAmount >= MIN_INVESTMENT &&
    numericAmount <= MAX_INVESTMENT;

  const handleProceed = async () => {
    if (!isValidAmount) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create an investment record with the specified amount
      await createInvestment({
        investment_name: "Amdako Strategic Investment",
        description: "Initial investment via registration flow",
        amount: numericAmount,
        current_value: numericAmount,
        profit_loss: 0,
        monthly_roi: 10,
        status: "active",
        start_date: new Date().toISOString().split("T")[0],
      });

      // Create or retrieve the investor account
      await getOrCreateInvestorAccount();

      onComplete();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to set up your investment. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const formatNaira = (value: number): string => {
    return `₦${value.toLocaleString("en-NG")}`;
  };

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <CloseButton onClick={onClose} disabled={loading}>
            <X size={18} />
          </CloseButton>
          <div className="eyebrow">Investment Setup</div>
          <h2>Set Up Your Investment</h2>
          <p>
            Enter the amount you wish to invest. Your investment will earn a
            guaranteed 10% monthly ROI.
          </p>
        </ModalHeader>

        <ModalBody>
          <InfoGrid>
            <InfoItem>
              <div className="label">Minimum Investment</div>
              <div className="value">{formatNaira(MIN_INVESTMENT)}</div>
            </InfoItem>
            <InfoItem>
              <div className="label">Maximum Investment</div>
              <div className="value">{formatNaira(MAX_INVESTMENT)}</div>
            </InfoItem>
          </InfoGrid>

          <AmountInput>
            <span className="currency">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min={MIN_INVESTMENT}
              max={MAX_INVESTMENT}
              disabled={loading}
            />
          </AmountInput>

          {amount && !isValidAmount && (
            <ValidationMessage $valid={false}>
              Investment amount must be between ₦{MIN_INVESTMENT.toLocaleString()} and ₦{MAX_INVESTMENT.toLocaleString()}.
            </ValidationMessage>
          )}

          {amount && isValidAmount && (
            <ValidationMessage $valid={true}>
              ✓ Valid investment amount
            </ValidationMessage>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ModalBody>

        <ModalFooter>
          {onClose && (
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button
            onClick={handleProceed}
            disabled={loading || !isValidAmount}
          >
            {loading ? "Setting up..." : "Proceed to Dashboard"}
            {!loading && <ArrowRight size={16} />}
          </Button>
        </ModalFooter>
      </Modal>
    </Overlay>
  );
}
