'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function KeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('wmg-shortcuts-shown');
    if (!shown) {
      setShowTooltip(true);
      sessionStorage.setItem('wmg-shortcuts-shown', 'true');
      const timer = setTimeout(() => setShowTooltip(false), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        router.push('/evidence-map');
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        router.push('/articles');
      } else if (e.key === '/' && pathname === '/evidence-map') {
        e.preventDefault();
        const searchInput = document.getElementById('evidence-search');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router, pathname]);

  if (!showTooltip) return null;

  return (
    <div className="shortcuts-tooltip">
      <div style={{ marginBottom: 6, color: '#888', fontWeight: 700 }}>KEYBOARD SHORTCUTS</div>
      <div><kbd>E</kbd> Evidence Map</div>
      <div><kbd>A</kbd> Articles</div>
      <div><kbd>/</kbd> Search (on Evidence Map)</div>
      <button
        onClick={() => setShowTooltip(false)}
        style={{ position: 'absolute', top: 6, right: 8, background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 12 }}
      >
        &times;
      </button>
    </div>
  );
}
