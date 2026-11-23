"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  Sparkles,
  Command,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { notifications, currentUser } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title: string;
  onOpenMobile?: () => void;
}

export function TopBar({ title, onOpenMobile }: TopBarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
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
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search chambers, firms, judges, files... (Ctrl+K)"
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* AI Action CTA button */}
        <Link href="/emails">
          <Button size="sm" className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-200" />
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

        {/* User avatar indicator */}
        <Link href="/settings" className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white">
            DC
          </div>
        </Link>
      </div>
    </header>
  );
}
