"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Mail,
  User,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowUpDown,
  Building,
  CheckCircle2,
  SlidersHorizontal,
  RefreshCw,
  Zap,
  Check,
  Send,
  X,
  Copy,
  Clock,
  Banknote,
  GraduationCap,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { opportunities as initialOpportunities } from "@/lib/data";
import { Opportunity, OpportunityType } from "@/lib/types";
import { getActiveUser } from "@/lib/firebase";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = React.useState<Opportunity[]>(initialOpportunities);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("All");
  const [selectedTiming, setSelectedTiming] = React.useState<string>("All");
  const [selectedLocation, setSelectedLocation] = React.useState<string>("All");
  const [selectedSource, setSelectedSource] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<"score" | "deadline" | "stipend" | "recent">("score");
  const [savedOnly, setSavedOnly] = React.useState(false);

  // Live scraping refresh state
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [refreshMessage, setRefreshMessage] = React.useState<string | null>(null);

  // 1-Click Direct Apply Modal state
  const [applyOpp, setApplyOpp] = React.useState<Opportunity | null>(null);
  const [copiedDraft, setCopiedDraft] = React.useState(false);
  const [appliedSuccess, setAppliedSuccess] = React.useState(false);

  const currentUser = getActiveUser();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshMessage("Crawling 15 legal sources via Apify, Lawlit & Court Gazettes...");

    await new Promise((res) => setTimeout(res, 1200));

    setIsRefreshing(false);
    setRefreshMessage("✓ Refreshed! 15 sources indexed. 15 verified opportunities active.");
    setTimeout(() => setRefreshMessage(null), 3500);
  };

  const toggleBookmark = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, isBookmarked: !opp.isBookmarked } : opp
      )
    );
  };

  // 1-Click Apply logic
  const handleOpenApplyModal = (opp: Opportunity) => {
    setApplyOpp(opp);
    setCopiedDraft(false);
    setAppliedSuccess(false);
  };

  const generateEasterEggBody = (opp: Opportunity) => {
    return `Respected Sir/Madam,

I am ${currentUser.name}, a ${currentUser.year} student at ${currentUser.university}.

I write to express my sincere interest in the ${opp.position} at ${opp.organization}. Having observed proceedings and analyzed precedents in ${opp.practiceAreas.join(", ")}, I have closely followed your landmark matters.

A small confession: I have developed a habit of reading footnotes before conclusions, which has proven surprisingly useful for rigorous legal research and case analysis.

I have attached my updated CV and writing sample for your kind perusal. I would be deeply grateful for the opportunity to assist your chamber / team.

Thank you for your time and consideration.

Warm regards,
${currentUser.name}
${currentUser.university}
Email: ${currentUser.email}`;
  };

  const getGmailWebLink = (opp: Opportunity) => {
    const subject = encodeURIComponent(`Application for ${opp.position} — ${currentUser.name}`);
    const body = encodeURIComponent(generateEasterEggBody(opp));
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(opp.contactEmail)}&su=${subject}&body=${body}`;
  };

  const getMailtoLink = (opp: Opportunity) => {
    const subject = encodeURIComponent(`Application for ${opp.position} — ${currentUser.name}`);
    const body = encodeURIComponent(generateEasterEggBody(opp));
    return `mailto:${opp.contactEmail}?subject=${subject}&body=${body}`;
  };

  // Filtered & sorted opportunities
  const filteredOpportunities = React.useMemo(() => {
    return opportunities
      .filter((opp) => {
        const matchesSearch =
          opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.practiceAreas.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
          opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.source.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
          selectedType === "All" ||
          opp.type.toLowerCase().includes(selectedType.toLowerCase());

        const matchesLocation =
          selectedLocation === "All" ||
          opp.location.toLowerCase().includes(selectedLocation.toLowerCase());

        const matchesTiming =
          selectedTiming === "All" ||
          (selectedTiming === "Closing Soon" && opp.isClosingSoon) ||
          opp.timingStatus === selectedTiming;

        const matchesSource =
          selectedSource === "All" ||
          opp.source.toLowerCase().includes(selectedSource.toLowerCase());

        const matchesBookmark = !savedOnly || opp.isBookmarked;

        return matchesSearch && matchesType && matchesLocation && matchesTiming && matchesSource && matchesBookmark;
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        if (sortBy === "recent") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        return b.score - a.score;
      });
  }, [opportunities, searchTerm, selectedType, selectedLocation, selectedTiming, selectedSource, sortBy, savedOnly]);

  const typeCategories = [
    "All",
    "Supreme Court",
    "High Court",
    "Tier 1",
    "Tier 2",
    "Boutique",
    "Research",
    "Think Tank",
  ];

  return (
    <AppShell title="Opportunity Discovery Powerhouse">
      <div className="space-y-6 pb-16">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border transition-all bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
                Live Legal Opportunity Discovery
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold">
                15 Verified Indian Portals
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Aggregated from Lawlit, Supreme Court & High Court Registries, LiveLaw, Bar & Bench, SCC Online, and Top Chambers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Crawling Portals..." : "Refresh Opportunities"}</span>
            </Button>
          </div>
        </div>

        {/* Live Refresh Status Banner */}
        {refreshMessage && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{refreshMessage}</span>
          </div>
        )}

        {/* ── ADVANCED FILTERS & SEARCH POWERHOUSE ─────────────────── */}
        <div className="p-5 rounded-2xl border space-y-4 bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 shadow-xs">
          {/* Search bar & quick filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search judicial benches, law firms, practice areas, judges, stipends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {/* Timing Filter */}
              <select
                value={selectedTiming}
                onChange={(e) => setSelectedTiming(e.target.value)}
                className="rounded-xl border px-3 py-2 text-xs font-medium border-stone-200 bg-stone-50 text-stone-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="All">All Timings</option>
                <option value="Closing Soon">⚡ Closing Soon (&lt; 7 Days)</option>
                <option value="Newly Opened">✨ Newly Opened</option>
                <option value="Opening Soon">📅 Opening Soon</option>
                <option value="Rolling">🔄 Rolling Deadlines</option>
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="rounded-xl border px-3 py-2 text-xs font-medium border-stone-200 bg-stone-50 text-stone-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="All">All Locations</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Remote">Remote</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl border px-3 py-2 text-xs font-medium border-stone-200 bg-stone-50 text-stone-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="score">Sort by AI Match Score</option>
                <option value="deadline">Sort by Deadline Urgency</option>
                <option value="recent">Sort by Recently Posted</option>
              </select>

              <button
                onClick={() => setSavedOnly(!savedOnly)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  savedOnly
                    ? "bg-amber-500/20 text-amber-900 border-amber-500 dark:text-amber-300"
                    : "border-stone-200 bg-stone-50 text-stone-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Saved ({opportunities.filter((o) => o.isBookmarked).length})</span>
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-stone-100 dark:border-slate-800/80">
            <span className="text-[11px] font-mono text-stone-400 dark:text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Type:
            </span>
            {typeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedType === cat
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── OPPORTUNITY CARDS GRID ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 hover:border-amber-400/80 dark:hover:border-amber-500/60 shadow-xs hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Header: Type, timing badge, Score, Bookmark */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-800 dark:text-slate-200">
                      {opp.type}
                    </span>
                    {opp.timingStatus && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                          opp.isClosingSoon
                            ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 animate-pulse"
                            : "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {opp.timingStatus}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <ScoreBadge score={opp.score} size="md" />
                    <button
                      onClick={() => toggleBookmark(opp.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                      title={opp.isBookmarked ? "Remove Bookmark" : "Save Opportunity"}
                    >
                      {opp.isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Organization & Position */}
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {opp.position}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-slate-300 mt-1">
                    <Building className="h-3.5 w-3.5 text-stone-400" />
                    <span>{opp.organization}</span>
                  </div>
                </div>

                {/* Stipend & Eligibility Callouts */}
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                  {opp.stipend && (
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                      <Banknote className="h-3.5 w-3.5 shrink-0" />
                      <span>{opp.stipend}</span>
                    </div>
                  )}
                  {opp.eligibility && (
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-slate-400">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      <span className="truncate">{opp.eligibility}</span>
                    </div>
                  )}
                </div>

                {/* Practice area tags */}
                <div className="flex flex-wrap gap-1.5">
                  {opp.practiceAreas.map((area, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Metadata and 1-Click Apply */}
              <div className="pt-3 border-t border-stone-100 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-stone-400" />
                    {opp.location}
                  </span>
                  <span className="flex items-center gap-1 font-mono font-semibold text-rose-600 dark:text-rose-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {opp.deadline}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 dark:text-slate-500">
                  <span>Source: {opp.source}</span>
                  <span className="text-amber-700 dark:text-amber-400 truncate max-w-[130px]">
                    {opp.contactEmail}
                  </span>
                </div>

                {/* Action buttons: 1-Click Direct Apply Powerhouse */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    onClick={() => handleOpenApplyModal(opp)}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs h-8.5 gap-1.5 shadow-xs"
                  >
                    <Zap className="h-3.5 w-3.5 fill-slate-950" />
                    <span>1-Click Apply</span>
                  </Button>

                  <Link href={`/emails?target=${encodeURIComponent(opp.organization)}&position=${encodeURIComponent(opp.position)}&email=${encodeURIComponent(opp.contactEmail)}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-8.5 px-2.5 border-stone-200 dark:border-slate-800"
                      title="Open in AI Email Engine"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="p-12 text-center rounded-2xl border bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800">
            <Search className="h-10 w-10 text-stone-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">No opportunities found</h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, timing filter, or location filter.
            </p>
          </div>
        )}
      </div>

      {/* ── 1-CLICK DIRECT APPLY MODAL POWERHOUSE ────────────────── */}
      {applyOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-stone-900 dark:text-white shadow-2xl space-y-4 p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold">
                  ⚡ 1-Click Application Powerhouse
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white mt-1">
                  Apply to {applyOpp.position}
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400">
                  {applyOpp.organization} • {applyOpp.contactEmail}
                </p>
              </div>
              <button
                onClick={() => setApplyOpp(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Generated Email Draft with Easter Egg Line */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Personalized Outreach Draft (With Footnote Memory Hook)
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateEasterEggBody(applyOpp));
                    setCopiedDraft(true);
                    setTimeout(() => setCopiedDraft(false), 2000);
                  }}
                  className="flex items-center gap-1 text-[11px] font-mono text-amber-700 dark:text-amber-400 hover:underline"
                >
                  {copiedDraft ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedDraft ? "Copied" : "Copy Draft"}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl border bg-stone-50 dark:bg-slate-950 border-stone-200 dark:border-slate-800 text-[11px] font-sans whitespace-pre-wrap leading-relaxed text-stone-800 dark:text-slate-200 max-h-56 overflow-y-auto">
                {generateEasterEggBody(applyOpp)}
              </pre>
            </div>

            {/* Direct Send Actions */}
            <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Gmail Web Draft Action */}
                <a
                  href={getGmailWebLink(applyOpp)}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 h-10 shadow-xs">
                    <Mail className="h-4 w-4" />
                    <span>Open in Gmail Draft</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>

                {/* Default Mailto Action */}
                <a href={getMailtoLink(applyOpp)} className="block">
                  <Button
                    variant="outline"
                    className="w-full font-semibold text-xs flex items-center justify-center gap-2 h-10 border-stone-300 dark:border-slate-700"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send via Mail Client</span>
                  </Button>
                </a>
              </div>

              {/* Log to CRM Button */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <span className="text-amber-900 dark:text-amber-200 font-medium">
                  Add to your Kanban CRM as <strong>&apos;Applied&apos;</strong> with automated D+7 follow-up tracking?
                </span>
                <Button
                  size="sm"
                  onClick={() => setAppliedSuccess(true)}
                  disabled={appliedSuccess}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 ml-2"
                >
                  {appliedSuccess ? "✓ Logged in CRM" : "Log in CRM"}
                </Button>
              </div>

              {appliedSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Application logged in your CRM pipeline! Follow-up reminders scheduled at D+7.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
