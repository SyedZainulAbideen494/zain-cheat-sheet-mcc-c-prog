import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FiCopy, FiDownload, FiCheck } from "react-icons/fi";

import program14 from "../programs/program14";
import program15 from "../programs/program15";
import program16 from "../programs/program16";

// All programs stored here
const allPrograms = { 14: program14, 15: program15, 16: program16 };

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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const Modal = styled.div`
  background: #1a1a1a;
  border-radius: 16px;
  padding: 16px 20px;
  color: #e6eef8;
  font-size: 0.95rem;
  animation: ${slideUp} 0.35s ease;
  box-shadow: 0px 8px 24px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CodeWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
`;

// -------------------- COMPONENT --------------------
export default function ProgramPage() {
  const { id } = useParams();
  const prog = allPrograms[id];
  const [showModal, setShowModal] = useState(null); // "copied" or "downloaded"

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
      <Title>{prog.title}</Title>

      <Toolbar>
        <Button onClick={copyCode}><FiCopy /> Copy</Button>
        <Button onClick={downloadFile}><FiDownload /> Download</Button>
      </Toolbar>

      <CodeWrapper>
        <SyntaxHighlighter
          language={prog.lang}
          style={tomorrowNight}
          showLineNumbers
          wrapLongLines
        >
          {prog.code}
        </SyntaxHighlighter>
      </CodeWrapper>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <FiCheck /> {showModal === "copied" ? "Copied to clipboard!" : "File downloaded!"}
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}
