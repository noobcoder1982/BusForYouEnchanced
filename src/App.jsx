import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransformSection from './components/TransformSection';
import Marquee from './components/Marquee';
import Works from './components/Works';
import Process from './components/Process';
import Footer from './components/Footer';
import Booking from './pages/Booking';
import './index.css';

/* ── Cinematic theme-transition overlay ─────────────────────
   When the user toggles theme, a full-screen overlay briefly
   fades in then fades out, hiding the raw CSS token swap.   */
const ThemeTransitionOverlay = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        key="theme-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          position:   'fixed',
          inset:      0,
          background: 'var(--bg)',
          zIndex:     9999,
          pointerEvents: 'none',
        }}
      />
    )}
  </AnimatePresence>
);

const LandingPage = ({ theme, toggleTheme }) => (
  <>
    <Navbar theme={theme} toggleTheme={toggleTheme} />
    <main>
      <Hero theme={theme} />
      <TransformSection />
      <Marquee />
      <Works />
      <Process />
      <Footer />
    </main>
  </>
);

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('bus4u-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  /* overlay visible during transition */
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);

  const toggleTheme = useCallback(() => {
    /* 1. show overlay */
    setTransitioning(true);

    /* 2. after 200ms (overlay fully opaque), swap theme */
    timerRef.current = setTimeout(() => {
      setTheme(prev => {
        const next = prev === 'dark' ? 'light' : 'dark';
        localStorage.setItem('bus4u-theme', next);
        document.documentElement.setAttribute('data-theme', next);
        return next;
      });
      /* 3. fade overlay out */
      setTimeout(() => setTransitioning(false), 50);
    }, 220);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => clearTimeout(timerRef.current);
  }, [theme]);

  return (
    <Router>
      <ThemeTransitionOverlay visible={transitioning} />
      <Routes>
        <Route
          path="/"
          element={<LandingPage theme={theme} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/book"
          element={
            <>
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <Booking />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
