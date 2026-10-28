"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Is NGL really 100% anonymous?",
    a: "Yes! Sender identities are completely anonymous. When someone sends you a message through your NGL link, no name or profile link is attached. You will only see the text of the message.",
  },
  {
    q: "Do I need to give my Instagram password?",
    a: "No! NGL will NEVER ask for your Instagram password or access to your account. You only enter your Instagram handle so we can generate your custom link (ngl.link/yourname).",
  },
  {
    q: "How do I add my link to my Instagram Story?",
    a: "Copy your NGL link, open Instagram and take a photo for your Story. Tap the Sticker icon at the top, select the 'LINK' sticker, paste your NGL URL, and place it on your story!",
  },
  {
    q: "How does NGL prevent cyberbullying?",
    a: "NGL uses state-of-the-art AI content moderation (Hive AI & Google Perspective) to automatically filter out harassment, profane language, and abusive messages before they reach your inbox.",
  },
  {
    q: "Can I reply to messages on Instagram?",
    a: "Yes! In your NGL inbox, click any message and choose 'Reply on IG Story'. It will generate a story-ready image that you can post to Instagram to answer your friends.",
  },
];

export default function FAQSection({ onOpenSafety }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleIdx = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-8 bg-[#161324]/90 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleIdx(idx)}
                  className="w-full p-4 sm:p-5 text-left font-black text-base text-white flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-rose-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 pt-1 text-sm text-zinc-400 font-medium leading-relaxed border-t border-white/5 bg-white/[0.02]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-zinc-400">
          Have more questions about safety?{" "}
          <button
            onClick={onOpenSafety}
            className="text-emerald-400 underline font-bold hover:text-emerald-300"
          >
            Visit Safety Center
          </button>
        </div>
      </div>
    </section>
  );
}
