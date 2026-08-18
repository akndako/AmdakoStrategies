import styled from "styled-components";
import { Target, Eye, ShieldCheck, TrendingUp, Mail, Phone, MapPin, Building2, Globe } from "lucide-react";
import { theme } from "../theme";

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
  max-width: 1080px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 720px;
  margin: 0 auto 50px;

  @media (max-width: 480px) {
    margin-bottom: 35px;
  }

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${theme.colors.gold};
    margin-bottom: 14px;
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
  border-left: 3px solid ${theme.colors.gold};
  border-radius: ${theme.radii.xl};
  padding: 36px 40px;
  margin-bottom: 32px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 28px 24px;
  }

  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px;
    color: ${theme.colors.primary};
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.8;
    font-size: 0.975rem;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  strong {
    color: ${theme.colors.primary};
    font-weight: 600;
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
    border-color: ${theme.colors.gold};
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
  border: 1px solid rgba(2, 113, 196, 0.1);
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
  grid-template-columns: repeat(2, 1fr);
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
    color: ${theme.colors.gold};
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
          <div className="eyebrow">About Us</div>
          <h2>About Amdako Strategy Nig. Ltd.</h2>
          <p>
            A Strategic Wealth Creation, Digital Finance and Institutional Partnership Company —
            empowering individuals, institutions, governments, and organizations through strategic
            wealth creation, digital finance education, and innovative investment opportunities.
          </p>
        </Header>

        <IntroCard>
          <h3>
            <Building2 size={20} />
            Company Overview
          </h3>
          <p>
            <strong>Amdako Strategy Nig. Ltd. (RC. 9560518)</strong> is a forward-thinking cryptocurrency
            trading and investment company dedicated to generating consistent profits through advanced crypto
            market analysis, spot trading, and disciplined risk management.
          </p>
          <p>
            Our team of experienced traders and analysts ensures investors enjoy steady returns while maintaining
            the safety and integrity of their invested capital.
          </p>
        </IntroCard>

        <Grid>
          <SectionCard>
            <IconBox>
              <Target size={22} />
            </IconBox>
            <SectionTitle>Our Mission</SectionTitle>
            <SectionText>
              To empower individuals, institutions, governments, and organizations through strategic wealth
              creation, digital finance education, and innovative investment opportunities.
            </SectionText>
          </SectionCard>

          <SectionCard>
            <IconBox>
              <Eye size={22} />
            </IconBox>
            <SectionTitle>Our Vision</SectionTitle>
            <SectionText>
              To become Africa's most trusted strategic financial ecosystem connecting governments, institutions,
              businesses, and communities to sustainable economic growth.
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
        </Grid>

        <ContactCard>
          <h3>Contact Information</h3>
          <ContactItems>
            <ContactItem>
              <Mail size={20} />
              <div>
                <ContactLabel>Email</ContactLabel>
                <p>amdakoStrategy@gmail.com</p>
              </div>
            </ContactItem>
            <ContactItem>
              <Phone size={20} />
              <div>
                <ContactLabel>Phone</ContactLabel>
                <p>0803 581 7324</p>
              </div>
            </ContactItem>
            <ContactItem>
              <MapPin size={20} />
              <div>
                <ContactLabel>Office</ContactLabel>
                <p>Suite 1, First Floor, Novare Central, 502 Dalaba Street, Wuse Zone 5, Abuja.</p>
              </div>
            </ContactItem>
            <ContactItem>
              <Globe size={20} />
              <div>
                <ContactLabel>Website</ContactLabel>
                <p>www.amdakostrategies.com.ng</p>
              </div>
            </ContactItem>
          </ContactItems>
        </ContactCard>
      </Container>
    </Page>
  );
}