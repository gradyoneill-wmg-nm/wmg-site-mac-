import type { Metadata } from "next";
import Link from "next/link";
import CitationChecker from "@/components/CitationChecker";
import BannedWordsSection from "@/components/BannedWordsSection";

export const metadata: Metadata = {
  title: "About — Watering My Grass",
  description:
    "A nonprofit wellness journalism publication based in New York City. Founded 2026.",
};

const TEAM = [
  {
    emoji: "\uD83D\uDC26",
    name: "Rockbird",
    role: "Editor-in-Chief",
    desc: "Owns all editorial output. Every article passes through her. Sets and enforces the citation standard.",
  },
  {
    emoji: "\uD83E\uDEB6",
    name: "Robin",
    role: "Research & Intelligence Analyst",
    desc: "Sources all leads. Fact-checks every article. Monitors PubMed, bioRxiv, FDA, FTC, ClinicalTrials.gov, and Reddit wellness communities.",
  },
  {
    emoji: "\uD83D\uDD2C",
    name: "Dr. Magic",
    role: "Director of Science",
    desc: "Audits all articles for scientific accuracy. Writes Frequency Library entries. Key areas: 40Hz, Schumann 7.83Hz, 432Hz, delta/theta/alpha.",
  },
  {
    emoji: "\uD83E\uDDA4",
    name: "Roadrunner",
    role: "Grants & Funding",
    desc: "Knight Foundation, Solutions Journalism Network, Robert Wood Johnson. Manages Fractured Atlas fiscal sponsorship.",
  },
  {
    emoji: "\uD83D\uDC26\u200D\u2B1B",
    name: "Raven",
    role: "Content Strategist",
    desc: "Distribution. Short-form video. NYC events. Guerrilla growth.",
  },
];

const EVIDENCE_LANGUAGE = [
  { tier: "Strong", color: "text-wmg-green", language: '"Research shows..." "Studies demonstrate..."' },
  {
    tier: "Preliminary",
    color: "text-wmg-orange",
    language: '"Preliminary research suggests..." "Correlational evidence indicates..."',
  },
  {
    tier: "Plausible / Untested",
    color: "text-wmg-blue",
    language: '"Biologically plausible, but untested at scale..."',
  },
  {
    tier: "Not Supported",
    color: "text-wmg-dim",
    language: '"Not supported by peer-reviewed evidence."',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-14">
      {/* 1. Hero with aboriginal dot painting */}
      <section className="border-b border-wmg-border dot-painting-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 relative z-[1]">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">
            ABOUT WMG
          </p>
          <h1 className="font-display text-5xl sm:text-[72px] font-black mb-4 tracking-[-2px]">
            Who We Are
          </h1>
          <p className="text-[#888] text-xl max-w-2xl leading-relaxed">
            A nonprofit wellness journalism publication based in New York City.
            Founded 2026.
          </p>
        </div>
      </section>

      {/* 2. Mission pull quote */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <blockquote className="font-display text-2xl sm:text-[28px] italic leading-snug text-wmg-cream border-l-4 border-wmg-green pl-6 max-w-3xl">
            &ldquo;The wellness industry generates billions by attaching products
            to scientific claims that range from slightly overblown to completely
            fabricated. Nobody is systematically reading the papers. We do.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* 3. The Citation Standard + Interactive Demo */}
      <section className="border-b border-wmg-border bg-wmg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="font-display text-4xl sm:text-[48px] font-black mb-6 tracking-[-1px]">
            The Standard
          </h2>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed mb-8">
            Every factual claim cites: named researcher + journal + year +
            sample size. No exceptions.
          </p>

          <div className="bg-wmg-black border border-wmg-border p-6 max-w-xl mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wmg-ghost mb-3">
              FORMAT
            </p>
            <p className="font-mono text-sm text-wmg-cream">
              Researcher et al., Journal Name, Year &middot; N=Sample
            </p>
          </div>

          <div className="bg-wmg-black border border-wmg-border border-l-4 border-l-wmg-green p-6 max-w-xl mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wmg-ghost mb-3">
              EXAMPLE
            </p>
            <p className="font-mono text-sm text-wmg-green">
              Kox et al., PNAS, 2014 &middot; N=24
            </p>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wmg-dim">
            This is the only format we accept.
          </p>

          {/* Interactive Citation Checker Demo */}
          <CitationChecker />
        </div>
      </section>

      {/* 4. Evidence Language Table */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="font-display text-3xl font-bold mb-8">
            Evidence Language
          </h2>
          <div className="space-y-0">
            {EVIDENCE_LANGUAGE.map((row) => (
              <div
                key={row.tier}
                className="flex flex-col sm:flex-row gap-4 border-b border-wmg-border py-4"
              >
                <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${row.color} w-40 shrink-0 pt-1`}>
                  {row.tier}
                </span>
                <span className="font-mono text-[13px] text-[#888]">
                  {row.language}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WMG Voice — Banned words with hover animation */}
      <BannedWordsSection />

      {/* 6. Conflict of Interest */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-[28px] font-bold mb-4">
            Conflict of Interest Disclosure
          </h2>
          <p className="text-[#888] text-base leading-relaxed max-w-2xl">
            Non Magic is a meditation app co-founded by WMG&apos;s founder. It is
            covered here according to the same citation standards applied to all
            subjects.
          </p>
        </div>
      </section>

      {/* 7. The Mascot */}
      <section className="border-b border-wmg-border bg-wmg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <span className="text-[96px] block mb-4">&#x1FAB2;</span>
          <h2 className="font-display text-3xl font-bold mb-2">The Mascot</h2>
          <p className="text-[#888] text-lg mb-2">
            A cockroach in an F1 helmet.
          </p>
          <p className="text-wmg-green font-display italic text-xl">
            Unkillable. Gets into everything. Reads the papers.
          </p>
        </div>
      </section>

      {/* 8. Team */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">
            THE TEAM
          </p>
          <h2 className="font-display text-3xl font-bold mb-10">
            Who Makes WMG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-wmg-surface border border-wmg-border p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{member.emoji}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-green">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#888] leading-relaxed">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Nonprofit Structure */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-display text-3xl font-bold mb-8">
            Nonprofit Structure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mb-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-dim mb-2">Status</p>
              <p className="text-[#888]">501(c)(3) application pending</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-dim mb-2">Fiscal Sponsor</p>
              <p className="text-[#888]">Fractured Atlas (active bridge)</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-dim mb-2">Advertising</p>
              <p className="text-[#888]">None. No brand partnerships. No courses.</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-dim mb-2">Revenue</p>
              <p className="text-[#888]">Reader donations + grants</p>
            </div>
          </div>
          <Link
            href="/subscribe"
            className="inline-block bg-wmg-green text-wmg-black px-6 py-3 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Support WMG &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
