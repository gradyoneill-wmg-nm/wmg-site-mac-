'use client';
import { useState } from 'react';

interface ClaimCardProps {
  claim: string;
  reality: string;
  citation: string;
}

export default function ClaimCard({ claim, reality, citation }: ClaimCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`claim-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      role="button"
      tabIndex={0}
      aria-label="Flip to see the science"
    >
      <div className="claim-card-inner">
        <div className="claim-card-front">
          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#555' }}>
            INDUSTRY CLAIM
          </span>
          <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 20, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1.35 }}>
            &ldquo;{claim}&rdquo;
          </p>
          <span className="hover-label" style={{ fontFamily: 'var(--font-space-mono)', fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#2a2a28' }}>
            HOVER TO REVEAL
          </span>
        </div>
        <div className="claim-card-back">
          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(12,12,10,0.6)' }}>
            WHAT THE RESEARCH SAYS
          </span>
          <p style={{ color: '#0C0C0A', fontSize: 14, lineHeight: 1.6 }}>
            {reality}
          </p>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'rgba(12,12,10,0.7)', lineHeight: 1.5 }}>
            {citation}
          </p>
        </div>
      </div>
    </div>
  );
}
