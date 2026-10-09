"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Inbox,
  Link2,
  LoaderCircle,
  LogOut,
  Settings2,
  UserRound,
} from "lucide-react";
import GetLinkView from "@/components/GetLinkView";
import InboxView from "@/components/InboxView";
import { authClient, useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending, error } = useSession();
  const [tab, setTab] = useState("inbox");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [actionError, setActionError] = useState("");
  const user = session?.user;

  const handleSignOut = async () => {
    setActionError("");
    setIsSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        console.error("Sign out failed:", result.error);
        setActionError(result.error.message || "Could not sign out.");
        return;
      }
      router.push("/login");
    } catch (signOutError) {
      console.error("Sign out failed:", signOutError);
      setActionError(signOutError?.message || "Could not sign out.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0c20] text-white">
      <div className="pointer-events-none fixed left-[-15%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#FF2E63]/15 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-[-20%] right-[-15%] h-[500px] w-[500px] rounded-full bg-[#FF8E53]/12 blur-[140px]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f0c20]/85 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <Link className="flex shrink-0 items-center gap-2.5" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] text-xl font-black italic shadow-lg shadow-rose-500/25">
              ngl
            </span>
            <span className="hidden text-lg font-black sm:block">ngl.link</span>
          </Link>

          {user && (
            <nav aria-label="Dashboard" className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
              <button
                aria-pressed={tab === "inbox"}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                  tab === "inbox" ? "bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-white" : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setTab("inbox")}
                type="button"
              >
                <Inbox className="h-4 w-4" />
                Inbox
              </button>
              <button
                aria-pressed={tab === "share"}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                  tab === "share" ? "bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] text-white" : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setTab("share")}
                type="button"
              >
                <Link2 className="h-4 w-4" />
                Share
              </button>
            </nav>
          )}

          {user && (
            <div className="flex items-center gap-1">
              <Link
                aria-label="Profile settings"
                className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                href="/profile"
                title="Profile settings"
              >
                <Settings2 className="h-5 w-5" />
              </Link>
              <button
                aria-label="Sign out"
                className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                disabled={isSigningOut}
                onClick={handleSignOut}
                title="Sign out"
                type="button"
              >
                {isSigningOut ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-2 pb-12">
        {actionError && (
          <p className="mx-4 mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300" role="alert">
            {actionError}
          </p>
        )}
        {isPending ? (
          <div className="flex min-h-[60vh] items-center justify-center text-sm font-semibold text-zinc-400">
            <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-rose-400" />
            Loading your dashboard...
          </div>
        ) : !user ? (
          <section className="mx-4 mt-12 rounded-3xl border border-white/10 bg-zinc-900/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
            <UserRound className="mx-auto mb-4 h-10 w-10 text-rose-300" />
            <h1 className="text-2xl font-black">Your inbox starts here</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              Sign in to see messages sent anonymously to your profile.
            </p>
            {error && (
              <p className="mt-4 text-sm font-semibold text-rose-300" role="alert">
                {error.message || "Could not load your session."}
              </p>
            )}
            <Link
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] px-6 py-3 text-sm font-black shadow-lg shadow-rose-500/20 transition hover:opacity-90"
              href="/login"
            >
              Log in <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>
        ) : !user.username ? (
          <section className="mx-4 mt-12 rounded-3xl border border-white/10 bg-zinc-900/80 p-8 text-center shadow-2xl backdrop-blur-xl">
            <h1 className="text-2xl font-black">Choose your username</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Set a username before your public link can receive messages.
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] px-6 py-3 text-sm font-black"
              href="/profile"
            >
              Open profile settings
            </Link>
          </section>
        ) : tab === "inbox" ? (
          <InboxView username={user.username} />
        ) : (
          <GetLinkView username={user.username} />
        )}
      </div>
    </main>
  );
}
