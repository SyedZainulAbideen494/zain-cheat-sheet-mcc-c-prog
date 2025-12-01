import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FiCopy, FiDownload, FiCheck, FiArrowLeft } from "react-icons/fi";

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
import program19 from "../programs/program19";
import program20 from "../programs/program20";
import program21 from "../programs/program21";
import program18 from "../programs/program18";
import program22 from "../programs/program22";
import program12 from "../programs/program12";
import program13 from "../programs/program13";

const allPrograms = {
  1: program1, 2: program2, 3: program3, 4: program4,
  5: program5, 6: program6, 7: program7, 8: program8,
  9: program9, 10: program10, 11: program11,12: program12, 13: program13, 14: program14, 15: program15,
  16: program16, 17: program17,18: program18,19: program19 ,20: program20,21: program21
};

// -------------------- ANIMATIONS --------------------
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// -------------------- STYLES --------------------
const Container = styled.div`
  margin-top: 40px;
  padding: 20px;
  animation: ${fadeIn} 0.6s ease;
`;

const BackButton = styled.button`
  background: rgba(255,255,255,0.06);
  color: #e6eef8;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255,255,255,0.12);
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const Title = styled.h2`
  color: #e6eef8;
  font-weight: 500;
  font-size: 1.6rem;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`;

const Toolbar = styled.div`
  margin: 10px 0 18px;
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  background: rgba(255,255,255,0.06);
  color: #e6eef8;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 8px 14px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255,255,255,0.12);
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const CodeWrapper = styled.div`
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;     /* space below code */
  margin-right: 6px;       /* small right margin */
`;


// -------------------- TOAST --------------------
const Toast = styled.div`
  position: fixed;        // fixed to viewport
  top: 20px;              // 20px from the top
  left: 50%;              // horizontally center
  transform: translateX(-50%);
  background: #1a1a1a;
  border-radius: 16px;
  padding: 12px 20px;
  color: #e6eef8;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 4px 16px rgba(0,0,0,0.3);
  animation: ${slideUp} 0.35s ease forwards;
  z-index: 9999;          // above everything
`;


// -------------------- COMPONENT --------------------
export default function ProgramPage() {
  const { id } = useParams();
  const prog = allPrograms[id];
  const [showModal, setShowModal] = useState(null); // "copied" or "downloaded"
  const navigate = useNavigate();

  // Scroll to top whenever program changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!prog) return <p style={{ color: "#aaa" }}>Program not found.</p>;

  function copyCode() {
    navigator.clipboard.writeText(prog.code);
    setShowModal("copied");
    setTimeout(() => setShowModal(null), 2000);
  }

  function downloadFile() {
    const blob = new Blob([prog.code], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `program${prog.id}.c`;
    link.click();
    setShowModal("downloaded");
    setTimeout(() => setShowModal(null), 2000);
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>
        <FiArrowLeft /> Back
      </BackButton>

      <Title>{prog.title}</Title>

      <Toolbar>
        <Button onClick={copyCode}><FiCopy /> Copy</Button>
        <Button onClick={downloadFile}><FiDownload /> Download</Button>
      </Toolbar>
      {/* Bottom toast/modal */}
      {showModal && (
        <Toast>
          <FiCheck />
          {showModal === "copied" ? "Copied to clipboard!" : "File downloaded!"}
        </Toast>
      )}
<CodeWrapper>
  <SyntaxHighlighter
    language={prog.lang}
    style={tomorrowNight}
    showLineNumbers
    wrapLines={false}
    customStyle={{
      minWidth: "600px",
      fontSize: "0.95rem",
      paddingRight: "24px",  // extra space on the right inside the code
      background: "transparent", // keep background consistent
    }}
  >
    {prog.code}
  </SyntaxHighlighter>
</CodeWrapper>

    </Container>
  );
}
