"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ARTICLES } from "@/lib/notion";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.hook.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.citation.toLowerCase().includes(q)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="pt-14">
      {/* Header */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">
            Search
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-black mb-8">
            Find Articles
          </h1>
          {/* Search input */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, title, or category…"
              autoFocus
              className="w-full bg-wmg-surface border border-wmg-border text-white font-mono text-sm px-5 py-4 pr-12 focus:outline-none focus:border-wmg-green placeholder-wmg-dim transition-colors"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 text-wmg-dim"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {!hasQuery && (
          <div className="text-center py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-dim mb-4">
              Start typing
            </p>
            <p className="text-[#555] text-sm">
              Search across {ARTICLES.length} articles by title, excerpt, category, or citation.
            </p>
          </div>
        )}

        {hasQuery && results.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-dim mb-4">
              No results
            </p>
            <p className="text-[#555] text-sm">
              Nothing matched &ldquo;{query}&rdquo;. Try a different keyword.
            </p>
          </div>
        )}

        {hasQuery && results.length > 0 && (
          <>
            <p className="font-mono text-[10px] text-wmg-dim mb-8 uppercase tracking-[0.2em]">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
            <div className="flex flex-col gap-4">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group block bg-wmg-surface border border-wmg-border overflow-hidden relative transition-all"
                >
                  <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-wmg-green transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-6 pl-8">
                    <div className="flex items-center gap-3 mb-2">
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
                    <h2 className="font-display text-xl font-bold leading-tight mb-2 group-hover:text-wmg-green transition-colors">
                      {article.title}
                    </h2>
                    <p className="font-mono text-[10px] text-wmg-dim mb-2">
                      {article.citation}
                    </p>
                    <p className="text-sm text-[#888] leading-relaxed">
                      {article.hook}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
