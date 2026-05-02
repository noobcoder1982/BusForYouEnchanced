import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QUICK_ROUTES = [
  { from: 'Master Canteen',  to: 'KIIT Square',     fare: '₹45' },
  { from: 'Baramunda ISBT',  to: 'Infocity',         fare: '₹40' },
  { from: 'Patia Square',    to: 'AG Square',         fare: '₹35' },
];

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacityOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{ height: '100svh', minHeight: '600px', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Background layer ── */}
      <motion.div
        style={{
          position:  'absolute',
          inset:     '-10% 0',
          y:         bgY,
          willChange: 'transform',
        }}
      >
        {/* Hero image */}
        <div
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url(bus4u_cinematic_hero_1777727197047.png)`,
            backgroundSize:     'cover',
            backgroundPosition: '50% 60%',
            filter:             'brightness(0.55) saturate(1.1)',
          }}
        />

        {/* Grain texture */}
        <div
          className="grain-overlay"
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        />

        {/* Gradient fade to bg at bottom */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to bottom, rgba(var(--bg-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.5) 60%, var(--bg) 100%)',
          zIndex:     2,
          transition: 'background 0.4s',
        }} />

        {/* Subtle glow accent */}
        <div style={{
          position:   'absolute',
          bottom:     '20%',
          left:       '10%',
          width:      '600px',
          height:     '300px',
          background: 'radial-gradient(ellipse at center, rgba(61, 90, 254, 0.12) 0%, transparent 70%)',
          zIndex:     2,
          filter:     'blur(60px)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* ── SVG Transit Lines ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none', opacity: 0.12 }}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 70% Q 35% 50%, 70% 65% T 110% 45%"
          stroke="var(--accent)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: 'easeOut', delay: 0.5 }}
        />
        <motion.path
          d="M -5% 80% Q 25% 60%, 55% 75% T 105% 55%"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: 'easeOut', delay: 0.8 }}
        />
      </svg>

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY, opacity: opacityOut, willChange: 'transform, opacity' }}
        className="container"
      >
        <div style={{
          position:       'relative',
          zIndex:         4,
          height:         '100svh',
          minHeight:      '600px',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          paddingTop:     '80px',
        }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '8px',
              marginBottom: 'clamp(20px, 3vh, 32px)',
            }}
          >
            <div className="text-label" style={{
              padding:      '6px 14px',
              background:   'rgba(var(--bg-rgb), 0.1)',
              border:       '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--r-full)',
              color:        'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
            }}>
              🚌 BBSR's #1 Premium Transit Platform
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize:      'clamp(3rem, 9vw, 8rem)',
              fontWeight:    900,
              letterSpacing: '-0.045em',
              lineHeight:    0.92,
              color:         '#ffffff',
              textShadow:    '0 4px 40px rgba(0,0,0,0.25)',
              maxWidth:      '14ch',
              marginBottom:  'clamp(20px, 3vh, 32px)',
            }}
          >
            YOUR SEAT.<br />
            <span style={{ color: 'var(--accent)', textShadow: '0 0 60px rgba(61,90,254,0.5)' }}>YOUR CITY.</span><br />
            YOUR TIME.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            style={{
              fontSize:     'clamp(1rem, 2.5vw, 1.35rem)',
              color:        'rgba(255,255,255,0.75)',
              maxWidth:     '44ch',
              lineHeight:   1.4,
              marginBottom: 'clamp(28px, 5vh, 48px)',
              opacity:      1,
            }}
          >
            Book a MoBus seat in under 60 seconds.
            Premium comfort, zero hassle, guaranteed timing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <motion.button
              onClick={() => navigate('/book')}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(61,90,254,0.45)' }}
              whileTap={{ scale: 0.96 }}
              className="btn-pulse"
              style={{
                background:   'var(--accent)',
                color:        '#fff',
                padding:      'clamp(16px, 2.5vh, 22px) clamp(28px, 4vw, 44px)',
                borderRadius: 'var(--r-full)',
                fontSize:     'clamp(14px, 1.5vw, 17px)',
                fontWeight:   800,
                display:      'flex',
                alignItems:   'center',
                gap:          '10px',
                border:       'none',
                cursor:       'pointer',
                boxShadow:    'var(--shadow-accent)',
              }}
            >
              Book Now <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                background:   'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                color:        '#fff',
                padding:      'clamp(16px, 2.5vh, 22px) clamp(28px, 4vw, 44px)',
                borderRadius: 'var(--r-full)',
                fontSize:     'clamp(14px, 1.5vw, 17px)',
                fontWeight:   600,
                border:       '1px solid rgba(255,255,255,0.2)',
                cursor:       'pointer',
              }}
            >
              View Fleet
            </motion.button>
          </motion.div>

          {/* Quick route chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}
          >
            {QUICK_ROUTES.map((r, i) => (
              <motion.button
                key={i}
                onClick={() => navigate('/book')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding:      '8px 14px',
                  borderRadius: 'var(--r-full)',
                  background:   'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(8px)',
                  border:       '1px solid rgba(255,255,255,0.12)',
                  color:        'rgba(255,255,255,0.8)',
                  fontSize:     '11px',
                  fontWeight:   700,
                  cursor:       'pointer',
                }}
              >
                {r.from.split(' ')[0]} → {r.to.split(' ')[0]} · {r.fare}
              </motion.button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display:        'flex',
              gap:            'clamp(24px, 6vw, 80px)',
              marginTop:      'clamp(40px, 8vh, 80px)',
              paddingTop:     'clamp(24px, 4vh, 40px)',
              borderTop:      '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {[
              { val: '50+',  label: 'Stops' },
              { val: '10k+', label: 'Rides booked' },
              { val: '4.9',  label: 'App rating' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '6px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position:   'absolute',
          bottom:     '32px',
          left:       '50%',
          transform:  'translateX(-50%)',
          zIndex:     4,
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:        '6px',
          color:      'rgba(255,255,255,0.35)',
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: '1px', height: '36px', background: 'currentColor' }}
        />
      </motion.div>

      {/* ── Mobile sticky CTA ── */}
      <div className="mobile-sticky-cta no-print" style={{ background: 'rgba(var(--bg-rgb), 0.92)' }}>
        <button
          onClick={() => navigate('/book')}
          className="btn-pulse"
          style={{
            width:        '100%',
            background:   'var(--accent)',
            color:        '#fff',
            padding:      '18px',
            borderRadius: 'var(--r-xl)',
            fontSize:     '16px',
            fontWeight:   800,
            border:       'none',
            cursor:       'pointer',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            gap:          '10px',
            boxShadow:    'var(--shadow-accent)',
          }}
        >
          Book a Ride Now <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
