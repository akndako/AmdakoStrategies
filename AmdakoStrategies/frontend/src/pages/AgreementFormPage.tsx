import { useEffect, useState, useRef, useCallback } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
import type { PageView } from "../App";
import { FileText, Download, ArrowLeft, PenLine } from "lucide-react";
import LoadingSpinner, { LogoLoader } from "../components/LoadingSpinner";
import { theme } from "../theme";
import {
  downloadAgreementPdf,
  downloadAgreementSignature,
  getAgreement,
  saveAgreement,
  saveAgreementPdf,
  saveAgreementSignature,
  type AgreementSubmission,
} from "../services/agreementService";
import type { Agreement } from "../types";
import SignaturePad, { type SignaturePadHandle } from "../components/SignaturePad";
import { PageShell, NarrowContainer } from "../components/layout/pageLayout";

type AgreementFormPageProps = {
  user: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    stateOfOrigin: string;
    monthlyRoi: number;
  };
  onNavigate: (page: PageView) => void;
};

const Page = PageShell;

const Container = NarrowContainer;

const BackRow = styled.div`
  margin-bottom: 20px;
`;

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.medium};
  background: #fff;
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }
`;

const Card = styled.form`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 48px;
  box-shadow: ${theme.shadows.card};
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;

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
  -webkit-overflow-scrolling: touch;
  word-break: break-word;

  @media (max-width: 480px) {
    max-height: 280px;
    padding: 20px 16px;
  }

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

    @media (max-width: 480px) {
      font-size: 16px;
    }

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

const FormFields = styled.fieldset`
  min-width: 0;
  max-width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
`;

const Button = styled.button<{ variant?: "primary" | "outline" }>`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 13px 22px;
  min-width: 150px;

  @media (max-width: 600px) {
    min-width: 0;
    width: 100%;
  }
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
    background: #015a9e !important;
  }
`;

const SignatureSection = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.large};
  background: ${theme.colors.surfaceAlt};
  width: 100%;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }

  h4 {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    margin: 0 0 8px;
    color: ${theme.colors.text};
  }

  p {
    font-size: 14px;
    color: ${theme.colors.textSecondary};
    margin: 0 0 16px;
    line-height: 1.6;
  }
`;

const SignedMeta = styled.p`
  font-size: 13px;
  color: ${theme.colors.success};
  margin: 12px 0 0;
  font-weight: 500;
`;

const AckRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  line-height: 1.55;
  margin-bottom: 20px;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    accent-color: ${theme.colors.primary};
    flex-shrink: 0;
  }
`;

const identificationLabels: Record<NonNullable<Agreement["id_type"]>, string> = {
  nationalId: "National ID",
  votersCard: "Voter's Card",
  internationalPassport: "International Passport",
  driversLicense: "Driver's License",
};

function createAgreementPdf(agreement: Agreement, signatureDataUrl?: string | null): Blob {
  const pdf = new jsPDF();
  const margin = 18;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 20;

  const addText = (text: string, fontSize = 10, gap = 4, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, contentWidth) as string[];
    const textHeight = lines.length * (fontSize * 0.45);
    if (cursorY + textHeight > pageHeight - margin) {
      pdf.addPage();
      cursorY = margin;
    }
    pdf.text(lines, margin, cursorY);
    cursorY += textHeight + gap;
  };

  addText("AMDAKO STRATEGY NIG. LTD.", 16, 3, true);
  addText("INVESTMENT AGREEMENT", 13, 8, true);
  addText(`Agreement reference: ${agreement.id}`, 10, 3);
  addText(`Agreement date: ${new Date(agreement.created_at).toLocaleDateString()}`, 10, 8);
  addText("INVESTOR DETAILS", 11, 5, true);

  const fields: Array<[string, string]> = [
    ["Full name", agreement.full_name],
    ["Occupation", agreement.occupation || "Not provided"],
    ["Address", agreement.address || "Not provided"],
    ["Phone", agreement.phone],
    ["Email", agreement.email],
    ["Identification", agreement.id_type ? identificationLabels[agreement.id_type] : "Not provided"],
    ["ID number", agreement.id_number || "Not provided"],
    ["Investment amount", `NGN ${Number(agreement.investment_amount).toLocaleString()}`],
    ["Expected ROI", `${agreement.monthly_roi}% monthly`],
    ["Start date", agreement.start_date],
    ["Maturity date", agreement.maturity_date || "Open-ended"],
    ["Payment method", agreement.payment_method],
    ["Payment bank", agreement.payment_bank_name || "Not provided"],
    ["Payment account name", agreement.payment_account_name || "Not provided"],
    ["Transaction reference", agreement.transaction_reference || "Not provided"],
    ["Returns bank", agreement.returns_bank_name || "Not provided"],
    ["Returns account number", agreement.returns_account_number || "Not provided"],
    ["Returns account name", agreement.returns_account_name || "Not provided"],
    ["Returns phone", agreement.returns_phone_number || "Not provided"],
  ];

  fields.forEach(([label, value]) => addText(`${label}: ${value}`));
  addText("TERMS AND CONDITIONS", 11, 5, true);
  [
    "1. The Investor agrees to invest the stated amount with Amdako Strategy Nig. Ltd. under the agreed plan and duration.",
    "2. Returns on Investment (ROI) are paid directly to the investor's bank account on or before the 30th of every month.",
    "3. The Company reserves the right to manage invested funds in line with its trading and investment strategies.",
    "4. The Investor agrees not to hold the Company liable for losses incurred due to market volatility.",
    "5. This agreement is governed by the laws of the Federal Republic of Nigeria.",
    "By submitting this form, the Investor confirms that the information provided is true and acknowledges these terms and conditions.",
  ].forEach((term) => addText(term, 10, 5));

  if (signatureDataUrl) {
    addText("INVESTOR SIGNATURE", 11, 6, true);
    const sigWidth = 80;
    const sigHeight = 32;
    if (cursorY + sigHeight > pageHeight - margin) {
      pdf.addPage();
      cursorY = margin;
    }
    pdf.addImage(signatureDataUrl, "PNG", margin, cursorY, sigWidth, sigHeight);
    cursorY += sigHeight + 6;
    if (agreement.signed_at) {
      addText(`Signed on: ${new Date(agreement.signed_at).toLocaleString()}`, 10, 4);
    }
  }

  return pdf.output("blob");
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Unable to read signature image"));
    reader.readAsDataURL(blob);
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function AgreementFormPage({ user, onNavigate }: AgreementFormPageProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phone || "");
  const [occupation, setOccupation] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState<Agreement["id_type"]>(null);
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
  const date = new Date().toLocaleDateString();
  const [savedAgreement, setSavedAgreement] = useState<Agreement | null>(null);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loadingAgreement, setLoadingAgreement] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [signaturePreviewUrl, setSignaturePreviewUrl] = useState<string | null>(null);
  const signaturePadRef = useRef<SignaturePadHandle>(null);

  const buildSubmission = useCallback((): AgreementSubmission => {
    return {
      full_name: name.trim(),
      occupation: occupation.trim() || null,
      address: address.trim() || null,
      phone: phoneNumber.trim(),
      email: email.trim(),
      id_type: idType,
      id_number: idNumber.trim() || null,
      investment_amount: Number(investmentAmount),
      monthly_roi: user.monthlyRoi || 10,
      start_date: startDate,
      maturity_date: maturityDate || null,
      payment_method: paymentMethod,
      payment_bank_name: paymentBankName.trim() || null,
      payment_account_name: paymentAccountName.trim() || null,
      transaction_reference: transactionReference.trim() || null,
      returns_bank_name: returnsBankName.trim() || null,
      returns_account_number: returnsAccountNumber.trim() || null,
      returns_account_name: returnsAccountName.trim() || null,
      returns_phone_number: returnsPhoneNumber.trim() || null,
    };
  }, [
    name,
    occupation,
    address,
    phoneNumber,
    email,
    idType,
    idNumber,
    investmentAmount,
    user.monthlyRoi,
    startDate,
    maturityDate,
    paymentMethod,
    paymentBankName,
    paymentAccountName,
    transactionReference,
    returnsBankName,
    returnsAccountNumber,
    returnsAccountName,
    returnsPhoneNumber,
  ]);

  const validateFormFields = useCallback((): string | null => {
    if (!name.trim() || !phoneNumber.trim() || !email.trim()) {
      return "Please complete your name, phone, and email on the Your details step.";
    }
    if (!Number.isFinite(Number(investmentAmount)) || Number(investmentAmount) <= 0) {
      return "Enter an investment amount greater than zero.";
    }
    if (maturityDate && maturityDate < startDate) {
      return "Maturity date must be on or after the start date.";
    }
    return null;
  }, [name, phoneNumber, email, investmentAmount, maturityDate, startDate]);

  useEffect(() => {
    let active = true;

    getAgreement()
      .then((agreement) => {
        if (!active || !agreement) return;
        setSavedAgreement(agreement);
        setName(agreement.full_name);
        setEmail(agreement.email);
        setAddress(agreement.address || "");
        setPhoneNumber(agreement.phone);
        setOccupation(agreement.occupation || "");
        setIdNumber(agreement.id_number || "");
        setIdType(agreement.id_type);
        setInvestmentAmount(String(agreement.investment_amount));
        setStartDate(agreement.start_date);
        setMaturityDate(agreement.maturity_date || "");
        setPaymentMethod(agreement.payment_method);
        setPaymentBankName(agreement.payment_bank_name || "");
        setPaymentAccountName(agreement.payment_account_name || "");
        setTransactionReference(agreement.transaction_reference || "");
        setReturnsBankName(agreement.returns_bank_name || "");
        setReturnsAccountNumber(agreement.returns_account_number || "");
        setReturnsAccountName(agreement.returns_account_name || "");
        setReturnsPhoneNumber(agreement.returns_phone_number || "");
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load your saved agreement.");
        }
      })
      .finally(() => {
        if (active) setLoadingAgreement(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const path = savedAgreement?.signature_url;
    if (!path) {
      setSignaturePreviewUrl(null);
      return;
    }

    let objectUrl: string | null = null;
    downloadAgreementSignature(path)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setSignaturePreviewUrl(objectUrl);
      })
      .catch((loadError) => {
        console.error("Signature load error:", loadError);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [savedAgreement?.signature_url]);

  const persistAgreementDetails = async (): Promise<Agreement> => {
    const submission = buildSubmission();
    return saveAgreement(submission, savedAgreement?.id);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (savedAgreement?.status === "approved") {
      setError("Approved agreements cannot be changed.");
      return;
    }

    const validationError = validateFormFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!acknowledged) {
      setError("Please confirm that you agree to the terms before signing.");
      return;
    }

    const hasStoredSignature = Boolean(savedAgreement?.signature_url);
    const hasNewSignature = signaturePadRef.current?.hasSignature() ?? false;
    if (!hasStoredSignature && !hasNewSignature) {
      setError("Please draw your signature in the box to complete the agreement.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      let agreement = await persistAgreementDetails();
      let signatureDataUrl: string | null = null;

      if (hasNewSignature) {
        const signatureBlob = await signaturePadRef.current!.exportPngBlob();
        signatureDataUrl = signaturePadRef.current!.exportDataUrl();
        agreement = await saveAgreementSignature(agreement.id, signatureBlob);
        setSavedAgreement(agreement);
      } else if (hasStoredSignature && agreement.signature_url) {
        const blob = await downloadAgreementSignature(agreement.signature_url);
        signatureDataUrl = await blobToDataUrl(blob);
      }

      const documentPath = await saveAgreementPdf(
        agreement.id,
        createAgreementPdf(agreement, signatureDataUrl),
      );
      setSavedAgreement({ ...agreement, document_url: documentPath });
      setSuccess("Your signed agreement is saved securely. You can download your copy below.");
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : "Unable to save the agreement. Please try again.";
      console.error("Agreement save error:", err);
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadAgreement = async () => {
    if (!savedAgreement) return;

    setDownloading(true);
    setError(null);

    try {
      let documentPath = savedAgreement.document_url;
      if (!documentPath) {
        let signatureDataUrl: string | null = null;
        if (savedAgreement.signature_url) {
          const sigBlob = await downloadAgreementSignature(savedAgreement.signature_url);
          signatureDataUrl = await blobToDataUrl(sigBlob);
        }
        documentPath = await saveAgreementPdf(
          savedAgreement.id,
          createAgreementPdf(savedAgreement, signatureDataUrl),
        );
        setSavedAgreement({ ...savedAgreement, document_url: documentPath });
      }
      const pdf = await downloadAgreementPdf(documentPath);
      downloadBlob(pdf, "amdako-investment-agreement.pdf");
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "Unable to download the agreement.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Page>
      <Container>
        <BackRow>
          <BackLink type="button" onClick={() => onNavigate("dashboard")}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </BackLink>
        </BackRow>
        <Card onSubmit={handleSubmit}>
          {loadingAgreement ? (
            <LoadingSpinner message="Loading your agreement..." layout="center" />
          ) : (
            <>
          <Eyebrow>Official Investment Contract</Eyebrow>
          <Title>Agreement Form</Title>

          <FormFields disabled={saving || savedAgreement?.status === "approved"}>
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
              By submitting this form, the Investor confirms that all information provided is true and correct and acknowledges the terms and conditions of this investment.
            </p>
          </AgreementText>

          <FormGroup>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Investor full name"
              required
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
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Investor email address"
              required
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
            <label htmlFor="id-type">Means of Identification</label>
            <select
              id="id-type"
              value={idType || ""}
              onChange={(event) => setIdType((event.target.value || null) as Agreement["id_type"])}
            >
              <option value="">Select an identification type</option>
              <option value="nationalId">National ID</option>
              <option value="votersCard">Voter's Card</option>
              <option value="internationalPassport">International Passport</option>
              <option value="driversLicense">Driver's License</option>
            </select>
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
              min="0.01"
              step="0.01"
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Expected ROI</label>
            <input
              type="text"
              value={`${user.monthlyRoi || 10}% Monthly returns on investment`}
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
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Maturity Date</label>
            <input
              type="date"
              value={maturityDate}
              onChange={(e) => setMaturityDate(e.target.value)}
              min={startDate}
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

            <SignatureSection>
              <h4>Electronic signature</h4>
              <p>
                By signing below, you confirm that the information in this agreement is accurate and that
                you accept the terms and conditions.
              </p>
              <AckRow>
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  disabled={saving || loadingAgreement || savedAgreement?.status === "approved"}
                />
                <span>
                  I have read and agree to the investment agreement terms, and I confirm that all details
                  provided are true and correct.
                </span>
              </AckRow>
              <SignaturePad
                ref={signaturePadRef}
                disabled={saving || loadingAgreement || savedAgreement?.status === "approved"}
                existingImageUrl={signaturePreviewUrl}
              />
              {savedAgreement?.signed_at && (
                <SignedMeta>
                  Signed on {new Date(savedAgreement.signed_at).toLocaleString()}
                </SignedMeta>
              )}
            </SignatureSection>
          </FormFields>

          {error && (
            <div style={{
              background: "rgba(179, 64, 58, 0.08)",
              border: "1px solid rgba(179, 64, 58, 0.25)",
              color: theme.colors.danger,
              padding: "12px 16px",
              borderRadius: theme.radii.medium,
              fontSize: "14px",
              marginBottom: "16px",
              lineHeight: 1.5,
            }}>
              {error}
            </div>
          )}

          {success && (
            <div role="status" style={{
              background: "rgba(14, 138, 158, 0.08)",
              border: "1px solid rgba(14, 138, 158, 0.25)",
              color: theme.colors.success,
              padding: "12px 16px",
              borderRadius: theme.radii.medium,
              fontSize: "14px",
              marginBottom: "16px",
              lineHeight: 1.5,
            }}>
              {success}
            </div>
          )}

          <ButtonGroup>
            <Button
              type="submit"
              disabled={saving || loadingAgreement || savedAgreement?.status === "approved"}
            >
              {saving ? <LogoLoader compact /> : <PenLine size={16} />}
              {saving
                  ? "Saving..."
                  : savedAgreement?.signature_url
                    ? "Update signed agreement"
                    : "Sign & submit agreement"}
            </Button>
            {savedAgreement && (
              <DownloadButton
                type="button"
                onClick={handleDownloadAgreement}
                disabled={saving || downloading}
              >
                {downloading ? <LogoLoader compact /> : <Download size={16} />}
                {downloading ? "Preparing Copy..." : "Download Agreement"}
              </DownloadButton>
            )}
            <Button type="button" variant="outline" onClick={() => onNavigate("dashboard")} disabled={saving}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </ButtonGroup>
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
}