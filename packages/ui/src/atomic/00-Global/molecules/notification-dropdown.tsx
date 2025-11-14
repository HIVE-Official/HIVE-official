"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../atoms/button";
import { NotificationCard } from "./notification-card";

export interface NotificationListItem {
  id: string;
  title: string;
  message?: string;
  type?: string;
  category?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  isRead?: boolean;
  timestamp?: Date | string | number | { toDate: () => Date };
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationDropdownProps
  extends React.HTMLAttributes<HTMLDivElement> {
  notifications: NotificationListItem[];
  unreadCount?: number;
  loading?: boolean;
  error?: string | null;
  onNavigate?: (url: string, notification: NotificationListItem) => void;
  onMarkAsRead?: (id: string) => void | Promise<void>;
  onMarkAllAsRead?: () => void | Promise<void>;
  onClearAll?: () => void | Promise<void>;
  emptyState?: React.ReactNode;
  heading?: string;
}

const DEFAULT_EMPTY_STATE = (
  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
    <span className="text-sm font-medium text-[var(--hive-text-secondary)]">
      You&rsquo;re all caught up
    </span>
    <p className="max-w-[220px] text-xs text-[var(--hive-text-tertiary)]">
      Check back later for updates from your spaces, classes, and tools.
    </p>
  </div>
);

const LoadingState = () => (
  <div className="space-y-3 py-6">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="h-16 animate-pulse rounded-xl bg-[color-mix(in_srgb,var(--hive-border) 15%,transparent)]"
      />
    ))}
  </div>
);

function normalizeTimestamp(
  input: NotificationListItem["timestamp"],
): Date | undefined {
  if (!input) return undefined;
  if (input instanceof Date) return input;
  if (typeof input === "number") return new Date(input);
  if (typeof input === "string") return new Date(input);
  if (typeof input === "object" && typeof input.toDate === "function") {
    try {
      return input.toDate();
    } catch {
      return undefined;
    }
  }
  return undefined;
}

function formatRelativeTime(date?: Date): string | undefined {
  if (!date) return undefined;

  const now = Date.now();
  const diffMs = date.getTime() - now;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const divisions: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, "seconds"],
    [60, "minutes"],
    [24, "hours"],
    [7, "days"],
    [4.34524, "weeks"],
    [12, "months"],
    [Number.POSITIVE_INFINITY, "years"],
  ];

  let duration = Math.round(diffMs / 1000);

  for (const [amount, unit] of divisions) {
    if (Math.abs(duration) < amount) {
      return rtf.format(Math.round(duration), unit);
    }
    duration /= amount;
  }
  return undefined;
}

export const NotificationDropdown = React.forwardRef<
  HTMLDivElement,
  NotificationDropdownProps
>(
  (
    {
      notifications,
      unreadCount = 0,
      loading = false,
      error = null,
      onNavigate,
      onMarkAsRead,
      onMarkAllAsRead,
      onClearAll,
      emptyState = DEFAULT_EMPTY_STATE,
      heading = "Notifications",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-[min(360px,90vw)] rounded-2xl border border-[var(--hive-border)] bg-[var(--hive-background-elevated)] shadow-hive-level4",
          className,
        )}
        {...props}
      >
        <header className="flex items-start justify-between gap-3 border-b border-[var(--hive-border)] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[var(--hive-text-primary)]">
              {heading}
            </p>
            <p className="text-xs text-[var(--hive-text-tertiary)]">
              {unreadCount > 0
                ? `${unreadCount} unread`
                : "You&rsquo;re up to date"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onMarkAllAsRead ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAllAsRead?.()}
                disabled={loading || unreadCount === 0}
              >
                Mark all read
              </Button>
            ) : null}
            {onClearAll ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onClearAll?.()}
                disabled={loading || notifications.length === 0}
              >
                Clear
              </Button>
            ) : null}
          </div>
        </header>

        <div className="max-h-[400px]">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <div className="px-5 py-8 text-center text-sm text-[var(--hive-status-error)]">
              {error || "Unable to load notifications"}
            </div>
          ) : notifications.length === 0 ? (
            emptyState
          ) : (
            <div className="max-h-[360px] overflow-y-auto px-1 py-2">
              <div className="space-y-3 px-4">
                {notifications.map((notification) => {
                  const timestamp = normalizeTimestamp(notification.timestamp);
                  const relativeTime = formatRelativeTime(timestamp);

                  const handleNavigate = () => {
                    if (notification.actionUrl) {
                      onNavigate?.(notification.actionUrl, notification);
                    }
                    if (!notification.isRead) {
                      onMarkAsRead?.(notification.id);
                    }
                  };

                  return (
                    <button
                      key={notification.id}
                      onClick={handleNavigate}
                      type="button"
                      className={cn(
                        "w-full text-left transition-colors",
                        "rounded-xl border border-transparent hover:border-[var(--hive-border-strong)] focus:border-[var(--hive-brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30",
                        !notification.isRead &&
                          "bg-[color-mix(in_srgb,var(--hive-brand-primary-bg) 65%,transparent)]",
                      )}
                    >
                      <NotificationCard
                        title={notification.title}
                        message={notification.message}
                        timestamp={relativeTime}
                        type={notification.category || notification.type}
                        read={notification.isRead}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

NotificationDropdown.displayName = "NotificationDropdown";

export default NotificationDropdown;
