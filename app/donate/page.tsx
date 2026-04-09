"use client";

import { useState } from "react";

const TIERS = [
  {
    amount: "$5/mo",
    description: "Keeps one article's citations verified per month",
  },
  {
    amount: "$10/mo",
    description: "Funds Robin's weekly research cycle",
  },
  {
    amount: "$25/mo",
    description: "Funds one new article from pitch to publish",
  },
];

const BUTTONS = ["$5/mo", "$10/mo", "$25/mo", "$50/mo", "One-time"];

export default function DonatePage() {
  const [message, setMessage] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = (label: string) => {
    setMessage(`Stripe checkout coming soon. Selected: ${label}.`);
  };

  const handleCustomDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAmount) return;
    setMessage(`Stripe checkout coming soon. Custom amount: $${customAmount}.`);
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
            SUPPORT INDEPENDENT JOURNALISM
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
            Keep the Papers Free
          </h1>
          <p
            style={{
              color: "#888",
              fontSize: 20,
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            WMG is nonprofit. No ads. No brand partnerships. Reader support is the
            only thing that makes this possible.
          </p>
        </div>
      </section>

      {/* What your money does */}
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
            WHAT YOUR MONEY DOES
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              marginTop: 24,
            }}
          >
            {TIERS.map((tier) => (
              <div
                key={tier.amount}
                style={{
                  background: "#111110",
                  border: "1px solid #1a1a18",
                  padding: 32,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 36,
                    fontWeight: 900,
                    color: "#4CBB17",
                    marginBottom: 12,
                  }}
                >
                  {tier.amount}
                </p>
                <p style={{ color: "#888", fontSize: 15, lineHeight: 1.6 }}>
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fractured Atlas */}
      <section
        className="border-b border-wmg-border"
        style={{ background: "#111110" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                width: 200,
                height: 60,
                border: "1px solid #1a1a18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 9,
                  color: "#555",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                FRACTURED ATLAS LOGO
              </span>
            </div>
            <p
              style={{
                color: "#888",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 560,
              }}
            >
              WMG is fiscally sponsored by Fractured Atlas, a 501(c)(3) nonprofit.
              Your donation is tax-deductible.
            </p>
          </div>
        </div>
      </section>

      {/* Donation buttons */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 32,
                fontWeight: 900,
                marginBottom: 32,
              }}
            >
              Choose your level
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {BUTTONS.map((label) => (
                <button
                  key={label}
                  onClick={() => handleDonate(label)}
                  style={{
                    background: "#4CBB17",
                    color: "#0C0C0A",
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "16px 8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <form
              onSubmit={handleCustomDonate}
              style={{
                display: "flex",
                gap: 12,
                maxWidth: 320,
                margin: "0 auto",
                marginBottom: 24,
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <span
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#555",
                    fontSize: 14,
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Custom"
                  style={{
                    width: "100%",
                    background: "#111110",
                    border: "1px solid #1a1a18",
                    padding: "12px 16px 12px 28px",
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
                  whiteSpace: "nowrap",
                }}
              >
                Donate
              </button>
            </form>

            {/* Message */}
            {message && (
              <p
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 13,
                  color: "#4CBB17",
                  marginBottom: 24,
                }}
              >
                {message}
              </p>
            )}

            <p
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 11,
                color: "#555",
                letterSpacing: "0.1em",
              }}
            >
              Every dollar goes to journalism.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
