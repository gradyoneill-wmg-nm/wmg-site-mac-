'use client';

const BANNED_WORDS = [
  "Journey",
  "Holistic",
  "Align",
  "Heal",
  "Energy",
  "Vibe",
  "Synergy",
  "Cleanse",
  "Detox",
];

export default function BannedWordsSection() {
  return (
    <section className="border-b border-wmg-border bg-wmg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-3xl font-bold mb-2">
          WMG Voice
        </h2>
        <p className="text-[#888] mb-6 max-w-2xl">
          Direct. Not hostile. Not smug. Not preachy. Here&apos;s what&apos;s real, here&apos;s what&apos;s hype, you decide.
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-dim mb-4">
          Banned Words — hover to strike
        </p>
        <div className="flex flex-wrap gap-3">
          {BANNED_WORDS.map((w) => (
            <span
              key={w}
              className="banned-word font-mono text-[11px] text-wmg-dim border border-wmg-border px-3 py-1.5 cursor-default"
            >
              {w}
            </span>
          ))}
        </div>
        <p className="font-mono text-[10px] text-wmg-ghost mt-4">
          Unless citing a specific compound.
        </p>
      </div>
    </section>
  );
}
