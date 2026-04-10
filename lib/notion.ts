import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  hook: string;
  citation: string;
  byline: string;
}

export const ARTICLES: Article[] = [
  {
    id: "33511c2a-da40-8184-865d-fa5f9b18390c",
    slug: "wim-hof",
    title:
      "The Iceman\u2019s Evidence: What Peer-Reviewed Science Says About Cold Exposure",
    excerpt:
      "A Dutch man convinced scientists he could control his immune system. They ran the study. He was right. But the story of Wim Hof is less about the man \u2014 and more about what his body revealed.",
    hook: "A Dutch man convinced scientists he could control his immune system. They ran the study. He was right.",
    category: "Cold Therapy",
    readTime: "8 min read",
    publishedDate: "April 18, 2026",
    citation: "Kox et al., PNAS, 2014 \u00B7 N=24",
    byline:
      "BY WMG EDITORIAL \u00B7 SOURCE: Kox et al., PNAS, 2014 \u00B7 N=24",
  },
  {
    id: "33511c2a-da40-81e3-9d14-eea2e054c29f",
    slug: "schumann-resonance",
    title:
      "The Earth\u2019s Heartbeat: Science, Schumann Resonance, and Your Brain",
    excerpt:
      "The Earth vibrates at 7.83Hz. Your brain\u2019s alpha waves peak at 8\u201312Hz. This is not a coincidence \u2014 and neuroscientists are beginning to pay attention.",
    hook: "The Earth vibrates at 7.83Hz. Your brain\u2019s alpha waves peak at 8\u201312Hz. This is not a coincidence.",
    category: "Frequency Research",
    readTime: "7 min read",
    publishedDate: "April 18, 2026",
    citation: "Pobachenko et al., Biophysics, 2006 \u00B7 N=48",
    byline:
      "BY WMG EDITORIAL \u00B7 SOURCE: Pobachenko et al., Biophysics, 2006 \u00B7 N=48",
  },
  {
    id: "33511c2a-da40-8192-a700-ecd8741fcc46",
    slug: "copper-inflammation",
    title: "Copper, Miners, and the Arthritis Nobody Studies",
    excerpt:
      "Copper miners have the lowest rates of arthritis of any occupational group. Nobody is funding a study. Here\u2019s why \u2014 and what the existing data actually shows.",
    hook: "Copper miners have the lowest rates of arthritis of any occupational group. Nobody is funding a study.",
    category: "Anti-Inflammatory",
    readTime: "6 min read",
    publishedDate: "April 18, 2026",
    citation: "Walker, JRSM, 1979",
    byline: "BY WMG EDITORIAL \u00B7 SOURCE: Walker, JRSM, 1979",
  }
];

/* ─── Evidence Map Claims ─── */

export type EvidenceTier =
  | "strong"
  | "preliminary"
  | "plausible"
  | "not-supported";

export type ClaimTopic =
  | "Cold Therapy"
  | "Frequency"
  | "Nutrition"
  | "Wearables"
  | "Supplements"
  | "Mind";

export interface EvidenceClaim {
  id: number;
  title: string;
  tier: EvidenceTier;
  summary: string;
  citation: string;
  articleSlug?: string;
  topic: ClaimTopic;
}

export const TIER_META: Record<
  EvidenceTier,
  { label: string; color: string; borderColor: string; bgColor: string }
> = {
  strong: {
    label: "STRONG EVIDENCE",
    color: "text-wmg-green",
    borderColor: "border-wmg-green",
    bgColor: "bg-wmg-green",
  },
  preliminary: {
    label: "PRELIMINARY / CORRELATIONAL",
    color: "text-wmg-orange",
    borderColor: "border-wmg-orange",
    bgColor: "bg-wmg-orange",
  },
  plausible: {
    label: "PLAUSIBLE, UNTESTED",
    color: "text-wmg-blue",
    borderColor: "border-wmg-blue",
    bgColor: "bg-wmg-blue",
  },
  "not-supported": {
    label: "NOT SUPPORTED",
    color: "text-wmg-dim",
    borderColor: "border-wmg-dim",
    bgColor: "bg-wmg-dim",
  },
};

export const CLAIM_TOPICS: ClaimTopic[] = [
  "Cold Therapy",
  "Frequency",
  "Nutrition",
  "Wearables",
  "Supplements",
  "Mind",
];

export const EVIDENCE_CLAIMS: EvidenceClaim[] = [
  // STRONG EVIDENCE
  {
    id: 1,
    title: "Wim Hof / Cold Exposure",
    tier: "strong",
    summary:
      "Voluntary breathing techniques measurably alter autonomic nervous system response and immune markers.",
    citation: "Kox et al., PNAS, 2014, N=24",
    articleSlug: "wim-hof",
    topic: "Cold Therapy",
  },
  {
    id: 2,
    title: "40Hz Gamma Stimulation",
    tier: "strong",
    summary:
      "Reduces amyloid plaque load in mouse models; Phase 2A human trials confirm neurological effects.",
    citation: "Iaccarino et al., Nature, 2016; Phase 2A 2023, N=76",
    topic: "Frequency",
  },
  {
    id: 3,
    title: "HRV Biofeedback / Coherence Breathing",
    tier: "strong",
    summary:
      "Coherence breathing at ~5.5 breaths/min measurably increases HRV and reduces cortisol.",
    citation:
      "Lehrer & Gevirtz, Frontiers in Psychology, 2014, N=meta-analysis",
    topic: "Wearables",
  },
  {
    id: 4,
    title: "Cold Water Immersion for Recovery",
    tier: "strong",
    summary:
      "Reduces muscle soreness and inflammatory markers post-exercise vs passive recovery.",
    citation: "Bleakley et al., Sports Medicine, 2012, N=meta-analysis",
    articleSlug: "cold-plunge-industry",
    topic: "Cold Therapy",
  },
  // PRELIMINARY / CORRELATIONAL
  {
    id: 5,
    title: "Schumann Resonance Entrainment",
    tier: "preliminary",
    summary:
      "Small studies show correlations between brain alpha waves and 7.83Hz Earth resonances; mechanism unproven.",
    citation: "Pobachenko et al., Biophysics, 2006, N=48",
    articleSlug: "schumann-resonance",
    topic: "Frequency",
  },
  {
    id: 6,
    title: "432Hz Tuning vs 440Hz",
    tier: "preliminary",
    summary:
      "Subjective preference studies show some users prefer 432Hz; no physiological superiority demonstrated.",
    citation: "Calamassi & Pomponi, Acta Bio Medica, 2019, N=33",
    topic: "Frequency",
  },
  {
    id: 7,
    title: "Theta Binaural Beats (Creativity)",
    tier: "preliminary",
    summary:
      "Some studies show theta binaural beats correlate with improved creative task performance.",
    citation: "Reedijk et al., PLOS ONE, 2013, N=24",
    topic: "Frequency",
  },
  {
    id: 8,
    title: "Meditation + HRV",
    tier: "preliminary",
    summary:
      "Regular meditation practice associated with higher baseline HRV; causation vs selection unclear.",
    citation: "Multiple, 2010-2020",
    topic: "Mind",
  },
  {
    id: 16,
    title: "Red Light Therapy (Photobiomodulation)",
    tier: "preliminary",
    summary:
      "Cytochrome c oxidase absorbs red/NIR light, boosting ATP. Wound healing and pain RCTs show positive results; consumer panel claims go beyond the evidence.",
    citation: "Hamblin MR, Photochemistry and Photobiology, 2018",
    articleSlug: "red-light-therapy",
    topic: "Supplements",
  },
  {
    id: 17,
    title: "Mindfulness App Efficacy",
    tier: "preliminary",
    summary:
      "Meta-analysis supports mindfulness meditation for anxiety and depression. App-specific evidence is limited compared to in-person interventions.",
    citation: "Goyal M et al., JAMA Internal Medicine, 2014, N=3515",
    articleSlug: "meditation-app-claims",
    topic: "Mind",
  },
  {
    id: 18,
    title: "HRV as Wellness Metric",
    tier: "preliminary",
    summary:
      "HRV reflects autonomic balance and vagal tone. Day-to-day variation is noisy; trends matter, single readings do not.",
    citation: "Thayer et al., Neuroscience & Biobehavioral Reviews, 2012",
    articleSlug: "hrv-oversold",
    topic: "Wearables",
  },
  // PLAUSIBLE, UNTESTED
  {
    id: 9,
    title: "Copper & Arthritis",
    tier: "plausible",
    summary:
      "Copper miners show anomalously low arthritis rates; biochemical mechanism via SOD plausible; no controlled trial funded.",
    citation: "Walker, JRSM, 1979",
    articleSlug: "copper-inflammation",
    topic: "Supplements",
  },
  {
    id: 10,
    title: "Earthing / Grounding",
    tier: "plausible",
    summary:
      "Biologically plausible mechanism (Earth electron transfer); no large-scale RCT.",
    citation:
      "Chevalier et al., Journal of Environmental and Public Health, 2012",
    topic: "Supplements",
  },
  {
    id: 11,
    title: "Red Light Therapy (Joint Pain)",
    tier: "plausible",
    summary:
      "Photobiomodulation has cellular mechanism via cytochrome c oxidase; joint pain evidence limited to small studies.",
    citation: "Hamblin, Photochemistry and Photobiology, 2018",
    topic: "Supplements",
  },
  {
    id: 19,
    title: "Cold Shower for Depression",
    tier: "plausible",
    summary:
      "Weak but real signal in one study. Cold exposure activates sympathetic nervous system and releases norepinephrine. Not a replacement for treatment.",
    citation: "Shevchuk NA, Medical Hypotheses, 2008",
    articleSlug: "cold-plunge-industry",
    topic: "Cold Therapy",
  },
  // NOT SUPPORTED
  {
    id: 12,
    title: "Alkaline Water Health Claims",
    tier: "not-supported",
    summary:
      "No peer-reviewed evidence for health benefits. Body maintains pH homeostasis independently.",
    citation: "Fenton et al., BMJ Open, 2016",
    topic: "Nutrition",
  },
  {
    id: 13,
    title: "Crystal Healing",
    tier: "not-supported",
    summary:
      "No mechanism consistent with physics. No clinical evidence.",
    citation: "Multiple reviews",
    topic: "Supplements",
  },
  {
    id: 14,
    title: "Detox Teas / Cleanses",
    tier: "not-supported",
    summary:
      "Liver performs continuous detoxification. Commercial products lack evidence; FDA warnings issued.",
    citation: "Ernst, Journal of Human Nutrition, 2012",
    topic: "Nutrition",
  },
  {
    id: 15,
    title: '528Hz "DNA Repair"',
    tier: "not-supported",
    summary:
      "Claim originates from one non-peer-reviewed source. No replication. Not biologically plausible at audio frequencies.",
    citation: "No credible source",
    topic: "Frequency",
  },
];

/* ─── Article-specific Claim vs Science cards ─── */
export interface ArticleClaimCard {
  slug: string;
  claim: string;
  reality: string;
  citation: string;
}

export const ARTICLE_CLAIM_CARDS: ArticleClaimCard[] = [
  {
    slug: "wim-hof",
    claim: "The Wim Hof Method can cure autoimmune diseases and cancer.",
    reality:
      "The Kox 2014 study showed measurable immune modulation in 12 trained subjects — reduced cytokines, attenuated fever. It has not been replicated at scale. No evidence supports treating serious illness with breathing techniques.",
    citation: "Kox et al., PNAS, 2014 \u00B7 N=24",
  },
  {
    slug: "schumann-resonance",
    claim: "Schumann resonance spikes cause spiritual awakenings and ascension symptoms.",
    reality:
      "The Schumann resonance is a measurable electromagnetic phenomenon at 7.83Hz. Small studies show brain wave correlations. No peer-reviewed evidence supports consciousness shifts, mood prediction, or spiritual effects from resonance monitoring.",
    citation: "Pobachenko et al., Biophysics, 2006 \u00B7 N=48",
  },
  {
    slug: "copper-inflammation",
    claim: "Copper bracelets cure arthritis through magnetic therapy.",
    reality:
      "Copper miners show low arthritis rates (Walker 1979). Copper is essential for superoxide dismutase, a real antioxidant enzyme. But no controlled clinical trial has tested copper supplementation for arthritis. The funding incentive does not exist.",
    citation: "Walker, JRSM, 1979 \u00B7 Richmond et al., PLOS ONE, 2013 \u00B7 N=70",
  },
  {
    slug: "red-light-therapy",
    claim: "Red light panels reverse aging, burn fat, and heal everything from acne to chronic pain.",
    reality:
      "Cytochrome c oxidase absorbs red/NIR light and boosts ATP production \u2014 the mechanism is real. Wound healing and musculoskeletal pain RCTs are positive. The $500 consumer panel claims go far beyond what any study has tested.",
    citation: "Hamblin MR, Photochemistry and Photobiology, 2018 \u00B7 Avci et al., 2013",
  },
  {
    slug: "hrv-oversold",
    claim: "Your morning HRV score tells you exactly how recovered and healthy you are.",
    reality:
      "HRV reflects autonomic nervous system balance and vagal tone. But day-to-day readings are noisy and influenced by hydration, sleep position, caffeine, and sensor placement. Trends over weeks matter. Single readings do not.",
    citation: "Thayer et al., Neuroscience & Biobehavioral Reviews, 2012 \u00B7 N=meta-analysis",
  },
  {
    slug: "meditation-app-claims",
    claim: "Ten minutes a day on Calm or Headspace will reduce your anxiety, improve your focus, and change your brain.",
    reality:
      "The 2014 JAMA meta-analysis of 3,515 participants found moderate evidence that mindfulness meditation reduces anxiety and depression. The evidence supports the practice. It does not specifically validate any commercial app\u2019s claims or dosage.",
    citation: "Goyal M et al., JAMA Internal Medicine, 2014 \u00B7 N=3515",
  },
  {
    slug: "cold-plunge-industry",
    claim: "You need a $10,000 cold plunge pod to get the benefits of cold water immersion.",
    reality:
      "The science of cold water immersion shows genuine recovery benefits and sympathoadrenal activation. A cold shower costs nothing. The research did not use luxury pods. The science does not care about your hardware.",
    citation: "Bleakley CM et al., Sports Medicine, 2012 \u00B7 N=meta-analysis",
  },
];

/* ─── Node Graph relationship data ─── */
export const CLAIM_CONNECTIONS: [number, number][] = [
  [1, 4],   // Wim Hof <-> Cold Water Immersion
  [1, 19],  // Wim Hof <-> Cold Shower Depression
  [4, 19],  // Cold Water Immersion <-> Cold Shower Depression
  [5, 6],   // Schumann <-> 432Hz
  [5, 7],   // Schumann <-> Theta Binaural
  [6, 7],   // 432Hz <-> Theta Binaural
  [6, 15],  // 432Hz <-> 528Hz DNA
  [3, 8],   // HRV Biofeedback <-> Meditation HRV
  [3, 18],  // HRV Biofeedback <-> HRV Metric
  [8, 17],  // Meditation HRV <-> Mindfulness Apps
  [8, 18],  // Meditation HRV <-> HRV Metric
  [9, 11],  // Copper <-> Red Light Joint Pain
  [11, 16], // Red Light Joint <-> Red Light Photobiomod
  [12, 14], // Alkaline Water <-> Detox Teas
];

/* ─── Notion helpers ─── */

export async function getNotionPage(
  pageId: string
): Promise<PageObjectResponse | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response as PageObjectResponse;
  } catch (err) {
    console.error("Failed to fetch Notion page:", err);
    return null;
  }
}

export async function getNotionBlocks(
  blockId: string
): Promise<BlockObjectResponse[]> {
  try {
    const blocks: BlockObjectResponse[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
        page_size: 100,
      });

      blocks.push(...(response.results as BlockObjectResponse[]));
      cursor = response.next_cursor ?? undefined;
    } while (cursor);

    return blocks;
  } catch (err) {
    console.error("Failed to fetch Notion blocks:", err);
    return [];
  }
}

export function richTextToString(
  richText: { plain_text: string }[]
): string {
  return richText.map((rt) => rt.plain_text).join("");
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function blocksToHtml(blocks: BlockObjectResponse[]): string {
  let html = "";

  for (const block of blocks) {
    switch (block.type) {
      case "heading_1": {
        const text = richTextToString(
          (block as any).heading_1.rich_text
        );
        if (text) html += `<h1>${text}</h1>\n`;
        break;
      }
      case "heading_2": {
        const text = richTextToString(
          (block as any).heading_2.rich_text
        );
        if (text) html += `<h2>${text}</h2>\n`;
        break;
      }
      case "heading_3": {
        const text = richTextToString(
          (block as any).heading_3.rich_text
        );
        if (text) html += `<h3>${text}</h3>\n`;
        break;
      }
      case "paragraph": {
        const richText = (block as any).paragraph.rich_text;
        if (richText && richText.length > 0) {
          const text = richText
            .map((rt: any) => {
              let t = rt.plain_text;
              if (rt.annotations?.bold) t = `<strong>${t}</strong>`;
              if (rt.annotations?.italic) t = `<em>${t}</em>`;
              if (rt.href)
                t = `<a href="${rt.href}" target="_blank" rel="noopener">${t}</a>`;
              return t;
            })
            .join("");
          if (text.trim()) html += `<p>${text}</p>\n`;
        }
        break;
      }
      case "bulleted_list_item": {
        const text = richTextToString(
          (block as any).bulleted_list_item.rich_text
        );
        if (text) html += `<li>${text}</li>\n`;
        break;
      }
      case "numbered_list_item": {
        const text = richTextToString(
          (block as any).numbered_list_item.rich_text
        );
        if (text) html += `<li>${text}</li>\n`;
        break;
      }
      case "quote": {
        const text = richTextToString(
          (block as any).quote.rich_text
        );
        if (text) html += `<blockquote>${text}</blockquote>\n`;
        break;
      }
      case "divider": {
        html += `<hr />\n`;
        break;
      }
      case "callout": {
        const text = richTextToString(
          (block as any).callout.rich_text
        );
        if (text) html += `<blockquote>${text}</blockquote>\n`;
        break;
      }
      default:
        break;
    }
  }

  return html;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}



