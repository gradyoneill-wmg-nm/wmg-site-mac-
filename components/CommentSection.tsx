"use client";
import { useState } from "react";

interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

const SEED_COMMENTS: Record<string, Comment[]> = {
  "wim-hof": [
    {
      id: "1",
      name: "R. Torres",
      text: "Finally an article that distinguishes between the actual Kox study and the wellness industry hype. The 12-person sample size caveat is crucial and almost never mentioned.",
      timestamp: "April 18, 2026",
    },
    {
      id: "2",
      name: "M. Castillo",
      text: "I've been doing the breathing protocol for 6 months. Anecdotally: something is happening. But WMG is right that 'something is happening' and 'treat your arthritis with it' are very different claims.",
      timestamp: "April 18, 2026",
    },
  ],
  "schumann-resonance": [
    {
      id: "1",
      name: "K. Nakamura",
      text: "The K\u00F6nig (1974) citation is gold. Early real research on geomagnetic-brain correlations that gets lost in the noise of the pseudoscience crowd.",
      timestamp: "April 18, 2026",
    },
  ],
  "copper-inflammation": [
    {
      id: "1",
      name: "T. Williams",
      text: "The funding gap analysis is exactly right. There\u2019s no financial incentive to run the trial. This is the core problem with nutrition research in general.",
      timestamp: "April 18, 2026",
    },
    {
      id: "2",
      name: "J. Park",
      text: "My grandmother wore a copper bracelet for 40 years and swore by it. Walker (1979) is actually the study behind that. Would love to see a proper RCT.",
      timestamp: "April 18, 2026",
    },
  ],
};

interface Props {
  articleSlug: string;
  articleTitle: string;
}

export default function CommentSection({ articleSlug }: Props) {
  const seed = SEED_COMMENTS[articleSlug] || [];
  const [comments, setComments] = useState<Comment[]>(seed);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 400));
    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
    setComments((prev) => [...prev, newComment]);
    setName("");
    setText("");
    setStatus("success");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: 28, fontWeight: 700 }}>
          Community ({comments.length})
        </h2>
        <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 9, color: "#2a2a28", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Be specific. Cite sources.
        </span>
      </div>

      {comments.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
          {comments.map((c) => (
            <div key={c.id} style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#111110",
                  border: "1px solid #1a1a18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#555",
                  flexShrink: 0,
                }}
              >
                {c.name.charAt(0)}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: "#2a2a28" }}>{c.timestamp}</span>
                </div>
                <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: "#111110", border: "1px solid #1a1a18", padding: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Add your perspective</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (or initials)"
            required
            style={{
              width: "100%",
              background: "#0C0C0A",
              border: "1px solid #1a1a18",
              padding: "8px 12px",
              fontSize: 14,
              color: "#fff",
            }}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What does the evidence say? What's your experience?"
            required
            rows={4}
            style={{
              width: "100%",
              background: "#0C0C0A",
              border: "1px solid #1a1a18",
              padding: "8px 12px",
              fontSize: 14,
              color: "#fff",
              resize: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 11, color: "#2a2a28" }}>No ads. No BS. Just conversation.</p>
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: "#4CBB17",
                color: "#0C0C0A",
                padding: "8px 20px",
                fontFamily: "var(--font-space-mono)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              {status === "loading" ? "..." : status === "success" ? "Posted" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
