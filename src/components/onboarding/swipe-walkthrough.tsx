"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Mail,
  KanbanSquare,
  Award,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Send,
  Clock,
  Layers,
  Heart,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WalkthroughSlide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  description: string;
  actionText: string;
  actionHref: string;
  icon: React.ComponentType<{ className?: string }>;
  interactivePreview: React.ReactNode;
}

export function SwipeWalkthrough() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const slides: WalkthroughSlide[] = [
    {
      id: "sources",
      badge: "01 • 15 Verified Legal Sources",
      badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
      title: "15-Source Internship Powerhouse",
      tagline: "Scrapes Supreme Court, 25 High Courts, Chambers & Tier-1 Firms",
      description:
        "Never miss a clerkship notification again. JurisFlow continuously aggregates filings and recruitment gazettes from Supreme Court of India, Delhi HC, Bombay HC, Telangana HC, Lawctopus, LiveLaw, Bar & Bench, SCC Online, Vidhi, and top tier chambers.",
      actionText: "Explore 15-Source Opportunities",
      actionHref: "/opportunities",
      icon: Search,
      interactivePreview: (
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-mono text-amber-400 font-bold text-[11px]">
              Live 15-Source Scraper Stream
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              15/15 Sources Synced
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Supreme Court Registry", status: "Closing Soon", tag: "Stipend: ₹40,000/mo" },
              { name: "Delhi High Court Chambers", status: "Newly Opened", tag: "Rolling Basis" },
              { name: "Bombay HC Constitutional Bench", status: "Active", tag: "Stipend: ₹30,000/mo" },
              { name: "Vidhi Centre for Legal Policy", status: "Open", tag: "Policy Research" },
            ].map((src, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-200 truncate">{src.name}</span>
                  <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {src.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">{src.tag}</div>
              </div>
            ))}
          </div>

          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] flex items-center justify-between">
            <span>Filter by: Closing Soon • Newly Opened • High Court • Law Firms</span>
            <span className="font-mono font-bold text-amber-300">100% Free</span>
          </div>
        </div>
      ),
    },
    {
      id: "apply",
      badge: "02 • 1-Click Direct Apply",
      badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
      title: "1-Click Direct Apply & Gmail Drafts",
      tagline: "Pre-populated Gmail Web Drafts & Instant CRM Logging",
      description:
        "Say goodbye to manual copy-pasting. Click '1-Click Direct Apply' to automatically compose tailored application emails, generate citation memory hooks, open Gmail Web directly, and immediately record the submission in your CRM.",
      actionText: "Try 1-Click Direct Apply",
      actionHref: "/opportunities",
      icon: Send,
      interactivePreview: (
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-mono text-emerald-400 font-bold text-[11px]">
              Gmail & Mailto Auto-Composer
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              One-Click Action
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">To:</span>
              <span className="font-mono text-slate-200">clerkship.registry@sci.nic.in</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Subject:</span>
              <span className="text-slate-200 font-medium truncate ml-2">
                Application: Judicial Clerkship • Chambers of the Chief Justice
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 text-[11px] text-slate-300 italic border border-slate-800">
              &quot;Having analyzed Your Lordship&apos;s recent jurisprudence on Article 21 and footnotes in the Telecom Bench...&quot;
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center font-bold text-[11px]">
              ✓ Opens Gmail Web Instantly
            </div>
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-center font-bold text-[11px]">
              ✓ Auto-logs D+7 CRM Reminder
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "crm",
      badge: "03 • Litigation CRM",
      badgeColor: "border-blue-500/40 bg-blue-500/10 text-blue-300",
      title: "8-Stage Chamber Pipeline & Kanban",
      tagline: "Track Every Judge, Partner & Registrar with Zero Lost Threads",
      description:
        "Replace chaotic spreadsheets with a purpose-built legal pipeline: Discovered, Interested, Preparing CV, Applied, Follow-Up, Interview, Offer, and Closed. Every entry tracks deadlines, writing samples, and D+7 chamber reminder triggers.",
      actionText: "View 8-Stage CRM Board",
      actionHref: "/applications",
      icon: KanbanSquare,
      interactivePreview: (
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-mono text-blue-400 font-bold text-[11px]">
              Litigation Pipeline Tracker
            </span>
            <span className="text-[10px] text-slate-400 font-mono">D+7 Follow-Up Rules</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2 rounded-lg bg-slate-950 border border-amber-500/30 space-y-1">
              <span className="font-bold text-amber-300 block">Preparing</span>
              <span className="text-slate-400 text-[9px] block">Justice Pratibha Chamber</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px]">CV v2</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 space-y-1">
              <span className="font-bold text-emerald-300 block">Applied</span>
              <span className="text-slate-400 text-[9px] block">Supreme Court Reg.</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px]">Remind D+7</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-purple-500/30 space-y-1">
              <span className="font-bold text-purple-300 block">Interview</span>
              <span className="text-slate-400 text-[9px] block">Shardul Amarchand</span>
              <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px]">Confirmed</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-950 text-slate-400 text-[11px] flex items-center justify-between border border-slate-800">
            <span>Automated status transitions</span>
            <span className="text-emerald-400 font-semibold">Zero lost emails</span>
          </div>
        </div>
      ),
    },
    {
      id: "scoring",
      badge: "04 • Merit Algorithm",
      badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
      title: "100-Point Objective Prestige Scoring",
      tagline: "Pure Mathematics, Transparent Criteria, Zero Commercial Bias",
      description:
        "No algorithm gates or paid promotions. Opportunities are scored objectively based on judicial hierarchy and mentorship quality: Supreme Court Chambers (100), Supreme Court Law Clerk (98), High Court Chambers (95), and Tier-1 Chambers (90).",
      actionText: "See Prestige Algorithm",
      actionHref: "/intelligence",
      icon: Award,
      interactivePreview: (
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-mono text-purple-400 font-bold text-[11px]">
              Hierarchical Merit Weight
            </span>
            <span className="text-[10px] text-slate-400 font-mono">100-Pt Scale</span>
          </div>

          <div className="space-y-2">
            {[
              { label: "Supreme Court Chambers", score: 100, color: "bg-amber-400", pct: "w-full" },
              { label: "Supreme Court Clerkships", score: 98, color: "bg-emerald-400", pct: "w-[98%]" },
              { label: "High Court Division Benches", score: 95, color: "bg-cyan-400", pct: "w-[95%]" },
              { label: "Tier-1 Boutique Chambers", score: 90, color: "bg-blue-400", pct: "w-[90%]" },
            ].map((tier, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">{tier.label}</span>
                  <span className="font-mono font-bold text-white">{tier.score} pts</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className={`h-full ${tier.color} ${tier.pct} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "privacy",
      badge: "05 • Privacy & SuperThanks",
      badgeColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
      title: "Privacy First & YouTube-Style Badges",
      tagline: "No Leaked Credentials, Firebase Isolation & Community Badges",
      description:
        "Your data belongs to you. Every student registers with their own private credentials or explores as a guest. Support open scrapers with peer-to-peer SuperThanks via UPI (6304812838@upi) to mint collectible supporter badge stickers.",
      actionText: "Sign Up Privately or Explore",
      actionHref: "/login",
      icon: ShieldCheck,
      interactivePreview: (
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-mono text-rose-400 font-bold text-[11px]">
              Privacy Isolation & Badges
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Zero Hardcoded Passwords</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <div>
                <span className="font-bold text-white block text-[11px]">Gold Patron Supporter Sticker</span>
                <span className="text-[10px] text-slate-400">Minted via UPI & YouPI-PG 12-digit UTR</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Payee: 6304812838@upi</span>
              <span className="text-emerald-400 font-medium">Auto-Awarded</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center font-semibold text-[11px]">
            ✓ User isolation: Nobody can view your personal details or applications
          </div>
        </div>
      ),
    },
  ];

  // Auto-play timer
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[currentSlide];

  return (
    <div
      className="relative rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 sm:p-8 backdrop-blur-xl shadow-2xl transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header & Slide Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Swipe to Explore JurisFlow Architecture
          </span>
          <span className="hidden md:inline-block text-[11px] text-slate-500 font-mono">
            (Use swipe gesture or arrows)
          </span>
        </div>

        {/* Slide navigation pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all rounded-full ${
                  currentSlide === idx
                    ? "w-7 bg-amber-400"
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
                title={`Go to slide ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 pl-3 border-l border-slate-800">
            <button
              onClick={prevSlide}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Body */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[320px]">
        {/* Left Column: Descriptions and CTA */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold border shadow-xs">
            <span className={active.badgeColor + " px-2 py-0.5 rounded-full border text-[11px]"}>
              {active.badge}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {active.title}
          </h3>

          <p className="text-sm font-semibold text-amber-300/90 font-mono">
            {active.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {active.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href={active.actionHref}>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm">
                <span>{active.actionText}</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>

            <button
              onClick={nextSlide}
              className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors"
            >
              <span>Next Feature</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Live Card Preview */}
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 blur-md pointer-events-none" />
            <div className="relative rounded-xl border border-slate-800 bg-slate-950/90 shadow-xl overflow-hidden">
              {active.interactivePreview}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom swipe hint on mobile */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Smartphone className="h-3.5 w-3.5 text-amber-400" />
          <span>Swipe left / right to navigate slides</span>
        </span>
        <span className="font-mono text-slate-400">
          Slide {currentSlide + 1} of {slides.length}
        </span>
      </div>
    </div>
  );
}
