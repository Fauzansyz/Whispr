"use client";

import React from "react";
import { MessageSquarePlus, Link as LinkIcon, Inbox, ShieldCheck } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, unreadCount = 3, onOpenSafety }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0f0c20]/80 border-b border-white/10 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* NGL Brand Logo */}
        <div 
          onClick={() => setActiveTab("send")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] flex items-center justify-center shadow-lg shadow-[#FF2E63]/30 group-hover:scale-105 transition-transform duration-200">
            <span className="font-black text-white text-lg tracking-tighter italic">ngl</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              ngl.link
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 -mt-1">
              anonymous q&a
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab("send")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === "send"
                ? "bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-white shadow-md shadow-[#FF2E63]/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>

          <button
            onClick={() => setActiveTab("get-link")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === "get-link"
                ? "bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-white shadow-md shadow-[#FF2E63]/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Get Link</span>
          </button>

          <button
            onClick={() => setActiveTab("inbox")}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === "inbox"
                ? "bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-white shadow-md shadow-[#FF2E63]/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inbox</span>
            {unreadCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-sm animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
