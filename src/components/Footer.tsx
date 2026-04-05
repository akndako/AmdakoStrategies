import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 100px 80px;
  background: linear-gradient(180deg, transparent 0%, rgba(20, 26, 60, 0.8) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1024px) {
    padding: 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CTASection = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  @media (max-width: 1024px) {
    margin-bottom: 70px;
  }

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }

  @media (max-width: 600px) {
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
  
  h2 {
    font-size: 42px;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 32px;
      margin-bottom: 12px;
    }

    @media (max-width: 480px) {
      font-size: 28px;
    }
  }
  
  p {
    font-size: 18px;
    opacity: 0.7;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 24px;
    }

    @media (max-width: 480px) {
      font-size: 15px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 14px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button)<{ primary?: boolean }>`
  padding: 16px 36px;
  border-radius: 12px;
  border: ${({ primary }) => primary ? "none" : "2px solid rgba(124, 108, 246, 0.5)"};
  background: ${({ primary }) => primary ? "linear-gradient(90deg,#7C6CF6,#A855F7)" : "transparent"};
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    ${({ primary }) => primary ? "box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);" : "border-color: rgba(168, 85, 247, 0.8);"}
  }

  @media (max-width: 480px) {
    padding: 14px 28px;
    width: 100%;
    max-width: 280px;
  }
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    gap: 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 600px) {
    gap: 28px;
  }
`;

const LinkColumn = styled.div`
  h4 {
    font-size: 16px;
    margin-bottom: 16px;
    font-weight: 600;
  }
  
  a {
    display: block;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    margin-bottom: 12px;
    transition: color 0.3s ease;
    font-size: 14px;
    
    &:hover {
      color: #a78bfa;
    }
  }
`;

const Newsletter = styled.div`
  background: rgba(124, 108, 246, 0.1);
  border: 1px solid rgba(124, 108, 246, 0.3);
  padding: 40px;
  border-radius: 16px;
  margin-bottom: 60px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 30px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    margin-bottom: 30px;
  }
  
  h3 {
    font-size: 24px;
    margin-bottom: 12px;

    @media (max-width: 480px) {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
  
  p {
    opacity: 0.7;
    margin-bottom: 20px;

    @media (max-width: 480px) {
      font-size: 15px;
      margin-bottom: 16px;
    }
  }
`;

const NewsletterForm = styled.div`
  display: flex;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid rgba(124, 108, 246, 0.3);
  background: rgba(10, 10, 25, 0.8);
  color: white;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(168, 85, 247, 0.6);
    background: rgba(10, 10, 25, 0.95);
  }
`;

const SubscribeButton = styled(motion.button)`
  padding: 12px 28px;
  border-radius: 8px;
  background: linear-gradient(90deg, #7C6CF6, #A855F7);
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  }

  @media (max-width: 768px) {
    padding: 14px 24px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  
  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(124, 108, 246, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 18px;
    
    &:hover {
      background: linear-gradient(90deg, #7C6CF6, #A855F7);
      transform: translateY(-3px);
    }
  }
`;

export default function Footer() {
  return (
    <Section>
      <Container>
        <CTASection>
          <h2>Ready to Start Investing?</h2>
          <p>Join thousands of investors already profiting from Web3. Get started in minutes.</p>
          
          <ButtonGroup>
            <Button primary as={motion.button} whileHover={{ scale: 1.05 }}>
              Create Account Now
            </Button>
            <Button as={motion.button} whileHover={{ scale: 1.05 }}>
              Schedule Consultation
            </Button>
          </ButtonGroup>
        </CTASection>

        <Newsletter>
          <h3>Stay Updated</h3>
          <p>Get the latest Web3 investment insights delivered to your inbox</p>
          <NewsletterForm>
            <Input type="email" placeholder="Enter your email" />
            <SubscribeButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Subscribe
            </SubscribeButton>
          </NewsletterForm>
        </Newsletter>

        <Links>
          <LinkColumn>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#opportunities">Investments</a>
            <a href="#pricing">Pricing</a>
            <a href="#security">Security</a>
          </LinkColumn>

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
        </Links>

        <Bottom>
          <p>© 2024 Amdako Strategies. All rights reserved. | Trusted Web3 Investment Platform</p>
          
          <Social>
            <a href="#twitter" title="Twitter">𝕏</a>
            <a href="#discord" title="Discord">👾</a>
            <a href="#telegram" title="Telegram">✈️</a>
            <a href="#linkedin" title="LinkedIn">💼</a>
          </Social>
        </Bottom>
      </Container>
    </Section>
  );
}