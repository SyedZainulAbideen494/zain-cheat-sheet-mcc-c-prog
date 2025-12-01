import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FiCopy, FiDownload, FiCheck, FiArrowLeft, FiChevronLeft, FiChevronRight, FiHelpCircle } from "react-icons/fi";

import program1 from "../programs/program1";
import program2 from "../programs/program2";
import program3 from "../programs/program3";

/* ---------------- Registry ---------------- */
const allPrograms = { 1: program1, 2: program2, 3: program3 };
const idsList = Object.keys(allPrograms).map(n => +n).sort((a,b)=>a-b);

/* ---------------- Animations ---------------- */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const floaty = keyframes`
  0% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(0,-8px,0); }
  100% { transform: translate3d(0,0,0); }
`;

/* ---------------- Styles ---------------- */
const Page = styled.div`
  --bg: #080c11;
  --panel: rgba(255,255,255,0.035);
  --panelHover: rgba(255,255,255,0.06);
  --text: #eaf2fb;
  --muted: #9aa7b5;
  --accent: #70e6ff;
  --ring: rgba(112,230,255,0.33);
  --stroke: rgba(255,255,255,0.10);

  padding: 18px 16px 40px;
  color: var(--text);
  animation: ${fadeIn} .6s ease both;
  @media (min-width: 720px) { padding: 28px 24px 56px; }
`;

const BackRow = styled.div`
  display:flex; align-items:center; gap:10px; margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--stroke);
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px;
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
  &:hover { background: var(--panelHover); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.25); }
  &:active { transform: scale(.98); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--ring); }
`;

const TitleRow = styled.div`
  display:flex; align-items:center; justify-content:space-between; gap: 10px;
  margin: 8px 0 8px; flex-wrap: wrap;
`;

const Title = styled.h2`
  font-weight: 750;
  font-size: clamp(1.2rem, 2.6vw, 1.6rem);
  letter-spacing: -0.02em;
  margin: 0;
`;

const LangPill = styled.span`
  border: 1px solid var(--stroke);
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(255,255,255,0.03);
  color: var(--muted);
  font-size: .85rem;
`;

const Toolbar = styled.div`
  position: sticky; top: 12px; z-index: 10;
  display:flex; align-items:center; gap: 10px; flex-wrap: wrap;
  padding: 10px; margin: 6px 0 16px;
  background: linear-gradient(180deg, rgba(12,15,20,.85), rgba(12,15,20,.45));
  border: 1px solid var(--stroke); border-radius: 14px;
  backdrop-filter: blur(12px); box-shadow: 0 10px 28px rgba(0,0,0,.22);
`;

const Button = styled.button`
  background: var(--panel); color: var(--text);
  border: 1px solid var(--stroke); padding: 8px 12px;
  border-radius: 12px; cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px; font-size: 0.92rem;
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
  &:hover { background: var(--panelHover); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.25); }
  &:active { transform: scale(.98); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--ring); }
`;

const GhostButton = styled(Button)`
  background: transparent;
`;

const Spacer = styled.div` flex: 1; `;
const Pager = styled.div` display:flex; gap:8px; `;

const CodeShell = styled.div`
  position: relative; border-radius: 14px; overflow-x: auto;
  border: 1px solid var(--stroke);
  background: radial-gradient(1200px 700px at 10% -10%, #0e1520 0%, var(--bg) 55%),
              radial-gradient(1000px 600px at 100% 120%, #0b1118 0%, var(--bg) 60%);
  box-shadow: 0 16px 36px rgba(0,0,0,.35);
  transform: translateZ(0); will-change: transform;
  &::after{
    content:""; position:absolute; inset:-1px; border-radius: 14px; pointer-events:none;
    background: radial-gradient(220px 150px at var(--mx,50%) var(--my,50%), rgba(112,230,255,0.12), transparent 60%);
    mix-blend-mode: screen; opacity: var(--afterOpacity,0); transition: opacity .18s ease;
  }
`;
const CodeInner = styled.div`
  padding: 14px 12px 10px; min-width: 600px;
  @media (min-width: 720px) { padding: 18px 16px 12px; }
`;
const GlowBlob = styled.div`
  position: absolute; width: 260px; height: 260px; border-radius: 50%;
  filter: blur(32px); opacity: .22; pointer-events: none; mix-blend-mode: screen;
  background: radial-gradient(circle at 30% 30%, var(--accent), transparent 60%);
  top: -60px; left: -40px; animation: ${floaty} 8s ease-in-out infinite;
`;

const Toast = styled.div`
  position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
  background: #14181f; border: 1px solid var(--stroke);
  border-radius: 12px; padding: 10px 14px; color: var(--text); font-size: 0.92rem;
  display: flex; align-items: center; gap: 8px; box-shadow: 0 10px 24px rgba(0,0,0,.30);
  animation: ${slideUp} .32s ease both; z-index: 9999;
`;

const Shortcuts = styled.div`
  position: fixed; right: 16px; bottom: 16px; z-index: 20;
  background: rgba(15,23,42,.9); border: 1px solid var(--stroke); border-radius: 12px;
  padding: 10px 12px; color: var(--muted); font-size: .88rem;
  box-shadow: 0 10px 28px rgba(0,0,0,.35); animation: ${fadeIn} .25s ease both;
  ul { margin: 6px 0 0; padding-left: 18px; }
  li { margin: 2px 0; }
`;

/* ---------------- Component ---------------- */
export default function ProgramPage() {
  const { id } = useParams();
  const numericId = Number(id);
  const prog = allPrograms[numericId];
  const navigate = useNavigate();
  const shellRef = useRef(null);

  const [showToast, setShowToast] = useState(null);
  const [font, setFont] = useState(() => Number(localStorage.getItem("fontSize")) || 15);
  const [showHelp, setShowHelp] = useState(false);

  const show = useCallback((msg) => {
    setShowToast(msg);
    const t = setTimeout(() => setShowToast(null), 1600);
    return () => clearTimeout(t);
  }, []);

  const copyCode = useCallback(async () => {
    if (!prog) return;
    try { await navigator.clipboard.writeText(prog.code); show("Copied to clipboard"); }
    catch { show("Copy failed"); }
  }, [prog, show]);

  const extByLang = (lang) => {
    const L = (lang || "").toLowerCase();
    if (L === "c") return "c";
    if (L === "cpp" || L === "c++") return "cpp";
    if (L === "java") return "java";
    if (L === "python" || L === "py") return "py";
    if (L === "javascript" || L === "js") return "js";
    return "txt";
  };

  const downloadFile = useCallback(() => {
    if (!prog) return;
    const ext = extByLang(prog.lang);
    const blob = new Blob([prog.code], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `program${prog.id}.${ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    show("File downloaded");
  }, [prog, show]);

  const adjustFont = useCallback((delta) => {
    setFont((f) => {
      const nf = Math.min(22, Math.max(12, f + delta));
      localStorage.setItem("fontSize", String(nf));
      return nf;
    });
  }, []);

  // index + neighbors
  const index = idsList.indexOf(numericId);
  const prevId = useMemo(() => (index > 0 ? idsList[index - 1] : null), [index]);
  const nextId = useMemo(() => (index >= 0 && index < idsList.length - 1 ? idsList[index + 1] : null), [index]);

  // scroll to top on id change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [numericId]);

  // keyboard shortcuts (the “key functions”):
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); navigate("/"); }
      if (e.key === "?") { e.preventDefault(); setShowHelp(s => !s); }
      if (e.key === "c") { e.preventDefault(); copyCode(); }
      if (e.key === "d") { e.preventDefault(); downloadFile(); }
      if (e.key === "+" || e.key === "=") { e.preventDefault(); adjustFont(1); }
      if (e.key === "-" || e.key === "_") { e.preventDefault(); adjustFont(-1); }
      if (e.key === "ArrowLeft" && prevId != null) { e.preventDefault(); navigate(`/program/${prevId}`); }
      if (e.key === "ArrowRight" && nextId != null) { e.preventDefault(); navigate(`/program/${nextId}`); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, copyCode, downloadFile, adjustFont, prevId, nextId]);

  // tilt + glow
  const onMouseMove = (e) => {
    const el = shellRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    const tiltX = (my - 50) / -12;
    const tiltY = (mx - 50) / 12;
    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
    el.style.setProperty("--afterOpacity", ".95");
  };
  const onMouseLeave = () => {
    const el = shellRef.current; if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
    el.style.setProperty("--afterOpacity", "0");
  };

  return (
    <Page>
      <BackRow>
        <BackButton onClick={() => navigate("/")} aria-label="Back"><FiArrowLeft /> Back</BackButton>
        <LangPill>{((prog && prog.lang) || "text").toUpperCase()}</LangPill>
      </BackRow>

      <TitleRow>
        <Title>{prog ? prog.title : "Program not found"}</Title>
        <Pager>
          <Button onClick={() => prevId && navigate(`/program/${prevId}`)} disabled={!prevId} title="Prev (←)">
            <FiChevronLeft /> Prev
          </Button>
          <Button onClick={() => nextId && navigate(`/program/${nextId}`)} disabled={!nextId} title="Next (→)">
            Next <FiChevronRight />
          </Button>
        </Pager>
      </TitleRow>

      {prog ? (
        <>
          <Toolbar role="toolbar" aria-label="Code actions">
            <Button onClick={copyCode} title="Copy (c)"><FiCopy /> Copy</Button>
            <Button onClick={downloadFile} title="Download (d)"><FiDownload /> Download</Button>
            <Button onClick={() => adjustFont(-1)} title="Font smaller (-)">A−</Button>
            <Button onClick={() => adjustFont(+1)} title="Font bigger (+)">A+</Button>
            <Spacer />
            <GhostButton onClick={() => setShowHelp(s => !s)} title="Shortcuts (?)">
              <FiHelpCircle /> Shortcuts
            </GhostButton>
            <LangPill>Program #{prog.id}</LangPill>
          </Toolbar>

          <CodeShell ref={shellRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            <GlowBlob aria-hidden />
            <CodeInner>
              <SyntaxHighlighter
                language={prog.lang}
                style={tomorrowNight}
                showLineNumbers
                wrapLines={false} // always unwrapped
                customStyle={{
                  minWidth: "600px",
                  fontSize: `${font}px`,
                  paddingRight: "24px",
                  background: "transparent",
                  overflowX: "auto",
                }}
                codeTagProps={{ style: { fontFeatureSettings: "'calt' 0, 'liga' 0" } }}
              >
                {prog.code}
              </SyntaxHighlighter>
            </CodeInner>
          </CodeShell>
        </>
      ) : (
        <p style={{ color: "#aaa", padding: 20 }}>Program not found.</p>
      )}

      {showHelp && (
        <Shortcuts>
          <strong>Shortcuts</strong>
          <ul>
            <li><kbd>c</kbd> copy</li>
            <li><kbd>d</kbd> download</li>
            <li><kbd>+</kbd>/<kbd>-</kbd> font size</li>
            <li><kbd>←</kbd>/<kbd>→</kbd> prev/next</li>
            <li><kbd>Esc</kbd> back</li>
            <li><kbd>?</kbd> toggle this</li>
          </ul>
        </Shortcuts>
      )}

      {showToast && (
        <Toast><FiCheck /> {showToast}</Toast>
      )}
    </Page>
  );
}
