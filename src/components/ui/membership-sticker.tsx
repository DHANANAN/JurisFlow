"use client";

import * as React from "react";
import { ContributorBadge, ContributorTier } from "@/lib/types";
import { Sparkles, Award, ShieldCheck, Heart } from "lucide-react";

interface MembershipStickerProps {
  badge?: ContributorBadge | null;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function MembershipSticker({
  badge,
  size = "md",
  showLabel = true,
  className = "",
}: MembershipStickerProps) {
  if (!badge) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        Scholar Free
      </span>
    );
  }

  const getTierStyles = (tier: ContributorTier) => {
    switch (tier) {
      case "platinum":
        return {
          container: "bg-cyan-950/80 text-cyan-200 border-cyan-400/50 shadow-sm shadow-cyan-500/20",
          iconBg: "bg-cyan-500/20 text-cyan-300",
          ring: "ring-2 ring-cyan-400/40",
        };
      case "gold":
        return {
          container: "bg-amber-950/80 text-amber-200 border-amber-400/60 shadow-sm shadow-amber-500/20",
          iconBg: "bg-amber-500/20 text-amber-300",
          ring: "ring-2 ring-amber-400/40",
        };
      case "silver":
        return {
          container: "bg-slate-800 text-slate-200 border-slate-400/50",
          iconBg: "bg-slate-700 text-slate-300",
          ring: "ring-1 ring-slate-400/30",
        };
      case "bronze":
      default:
        return {
          container: "bg-orange-950/70 text-orange-200 border-orange-500/40",
          iconBg: "bg-orange-500/20 text-orange-300",
          ring: "ring-1 ring-orange-500/30",
        };
    }
  };

  const style = getTierStyles(badge.tier);

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2",
  };

  return (
    <span
      title={`JurisFlow Member: ${badge.title} (Active Supporter)`}
      className={`inline-flex items-center rounded-full font-semibold border transition-all hover:scale-105 select-none ${style.container} ${sizeClasses[size]} ${className}`}
    >
      <span className="text-sm leading-none">{badge.icon}</span>
      {showLabel && (
        <span className="tracking-tight flex items-center gap-1 font-mono">
          {badge.title}
          <Sparkles className="h-3 w-3 inline text-amber-300 animate-pulse" />
        </span>
      )}
    </span>
  );
}

export function YouTubeMemberBadgePill({
  name = "Dhananjay Chouhan",
  badge,
}: {
  name: string;
  badge?: ContributorBadge | null;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="font-semibold text-slate-900">{name}</span>
      {badge ? (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-300 dark:bg-amber-900/30 dark:text-amber-200"
          title={`Supporter Badge: ${badge.title}`}
        >
          <span>{badge.icon}</span>
          <span className="text-[10px] font-mono uppercase tracking-wider">Member</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-sm text-[10px] font-mono text-slate-500 bg-slate-100">
          NLU Delhi
        </span>
      )}
    </div>
  );
}
