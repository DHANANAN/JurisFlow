"use client";

import * as React from "react";
import {
  Bookmark,
  BookmarkCheck,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Heart,
  MapPin,
  RotateCcw,
  Send,
  Sparkles,
  X,
  Zap,
  ChevronLeft,
  ChevronRight,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreBadge } from "@/components/ui/score-badge";
import { Opportunity } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";

interface SwipeDeckProps {
  opportunities: Opportunity[];
  onApply: (opp: Opportunity) => void;
  onBookmarkToggle: (id: string) => void;
}

export function SwipeDeck({
  opportunities,
  onApply,
  onBookmarkToggle,
}: SwipeDeckProps) {
  const { theme } = useTheme();
  const isLight = theme === "sand-gold";

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [swipeDirection, setSwipeDirection] = React.useState<"left" | "right" | null>(null);

  const activeOpp = opportunities[currentIndex] || opportunities[0];
  const nextOpp = opportunities[(currentIndex + 1) % opportunities.length];

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
    if (diff > 40) setSwipeDirection("right");
    else if (diff < -40) setSwipeDirection("left");
    else setSwipeDirection(null);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset > 90) {
      // Swiped right -> Apply / Save
      handleSwipeRight();
    } else if (dragOffset < -90) {
      // Swiped left -> Pass
      handleSwipeLeft();
    }
    setDragOffset(0);
    setSwipeDirection(null);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
    if (diff > 40) setSwipeDirection("right");
    else if (diff < -40) setSwipeDirection("left");
    else setSwipeDirection(null);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 90) {
      handleSwipeRight();
    } else if (dragOffset < -90) {
      handleSwipeLeft();
    }
    setDragOffset(0);
    setSwipeDirection(null);
  };

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => (prev + 1) % opportunities.length);
  };

  const handleSwipeRight = () => {
    if (activeOpp) {
      if (!activeOpp.isBookmarked) {
        onBookmarkToggle(activeOpp.id);
      }
      onApply(activeOpp);
    }
    setCurrentIndex((prev) => (prev + 1) % opportunities.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  if (!opportunities.length) return null;

  const rotation = dragOffset * 0.08;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset) / 500);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none py-4">
      {/* Deck Header & Counter */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className={`text-xs font-mono font-bold ${isLight ? "text-stone-700" : "text-amber-400"}`}>
            Interactive Swipe Deck
          </span>
          <span className={`text-[11px] font-mono ${isLight ? "text-stone-500" : "text-slate-500"}`}>
            ({currentIndex + 1} of {opportunities.length})
          </span>
        </div>

        <button
          onClick={handleReset}
          className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${
            isLight ? "text-stone-500 hover:text-stone-900" : "text-slate-400 hover:text-white"
          }`}
          title="Reset card stack to beginning"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Stack</span>
        </button>
      </div>

      {/* Card Container Stack */}
      <div className="relative w-full h-[470px] sm:h-[490px] flex items-center justify-center">
        {/* Background Card Preview */}
        {nextOpp && (
          <div
            className={`absolute inset-0 rounded-3xl border scale-95 translate-y-3 opacity-60 pointer-events-none transition-all ${
              isLight ? "bg-white border-[#e7e0d3] shadow-md" : "bg-[#0a1122] border-slate-800 shadow-xl"
            }`}
          />
        )}

        {/* Foreground Interactive Swipeable Card */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
            opacity: opacity,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          className={`relative w-full h-full rounded-3xl border p-6 flex flex-col justify-between shadow-2xl transition-transform duration-75 ${
            isLight
              ? "bg-white border-[#e7e0d3] text-stone-900 shadow-stone-300/40"
              : "bg-[#0a1122] border-slate-800 text-slate-100 shadow-black/80"
          }`}
        >
          {/* Stamp indicator when dragging */}
          {swipeDirection === "right" && (
            <div className="absolute top-6 left-6 z-20 border-3 border-emerald-500 text-emerald-600 font-black text-xl px-4 py-1 rounded-xl -rotate-12 bg-white/90 uppercase tracking-widest shadow-lg">
              Apply / Save
            </div>
          )}
          {swipeDirection === "left" && (
            <div className="absolute top-6 right-6 z-20 border-3 border-rose-500 text-rose-600 font-black text-xl px-4 py-1 rounded-xl rotate-12 bg-white/90 uppercase tracking-widest shadow-lg">
              Pass
            </div>
          )}

          {/* Top Row: Type, Timing, Score, Bookmark */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg ${
                  isLight ? "bg-stone-100 text-stone-800" : "bg-slate-800 text-slate-200"
                }`}>
                  {activeOpp.type}
                </span>

                {activeOpp.timingStatus && (
                  <span className={`text-[11px] font-mono px-2.5 py-1 rounded-lg font-bold ${
                    activeOpp.isClosingSoon
                      ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30"
                      : "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                  }`}>
                    {activeOpp.timingStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <ScoreBadge score={activeOpp.score} size="md" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmarkToggle(activeOpp.id);
                  }}
                  className={`p-2 rounded-xl border transition-colors ${
                    activeOpp.isBookmarked
                      ? "bg-amber-500/20 text-amber-600 border-amber-500/40"
                      : isLight
                      ? "border-stone-200 hover:bg-stone-100 text-stone-400"
                      : "border-slate-800 hover:bg-slate-800 text-slate-400"
                  }`}
                >
                  {activeOpp.isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Position and Chamber */}
            <div>
              <h3 className={`font-extrabold text-lg sm:text-xl leading-tight ${isLight ? "text-stone-950" : "text-white"}`}>
                {activeOpp.position}
              </h3>
              <div className={`flex items-center gap-1.5 text-xs font-semibold mt-1.5 ${isLight ? "text-stone-600" : "text-slate-300"}`}>
                <Building className="h-4 w-4 text-amber-500" />
                <span>{activeOpp.organization}</span>
              </div>
            </div>

            {/* Stipend & Location pills */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className={`p-2.5 rounded-xl border ${
                isLight ? "bg-emerald-50/70 border-emerald-200" : "bg-emerald-500/10 border-emerald-500/20"
              }`}>
                <span className={`text-[10px] uppercase font-mono font-bold block ${isLight ? "text-emerald-800" : "text-emerald-400"}`}>
                  Stipend
                </span>
                <span className={`text-xs font-extrabold ${isLight ? "text-emerald-950" : "text-emerald-300"}`}>
                  {activeOpp.stipend || "Official Standard"}
                </span>
              </div>

              <div className={`p-2.5 rounded-xl border ${
                isLight ? "bg-stone-50 border-stone-200" : "bg-slate-900 border-slate-800"
              }`}>
                <span className={`text-[10px] uppercase font-mono font-bold block ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                  Location
                </span>
                <span className={`text-xs font-extrabold ${isLight ? "text-stone-900" : "text-slate-200"}`}>
                  {activeOpp.location}
                </span>
              </div>
            </div>

            {/* Eligibility & Practice Areas */}
            <div className="space-y-1.5 pt-1">
              {activeOpp.eligibility && (
                <div className={`flex items-start gap-1.5 text-xs ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                  <GraduationCap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{activeOpp.eligibility}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1 pt-1">
                {activeOpp.practiceAreas.slice(0, 3).map((area, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isLight
                        ? "bg-stone-100 text-stone-700 border-stone-200"
                        : "bg-slate-900 text-slate-300 border-slate-800"
                    }`}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card Bottom: Source info & 1-Click Apply */}
          <div className="pt-3 border-t border-stone-100 dark:border-slate-800/80 space-y-3">
            <div className={`flex items-center justify-between text-[11px] font-mono ${isLight ? "text-stone-500" : "text-slate-400"}`}>
              <span>Source: {activeOpp.source}</span>
              <span>Deadline: {activeOpp.deadline}</span>
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                onApply(activeOpp);
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-2.5 shadow-md flex items-center justify-center gap-1.5"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>1-Click Direct Apply (Gmail Web Draft)</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Swipe Controls Bar below card */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={handleSwipeLeft}
          className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all ${
            isLight
              ? "bg-white border-stone-200 hover:bg-stone-100 text-rose-600 shadow-sm hover:scale-105"
              : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-rose-400 shadow-md hover:scale-105"
          }`}
          title="Pass / Next (Swipe Left)"
        >
          <X className="h-6 w-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle(activeOpp.id);
          }}
          className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all ${
            isLight
              ? "bg-white border-stone-200 hover:bg-stone-100 text-amber-600 shadow-sm"
              : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-400 shadow-md"
          }`}
          title="Bookmark Opportunity"
        >
          <Bookmark className="h-5 w-5" />
        </button>

        <button
          onClick={handleSwipeRight}
          className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          title="Apply & Save (Swipe Right)"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      <p className={`text-[11px] font-mono mt-2 ${isLight ? "text-stone-400" : "text-slate-500"}`}>
        Drag or swipe card left to pass • Swipe right to apply
      </p>
    </div>
  );
}
