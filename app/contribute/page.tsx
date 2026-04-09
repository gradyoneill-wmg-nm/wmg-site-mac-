import type { Metadata } from "next";
import PitchForm from "./PitchForm";

export const metadata: Metadata = {
  title: "Write for WMG — Watering My Grass",
  description:
    "Pitch us. The bar is high. We like it that way. Named researcher + journal + year + sample size.",
};

const WHO_WE_PUBLISH = [
  { text: "Researchers with peer-reviewed publications", ok: true },
  { text: "Science journalists with sourcing standards", ok: true },
  { text: "Physicians with clinical experience and data", ok: true },
  { text: "Athletes with training data and methodology", ok: true },
  { text: "NOT influencers", ok: false },
  { text: "NOT brand partners", ok: false },
  {
    text: 'NOT anyone who says "studies show" without naming the study',
    ok: false,
  },
];

export default function ContributePage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#4CBB17",
              marginBottom: 12,
            }}
          >
            CONTRIBUTE
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              marginBottom: 16,
            }}
          >
            Write for WMG
          </h1>
          <p
            style={{
              color: "#888",
              fontSize: 20,
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Pitch us. The bar is high. We like it that way.
          </p>
        </div>
      </section>

      {/* The Standard reminder */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div
            style={{
              background: "#111110",
              borderLeft: "4px solid #4CBB17",
              padding: "32px 32px",
              maxWidth: 720,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontStyle: "italic",
                color: "#F5F0E8",
                lineHeight: 1.5,
              }}
            >
              Named researcher + journal + year + sample size. Every claim. No
              exceptions. If you can&apos;t clear this bar, we can&apos;t publish
              it.
            </p>
          </div>
        </div>
      </section>

      {/* Pitch form */}
      <section
        className="border-b border-wmg-border"
        style={{ background: "#111110" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#4CBB17",
              marginBottom: 12,
            }}
          >
            YOUR PITCH
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 32,
              fontWeight: 900,
              marginBottom: 32,
            }}
          >
            Send us your story
          </h2>
          <PitchForm />
        </div>
      </section>

      {/* Who we publish */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#4CBB17",
              marginBottom: 12,
            }}
          >
            WHO WE PUBLISH
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 32,
              fontWeight: 900,
              marginBottom: 32,
            }}
          >
            The sourcing bar
          </h2>
          <div style={{ maxWidth: 560 }}>
            {WHO_WE_PUBLISH.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  borderBottom: "1px solid #1a1a18",
                  padding: "14px 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 12,
                    color: item.ok ? "#4CBB17" : "#555",
                    flexShrink: 0,
                    width: 20,
                    textAlign: "center",
                  }}
                >
                  {item.ok ? "+" : "\u2013"}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 13,
                    color: item.ok ? "#F5F0E8" : "#555",
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
