/**
 * ToolsWidget - HiveLab Tools Preview
 *
 * Displays active space tools (forms, trackers, signups)
 * Click-through to full tools page and individual tool interfaces
 */

import React from "react";
import { BaseWidget } from "./base-widget";
import { Badge } from "@/atoms/badge";
import { Progress } from "@/atoms/progress";
import {
  Wrench,
  FileText,
  ListChecks,
  BarChart3,
  Users2,
  Clock,
  ChevronRight,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { formatDistanceToNow, format } from "date-fns";

export interface Tool {
  id: string;
  name: string;
  type: "form" | "tracker" | "poll" | "signup";
  description?: string;
  status?: "active" | "paused" | "draft";
  lastRunAt?: Date;

  /** For forms/signups */
  responseCount?: number;

  /** For trackers */
  progress?: {
    current: number;
    total: number;
    label?: string;
  };

  /** For polls */
  voteCount?: number;

  /** Navigation */
  href?: string;
}

export interface ToolsWidgetProps {
  /** Active tools in this space */
  tools: Tool[];

  /** Can user manage tools (leader) */
  canManage?: boolean;

  /** Visual variant */
  variant?: "default" | "peek";

  /** Click tool to open interface */
  onToolClick?: (toolId: string) => void;

  /** Click header to view all tools */
  onViewAllTools?: () => void;

  /** Create new tool */
  onCreateTool?: () => void;

  /** Loading state */
  loading?: boolean;

  /** Custom class */
  className?: string;
}

const toolIcons = {
  form: FileText,
  tracker: ListChecks,
  poll: BarChart3,
  signup: Users2,
};

const TOOL_STATUS_BADGE: Record<
  NonNullable<Tool["status"]>,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "border-[hsl(var(--success)/0.4)] text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)]",
  },
  paused: {
    label: "Paused",
    className: "border-[hsl(var(--warning)/0.35)] text-[hsl(var(--warning))] bg-[hsl(var(--warning)/0.1)]",
  },
  draft: {
    label: "Draft",
    className: "border-[hsl(var(--border)/0.4)] text-muted-foreground bg-[hsl(var(--background)/0.8)]",
  },
};

const TOOL_STATUS_HELPER: Record<NonNullable<Tool["status"]>, string> = {
  active: "Running on schedule",
  paused: "Paused • resume in tools hub",
  draft: "Not live yet",
};

const ToolsWidget = React.forwardRef<HTMLDivElement, ToolsWidgetProps>(
  (
    {
      tools,
      canManage,
      onToolClick,
      onViewAllTools,
      onCreateTool,
      loading,
      variant = "default",
      className,
    },
    ref
  ) => {
    const displayTools = tools.slice(0, 3);
    const hasMore = tools.length > displayTools.length;

    const _trackerCount = tools.filter((tool) => tool.type === "tracker").length;
    const _signupCount = tools.filter((tool) => tool.type === "signup").length;
    const signalsCaptured = tools.reduce((total, tool) => {
      return (
        total +
        (tool.responseCount ?? 0) +
        (tool.voteCount ?? 0)
      );
    }, 0);

    const latestRunAt = tools.reduce<Date | undefined>((latest, tool) => {
      if (!tool.lastRunAt) return latest;
      if (!latest) return tool.lastRunAt;
      return tool.lastRunAt > latest ? tool.lastRunAt : latest;
    }, undefined);

    const summaryCards = [
      {
        key: "active",
        label: "Active tools",
        value: tools.length,
        helper: "Configured in this space",
        icon: Wrench,
        tone: "primary" as const,
      },
      {
        key: "signals",
        label: "Signals captured",
        value: signalsCaptured,
        helper: "Responses & votes",
        icon: BarChart3,
        tone: "info" as const,
      },
      latestRunAt && {
        key: "latest",
        label: "Last automation",
        value: formatDistanceToNow(latestRunAt, { addSuffix: true }),
        helper: format(latestRunAt, "MMM d, h:mm a"),
        icon: Clock,
        tone: "muted" as const,
      },
    ].filter(Boolean) as Array<{
      key: string;
      label: string;
      value: string | number;
      helper: string;
      icon: React.ComponentType<{ className?: string }>;
      tone: "primary" | "info" | "muted";
    }>;

    const summaryToneClasses: Record<
      "primary" | "info" | "muted",
      { container: string; icon: string; value: string }
    > = {
      primary: {
        container:
          "border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.08)] text-primary",
        icon: "bg-[hsl(var(--primary)/0.15)] text-primary",
        value: "text-[hsl(var(--primary))]",
      },
      info: {
        container:
          "border-[hsl(var(--accent-foreground)/0.2)] bg-[hsl(var(--accent)/0.08)] text-[hsl(var(--accent-foreground))]",
        icon: "bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent-foreground))]",
        value: "text-[hsl(var(--accent-foreground))]",
      },
      muted: {
        container:
          "border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.75)] text-muted-foreground",
        icon: "bg-[hsl(var(--border)/0.35)] text-muted-foreground",
        value: "text-foreground",
      },
    };

    const isPeek = variant === "peek";
    const peekTools = tools.slice(0, 2);

    return (
      <BaseWidget
        ref={ref}
        title="TOOLS"
        icon={<Wrench className="h-4 w-4" />}
        headerHint={isPeek ? "Quick snapshot" : "HiveLab automations"}
        accent={isPeek ? "neutral" : "primary"}
        backgroundLabel={isPeek ? undefined : "Toolkit"}
        loading={loading}
        className={cn(className)}
        onClick={() => onViewAllTools?.()}
      >
        {tools.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--primary)/0.12)] text-primary">
              <Wrench className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="text-body-sm text-muted-foreground">
              No automations deployed yet.
            </p>
            {canManage && onCreateTool ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onCreateTool();
                }}
                className={cn(
                  "mt-4 inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--primary)/0.35)]",
                  "bg-[hsl(var(--background)/0.65)] px-3 py-1.5 text-caption font-semibold text-primary transition-colors",
                  "hover:bg-[hsl(var(--primary)/0.12)]"
                )}
              >
                <Plus className="h-3 w-3" aria-hidden="true" />
                <span>Create first tool</span>
              </button>
            ) : null}
          </div>
        ) : isPeek ? (
          <div className="space-y-3">
            {peekTools.map((tool) => {
              const Icon = toolIcons[tool.type];
              const statusBadge = tool.status && TOOL_STATUS_BADGE[tool.status];
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToolClick?.(tool.id);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.85)] px-3 py-2 text-left transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.35)] hover:bg-[hsl(var(--background)/0.95)]"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.12)] text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="text-body-sm font-semibold text-foreground line-clamp-1">
                        {tool.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-caption text-muted-foreground/80">
                        <span className="uppercase tracking-[0.26em]">
                          {tool.type}
                        </span>
                        {statusBadge ? (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] uppercase tracking-[0.26em]",
                              statusBadge.className
                            )}
                          >
                            {statusBadge.label}
                          </Badge>
                        ) : null}
                        {tool.lastRunAt ? (
                          <span>
                            {formatDistanceToNow(tool.lastRunAt, {
                              addSuffix: true,
                            })}
                          </span>
                        ) : null}
                      </div>
                      {tool.description ? (
                        <p className="text-caption text-muted-foreground/70 line-clamp-1">
                          {tool.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/40" />
                </button>
              );
            })}

            {tools.length > peekTools.length ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onViewAllTools?.();
                }}
                className="w-full rounded-xl border border-dashed border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.85)] py-1.5 text-caption text-muted-foreground transition-all duration-300 hover:border-[hsl(var(--primary)/0.35)] hover:text-primary"
              >
                +{tools.length - peekTools.length} more tools
              </button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 pb-1 sm:flex-row sm:flex-wrap sm:gap-4">
              {summaryCards.map((card) => (
                <div
                  key={card.key}
                  className={cn(
                    "min-w-[180px] flex-1 rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-1",
                    "sm:min-w-[220px] sm:basis-[calc(33.333%-16px)]",
                    summaryToneClasses[card.tone].container
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300",
                        summaryToneClasses[card.tone].icon
                      )}
                    >
                      <card.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className={cn("text-h4 font-h4", summaryToneClasses[card.tone].value)}>
                        {card.value}
                      </p>
                      <p className="text-caption uppercase tracking-[0.2em] text-muted-foreground/70">
                        {card.label}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-caption text-muted-foreground/70">
                    {card.helper}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {displayTools.map((tool) => {
                const Icon = toolIcons[tool.type];
                const signalBadges: React.ReactNode[] = [];
                const statusBadge =
                  tool.status && TOOL_STATUS_BADGE[tool.status];
                const lastRunLabel = tool.lastRunAt
                  ? formatDistanceToNow(tool.lastRunAt, { addSuffix: true })
                  : null;
                const lastRunHelper = tool.lastRunAt
                  ? format(tool.lastRunAt, "MMM d • h:mm a")
                  : null;

                if (tool.responseCount !== undefined) {
                  signalBadges.push(
                    <Badge
                      key="responses"
                      variant="secondary"
                      className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {tool.responseCount} responses
                    </Badge>
                  );
                }

                if (tool.voteCount !== undefined) {
                  signalBadges.push(
                    <Badge
                      key="votes"
                      variant="secondary"
                      className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {tool.voteCount} votes
                    </Badge>
                  );
                }

                if (tool.type === "signup") {
                  signalBadges.push(
                    <Badge
                      key="signup"
                      variant="outline"
                      className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Signup flow
                    </Badge>
                  );
                }

                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToolClick?.(tool.id);
                    }}
                    className={cn(
                      "group relative flex w-full items-start gap-3 rounded-2xl border border-[hsl(var(--primary)/0.18)]",
                      "bg-[hsl(var(--background)/0.62)]/80 p-3 text-left transition-all duration-300",
                      "hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.35)] hover:bg-[hsl(var(--background)/0.78)]"
                    )}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.12)] text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="text-body font-semibold text-foreground line-clamp-1">
                              {tool.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant="outline"
                                className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground"
                              >
                                {tool.type}
                              </Badge>
                              {statusBadge ? (
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-[10px] uppercase tracking-[0.26em]",
                                    statusBadge.className
                                  )}
                                >
                                  {statusBadge.label}
                                </Badge>
                              ) : null}
                              {lastRunLabel ? (
                                <span className="text-caption text-muted-foreground/70">
                                  Last run {lastRunLabel}
                                </span>
                              ) : null}
                            </div>
                            {tool.description ? (
                              <p className="text-caption text-muted-foreground/80 line-clamp-2">
                                {tool.description}
                              </p>
                            ) : null}
                          </div>
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/40 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>

                        {tool.progress ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-caption text-muted-foreground/80">
                              <span>{tool.progress.label || "Progress"}</span>
                              <span className="font-medium text-foreground">
                                {tool.progress.current}/{tool.progress.total}
                              </span>
                            </div>
                            <Progress
                              value={
                                (tool.progress.current / tool.progress.total) *
                                100
                              }
                              className="h-1.5"
                            />
                          </div>
                        ) : null}

                <div className="flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
                  {signalBadges}
                  {lastRunHelper ? (
                    <span className="text-muted-foreground/60">
                      {lastRunHelper}
                    </span>
                          ) : null}
                          {tool.status ? (
                            <span className="text-muted-foreground/60">
                              {TOOL_STATUS_HELPER[tool.status]}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {hasMore ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onViewAllTools?.();
                  }}
                  className="w-full rounded-2xl border border-dashed border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--background)/0.65)] py-2 text-caption text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.4)] hover:text-primary"
                >
                  +{tools.length - displayTools.length} more tools
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 pt-3 text-caption sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onViewAllTools?.();
                }}
                className="inline-flex items-center gap-1 border-none bg-transparent px-0 py-0 text-caption text-muted-foreground transition-colors hover:text-primary focus:outline-none"
              >
                <span>Open tools hub</span>
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </button>

              {canManage && (
                <div className="flex items-center gap-2 text-caption">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onViewAllTools?.();
                    }}
                    className="inline-flex items-center gap-1 border-none bg-transparent px-0 py-0 text-muted-foreground transition-colors hover:text-primary focus:outline-none"
                  >
                    <Settings className="h-3 w-3" aria-hidden="true" />
                    Manage tools
                  </button>
                  {onCreateTool ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onCreateTool();
                      }}
                      className="inline-flex items-center gap-1 border-none bg-transparent px-0 py-0 text-muted-foreground transition-colors hover:text-primary focus:outline-none"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                      New automation
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        )}
      </BaseWidget>
    );
  }
);

ToolsWidget.displayName = "ToolsWidget";

export { ToolsWidget };




