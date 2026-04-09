'use client';
import { useState } from 'react';

const PARTICLE_POSITIONS = [
  { top: '10%', left: '50%', dx: -60, dy: -80 },
  { top: '20%', left: '80%', dx: 70, dy: -50 },
  { top: '50%', left: '95%', dx: 90, dy: 10 },
  { top: '80%', left: '80%', dx: 60, dy: 60 },
  { top: '90%', left: '50%', dx: -10, dy: 90 },
  { top: '80%', left: '20%', dx: -70, dy: 50 },
  { top: '50%', left: '5%', dx: -90, dy: -10 },
  { top: '20%', left: '20%', dx: -50, dy: -70 },
  { top: '30%', left: '60%', dx: 40, dy: -90 },
  { top: '70%', left: '40%', dx: -40, dy: 80 },
  { top: '40%', left: '90%', dx: 80, dy: -30 },
  { top: '60%', left: '10%', dx: -80, dy: 30 },
];

export default function MascotReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className={`helmet-stack ${revealed ? 'revealed' : ''}`}
      onClick={() => setRevealed(!revealed)}
      role="button"
      aria-label="Reveal the mascot"
      tabIndex={0}
    >
      <div className="roach-layer">
        <span>&#x1FAB2;</span>
      </div>
      <div className="helmet-layer">
        <span>&#x1F3CE;&#xFE0F;</span>
      </div>
      {/* Particle burst */}
      <div className="particle-burst">
        {PARTICLE_POSITIONS.map((p, i) => (
          <span
            key={i}
            className="dot"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: `${i * 0.03}s`,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
