"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, LoaderCircle, MessageCircle, Shield } from "lucide-react";

export default function PublicMessagePage({ username }) {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [prompt, setPrompt] = useState("send me anonymous messages!");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/profiles/${encodeURIComponent(username)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Profile not found.");
        setProfile(result.profile);
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Could not load this profile.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSending(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, content: message, prompt }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not send your message.");
      setSent(true);
      setMessage("");
    } catch (sendError) {
      setError(sendError.message || "Could not send your message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0c20] px-4 py-10 text-white">
      <div className="pointer-events-none fixed left-[-15%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#FF2E63]/15 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-[-20%] right-[-15%] h-[500px] w-[500px] rounded-full bg-[#FF8E53]/12 blur-[140px]" />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] text-xl font-black italic shadow-lg shadow-rose-500/25">
            Ws
          </span>
          <span className="text-xl font-black tracking-tight">Whispr</span>
        </Link>

        {isLoading ? (
          <div className="flex justify-center rounded-3xl border border-white/10 bg-zinc-900/80 p-12 text-zinc-400">
            <LoaderCircle className="h-6 w-6 animate-spin text-rose-400" />
          </div>
        ) : !profile ? (
          <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 text-center shadow-2xl backdrop-blur-xl">
            <h1 className="text-2xl font-black">Link not found</h1>
            <p className="mt-2 text-sm text-zinc-400">{error}</p>
            <Link href="/" className="mt-6 inline-flex text-sm font-bold text-rose-300 hover:text-rose-200">
              Go to ngl.link
            </Link>
          </section>
        ) : (
          <>
            <section className="mb-4 rounded-3xl border border-white/10 bg-zinc-900/80 p-6 text-center shadow-2xl backdrop-blur-xl">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF2E63] to-[#FF8E53] text-2xl font-black uppercase shadow-lg shadow-rose-500/20">
                {profile.name.charAt(0)}
              </div>
              <h1 className="text-xl font-black">{profile.name}</h1>
              <p className="mt-1 text-sm font-semibold text-rose-300">@{profile.username}</p>
              {profile.bio && (
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-zinc-400">
                  {profile.bio}
                </p>
              )}
            </section>

            {sent ? (
              <section className="flex flex-col items-center rounded-3xl border border-white/10 bg-zinc-900/90 p-8 text-center shadow-2xl">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 text-zinc-950">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <h2 className="text-2xl font-black">Message sent!</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Your message was delivered anonymously to @{profile.username}.
                </p>
                <button
                  className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
                  onClick={() => setSent(false)}
                  type="button"
                >
                  Send another
                </button>
              </section>
            ) : !profile.isAcceptingMessages ? (
              <section className="rounded-3xl border border-white/10 bg-zinc-900/90 p-8 text-center shadow-2xl">
                <MessageCircle className="mx-auto mb-3 h-8 w-8 text-zinc-500" />
                <h2 className="text-xl font-black">Messages are paused</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  @{profile.username} isn&apos;t accepting messages right now.
                </p>
              </section>
            ) : (
              <form
                className="rounded-3xl border border-white/10 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
                onSubmit={handleSubmit}
              >
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#FF2E63] via-[#FF0055] to-[#FF8E53] p-5 text-center shadow-lg shadow-rose-500/15">
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-white/75" htmlFor="message-prompt">
                    Your prompt
                  </label>
                  <input
                    className="w-full bg-transparent text-center text-lg font-black text-white outline-none placeholder:text-white/70"
                    id="message-prompt"
                    maxLength={120}
                    onChange={(event) => setPrompt(event.target.value)}
                    value={prompt}
                  />
                </div>

                <label className="sr-only" htmlFor="anonymous-message">Your anonymous message</label>
                <textarea
                  autoFocus
                  className="min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-white/5 p-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20"
                  id="anonymous-message"
                  maxLength={1000}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder={`Send ${profile.name} an anonymous message...`}
                  required
                  value={message}
                />
                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Shield className="h-3.5 w-3.5 text-emerald-400" />
                    No account needed. Your message is anonymous.
                  </span>
                  <span>{message.length}/1000</span>
                </div>

                {error && (
                  <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300" role="alert">
                    {error}
                  </p>
                )}

                <button
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] px-5 py-4 text-base font-black shadow-lg shadow-rose-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSending || !message.trim()}
                  type="submit"
                >
                  {isSending ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send anonymously
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}

        <p className="mt-6 text-center text-xs text-zinc-500">
          Want your own anonymous inbox?{" "}
          <Link className="font-bold text-rose-300 hover:text-rose-200" href="/register">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
