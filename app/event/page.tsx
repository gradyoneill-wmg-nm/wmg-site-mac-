"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-04-18T09:00:00-04:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-6 sm:gap-10 mt-8">
      {[
        { label: "DAYS", val: time.days },
        { label: "HOURS", val: time.hours },
        { label: "MIN", val: time.minutes },
        { label: "SEC", val: time.seconds },
      ].map(({ label, val }) => (
        <div key={label} className="text-center">
          <div className="font-display text-5xl sm:text-7xl font-black tabular-nums text-wmg-green">
            {String(val).padStart(2, "0")}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-wmg-dim mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", attending: "in-person" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/register-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Email grady@wateringmygrass.com to register.");
      setStatus("error");
    }
  };

  return (
    <div className="pt-14">
      {/* HERO */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-4">
            WMG × NON MAGIC · LAUNCH EVENT · NEW YORK CITY
          </p>
          <h1 className="font-display text-6xl sm:text-[100px] font-black tracking-[-3px] leading-none mb-6">
            April 18
          </h1>
          <p className="text-wmg-dim text-xl max-w-2xl leading-relaxed mb-4">
            The first time the community that reads the papers meets the app built from them.
            Free entry. Real science. New York City.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-wmg-green">
            In-person + Remote via Non Magic App
          </p>
          <Countdown />
        </div>
      </section>

      {/* WHAT IS THIS */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              n: "01",
              title: "Live Group Meditation",
              body: "A guided 40Hz frequency meditation session. In-person in NYC. Streaming live through the Non Magic app for remote attendees worldwide.",
            },
            {
              n: "02",
              title: "WMG Editorial Launch",
              body: "Three peer-reviewed deep dives go live: 40Hz & Alzheimer's (MIT, 2016), Schumann Resonance, and Copper & Inflammation. Named researchers. Journals. Sample sizes.",
            },
            {
              n: "03",
              title: "Non Magic App Goes Live",
              body: "April 18 is the public launch of Non Magic. Download before the event. Join the session remotely or attend in person — the app is your ticket.",
            },
          ].map(({ n, title, body }) => (
            <div key={n} className="border border-wmg-border p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-wmg-green mb-4">{n}</p>
              <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
              <p className="text-wmg-dim text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRATION + APP DOWNLOAD */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Registration form */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-4">
              Reserve Your Spot — Free
            </p>
            <h2 className="font-display text-3xl font-bold mb-8">Register</h2>

            {status === "success" ? (
              <div className="border border-wmg-green p-8">
                <p className="text-wmg-green font-mono text-sm mb-2 uppercase tracking-widest">✓ You&apos;re registered.</p>
                <p className="text-wmg-dim text-sm">See you April 18. Download Non Magic to join remotely or get details on the in-person location.</p>
                <a
                  href="https://apps.apple.com/app/non-magic"
                  className="inline-block mt-6 bg-wmg-green text-wmg-black px-6 py-3 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  Download Non Magic →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-mono text-[8px] uppercase tracking-[0.25em] text-wmg-dim block mb-2">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="w-full bg-wmg-surface border border-wmg-border px-4 py-3 text-sm text-white placeholder-wmg-dim focus:outline-none focus:border-wmg-green transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[8px] uppercase tracking-[0.25em] text-wmg-dim block mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-wmg-surface border border-wmg-border px-4 py-3 text-sm text-white placeholder-wmg-dim focus:outline-none focus:border-wmg-green transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[8px] uppercase tracking-[0.25em] text-wmg-dim block mb-2">Phone (optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (212) 000-0000"
                    className="w-full bg-wmg-surface border border-wmg-border px-4 py-3 text-sm text-white placeholder-wmg-dim focus:outline-none focus:border-wmg-green transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[8px] uppercase tracking-[0.25em] text-wmg-dim block mb-3">I plan to attend</label>
                  <div className="flex gap-4">
                    {["in-person", "remote"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm({ ...form, attending: opt })}
                        className={`flex-1 py-3 border font-mono text-[9px] uppercase tracking-widest transition-all ${
                          form.attending === opt
                            ? "border-wmg-green text-wmg-green bg-wmg-surface"
                            : "border-wmg-border text-wmg-dim hover:border-white"
                        }`}
                      >
                        {opt === "in-person" ? "In Person · NYC" : "Remote · Non Magic App"}
                      </button>
                    ))}
                  </div>
                </div>
                {status === "error" && (
                  <p className="text-red-400 font-mono text-xs">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-wmg-green text-wmg-black py-4 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-60"
                >
                  {status === "loading" ? "Registering..." : "Reserve Your Spot — Free"}
                </button>
                <p className="text-wmg-dim font-mono text-[8px] text-center">No spam. One confirmation email. That&apos;s it.</p>
              </form>
            )}
          </div>

          {/* App download + what to expect */}
          <div className="space-y-8">
            <div className="border border-wmg-border p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">Remote Access</p>
              <h3 className="font-display text-2xl font-bold mb-4">Join via Non Magic</h3>
              <p className="text-wmg-dim text-sm leading-relaxed mb-6">
                Attending remotely? Download Non Magic before April 18.
                The live group meditation session streams directly through the app.
                40Hz frequency. Guided practice. Free on launch day.
              </p>
              <a
                href="https://apps.apple.com/app/non-magic"
                className="block w-full border border-wmg-green text-wmg-green text-center py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-wmg-green hover:text-wmg-black transition-all"
              >
                Download Non Magic — iOS →
              </a>
            </div>

            <div className="border border-wmg-border p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">April 18 Schedule</p>
              <div className="space-y-4">
                {[
                  { time: "9:00 AM", label: "WMG goes live — 3 articles published" },
                  { time: "9:00 AM", label: "Non Magic app available for download" },
                  { time: "10:00 AM", label: "Live group meditation — in-person + remote" },
                  { time: "11:00 AM", label: "Community gathering — NYC location TBD" },
                  { time: "All day", label: "Newsletter · social · open to the world" },
                ].map(({ time, label }) => (
                  <div key={time + label} className="flex gap-4">
                    <span className="font-mono text-[9px] text-wmg-green uppercase w-16 shrink-0 pt-0.5">{time}</span>
                    <span className="text-wmg-dim text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES TEASER */}
      <section className="border-b border-wmg-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-6">Publishing April 18</p>
          <h2 className="font-display text-3xl font-bold mb-8">Three Articles. Zero Ads. All Receipts.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { slug: "wim-hof", title: "The 40Hz Question", citation: "Iaccarino et al., Nature, 2016 · N=mouse + 76 human" },
              { slug: "schumann-resonance", title: "The Earth's Heartbeat", citation: "Schumann, Z. Naturforsch., 1952" },
              { slug: "copper-inflammation", title: "Copper Miners Never Get Arthritis", citation: "Walker, Keats, Lancet, 1976" },
            ].map(({ slug, title, citation }) => (
              <Link
                key={slug}
                href={`/articles/${slug}`}
                className="border border-wmg-border p-6 hover:border-wmg-green transition-colors group"
              >
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-wmg-green transition-colors">{title}</h3>
                <p className="font-mono text-[8px] text-wmg-dim uppercase tracking-[0.1em]">{citation}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAY EVENT TEASER */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wmg-green mb-3">Coming May 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">NYC In-Person Event</h2>
          <p className="text-wmg-dim text-base max-w-lg mx-auto">
            Central Park. 1960s rave theme. You&apos;ll receive an invitation unlike anything you&apos;ve seen.
            Details coming after April 18.
          </p>
        </div>
      </section>
    </div>
  );
}
