import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fleet = [
  { 
    name: "The Obsidian 9700", 
    tag: "ULTRA LUXURY", 
    desc: "A first-class experience on wheels with lie-flat beds and private cabins.",
    img: "volvo.jpg"
  },
  { 
    name: "Express Horizon", 
    tag: "BUSINESS CLASS", 
    desc: "Speed meets comfort. Perfect for the professional on the move.",
    img: "semi-sleeper.jpg"
  },
  { 
    name: "Nocturne Sleeper", 
    tag: "OVERNIGHT EXCLUSIVE", 
    desc: "Silence is the greatest luxury. Optimized for restful transit.",
    img: "sleeper.jpg"
  }
];

const Works = () => {
  return (
    <section className="container section-padding" id="works">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexDirection: 'column', gap: '20px' }} className="works-header">
        <div style={{ textAlign: 'center', width: '100%' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, marginBottom: '12px' }}>The Fleet.</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted)' }}>Curation of engineering excellence.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {fleet.map((bus, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="fleet-item"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '30px', 
              alignItems: 'center',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '60px'
            }}
          >
            <motion.div 
              style={{ 
                height: 'clamp(250px, 50vw, 450px)', 
                borderRadius: '32px', 
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
              }}
            >
              <img 
                src={bus.img} 
                alt={bus.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
            
            <div style={{ textAlign: 'center' }} className="fleet-content">
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '1.5px' }}>{bus.tag}</span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)', fontWeight: 800, margin: '12px 0' }}>{bus.name}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>{bus.desc}</p>
              
              <motion.button
                style={{ 
                  background: 'none', 
                  color: 'var(--fg)', 
                  fontSize: '0.95rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  border: 'none',
                  margin: '0 auto'
                }}
              >
                DISCOVER MORE <ArrowUpRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 769px) {
          .works-header { flex-direction: row !important; }
          .works-header div { text-align: left !important; }
          .fleet-item { grid-template-columns: 1.2fr 1fr !important; gap: 60px !important; }
          .fleet-content { text-align: left !important; }
          .fleet-content p { margin: 0 0 30px 0 !important; }
          .fleet-content button { margin: 0 !important; }
        }
      `}} />
    </section>
  );
};

export default Works;
