import styled from "styled-components";
import { motion } from "framer-motion";
import { BadgeCheck, Quote } from "lucide-react";
import { theme } from "../theme";

const Section = styled.section.attrs({ id: "home-testimonials" })`
  padding: 100px 24px;
  background: ${theme.colors.ivory};

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
  max-width: 520px;
  margin: 0 auto 48px;
`;

const Eyebrow = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${theme.colors.gold};
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const QuoteCard = styled(motion.div)`
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.large};
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const QuoteIcon = styled.div`
  color: ${theme.colors.gold};
`;

const QuoteText = styled.p`
  font-size: 0.95rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.75;
  flex: 1;
`;

const QuoteAuthor = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const TrustList = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrustItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 18px 20px;
  background: #fff;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.medium};

  svg {
    color: ${theme.colors.primary};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    font-size: 0.9rem;
    color: ${theme.colors.textSecondary};
    line-height: 1.55;

    strong {
      color: ${theme.colors.text};
      display: block;
      margin-bottom: 4px;
    }
  }
`;

const quotes = [
  {
    text: "Payouts hit my account on schedule—I track everything from the investor dashboard.",
    author: "Private investor, Abuja",
  },
  {
    text: "Referring two colleagues was straightforward; bonuses cleared after their deposits posted.",
    author: "Partner investor, Lagos",
  },
  {
    text: "Onboarding and the agreement were clear before I sent capital—no surprises.",
    author: "Institutional client",
  },
];

const trustPoints = [
  {
    title: "Transparent reporting",
    detail: "Periodic updates on performance—not a repeat of the headline rate.",
  },
  {
    title: "Agreement-first onboarding",
    detail: "Digital agreement and verified identity before funds are accepted.",
  },
  {
    title: "Human support",
    detail: "Phone and email access when you need help outside the portal.",
  },
];

export default function Testimonials() {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Investor experience</Eyebrow>
          <Title>Trust & consistency</Title>
          <Subtitle>
            Social proof and service quality—financial terms are covered in the plan sections above.
          </Subtitle>
        </Header>

        <Grid>
          {quotes.map((q, idx) => (
            <QuoteCard
              key={q.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <QuoteIcon aria-hidden>
                <Quote size={22} />
              </QuoteIcon>
              <QuoteText>{q.text}</QuoteText>
              <QuoteAuthor>{q.author}</QuoteAuthor>
            </QuoteCard>
          ))}
        </Grid>

        <TrustList>
          {trustPoints.map((item) => (
            <TrustItem key={item.title}>
              <BadgeCheck size={20} aria-hidden />
              <p>
                <strong>{item.title}</strong>
                {item.detail}
              </p>
            </TrustItem>
          ))}
        </TrustList>
      </Container>
    </Section>
  );
}
