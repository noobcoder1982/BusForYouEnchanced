import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, ShieldCheck, Printer, CheckCircle2, Download, Smartphone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const seat = location.state?.seat || '01';
  const from = location.state?.from || 'Master Canteen';
  const to = location.state?.to || 'KIIT Square';
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsPrinting(true);
      }, 1000);
    }, 2000);
  };

  const handleDownload = () => {
    const ticketContent = `--- BUS4U BOARDING PASS --- Route: ${from} to ${to} Suite: ${seat} Date: 03 May 2026 Class: AC LUXURY Fare: INR 45.00 --- THANK YOU ---`;
    const element = document.createElement("a");
    const file = new Blob([ticketContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "MoBus_Ticket.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', paddingTop: '100px', position: 'relative', overflow: 'hidden', transition: 'background-color 0.4s ease' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexDirection: 'column', gap: '20px', textAlign: 'center' }} className="payment-header">
          <button 
            onClick={() => navigate('/book')} 
            style={{ background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
            <ArrowLeft size={14} /> BACK TO SELECTION
          </button>
          <div style={{ display: 'flex', gap: '24px', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>
            <div style={{ opacity: 0.3 }}>01 SEARCH</div>
            <div style={{ opacity: 0.3 }}>02 SELECTION</div>
            <div style={{ color: 'var(--accent)' }}>03 PAYMENT</div>
          </div>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ 
                  padding: 'clamp(30px, 6vw, 60px)', 
                  borderRadius: '32px', 
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{ width: '64px', height: '64px', background: 'rgba(61, 90, 254, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--accent)' }}>
                    <CreditCard size={28} />
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Complete Payment.</h2>
                  <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '13px' }}>Securely finalize your MoBus reservation.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ padding: '20px', background: 'rgba(var(--fg-rgb), 0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '11px' }}>Route</span>
                      <span style={{ fontWeight: 600, fontSize: '12px', textAlign: 'right', maxWidth: '150px' }}>{from} → {to}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '11px' }}>Suite #</span>
                      <span style={{ fontWeight: 600, fontSize: '12px' }}>{seat}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                      <span>Fare</span>
                      <span style={{ color: 'var(--accent)' }}>₹45.00</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input 
                      type="text" 
                      placeholder="Cardholder Name" 
                      style={{ width: '100%', background: 'rgba(var(--fg-rgb), 0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                    />
                    <input 
                      type="text" 
                      placeholder="Card Number" 
                      style={{ width: '100%', background: 'rgba(var(--fg-rgb), 0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        style={{ width: '100%', background: 'rgba(var(--fg-rgb), 0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                      />
                      <input 
                        type="password" 
                        placeholder="CVV" 
                        style={{ width: '100%', background: 'rgba(var(--fg-rgb), 0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--fg)', fontSize: '14px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <motion.button 
                    disabled={isProcessing}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePay}
                    style={{ 
                      width: '100%', 
                      background: 'var(--accent)', 
                      color: '#fff', 
                      padding: '18px', 
                      borderRadius: '14px', 
                      fontWeight: 800, 
                      fontSize: '15px', 
                      marginTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      cursor: isProcessing ? 'wait' : 'pointer',
                      border: 'none'
                    }}
                  >
                    {isProcessing ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        style={{ width: '18px', height: '18px', border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }}
                      />
                    ) : (
                      <>CONFIRM & PAY ₹45.00</>
                    )}
                  </motion.button>
                  <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> SECURE PCI-DSS PAYMENT
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '60px 0' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  style={{ width: '80px', height: '80px', background: '#00c853', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: '#fff' }}
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '15px' }}>Paid Successfully!</h2>
                <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>Your MoBus journey is confirmed.</p>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent)', fontSize: '13px' }}
                >
                  <Printer size={18} /> <span style={{ fontWeight: 600 }}>GENERATING TICKET...</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bill Printing Animation */}
      <AnimatePresence>
        {isPrinting && (
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }}>
            <div style={{ 
              width: 'clamp(320px, 90vw, 420px)', 
              height: '8px', 
              background: '#333', 
              borderRadius: '4px 4px 0 0',
              border: '2px solid #555',
              margin: '0 auto'
            }} />
            
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 2.5, ease: "linear" }}
              style={{ 
                width: 'clamp(300px, 85vw, 400px)',
                margin: '0 auto',
                padding: '30px 20px',
                background: '#fff',
                color: '#000',
                borderRadius: '0 0 4px 4px',
                boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
                fontFamily: 'monospace',
                position: 'relative',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")',
                borderTop: '2px dashed #eee'
              }}
            >
              <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-1px' }}>CRUT // MOBUS</div>
                <div style={{ fontSize: '8px', fontWeight: 700, opacity: 0.6 }}>BHUBANESWAR SMART CITY</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '8px', opacity: 0.5 }}>PASSENGER</p>
                    <p style={{ fontWeight: 800, fontSize: '11px' }}>MOBUS TRAVELER</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '8px', opacity: 0.5 }}>DATE</p>
                    <p style={{ fontWeight: 800, fontSize: '11px' }}>03 MAY 2026</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '12px' }}>
                  <p style={{ fontSize: '8px', opacity: 0.5, marginBottom: '2px' }}>JOURNEY</p>
                  <p style={{ fontWeight: 800, fontSize: '13px' }}>{from} →</p>
                  <p style={{ fontWeight: 800, fontSize: '13px' }}>{to}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#000', color: '#fff', padding: '12px', borderRadius: '4px' }}>
                  <div>
                    <p style={{ fontSize: '8px', opacity: 0.7 }}>SUITE</p>
                    <p style={{ fontWeight: 900, fontSize: '1.5rem' }}>{seat.toString().padStart(2, '0')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '8px', opacity: 0.7 }}>FARE</p>
                    <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>₹45.00</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ width: '100%', height: '40px', background: 'repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 4px)', marginBottom: '8px' }}></div>
                <p style={{ fontSize: '8px', letterSpacing: '2px' }}>CRUT-BBS-AC-2026</p>
              </div>

              <div style={{ marginTop: '25px', display: 'flex', gap: '8px' }}>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  style={{ flex: 1, background: '#000', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px' }}
                >
                  <Download size={12} /> SAVE
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  style={{ flex: 1, background: '#eee', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px' }}
                >
                  DONE
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        height: '10px', 
        background: 'var(--bg)', 
        zIndex: 2001,
        boxShadow: '0 -5px 15px rgba(0,0,0,0.3)'
      }} />

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 769px) {
          .payment-header { flex-direction: row !important; text-align: left !important; }
        }
      `}} />
    </div>
  );
};

export default Payment;
