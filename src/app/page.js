"use client";

import React, { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import HowItWorksSection from "@/components/HowItWorksSection";
import GameModesSection from "@/components/GameModesSection";
import FAQSection from "@/components/FAQSection";
import LoginModal from "@/components/LoginModal";
import SafetyModal from "@/components/SafetyModal";

// Dashboard App Components
import Navbar from "@/components/Navbar";
import SendMessageView from "@/components/SendMessageView";
import GetLinkView from "@/components/GetLinkView";
import InboxView from "@/components/InboxView";

export default function Home() {
  const [userHandle, setUserHandle] = useState(null); // null when logged out
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("send"); // "send", "get-link", "inbox"
  const [viewMode, setViewMode] = useState("landing"); // "landing" or "dashboard"

  const handleLoginSuccess = (handle) => {
    setUserHandle(handle);
    setViewMode("dashboard");
    setActiveTab("send");
  };

  const handleLogout = () => {
    setUserHandle(null);
    setViewMode("landing");
  };

  const scrollToSection = (sectionId) => {
    if (viewMode !== "landing") {
      setViewMode("landing");
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0f0c20] text-white flex flex-col selection:bg-rose-500 selection:text-white relative overflow-hidden font-sans">
      {/* Background Ambient Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#FF2E63]/15 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#FF8E53]/15 blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Top Navbar depending on View Mode */}
      {viewMode === "landing" ? (
        <LandingNavbar
          userHandle={userHandle}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          onOpenSafety={() => setIsSafetyOpen(true)}
          onNavigateSection={scrollToSection}
        />
      ) : (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadCount={3}
          onOpenSafety={() => setIsSafetyOpen(true)}
        />
      )}

      {/* View Switcher Banner for logged in user */}
      {userHandle && (
        <div className="w-full bg-gradient-to-r from-[#FF2E63]/20 via-[#FF0055]/20 to-[#FF8E53]/20 border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs font-extrabold max-w-6xl mx-auto z-30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-rose-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Logged in as @{userHandle}</span>
          </div>

          <div className="flex items-center gap-3">
            {viewMode === "landing" ? (
              <button
                onClick={() => setViewMode("dashboard")}
                className="px-3 py-1 bg-white text-zinc-950 rounded-xl text-[11px] font-black hover:bg-zinc-100 transition-colors"
              >
                Go to Inbox & Dashboard →
              </button>
            ) : (
              <button
                onClick={() => setViewMode("landing")}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[11px] font-bold transition-colors"
              >
                ← Back to Landing Page
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {viewMode === "landing" ? (
        <main className="flex-1 w-full flex flex-col items-center relative z-10">
          <LandingHero
            onGetStarted={(handle) => handleLoginSuccess(handle)}
            onTryLiveDemo={() => {
              setUserHandle("demo_user");
              setViewMode("dashboard");
            }}
          />

          <HowItWorksSection
            onGetStarted={(handle) => handleLoginSuccess(handle)}
          />

          <GameModesSection
            onSelectGamePrompt={(prompt) => {
              setUserHandle("demo_user");
              setViewMode("dashboard");
              setActiveTab("send");
            }}
          />

          <FAQSection onOpenSafety={() => setIsSafetyOpen(true)} />
        </main>
      ) : (
        /* Logged-In NGL Dashboard View */
        <main className="flex-1 w-full max-w-xl mx-auto flex flex-col items-center justify-start relative z-10 py-4">
          {activeTab === "send" && (
            <SendMessageView
              username={userHandle || "alex_ngl"}
              onSwitchToGetLink={() => setActiveTab("get-link")}
              onOpenSafety={() => setIsSafetyOpen(true)}
            />
          )}

          {activeTab === "get-link" && (
            <GetLinkView
              username={userHandle || "alex_ngl"}
              setUsername={(h) => setUserHandle(h)}
            />
          )}

          {activeTab === "inbox" && <InboxView />}
        </main>
      )}

      {/* Footer */}
      <footer className="w-full py-8 text-center text-xs text-zinc-500 font-medium relative z-10 border-t border-white/5 bg-[#0f0c20]/80 backdrop-blur-md mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-400 font-bold">
            <button
              onClick={() => {
                setViewMode("landing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>•</span>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="hover:text-white transition-colors text-rose-400"
            >
              Log In
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-white transition-colors"
            >
              How it Works
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection("game-modes")}
              className="hover:text-white transition-colors"
            >
              Game Modes
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSafetyOpen(true)}
              className="hover:text-white transition-colors text-emerald-400"
            >
              Safety Center
            </button>
          </div>
          <p className="text-[11px] text-zinc-600 mt-1">
            © NGL App • Inspired by ngl.link anonymous Q&A web interface
          </p>
        </div>
      </footer>

      {/* Login & Registration Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Safety Policy Modal */}
      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />
    </div>
  );
}
