import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Percent,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";
import { theme } from "../theme";
import { changePassword } from "../lib/auth";
import { updateProfile, getCurrentProfile } from "../services/profileService";
import type { AuthUser, Profile } from "../types";
import type { PageView } from "../App";

type SettingsPageProps = {
  user: AuthUser;
  onNavigate: (page: PageView) => void;
  onAuthUpdate: (user: AuthUser) => void;
};

const Page = styled(motion.section)`
  min-height: calc(100vh - 68px);
  padding: 80px 24px;
  background:
    linear-gradient(135deg, rgba(2, 113, 196, 0.045), transparent 42%),
    linear-gradient(315deg, rgba(201, 162, 39, 0.055), transparent 36%),
    ${theme.colors.ivory};

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
  }

  h2 {
    font-size: 28px;
    color: ${theme.colors.text};
    margin: 0;
    line-height: 1.2;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.medium};
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(2, 113, 196, 0.3);
    outline-offset: 2px;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  padding: 36px;
  box-shadow: ${theme.shadows.card};
  margin-bottom: 24px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.gold});
    opacity: 0.7;
  }

  &:hover {
    border-color: ${theme.colors.borderLight};
    box-shadow: ${theme.shadows.cardHover};
  }

  @media (max-width: 768px) {
    padding: 28px;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  color: ${theme.colors.text};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${theme.colors.gold};
    flex: 0 0 auto;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.textMuted};
    pointer-events: none;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  padding: 14px 16px 14px 44px;
  color: ${theme.colors.text};
  font-size: 15px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 4px ${theme.colors.primaryLight};
  }

  &:disabled {
    cursor: not-allowed;
    background: #f7f7f5;
    color: ${theme.colors.textMuted};
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: ${theme.radii.medium};
  padding: 14px 24px;
  font-weight: 600;
  font-size: 15px;
  background: ${theme.colors.primary};
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: ${theme.shadows.button};

  &:hover {
    background: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.buttonHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 3px solid rgba(2, 113, 196, 0.3);
    outline-offset: 3px;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  background: rgba(214, 69, 69, 0.08);
  border: 1px solid rgba(214, 69, 69, 0.2);
  padding: 12px 16px;
  border-radius: ${theme.radii.medium};
  margin-top: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(2, 113, 196, 0.08);
  border: 1px solid rgba(2, 113, 196, 0.25);
  border-radius: ${theme.radii.medium};
  padding: 12px 16px;
  margin-bottom: 16px;
  color: ${theme.colors.success};
  font-size: 14px;
`;

const ActionRow = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Notice = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.6;
`;

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function SettingsPage({ user, onNavigate, onAuthUpdate }: SettingsPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.35 },
    },
  };

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [email, setEmail] = useState(user.email || "");
  const [address, setAddress] = useState(user.address || "");
  const [location, setLocation] = useState(user.location || "");
  const [stateOfOrigin, setStateOfOrigin] = useState(user.stateOfOrigin || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);

  // Load current profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getCurrentProfile();
        if (profile) {
          setFirstName(profile.first_name || user.firstName || "");
          setLastName(profile.last_name || user.lastName || "");
          setEmail(profile.email || user.email || "");
          setPhone(profile.phone || user.phone || "");
          setAddress(profile.address || user.address || "");
          setLocation(profile.location || user.location || "");
          setStateOfOrigin(profile.state_of_origin || user.stateOfOrigin || "");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedProfile: Partial<Profile> = {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        phone,
        email,
        address: address || null,
        location: location || null,
        state_of_origin: stateOfOrigin || null,
      };

      const result = await updateProfile(updatedProfile);

      // Update the auth state with the new user info
      const updatedUser: AuthUser = {
        id: user.id,
        name: result.full_name || `${firstName} ${lastName}`.trim(),
        firstName: result.first_name || firstName,
        lastName: result.last_name || lastName,
        phone: result.phone || phone,
        email: result.email || email,
        address: result.address || address,
        location: result.location || location,
        stateOfOrigin: result.state_of_origin || stateOfOrigin,
        monthlyRoi: user.monthlyRoi,
        avatar_url: user.avatar_url,
      };

      onAuthUpdate(updatedUser);
      setSuccess("Settings updated successfully.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to update settings. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match. Please try again.");
      return;
    }

    setPwLoading(true);
    setPwError(null);
    setPwSuccess(null);

    try {
      const { error } = await changePassword(currentPassword, newPassword);
      if (error) {
        setPwError(error.message || "Unable to change your password. Please try again.");
        return;
      }
      setPwSuccess("Your password has been changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwError((err as Error)?.message || "Unable to change your password. Please try again.");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <Page initial="hidden" animate="visible" variants={pageVariants}>
      <Container variants={containerVariants}>
        <Header variants={sectionVariants}>
          <BackButton onClick={() => onNavigate("dashboard")}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </BackButton>
          <div>
            <div className="eyebrow">Account Settings</div>
            <h2>Settings</h2>
          </div>
        </Header>

        {error && (
          <ErrorMessage>
            <AlertCircle size={16} />
            {error}
          </ErrorMessage>
        )}

        {success && (
          <SuccessMessage>
            <CheckCircle size={16} />
            {success}
          </SuccessMessage>
        )}

        <Card variants={sectionVariants}>
          <CardTitle>
            <User size={18} />
            Personal Information
          </CardTitle>
          <FormGrid>
            <Row>
              <Field>
                First name
                <InputWrapper>
                  <User size={18} />
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Your first name"
                    disabled={loading}
                  />
                </InputWrapper>
              </Field>

              <Field>
                Last name
                <InputWrapper>
                  <User size={18} />
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Your last name"
                    disabled={loading}
                  />
                </InputWrapper>
              </Field>
            </Row>

            <Field>
              Phone number
              <InputWrapper>
                <Phone size={18} />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Your phone number"
                  disabled={loading}
                />
              </InputWrapper>
            </Field>

            <Field>
              Email address
              <InputWrapper>
                <Mail size={18} />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </InputWrapper>
            </Field>

            <Field>
              Address
              <InputWrapper>
                <Home size={18} />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Your residential address"
                  disabled={loading}
                />
              </InputWrapper>
            </Field>

            <Row>
              <Field>
                Location
                <InputWrapper>
                  <MapPin size={18} />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    placeholder="City / Town"
                    disabled={loading}
                  />
                </InputWrapper>
              </Field>

              <Field>
                State of Origin
                <InputWrapper>
                  <MapPin size={18} />
                  <Input
                    value={stateOfOrigin}
                    onChange={(e) => setStateOfOrigin(e.target.value)}
                    type="text"
                    placeholder="Your state of origin"
                    disabled={loading}
                  />
                </InputWrapper>
              </Field>
            </Row>
          </FormGrid>
        </Card>

        <Card variants={sectionVariants}>
          <CardTitle>Investment Information</CardTitle>
          <FormGrid>
            <Field>
              Monthly ROI
              <InputWrapper>
                <Percent size={18} />
                <Input value="10" readOnly disabled />
              </InputWrapper>
            </Field>
            <Notice>
              Your monthly ROI is fixed at 10% — guaranteed monthly returns on all investments.
            </Notice>
          </FormGrid>
        </Card>

        <Card variants={sectionVariants}>
          <CardTitle>
            <Lock size={18} />
            Change Password
          </CardTitle>
          {pwError && (
            <ErrorMessage>
              <AlertCircle size={16} /> {pwError}
            </ErrorMessage>
          )}
          {pwSuccess && (
            <SuccessMessage>
              <CheckCircle size={16} /> {pwSuccess}
            </SuccessMessage>
          )}
          <FormGrid>
            <Field>
              Current password
              <InputWrapper>
                <Lock size={18} />
                <Input
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your current password"
                  disabled={pwLoading}
                  autoComplete="current-password"
                />
              </InputWrapper>
            </Field>

            <Row>
              <Field>
                New password
                <InputWrapper>
                  <Lock size={18} />
                  <Input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="Enter a new password"
                    disabled={pwLoading}
                    autoComplete="new-password"
                  />
                </InputWrapper>
              </Field>

              <Field>
                Confirm new password
                <InputWrapper>
                  <Lock size={18} />
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Re-enter your new password"
                    disabled={pwLoading}
                    autoComplete="new-password"
                  />
                </InputWrapper>
              </Field>
            </Row>

            <Button onClick={handleChangePassword} disabled={pwLoading}>
              {pwLoading ? "Updating..." : "Update Password"}
            </Button>
          </FormGrid>
        </Card>

        <ActionRow variants={sectionVariants}>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
            {!loading && <Save size={16} />}
          </Button>
        </ActionRow>
      </Container>
    </Page>
  );
}
