import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProgramPage from "./components/ProgramPage";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  /* Reset & global */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #0b0f14;
    color: #e6eef8;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif;
    line-height: 1.6;
    transition: background 0.3s ease, color 0.3s ease;
  }

  h1,h2,h3,h4 {
    color: #e6eef8;
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  p {
    color: #c0c5ce;
    font-size: 0.95rem;
  }

  a {
    color: #61dafb;
    text-decoration: none;
    transition: all 0.2s ease;
    &:hover { opacity: 0.8; transform: scale(1.02); }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  ::selection {
    background: #61dafb33;
    color: #fff;
  }
`;

// --- Subtle fade-in animation ---
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Main = styled.div`
  padding: 20px;
  animation: ${fadeIn} 0.6s ease forwards;
  max-width: 1200px;
  margin: 0 auto;
`;

// Optional: Background micro animations
const BackgroundDots = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  div {
    position: absolute;
    width: 6px;
    height: 6px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
    animation: float 10s linear infinite;
    opacity: 0.3;
  }

  @keyframes float {
    0% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
    50% { opacity: 0.4; }
    100% { transform: translateY(-2000px) translateX(200px); opacity: 0.1; }
  }
`;

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <BackgroundDots>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 15}s`,
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
            opacity: Math.random() * 0.3
          }} />
        ))}
      </BackgroundDots>
      <Navbar />
      <Main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/program/:id" element={<ProgramPage />} />
        </Routes>
      </Main>
    </Router>
  );
}
