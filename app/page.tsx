import Link from "next/link";
import { ARTICLES, EVIDENCE_CLAIMS } from "@/lib/notion";
import NewsletterForm from "@/components/NewsletterForm";
import MascotReveal from "@/components/MascotReveal";
import ClaimCard from "@/components/ClaimCard";
import StaggeredHeadline from "@/components/StaggeredHeadline";

const CLAIMS = [
  {
    claim: "Alkaline water balances your body\u2019s pH and improves health.",
    reality:
      "Your body regulates pH within 0.05 units regardless of what you drink. The kidneys handle this. No peer-reviewed evidence supports alkaline water health claims.",
    citation: "Fenton et al., BMJ Open, 2016 \u00B7 N=systematic review",
  },
  {
    claim: "Detox teas cleanse your liver and remove toxins.",
    reality:
      "Your liver processes toxins continuously. No clinical evidence supports commercial detox products. The FDA has issued warnings against several.",
    citation: "Ernst E., Journal of Human Nutrition and Dietetics, 2012 \u00B7 N=review",
  },
  {
    claim: "40Hz gamma stimulation improves cognitive function.",
    reality:
      "MIT researchers found 40Hz light and sound flickering reduced amyloid plaque load 40\u201350% in mouse models. Phase 2A human trial confirmed safety and showed neurological effects.",
    citation: "Iaccarino et al., Nature, 2016 \u00B7 N=mouse model + 76 human participants",
  },
];

const TIERS = [
  { label: "STRONG EVIDENCE", color: "#4CBB17" },
  { label: "PRELIMINARY", color: "#F5841F" },
  { label: "PLAUSIBLE, UNTESTED", color: "#2D4E9E" },
  { label: "NOT SUPPORTED", color: "#555555" },
];

const EXAMPLE_CLAIMS = [
  { name: "Wim Hof / Cold Exposure", tier: "STRONG EVIDENCE", color: "#4CBB17" },
  { name: "Schumann Resonance Entrainment", tier: "PRELIMINARY", color: "#F5841F" },
  { name: "Copper & Arthritis", tier: "PLAUSIBLE, UNTESTED", color: "#2D4E9E" },
  { name: "Crystal Healing", tier: "NOT SUPPORTED", color: "#555555" },
];

const MARQUEE_TEXT =
  "WATERINGMYGRASS.COM \u00B7 NONPROFIT \u00B7 NO ADS \u00B7 NO COURSES \u00B7 NO AGENDA \u00B7 READ THE PAPERS \u00B7 THE ANTI-GOOP \u00B7 NAMED RESEARCHER + JOURNAL + YEAR + SAMPLE SIZE \u00B7 EVERY TIME \u00B7 NO EXCEPTIONS \u00B7 ";

const MARQUEE_TEXT_2 =
  "EST. 2026 \u00B7 NEW YORK CITY \u00B7 501(C)(3) PENDING \u00B7 FRACTURED ATLAS \u00B7 PEER-REVIEWED ONLY \u00B7 CITATION STANDARD \u00B7 THE WELLNESS INDUSTRY GENERATES BILLIONS \u00B7 WE READ THE PAPERS \u00B7 ";

/* Evidence strength counts */
const TIER_COUNTS = {
  strong: EVIDENCE_CLAIMS.filter((c) => c.tier === "strong").length,
  preliminary: EVIDENCE_CLAIMS.filter((c) => c.tier === "preliminary").length,
  plausible: EVIDENCE_CLAIMS.filter((c) => c.tier === "plausible").length,
  "not-supported": EVIDENCE_CLAIMS.filter((c) => c.tier === "not-supported").length,
};
const TOTAL_CLAIMS = EVIDENCE_CLAIMS.length;

const STATS = [
  `${ARTICLES.length} articles published`,
  `${TOTAL_CLAIMS} claims indexed`,
  "0 ads",
  "0 brand partnerships",
  "Est. April 2026",
];

/* Coming soon articles for slots 4-7 */
const COMING_SOON = [
  { title: "Red Light, Real Science", date: "April 22" },
  { title: "HRV: The Most Oversold Metric", date: "April 29" },
  { title: "Calm vs. Headspace vs. Science", date: "May 6" },
  { title: "Cold Plunge Industry vs. Science", date: "May 13" },
];

/* Basquiat 3-point crown SVG */
function CrownSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#4CBB17" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M2 20h20v2H2zM4 18l2-10 4 5 2-9 2 9 4-5 2 10z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div style={{ paddingTop: 56 }}>
      {/* EVENT BANNER */}
      <Link href="/event" style={{ display: 'block', background: '#4CBB17', color: '#0C0C0A', textAlign: 'center', padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', textDecoration: 'none', fontWeight: 700 }}>
        April 18 Launch Event — Register Free →
      </Link>
      {/* ========== HERO ========== */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", borderBottom: "1px solid #1a1a18", overflow: "hidden" }}>
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
          {/* Eyebrow */}
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#4CBB17", marginBottom: 32 }}>
            NONPROFIT WELLNESS JOURNALISM &middot; EST. 2026
          </p>

          {/* WMG stamp with Basquiat crown */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-special-elite)", fontSize: 14, color: "#4CBB17", letterSpacing: "0.2em", textTransform: "uppercase" }}>WMG</span>
            <CrownSvg />
          </div>

          {/* Headline — staggered word reveal */}
          <StaggeredHeadline />

          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, fontStyle: "italic", color: "#4CBB17", lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 40 }}>
            The anti-Goop.
          </h2>

          {/* Subhead */}
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 20, color: "#888", maxWidth: 560, lineHeight: 1.6, marginBottom: 48 }}>
            Named researcher. Journal. Year. Sample size. Every time. No exceptions.
          </p>

          {/* Mascot */}
          <MascotReveal />

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Link href="/articles" style={{ background: "#4CBB17", color: "#0C0C0A", padding: "12px 24px", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
              Read the Articles
            </Link>
            <Link href="/event" style={{ border: "1px solid #4CBB17", color: "#4CBB17", padding: "12px 24px", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
              April 18 Launch Event &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MARQUEE STRIP (bidirectional) ========== */}
      <div style={{ background: "#4CBB17", overflow: "hidden" }}>
        <div style={{ padding: "10px 0" }}>
          <div className="marquee-track">
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, textTransform: "uppercase", color: "#0C0C0A", whiteSpace: "nowrap", padding: "0 16px" }}>
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </span>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(12,12,10,0.2)" }} />
        <div style={{ padding: "10px 0" }}>
          <div className="marquee-track-reverse">
            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, textTransform: "uppercase", color: "#0C0C0A", whiteSpace: "nowrap", padding: "0 16px" }}>
              {MARQUEE_TEXT_2}{MARQUEE_TEXT_2}
            </span>
          </div>
        </div>
      </div>

      {/* ========== LIVE STATS BAR ========== */}
      <div style={{ background: "#111110", borderBottom: "1px solid #1a1a18", padding: "16px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
          {STATS.map((stat, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "#888", letterSpacing: "0.05em" }}>
                {stat}
              </span>
              {i < STATS.length - 1 && (
                <span style={{ display: "inline-block", width: 1, height: 16, background: "#4CBB17", margin: "0 20px", opacity: 0.5 }} />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ========== CLAIM VS SCIENCE CARDS ========== */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#4CBB17", marginBottom: 12 }}>
            CLAIM VS. SCIENCE
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, marginBottom: 16 }}>
            What the industry sells vs. what the papers say.
          </h2>
          <p style={{ color: "#888", fontSize: 15, maxWidth: 520 }}>
            Hover a card. See the research. This is everything WMG does in three cards.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {CLAIMS.map((c, i) => (
            <ClaimCard key={i} {...c} />
          ))}
        </div>
      </section>

      {/* ========== EVIDENCE STRENGTH VISUALIZATION ========== */}
      <section style={{ borderTop: "1px solid #1a1a18", background: "#111110" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#4CBB17", marginBottom: 16 }}>
            EVIDENCE DISTRIBUTION
          </p>
          <div style={{ display: "flex", width: "100%", height: 48, overflow: "hidden" }}>
            <div className="evidence-bar-segment" style={{ flex: TIER_COUNTS.strong, background: "#4CBB17" }}>
              STRONG ({TIER_COUNTS.strong})
            </div>
            <div className="evidence-bar-segment" style={{ flex: TIER_COUNTS.preliminary, background: "#F5841F" }}>
              PRELIMINARY ({TIER_COUNTS.preliminary})
            </div>
            <div className="evidence-bar-segment" style={{ flex: TIER_COUNTS.plausible, background: "#2D4E9E", color: "#fff" }}>
              PLAUSIBLE ({TIER_COUNTS.plausible})
            </div>
            <div className="evidence-bar-segment" style={{ flex: TIER_COUNTS["not-supported"], background: "#555555", color: "#fff" }}>
              NOT SUPPORTED ({TIER_COUNTS["not-supported"]})
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, color: "#2a2a28", marginTop: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {TOTAL_CLAIMS} CLAIMS INDEXED &middot; UPDATED APRIL 2026
          </p>
        </div>
      </section>

      {/* ========== EVIDENCE MAP TEASER (with dot painting) ========== */}
      <section className="dot-painting-bg" style={{ borderTop: "1px solid #1a1a18", borderBottom: "1px solid #1a1a18", background: "#0C0C0A" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#4CBB17", marginBottom: 12 }}>
            DATABASE
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, marginBottom: 16 }}>
            The Evidence Map
          </h2>
          <p style={{ color: "#888", fontSize: 18, maxWidth: 520, marginBottom: 40 }}>
            Every wellness claim. Ranked by evidence strength.
          </p>

          {/* Tier badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
            {TIERS.map((t) => (
              <span key={t.label} style={{ fontFamily: "var(--font-space-mono)", fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: t.color, border: `1px solid ${t.color}`, padding: "6px 12px" }}>
                {t.label}
              </span>
            ))}
          </div>

          {/* Example claims */}
          <div style={{ marginBottom: 40 }}>
            {EXAMPLE_CLAIMS.map((c) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid #1a1a18", padding: "12px 0" }}>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: c.color, width: 160, flexShrink: 0 }}>
                  {c.tier}
                </span>
                <span style={{ fontFamily: "var(--font-playfair)", fontSize: 16, fontWeight: 700, color: "#F5F0E8" }}>
                  {c.name}
                </span>
              </div>
            ))}
          </div>

          <Link href="/evidence-map" style={{ display: "inline-block", background: "#4CBB17", color: "#0C0C0A", padding: "12px 24px", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
            Explore the Full Map &rarr;
          </Link>
        </div>
      </section>

      {/* ========== FEATURED ARTICLES ========== */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>Launch Articles</p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: 32, fontWeight: 700 }}>We Read The Papers</h2>
          </div>
          <Link href="/articles" className="hidden sm:block" style={{ fontSize: 14, color: "#4CBB17", textDecoration: "none" }}>
            All articles &rarr;
          </Link>
        </div>

        {/* Published articles (first 3) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {ARTICLES.slice(0, 3).map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group" style={{ display: "block", background: "#111110", border: "1px solid #1a1a18", textDecoration: "none", color: "inherit", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#4CBB17", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s" }} className="group-hover:!scale-x-100" />
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4CBB17" }}>{article.category}</span>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, color: "#2a2a28" }}>{article.readTime}</span>
                </div>
                <h3 className="group-hover:!text-[#4CBB17]" style={{ fontFamily: "var(--font-playfair)", fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 12, transition: "color 0.2s" }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 14, color: "#888", lineHeight: 1.6, marginBottom: 16 }}>{article.hook}</p>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, color: "#2a2a28" }}>{article.publishedDate}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon cards (articles 4-7) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginTop: 24 }}>
          {COMING_SOON.map((item) => (
            <div key={item.title} style={{ background: "#111110", border: "1px solid #1a1a18", padding: 24, opacity: 0.4 }}>
              <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2a2a28", marginBottom: 12 }}>COMING SOON</p>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 16, fontWeight: 700, color: "#555", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, color: "#2a2a28" }}>Publishing {item.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== MISSION ========== */}
      <section style={{ borderTop: "1px solid #1a1a18", borderBottom: "1px solid #1a1a18" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ maxWidth: 720 }}>
            <blockquote style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.3, color: "#F5F0E8", borderLeft: "4px solid #4CBB17", paddingLeft: 24, margin: "0 0 32px" }}>
              &ldquo;The anti-Goop. We read the papers.&rdquo;
            </blockquote>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "#888", fontSize: 15, lineHeight: 1.8 }}>
              <p>The wellness industry generates billions of dollars annually by attaching products to scientific claims that range from slightly overblown to completely fabricated. Nobody is systematically reading the papers and reporting what they actually say. WMG does that.</p>
              <p>We cite peer-reviewed research by name. Named researcher, journal, year, sample size. Every claim. Every article. No exceptions.</p>
              <p><strong style={{ color: "#F5F0E8" }}>Nonprofit structure. No ads. No courses. No agenda.</strong> Just journalism.</p>
            </div>
            <div style={{ marginTop: 32 }}>
              <Link href="/about" style={{ fontSize: 14, color: "#4CBB17", textDecoration: "none" }}>
                More about WMG &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section style={{ borderTop: "1px solid #1a1a18" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, marginBottom: 16 }}>
              The Weekly Dispatch
            </h2>
            <p style={{ color: "#888", fontSize: 18, marginBottom: 32, lineHeight: 1.6 }}>
              Every Tuesday. What the papers say. What the industry won&apos;t tell you. Free.
            </p>
            <NewsletterForm />
            <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#2a2a28", marginTop: 24 }}>
              NO SPAM &middot; NO BRAND PARTNERSHIPS &middot; UNSUBSCRIBE ANYTIME
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
