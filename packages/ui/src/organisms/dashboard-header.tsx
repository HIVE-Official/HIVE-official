// Bounded Context Owner: Design System Guild
/**
 * DashboardHeader - Campus-focused app header with Shadcn Sidebar-07 integration
 *
 * Design Principles (from UI_DESIGN_PSYCHOLOGY_FOUNDATION.md):
 * - Chromium aesthetic: Neutral surface, hairline borders, subtle glass
 * - One-tap actions: No nested menus
 * - Mobile-first: Sidebar trigger in thumb zone (bottom-left via Shadcn)
 * - Accessibility: WCAG 2.1 AA, keyboard navigation
 */

import React from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/atoms/input";
import { Button } from "@/atoms/button";
import { Badge } from "@/atoms/badge";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Separator } from "@/atoms/separator";

/**
 * Header action button (notifications, settings, etc.)
 * Keep actions minimal - max 2-3 for cognitive load management
 */
export interface DashboardHeaderAction {
  id: string;
  label: string; // For aria-label (accessibility)
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  badge?: number | "dot"; // Notification count or presence indicator
  variant?: "default" | "primary"; // "primary" = gold accent
}

/**
 * DashboardHeader props
 *
 * UX Psychology Notes:
 * - title: Campus context (e.g., "Computer Science Club")
 * - subtitle: Secondary info (e.g., "342 members • 23 online")
 * - searchPlaceholder: Action-oriented (e.g., "Find events, spaces, people")
 * - actions: Max 2-3 (cognitive load), use "primary" variant sparingly
 */
export interface DashboardHeaderProps {
  /** Space/page title (16px, semibold) */
  title?: string;

  /** Subtitle/metadata (14px, muted) */
  subtitle?: string;

  /** Search input placeholder */
  searchPlaceholder?: string;

  /** Show search input (default: false on mobile, true on desktop) */
  showSearch?: boolean;

  /** Custom search component (overrides default) */
  renderSearch?: React.ReactNode;

  /** Action buttons (max 2-3 recommended) */
  actions?: readonly DashboardHeaderAction[];

  /** Glass morphism effect (default: true) */
  glass?: boolean;

  /** Additional classes */
  className?: string;

  /** Right slot for custom content (e.g., profile avatar) */
  rightSlot?: React.ReactNode;
}

/**
 * DashboardHeader Component
 *
 * Integrates with Shadcn Sidebar-07 pattern:
 * - SidebarTrigger automatically positioned by SidebarProvider
 * - No manual menu button needed
 * - Responsive by default (mobile drawer, desktop rail)
 */
export function DashboardHeader({
  className,
  title,
  subtitle,
  searchPlaceholder = "Search",
  showSearch,
  renderSearch,
  actions = [],
  glass = true,
  rightSlot,
}: DashboardHeaderProps) {
  const sidebar = useOptionalSidebar();

  // Show search on desktop by default, hidden on mobile unless explicitly enabled
  const shouldShowSearch = showSearch ?? true;

  return (
    <header
      className={cn(
        // Positioning & elevation
        "sticky top-0 z-40",

        // Chromium aesthetic: Neutral surface with subtle glass
        glass
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background",

        // Hairline border + Hive gold keyline
        "border-b border-border/40 keyline-gold-bottom",

        // Safe area for mobile notches
        "pt-safe",

        className
      )}
      role="banner"
    >
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        {/* Left: Sidebar trigger + Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-initial">
          {/* Shadcn Sidebar-07 trigger (shows on mobile when sidebar available) */}
          {sidebar && (
            <SidebarTrigger className="-ml-1" aria-label="Toggle navigation" />
          )}

          {/* Title + Subtitle */}
          {title && (
            <div className="flex flex-col gap-0.5 min-w-0">
              <h1 className="text-base font-semibold text-foreground truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground truncate hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Center: Search (desktop only by default) */}
        {shouldShowSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            {renderSearch ?? (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className={cn(
                    "w-full pl-9 h-9",
                    // Chromium aesthetic: Subtle border, transparent bg
                    "bg-background/50 border-border/50",
                    "focus-visible:border-border focus-visible:ring-1 focus-visible:ring-ring/20"
                  )}
                  aria-label="Search"
                />
              </div>
            )}
          </div>
        )}

        {/* Right: Custom slot + Actions */}
        <div className="flex items-center gap-2">
          {rightSlot && (
            <>
              {rightSlot}
              {actions.length > 0 && (
                <Separator
                  orientation="vertical"
                  className="h-6 hidden md:block"
                />
              )}
            </>
          )}

          {/* Action buttons (max 2-3 for cognitive load) */}
          <div className="flex items-center gap-1">
            {actions.map((action) => {
              const Icon = action.icon;
              const isPrimary = action.variant === "primary";
              const isDot = action.badge === "dot";
              const badgeClass = isPrimary
                ? "bg-gold-role text-gold-contrast border-gold-role/50"
                : "bg-destructive text-destructive-foreground border-transparent";

              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  size="icon"
                  onClick={action.onClick}
                  className={cn(
                    "relative h-9 w-9",
                    "hover:bg-accent/50",
                    isPrimary && "text-gold-role hover:bg-foreground/10 focus-visible:ring-[hsl(var(--gold))] focus-visible:ring-offset-0",
                    "transition-colors duration-200"
                  )}
                  aria-label={action.label}
                >
                  <Icon className="h-4 w-4" />

                  {action.badge && (
                    <Badge
                      role="status"
                      variant="secondary"
                      aria-label={
                        typeof action.badge === "number"
                          ? `${action.badge} ${action.label}`
                          : `${action.label} notification`
                      }
                      className={cn(
                        "absolute -top-1 -right-1 pointer-events-none",
                        isDot
                          ? "h-2 w-2 min-w-0 p-0"
                          : "h-4 min-w-[16px] px-1 text-[10px] font-medium leading-none",
                        badgeClass,
                        isPrimary && !isDot && "shadow-[0_0_0_1px_hsl(var(--gold)/0.35)]"
                      )}
                    >
                      {!isDot && action.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Hook to safely access Shadcn Sidebar context
 * Returns null if not inside SidebarProvider (graceful degradation)
 */
function useOptionalSidebar() {
  try {
    return useSidebar();
  } catch {
    // Not inside SidebarProvider - that's okay, header still works
    return null;
  }
}

DashboardHeader.displayName = "DashboardHeader";
