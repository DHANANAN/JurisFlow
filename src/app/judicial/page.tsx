"use client";

import * as React from "react";
import Link from "next/link";
import {
  Landmark,
  Search,
  Filter,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Building,
  UserCheck,
  ChevronRight,
  Send,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { judges as initialJudges } from "@/lib/data";
import { Judge, CourtType } from "@/lib/types";

export default function JudicialCenterPage() {
  const [judges, setJudges] = React.useState<Judge[]>(initialJudges);
  const [selectedCourt, setSelectedCourt] = React.useState<string>("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Target Law Clerks & Supreme Court Judges directly from law clerk directory
  const specializedClerkTargets = [
    { judge: "Justice K.V. Viswanathan", email: "applications.hmjkvv@gmail.com", court: "Supreme Court", chamber: "Court No. 11", focus: "Constitutional & Civil" },
    { judge: "Justice Aravind Kumar", email: "internship.akj@gmail.com", court: "Supreme Court", chamber: "Court No. 13", focus: "Commercial & Civil Law" },
    { judge: "Justice Satish Chandra Sharma", email: "internshipshmjscs@gmail.com", court: "Supreme Court", chamber: "Court No. 14", focus: "Service & Administrative Law" },
    { judge: "Justice Ujjal Bhuyan", email: "internships.officeofhmjbhuyan@gmail.com", court: "Supreme Court", chamber: "Court No. 12", focus: "Taxation & Constitutional" },
    { judge: "Justice M.M. Sundresh", email: "lawclerksci@gmail.com", court: "Supreme Court", chamber: "Court No. 9", focus: "Criminal & Appellate Law" },
    { judge: "Justice Dipankar Datta", email: "lawclerks.jdd@gmail.com", court: "Supreme Court", chamber: "Court No. 8", focus: "Public Law & Constitutional" },
  ];

  const courts = [
    "All",
    "Supreme Court",
    "Delhi High Court",
    "Telangana High Court",
    "Bombay High Court",
  ];

  const filteredJudges = judges.filter((judge) => {
    const matchesCourt =
      selectedCourt === "All" || judge.court.toLowerCase().includes(selectedCourt.toLowerCase());
    const matchesSearch =
      judge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judge.chamber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judge.practiceAreas.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCourt && matchesSearch;
  });

  return (
    <AppShell title="Judicial Career Center">
      <div className="space-y-8 pb-12">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-indigo-400" />
                <h2 className="text-xl font-bold tracking-tight">
                  Judicial Internship & Clerkship Registry
                </h2>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Dedicated intelligence for Supreme Court of India and State High Courts. Directly access chamber emails, clerkship recruitment cycles, and bench memos.
              </p>
            </div>

            <Link href="/emails">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs gap-1.5 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-blue-200" />
                Draft Supreme Court Application
              </Button>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Supreme Court Judges</span>
              <strong className="text-base text-white font-mono">34 Sitting</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Delhi High Court</span>
              <strong className="text-base text-white font-mono">45 Benches</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Telangana High Court</span>
              <strong className="text-base text-white font-mono">Primary State Priority</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Verified Registry Emails</span>
              <strong className="text-base text-emerald-400 font-mono">100% Direct</strong>
            </div>
          </div>
        </div>

        {/* ── VERIFIED DIRECT LAW CLERK TARGETS ────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              Verified Supreme Court Law Clerk Chambers (Priority Outreach)
            </h3>
            <span className="text-[11px] text-slate-400">Direct Registry Portals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {specializedClerkTargets.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-xs hover:border-blue-300 hover:shadow-sm transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {item.court} • {item.chamber}
                  </span>
                  <ScoreBadge score={100} size="sm" showIcon={false} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.judge}</h4>
                  <p className="text-[11px] text-slate-500">{item.focus}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-600 font-mono truncate max-w-[150px]">
                    {item.email}
                  </span>
                  <Link href={`/emails?target=${encodeURIComponent(item.judge)}&email=${encodeURIComponent(item.email)}`}>
                    <Button size="sm" variant="outline" className="h-7 text-[11px] px-2.5">
                      <Send className="h-3 w-3 mr-1" /> Apply
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SEARCH & COURT TABS ─────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Court Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              {courts.map((court) => (
                <button
                  key={court}
                  onClick={() => setSelectedCourt(court)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCourt === court
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {court}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search judge, chamber, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>

          {/* ── JUDGE CARDS GRID ──────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJudges.map((judge) => (
              <div
                key={judge.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-3.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{judge.name}</h4>
                    <p className="text-xs text-slate-500">
                      {judge.court} • {judge.chamber}
                    </p>
                  </div>
                  <Badge
                    variant={
                      judge.status === "Open"
                        ? "success"
                        : judge.status === "Rolling"
                        ? "warning"
                        : "destructive"
                    }
                    className="text-[10px]"
                  >
                    {judge.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{judge.notes}</p>

                {/* Practice Areas */}
                <div className="flex flex-wrap gap-1.5">
                  {judge.practiceAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                {/* Clerkship & Internship indicators */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 font-medium">
                      Clerkship:{" "}
                      <strong className={judge.clerkshipAvailable ? "text-emerald-600" : "text-slate-400"}>
                        {judge.clerkshipAvailable ? "Available" : "Closed"}
                      </strong>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      Internship:{" "}
                      <strong className={judge.internshipAvailable ? "text-emerald-600" : "text-slate-400"}>
                        {judge.internshipAvailable ? "Available" : "Closed"}
                      </strong>
                    </span>
                  </div>

                  <Link href={`/emails?target=${encodeURIComponent(judge.name)}&email=${encodeURIComponent(judge.contactEmail || "")}`}>
                    <Button size="sm" className="h-7 text-xs bg-slate-900 hover:bg-blue-600 text-white">
                      Draft Application
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
