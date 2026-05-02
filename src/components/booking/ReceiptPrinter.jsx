import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Download, Share2, Home, RotateCcw, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from './Confetti';

/* ── Deterministic barcode lines ── */
function generateBarcodeSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getBarcodeLines(seed, count = 50) {
  const lines = [];
  let v = seed;
  for (let i = 0; i < count; i++) {
    v = (v * 1664525 + 1013904223) & 0xffffffff;
    lines.push({ w: (Math.abs(v) % 4) + 1, gap: (Math.abs(v >> 8) % 3) + 1 });
  }
  return lines;
}

const QRBlock = ({ seed }) => {
  const size = 7;
  const cells = Array.from({ length: size * size }, (_, i) => {
    const s = (seed >> i) & 1;
    return s;
  });
  // Force 3 corner markers
  const isCorner = (i) => {
    const r = Math.floor(i / size), c = i % size;
    return (r < 3 && c < 3) || (r < 3 && c >= size - 3) || (r >= size - 3 && c < 3);
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)`, gap: '1px', width: 70, height: 70 }}>
      {cells.map((cell, i) => (
        <div key={i} style={{ background: isCorner(i) ? '#000' : cell ? '#000' : 'transparent' }} />
      ))}
    </div>
  );
};

const ReceiptPrinter = ({ data }) => {
  const navigate  = useNavigate();
  const [phase, setPhase]       = useState('printing'); // printing → printed
  const [showConfetti, setShowConfetti] = useState(false);

  const bookingId  = `BBS-${data.from?.slice(0,2).toUpperCase()}${data.to?.slice(0,2).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
  const barcodeSeed = generateBarcodeSeed(bookingId);
  const barcodeLines = getBarcodeLines(barcodeSeed);
  const fare = data.fare || 45;

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('printed');
      setShowConfetti(true);
    }, 3200);
    const t2 = setTimeout(() => setShowConfetti(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleDownload = useCallback(() => {
    const text = [
      '══════════════════════════════',
      '        BUS4U · E-TICKET      ',
      '══════════════════════════════',
      `Booking ID : ${bookingId}`,
      `Passenger  : ${data.passenger?.name || 'TRAVELER'}`,
      `Route      : ${data.from} → ${data.to}`,
      `Date       : ${data.date}`,
      `Seat       : ${data.seat}`,
      `Bus        : ${data.bus?.name || 'MoBus AC Express'}`,
      `Fare       : ₹${fare}.00`,
      `Class      : ${data.bus?.type || 'AC Seater'}`,
      '══════════════════════════════',
      'Support: 1929 | bus4u.in',
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = `BUS4U-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [bookingId, data, fare]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', position: 'relative', minHeight: '600px', justifyContent: 'center' }}>
      {showConfetti && <Confetti />}

      {/* Printer machine */}
      <div style={{
        width:        '280px',
        height:       '44px',
        background:   'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
        borderRadius: '12px 12px 0 0',
        border:       '2px solid #444',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        gap:          '8px',
        position:     'relative',
        zIndex:       2,
        boxShadow:    '0 -4px 20px rgba(0,0,0,0.3)',
      }}>
        {/* Printer LED */}
        <motion.div
          animate={phase === 'printing' ? { opacity: [1, 0.3, 1] } : { background: '#00c853', opacity: 1 }}
          transition={phase === 'printing' ? { repeat: Infinity, duration: 0.6 } : {}}
          style={{ width: 8, height: 8, borderRadius: '50%', background: phase === 'printing' ? '#ffab00' : '#00c853' }}
        />
        <span style={{ fontSize: '10px', color: '#888', fontWeight: 700, letterSpacing: '2px' }}>
          {phase === 'printing' ? 'PRINTING...' : 'COMPLETE'}
        </span>
      </div>

      {/* Paper slot */}
      <div style={{ width: '260px', height: '4px', background: '#222', position: 'relative', zIndex: 2 }} />

      {/* The receipt emerging */}
      <motion.div
        className={phase === 'printing' ? 'animate-shake' : ''}
        initial={{ y: 0, height: 0, opacity: 1 }}
        animate={{ height: 'auto' }}
        transition={{ duration: 3, ease: 'linear' }}
        style={{
          width:        '260px',
          background:   '#fefcf8',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23e8e0d0' fill-opacity='0.5'/%3E%3C/svg%3E\")",
          boxShadow:    '0 20px 60px rgba(0,0,0,0.25), 2px 0 12px rgba(0,0,0,0.06), -2px 0 12px rgba(0,0,0,0.06)',
          color:        '#1a1a1a',
          fontFamily:   '"JetBrains Mono", monospace',
          overflow:     'hidden',
          position:     'relative',
          zIndex:       1,
        }}
      >
        {/* Ticket content */}
        <div style={{ padding: '28px 24px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '1px solid #e0d8c8', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-1.5px', color: '#0a0a0a' }}>BUS4U</div>
            <div style={{ fontSize: '8px', opacity: 0.5, letterSpacing: '2px', marginTop: '2px' }}>OFFICIAL E-TICKET · 2026</div>
          </div>

          {/* Journey headline */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '8px', opacity: 0.4, marginBottom: '2px' }}>FROM</div>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>{data.from?.slice(0, 10) || 'BBSR'}</div>
            </div>
            <div style={{ fontSize: '16px', opacity: 0.25 }}>→</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '8px', opacity: 0.4, marginBottom: '2px' }}>TO</div>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>{data.to?.slice(0, 10) || 'KIIT SQ'}</div>
            </div>
          </div>

          {/* Details grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            {[
              { label: 'PASSENGER', value: (data.passenger?.name || 'TRAVELER').slice(0,14) },
              { label: 'DATE',      value: data.date || '2026-05-03' },
              { label: 'SEAT',      value: data.seat || '--' },
              { label: 'CLASS',     value: data.bus?.type?.slice(0,12) || 'AC SEATER' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '7px', opacity: 0.4, letterSpacing: '1px', marginBottom: '2px' }}>{item.label}</div>
                <div style={{ fontWeight: 800, fontSize: '12px' }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Fare strip */}
          <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '7px', opacity: 0.5 }}>BOOKING ID</div>
              <div style={{ fontSize: '10px', fontWeight: 700 }}>{bookingId}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '7px', opacity: 0.5 }}>FARE PAID</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>₹{fare}</div>
            </div>
          </div>

          {/* Barcode */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', height: '44px', gap: '0', overflow: 'hidden' }}>
              {barcodeLines.map((line, i) => (
                <React.Fragment key={i}>
                  <div style={{ width: `${line.w}px`, background: '#1a1a1a', flexShrink: 0, height: '100%' }} />
                  <div style={{ width: `${line.gap}px`, flexShrink: 0 }} />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* QR */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ padding: '8px', border: '1px solid #e0d8c8', borderRadius: '6px' }}>
              <QRBlock seed={barcodeSeed} />
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '8px', opacity: 0.35, letterSpacing: '1px' }}>
            1929 · support@bus4u.in · bus4u.in
          </div>
        </div>

        {/* Tear edge */}
        <div style={{
          height:      '10px',
          background:  'repeating-linear-gradient(90deg, #fefcf8 0, #fefcf8 6px, transparent 6px, transparent 10px)',
          borderTop:   '1px dashed #c8c0b0',
        }} />
      </motion.div>

      {/* Action buttons */}
      <AnimatePresence>
        {phase === 'printed' && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '32px', width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleDownload} className="btn btn-accent" style={{ flex: 1, borderRadius: 'var(--r-lg)', padding: '14px' }}>
                <Download size={16} /> Save
              </button>
              <button className="btn btn-ghost" style={{ flex: 1, borderRadius: 'var(--r-lg)', padding: '14px', color: 'var(--fg)', border: '1px solid var(--border)' }}>
                <Share2 size={16} /> Share
              </button>
            </div>
            <button onClick={() => navigate('/')} className="btn btn-primary" style={{ width: '100%', borderRadius: 'var(--r-lg)', padding: '16px' }}>
              <Home size={16} /> Back to Home
            </button>
            <button onClick={() => navigate('/book')} style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', padding: '8px' }}>
              <RotateCcw size={12} /> Book another ride
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReceiptPrinter;
