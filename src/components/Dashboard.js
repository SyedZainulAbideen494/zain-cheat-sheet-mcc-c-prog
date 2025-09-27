import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import program1 from "../programs/program1";
import program2 from "../programs/program2";
import program3 from "../programs/program3";
import program4 from "../programs/program4";
import program5 from "../programs/program5";
import program6 from "../programs/program6";
import program7 from "../programs/program7";
import program8 from "../programs/program8";
import program9 from "../programs/program9";
import program11 from "../programs/program11";
import program14 from "../programs/program14";
import program15 from "../programs/program15";
import program16 from "../programs/program16";
import program17 from "../programs/program17";
import program10 from "../programs/program10";

const programs = [
  program1, program2, program3, program4, program5, program6,
  program7, program8, program9, program10, program11, program14, program15, program16, program17
];

// -------------------- ANIMATIONS --------------------
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const hoverLift = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-4px); }
`;

// -------------------- STYLED COMPONENTS --------------------
const Container = styled.div`
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "San Francisco";
  color: #e6eef8;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 70px;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    background: linear-gradient(90deg, #60a5fa, #34d399, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 12px;
    letter-spacing: -0.6px;
    transition: letter-spacing 0.3s ease;
  }

  h1:hover {
    letter-spacing: 0px; // subtle micro hover detail
  }

  p {
    color: #94a3b8;
    font-size: 1.05rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
`;

const Card = styled(Link)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border-radius: 18px;
  padding: 26px 22px;
  text-decoration: none;
  color: #e6eef8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 14px 28px rgba(0,0,0,0.35);
  }

  &:active {
    transform: scale(0.98); // micro press feedback
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
`;

const Small = styled.div`
  color: #cbd5e1;
  font-size: 0.85rem;
`;

const Footer = styled.div`
  margin-top: 90px;
  font-size: 0.9rem;
  color: #94a3b8;
  text-align: center;

  a {
    color: #60a5fa;
    text-decoration: none;
    font-weight: 600;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 0%;
      height: 2px;
      background: #60a5fa;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%; // subtle underline animation
    }
  }
`;

// -------------------- COMPONENT --------------------
export default function Dashboard() {
  return (
    <Container>
      <Header>
        <h1>Code Playground</h1>
        <p>Your C Lab programs, reimagined with style.</p>
      </Header>

      <Grid>
        {programs.map((p, idx) => (
          <Card key={p.id} to={`/program/${p.id}`} delay={`${idx * 0.05}s`}>
            <Title>{p.title}</Title>
            <Small>Program #{p.id}</Small>
          </Card>
        ))}
      </Grid>

      <Footer>
        Built with ❤️ by{" "}
        <a href="https://www.instagram.com/_zainn.27" target="_blank" rel="noreferrer">
          @_zainn.27
        </a>
      </Footer>
    </Container>
  );
}
