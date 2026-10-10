"use client";

import { useState } from "react";
import { Check, Copy, Download, Link2, LoaderCircle, Share2 } from "lucide-react";
import { downloadStoryImage } from "@/lib/download-story";

function InstagramIcon(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function GetLinkView({ username }) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const publicLink = `ngl.link/${username}`;

  const handleCopy = async () => {
    setError("");
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${username}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (copyError) {
      console.error("Could not copy profile link:", copyError);
      setError("Could not copy the link. Check your browser permissions.");
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setError("");
    try {
      await download({
        label: "Send me anonymous messages",
        headline: "Ask me anything!",
        subtext: "Send me a message anonymously",
        footer: `ngl.link/${username}`,
        filename: `ngl-link-${username}.png`,
      });
    } catch (downloadError) {
      console.error("Could not download share image:", downloadError);
      setError(downloadError.message || "Could not create the story image.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="w-full px-4 py-6">
      <div className="mb-6 text-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-300">
          <Share2 className="h-3.5 w-3.5" />
          Share your profile
        </div>
        <h1 className="text-3xl font-black tracking-tight">Get your NGL link</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Share it with friends and collect anonymous messages.
        </p>
      </div>

      <div className="mb-4 rounded-3xl border border-white/10 bg-zinc-900/90 p-5 shadow-xl backdrop-blur-xl">
        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-400">
          Your personal link
        </label>
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-bold text-white">
            <Link2 className="h-4 w-4 shrink-0 text-rose-400" />
            <span className="truncate">{publicLink}</span>
          </div>
          <button
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] px-4 py-3 text-sm font-black shadow-lg shadow-rose-500/15 transition hover:opacity-90"
            onClick={handleCopy}
            type="button"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-3xl border border-white/10 bg-zinc-900/90 p-5 shadow-xl backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 p-2 text-white">
            <InstagramIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-extrabold">Post a story</h2>
            <p className="text-xs text-zinc-400">Download a 1080 × 1920 image for Instagram or Snapchat.</p>
          </div>
        </div>

        <div className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF2E63] via-[#9f174e] to-[#17102e] p-6 text-center">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#FF8E53]/40 blur-3xl" />
          <div className="relative rounded-3xl border border-white/15 bg-black/25 px-6 py-8 shadow-2xl">
            <div className="mx-auto mb-4 w-fit rounded-full bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/80">
              send me anonymous messages
            </div>
            <p className="text-2xl font-black">Ask me anything!</p>
            <div className="mx-auto mt-5 w-fit rounded-xl bg-white px-4 py-2 text-xs font-black text-zinc-900 shadow-lg">
              <Share2 className="mr-1 inline h-3.5 w-3.5 text-blue-500" />
              ngl.link/{username}
            </div>
          </div>
          <p className="relative mt-5 text-xs font-bold text-white/75">@{username}</p>
        </div>

        <button
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-black text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isDownloading}
          onClick={handleDownload}
          type="button"
        >
          {isDownloading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Download story image
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
