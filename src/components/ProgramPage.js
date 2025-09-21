import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FiCopy, FiDownload } from "react-icons/fi";
import program14 from "../programs/program14";
import program15 from "../programs/program15";
import program16 from "../programs/program16";

const allPrograms = { 14: program14, 15: program15, 16: program16 };

const Container = styled.div`
  margin-top: 30px;
`;

const Toolbar = styled.div`
  margin: 10px 0;
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  background: rgba(255,255,255,0.05);
  color: #e6eef8;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover { background: rgba(255,255,255,0.08); }
`;

export default function ProgramPage() {
  const { id } = useParams();
  const prog = allPrograms[id];

  if (!prog) return <p>Program not found.</p>;

  function copyCode() {
    navigator.clipboard.writeText(prog.code);
    alert("Copied to clipboard!");
  }

  function downloadFile() {
    const blob = new Blob([prog.code], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `program${prog.id}.c`;
    link.click();
  }

  return (
    <Container>
      <h2>{prog.title}</h2>
      <Toolbar>
        <Button onClick={copyCode}><FiCopy /> Copy</Button>
        <Button onClick={downloadFile}><FiDownload /> Download</Button>
      </Toolbar>
      <SyntaxHighlighter language={prog.lang} style={tomorrowNight} showLineNumbers wrapLongLines>
        {prog.code}
      </SyntaxHighlighter>
    </Container>
  );
}
