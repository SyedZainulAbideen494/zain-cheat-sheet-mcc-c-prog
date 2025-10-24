import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// --- animations ---
const fadeSlide = keyframes`
  0% { opacity: 0; transform: translateY(-8px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeDown = keyframes`
  0% { opacity: 0; transform: translateY(-12px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 40%;
  max-width: 800px;
  margin: 40px auto 0 auto;
  padding: 14px 24px;

  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 25px;

  color: #e6eef8;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco";

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  animation: ${fadeDown} 0.6s ease forwards;

  position: sticky;
  top: 20px;
  z-index: 100;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  padding: 9px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e6eef8;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: scale(1.04);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 10px 0;
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  min-width: 180px;
  max-height: 240px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.25) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.25);
    border-radius: 4px;
  }

  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
  animation: ${fadeSlide} 0.25s ease forwards;
`;

const DropdownItem = styled.div`
  padding: 12px 18px;
  font-size: 15px;
  font-weight: 500;
  color: #e6eef8;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #61dafb;
    padding-left: 22px;
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: #94a3b8;

  a {
    color: #9fb7ff;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.25s ease;

    &:hover {
      color: #61dafb;
      transform: scale(1.06);
    }
  }
`;

export default function Navbar() {
  const navigate = useNavigate();
  const programNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11,12,13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  // delayed close
  const handleClose = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  return (
    <Bar>
      <DropdownWrapper
        onMouseEnter={cancelClose}
        onMouseLeave={handleClose}
      >
        <Button>Programs ▾</Button>
        <DropdownMenu $open={open}>
          {programNumbers.map((num) => (
            <DropdownItem
              key={num}
              onClick={() => navigate(`/program/${num}`)}
            >
              Program {num}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </DropdownWrapper>

      <Info>
        Made by{" "}
        <a
          href="https://instagram.com/_zainn.27"
          target="_blank"
          rel="noreferrer"
        >
          @_zainn.27
        </a>
      </Info>
    </Bar>
  );
}
