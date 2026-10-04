"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import {authClient} from "@/lib/auth-client";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
];

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const passwordStrength = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const strengthPercent = (passwordStrength / PASSWORD_RULES.length) * 100;
  const strengthColor =
    strengthPercent < 40
      ? "bg-rose-500"
      : strengthPercent < 80
        ? "bg-amber-500"
        : "bg-emerald-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUser = username.replace(/^@/, "").trim();

    if (!cleanUser) {
      setError("Pick a username");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms & Privacy Policy");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const result = await authClient.signUp.email({
        name: cleanUser,
        email: email,
        password: password,
        username: cleanUser,
        callbackURL: "/",
      });
      if (result.error) {
        setError(
          result.error.message || "Sign up failed. Please check your details.",
        );
        return;
      }
      setStep(2);
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(
        typeof err === "string"
          ? err
          : err?.message || "Error initiating sign up.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#0f0c20] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
        <div className="fixed top-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-[#FF2E63]/15 blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="fixed bottom-[-20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-[#FF8E53]/12 blur-[140px] pointer-events-none animate-pulse-glow" />

        <div className="w-full max-w-md bg-zinc-900/80 border border-white/10 rounded-3xl p-10 shadow-2xl backdrop-blur-xl relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25">
            <Check className="w-10 h-10 text-zinc-950 stroke-[3]" />
          </div>

          <h1 className="text-3xl font-black tracking-tight mb-2">You&apos;re in! 🎉</h1>
          <p className="text-sm text-zinc-400 mb-8 max-w-xs">
            Your account <span className="text-white font-bold">@{username.replace(/^@/, "").trim()}</span> has been created. Start receiving anonymous messages now.
          </p>

          <div className="w-full flex flex-col gap-3">
            <Link
              href="/"
              className="w-full py-4 bg-gradient-to-r from-[#FF2E63] via-[#FF0055] to-[#FF8E53] hover:opacity-95 text-white font-black text-lg rounded-2xl shadow-xl shadow-[#FF2E63]/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/login"
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-2xl flex items-center justify-center transition-colors"
            >
              Go to Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-black tracking-tight mb-1">Create your account</h1>
          <p className="text-sm text-zinc-400">
            Set up your NGL link and start receiving anonymous messages
          </p>
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value.replace(/\s+/g, ""));
                  if (error) setError("");
                }}
                placeholder="pick_a_username"
                className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold placeholder-zinc-600 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                autoFocus
              />
            </div>
            {username.replace(/^@/, "").trim() && (
              <p className="mt-1 text-[11px] text-zinc-500 pl-1">
                Your link will be <span className="text-rose-300 font-bold">ngl.link/{username.replace(/^@/, "").trim()}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold placeholder-zinc-600 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
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

            {/* Strength meter */}
            {password && (
              <div className="mt-2 space-y-1.5">
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                    style={{ width: `${strengthPercent}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {PASSWORD_RULES.map((rule, i) => (
                    <span
                      key={i}
                      className={`text-[11px] font-semibold flex items-center gap-1 ${rule.test(password) ? "text-emerald-400" : "text-zinc-500"
                        }`}
                    >
                      {rule.test(password) ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-zinc-600 inline-block" />
                      )}
                      {rule.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-3.5 bg-white/5 border rounded-2xl text-white font-semibold placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${confirmPassword && confirmPassword !== password
                  ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
                  : confirmPassword && confirmPassword === password
                    ? "border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/20"
                    : "border-white/10 focus:border-rose-500 focus:ring-rose-500/20"
                  }`}
              />
              {confirmPassword && password && (
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {confirmPassword === password ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-xs text-rose-400 font-bold">✕</span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (error) setError("");
              }}
              className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 accent-rose-500 cursor-pointer shrink-0"
            />
            <span className="text-xs text-zinc-400 leading-relaxed">
              I agree to the{" "}
              <span className="text-rose-400 font-semibold hover:underline cursor-pointer">Terms of Service</span>
              {" "}and{" "}
              <span className="text-rose-400 font-semibold hover:underline cursor-pointer">Privacy Policy</span>
            </span>
          </label>

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
                <span>Create Account</span>
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

        {/* Social signup stubs */}
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
            Sign up with Google
          </button>

          <button
            type="button"
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Sign up with GitHub
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-rose-400 hover:text-rose-300 font-bold transition-colors"
          >
            Log in
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
