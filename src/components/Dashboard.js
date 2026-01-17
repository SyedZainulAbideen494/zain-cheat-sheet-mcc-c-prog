import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import program1 from "../programs/program1";
import program2 from "../programs/program2";
import program3 from "../programs/program3";
import program4 from "../programs/program4";
import program5 from "../programs/program5";
import program6 from "../programs/program6";

const programs = [program1, program2, program3, program4];

/* ---------------- Global ---------------- */
const Global = createGlobalStyle`
  :root{
    --bg: #080c11;
    --panel: rgba(255,255,255,0.035);
    --panelHover: rgba(255,255,255,0.06);
    --text: #eaf2fb;
    --muted: #9aa7b5;
    --accent: #70e6ff;
    --ring: rgba(112,230,255,0.33);
    --stroke: rgba(255,255,255,0.10);
    --focus: 0 0 0 4px var(--ring);
  }

  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    color: var(--text);
    background:
      radial-gradient(1200px 700px at 15% -10%, #0e1520 0%, var(--bg) 55%),
      radial-gradient(1000px 600px at 100% 120%, #0b1118 0%, var(--bg) 60%);
    font-family: ui-sans-serif, system-ui, -apple-system, "SF Pro Display",
      Segoe UI, Inter, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  }

  /* faint grid */
  body::before{
    content:"";
    position: fixed; inset: 0; pointer-events: none;
    background:
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0/100% 28px,
      linear-gradient(to right,  rgba(255,255,255,0.03) 1px, transparent 1px) 0 0/28px 100%;
    mask-image: radial-gradient(1200px 800px at 50% -20%, black 20%, transparent 70%);
  }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
`;

/* ---------------- Animations ---------------- */
const rise = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(.985); }
  to   { opacity: 1; transform: translateY(0)   scale(1); }
`;
const floaty = keyframes`
  0% { transform: translate3d(0,0,0) rotate(0.001deg); }
  50% { transform: translate3d(0,-8px,0) rotate(0.001deg); }
  100% { transform: translate3d(0,0,0) rotate(0.001deg); }
`;

/* ---------------- Layout ---------------- */
const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 18px 56px;

  @media (min-width: 640px) { padding: 80px 24px 64px; }
`;

/* Hero with parallax blobs */
const Hero = styled.header`
  position: relative;
  text-align: center;
  margin-bottom: 40px;
  animation: ${rise} .6s ease both;

  h1{
    margin: 0;
    font-size: clamp(2rem, 5.5vw, 3.3rem);
    font-weight: 820; letter-spacing: -0.02em; line-height: 1.05;
    background: linear-gradient(90deg, #d9edff 0%, #eaf2fb 40%, var(--accent) 110%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  p{ margin: 10px auto 0; max-width: 720px; color: var(--muted); font-size: .98rem; }

  .blob{
    position: absolute; filter: blur(32px); opacity: .28; pointer-events: none;
    mix-blend-mode: screen; transform: translateZ(0);
    animation: ${floaty} 8s ease-in-out infinite;
  }
  .b1{ width: 260px; height: 260px; border-radius: 50%;
       background: radial-gradient(circle at 30% 30%, #70e6ff, transparent 60%);
       left: -40px; top: -40px; }
  .b2{ width: 220px; height: 220px; border-radius: 50%;
       background: radial-gradient(circle at 70% 40%, #8dfcff, transparent 60%);
       right: -20px; top: -20px; animation-delay: .6s; }
`;

const Grid = styled.div`
  display: grid; gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: 560px) { grid-template-columns: repeat(2, 1fr); gap: 18px; }
  @media (min-width: 900px) { grid-template-columns: repeat(3, 1fr); gap: 20px; }
`;

/* ---------------- Card ---------------- */
const CardBase = styled(Link)`
  position: relative; isolation: isolate;
  border-radius: 16px; padding: 18px 18px 16px;
  text-decoration: none; color: var(--text);
  background: var(--panel); border: 1px solid var(--stroke);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 28px rgba(0,0,0,.28);
  will-change: transform;
  transition: transform .18s cubic-bezier(.2,.7,.2,1), box-shadow .18s ease, background .18s ease, border-color .18s ease;
  animation: ${rise} .5s ease both;
  outline: none;
  touch-action: manipulation;

  &:focus-visible { box-shadow: var(--focus); }

  /* mobile: larger hit target breathing */
  @media (max-width: 559px) {
    padding: 20px;
    border-radius: 18px;
  }
`;

/* spotlight layer */
const Spotlight = styled.div`
  position: absolute; inset: -1px; border-radius: 16px; pointer-events: none;
  background:
    radial-gradient(180px 120px at var(--mx,50%) var(--my,50%), rgba(112,230,255,0.14), transparent 60%),
    linear-gradient(180deg, transparent, rgba(255,255,255,0.02));
  mix-blend-mode: screen; opacity: 0; transition: opacity .18s ease;
`;

const Accent = styled.div`
  position: absolute; left: 12px; right: 12px; bottom: 10px; height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: .45; transition: opacity .18s ease; pointer-events: none;
`;

const Title = styled.div`
  font-weight: 720; font-size: 1.06rem; letter-spacing: -0.015em;
`;
const Meta = styled.div`
  display:flex; gap:10px; align-items:center; margin-top:8px;
  color: var(--muted); font-size: .85rem;
  .pill{ border: 1px solid var(--stroke); border-radius: 999px; padding: 2px 8px; line-height: 1.6; background: rgba(255,255,255,0.03); }
`;

/* tap ripple (mobile/desktop) */
const Ripple = styled.span`
  position: absolute; pointer-events: none; inset: 0; overflow: hidden; border-radius: 16px;
  &::after{
    content:""; position: absolute; width: 14px; height: 14px; border-radius: 50%;
    background: radial-gradient(circle, rgba(112,230,255,.35) 0%, transparent 60%);
    transform: translate(-50%, -50%) scale(0); opacity: .9;
    left: var(--rx, 50%); top: var(--ry, 50%);
    transition: transform .45s ease, opacity .55s ease;
  }
  &.show::after{ transform: translate(-50%, -50%) scale(18); opacity: 0; }
`;

/* ---------------- Footer ---------------- */
const Footer = styled.footer`
  margin-top: 44px; text-align: center; color: var(--muted); font-size: .9rem;
  a{ color: var(--accent); text-decoration: none; font-weight: 600; position: relative; }
  a::after{ content:""; position:absolute; left:0; bottom:-2px; height:2px; width:0%; background: var(--accent); transition: width .25s ease; }
  a:hover::after{ width:100%; }
`;

/* ---------------- Card component with tilt/spotlight/ripple ---------------- */
const Card = ({ to, delay, children, ...rest }) => {
  const ref = useRef(null);
  const rippleRef = useRef(null);

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const y = e.clientY ?? (e.touches && e.touches[0]?.clientY);
    if (x == null || y == null) return;

    const mx = ((x - r.left) / r.width) * 100; // 0..100
    const my = ((y - r.top) / r.height) * 100;

    // tilt limits
    const tiltX = (my - 50) / -10; // -5..5
    const tiltY = (mx - 50) / 10;
    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;

    // spotlight
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
    const spot = el.querySelector(".spot");
    if (spot) spot.style.opacity = ".95";
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0) rotateY(0) translateY(0)`;
    const spot = el.querySelector(".spot");
    if (spot) spot.style.opacity = "0";
  };

  const onPointerDown = (e) => {
    // ripple origin
    const el = ref.current;
    const ripple = rippleRef.current;
    if (!el || !ripple) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - r.left;
    const y = (e.clientY ?? e.touches?.[0]?.clientY) - r.top;
    ripple.style.setProperty("--rx", `${x}px`);
    ripple.style.setProperty("--ry", `${y}px`);
    ripple.classList.remove("show");
    // force reflow to restart animation
    // eslint-disable-next-line no-unused-expressions
    ripple.offsetHeight;
    ripple.classList.add("show");
  };

  return (
    <CardBase
      to={to}
      ref={ref}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      onTouchMove={onPointerMove}
      onPointerDown={onPointerDown}
      style={{ animationDelay: delay || "0s" }}
      {...rest}
    >
      <Spotlight className="spot" />
      <Ripple ref={rippleRef} />
      {children}
      <Accent />
    </CardBase>
  );
};

/* ---------------- Page ---------------- */
export default function Dashboard() {
  // Parallax for blobs (very light)
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const b1 = el.querySelector(".b1");
    const b2 = el.querySelector(".b2");
    const handler = () => {
      const y = window.scrollY || 0;
      const damp = 0.06;
      if (b1) b1.style.transform = `translate3d(0, ${-y * damp}px, 0)`;
      if (b2) b2.style.transform = `translate3d(0, ${-y * (damp*1.3)}px, 0)`;
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <Global />
      <Container>
        <Hero ref={heroRef}>
          <div className="blob b1" aria-hidden />
          <div className="blob b2" aria-hidden />
          <h1>Java Programs</h1>
          <p></p>
        </Hero>

        <Grid>
          {programs.map((p, idx) => (
            <Card key={p.id} to={`/program/${p.id}`} delay={`${idx * 0.04}s`} aria-label={`Open ${p.title}`}>
              <Title>{p.title}</Title>
              <Meta>
                <span className="pill">#{p.id}</span>
                <span className="pill">Java</span>
              </Meta>
            </Card>
          ))}
        </Grid>

        <Footer>
          <a href="https://www.instagram.com/_zainn.27" target="_blank" rel="noreferrer">
            @_zainn.27
          </a>
        </Footer>
      </Container>
    </>
  );
}
