import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Trophy, Award, Zap } from "lucide-react";

interface ScoreBadgeProps {
  score: number;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ScoreBadge({
  score,
  showIcon = true,
  size = "md",
  className,
}: ScoreBadgeProps) {
  let colorStyles = "bg-slate-100 text-slate-700 border-slate-200";
  let Icon = Zap;

  if (score >= 95) {
    colorStyles = "bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-xs";
    Icon = Trophy;
  } else if (score >= 88) {
    colorStyles = "bg-blue-50 text-blue-700 border-blue-200/80";
    Icon = Sparkles;
  } else if (score >= 80) {
    colorStyles = "bg-amber-50 text-amber-700 border-amber-200/80";
    Icon = Award;
  } else {
    colorStyles = "bg-slate-100 text-slate-700 border-slate-200";
    Icon = Zap;
  }

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5 font-semibold",
    lg: "text-sm px-3.5 py-1.5 gap-2 font-bold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-mono tracking-tight",
        colorStyles,
        sizeStyles[size],
        className
      )}
      title={`JurisFlow AI Score: ${score}/100`}
    >
      {showIcon && <Icon className={size === "lg" ? "h-4 w-4" : "h-3 w-3"} />}
      <span>{score}</span>
      <span className="text-[10px] opacity-70 font-sans font-normal">pts</span>
    </span>
  );
}
