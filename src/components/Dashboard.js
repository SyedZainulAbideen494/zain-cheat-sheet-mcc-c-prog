import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Import programs
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

// Store selected programs in array
const programs = [
  program1, program2, program3, program4, program5, program6,
  program7, program8, program9, program11, program14, program15, program16
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const Card = styled(Link)`
  background: rgba(255,255,255,0.03);
  padding: 18px;
  border-radius: 14px;
  color: #e6eef8;
  text-decoration: none;
  font-family: Menlo, monospace;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  &:hover {
    background: rgba(255,255,255,0.06);
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
  font-size: 16px;
`;

const Small = styled.div`
  color: #94a3b8;
  font-size: 13px;
`;

const Footer = styled.div`
  margin-top: 60px;
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
  a {
    color: #94a3b8;
    text-decoration: underline;
  }
`;

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Select a program to view its code.</p>
      <Grid>
        {programs.map((p) => (
          <Card key={p.id} to={`/program/${p.id}`}>
            <Title>{p.title}</Title>
            <Small>Program #{p.id}</Small>
          </Card>
        ))}
      </Grid>
      <Footer>
        Made by <a href="https://www.instagram.com/_zainn.27" target="_blank" rel="noreferrer">@_zainn.27</a>
      </Footer>
    </div>
  );
}
