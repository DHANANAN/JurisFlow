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
  Sun,
  Moon,
  ArrowLeftRight,
  PanelLeftClose,
  PanelLeftOpen,
  PanelTop,
  PanelBottom,
  Heart,
  X,
  RefreshCw,
  SlidersHorizontal,
  Cloud,
} from "lucide-react";
import { useTheme, NavLayout } from "@/lib/theme-context";
import { getActiveUser, subscribeToAuth } from "@/lib/firebase";
import { User } from "@/lib/types";
import { MembershipSticker } from "@/components/ui/membership-sticker";
import { SuperThanksModal } from "@/components/superthanks/superthanks-modal";

interface TransformableNavProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: null },
  { name: "Opportunities", href: "/opportunities", icon: Search, badge: "15 Sources" },
  { name: "Application CRM", href: "/applications", icon: KanbanSquare, badge: "Powerhouse" },
  { name: "Judicial Center", href: "/judicial", icon: Landmark, badge: "SCI/HC" },
  { name: "AI Email Engine", href: "/emails", icon: Mail, badge: "Easter Eggs" },
  { name: "Contacts", href: "/contacts", icon: Users, badge: null },
  { name: "Analytics", href: "/analytics", icon: BarChart3, badge: null },
  { name: "Prompt Library", href: "/prompts", icon: BookOpen, badge: null },
  { name: "Career Match", href: "/intelligence", icon: Sparkles, badge: null },
];

export function TransformableNav({ mobileOpen = false, onCloseMobile }: TransformableNavProps) {
  const pathname = usePathname();
  const { theme, toggleTheme, layout, setLayout, cycleLayout, mirrorLayout, isCollapsed, toggleCollapsed } = useTheme();
  const [user, setUser] = React.useState<User | null>(null);
  const [isSuperThanksOpen, setIsSuperThanksOpen] = React.useState(false);

  React.useEffect(() => {
    const unsub = subscribeToAuth((u) => setUser(u));
    return unsub;
  }, []);

  const isLight = theme === "sand-gold";

  // Navigation Items Renderer
  const renderNavLinks = (compact: boolean = false) => (
    <div className={`space-y-1 ${layout === "top" || layout === "dock" ? "flex flex-wrap items-center gap-1.5 space-y-0" : ""}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseMobile}
            title={compact ? item.name : undefined}
            className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              compact ? "justify-center px-2 py-2.5" : ""
            } ${
              isActive
                ? isLight
                  ? "bg-amber-500/15 text-amber-900 font-bold border border-amber-500/30 shadow-xs"
                  : "bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/20"
                : isLight
                ? "text-stone-700 hover:bg-stone-200/60 hover:text-stone-950"
                : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
            }`}
          >
            <div className={`flex items-center gap-2.5 ${compact ? "gap-0" : ""}`}>
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive
                    ? isLight
                      ? "text-amber-700"
                      : "text-white"
                    : isLight
                    ? "text-stone-500"
                    : "text-slate-400"
                }`}
              />
              {!compact && <span className="tracking-tight">{item.name}</span>}
            </div>
            {!compact && item.badge && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? isLight
                      ? "bg-amber-500/20 text-amber-900 border border-amber-600/30"
                      : "bg-blue-500/30 text-white border border-blue-400/30"
                    : isLight
                    ? "bg-stone-200 text-stone-600"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  // Preference Controls Bar
  const renderWorkspaceControls = () => (
    <div
      className={`flex items-center gap-1.5 p-2 rounded-xl border transition-all ${
        isLight
          ? "bg-stone-100/90 border-stone-200 text-stone-700"
          : "bg-slate-900/90 border-slate-800 text-slate-300"
      }`}
    >
      {/* Theme Switcher Button */}
      <button
        onClick={toggleTheme}
        className={`p-1.5 rounded-lg transition-colors ${
          isLight ? "hover:bg-amber-200/70 text-amber-800" : "hover:bg-slate-800 text-amber-400"
        }`}
        title={`Current: ${isLight ? "Sand Golden (Warm)" : "Cosmic Space (Dark)"}. Click to switch theme.`}
        aria-label="Toggle Theme"
      >
        {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {/* Collapse / Expand Toggle */}
      <button
        onClick={toggleCollapsed}
        className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        aria-label="Toggle Collapse"
      >
        {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </button>

      {/* Mirror Sidebar (Left <-> Right) */}
      <button
        onClick={mirrorLayout}
        className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors"
        title="Mirror sidebar (move to opposite side)"
        aria-label="Mirror Sidebar"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </button>

      {/* Cycle Layout (Sidebar <-> Top <-> Dock) */}
      <button
        onClick={cycleLayout}
        className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors"
        title={`Current layout: ${layout}. Click to cycle: Left -> Right -> Top -> Dock`}
        aria-label="Cycle Layout"
      >
        {layout === "dock" ? <PanelBottom className="h-4 w-4" /> : <PanelTop className="h-4 w-4" />}
      </button>

      {/* SuperThanks Heart */}
      <button
        onClick={() => setIsSuperThanksOpen(true)}
        className="ml-auto p-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs hover:scale-105 transition-transform"
        title="SuperThanks Community Contribution & Badges"
        aria-label="SuperThanks"
      >
        <Heart className="h-3.5 w-3.5 fill-white" />
      </button>
    </div>
  );

  // ── 1. FLOATING DOCK LAYOUT ─────────────────────────────────────────
  if (layout === "dock") {
    return (
      <>
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[96%] p-2 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 bg-white/90 dark:bg-slate-950/90 border-stone-200 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2 overflow-x-auto px-1 py-0.5">
            <Link href="/" className="flex items-center gap-2 pr-2 border-r border-stone-200 dark:border-slate-800 shrink-0">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-bold text-xs tracking-tight hidden sm:inline text-stone-900 dark:text-white">
                JurisFlow
              </span>
            </Link>

            <div className="flex items-center gap-1 overflow-x-auto flex-1">
              {renderNavLinks(true)}
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-slate-800 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-amber-400"
                title="Toggle Theme"
              >
                {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={cycleLayout}
                className="p-2 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300"
                title="Switch layout back to Sidebar"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsSuperThanksOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs"
              >
                <Heart className="h-3.5 w-3.5 fill-white" />
                <span className="hidden md:inline">SuperThanks</span>
              </button>
            </div>
          </div>
        </div>

        <SuperThanksModal isOpen={isSuperThanksOpen} onClose={() => setIsSuperThanksOpen(false)} />
      </>
    );
  }

  // ── 2. TOP BANNER DOCK LAYOUT ───────────────────────────────────────
  if (layout === "top") {
    return (
      <>
        <div className="sticky top-0 z-40 w-full border-b backdrop-blur-md px-4 py-2.5 transition-all bg-white/95 dark:bg-slate-950/95 border-stone-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm tracking-tight text-stone-900 dark:text-white">
                JurisFlow
              </span>
            </Link>

            <div className="flex-1 overflow-x-auto py-1">
              {renderNavLinks(false)}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {renderWorkspaceControls()}
            </div>
          </div>
        </div>

        <SuperThanksModal isOpen={isSuperThanksOpen} onClose={() => setIsSuperThanksOpen(false)} />
      </>
    );
  }

  // ── 3. STANDARD / MIRRORED SIDEBAR (LEFT OR RIGHT) ─────────────────
  const sidebarWidth = isCollapsed ? "w-18" : "w-64";
  const positionClass = layout === "right" ? "right-0 border-l" : "left-0 border-r";

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={`fixed inset-y-0 z-40 flex flex-col justify-between transition-all duration-200 border-stone-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-950 ${sidebarWidth} ${positionClass} ${
          mobileOpen ? "translate-x-0" : layout === "right" ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header / Brand */}
        <div className="flex flex-col border-b border-stone-200/80 dark:border-slate-800/80 p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                <Scale className="h-5 w-5" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <div className="font-extrabold text-sm tracking-tight text-stone-900 dark:text-white truncate flex items-center gap-1.5">
                    JurisFlow
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                      OS
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-slate-400 truncate">
                    {isLight ? "Sand Golden Mode" : "Cosmic Space Mode"}
                  </p>
                </div>
              )}
            </Link>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Workspace Preferences Bar */}
          {!isCollapsed && <div className="mt-3.5">{renderWorkspaceControls()}</div>}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {renderNavLinks(isCollapsed)}
        </div>

        {/* Footer / User Profile & Settings */}
        <div className="p-3 border-t border-stone-200/80 dark:border-slate-800/80 space-y-2">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-stone-600 dark:text-amber-400 hover:bg-stone-100 dark:hover:bg-slate-800"
                title="Toggle Theme"
              >
                {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={toggleCollapsed}
                className="p-2 rounded-lg text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800"
                title="Expand Navigation"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/settings"
                onClick={onCloseMobile}
                className="flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left bg-stone-50 hover:bg-stone-100 border-stone-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    {user?.name ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "JS"}
                  </div>
                  {user?.contributorBadge && (
                    <span className="absolute -top-1 -right-1 text-xs">
                      {user.contributorBadge.icon}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                    {user?.name || "Active Scholar"}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-slate-400 truncate font-mono">
                    {user?.university || "Law Student"}
                  </p>
                </div>
              </Link>
            </>
          )}
        </div>
      </aside>

      <SuperThanksModal isOpen={isSuperThanksOpen} onClose={() => setIsSuperThanksOpen(false)} />
    </>
  );
}
