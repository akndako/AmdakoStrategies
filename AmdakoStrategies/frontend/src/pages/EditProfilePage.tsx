import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Upload,
  Camera,
} from "lucide-react";
import { theme } from "../theme";
import { updateProfile, uploadAvatar, getCurrentProfile } from "../services/profileService";
import type { AuthUser, Profile } from "../types";
import type { PageView } from "../App";

type EditProfilePageProps = {
  user: AuthUser;
  onNavigate: (page: PageView) => void;
  onAuthUpdate: (user: AuthUser) => void;
};

const Page = styled.section`
  min-height: calc(100vh - 68px);
  padding: 80px 24px;
  background: ${theme.colors.ivory};

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;

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
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
  }
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 36px;
  box-shadow: ${theme.shadows.card};
  margin-bottom: 24px;

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
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 4px ${theme.colors.primaryLight};
  }

  &:disabled {
    background: ${theme.colors.surfaceAlt};
    cursor: not-allowed;
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
  transition: all 0.2s ease;
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

const AvatarUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AvatarPreview = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  font-family: 'Playfair Display', Georgia, serif;
  border: 3px solid ${theme.colors.gold};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarUploadButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.surfaceAlt};
  color: ${theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.border};

  &:hover {
    background: #fff;
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActionRow = styled.div`
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

export default function EditProfilePage({ user, onNavigate, onAuthUpdate }: EditProfilePageProps) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [location, setLocation] = useState(user.location || "");
  const [stateOfOrigin, setStateOfOrigin] = useState(user.stateOfOrigin || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar_url || null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current profile data (including avatar_url) on mount
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
          setAvatarUrl(profile.avatar_url || null);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    loadProfile();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const url = await uploadAvatar(file);
      setAvatarUrl(url);
      setSuccess("Avatar uploaded successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to upload avatar. Please try again.";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedProfile: Partial<Profile> = {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        address: address || null,
        location: location || null,
        state_of_origin: stateOfOrigin || null,
      };

      if (avatarUrl) {
        updatedProfile.avatar_url = avatarUrl;
      }

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
        avatar_url: result.avatar_url || avatarUrl || null,
      };

      onAuthUpdate(updatedUser);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to update profile. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container>
        <Header>
          <BackButton onClick={() => onNavigate("dashboard")}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </BackButton>
          <div>
            <div className="eyebrow">Account Settings</div>
            <h2>Edit Profile</h2>
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

        <Card>
          <CardTitle>
            <Camera size={18} />
            Profile Picture
          </CardTitle>
          <AvatarUpload>
            <AvatarPreview>
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" />
              ) : (
                <span>
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : ""}
                </span>
              )}
            </AvatarPreview>
            <AvatarUploadButton
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload size={16} />
              {uploading ? "Uploading..." : "Upload Photo"}
            </AvatarUploadButton>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: "none" }}
            />
            <Notice>Upload a profile picture (PNG, JPG, SVG). Max 10MB.</Notice>
          </AvatarUpload>
        </Card>

        <Card>
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

        <ActionRow>
          <Button onClick={handleSave} disabled={loading || uploading}>
            {loading ? "Saving..." : "Save Changes"}
            {!loading && <Save size={16} />}
          </Button>
        </ActionRow>
      </Container>
    </Page>
  );
}
