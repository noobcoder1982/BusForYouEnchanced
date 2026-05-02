import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Compass } from 'lucide-react';

const features = [
  {
    icon: <Shield size={32} />,
    title: "Unmatched Safety",
    desc: "AI-powered collision avoidance and 24/7 real-time monitoring for total peace of mind.",
    color: "#3d5afe"
  },
  {
    icon: <Zap size={32} />,
    title: "Eco-Efficiency",
    desc: "Our next-gen electric fleet reduces carbon footprint by 80% without compromising power.",
    color: "#00c853"
  },
  {
    icon: <Compass size={32} />,
    title: "Smart Routing",
    desc: "Dynamic pathfinding technology that bypasses congestion to save your precious time.",
    color: "#ff3d00"
  }
];

const TransformSection = () => {
  return (
    <section className="container" style={{ padding: '160px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '100px' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '24px' }}
        >
          Built for the Future.
        </motion.h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
          We've integrated world-class technology into every aspect of our fleet to provide a journey unlike any other.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10 }}
            style={{ 
              padding: '60px 40px', 
              borderRadius: '32px', 
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '24px', 
              background: `rgba(${parseInt(f.color.slice(1,3), 16)}, ${parseInt(f.color.slice(3,5), 16)}, ${parseInt(f.color.slice(5,7), 16)}, 0.1)`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: f.color,
              marginBottom: '32px'
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px' }}>{f.title}</h3>
            <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</p>
            
            {/* Background Glow */}
            <div style={{ 
              position: 'absolute', 
              top: '-50px', 
              right: '-50px', 
              width: '150px', 
              height: '150px', 
              background: f.color, 
              filter: 'blur(100px)', 
              opacity: 0.1 
            }}></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TransformSection;
