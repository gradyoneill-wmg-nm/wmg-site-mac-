"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  EVIDENCE_CLAIMS,
  TIER_META,
  CLAIM_CONNECTIONS,
  CLAIM_TOPICS,
  type EvidenceTier,
  type EvidenceClaim,
  type ClaimTopic,
} from "@/lib/notion";

/* ─── Constants ─── */

type ViewMode = "grid" | "node";

const TIER_FILTERS: (EvidenceTier | "all")[] = [
  "all",
  "strong",
  "preliminary",
  "plausible",
  "not-supported",
];

const TOPIC_FILTERS: (ClaimTopic | "all")[] = ["all", ...CLAIM_TOPICS];

const TIER_CSS: Record<EvidenceTier, string> = {
  strong: "tier-strong",
  preliminary: "tier-preliminary",
  plausible: "tier-plausible",
  "not-supported": "tier-unsupported",
};

const TIER_COLORS: Record<EvidenceTier, string> = {
  strong: "#4CBB17",
  preliminary: "#F5841F",
  plausible: "#2D4E9E",
  "not-supported": "#555555",
};

const NODE_RADIUS: Record<EvidenceTier, number> = {
  strong: 28,
  preliminary: 22,
  plausible: 18,
  "not-supported": 14,
};

const TIER_Y_BANDS: Record<EvidenceTier, [number, number]> = {
  strong: [80, 200],
  preliminary: [220, 340],
  plausible: [360, 460],
  "not-supported": [480, 580],
};

const TIER_COUNTS: Record<EvidenceTier, number> = {
  strong: EVIDENCE_CLAIMS.filter((c) => c.tier === "strong").length,
  preliminary: EVIDENCE_CLAIMS.filter((c) => c.tier === "preliminary").length,
  plausible: EVIDENCE_CLAIMS.filter((c) => c.tier === "plausible").length,
  "not-supported": EVIDENCE_CLAIMS.filter((c) => c.tier === "not-supported")
    .length,
};

/* Most Controversial */
const CONTROVERSIAL = [
  {
    ...EVIDENCE_CLAIMS.find(
      (c) => c.title === "Schumann Resonance Entrainment"
    )!,
    reason:
      "Almost Strong \u2014 consistent correlation data, but mechanism unproven",
  },
  {
    ...EVIDENCE_CLAIMS.find((c) => c.title === '528Hz "DNA Repair"')!,
    reason:
      "Definitively Not Supported \u2014 no peer-reviewed source, no replication",
  },
];

/* ─── Compute node positions ─── */

interface NodePosition {
  id: number;
  x: number;
  y: number;
}

function computeNodePositions(): NodePosition[] {
  const positions: NodePosition[] = [];
  const tiers: EvidenceTier[] = [
    "strong",
    "preliminary",
    "plausible",
    "not-supported",
  ];

  for (const tier of tiers) {
    const claims = EVIDENCE_CLAIMS.filter((c) => c.tier === tier);
    const [yMin, yMax] = TIER_Y_BANDS[tier];
    const yMid = (yMin + yMax) / 2;
    const count = claims.length;
    const xPadding = 120;
    const xRange = 1000 - 2 * xPadding;

    claims.forEach((claim, i) => {
      const xStep = count > 1 ? xRange / (count - 1) : 0;
      const x = count > 1 ? xPadding + i * xStep : 500;
      // Stagger y slightly for visual interest
      const yOffset = (i % 2 === 0 ? -1 : 1) * ((yMax - yMin) * 0.25);
      const y = yMid + yOffset;
      positions.push({ id: claim.id, x, y });
    });
  }
  return positions;
}

const NODE_POSITIONS = computeNodePositions();

function getNodePos(id: number): NodePosition | undefined {
  return NODE_POSITIONS.find((n) => n.id === id);
}

/* ─── Page Component ─── */

export default function EvidenceMapPage() {
  const [view, setView] = useState<ViewMode>("grid");
  const [tierFilter, setTierFilter] = useState<EvidenceTier | "all">("all");
  const [topicFilter, setTopicFilter] = useState<ClaimTopic | "all">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Node view state
  const [selectedNode, setSelectedNode] = useState<EvidenceClaim | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close panel on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        setTimeout(() => setSelectedNode(null), 300);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = EVIDENCE_CLAIMS.filter(
    (c) => tierFilter === "all" || c.tier === tierFilter
  )
    .filter((c) => topicFilter === "all" || c.topic === topicFilter)
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  const filteredIds = new Set(filtered.map((c) => c.id));

  function handleNodeClick(claim: EvidenceClaim) {
    setSelectedNode(claim);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setTimeout(() => setSelectedNode(null), 300);
  }

  return (
    <div className="pt-14">
      {/* ─── Page Header ─── */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">
            LAST UPDATED: APRIL 18, 2026 &middot; {EVIDENCE_CLAIMS.length}{" "}
            CLAIMS INDEXED
          </p>
          <h1 className="font-display text-5xl sm:text-[80px] font-black mb-4 tracking-[-2px]">
            The Evidence Map
          </h1>
          <p className="text-[#888] text-lg max-w-2xl leading-relaxed">
            Every major wellness claim in our database, ranked by the strength of
            peer-reviewed evidence behind it.
          </p>
        </div>
      </section>

      {/* ─── View Toggle + Search ─── */}
      <div
        style={{
          background: "#111110",
          borderBottom: "1px solid #1a1a18",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-4">
          {/* View toggle */}
          <div
            style={{
              display: "flex",
              border: "1px solid #1a1a18",
              overflow: "hidden",
            }}
          >
            {(["grid", "node"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setView(m)}
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  border: "none",
                  background: view === m ? "#4CBB17" : "transparent",
                  color: view === m ? "#0C0C0A" : "#888",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {m === "grid" ? "Grid View" : "Node View"}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 480, flex: 1 }}>
            <input
              id="evidence-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search claims..."
              style={{
                width: "100%",
                background: "#0C0C0A",
                border: "1px solid #1a1a18",
                padding: "10px 14px 10px 36px",
                fontSize: 13,
                color: "#fff",
                fontFamily: "var(--font-space-mono)",
                outline: "none",
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.3,
              }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Sticky Filter Bar: Tiers + Topics ─── */}
      <div
        style={{
          position: "sticky",
          top: 56,
          zIndex: 40,
          background: "rgba(12,12,10,0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #1a1a18",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          {/* Tier filters */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 8,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#555",
                alignSelf: "center",
                marginRight: 4,
              }}
            >
              TIER
            </span>
            {TIER_FILTERS.map((f) => {
              const meta = f === "all" ? { label: "ALL" } : TIER_META[f];
              const color = f === "all" ? "#fff" : TIER_COLORS[f];
              const count =
                f === "all" ? EVIDENCE_CLAIMS.length : TIER_COUNTS[f];
              const active = tierFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setTierFilter(f)}
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 8,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    border: active ? "none" : `1px solid ${color}`,
                    background: active ? color : "transparent",
                    color: active ? "#0C0C0A" : color,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {meta.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Topic filters */}
          <div className="flex flex-wrap gap-2">
            <span
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: 8,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#555",
                alignSelf: "center",
                marginRight: 4,
              }}
            >
              TOPIC
            </span>
            {TOPIC_FILTERS.map((t) => {
              const active = topicFilter === t;
              const count =
                t === "all"
                  ? EVIDENCE_CLAIMS.length
                  : EVIDENCE_CLAIMS.filter((c) => c.topic === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setTopicFilter(t)}
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 8,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    border: active ? "none" : "1px solid #333",
                    background: active ? "#fff" : "transparent",
                    color: active ? "#0C0C0A" : "#888",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {t === "all" ? "ALL" : t} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── GRID VIEW ─── */}
      {view === "grid" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* Most Controversial */}
          {tierFilter === "all" && topicFilter === "all" && !search && (
            <div style={{ marginBottom: 48 }}>
              <p
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                  marginBottom: 16,
                }}
              >
                MOST CONTROVERSIAL
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 16,
                }}
              >
                {CONTROVERSIAL.map((claim) => {
                  const meta = TIER_META[claim.tier];
                  return (
                    <div
                      key={claim.id}
                      style={{
                        background: "#111110",
                        border: "2px solid #F59E0B",
                        padding: 24,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 12,
                        }}
                      >
                        <span className="contested-badge">CONTESTED</span>
                        <span
                          style={{
                            fontFamily: "var(--font-space-mono)",
                            fontSize: 8,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: TIER_COLORS[claim.tier],
                          }}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-playfair)",
                          fontSize: 18,
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        {claim.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#F59E0B",
                          lineHeight: 1.6,
                          marginBottom: 8,
                          fontStyle: "italic",
                        }}
                      >
                        {claim.reason}
                      </p>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#888",
                          lineHeight: 1.7,
                          marginBottom: 12,
                        }}
                      >
                        {claim.summary}
                      </p>
                      <span
                        style={{
                          fontFamily: "var(--font-space-mono)",
                          fontSize: 11,
                          color: "#555",
                        }}
                      >
                        {claim.citation}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Claims list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((claim) => {
              const meta = TIER_META[claim.tier];
              const tierClass = TIER_CSS[claim.tier];
              const isExpanded = expandedId === claim.id;
              return (
                <div
                  key={claim.id}
                  className={tierClass}
                  style={{
                    background: "#111110",
                    border: "1px solid #1a1a18",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setExpandedId(isExpanded ? null : claim.id)
                  }
                >
                  <div style={{ padding: 24 }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: 18,
                            fontWeight: 700,
                          }}
                        >
                          {claim.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-space-mono)",
                            fontSize: 7,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#555",
                            background: "#1a1a18",
                            padding: "2px 6px",
                            flexShrink: 0,
                          }}
                        >
                          {claim.topic}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-space-mono)",
                          fontSize: 8,
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: TIER_COLORS[claim.tier],
                          flexShrink: 0,
                        }}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: 14,
                        color: "#888",
                        lineHeight: 1.7,
                        marginBottom: 12,
                      }}
                    >
                      {claim.summary}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-space-mono)",
                          fontSize: 11,
                          color: "#555",
                        }}
                      >
                        {claim.citation}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        {claim.articleSlug ? (
                          <Link
                            href={`/articles/${claim.articleSlug}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              fontFamily: "var(--font-space-mono)",
                              fontSize: 10,
                              color: "#4CBB17",
                              textDecoration: "none",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                            }}
                          >
                            Read full article &rarr;
                          </Link>
                        ) : (
                          <span
                            style={{
                              fontFamily: "var(--font-space-mono)",
                              fontSize: 10,
                              color: "#2a2a28",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                            }}
                          >
                            Article coming &rarr;
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: "var(--font-space-mono)",
                            fontSize: 9,
                            color: "#2a2a28",
                          }}
                        >
                          {isExpanded ? "\u25B2" : "\u25BC"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <div
                    className={`claim-expand-content ${isExpanded ? "expanded" : ""}`}
                  >
                    <div
                      style={{
                        borderTop: "1px solid #1a1a18",
                        paddingTop: 16,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          color: "#aaa",
                          lineHeight: 1.8,
                          marginBottom: 16,
                        }}
                      >
                        {claim.summary} This claim has been reviewed against the
                        WMG citation standard. All available peer-reviewed
                        sources are listed below.
                      </p>
                      <div
                        style={{
                          background: "#0C0C0A",
                          border: "1px solid #1a1a18",
                          padding: "12px 16px",
                          marginBottom: 12,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-space-mono)",
                            fontSize: 9,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#4CBB17",
                            marginBottom: 4,
                          }}
                        >
                          PRIMARY CITATION
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-space-mono)",
                            fontSize: 11,
                            color: "#888",
                          }}
                        >
                          {claim.citation}
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-space-mono)",
                          fontSize: 9,
                          color: "#2a2a28",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                        }}
                      >
                        Last reviewed: April 2026
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: 13,
                  color: "#555",
                }}
              >
                No claims match your search.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── NODE VIEW ─── */}
      {view === "node" && (
        <div style={{ position: "relative" }}>
          {/* SVG Canvas */}
          <div
            className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
            style={{ position: "relative" }}
          >
            {/* Tier labels on left */}
            <div
              style={{
                position: "absolute",
                left: 8,
                top: 32,
                bottom: 32,
                width: 90,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              {(
                [
                  "strong",
                  "preliminary",
                  "plausible",
                  "not-supported",
                ] as EvidenceTier[]
              ).map((tier) => {
                const [yMin, yMax] = TIER_Y_BANDS[tier];
                const pctTop = (yMin / 650) * 100;
                const pctHeight = ((yMax - yMin) / 650) * 100;
                return (
                  <div
                    key={tier}
                    style={{
                      position: "absolute",
                      top: `${pctTop}%`,
                      height: `${pctHeight}%`,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-space-mono)",
                        fontSize: 7,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: TIER_COLORS[tier],
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        opacity: 0.6,
                      }}
                    >
                      {TIER_META[tier].label}
                    </span>
                  </div>
                );
              })}
            </div>

            <svg
              viewBox="0 0 1000 650"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "75vh",
                display: "block",
              }}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background tier bands */}
              {(
                [
                  "strong",
                  "preliminary",
                  "plausible",
                  "not-supported",
                ] as EvidenceTier[]
              ).map((tier) => {
                const [yMin, yMax] = TIER_Y_BANDS[tier];
                return (
                  <rect
                    key={tier}
                    x={0}
                    y={yMin - 20}
                    width={1000}
                    height={yMax - yMin + 40}
                    fill={TIER_COLORS[tier]}
                    opacity={0.03}
                  />
                );
              })}

              {/* Horizontal tier dividers */}
              {[210, 350, 470].map((y) => (
                <line
                  key={y}
                  x1={60}
                  y1={y}
                  x2={940}
                  y2={y}
                  stroke="#1a1a18"
                  strokeWidth={1}
                  strokeDasharray="4 6"
                />
              ))}

              {/* Connection lines */}
              {CLAIM_CONNECTIONS.map(([idA, idB], i) => {
                const a = getNodePos(idA);
                const b = getNodePos(idB);
                if (!a || !b) return null;
                const bothVisible =
                  filteredIds.has(idA) && filteredIds.has(idB);
                return (
                  <line
                    key={`conn-${i}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="#1a1a18"
                    strokeWidth={1}
                    opacity={bothVisible ? 0.6 : 0.1}
                  />
                );
              })}

              {/* Nodes */}
              {EVIDENCE_CLAIMS.map((claim) => {
                const pos = getNodePos(claim.id);
                if (!pos) return null;
                const visible = filteredIds.has(claim.id);
                const r = NODE_RADIUS[claim.tier];
                const color = TIER_COLORS[claim.tier];
                const isSelected = selectedNode?.id === claim.id;

                return (
                  <g
                    key={claim.id}
                    style={{
                      cursor: visible ? "pointer" : "default",
                      transition: "opacity 0.3s",
                      opacity: visible ? 1 : 0.08,
                    }}
                    onClick={() => visible && handleNodeClick(claim)}
                  >
                    {/* Glow on selected */}
                    {isSelected && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={r + 8}
                        fill="none"
                        stroke={color}
                        strokeWidth={2}
                        opacity={0.5}
                      >
                        <animate
                          attributeName="r"
                          values={`${r + 6};${r + 12};${r + 6}`}
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.5;0.2;0.5"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Node circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={r}
                      fill={color}
                      opacity={isSelected ? 1 : 0.85}
                      stroke={isSelected ? "#fff" : "none"}
                      strokeWidth={isSelected ? 2 : 0}
                    />

                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y + r + 12}
                      textAnchor="middle"
                      fill="#888"
                      fontSize={8}
                      fontFamily="var(--font-space-mono), monospace"
                      style={{ pointerEvents: "none" }}
                    >
                      {claim.title.length > 22
                        ? claim.title.slice(0, 20) + "\u2026"
                        : claim.title}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              {(
                [
                  "strong",
                  "preliminary",
                  "plausible",
                  "not-supported",
                ] as EvidenceTier[]
              ).map((tier) => (
                <div
                  key={tier}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: NODE_RADIUS[tier] * 0.7,
                      height: NODE_RADIUS[tier] * 0.7,
                      borderRadius: "50%",
                      background: TIER_COLORS[tier],
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 8,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#555",
                    }}
                  >
                    {TIER_META[tier].label}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 1,
                    background: "#1a1a18",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 8,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#555",
                  }}
                >
                  Related
                </span>
              </div>
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <p
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 13,
                    color: "#555",
                  }}
                >
                  No claims match your filters.
                </p>
              </div>
            )}
          </div>

          {/* ─── Right Panel (Desktop) ─── */}
          {!isMobile && selectedNode && (
            <div
              ref={panelRef}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: 360,
                height: "100vh",
                background: "#111110",
                borderLeft: `3px solid ${TIER_COLORS[selectedNode.tier]}`,
                zIndex: 50,
                transform: panelOpen
                  ? "translateX(0)"
                  : "translateX(100%)",
                transition: "transform 0.3s ease",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Close button */}
              <button
                onClick={closePanel}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  fontSize: 20,
                  fontFamily: "var(--font-space-mono)",
                  lineHeight: 1,
                  padding: 4,
                  zIndex: 2,
                }}
                aria-label="Close panel"
              >
                &times;
              </button>

              <div style={{ padding: "32px 24px" }}>
                {/* Tier badge */}
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 8,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: TIER_COLORS[selectedNode.tier],
                    display: "inline-block",
                    marginBottom: 12,
                    border: `1px solid ${TIER_COLORS[selectedNode.tier]}`,
                    padding: "3px 8px",
                  }}
                >
                  {TIER_META[selectedNode.tier].label}
                </span>

                {/* Topic badge */}
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 7,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    background: "#1a1a18",
                    padding: "3px 8px",
                    display: "inline-block",
                    marginLeft: 8,
                    marginBottom: 12,
                  }}
                >
                  {selectedNode.topic}
                </span>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 16,
                    lineHeight: 1.3,
                  }}
                >
                  {selectedNode.title}
                </h2>

                {/* Summary */}
                <p
                  style={{
                    fontSize: 14,
                    color: "#aaa",
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  {selectedNode.summary}
                </p>

                {/* Citation block */}
                <div
                  style={{
                    background: "#0C0C0A",
                    border: "1px solid #1a1a18",
                    padding: "12px 16px",
                    marginBottom: 24,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#4CBB17",
                      marginBottom: 4,
                    }}
                  >
                    PRIMARY CITATION
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 11,
                      color: "#888",
                    }}
                  >
                    {selectedNode.citation}
                  </p>
                </div>

                {/* Article link */}
                {selectedNode.articleSlug ? (
                  <Link
                    href={`/articles/${selectedNode.articleSlug}`}
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 10,
                      color: "#0C0C0A",
                      background: "#4CBB17",
                      padding: "10px 20px",
                      textDecoration: "none",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      transition: "opacity 0.2s",
                    }}
                  >
                    Read full article &rarr;
                  </Link>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 10,
                      color: "#2a2a28",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Article coming soon
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ─── Mobile Modal ─── */}
          {isMobile && selectedNode && panelOpen && (
            <>
              {/* Backdrop */}
              <div
                onClick={closePanel}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.7)",
                  zIndex: 50,
                }}
              />
              {/* Modal */}
              <div
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  maxHeight: "80vh",
                  background: "#111110",
                  borderTop: `3px solid ${TIER_COLORS[selectedNode.tier]}`,
                  zIndex: 51,
                  overflowY: "auto",
                  padding: "24px 20px",
                  animation: "slideUp 0.3s ease",
                }}
              >
                <style>{`
                  @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                  }
                `}</style>

                {/* Close */}
                <button
                  onClick={closePanel}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 16,
                    background: "none",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    fontSize: 22,
                    fontFamily: "var(--font-space-mono)",
                    lineHeight: 1,
                    padding: 4,
                  }}
                  aria-label="Close modal"
                >
                  &times;
                </button>

                {/* Tier badge */}
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 8,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: TIER_COLORS[selectedNode.tier],
                    display: "inline-block",
                    marginBottom: 10,
                    border: `1px solid ${TIER_COLORS[selectedNode.tier]}`,
                    padding: "3px 8px",
                  }}
                >
                  {TIER_META[selectedNode.tier].label}
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: 7,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    background: "#1a1a18",
                    padding: "3px 8px",
                    display: "inline-block",
                    marginLeft: 8,
                    marginBottom: 10,
                  }}
                >
                  {selectedNode.topic}
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {selectedNode.title}
                </h2>

                <p
                  style={{
                    fontSize: 14,
                    color: "#aaa",
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  {selectedNode.summary}
                </p>

                <div
                  style={{
                    background: "#0C0C0A",
                    border: "1px solid #1a1a18",
                    padding: "12px 16px",
                    marginBottom: 20,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#4CBB17",
                      marginBottom: 4,
                    }}
                  >
                    PRIMARY CITATION
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 11,
                      color: "#888",
                    }}
                  >
                    {selectedNode.citation}
                  </p>
                </div>

                {selectedNode.articleSlug ? (
                  <Link
                    href={`/articles/${selectedNode.articleSlug}`}
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 10,
                      color: "#0C0C0A",
                      background: "#4CBB17",
                      padding: "10px 20px",
                      textDecoration: "none",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Read full article &rarr;
                  </Link>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: 10,
                      color: "#2a2a28",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Article coming soon
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
