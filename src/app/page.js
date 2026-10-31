"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HowItWorksSection from "@/components/layout/LandingPage/HowItWorksSection";
import LandingHero from "@/components/layout/LandingPage/LandingHero";
import LandingNavbar from "@/components/layout/LandingPage/LandingNavbar";
import SafetyModal from "@/components/layout/LandingPage/SafetyModal";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  console.log(session?.user)

  const userAgent = navigator.userAgent;
  console.log(userAgent);

 const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hi dden bg-[#0f0c20] font-sans text-white selection:bg-rose-500 selection:text-white">
      <div className="pointer-events-none fixed left-[-10%] top-[-10%] h-[550px] w-[550px] rounded-full bg-[#FF2E63]/15 blur-[140px]" />

      <LandingNavbar
        userHandle={session?.user?.username || session?.user?.name}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="relative z-10 flex w-full flex-1 flex-col items-center">
        <LandingHero />
        <HowItWorksSection />
      </main>

      <footer className="relative z-10 mt-auto w-full border-t border-white/5 bg-[#0f0c20]/80 py-8 text-center text-xs font-medium text-zinc-500 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 font-bold text-zinc-400">
            <button
              className="transition-colors hover:text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              type="button"
            >
             Home
            </button>
            <span>•</span>
            <button
              className="text-rose-400 transition-colors hover:text-white"
              onClick={() => router.push(session ? "/dashboard" : "/login")}
              type="button"
            >
              {session ? "Dashboard" : "Log in"}
            </button>
            <span>•</span>
            <button
              className="transition-colors hover:text-white"
              onClick={() => scrollToSection("how-it-works")}
              type="button"
            >
              How it Works
            </button>
            <span>•</span>
            <button
              className="transition-colors hover:text-white"
              onClick={() => scrollToSection("game-modes")}
              type="button"
            >
              Game Modes
            </button>
            <span>•</span>
            <button
              className="text-emerald-400 transition-colors hover:text-white"
              onClick={() => setIsSafetyOpen(true)}
              type="button"
            >
              Safety Center
            </button>
          </div>
          <p className="mt-1 text-[11px] text-zinc-600">
            Anonymous messages, made simple.
          </p>
        </div>
      </footer>

      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />
    </div>
  );
}
