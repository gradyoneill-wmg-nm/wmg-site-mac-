import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Subscribe — Watering My Grass",
  description: "Free weekly newsletter. What the science actually says.",
};

const DONATION_TIERS = ["$5/mo", "$10/mo", "$25/mo", "One-time"];

const SOCIAL_PROOF = [
  { quote: "Finally, a wellness publication that actually reads the papers instead of just citing 'studies show.'", location: "Reader in Brooklyn" },
  { quote: "I share these articles with patients. The citation standard is exactly what medical communication should look like.", location: "Physician in Chicago" },
  { quote: "I was spending $200/month on supplements based on Instagram claims. WMG helped me cut that to the three things that actually have evidence.", location: "Athlete in Austin" },
];

export default function SubscribePage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="font-display text-5xl sm:text-[80px] font-black mb-4 tracking-[-2px]">
            Read the Papers.
          </h1>
          <p style={{ color: "#888", fontSize: 20, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            Free weekly newsletter. What the science actually says.
          </p>
        </div>
      </section>

      {/* Subscriber count + Email form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 12, color: "#4CBB17", letterSpacing: "0.1em", marginBottom: 24 }}>
            Join 847 readers
          </p>
          <NewsletterForm />
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#2a2a28", marginTop: 24 }}>
            NO SPAM &middot; NO ADS &middot; NO AGENDA &middot; UNSUBSCRIBE ANYTIME
          </p>
        </div>
      </section>

      {/* Social proof quotes */}
      <section className="border-y border-wmg-border" style={{ background: "#0C0C0A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2a2a28", textAlign: "center", marginBottom: 32 }}>
            EARLY READERS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {SOCIAL_PROOF.map((item, i) => (
              <div key={i} style={{ borderLeft: "2px solid #1a1a18", paddingLeft: 16 }}>
                <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 13, fontStyle: "italic", color: "#888", lineHeight: 1.7, marginBottom: 12 }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#2a2a28" }}>
                  &mdash; {item.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-b border-wmg-border" style={{ background: "#111110" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="font-display text-3xl font-bold mb-10 text-center">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              "New articles every Tuesday",
              "Evidence Map updates as new research publishes",
              "Event invitations and community announcements",
            ].map((text, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-playfair)", fontSize: 40, fontWeight: 900, color: "#4CBB17", marginBottom: 12 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-display text-3xl font-bold mb-4">Support Independent Journalism</h2>
          <p style={{ color: "#888", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
            WMG is nonprofit. Reader support keeps us independent. No ads. No brand deals.
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: 40 }}>
            Tax-deductible via Fractured Atlas fiscal sponsorship
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DONATION_TIERS.map((label) => (
              <button
                key={label}
                style={{
                  border: "1px solid #4CBB17",
                  color: "#4CBB17",
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  padding: "16px 0",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
