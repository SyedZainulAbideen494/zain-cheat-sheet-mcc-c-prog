import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProgramPage from "./components/ProgramPage";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #0b0f14;
    color: #e6eef8;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco";
    padding: 0 24px;
  }
  h1,h2,h3 { color: #e6eef8; }
`;

const Main = styled.div`
  padding: 20px;
`;

export default function App() {
  return (
    <Router>
      <GlobalStyle />
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
