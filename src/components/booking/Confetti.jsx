import React, { useEffect, useRef } from 'react';

/* Lightweight canvas confetti — no library needed */
const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#3d5afe', '#00c853', '#ffab00', '#ff3d00', '#e040fb', '#fff'];
    const pieces = Array.from({ length: 80 }, () => ({
      x:     Math.random() * canvas.width,
      y:     -20,
      w:     Math.random() * 8 + 4,
      h:     Math.random() * 14 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx:    (Math.random() - 0.5) * 3,
      vy:    Math.random() * 3 + 2,
      rot:   Math.random() * Math.PI * 2,
      rotV:  (Math.random() - 0.5) * 0.2,
      life:  1,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.rotV;
        p.vy  += 0.06;
        p.life -= 0.008;
        if (p.life > 0 && p.y < canvas.height) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.min(1, p.life * 2);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });
      if (alive) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Confetti;
