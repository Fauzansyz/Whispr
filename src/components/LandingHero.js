"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Dices,
  Send,
  Lock,
  Flame,
} from "lucide-react";

const INTERACTIVE_STORIES = [
  {
    prompt: "send me anonymous messages!",
    message: "ngl your music taste is unmatched, put me on to your playlist 🔥",
    tag: "Music & Vibe",
    time: "2m ago",
  },
  {
    prompt: "be honest, am I intimidating? 😅",
    message: "only until someone talks to you, then you're literally so sweet",
    tag: "First Impression",
    time: "5m ago",
  },
  {
    prompt: "tell me a secret you've never told anyone",
    message:
      "i've had a crush on you since high school and never had the courage to say it 🙈",
    tag: "Confession",
    time: "12m ago",
  },
  {
    prompt: "what song reminds you of me?",
    message: "die with a smile — every time it comes on I think of you",
    tag: "Song Drop",
    time: "just now",
  },
];

export default function LandingHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = INTERACTIVE_STORIES[activeIdx];
  const nextStory =
    INTERACTIVE_STORIES[(activeIdx + 1) % INTERACTIVE_STORIES.length];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % INTERACTIVE_STORIES.length);
  };

  return (
    <section className="w-full pt-8 pb-16 px-4 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-[#161324]/90">
      {/* Flanking Floating Story Card - Left (desktop only) */}

      <div
        aria-hidden="true"
        className="hidden 2xl:flex pointer-events-none absolute left-8 top-20 w-64 -rotate-12 select-none flex-col rounded-3xl border border-white/10 bg-[#181528]/85 p-4 shadow-2xl backdrop-blur-md opacity-70 transition-transform duration-500 hover:-translate-y-2 hover:opacity-95 z-0"
      >
        <div className="rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] p-3 text-center text-white shadow-md">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
            Anonymous message
          </span>
          <p className="mt-1 text-xs font-bold leading-tight">
            send me honest opinions
          </p>
        </div>
        <blockquote className="mt-2.5 rouinded-2xl border border-white/10 bg-white/5 p-3.5 text-center text-xs font-bold text-zinc-100 leading-snug">
          “you are genuinely one of the funniest people on my feed”
        </blockquote>
        <div className="mt-2 text-center text-[10px] font-semibold text-zinc-500">
          Anonymous • 4m ago
        </div>
      </div>

      {/* Flanking Floating Story Card - Right (desktop only) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex pointer-events-none absolute right-8 top-28 w-64 rotate-12 select-none flex-col rounded-3xl border border-white/10 bg-[#181528]/85 p-4 shadow-2xl backdrop-blur-md opacity-70 transition-transform duration-500 hover:-translate-y-2 hover:opacity-95 z-0"
      >
        <div className="rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] p-3 text-center text-white shadow-md">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
            Anonymous message
          </span>
          <p className="mt-1 text-xs font-bold leading-tight">
            ask me anything 👀
          </p>
        </div>
        <blockquote className="mt-2.5 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center text-xs font-bold text-zinc-100 leading-snug">
          “what's one thing you wish people understood about you?”
        </blockquote>
        <div className="mt-2 text-center text-[10px] font-semibold text-zinc-500">
          Anonymous • just now
        </div>
      </div>

      <div className="max-w-4xl flex flex-col z-10 relative mx-auto items-center">
        <div className="max-w-4xl rounded-3xl bg-gradient-to-tr from-[#FF2E63]/20 via-[#FF0055]/15 to-[#FF8E53]/20 h-auto p-5 md:p-10 flex flex-col items-center">
          <div className="w-full flex flex-col h-auto">
            {/* Hero Title */}
            <div className="w-[80%] bg-[#181528] rotate-2 text-center">
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-1 p-2 relative -rotate-2 opacity-90">
                Get anonymous
              </h1>
            </div>

            <br className="hidden sm:block" />

            <div className="w-full flex justify-center text-right mt-1 px-4 md:min-w-3xl">
              <h1 className="text-5xl sm:text-6xl md:text-5xl font-black tracking-tight text-white leading-[1.1] mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] drop-shadow-sm">
                  messages on Instagram
                </span>
              </h1>
            </div>
          </div>

          {/* Create account CTA */}
          <div className="mb-8 w-full max-w-md px-4">
            <Link
              className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] px-6 py-3.5 text-base font-black text-white transition-all hover:opacity-95 active:scale-95 -rotate-2"
              href="/register"
            >
              <span>Create your anonymous link</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs font-medium text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Lock className="w-3 h-3" />
                Free & no account needed to send messages
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Tilted Story Card Showcase (Refined evolution of your card design) */}
        <div className="relative mb-12 w-full max-w-md flex flex-col items-center mt-5">
          {/* Stacked Back Card (Layered tilt effect) */}
          <div
            aria-hidden="true"
            className="absolute -top-3 w-[92%] rotate-3 rounded-3xl border border-white/10 bg-[#161324]/90 p-4 shadow-xl select-none opacity-40 blur-[0.5px] pointer-events-none transition-transform duration-300"
          >
            <div className="rounded-2xl bg-gradient-to-r from-[#FF2E63]/80 to-[#FF8E53]/80 p-3 text-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/70">
                Anonymous message
              </span>
              <p className="mt-1 text-xs font-bold text-white truncate">
                {nextStory.prompt}
              </p>
            </div>
            <div className="mt-2.5 rounded-2xl border border-white/5 bg-white/5 p-3 text-center text-xs font-semibold text-zinc-300 truncate">
              “{nextStory.message}”
            </div>
          </div>

          {/* Foreground Interactive Card (Tilted tactile story sticker) */}
          <div className="relative w-full -rotate-1 hover:rotate-0 transition-transform duration-300 rounded-3xl border border-white/15 bg-zinc-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-left">
            {/* Top Instagram Story sticker pill */}
            <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-[#FF2E63]/30 rotate-3 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Story Preview</span>
            </div>

            {/* Prompt Header Box */}
            <div className="rounded-2xl bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] p-4 text-center text-white shadow-lg shadow-[#FF2E63]/20">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span>Anonymous message</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              </div>
              <p className="mt-2 text-base sm:text-lg font-black leading-snug tracking-tight text-white">
                {current.prompt}
              </p>
            </div>

            {/* Message Body Bubble */}
            <blockquote className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-center text-sm sm:text-base font-bold text-zinc-100 leading-relaxed shadow-inner">
              “{current.message}”
            </blockquote>

            {/* Card Footer with Interactive Shuffle */}
            <div className="mt-3.5 flex items-center justify-between text-xs font-semibold text-zinc-400 px-1">
              <span className="text-[11px] text-zinc-500">
                Anonymous • {current.time}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 text-xs font-extrabold text-rose-400 hover:text-rose-300 transition-all py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5 text-amber-400" />
                <span>Shuffle Prompt</span>
              </button>
            </div>
          </div>

          {/* Quick interactive category selector */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {INTERACTIVE_STORIES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeIdx === idx
                    ? "bg-white text-zinc-950 shadow-md scale-105"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Feature Showcase Cards */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Mock Card 1 */}
          <div className="bg-gradient-to-br from-[#FF2E63] to-[#FF8E53] p-5 rounded-3xl text-white shadow-xl border border-white/20 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-3 text-white/80 text-xs font-black uppercase tracking-wider">
              <span>NGL Prompt</span>
              <Dices className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="text-xl font-black leading-tight mb-3">
              &quot;send me anonymous messages!&quot;
            </h3>
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-2.5 text-xs text-white/90 font-medium flex items-center justify-between">
              <span>be real, am I intimidating? 😅</span>
              <Send className="w-3.5 h-3.5 text-rose-300" />
            </div>
          </div>

          {/* Mock Card 2 */}
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-3xl text-white shadow-xl transform hover:-translate-y-1 transition-transform flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-rose-400 text-xs font-black uppercase tracking-wider">
                <span>Incoming Inbox</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </div>
              <p className="text-sm font-extrabold text-zinc-100 mb-2">
                &quot;never gonna lie, your music taste is 🔥&quot;
              </p>
              <span className="text-[11px] text-zinc-500 font-medium">
                2 mins ago • Anonymous
              </span>
            </div>
            <Link
              href="/register"
              className="mt-4 text-xs font-black text-rose-400 hover:text-rose-300 underline flex items-center gap-1"
            >
              Try it yourself <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mock Card 3 */}
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-3xl text-white shadow-xl transform hover:-translate-y-1 transition-transform flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <span>AI Moderated</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-black mb-1">
                Cyberbullying Protection
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                NGL uses world-class AI safety models to automatically detect
                and block inappropriate or harmful content.
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold mt-3 block">
              ✓ 100% Safe Environment
            </span>
          </div>
        </div>

        {/* Stats Ribbon */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12 border-t border-white/10 pt-8 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-white">
              10M+
            </span>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              Messages Sent
            </span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-rose-400">
              #1
            </span>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              Anonymous App
            </span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
              100%
            </span>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              Privacy Guaranteed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
