import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  User,
  Lock,
  TrendingUp,
  LogOut,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Edit,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { theme } from "../theme";
import { changePassword } from "../lib/auth";
import { getCurrentProfile } from "../services/profileService";
import { useResolvedAvatarUrl } from "../hooks/useResolvedAvatarUrl";
import type { AuthUser, Profile } from "../types";
import type { PageView } from "../App";
import { LogoLoader } from "../components/LoadingSpinner";
import { PageShell, PageContainer } from "../components/layout/pageLayout";

type SettingsPageProps = {
  user: AuthUser;
  onNavigate: (page: PageView) => void;
  onLogout: () => void;
};

type Section = "profile" | "security" | "investment" | "account";

const SECTIONS: { id: Section; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Password", icon: Lock },
  { id: "investment", label: "Investment", icon: TrendingUp },
  { id: "account", label: "Account", icon: LogOut },
];

/* ============ LAYOUT ============ */

const Header = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: clamp(1.35rem, 4vw, 1.75rem);
    margin: 10px 0 4px;
  }

  p {
    margin: 0;
    color: ${theme.colors.textMuted};
    font-size: 0.9rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0;
  border: none;
  background: none;
  color: ${theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: sticky;
  top: 120px;

  @media (max-width: 860px) {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    overflow: visible;
  }
`;

const NavItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : "transparent")};
  background: ${({ $active }) => ($active ? theme.colors.primaryLight : "transparent")};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${theme.colors.primaryLight};
  }

  @media (max-width: 860px) {
    min-height: 40px;
    border-radius: 100px;
    padding: 8px 14px;
    border-color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border)};
    background: ${({ $active }) => ($active ? theme.colors.primary : "#fff")};
    color: ${({ $active }) => ($active ? "#fff" : theme.colors.textSecondary)};
  }
`;

const Card = styled.section`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.card};
  padding: 26px;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 18px;
    border-radius: ${theme.radii.large};
  }

  h2 {
    font-size: 1.15rem;
    margin: 0 0 4px;
  }

  .lead {
    margin: 0 0 20px;
    color: ${theme.colors.textMuted};
    font-size: 0.875rem;
  }
`;

/* ============ PROFILE ============ */

const ProfileHead = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  flex-wrap: wrap;

  .name {
    font-weight: 700;
    font-size: 1.05rem;
  }

  .email {
    font-size: 0.85rem;
    color: ${theme.colors.textMuted};
    overflow-wrap: anywhere;
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: ${theme.colors.primary};
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
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

const InfoList = styled.dl`
  margin: 0 0 20px;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.medium};
  overflow: hidden;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid ${theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  dt {
    font-size: 0.82rem;
    color: ${theme.colors.textMuted};
  }

  dd {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 500;
    color: ${theme.colors.text};
    overflow-wrap: anywhere;
  }

  .missing {
    color: ${theme.colors.textMuted};
    font-weight: 400;
    font-style: italic;
  }
`;

/* ============ FORM ============ */

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 440px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
`;

const PasswordWrap = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 12px 44px 12px 14px;
    border-radius: ${theme.radii.medium};
    border: 1px solid ${theme.colors.border};
    background: #fff;
    font-size: 16px;
    color: ${theme.colors.text};
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(2, 113, 196, 0.12);
    }
  }

  button {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 34px;
    height: 34px;
    border: none;
    background: none;
    color: ${theme.colors.textMuted};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Hint = styled.span`
  font-size: 0.78rem;
  font-weight: 400;
  color: ${theme.colors.textMuted};
`;

const Message = styled.div<{ $tone: "error" | "success" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  border-radius: ${theme.radii.medium};
  font-size: 0.875rem;
  background: ${({ $tone }) => ($tone === "error" ? "rgba(179, 64, 58, 0.08)" : "rgba(14, 138, 158, 0.1)")};
  color: ${({ $tone }) => ($tone === "error" ? theme.colors.danger : theme.colors.success)};
  border: 1px solid
    ${({ $tone }) => ($tone === "error" ? "rgba(179, 64, 58, 0.25)" : "rgba(14, 138, 158, 0.25)")};
`;

const Button = styled.button<{ $variant?: "primary" | "outline" | "danger" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: ${theme.radii.medium};
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "outline" ? theme.colors.border : $variant === "danger" ? theme.colors.danger : "transparent"};
  background: ${({ $variant }) =>
    $variant === "outline" ? "#fff" : $variant === "danger" ? "#fff" : theme.colors.primary};
  color: ${({ $variant }) =>
    $variant === "outline" ? theme.colors.primary : $variant === "danger" ? theme.colors.danger : "#fff"};

  &:hover:not(:disabled) {
    background: ${({ $variant }) =>
      $variant === "outline"
        ? theme.colors.primaryLight
        : $variant === "danger"
          ? "rgba(179, 64, 58, 0.06)"
          : theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    align-self: stretch;
  }
`;

/* ============ INVESTMENT / ACCOUNT ============ */

const TermGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Term = styled.div`
  padding: 14px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.ivory};
  border: 1px solid ${theme.colors.borderLight};

  .k {
    font-size: 0.8rem;
    color: ${theme.colors.textMuted};
  }

  .v {
    font-size: 1.15rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    margin-top: 2px;
  }

  .s {
    font-size: 0.8rem;
    color: ${theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-of-type {
    padding-top: 0;
  }

  .t {
    font-weight: 600;
    font-size: 0.95rem;
  }

  .d {
    font-size: 0.82rem;
    color: ${theme.colors.textMuted};
    margin-top: 2px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  disabled: boolean;
  hint?: string;
};

function PasswordField({ label, value, onChange, autoComplete, disabled, hint }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <Field>
      {label}
      <PasswordWrap>
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </PasswordWrap>
      {hint && <Hint>{hint}</Hint>}
    </Field>
  );
}

export default function SettingsPage({ user, onNavigate, onLogout }: SettingsPageProps) {
  const [section, setSection] = useState<Section>("profile");
  const [profile, setProfile] = useState<Profile | null>(null);
  const avatarUrl = useResolvedAvatarUrl(profile?.avatar_url ?? user.avatar_url);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);

  useEffect(() => {
    getCurrentProfile()
      .then(setProfile)
      .catch((err) => console.error("Error loading profile:", err));
  }, [user]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(null);

    if (!currentPassword) {
      setPwError("Enter your current password.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }

    setPwLoading(true);
    try {
      const { error } = await changePassword(currentPassword, newPassword);
      if (error) {
        setPwError(error.message || "Unable to change your password. Please try again.");
        return;
      }
      setPwSuccess("Password changed. Use it next time you sign in.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwError((err as Error)?.message || "Unable to change your password. Please try again.");
    } finally {
      setPwLoading(false);
    }
  };

  const name = profile?.full_name || user.name;
  const monthlyRoi = profile?.monthly_roi ?? user.monthlyRoi ?? 10;
  const details: [string, string | null | undefined][] = [
    ["Full name", name],
    ["Email", profile?.email || user.email],
    ["Phone", profile?.phone || user.phone],
    ["Address", profile?.address || user.address],
    ["City / Town", profile?.location || user.location],
    ["State of origin", profile?.state_of_origin || user.stateOfOrigin],
  ];

  return (
    <PageShell>
      <PageContainer style={{ maxWidth: 980 }}>
        <Header>
          <BackButton type="button" onClick={() => onNavigate("dashboard")}>
            <ArrowLeft size={16} />
            Dashboard
          </BackButton>
          <h1>Settings</h1>
          <p>Manage your details, password, and account.</p>
        </Header>

        <Layout>
          <SideNav aria-label="Settings sections">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <NavItem
                key={id}
                type="button"
                $active={section === id}
                aria-current={section === id ? "page" : undefined}
                onClick={() => setSection(id)}
              >
                <Icon size={17} />
                {label}
              </NavItem>
            ))}
          </SideNav>

          {section === "profile" && (
            <Card>
              <h2>Profile</h2>
              <p className="lead">This is the information on your investor account.</p>
              <ProfileHead>
                <Avatar>{avatarUrl ? <img src={avatarUrl} alt="" /> : getInitials(name)}</Avatar>
                <div>
                  <div className="name">{name}</div>
                  <div className="email">{profile?.email || user.email}</div>
                </div>
              </ProfileHead>
              <InfoList>
                {details.map(([label, value]) => (
                  <InfoRow key={label}>
                    <dt>{label}</dt>
                    <dd>{value ? value : <span className="missing">Not added</span>}</dd>
                  </InfoRow>
                ))}
              </InfoList>
              <Button type="button" onClick={() => onNavigate("edit-profile")}>
                <Edit size={16} />
                Edit profile & photo
              </Button>
            </Card>
          )}

          {section === "security" && (
            <Card>
              <h2>Change password</h2>
              <p className="lead">Choose a password you don't use anywhere else.</p>
              <Form onSubmit={handleChangePassword} noValidate>
                {pwError && (
                  <Message $tone="error" role="alert">
                    <AlertCircle size={16} />
                    {pwError}
                  </Message>
                )}
                {pwSuccess && (
                  <Message $tone="success" role="status">
                    <CheckCircle size={16} />
                    {pwSuccess}
                  </Message>
                )}
                <PasswordField
                  label="Current password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  autoComplete="current-password"
                  disabled={pwLoading}
                />
                <PasswordField
                  label="New password"
                  value={newPassword}
                  onChange={setNewPassword}
                  autoComplete="new-password"
                  disabled={pwLoading}
                  hint="At least 6 characters"
                />
                <PasswordField
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  autoComplete="new-password"
                  disabled={pwLoading}
                />
                <Button type="submit" disabled={pwLoading}>
                  {pwLoading ? (
                    <>
                      <LogoLoader compact />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Update password
                    </>
                  )}
                </Button>
              </Form>
            </Card>
          )}

          {section === "investment" && (
            <Card>
              <h2>Investment terms</h2>
              <p className="lead">These are fixed for your account.</p>
              <TermGrid>
                <Term>
                  <div className="k">Monthly ROI</div>
                  <div className="v">{monthlyRoi}%</div>
                  <div className="s">Of your invested amount</div>
                </Term>
                <Term>
                  <div className="k">Payout date</div>
                  <div className="v">30th</div>
                  <div className="s">Every month, to your bank</div>
                </Term>
                <Term>
                  <div className="k">Lock-in period</div>
                  <div className="v">3 months</div>
                  <div className="s">Then capital can be withdrawn</div>
                </Term>
                <Term>
                  <div className="k">Referral bonus</div>
                  <div className="v">$30</div>
                  <div className="s">Per person who invests</div>
                </Term>
              </TermGrid>
              <div style={{ marginTop: 18 }}>
                <Button type="button" $variant="outline" onClick={() => onNavigate("agreement")}>
                  View my agreement
                  <ChevronRight size={16} />
                </Button>
              </div>
            </Card>
          )}

          {section === "account" && (
            <Card>
              <h2>Account</h2>
              <p className="lead">Get help or sign out of this device.</p>
              <AccountRow>
                <div>
                  <div className="t">Need help?</div>
                  <div className="d">Call our investor support team.</div>
                </div>
                <Button as="a" href="tel:08035817324" $variant="outline">
                  <PhoneCall size={16} />
                  0803 581 7324
                </Button>
              </AccountRow>
              <AccountRow>
                <div>
                  <div className="t">Sign out</div>
                  <div className="d">You'll need your password to sign back in.</div>
                </div>
                <Button type="button" $variant="danger" onClick={onLogout}>
                  <LogOut size={16} />
                  Sign out
                </Button>
              </AccountRow>
            </Card>
          )}
        </Layout>
      </PageContainer>
    </PageShell>
  );
}
