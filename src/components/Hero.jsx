import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '120%', 
          y: y1,
          backgroundImage: `url(bus4u_cinematic_hero_1777727197047.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }} 
      />

      {/* Overlay Gradient */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 95%)',
        zIndex: 1
      }} />

      {/* Content */}
      <motion.div 
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          opacity
        }}
        className="container"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ 
            display: 'inline-block', 
            padding: '8px 20px', 
            borderRadius: '100px', 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '32px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            Experience The Extraordinary
          </span>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 10vw, 8rem)', 
            fontWeight: 800, 
            marginBottom: '24px',
            textShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            THE NEW <br />
            CONTINENTAL.
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#e2e2e2', 
            maxWidth: '600px', 
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Luxury travel redefined. Every mile is a masterpiece of comfort, safety, and futuristic design.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <motion.button 
              whileHover={{ scale: 1.05, background: '#fff', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/book')}
              style={{ 
                background: 'var(--accent)', 
                color: '#fff', 
                padding: '18px 40px', 
                borderRadius: '100px', 
                fontSize: '16px', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              Book Now <ChevronRight size={20} />
            </motion.button>
            
            <motion.button 
              whileHover={{ background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: 'transparent', 
                color: '#fff', 
                padding: '18px 40px', 
                borderRadius: '100px', 
                fontSize: '16px', 
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <div style={{ 
        position: 'absolute', 
        bottom: '60px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 3,
        display: 'flex',
        gap: '80px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>10k+</div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Journeys</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>50+</div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Destinations</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>4.9/5</div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Rating</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
