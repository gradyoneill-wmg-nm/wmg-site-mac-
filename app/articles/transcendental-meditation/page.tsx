"use client";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";

export default function ArticleTM() {
  return (
    <>
      <ReadingProgress />
      <article className="pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-4">
            Meditation Research · Cardiovascular Science
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-black leading-tight tracking-[-2px] mb-6">
            Transcendental Meditation: $2,500 for Instruction. What Does the Science Say?
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wmg-dim mb-8">
            BY WMG EDITORIAL · Schneider et al., Circulation, 2012 · N=201 · AHA Scientific Statement, 2013
          </p>
          <div className="border-l-2 border-wmg-green pl-6 mb-12">
            <p className="text-xl text-wmg-cream leading-relaxed font-display italic">
              TM charges $1,000–$2,500 for instruction. It has also generated more peer-reviewed cardiovascular research than almost any other meditation technique — including a 2013 American Heart Association statement recommending it for blood pressure reduction. The price and the evidence are both real. WMG reads both.
            </p>
          </div>

          <div className="space-y-8 text-wmg-dim leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">What TM Actually Is</h2>
              <p>Transcendental Meditation is a mantra-based technique developed by Maharishi Mahesh Yogi in the 1950s, derived from Vedic tradition. Practitioners silently repeat a personalized, meaningless sound for 20 minutes twice daily. The technique is taught one-on-one by certified instructors — the cost covering the instruction, not the practice itself. Once learned, it is free to practice indefinitely.</p>
              <p className="mt-4">The commercial structure has attracted sustained criticism. The organization&apos;s legal defense of its proprietary status has limited independent replication. These are legitimate concerns. They are separate from whether the technique produces measurable biological effects.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">The Cardiovascular Evidence</h2>
              <p>Schneider et al. (2012), Circulation: Cardiovascular Quality and Outcomes, N=201: a randomized controlled trial found TM practice reduced composite cardiovascular events — heart attack, stroke, death — by 48% in high-risk African American patients over 5.4 years, compared to health education controls. This is a large effect size in a rigorous design. The American Heart Association reviewed this body of evidence and issued a 2013 scientific statement concluding TM may be considered for clinical practice for blood pressure reduction.</p>
              <p className="mt-4">The AHA is conservative and evidence-demanding. This is not fringe endorsement.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">The Brain Evidence</h2>
              <p>EEG studies consistently show TM produces frontal alpha coherence — synchronized alpha wave activity across the prefrontal cortex — distinct from eyes-closed rest and other meditation techniques. Travis & Shear (2010), Consciousness and Cognition, reviewed 38 EEG meditation studies and found TM uniquely associated with this frontal coherence pattern, contrasted with focused attention (increased gamma) and open monitoring (increased theta) approaches.</p>
              <p className="mt-4">A 2016 study in Frontiers in Psychology found TM reduced PTSD symptoms in veterans more than standard PTSD treatment alone (N=74). A 2014 study in Brain and Cognition found TM practitioners showed greater divergent thinking performance than controls.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">The Conflicts of Interest</h2>
              <p>Most TM research is funded by organizations affiliated with the TM movement. Schneider&apos;s institute is part of Maharishi University. This is a legitimate methodological concern — not a disqualifier, but a reason for independent replication. The 48% cardiovascular event reduction finding has not been independently replicated at scale. The AHA acknowledged the funding source in its statement while still recommending the technique.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">WMG Standard</h2>
              <p>TM is one of the most evidence-rich meditation techniques in the literature. The cardiovascular data is real. The conflicts of interest are real. The price does not invalidate the science, and the science does not justify the price. WMG holds both simultaneously, which is the only honest position.</p>
            </section>

            <div className="border border-wmg-border p-6 mt-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-green mb-3">Citations</p>
              <ul className="text-sm space-y-2 font-mono">
                <li>Schneider et al. (2012). Stress reduction in the secondary prevention of cardiovascular disease. <em>Circulation: CVD Quality and Outcomes</em> 5(6), 750–758.</li>
                <li>Brook et al. (2013). Beyond medications and diet: AHA scientific statement on TM. <em>Hypertension</em> 61(6), 1360–1383.</li>
                <li>Travis & Shear (2010). Focused attention, open monitoring and automatic self-transcending. <em>Consciousness and Cognition</em> 19(4), 1110–1118.</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-wmg-border">
            <Link href="/articles" className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green hover:underline">← All Articles</Link>
          </div>
        </div>
      </article>
    </>
  );
}

