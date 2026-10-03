"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowRight, Sparkles, Smartphone, Share2, Info } from "lucide-react";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function GetLinkView({ username, setUsername }) {
  const [handle, setHandle] = useState(username || "");
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const cleanHandle = handle.replace(/^@/, "").trim() || "your_handle";
  const generatedLink = `ngl.link/${cleanHandle}`;

  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://${generatedLink}`);
      setCopied(true);
      setShowToast(true);
      if (setUsername && handle) {
        setUsername(cleanHandle);
      }
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-16 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-sm animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Link copied to clipboard! Share it anywhere 🚀</span>
        </div>
      )}

      {/* Header Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NGL Link Creator</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Get Your NGL Link</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Receive anonymous questions & confessions from friends!
        </p>
      </div>

      {/* Step 1: Handle Input */}
      <div className="w-full bg-zinc-900/90 border border-white/10 rounded-3xl p-5 shadow-xl backdrop-blur-xl mb-4">
        <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
          1. Enter your Instagram handle
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 font-bold text-zinc-400 text-lg">@</span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value.replace(/\s+/g, ""))}
            placeholder="your_instagram_handle"
            className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-base placeholder-zinc-600 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      </div>

      {/* Step 2: Copy Link */}
      <div className="w-full bg-zinc-900/90 border border-white/10 rounded-3xl p-5 shadow-xl backdrop-blur-xl mb-6">
        <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
          2. Copy your unique NGL link
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white font-bold text-sm tracking-wide truncate">
            {generatedLink}
          </div>
          <button
            onClick={handleCopy}
            className={`px-5 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 ${
              copied
                ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20"
                : "bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-white shadow-lg shadow-[#FF2E63]/20 hover:opacity-95"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step 3: How to share on IG Story */}
      <div className="w-full bg-zinc-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white">
            <InstagramIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">3. Share to Instagram Story</h3>
            <p className="text-xs text-zinc-400">Follow these 3 easy steps to start receiving messages</p>
          </div>
        </div>

        {/* 3 Steps Guide Cards */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center text-center border border-white/5">
            <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center mb-2 border border-rose-500/30">
              1
            </div>
            <span className="text-[11px] font-bold text-zinc-200 leading-tight">Copy your link above</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center text-center border border-white/5">
            <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center mb-2 border border-rose-500/30">
              2
            </div>
            <span className="text-[11px] font-bold text-zinc-200 leading-tight">Create IG Story & tap sticker</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center text-center border border-white/5">
            <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-black text-xs flex items-center justify-center mb-2 border border-rose-500/30">
              3
            </div>
            <span className="text-[11px] font-bold text-zinc-200 leading-tight">Select LINK & paste NGL link</span>
          </div>
        </div>

        {/* Visual Instagram Story Mockup */}
        <div className="w-full bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 rounded-2xl p-4 border border-white/10 relative overflow-hidden flex flex-col items-center py-6 shadow-inner">
          <div className="text-[10px] uppercase tracking-widest font-black text-purple-300 mb-3 bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-500/30">
            Instagram Story Preview
          </div>

          {/* Prompt card mockup */}
          <div className="w-48 bg-gradient-to-br from-[#FF2E63] to-[#FF8E53] rounded-2xl p-3 text-white text-center shadow-2xl mb-4 border border-white/20">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block mb-1">send me anonymous messages</span>
            <span className="text-xs font-black block">"ask me anything! 💬"</span>
          </div>

          {/* IG Link Sticker Mockup */}
          <div className="bg-white text-zinc-900 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 border border-zinc-200 animate-float">
            <Share2 className="w-3.5 h-3.5 text-blue-500" />
            <span>ngl.link/{cleanHandle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
