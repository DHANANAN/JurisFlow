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
  Eye,
  EyeOff,
  User as UserIcon,
  School,
  Compass,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  loginWithEmailAndPassword,
  registerNewUser,
  exploreAsGuestScholar,
} from "@/lib/firebase";
import { useTheme } from "@/lib/theme-context";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "sand-gold";

  const [activeTab, setActiveTab] = React.useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = React.useState(false);

  // Sign In state
  const [signInEmail, setSignInEmail] = React.useState("");
  const [signInPassword, setSignInPassword] = React.useState("");

  // Sign Up state
  const [signUpName, setSignUpName] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpUniversity, setSignUpUniversity] = React.useState("");
  const [signUpYear, setSignUpYear] = React.useState("3rd Year B.A. LL.B.");
  const [signUpLocation, setSignUpLocation] = React.useState("Delhi NCR");
  const [signUpPassword, setSignUpPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await loginWithEmailAndPassword(signInEmail, signInPassword);
    if (res.success) {
      setSuccessMsg("Signed in successfully. Launching workspace...");
      setTimeout(() => router.push("/dashboard"), 500);
    } else {
      setError(res.error || "Authentication failed. Please verify your credentials.");
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await registerNewUser({
      name: signUpName,
      email: signUpEmail,
      university: signUpUniversity,
      year: signUpYear,
      location: signUpLocation,
      password: signUpPassword,
    });

    if (res.success) {
      setSuccessMsg("Account created! Launching your private workspace...");
      setTimeout(() => router.push("/dashboard"), 600);
    } else {
      setError(res.error || "Failed to create account. Please check your details.");
      setIsLoading(false);
    }
  };

  const handleGuestExplore = async () => {
    setIsLoading(true);
    setError(null);
    await exploreAsGuestScholar();
    setSuccessMsg("Guest scholar session initiated. Launching...");
    setTimeout(() => router.push("/dashboard"), 400);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        isLight
          ? "bg-[#faf7f0] text-stone-900 selection:bg-amber-300 selection:text-stone-950"
          : "bg-[#040711] text-slate-100 selection:bg-amber-500 selection:text-slate-950"
      }`}
    >
      {/* Top Header */}
      <header
        className={`border-b px-6 py-4 flex items-center justify-between backdrop-blur-md transition-colors ${
          isLight ? "bg-white/80 border-stone-200" : "bg-slate-950/80 border-slate-800"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <span className={`font-bold text-base tracking-tight ${isLight ? "text-stone-900" : "text-white"}`}>
              JurisFlow
            </span>
            <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              Scholar Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg border transition-colors ${
              isLight ? "border-stone-200 text-amber-800 hover:bg-stone-100" : "border-slate-800 text-amber-400 hover:bg-slate-900"
            }`}
            title={`Switch to ${isLight ? "Cosmic Space" : "Sand Golden"}`}
          >
            {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-xs">
              Overview
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Login / Signup Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Privacy-Protected Multi-User Platform</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? "text-stone-950" : "text-white"}`}>
              {activeTab === "signin" ? "Sign In to JurisFlow" : "Create Scholar Account"}
            </h1>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              {activeTab === "signin"
                ? "Access your judicial clerkship pipelines and AI outreach history."
                : "Create a private account to track internships and generate custom applications."}
            </p>
          </div>

          {/* Form Container */}
          <div
            className={`rounded-2xl border p-6 sm:p-7 shadow-xl backdrop-blur-xl transition-all ${
              isLight
                ? "bg-white border-stone-200 text-stone-900"
                : "bg-slate-900/90 border-slate-800 text-slate-100"
            }`}
          >
            {/* Tab switch */}
            <div className="flex rounded-xl p-1 mb-5 bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signin");
                  setError(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "signin"
                    ? isLight
                      ? "bg-white text-stone-950 shadow-xs"
                      : "bg-slate-800 text-white shadow-xs"
                    : "text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signup");
                  setError(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "signup"
                    ? isLight
                      ? "bg-white text-stone-950 shadow-xs"
                      : "bg-slate-800 text-white shadow-xs"
                    : "text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {activeTab === "signin" ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-stone-400 dark:text-slate-500" />
                    Institutional Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="e.g. yourname@lawschool.edu.in"
                    className="w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-stone-400 dark:text-slate-500" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border pl-3.5 pr-10 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:text-slate-500 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-2.5 shadow-md transition-all"
                >
                  {isLoading ? "Authenticating..." : "Sign In to Workspace"}
                </Button>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignUp} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 dark:text-slate-300 flex items-center gap-1">
                    <UserIcon className="h-3.5 w-3.5 text-stone-400" />
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. Aanya Sharma"
                    className="w-full rounded-xl border px-3 py-2 text-xs border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 dark:text-slate-300 flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-stone-400" />
                    Student / Scholar Email
                  </label>
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="e.g. aanya@nludelhi.ac.in"
                    className="w-full rounded-xl border px-3 py-2 text-xs border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-slate-300 flex items-center gap-1">
                      <School className="h-3.5 w-3.5 text-stone-400" />
                      Law University
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpUniversity}
                      onChange={(e) => setSignUpUniversity(e.target.value)}
                      placeholder="e.g. NLU Delhi / NALSAR"
                      className="w-full rounded-xl border px-3 py-2 text-xs border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-slate-300">
                      Academic Year
                    </label>
                    <select
                      value={signUpYear}
                      onChange={(e) => setSignUpYear(e.target.value)}
                      className="w-full rounded-xl border px-2.5 py-2 text-xs border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                      <option value="1st Year B.A. LL.B.">1st Year</option>
                      <option value="2nd Year B.A. LL.B.">2nd Year</option>
                      <option value="3rd Year B.A. LL.B.">3rd Year</option>
                      <option value="4th Year B.A. LL.B.">4th Year</option>
                      <option value="5th Year B.A. LL.B.">5th Year</option>
                      <option value="LL.M. Candidate">LL.M.</option>
                      <option value="Junior Advocate">Junior Advocate</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 dark:text-slate-300 flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5 text-stone-400" />
                    Set Safe Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-xl border px-3 py-2 text-xs border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-2.5 shadow-md transition-all mt-2"
                >
                  {isLoading ? "Creating..." : "Create My Account"}
                </Button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200 dark:border-slate-800" />
              </div>
              <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] uppercase tracking-wider font-mono text-stone-400 dark:text-slate-500">
                Or Instant Preview
              </span>
            </div>

            {/* Explore as Guest Scholar Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGuestExplore}
              disabled={isLoading}
              className="w-full text-xs font-semibold flex items-center justify-center gap-2 border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800 py-2.5"
            >
              <Compass className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Explore as Guest Scholar (No Account Required)</span>
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="text-center text-[11px] text-stone-500 dark:text-slate-400 space-y-1">
            <p>Your research notes, applications, and drafts remain strictly private to your account.</p>
            <p className="font-mono text-[10px]">End-to-End Local Storage & Firebase Cloud Encryption</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-stone-500 dark:text-slate-500 border-t border-stone-200 dark:border-slate-800">
        JurisFlow • Built for law students across India
      </footer>
    </div>
  );
}
