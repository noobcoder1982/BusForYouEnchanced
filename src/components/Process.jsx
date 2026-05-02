import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const steps = [
  {
    id: "01",
    label: "DEVELOP",
    title: "World-Class Infrastructure.",
    desc: "We build the most advanced transit ecosystem in the region, focusing on sustainable energy and AI integration.",
    color: "#3d5afe"
  },
  {
    id: "02",
    label: "PREVIEW",
    title: "Precision Operations.",
    desc: "Real-time fleet management ensures that every bus arrives exactly when it's supposed to, every single time.",
    color: "#00c853"
  },
  {
    id: "03",
    label: "SHIP",
    title: "The Ultimate Journey.",
    desc: "Sit back and relax in our luxury suites while we handle the complexity of the road with absolute precision.",
    color: "#ff3d00"
  }
];

const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="container section-padding" id="process" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 8vw, 100px)' }} className="process-wrapper">
        
        {/* Sidebar - Sticky */}
        <div style={{ 
          position: 'sticky', 
          top: 'clamp(80px, 15vh, 120px)', 
          zIndex: 10,
          background: 'var(--bg)',
          padding: '20px 0',
          borderBottom: '1px solid var(--border)'
        }} className="process-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 'clamp(20px, 5vw, 60px)' }}>
              {steps.map((step, i) => (
                <StepItem 
                  key={i} 
                  step={step} 
                  index={i} 
                  progress={smoothProgress} 
                />
              ))}
            </div>
            <div style={{ height: '2px', background: 'var(--border)', flex: 1, marginLeft: '40px', position: 'relative' }} className="desktop-only">
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: 0, 
                  height: '100%', 
                  width: '100%', 
                  background: 'var(--accent)',
                  scaleX: smoothProgress,
                  originX: 0
                }} 
              />
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '150px' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
            >
              <div style={{ 
                fontSize: 'clamp(12px, 1.5vw, 14px)', 
                fontWeight: 800, 
                color: step.color, 
                letterSpacing: '3px', 
                marginBottom: '24px' 
              }}>
                STEP {step.id}
              </div>
              <h2 className="display-medium" style={{ marginBottom: '32px' }}>{step.title}</h2>
              <p style={{ 
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
                color: 'var(--muted)', 
                lineHeight: 1.6,
                padding: '0 20px'
              }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .process-sidebar { border-bottom: none !important; position: relative !important; top: 0 !important; }
          .desktop-only { display: none !important; }
          .process-wrapper { gap: 60px !important; }
        }
      `}} />
    </section>
  );
};

const StepItem = ({ step, index, progress }) => {
  const isActive = useTransform(
    progress,
    [index / steps.length, (index + 1) / steps.length],
    [0.3, 1]
  );

  const scale = useTransform(
    progress,
    [index / steps.length, (index + 0.5) / steps.length, (index + 1) / steps.length],
    [1, 1.1, 1]
  );

  return (
    <motion.div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        opacity: isActive,
        scale: scale
      }}
    >
      <div style={{ 
        width: 'clamp(24px, 3vw, 32px)', 
        height: 'clamp(24px, 3vw, 32px)', 
        borderRadius: '50%', 
        background: step.color, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 900
      }}>
        {step.id}
      </div>
      <span style={{ 
        fontSize: 'clamp(10px, 1.2vw, 12px)', 
        fontWeight: 800, 
        letterSpacing: '2px', 
        color: 'var(--fg)',
        display: 'block'
      }}>
        {step.label}
      </span>
    </motion.div>
  );
};

export default Process;
