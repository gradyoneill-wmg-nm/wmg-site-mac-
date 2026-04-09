import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-14" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 600, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>&#x1FAB2;&#x2753;</div>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-1px" }}>
          The Evidence Is Inconclusive.
        </h1>
        <p style={{ color: "#888", fontSize: 18, lineHeight: 1.6, marginBottom: 40 }}>
          This page doesn&apos;t exist. But here&apos;s what does:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          {[
            { href: "/", label: "Homepage" },
            { href: "/articles", label: "Articles" },
            { href: "/evidence-map", label: "Evidence Map" },
            { href: "/about", label: "About WMG" },
            { href: "/subscribe", label: "Subscribe" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#4CBB17",
                textDecoration: "none",
                padding: "8px 20px",
                border: "1px solid #1a1a18",
                width: "100%",
                maxWidth: 280,
                transition: "all 0.2s",
              }}
            >
              {link.label} &rarr;
            </Link>
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2a2a28", marginTop: 48 }}>
          404 &middot; PAGE NOT FOUND &middot; WMG
        </p>
      </div>
    </div>
  );
}
