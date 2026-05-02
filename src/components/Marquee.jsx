import React from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  'LUXURY', 'PRECISION', 'FUTURE', 'COMFORT', 'SAFETY',
  'SUSTAINABLE', 'RELIABLE', 'SMART', 'PREMIUM', 'GLOBAL',
  'MOBUS', 'BHUBANESWAR', 'TIMELY', 'PREMIUM', 'TRUSTED',
];

const Marquee = () => (
  <div style={{
    overflow:   'hidden',
    background: 'var(--fg)',
    color:      'var(--bg)',
    padding:    'clamp(20px, 3vw, 36px) 0',
    width:      '100%',
    position:   'relative',
  }}>
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      style={{
        display:     'flex',
        gap:         'clamp(32px, 8vw, 80px)',
        whiteSpace:  'nowrap',
        width:       'max-content',
      }}
    >
      {[...WORDS, ...WORDS].map((word, i) => (
        <span
          key={i}
          style={{
            fontSize:      'clamp(2.5rem, 10vw, 8rem)',
            fontWeight:    900,
            letterSpacing: '-0.04em',
            opacity:       i % 3 === 0 ? 1 : i % 3 === 1 ? 0.25 : 0.6,
            color:         i % 5 === 0 ? 'var(--accent)' : 'inherit',
          }}
        >
          {word}
        </span>
      ))}
    </motion.div>
  </div>
);

export default Marquee;
