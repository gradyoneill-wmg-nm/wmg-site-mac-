"use client";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title + " — Watering My Grass"
  )}&url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`;

  return (
    <div className="flex items-center gap-4">
      <span style={{ fontFamily: "var(--font-space-mono)", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2a2a28" }}>
        SHARE
      </span>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, color: "#555", textDecoration: "none", letterSpacing: "0.1em" }}
      >
        Twitter/X
      </a>
      <button
        onClick={copyLink}
        style={{ fontFamily: "var(--font-space-mono)", fontSize: 10, color: copied ? "#4CBB17" : "#555", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}
      >
        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}
