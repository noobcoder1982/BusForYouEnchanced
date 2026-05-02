import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Star, Lightbulb } from 'lucide-react';

/* ============================================================
   SEAT DATA — STABLE (generated once, never flickers)
   ============================================================ */

const SEAT_CONFIG = {
  rows:        10,
  layout:      '2+1',   // left: 2 seats, right: 1 seat
  premiumRows: [0, 1],  // First 2 rows are premium
  ladiesRows:  [8, 9],  // Last 2 rows left-window are ladies reserved
};

function generateSeats() {
  const seats = {};

  for (let r = 0; r < SEAT_CONFIG.rows; r++) {
    // Left side: A (window), B (aisle)
    ['A', 'B'].forEach((col, ci) => {
      const id     = `${r + 1}${col}`;
      const isLeft = ci === 0;
      const isLadies = isLeft && SEAT_CONFIG.ladiesRows.includes(r);
      // Deterministic occupancy based on row/col – no randomness
      const occupiedIds = ['1B','2A','3B','4A','5B','6A','7B'];
      const status = isLadies ? 'ladies'
                   : occupiedIds.includes(id) ? 'booked'
                   : 'available';

      seats[id] = {
        id,
        row:    r + 1,
        col,
        side:   'left',
        status,
        label:  id,
        isWindow:  col === 'A',
        isPremium: SEAT_CONFIG.premiumRows.includes(r),
      };
    });

    // Right side: C (single window)
    const idC   = `${r + 1}C`;
    const occupiedC = ['2C','5C','8C'];
    seats[idC] = {
      id:       idC,
      row:      r + 1,
      col:      'C',
      side:     'right',
      status:   occupiedC.includes(idC) ? 'booked' : 'available',
      label:    idC,
      isWindow: true,
      isPremium: SEAT_CONFIG.premiumRows.includes(r),
    };
  }

  return seats;
}

const SEATS = generateSeats();

/* ============================================================
   SEAT COMPONENT
   ============================================================ */

const Seat = ({ seat, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  const getBg = () => {
    if (isSelected)              return 'var(--accent)';
    if (seat.status === 'booked') return 'rgba(var(--fg-rgb), 0.06)';
    if (seat.status === 'ladies') return 'rgba(255, 64, 129, 0.1)';
    if (seat.isPremium)           return 'rgba(255, 171, 0, 0.1)';
    return 'rgba(var(--fg-rgb), 0.04)';
  };

  const getBorder = () => {
    if (isSelected)              return '1.5px solid var(--accent)';
    if (seat.status === 'booked') return '1.5px solid var(--border)';
    if (seat.status === 'ladies') return '1.5px solid rgba(255,64,129,0.35)';
    if (seat.isPremium)           return '1.5px solid rgba(255,171,0,0.4)';
    return '1.5px solid var(--border)';
  };

  const isInteractive = seat.status === 'available';

  return (
    <div style={{ position: 'relative' }}>
      <motion.div
        className={`seat ${isSelected ? 'seat-selected' : ''}`}
        onClick={() => isInteractive && onSelect(seat.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={isInteractive ? { y: -2, scale: 1.08 } : {}}
        whileTap={isInteractive   ? { scale: 0.93 } : {}}
        style={{
          width:      '40px',
          height:     '48px',
          background: getBg(),
          border:     getBorder(),
          borderRadius: '8px 8px 12px 12px',
          cursor:     isInteractive ? 'pointer' : 'not-allowed',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap:        '2px',
          boxShadow:  isSelected ? '0 0 0 3px var(--accent-soft), 0 4px 16px rgba(61,90,254,0.35)' : 'none',
          position:   'relative',
          overflow:   'visible',
        }}
        aria-label={`Seat ${seat.id}: ${seat.status}`}
        aria-pressed={isSelected}
        role="button"
      >
        {/* Seat back arc */}
        <div style={{
          position:     'absolute',
          top:          '-4px',
          left:         '4px',
          right:        '4px',
          height:       '6px',
          background:   isSelected ? 'var(--accent-hover)' : 'rgba(var(--fg-rgb), 0.08)',
          borderRadius: '4px 4px 0 0',
        }} />

        {/* Seat number */}
        <span style={{
          fontSize:   '9px',
          fontWeight: 800,
          color:      isSelected ? '#fff' : seat.status === 'booked' ? 'var(--subtle)' : 'var(--muted)',
          lineHeight: 1,
          marginTop:  '4px',
          fontFamily: 'var(--font-mono)',
        }}>
          {seat.label}
        </span>

        {/* Window indicator */}
        {seat.isWindow && !isSelected && (
          <div style={{ position: 'absolute', left: '-3px', top: '8px', bottom: '8px', width: '3px', background: 'var(--accent-soft)', borderRadius: '2px 0 0 2px' }} />
        )}
      </motion.div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hovered && isInteractive && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{
              position:   'absolute',
              bottom:     'calc(100% + 8px)',
              left:       '50%',
              transform:  'translateX(-50%)',
              background: 'var(--fg)',
              color:      'var(--bg)',
              padding:    '6px 10px',
              borderRadius: 'var(--r-sm)',
              fontSize:   '11px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              zIndex:     50,
              boxShadow:  'var(--shadow-lg)',
            }}
          >
            {seat.isPremium ? '⭐ Premium · ' : ''}{seat.isWindow ? '🪟 Window · ' : ''}₹{seat.isPremium ? 65 : 45}
            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid var(--fg)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   MAIN SEAT SELECTOR
   ============================================================ */

const SeatSelector = ({ selectedSeat, setSelectedSeat, onNext, onBack }) => {
  const [mode, setMode] = useState('Seater');

  const suggestions = useMemo(() => {
    const available = Object.values(SEATS).filter(s =>
      s.status === 'available' && s.isWindow && !s.isPremium
    );
    return available.slice(0, 2).map(s => s.id);
  }, []);

  const selectedSeatData = selectedSeat ? SEATS[selectedSeat] : null;
  const fare = selectedSeatData?.isPremium ? 65 : 45;

  const handleSuggest = () => {
    if (suggestions.length > 0) setSelectedSeat(suggestions[0]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="text-label" style={{ marginBottom: '4px' }}>Step 3 of 5</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Select Seat</h3>
        </div>

        {/* Mode toggle */}
        <div style={{
          display:      'flex',
          background:   'var(--surface-2)',
          borderRadius: 'var(--r-full)',
          padding:      '3px',
          border:       '1px solid var(--border)',
        }}>
          {['Seater', 'Sleeper'].map(m => (
            <motion.button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding:      '6px 14px',
                borderRadius: 'var(--r-full)',
                fontSize:     '11px',
                fontWeight:   700,
                background:   mode === m ? 'var(--fg)' : 'transparent',
                color:        mode === m ? 'var(--bg)' : 'var(--muted)',
                transition:   'all 0.2s',
              }}
            >
              {m}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Best seat suggestion */}
      {!selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '12px',
            padding:      '14px 18px',
            background:   'var(--accent-soft)',
            borderRadius: 'var(--r-lg)',
            border:       '1px solid rgba(61,90,254,0.2)',
            cursor:       'pointer',
          }}
          onClick={handleSuggest}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Lightbulb size={16} color="var(--accent)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent)' }}>AI SUGGESTION</div>
            <div style={{ fontSize: '13px', color: 'var(--fg)', marginTop: '2px' }}>
              Seat {suggestions[0]} — Window · Best legroom
            </div>
          </div>
          <ArrowRight size={14} color="var(--accent)" />
        </motion.div>
      )}

      {/* Bus layout */}
      <div style={{
        background:   'var(--surface-2)',
        borderRadius: 'var(--r-xl)',
        border:       '2px solid var(--border)',
        padding:      '20px',
        position:     'relative',
        overflowX:    'auto',
      }}>
        {/* Bus roof shape */}
        <div style={{
          position:     'absolute',
          top:          0,
          left:         0,
          right:        0,
          height:       '6px',
          background:   'var(--accent)',
          borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
          opacity:      0.6,
        }} />

        {/* Driver section */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginBottom:   '16px',
          paddingBottom:  '16px',
          borderBottom:   '1px dashed var(--border)',
        }}>
          <span className="text-label">DRIVER</span>
          <div style={{
            width:        '32px',
            height:       '32px',
            borderRadius: '50%',
            border:       '3px solid var(--border-strong)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            position:     'relative',
          }}>
            <div style={{ width: '10px', height: '2px', background: 'var(--muted)' }} />
            <div style={{ position: 'absolute', width: '2px', height: '10px', background: 'var(--muted)' }} />
          </div>
          <span className="text-label">FRONT</span>
        </div>

        {/* Seat rows */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', minWidth: '200px' }}>
          {/* Left side (2 cols) */}
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', justifyContent: 'center' }}>
              <span style={{ width: '40px', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: 'var(--subtle)' }}>A</span>
              <span style={{ width: '40px', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: 'var(--subtle)' }}>B</span>
            </div>
            {Array.from({ length: SEAT_CONFIG.rows }, (_, r) => (
              <div key={r} style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                {['A', 'B'].map(col => {
                  const id = `${r + 1}${col}`;
                  return (
                    <Seat
                      key={id}
                      seat={SEATS[id]}
                      isSelected={selectedSeat === id}
                      onSelect={setSelectedSeat}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Aisle */}
          <div style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'flex-end',
            paddingBottom:  '4px',
            gap:            '2px',
          }}>
            <div style={{ flex: 1, width: '1px', background: 'var(--border)', marginTop: '28px' }} />
            <span style={{ fontSize: '8px', color: 'var(--subtle)', fontWeight: 700, writingMode: 'vertical-rl', opacity: 0.5 }}>AISLE</span>
            <div style={{ flex: 1, width: '1px', background: 'var(--border)' }} />
          </div>

          {/* Right side (1 col) */}
          <div>
            <div style={{ display: 'flex', marginBottom: '8px', justifyContent: 'center' }}>
              <span style={{ width: '40px', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: 'var(--subtle)' }}>C</span>
            </div>
            {Array.from({ length: SEAT_CONFIG.rows }, (_, r) => {
              const id = `${r + 1}C`;
              return (
                <div key={r} style={{ marginBottom: '8px' }}>
                  <Seat
                    seat={SEATS[id]}
                    isSelected={selectedSeat === id}
                    onSelect={setSelectedSeat}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Row numbers */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '12px', justifyContent: 'center' }}>
          <span style={{ fontSize: '9px', color: 'var(--subtle)' }}>
            Rows 1–2: ⭐ Premium Class
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display:      'flex',
        flexWrap:     'wrap',
        gap:          '12px 20px',
        padding:      '14px 16px',
        background:   'var(--surface-2)',
        borderRadius: 'var(--r-lg)',
        border:       '1px solid var(--border)',
      }}>
        {[
          { bg: 'rgba(var(--fg-rgb), 0.04)',  border: '1.5px solid var(--border)',               label: 'Available' },
          { bg: 'var(--accent)',              border: '1.5px solid var(--accent)',              label: 'Selected' },
          { bg: 'rgba(var(--fg-rgb), 0.06)',  border: '1.5px solid var(--border)',              label: 'Booked', dim: true },
          { bg: 'rgba(255,64,129,0.1)',        border: '1.5px solid rgba(255,64,129,0.35)',     label: 'Ladies Only' },
          { bg: 'rgba(255,171,0,0.1)',         border: '1.5px solid rgba(255,171,0,0.4)',       label: 'Premium' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: item.dim ? 0.5 : 1 }}>
            <div style={{ width: '14px', height: '14px', background: item.bg, border: item.border, borderRadius: '4px', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Fare display */}
      <AnimatePresence>
        {selectedSeat && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            style={{
              display:      'flex',
              justifyContent: 'space-between',
              alignItems:   'center',
              padding:      '20px',
              background:   'var(--accent-soft)',
              borderRadius: 'var(--r-lg)',
              border:       '1px solid rgba(61,90,254,0.2)',
            }}
          >
            <div>
              <div className="text-label">SELECTED</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '4px' }}>
                Seat {selectedSeat}
                {selectedSeatData?.isPremium && <span style={{ fontSize: '11px', marginLeft: '8px', color: 'var(--accent)' }}>⭐ PREMIUM</span>}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="text-label">FARE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent)', marginTop: '4px' }}>₹{fare}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onBack}
          className="btn btn-ghost"
          style={{ borderRadius: 'var(--r-lg)', padding: '16px 20px' }}
        >
          Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!selectedSeat}
          whileTap={selectedSeat ? { scale: 0.97 } : {}}
          className="btn btn-accent"
          style={{
            flex:         1,
            borderRadius: 'var(--r-lg)',
            padding:      '16px',
            fontSize:     '15px',
            opacity:      selectedSeat ? 1 : 0.45,
            cursor:       selectedSeat ? 'pointer' : 'not-allowed',
          }}
        >
          Confirm Seat {selectedSeat || ''} <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default SeatSelector;
