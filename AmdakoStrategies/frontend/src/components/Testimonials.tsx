import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 120px 100px;
  background: linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.08) 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 100px 80px;
  }

  @media (max-width: 1024px) {
    padding: 90px 60px;
  }

  @media (max-width: 768px) {
    padding: 70px 30px;
  }

  @media (max-width: 600px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 50px 16px;
  }

  @media (max-width: 360px) {
    padding: 40px 12px;
  }
`;

const Title = styled.h2`
  font-size: 2.75rem;
  margin-bottom: 24px;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 2.5rem;
    margin-bottom: 22px;
  }

  @media (max-width: 1024px) {
    font-size: 2.25rem;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 18px;
  }

  @media (max-width: 600px) {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 1.625rem;
    margin-bottom: 14px;
  }

  @media (max-width: 360px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.75;
  text-align: center;
  margin-bottom: 70px;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1200px) {
    font-size: 1.0625rem;
    margin-bottom: 65px;
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
    margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    font-size: 0.9375rem;
    margin-bottom: 50px;
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
    margin-bottom: 45px;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
    margin-bottom: 40px;
  }

  @media (max-width: 360px) {
    font-size: 0.75rem;
    margin-bottom: 35px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  @media (max-width: 600px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  padding: 40px;
  border-radius: 16px;
  background: rgba(20, 26, 60, 0.8);
  border: 1px solid rgba(168, 85, 247, 0.25);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: rgba(168, 85, 247, 0.6);
    background: rgba(124, 108, 246, 0.1);
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(168, 85, 247, 0.2);
  }

  @media (max-width: 1024px) {
    padding: 36px;
  }

  @media (max-width: 768px) {
    padding: 32px;
  }

  @media (max-width: 600px) {
    padding: 28px;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const Stars = styled.div`
  font-size: 1.25rem;
  margin-bottom: 18px;
  letter-spacing: 4px;
`;

const Quote = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 24px;
  opacity: 0.85;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.9375rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin-bottom: 16px;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(124, 108, 246, 0.5));
  border: 2px solid rgba(168, 85, 247, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
`;

const AuthorInfo = styled.div`
  h4 {
    font-size: 1rem;
    margin: 0;
    margin-bottom: 4px;
    font-weight: 600;
  }

  p {
    font-size: 0.875rem;
    opacity: 0.6;
    margin: 0;
  }
`;

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Turner",
      title: "Crypto Investor",
      avatar: "AT",
      quote: "Amdako Strategies transformed my investment approach. The returns have been consistently exceptional, and their transparent reporting gives me complete peace of mind."
    },
    {
      name: "Sarah Chen",
      title: "Portfolio Manager",
      avatar: "SC",
      quote: "Working with Amdako has been a game-changer. Their expert team and secure infrastructure make wealth management in crypto not just possible, but truly enjoyable."
    },
    {
      name: "Marcus Webb",
      title: "Web3 Entrepreneur",
      avatar: "MW",
      quote: "Outstanding service. The combination of high returns, security, and professional management is unmatched in the industry. Highly recommended for serious investors."
    }
  ];

  return (
    <Section>
      <Title>What Our Investors Say</Title>
      <Subtitle>Join thousands of satisfied investors who trust Amdako with their digital assets</Subtitle>

      <Grid>
        {testimonials.map((testimonial, idx) => (
          <Card
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Stars role="img" aria-label="5 star rating">★★★★★</Stars>
            <Quote>{testimonial.quote}</Quote>
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
    </Section>
  );
}
