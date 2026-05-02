import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Bus, Ticket, User, CreditCard, Check, ShieldCheck, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SeatSelector from '../components/booking/SeatSelector';
import ReceiptPrinter from '../components/booking/ReceiptPrinter';

const MO_BUS_STOPS = [
  "Master Canteen","Vani Vihar","Jayadev Vihar","Acharya Vihar","Rasulgarh",
  "Damana Square","Infocity","KIIT Square","Patia Square","Khandagiri Square",
  "Baramunda ISBT","AG Square","Rajmahal Square","Unit-IX","Saheed Nagar",
  "Satya Nagar","Bomikhal","Laxmi Sagar","Chintamaniswar","Kalpana Square",
  "Museum Square","Ravi Talkies Square","Samantarapur","Lingaraj Temple Road",
  "Pokhariput","Jagamara","ITER College","AMRI Hospital","AIIMS Bhubaneswar",
  "Dumuduma","Phulnakhara","Pahal","Hansapal","Mancheswar","VSS Nagar",
  "Sainik School","Apollo Hospital","Gajapati Nagar","Press Enclave","Sailashree Vihar",
  "Niladri Vihar","Chandrasekharpur","District Center","Maitri Vihar","Kalinga Hospital Square",
  "Fortune Tower","Xavier Square","Nalco Square","Kanan Vihar","Raghunathpur",
];

const BUS_OPTIONS = [
  { id: 'b1', name: 'MoBus AC Express',  dep: '06:30 AM', arr: '07:15 AM', type: 'AC Seater',  fare: 45, seats: 28, rating: 4.8 },
  { id: 'b2', name: 'MoBus Premium',     dep: '09:00 AM', arr: '10:00 AM', type: 'AC Luxury',  fare: 65, seats: 12, rating: 4.9 },
  { id: 'b3', name: 'MoBus Intercity',   dep: '02:00 PM', arr: '03:00 PM', type: 'AC Seater',  fare: 45, seats: 32, rating: 4.6 },
  { id: 'b4', name: 'MoBus Night Rider', dep: '09:00 PM', arr: '10:00 PM', type: 'AC Sleeper', fare: 55, seats: 20, rating: 4.7 },
];

const STEPS = [
  { id: 1, label: 'Route',     icon: MapPin },
  { id: 2, label: 'Service',   icon: Bus },
  { id: 3, label: 'Seat',      icon: Ticket },
  { id: 4, label: 'Details',   icon: User },
  { id: 5, label: 'Payment',   icon: CreditCard },
  { id: 6, label: 'Ticket',    icon: Check },
];

/* ── Stop Picker ── */
const StopPicker = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = MO_BUS_STOPS.filter(s => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ position: 'relative' }}>
      <div className="text-label" style={{ marginBottom: '8px' }}>{label}</div>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display:      'flex',
          justifyContent: 'space-between',
          alignItems:   'center',
          padding:      '16px 20px',
          background:   'var(--surface-2)',
          borderRadius: 'var(--r-md)',
          border:       `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          cursor:       'pointer',
          transition:   'border-color 0.2s',
          boxShadow:    open ? '0 0 0 3px var(--accent-soft)' : 'none',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '15px' }}>{value}</span>
        <ChevronDown size={16} color="var(--muted)" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            style={{
              position:   'absolute',
              top:        'calc(100% + 8px)',
              left:       0,
              right:      0,
              background: 'var(--surface)',
              border:     '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              zIndex:     100,
              maxHeight:  '220px',
              overflow:   'hidden',
              display:    'flex',
              flexDirection: 'column',
              boxShadow:  'var(--shadow-xl)',
            }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Search stops..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: '14px', background: 'var(--surface-2)', color: 'var(--fg)' }}
            />
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filtered.map(stop => (
                <div
                  key={stop}
                  onClick={() => { onChange(stop); setOpen(false); setQuery(''); }}
                  style={{
                    padding:    '12px 16px',
                    fontSize:   '14px',
                    fontWeight: 500,
                    cursor:     'pointer',
                    borderBottom: '1px solid var(--border)',
                    color:      'var(--fg)',
                    background: stop === value ? 'var(--accent-soft)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (stop !== value) e.currentTarget.style.background = 'var(--surface-2)'; }}
                  onMouseLeave={e => { if (stop !== value) e.currentTarget.style.background = 'transparent'; }}
                >
                  {stop}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Main Booking Page ── */
const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dir, setDir]   = useState(1); // 1 = forward, -1 = backward

  const [booking, setBooking] = useState({
    from:      'Master Canteen',
    to:        'KIIT Square',
    date:      new Date().toISOString().slice(0, 10),
    bus:       null,
    seat:      null,
    passenger: { name: '', age: '', gender: 'Male', phone: '' },
    fare:      45,
  });

  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n); };
  const next = () => go(step + 1);
  const back = () => go(step - 1);

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center:      { opacity: 1, x: 0 },
    exit: (d)  => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', paddingTop: '80px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>

        {/* Progress header */}
        {step < 6 && (
          <div style={{ marginBottom: '32px' }}>
            {/* Back button + step label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <button
                onClick={step === 1 ? () => navigate('/') : back}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', background: 'none', border: 'none', padding: '8px 0' }}
              >
                <ArrowLeft size={16} /> {step === 1 ? 'Home' : 'Back'}
              </button>
              <div className="text-label">{STEPS[step - 1]?.label}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>{step} / {STEPS.length - 1}</div>
            </div>

            {/* Progress bar */}
            <div style={{ height: '3px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', background: 'var(--accent)', borderRadius: '3px' }}
              />
            </div>

            {/* Step pills */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
              {STEPS.slice(0, 5).map(s => {
                const Icon = s.icon;
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div
                    key={s.id}
                    style={{
                      display:      'flex',
                      alignItems:   'center',
                      gap:          '5px',
                      padding:      '5px 12px',
                      borderRadius: 'var(--r-full)',
                      background:   done ? 'var(--accent-soft)' : active ? 'var(--surface-2)' : 'transparent',
                      border:       `1px solid ${active ? 'var(--accent)' : done ? 'rgba(61,90,254,0.2)' : 'var(--border)'}`,
                      fontSize:     '11px',
                      fontWeight:   700,
                      color:        done ? 'var(--accent)' : active ? 'var(--fg)' : 'var(--muted)',
                      whiteSpace:   'nowrap',
                      flexShrink:   0,
                      transition:   'all 0.3s',
                    }}
                  >
                    {done ? <Check size={11} /> : <Icon size={11} />}
                    {s.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Animated card */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Step 1: Route & Date ── */}
            {step === 1 && (
              <div className="step-card">
                <div className="text-label" style={{ marginBottom: '8px' }}>Step 1 of 5</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '32px' }}>
                  Where are you headed?
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <StopPicker
                    label="DEPARTURE STOP"
                    value={booking.from}
                    onChange={v => setBooking({ ...booking, from: v })}
                  />

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={() => setBooking({ ...booking, from: booking.to, to: booking.from })}
                      style={{
                        width: '36px', height: '36px',
                        borderRadius: 'var(--r-full)',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--accent)',
                      }}
                      aria-label="Swap stops"
                    >
                      ⇅
                    </button>
                  </div>

                  <StopPicker
                    label="DESTINATION STOP"
                    value={booking.to}
                    onChange={v => setBooking({ ...booking, to: v })}
                  />

                  <div>
                    <div className="text-label" style={{ marginBottom: '8px' }}>JOURNEY DATE</div>
                    <input
                      type="date"
                      value={booking.date}
                      onChange={e => setBooking({ ...booking, date: e.target.value })}
                      className="input-field"
                      style={{ fontWeight: 700 }}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={next}
                  disabled={booking.from === booking.to}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-accent btn-lg"
                  style={{ width: '100%', marginTop: '32px', borderRadius: 'var(--r-xl)', opacity: booking.from === booking.to ? 0.5 : 1 }}
                >
                  Search Buses <ArrowRight size={20} />
                </motion.button>
              </div>
            )}

            {/* ── Step 2: Bus Selection ── */}
            {step === 2 && (
              <div className="step-card">
                <div className="text-label" style={{ marginBottom: '4px' }}>Step 2 of 5</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '6px' }}>Choose your service</h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
                  {booking.from} → {booking.to} · {booking.date}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {BUS_OPTIONS.map(bus => (
                    <motion.div
                      key={bus.id}
                      onClick={() => { setBooking({ ...booking, bus, fare: bus.fare }); next(); }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding:      '20px',
                        borderRadius: 'var(--r-lg)',
                        border:       '1px solid var(--border)',
                        background:   'var(--surface-2)',
                        cursor:       'pointer',
                        display:      'flex',
                        justifyContent: 'space-between',
                        alignItems:   'center',
                        gap:          '12px',
                        transition:   'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>{bus.name}</div>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--muted)' }}>
                          <span>{bus.dep} → {bus.arr}</span>
                          <span>·</span>
                          <span>{bus.type}</span>
                          <span>·</span>
                          <span>⭐ {bus.rating}</span>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>
                          {bus.seats} seats left
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--fg)', letterSpacing: '-0.02em' }}>₹{bus.fare}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>per seat</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 3: Seat Selector ── */}
            {step === 3 && (
              <div className="step-card" style={{ padding: 'clamp(16px, 4vw, 32px)' }}>
                <SeatSelector
                  selectedSeat={booking.seat}
                  setSelectedSeat={s => setBooking({ ...booking, seat: s })}
                  onNext={next}
                  onBack={back}
                />
              </div>
            )}

            {/* ── Step 4: Passenger Details ── */}
            {step === 4 && (
              <div className="step-card">
                <div className="text-label" style={{ marginBottom: '4px' }}>Step 4 of 5</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '8px' }}>Passenger info</h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '28px' }}>
                  Seat {booking.seat} · {booking.bus?.name}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'FULL NAME',    key: 'name',  type: 'text',   placeholder: 'As on ID card' },
                    { label: 'PHONE',        key: 'phone', type: 'tel',    placeholder: '10-digit mobile' },
                  ].map(f => (
                    <div key={f.key}>
                      <div className="text-label" style={{ marginBottom: '8px' }}>{f.label}</div>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={booking.passenger[f.key]}
                        onChange={e => setBooking({ ...booking, passenger: { ...booking.passenger, [f.key]: e.target.value } })}
                        className="input-field"
                      />
                    </div>
                  ))}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <div className="text-label" style={{ marginBottom: '8px' }}>AGE</div>
                      <input
                        type="number"
                        placeholder="Age"
                        className="input-field"
                        value={booking.passenger.age}
                        onChange={e => setBooking({ ...booking, passenger: { ...booking.passenger, age: e.target.value } })}
                      />
                    </div>
                    <div>
                      <div className="text-label" style={{ marginBottom: '8px' }}>GENDER</div>
                      <select
                        className="input-field"
                        value={booking.passenger.gender}
                        onChange={e => setBooking({ ...booking, passenger: { ...booking.passenger, gender: e.target.value } })}
                        style={{ cursor: 'pointer' }}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={next}
                  disabled={!booking.passenger.name || !booking.passenger.phone}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-accent btn-lg"
                  style={{
                    width:        '100%',
                    marginTop:    '32px',
                    borderRadius: 'var(--r-xl)',
                    opacity:      (booking.passenger.name && booking.passenger.phone) ? 1 : 0.45,
                  }}
                >
                  Continue to Payment <ArrowRight size={20} />
                </motion.button>
              </div>
            )}

            {/* ── Step 5: Payment ── */}
            {step === 5 && (
              <div className="step-card">
                <div className="text-label" style={{ marginBottom: '4px' }}>Step 5 of 5</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '28px' }}>Payment</h2>

                {/* Summary */}
                <div style={{ padding: '20px', background: 'var(--surface-2)', borderRadius: 'var(--r-lg)', marginBottom: '24px', border: '1px solid var(--border)' }}>
                  {[
                    ['Route',     `${booking.from} → ${booking.to}`],
                    ['Date',      booking.date],
                    ['Seat',      booking.seat],
                    ['Passenger', booking.passenger.name || '—'],
                    ['Service',   booking.bus?.name],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                      <span style={{ color: 'var(--muted)' }}>{k}</span>
                      <span style={{ fontWeight: 700, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>Total Fare</span>
                    <span style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--accent)' }}>₹{booking.fare}</span>
                  </div>
                </div>

                {/* Card inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <input type="text"     placeholder="Cardholder name"          className="input-field" />
                  <input type="text"     placeholder="1234  5678  9012  3456"   className="input-field" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '2px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input type="text"     placeholder="MM / YY"  className="input-field" />
                    <input type="password" placeholder="CVV"      className="input-field" />
                  </div>
                </div>

                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-accent btn-lg"
                  style={{ width: '100%', borderRadius: 'var(--r-xl)', marginBottom: '12px' }}
                >
                  Pay ₹{booking.fare} Securely <ArrowRight size={20} />
                </motion.button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: 'var(--muted)' }}>
                  <ShieldCheck size={14} color="var(--green)" /> PCI DSS Secured · 256-bit SSL
                </div>
              </div>
            )}

            {/* ── Step 6: Ticket / Receipt ── */}
            {step === 6 && (
              <ReceiptPrinter data={booking} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile sticky CTA */}
      {step < 5 && (
        <div className="mobile-sticky-cta no-print">
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', textAlign: 'center' }}>
            {step === 1 && 'Select your stops to continue'}
            {step === 2 && 'Tap a service to continue'}
            {step === 3 && (booking.seat ? `Seat ${booking.seat} selected` : 'Select a seat to continue')}
            {step === 4 && 'Fill in your details to continue'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
