import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="container" style={{ paddingBottom: '80px', background: 'var(--bg)' }}>
      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          background: 'radial-gradient(circle at center, #222 0%, #000 100%)', 
          borderRadius: '32px', 
          padding: '100px 40px',
          textAlign: 'center',
          marginBottom: '40px',
          color: '#fff'
        }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-2.4px', marginBottom: '16px' }}
        >
          Ready to transform your travel?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: '1.125rem', color: '#888', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}
        >
          Join thousands of travelers who are experiencing road luxury at its finest. Book your next journey in minutes.
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{ 
            background: '#fff', 
            color: '#000', 
            padding: '12px 32px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: 500, 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Main Footer Links */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          background: 'var(--bg)', 
          boxShadow: 'var(--card-shadow)', 
          borderRadius: '32px', 
          padding: '80px 60px' 
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '80px', marginBottom: '80px' }}>
          {/* Logo & Info */}
          <div>
            <div style={{ fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.96px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '24px', height: '24px', background: 'var(--fg)', borderRadius: '4px' }}></div>
              Bus4U
            </div>
            <p style={{ fontSize: '14px', color: 'var(--secondary)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '300px' }}>
              Bus4U empowers travelers to experience road journeys with unparalleled luxury, precision, and comfort.
            </p>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--fg)' }}>
              <motion.div whileHover={{ scale: 1.2, color: 'var(--accent)' }}><Twitter size={18} style={{ cursor: 'pointer', opacity: 0.6 }} /></motion.div>
              <motion.div whileHover={{ scale: 1.2, color: 'var(--accent)' }}><Instagram size={18} style={{ cursor: 'pointer', opacity: 0.6 }} /></motion.div>
              <motion.div whileHover={{ scale: 1.2, color: 'var(--accent)' }}><Linkedin size={18} style={{ cursor: 'pointer', opacity: 0.6 }} /></motion.div>
              <motion.div whileHover={{ scale: 1.2, color: 'var(--accent)' }}><Github size={18} style={{ cursor: 'pointer', opacity: 0.6 }} /></motion.div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Fleet</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Routes</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Booking</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Mobile App</motion.a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Help Center</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Safety Guide</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Blog</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Support</motion.a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>About</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Careers</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Contact</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: 'var(--fg)' }} href="#" style={{ fontSize: '14px', color: 'var(--muted)', display: 'block' }}>Partners</motion.a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-shadow)', paddingTop: '32px' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>© 2025 Bus4U. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'underline' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'underline' }}>Terms of Service</a>
            <a href="#" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'underline' }}>Cookies Settings</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
