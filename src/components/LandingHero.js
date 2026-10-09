"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Dices, Send, Lock, Flame } from "lucide-react";

export default function LandingHero() {
  return (
    <section className="w-full pt-8 pb-16 px-4 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF2E63]/20 via-[#FF0055]/15 to-[#FF8E53]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-bold text-rose-300 mb-6 hover:bg-white/10 transition-colors cursor-pointer group shadow-lg">
          <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-white font-extrabold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            NGL Web 2.0 is live!
          </span>
          <span className="text-zinc-500">•</span>
          <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            Try instant Q&A <ArrowRight className="w-3 h-3 text-rose-400" />
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
          Get anonymous <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] drop-shadow-sm">
            messages on Instagram
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-lg sm:text-xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">
          Share your NGL link on your story. Friends can send you honest questions, secrets, & compliments anonymously without installing any app!
        </p>

        {/* Create account CTA */}
        <div className="mb-10 w-full max-w-md rounded-3xl border border-white/15 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-xl">
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] px-6 py-3.5 text-base font-black text-white shadow-xl shadow-[#FF2E63]/30 transition-all hover:opacity-95 active:scale-95"
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
              <span className="text-[11px] text-zinc-500 font-medium">2 mins ago • Anonymous</span>
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
              <h4 className="text-sm font-black mb-1">Cyberbullying Protection</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                NGL uses world-class AI safety models to automatically detect and block inappropriate or harmful content.
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
            <span className="block text-2xl sm:text-3xl font-black text-white">10M+</span>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Messages Sent</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-rose-400">#1</span>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Anonymous App</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400">100%</span>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
