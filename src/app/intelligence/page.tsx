"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Send,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScoreBadge } from "@/components/ui/score-badge";
import { careerRecommendations, currentUser, opportunities } from "@/lib/data";

export default function CareerIntelligencePage() {
  const profileMatches = [
    { area: "Constitutional Law & Appellate", score: 95, color: "bg-blue-600", text: "Highest Chamber Fit" },
    { area: "Litigation & Dispute Resolution", score: 90, color: "bg-indigo-600", text: "High Court & Trial Experience" },
    { area: "Policy Research & UNCRPD", score: 88, color: "bg-emerald-600", text: "Direct Publication Advantage" },
    { area: "Urban Governance & RERA", score: 82, color: "bg-purple-600", text: "Niche Regulatory Strength" },
    { area: "Intellectual Property & Tech", score: 65, color: "bg-amber-600", text: "Selective High Court Benches" },
    { area: "General Corporate / M&A", score: 45, color: "bg-slate-400", text: "Non-Core Strategy" },
  ];

  return (
    <AppShell title="Career Intelligence">
      <div className="space-y-8 pb-12">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-bold tracking-tight">
                AI Career Strategy & Positioning Engine
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Synthesizing your NLU Delhi credentials, Telangana HC internship, and disability rights research to generate high-probability legal career pathways.
            </p>
          </div>

          <Link href="/emails">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              Auto-Target This Week
            </Button>
          </Link>
        </div>

        {/* ── WEEKLY STRATEGIC DIGEST ──────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Weekly Strategic Focus (Week 48, Nov 2026)
              </h3>
            </div>
            <Badge variant="default" className="text-xs">
              Updated Today
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Target className="h-4 w-4 text-rose-500" /> 1. Supreme Court Deadlines
              </span>
              <p className="text-slate-600 leading-relaxed">
                Justice D.Y. Chandrachud and Justice Sanjiv Khanna chamber clerkship applications open in 52 days. Prepare writing sample on <strong>Fundamental Rights & Privacy</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> 2. Warm Alumni Referral
              </span>
              <p className="text-slate-600 leading-relaxed">
                Amit Sharma (NLU Delhi Class of 2020) at AZB & Partners is actively reviewing winter litigation intern applications. Send follow-up note by Thursday.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Award className="h-4 w-4 text-blue-500" /> 3. Policy Fellowship Alignment
              </span>
              <p className="text-slate-600 leading-relaxed">
                Vidhi Centre for Legal Policy Disability Rights Fellowship perfectly matches your UNCRPD State Report research. <strong>78% conversion probability</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN SECTION: RECOMMENDATIONS & PROFILE ALIGNMENT ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: STRATEGIC RECOMMENDATION CARDS (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Ranked Placement Recommendations
            </h3>

            <div className="space-y-3.5">
              {careerRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold bg-slate-50">
                        {rec.type}
                      </Badge>
                      <ScoreBadge score={rec.score} size="sm" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      rec.urgency === "high"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : rec.urgency === "medium"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}>
                      {rec.urgency} Urgency
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-slate-900">{rec.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rec.reason}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      Recommendation Match: <strong>{rec.score}%</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <Link href={`/emails?target=${encodeURIComponent(rec.title)}`}>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Draft Email
                        </Button>
                      </Link>
                      <Link href="/opportunities">
                        <Button size="sm" className="h-7 text-xs bg-slate-900 hover:bg-blue-600 text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRACTICE AREA ALIGNMENT BARS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Profile Specialization Breakdown
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Algorithmic alignment calibrated against your CV and publications.
                </p>
              </div>

              <div className="space-y-4">
                {profileMatches.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.area}</span>
                      <span className="font-mono font-bold text-slate-900">{item.score}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                💡 <strong>Strategy takeaway:</strong> Focus 80% of application bandwidth on Constitutional Law Chambers and Telangana HC. De-prioritize corporate M&A.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
