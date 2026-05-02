import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Users, MapPin, Search, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MO_BUS_STOPS = [
  "Master Canteen", "Vani Vihar", "Jayadev Vihar", "Acharya Vihar", "Rasulgarh",
  "Damana Square", "Infocity", "KIIT Square", "Patia Square", "Khandagiri Square",
  "Baramunda ISBT", "AG Square", "Rajmahal Square", "Unit-IX", "Saheed Nagar",
  "Satya Nagar", "Bomikhal", "Laxmi Sagar", "Chintamaniswar", "Kalpana Square",
  "Museum Square", "Ravi Talkies Square", "Samantarapur", "Lingaraj Temple Road",
  "Pokhariput", "Jagamara", "ITER College", "AMRI Hospital", "AIIMS Bhubaneswar",
  "Dumuduma", "Phulnakhara", "Pahal", "Hansapal", "Mancheswar", "VSS Nagar",
  "Sainik School", "Apollo Hospital", "Gajapati Nagar", "Press Enclave", "Sailashree Vihar",
  "Niladri Vihar", "Chandrasekharpur", "District Center", "Maitri Vihar", "Kalinga Hospital Square",
  "Fortune Tower", "Xavier Square", "Nalco Square", "Kanan Vihar", "Raghunathpur"
];

const Booking = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [fromStop, setFromStop] = useState("Master Canteen");
  const [toStop, setToStop] = useState("KIIT Square");
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const navigate = useNavigate();

  const seats = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    isOccupied: Math.random() > 0.8
  }));

  const handleContinue = () => {
    if (selectedSeat) {
      navigate('/payment', { state: { seat: selectedSeat, from: fromStop, to: toStop } });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '14px' }}>
            <ArrowLeft size={16} /> EXIT TO EXPLORE
          </Link>
          <div style={{ display: 'flex', gap: '40px', fontSize: '12px', fontWeight: 600, letterSpacing: '1px' }}>
            <div style={{ color: 'var(--accent)' }}>01 SEARCH</div>
            <div style={{ opacity: 0.3 }}>02 SELECTION</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Left: Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              padding: '60px', 
              borderRadius: '40px', 
              background: 'linear-gradient(135deg, #111 0%, #050505 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
            }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '40px', letterSpacing: '-2px' }}>Book Your <br />MoBus Suite.</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* FROM Dropdown */}
              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '1px' }}>DEPARTURE STOP</p>
                <div 
                  onClick={() => setShowFrom(!showFrom)}
                  style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {fromStop} <ChevronDown size={18} />
                </div>
                <AnimatePresence>
                  {showFrom && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{ position: 'absolute', top: '100%', left: 0, width: '100%', maxHeight: '200px', overflowY: 'auto', background: '#111', border: '1px solid var(--border)', zIndex: 10, borderRadius: '12px', marginTop: '10px' }}>
                      {MO_BUS_STOPS.map(stop => (
                        <div key={stop} onClick={() => { setFromStop(stop); setShowFrom(false); }} style={{ padding: '12px 20px', cursor: 'pointer', hover: { background: 'rgba(255,255,255,0.1)' } }}>{stop}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TO Dropdown */}
              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '1px' }}>DESTINATION STOP</p>
                <div 
                  onClick={() => setShowTo(!showTo)}
                  style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {toStop} <ChevronDown size={18} />
                </div>
                <AnimatePresence>
                  {showTo && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{ position: 'absolute', top: '100%', left: 0, width: '100%', maxHeight: '200px', overflowY: 'auto', background: '#111', border: '1px solid var(--border)', zIndex: 10, borderRadius: '12px', marginTop: '10px' }}>
                      {MO_BUS_STOPS.map(stop => (
                        <div key={stop} onClick={() => { setToStop(stop); setShowTo(false); }} style={{ padding: '12px 20px', cursor: 'pointer' }}>{stop}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '1px' }}>DATE</p>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>May 03, 2026</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '1px' }}>BUS TYPE</p>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>MoBus AC</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '80px', padding: '30px', borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--muted)', fontSize: '14px' }}>
                <span>Selected Suite:</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>{selectedSeat ? `Suite ${selectedSeat}` : 'None'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 800 }}>
                <span>Total Fare:</span>
                <span style={{ color: 'var(--accent)' }}>₹{selectedSeat ? '45.00' : '0.00'}</span>
              </div>
            </div>

            <motion.button 
              disabled={!selectedSeat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              style={{ 
                width: '100%', 
                background: selectedSeat ? 'var(--accent)' : 'rgba(255,255,255,0.1)', 
                color: '#fff', 
                padding: '24px', 
                borderRadius: '20px', 
                fontWeight: 800, 
                fontSize: '18px', 
                marginTop: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                opacity: selectedSeat ? 1 : 0.5,
                cursor: selectedSeat ? 'pointer' : 'not-allowed'
              }}
            >
              PROCEED TO PAYMENT <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Right: Seat Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass" style={{ padding: '60px', borderRadius: '40px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '60px' }}>MoBus AC Seat Map</h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '20px',
                padding: '40px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '40px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                {seats.map(seat => (
                  <motion.div
                    key={seat.id}
                    whileHover={!seat.isOccupied ? { scale: 1.1, y: -5 } : {}}
                    onClick={() => !seat.isOccupied && setSelectedSeat(seat.id)}
                    style={{
                      width: '60px',
                      height: '80px',
                      borderRadius: '16px',
                      background: seat.isOccupied 
                        ? 'rgba(255,255,255,0.05)' 
                        : (selectedSeat === seat.id ? 'var(--accent)' : 'rgba(255,255,255,0.1)'),
                      boxShadow: selectedSeat === seat.id ? '0 0 30px rgba(61, 90, 254, 0.5)' : 'none',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: seat.isOccupied ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: seat.isOccupied ? 'rgba(255,255,255,0.1)' : '#fff',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {seat.id}
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: '60px', display: 'flex', gap: '40px', fontSize: '12px', opacity: 0.6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div> Available
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '4px' }}></div> Selected
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div> Occupied
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
