"use client";

import * as React from "react";

export type Theme = "sand-gold" | "cosmic-space";
export type NavLayout = "left" | "right" | "top" | "dock";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  layout: NavLayout;
  setLayout: (layout: NavLayout) => void;
  cycleLayout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  mirrorLayout: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("sand-gold");
  const [layout, setLayoutState] = React.useState<NavLayout>("left");
  const [isCollapsed, setIsCollapsedState] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Read persisted theme
    const savedTheme = (localStorage.getItem("jurisflow-theme") as Theme) || "sand-gold";
    const savedLayout = (localStorage.getItem("jurisflow-nav-layout") as NavLayout) || "left";
    const savedCollapsed = localStorage.getItem("jurisflow-nav-collapsed") === "true";

    setThemeState(savedTheme);
    setLayoutState(savedLayout);
    setIsCollapsedState(savedCollapsed);

    applyThemeToDoc(savedTheme);
    applyLayoutToDoc(savedLayout, savedCollapsed);
  }, []);

  const applyThemeToDoc = (t: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
    if (t === "cosmic-space") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const applyLayoutToDoc = (l: NavLayout, c: boolean) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-layout", l);
    root.setAttribute("data-collapsed", String(c));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("jurisflow-theme", newTheme);
    applyThemeToDoc(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === "sand-gold" ? "cosmic-space" : "sand-gold";
    setTheme(next);
  };

  const setLayout = (newLayout: NavLayout) => {
    setLayoutState(newLayout);
    localStorage.setItem("jurisflow-nav-layout", newLayout);
    applyLayoutToDoc(newLayout, isCollapsed);
  };

  const cycleLayout = () => {
    const order: NavLayout[] = ["left", "right", "top", "dock"];
    const idx = order.indexOf(layout);
    const next = order[(idx + 1) % order.length];
    setLayout(next);
  };

  const mirrorLayout = () => {
    setLayout(layout === "right" ? "left" : "right");
  };

  const setIsCollapsed = (collapsed: boolean) => {
    setIsCollapsedState(collapsed);
    localStorage.setItem("jurisflow-nav-collapsed", String(collapsed));
    applyLayoutToDoc(layout, collapsed);
  };

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        layout,
        setLayout,
        cycleLayout,
        isCollapsed,
        setIsCollapsed,
        toggleCollapsed,
        mirrorLayout,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
