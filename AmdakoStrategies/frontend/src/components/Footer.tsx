import styled from "styled-components";
import { Mail, Phone, MapPin, Facebook, Twitter, Send } from "lucide-react";
import { theme } from "../theme";

const FooterContainer = styled.footer`
  background: ${theme.colors.secondary};
  color: #fff;
  padding: 80px 24px 32px;

  @media (max-width: 768px) {
    padding: 60px 20px 28px;
  }

  @media (max-width: 480px) {
    padding: 50px 16px 24px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const BrandColumn = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    margin-bottom: 16px;

    span {
      color: #fff;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9375rem;
    line-height: 1.7;
    margin-bottom: 20px;
    max-width: 300px;
  }
`;

const LinkColumn = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 18px;
    color: rgba(255, 255, 255, 0.9);
  }

  a {
    display: block;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    margin-bottom: 12px;
    font-size: 14px;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
    }
  }

  svg {
    color: ${theme.colors.primary};
    flex-shrink: 0;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  p {
    color: rgba(255, 255, 255, 0.55);
    font-size: 13px;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  a {
    width: 36px;
    height: 36px;
    border-radius: ${theme.radii.small};
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.primary};
      color: #fff;
      transform: translateY(-2px);
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Top>
          <BrandColumn>
            <h3>Amdako<span>Strategies</span></h3>
            <p>
              A trusted investment platform connecting Africa's financial potential to the global digital economy.
            </p>
            <ContactInfo>
              <a href="mailto:Amdakostrategy@gmail.com">
                <Mail size={16} />
                Amdakostrategy@gmail.com
              </a>
              <a href="tel:08035817324">
                <Phone size={16} />
                08035817324
              </a>
              <a href="#office">
                <MapPin size={16} />
                Suite 8A First Floor Block A, City Plaza Area 11, Abuja
              </a>
            </ContactInfo>
          </BrandColumn>

          <LinkColumn>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#blog">Blog</a>
            <a href="#careers">Careers</a>
            <a href="#press">Press</a>
          </LinkColumn>

          <LinkColumn>
            <h4>Legal</h4>
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#disclaimer">Disclaimer</a>
            <a href="#cookies">Cookie Policy</a>
          </LinkColumn>

          <LinkColumn>
            <h4>Support</h4>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
            <a href="#help">Help Center</a>
            <a href="#status">System Status</a>
          </LinkColumn>
        </Top>

        <Bottom>
          <p>© 2024 Amdako Strategies. All rights reserved. | Trusted Investment Platform</p>

          <Social>
            <a href="#twitter" title="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#telegram" title="Telegram">
              <Send size={16} />
            </a>
            <a href="#facebook" title="Facebook">
              <Facebook size={16} />
            </a>
          </Social>
        </Bottom>
      </Container>
    </FooterContainer>
  );
}