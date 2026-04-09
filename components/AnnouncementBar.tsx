'use client';
import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    const val = localStorage.getItem('wmg-announce-dismissed');
    if (val !== 'true') setDismissed(false);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem('wmg-announce-dismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <div className="announcement-bar">
      <span className="bar-text">
        LAUNCHING APRIL 18, 2026 &middot; GLOBAL MEDITATION EVENT &middot; wateringmygrass.com &middot; FREE
      </span>
      <button className="close-btn" onClick={dismiss} aria-label="Dismiss announcement">
        &times;
      </button>
    </div>
  );
}
