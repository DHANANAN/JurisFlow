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
  User as UserIcon,
} from "lucide-react";
import { notifications } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { getActiveUser, subscribeToAuth } from "@/lib/firebase";
import { User } from "@/lib/types";
import { MembershipSticker } from "@/components/ui/membership-sticker";
import { SuperThanksModal } from "@/components/superthanks/superthanks-modal";

interface TopBarProps {
  title: string;
  onOpenMobile?: () => void;
}

export function TopBar({ title, onOpenMobile }: TopBarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [showSuperThanks, setShowSuperThanks] = React.useState(false);

  React.useEffect(() => {
    const unsub = subscribeToAuth((u) => setUser(u));
    return unsub;
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick search input */}
          <div className="relative hidden md:block w-56 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search chambers, judges, files... (Ctrl+K)"
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* SuperThanks Support Button */}
          <Button
            size="sm"
            onClick={() => setShowSuperThanks(true)}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs shadow-xs"
          >
            <Heart className="h-3.5 w-3.5 fill-white text-white" />
            <span className="hidden sm:inline">SuperThanks</span>
          </Button>

          {/* AI Action CTA button */}
          <Link href="/emails">
            <Button
              size="sm"
              variant="outline"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-slate-700 border-slate-200 hover:bg-slate-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Generate Outreach</span>
            </Button>
          </Link>

          {/* Notifications toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
                  <span className="font-semibold text-sm text-slate-900">Notifications</span>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                    Mark all as read
                  </span>
                </div>
                <div className="mt-2 space-y-1.5 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-lg text-xs transition-colors ${
                        n.read ? "bg-white hover:bg-slate-50" : "bg-blue-50/50 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          {n.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{n.title}</p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Membership Sticker Display */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            {user?.isLoggedIn ? (
              <Link
                href="/settings"
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                title={`${user.name} • ${user.university}`}
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-amber-400">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  {user.contributorBadge && (
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {user.contributorBadge.icon}
                    </span>
                  )}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {user.name}
                  </div>
                  <MembershipSticker badge={user.contributorBadge} size="sm" />
                </div>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="ghost" className="text-xs text-blue-600 font-semibold gap-1">
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* SuperThanks Modal */}
      <SuperThanksModal
        isOpen={showSuperThanks}
        onClose={() => setShowSuperThanks(false)}
      />
    </>
  );
}
