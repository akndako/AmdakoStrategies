import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 120px 100px;
  background: linear-gradient(180deg, rgba(124,108,246,0.05) 0%, transparent 100%);

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

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  @media (max-width: 768px) {
    gap: 40px;
  }

  @media (max-width: 600px) {
    gap: 35px;
  }

  @media (max-width: 480px) {
    gap: 30px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 600px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 600px) {
    gap: 18px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Card = styled(motion.div)`
  flex: 1;
  padding: 36px;
  border-radius: 18px;
  background: rgba(124, 108, 246, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(12px);
  text-align: left;
  
  @media (max-width: 1024px) {
    padding: 32px;
  }

  @media (max-width: 768px) {
    padding: 28px;
  }

  @media (max-width: 600px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }

  @media (max-width: 360px) {
    padding: 16px;
  }
  
  h4 {
    font-size: 1rem;
    opacity: 0.7;
    margin-bottom: 14px;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 0.9375rem;
      margin-bottom: 12px;
    }

    @media (max-width: 600px) {
      font-size: 0.875rem;
      margin-bottom: 10px;
    }

    @media (max-width: 480px) {
      font-size: 0.8125rem;
      margin-bottom: 8px;
    }

    @media (max-width: 360px) {
      font-size: 0.75rem;
      margin-bottom: 6px;
    }
  }
  
  .value {
    font-size: 2.75rem;
    font-weight: 700;
    background: linear-gradient(90deg, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;

    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }

    @media (max-width: 768px) {
      font-size: 2.25rem;
    }

    @media (max-width: 600px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.75rem;
    }

    @media (max-width: 360px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    font-size: 0.875rem;
    opacity: 0.6;

    @media (max-width: 768px) {
      font-size: 0.8125rem;
    }

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }

    @media (max-width: 360px) {
      font-size: 0.6875rem;
    }
  }
`;

const ChartBox = styled(motion.div)`
  padding: 40px;
  border-radius: 16px;
  background: rgba(20, 26, 60, 0.8);
  border: 1px solid rgba(124, 108, 246, 0.2);
  backdrop-filter: blur(12px);
  
  @media (max-width: 1200px) {
    padding: 36px;
  }
  
  @media (max-width: 1024px) {
    padding: 32px;
  }
  
  @media (max-width: 768px) {
    padding: 30px;
  }
  
  @media (max-width: 600px) {
    padding: 28px;
  }
  
  @media (max-width: 480px) {
    padding: 24px;
  }
  
  @media (max-width: 360px) {
    padding: 20px;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 24px;

    @media (max-width: 1200px) {
      font-size: 19px;
      margin-bottom: 22px;
    }
    
    @media (max-width: 1024px) {
      font-size: 18px;
      margin-bottom: 20px;
    }
    
    @media (max-width: 768px) {
      font-size: 17px;
      margin-bottom: 20px;
    }
    
    @media (max-width: 600px) {
      font-size: 16px;
      margin-bottom: 18px;
    }
    
    @media (max-width: 480px) {
      font-size: 15px;
      margin-bottom: 16px;
    }
    
    @media (max-width: 360px) {
      font-size: 14px;
      margin-bottom: 14px;
    }
  }
`;

const data = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 40 },
  { month: "Apr", value: 60 },
  { month: "May", value: 85 },
  { month: "Jun", value: 120 }
];

export default function Stats() {
  return (
    <Section>
      <Title>Our Performance</Title>
      <Subtitle>Proven track record of consistent growth and investor returns</Subtitle>

      <Container>
        <StatsContainer>
          <StatRow>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0 }}
            >
              <h4>Assets Under Management</h4>
              <div className="value">$4.2M</div>
              <p>Growing portfolio across Web3 projects</p>
            </Card>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h4>Average Annual Return</h4>
              <div className="value">320%</div>
              <p>Consistent outperformance exceeds expectations</p>
            </Card>
          </StatRow>
          
          <StatRow>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4>Active Investors</h4>
              <div className="value">8,500+</div>
              <p>Trusted by thousands worldwide</p>
            </Card>
            <Card
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4>Success Rate</h4>
              <div className="value">98.7%</div>
              <p>Successful investment outcomes</p>
            </Card>
          </StatRow>
        </StatsContainer>

        <ChartBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>6-Month Growth Trajectory</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  background: "rgba(20, 26, 60, 0.9)",
                  border: "1px solid rgba(124, 108, 246, 0.5)",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#7C6CF6" 
                strokeWidth={3}
                dot={{ fill: "#A855F7", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </Container>
    </Section>
  );
}