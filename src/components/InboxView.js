"use client";

import React, { useState } from "react";
import { Inbox, Eye, Sparkles, Share2, MapPin, Smartphone, Lock, X, Check, Heart, MessageSquare } from "lucide-react";

const INITIAL_MESSAGES = [
  {
    id: 1,
    prompt: "send me anonymous messages!",
    content: "never gonna lie, your music taste is actually 10/10 🔥",
    time: "2 mins ago",
    unread: true,
    hint: { device: "iPhone 15 Pro", location: "New York, USA", app: "Instagram Link" },
  },
  {
    id: 2,
    prompt: "tell me a secret nobody knows... 🤫",
    content: "I've had a huge crush on you since last summer 😳",
    time: "15 mins ago",
    unread: true,
    hint: { device: "Samsung Galaxy S24", location: "California, USA", app: "Snapchat Link" },
  },
  {
    id: 3,
    prompt: "what song reminds you of me? 🎵",
    content: "Midnight City by M83 always makes me think of our road trip!",
    time: "1 hour ago",
    unread: true,
    hint: { device: "iPhone 14", location: "London, UK", app: "Instagram Link" },
  },
  {
    id: 4,
    prompt: "be real, am I intimidating? 😅",
    content: "At first glance yes! But once people talk to you, you're super friendly!",
    time: "3 hours ago",
    unread: false,
    hint: { device: "Google Pixel 8", location: "Toronto, Canada", app: "Twitter Link" },
  },
];

export default function InboxView({ onSelectMessage }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [activeMessage, setActiveMessage] = useState(null);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [storyBgIndex, setStoryBgIndex] = useState(0);

  const unreadCount = messages.filter((m) => m.unread).length;

  const handleOpenMessage = (msg) => {
    // Mark as read
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, unread: false } : m))
    );
    setActiveMessage(msg);
  };

  const storyGradients = [
    "from-[#FF2E63] via-[#FF0055] to-[#FF8E53]",
    "from-purple-600 via-pink-600 to-rose-500",
    "from-indigo-600 via-blue-600 to-teal-400",
    "from-amber-500 via-orange-600 to-red-600",
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Inbox
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Click any message to open & reply</p>
        </div>

        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
          <Inbox className="w-6 h-6 text-rose-400" />
        </div>
      </div>

      {/* Message List */}
      <div className="w-full flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => handleOpenMessage(msg)}
            className={`w-full p-4 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
              msg.unread
                ? "bg-gradient-to-r from-[#FF2E63]/20 to-transparent border-rose-500/40 shadow-lg shadow-rose-500/10 hover:border-rose-500"
                : "bg-zinc-900/80 border-white/10 hover:border-white/20"
            }`}
          >
            {/* Unread indicator dot */}
            {msg.unread && (
              <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-md shadow-rose-500/50"></div>
            )}

            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                anonymous
              </span>
              <span className="text-[11px] font-medium text-zinc-500">{msg.time}</span>
            </div>

            <p className="text-sm font-extrabold text-white line-clamp-2 leading-snug group-hover:text-rose-200 transition-colors">
              "{msg.content}"
            </p>

            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 font-semibold">
              <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">Prompt: {msg.prompt}</span>
              <span className="flex items-center gap-1 text-rose-400 group-hover:translate-x-0.5 transition-transform">
                <Eye className="w-3.5 h-3.5" />
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Detail Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={() => setActiveMessage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header prompt box */}
            <div className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] p-4 rounded-2xl text-white text-center mb-4 shadow-lg">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80 block mb-1">
                Anonymous Q&A
              </span>
              <span className="text-xs font-extrabold block">"{activeMessage.prompt}"</span>
            </div>

            {/* Message Body */}
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-center">
              <p className="text-xl font-black text-white leading-relaxed">
                "{activeMessage.content}"
              </p>
              <span className="text-[11px] text-zinc-400 font-medium block mt-3">
                Received {activeMessage.time}
              </span>
            </div>

            {/* Actions */}
            <div className="w-full flex flex-col gap-2.5">
              <button
                onClick={() => setShowHintModal(true)}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Who sent this? (Unlock Hint)</span>
              </button>

              <button
                onClick={() => setShowReplyModal(true)}
                className="w-full py-3 px-4 bg-white hover:bg-zinc-100 text-black font-extrabold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-black" />
                <span>Reply on IG Story</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hint / Pro Peek Modal */}
      {showHintModal && activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setShowHintModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-white mb-1">NGL Pro Hint</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Here are the sender device details captured by NGL:
            </p>

            <div className="bg-white/5 rounded-2xl p-3 text-left space-y-2 mb-4 text-xs font-semibold text-zinc-300 border border-white/5">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-rose-400" />
                <span>Device: {activeMessage.hint.device}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Location: {activeMessage.hint.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Source: {activeMessage.hint.app}</span>
              </div>
            </div>

            <button
              onClick={() => setShowHintModal(false)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* IG Story Reply Modal Generator */}
      {showReplyModal && activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-5 shadow-2xl relative flex flex-col items-center">
            <button
              onClick={() => setShowReplyModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-black uppercase text-zinc-400 mb-3">
              Story Reply Generator
            </span>

            {/* Story Card canvas mockup */}
            <div className={`w-full bg-gradient-to-br ${storyGradients[storyBgIndex]} rounded-3xl p-6 text-white text-center shadow-2xl mb-4 transition-all duration-300 border border-white/20 flex flex-col items-center justify-center min-h-[220px]`}>
              <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                {activeMessage.prompt}
              </div>
              <h2 className="text-xl font-black text-white leading-tight mb-4">
                "{activeMessage.content}"
              </h2>
              <div className="bg-white text-zinc-900 text-xs font-black px-4 py-2 rounded-xl shadow-lg">
                Reply: "Thanks for asking! 😊"
              </div>
            </div>

            {/* Color switcher */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-bold text-zinc-400">Color:</span>
              {storyGradients.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => setStoryBgIndex(idx)}
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${g} border-2 ${
                    storyBgIndex === idx ? "border-white scale-110" : "border-transparent"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                alert("Story image ready! Copy to Instagram Story.");
                setShowReplyModal(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-white font-extrabold text-sm rounded-2xl shadow-lg"
            >
              Share to Instagram Story
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
