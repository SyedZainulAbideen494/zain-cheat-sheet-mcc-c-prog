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
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Brand = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--text);
  font-weight: 800;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 6px 10px;
  border-radius: 12px;

  &:hover { background: rgba(255,255,255,.06); }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 14px;
  cursor: pointer;
  background: rgba(255,255,255,.10);
  border: 1px solid rgba(255,255,255,.15);
  color: var(--text);
  font-weight: 600;

  svg {
    transition: transform .2s ease;
    transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  }
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  width: min(320px, 88vw);
  background: rgba(15,23,42,.9);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.12);
`;

const SearchRow = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(255,255,255,.08);

  input {
    width: 100%;
    background: transparent;
    border: 0;
    color: var(--text);
    outline: none;
  }
`;

const Item = styled.button`
  width: 100%;
  padding: 10px 14px;
  background: transparent;
  border: 0;
  color: var(--text);
  cursor: pointer;
  text-align: left;

  &:hover,
  &.active {
    background: rgba(255,255,255,.1);
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: var(--muted);
`;

/* ---------- component ---------- */
export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  // ✅ FIXED useMemo (programNumbers moved inside)
  const items = useMemo(() => {
    const programNumbers = [1, 2, 3, 4];
    const q = query.trim().toLowerCase();

    const base = programNumbers.map(n => ({
      id: n,
      label: `Program ${n}`
    }));

    return q
      ? base.filter(it =>
          it.label.toLowerCase().includes(q) ||
          String(it.id).includes(q)
        )
      : base;
  }, [query]);

  const close = () => {
    setOpen(false);
    setActiveIdx(0);
    setQuery("");
  };

  const openAndFocus = () => {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  // outside click
  useEffect(() => {
    if (!open) return;

    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) close();
    };

    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <Bar>
      <Left>
        <Brand onClick={() => navigate("/")}>Code Playground</Brand>

        <DropdownWrapper ref={wrapRef}>
          <Trigger $open={open} onClick={() => (open ? close() : openAndFocus())}>
            Programs <FiChevronDown />
          </Trigger>

          <Menu $open={open}>
            <SearchRow>
              <FiSearch />
              <input
                ref={inputRef}
                placeholder="Search programs…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
              />
            </SearchRow>

            {items.map((it, i) => (
              <Item
                key={it.id}
                className={i === activeIdx ? "active" : ""}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => {
                  navigate(`/program/${it.id}`);
                  close();
                }}
              >
                {it.label}
              </Item>
            ))}
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
