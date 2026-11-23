"use client";

import * as React from "react";
import Link from "next/link";
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
  Globe2,
  BookOpen,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "What is JurisFlow and who is it built for?",
      a: "JurisFlow is an AI-native legal career operating system built specifically for law students, judicial clerkship aspirants, and litigation enthusiasts. It unifies opportunity discovery across 50+ Indian legal portals (Lawlit, Lawctopus, LiveLaw, Bar & Bench, SCC Online, Court websites), intelligent opportunity scoring, an 8-stage Kanban CRM, and high-conversion AI email drafting.",
    },
    {
      q: "How does the AI Opportunity Scoring Engine work?",
      a: "The scoring algorithm ranks opportunities on a 100-point scale based on judicial prestige, chamber credibility, and tier classification (Supreme Court Chambers = 100, Supreme Court Clerkships = 98, High Courts = 95, Tier-1 Firms = 90). It automatically adds bonuses for Delhi NCR (+20), Constitutional Law exposure (+20), Litigation practice (+15), and NLU alumni connections (+15).",
    },
    {
      q: "How does the AI Email Engine ensure emails don't sound generic?",
      a: "Instead of generic AI fluff, JurisFlow incorporates candidate-specific legal memory hooks (such as 'I have developed a habit of reading footnotes before conclusions'), case references, and research alignments tailored to specific judges, senior advocates, or partners.",
    },
    {
      q: "Can I track judicial clerkships and litigation chambers separately?",
      a: "Yes. JurisFlow includes a dedicated Judicial Career Center tracking sitting Supreme Court Justices, Delhi High Court judges, Telangana High Court benches, and Bombay High Court chambers with clerkship openings, deadlines, and direct registry email channels.",
    },
    {
      q: "Is JurisFlow open-source and ready for law school incubators?",
      a: "Absolutely. JurisFlow is architected with a clean open-source foundation, modular Next.js App Router, TypeScript schemas, and integration-ready endpoints for Apify, Firecrawl, and Google Workspace.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* ── STICKY NAVBAR ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                JurisFlow
              </span>
              <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-sm border border-blue-200">
                AI Career OS
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#judicial" className="hover:text-slate-900 transition-colors">Judicial Center</a>
            <a href="#workflow" className="hover:text-slate-900 transition-colors">AI Workflow</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-slate-700">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
                Launch Workspace
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32 bg-radial from-blue-50/50 via-slate-50 to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-8 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Career Operating System for Law Students</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
            Discover clerkships. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Track legal careers.
            </span> <br />
            Accelerate your practice.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            JurisFlow combines the intelligence of <strong>Perplexity</strong>, the pipeline of <strong>Linear</strong>, and the networking depth of <strong>LinkedIn</strong> — engineered from the ground up for judicial clerkships, litigation chambers, and elite law firm placements.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-slate-950 hover:bg-blue-600 text-white text-base px-8 h-12 shadow-md">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/opportunities" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12 bg-white hover:bg-slate-50 border-slate-300">
                <Search className="mr-2 h-4 w-4 text-slate-500" />
                Explore 50+ Opportunities
              </Button>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-14 pt-8 border-t border-slate-200/70 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Supreme Court & High Court Chambers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Tier-1 Disputes & Litigation Boutiques
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Curated for NLU Students & Aspirants
            </span>
          </div>
        </div>

        {/* Interactive App Preview Mockup */}
        <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xl ring-1 ring-slate-900/5">
            <div className="rounded-xl border border-slate-200/60 bg-slate-50 p-6 sm:p-8">
              {/* Mockup bar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-mono text-slate-400">app.jurisflow.tech/applications</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">8 Columns Active</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">AI Scoring Active</span>
                </div>
              </div>

              {/* Preview 3-column snippet */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Supreme Court Chambers</span>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">100 pts</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Hon&apos;ble Judge Chamber — SCI</h4>
                  <p className="text-xs text-slate-500">Constitutional Bench • Direct Registry Submission</p>
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Deadline: Jan 15</span>
                    <span className="text-blue-600 font-medium">Preparing</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">Telangana High Court</span>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">92 pts</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Judicial Internship — Constitutional Bench</h4>
                  <p className="text-xs text-slate-500">Public Interest Litigation • Mahbubnagar/Hyd</p>
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Deadline: Jan 30</span>
                    <span className="text-amber-600 font-medium">Applied ✓</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">Tier-1 Disputes</span>
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">90 pts</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">AZB & Partners — Delhi Office</h4>
                  <p className="text-xs text-slate-500">Commercial Litigation • Alumni Referral</p>
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Deadline: Feb 15</span>
                    <span className="text-purple-600 font-medium">Interview Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PRODUCT MODULES ─────────────────────────────────── */}
      <section id="features" className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="purple" className="mb-3">
              9 Core Modules
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              A Complete Operating System for the Modern Lawyer
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Engineered to replace 12 scattered tabs, manual spreadsheets, and generic rejection emails with a streamlined legal intelligence stack.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Opportunity Discovery Engine</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Live aggregation from Lawlit, Lawctopus, LiveLaw, Bar & Bench, SCC Online, firm career pages, and high court gazettes into standardized opportunity cards.
              </p>
            </div>

            {/* Module 2 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. AI Opportunity Scoring System</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Prestige weighted: SCI Chambers (100), SCI Clerkship (98), High Courts (95), Tier 1 (90). Custom bonuses for Delhi NCR (+20) and Constitutional Law (+20).
              </p>
            </div>

            {/* Module 3 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <KanbanSquare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Application CRM (Linear-style)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An 8-stage visual Kanban pipeline: Discovered, Interested, Preparing, Applied, Follow-Up, Interview, Offer, and Closed with versioned CVs and writing samples.
              </p>
            </div>

            {/* Module 4 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">4. AI Email Engine & Memory Hooks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zero-repetition drafting for Applications, Networking, and Follow-ups with signature memory hooks: <em>&quot;I have developed a habit of reading footnotes before conclusions.&quot;</em>
              </p>
            </div>

            {/* Module 5 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Landmark className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">5. Judicial Career Center</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated database of Supreme Court, Delhi High Court, Telangana High Court, and Bombay High Court sitting judges, chambers, clerkship availability, and deadlines.
              </p>
            </div>

            {/* Module 6 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">6. Contact Intelligence & Network</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track partners, senior advocates, registrars, and NLU alumni with relationship strength scores (Strong/Medium/Weak), interaction logs, and follow-up cadences.
              </p>
            </div>

            {/* Module 7 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">7. Analytics & Conversion Dashboard</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track response rates, interview conversion ratios, source effectiveness (Lawctopus vs LiveLaw vs Direct), and monthly growth with Recharts data visualizations.
              </p>
            </div>

            {/* Module 8 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">8. Curated Prompt Library</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Battle-tested prompt templates for judge research briefs, cover letters, interview prep, and follow-up emails parameterized with student background variables.
              </p>
            </div>

            {/* Module 9 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3 group">
              <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">9. AI Career Intelligence</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Proactive weekly recommendations: &quot;Apply This Week&quot;, &quot;High Probability Constitutional Law Matches&quot;, and automated radar alignment based on your CV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI WORKFLOW PIPELINE ─────────────────────────────────── */}
      <section id="workflow" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-950">
              The Intelligent 4-Step Legal Career Loop
            </h2>
            <p className="mt-3 text-slate-600">
              Transform chaotic manual applications into a structured, compounding career asset.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs relative">
              <span className="font-mono text-3xl font-black text-blue-600/30">01</span>
              <h3 className="font-bold text-base mt-2 text-slate-900">Discover & Ingest</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Scrapes 50+ portals daily. Extracts deadlines, chambers, practice areas, and direct contact emails.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs relative">
              <span className="font-mono text-3xl font-black text-blue-600/30">02</span>
              <h3 className="font-bold text-base mt-2 text-slate-900">Score & Match</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Applies prestige rules and calculates profile alignment bonuses for your specific university and target cities.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs relative">
              <span className="font-mono text-3xl font-black text-blue-600/30">03</span>
              <h3 className="font-bold text-base mt-2 text-slate-900">Draft & Personalize</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Generates memorable, dignified outreach citing judge rulings, research papers, and relevant experience hooks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs relative">
              <span className="font-mono text-3xl font-black text-blue-600/30">04</span>
              <h3 className="font-bold text-base mt-2 text-slate-900">Track & Follow Up</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Maintains a visual Kanban board, triggers intelligent reminders at D+7, and logs outcomes to improve future scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PLACEHOLDER ──────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="default" className="mb-3">Accessible Legal-Tech</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
              Built for Ambitious Law Students
            </h2>
            <p className="mt-3 text-slate-600">
              Free to get started. Upgradable for advanced AI drafting and multi-court pipeline tracking.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border border-slate-200 p-8 bg-white shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student Starter</h3>
                <p className="text-xs text-slate-500 mt-1">For first & second year law students exploring opportunities.</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-400 ml-1">/ forever</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-3">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Full Opportunity Discovery Engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Standard AI Scoring (0-100)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> 8-Stage CRM (up to 20 applications)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> 5 AI Email generations / month</li>
              </ul>
              <Link href="/dashboard" className="block">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-blue-600 p-8 bg-white shadow-xl space-y-6 relative">
              <div className="absolute -top-3.5 right-6 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Clerkship & Litigation Pro</h3>
                <p className="text-xs text-slate-500 mt-1">For senior NLU students, clerkship candidates, and junior advocates.</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">₹499</span>
                  <span className="text-xs text-slate-400 ml-1">/ month</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-3">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Everything in Starter</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Dedicated Judicial Center (SCI & All HCs)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Unlimited AI Email & Memory Hook Engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Contact Intelligence & NLU Alumni Directory</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Automated Follow-up Reminder Sequencing</li>
              </ul>
              <Link href="/dashboard" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade to Pro</Button>
              </Link>
            </div>

            {/* NLU / Institution */}
            <div className="rounded-2xl border border-slate-200 p-8 bg-white shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">NLU & RCC Cell</h3>
                <p className="text-xs text-slate-500 mt-1">For Recruitment Coordination Committees and law university faculties.</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-black text-slate-900">Custom</span>
                  <span className="text-xs text-slate-400 ml-1">/ institutional</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-3">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> University Batch Management</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Centralized Placement Cell Analytics</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verified Alumni Mentorship Routing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Custom Firm & Chamber Job Postings</li>
              </ul>
              <a href="mailto:contact@jurisflow.tech" className="block">
                <Button variant="outline" className="w-full">Contact for NLUs</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-950">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Everything you need to know about JurisFlow and legal career management.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-semibold text-slate-900 text-sm flex items-center justify-between hover:bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm text-slate-900">JurisFlow</span>
              <span className="text-slate-400">| The Career Operating System for Law Students</span>
            </div>

            <div className="flex items-center gap-6 text-slate-600">
              <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
              <Link href="/opportunities" className="hover:text-slate-900">Opportunities</Link>
              <Link href="/judicial" className="hover:text-slate-900">Judicial Center</Link>
              <Link href="/emails" className="hover:text-slate-900">Email Engine</Link>
              <a href="https://github.com/DHANANAN/JurisFlow" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                GitHub Repository
              </a>
            </div>

            <p className="text-slate-400">
              © 2026 JurisFlow. Built with purpose for law students across India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
