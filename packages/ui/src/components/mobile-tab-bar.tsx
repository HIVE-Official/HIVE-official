"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export type MobileTabItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | "dot";
  accent?: boolean; // Renders as prominent CTA (gold)
};

export type MobileTabBarProps = {
  items: readonly MobileTabItem[];
  activeId?: string;
  className?: string;
  onSelect?: (id: string) => void;
  ariaLabel?: string;
};

/**
 * MobileTabBar — bottom navigation for mobile viewports.
 * - Hidden on md+ via responsive classes; intended for <768px.
 * - Uses tokenized roles: bg-background, border, primary (gold) for accent.
 * - 56px baseline height + safe-area inset padding.
 */
export function MobileTabBar({ items, activeId, className, onSelect, ariaLabel = "Global navigation" }: MobileTabBarProps): JSX.Element {
  return (
    <nav
      className={cn(
        "md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "h-[56px] pb-[env(safe-area-inset-bottom)]",
        className
      )}
      aria-label={ariaLabel}
    >
      <ul className="mx-auto flex h-full max-w-[var(--shell-max-w)] items-stretch justify-around px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          const accent = !!item.accent;

          const baseBtn = (
            <button
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect?.(item.id)}
              className={cn(
                "relative flex h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-md px-2 text-[11px] font-medium outline-none transition-colors duration-200",
                accent
                  ? "-mt-3 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-level2"
                  : cn(
                      "text-muted-foreground hover:text-foreground",
                      isActive && "text-foreground"
                    )
              )}
            >
              <Icon className={cn(accent ? "h-5 w-5" : "h-5 w-5")} />
              {!accent && <span className="leading-none">{item.label}</span>}
              {item.badge && (
                <span
                  className={cn(
                    "absolute -top-0.5 -right-0.5 inline-flex select-none items-center justify-center rounded-md border border-border/50 bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground",
                    item.badge === "dot" && "h-2 w-2 p-0 border-transparent bg-destructive",
                    item.badge !== "dot" && "h-4 min-w-[16px]"
                  )}
                  aria-label={typeof item.badge === "number" ? `${item.badge} notifications` : `New`}
                >
                  {item.badge === "dot" ? null : item.badge}
                </span>
              )}
            </button>
          );

          return (
            <li key={item.id} className="flex flex-1 items-center justify-center">
              {item.href ? (
                <a href={item.href} className="inline-flex items-center justify-center" aria-label={item.label} onClick={() => onSelect?.(item.id)}>
                  {baseBtn}
                </a>
              ) : (
                baseBtn
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MobileTabBar;

