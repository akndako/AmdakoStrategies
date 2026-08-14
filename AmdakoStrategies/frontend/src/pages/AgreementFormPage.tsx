import { useState, useRef } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { PageView } from "../App";
import { FileText, Download, Eraser, ArrowLeft } from "lucide-react";
import { theme } from "../theme";

// Fix for TypeScript error: 'SignatureCanvas' cannot be used as a JSX component.
const SignatureCanvasComponent = SignatureCanvas as any;

type AgreementFormPageProps = {
  user: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  onNavigate: (page: PageView) => void;
};

const Page = styled.section`
  min-height: calc(100vh - 68px);
  padding: 60px 24px;
  background: ${theme.colors.ivory};

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 16px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 48px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 36px;
  }

  @media (max-width: 480px) {
    padding: 28px;
    border-radius: ${theme.radii.large};
  }
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 24px;
  color: ${theme.colors.text};

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.gold};
  margin-bottom: 10px;
`;

const AgreementText = styled.div`
  background: ${theme.colors.surfaceAlt};
  padding: 28px 24px;
  border-radius: ${theme.radii.large};
  margin-bottom: 32px;
  color: ${theme.colors.textSecondary};
  line-height: 1.8;
  max-height: 360px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.borderLight};

  &.expanded-for-print {
    max-height: none;
    overflow: visible;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: ${theme.colors.text};
    font-size: 20px;
    letter-spacing: -0.01em;
  }

  h4 {
    margin: 24px 0 12px;
    color: ${theme.colors.text};
    font-size: 17px;
  }

  p {
    margin: 0 0 12px;
    color: ${theme.colors.textSecondary};
    font-size: 0.9375rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    color: ${theme.colors.text};
    font-weight: 600;
    font-size: 14px;
  }

  input,
  select {
    width: 100%;
    padding: 13px 16px;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.medium};
    background: #fff;
    color: ${theme.colors.text};
    font-size: 15px;
    transition: all 0.2s ease;

    &::placeholder {
      color: ${theme.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 4px ${theme.colors.primaryLight};
    }
  }

  select {
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, ${theme.colors.textMuted} 50%),
      linear-gradient(135deg, ${theme.colors.textMuted} 50%, transparent 50%);
    background-position: calc(100% - 18px) calc(1em + 2px), calc(100% - 14px) calc(1em + 2px);
    background-size: 6px 6px, 6px 6px;
    background-repeat: no-repeat;
  }

  > div {
    margin-bottom: 12px;

    label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 400;
      font-size: 15px;
      color: ${theme.colors.textSecondary};
      cursor: pointer;

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        margin: 0;
        accent-color: ${theme.colors.primary};
        cursor: pointer;
      }
    }
  }

  .readonly {
    background: ${theme.colors.surfaceAlt};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }

  input + input {
    margin-top: 12px;
  }
`;

const SignatureContainer = styled.div`
  margin: 32px 0 28px;

  label {
    display: block;
    margin-bottom: 12px;
    color: ${theme.colors.text};
    font-weight: 600;
    font-size: 14px;
  }

  .sigCanvas {
    width: 100%;
    min-height: 220px;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.large};
    background: ${theme.colors.surfaceAlt};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: flex-end;
  margin-top: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: "primary" | "outline" }>`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 13px 22px;
  min-width: 150px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.01em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  ${({ variant }) =>
    variant === "outline"
      ? `
    background: #fff;
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};

    &:hover {
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
      background: ${theme.colors.primaryLight};
    }
  `
      : `
    background: ${theme.colors.primary};
    color: #fff;
    box-shadow: ${theme.shadows.button};

    &:hover {
      background: ${theme.colors.primaryDark};
      box-shadow: ${theme.shadows.buttonHover};
      transform: translateY(-1px);
    }
  `}

  @media (max-width: 600px) {
    width: 100%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DownloadButton = styled(Button)`
  background: ${theme.colors.success} !important;

  &:hover {
    background: #08916d !important;
  }
`;

const ClearButton = styled(Button)`
  background: ${theme.colors.danger} !important;

  &:hover {
    background: #c13e3e !important;
  }
`;

export default function AgreementFormPage({ user, onNavigate }: AgreementFormPageProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idTypes, setIdTypes] = useState({
    nationalId: false,
    votersCard: false,
    internationalPassport: false,
    driversLicense: false,
  });
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [maturityDate, setMaturityDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [paymentBankName, setPaymentBankName] = useState("");
  const [paymentAccountName, setPaymentAccountName] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const [returnsBankName, setReturnsBankName] = useState("");
  const [returnsAccountNumber, setReturnsAccountNumber] = useState("");
  const [returnsAccountName, setReturnsAccountName] = useState("");
  const [returnsPhoneNumber, setReturnsPhoneNumber] = useState("");
  const date = new Date().toISOString().split("T")[0];
  const [submitted, setSubmitted] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const agreementTextRef = useRef<HTMLDivElement>(null);

  const toggleIdType = (type: keyof typeof idTypes) => {
    setIdTypes((current) => ({ ...current, [type]: !current[type] }));
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = () => {
    if (!sigCanvas.current?.isEmpty()) {
      setSubmitted(true);
    } else {
      alert("Please sign the agreement before submitting.");
    }
  };

  const downloadAgreement = async () => {
    if (formRef.current) {
      // Temporarily expand the scrollable text so it's fully captured in the PDF
      if (agreementTextRef.current) {
        agreementTextRef.current.classList.add("expanded-for-print");
      }

      const canvas = await html2canvas(formRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 standard height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("agreement.pdf");

      // Revert the expansion
      if (agreementTextRef.current) {
        agreementTextRef.current.classList.remove("expanded-for-print");
      }
    }
  };

  return (
    <Page>
      <Container>
        <Card ref={formRef}>
          <Eyebrow>Official Investment Contract</Eyebrow>
          <Title>Agreement Form</Title>

          <AgreementText ref={agreementTextRef}>
            <h3>AMDAKO STRATEGY NIG. LTD. INVESTMENT AGREEMENT FORM</h3>
            <p>
              This Investment Agreement is made on {date} between Amdako Strategy Nig. Ltd. and the investor named below.
            </p>
            <h4>Terms and Conditions</h4>
            <p>
              1. The Investor agrees to invest the stated amount with Amdako Strategy Nig. Ltd. under the agreed plan and duration.
            </p>
            <p>
              2. Returns on Investment (ROI) are paid directly to investors' bank account on or before the 30th of every month.
            </p>
            <p>
              3. The Company reserves the right to manage all invested funds at its discretion in line with its trading and investment strategies.
            </p>
            <p>
              4. The Investor agrees not to hold the Company liable for losses incurred due to market volatility.
            </p>
            <p>
              5. This agreement is governed by the laws of the Federal Republic of Nigeria.
            </p>
            <p>
              By signing below, the Investor confirms that all information provided is true and correct and agrees to the terms and conditions of this investment.
            </p>
          </AgreementText>

          <FormGroup>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Investor full name"
            />
          </FormGroup>

          <FormGroup>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Investor address"
            />
          </FormGroup>

          <FormGroup>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Investor phone number"
            />
          </FormGroup>

          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Investor email address"
            />
          </FormGroup>

          <FormGroup>
            <label>Occupation</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="Investor occupation"
            />
          </FormGroup>

          <FormGroup>
            <label>Means of Identification</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={idTypes.nationalId}
                  onChange={() => toggleIdType("nationalId")}
                />
                National ID
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={idTypes.votersCard}
                  onChange={() => toggleIdType("votersCard")}
                />
                Voter's Card
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={idTypes.internationalPassport}
                  onChange={() => toggleIdType("internationalPassport")}
                />
                International Passport
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={idTypes.driversLicense}
                  onChange={() => toggleIdType("driversLicense")}
                />
                Driver's License
              </label>
            </div>
          </FormGroup>

          <FormGroup>
            <label>ID Number</label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Identification number"
            />
          </FormGroup>

          <FormGroup>
            <label>Investment Amount (₦)</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder="Investment amount"
            />
          </FormGroup>

          <FormGroup>
            <label>Expected ROI</label>
            <input
              type="text"
              value="10% Monthly returns on investment"
              readOnly
              className="readonly"
            />
          </FormGroup>

          <FormGroup>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Maturity Date</label>
            <input
              type="date"
              value={maturityDate}
              onChange={(e) => setMaturityDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Crypto</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Bank Name</label>
            <input
              type="text"
              value={paymentBankName}
              onChange={(e) => setPaymentBankName(e.target.value)}
              placeholder="Bank name for payment"
            />
          </FormGroup>

          <FormGroup>
            <label>Account Name</label>
            <input
              type="text"
              value={paymentAccountName}
              onChange={(e) => setPaymentAccountName(e.target.value)}
              placeholder="Account name for payment"
            />
          </FormGroup>

          <FormGroup>
            <label>Transaction Reference</label>
            <input
              type="text"
              value={transactionReference}
              onChange={(e) => setTransactionReference(e.target.value)}
              placeholder="Transaction reference"
            />
          </FormGroup>

          <FormGroup>
            <label>Investors' Bank Account Details for Monthly Returns</label>
            <input
              type="text"
              value={returnsBankName}
              onChange={(e) => setReturnsBankName(e.target.value)}
              placeholder="Bank name"
            />
            <input
              type="text"
              value={returnsAccountNumber}
              onChange={(e) => setReturnsAccountNumber(e.target.value)}
              placeholder="Account number"
            />
            <input
              type="text"
              value={returnsAccountName}
              onChange={(e) => setReturnsAccountName(e.target.value)}
              placeholder="Account name"
            />
            <input
              type="tel"
              value={returnsPhoneNumber}
              onChange={(e) => setReturnsPhoneNumber(e.target.value)}
              placeholder="Phone number"
            />
          </FormGroup>

          <SignatureContainer>
            <label>Signature</label>
            <SignatureCanvasComponent
              ref={sigCanvas}
              canvasProps={{
                className: "sigCanvas",
                height: 200,
              }}
            />
          </SignatureContainer>

          <ButtonGroup>
            <ClearButton onClick={clearSignature}>
              <Eraser size={16} />
              Clear Signature
            </ClearButton>
            {!submitted ? (
              <Button onClick={handleSubmit}>
                <FileText size={16} />
                Submit Agreement
              </Button>
            ) : (
              <DownloadButton onClick={downloadAgreement}>
                <Download size={16} />
                Download Agreement
              </DownloadButton>
            )}
            <Button variant="outline" onClick={() => onNavigate("dashboard")}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </ButtonGroup>
        </Card>
      </Container>
    </Page>
  );
}