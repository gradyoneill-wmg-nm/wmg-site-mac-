"use client";

import { useState } from "react";

export default function PitchForm() {
  const [form, setForm] = useState({
    pitch: "",
    source: "",
    name: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("wmg_pitches") || "[]");
    existing.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem("wmg_pitches", JSON.stringify(existing));
    setStatus("success");
    setForm({ pitch: "", source: "", name: "", email: "" });
  };

  if (status === "success") {
    return (
      <div
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: 13,
          color: "#4CBB17",
          padding: "24px 0",
        }}
      >
        We read every pitch. If it clears the standard, Rockbird will reach out.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
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
          Your pitch
        </label>
        <textarea
          value={form.pitch}
          onChange={(e) => setForm({ ...form, pitch: e.target.value })}
          required
          rows={5}
          placeholder="What's the story? What does the research say? What does the industry claim?"
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
          Your primary source
        </label>
        <input
          type="text"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          required
          placeholder="Researcher name, journal, year, N="
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
          Your name / publication
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
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
          Your email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
        Submit Pitch
      </button>
    </form>
  );
}
