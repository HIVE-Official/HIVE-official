"use client";
// Bounded Context Owner: Design System Guild
import * as React from "react";

type Theme = "dark" | "light";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  highContrast?: boolean;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  highContrast = false,
  storageKey = "hive-theme"
}: ThemeProviderProps) {
  React.useEffect(() => {
    const root = document.documentElement;
    const stored = (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
    root.classList.toggle("light", stored === "light");
    root.classList.toggle("high-contrast", !!highContrast);
  }, [defaultTheme, highContrast, storageKey]);

  return <>{children}</>;
}

export function setTheme(next: Theme, storageKey = "hive-theme") {
  const root = document.documentElement;
  root.classList.toggle("light", next === "light");
  localStorage.setItem(storageKey, next);
}

// SSR helper: compute initial classes for inline script usage in apps
export function getInitialThemeClass(storageKey = "hive-theme", fallback: Theme = "dark") {
  try {
    const stored = (typeof localStorage !== "undefined" && (localStorage.getItem(storageKey) as Theme | null)) || null;
    const prefersLight = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme: Theme = stored ?? (prefersLight ? "light" : fallback);
    return theme === "light" ? "light" : "";
  } catch {
    return fallback === "light" ? "light" : "";
  }
}

// SSR helper: apply theme immediately (can be inlined by consumer)
export function applyThemeImmediately(storageKey = "hive-theme", fallback: Theme = "dark", highContrast = false) {
  try {
    const root = document.documentElement;
    const stored = (localStorage.getItem(storageKey) as Theme | null) ?? null;
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme: Theme = stored ?? (prefersLight ? "light" : fallback);
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("high-contrast", !!highContrast);
  } catch {
    // no-op in restricted environments
  }
}
