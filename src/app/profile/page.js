"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Copy,
  LoaderCircle,
  LogOut,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending, error: sessionError, refetch } = useSession();
  const user = session?.user;
  const [draft, setDraft] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const name = draft?.name ?? user?.name ?? "";
  const username = draft?.username ?? user?.username ?? "";
  const bio = draft?.bio ?? user?.bio ?? "";
  const isAcceptingMessages =
    draft?.isAcceptingMessages ?? user?.isAcceptingMessages ?? true;

  const updateDraft = (field, value) => {
    setDraft((current) => ({
      name: current?.name ?? user?.name ?? "",
      username: current?.username ?? user?.username ?? "",
      bio: current?.bio ?? user?.bio ?? "",
      isAcceptingMessages:
        current?.isAcceptingMessages ?? user?.isAcceptingMessages ?? true,
      [field]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const cleanUsername = username.replace(/^@/, "").trim();
    const cleanName = name.trim();

    if (!cleanName) {
      setError("Enter a display name.");
      return;
    }
    if (!cleanUsername) {
      setError("Choose a username for your profile link.");
      return;
    }

    setError("");
    setNotice("");
    setIsSaving(true);
    try {
      const result = await authClient.updateUser({
        name: cleanName,
        username: cleanUsername,
        bio: bio.trim(),
        isAcceptingMessages,
      });
      if (result.error) {
        setError(result.error.message || "Could not save your profile.");
        return;
      }
      await refetch();
      setDraft({
        name: cleanName,
        username: cleanUsername,
        bio: bio.trim(),
        isAcceptingMessages,
      });
      setNotice("Your profile has been updated.");
    } catch (saveError) {
      console.error("Profile update failed:", saveError);
      setError(saveError?.message || "Could not save your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = async () => {
    if (!username.trim()) {
      setError("Save a username before copying your profile link.");
      return;
    }
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username.replace(/^@/, "").trim()}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (copyError) {
      console.error("Could not copy profile link:", copyError);
      setError("Could not copy the link. Check your browser permissions.");
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        setError(result.error.message || "Could not sign out.");
        return;
      }
      router.push("/login");
    } catch (signOutError) {
      console.error("Sign out failed:", signOutError);
      setError(signOutError?.message || "Could not sign out.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0c20] px-4 py-8 text-white">
      <div className="pointer-events-none fixed left-[-15%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#FF2E63]/15 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-[-20%] right-[-15%] h-[500px] w-[500px] rounded-full bg-[#FF8E53]/12 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] text-xl font-black italic shadow-lg shadow-rose-500/20 transition-transform group-hover:scale-105">
              ngl
            </span>
            <span className="text-lg font-black tracking-tight">ngl.link</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </header>

        {isPending ? (
          <div className="flex min-h-[50vh] items-center justify-center text-sm font-semibold text-zinc-400">
            <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-rose-400" />
            Loading your profile...
          </div>
        ) : !user ? (
          <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300">
              <UserRound className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-black">Sign in to view your profile</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              Your profile settings and anonymous message link are available after
              you sign in.
            </p>
            {sessionError && (
              <p role="alert" className="mt-4 text-sm font-semibold text-rose-300">
                {sessionError.message || "Could not load your session."}
              </p>
            )}
            <Link
              href="/login"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] px-6 py-3 font-black shadow-lg shadow-rose-500/20 transition hover:opacity-90"
            >
              Go to Log In
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-rose-300">
                <UserRound className="h-3.5 w-3.5" />
                Your account
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Profile settings
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Personalize your page and decide when you want to receive messages.
              </p>
            </div>

            <section className="mb-5 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
              <div className="h-28 bg-gradient-to-r from-[#FF2E63]/80 via-[#FF0055]/70 to-[#FF8E53]/80" />
              <div className="px-5 pb-5 sm:px-7">
                <div className="-mt-10 mb-4 flex items-end justify-between">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-zinc-900 bg-gradient-to-tr from-[#FF2E63] to-[#FF8E53] text-3xl font-black uppercase shadow-xl">
                    {(name || user.name || user.email || "?").charAt(0)}
                  </div>
                  <div className="mb-1 flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Account secured
                  </div>
                </div>
                <h2 className="text-xl font-black">{user.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  @{user.username || "username-not-set"}
                </p>
              </div>
            </section>

            <section className="mb-5 rounded-3xl border border-white/10 bg-zinc-900/80 p-5 shadow-xl backdrop-blur-xl sm:p-7">
              <div className="mb-5">
                <h2 className="text-lg font-black">Your public link</h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Share this link to receive anonymous messages.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <MessageCircle className="h-5 w-5 shrink-0 text-rose-400" />
                  <span className="truncate text-sm font-bold text-zinc-200">
                    ngl.link/{username || "your-username"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] px-5 py-3 text-sm font-black shadow-lg shadow-rose-500/15 transition hover:opacity-90"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </section>

            <form
              onSubmit={handleSave}
              className="rounded-3xl border border-white/10 bg-zinc-900/80 p-5 shadow-xl backdrop-blur-xl sm:p-7"
            >
              <div className="mb-6">
                <h2 className="text-lg font-black">Edit profile</h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Your email is private and cannot be changed here.
                </p>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Display name
                  </span>
                  <input
                    autoComplete="name"
                    className={inputClassName}
                    maxLength={80}
                    onChange={(event) => updateDraft("name", event.target.value)}
                    placeholder="Your name"
                    required
                    value={name}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Username
                  </span>
                  <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20">
                    <span className="pl-4 text-sm font-bold text-zinc-500">@</span>
                    <input
                      autoComplete="username"
                      className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm font-semibold text-white outline-none placeholder:text-zinc-600"
                      maxLength={30}
                      onChange={(event) =>
                        updateDraft(
                          "username",
                          event.target.value.replace(/\s+/g, ""),
                        )
                      }
                      placeholder="your_username"
                      required
                      value={username.replace(/^@/, "")}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    About you
                  </span>
                  <textarea
                    className={`${inputClassName} min-h-28 resize-y`}
                    maxLength={160}
                    onChange={(event) => updateDraft("bio", event.target.value)}
                    placeholder="Write a short bio..."
                    rows={4}
                    value={bio}
                  />
                  <span className="mt-1 block text-right text-[11px] text-zinc-500">
                    {bio.length}/160
                  </span>
                </label>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl bg-rose-500/10 p-2 text-rose-300">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Accept anonymous messages</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-400">
                        Turn this off to pause new messages to your profile.
                      </p>
                    </div>
                  </div>
                  <button
                    aria-checked={isAcceptingMessages}
                    aria-label="Accept anonymous messages"
                    className={`relative h-7 w-13 shrink-0 rounded-full transition-colors ${
                      isAcceptingMessages ? "bg-rose-500" : "bg-zinc-700"
                    }`}
                    onClick={() =>
                      updateDraft("isAcceptingMessages", !isAcceptingMessages)
                    }
                    role="switch"
                    type="button"
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow mx-[10px] transition-transform ${
                        isAcceptingMessages ? "translate-x-1" : "-translate-x-6"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {(error || notice) && (
                <p
                  aria-live="polite"
                  className={`mt-5 rounded-xl border px-4 py-3 text-sm font-semibold ${
                    error
                      ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  }`}
                  role={error ? "alert" : "status"}
                >
                  {error || notice}
                </p>
              )}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-zinc-300 transition hover:bg-white/5 hover:text-white disabled:opacity-60"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  type="button"
                >
                  {isSigningOut ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  Sign out
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] px-6 py-3 text-sm font-black shadow-lg shadow-rose-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSaving}
                  type="submit"
                >
                  {isSaving ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-500">
              <ShieldCheck className="h-3 w-3" />
              Your email address is only visible to you.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
