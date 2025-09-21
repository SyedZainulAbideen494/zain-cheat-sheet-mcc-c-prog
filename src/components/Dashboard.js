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

const programs = [
  program1, program2, program3, program4, program5, program6,
  program7, program8, program9, program11, program14, program15, program16
];

// -------------------- ANIMATIONS --------------------
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const floatUp = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// -------------------- STYLED COMPONENTS --------------------
const Container = styled.div`
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #e6eef8;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(90deg, #4ade80, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
  }

  p {
    color: #94a3b8;
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
`;

const Card = styled(Link)`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px); // glassmorphism effect
  padding: 26px 22px;
  border-radius: 22px;
  text-decoration: none;
  color: #e6eef8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  transition: all 0.35s ease;
  animation: ${fadeInUp} 0.5s ease forwards;
  font-family: 'Fira Code', monospace;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 35px rgba(0,0,0,0.35);
    background: rgba(255, 255, 255, 0.08);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(120deg, rgba(255,255,255,0.1), rgba(0,0,0,0));
    transform: rotate(45deg);
    transition: all 0.5s ease;
    pointer-events: none;
  }

  &:hover::after {
    top: -20%;
    left: -20%;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const Small = styled.div`
  color: #94a3b8;
  font-size: 0.85rem;
`;

const Footer = styled.div`
  margin-top: 80px;
  font-size: 0.85rem;
  color: #94a3b8;
  text-align: center;

  a {
    color: #06b6d4;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// -------------------- COMPONENT --------------------
export default function Dashboard() {
  return (
    <Container>
      <Header>
        <h1>Code Playground</h1>
        <p>Select a program and start exploring.</p>
      </Header>

      <Grid>
        {programs.map((p, idx) => (
          <Card key={p.id} to={`/program/${p.id}`} style={{ animationDelay: `${idx * 0.05}s` }}>
            <Title>{p.title}</Title>
            <Small>Program ID: {p.id}</Small>
          </Card>
        ))}
      </Grid>

      <Footer>
        Made by <a href="https://www.instagram.com/_zainn.27" target="_blank" rel="noreferrer">@_zainn.27</a>
      </Footer>
    </Container>
  );
}
