"use client";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";

export default function ArticleSchumann() {
  return (
    <>
      <ReadingProgress />
      <article className="pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-4">
            Atmospheric Physics · Neuroscience
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-black leading-tight tracking-[-2px] mb-6">
            The Earth Resonates at 7.83Hz. Here&apos;s What the Science Actually Says.
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wmg-dim mb-8">
            BY WMG EDITORIAL · Schumann, Z. Naturforsch., 1952 · Williams, Science, 1992
          </p>
          <div className="border-l-2 border-wmg-green pl-6 mb-12">
            <p className="text-xl text-wmg-cream leading-relaxed font-display italic">
              In 1952, a German physicist named Winfried Otto Schumann published a theoretical calculation predicting that the cavity between the Earth&apos;s surface and its ionosphere would resonate at approximately 7.83Hz. He was right. That number has since become one of the most cited — and most distorted — figures in wellness. WMG separates the physics from the mythology.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Physics Is Real</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              Schumann resonances are real, measurable electromagnetic phenomena. Schumann predicted them in 1952 (Z. Naturforsch. A, 7, 149–154). Königsberg physicist Herbert König confirmed them experimentally in the mid-1950s. The fundamental frequency is approximately 7.83Hz, with overtones at ~14.3, 20.8, 27.3, and 33.8Hz.
            </p>
            <p className="text-wmg-dim leading-relaxed mb-6">
              The mechanism: the Earth&apos;s surface and ionosphere form an enormous spherical cavity. Approximately 2,000 thunderstorms are active at any given moment globally, generating ~50 lightning strikes per second. This continuous electromagnetic energy bounces around the cavity, creating standing waves at the resonant frequencies. Williams (1992), published in <em>Science</em> 256, 1184–1187, documented Schumann resonances as a reliable proxy for global tropical temperature — they are actively used in climate modeling, ionospheric studies, and lightning monitoring.
            </p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Brainwave Overlap</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              The wellness industry&apos;s interest in Schumann resonances stems from one observation: the fundamental frequency (7.83Hz) sits at the boundary between theta (4–8Hz) and alpha (8–12Hz) brainwave bands. König (1974), in <em>Unsichtbare Umwelt</em>, first noted this frequency overlap and proposed it might be biologically significant.
            </p>
            <p className="text-wmg-dim leading-relaxed mb-6">
              This is where the evidence becomes preliminary and contested. The amplitude of Schumann resonances at the Earth&apos;s surface is approximately 1 picotesla. By comparison, transcranial magnetic stimulation — which demonstrably affects brain activity — operates at ~1 Tesla. That is a difference of one trillion. The amplitude gap is the central scientific challenge for any proposed direct neurological mechanism.
            </p>
            <p className="text-wmg-dim leading-relaxed mb-6">
              Some researchers have proposed indirect mechanisms — circadian rhythm entrainment, melatonin pathway effects — that do not require direct electromagnetic coupling. These hypotheses have not been confirmed in controlled human studies.
            </p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What the Research Does Not Support</h2>
            <ul className="text-wmg-dim leading-relaxed mb-6 space-y-2 list-none pl-0">
              {[
                ['"The Earth\'s heartbeat / bodies need it"', 'No peer-reviewed origin for this framing. No evidence of adverse health effects from Schumann resonance shielding (submarines, bunkers, Faraday cages operate fine without SR exposure).'],
                ['"7.83Hz entrains brainwaves"', 'The amplitude gap is decisive. No demonstrated biophysical mechanism at natural SR intensities.'],
                ['"SR is changing/spiking"', 'The fundamental frequency is stable — determined by the physical size of the Earth-ionosphere cavity. Social media claims misread amplitude fluctuations in harmonic data as frequency shifts.'],
                ['"Grounding connects you to Schumann resonance"', 'Chevalier et al. (2012) — the most-cited earthing study — was authored by researchers holding earthing product patents. The proposed electron transfer mechanism does not connect to Schumann resonance.'],
                ['"NASA installs SR generators in spacecraft"', 'No verifiable NASA publication, report, or patent supports this claim.'],
              ].map(([claim, reality]) => (
                <li key={claim} className="border border-wmg-border p-4">
                  <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest block mb-1">Not supported</span>
                  <span className="text-wmg-cream text-sm">{claim}</span>
                  <span className="text-wmg-dim text-sm block mt-1">→ {reality}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">WMG Standard</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              Schumann resonances are real physics, rigorously documented and actively used in atmospheric science. The brainwave frequency overlap is real. The proposed biological mechanisms are speculative and face significant amplitude-based objections. The wellness industry has monetized the overlap without funding the research that would resolve the question. WMG says so.
            </p>
            <p className="text-wmg-dim leading-relaxed mb-6">
              7.83Hz is real. Your brain&apos;s alpha frequencies are real. Whether they interact in any meaningful biological sense — that is an open question. The honest position is to say so, clearly, every time.
            </p>

            <div className="border border-wmg-border p-6 mt-12">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-green mb-3">Citations</p>
              <ul className="text-wmg-dim text-sm space-y-2 font-mono">
                <li>Schumann, W.O. (1952). Über die strahlungslosen Eigenschwingungen einer leitenden Kugel. <em>Z. Naturforsch. A</em> 7, 149–154.</li>
                <li>Williams, E.R. (1992). The Schumann resonance: a global tropical thermometer. <em>Science</em> 256, 1184–1187.</li>
                <li>König, H.L. (1974). <em>Unsichtbare Umwelt</em>. München: Moos.</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-wmg-border">
            <Link href="/articles" className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green hover:underline">
              ← All Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
