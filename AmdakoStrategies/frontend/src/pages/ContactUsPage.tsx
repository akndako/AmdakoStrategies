import styled from "styled-components";
import { Mail, Phone, MapPin, Send } from "lucide-react";
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const InfoCard = styled.div`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 40px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 14px;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  > p {
    color: ${theme.colors.textSecondary};
    line-height: 1.7;
    margin-bottom: 30px;

    @media (max-width: 480px) {
      font-size: 0.9375rem;
    }
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.radii.medium};
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContactContent = styled.div`
  span {
    display: block;
    font-size: 13px;
    color: ${theme.colors.textMuted};
    margin-bottom: 4px;
    font-weight: 500;
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

const FormCard = styled.form`
  display: grid;
  gap: 20px;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.xl};
  padding: 40px;
  box-shadow: ${theme.shadows.card};

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    gap: 16px;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 4px;

  h3 {
    font-size: 22px;
    margin-bottom: 8px;

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: 0.9375rem;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  padding: 13px 16px;
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

  @media (max-width: 480px) {
    padding: 12px 14px;
    font-size: 15px;
  }
`;

const TextArea = styled.textarea`
  min-height: 150px;
  resize: vertical;
  width: 100%;
  border-radius: ${theme.radii.medium};
  border: 1px solid ${theme.colors.border};
  background: #fff;
  padding: 13px 16px;
  color: ${theme.colors.text};
  font-size: 15px;
  line-height: 1.6;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 4px ${theme.colors.primaryLight};
  }

  @media (max-width: 480px) {
    min-height: 130px;
    padding: 12px 14px;
    font-size: 15px;
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

  @media (max-width: 480px) {
    padding: 13px 20px;
    width: 100%;
  }
`;

export default function ContactUsPage() {
  return (
    <Page>
      <Container>
        <Grid>
          <InfoCard>
            <h2>Contact Us</h2>
            <p>
              Need assistance or want to learn more about our investment strategies? Reach out and one
              of our advisors will respond within one business day.
            </p>
            <ContactList>
              <ContactItem>
                <ContactIcon>
                  <Mail size={18} />
                </ContactIcon>
                <ContactContent>
                  <span>Email</span>
                  <p>Amdakostrategy@gmail.com</p>
                </ContactContent>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <Phone size={18} />
                </ContactIcon>
                <ContactContent>
                  <span>Phone</span>
                  <p>08035817324</p>
                </ContactContent>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <MapPin size={18} />
                </ContactIcon>
                <ContactContent>
                  <span>Office</span>
                  <p>Suite 8A First Floor Block A, City Plaza Area 11, Abuja.</p>
                </ContactContent>
              </ContactItem>
            </ContactList>
          </InfoCard>

          <FormCard onSubmit={(event) => event.preventDefault()}>
            <FormHeader>
              <h3>Send a Message</h3>
              <p>Fill out the form and we'll get back to you as soon as possible.</p>
            </FormHeader>

            <Field>
              Name
              <Input type="text" placeholder="Your name" required />
            </Field>

            <Field>
              Email
              <Input type="email" placeholder="you@example.com" required />
            </Field>

            <Field>
              Message
              <TextArea placeholder="Tell us how we can help" required />
            </Field>

            <Button type="submit">
              Send Message
              <Send size={16} />
            </Button>
          </FormCard>
        </Grid>
      </Container>
    </Page>
  );
}