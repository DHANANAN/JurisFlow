"use client";

import * as React from "react";
import Link from "next/link";
import {
  KanbanSquare,
  Plus,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { applications as initialApplications, opportunities } from "@/lib/data";
import { Application, ApplicationStatus, Opportunity } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";

export default function ApplicationsPage() {
  const { theme } = useTheme();
  const isLight = theme === "sand-gold";

  const [apps, setApps] = React.useState<Application[]>(initialApplications);
  const [selectedApp, setSelectedApp] = React.useState<Application | null>(initialApplications[0] || null);

  const columns: { status: ApplicationStatus; label: string; dotColor: string }[] = [
    { status: "Discovered", label: "Discovered", dotColor: "bg-slate-400" },
    { status: "Interested", label: "Interested", dotColor: "bg-blue-400" },
    { status: "Preparing", label: "Preparing", dotColor: "bg-purple-400" },
    { status: "Applied", label: "Applied", dotColor: "bg-amber-400" },
    { status: "Follow-Up", label: "Follow-Up", dotColor: "bg-orange-400" },
    { status: "Interview", label: "Interview", dotColor: "bg-cyan-400" },
    { status: "Offer", label: "Offer", dotColor: "bg-emerald-400" },
    { status: "Closed", label: "Closed", dotColor: "bg-rose-400" },
  ];

  const moveStatus = (appId: string, nextStatus: ApplicationStatus) => {
    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: nextStatus, lastUpdated: new Date().toISOString() } : a))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp((prev) => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  return (
    <AppShell title="Application CRM">
      <div className="space-y-6 pb-12 max-w-7xl mx-auto">
        {/* ── HEADER BAR ────────────────────────────────────────── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border transition-all ${
            isLight
              ? "bg-white border-[#e7e0d3] text-stone-900 shadow-xs"
              : "bg-[#0a1122] border-slate-800 text-slate-100 shadow-xl"
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className={`text-xl font-extrabold ${isLight ? "text-stone-950" : "text-white"}`}>
                8-Stage Litigation CRM & Pipeline
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                Linear-Style Cadence
              </span>
            </div>
            <p className={`text-xs ${isLight ? "text-stone-600" : "text-slate-400"}`}>
              Manage your judicial clerkship submissions, chamber briefs, CV versions, and D+7 follow-up cadences in one unified pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/emails">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                Draft Outreach
              </Button>
            </Link>
          </div>
        </div>

        {/* ── KANBAN BOARD 8 COLUMNS ───────────────────────────────── */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin">
          {columns.map((col) => {
            const columnApps = apps.filter((a) => a.status === col.status);

            return (
              <div
                key={col.status}
                className={`w-72 shrink-0 rounded-2xl border p-3 flex flex-col max-h-[750px] ${
                  isLight ? "bg-stone-100/70 border-stone-200" : "bg-slate-950/70 border-slate-800"
                }`}
              >
                {/* Column Header */}
                <div
                  className={`flex items-center justify-between p-2 rounded-xl mb-3 border ${
                    isLight ? "bg-white border-stone-200" : "bg-[#0a1122] border-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${col.dotColor}`} />
                    <span className={`font-bold text-xs ${isLight ? "text-stone-800" : "text-slate-200"}`}>
                      {col.label}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                      isLight ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-slate-900 border-slate-700 text-slate-300"
                    }`}
                  >
                    {columnApps.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {columnApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 text-left ${
                        selectedApp?.id === app.id
                          ? isLight
                            ? "ring-2 ring-amber-500 border-amber-400 bg-amber-50/40"
                            : "ring-2 ring-amber-400 border-amber-400 bg-[#0a1122]"
                          : isLight
                          ? "bg-white border-stone-200 hover:border-amber-400 shadow-2xs hover:shadow-xs text-stone-900"
                          : "bg-[#0a1122] border-slate-800 hover:border-slate-700 shadow-md text-slate-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className={`text-[10px] font-semibold truncate max-w-[140px] ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                          {app.opportunity.organization}
                        </span>
                        <ScoreBadge score={app.opportunity.score} size="sm" showIcon={false} />
                      </div>

                      <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${isLight ? "text-stone-900" : "text-white"}`}>
                        {app.opportunity.position}
                      </h4>

                      {/* Attachments pills */}
                      <div className={`flex items-center gap-1.5 text-[10px] flex-wrap ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                        {app.cvVersion && (
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-mono ${
                            isLight ? "bg-stone-100 text-stone-700" : "bg-slate-800 text-slate-300"
                          }`}>
                            <FileCheck className="h-3 w-3 text-emerald-600" /> CV
                          </span>
                        )}
                        {app.writingSample && (
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-mono ${
                            isLight ? "bg-blue-50 text-blue-700" : "bg-blue-500/20 text-blue-300"
                          }`}>
                            <FileText className="h-3 w-3 text-blue-500" /> WS
                          </span>
                        )}
                        {app.deadline && (
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-mono ${
                            isLight ? "bg-rose-50 text-rose-700" : "bg-rose-500/20 text-rose-300"
                          }`}>
                            <Clock className="h-3 w-3 text-rose-500" /> {app.deadline.slice(5)}
                          </span>
                        )}
                      </div>

                      {/* Stage mover */}
                      <div className={`pt-2 border-t flex items-center justify-between text-[10px] ${
                        isLight ? "border-stone-100" : "border-slate-800"
                      }`}>
                        <span className={isLight ? "text-stone-400" : "text-slate-500"}>
                          {app.appliedDate ? `Sent ${app.appliedDate.slice(5)}` : "Not submitted"}
                        </span>
                        <select
                          value={app.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => moveStatus(app.id, e.target.value as ApplicationStatus)}
                          className={`rounded px-1.5 py-0.5 text-[10px] font-medium border ${
                            isLight ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-slate-900 border-slate-700 text-slate-200"
                          }`}
                        >
                          <option value="Discovered">Discovered</option>
                          <option value="Interested">Interested</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Applied">Applied</option>
                          <option value="Follow-Up">Follow-Up</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className={`p-4 rounded-xl border border-dashed text-center text-[11px] ${
                      isLight ? "border-stone-200 text-stone-400" : "border-slate-800 text-slate-500"
                    }`}>
                      No applications in {col.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── APPLICATION DETAILS DRAWER / INSPECTOR ──────────────── */}
        {selectedApp && (
          <div
            className={`p-6 rounded-2xl border shadow-sm space-y-6 transition-all ${
              isLight ? "bg-white border-[#e7e0d3] text-stone-900" : "bg-[#0a1122] border-slate-800 text-slate-100"
            }`}
          >
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
              isLight ? "border-stone-100" : "border-slate-800"
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs">
                    {selectedApp.status}
                  </Badge>
                  <ScoreBadge score={selectedApp.opportunity.score} size="md" />
                  <span className={`text-xs ${isLight ? "text-stone-400" : "text-slate-500"}`}>
                    Chamber Target ID: {selectedApp.id}
                  </span>
                </div>
                <h3 className={`text-lg font-bold ${isLight ? "text-stone-950" : "text-white"}`}>
                  {selectedApp.opportunity.position} — {selectedApp.opportunity.organization}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/emails?target=${encodeURIComponent(selectedApp.opportunity.organization)}`}>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate Outreach Email
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Col 1: Notes & Strategy */}
              <div className="space-y-3">
                <h4 className={`font-bold uppercase tracking-wider text-[11px] ${isLight ? "text-stone-800" : "text-slate-200"}`}>
                  Application Notes & Strategy
                </h4>
                <div className={`p-3 rounded-xl border leading-relaxed min-h-[90px] ${
                  isLight ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-slate-950 border-slate-800 text-slate-300"
                }`}>
                  {selectedApp.notes || "No notes recorded yet. Add interview prep or alumni notes here."}
                </div>
              </div>

              {/* Col 2: Required Documents */}
              <div className="space-y-3">
                <h4 className={`font-bold uppercase tracking-wider text-[11px] ${isLight ? "text-stone-800" : "text-slate-200"}`}>
                  Attached Application Documents
                </h4>
                <div className="space-y-2">
                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    isLight ? "border-stone-200 bg-stone-50" : "border-slate-800 bg-slate-950"
                  }`}>
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-emerald-600" />
                      <div>
                        <p className={`font-semibold ${isLight ? "text-stone-800" : "text-slate-200"}`}>CV Version</p>
                        <p className={`text-[10px] ${isLight ? "text-stone-400" : "text-slate-500"}`}>
                          {selectedApp.cvVersion || "Dhananjay-NLUD_CV.pdf"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">v3.2</Badge>
                  </div>

                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    isLight ? "border-stone-200 bg-stone-50" : "border-slate-800 bg-slate-950"
                  }`}>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className={`font-semibold ${isLight ? "text-stone-800" : "text-slate-200"}`}>Writing Sample</p>
                        <p className={`text-[10px] ${isLight ? "text-stone-400" : "text-slate-500"}`}>
                          {selectedApp.writingSample || "UNCRPD State Report"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">PDF</Badge>
                  </div>
                </div>
              </div>

              {/* Col 3: Communication Logs */}
              <div className="space-y-3">
                <h4 className={`font-bold uppercase tracking-wider text-[11px] ${isLight ? "text-stone-800" : "text-slate-200"}`}>
                  Communication History
                </h4>
                <div className="space-y-2">
                  {selectedApp.communications.length > 0 ? (
                    selectedApp.communications.map((comm) => (
                      <div
                        key={comm.id}
                        className={`p-2.5 rounded-lg border space-y-1 ${
                          isLight ? "bg-amber-50/50 border-amber-200 text-stone-700" : "bg-slate-950 border-slate-800 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-900 dark:text-amber-300">{comm.subject}</span>
                          <span className="text-[10px] text-stone-400">{comm.sentDate}</span>
                        </div>
                        <p className="text-[11px] line-clamp-2">{comm.body}</p>
                      </div>
                    ))
                  ) : (
                    <div className={`p-4 rounded-xl border text-center text-[11px] ${
                      isLight ? "bg-stone-50 border-stone-200 text-stone-400" : "bg-slate-950 border-slate-800 text-slate-500"
                    }`}>
                      No communications sent yet. Use the Email Engine to send your initial brief.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
