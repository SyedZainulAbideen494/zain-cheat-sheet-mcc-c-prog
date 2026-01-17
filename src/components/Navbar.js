import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiSearch } from "react-icons/fi";

/* ---------- animations ---------- */
const fadeSlide = keyframes`
  0% { opacity: 0; transform: translateY(-8px) scale(.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

/* ---------- styles ---------- */
const Bar = styled.nav`
  --bg: rgba(15,23,42,.55);
  --stroke: rgba(255,255,255,.08);
  --hover: rgba(255,255,255,.12);
  --text: #e6eef8;
  --muted: #94a3b8;
  --accent: #70e6ff;

  position: sticky; top: 16px; z-index: 100;
  margin: 24px auto 0;
  width: min(1024px, calc(100% - 24px));
  display: grid; grid-template-columns: 1fr auto; align-items: center;
  gap: 12px;

  padding: 12px 16px;
  border-radius: 18px;
  background: var(--bg);
  backdrop-filter: blur(14px);
  border: 1px solid var(--stroke);
  color: var(--text);
  box-shadow: 0 8px 24px rgba(0,0,0,.35);
  animation: ${fadeSlide} .45s ease both;

  @media (min-width: 720px) {
    padding: 14px 20px;
    border-radius: 22px;
  }
`;

const Left = styled.div`
  display: flex; align-items: center; gap: 10px;
`;

const Brand = styled.button`
  appearance: none; border: 0; background: transparent; color: var(--text);
  font-family: ui-sans-serif, -apple-system, "SF Pro Display", Inter, system-ui, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 800; letter-spacing: -.02em; cursor: pointer;
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  padding: 6px 10px; border-radius: 12px;
  transition: transform .15s ease, background .15s ease;
  &:hover { transform: translateY(-1px); background: rgba(255,255,255,.06); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(112,230,255,.35); }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: 14px; cursor: pointer;
  background: rgba(255,255,255,.10);
  border: 1px solid rgba(255,255,255,.15);
  color: var(--text); font-size: 14.5px; font-weight: 600;
  backdrop-filter: blur(10px);
  transition: transform .2s ease, background .2s ease, box-shadow .2s ease;

  svg { transition: transform .2s ease; transform: rotate(${({$open}) => $open ? "180deg" : "0deg"}); }

  &:hover { background: rgba(255,255,255,.14); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.25); }
  &:active { transform: translateY(0) scale(.98); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(112,230,255,.35); }
`;

const Menu = styled.div`
  position: absolute; top: calc(100% + 8px); left: 0;
  display: ${({$open}) => $open ? "flex" : "none"};
  flex-direction: column;
  width: min(320px, 88vw);
  max-height: 60vh; overflow: hidden;
  background: rgba(15,23,42,.90);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,.45), 0 0 0 3px rgba(112,230,255,.10) inset;
  backdrop-filter: blur(14px);
  animation: ${fadeSlide} .2s ease both;

  /* scroll area */
  .scroll {
    overflow: auto; padding: 6px 4px; scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,.25) transparent;
  }
  .scroll::-webkit-scrollbar { width: 8px; }
  .scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.25); border-radius: 6px; }
`;

const SearchRow = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px 8px; border-bottom: 1px solid rgba(255,255,255,.08);
  color: var(--muted);

  .input {
    flex: 1; display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
    border-radius: 10px; padding: 8px 10px;
  }
  input {
    flex: 1; background: transparent; border: 0; color: var(--text); outline: none;
    font-size: 14px;
  }
`;

const Item = styled.button`
  width: 100%; text-align: left;
  padding: 11px 14px; border: 0; background: transparent; color: var(--text);
  font-size: 15px; font-weight: 500; cursor: pointer;
  border-radius: 10px; margin: 2px 6px;
  transition: background .15s ease, transform .15s ease, color .15s ease;
  display: flex; align-items: center; gap: 10px;

  &:hover, &.active { background: rgba(255,255,255,.10); color: #9de8ff; transform: translateX(2px); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(112,230,255,.35); }
`;

const Info = styled.div`
  justify-self: end;
  font-size: 14px; color: var(--muted);
  a {
    color: #9fb7ff; text-decoration: none; font-weight: 600; position: relative;
  }
  a::after {
    content:""; position:absolute; left:0; bottom:-2px; height:2px; width:0%; background:#9fb7ff;
    transition: width .25s ease;
  }
  a:hover::after { width: 100%; }
`;

/* ---------- component ---------- */
export default function Navbar() {
  const navigate = useNavigate();
  const programNumbers = [1, 2, 3, 4]; // extend as you add programs

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0); // keyboard focus inside menu
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = programNumbers.map(n => ({ id: n, label: `Program ${n}` }));
    return q ? base.filter(it => it.label.toLowerCase().includes(q) || String(it.id).includes(q)) : base;
  }, [programNumbers, query]);

  // open/close handlers
  const toggle = () => setOpen(v => !v);
  const close = () => { setOpen(false); setActiveIdx(0); setQuery(""); };
  const openAndFocus = () => {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  // outside click to close
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open]);

  // keyboard navigation inside menu
  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, items.length - 1)); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); return; }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = items[activeIdx];
      if (item) { navigate(`/program/${item.id}`); close(); }
    }
  };

  return (
    <Bar role="navigation" aria-label="Top navigation">
      <Left>
        <Brand onClick={() => navigate("/")}>Code Playground</Brand>

        <DropdownWrapper ref={wrapRef}>
          <Trigger
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="program-menu"
            onClick={() => (open ? close() : openAndFocus())}
            onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); openAndFocus(); } }}
            $open={open}
          >
            Programs <FiChevronDown size={16} />
          </Trigger>

          <Menu
            id="program-menu"
            role="menu"
            aria-hidden={!open}
            $open={open}
            onKeyDown={onKeyDown}
          >
            <SearchRow>
              <div className="input">
                <FiSearch size={16} />
                <input
                  ref={inputRef}
                  placeholder="Search programs…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                />
              </div>
            </SearchRow>

            <div className="scroll" role="none">
              {items.length === 0 && (
                <Item as="div" style={{ opacity: .7, cursor: "default" }}>
                  No matches
                </Item>
              )}
              {items.map((it, i) => (
                <Item
                  key={it.id}
                  role="menuitem"
                  className={i === activeIdx ? "active" : ""}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => { navigate(`/program/${it.id}`); close(); }}
                >
                  {it.label}
                </Item>
              ))}
            </div>
          </Menu>
        </DropdownWrapper>
      </Left>

      <Info>
        Made by{" "}
        <a href="https://instagram.com/_zainn.27" target="_blank" rel="noreferrer">
          @_zainn.27
        </a>
      </Info>
    </Bar>
  );
}
