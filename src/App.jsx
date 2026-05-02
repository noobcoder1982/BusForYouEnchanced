import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransformSection from './components/TransformSection';
import Marquee from './components/Marquee';
import Works from './components/Works';
import Process from './components/Process';
import Footer from './components/Footer';
import Booking from './pages/Booking';
import { useState, useEffect } from 'react';
import './index.css';

const LandingPage = ({ theme, toggleTheme }) => (
  <>
    <Navbar theme={theme} toggleTheme={toggleTheme} />
    <main>
      <Hero />
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

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('bus4u-theme', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/"     element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/book" element={
          <>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Booking />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
