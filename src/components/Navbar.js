import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #0b0f14;
  color: #e6eef8;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco";
  border-bottom: 1px solid rgba(255,255,255,0.05);
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Info = styled.div`
  font-size: 14px;
  color: #94a3b8;
`;

export default function Navbar() {
  return (
    <Bar>
      <Title>LabCodeBox</Title>
      <Info>
        Made by Syed Zain-ul Abideen •{" "}
        <a href="https://instagram.com/yourinsta" target="_blank" rel="noreferrer" style={{ color: "#9fb7ff" }}>
          Instagram
        </a>
      </Info>
    </Bar>
  );
}
