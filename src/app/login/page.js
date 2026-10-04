"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = handle.replace(/^@/, "").trim();
    if (!clean) {
      setError("Enter your username to continue");
      return;
    }
    if (!password) {
      setError("Enter your password");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Simulate auth
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0f0c20] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Ambient glow */}
      <div className="fixed top-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-[#FF2E63]/15 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-[-20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-[#FF8E53]/12 blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FF0055] to-[#FF8E53] flex items-center justify-center shadow-lg shadow-[#FF2E63]/30 group-hover:scale-105 transition-transform">
          <span className="font-black text-white text-2xl tracking-tighter italic">ngl</span>
        </div>
        <span className="font-black text-2xl tracking-tight text-white">
          ngl.link
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-zinc-900/80 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black tracking-tight mb-1">Welcome back</h1>
          <p className="text-sm text-zinc-400">Log in to check your anonymous messages</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value.replace(/\s+/g, ""));
                  if (error) setError("");
                }}
                placeholder="your_username"
                className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold placeholder-zinc-600 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold placeholder-zinc-600 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 accent-rose-500 cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-rose-400 hover:text-rose-300 font-semibold transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-2.5 text-sm text-rose-400 font-semibold">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] hover:opacity-95 text-white font-black text-lg rounded-2xl shadow-xl shadow-[#FF2E63]/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social login stubs */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-zinc-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-rose-400 hover:text-rose-300 font-bold transition-colors"
          >
            Sign up free
          </Link>
        </p>
      </div>

      {/* Bottom safety note */}
      <p className="mt-6 text-[11px] text-zinc-600 text-center flex items-center gap-1.5 relative z-10">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        Your data is encrypted and never shared with third parties.
      </p>
    </div>
  );
}
