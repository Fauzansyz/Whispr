"use client";
import React from "react";
import Link from "next/link";
import { Copy, Share2, Sparkles, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full py-16 px-4 sm:px-8 bg-[#161324]/90 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Setup</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How NGL Works
          </h2>
          <p className="text-base text-zinc-400 mt-2 max-w-lg mx-auto font-medium">
            Start getting anonymous messages on your Instagram Story in less
            than 60 seconds.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-rose-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FF2E63] text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-[#FF2E63]/20">
                1
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                1. Create your profile
              </h3>
              <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-4">
                Create an account and choose the username for your personal
                message link.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-xs font-bold text-zinc-300 flex items-center gap-2">
              <span className="text-rose-400">@yourname</span>
              <span className="text-emerald-400 ml-auto text-[10px] font-black uppercase">
                Your profile
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-rose-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FF2E63] text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-[#FF2E63]/20">
                2
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                2. Copy Link
              </h3>
              <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-4">
                Get your unique link{" "}
                <code className="text-rose-300">ngl.link/yourname</code> and
                copy it with one tap.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-xs font-bold text-zinc-300 flex items-center justify-between">
              <span className="truncate">ngl.link/yourname</span>
              <button className="px-2.5 py-1 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase">
                Copy
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-rose-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FF2E63] text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-[#FF2E63]/20">
                3
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                3. Add to IG Story
              </h3>
              <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-4">
                Open Instagram Story, tap the Sticker icon, choose **LINK**, and
                paste your NGL link!
              </p>
            </div>
            <div className="bg-gradient-to-tr from-purple-900 to-pink-900 border border-white/10 rounded-2xl p-3 text-xs font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-pink-300" />
              <span>Paste in Sticker</span>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] hover:opacity-95 text-white font-black text-lg rotate-1 focus:rotate-0 transition-transform active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Create Your NGL Link Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
