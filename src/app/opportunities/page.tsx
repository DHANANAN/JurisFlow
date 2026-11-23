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
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { opportunities as initialOpportunities } from "@/lib/data";
import { Opportunity, OpportunityType } from "@/lib/types";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = React.useState<Opportunity[]>(initialOpportunities);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("All");
  const [selectedLocation, setSelectedLocation] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<"score" | "deadline" | "recent">("score");
  const [savedOnly, setSavedOnly] = React.useState(false);

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, isBookmarked: !opp.isBookmarked } : opp
      )
    );
  };

  // Filtered & sorted opportunities
  const filteredOpportunities = React.useMemo(() => {
    return opportunities
      .filter((opp) => {
        const matchesSearch =
          opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.practiceAreas.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
          opp.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
          selectedType === "All" ||
          opp.type.toLowerCase().includes(selectedType.toLowerCase());

        const matchesLocation =
          selectedLocation === "All" ||
          opp.location.toLowerCase().includes(selectedLocation.toLowerCase());

        const matchesBookmark = !savedOnly || opp.isBookmarked;

        return matchesSearch && matchesType && matchesLocation && matchesBookmark;
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      });
  }, [opportunities, searchTerm, selectedType, selectedLocation, sortBy, savedOnly]);

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
    <AppShell title="Opportunity Discovery Engine">
      <div className="space-y-6 pb-12">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                Discover Legal Opportunities
              </h2>
              <Badge variant="purple" className="text-xs">
                50+ Sources Aggregated
              </Badge>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Real-time scraping from Lawlit, Lawctopus, LiveLaw, Bar & Bench, SCC Online, Court gazettes, and tier-1 disputes career portals. Ranked by your NLU Delhi profile algorithm.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={savedOnly ? "default" : "outline"}
              onClick={() => setSavedOnly(!savedOnly)}
              className="text-xs gap-1.5"
            >
              <Bookmark className="h-3.5 w-3.5" />
              Saved ({opportunities.filter((o) => o.isBookmarked).length})
            </Button>
            <Link href="/emails">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-200" />
                Batch Outreach
              </Button>
            </Link>
          </div>
        </div>

        {/* ── SEARCH & ADVANCED FILTERS BAR ────────────────────────── */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by chamber name, judge, law firm, practice area (e.g. Constitutional Law, Arbitration)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 text-xs sm:text-sm bg-slate-50/50"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Location filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Locations</option>
                <option value="Delhi">Delhi NCR (+20 bonus)</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
              </select>

              {/* Sort filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="score">Sort: AI Score (Highest)</option>
                <option value="deadline">Sort: Deadline (Nearest)</option>
                <option value="recent">Sort: Recently Added</option>
              </select>
            </div>
          </div>

          {/* Type Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mr-1">
              Category:
            </span>
            {typeCategories.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedType === type
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* ── OPPORTUNITY SCORING RULES CALLOUT ────────────────────── */}
        <div className="px-4 py-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col md:flex-row md:items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 text-blue-900 font-medium">
            <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
            <span>
              <strong>Active Scoring Rules:</strong> SCI Chambers (100) • SCI Clerkship (98) • High Court Chambers (95) • Tier 1 Firm (90) • Delhi NCR (+20) • Const Law (+20)
            </span>
          </div>
          <span className="text-blue-700 font-semibold shrink-0">
            {filteredOpportunities.length} opportunities matched
          </span>
        </div>

        {/* ── OPPORTUNITY CARDS GRID ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header row: type badge, score, bookmark */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-[11px] bg-slate-50 font-semibold">
                      {opp.type}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Via {opp.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ScoreBadge score={opp.score} size="md" />
                    <button
                      onClick={() => toggleBookmark(opp.id)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title={opp.isBookmarked ? "Remove Bookmark" : "Save Opportunity"}
                    >
                      {opp.isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Organization & Position */}
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {opp.position}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mt-1">
                    <Building className="h-3.5 w-3.5 text-slate-400" />
                    <span>{opp.organization}</span>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {opp.description}
                </p>

                {/* Practice area tags */}
                <div className="flex flex-wrap gap-1.5">
                  {opp.practiceAreas.map((area, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer details row */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-500">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    {opp.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-600 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                    Deadline: {opp.deadline}
                  </span>
                  <span className="flex items-center gap-1.5 truncate">
                    <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    {opp.contactPerson}
                  </span>
                  <span className="flex items-center gap-1.5 truncate text-blue-600 font-mono">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    {opp.contactEmail}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    Route: <strong className="text-slate-700">{opp.applicationRoute}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <Link href={`/emails?target=${encodeURIComponent(opp.organization)}&position=${encodeURIComponent(opp.position)}&email=${encodeURIComponent(opp.contactEmail)}`}>
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        Personalize Email
                      </Button>
                    </Link>
                    <Link href="/applications">
                      <Button size="sm" className="text-xs h-8 bg-slate-900 hover:bg-blue-600 text-white">
                        Track in CRM
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No opportunities found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, location filter, or category pills to see more results.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedType("All");
                setSelectedLocation("All");
                setSavedOnly(false);
              }}
              className="mt-4 text-xs"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
