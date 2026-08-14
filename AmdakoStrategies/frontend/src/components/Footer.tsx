import styled from "styled-components";
import { Mail, Phone, MapPin, Globe, Twitter, Send, Facebook } from "lucide-react";
import { theme } from "../theme";

const FooterContainer = styled.footer`
  background: ${theme.colors.secondary};
  color: #fff;
  padding: 56px 24px 20px;

  @media (max-width: 768px) {
    padding: 44px 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 36px 14px 12px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr 1fr;
  gap: 48px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 28px;
  }
`;

const BrandColumn = styled.div`
  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin-bottom: 6px;

    span {
      color: ${theme.colors.gold};
    }
  }

  .rc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  p {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.9375rem;
    line-height: 1.75;
    margin-bottom: 24px;
    max-width: 360px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    font-size: 13.5px;
    line-height: 1.6;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
    }
  }

  svg {
    color: ${theme.colors.gold};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const LinksColumn = styled.div`
  h4 {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 18px;
    color: rgba(255, 255, 255, 0.9);
  }

  a {
    display: block;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    margin-bottom: 10px;
    font-size: 14px;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
    }
  }
`;

const EmailSignup = styled.div`
  h4 {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 18px;
    color: rgba(255, 255, 255, 0.9);
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    line-height: 1.6;
    margin-bottom: 16px;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
    padding: 11px 14px;
    border-radius: ${theme.radii.small};
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.45);
    }

    &:focus {
      border-color: ${theme.colors.gold};
    }
  }

  button {
    padding: 11px 18px;
    border-radius: ${theme.radii.small};
    background: ${theme.colors.gold};
    color: ${theme.colors.primaryDark};
    font-weight: 600;
    font-size: 13px;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: #D4AE2F;
    }
  }
`;

const Disclaimer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 0 24px;
  margin-bottom: 20px;

  p {
    color: rgba(255, 255, 255, 0.45);
    font-size: 12px;
    line-height: 1.7;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 14px;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  a {
    width: 32px;
    height: 32px;
    border-radius: ${theme.radii.small};
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.gold};
      color: ${theme.colors.primaryDark};
      transform: translateY(-1px);
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Top>
          <BrandColumn>
            <h3>Amdako <span>Strategies</span></h3>
            <div className="rc">AMDAKO STRATEGY NIG. LTD. — RC. 9560518</div>
            <p>
              A Strategic Wealth Creation, Digital Finance and Institutional Partnership Company —
              empowering individuals, institutions, governments, and organizations through strategic
              wealth creation and innovative investment opportunities.
            </p>
            <ContactInfo>
              <a href="mailto:amdakoStrategy@gmail.com">
                <Mail size={15} />
                amdakoStrategy@gmail.com
              </a>
              <a href="tel:08035817324">
                <Phone size={15} />
                0803 581 7324
              </a>
              <a href="#office">
                <MapPin size={15} />
                Suite 1, First Floor, Novare Central, 502 Dalaba Street, Wuse Zone 5, Abuja
              </a>
              <a href="https://www.amdakostrategies.com.ng" target="_blank" rel="noopener noreferrer">
                <Globe size={15} />
                www.amdakostrategies.com.ng
              </a>
            </ContactInfo>
          </BrandColumn>

          <LinksColumn>
            <h4>Company</h4>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#investment-plan">Investment Plan</a>
            <a href="#contact">Contact</a>
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </LinksColumn>

          <EmailSignup>
            <h4>Stay Informed</h4>
            <p>
              Receive periodic company performance updates, exclusive event invitations, and
              market insights.
            </p>
            <InputRow>
              <input type="email" placeholder="Your email address" />
              <button type="button">Subscribe</button>
            </InputRow>
          </EmailSignup>
        </Top>

        <Disclaimer>
          <p>
            <strong>Disclaimer:</strong> All investments carry some level of risk. Amdako Strategy Nig. Ltd.
            uses proven trading systems and strategies to manage risk, but past performance is not a guarantee
            of future results. Investors are advised to read all terms and conditions carefully before investing.
          </p>
        </Disclaimer>

        <Bottom>
          <p>© {new Date().getFullYear()} Amdako Strategy Nig. Ltd. All rights reserved. | RC. 9560518</p>

          <Social>
            <a href="#twitter" title="Twitter">
              <Twitter size={14} />
            </a>
            <a href="#telegram" title="Telegram">
              <Send size={14} />
            </a>
            <a href="#facebook" title="Facebook">
              <Facebook size={14} />
            </a>
          </Social>
        </Bottom>
      </Container>
    </FooterContainer>
  );
}