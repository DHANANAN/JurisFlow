"use client";

import * as React from "react";
import {
  User,
  Shield,
  Bell,
  Sparkles,
  Database,
  ExternalLink,
  Check,
  Save,
  Link as LinkIcon,
  Globe,
  FileText,
  Key,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/lib/data";

export default function SettingsPage() {
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [university, setUniversity] = React.useState(currentUser.university);
  const [year, setYear] = React.useState(currentUser.year);
  const [location, setLocation] = React.useState(currentUser.location || "Delhi NCR");
  const [bio, setBio] = React.useState(currentUser.bio || "");
  const [saved, setSaved] = React.useState(false);

  // Notification Toggles
  const [notifyDeadlines, setNotifyDeadlines] = React.useState(true);
  const [notifyResponses, setNotifyResponses] = React.useState(true);
  const [notifyWeekly, setNotifyWeekly] = React.useState(true);
  const [autoFollowUp, setAutoFollowUp] = React.useState(true);

  // Integrations state
  const [integrations, setIntegrations] = React.useState({
    gmail: true,
    drive: true,
    sheets: true,
    airtable: false,
    apify: true,
    firecrawl: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell title="Settings & Integrations">
      <div className="space-y-8 pb-12 max-w-4xl">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Settings & Developer Integrations
            </h2>
            <p className="text-xs text-slate-500">
              Manage your legal candidate persona, automation webhooks, and cloud integrations.
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5 shadow-xs"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved Changes" : "Save Changes"}
          </Button>
        </div>

        {/* ── CANDIDATE PROFILE SECTION ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900">
              Candidate Persona & Academic Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="text-xs" />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Institutional Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="text-xs" />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Law University</label>
              <Input value={university} onChange={(e) => setUniversity(e.target.value)} className="text-xs" />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Academic Year</label>
              <Input value={year} onChange={(e) => setYear(e.target.value)} className="text-xs" />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Primary Location</label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} className="text-xs" />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">LinkedIn Profile</label>
              <Input defaultValue={currentUser.linkedin} className="text-xs" />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Bio & Research Highlights</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ── AUTOMATION & CLOUD INTEGRATIONS ──────────────────────── */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Database className="h-5 w-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">
              Automation & Cloud Services
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Gmail API */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Gmail API</p>
                <p className="text-slate-500 text-[11px]">Automated application sending & follow-ups</p>
              </div>
              <Badge variant={integrations.gmail ? "success" : "secondary"}>
                {integrations.gmail ? "Connected" : "Disconnected"}
              </Badge>
            </div>

            {/* Google Drive */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Google Drive API</p>
                <p className="text-slate-500 text-[11px]">Sync writing samples & CV versions</p>
              </div>
              <Badge variant={integrations.drive ? "success" : "secondary"}>
                {integrations.drive ? "Connected" : "Disconnected"}
              </Badge>
            </div>

            {/* Apify Scrapers */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Apify Legal Scrapers</p>
                <p className="text-slate-500 text-[11px]">Daily extraction from LiveLaw & Lawlit</p>
              </div>
              <Badge variant={integrations.apify ? "success" : "secondary"}>
                {integrations.apify ? "Active (Daily)" : "Disconnected"}
              </Badge>
            </div>

            {/* Google Sheets / Airtable */}
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Google Sheets Sync</p>
                <p className="text-slate-500 text-[11px]">Dual-direction backup CRM spreadsheet</p>
              </div>
              <Badge variant={integrations.sheets ? "success" : "secondary"}>
                {integrations.sheets ? "Synced" : "Disconnected"}
              </Badge>
            </div>
          </div>
        </div>

        {/* ── NOTIFICATION PREFERENCES ─────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold text-base text-slate-900">
              Notification & Cadence Preferences
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Supreme Court & High Court Deadline Alerts</p>
                <p className="text-slate-500 text-[11px]">Receive push & email notifications 7 days before chamber closures</p>
              </div>
              <input
                type="checkbox"
                checked={notifyDeadlines}
                onChange={() => setNotifyDeadlines(!notifyDeadlines)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Chamber Response Auto-Detection</p>
                <p className="text-slate-500 text-[11px]">Automatically move applications to &apos;Follow-Up&apos; or &apos;Interview&apos; when registry replies</p>
              </div>
              <input
                type="checkbox"
                checked={notifyResponses}
                onChange={() => setNotifyResponses(!notifyResponses)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-slate-900">Automated D+7 Follow-Up Reminders</p>
                <p className="text-slate-500 text-[11px]">Flag opportunities for a gentle, polite follow-up if unacknowledged after 7 days</p>
              </div>
              <input
                type="checkbox"
                checked={autoFollowUp}
                onChange={() => setAutoFollowUp(!autoFollowUp)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
