import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  const words = ["LUXURY", "COMFORT", "PRECISION", "SAFETY", "RELIABILITY"];

  return (
    <div style={{ overflow: 'hidden', padding: '60px 0', borderTop: '1px solid #111', borderBottom: '1px solid #111', whiteSpace: 'nowrap' }}>
      <motion.div 
        variants={marqueeVariants}
        animate="animate"
        style={{ display: 'inline-flex', gap: '80px', fontSize: '3rem', fontWeight: 500, color: '#333' }}
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {words.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
