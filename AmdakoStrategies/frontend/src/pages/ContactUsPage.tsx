import styled from "styled-components";

const Page = styled.section`
  min-height: calc(100vh - 120px);
  padding: 100px 80px;
  background: #0b0e11;

  @media (max-width: 1024px) {
    padding: 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 600px) {
    padding: 50px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const Wrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  @media (max-width: 600px) {
    gap: 28px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const InfoCard = styled.div`
  padding: 40px;
  border-radius: 24px;
  background: rgba(30, 35, 41, 0.9);
r  border: 1px solid rgba(243, 186, 47, 0.15);
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: 16px;
  }

  h2 {
    font-size: 36px;
    margin-bottom: 18px;

    @media (max-width: 768px) {
      font-size: 28px;
      margin-bottom: 16px;
    }

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    margin-bottom: 24px;

    @media (max-width: 480px) {
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
  }

  strong {
    display: block;
    margin-top: 18px;
    margin-bottom: 10px;
    color: #fff;

    @media (max-width: 480px) {
      margin-top: 16px;
      margin-bottom: 8px;
    }
  }
`;

const FormCard = styled.form`
  display: grid;
  gap: 20px;
  padding: 40px;
  border-radius: 24px;
  background: rgba(30, 35, 41, 0.9); /* Dark background */
  border: 1px solid rgba(243, 186, 47, 0.15); /* Gold border */
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 600px) {
    padding: 28px;
  }

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: 16px;
    gap: 16px;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 10px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(71, 77, 87, 0.3);
  background: rgba(11, 14, 17, 0.5);
  padding: 16px 18px;
  color: #fff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #f3ba2f;
    box-shadow: 0 0 0 4px rgba(243, 186, 47, 0.1);
  }

  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  min-height: 170px;
  resize: vertical;
  border-radius: 14px;
  border: 1px solid rgba(71, 77, 87, 0.3);
  background: rgba(11, 14, 17, 0.5);
  padding: 16px 18px;
  color: #fff;
  font-size: 16px;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: #f3ba2f;
    box-shadow: 0 0 0 4px rgba(243, 186, 47, 0.1);
  }

  @media (max-width: 480px) {
    min-height: 140px;
    padding: 14px 16px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: 14px;
  padding: 16px 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #F3BA2F 0%, #F7A600 100%);
  color: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 32px rgba(243, 186, 47, 0.4);
  }

  @media (max-width: 600px) {
    padding: 15px 22px;
  }

  @media (max-width: 480px) {
    padding: 14px 20px;
    font-size: 16px;
    width: 100%;
  }
`;

export default function ContactUsPage() {
  return (
    <Page>
      <Wrapper>
        <InfoCard>
          <h2>Contact Us</h2>
          <p>Need assistance or want to learn more about our  investment strategies? Reach out and one of our advisors will respond within one business day.</p>
          <strong>Email</strong>
          <p>Amdakostrategy@gmail.com</p>
          <strong>Phone</strong>
          <p>08035817324</p>
          <strong>Office</strong>
          <p>Suite 8A First Floor Block A, City Plaza Area 11, Abuja.</p>
        </InfoCard>

        <FormCard onSubmit={(event) => event.preventDefault()}>
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

          <Button type="submit">Send Message</Button>
        </FormCard>
      </Wrapper>
    </Page>
  );
}
