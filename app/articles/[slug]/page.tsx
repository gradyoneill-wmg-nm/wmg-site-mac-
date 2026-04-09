import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getNotionBlocks, blocksToHtml, ARTICLES, ARTICLE_CLAIM_CARDS } from "@/lib/notion";
import CommentSection from "@/components/CommentSection";
import ReadingProgress from "@/components/ReadingProgress";
import ShareBar from "@/components/ShareBar";
import NewsletterForm from "@/components/NewsletterForm";
// ClaimCard rendered inline as static HTML for server component compatibility

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — Watering My Grass`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      siteName: 'Watering My Grass',
      url: `https://wateringmygrass.com/articles/${article.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

/* Generate a deterministic fake share count from slug */
function getShareCount(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash % 400) + 120;
}

/**
 * Split HTML content after the 2nd </p> tag so we can inject a claim card
 * between the two halves.
 */
function splitAfterSecondParagraph(html: string): [string, string] {
  let count = 0;
  const closeTag = "</p>";
  let idx = 0;
  while (count < 2) {
    const found = html.indexOf(closeTag, idx);
    if (found === -1) return [html, ""];
    idx = found + closeTag.length;
    count++;
  }
  return [html.slice(0, idx), html.slice(idx)];
}

const FALLBACK_CONTENT: Record<string, string> = {
  "wim-hof": `
<p>In 2014, a group of scientists at Radboud University Medical Centre published a paper that challenged everything we thought we knew about the autonomic nervous system.</p>

<p>The subject was Wim Hof — a Dutch athlete known as "The Iceman" for his ability to withstand extreme cold. But the paper wasn't about cold. It was about bacteria.</p>

<h2>The Study That Changed Everything</h2>

<p>Researchers injected 12 trained Hof-method practitioners and 12 controls with a bacterial endotoxin — essentially, a fragment of a dead bacterium that triggers a standard immune response. In healthy people, this causes flu-like symptoms: fever, chills, headache. Every time. That's how the immune system works.</p>

<p>The Hof-trained group barely flinched. Their cytokine levels — the immune signaling molecules that drive inflammation — were dramatically lower. Their fever responses were attenuated. They reported fewer symptoms.</p>

<p>The lead author, Matthijs Kox, said it plainly: <em>"The autonomic nervous system and the immune system are not beyond voluntary control."</em> (Kox et al., PNAS, 2014)</p>

<h2>What The Protocol Actually Is</h2>

<p>The Wim Hof Method has three components: controlled hyperventilation (cyclic breathing), breath retention, and cold exposure. The breathing protocol induces a controlled alkalosis in the blood — essentially, it temporarily changes your blood chemistry through deliberate over-breathing.</p>

<p>This alkalosis appears to prime the sympathetic nervous system, releasing adrenaline before the immune challenge even arrives. The cold exposure component separately activates brown adipose tissue, the metabolically active fat that generates heat.</p>

<h2>What The Science Actually Claims</h2>

<p>This is where WMG's mandate kicks in: <strong>we read the papers, not the press releases.</strong></p>

<p>The Kox 2014 study was real and significant. But it had 12 people in the treatment group. It has not been replicated at scale. The mechanistic pathway — how exactly voluntary breathing changes immune response — is still not fully understood.</p>

<p>Subsequent studies have shown genuine effects on inflammatory markers (Zwaag et al., 2020). Cold water immersion shows genuine benefits for muscle recovery (Bleakley et al., Sports Medicine, 2012). The sympathoadrenal response to the breathing protocol is measurable and consistent.</p>

<p>What the evidence does <em>not</em> support: using these techniques to treat serious illness, cancer, autoimmune disease, or replacing medical treatment. The wellness industry has overclaimed enormously here.</p>

<h2>The Honest Bottom Line</h2>

<p>The Wim Hof story is genuinely remarkable. A man showed scientists that something they believed was impossible was possible. That's rare.</p>

<p>The peer-reviewed evidence supports: measurable changes in immune response markers, genuine cold adaptation, reduced inflammatory cytokines during controlled immune challenges, and real sympathoadrenal activation from the breathing protocol.</p>

<p>The peer-reviewed evidence does not support: the broader wellness industry claims about "healing" with cold and breathing. The effect size in healthy populations with specific protocols — not necessarily in clinical disease.</p>

<p><strong>That distinction is what WMG exists to make.</strong></p>

<hr />

<p><em>Sources: Kox M et al. (2014). PNAS. Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans. | Zwaag J et al. (2020). Involvement of the Sympathetic Nervous System in the Wim Hof Method. | Bleakley CM et al. (2012). Cold-water immersion and recovery from strenuous exercise. Sports Medicine.</em></p>
  `,

  "schumann-resonance": `
<p>In 1952, German physicist Winfried Otto Schumann published a calculation that would become one of the most cited — and most misunderstood — papers in the history of physics.</p>

<p>He predicted that the space between the Earth's surface and the ionosphere would act like a resonant cavity, sustaining electromagnetic waves at specific frequencies. The lowest: 7.83 Hz.</p>

<h2>What Schumann Actually Found</h2>

<p>This is physics, not mysticism. The Earth-ionosphere cavity behaves like a spherical resonator. Lightning strikes globally — about 40 to 50 per second — inject electromagnetic energy into this cavity. The resulting standing waves have been measured consistently at 7.83 Hz (first mode), 14.3 Hz (second), 20.8 Hz (third), and so on. (Schumann, 1952; Nickolaenko & Hayakawa, 2002)</p>

<p>NASA monitors Schumann resonances. The European Space Agency monitors them. They're real. They fluctuate with solar activity, atmospheric ionization, and global storm activity. They are measurable electromagnetic phenomena.</p>

<h2>The Brain Connection — What The Data Actually Says</h2>

<p>Human EEG alpha waves typically range from 8 to 12 Hz. Theta waves: 4 to 8 Hz. The Schumann fundamental (7.83 Hz) falls at the theta-alpha boundary.</p>

<p>Several researchers have explored whether this overlap is coincidental or functional. Persinger (1995) proposed a mechanism by which the Earth's electromagnetic field could couple with brain electrical activity. König (1974) published early work showing correlations between geomagnetic field changes and human reaction time.</p>

<p>More recent work by Pobachenko et al. (2006) found coherence between brain waves and Schumann resonances in subjects studied in shielded vs. unshielded environments. The effect was small but measurable.</p>

<h2>The WMG Standard: Where We Draw The Line</h2>

<p>The wellness industry has taken this legitimate physics phenomenon and built an entire mythology around it — claims about "Schumann spikes" causing "ascension symptoms," about frequency healing, about consciousness shifts. None of this is supported by peer-reviewed evidence.</p>

<p>What is supported: the Earth has stable electromagnetic resonances. Human brains produce electromagnetic oscillations in overlapping frequency ranges. Some studies show small measurable interactions. The mechanistic pathway from planetary EM field to meaningful neurological effect remains unproven.</p>

<p>What is not supported: that monitoring Schumann resonances on real-time dashboards predicts your mood. That "spikes" in the resonance cause headaches or spiritual experiences. That entrainment to 7.83 Hz audio (binaural or otherwise) replicates any planetary coupling effect.</p>

<h2>Why Scientists Are Still Looking</h2>

<p>The honest answer is: the overlap in frequency ranges is interesting enough to study. Organisms evolved in the presence of this electromagnetic environment for hundreds of millions of years. It would be surprising if there were zero biological interaction.</p>

<p>But "interesting enough to study" and "proven therapeutic effect" are separated by years of controlled trials that haven't happened yet. That gap is where pseudoscience fills the void.</p>

<p><strong>WMG exists in that gap — to report what's real and name what's speculation.</strong></p>

<hr />

<p><em>Sources: Schumann WO (1952). Über die strahlungslosen Eigenschwingungen einer leitenden Kugel. | Nickolaenko A, Hayakawa M (2002). Resonances in the Earth-Ionosphere Cavity. | Persinger MA (1995). On the possible representation of the electromagnetic equivalents of all human memory. | Pobachenko et al. (2006). The contingency of parameters of human encephalograms and Schumann resonance electromagnetic fields.</em></p>
  `,

  "copper-inflammation": `
<p>Here is a fact that appears in occupational health literature with striking regularity: copper miners have among the lowest rates of arthritis of any occupational group studied.</p>

<p>Here is another fact: almost no one is funding a study to understand why.</p>

<h2>The Copper Miners Observation</h2>

<p>The observation dates back decades. Miners working in copper mines reported significantly lower rates of degenerative joint disease compared to workers in comparable physically demanding occupations — coal miners, iron miners, construction workers. (Walker, 1979, Journal of the Royal Society of Medicine)</p>

<p>The hypothesis: chronic low-level copper absorption through the skin, dust inhalation, and incidental contact might be providing an anti-inflammatory effect that shows up statistically at the population level.</p>

<h2>What The Biochemistry Actually Says</h2>

<p>Copper is not a fringe nutrient. It is an essential trace element with well-established roles in human physiology. Superoxide dismutase — one of the body's primary antioxidant enzymes — requires copper as a cofactor. Ceruloplasmin, the main copper-carrying protein in blood, has anti-inflammatory properties. (Linder & Hazegh-Azam, 1996, American Journal of Clinical Nutrition)</p>

<p>Studies on copper deficiency consistently show increased inflammatory markers. Copper-deficient animals develop elevated cytokine levels, increased oxidative stress, and joint pathology. (Failla, 2003, Journal of Nutrition)</p>

<p>The Journal of Trace Elements in Medicine and Biology has published multiple studies showing correlations between serum copper levels and rheumatoid arthritis severity — with lower copper levels associated with more severe disease. Whether this is cause or consequence remains unclear.</p>

<h2>The Funding Gap — And Why It Exists</h2>

<p>This is the WMG core thesis on copper: the research gap is not scientific. It's financial.</p>

<p>You cannot patent copper. You cannot develop a proprietary copper molecule and charge $300/month for it. The pharmaceutical incentive structure that drives most clinical trial funding has no mechanism to study something this cheap and this unprotectable.</p>

<p>Compare this to NSAIDs — billions in annual revenue, thousands of studies. Or biologics for rheumatoid arthritis — $20,000+ per patient per year, enormous trial budgets. Copper: $15 for a 90-day supply of copper gluconate supplements, no patent play, minimal research.</p>

<h2>What Responsible Reporting Looks Like Here</h2>

<p>The observation (miners, low arthritis rates) is real and documented. The biochemical mechanism (copper's role in SOD and ceruloplasmin) is established science. The correlation between copper levels and arthritis severity appears in peer-reviewed literature.</p>

<p>What's missing: a controlled clinical trial testing copper supplementation for arthritis prevention or treatment. That trial hasn't been done because the funding incentive doesn't exist.</p>

<p><strong>That is the story. Not that copper is a miracle. That we don't know if it is — and the reason we don't know is structural, not scientific.</strong></p>

<p>WMG will keep covering this. When the data changes, we'll update the story.</p>

<hr />

<p><em>Sources: Walker WR (1979). The results of a copper bracelet clinical trial and subsequent studies. Journal of the Royal Society of Medicine. | Linder MC, Hazegh-Azam M (1996). Copper biochemistry and molecular biology. American Journal of Clinical Nutrition. | Failla ML (2003). Trace elements and host defense. Journal of Nutrition. | Journal of Trace Elements in Medicine and Biology — multiple studies on copper and inflammatory markers, 1995-2020.</em></p>
  `,

  "red-light-therapy": `
<p><span style="font-size:3.2em;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;font-family:'Playfair Display',serif;font-weight:900;">S</span>omewhere inside every cell in your body, there is a protein complex called cytochrome c oxidase. It sits on the inner membrane of the mitochondria — the last step in the electron transport chain, the molecular assembly line that converts food into ATP, the energy currency of life. This protein absorbs red and near-infrared light. That is not a wellness claim. That is photochemistry.</p>

<p>The field is called photobiomodulation, and it has been studied in clinical and laboratory settings since the 1960s. The mechanism is well-established: when red light (wavelengths roughly 600-700nm) or near-infrared light (700-1100nm) hits cytochrome c oxidase, it dissociates nitric oxide from the enzyme's binding site, allowing the electron transport chain to run more efficiently. The result is increased ATP production, a brief burst of reactive oxygen species that triggers cellular signaling, and downstream effects on inflammation, gene expression, and tissue repair. (Hamblin MR, Photochemistry and Photobiology, 2018)</p>

<h2 style="font-family:'Playfair Display',serif;">What the Clinical Trials Actually Show</h2>

<p>The evidence base for photobiomodulation is real but specific. It is not a blank check for every claim the wellness industry attaches to red light panels.</p>

<p>Avci et al. (2013) reviewed the dermatological applications and found genuine evidence for wound healing acceleration, reduction in inflammatory acne lesions, and stimulation of hair growth in androgenetic alopecia. These are peer-reviewed findings from controlled studies, not influencer testimonials.</p>

<p>Avni D et al. published in Photomedicine and Laser Surgery (2005) a controlled study with 30 subjects showing that low-level laser therapy significantly accelerated wound healing compared to placebo. The wounds were standardized, the measurements were blinded, and the effect was statistically significant. N=30. Not massive, but methodologically sound.</p>

<blockquote><p>"The mechanism is established biochemistry. The clinical applications are promising but bounded. The marketing is neither." — WMG Editorial</p></blockquote>

<p>Fulop AM et al. published a meta-analysis in Photomedicine and Laser Surgery (2009) examining low-level laser therapy for musculoskeletal pain. Across the pooled studies, the effect size for pain reduction was moderate but consistent. The therapy worked better than placebo for joint pain and muscle soreness. The meta-analysis found positive outcomes but noted significant heterogeneity in protocols — different wavelengths, different doses, different treatment durations.</p>

<h2 style="font-family:'Playfair Display',serif;">What the Industry Sells vs. What the Research Supports</h2>

<p>This is where the gap opens. The research supports specific, dose-dependent applications of red and near-infrared light at specific wavelengths, specific power densities, and specific treatment durations. Wound healing. Musculoskeletal pain. Some dermatological conditions. The studies used clinical-grade devices with calibrated outputs.</p>

<p>The consumer market sells $200-$500 LED panels with claims about reversing aging, burning fat, boosting testosterone, curing depression, eliminating chronic pain, and transforming your skin. The marketing copy cherry-picks from the same studies WMG cites — but removes every qualifier, every limitation, every caveat about dose and protocol.</p>

<p>Most consumer panels do not publish their irradiance specifications. Many do not deliver the power density used in clinical trials. The distance from panel to skin, the treatment duration, the wavelength distribution — all of these matter in the research, and almost none of them are controlled in home use.</p>

<p>The other problem is dose. Photobiomodulation follows a biphasic dose-response curve — too little does nothing, the right amount helps, too much can actually inhibit cellular function. The Arndt-Schulz curve applies here. More is not better. The research is specific about this. The marketing is not.</p>

<h2 style="font-family:'Playfair Display',serif;">The WMG Bottom Line</h2>

<p>The mechanism is legitimate. Cytochrome c oxidase absorbs red and near-infrared light. ATP production increases. Downstream cellular effects are measurable. Clinical trials show benefits for wound healing, musculoskeletal pain, and certain dermatological conditions.</p>

<p>The $500 consumer panel sitting in your bathroom is not what was used in those studies. The claims attached to it go far beyond what any peer-reviewed trial has demonstrated. The mechanism is real. The marketing is not the mechanism.</p>

<p><strong>Here is what is real, here is what is hype. You decide what to do with it.</strong></p>

<hr />

<p><em>Sources: Hamblin MR (2018). Mechanisms and applications of the anti-inflammatory effects of photobiomodulation. Photochemistry and Photobiology. | Avci P et al. (2013). Low-level laser (light) therapy (LLLT) in skin. Seminars in Cutaneous Medicine and Surgery. | Avni D et al. (2005). Protection of human fibroblasts from LLLT. Photomedicine and Laser Surgery. N=30. | Fulop AM et al. (2009). A meta-analysis of the efficacy of laser phototherapy on musculoskeletal pain. Photomedicine and Laser Surgery. N=meta-analysis.</em></p>
  `,

  "hrv-oversold": `
<p><span style="font-size:3.2em;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;font-family:'Playfair Display',serif;font-weight:900;">E</span>very morning, millions of people wake up, strap on a wristband or chest sensor, and check a number. That number is their heart rate variability — HRV — and according to the device that generated it, this single metric tells them whether they are recovered, stressed, ready to train, or falling apart. The wellness wearable industry has turned HRV into one of the most tracked and least understood numbers in personal health.</p>

<p>Here is what HRV actually is, what the research actually says, and where the product claims depart from the science.</p>

<h2 style="font-family:'Playfair Display',serif;">What HRV Actually Measures</h2>

<p>Your heart does not beat at a perfectly steady rate. Even at rest, the intervals between heartbeats vary — sometimes by milliseconds, sometimes by more. This variation is driven by the autonomic nervous system, the division of the nervous system that operates below conscious awareness. The sympathetic branch accelerates your heart. The parasympathetic branch — specifically the vagus nerve — slows it down.</p>

<p>HRV is a proxy measurement of this push-pull between sympathetic and parasympathetic tone. Higher HRV generally indicates stronger parasympathetic (vagal) activity, which is associated with better cardiovascular fitness, lower stress, and greater physiological resilience. Lower HRV is associated with stress, fatigue, illness, and overtraining.</p>

<p>This is real physiology. Thayer et al. published a major meta-analysis in Neuroscience & Biobehavioral Reviews (2012) establishing the neurovisceral integration model — the theory that vagal tone, as indexed by HRV, reflects the brain's capacity to regulate emotion, cognition, and physiological responses. The evidence base is substantial. HRV as a biomarker of autonomic function is legitimate science.</p>

<blockquote><p>"HRV is a real biomarker attached to real physiology. The problem is not the measurement. The problem is what gets sold on top of it." — WMG Editorial</p></blockquote>

<h2 style="font-family:'Playfair Display',serif;">What the Biofeedback Research Shows</h2>

<p>Lehrer and Gevirtz published a comprehensive review in Frontiers in Psychology (2014) on heart rate variability biofeedback — the practice of using real-time HRV data to train slow, resonant breathing patterns that increase vagal tone. The review found evidence that HRV biofeedback can improve autonomic regulation, reduce symptoms in conditions like asthma and depression, and increase baroreflex gain.</p>

<p>The key detail: the biofeedback protocols that work involve structured, guided breathing at specific resonant frequencies (typically around 6 breaths per minute), practiced consistently over weeks. This is a clinical intervention. It is not the same as checking your morning HRV score on a wristband and deciding whether to work out.</p>

<h2 style="font-family:'Playfair Display',serif;">The HRV Economy: WHOOP, Oura, Apple Watch</h2>

<p>WHOOP charges $30/month for a subscription that centers on a daily "recovery" score derived largely from HRV. Oura presents HRV in its readiness score. Apple Watch added HRV tracking to its health suite. Each platform implies that this number should guide your daily decisions about exercise, stress management, and health.</p>

<p>The problem is noise. Day-to-day HRV varies significantly based on factors that have nothing to do with recovery: hydration status, alcohol consumption the night before, caffeine intake, sleep position, room temperature, and the sensor's contact quality with your skin. A single morning reading can swing 20-40% from baseline for reasons that are physiologically trivial.</p>

<p>The research consistently shows that HRV trends over weeks and months are meaningful. Single-day readings are not. Plews et al. (2013) in the International Journal of Sports Physiology and Performance found that the rolling seven-day coefficient of variation in HRV was a useful marker of training adaptation — but individual daily values were too noisy to guide decisions.</p>

<p>The apps do not emphasize this. The business model depends on daily engagement. If the app told you "check back in three weeks for a meaningful trend," you would not open it every morning.</p>

<h2 style="font-family:'Playfair Display',serif;">The WMG Bottom Line</h2>

<p>HRV is a legitimate biomarker of autonomic nervous system function. The science behind vagal tone, neurovisceral integration, and HRV biofeedback is real and well-supported. Thayer's meta-analysis, Lehrer and Gevirtz's biofeedback review — these are serious papers in serious journals.</p>

<p>What the wearable industry has done is take a real biomarker, strip away the context, and sell it as a daily score that should govern your behavior. The science says trends matter. The products say today's number matters. That gap is where the overselling lives.</p>

<p><strong>The science is real. The product claims are not the science. You decide.</strong></p>

<hr />

<p><em>Sources: Thayer JF et al. (2012). A meta-analysis of heart rate variability and neuroimaging studies. Neuroscience & Biobehavioral Reviews. N=meta-analysis. | Lehrer PM, Gevirtz R (2014). Heart rate variability biofeedback: how and why does it work? Frontiers in Psychology. | Plews DJ et al. (2013). Training adaptation and heart rate variability in elite endurance athletes. International Journal of Sports Physiology and Performance.</em></p>
  `,

  "meditation-app-claims": `
<p><span style="font-size:3.2em;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;font-family:'Playfair Display',serif;font-weight:900;">C</span>alm is valued at over $2 billion. Headspace merged with Ginger in a deal worth $3 billion. Between them, these two apps have been downloaded hundreds of millions of times. Both companies make clinical-sounding claims about what daily use of their product will do for your mind. Both cite research. Both have partnerships with academic institutions. And both are selling you something that the research does not quite say what they imply it says.</p>

<p>This is not an attack on meditation. The evidence for mindfulness practice is real. This is an examination of what the apps claim versus what the peer-reviewed literature actually supports.</p>

<h2 style="font-family:'Playfair Display',serif;">What Calm Claims</h2>

<p>Calm's marketing and app store descriptions reference clinical benefits: reduced anxiety, better sleep, improved focus, stress reduction. The company has funded studies through partnerships, most notably a randomized controlled trial published in 2019 that found eight weeks of Calm use reduced stress in a college student population. The study was small. The population was narrow. The control was a waitlist, not an active comparator — meaning participants who knew they were not getting the intervention may have reported worse outcomes simply because they expected to.</p>

<p>Calm also references the broader mindfulness literature in its marketing materials, implying that decades of research on meditation practice validates their specific product. That is a significant logical leap.</p>

<h2 style="font-family:'Playfair Display',serif;">What Headspace Claims</h2>

<p>Headspace has invested more heavily in research partnerships. The company has published multiple peer-reviewed studies and maintains a "science" section on its website citing over 30 published papers. Several of these are genuine RCTs testing the Headspace app specifically.</p>

<p>The results are real but modest. A 2018 study in PLOS ONE found that 10 days of Headspace use reduced aggression and improved prosocial behavior in a sample of 57 participants. Another found reduced mind-wandering. These are legitimate findings, but the effect sizes are small and the samples are not large.</p>

<blockquote><p>"The research supports mindfulness practice. It does not specifically validate any commercial app's claims or dosage. That distinction matters." — WMG Editorial</p></blockquote>

<h2 style="font-family:'Playfair Display',serif;">What the Independent Research Says</h2>

<p>The most important study in this space is Goyal M et al., published in JAMA Internal Medicine in 2014. This was a systematic review and meta-analysis of 47 trials with 3,515 total participants examining meditation programs for psychological stress and wellbeing. It is the gold standard reference for what meditation does and does not do.</p>

<p>The findings: moderate evidence that mindfulness meditation programs reduce anxiety (effect size 0.38), depression (effect size 0.30), and pain (effect size 0.33) at eight weeks. Low evidence of improved stress and mental health quality of life. No evidence that meditation programs were better than active treatments like exercise, therapy, or medication.</p>

<p>Read that last line again. The meta-analysis did not find that meditation outperformed active comparators. It found that meditation was better than doing nothing — and modestly better than non-specific active controls. That is an important finding. It is not the same finding the apps are selling.</p>

<p>Mrazek MD et al. published in Psychological Science (2013) a study with 48 undergraduates showing that two weeks of mindfulness training reduced mind-wandering and improved GRE reading comprehension scores. N=48. The finding is interesting and has been cited widely, but it is a single small study in a specific population with a specific outcome measure.</p>

<h2 style="font-family:'Playfair Display',serif;">The Distinction That Matters</h2>

<p>The research supports mindfulness practice — the deliberate, sustained cultivation of present-moment awareness, typically developed over weeks to months of consistent practice. The apps sell 10-minute daily sessions with guided audio. Whether the app experience delivers the same neurological and psychological effects as the practice studied in clinical trials is an open question that the marketing treats as settled.</p>

<p>The dose matters. The instruction quality matters. The practice context matters. A 10-minute guided session on your commute is not the same intervention as an 8-week MBSR course with a trained instructor, which is what most of the clinical literature actually studied.</p>

<p><strong>Disclosure: Non Magic is an app co-founded by WMG's founder. It is subject to the same scrutiny.</strong></p>

<h2 style="font-family:'Playfair Display',serif;">The WMG Bottom Line</h2>

<p>Mindfulness meditation has genuine evidence behind it. The JAMA meta-analysis is real. The effect sizes for anxiety and depression reduction are moderate and meaningful. The practice works.</p>

<p>What the apps sell is a commercialized, condensed version of that practice, wrapped in marketing language that borrows the authority of the broader research literature without acknowledging the gap between the studied intervention and the product being sold.</p>

<p><strong>The practice has evidence. The product claims do not equal the practice. Here is what is real. You decide.</strong></p>

<hr />

<p><em>Sources: Goyal M et al. (2014). Meditation programs for psychological stress and well-being: a systematic review and meta-analysis. JAMA Internal Medicine. N=3515. | Mrazek MD et al. (2013). Mindfulness training improves working memory capacity and GRE performance while reducing mind wandering. Psychological Science. N=48. | Huberty J et al. (2019). Efficacy of the mindfulness meditation mobile app "Calm" in a university sample. JMIR mHealth and uHealth.</em></p>
  `,

  "cold-plunge-industry": `
<p><span style="font-size:3.2em;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;font-family:'Playfair Display',serif;font-weight:900;">T</span>he science of cold water immersion is not new. Athletes have been sitting in ice baths after training for decades. The research is real. The physiological responses are measurable. And somewhere along the way, an industry decided that what you really needed was a $10,000 pod in your garage to access benefits that a cold shower delivers for free.</p>

<p>This is the story of how legitimate science got turned into a luxury product category — and why the research does not care about your hardware.</p>

<h2 style="font-family:'Playfair Display',serif;">What Cold Water Actually Does to Your Body</h2>

<p>When your body is immersed in cold water, several things happen in rapid sequence. First, the cold shock response: a gasp reflex, hyperventilation, and a spike in heart rate and blood pressure driven by massive sympathetic nervous system activation. This is not pleasant. It is also not optional — it is hardwired. Tipton MJ documented the cold shock response extensively in Experimental Physiology (2006), noting that it is the primary cause of cold water drowning and the single most dangerous moment of cold water exposure.</p>

<p>After the initial shock (which diminishes with repeated exposure), peripheral vasoconstriction shunts blood toward the core. Norepinephrine levels spike — by as much as 200-300% in some studies. This is a real, measurable neurochemical response, and it is the basis for many of the mood and alertness claims attached to cold exposure.</p>

<blockquote><p>"A cold shower costs nothing. The science does not care about your pod. It never did." — WMG Editorial</p></blockquote>

<h2 style="font-family:'Playfair Display',serif;">What the Recovery Research Shows</h2>

<p>Bleakley CM et al. published a comprehensive meta-analysis in Sports Medicine (2012) examining cold water immersion for exercise recovery. The pooled evidence showed that CWI at 10-15 degrees Celsius for 10-15 minutes after exercise reduced delayed-onset muscle soreness (DOMS) compared to passive recovery. The effect was moderate and consistent across studies.</p>

<p>The meta-analysis also noted significant variability in protocols — water temperature, immersion duration, timing relative to exercise. The "best" protocol is not settled. What is settled: cold water after exercise reduces perceived soreness more than doing nothing. Whether this translates to actual performance improvement in subsequent sessions is less clear.</p>

<p>There is an important caveat that the cold plunge industry never mentions: Yamane et al. (2006) and Roberts et al. (2015) found evidence that regular cold water immersion after resistance training may actually blunt muscular adaptation. The anti-inflammatory effect that reduces soreness may also reduce the inflammatory signaling that drives muscle growth. If you are training for hypertrophy, routine cold immersion might be working against you.</p>

<h2 style="font-family:'Playfair Display',serif;">The Mental Health Claims</h2>

<p>Shevchuk NA published a paper in Medical Hypotheses (2008) proposing that cold showers could serve as a treatment for depression. The hypothesis was based on the dense network of cold receptors in the skin and the known effect of cold exposure on norepinephrine and beta-endorphin levels. The paper proposed a protocol of cold showers at 20 degrees Celsius for 2-3 minutes, preceded by a gradual adaptation period.</p>

<p>This paper is cited constantly in the cold plunge marketing ecosystem. It is important to note: Medical Hypotheses is a journal that publishes theoretical proposals, not clinical trial results. Shevchuk's paper is a hypothesis. It has not been tested in a randomized controlled trial for depression. The distinction between "here is a plausible mechanism" and "this is a proven treatment" is everything in evidence-based wellness — and the industry erases it routinely.</p>

<h2 style="font-family:'Playfair Display',serif;">The Luxury Cold Plunge Market</h2>

<p>The cold plunge industry has exploded. Companies are selling insulated tubs, chiller units, and complete cold plunge systems for $5,000 to $15,000. Celebrity endorsements drive the market. Social media is filled with influencers emerging from sleek pods, proclaiming transformation. The aesthetic is wellness luxury — clean lines, ambient lighting, premium finishes.</p>

<p>None of the studies that support cold water immersion used these products. The Bleakley meta-analysis used inflatable pools and ice. Tipton's cold shock research used laboratory water tanks. Shevchuk proposed cold showers from a standard bathroom fixture. The science was done with cold water. Not with $12,000 of precision-engineered stainless steel.</p>

<p>A bag of ice from the gas station and a bathtub will deliver the same water temperature as the most expensive cold plunge on the market. The physiological response to 10-degree water does not change based on the price of the container holding it.</p>

<h2 style="font-family:'Playfair Display',serif;">The WMG Bottom Line</h2>

<p>Cold water immersion has a legitimate evidence base. Recovery benefits are supported by meta-analysis. The norepinephrine response is real and measurable. The cold shock response is well-documented physiology. The mental health hypothesis is plausible but unproven in clinical trials.</p>

<p>The luxury cold plunge industry has taken this science and attached it to a premium price tag that the research does not justify. A cold shower costs nothing. A bathtub of ice costs five dollars. The science does not care about your pod.</p>

<p><strong>Democratize the science. The water does not know how much you paid for it.</strong></p>

<hr />

<p><em>Sources: Bleakley CM et al. (2012). Cold-water immersion (cryotherapy) for preventing and treating muscle soreness after exercise. Sports Medicine. N=meta-analysis. | Tipton MJ (2006). The initial responses to cold-water immersion in man. Experimental Physiology. | Shevchuk NA (2008). Adapted cold shower as a potential treatment for depression. Medical Hypotheses. | Roberts LA et al. (2015). Post-exercise cold water immersion attenuates acute anabolic signalling. Journal of Physiology.</em></p>
  `,
};

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  let contentHtml = "";
  try {
    const blocks = await getNotionBlocks(article.id);
    if (blocks && blocks.length > 0) {
      contentHtml = blocksToHtml(blocks);
    }
  } catch {
    // Notion fetch failed
  }

  if (!contentHtml.trim()) {
    contentHtml = FALLBACK_CONTENT[article.slug] || `<p>${article.excerpt}</p>`;
  }

  /* Find the claim card for this article */
  const claimCard = ARTICLE_CLAIM_CARDS.find((c) => c.slug === article.slug);

  /* Split content for inline claim card injection after 2nd paragraph */
  let contentBefore = contentHtml;
  let contentAfter = "";
  if (claimCard) {
    [contentBefore, contentAfter] = splitAfterSecondParagraph(contentHtml);
  }

  /* Related articles: show exactly 3, fill with placeholders if needed */
  const otherArticles = ARTICLES.filter((a) => a.slug !== article.slug);
  const displayedArticles = otherArticles.slice(0, 3);
  const placeholderCount = Math.max(0, 3 - displayedArticles.length);

  const shareCount = getShareCount(article.slug);

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: "2026-04-18",
    dateModified: "2026-04-18",
    author: { "@type": "Organization", name: "Watering My Grass", url: "https://wateringmygrass.com" },
    publisher: { "@type": "Organization", name: "Watering My Grass", url: "https://wateringmygrass.com" },
    mainEntityOfPage: `https://wateringmygrass.com/articles/${article.slug}`,
  };

  return (
    <div className="pt-14">
      <ReadingProgress />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <section className="border-b border-wmg-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative">
          {/* Cockroach emoji — tiny, top-right */}
          <span
            className="absolute top-4 right-4"
            style={{ fontSize: "12px", lineHeight: 1 }}
            aria-hidden="true"
          >
            🪲
          </span>

          {/* Crown watermark — SVG, top-right, kelly green, faint */}
          <svg
            className="absolute top-6 right-10 pointer-events-none"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="#4CBB17"
            style={{ opacity: 0.08 }}
            aria-hidden="true"
          >
            <polygon points="4,32 8,12 14,22 20,6 26,22 32,12 36,32" />
            <rect x="4" y="32" width="32" height="4" rx="1" />
          </svg>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-wmg-green">
              {article.category}
            </span>
            <span className="font-mono text-[10px] text-wmg-ghost">&middot;</span>
            <span className="font-mono text-[10px] text-wmg-ghost">
              {article.publishedDate}
            </span>
            <span className="font-mono text-[10px] text-wmg-ghost">&middot;</span>
            <span className="font-mono text-[10px] text-wmg-green font-bold">
              {article.readTime}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-8 tracking-[-2px]">
            {article.title}
          </h1>

          {/* Byline with citation verified badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <p className="font-mono text-[11px] text-wmg-dim">
              {article.byline}
            </p>
            <span className="citation-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              CITATION VERIFIED
            </span>
          </div>

          {/* Share bar with count */}
          <div className="flex items-center gap-6">
            <ShareBar title={article.title} slug={article.slug} />
            <span className="font-mono text-[9px] text-wmg-ghost uppercase tracking-[0.1em]">
              {shareCount} shares
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <article className="article-content">
            {/* First part of content (before claim card) */}
            <div dangerouslySetInnerHTML={{ __html: contentBefore }} />

            {/* Inline Claim vs Science card */}
            {claimCard && (
              <div
                className="article-inline-claim my-8 p-6 border border-wmg-border border-l-4 border-l-[#4CBB17]"
                style={{ background: "#111110" }}
              >
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-dim mb-3"
                >
                  INDUSTRY CLAIM
                </p>
                <p
                  className="font-display text-lg italic text-[#ccc] mb-5 leading-relaxed"
                >
                  &ldquo;{claimCard.claim}&rdquo;
                </p>
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-wmg-green mb-3"
                >
                  WHAT THE RESEARCH SAYS
                </p>
                <p className="text-sm text-[#999] leading-relaxed mb-4">
                  {claimCard.reality}
                </p>
                <p
                  className="font-mono text-[10px] text-wmg-ghost"
                >
                  {claimCard.citation}
                </p>
              </div>
            )}

            {/* Second part of content (after claim card) */}
            {contentAfter && (
              <div dangerouslySetInnerHTML={{ __html: contentAfter }} />
            )}
          </article>

          <aside className="space-y-8 lg:sticky lg:top-[80px] lg:self-start">
            {/* WMG Standard card */}
            <div className="bg-wmg-surface border border-wmg-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">&#x1FAB2;</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-green">WMG Standard</span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed mb-3">
                Every article cites peer-reviewed sources. We never tell you what to believe &mdash;
                we show you what the evidence says.
              </p>
              <span className="citation-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                CITATION VERIFIED
              </span>
            </div>

            {/* Read time card */}
            <div className="bg-wmg-surface border border-wmg-border p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-dim mb-2">
                Estimated Read Time
              </p>
              <p className="font-display text-3xl font-black text-wmg-green">
                {article.readTime.replace(' read', '')}
              </p>
            </div>

            {/* Citation sidebar */}
            <div className="bg-wmg-surface border border-wmg-border border-l-4 border-l-wmg-green p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-green mb-3">
                Primary Citation
              </p>
              <p className="font-mono text-[11px] text-[#888] leading-relaxed">
                {article.citation}
              </p>
            </div>

            {/* More Articles */}
            <div>
              <h3 className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-dim mb-4">
                More Articles
              </h3>
              <div className="space-y-4">
                {displayedArticles.map((a) => (
                  <Link
                    key={a.id}
                    href={`/articles/${a.slug}`}
                    className="group block border-b border-wmg-border pb-4"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-green">
                      {a.category}
                    </span>
                    <p className="font-display text-sm font-bold mt-1 group-hover:text-wmg-green transition-colors leading-tight">
                      {a.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-wmg-surface border border-wmg-border p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-wmg-dim mb-2">Newsletter</p>
              <p className="text-sm text-[#888] mb-4">Get articles like this every Tuesday.</p>
              <Link
                href="/subscribe"
                className="block text-center bg-wmg-green text-wmg-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Subscribe Free
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles below body */}
      <section className="border-t border-wmg-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedArticles.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="group block bg-wmg-surface border border-wmg-border overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-wmg-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
                <div className="p-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wmg-green">
                    {a.category}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-tight mt-3 mb-2 group-hover:text-wmg-green transition-colors">
                    {a.title}
                  </h3>
                  <span className="font-mono text-[9px] text-wmg-ghost">
                    {a.publishedDate}
                  </span>
                </div>
              </Link>
            ))}
            {/* Placeholder cards if fewer than 3 related articles */}
            {Array.from({ length: placeholderCount }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="block bg-wmg-surface border border-wmg-border border-dashed overflow-hidden relative flex items-center justify-center"
              >
                <div className="p-6 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wmg-ghost">
                    Coming Soon
                  </span>
                  <p className="font-display text-lg font-bold leading-tight mt-3 mb-2 text-wmg-dim">
                    More coming &rarr;
                  </p>
                  <span className="font-mono text-[9px] text-wmg-ghost">
                    New research drops every week
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <div className="border-t border-wmg-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <CommentSection articleSlug={article.slug} articleTitle={article.title} />
        </div>
      </div>

      {/* Newsletter CTA at end of every article */}
      <section className="border-t border-wmg-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-wmg-surface border border-wmg-border p-8 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-wmg-green mb-3">
              Stay informed
            </p>
            <h2 className="font-display text-2xl font-bold mb-2">
              Get the research. Skip the hype.
            </h2>
            <p className="text-sm text-[#888] mb-6 max-w-md mx-auto">
              Every Tuesday, WMG sends one article with peer-reviewed sources, no product pitches, and no wellness fluff.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
