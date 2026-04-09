import Link from 'next/link';

/* Basquiat-style 3-point crown SVG */
function CrownSvg({ size = 16, color = '#4CBB17' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M2 20h20v2H2zM4 18l2-10 4 5 2-9 2 9 4-5 2 10z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1a1a18', background: '#0C0C0A', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: 32, fontWeight: 900, color: '#4CBB17' }}>WMG</div>
              <CrownSvg size={16} />
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#555', lineHeight: 1.7 }}>Nonprofit wellness journalism. We read the actual papers.</p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Navigate</div>
            {[['/', 'Home'], ['/articles', 'Articles'], ['/evidence-map', 'Evidence Map'], ['/about', 'About'], ['/subscribe', 'Subscribe'], ['/event', 'April 18 Event']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: 8 }}>
                <Link href={href} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: '#555', textDecoration: 'none', letterSpacing: '0.05em' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Community</div>
            {[['/community', 'Community Hub'], ['/contribute', 'Write for WMG'], ['/donate', 'Support WMG']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: 8 }}>
                <Link href={href} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: '#555', textDecoration: 'none', letterSpacing: '0.05em' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>The Standard</div>
            <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: '#333', lineHeight: 1.8 }}>Named researcher<br />Journal name<br />Year<br />Sample size<br />Every time.<br />No exceptions.</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1a1a18', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-special-elite)', fontSize: 12, letterSpacing: '0.1em', color: '#333', marginBottom: 4 }}>Volume 1 &middot; April 2026</div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333', marginBottom: 4 }}>NONPROFIT 501(C)(3) PENDING &middot; FISCAL SPONSOR: FRACTURED ATLAS</div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333' }}>NO ADS &middot; NO BRAND PARTNERSHIPS &middot; NO COURSES &middot; &copy; 2026 WATERING MY GRASS</div>
          </div>
          <span style={{ fontSize: 24 }}>&#x1FAB2;</span>
        </div>
      </div>
    </footer>
  );
}
