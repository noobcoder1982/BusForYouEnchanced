import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: scrolled ? '15px 40px' : '30px 40px',
        background: scrolled ? 'rgba(var(--bg-rgb), 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-2px', cursor: 'pointer', color: 'var(--fg)' }} onClick={() => navigate('/')}>
        BUS4U
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '30px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--fg)' }}>
          <a href="/#about" style={{ opacity: 0.6 }}>Experience</a>
          <a href="/#works" style={{ opacity: 0.6 }}>Fleet</a>
          <a href="/#process" style={{ opacity: 0.6 }}>Journey</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
              background: 'rgba(var(--fg-rgb), 0.05)',
              color: 'var(--fg)',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/book')}
            style={{
              background: 'var(--fg)',
              color: 'var(--bg)',
              padding: '12px 24px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            BOOK NOW <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
