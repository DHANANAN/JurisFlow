"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

export function AppShell({ children, title }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main layout container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <TopBar title={title} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
          {children}
        </main>
      </div>
    </div>
  );
}
