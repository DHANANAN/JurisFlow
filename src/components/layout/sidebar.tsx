"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  LayoutDashboard,
  Search,
  KanbanSquare,
  Landmark,
  Mail,
  Users,
  BarChart3,
  BookOpen,
  Sparkles,
  Settings,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/data";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Opportunities",
    href: "/opportunities",
    icon: Search,
    badge: "12 New",
  },
  {
    name: "Application CRM",
    href: "/applications",
    icon: KanbanSquare,
    badge: "8",
  },
  {
    name: "Judicial Center",
    href: "/judicial",
    icon: Landmark,
    badge: "SCI/HC",
  },
  {
    name: "AI Email Engine",
    href: "/emails",
    icon: Mail,
    badge: "AI",
  },
  {
    name: "Contact Intelligence",
    href: "/contacts",
    icon: Users,
    badge: null,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Prompt Library",
    href: "/prompts",
    icon: BookOpen,
    badge: "8",
  },
  {
    name: "Career Intelligence",
    href: "/intelligence",
    icon: Sparkles,
    badge: "Match",
  },
];

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  JurisFlow
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded-sm border border-blue-200">
                  OS v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Legal Career Operating System</p>
            </div>
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-blue-50/80 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-700"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-medium transition-colors",
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Target Focus
          </div>

          <div className="px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Target Track
              </span>
              <span className="font-semibold text-slate-900">Delhi NCR / Hyd</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Supreme Court Chambers & Telangana HC Priority
            </p>
          </div>
        </div>

        {/* Footer Settings & Profile */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <Link
            href="/settings"
            onClick={onCloseMobile}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/settings"
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Settings & Integrations</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>

          {/* User mini profile card */}
          <Link
            href="/settings"
            onClick={onCloseMobile}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition-all text-left group"
          >
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shrink-0 shadow-xs">
              DC
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-blue-600">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {currentUser.university} • {currentUser.year}
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
