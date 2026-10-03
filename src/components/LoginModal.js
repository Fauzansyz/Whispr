"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Sparkles, ArrowRight, Instagram, Lock, CheckCircle2, UserCheck } from "lucide-react";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [handle, setHandle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = handle.replace(/^@/, "").trim();
    if (!clean) {
      setError("Please enter your Instagram username");
      return;
    }
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(clean);
      onClose();
    }, 600);
  };

  const handleQuickLogin = (demoHandle) => {
    setHandle(demoHandle);
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(demoHandle);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-zinc-900/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background element */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF2E63]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] flex items-center justify-center shadow-lg shadow-[#FF2E63]/30 mb-3">
            <span className="font-black text-white text-2xl tracking-tighter italic">ngl</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Log In to NGL</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Enter your Instagram username to access your inbox & link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
              Instagram Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 font-extrabold text-zinc-400 text-lg">@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value.replace(/\s+/g, ""));
                  if (error) setError("");
                }}
                placeholder="your_instagram_handle"
                className="w-full pl-9 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-base placeholder-zinc-600 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-rose-400 text-xs font-bold mt-1.5 pl-1">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-rose-500 focus:ring-rose-500 focus:ring-offset-0 accent-rose-500 cursor-pointer"
              />
              <span>Remember my account</span>
            </label>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              No password needed
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] hover:opacity-95 text-white font-black text-lg rounded-2xl shadow-xl shadow-[#FF2E63]/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Log In / Continue</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Accounts */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <span className="block text-[11px] uppercase font-extrabold text-zinc-500 text-center mb-2.5 tracking-wider">
            Or try instant demo account:
          </span>
          <div className="flex items-center justify-center gap-2">
            {["alex_ngl", "sarah_vibe", "jordan_dev"].map((demo) => (
              <button
                key={demo}
                type="button"
                onClick={() => handleQuickLogin(demo)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-zinc-300 transition-colors flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>@{demo}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Safety Footer note */}
        <div className="mt-5 text-center">
          <p className="text-[11px] text-zinc-500 font-medium flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            NGL will never ask for your Instagram password or post to your feed.
          </p>
        </div>
      </div>
    </div>
  );
}
