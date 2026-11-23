"use client";

import * as React from "react";
import Link from "next/link";
import {
  Send,
  MessageSquare,
  Video,
  TrendingUp,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  Plus,
  Mail,
  Search,
  UserPlus,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScoreBadge } from "@/components/ui/score-badge";
import {
  currentUser,
  analyticsData,
  careerRecommendations,
  recentActivities,
  opportunities,
} from "@/lib/data";

export default function DashboardPage() {
  const upcomingDeadlines = opportunities
    .filter((o) => o.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);

  return (
    <AppShell title="Dashboard">
      <div className="space-y-8 pb-12">
        {/* ── WELCOME BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white shadow-md">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                Welcome back, {currentUser.name.split(" ")[0]} 👋
              </span>
              <Badge variant="purple" className="text-xs bg-blue-500/20 text-blue-200 border-blue-400/30">
                {currentUser.university}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Targeting <strong>Supreme Court Chambers</strong> & <strong>Telangana High Court</strong>. You have <strong>3 applications in preparation</strong> and <strong>2 critical deadlines</strong> this month.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/emails">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white shadow-xs">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Draft Clerkship Email
              </Button>
            </Link>
            <Link href="/opportunities">
              <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                Discover
              </Button>
            </Link>
          </div>
        </div>

        {/* ── METRIC STAT CARDS ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:border-slate-300 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Applications Sent
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.applicationsSent}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center">
                    ↑ 12%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">vs. last cycle</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Send className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-slate-300 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Responses Received
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.responsesReceived}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center">
                    58.3%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Response rate</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-slate-300 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Interviews Secured
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.interviews}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center">
                    25.0%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">SCI + HC + Tier 1</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-slate-300 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Offers & Recommendations
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.offers}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center">
                    12.5%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Final conversion</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── QUICK ACTIONS ROW ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/opportunities"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all group"
          >
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Discover Openings</p>
              <p className="text-[10px] text-slate-400">50+ law portals</p>
            </div>
          </Link>

          <Link
            href="/applications"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-xs transition-all group"
          >
            <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">CRM Kanban</p>
              <p className="text-[10px] text-slate-400">8-stage tracking</p>
            </div>
          </Link>

          <Link
            href="/judicial"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-xs transition-all group"
          >
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Landmark className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Judicial Center</p>
              <p className="text-[10px] text-slate-400">SCI & HC Chambers</p>
            </div>
          </Link>

          <Link
            href="/contacts"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-xs transition-all group"
          >
            <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <UserPlus className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Contact Intel</p>
              <p className="text-[10px] text-slate-400">NLU Alumni & Advocates</p>
            </div>
          </Link>
        </div>

        {/* ── TWO-COLUMN MAIN WORKSPACE ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLS: CAREER INTELLIGENCE RECOMMENDATIONS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Career Intelligence Recommendations
                </h2>
              </div>
              <Link href="/intelligence" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View All Matches <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {careerRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-xl border bg-white shadow-xs transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    rec.urgency === "high"
                      ? "border-l-4 border-l-rose-500 border-slate-200"
                      : rec.urgency === "medium"
                      ? "border-l-4 border-l-amber-500 border-slate-200"
                      : "border-l-4 border-l-emerald-500 border-slate-200"
                  }`}
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant={
                          rec.urgency === "high"
                            ? "destructive"
                            : rec.urgency === "medium"
                            ? "warning"
                            : "success"
                        }
                        className="text-[10px] uppercase font-bold"
                      >
                        {rec.type}
                      </Badge>
                      <ScoreBadge score={rec.score} size="sm" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rec.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href="/emails">
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        Draft Email
                      </Button>
                    </Link>
                    <Link href="/opportunities">
                      <Button size="sm" className="text-xs h-8 bg-slate-900 hover:bg-blue-600 text-white">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* UPCOMING DEADLINES INLINE */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-700" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Upcoming Application Deadlines
                  </h3>
                </div>
                <Link href="/opportunities" className="text-xs text-blue-600 font-medium hover:underline">
                  View Full Calendar
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {upcomingDeadlines.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[150px]">
                        {opp.organization}
                      </span>
                      <ScoreBadge score={opp.score} size="sm" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {opp.position}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-rose-600 font-medium">
                        <Clock className="h-3 w-3" />
                        Deadline: {opp.deadline}
                      </span>
                      <Link href="/applications" className="text-blue-600 hover:underline font-medium">
                        Track →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT 1 COL: RECENT ACTIVITIES & TARGET STATUS */}
          <div className="space-y-6">
            {/* Target Chamber Status Box */}
            <Card className="border-blue-200/80 bg-blue-50/40">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  Primary Candidate Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs space-y-3">
                <p className="text-slate-700 font-medium">
                  Dhananjay Chouhan • NLU Delhi
                </p>
                <div className="space-y-1.5 text-slate-600 text-[11px]">
                  <div className="flex justify-between">
                    <span>Priority 1:</span>
                    <strong className="text-slate-900">Supreme Court Chambers</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority 2:</span>
                    <strong className="text-slate-900">Telangana & Delhi HC</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus Areas:</span>
                    <strong className="text-slate-900">Const. Law & Litigation</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Research Proof:</span>
                    <strong className="text-slate-900">UNCRPD & RERA Reports</strong>
                  </div>
                </div>
                <Link href="/settings" className="block pt-1">
                  <Button variant="outline" size="sm" className="w-full text-xs h-7 bg-white">
                    Edit Persona & Credentials
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Live Activity Timeline */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-bold text-slate-900">
                  Recent Career Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-3.5">
                  {recentActivities.slice(0, 6).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-2.5 text-xs">
                      <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        •
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-800 leading-snug">
                          <strong className="font-semibold text-slate-900">[{activity.action}]</strong>{" "}
                          {activity.description}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          {new Date(activity.timestamp).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
