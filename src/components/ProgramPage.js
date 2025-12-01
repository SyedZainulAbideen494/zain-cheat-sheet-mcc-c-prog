import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FiCopy, FiDownload, FiCheck, FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import program1 from "../programs/program1";
import program2 from "../programs/program2";
import program3 from "../programs/program3";
import program4 from "../programs/program4";
import program5 from "../programs/program5";
import program6 from "../programs/program6";
import program7 from "../programs/program7";
import program8 from "../programs/program8";
import program9 from "../programs/program9";
import program10 from "../programs/program10";
import program11 from "../programs/program11";
import program12 from "../programs/program12";
import program13 from "../programs/program13";
import program14 from "../programs/program14";
import program15 from "../programs/program15";
import program16 from "../programs/program16";
import program17 from "../programs/program17";
import program18 from "../programs/program18";
import program19 from "../programs/program19";
import program20 from "../programs/program20";
import program21 from "../programs/program21";
import program22 from "../programs/program22";

/* ---------------- Registry ---------------- */
const allPrograms = {
  1: program1, 2: program2, 3: program3, 4: program4, 5: program5, 6: program6, 7: program7,
  8: program8, 9: program9, 10: program10, 11: program11, 12: program12, 13: program13, 14: program14,
  15: program15, 16: program16, 17: program17, 18: program18, 19: program19, 20: program20, 21: program21,
  22: program22
};
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
  0% { transform: translate3d(0,0,0) rotate(0.001deg); }
  50% { transform: translate3d(0,-8px,0) rotate(0.001deg); }
  100% { transform: translate3d(0,0,0) rotate(0.001deg); }
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

  @media (min-width: 720px) {
    padding: 28px 24px 56px;
  }
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
  &:hover { background: var(--panelHover); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.25); }
  &:active { transform: scale(.98); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--ring); }
`;

const TitleRow = styled.div`
  display:flex; align-items:center; justify-content:space-between; gap: 10px;
  margin: 8px 0 8px;
  flex-wrap: wrap;
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
  position: sticky;
  top: 12px;
  z-index: 10;
  display:flex; align-items:center; gap: 10px; flex-wrap: wrap;
  padding: 10px;
  margin: 6px 0 16px;
  background: linear-gradient(180deg, rgba(12,15,20,.85), rgba(12,15,20,.45));
  border: 1px solid var(--stroke);
  border-radius: 14px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 28px rgba(0,0,0,.22);
`;

const Button = styled.button`
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--stroke);
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.92rem;
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
  &:hover { background: var(--panelHover); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.25); }
  &:active { transform: scale(.98); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--ring); }
`;

const Toggle = styled(Button)`
  ${({ active }) => (active ? `box-shadow: 0 0 0 4px var(--ring);` : ``)}
`;

const Spacer = styled.div` flex: 1; `;

const Pager = styled.div` display:flex; gap:8px; `;

const CodeShell = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--stroke);
  background: radial-gradient(1200px 700px at 10% -10%, #0e1520 0%, var(--bg) 55%)
            , radial-gradient(1000px 600px at 100% 120%, #0b1118 0%, var(--bg) 60%);
  box-shadow: 0 16px 36px rgba(0,0,0,.35);
  transform: translateZ(0);
  will-change: transform;

  &::after{
    content:"";
    position:absolute; inset:-1px; border-radius: 14px; pointer-events:none;
    background: radial-gradient(220px 150px at var(--mx,50%) var(--my,50%), rgba(112,230,255,0.12), transparent 60%);
    mix-blend-mode: screen; opacity: 0; transition: opacity .18s ease;
  }
`;

const CodeInner = styled.div`
  padding: 14px 12px 10px;
  @media (min-width: 720px) { padding: 18px 16px 12px; }
`;

const GlowBlob = styled.div`
  position: absolute; width: 260px; height: 260px; border-radius: 50%;
  filter: blur(32px); opacity: .22; pointer-events: none; mix-blend-mode: screen;
  background: radial-gradient(circle at 30% 30%, var(--accent), transparent 60%);
  top: -60px; left: -40px; animation: ${floaty} 8s ease-in-out infinite;
`;

const Toast = styled.div`
  position: fixed;
  top: 16px; left: 50%; transform: translateX(-50%);
  background: #14181f;
  border: 1px solid var(--stroke);
  border-radius: 12px;
  padding: 10px 14px;
  color: var(--text);
  font-size: 0.92rem;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 10px 24px rgba(0,0,0,.30);
  animation: ${slideUp} .32s ease both;
  z-index: 9999;
`;

/* ---------------- Component ---------------- */
export default function ProgramPage() {
  const { id } = useParams();
  const numericId = Number(id);
  const prog = allPrograms[numericId];
  const navigate = useNavigate();
  const shellRef = useRef(null);

  const [showToast, setShowToast] = useState(null);
  const [wrap, setWrap] = useState(() => localStorage.getItem("wrap") === "1");
  const [font, setFont] = useState(() => {
    const saved = Number(localStorage.getItem("fontSize")) || 15;
    return Math.min(22, Math.max(12, saved));
  });

  // scroll to top when id changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [numericId]);

  // prev/next calculation
  const index = idsList.indexOf(numericId);
  const prevId = useMemo(() => (index > 0 ? idsList[index - 1] : null), [index]);
  const nextId = useMemo(() => (index >= 0 && index < idsList.length - 1 ? idsList[index + 1] : null), [index]);

  // helpers (defined unconditionally)
  const show = useCallback((msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 1600);
  }, []);

  const copyCode = useCallback(async () => {
    if (!prog) return;
    try {
      await navigator.clipboard.writeText(prog.code);
      show("Copied to clipboard");
    } catch {
      show("Copy failed");
    }
  }, [prog, show]);

  const extByLang = useCallback((lang) => {
    const L = (lang || "").toLowerCase();
    if (L === "c") return "c";
    if (L === "cpp" || L === "c++") return "cpp";
    if (L === "java") return "java";
    if (L === "python" || L === "py") return "py";
    if (L === "javascript" || L === "js") return "js";
    return "txt";
  }, []);

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
  }, [prog, extByLang, show]);

  const toggleWrap = useCallback(() => {
    setWrap((v) => {
      const nv = !v;
      localStorage.setItem("wrap", nv ? "1" : "0");
      return nv;
    });
  }, []);

  const adjustFont = useCallback((delta) => {
    setFont((f) => {
      const nf = Math.min(22, Math.max(12, f + delta));
      localStorage.setItem("fontSize", String(nf));
      return nf;
    });
  }, []);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate("/");
      if (e.key === "c") { e.preventDefault(); copyCode(); }
      if (e.key === "d") { e.preventDefault(); downloadFile(); }
      if (e.key === "w") { e.preventDefault(); toggleWrap(); }
      if (e.key === "+" || e.key === "=") { e.preventDefault(); adjustFont(1); }
      if (e.key === "-" || e.key === "_") { e.preventDefault(); adjustFont(-1); }
      if (e.key === "ArrowLeft" && prevId && prevId !== numericId) navigate(`/program/${prevId}`);
      if (e.key === "ArrowRight" && nextId && nextId !== numericId) navigate(`/program/${nextId}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, copyCode, downloadFile, toggleWrap, adjustFont, prevId, nextId, numericId]);

  // hover tilt + spotlight (no no-op expressions)
  const onMouseMove = (e) => {
    const el = shellRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    const tiltX = (my - 50) / -12; // -4..4
    const tiltY = (mx - 50) / 12;  // -4..4
    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
    el.style.setProperty("--afterOpacity", ".95");
  };

  const onMouseLeave = () => {
    const el = shellRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
    el.style.setProperty("--afterOpacity", "0");
  };

  // -------- render --------
  return (
    <Page>
      <BackRow>
        <BackButton onClick={() => navigate("/")} aria-label="Back to dashboard">
          <FiArrowLeft /> Back
        </BackButton>
        <LangPill>{((prog && prog.lang) || "text").toUpperCase()}</LangPill>
      </BackRow>

      <TitleRow>
        <Title>{prog ? prog.title : "Program not found"}</Title>
        <Pager>
          <Button
            onClick={() => prevId && navigate(`/program/${prevId}`)}
            disabled={!prevId || prevId === numericId}
            aria-label="Previous program"
            title="Previous (←)"
          >
            <FiChevronLeft /> Prev
          </Button>
          <Button
            onClick={() => nextId && navigate(`/program/${nextId}`)}
            disabled={!nextId || nextId === numericId}
            aria-label="Next program"
            title="Next (→)"
          >
            Next <FiChevronRight />
          </Button>
        </Pager>
      </TitleRow>

      {prog ? (
        <>
          <Toolbar role="toolbar" aria-label="Code actions">
            <Button onClick={copyCode} title="Copy (c)">
              <FiCopy /> Copy
            </Button>
            <Button onClick={downloadFile} title="Download (d)">
              <FiDownload /> Download
            </Button>
            <Toggle onClick={toggleWrap} active={wrap} title="Toggle wrap (w)">
              {wrap ? "Unwrap" : "Wrap"}
            </Toggle>
            <Button onClick={() => adjustFont(-1)} title="Font smaller (-)">A−</Button>
            <Button onClick={() => adjustFont(+1)} title="Font bigger (+)">A+</Button>
            <Spacer />
            <LangPill>Program #{prog.id}</LangPill>
          </Toolbar>

          <CodeShell ref={shellRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            <GlowBlob aria-hidden />
            <CodeInner>
              <SyntaxHighlighter
                language={prog.lang}
                style={tomorrowNight}
                showLineNumbers
                wrapLines={wrap}
                customStyle={{
                  minWidth: wrap ? "auto" : "600px",
                  fontSize: `${font}px`,
                  paddingRight: "24px",
                  background: "transparent",
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

      {showToast && (
        <Toast>
          <FiCheck />
          {showToast}
        </Toast>
      )}
    </Page>
  );
}
