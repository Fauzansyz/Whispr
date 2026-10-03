"use client";

import { useState } from "react";
import { Sparkles, User, LogOut, Shield, ChevronRight, Menu, X } from "lucide-react";

export default function LandingNavbar({
  userHandle,
  onOpenLogin,
  onLogout,
  onOpenSafety,
  onNavigateSection,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0f0c20]/80 border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigateSection("hero")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] flex items-center justify-center shadow-lg shadow-[#FF2E63]/30 group-hover:scale-105 transition-transform duration-200">
            <span className="font-black text-white text-xl tracking-tighter italic">ngl</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tight text-white flex items-center gap-1.5">
              ngl.link
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 -mt-1">
              anonymous q&a
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-extrabold text-zinc-300">
          <button
            onClick={() => onNavigateSection("how-it-works")}
            className="hover:text-white transition-colors"
          >
            How it Works
          </button>
          <button
            onClick={() => onNavigateSection("game-modes")}
            className="hover:text-white transition-colors"
          >
            Game Modes
          </button>

          <button
            onClick={onOpenSafety}
            className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400"
          >
            <Shield className="w-4 h-4" />
            <span>Safety</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {userHandle ? (
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
              <div className="flex items-center gap-2 px-3 py-1 font-bold text-xs text-white">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-extrabold flex items-center justify-center text-[10px] border border-rose-500/30">
                  {userHandle.charAt(0).toUpperCase()}
                </div>
                <span>@{userHandle}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-rose-400 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 rounded-xl text-sm font-extrabold text-zinc-200 hover:text-white hover:bg-white/5 transition-all"
              >
                Log In
              </button>
              <button
                onClick={onOpenLogin}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] hover:opacity-95 text-white text-sm font-black shadow-lg shadow-[#FF2E63]/25 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Get Started</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>  {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 grid grid-cols-1 gap-3 overflow-hidden">
          <div className="p-4 space-y-2">
            <button
              onClick={() => {
                onNavigateSection("how-it-works");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 font-bold text-zinc-300 hover:text-white"
            >
              How it Works
            </button>
            <button
              onClick={() => {
                onNavigateSection("game-modes");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 font-bold text-zinc-300 hover:text-white"
            >
              Game Modes
            </button>

            <button
              onClick={() => {
                onOpenSafety();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 font-bold text-emerald-400 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Safety Center</span>
            </button>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {userHandle ? (
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
                  <span className="font-bold text-sm text-white">@{userHandle}</span>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-extrabold text-rose-400 underline"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] font-black text-white rounded-2xl text-center shadow-lg"
                >
                  Log In / Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
