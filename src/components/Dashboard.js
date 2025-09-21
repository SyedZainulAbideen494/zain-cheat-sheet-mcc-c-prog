import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import program14 from "../programs/program14";
import program15 from "../programs/program15";
import program16 from "../programs/program16";

const programs = [program14, program15, program16];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(240px,1fr));
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
  transition: all 0.2s;
  &:hover {
    background: rgba(255,255,255,0.06);
    transform: translateY(-4px);
  }
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

const Small = styled.div`
  color: #94a3b8;
  font-size: 13px;
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
    </div>
  );
}
