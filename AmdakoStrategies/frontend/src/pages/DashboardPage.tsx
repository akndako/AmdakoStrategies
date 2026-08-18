import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import {
  FileText,
  TrendingUp,
  Wallet,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Home,
  Percent,
  ArrowDownRight,
  ArrowUpRight,
  AlertTriangle,
  Eye,
  Loader2,
  LogOut,
  Bell,
  CheckCheck,
  User,
  Edit,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import type { PageView } from "../App";
import { theme } from "../theme";
import { getCurrentProfile } from "../services/profileService";
import { getInvestments } from "../services/investmentService";
import { getTransactions } from "../services/transactionService";
import { getAgreement } from "../services/agreementService";
import { getNotifications, markAllNotificationsAsRead } from "../services/notificationService";
import { getInvestorAccount } from "../services/investorAccountService";
import type { Profile, Investment, Transaction, Agreement, DashboardSummary, InvestorAccount, Notification, AuthUser } from "../types";

type DashboardPageProps = {
  user: AuthUser;
  onLogout: () => void;
  onNavigate: (page: PageView) => void;
  refreshKey?: number;
};

const Page = styled.section`
  min-height: calc(100vh - 68px);
  padding: 40px 24px 80px;
  background: ${theme.colors.ivory};

  @media (max-width: 768px) {
    padding: 28px 20px 60px;
  }

  @media (max-width: 480px) {
    padding: 20px 16px 48px;
  }
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 8px;
  }

  h2 {
    font-size: 26px;
    margin-bottom: 8px;

    @media (max-width: 480px) {
      font-size: 22px;
    }
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
    font-size: 0.9375rem;
  }
`;

const Button = styled.button<{ variant?: "primary" | "outline" | "success" }>`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 12px 20px;
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case "success":
        return `
          background: ${theme.colors.success};
          color: #fff;
          box-shadow: ${theme.shadows.button};

          &:hover {
            background: #0a6e80;
            box-shadow: ${theme.shadows.buttonHover};
            transform: translateY(-1px);
          }
        `;
      case "outline":
        return `
          background: #fff;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
            background: ${theme.colors.primaryLight};
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: #fff;
          box-shadow: ${theme.shadows.button};

          &:hover {
            background: ${theme.colors.primaryDark};
            box-shadow: ${theme.shadows.buttonHover};
            transform: translateY(-1px);
          }
        `;
    }
  }}

  @media (max-width: 480px) {
    width: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(179, 64, 58, 0.08);
  border: 1px solid rgba(179, 64, 58, 0.25);
  border-radius: ${theme.radii.medium};
  padding: 14px 18px;
  margin-bottom: 24px;
  color: ${theme.colors.danger};
  font-size: 14px;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
  }
`;

const LoadingCard = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 300px;
  color: ${theme.colors.textSecondary};
  font-size: 15px;

  svg {
    animation: spin 1s linear infinite;
    color: ${theme.colors.primary};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

/* ============ HERO SECTION ============ */

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioHero = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  border-radius: ${theme.radii.xl};
  padding: 36px 40px;
  color: #fff;
  box-shadow: 0 12px 32px rgba(2, 113, 196, 0.25);

  @media (max-width: 768px) {
    padding: 28px 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -40%;
    right: -10%;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(201, 162, 39, 0.18), transparent);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hero-balance-label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 6px;
  }

  .hero-balance {
    font-size: 38px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    font-variant-numeric: tabular-nums;
    margin-bottom: 20px;
    letter-spacing: -0.02em;

    @media (max-width: 480px) {
      font-size: 30px;
    }
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
  }

  .hero-stat {
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.65);
      margin-bottom: 4px;
    }

    .value {
      font-size: 17px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      font-variant-numeric: tabular-nums;

      @media (max-width: 480px) {
        font-size: 15px;
      }
    }
  }

  .hero-account-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);

    svg {
      color: ${theme.colors.gold};
      flex-shrink: 0;
    }

    .account-number {
      font-size: 14px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      font-variant-numeric: tabular-nums;
      color: rgba(255, 255, 255, 0.9);
    }

    .account-status {
      margin-left: auto;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }
  }
`;

const ProfileSideCard = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 28px;
  box-shadow: ${theme.shadows.card};
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 22px;
  }

  .profile-top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }

  .profile-name {
    h3 {
      font-size: 1.15rem;
      color: ${theme.colors.text};
      margin-bottom: 4px;
    }

    .role {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: ${theme.colors.gold};
    }
  }

  .profile-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 18px;
  }

  .profile-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    background: ${theme.colors.surfaceAlt};
    border: 1px solid ${theme.colors.borderLight};
    border-radius: ${theme.radii.medium};

    svg {
      color: ${theme.colors.primary};
      flex-shrink: 0;
    }

    p {
      font-size: 0.8125rem;
      color: ${theme.colors.textSecondary};
      line-height: 1.4;
      overflow-wrap: anywhere;
    }
  }

  .profile-footer {
    margin-top: auto;
    display: flex;
    gap: 10px;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Playfair Display', Georgia, serif;
  border: 3px solid ${theme.colors.gold};
  flex-shrink: 0;
`;

const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${theme.colors.gold};
  flex-shrink: 0;
`;

const StatusBadge = styled.span<{ tone: "active" | "completed" | "pending" | "failed" | "cancelled" | "approved" | "rejected" }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;

  ${({ tone }) => {
    switch (tone) {
      case "active":
      case "completed":
      case "approved":
        return `
          background: rgba(2, 113, 196, 0.1);
          color: ${theme.colors.primary};
        `;
      case "pending":
        return `
          background: rgba(201, 162, 39, 0.12);
          color: ${theme.colors.warning};
        `;
      case "failed":
      case "rejected":
      case "cancelled":
        return `
          background: rgba(179, 64, 58, 0.1);
          color: ${theme.colors.danger};
        `;
    }
  }}
`;

const ProfileStatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 14px;

  ${({ $status }) => {
    if ($status === "active") {
      return `
        background: rgba(2, 113, 196, 0.1);
        color: ${theme.colors.primary};
      `;
    }
    if ($status === "pending") {
      return `
        background: rgba(201, 162, 39, 0.12);
        color: ${theme.colors.warning};
      `;
    }
    return `
      background: rgba(179, 64, 58, 0.1);
      color: ${theme.colors.danger};
    `;
  }}
`;

const EditProfileButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radii.medium};
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    background: ${theme.colors.primary};
    color: #fff;
  }
`;

/* ============ STATS GRID ============ */

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const StatCard = styled.div<{ accent?: "blue" | "gold" | "red" }>`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 16px;
  }

  .stat-icon {
    width: 38px;
    height: 38px;
    border-radius: ${theme.radii.medium};
    background: ${({ accent }) =>
      accent === "gold" ? theme.colors.goldLight : accent === "red" ? "rgba(179, 64, 58, 0.08)" : theme.colors.primaryLight};
    color: ${({ accent }) =>
      accent === "gold" ? theme.colors.warning : accent === "red" ? theme.colors.danger : theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .stat-body {
    h3 {
      font-size: 12px;
      color: ${theme.colors.textMuted};
      font-weight: 500;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
    }

    p {
      font-size: 20px;
      font-weight: 700;
      color: ${theme.colors.text};
      font-variant-numeric: tabular-nums;

      @media (max-width: 480px) {
        font-size: 17px;
      }
    }
  }

  .stat-sub {
    font-size: 11px;
    color: ${theme.colors.textMuted};
    margin-top: 4px;
    font-family: 'Inter', sans-serif;
  }
`;

/* ============ MAIN CONTENT GRID ============ */

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 24px 28px;
  box-shadow: ${theme.shadows.card};
  margin-bottom: 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px 18px;
  }

  @media (max-width: 480px) {
    padding: 16px 14px;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;

  h3 {
    font-size: 1.0625rem;
    color: ${theme.colors.text};
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
      color: ${theme.colors.primary};
    }
  }
`;

const TableWrap = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 560px;

  @media (max-width: 640px) {
    min-width: 500px;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.textMuted};
  background: ${theme.colors.surfaceAlt};
  border-bottom: 1px solid ${theme.colors.borderLight};
  white-space: nowrap;

  &:first-child {
    border-radius: ${theme.radii.small} 0 0 ${theme.radii.small};
  }

  &:last-child {
    border-radius: 0 ${theme.radii.small} ${theme.radii.small} 0;
  }
`;

const Td = styled.td`
  padding: 12px 14px;
  font-size: 0.84375rem;
  color: ${theme.colors.textSecondary};
  border-bottom: 1px solid ${theme.colors.borderLight};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

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

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 20px;
  color: ${theme.colors.textMuted};

  p {
    font-size: 0.875rem;
    color: ${theme.colors.textMuted};
  }
`;

const AmountText = styled.span<{ positive?: boolean; negative?: boolean }>`
  font-weight: 600;
  color: ${({ positive, negative }) =>
    positive ? theme.colors.success : negative ? theme.colors.danger : theme.colors.text};
`;

const ProfitLossPill = styled.span<{ positive?: boolean; negative?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;

  ${({ positive, negative }) =>
    positive
      ? `background: rgba(2, 113, 196, 0.1); color: ${theme.colors.primary};`
      : negative
      ? `background: rgba(179, 64, 58, 0.1); color: ${theme.colors.danger};`
      : `background: ${theme.colors.surfaceAlt}; color: ${theme.colors.textMuted};`}
`;

/* ============ NOTIFICATIONS ============ */

const NotificationList = styled.div`
  max-height: 420px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.surfaceAlt};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 10px;

    &:hover {
      background: ${theme.colors.textMuted};
    }
  }
`;

const NotificationItem = styled.div<{ $unread: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${theme.radii.medium};
  background: ${({ $unread }) => ($unread ? theme.colors.primaryLight : "#fff")};
  border: 1px solid ${theme.colors.borderLight};
  margin-bottom: 8px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  .notification-icon {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${theme.colors.primary};
  }

  .notification-content {
    flex: 1;
  }

  .notification-title {
    font-size: 13px;
    font-weight: 600;
    color: ${theme.colors.text};
    margin-bottom: 2px;
  }

  .notification-message {
    font-size: 12px;
    color: ${theme.colors.textSecondary};
    line-height: 1.5;
  }

  .notification-time {
    font-size: 11px;
    color: ${theme.colors.textMuted};
    margin-top: 4px;
    font-family: 'Inter', sans-serif;
  }

  .unread-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${theme.colors.primary};
    flex-shrink: 0;
    margin-top: 4px;
  }
`;

const NotificationActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

/* ============ AGREEMENT BANNER ============ */

const AgreementBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-left: 3px solid ${theme.colors.gold};
  border-radius: ${theme.radii.large};
  padding: 16px 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    padding: 14px 16px;
    flex-direction: column;
    align-items: flex-start;
  }

  .agreement-info {
    display: flex;
    align-items: center;
    gap: 14px;

    svg {
      color: ${theme.colors.gold};
      flex-shrink: 0;
    }

    h4 {
      font-size: 14px;
      color: ${theme.colors.text};
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }

    p {
      font-size: 12px;
      color: ${theme.colors.textMuted};
    }
  }
`;

/* ============ UTILITY ============ */

const formatNaira = (value: number): string => {
  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default function DashboardPage({ user, onLogout, onNavigate }: DashboardPageProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [investorAccount, setInvestorAccount] = useState<InvestorAccount | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [summary, setSummary] = useState<DashboardSummary>({
    totalInvested: 0,
    currentValue: 0,
    profitLoss: 0,
    performance: 0,
    openInvestments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Fetch each data source independently so one failure doesn't break the entire dashboard
    const results: {
      profile: Profile | null;
      investorAccount: InvestorAccount | null;
      investments: Investment[];
      transactions: Transaction[];
      agreement: Agreement | null;
      notifications: Notification[];
    } = {
      profile: null,
      investorAccount: null,
      investments: [],
      transactions: [],
      agreement: null,
      notifications: [],
    };

    // Fetch profile
    try {
      results.profile = await getCurrentProfile();
    } catch (err) {
      console.error("Profile fetch error:", err);
    }

    // Fetch investor account
    try {
      results.investorAccount = await getInvestorAccount();
    } catch (err) {
      console.error("Investor account fetch error:", err);
    }

    // Fetch investments
    try {
      results.investments = await getInvestments();
    } catch (err) {
      console.error("Investments fetch error:", err);
    }

    // Fetch transactions
    try {
      results.transactions = await getTransactions();
    } catch (err) {
      console.error("Transactions fetch error:", err);
    }

    // Fetch agreement
    try {
      results.agreement = await getAgreement();
    } catch (err) {
      console.error("Agreement fetch error:", err);
    }

    // Fetch notifications
    try {
      results.notifications = await getNotifications();
    } catch (err) {
      console.error("Notifications fetch error:", err);
    }

    // Update all state
    setProfile(results.profile);
    setInvestorAccount(results.investorAccount);
    setInvestments(results.investments || []);
    setTransactions(results.transactions || []);
    setAgreement(results.agreement);
    setNotifications(results.notifications || []);

    // Calculate summary from real investment data
    const investmentsList = results.investments || [];
    const totalInvested = investmentsList.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const currentValue = investmentsList.reduce((sum, inv) => sum + Number(inv.current_value), 0);
    const profitLoss = currentValue - totalInvested;
    const performance = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;
    const openInvestments = investmentsList.filter((inv) => inv.status === "active").length;

    setSummary({
      totalInvested,
      currentValue,
      profitLoss,
      performance,
      openInvestments,
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleMarkAllNotificationsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  if (loading) {
    return (
      <Page>
        <Container>
          <LoadingCard>
            <Loader2 size={32} />
            <p>Loading your dashboard...</p>
          </LoadingCard>
        </Container>
      </Page>
    );
  }

  const displayName = profile?.full_name || user.name;
  const displayPhone = profile?.phone || user.phone;
  const displayEmail = profile?.email || user.email;
  const displayStatus = profile?.status || "active";
  const displayAddress = profile?.address || user.address || "Not provided";
  const displayLocation = profile?.location || user.location || "Not provided";
  const displayStateOfOrigin = profile?.state_of_origin || user.stateOfOrigin || "Not provided";
  const displayMonthlyRoi = profile?.monthly_roi ?? user.monthlyRoi ?? 10;

  const agreementCompleted = agreement != null && agreement.status === "approved";
  const unreadNotificationCount = notifications.filter((n) => !n.is_read).length;
  const accountBalance = investorAccount ? Number(investorAccount.available_balance) : summary.currentValue;

  return (
    <Page>
      <Container>
        <Header>
          <div>
            <div className="eyebrow">Investor Dashboard</div>
            <h2>Welcome, {displayName}</h2>
            <p>Track your investments, review transactions, and manage your portfolio.</p>
          </div>
          {/* <Button variant="outline" onClick={onLogout} style={{ height: "40px", width: "auto" }}>
            <LogOut size={16} />
            Logout
          </Button> */}
        </Header>

        {error && (
          <ErrorBanner>
            <AlertTriangle size={18} />
            <span>{error}</span>
          </ErrorBanner>
        )}

        {/* ===== HERO: Portfolio Overview + Profile Sidebar ===== */}
        <HeroGrid>
          <PortfolioHero>
            <div className="hero-eyebrow">
              <ShieldCheck size={14} />
              Portfolio Overview
            </div>
            <div className="hero-balance-label">Total Portfolio Balance</div>
            <div className="hero-balance">{formatNaira(accountBalance)}</div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="label">Total Invested</div>
                <div className="value">{formatNaira(summary.totalInvested)}</div>
              </div>
              <div className="hero-stat">
                <div className="label">Current Value</div>
                <div className="value">{formatNaira(summary.currentValue)}</div>
              </div>
              <div className="hero-stat">
                <div className="label">Performance</div>
                <div className="value" style={{ color: summary.performance >= 0 ? "#7FD1FF" : "#FFB4A8" }}>
                  {summary.performance >= 0 ? "+" : ""}
                  {summary.performance.toFixed(2)}%
                </div>
              </div>
            </div>

            {investorAccount && (
              <div className="hero-account-row">
                <CreditCard size={16} />
                <span className="account-number">{investorAccount.account_number}</span>
                <span className="account-status">{investorAccount.status}</span>
              </div>
            )}
          </PortfolioHero>

          <ProfileSideCard>
            <div className="profile-top">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={displayName} />
              ) : (
                <Avatar>{getInitials(displayName)}</Avatar>
              )}
              <div className="profile-name">
                <h3>{displayName}</h3>
                <div className="role">Investor</div>
              </div>
            </div>

            <ProfileStatusBadge $status={displayStatus}>{displayStatus}</ProfileStatusBadge>

            <div className="profile-details">
              <div className="profile-item">
                <Mail size={15} />
                <p>{displayEmail}</p>
              </div>
              <div className="profile-item">
                <Phone size={15} />
                <p>{displayPhone || "Not provided"}</p>
              </div>
              <div className="profile-item">
                <Home size={15} />
                <p>{displayAddress}</p>
              </div>
              <div className="profile-item">
                <MapPin size={15} />
                <p>{displayLocation}{displayStateOfOrigin !== "Not provided" ? ` · ${displayStateOfOrigin}` : ""}</p>
              </div>
              <div className="profile-item">
                <Percent size={15} />
                <p>Monthly ROI: {displayMonthlyRoi}%</p>
              </div>
            </div>

            {/* <div className="profile-footer">
              <EditProfileButton onClick={() => onNavigate("edit-profile")}>
                <Edit size={14} />
                Edit Profile
              </EditProfileButton>
            </div> */}
          </ProfileSideCard>
        </HeroGrid>

        {/* ===== STATS GRID ===== */}
        <StatsGrid>
          <StatCard accent="blue">
            <div className="stat-body">
              <h3>Total Invested</h3>
              <p>{formatNaira(summary.totalInvested)}</p>
              <div className="stat-sub">Sum of all investments</div>
            </div>
            <div className="stat-icon">
              <Wallet size={18} />
            </div>
          </StatCard>

          <StatCard accent="gold">
            <div className="stat-body">
              <h3>Current Value</h3>
              <p>{formatNaira(summary.currentValue)}</p>
              <div className="stat-sub">Current portfolio value</div>
            </div>
            <div className="stat-icon">
              <TrendingUp size={18} />
            </div>
          </StatCard>

          <StatCard accent="blue">
            <div className="stat-body">
              <h3>Open Investments</h3>
              <p>{summary.openInvestments}</p>
              <div className="stat-sub">Active investments</div>
            </div>
            <div className="stat-icon">
              <Briefcase size={18} />
            </div>
          </StatCard>

          <StatCard accent={summary.profitLoss > 0 ? "gold" : summary.profitLoss < 0 ? "red" : undefined}>
            <div className="stat-body">
              <h3>Profit / Loss</h3>
              <p>
                <AmountText positive={summary.profitLoss > 0} negative={summary.profitLoss < 0}>
                  {summary.profitLoss >= 0 ? "+" : "-"}
                  {formatNaira(Math.abs(summary.profitLoss))}
                </AmountText>
              </p>
              <div className="stat-sub">Current value - Total invested</div>
            </div>
            <div className="stat-icon">
              {summary.profitLoss >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            </div>
          </StatCard>
        </StatsGrid>

        {/* ===== AGREEMENT BANNER ===== */}
        <AgreementBanner>
          <div className="agreement-info">
            <FileText size={20} />
            <div>
              <h4>Agreement Status</h4>
              <p>{agreementCompleted ? "Completed" : "Not Completed"}</p>
            </div>
          </div>
          {agreementCompleted ? (
            <Button variant="outline" onClick={() => onNavigate("agreement")} style={{ width: "auto" }}>
              <Eye size={16} />
              View Agreement
            </Button>
          ) : (
            <Button variant="success" onClick={() => onNavigate("agreement")} style={{ width: "auto" }}>
              <FileText size={16} />
              Complete Agreement
            </Button>
          )}
        </AgreementBanner>

        {/* ===== MAIN CONTENT: Investments + Notifications ===== */}
        <MainGrid>
          <div>
            <SectionCard>
              <SectionTitle>
                <h3>
                  <Briefcase size={18} />
                  My Investments
                </h3>
              </SectionTitle>
              {investments.length === 0 ? (
                <EmptyState>
                  <p>You currently have no investments.</p>
                </EmptyState>
              ) : (
                <TableWrap>
                  <Table>
                    <thead>
                      <tr>
                        <Th>Investment</Th>
                        <Th>Amount</Th>
                        <Th>Current Value</Th>
                        <Th>Return</Th>
                        <Th>Status</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((inv) => {
                        const returnPct = inv.amount > 0 ? (inv.profit_loss / inv.amount) * 100 : 0;
                        return (
                          <Tr key={inv.id}>
                            <Td>
                              <strong>{inv.investment_name}</strong>
                            </Td>
                            <Td>{formatNaira(inv.amount)}</Td>
                            <Td>{formatNaira(inv.current_value)}</Td>
                            <Td>
                              <ProfitLossPill positive={returnPct > 0} negative={returnPct < 0}>
                                {returnPct > 0 ? "+" : ""}
                                {returnPct.toFixed(1)}%
                              </ProfitLossPill>
                            </Td>
                            <Td>
                              <StatusBadge tone={inv.status}>{inv.status}</StatusBadge>
                            </Td>
                          </Tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </TableWrap>
              )}
            </SectionCard>

            <SectionCard>
              <SectionTitle>
                <h3>
                  <TrendingUp size={18} />
                  Recent Transactions
                </h3>
              </SectionTitle>
              {transactions.length === 0 ? (
                <EmptyState>
                  <p>No transactions yet.</p>
                </EmptyState>
              ) : (
                <TableWrap>
                  <Table>
                    <thead>
                      <tr>
                        <Th>Date</Th>
                        <Th>Description</Th>
                        <Th>Amount</Th>
                        <Th>Type</Th>
                        <Th>Status</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <Tr key={tx.id}>
                          <Td>{formatDate(tx.created_at)}</Td>
                          <Td>{tx.description || tx.type}</Td>
                          <Td>
                            <AmountText positive={tx.type === "deposit" || tx.type === "profit" || tx.type === "referral"}>
                              {tx.type === "withdrawal" || tx.type === "fee" ? "-" : "+"}
                              {formatNaira(Math.abs(tx.amount))}
                            </AmountText>
                          </Td>
                          <Td>
                            <span style={{ textTransform: "capitalize" }}>{tx.type}</span>
                          </Td>
                          <Td>
                            <StatusBadge tone={tx.status}>{tx.status}</StatusBadge>
                          </Td>
                        </Tr>
                      ))}
                    </tbody>
                  </Table>
                </TableWrap>
              )}
            </SectionCard>
          </div>

          <div>
            <SectionCard>
              <SectionTitle>
                <h3>
                  <Bell size={18} />
                  Notifications
                </h3>
                {unreadNotificationCount > 0 && (
                  <Button variant="outline" onClick={handleMarkAllNotificationsRead} style={{ fontSize: "12px", padding: "8px 14px", width: "auto" }}>
                    <CheckCheck size={14} />
                    Mark All Read
                  </Button>
                )}
              </SectionTitle>
              {notifications.length === 0 ? (
                <EmptyState>
                  <p>You have no notifications.</p>
                </EmptyState>
              ) : (
                <NotificationList>
                  {notifications.map((notification) => (
                    <NotificationItem key={notification.id} $unread={!notification.is_read}>
                      <div className="notification-icon">
                        <Bell size={15} />
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">{formatDateTime(notification.created_at)}</div>
                      </div>
                      {!notification.is_read && <div className="unread-dot" />}
                    </NotificationItem>
                  ))}
                </NotificationList>
              )}
            </SectionCard>
          </div>
        </MainGrid>
      </Container>
    </Page>
  );
}