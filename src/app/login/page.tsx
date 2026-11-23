"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scale,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Award,
  KeyRound,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DEFAULT_SCHOLAR_CREDENTIALS,
  loginAsDefaultScholar,
  loginWithEmailAndPassword,
  getActiveUser,
} from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState(DEFAULT_SCHOLAR_CREDENTIALS.email);
  const [password, setPassword] = React.useState(DEFAULT_SCHOLAR_CREDENTIALS.password);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleDefaultScholarLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loginAsDefaultScholar();
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate default scholar");
      setIsLoading(false);
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await loginWithEmailAndPassword(email, password);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 600);
      } else {
        setError(res.error || "Authentication failed. Check credentials.");
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected login error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-sm">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white">
              JurisFlow
            </span>
            <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 bg-amber-500/10 text-amber-300 rounded border border-amber-500/20">
              GCP Auth
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">
              Back to Overview
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Header text */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-medium">
              <Cloud className="h-3.5 w-3.5 text-blue-400" />
              <span>Firebase Cloud Authentication & GCP Identity</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sign In to JurisFlow
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Access judicial clerkship pipelines, NLU alumni networks, and AI memory hooks.
            </p>
          </div>

          {/* Card Container */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            {/* Instant Default Scholar One-Click Login Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-amber-300">
                    Default Scholar One-Click Access
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Pre-Authorized
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-0.5 font-mono text-[11px]">
                <div>Email: <span className="text-white font-semibold">{DEFAULT_SCHOLAR_CREDENTIALS.email}</span></div>
                <div>Role: <span className="text-slate-400">{DEFAULT_SCHOLAR_CREDENTIALS.university}</span></div>
              </div>

              <Button
                onClick={handleDefaultScholarLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 py-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-white">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Connecting to Cloud...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-1.5 text-white">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                    Authenticated! Launching...
                  </span>
                ) : (
                  <>
                    <span>Direct Login as Default Scholar</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-950" />
                  </>
                )}
              </Button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative bg-slate-900 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Or Sign In with Credentials
              </span>
            </div>

            {/* Error banner */}
            {error && (
              <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Manual Form */}
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  Institutional / Scholar Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mdc18042007@gmail.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    Password
                  </label>
                  <span className="text-[11px] text-amber-400 font-mono">
                    Default: Nlu@1567
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs py-2 shadow-xs"
              >
                {isLoading ? "Authenticating..." : "Sign In with Password"}
              </Button>
            </form>

            {/* Cloud and security footer */}
            <div className="pt-2 border-t border-slate-800 text-center space-y-2">
              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Firebase Auth
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Cloud className="h-3.5 w-3.5 text-blue-400" />
                  Google Cloud Firestore
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Encrypted end-to-end. Compliant with Indian Bar Council research disclosure standards.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        JurisFlow • Built with passion for law students & judicial aspirants across India
      </footer>
    </div>
  );
}
