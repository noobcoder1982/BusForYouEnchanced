import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Compass } from 'lucide-react';

const FEATURES = [
  {
    icon:  Shield,
    title: 'Unmatched Safety',
    desc:  'AI-powered collision avoidance systems and 24/7 real-time fleet monitoring for complete peace of mind.',
    color: '#3d5afe',
    tag:   'SAFETY FIRST',
  },
  {
    icon:  Zap,
    title: 'Eco-Efficiency',
    desc:  'Our next-gen CNG & electric fleet reduces the city\'s carbon footprint without compromising on power.',
    color: '#00c853',
    tag:   'SUSTAINABILITY',
  },
  {
    icon:  Compass,
    title: 'Smart Routing',
    desc:  'Dynamic GTFS pathfinding bypasses peak-hour congestion. Arrive exactly when you planned.',
    color: '#ff6d00',
    tag:   'INTELLIGENCE',
  },
];

const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity:    1,
    y:          0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

const TransformSection = () => (
  <section className="section-padding" id="about">
    <div className="container">
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(48px, 8vw, 96px)' }}>
        <div className="text-label" style={{ marginBottom: '16px' }}>WHY BUS4U</div>
        <h2
          style={{
            fontSize:      'clamp(2.5rem, 6vw, 5rem)',
            fontWeight:    900,
            letterSpacing: '-0.04em',
            lineHeight:    1.0,
            marginBottom:  '20px',
            color:         'var(--fg)',
          }}
        >
          Built for the Future of Transit.
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--muted)', lineHeight: 1.5 }}>
          We've woven world-class technology into every detail — from the seat you book
          to the second you board.
        </p>
      </div>

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 30%, 400px), 1fr))',
        gap:                 'clamp(16px, 2.5vw, 32px)',
      }}>
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const rgb  = f.color.match(/\w\w/g).map(h => parseInt(h, 16)).join(', ');
          return (
            <motion.div
              key={f.title}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, boxShadow: 'var(--shadow-xl)' }}
              style={{
                padding:      'clamp(28px, 4vw, 48px)',
                borderRadius: 'var(--r-xl)',
                background:   'var(--surface)',
                border:       '1px solid var(--border)',
                boxShadow:    'var(--shadow-md)',
                position:     'relative',
                overflow:     'hidden',
                transition:   'box-shadow 0.3s, transform 0.3s',
              }}
            >
              {/* Glow blob */}
              <div style={{
                position:   'absolute',
                top:        '-40px',
                right:      '-40px',
                width:      '200px',
                height:     '200px',
                background: `rgba(${rgb}, 0.12)`,
                borderRadius: '50%',
                filter:     'blur(60px)',
                pointerEvents: 'none',
              }} />

              <div style={{
                width:        '56px',
                height:       '56px',
                borderRadius: 'var(--r-lg)',
                background:   `rgba(${rgb}, 0.1)`,
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                marginBottom: '24px',
                color:        f.color,
                border:       `1px solid rgba(${rgb}, 0.2)`,
              }}>
                <Icon size={26} strokeWidth={2} />
              </div>

              <div className="text-label" style={{ marginBottom: '10px', color: f.color }}>
                {f.tag}
              </div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px', color: 'var(--fg)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TransformSection;
