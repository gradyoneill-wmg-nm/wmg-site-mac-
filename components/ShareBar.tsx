'use client';
import { useState } from 'react';

interface ShareBarProps {
  title: string;
  slug: string;
}

export default function ShareBar({ title, slug }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://wateringmygrass.com/articles/${slug}`;

  const shareTwitter = () => {
    const text = encodeURIComponent(`${title} — Watering My Grass`);
    const u = encodeURIComponent(url);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${u}`, '_blank', 'noopener');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-ghost">Share</span>
      <button
        onClick={shareTwitter}
        className="font-mono text-[10px] uppercase tracking-[0.1em] text-wmg-dim hover:text-wmg-green transition-colors"
        aria-label="Share on X"
      >
        X / Twitter
      </button>
      <button
        onClick={copyLink}
        className="font-mono text-[10px] uppercase tracking-[0.1em] text-wmg-dim hover:text-wmg-green transition-colors"
        aria-label="Copy link"
      >
        {copied ? 'Copied' : 'Copy Link'}
      </button>
    </div>
  );
}
