import React from "react";
import styled, { keyframes } from "styled-components";

// --- subtle fade-in from top ---
const fadeDown = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #0b0f14;
  color: #e6eef8;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco";
  border-bottom: 1px solid rgba(255,255,255,0.05);
  animation: ${fadeDown} 0.6s ease forwards;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #e6eef8;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.03);
    color: #61dafb;
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: #94a3b8;
  display: flex;
  gap: 8px;
  align-items: center;

  a {
    color: #9fb7ff;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: #61dafb;
      transform: scale(1.05);
    }
  }
`;

export default function Navbar() {
  return (
    <Bar>
      <Title>LabCodeBox</Title>
      <Info>
        Made by Syed Zain-ul Abideen •{" "}
        <a href="https://instagram.com/_zainn.27" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </Info>
    </Bar>
  );
}
