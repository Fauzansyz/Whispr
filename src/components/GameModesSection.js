"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dices, Sparkles, MessageSquare, Star, Flame, Music, ShieldAlert, Heart } from "lucide-react";

const GAME_MODES = [
  {
    id: "qna",
    icon: MessageSquare,
    title: "Anonymous Q&A",
    color: "from-rose-500 to-amber-500",
    prompt: "send me anonymous messages!",
    description: "The classic NGL prompt for general questions, confessions, and secrets.",
  },
  {
    id: "tbh",
    icon: Flame,
    title: "TBH (To Be Honest)",
    color: "from-orange-500 to-rose-600",
    prompt: "drop a name for a tbh 🤐",
    description: "Friends drop names in your link, and you reply on your story with an honest opinion.",
  },
  {
    id: "vibe",
    icon: Star,
    title: "Rate My Vibe",
    color: "from-yellow-400 to-orange-500",
    prompt: "rate my vibe from 1 to 10 🌟",
    description: "Let your followers rate your personality, style, or energy anonymously.",
  },
  {
    id: "redflag",
    icon: ShieldAlert,
    title: "Red Flag Test",
    color: "from-red-600 to-pink-600",
    prompt: "what's my biggest red flag? 🚩",
    description: "Find out what your friends really think your biggest red flag is!",
  },
  {
    id: "song",
    icon: Music,
    title: "Song Match",
    color: "from-purple-500 to-indigo-500",
    prompt: "what song reminds you of me? 🎵",
    description: "Discover what track or playlist vibe your friends associate with you.",
  },
  {
    id: "crush",
    icon: Heart,
    title: "Secret Confessions",
    color: "from-pink-500 to-rose-500",
    prompt: "tell me a secret nobody knows... 🤫",
    description: "A safe space for anonymous crushes, compliments, and real confessions.",
  },
];

export default function GameModesSection() {
  const [activeMode, setActiveMode] = useState(GAME_MODES[0]);

  return (
    <section id="game-modes" className="w-full py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF2E63]/10 border border-[#FF2E63]/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Dices className="w-3.5 h-3.5" />
            <span>Viral Q&A Formats</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            NGL Game Modes
          </h2>
          <p className="text-base text-zinc-400 mt-2 max-w-lg mx-auto font-medium">
            Choose from different viral game prompts or roll the dice for random questions!
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {GAME_MODES.map((game) => {
            const IconComp = game.icon;
            const isSelected = activeMode.id === game.id;
            return (
              <div
                key={game.id}
                onClick={() => setActiveMode(game)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-zinc-900 border-rose-500 shadow-xl shadow-rose-500/15 scale-[1.02]"
                    : "bg-zinc-900/60 border-white/10 hover:border-white/20 hover:bg-zinc-900"
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${game.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">{game.title}</h3>
                  <p className="text-xs text-zinc-400 font-medium mb-3">{game.description}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-rose-300 italic truncate max-w-[180px]">
                    "{game.prompt}"
                  </span>
                  <span className="text-[10px] font-black uppercase text-zinc-500">
                    {isSelected ? "Active" : "Select"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Game Preview Display */}
        <div className="w-full max-w-md mx-auto bg-gradient-to-br from-[#FF2E63] via-[#FF0055] to-[#FF8E53] p-6 rounded-3xl shadow-2xl text-white text-center border border-white/20">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md inline-block mb-3">
            Selected Mode: {activeMode.title}
          </span>
          <h3 className="text-2xl font-black text-white mb-4">
            "{activeMode.prompt}"
          </h3>
          <button
            onClick={() => onSelectGamePrompt(activeMode.prompt)}
            className="w-full py-3 bg-white text-zinc-950 font-black text-sm rounded-2xl shadow-lg hover:bg-zinc-100 transition-colors"
          >
            Use This Prompt in NGL Link
          </button>
        </div>
      </div>
    </section>
  );
}
