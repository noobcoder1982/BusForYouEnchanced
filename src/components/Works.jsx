import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fleet = [
  { name: "The Obsidian 9700", tag: "ULTRA LUXURY",        desc: "A first-class experience on wheels with lie-flat beds and private cabins.", img: "volvo.jpg" },
  { name: "Express Horizon",   tag: "BUSINESS CLASS",       desc: "Speed meets comfort. Perfect for the professional on the move.",            img: "semi-sleeper.jpg" },
  { name: "Nocturne Sleeper",  tag: "OVERNIGHT EXCLUSIVE",  desc: "Silence is the greatest luxury. Optimized for restful transit.",            img: "sleeper.jpg" },
];

const Works = () => (
  <section className="container section-padding" id="works">
    <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 80px)' }}>
      <div className="text-label" style={{ marginBottom: '16px' }}>OUR FLEET</div>
      <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--fg)', marginBottom: '16px' }}>
        The Fleet.
      </h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--muted)' }}>A curation of engineering excellence.</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 8vw, 80px)' }}>
      {fleet.map((bus, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fleet-item"
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'clamp(40px, 8vw, 80px)' }}
        >
          <div style={{ height: 'clamp(240px, 50vw, 480px)', borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', background: 'var(--surface-2)' }}>
            <img src={bus.img} alt={bus.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          <div style={{ textAlign: 'center' }} className="fleet-content">
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{bus.tag}</span>
            <h3 style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)', fontWeight: 900, letterSpacing: '-0.035em', margin: '12px 0', color: 'var(--fg)' }}>{bus.name}</h3>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 28px' }}>{bus.desc}</p>
            <button style={{ background: 'none', color: 'var(--fg)', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', border: 'none', margin: '0 auto', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
              DISCOVER MORE <ArrowUpRight size={15} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>

    <style>{`
      @media (min-width: 900px) {
        .fleet-item { grid-template-columns: 1.2fr 1fr !important; gap: 80px !important; }
        .fleet-content { text-align: left !important; }
        .fleet-content p { margin: 0 0 28px !important; }
        .fleet-content button { margin: 0 !important; }
      }
    `}</style>
  </section>
);

export default Works;
