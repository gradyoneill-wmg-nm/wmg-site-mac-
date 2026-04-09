'use client';

const WORDS = ['Read', 'the', 'papers.'];

export default function StaggeredHeadline() {
  return (
    <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(60px, 8vw, 100px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-3px", marginBottom: 8 }}>
      {WORDS.map((word, i) => (
        <span
          key={i}
          className="staggered-word"
          style={{ animationDelay: `${i * 0.06}s`, marginRight: i < WORDS.length - 1 ? '0.3em' : 0 }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}
