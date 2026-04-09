"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES } from "@/lib/notion";
import NewsletterForm from "@/components/NewsletterForm";

/* Deterministic hash from slug for fake numbers */
function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const FAKE_COMMENTS: Record<string, string> = {
  "wim-hof":
    "The Kox study is solid but N=24 is still small. Has anyone seen the follow-up work from Radboud? I think there was a 2019 replication attempt that...",
  "schumann-resonance":
    "I bought a Schumann generator off Amazon before reading this. Returning it. The Pobachenko study is interesting but the sample size is tiny and...",
  "copper-inflammation":
    "My grandmother wore a copper bracelet for 40 years and swore by it. Walker 1979 is fascinating but the fact that nobody has funded a follow-up...",
  "red-light-therapy":
    "The cytochrome c oxidase mechanism is legit but the consumer panels are nowhere near the parameters used in the Hamblin studies. Most panels are...",
  "hrv-oversold":
    "I stopped checking my HRV every morning after reading this. The day-to-day noise is real. Trends over weeks are what matter according to Thayer...",
  "meditation-app-claims":
    "The Goyal meta-analysis is the gold standard here. Moderate evidence for anxiety and depression. But the apps claim way more than that and...",
  "cold-plunge-industry":
    "I was about to spend $8k on a plunge pod. A cold shower is free. The Bleakley meta-analysis did not use luxury hardware. The science does not...",
};

const STATS = [
  "847 READERS",
  "7 ARTICLES",
  "124 COMMENTS",
  "0 ADS",
  "0 BRAND PARTNERSHIPS",
];

export default function CommunityPage() {
  const [tipForm, setTipForm] = useState({
    claim: "",
    evidence: "",
    sourceUrl: "",
    email: "",
  });
  const [tipStatus, setTipStatus] = useState<"idle" | "success">("idle");

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("wmg_tips") || "[]");
    existing.push({ ...tipForm, submittedAt: new Date().toISOString() });
    localStorage.setItem("wmg_tips", JSON.stringify(existing));
    setTipStatus("success");
    setTipForm({ claim: "", evidence: "", sourceUrl: "", email: "" });
  };

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
            CROWDSOURCED WELLNESS JOURNALISM
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              marginBottom: 16,
            }}
          >
            The Community
          </h1>
          <p style={{ color: "#888", fontSize: 20, maxWidth: 560, lineHeight: 1.6 }}>
            Read the papers together. No gurus. No influencers. Just evidence.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: "#4CBB17", padding: "14px 0" }}>
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0,
          }}
        >
          {STATS.map((stat, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#0C0C0A",
                  fontWeight: 700,
                }}
              >
                {stat}
              </span>
              {i < STATS.length - 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 1,
                    height: 16,
                    background: "#0C0C0A",
                    margin: "0 20px",
                    opacity: 0.3,
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Live discussions */}
      <section className="border-b border-wmg-border">
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
            LIVE DISCUSSIONS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 32,
              fontWeight: 900,
              marginBottom: 32,
            }}
          >
            What the community is reading
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 24,
            }}
          >
            {ARTICLES.map((article) => {
              const h = hashCode(article.slug);
              const commentCount = (h % 31) + 3;
              const readingNow = (h % 12) + 2;
              const fakeComment =
                FAKE_COMMENTS[article.slug] ||
                "This article changed how I think about the evidence. The citation standard makes it easy to verify...";
              const preview =
                fakeComment.length > 120
                  ? fakeComment.slice(0, 120) + "..."
                  : fakeComment;

              return (
                <div
                  key={article.slug}
                  style={{
                    background: "#111110",
                    border: "1px solid #1a1a18",
                    padding: 24,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 9,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#4CBB17",
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 10,
                        color: "#0C0C0A",
                        background: "#4CBB17",
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      {commentCount}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: 20,
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: 12,
                    }}
                  >
                    {article.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      fontStyle: "italic",
                      color: "#888",
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    &ldquo;{preview}&rdquo;
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        color: "#555",
                        textTransform: "uppercase",
                      }}
                    >
                      {readingNow} people reading now
                    </span>
                    <Link
                      href={`/articles/${article.slug}#comments`}
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 11,
                        color: "#4CBB17",
                        textDecoration: "none",
                      }}
                    >
                      Join the discussion &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reader tip submission */}
      <section className="border-b border-wmg-border" style={{ background: "#111110" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 40,
              fontWeight: 900,
              marginBottom: 8,
            }}
          >
            Got a story?
          </h2>
          <p style={{ color: "#888", fontSize: 15, lineHeight: 1.7, marginBottom: 32, maxWidth: 560 }}>
            Robin reviews every tip. Named researcher + journal + year + sample size.
            That&apos;s the bar.
          </p>

          {tipStatus === "success" ? (
            <div
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 13,
                color: "#4CBB17",
                padding: "24px 0",
              }}
            >
              Submitted. Robin reviews all tips. If it clears the sourcing bar, it
              becomes an article.
            </div>
          ) : (
            <form
              onSubmit={handleTipSubmit}
              style={{ display: "grid", gap: 16, maxWidth: 560 }}
            >
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  What&apos;s the claim?
                </label>
                <input
                  type="text"
                  value={tipForm.claim}
                  onChange={(e) =>
                    setTipForm({ ...tipForm, claim: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    background: "#0C0C0A",
                    border: "1px solid #1a1a18",
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Where&apos;s the evidence?
                </label>
                <textarea
                  value={tipForm.evidence}
                  onChange={(e) =>
                    setTipForm({ ...tipForm, evidence: e.target.value })
                  }
                  required
                  rows={4}
                  style={{
                    width: "100%",
                    background: "#0C0C0A",
                    border: "1px solid #1a1a18",
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#fff",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Source URL
                </label>
                <input
                  type="url"
                  value={tipForm.sourceUrl}
                  onChange={(e) =>
                    setTipForm({ ...tipForm, sourceUrl: e.target.value })
                  }
                  placeholder="https://pubmed.ncbi.nlm.nih.gov/..."
                  style={{
                    width: "100%",
                    background: "#0C0C0A",
                    border: "1px solid #1a1a18",
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={tipForm.email}
                  onChange={(e) =>
                    setTipForm({ ...tipForm, email: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    background: "#0C0C0A",
                    border: "1px solid #1a1a18",
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "#4CBB17",
                  color: "#0C0C0A",
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  width: "fit-content",
                }}
              >
                Submit Tip
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Community guidelines */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <p
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: 12,
              color: "#555",
              lineHeight: 1.8,
              maxWidth: 720,
            }}
          >
            <strong style={{ color: "#888" }}>THE RULES:</strong> Be specific.
            Cite sources if you have them. No personal attacks. No selling. No
            gurus. No &ldquo;studies show&rdquo; without naming the study. This is
            journalism, not a forum.
          </p>
        </div>
      </section>

      {/* Weekly digest */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 32,
                fontWeight: 900,
                marginBottom: 12,
              }}
            >
              The Weekly Dispatch
            </h2>
            <p
              style={{
                color: "#888",
                fontSize: 16,
                marginBottom: 32,
                lineHeight: 1.6,
              }}
            >
              Every Tuesday. What the research says. What the community found.
            </p>
            <NewsletterForm />
            <p
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 8,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#2a2a28",
                marginTop: 24,
              }}
            >
              NO SPAM &middot; NO BRAND PARTNERSHIPS &middot; UNSUBSCRIBE ANYTIME
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
