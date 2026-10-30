import { Link } from "next/link";
import { UserRound } from "lucide-react";

export default function Unauthorized() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0c20] px-4 py-8 text-white">
      <div className="pointer-events-none fixed left-[-15%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#FF2E63]/15 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-[-20%] right-[-15%] h-[500px] w-[500px] rounded-full bg-[#FF8E53]/12 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] text-xl font-black italic shadow-lg shadow-rose-500/20 transition-transform group-hover:scale-105">
              ws
            </span>
            <span className="text-lg font-black tracking-tight">Whispr</span>
          </Link>
        </header>
        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300">
            <UserRound className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black">Sign in to view your profile</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
            Your profile settings and anonymous message link are available after
            you sign in.
          </p>
          <Link
            href="/login"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] px-6 py-3 font-black shadow-lg shadow-rose-500/20 transition hover:opacity-90"
          >
            Go to Log In
          </Link>
        </section>
      </div>
    </main>
  );
}
