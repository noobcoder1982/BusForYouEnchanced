import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Sun, Moon, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/* ─── Nav link data ──────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Experience', href: '/#about'   },
  { label: 'Fleet',      href: '/#works'   },
  { label: 'Routes',     href: '/#process' },
];

/* ─── Active underline spring ────────────────────────────── */
const NavLink = ({ label, href }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:   'relative',
        padding:    '8px 16px',
        fontSize:   '13px',
        fontWeight: 600,
        color:      'var(--fg)',
        opacity:    hovered ? 1 : 0.6,
        transition: 'opacity 0.2s',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        style={{
          position:  'absolute',
          bottom:    '2px',
          left:      '16px',
          right:     '16px',
          height:    '1.5px',
          background: 'var(--accent)',
          borderRadius: '2px',
          originX:   0,
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </a>
  );
};

/* ─── Main Navbar ────────────────────────────────────────── */
const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20));

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleBookNow = useCallback(() => navigate('/book'), [navigate]);

  return (
    <>
      {/* ══════════════════════════════════════════
          NAVBAR — True 3-column grid centering
          ══════════════════════════════════════════ */}
      <motion.header
        role="banner"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          width:        '100%',
          zIndex:       1000,
          /* Scroll state transitions */
          padding:      scrolled ? '10px 0' : '20px 0',
          background:   scrolled ? 'rgba(var(--bg-rgb), 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow:    scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
          transition:   'padding 0.4s var(--ease-out), background 0.4s var(--ease-out), box-shadow 0.4s, border-color 0.4s',
          willChange:   'transform',
        }}
      >
        {/* ── Inner wrapper: TRUE 3-column grid ── */}
        <div
          style={{
            width:               '100%',
            maxWidth:            'var(--container-max)',
            margin:              '0 auto',
            padding:             '0 clamp(20px, 5vw, 56px)',
            /* Grid: fixed-width left | auto center | fixed-width right */
            display:             'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems:          'center',
            gap:                 '16px',
          }}
        >
          {/* ── LEFT: Logo ── */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <motion.button
              onClick={() => navigate('/')}
              aria-label="BUS4U Home"
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         '6px',
                background:  'none',
                border:      'none',
                cursor:      'pointer',
                padding:     '4px 0',
              }}
            >
              {/* Swiss logo mark */}
              <span style={{
                fontFamily:    'var(--font-main)',
                fontWeight:    900,
                fontSize:      'clamp(1.05rem, 2.5vw, 1.3rem)',
                letterSpacing: '-2px',
                color:         'var(--fg)',
                lineHeight:    1,
              }}>
                BUS4U
              </span>
              {/* Route dots — transit identity mark */}
              <span style={{
                display:    'flex',
                alignItems: 'center',
                gap:        '3px',
                marginTop:  '2px',
              }}>
                <span style={{
                  display:      'block',
                  width:        '5px',
                  height:       '5px',
                  borderRadius: '1px',
                  background:   'var(--accent)',
                  transform:    'rotate(45deg)',
                }}/>
                <span style={{
                  display:      'block',
                  width:        '7px',
                  height:       '7px',
                  borderRadius: '2px',
                  background:   'var(--accent)',
                  opacity:      0.45,
                  transform:    'rotate(45deg)',
                }}/>
              </span>
            </motion.button>
          </div>

          {/* ── CENTER: Desktop nav links (hidden on mobile) ── */}
          <nav
            aria-label="Main navigation"
            style={{
              /* Will be overridden to display:none on mobile via media query below */
              display:       'flex',
              alignItems:    'center',
              gap:           '0',
              background:    'rgba(var(--fg-rgb), 0.04)',
              border:        '1px solid var(--border)',
              borderRadius:  'var(--r-full)',
              padding:       '4px',
            }}
            className="navbar-desktop-links"
          >
            {NAV_LINKS.map(link => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </nav>

          {/* ── RIGHT: Controls — always flex-end ── */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'flex-end',
            gap:            '8px',
          }}>
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width:          '36px',
                height:         '36px',
                borderRadius:   'var(--r-md)',
                background:     'rgba(var(--fg-rgb), 0.06)',
                border:         '1px solid var(--border)',
                color:          'var(--fg)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                cursor:         'pointer',
                flexShrink:     0,
                transition:     'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(var(--fg-rgb), 0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(var(--fg-rgb), 0.06)'}
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </motion.button>

            {/* Book Now CTA — desktop only */}
            <motion.button
              onClick={handleBookNow}
              className="navbar-book-btn"
              aria-label="Book a bus"
              whileHover={{
                scale:     1.03,
                boxShadow: '0 8px 28px rgba(61,90,254,0.35)',
              }}
              whileTap={{ scale: 0.96 }}
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '8px',
                padding:      '10px 20px',
                borderRadius: 'var(--r-full)',
                background:   'var(--fg)',
                color:        'var(--bg)',
                fontSize:     '13px',
                fontWeight:   800,
                border:       'none',
                cursor:       'pointer',
                whiteSpace:   'nowrap',
                boxShadow:    'var(--shadow-md)',
                transition:   'box-shadow 0.3s',
                flexShrink:   0,
              }}
            >
              Book Now <ArrowRight size={14} />
            </motion.button>

            {/* Hamburger — mobile/tablet ONLY */}
            <motion.button
              onClick={() => setMenuOpen(true)}
              className="navbar-mobile-toggle"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              whileTap={{ scale: 0.9 }}
              style={{
                width:          '36px',
                height:         '36px',
                borderRadius:   'var(--r-md)',
                background:     'rgba(var(--fg-rgb), 0.06)',
                border:         '1px solid var(--border)',
                color:          'var(--fg)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                cursor:         'pointer',
                flexShrink:     0,
              }}
            >
              <Menu size={18} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          MOBILE / TABLET SIDE PANEL MENU
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim backdrop — tap to close */}
            <motion.div
              key="nb-backdrop"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position:       'fixed',
                inset:          0,
                background:     'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(3px)',
                zIndex:         1998,
              }}
            />

            {/* Side Panel */}
            <motion.div
              key="nb-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position:      'fixed',
                top:           0,
                right:         0,
                bottom:        0,
                width:         'min(380px, 88vw)',
                background:    'var(--surface)',
                zIndex:        1999,
                display:       'flex',
                flexDirection: 'column',
                padding:       '0',
                overflowY:     'auto',
                boxShadow:     '-20px 0 80px rgba(0,0,0,0.25)',
                /* Hide scrollbar but keep scrollable */
                scrollbarWidth: 'none',
              }}
            >
              {/* Panel Header */}
              <div style={{
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'center',
                padding:        '20px 24px',
                borderBottom:   '1px solid var(--border)',
                flexShrink:     0,
              }}>
                <div style={{
                  fontWeight:    900,
                  fontSize:      '1.2rem',
                  letterSpacing: '-1.5px',
                  color:         'var(--fg)',
                }}>
                  BUS4U
                </div>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  whileHover={{ background: 'var(--surface-2)' }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width:          '36px',
                    height:         '36px',
                    borderRadius:   'var(--r-md)',
                    background:     'var(--surface-2)',
                    border:         '1px solid var(--border)',
                    color:          'var(--fg)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    cursor:         'pointer',
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Nav Links — staggered entrance */}
              <nav
                aria-label="Mobile navigation"
                style={{ flex: 1, padding: '16px 16px' }}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'space-between',
                      padding:        '18px 16px',
                      borderRadius:   'var(--r-lg)',
                      fontSize:       '1.25rem',
                      fontWeight:     800,
                      letterSpacing:  '-0.025em',
                      color:          'var(--fg)',
                      marginBottom:   '4px',
                      transition:     'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {link.label}
                    <ArrowRight size={18} style={{ opacity: 0.25 }} />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA block */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  padding:      '20px 24px',
                  borderTop:    '1px solid var(--border)',
                  display:      'flex',
                  flexDirection: 'column',
                  gap:          '10px',
                  flexShrink:   0,
                  paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
                }}
              >
                <button
                  onClick={() => { navigate('/book'); setMenuOpen(false); }}
                  style={{
                    width:         '100%',
                    background:    'var(--accent)',
                    color:         '#fff',
                    padding:       '18px',
                    borderRadius:  'var(--r-xl)',
                    fontSize:      '15px',
                    fontWeight:    800,
                    border:        'none',
                    cursor:        'pointer',
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent: 'center',
                    gap:           '10px',
                    boxShadow:     'var(--shadow-accent)',
                  }}
                >
                  Book a Ride <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => { toggleTheme(); }}
                  style={{
                    width:        '100%',
                    background:   'var(--surface-2)',
                    color:        'var(--fg)',
                    padding:      '14px',
                    borderRadius: 'var(--r-lg)',
                    fontSize:     '13px',
                    fontWeight:   700,
                    border:       '1px solid var(--border)',
                    cursor:       'pointer',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    gap:          '8px',
                  }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          RESPONSIVE BREAKPOINTS
          (injected as a style tag to avoid CSS file coupling)
          ══════════════════════════════════════════ */}
      <style>{`
        /* ── Desktop (≥1024px): show nav links, hide burger, show Book Now ── */
        @media (min-width: 1024px) {
          .navbar-desktop-links  { display: flex !important; }
          .navbar-mobile-toggle  { display: none  !important; }
          .navbar-book-btn       { display: flex  !important; }
        }

        /* ── Tablet / Mobile (<1024px): hide nav links, show burger, hide Book Now ── */
        @media (max-width: 1023px) {
          .navbar-desktop-links  { display: none  !important; }
          .navbar-mobile-toggle  { display: flex  !important; }
          .navbar-book-btn       { display: none  !important; }
        }

        /* Small phones: tighten logo */
        @media (max-width: 360px) {
          .navbar-book-btn { padding: 8px 14px !important; font-size: 12px !important; }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .navbar-desktop-links a span { display: none !important; }
        }

        /* Hide scrollbar in mobile panel (WebKit) */
        [aria-label="Navigation menu"]::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
};

export default Navbar;
