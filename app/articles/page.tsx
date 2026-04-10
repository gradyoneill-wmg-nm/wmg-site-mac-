"use client";
import Link from "next/link";
import { useState } from "react";
import { ARTICLES } from "@/lib/notion";

const CATEGORIES = [
  "All",
  "Neuroscience",
  "Breathwork",
  "Nutrition",
  "Sleep",
  "Emerging Research",
  "Cold Therapy",
  "Frequency Research",
  "Anti-Inflammatory",
  "Wearables",
  "Industry Watch",
];

export default function ArticlesPage() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === filter);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="pt-14">
      {/* Header */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">
            Volume 1 &middot; April 2026
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-black mb-4">
            Articles
          </h1>
          <p className="text-[#888] text-lg max-w-xl leading-relaxed">
            We read the actual papers so you don&apos;t have to. Peer-reviewed
            sources. No affiliates. No agenda.
          </p>
          <p className="font-mono text-[10px] text-wmg-dim mt-4">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}{filter !== 'All' ? ` in ${filter}` : ''}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 transition-all rounded-none ${
                filter === cat
                  ? "bg-wmg-green text-wmg-black"
                  : "text-wmg-dim border border-wmg-border hover:text-white hover:border-wmg-dim"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles — broadsheet layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Featured article: full-width hero treatment */}
        {featured && (
          <Link
            href={`/articles/${featured.slug}`}
            className="group block bg-wmg-surface border border-wmg-border overflow-hidden relative mb-8"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-wmg-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wmg-green">
                  {featured.category}
                </span>
                <span className="font-mono text-[9px] text-wmg-ghost">
                  {featured.readTime}
                </span>
                <span className="font-mono text-[9px] text-wmg-ghost">
                  {featured.publishedDate}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 group-hover:text-wmg-green transition-colors tracking-[-1px]">
                {featured.title}
              </h2>

              <p className="font-mono text-[10px] text-wmg-dim mb-4">
                {featured.citation}
              </p>

              <p className="text-base text-[#888] leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>
            </div>
          </Link>
        )}

        {/* 2-column grid for remaining articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block bg-wmg-surface border border-wmg-border overflow-hidden transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-wmg-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wmg-green">
                    {article.category}
                  </span>
                  <span className="font-mono text-[9px] text-wmg-ghost">
                    {article.readTime}
                  </span>
                  <span className="font-mono text-[9px] text-wmg-ghost">
                    {article.publishedDate}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold leading-tight mb-3 group-hover:text-wmg-green transition-colors">
                  {article.title}
                </h3>

                <p className="font-mono text-[10px] text-wmg-dim mb-3">
                  {article.citation}
                </p>

                <p className="text-sm text-[#888] leading-relaxed">
                  {article.hook}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["Breathwork & Autonomic Control", "Sleep Architecture", "Gut-Brain Axis"].map(
            (title) => (
              <div
                key={title}
                className="bg-wmg-surface border border-wmg-border p-6 opacity-40"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-wmg-ghost mb-3">
                  COMING SOON
                </p>
                <h3 className="font-display text-lg font-bold text-wmg-dim">
                  {title}
                </h3>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
