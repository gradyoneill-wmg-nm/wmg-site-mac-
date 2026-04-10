"use client";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";

export default function ArticleBreathwork() {
  return (
    <>
      <ReadingProgress />
      <article className="pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-4">
            Autonomic Nervous System · Clinical Research
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-black leading-tight tracking-[-2px] mb-6">
            Breathwork: What the Clinical Evidence Actually Shows
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wmg-dim mb-8">
            BY WMG EDITORIAL · Balban et al., Nature, 2023 · N=114 · Kox et al., PNAS, 2014 · N=24
          </p>
          <div className="border-l-2 border-wmg-green pl-6 mb-12">
            <p className="text-xl text-wmg-cream leading-relaxed font-display italic">
              You breathe 20,000 times a day without thinking. When you breathe deliberately — slowly, in patterns — something measurable happens to your autonomic nervous system. The science is clearer than the wellness industry lets on. And the mechanism costs nothing.
            </p>
          </div>

          <div className="space-y-8 text-wmg-dim leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">The Autonomic Connection</h2>
              <p>Breathing rate is the only autonomic function you can control voluntarily. Slow breathing (4–6 breaths per minute, versus the normal 12–18) activates the parasympathetic nervous system through baroreceptor stimulation and vagal afferent signaling. Heart rate variability increases. Cortisol decreases. This is not speculative — it is the mechanism underlying clinical effects found across every major breathwork tradition.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">The 2023 Nature Study</h2>
              <p>Balban et al. (2023), Nature Human Behaviour, N=114: compared three breathwork protocols — cyclic sighing (extended exhale), box breathing (4-4-4-4), and cyclic hyperventilation — against mindfulness meditation over 28 days. Cyclic sighing produced the greatest improvements in mood and physiological arousal markers of all four conditions. The extended exhale was the active ingredient.</p>
              <p className="mt-4">The mechanism: a longer exhale relative to inhale increases vagal tone. The vagus nerve is the primary parasympathetic pathway — longer exhales are a direct physiological input into the calming system. This is demonstrable, repeatable, and free.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">Box Breathing</h2>
              <p>The 4-4-4-4 pattern (inhale 4 counts, hold 4, exhale 4, hold 4) used by Navy SEALs is primarily a CO₂ tolerance training tool. A 2020 study in Frontiers in Psychology found box breathing reduced sympathetic activation and improved performance under acute stress in military personnel. The mechanism: controlled CO₂ retention shifts the balance point of the respiratory drive, increasing tolerance for the metabolic byproduct that triggers panic responses.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">Pranayama: The Research Base</h2>
              <p>A 2019 systematic review in the Journal of Alternative and Complementary Medicine (Zou et al., 15 RCTs) found significant reductions in anxiety, blood pressure, and cortisol across pranayama studies. The effect sizes were real. The mechanistic pathway — slow breathing → increased HRV → parasympathetic activation → reduced cortisol — is well characterized.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">Tummo and the Wim Hof Mechanism</h2>
              <p>The Wim Hof Method&apos;s hyperventilation protocol works through a different mechanism entirely. Rapid breathing drops CO₂, creating respiratory alkalosis, which triggers adrenaline release. Kox et al. (2014), PNAS, N=24, found this adrenaline response mediates the immune-suppressing effects. Tibetan Tummo breathing (Kozhevnikov et al., PLOS ONE, 2013) produces measurable body temperature increases through a related but distinct mechanism involving core muscle contractions combined with breath retention.</p>
              <p className="mt-4">These are not the same mechanism as slow-breathing parasympathetic activation. Breathwork techniques work through different physiological pathways. Conflating them is how the wellness industry creates confusion.</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white mb-4">WMG Standard</h2>
              <p>Breathwork is one of the best-evidenced, lowest-cost wellness interventions in the literature. The mechanisms are understood. The clinical evidence is real. The specific effect depends entirely on the specific technique — slow breathing activates the vagus nerve; fast breathing raises adrenaline. Different inputs, different outputs. The wellness industry rarely explains the difference. WMG does.</p>
            </section>

            <div className="border border-wmg-border p-6 mt-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-green mb-3">Citations</p>
              <ul className="text-sm space-y-2 font-mono">
                <li>Balban et al. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. <em>Nature Human Behaviour</em> 7, 44–56.</li>
                <li>Kox et al. (2014). Voluntary activation of the sympathetic nervous system. <em>PNAS</em> 111(20), 7379–7384.</li>
                <li>Kozhevnikov et al. (2013). Neurocognitive and somatic components of temperature increases during g-tummo meditation. <em>PLOS ONE</em> 8(3).</li>
                <li>Zou et al. (2019). Yoga-based respiratory practices improve mood and reduce anxiety. <em>JACM</em> 25(10), 1001–1008.</li>
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

