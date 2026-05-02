import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransformSection from './components/TransformSection';
import Marquee from './components/Marquee';
import Works from './components/Works';
import Process from './components/Process';
import Footer from './components/Footer';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
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
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/book" element={
            <>
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <Booking />
            </>
          } />
          <Route path="/payment" element={
            <>
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <Payment />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
