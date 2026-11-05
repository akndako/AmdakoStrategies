import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { PageShell, PageContainer } from "../components/layout/pageLayout";
import {
  FileText,
  TrendingUp,
  Wallet,
  Briefcase,
  Mail,
  Phone,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCheck,
  CreditCard,
  ArrowLeftRight,
  User,
  Settings,
  Inbox,
  Calendar,
  Gift,
  CheckCircle,
  Circle,
  Clock,
  ChevronRight,
} from "lucide-react";
import type { PageView } from "../App";
import { theme } from "../theme";
import { getCurrentProfile } from "../services/profileService";
import { useResolvedAvatarUrl } from "../hooks/useResolvedAvatarUrl";
import { getInvestments, isConfirmedInvestment } from "../services/investmentService";
import { getTransactions } from "../services/transactionService";
import { getAgreement } from "../services/agreementService";
import { getNotifications, markAllNotificationsAsRead } from "../services/notificationService";
import { getInvestorAccount } from "../services/investorAccountService";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Profile, Investment, Transaction, Agreement, InvestorAccount, Notification, AuthUser } from "../types";

type DashboardPageProps = {
  user: AuthUser;
  onLogout: () => void;
  onNavigate: (page: PageView) => void;
  refreshKey?: number;
};

type ActivityTab = "investments" | "transactions" | "notifications";
type Tone = "good" | "warn" | "bad" | "neutral";

/* ============ LAYOUT ============ */

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;

  h1 {
    font-size: clamp(1.35rem, 4vw, 1.75rem);
    margin: 0;
    line-height: 1.2;
  }

  p {
    margin: 4px 0 0;
    font-size: 0.875rem;
    color: ${theme.colors.textMuted};
  }
`;

const AvatarCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  background: ${theme.colors.primary};
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.colors.gold};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StatusChip = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
  background: ${({ $tone }) =>
    $tone === "good"
      ? "rgba(14, 138, 158, 0.12)"
      : $tone === "warn"
        ? theme.colors.goldLight
        : $tone === "bad"
          ? "rgba(179, 64, 58, 0.1)"
          : theme.colors.surfaceAlt};
  color: ${({ $tone }) =>
    $tone === "good"
      ? theme.colors.success
      : $tone === "warn"
        ? "#8a6d12"
        : $tone === "bad"
          ? theme.colors.danger
          : theme.colors.textSecondary};
`;

const LoadingCard = styled.div`
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.card};
  padding: 22px;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 18px;
    border-radius: ${theme.radii.large};
  }
`;

const CardTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${theme.colors.textMuted};
  margin: 0 0 14px;
  font-family: "Inter", sans-serif;
`;

/* ============ BALANCE ============ */

const BalanceCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.radii.xl};
  padding: 26px;
  color: #fff;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  box-shadow: 0 12px 32px rgba(2, 90, 158, 0.25);
  min-width: 0;

  &::after {
    content: "";
    position: absolute;
    top: -80px;
    right: -60px;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201, 162, 39, 0.35), transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: ${theme.radii.large};
  }
`;

const BalanceHead = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  .label {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
  }

  .account {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    padding: 5px 10px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.12);
    font-family: "Inter", monospace;
    letter-spacing: 0.5px;
  }
`;

const BalanceValue = styled.div`
  position: relative;
  z-index: 1;
  font-size: clamp(1.9rem, 6vw, 2.6rem);
  font-weight: 700;
  font-family: "Inter", sans-serif;
  letter-spacing: -0.02em;
  margin: 8px 0 20px;
  word-break: break-word;
`;

const BalanceStats = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MiniStat = styled.div`
  padding: 12px;
  border-radius: ${theme.radii.medium};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  min-width: 0;

  .k {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 4px;
  }

  .v {
    font-size: 0.98rem;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .n {
    margin-top: 2px;
    font-size: 0.7rem;
    color: #ffd98a;
  }
`;

/* ============ SIDE (next payout + actions) ============ */

const SideStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`;

const PayoutCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 14px;
  background: ${theme.colors.goldLight};
  border-color: rgba(201, 162, 39, 0.35);

  .icon {
    width: 44px;
    height: 44px;
    border-radius: ${theme.radii.medium};
    background: #fff;
    color: ${theme.colors.gold};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .k {
    font-size: 0.8rem;
    color: ${theme.colors.textSecondary};
  }

  .v {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${theme.colors.text};
  }

  .s {
    font-size: 0.8rem;
    color: ${theme.colors.textMuted};
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
`;

const ActionTile = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 8px;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${theme.colors.borderLight};
  background: ${theme.colors.ivory};
  color: ${theme.colors.text};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  svg {
    color: ${theme.colors.primary};
  }

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight};
  }
`;

const ContactLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 0.82rem;
  color: ${theme.colors.textSecondary};
  min-width: 0;

  svg {
    color: ${theme.colors.textMuted};
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & + & {
    margin-top: 6px;
  }
`;

/* ============ NEXT STEPS ============ */

const StepsCard = styled(Card)`
  margin-bottom: 20px;
  border-left: 4px solid ${theme.colors.gold};
`;

const StepsRow = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const StepItem = styled.li<{ $state: "done" | "current" | "todo" }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border-radius: ${theme.radii.medium};
  background: ${({ $state }) => ($state === "current" ? theme.colors.primaryLight : theme.colors.ivory)};
  border: 1px solid
    ${({ $state }) => ($state === "current" ? "rgba(2, 113, 196, 0.25)" : theme.colors.borderLight)};
  opacity: ${({ $state }) => ($state === "todo" ? 0.7 : 1)};

  > svg {
    flex-shrink: 0;
    margin-top: 1px;
    color: ${({ $state }) =>
      $state === "done" ? theme.colors.success : $state === "current" ? theme.colors.primary : theme.colors.textMuted};
  }

  .t {
    font-weight: 600;
    font-size: 0.9rem;
    color: ${theme.colors.text};
  }

  .d {
    font-size: 0.8rem;
    color: ${theme.colors.textMuted};
    margin-top: 2px;
  }
`;

const StepButton = styled.button`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${theme.radii.small};
  border: none;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

/* ============ ACTIVITY ============ */

const Tabs = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ $active }) => ($active ? theme.colors.primary : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : theme.colors.textSecondary)};

  .count {
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 100px;
    font-size: 11px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({ $active }) => ($active ? "rgba(255,255,255,0.25)" : theme.colors.danger)};
    color: #fff;
  }
`;

const ActivityHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const LinkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  padding: 6px 10px;
  border-radius: ${theme.radii.small};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  cursor: pointer;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled.li<{ $unread?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 4px;
  border-bottom: 1px solid ${theme.colors.borderLight};
  background: ${({ $unread }) => ($unread ? "rgba(2, 113, 196, 0.04)" : "transparent")};
  min-width: 0;

  &:last-child {
    border-bottom: none;
  }

  .icon {
    width: 38px;
    height: 38px;
    border-radius: ${theme.radii.medium};
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .main {
    flex: 1;
    min-width: 0;
  }

  .title {
    font-weight: 600;
    font-size: 0.92rem;
    color: ${theme.colors.text};
    overflow-wrap: anywhere;
  }

  .sub {
    font-size: 0.8rem;
    color: ${theme.colors.textMuted};
    margin-top: 2px;
    overflow-wrap: anywhere;
  }

  .end {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
    text-align: right;
  }
`;

const Amount = styled.span<{ $tone: "up" | "down" | "flat" }>`
  font-weight: 700;
  font-size: 0.92rem;
  color: ${({ $tone }) =>
    $tone === "up" ? theme.colors.success : $tone === "down" ? theme.colors.danger : theme.colors.text};
  white-space: nowrap;
`;

const Empty = styled.div`
  text-align: center;
  padding: 32px 12px;
  color: ${theme.colors.textMuted};
  font-size: 0.9rem;

  svg {
    color: ${theme.colors.border};
    margin-bottom: 8px;
  }
`;

/* ============ UTILITY ============ */

const formatNaira = (value: number): string =>
  `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const formatDateTime = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

/** Payouts land on the 30th, or the last day of shorter months. */
const getNextPayoutDate = (): Date => {
  const now = new Date();
  const payoutDay = (year: number, month: number) => Math.min(30, new Date(year, month + 1, 0).getDate());
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), payoutDay(now.getFullYear(), now.getMonth()));
  if (now.getDate() <= thisMonth.getDate()) return thisMonth;
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return new Date(next.getFullYear(), next.getMonth(), payoutDay(next.getFullYear(), next.getMonth()));
};

const statusTone = (status: string): Tone => {
  if (["active", "completed", "approved"].includes(status)) return "good";
  if (status === "pending") return "warn";
  if (["failed", "cancelled", "rejected", "suspended", "inactive"].includes(status)) return "bad";
  return "neutral";
};

const isCredit = (type: Transaction["type"]) => type === "deposit" || type === "profit" || type === "referral";

export default function DashboardPage({ user, onNavigate, refreshKey = 0 }: DashboardPageProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [investorAccount, setInvestorAccount] = useState<InvestorAccount | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<ActivityTab>("investments");
  const profileAvatarUrl = useResolvedAvatarUrl(profile?.avatar_url);

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    // Each source is fetched independently so one failure doesn't break the whole dashboard
    const [profileRes, accountRes, investmentsRes, transactionsRes, agreementRes, notificationsRes] =
      await Promise.allSettled([
        getCurrentProfile(),
        getInvestorAccount(),
        getInvestments(),
        getTransactions(),
        getAgreement(),
        getNotifications(),
      ]);

    const pick = <T,>(res: PromiseSettledResult<T>, label: string, fallback: T): T => {
      if (res.status === "fulfilled") return res.value ?? fallback;
      console.error(`${label} fetch error:`, res.reason);
      return fallback;
    };

    setProfile(pick(profileRes, "Profile", null as Profile | null));
    setInvestorAccount(pick(accountRes, "Investor account", null as InvestorAccount | null));
    setInvestments(pick(investmentsRes, "Investments", [] as Investment[]));
    setTransactions(pick(transactionsRes, "Transactions", [] as Transaction[]));
    setAgreement(pick(agreementRes, "Agreement", null as Agreement | null));
    setNotifications(pick(notificationsRes, "Notifications", [] as Notification[]));
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard, refreshKey]);

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
      <PageShell>
        <PageContainer>
          <LoadingCard>
            <LoadingSpinner message="Loading your dashboard..." layout="center" />
          </LoadingCard>
        </PageContainer>
      </PageShell>
    );
  }

  const displayName = profile?.full_name || user.name;
  const firstName = profile?.first_name || user.firstName || displayName.split(" ")[0];
  const displayPhone = profile?.phone || user.phone;
  const displayEmail = profile?.email || user.email;
  const displayStatus = profile?.status || "active";
  const displayMonthlyRoi = profile?.monthly_roi ?? user.monthlyRoi ?? 10;

  const roiBalance = Number(investorAccount?.roi_balance ?? 0);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const confirmedInvestments = investments.filter(isConfirmedInvestment);
  const totalInvested = confirmedInvestments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const monthlyRoi = confirmedInvestments.reduce(
    (sum, inv) => sum + (Number(inv.amount) * Number(inv.monthly_roi ?? displayMonthlyRoi)) / 100,
    0
  );
  const sumCompleted = (type: Transaction["type"]) =>
    transactions
      .filter((tx) => tx.type === type && tx.status === "completed")
      .reduce((sum, tx) => sum + Math.abs(Number(tx.amount)), 0);
  const roiEarned = sumCompleted("profit");
  const referralEarned = sumCompleted("referral");

  const agreementState = !agreement ? "todo" : agreement.status === "approved" ? "done" : "review";
  const hasInvestment = confirmedInvestments.length > 0;
  const agreementConfirmed = confirmedInvestments.some((inv) => inv.agreement_id === agreement?.id);
  const awaitingAmount =
    agreement && agreement.status !== "rejected" && !agreementConfirmed
      ? Number(agreement.investment_amount ?? 0)
      : 0;
  const onboardingDone = agreementState === "done" && hasInvestment;
  const nextPayout = getNextPayoutDate();

  return (
    <PageShell>
      <PageContainer>
        <TopBar>
          <Greeting>
            <AvatarCircle>
              {profileAvatarUrl ? <img src={profileAvatarUrl} alt="" /> : getInitials(displayName)}
            </AvatarCircle>
            <div>
              <h1>
                {getGreeting()}, {firstName}
              </h1>
              <p>
                <StatusChip $tone={statusTone(displayStatus)}>{displayStatus}</StatusChip>{" "}
                Investor · {displayMonthlyRoi}% monthly ROI
              </p>
            </div>
          </Greeting>
        </TopBar>

        {!onboardingDone && (
          <StepsCard>
            <CardTitle>Get started in 3 steps</CardTitle>
            <StepsRow>
              <StepItem $state="done">
                <CheckCircle size={20} />
                <div>
                  <div className="t">Create account</div>
                  <div className="d">Done — welcome aboard</div>
                </div>
              </StepItem>

              <StepItem $state={agreementState === "done" ? "done" : "current"}>
                {agreementState === "done" ? (
                  <CheckCircle size={20} />
                ) : agreementState === "review" ? (
                  <Clock size={20} />
                ) : (
                  <Circle size={20} />
                )}
                <div>
                  <div className="t">Sign agreement</div>
                  <div className="d">
                    {agreementState === "done"
                      ? "Signed"
                      : agreementState === "review"
                        ? "Saved — sign it to activate your investment"
                        : "Takes about 5 minutes"}
                  </div>
                  {agreementState !== "done" && (
                    <StepButton type="button" onClick={() => onNavigate("agreement")}>
                      {agreementState === "review" ? "Finish signing" : "Sign now"}
                      <ChevronRight size={14} />
                    </StepButton>
                  )}
                </div>
              </StepItem>

              <StepItem $state={hasInvestment ? "done" : agreementState === "done" ? "current" : "todo"}>
                {hasInvestment ? <CheckCircle size={20} /> : <Circle size={20} />}
                <div>
                  <div className="t">Start earning</div>
                  <div className="d">
                    {hasInvestment ? "Investment active" : "Fund from ₦750,000 to receive monthly ROI"}
                  </div>
                </div>
              </StepItem>
            </StepsRow>
          </StepsCard>
        )}

        <TopGrid>
          <BalanceCard>
            <BalanceHead>
              <span className="label">Available ROI balance</span>
              {investorAccount && (
                <span className="account">
                  <CreditCard size={14} />
                  {investorAccount.account_number}
                </span>
              )}
            </BalanceHead>
            <BalanceValue>{formatNaira(roiBalance)}</BalanceValue>

            <BalanceStats>
              <MiniStat>
                <div className="k">
                  <Wallet size={13} /> Total investment
                </div>
                <div className="v">{formatNaira(totalInvested + awaitingAmount)}</div>
                {awaitingAmount > 0 && (
                  <div className="n">
                    {totalInvested > 0 ? `${formatNaira(awaitingAmount)} awaiting signature` : "Awaiting signature"}
                  </div>
                )}
              </MiniStat>
              <MiniStat>
                <div className="k">
                  <ArrowUpRight size={13} /> Monthly ROI
                </div>
                <div className="v">{formatNaira(monthlyRoi)}</div>
              </MiniStat>
              <MiniStat>
                <div className="k">
                  <TrendingUp size={13} /> Total ROI earned
                </div>
                <div className="v">{formatNaira(roiEarned)}</div>
              </MiniStat>
              <MiniStat>
                <div className="k">
                  <Gift size={13} /> Referral bonus
                </div>
                <div className="v">{formatNaira(referralEarned)}</div>
              </MiniStat>
            </BalanceStats>
          </BalanceCard>

          <SideStack>
            <PayoutCard>
              <div className="icon">
                <Calendar size={20} />
              </div>
              <div>
                <div className="k">Next ROI processing</div>
                <div className="v">{hasInvestment ? formatNaira(monthlyRoi) : "—"}</div>
                <div className="s">
                  {hasInvestment
                    ? `Scheduled for ${formatDate(nextPayout.toISOString())}`
                    : awaitingAmount > 0
                      ? `${formatNaira(awaitingAmount)} starts once you sign the agreement`
                      : "Starts once your investment is confirmed"}
                </div>
              </div>
            </PayoutCard>

            <Card>
              <CardTitle>Quick actions</CardTitle>
              <ActionGrid>
                <ActionTile type="button" onClick={() => onNavigate("agreement")}>
                  <FileText size={20} />
                  Agreement
                </ActionTile>
                <ActionTile type="button" onClick={() => onNavigate("edit-profile")}>
                  <User size={20} />
                  Profile
                </ActionTile>
                <ActionTile type="button" onClick={() => onNavigate("settings")}>
                  <Settings size={20} />
                  Settings
                </ActionTile>
              </ActionGrid>
              <ContactLine>
                <Mail size={14} />
                <span>{displayEmail}</span>
              </ContactLine>
              <ContactLine>
                <Phone size={14} />
                <span>{displayPhone || "No phone added"}</span>
              </ContactLine>
            </Card>
          </SideStack>
        </TopGrid>

        <Card>
          <ActivityHead>
            <Tabs role="tablist" aria-label="Account activity">
              <TabButton
                type="button"
                role="tab"
                aria-selected={tab === "investments"}
                $active={tab === "investments"}
                onClick={() => setTab("investments")}
              >
                <Briefcase size={15} />
                Investments
              </TabButton>
              <TabButton
                type="button"
                role="tab"
                aria-selected={tab === "transactions"}
                $active={tab === "transactions"}
                onClick={() => setTab("transactions")}
              >
                <ArrowLeftRight size={15} />
                Transactions
              </TabButton>
              <TabButton
                type="button"
                role="tab"
                aria-selected={tab === "notifications"}
                $active={tab === "notifications"}
                onClick={() => setTab("notifications")}
              >
                <Bell size={15} />
                Notifications
                {unreadCount > 0 && <span className="count">{unreadCount}</span>}
              </TabButton>
            </Tabs>
            {tab === "notifications" && unreadCount > 0 && (
              <LinkButton type="button" onClick={handleMarkAllNotificationsRead}>
                <CheckCheck size={14} />
                Mark all read
              </LinkButton>
            )}
          </ActivityHead>

          {tab === "investments" &&
            (investments.length === 0 && awaitingAmount === 0 ? (
              <Empty>
                <Briefcase size={32} />
                <div>No investments yet. Sign your agreement to get started.</div>
              </Empty>
            ) : (
              <List>
                {awaitingAmount > 0 && agreement && (
                  <Row>
                    <div className="icon">
                      <Clock size={17} />
                    </div>
                    <div className="main">
                      <div className="title">Amdako Strategic Investment</div>
                      <div className="sub">
                        {formatNaira(awaitingAmount)} · starts {formatDate(agreement.start_date || agreement.created_at)}
                      </div>
                    </div>
                    <div className="end">
                      <Amount $tone="flat">{formatNaira(awaitingAmount)}</Amount>
                      <StatusChip $tone="warn">awaiting signature</StatusChip>
                    </div>
                  </Row>
                )}
                {investments.map((inv) => {
                  const returnPct = inv.amount > 0 ? (inv.profit_loss / inv.amount) * 100 : 0;
                  return (
                    <Row key={inv.id}>
                      <div className="icon">
                        <Briefcase size={17} />
                      </div>
                      <div className="main">
                        <div className="title">{inv.investment_name}</div>
                        <div className="sub">
                          {formatNaira(inv.amount)} invested · since {formatDate(inv.start_date || inv.created_at)}
                        </div>
                      </div>
                      <div className="end">
                        <Amount $tone={returnPct > 0 ? "up" : returnPct < 0 ? "down" : "flat"}>
                          {formatNaira(inv.current_value)}
                        </Amount>
                        <StatusChip $tone={statusTone(inv.status)}>{inv.status}</StatusChip>
                      </div>
                    </Row>
                  );
                })}
              </List>
            ))}

          {tab === "transactions" &&
            (transactions.length === 0 ? (
              <Empty>
                <ArrowLeftRight size={32} />
                <div>No transactions yet. Deposits and payouts will show here.</div>
              </Empty>
            ) : (
              <List>
                {transactions.map((tx) => {
                  const credit = isCredit(tx.type);
                  return (
                    <Row key={tx.id}>
                      <div className="icon">
                        {credit ? <ArrowDownRight size={17} /> : <ArrowUpRight size={17} />}
                      </div>
                      <div className="main">
                        <div className="title" style={{ textTransform: "capitalize" }}>
                          {tx.description || tx.type}
                        </div>
                        <div className="sub">
                          {formatDate(tx.created_at)}
                          {tx.reference ? ` · Ref ${tx.reference}` : ""}
                        </div>
                      </div>
                      <div className="end">
                        <Amount $tone={credit ? "up" : "down"}>
                          {credit ? "+" : "-"}
                          {formatNaira(Math.abs(tx.amount))}
                        </Amount>
                        <StatusChip $tone={statusTone(tx.status)}>{tx.status}</StatusChip>
                      </div>
                    </Row>
                  );
                })}
              </List>
            ))}

          {tab === "notifications" &&
            (notifications.length === 0 ? (
              <Empty>
                <Inbox size={32} />
                <div>You're all caught up.</div>
              </Empty>
            ) : (
              <List>
                {notifications.map((n) => (
                  <Row key={n.id} $unread={!n.is_read}>
                    <div className="icon">
                      <Bell size={17} />
                    </div>
                    <div className="main">
                      <div className="title">{n.title}</div>
                      <div className="sub">{n.message}</div>
                      <div className="sub">{formatDateTime(n.created_at)}</div>
                    </div>
                  </Row>
                ))}
              </List>
            ))}
        </Card>
      </PageContainer>
    </PageShell>
  );
}
