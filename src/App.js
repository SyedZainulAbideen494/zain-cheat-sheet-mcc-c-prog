import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  "Attendance successfully avoided. Again. Consistency matters.",
  "DSA logic understood in theory. Brain chose not to participate.",
  "Opened the program, stared at it, closed it. Progress.",
  "Copied the code. Trusted the process. It betrayed you.",
  "You learned nothing today, but you were very comfortable doing it.",
  "Scrolled one reel. Accidentally watched twelve.",
  "This degree is slowly becoming a very expensive habit.",
  "Future plan: survive college first, decide later."
];


const DS_ROASTS = [
  "Lazy kid, write the code. Your fingers still work.",
  "No copy today. Brain usage required.",
  "If you can scroll reels, you can write this. Don’t act helpless.",
  "Open the editor. Start typing. Stop negotiating.",
  "This program won’t write itself. Sadly.",
  "You know this. You’re just being lazy right now.",
  "Five lines in and you’ll be fine. Probably.",
  "Nice try. Now go write the code."
];


const STATS = [
  { label: "Academic Willpower", value: "2%", note: "Extinct species", width: "2%" },
  { label: "Caffeine Saturation", value: "98%", note: "Only thing keeping you upright", width: "98%" },
  { label: "Social Life", value: "Error", note: "Server timed out", width: "0%" },
  { label: "Bunking Level", value: "99.999%", note: "Professional boundary crosser", width: "100%" },
  { label: "Attendance", value: "18%", note: "No exam for u", width: "18%" },
];

export default function BoredApp() {
  const [chaosMsg, setChaosMsg] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [dsMsg, setDsMsg] = useState("");
  const [realityCheck, setRealityCheck] = useState(false);
  const [hasClickedBigBtn, setHasClickedBigBtn] = useState(false);
  const [hasClickedDsBtn, setHasClickedDsBtn] = useState(false);

  const cycleMessage = (current, list, setter, trackSetter) => {
    if (trackSetter) trackSetter(true);
    const filtered = list.filter(m => m !== current);
    const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
    setter(randomItem);
  };

  // Styles Object
  const styles = {
    wrapper: {
      minHeight: '100vh',
      backgroundColor: '#FDFDFB',
      color: '#121212',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '64px 24px',
    },
    header: { textAlign: 'center', marginBottom: '64px' },
    h1: { fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 },
    sub: { fontSize: '12px', fontWeight: '500', color: '#9ca3af', letterSpacing: '0.2em', textTransform: 'uppercase' },
    main: { width: '100%', maxWidth: '384px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' },
    bigBtn: {
      width: '176px', height: '176px', borderRadius: '50%', backgroundColor: 'white',
      border: '6px solid #121212', boxShadow: '8px 8px 0px 0px #121212',
      fontSize: '24px', fontWeight: '900', fontStyle: 'italic', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyCenter: 'center'
    },
    msgBox: {
      marginTop: '32px', padding: '20px', backgroundColor: 'white', border: '2px solid #121212',
      borderRadius: '12px', boxShadow: '4px 4px 0px 0px #121212', textAlign: 'center', fontWeight: 'bold'
    },
    statsToggle: {
      background: 'none', border: 'none', fontSize: '10px', fontWeight: '900',
      textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', cursor: 'pointer', padding: '8px'
    },
    statsCard: {
      width: '100%', marginTop: '16px', backgroundColor: '#121212', color: 'white',
      padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px'
    },
    progressBar: { height: '8px', width: '100%', backgroundColor: '#1f2937', borderRadius: '999px', overflow: 'hidden' },
    dsBtn: {
      width: '100%', padding: '16px', backgroundColor: 'white', border: '2px solid #121212',
      fontWeight: '900', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer'
    },
    dsMsg: {
      marginTop: '12px', padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca',
      color: '#7f1d1d', fontSize: '12px', fontWeight: '700', borderRadius: '8px', textAlign: 'center'
    },
    realityBox: {
      textAlign: 'center', padding: '32px 24px', backgroundColor: '#fef2f2', border: '2px solid #dc2626',
      borderRadius: '16px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Bored in College?</h1>
        <p style={styles.sub}>A scientifically useless experience.</p>
      </header>

      <main style={styles.main}>
        {/* BIG BUTTON */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <motion.button
            onClick={() => cycleMessage(chaosMsg, MESSAGES, setChaosMsg, setHasClickedBigBtn)}
            style={styles.bigBtn}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{width: '100%'}}>{hasClickedBigBtn ? "CLICK AGAIN" : "CLICK"}</span>
          </motion.button>

          <AnimatePresence mode="wait">
            {chaosMsg && (
              <motion.div 
                key={chaosMsg}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                style={styles.msgBox}
              >
                "{chaosMsg}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* STATS SECTION */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <button onClick={() => setShowStats(!showStats)} style={styles.statsToggle}>
            {showStats ? "[ Close Classified Data ]" : "[ View My Stats ]"}
          </button>
          <AnimatePresence>
            {showStats && (
              <motion.section 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                style={styles.statsCard}
              >
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#818cf8', fontWeight: 'bold' }}>
                      <span>{stat.label}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div style={styles.progressBar}>
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: stat.width }}
                        style={{ height: '100%', backgroundColor: 'white' }}
                      />
                    </div>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: '4px 0 0' }}>{stat.note}</p>
                  </div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* DS ROAST SECTION */}
        <div style={{ width: '100%' }}>
          <button 
            onClick={() => cycleMessage(dsMsg, DS_ROASTS, setDsMsg, setHasClickedDsBtn)}
            style={styles.dsBtn}
          >
            {hasClickedDsBtn ? "Ok sry, click again for code" : "Tomorrow’s DS Program"}
          </button>
          <AnimatePresence mode="wait">
            {dsMsg && (
              <motion.div key={dsMsg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.dsMsg}>
                {dsMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* REALITY CHECK */}
        <div style={{ paddingBottom: '80px', width: '100%' }}>
          {!realityCheck ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setRealityCheck(true)}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', letterSpacing: '3px' }}>CLICK HERE</span>
              <div style={{ width: '48px', height: '2px', backgroundColor: '#e5e7eb', marginTop: '8px' }} />
            </div>
          ) : (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={styles.realityBox}>
              <h2 style={{ margin: 0, fontSize: '28px', color: '#dc2626', fontWeight: '900' }}>GO STUDY.</h2>
              <p style={{ fontWeight: 'bold', color: '#7f1d1d' }}>Lazy kid.</p>
              <button 
                onClick={() => { setRealityCheck(false); setHasClickedDsBtn(false); }}
                style={{ background: 'none', border: 'none', textDecoration: 'underline', color: '#dc2626', fontSize: '10px', cursor: 'pointer', marginTop: '20px' }}
              >
                I'm sorry, take me back
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}