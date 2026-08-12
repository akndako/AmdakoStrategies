import styled from "styled-components";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section`
  padding: 100px 24px;
  background: ${theme.colors.surfaceAlt};

  @media (max-width: 768px) {
    padding: 70px 20px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 650px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 45px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.0625rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: 18px;
  }
`;

const Card = styled(motion.div)`
  padding: 32px 28px;
  border-radius: ${theme.radii.large};
  background: #fff;
  border: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-3px);
  }

  @media (max-width: 600px) {
    padding: 26px 22px;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;
  margin-bottom: 16px;
  color: #F5A623;
`;

const QuoteIcon = styled.div`
  color: ${theme.colors.primary};
  opacity: 0.2;
  margin-bottom: 12px;
`;

const QuoteText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  margin-bottom: 24px;
  flex-grow: 1;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
`;

const AuthorInfo = styled.div`
  h4 {
    font-size: 0.9375rem;
    margin: 0 0 2px;
    color: ${theme.colors.text};
    font-weight: 600;
  }

  p {
    font-size: 0.8125rem;
    color: ${theme.colors.textMuted};
    margin: 0;
  }
`;

export default function Testimonials() {
  const testimonials = [
    {
      name: "Usman Kolo",
      title: "Crypto Investor",
      avatar: "UK",
      quote:
        "Amdako Strategies transformed my investment approach. The returns have been consistently exceptional, and the team's expertise is evident in their strategic decisions. I highly recommend their services to anyone looking to grow their crypto portfolio.",
    },
    {
      name: "khalifa General",
      title: "Institutional Investor",
      avatar: "KG",
      quote:
        "Thank you amdako, I have received my monthly ROI. I am very satisfied with the service and the returns. The team is professional and responsive, making it a pleasure to work with them.",
    },
    {
      name: "Sanda Gulu",
      title: "Investor",
      avatar: "SA",
      quote:
        "Outstanding service. Very reliable and trustworthy. The combination of high returns, security, and professional management is unmatched in the industry. Highly recommended for serious investors.",
    },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <Title>What Our Investors Say</Title>
          <Subtitle>
            Join thousands of satisfied investors who trust Amdako with their digital assets
          </Subtitle>
        </Header>

        <Grid>
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <QuoteIcon>
                <Quote size={28} />
              </QuoteIcon>
              <Stars aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </Stars>
              <QuoteText>{testimonial.quote}</QuoteText>
              <Author>
                <Avatar>{testimonial.avatar}</Avatar>
                <AuthorInfo>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.title}</p>
                </AuthorInfo>
              </Author>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}