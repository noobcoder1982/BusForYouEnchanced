import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const steps = [
  { 
    id: '01/', 
    title: 'DEVELOP', 
    heading: 'Perfect the Route',
    desc: "We analyze every detail—from regional demand to passenger preferences—to craft the foundation of an unparalleled travel network."
  },
  { 
    id: '02/', 
    title: 'PREVIEW', 
    heading: 'Passenger Suite',
    desc: "Our design philosophy merges Swiss precision with modern luxury, ensuring every touchpoint—digital or physical—is flawless."
  },
  { 
    id: '03/', 
    title: 'SHIP', 
    heading: 'Launch Journey',
    desc: "Using state-of-the-art engineering and premium materials, we build a fleet that doesn't just transport, but inspires."
  },
];

const SidebarItem = ({ step, index, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.15, 1, 1, 0.15]);
  const x = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 10, 10, 0]);

  return (
    <motion.div style={{ opacity, x }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
        {step.id} {step.title}
      </div>
    </motion.div>
  );
};

const ContentItem = ({ step, index, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.1, end - 0.1, end], [40, 0, 0, -40]);

  return (
    <motion.div 
      style={{ 
        position: 'absolute', 
        top: '50%', 
        transform: 'translateY(-50%)',
        width: '100%',
        opacity,
        y
      }}
    >
      <h2 style={{ 
        fontSize: 'clamp(3rem, 7vw, 4.5rem)', 
        fontWeight: 600, 
        lineHeight: 1, 
        marginBottom: '32px', 
        color: 'var(--fg)', 
        letterSpacing: '-2.4px' 
      }}>
        {step.heading}
      </h2>
      <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', lineHeight: 1.6, maxWidth: '500px', fontWeight: 400 }}>
        {step.desc}
      </p>
    </motion.div>
  );
};

const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} style={{ height: '400vh', position: 'relative' }} id="process">
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', width: '100%', alignItems: 'center' }}>
          
          {/* Sidebar */}
          <div style={{ gridColumn: '1 / 5' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {steps.map((step, index) => (
                <SidebarItem 
                  key={index} 
                  step={step} 
                  index={index} 
                  total={steps.length} 
                  progress={smoothProgress} 
                />
              ))}
            </div>
          </div>
          
          {/* Main Content */}
          <div style={{ gridColumn: '6 / 13', position: 'relative', height: '400px' }}>
            {steps.map((step, index) => (
              <ContentItem 
                key={index} 
                step={step} 
                index={index} 
                total={steps.length} 
                progress={smoothProgress} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;
