import * as React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Dot,
  Minus,
  ShieldAlert,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../atoms/card";
import { Button } from "../../atoms/button";

type IconComponent = React.ComponentType<{ className?: string }>;

export type MetricFormat = "number" | "percent" | "currency" | "string";

export interface AdminMetricCardProps {
  title: string;
  value: number | string;
  format?: MetricFormat;
  currency?: string;
  delta?: {
    value: number;
    label?: string;
    tone?: "positive" | "negative" | "neutral";
  };
  icon?: IconComponent;
  description?: string;
  footer?: React.ReactNode;
  subtle?: boolean;
}

export function AdminMetricCard({
  title,
  value,
  format = typeof value === "number" ? "number" : "string",
  currency = "USD",
  delta,
  icon: Icon,
  description,
  footer,
  subtle = false,
}: AdminMetricCardProps) {
  const formattedValue = formatMetricValue(value, format, currency);
  const deltaTone = delta?.tone ?? (delta && delta.value < 0
    ? "negative"
    : delta && delta.value > 0
      ? "positive"
      : "neutral");
  const DeltaIcon =
    deltaTone === "positive"
      ? ArrowUpRight
      : deltaTone === "negative"
        ? ArrowDownRight
        : Minus;

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur",
        subtle && "border-white/5 bg-white/[0.02]",
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-white">
              {formattedValue}
            </span>
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                  deltaTone === "positive" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
                  deltaTone === "negative" && "border-red-500/30 bg-red-500/10 text-red-300",
                  deltaTone === "neutral" && "border-white/10 bg-white/5 text-white/60",
                )}
                aria-label={delta.label}
              >
                <DeltaIcon className="h-3 w-3" aria-hidden="true" />
                <span>{Math.abs(delta.value)}%</span>
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </CardHeader>
      {(description || footer) && (
        <CardContent className="space-y-3 pt-0 text-sm text-white/60">
          {description && <p>{description}</p>}
          {footer && <div className="pt-2">{footer}</div>}
        </CardContent>
      )}
    </Card>
  );
}

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface StatusPillProps {
  label: string;
  tone?: StatusTone;
  icon?: IconComponent;
  "aria-label"?: string;
  className?: string;
}

export function StatusPill({
  label,
  tone = "neutral",
  icon: Icon,
  className,
  ...rest
}: StatusPillProps) {
  const toneClass: Record<StatusTone, string> = {
    neutral: "border-white/10 bg-white/5 text-white/70",
    info: "border-sky-500/30 bg-sky-500/10 text-sky-200",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    danger: "border-red-500/30 bg-red-500/10 text-red-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase",
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}

export interface AuditLogEvent {
  id: string;
  summary: string;
  timestamp: Date | string;
  actor?: string;
  description?: string;
  variant?: "default" | "positive" | "warning" | "critical";
  icon?: IconComponent;
  meta?: string[];
}

export interface AuditLogListProps {
  events: AuditLogEvent[];
  emptyState?: React.ReactNode;
  title?: string;
  className?: string;
}

export function AuditLogList({
  events,
  emptyState,
  title = "Recent Activity",
  className,
}: AuditLogListProps) {
  const hasEvents = events.length > 0;

  return (
    <Card className={cn("border-white/10 bg-white/[0.03]", className)}>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        {hasEvents ? (
          <ul className="space-y-4">
            {events.map((event) => {
              const VariantIcon =
                event.icon ||
                (event.variant === "critical"
                  ? ShieldAlert
                  : event.variant === "warning"
                    ? Clock
                    : undefined);

              return (
                <li key={event.id} className="space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-1 items-start gap-3">
                      {VariantIcon && (
                        <span className="mt-0.5">
                          <VariantIcon
                            className="h-4 w-4 text-white/60"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                      <div>
                        <p className="text-[var(--hive-text-primary)] font-medium">
                          {event.summary}
                        </p>
                        {event.description && (
                          <p className="text-white/60">{event.description}</p>
                        )}
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/40">
                          {event.actor && (
                            <>
                              <span>{event.actor}</span>
                              <Dot className="h-4 w-4" aria-hidden="true" />
                            </>
                          )}
                          <time dateTime={toISOString(event.timestamp)}>
                            {formatRelativeTime(event.timestamp)}
                          </time>
                          {event.meta?.map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-white/50">
            {emptyState ?? "No activity logged yet."}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type ModerationStatus =
  | "pending"
  | "under_review"
  | "escalated"
  | "resolved"
  | "dismissed";

export type ModerationSeverity = "low" | "medium" | "high";

export interface ModerationQueueItem {
  id: string;
  title: string;
  submittedBy: string;
  submittedAt: Date | string;
  summary?: string;
  status: ModerationStatus;
  severity?: ModerationSeverity;
  tags?: string[];
  ctaLabel?: string;
}

export interface ModerationQueueProps {
  items: ModerationQueueItem[];
  onAction?: (item: ModerationQueueItem) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

export function ModerationQueue({
  items,
  onAction,
  emptyState,
  className,
}: ModerationQueueProps) {
  const hasItems = items.length > 0;

  return (
    <Card className={cn("border-white/10 bg-white/[0.03]", className)}>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-white">
          Moderation Queue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {hasItems ? (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-white/10 bg-black/30 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {item.title}
                      </span>
                      <StatusPill
                        label={formatStatusLabel(item.status)}
                        tone={toneForStatus(item.status)}
                      />
                      {item.severity && (
                        <StatusPill
                          label={`${item.severity} priority`}
                          tone={toneForSeverity(item.severity)}
                        />
                      )}
                    </div>
                    {item.summary && (
                      <p className="text-white/60">{item.summary}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/40">
                      <span>Submitted by {item.submittedBy}</span>
                      <Dot className="h-4 w-4" aria-hidden="true" />
                      <time dateTime={toISOString(item.submittedAt)}>
                        {formatRelativeTime(item.submittedAt)}
                      </time>
                      {item.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {item.ctaLabel && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                      onClick={() => onAction?.(item)}
                    >
                      {item.ctaLabel}
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/5 px-4 py-10 text-center text-white/50">
            {emptyState ?? "Your moderation queue is clear."}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatMetricValue(
  value: number | string,
  format: MetricFormat,
  currency: string,
) {
  if (format === "string" || typeof value === "string") {
    return value;
  }

  const safeValue = Number(value);
  if (!Number.isFinite(safeValue)) {
    return value;
  }

  const formatter =
    format === "currency"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        })
      : new Intl.NumberFormat("en-US", {
          style: format === "percent" ? "percent" : "decimal",
          maximumFractionDigits: format === "percent" ? 1 : 0,
        });

  return formatter.format(
    format === "percent" ? safeValue / 100 : safeValue,
  );
}

function formatStatusLabel(status: ModerationStatus): string {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function toneForStatus(status: ModerationStatus): StatusTone {
  switch (status) {
    case "pending":
      return "warning";
    case "under_review":
      return "info";
    case "escalated":
      return "danger";
    case "resolved":
      return "success";
    case "dismissed":
    default:
      return "neutral";
  }
}

function toneForSeverity(severity?: ModerationSeverity): StatusTone {
  if (!severity) return "neutral";
  switch (severity) {
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
    default:
      return "info";
  }
}

function formatRelativeTime(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "unknown";
  }

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.round(diffMs / (1000 * 60));

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.round(days / 365);
  return `${years}y ago`;
}

function toISOString(value: Date | string): string | undefined {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
