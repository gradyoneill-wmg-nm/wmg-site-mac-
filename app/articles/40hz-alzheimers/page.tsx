"use client";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";

export default function Article40Hz() {
  return (
    <>
      <ReadingProgress />
      <article className="pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-4">
            Neuroscience · Alzheimer&apos;s Research
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-black leading-tight tracking-[-2px] mb-6">
            The 40Hz Question: What MIT&apos;s Research Actually Shows
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wmg-dim mb-8">
            BY WMG EDITORIAL · Iaccarino et al., Nature, 2016 · N=mouse model + human RCT
          </p>
          <div className="border-l-2 border-wmg-green pl-6 mb-12">
            <p className="text-xl text-wmg-cream leading-relaxed font-display italic">
              In 2016, MIT researchers flickered a light at 40 times per second at mice with Alzheimer&apos;s-like pathology. Amyloid plaque load dropped 40–50% in the visual cortex. The study was published in Nature. What followed was five years of the scientific community trying to figure out whether it was real — and what it might mean.
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Discovery</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              Iaccarino et al. (2016), published in <em>Nature</em> 540, 230–235, found that 40Hz visual flicker reduced amyloid-beta peptides 40–50% in the visual cortex of 5XFAD transgenic mice — a standard Alzheimer&apos;s research model. The researchers used 40Hz LED flickering, not audio. The effect was frequency-specific: 20Hz, 80Hz, and random flickering did not replicate the results.
            </p>
            <p className="text-wmg-dim leading-relaxed mb-6">
              The mechanism proposed: gamma oscillations (30–100Hz, peaking around 40Hz) are associated with attention, memory consolidation, and cognitive binding — the brain&apos;s process of integrating information across regions. Alzheimer&apos;s patients show reduced gamma power. The 40Hz flicker appeared to restore some of that gamma activity and activate microglia — the brain&apos;s immune cells — in ways that accelerated amyloid clearance.
            </p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Follow-Up Science</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              Martorell et al. (2019), <em>Cell</em> 177(2), 256–271: combined 40Hz auditory and visual stimulation entrained gamma across the hippocampus and prefrontal cortex — not just the visual cortex. Reduced both amyloid AND tau pathology in mice. Improved spatial memory. Effects required sustained sessions and diminished when stimulation stopped.
            </p>
            <p className="text-wmg-dim leading-relaxed mb-6">
              Adaikkan et al. (2019), <em>Neuron</em> 104(4), 691–710: documented long-term gamma stimulation effects, including vascular improvements and increased CSF clearance.
            </p>
            <p className="text-wmg-dim leading-relaxed mb-6">
              Cognito Therapeutics ran a human RCT of approximately 60 patients using a proprietary 40Hz light and sound device. The results showed reduced brain atrophy on MRI and less ventricular enlargement in the treatment group. There was no statistically significant improvement on the primary cognitive endpoints. The OVERTURE Phase 3 trial is ongoing. The FDA granted Breakthrough Device Designation — a regulatory pathway designation, not an efficacy endorsement.
            </p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">What the Research Does Not Show</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              The WMG standard requires us to state clearly what the evidence does not support:
            </p>
            <ul className="text-wmg-dim leading-relaxed mb-6 space-y-2 list-none pl-0">
              {[
                ['"40Hz light cures Alzheimer\'s"', 'No cognitive benefit demonstrated in humans yet. Mouse models only for efficacy.'],
                ['"Clears amyloid from the brain"', 'Shown in mouse visual cortex only. Human clearance unconfirmed.'],
                ['"Works after a single session"', 'Mouse reduction was transient. Effects require sustained sessions.'],
                ['"Any 40Hz device will work"', 'Precise parameters matter. Consumer devices are unvalidated against the research protocols.'],
              ].map(([claim, reality]) => (
                <li key={claim} className="border border-wmg-border p-4">
                  <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest block mb-1">Overclaim</span>
                  <span className="text-wmg-cream text-sm">{claim}</span>
                  <span className="text-wmg-dim text-sm block mt-1">→ {reality}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">The Open Questions</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              The OVERTURE trial is the key near-term data point. Independent replication is still needed for therapeutic claims specifically. Optimal dose and duration for humans is unknown. The 5XFAD mouse model has known limitations compared to human Alzheimer&apos;s progression.
            </p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">WMG Standard</h2>
            <p className="text-wmg-dim leading-relaxed mb-6">
              40Hz gamma research is among the most compelling neuroscience of the past decade. The mouse data is real. The human structural data is real. The cognitive outcome data is not yet there. Phase 3 is ongoing. WMG will report the OVERTURE results when they publish. Until then: the mechanism is plausible, the preclinical data is extraordinary, and the human efficacy question is genuinely open.
            </p>

            <div className="border border-wmg-border p-6 mt-12">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-green mb-3">Citations</p>
              <ul className="text-wmg-dim text-sm space-y-2 font-mono">
                <li>Iaccarino et al. (2016). Multi-sensory gamma stimulation ameliorates Alzheimer&apos;s-associated pathology and improves cognition. <em>Nature</em> 540, 230–235.</li>
                <li>Martorell et al. (2019). Multi-sensory gamma stimulation ameliorates Alzheimer&apos;s-associated pathology. <em>Cell</em> 177(2), 256–271.</li>
                <li>Adaikkan et al. (2019). Gamma entrainment binds higher-order brain regions and offers neuroprotection. <em>Neuron</em> 104(4), 691–710.</li>
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
