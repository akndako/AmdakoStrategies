import styled from "styled-components";
import { Target, ShieldCheck, TrendingUp, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { theme } from "../theme";

const Page = styled.section`
  min-height: calc(100vh - 68px);
  padding: 60px 24px;
  background: ${theme.colors.surfaceAlt};

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 16px;
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 50px;

  @media (max-width: 480px) {
    margin-bottom: 35px;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 14px;

    @media (max-width: 768px) {
      font-size: 28px;
    }

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.7;

    @media (max-width: 480px) {
      font-size: 0.9375rem;
    }
  }
`;

const IntroCard = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 36px 40px;
  margin-bottom: 32px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 28px 24px;
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.8;
    font-size: 0.975rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const SectionCard = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  padding: 32px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.cardHover};
  }

  @media (max-width: 768px) {
    padding: 26px 22px;
  }
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: ${theme.colors.text};

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const SectionText = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.75;
  font-size: 0.9375rem;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const ContactCard = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 36px 40px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 28px 24px;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 20px;
    color: ${theme.colors.text};

    @media (max-width: 480px) {
      font-size: 1.125rem;
    }
  }
`;

const ContactItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  svg {
    color: ${theme.colors.primary};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: 0.9375rem;
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const ContactLabel = styled.span`
  display: block;
  font-size: 0.8125rem;
  color: ${theme.colors.textMuted};
  margin-bottom: 4px;
  font-weight: 500;
`;

export default function AboutUsPage() {
  return (
    <Page>
      <Container>
        <Header>
          <h2>About Amdako Strategy</h2>
          <p>
            In a world where digital finance is shaping the global economy, Amdako Strategy Nig. Ltd.
            stands at the forefront of innovation — driving smart, secure, and sustainable cryptocurrency
            trading solutions from the heart of Nigeria.
          </p>
        </Header>

        <IntroCard>
          <p>
            Founded with a bold vision to bridge Africa's financial potential with global digital markets,
            Amdako Strategy Nig. Ltd. is not just another trading company — it's a strategic powerhouse
            built on intelligence, transparency, and cutting-edge technology.
          </p>
        </IntroCard>

        <Grid>
          <SectionCard>
            <IconBox>
              <Target size={22} />
            </IconBox>
            <SectionTitle>Our Mission</SectionTitle>
            <SectionText>
              To empower individuals, businesses, and investors with the knowledge, tools, and opportunities
              to profit confidently in the rapidly evolving world of digital assets.
            </SectionText>
          </SectionCard>

          <SectionCard>
            <IconBox>
              <ShieldCheck size={22} />
            </IconBox>
            <SectionTitle>Risk Management</SectionTitle>
            <SectionText>
              We focus strongly on controlled exposure, capital preservation, and diversification.
              Our emphasis is not reckless trading, but calculated growth through strategic analysis
              over emotional trading.
            </SectionText>
          </SectionCard>

          <SectionCard>
            <IconBox>
              <TrendingUp size={22} />
            </IconBox>
            <SectionTitle>Profit Monitoring</SectionTitle>
            <SectionText>
              Funds are actively monitored and managed to optimize performance while minimizing unnecessary
              exposure. We ensure every investor understands how their money grows through data-driven
              insight and transparency.
            </SectionText>
          </SectionCard>

          <SectionCard>
            <IconBox>
              <Building2 size={22} />
            </IconBox>
            <SectionTitle>Why Choose Us</SectionTitle>
            <SectionText>
              Our commitment to integrity, professional expertise, and a proven track record of delivering
              consistent returns makes us the preferred choice for discerning investors across the continent.
            </SectionText>
          </SectionCard>
        </Grid>

        <ContactCard>
          <h3>Contact Information</h3>
          <ContactItems>
            <ContactItem>
              <Mail size={20} />
              <div>
                <ContactLabel>Email</ContactLabel>
                <p>Amdakostrategy@gmail.com</p>
              </div>
            </ContactItem>
            <ContactItem>
              <Phone size={20} />
              <div>
                <ContactLabel>Phone</ContactLabel>
                <p>08035817324</p>
              </div>
            </ContactItem>
            <ContactItem>
              <MapPin size={20} />
              <div>
                <ContactLabel>Office</ContactLabel>
                <p>Suite 8A First Floor Block A, City Plaza Area 11, Abuja.</p>
              </div>
            </ContactItem>
          </ContactItems>
        </ContactCard>
      </Container>
    </Page>
  );
}