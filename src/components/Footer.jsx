import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "Platform",
      links: ["Experience", "Fleet", "Smart Routing", "Pricing"]
    },
    {
      title: "Company",
      links: ["About Us", "Sustainability", "Careers", "Press"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Safety"]
    }
  ];

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', transition: 'background 0.4s ease' }}>
      <div className="container" style={{ paddingTop: 'clamp(60px, 10vw, 120px)', paddingBottom: '60px' }}>
        
        {/* Main CTA / Logo Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginBottom: 'clamp(60px, 10vw, 100px)' }}>
          <div style={{ maxWidth: '400px' }}>
            <div style={{ fontWeight: 800, fontSize: '2rem', letterSpacing: '-2px', marginBottom: '24px', color: 'var(--fg)' }}>
              BUS4U
            </div>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: '32px' }}>
              Revolutionizing the capital region's transit with luxury, precision, and futuristic technology. Experience the extraordinary.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, color: 'var(--accent)' }}
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    background: 'rgba(var(--fg-rgb), 0.05)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--fg)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '40px', flex: 1 }}>
            {footerSections.map((section, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px', color: 'var(--fg)' }}>
                  {section.title}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" style={{ fontSize: '14px', color: 'var(--muted)', hover: { color: 'var(--accent)' } }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px', 
          padding: '30px 0', 
          borderTop: '1px solid var(--border)', 
          borderBottom: '1px solid var(--border)',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted)', fontSize: '14px' }}>
            <Mail size={18} className="footer-icon" /> support@bus4u.com
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted)', fontSize: '14px' }}>
            <Phone size={18} className="footer-icon" /> +91 674 2500 123
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted)', fontSize: '14px' }}>
            <MapPin size={18} className="footer-icon" /> Bhubaneswar, Odisha
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
            © {currentYear} BUS4U Inc. All rights reserved. Built with passion in BBSR.
          </p>
          <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'var(--muted)' }}>
            <a href="#">Status</a>
            <a href="#">Security</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-icon { color: var(--accent); }
        li a { transition: color 0.3s ease; }
        li a:hover { color: var(--fg) !important; }
      `}} />
    </footer>
  );
};

export default Footer;
