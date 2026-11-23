"use client";

import * as React from "react";
import { TransformableNav } from "./transformable-nav";
import { TopBar } from "./top-bar";
import { useTheme } from "@/lib/theme-context";

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

export function AppShell({ children, title }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { layout, isCollapsed } = useTheme();

  // Dynamic layout margins based on user preferences
  const getLayoutClasses = () => {
    if (layout === "top") return "w-full";
    if (layout === "dock") return "w-full pb-20";
    if (layout === "right") {
      return isCollapsed ? "lg:pr-18 w-full" : "lg:pr-64 w-full";
    }
    // Default left layout
    return isCollapsed ? "lg:pl-18 w-full" : "lg:pl-64 w-full";
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Transformable & Movable Navigation System */}
      <TransformableNav mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main layout container */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${getLayoutClasses()}`}>
        {layout !== "top" && (
          <TopBar title={title} onOpenMobile={() => setMobileOpen(true)} />
        )}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
          {children}
        </main>
      </div>
    </div>
  );
}
