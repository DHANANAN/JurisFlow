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

export default function ApplicationsPage() {
  const [apps, setApps] = React.useState<Application[]>(initialApplications);
  const [selectedApp, setSelectedApp] = React.useState<Application | null>(initialApplications[0] || null);

  const columns: { status: ApplicationStatus; label: string; dotColor: string; bgHeader: string }[] = [
    { status: "Discovered", label: "Discovered", dotColor: "bg-slate-400", bgHeader: "bg-slate-100/80" },
    { status: "Interested", label: "Interested", dotColor: "bg-blue-400", bgHeader: "bg-blue-50/80" },
    { status: "Preparing", label: "Preparing", dotColor: "bg-purple-400", bgHeader: "bg-purple-50/80" },
    { status: "Applied", label: "Applied", dotColor: "bg-amber-400", bgHeader: "bg-amber-50/80" },
    { status: "Follow-Up", label: "Follow-Up", dotColor: "bg-orange-400", bgHeader: "bg-orange-50/80" },
    { status: "Interview", label: "Interview", dotColor: "bg-cyan-400", bgHeader: "bg-cyan-50/80" },
    { status: "Offer", label: "Offer", dotColor: "bg-emerald-400", bgHeader: "bg-emerald-50/80" },
    { status: "Closed", label: "Closed", dotColor: "bg-rose-400", bgHeader: "bg-rose-50/80" },
  ];

  // Helper to move application between stages
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
      <div className="space-y-6 pb-12">
        {/* ── HEADER BAR ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                Application Pipeline CRM
              </h2>
              <Badge variant="purple" className="text-xs">
                8-Stage Linear Workflow
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Manage your judicial clerkship submissions, chamber briefs, CV versions, and follow-up cadences in one unified pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/emails">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-200" />
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
                className="w-72 shrink-0 rounded-2xl bg-slate-100/70 border border-slate-200/60 p-3 flex flex-col max-h-[750px]"
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between p-2 rounded-xl ${col.bgHeader} mb-3`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${col.dotColor}`} />
                    <span className="font-bold text-xs text-slate-800">{col.label}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white text-slate-600 font-semibold border border-slate-200 shadow-2xs">
                    {columnApps.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {columnApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-3.5 rounded-xl border bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-2.5 text-left ${
                        selectedApp?.id === app.id
                          ? "ring-2 ring-blue-500 border-blue-400"
                          : "border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[140px]">
                          {app.opportunity.organization}
                        </span>
                        <ScoreBadge score={app.opportunity.score} size="sm" showIcon={false} />
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                        {app.opportunity.position}
                      </h4>

                      {/* Attachments & Files pills */}
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 flex-wrap">
                        {app.cvVersion && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-slate-100 font-mono">
                            <FileCheck className="h-3 w-3 text-emerald-600" /> CV
                          </span>
                        )}
                        {app.writingSample && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-700 font-mono">
                            <FileText className="h-3 w-3 text-blue-600" /> WS
                          </span>
                        )}
                        {app.deadline && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-rose-50 text-rose-700 font-mono">
                            <Clock className="h-3 w-3 text-rose-600" /> {app.deadline.slice(5)}
                          </span>
                        )}
                      </div>

                      {/* Quick stage mover */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">
                          {app.appliedDate ? `Sent ${app.appliedDate.slice(5)}` : "Not submitted"}
                        </span>
                        <select
                          value={app.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => moveStatus(app.id, e.target.value as ApplicationStatus)}
                          className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-700"
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
                    <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-[11px] text-slate-400">
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
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs">
                    {selectedApp.status}
                  </Badge>
                  <ScoreBadge score={selectedApp.opportunity.score} size="md" />
                  <span className="text-xs text-slate-400">
                    ID: {selectedApp.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedApp.opportunity.position} — {selectedApp.opportunity.organization}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/emails?target=${encodeURIComponent(selectedApp.opportunity.organization)}`}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate Outreach Email
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Col 1: Notes & Strategy */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Application Notes & Strategy
                </h4>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed min-h-[90px]">
                  {selectedApp.notes || "No notes recorded yet. Add interview prep or alumni notes here."}
                </div>
              </div>

              {/* Col 2: Required Documents */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Attached Application Documents
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-slate-800">CV Version</p>
                        <p className="text-[10px] text-slate-400">{selectedApp.cvVersion || "Not attached"}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">v3.2</Badge>
                  </div>

                  <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-slate-800">Writing Sample</p>
                        <p className="text-[10px] text-slate-400">{selectedApp.writingSample || "UNCRPD State Report"}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">PDF</Badge>
                  </div>
                </div>
              </div>

              {/* Col 3: Communication Logs */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Communication History
                </h4>
                <div className="space-y-2">
                  {selectedApp.communications.length > 0 ? (
                    selectedApp.communications.map((comm) => (
                      <div key={comm.id} className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-200/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-900">{comm.subject}</span>
                          <span className="text-[10px] text-blue-600">{comm.sentDate}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2">{comm.body}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-400 text-[11px]">
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
