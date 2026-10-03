"use client";

import React from "react";
import { ShieldCheck, Lock, AlertTriangle, EyeOff, X } from "lucide-react";

export default function SafetyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Safety & Privacy</h2>
            <p className="text-xs text-zinc-400">How NGL protects users and combats abuse</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-zinc-300 leading-relaxed mb-6">
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 mb-1">
              <Lock className="w-4 h-4 text-emerald-400" />
              100% Anonymous Guarantees
            </h3>
            <p className="text-zinc-400">
              Sender identities are strictly confidential. No personal user data is ever shared on public cards or link pages.
            </p>
          </div>

          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 mb-1">
              <EyeOff className="w-4 h-4 text-amber-400" />
              AI Moderation & Anti-Bullying
            </h3>
            <p className="text-zinc-400">
              NGL uses world-class AI models to screen for harassment, hate speech, explicit content, and cyberbullying. Harmful messages are blocked automatically.
            </p>
          </div>

          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Report & Block System
            </h3>
            <p className="text-zinc-400">
              Users can report inappropriate messages instantly or block specific senders. Reported content is reviewed by human safety teams.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-white hover:bg-zinc-100 text-black font-extrabold text-sm rounded-2xl shadow-md transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
