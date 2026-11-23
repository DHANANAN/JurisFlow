"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  KanbanSquare,
  Landmark,
  Mail,
  Users,
  BarChart3,
  BookOpen,
  Sparkles,
  Heart,
  Cloud,
  ChevronUp,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { getActiveUser, subscribeToAuth } from "@/lib/firebase";
import { User } from "@/lib/types";
import { MembershipSticker } from "@/components/ui/membership-sticker";
import { SuperThanksModal } from "@/components/superthanks/superthanks-modal";

export function BottomDock() {
  const pathname = usePathname();
  const [user, setUser] = React.useState<User | null>(null);
  const [isSuperThanksOpen, setIsSuperThanksOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const unsub = subscribeToAuth((u) => setUser(u));
    return unsub;
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Opportunities", href: "/opportunities", icon: Search },
    { name: "CRM", href: "/applications", icon: KanbanSquare },
    { name: "Judicial", href: "/judicial", icon: Landmark },
    { name: "AI Emails", href: "/emails", icon: Mail },
    { name: "Contacts", href: "/contacts", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Prompts", href: "/prompts", icon: BookOpen },
    { name: "Intelligence", href: "/intelligence", icon: Sparkles },
  ];

  return (
    <>
      {/* Floating Bottom Dock Container */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none pb-2 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`pointer-events-auto transition-all duration-300 ease-out transform ${
            isHovered
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-2.5 opacity-90 hover:opacity-100"
          }`}
        >
          {/* Peeking Cute Pill when not hovered */}
          {!isHovered && (
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700/80 shadow-lg backdrop-blur-md cursor-pointer hover:border-amber-400/60 transition-all">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium tracking-tight flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>JurisFlow OS Dock</span>
                <span className="text-[10px] font-mono text-slate-400">• Hover to expand</span>
              </span>
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-700">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSuperThanksOpen(true);
                  }}
                  className="flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <Heart className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>SuperThanks</span>
                </button>
              </div>
              <ChevronUp className="h-3.5 w-3.5 text-slate-400 animate-bounce" />
            </div>
          )}

          {/* Expanded Navigation Dock on Hover */}
          {isHovered && (
            <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-slate-950/95 text-slate-100 border border-slate-800 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-2 duration-200 max-w-4xl">
              {/* Navigation icons row */}
              <div className="flex items-center gap-1 overflow-x-auto px-1 py-0.5">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-xs font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden md:inline">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Action divider */}
              <div className="hidden sm:block h-6 w-px bg-slate-800" />

              {/* SuperThanks Button & User Status */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSuperThanksOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs hover:from-amber-600 hover:to-rose-600 transition-all hover:scale-105"
                  title="SuperThanks Community Badge"
                >
                  <Heart className="h-3.5 w-3.5 fill-white" />
                  <span>SuperThanks</span>
                </button>

                {user && (
                  <div className="hidden lg:flex items-center gap-1.5 pl-1">
                    <MembershipSticker badge={user.contributorBadge} size="sm" />
                  </div>
                )}

                {/* Cloud sync status dot */}
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                  title="Google Cloud & Firebase Auth Active"
                >
                  <Cloud className="h-3 w-3 text-emerald-400" />
                  <span className="hidden xl:inline">GCP Sync</span>
                </div>

                {!user?.isLoggedIn && (
                  <Link href="/login">
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200">
                      <LogIn className="h-3.5 w-3.5" />
                      <span>Login</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global SuperThanks Modal */}
      <SuperThanksModal
        isOpen={isSuperThanksOpen}
        onClose={() => setIsSuperThanksOpen(false)}
      />
    </>
  );
}
