"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: wire to Resend / ConvertKit API
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div style={{ fontFamily: "var(--font-space-mono)", fontSize: 13, color: "#4CBB17" }}>
        You&apos;re in. First issue drops April 22.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          flex: 1,
          background: "#111110",
          border: "1px solid #1a1a18",
          padding: "12px 16px",
          fontSize: 14,
          color: "#fff",
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
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
          opacity: status === "loading" ? 0.6 : 1,
        }}
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
