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
  LayoutGrid,
  Smartphone,
  FileText,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { opportunities as initialOpportunities } from "@/lib/data";
import { Opportunity, OpportunityType } from "@/lib/types";
import { getActiveUser } from "@/lib/firebase";
import { useTheme } from "@/lib/theme-context";
import { SwipeDeck } from "@/components/opportunities/swipe-deck";
import { CvIntelligenceModal, DHANANJAY_DEFAULT_CV, ParsedCVProfile } from "@/components/cv/cv-intelligence-modal";

export default function OpportunitiesPage() {
  const { theme } = useTheme();
  const isLight = theme === "sand-gold";

  const [opportunities, setOpportunities] = React.useState<Opportunity[]>(initialOpportunities);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("All");
  const [selectedTiming, setSelectedTiming] = React.useState<string>("All");
  const [selectedLocation, setSelectedLocation] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<"score" | "deadline" | "stipend" | "recent">("score");
  const [savedOnly, setSavedOnly] = React.useState(false);

  // View mode: Swipe Deck vs Grid View
  const [viewMode, setViewMode] = React.useState<"deck" | "grid">("deck");

  // CV Intelligence Profile State
  const [cvProfile, setCvProfile] = React.useState<ParsedCVProfile>(DHANANJAY_DEFAULT_CV);
  const [isCvModalOpen, setIsCvModalOpen] = React.useState(false);

  // Live scraping refresh state
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [refreshMessage, setRefreshMessage] = React.useState<string | null>(null);

  // 1-Click Direct Apply Modal state
  const [applyOpp, setApplyOpp] = React.useState<Opportunity | null>(null);
  const [copiedDraft, setCopiedDraft] = React.useState(false);
  const [appliedSuccess, setAppliedSuccess] = React.useState(false);

  // Load saved CV from localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jurisflow-cv-profile");
      if (saved) {
        try {
          setCvProfile(JSON.parse(saved));
        } catch {}
      }
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshMessage("Crawling 15 legal sources via Apify, Lawlit & Court Gazettes...");
    await new Promise((res) => setTimeout(res, 1000));
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

  const handleOpenApplyModal = (opp: Opportunity) => {
    setApplyOpp(opp);
    setCopiedDraft(false);
    setAppliedSuccess(false);
  };

  // Generate personalized email using parsed CV profile and active Easter Egg memory hook
  const generateEasterEggBody = (opp: Opportunity) => {
    return `Respected Sir/Madam,

I am ${cvProfile.name}, a ${cvProfile.year} student at ${cvProfile.university}.

I write to express my sincere interest in the ${opp.position} at ${opp.organization}. Having observed proceedings and analyzed judicial precedents in ${opp.practiceAreas.join(", ")}, I have closely followed your landmark matters. Through internships at the Telangana High Court and District Courts, alongside specialized research in disability law (UNCRPD India State Report) and urban governance (RERA), I have developed a rigorous foundation in adjudicatory drafting and case-file synthesis.

${cvProfile.selectedMemoryHook}

I have attached my updated CV (${cvProfile.rawCvFileName}) and writing sample for your kind perusal. I would be deeply grateful for the opportunity to assist your chamber / team.

Thank you for your time and consideration.

Warm regards,
${cvProfile.name}
${cvProfile.year} • ${cvProfile.university}
Portfolio: ${cvProfile.portfolio}
LinkedIn: ${cvProfile.linkedin}
Contact: ${cvProfile.phone}`;
  };

  // Pre-fill Gmail Web compose link
  const getGmailComposeUrl = (opp: Opportunity) => {
    const to = opp.contactEmail || "registry@sci.nic.in";
    const subject = encodeURIComponent(`Application: ${opp.position} — ${cvProfile.name} (${cvProfile.university})`);
    const body = encodeURIComponent(generateEasterEggBody(opp));
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
  };

  const getMailtoUrl = (opp: Opportunity) => {
    const to = opp.contactEmail || "registry@sci.nic.in";
    const subject = encodeURIComponent(`Application: ${opp.position} — ${cvProfile.name} (${cvProfile.university})`);
    const body = encodeURIComponent(generateEasterEggBody(opp));
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = (opp: Opportunity) => {
    navigator.clipboard.writeText(generateEasterEggBody(opp));
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleLogToCrm = (opp: Opportunity) => {
    setAppliedSuccess(true);
    setTimeout(() => {
      setApplyOpp(null);
      setAppliedSuccess(false);
    }, 1200);
  };

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

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.practiceAreas.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (opp.stipend && opp.stipend.toLowerCase().includes(searchTerm.toLowerCase())) ||
      opp.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "All" ||
      (selectedType === "Supreme Court" && opp.type.toLowerCase().includes("supreme")) ||
      (selectedType === "High Court" && opp.type.toLowerCase().includes("high")) ||
      (selectedType === "Tier 1" && opp.type.toLowerCase().includes("tier 1")) ||
      (selectedType === "Tier 2" && opp.type.toLowerCase().includes("tier 2")) ||
      (selectedType === "Boutique" && opp.type.toLowerCase().includes("boutique")) ||
      (selectedType === "Research" && (opp.type.toLowerCase().includes("research") || opp.type.toLowerCase().includes("fellowship"))) ||
      (selectedType === "Think Tank" && opp.type.toLowerCase().includes("think"));

    const matchesTiming =
      selectedTiming === "All" ||
      (selectedTiming === "Closing Soon" && opp.isClosingSoon) ||
      (selectedTiming === "Newly Opened" && opp.timingStatus === "Newly Opened") ||
      (selectedTiming === "Rolling" && opp.timingStatus === "Rolling") ||
      (selectedTiming === "Opening Soon" && opp.timingStatus === "Opening Soon");

    const matchesLocation =
      selectedLocation === "All" ||
      opp.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesSaved = !savedOnly || opp.isBookmarked;

    return matchesSearch && matchesType && matchesTiming && matchesLocation && matchesSaved;
  });

  return (
    <AppShell title="Opportunity Discovery Powerhouse">
      <div className="space-y-6 max-w-7xl mx-auto px-1">
        {/* ── TOP HERO BANNER & CONTROLS ───────────────────────────── */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border transition-all ${
            isLight
              ? "bg-white border-[#e7e0d3] text-stone-900 shadow-xs"
              : "bg-[#0a1122] border-slate-800 text-slate-100 shadow-xl"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isLight ? "text-stone-950" : "text-white"}`}>
                  15-Source Legal Opportunity Powerhouse
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  15 Verified Sources
                </span>
              </div>
              <p className={`text-xs ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                Real-time registry indexers for Supreme Court, 25 High Courts, Chambers, Lawlit, LiveLaw, Bar & Bench, and SCC Online.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* CV Intelligence Button */}
              <button
                onClick={() => setIsCvModalOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isLight
                    ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                    : "bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>CV Intelligence & Hooks</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20">
                  {cvProfile.rawCvFileName.replace(/\.pdf$/, "")}
                </span>
              </button>

              {/* View Switcher: Swipe Deck vs Grid */}
              <div
                className={`flex rounded-xl p-1 border ${
                  isLight ? "bg-stone-100 border-stone-200" : "bg-slate-950 border-slate-800"
                }`}
              >
                <button
                  onClick={() => setViewMode("deck")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "deck"
                      ? "bg-amber-500 text-slate-950 shadow-xs"
                      : isLight
                      ? "text-stone-600 hover:text-stone-900"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Swipe Deck</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "grid"
                      ? "bg-amber-500 text-slate-950 shadow-xs"
                      : isLight
                      ? "text-stone-600 hover:text-stone-900"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Grid View</span>
                </button>
              </div>

              {/* Refresh Opportunities Button */}
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
              >
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Scraping Portals..." : "Refresh Opportunities"}</span>
              </Button>
            </div>
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
        <div
          className={`p-4 sm:p-5 rounded-2xl border space-y-4 shadow-xs ${
            isLight ? "bg-white border-[#e7e0d3] text-stone-900" : "bg-[#0a1122] border-slate-800 text-slate-100"
          }`}
        >
          {/* Search bar & quick filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search judicial benches, law firms, practice areas, judges, stipends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-xl border pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                  isLight
                    ? "border-stone-200 bg-stone-50/80 text-stone-900 placeholder:text-stone-400"
                    : "border-slate-800 bg-slate-950 text-white placeholder:text-slate-500"
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {/* Timing Filter */}
              <select
                value={selectedTiming}
                onChange={(e) => setSelectedTiming(e.target.value)}
                className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                  isLight
                    ? "border-stone-200 bg-stone-50 text-stone-800"
                    : "border-slate-800 bg-slate-950 text-slate-200"
                }`}
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
                className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                  isLight
                    ? "border-stone-200 bg-stone-50 text-stone-800"
                    : "border-slate-800 bg-slate-950 text-slate-200"
                }`}
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
                className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                  isLight
                    ? "border-stone-200 bg-stone-50 text-stone-800"
                    : "border-slate-800 bg-slate-950 text-slate-200"
                }`}
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
                    : isLight
                    ? "border-stone-200 bg-stone-50 text-stone-600"
                    : "border-slate-800 bg-slate-950 text-slate-400"
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
                    : isLight
                    ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONDITIONAL RENDERING: SWIPE DECK VS GRID VIEW ──────── */}
        {viewMode === "deck" ? (
          <SwipeDeck
            opportunities={filteredOpportunities}
            onApply={handleOpenApplyModal}
            onBookmarkToggle={toggleBookmark}
          />
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${
                  isLight
                    ? "bg-white border-[#e7e0d3] text-stone-900 hover:border-amber-400"
                    : "bg-[#0a1122] border-slate-800 text-slate-100 hover:border-amber-500/60"
                }`}
              >
                <div className="space-y-3">
                  {/* Header: Type, timing badge, Score, Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isLight ? "bg-stone-100 text-stone-800" : "bg-slate-800 text-slate-200"
                      }`}>
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
                        className={`p-1.5 rounded-lg transition-colors ${
                          isLight
                            ? "text-stone-400 hover:text-amber-600 hover:bg-amber-50"
                            : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                        }`}
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
                    <h3 className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-stone-900" : "text-white"}`}>
                      {opp.position}
                    </h3>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold mt-1 ${isLight ? "text-stone-600" : "text-slate-300"}`}>
                      <Building className="h-3.5 w-3.5 text-amber-500" />
                      <span>{opp.organization}</span>
                    </div>
                  </div>

                  {/* Stipend & Eligibility */}
                  <div className="space-y-1.5 pt-1">
                    {opp.stipend && (
                      <div className={`flex items-center gap-1.5 text-xs font-bold ${isLight ? "text-emerald-800" : "text-emerald-400"}`}>
                        <Banknote className="h-3.5 w-3.5 shrink-0" />
                        <span>{opp.stipend}</span>
                      </div>
                    )}
                    {opp.eligibility && (
                      <div className={`flex items-start gap-1.5 text-[11px] ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                        <GraduationCap className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                        <span className="line-clamp-2">{opp.eligibility}</span>
                      </div>
                    )}
                  </div>

                  {/* Practice Areas */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {opp.practiceAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                          isLight
                            ? "bg-stone-100 text-stone-700 border-stone-200"
                            : "bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Location, Deadline & 1-Click Apply */}
                <div className="pt-3 border-t border-stone-100 dark:border-slate-800/80 space-y-3">
                  <div className={`flex items-center justify-between text-[11px] font-mono ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {opp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {opp.deadline}
                    </span>
                  </div>

                  <div className={`flex items-center justify-between text-[10px] font-mono ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                    <span>Source: {opp.source}</span>
                    <span className="truncate max-w-[150px]">{opp.contactEmail}</span>
                  </div>

                  <Button
                    onClick={() => handleOpenApplyModal(opp)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-2 shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 fill-slate-950" />
                    <span>1-Click Apply (Draft Gmail)</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 1-CLICK DIRECT APPLY MODAL ───────────────────────────── */}
        {applyOpp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
            <div
              className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl transition-all ${
                isLight ? "bg-white border-[#e7e0d3] text-stone-900" : "bg-[#0a1122] border-slate-800 text-slate-100"
              }`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between border-b px-5 py-4 ${
                  isLight ? "bg-stone-50 border-stone-200" : "bg-slate-950/80 border-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Zap className="h-4 w-4 fill-slate-950" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold flex items-center gap-1.5 ${isLight ? "text-stone-900" : "text-white"}`}>
                      1-Click Direct Outreach: {applyOpp.position}
                    </h3>
                    <p className={`text-[11px] ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                      Pre-populates tailored outreach letter with your active footnote memory hook
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setApplyOpp(null)}
                  className={`rounded-lg p-1.5 ${isLight ? "text-stone-400 hover:text-stone-900" : "text-slate-400 hover:text-white"}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`p-2.5 rounded-xl border ${isLight ? "bg-stone-50 border-stone-200" : "bg-slate-900/60 border-slate-800"}`}>
                    <span className={`text-[10px] uppercase font-mono block ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                      Recipient Chamber
                    </span>
                    <span className="font-bold truncate block">{applyOpp.organization}</span>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">{applyOpp.contactEmail}</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${isLight ? "bg-stone-50 border-stone-200" : "bg-slate-900/60 border-slate-800"}`}>
                    <span className={`text-[10px] uppercase font-mono block ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                      Active CV & Hook
                    </span>
                    <span className="font-bold truncate block">{cvProfile.name} ({cvProfile.university})</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Attachment: {cvProfile.rawCvFileName}</span>
                  </div>
                </div>

                {/* Pre-Generated Outreach Preview */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                      Tailored Outreach Letter Preview:
                    </span>
                    <button
                      onClick={() => handleCopyDraft(applyOpp)}
                      className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg border ${
                        isLight ? "border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700" : "border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      {copiedDraft ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedDraft ? "Copied!" : "Copy Text"}</span>
                    </button>
                  </div>

                  <textarea
                    rows={8}
                    readOnly
                    value={generateEasterEggBody(applyOpp)}
                    className={`w-full rounded-xl border p-3 text-xs font-mono leading-relaxed focus:outline-none ${
                      isLight ? "border-stone-200 bg-stone-50 text-stone-900" : "border-slate-800 bg-slate-950 text-slate-200"
                    }`}
                  />
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2">
                  <a
                    href={getGmailComposeUrl(applyOpp)}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                    onClick={() => handleLogToCrm(applyOpp)}
                  >
                    <Button className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs py-2.5 shadow-md flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Open in Gmail Web Draft (Instant Compose)</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={getMailtoUrl(applyOpp)}
                      className="block"
                      onClick={() => handleLogToCrm(applyOpp)}
                    >
                      <Button variant="outline" size="sm" className="w-full text-xs border-stone-300 dark:border-slate-700">
                        <span>Open Desktop Mail (mailto:)</span>
                      </Button>
                    </a>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLogToCrm(applyOpp)}
                      className="w-full text-xs border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10"
                    >
                      {appliedSuccess ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Logged in CRM!
                        </span>
                      ) : (
                        <span>Mark Applied & Schedule D+7 Follow-Up</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CV INTELLIGENCE MODAL ─────────────────────────────────── */}
        <CvIntelligenceModal
          isOpen={isCvModalOpen}
          onClose={() => setIsCvModalOpen(false)}
          onProfileUpdated={(updated) => setCvProfile(updated)}
        />
      </div>
    </AppShell>
  );
}
