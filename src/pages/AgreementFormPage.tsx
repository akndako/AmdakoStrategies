import { useState, useRef } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type AgreementFormPageProps = {
  user: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  onNavigate: (page: string) => void;
};

const Page = styled.section`
  min-height: calc(100vh - 120px);
  padding: 100px 80px;
  background: linear-gradient(180deg, rgba(124,108,246,0.08) 0%, transparent 100%);

  @media (max-width: 1024px) {
    padding: 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 600px) {
    padding: 50px 18px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Card = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(12, 16, 34, 0.95);
  border: 1px solid rgba(124, 108, 246, 0.15);
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 600px) {
    padding: 28px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 24px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const AgreementText = styled.div`
  background: rgba(255, 255, 255, 0.07);
  padding: 28px 26px;
  border-radius: 18px;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  max-height: 360px;
  overflow-y: auto;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #f8fafc;
    font-size: 22px;
    letter-spacing: 0.02em;
  }

  h4 {
    margin: 24px 0 12px;
    color: #e5e7eb;
    font-size: 18px;
  }

  p {
    margin: 0 0 12px;
    color: rgba(255, 255, 255, 0.85);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  min-width: 0;

  label {
    display: block;
    margin-bottom: 10px;
    color: #f8fafc;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  input,
  select {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  input::placeholder,
  select::placeholder {
    color: rgba(255, 255, 255, 0.55);
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: rgba(124, 108, 246, 0.85);
    box-shadow: 0 0 0 6px rgba(124, 108, 246, 0.12);
    background: rgba(255, 255, 255, 0.12);
  }

  select {
    appearance: none;
    background-image:
      linear-gradient(45deg, transparent 50%, #fff 50%),
      linear-gradient(135deg, #fff 50%, transparent 50%);
    background-position: calc(100% - 18px) calc(1em + 2px), calc(100% - 14px) calc(1em + 2px);
    background-size: 6px 6px, 6px 6px;
    background-repeat: no-repeat;
  }

  > div {
    margin-bottom: 12px;
  }
`;

const SignatureContainer = styled.div`
  margin: 34px 0 28px;

  label {
    display: block;
    margin-bottom: 12px;
    color: #f8fafc;
    font-weight: 700;
  }

  .sigCanvas {
    width: 100%;
    min-height: 220px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: 16px;
  padding: 14px 24px;
  min-width: 150px;
  background: linear-gradient(135deg, #7c6cf6, #a855f7);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 35px rgba(124, 108, 246, 0.25);
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 14px 20px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DownloadButton = styled(Button)`
  background: linear-gradient(135deg, #10b981, #059669);
`;

const ClearButton = styled(Button)`
  background: linear-gradient(135deg, #ef4444, #dc2626);
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
      const canvas = await html2canvas(formRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('agreement.pdf');
    }
  };

  return (
    <Page>
      <Card ref={formRef}>
        <Title>Agreement Form</Title>
        
        <AgreementText>
          <h3>AMDAKO STRATEGY NIG. LTD. INVESTMENT AGREEMENT FORM</h3>
          <p>
            This Investment Agreement is made on {date} between Amdako Strategy Nig. Ltd. and the investor named below.
          </p>
          <h4>Terms and Conditions</h4>
          <p>
            1. The Investor agrees to invest the stated amount with Amdako Strategy Nig. Ltd. under the agreed plan and duration.
          </p>
          <p>
            2. Returns on Investment (ROI) are paid directly to investors’ bank account on or before the 30th of every month.
          </p>
          <p>
            3. The Company reserves the right to manage all invested funds at its discretion in line with its trading and investment strategies.
          </p>
          <p>
            4. The Investor agrees not to hold the Company liable for losses incurred due to market volatility.
          </p>
          <p>
            5. The company will be liable for any losses incurred due to market volatility.
          </p>
          <p>
            6. This agreement is governed by the laws of the Federal Republic of Nigeria.
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
              Voter’s Card
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
              Driver’s License
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
          <label>Investors’ Bank Account Details for Monthly Returns</label>
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
            style={{ marginTop: '12px' }}
          />
          <input
            type="text"
            value={returnsAccountName}
            onChange={(e) => setReturnsAccountName(e.target.value)}
            placeholder="Account name"
            style={{ marginTop: '12px' }}
          />
          <input
            type="tel"
            value={returnsPhoneNumber}
            onChange={(e) => setReturnsPhoneNumber(e.target.value)}
            placeholder="Phone number"
            style={{ marginTop: '12px' }}
          />
        </FormGroup>

        <SignatureContainer>
          <label>Signature</label>
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className: 'sigCanvas',
              width: 500,
              height: 200,
            }}
          />
        </SignatureContainer>

        <ButtonGroup>
          <ClearButton onClick={clearSignature}>Clear Signature</ClearButton>
          {!submitted ? (
            <Button onClick={handleSubmit}>Submit Agreement</Button>
          ) : (
            <DownloadButton onClick={downloadAgreement}>Download Agreement</DownloadButton>
          )}
          <Button onClick={() => onNavigate('dashboard')}>Back to Dashboard</Button>
        </ButtonGroup>
      </Card>
    </Page>
  );
}