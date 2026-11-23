"use client";

import * as React from "react";
import {
  BarChart3,
  TrendingUp,
  Send,
  MessageSquare,
  Video,
  Award,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyticsData } from "@/lib/data";

export default function AnalyticsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppShell title="Analytics & Career Metrics">
      <div className="space-y-8 pb-12">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                Career Intelligence & Conversion Analytics
              </h2>
              <Badge variant="purple" className="text-xs">
                Real-Time Data
              </Badge>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Monitor your conversion rates from initial discovery through registry responses, interviews, and judicial clerkship confirmations.
            </p>
          </div>
        </div>

        {/* ── STATS ROW ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Applications Sent</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.applicationsSent}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">↑ 12%</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Total cycle outreach</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Send className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Responses Received</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.responsesReceived}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">58.3%</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Chamber response rate</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Interviews & Tests</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.interviews}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">25.0%</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Application to interview</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Final Conversion</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {analyticsData.conversionRate}%
                  </span>
                  <span className="text-xs font-bold text-emerald-600">3 Offers</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Top tier placement</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── CHARTS ROW 1: MONTHLY TRENDS & PIPELINE FUNNEL ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MONTHLY CONVERSION TREND (2 Cols) */}
          <Card className="lg:col-span-2">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Monthly Application & Conversion Velocity</span>
                <span className="text-xs font-normal text-slate-500">Jun 2026 – Nov 2026</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <div className="h-72 w-full">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.monthlyTrends}>
                      <defs>
                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorResp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderRadius: "8px",
                          border: "none",
                          color: "#fff",
                          fontSize: "11px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Area
                        type="monotone"
                        dataKey="applications"
                        name="Applications Sent"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorApps)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="responses"
                        name="Responses"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorResp)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="interviews"
                        name="Interviews"
                        stroke="#8b5cf6"
                        fill="none"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* APPLICATION CONVERSION FUNNEL (1 Col) */}
          <Card>
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-sm font-bold text-slate-900">
                Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-3 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Opportunities Discovered</span>
                  <span>50 (100%)</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-slate-400 w-full rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Applications Submitted</span>
                  <span>24 (48.0%)</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-blue-600 w-[48%] rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Responses Received</span>
                  <span>14 (28.0%)</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-purple-600 w-[28%] rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Interviews Scheduled</span>
                  <span>6 (12.0%)</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[12%] rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Final Offers / Clerkships</span>
                  <span>3 (6.0%)</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[6%] rounded-full" />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 leading-relaxed">
                Benchmark: NLU Delhi student cohort average is ~3.2% conversion. JurisFlow AI scoring yields <strong>1.87x higher efficiency</strong>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── CHARTS ROW 2: SOURCE BREAKDOWN & STATUS PIE ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SOURCE PERFORMANCE */}
          <Card>
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-sm font-bold text-slate-900">
                Top Opportunity Acquisition Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <div className="h-64 w-full">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyticsData.sourceBreakdown}
                      layout="vertical"
                      margin={{ left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                      <YAxis
                        dataKey="source"
                        type="category"
                        stroke="#94a3b8"
                        fontSize={11}
                        width={90}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderRadius: "8px",
                          border: "none",
                          color: "#fff",
                          fontSize: "11px",
                        }}
                      />
                      <Bar dataKey="count" name="Applications" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* PIPELINE STAGE DISTRIBUTION */}
          <Card>
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-sm font-bold text-slate-900">
                Current Pipeline Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <div className="h-64 w-full">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.statusDistribution}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={45}
                        paddingAngle={3}
                      >
                        {analyticsData.statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderRadius: "8px",
                          border: "none",
                          color: "#fff",
                          fontSize: "11px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
