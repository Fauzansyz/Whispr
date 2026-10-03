"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Dices, Send, Shield, CheckCircle2, Sparkles, Edit2, RotateCcw, AlertCircle } from "lucide-react";

const PROMPT_PRESETS = [
  "send me anonymous messages!",
  "tell me a secret nobody knows... 🤫",
  "what is your honest opinion of me? 💭",
  "be real, am I intimidating? 😅",
  "what song reminds you of me? 🎵",
  "rate my vibe from 1 to 10 🌟",
  "what's my biggest red flag? 🚩",
  "drop a name for a tbh 🤐",
  "would you ever date me? 😳",
  "what's one thing you've always wanted to tell me?",
];

export default function SendMessageView({ username = "alex_ngl", onSwitchToGetLink, onOpenSafety }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentPrompt = customPrompt || PROMPT_PRESETS[promptIndex];

  const handleShufflePrompt = () => {
    setIsSpinning(true);
    setCustomPrompt("");
    setIsEditingPrompt(false);
    
    // Pick next prompt index distinct from current
    setPromptIndex((prev) => (prev + 1) % PROMPT_PRESETS.length);

    setTimeout(() => {
      setIsSpinning(false);
    }, 400);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMessage("Please type a message before sending!");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF2E63", "#FF0055", "#FF8E53", "#FFFFFF", "#FFD700"],
        });
      } catch (err) {
        // Fallback if canvas confetti fails
      }
    }, 600);
  };

  const handleReset = () => {
    setMessage("");
    setIsSent(false);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-5 group">
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] shadow-lg shadow-[#FF2E63]/30 mb-2">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border-2 border-[#0f0c20] overflow-hidden">
            <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300 uppercase">
              {username.charAt(0)}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-[#0f0c20]">
            <Sparkles className="w-3 h-3 fill-current" />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-white tracking-wide">@{username}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-widest">
            online
          </span>
        </div>
      </div>

      {/* Main NGL Prompt Card */}
      {!isSent ? (
        <div className="w-full flex flex-col items-center">
          {/* Card Speech Bubble */}
          <div className="w-full relative bg-gradient-to-br from-[#FF2E63] via-[#FF0055] to-[#FF8E53] rounded-3xl p-6 shadow-2xl shadow-[#FF2E63]/30 border border-white/20 transition-all duration-300">
            {/* Header controls inside card */}
            <div className="flex items-center justify-between mb-3 text-white/90">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>NGL Prompt</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                  className="p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
                  title="Customize prompt"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleShufflePrompt}
                  className={`p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-transform ${
                    isSpinning ? "rotate-180 transition-transform duration-300" : ""
                  }`}
                  title="Shuffle prompt"
                >
                  <Dices className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>

            {/* Prompt Text Display or Edit */}
            {isEditingPrompt ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Type custom prompt..."
                  maxLength={60}
                  className="w-full px-3 py-2 bg-black/30 text-white placeholder-white/60 rounded-xl font-bold text-center text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  autoFocus
                />
              </div>
            ) : (
              <h2 className="text-2xl font-black text-white text-center leading-tight tracking-tight mb-4 min-h-[3.5rem] flex items-center justify-center drop-shadow-sm px-2">
                "{currentPrompt}"
              </h2>
            )}

            {/* Prompt Dice Action Ribbon */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleShufflePrompt}
                className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all active:scale-95 border border-white/20"
              >
                <Dices className={`w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform duration-300 ${isSpinning ? "animate-spin" : ""}`} />
                <span>Shuffle prompt (dice)</span>
              </button>
            </div>

            {/* Speech Bubble Pointer */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#FF8E53] rotate-45 rounded-sm"></div>
          </div>

          {/* Form Message Container */}
          <form onSubmit={handleSend} className="w-full mt-6 flex flex-col items-center">
            {/* Input Textarea Card */}
            <div className="w-full relative bg-zinc-900/90 border border-white/10 rounded-3xl p-4 shadow-xl backdrop-blur-xl focus-within:border-rose-500/50 transition-colors">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                maxLength={300}
                placeholder="send me anonymous messages..."
                rows={4}
                className="w-full bg-transparent text-white placeholder-zinc-500 text-base font-medium resize-none focus:outline-none"
              />

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  100% Anonymous
                </span>
                <span>{message.length} / 300</span>
              </div>
            </div>

            {/* Error state alert if empty */}
            {errorMessage && (
              <div className="mt-2 text-rose-400 text-xs font-bold flex items-center gap-1 animate-shake">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Prompt Idea Chips */}
            <div className="w-full flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-zinc-500 shrink-0">Ideas:</span>
              {["You're awesome! ✨", "Secret crush? 🤫", "Favorite memory? 📸", "Rate me! 🌟"].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage((prev) => (prev ? prev + " " + chip : chip))}
                  className="shrink-0 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-zinc-300 border border-white/10 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Prominent NGL "Send!" Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-4 px-6 bg-white hover:bg-zinc-100 text-black font-black text-xl rounded-full shadow-xl shadow-white/10 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Send!</span>
                  <Send className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Safety Footnote */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
              <button
                type="button"
                onClick={onOpenSafety}
                className="hover:text-zinc-300 underline flex items-center gap-1 transition-colors"
              >
                <span>🔒 safety & privacy policy</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={onOpenSafety}
                className="hover:text-zinc-300 underline transition-colors"
              >
                report abuse
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Sent Confirmation Screen */
        <div className="w-full bg-zinc-900/90 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 text-zinc-950 stroke-[2.5]" />
          </div>

          <h3 className="text-2xl font-black text-white mb-2">Message Sent! 🎉</h3>
          <p className="text-sm text-zinc-400 mb-6 max-w-xs">
            @{username} will get your anonymous message. Nobody can ever see who sent it.
          </p>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleReset}
              className="w-full py-3.5 px-5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Send another message</span>
            </button>

            <button
              onClick={onSwitchToGetLink}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] hover:opacity-95 text-white font-extrabold rounded-2xl shadow-lg shadow-[#FF2E63]/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Get your own NGL link!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
