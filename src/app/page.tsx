"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Search,
  KanbanSquare,
  Landmark,
  Mail,
  BarChart3,
  Users,
  ShieldCheck,
  ChevronDown,
  Layers,
  Zap,
  BookOpen,
  Award,
  Heart,
  QrCode,
  School,
  Building2,
  Cloud,
  ExternalLink,
  Copy,
  Check,
  Sun,
  Moon,
  Send,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomDock } from "@/components/layout/bottom-dock";
import { SuperThanksModal } from "@/components/superthanks/superthanks-modal";
import { PRIMARY_UPI_ID, SUPERTHANKS_TIERS } from "@/lib/payment-youpi";
import { MembershipSticker } from "@/components/ui/membership-sticker";
import { getActiveUser, subscribeToAuth } from "@/lib/firebase";
import { User, ContributorTier } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";
import { SwipeWalkthrough } from "@/components/onboarding/swipe-walkthrough";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [isSuperThanksOpen, setIsSuperThanksOpen] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState<ContributorTier>("gold");
  const [copiedUpi, setCopiedUpi] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const unsub = subscribeToAuth((u) => setUser(u));
    return unsub;
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(PRIMARY_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const openTierModal = (tier: ContributorTier) => {
    setSelectedTier(tier);
    setIsSuperThanksOpen(true);
  };

  const faqs = [
    {
      q: "What is JurisFlow and why was it built?",
      a: "JurisFlow is an open legal research and career operating system built by law scholars at NLU Delhi. It replaces chaotic Excel sheets, fragmented WhatsApp groups, and missed clerkship deadlines with a unified 15-source registry tracker, an 8-stage litigation Kanban CRM, and citation-accurate email synthesis.",
    },
    {
      q: "Why is there no paywall or forced SaaS subscription?",
      a: "Legal opportunities belong to every deserving student, not just those who can afford commercial subscription gates. JurisFlow is funded through peer-to-peer community SuperThanks and institutional university grant partnerships. Anyone can use the core workspace for free.",
    },
    {
      q: "How does the SuperThanks community membership work?",
      a: "Just like YouTube Channel Memberships, law students and advocates who contribute via UPI (6304812838@upi) receive collectible membership badges and stickers in their profile and headers (Bronze Advocate, Silver Counsel, Gold Patron, and Platinum Bencher) as a badge of honor.",
    },
    {
      q: "How do universities and NLU RCC cells get institutional access?",
      a: "Instead of commercial checkout fields, student convenors and deans submit an Institutional Response. We allocate batch-wide quotas, verified alumni mentorship routing, and custom chamber templates directly via academic grant agreements.",
    },
    {
      q: "How does the AI Email Engine ensure emails do not sound like generic AI slop?",
      a: "In accordance with strict anti-slop guidelines, JurisFlow eliminates fluffy buzzwords. It weaves candidate-specific legal memory hooks (such as analyzing footnotes before conclusions) and exact citations from recent division bench rulings into every draft.",
    },
    {
      q: "How do I access the workspace and is my personal data private?",
      a: "Every student creates their own private account or explores as a Guest Scholar. No passwords or personal notes are ever exposed publicly. Your applications, CV drafts, and chamber contacts are isolated and synced securely via Google Cloud Firebase.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* ── STICKY NAVBAR ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">
                JurisFlow
              </span>
              <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 bg-amber-500/10 text-amber-300 rounded border border-amber-500/20">
                NLU Delhi • Anti-Slop
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#tutorial" className="hover:text-amber-400 transition-colors">Tutorial</a>
            <a href="#features" className="hover:text-amber-400 transition-colors">Features</a>
            <a href="#superthanks" className="hover:text-amber-400 transition-colors">SuperThanks</a>
            <a href="#institutional" className="hover:text-amber-400 transition-colors">Institutional</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-amber-300 hover:text-white hover:bg-slate-800 transition-all"
              title={`Switch to ${theme === "sand-gold" ? "Cosmic Space" : "Sand Golden"} theme`}
            >
              {theme === "sand-gold" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setIsSuperThanksOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-all"
            >
              <Heart className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>SuperThanks</span>
            </button>

            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white text-xs">
                Sign In
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs">
                Launch Workspace
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION (ANTI-SLOP & DJLEXFOLIO ETHOS) ─────────── */}
      <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-28 bg-radial from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Built by Law Scholars at NLU Delhi • Powered by djlexfolio.tech</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Discover clerkships. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Track chamber pipelines.
            </span> <br />
            Command your legal career.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            No corporate buzzwords. No algorithmic spam. An authentic, humanized legal operating system combining
            High Court cause-list indexers, an 8-stage Kanban CRM, and 1-Click direct apply for Indian law scholars.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-8 h-12 shadow-lg shadow-amber-500/10">
                Explore Workspace (Sign Up / Guest)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <button
              onClick={() => setIsSuperThanksOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-colors"
            >
              <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
              <span>SuperThanks & Supporter Badges</span>
            </button>
          </div>

          {/* Authentic Scholar Trust Badges */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Supreme Court & 25 High Courts Indexed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Senior Advocate Chambers & Tier-1 Boutiques
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Free Academic & Community Funded Access
            </span>
          </div>
        </div>
      </section>

      {/* ── SWIPE-TO-INTRODUCE INTERACTIVE TUTORIAL ──────────────── */}
      <section id="tutorial" className="py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
              Interactive System Walkthrough
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Swipe to Introduce JurisFlow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Slide through the five core capabilities powering the next generation of Indian legal scholars.
            </p>
          </div>

          <SwipeWalkthrough />
        </div>
      </section>

      {/* ── CORE PRODUCT MODULES ─────────────────────────────────── */}
      <section id="features" className="py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
              The Anti-Slop Legal Toolkit
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Precision Infrastructure for Legal Scholars
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Say goodbye to messy spreadsheets, generic template emails, and missed clerkship notices.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. 15-Source Legal Aggregator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aggregates postings across Supreme Court, High Courts, Lawctopus, LiveLaw, Bar & Bench, SCC Online, firm career registries, and chamber notices into structured, standardized records.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. Objective Prestige Scoring</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ranks opportunities using a transparent 100-point algorithm: Supreme Court Chambers (100), Supreme Court Clerkships (98), High Courts (95), and Tier-1 Firms (90).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                <KanbanSquare className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">3. 8-Stage Litigation CRM</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Linear-inspired pipeline: Discovered, Interested, Preparing, Applied, Follow-Up, Interview, Offer, and Closed with versioned CVs and writing samples.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">4. 1-Click Direct Apply & AI Outreach</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-populates tailored Gmail web compose drafts with judicial footnote memory hooks and instantly schedules automated D+7 CRM follow-ups.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center font-bold">
                <Landmark className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">5. Judicial Career Center</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive directory of sitting Supreme Court, Delhi HC, Telangana HC, and Bombay HC judges with verified registry contacts and clerkship schedules.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold">
                <Cloud className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">6. Google Cloud & Privacy Isolation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Private authentication with Firebase Identity and local storage isolation keeping your applications, bookmarks, and SuperThanks stickers safe and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUPERTHANKS & YOUPI-PG PAYMENT SCHEME ────────────────── */}
      <section id="superthanks" className="py-24 bg-slate-900 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
              Community Contribution • Zero Commercial Paywalls
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              SuperThanks & Supporter Membership
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              We removed commercial SaaS pricing. Instead, contribute what you wish via UPI to keep the scrapers running and unlock YouTube-style profile stickers and member perks!
            </p>
          </div>

          {/* 4 SuperThanks Tiers with YouTube Membership Badges */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUPERTHANKS_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  tier.recommended
                    ? "bg-slate-950 border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/40"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{tier.badgeIcon}</span>
                    {tier.recommended && (
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{tier.title}</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-black text-amber-300">₹{tier.amount}</span>
                      <span className="text-xs text-slate-400 ml-1.5 font-mono">one-time / custom</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                      Member Perks & Stickers
                    </span>
                    <ul className="text-xs text-slate-400 space-y-2">
                      {tier.perks.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => openTierModal(tier.id)}
                    className={`w-full font-bold text-xs py-2 shadow-xs ${
                      tier.recommended
                        ? "bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <span>Contribute ₹{tier.amount} & Claim Sticker</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Authentic UPI QR Card & Direct Payment Details */}
          <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-amber-500/40 bg-slate-950 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="relative p-2 rounded-xl bg-white shadow-md shrink-0">
              <Image
                src="/qr-upi.jpg"
                alt="JurisFlow UPI QR Code"
                width={160}
                height={160}
                className="rounded-lg object-contain"
              />
              <div className="absolute inset-0 border-2 border-amber-500/50 rounded-xl pointer-events-none" />
            </div>

            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                <Check className="h-3.5 w-3.5" />
                <span>Verified Direct UPI Gateway (YouPI-PG)</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Scan & Support via Any UPI App
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan using Google Pay, PhonePe, Paytm, or BHIM. Every rupee goes directly towards maintaining open scrapers and server infrastructure for law students.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-amber-300 font-bold">
                  <span>{PRIMARY_UPI_ID}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                <Button
                  onClick={() => setIsSuperThanksOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
                >
                  Enter UTR to Claim Badge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTITUTIONAL RESPONSE SCHEME ────────────────────────── */}
      <section id="institutional" className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold">
            <School className="h-3.5 w-3.5" />
            <span>Institutional Response Scheme</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white">
            For Law Schools, Student Bar Councils & Placement Cells
          </h2>

          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We do not sell commercial software licenses to educational institutions. Instead, Recruitment Coordination Committees (RCCs), deans, and senior advocate chambers partner with us via academic grant collaborations.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedTier("institutional");
                setIsSuperThanksOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <School className="h-4 w-4" />
              <span>Submit Institutional Access Request (NLU RCC Grant)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-slate-900 border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm">
              Answers regarding our anti-slop guidelines, YouPI-PG verification, and academic access.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-semibold text-white text-xs sm:text-sm flex items-center justify-between hover:bg-slate-900/60"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-slate-950 py-12 text-slate-500 text-xs border-t border-slate-800/80 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm text-white">JurisFlow</span>
              <span className="text-slate-400">| Powered by djlexfolio.tech & NLU Delhi</span>
            </div>

            <div className="flex items-center gap-6 text-slate-400 text-xs">
              <Link href="/dashboard" className="hover:text-amber-400">Dashboard</Link>
              <Link href="/opportunities" className="hover:text-amber-400">Opportunities</Link>
              <Link href="/judicial" className="hover:text-amber-400">Judicial Center</Link>
              <Link href="/login" className="hover:text-amber-400">Sign In</Link>
              <a
                href="https://github.com/DHANANAN/JurisFlow"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400"
              >
                GitHub
              </a>
            </div>

            <p className="text-slate-500">
              © 2026 JurisFlow. Dedicated to open access and legal scholarship.
            </p>
          </div>
        </div>
      </footer>

      {/* ── CUTE HOVER-ACTIVATED BOTTOM NAVIGATION DOCK ────────── */}
      <BottomDock />

      {/* ── SUPERTHANKS / YOUPI-PG MODAL ───────────────────────── */}
      <SuperThanksModal
        isOpen={isSuperThanksOpen}
        onClose={() => setIsSuperThanksOpen(false)}
        defaultTier={selectedTier}
      />
    </div>
  );
}
