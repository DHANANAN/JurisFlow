"use client";

import * as React from "react";
import Image from "next/image";
import {
  User as UserIcon,
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
  Heart,
  Cloud,
  QrCode,
  Award,
  LogIn,
  LogOut,
  Copy,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getActiveUser, subscribeToAuth, setActiveUser, logoutCurrentUser } from "@/lib/firebase";
import { User as UserType } from "@/lib/types";
import { MembershipSticker } from "@/components/ui/membership-sticker";
import { SuperThanksModal } from "@/components/superthanks/superthanks-modal";
import { PRIMARY_UPI_ID } from "@/lib/payment-youpi";

export default function SettingsPage() {
  const [user, setUser] = React.useState<UserType | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [university, setUniversity] = React.useState("");
  const [year, setYear] = React.useState("");
  const [location, setLocation] = React.useState("Delhi NCR");
  const [bio, setBio] = React.useState("");
  const [saved, setSaved] = React.useState(false);
  const [showSuperThanksModal, setShowSuperThanksModal] = React.useState(false);
  const [copiedUpi, setCopiedUpi] = React.useState(false);

  React.useEffect(() => {
    const unsub = subscribeToAuth((u) => {
      if (u) {
        setUser(u);
        setName(u.name);
        setEmail(u.email);
        setUniversity(u.university);
        setYear(u.year);
        setLocation(u.location || "Delhi NCR");
        setBio(u.bio || "");
      }
    });
    return unsub;
  }, []);

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
    firebase: true,
    gcp: true,
  });

  const handleSave = () => {
    if (user) {
      const updatedUser: UserType = {
        ...user,
        name,
        email,
        university,
        year,
        location,
        bio,
      };
      setActiveUser(updatedUser);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(PRIMARY_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
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
            <UserIcon className="h-5 w-5 text-blue-600" />
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
              <Input defaultValue={user?.linkedin || "linkedin.com/in/dhananjay-chouhan"} className="text-xs" />
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

        {/* ── SUPERTHANKS & MEMBERSHIP BADGES SECTION ──────────────── */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  SuperThanks Community Membership & Badges
                </h3>
                <p className="text-xs text-slate-500">
                  YouTube-style membership stickers awarded for supporting open legal scrapers.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setShowSuperThanksModal(true)}
              className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs"
            >
              <Heart className="h-3.5 w-3.5 fill-white" />
              <span>Contribute / Upgrade Tier</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Active Badge Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Active Profile Badge
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Scholar
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-2xl flex items-center justify-center">
                  {user?.contributorBadge?.icon || "🥇"}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    {user?.contributorBadge?.title || "Gold Patron & Founding Scholar"}
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Tier: {user?.contributorBadge?.tier.toUpperCase() || "GOLD"} • ₹{user?.contributorBadge?.amount || 499}
                  </p>
                </div>
              </div>

              {/* Earned stickers */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  Earned Profile Stickers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(user?.stickers || ["NLU Delhi Scholar", "Supreme Court Fellow", "Gold Patron Member"]).map(
                    (st, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        ⭐ {st}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* UPI Payment Gateway info */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                  Direct UPI Payment Channel (YouPI-PG)
                </span>
                <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-white border border-slate-200">
                  <span className="font-mono text-xs text-slate-900 font-bold flex-1 select-all">
                    {PRIMARY_UPI_ID}
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {copiedUpi ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedUpi ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Powered by YouPI-PG protocol with UTR manual verification and instant profile sticker minting.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSuperThanksModal(true)}
                  className="w-full text-xs border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <QrCode className="h-3.5 w-3.5 mr-1 text-amber-600" />
                  <span>Show UPI QR Code & Tiers</span>
                </Button>
              </div>
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

        {/* ── SUPERTHANKS & MEMBERSHIP BADGES SECTION ──────────────── */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  SuperThanks Community Membership & Badges
                </h3>
                <p className="text-xs text-slate-500">
                  YouTube-style membership stickers awarded for supporting open legal scrapers.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setShowSuperThanksModal(true)}
              className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs"
            >
              <Heart className="h-3.5 w-3.5 fill-white" />
              <span>Contribute / Upgrade Tier</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Active Badge Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Active Profile Badge
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Scholar
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-2xl flex items-center justify-center">
                  {user?.contributorBadge?.icon || "🥇"}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    {user?.contributorBadge?.title || "Gold Patron & Founding Scholar"}
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Tier: {user?.contributorBadge?.tier.toUpperCase() || "GOLD"} • ₹{user?.contributorBadge?.amount || 499}
                  </p>
                </div>
              </div>

              {/* Earned stickers */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  Earned Profile Stickers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(user?.stickers || ["NLU Delhi Scholar", "Supreme Court Fellow", "Gold Patron Member"]).map(
                    (st, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        ⭐ {st}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* UPI Payment Gateway info */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                  Direct UPI Payment Channel (YouPI-PG)
                </span>
                <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-white border border-slate-200">
                  <span className="font-mono text-xs text-slate-900 font-bold flex-1 select-all">
                    {PRIMARY_UPI_ID}
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {copiedUpi ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedUpi ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Powered by YouPI-PG protocol with UTR manual verification and instant profile sticker minting.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSuperThanksModal(true)}
                  className="w-full text-xs border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <QrCode className="h-3.5 w-3.5 mr-1 text-amber-600" />
                  <span>Show UPI QR Code & Tiers</span>
                </Button>
              </div>
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

        {/* SuperThanks Modal */}
        <SuperThanksModal
          isOpen={showSuperThanksModal}
          onClose={() => setShowSuperThanksModal(false)}
        />
      </div>
    </AppShell>
  );
}
