'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/articles', label: 'Articles' },
  { href: '/evidence-map', label: 'Evidence Map' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
  { href: '/subscribe', label: 'Subscribe' },
  { href: '/donate', label: 'Donate' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#0C0C0A', borderBottom: '1px solid #1a1a18' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-playfair)', fontSize: 22, fontWeight: 900, color: '#4CBB17', textDecoration: 'none', letterSpacing: '-0.5px' }}>WMG</Link>
        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 28, alignItems: 'center' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: pathname === l.href ? '#4CBB17' : '#555555', textDecoration: 'none', borderBottom: pathname === l.href ? '1px solid #4CBB17' : '1px solid transparent', paddingBottom: 2, transition: 'color 0.2s' }}>{l.label}</Link>
          ))}
          <Link href="/event" style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', background: '#4CBB17', color: '#0C0C0A', padding: '6px 14px', textDecoration: 'none', fontWeight: 700 }}>APR 18 &rarr;</Link>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden" style={{ borderTop: '1px solid #1a1a18', background: '#0C0C0A', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: pathname === l.href ? '#4CBB17' : '#555555', textDecoration: 'none' }}>{l.label}</Link>
          ))}
          <Link href="/contribute" onClick={() => setOpen(false)} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555555', textDecoration: 'none' }}>Write for WMG</Link>
          <Link href="/event" onClick={() => setOpen(false)} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', background: '#4CBB17', color: '#0C0C0A', padding: '6px 14px', textDecoration: 'none', fontWeight: 700, textAlign: 'center' }}>APR 18 &rarr;</Link>
        </div>
      )}
    </nav>
  );
}
