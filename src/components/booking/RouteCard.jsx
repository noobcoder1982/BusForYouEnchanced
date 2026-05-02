import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, Repeat } from 'lucide-react';

const MO_BUS_STOPS = [
  "Master Canteen", "Vani Vihar", "Jayadev Vihar", "Acharya Vihar", "Rasulgarh",
  "Damana Square", "Infocity", "KIIT Square", "Patia Square", "Khandagiri Square",
  "Baramunda ISBT", "AG Square", "Rajmahal Square", "Unit-IX", "Saheed Nagar"
];

const RouteCard = ({ data, setData, onNext }) => {
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="logo-swiss" style={{ marginBottom: '8px' }}>
        PLAN <div className="logo-dot" /> ROUTE
      </div>

      <div style={{ position: 'relative' }}>
        <div 
          onClick={() => { setShowFrom(!showFrom); setShowTo(false); }}
          style={{ 
            padding: '24px', borderRadius: '20px', background: 'rgba(var(--fg-rgb), 0.03)', 
            border: '1px solid var(--border)', cursor: 'pointer' 
          }}
        >
          <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', marginBottom: '8px' }}>DEPARTURE</div>
          <div style={{ fontSize: '18px', fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>
            {data.from} <ChevronDown size={18} />
          </div>
        </div>
        <AnimatePresence>
          {showFrom && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', marginTop: '10px', zIndex: 100, maxHeight: '200px', overflowY: 'auto', boxShadow: 'var(--shadow-premium)' }}>
              {MO_BUS_STOPS.map(stop => (
                <div key={stop} onClick={() => { setData({...data, from: stop}); setShowFrom(false); }} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', fontSize: '14px' }}>{stop}</div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '-12px 0' }}>
        <motion.div whileTap={{ rotate: 180 }} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', zIndex: 2 }}>
          <Repeat size={18} />
        </motion.div>
      </div>

      <div style={{ position: 'relative' }}>
        <div 
          onClick={() => { setShowTo(!showTo); setShowFrom(false); }}
          style={{ 
            padding: '24px', borderRadius: '20px', background: 'rgba(var(--fg-rgb), 0.03)', 
            border: '1px solid var(--border)', cursor: 'pointer' 
          }}
        >
          <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', marginBottom: '8px' }}>DESTINATION</div>
          <div style={{ fontSize: '18px', fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>
            {data.to} <ChevronDown size={18} />
          </div>
        </div>
        <AnimatePresence>
          {showTo && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', marginTop: '10px', zIndex: 100, maxHeight: '200px', overflowY: 'auto', boxShadow: 'var(--shadow-premium)' }}>
              {MO_BUS_STOPS.map(stop => (
                <div key={stop} onClick={() => { setData({...data, to: stop}); setShowTo(false); }} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', fontSize: '14px' }}>{stop}</div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(var(--fg-rgb), 0.03)', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', marginBottom: '8px' }}>JOURNEY DATE</div>
        <input 
          type="date" 
          value={data.date} 
          onChange={(e) => setData({...data, date: e.target.value})}
          style={{ width: '100%', background: 'none', border: 'none', color: 'var(--fg)', fontSize: '18px', fontWeight: 800, outline: 'none' }} 
        />
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        style={{ 
          background: 'var(--accent)', color: '#fff', padding: '24px', borderRadius: '20px', 
          fontWeight: 800, fontSize: '16px', marginTop: '12px' 
        }}
      >
        SEARCH BUSES
      </motion.button>
    </div>
  );
};

export default RouteCard;
