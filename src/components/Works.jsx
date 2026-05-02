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
    <section className="container" style={{ padding: '160px 40px' }} id="works">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
        <div>
          <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '16px' }}>The Fleet.</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted)' }}>Curation of engineering excellence.</p>
        </div>
        <a href="#" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent)', borderBottom: '2px solid var(--accent)', paddingBottom: '4px' }}>
          VIEW FULL CATALOG
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {fleet.map((bus, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.2fr 1fr', 
              gap: '60px', 
              alignItems: 'center',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '80px'
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              style={{ 
                height: '500px', 
                borderRadius: '40px', 
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
              }}
            >
              <img 
                src={bus.img} 
                alt={bus.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
            
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '2px' }}>{bus.tag}</span>
              <h3 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '20px 0' }}>{bus.name}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '40px' }}>{bus.desc}</p>
              
              <motion.button
                whileHover={{ gap: '20px' }}
                style={{ 
                  background: 'none', 
                  color: '#fff', 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  border: 'none'
                }}
              >
                DISCOVER MORE <ArrowUpRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Works;
