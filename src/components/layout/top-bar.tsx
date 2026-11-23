"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle,
  LogIn,
  Sun,
  Moon,
  ArrowLeftRight,
} from "lucide-react";
import { notifications } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { subscribeToAuth } from "@/lib/firebase";
import { User } from "@/lib/types";
import { MembershipSticker } from "@/components/ui/membership-sticker";
import { SuperThanksModal } from "@/components/superthanks/superthanks-modal";
import { useTheme } from "@/lib/theme-context";

interface TopBarProps {
  title: string;
  onOpenMobile?: () => void;
}

export function TopBar({ title, onOpenMobile }: TopBarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [showSuperThanks, setShowSuperThanks] = React.useState(false);
  const { theme, toggleTheme, cycleLayout, layout } = useTheme();

  React.useEffect(() => {
    const unsub = subscribeToAuth((u) => setUser(u));
    return unsub;
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isLight = theme === "sand-gold";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b px-4 sm:px-6 backdrop-blur-md transition-colors duration-200 border-stone-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 text-stone-900 dark:text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl text-stone-900 dark:text-white">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick search input */}
          <div className="relative hidden md:block w-52 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search chambers, judges, files... (Ctrl+K)"
              className="h-8.5 w-full rounded-xl border pl-8.5 pr-3 text-xs placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all border-stone-200 bg-stone-50 text-stone-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {/* Theme Switcher Toggle (Sand Gold <-> Cosmic Space) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border transition-all border-stone-200 hover:bg-stone-100 text-amber-800 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-amber-400"
            title={`Switch to ${isLight ? "Cosmic Space (Dark Mode)" : "Sand Golden (Warm Mode)"}`}
            aria-label="Toggle Theme"
          >
            {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* SuperThanks Support Button */}
          <Button
            size="sm"
            onClick={() => setShowSuperThanks(true)}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs shadow-xs font-bold"
          >
            <Heart className="h-3.5 w-3.5 fill-white text-white" />
            <span className="hidden sm:inline">SuperThanks</span>
          </Button>

          {/* AI Outreach Button */}
          <Link href="/emails">
            <Button
              size="sm"
              variant="outline"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Draft Outreach</span>
            </Button>
          </Link>

          {/* Notifications toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600" />
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border p-3 shadow-xl z-50 bg-white border-stone-200 dark:bg-slate-900 dark:border-slate-800">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-stone-100 dark:border-slate-800">
                  <span className="font-semibold text-xs text-stone-900 dark:text-white">Notifications</span>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium cursor-pointer hover:underline">
                    Mark all as read
                  </span>
                </div>
                <div className="mt-2 space-y-1.5 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs transition-colors ${
                        n.read
                          ? "bg-stone-50/50 dark:bg-slate-900/50"
                          : "bg-amber-50/60 dark:bg-slate-800/80 border border-amber-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          {n.type === "success" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-stone-900 dark:text-slate-100">{n.title}</p>
                          <p className="text-stone-500 dark:text-slate-400 mt-0.5 text-[11px] leading-relaxed">{n.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Supporter Sticker */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-slate-800">
            {user?.isLoggedIn ? (
              <Link
                href="/settings"
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
                title={`${user.name} • ${user.university}`}
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-xs ring-2 ring-amber-400">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  {user.contributorBadge && (
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {user.contributorBadge.icon}
                    </span>
                  )}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-stone-900 dark:text-white leading-tight">
                    {user.name}
                  </div>
                  <MembershipSticker badge={user.contributorBadge} size="sm" />
                </div>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="ghost" className="text-xs font-semibold gap-1 text-amber-700 dark:text-amber-400">
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* SuperThanks Modal */}
      <SuperThanksModal isOpen={showSuperThanks} onClose={() => setShowSuperThanks(false)} />
    </>
  );
}
