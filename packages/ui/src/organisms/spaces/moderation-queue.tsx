"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * ModerationQueue - Review and moderate flagged content
 *
 * Displays posts/comments that have been:
 * - Reported by users
 * - Auto-flagged by content filters
 * - Pending approval (if space requires approval)
 *
 * Moderators can:
 * - Approve or hide content
 * - Remove content and warn/ban users
 * - View report reasons and context
 * - Take bulk actions
 *
 * UX Patterns:
 * - Filter by report status (pending, reviewed, dismissed)
 * - Sort by report count, date, severity
 * - Inline preview of reported content
 * - Quick actions with confirmation
 * - Audit trail of moderation actions
 */

import React from "react";
import { Card } from "../../atoms/card";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/avatar";
import { Checkbox } from "../../atoms/checkbox";
import { Input } from "../../atoms/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  // XCircle,
  Shield,
  Flag,
  Clock,
  Search,
  Filter,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { format, formatDistanceToNow } from "date-fns";

export interface ReportedContent {
  id: string;
  contentType: "post" | "comment";
  contentId: string;

  // Content preview
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  contentPreview: string;
  createdAt: Date;

  // Report details
  reportCount: number;
  reportReasons: string[];
  firstReportedAt: Date;
  latestReportedAt: Date;
  severity?: "low" | "medium" | "high";
  reporterNotes?: string[];

  // Status
  status: "pending" | "approved" | "hidden" | "removed";
  reviewedBy?: string;
  reviewedAt?: Date;
  moderatorNote?: string;
}

export interface ModerationQueueProps {
  /** Reported content items */
  items: ReportedContent[];

  /** Active filter */
  activeFilter?: "pending" | "reviewed" | "all";

  /** Approve content handler */
  onApprove?: (itemId: string) => void;

  /** Hide content handler */
  onHide?: (itemId: string) => void;

  /** Remove content handler */
  onRemove?: (itemId: string, reason: string) => void;

  /** View full content handler */
  onViewContent?: (contentId: string, contentType: "post" | "comment") => void;

  /** Escalate to security handler */
  onEscalate?: (itemId: string) => void;

  /** Bulk actions */
  onBulkApprove?: (itemIds: string[]) => void;
  onBulkHide?: (itemIds: string[]) => void;
  onBulkRemove?: (itemIds: string[]) => void;
  onBulkEscalate?: (itemIds: string[]) => void;

  /** Search changed */
  onSearchChange?: (term: string) => void;

  /** Allow bulk actions */
  allowBulkActions?: boolean;

  /** Loading state */
  isLoading?: boolean;
}

const STATUS_CONFIG: Record<
  ReportedContent["status"],
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    icon: typeof CheckCircle2;
  }
> = {
  pending: {
    label: "Pending Review",
    variant: "default",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    variant: "outline",
    icon: CheckCircle2,
  },
  hidden: {
    label: "Hidden",
    variant: "secondary",
    icon: EyeOff,
  },
  removed: {
    label: "Removed",
    variant: "destructive",
    icon: Trash2,
  },
};

export const ModerationQueue = React.forwardRef<
  HTMLDivElement,
  ModerationQueueProps
>(
  (
    {
      items,
      activeFilter = "pending",
      onApprove: _onApprove,
      onHide: _onHide,
      onRemove: _onRemove,
      onViewContent,
      onEscalate: _onEscalate,
      onBulkApprove: _onBulkApprove,
      onBulkHide: _onBulkHide,
      onBulkRemove: _onBulkRemove,
      onBulkEscalate: _onBulkEscalate,
      onSearchChange: _onSearchChange,
      allowBulkActions = true,
      isLoading = false,
    },
    ref
  ) => {
    const [selectedItems, setSelectedItems] = React.useState<Set<string>>(
      new Set()
    );
    const [tabValue, setTabValue] =
      React.useState<"pending" | "reviewed" | "all">(activeFilter);
    const [selectedSeverity, setSelectedSeverity] = React.useState<
      "all" | "high" | "medium" | "low"
    >("all");
    const [searchTerm, setSearchTerm] = React.useState("");

    React.useEffect(() => {
      setTabValue(activeFilter);
    }, [activeFilter]);

    const severityCounts = React.useMemo(() => {
      const totals = { high: 0, medium: 0, low: 0 };
      for (const item of items) {
        const severity = item.severity ?? "medium";
        totals[severity] = (totals[severity] ?? 0) + 1;
      }
      return totals;
    }, [items]);

    const filteredItems = React.useMemo(() => {
      const byStatus = items.filter((item) => {
        if (tabValue === "all") return true;
        if (tabValue === "pending") return item.status === "pending";
        if (tabValue === "reviewed") return item.status !== "pending";
        return true;
      });

      const bySeverity =
        selectedSeverity === "all"
          ? byStatus
          : byStatus.filter(
              (item) => (item.severity ?? "medium") === selectedSeverity
            );

      if (!searchTerm.trim()) return bySeverity;
      const query = searchTerm.toLowerCase();
      return bySeverity.filter((item) => {
        const preview = item.contentPreview.toLowerCase();
        const author = item.authorName.toLowerCase();
        const handle = item.authorHandle.toLowerCase();
        const reasons = item.reportReasons.join(" ").toLowerCase();
        return (
          preview.includes(query) ||
          author.includes(query) ||
          handle.includes(query) ||
          reasons.includes(query)
        );
      });
    }, [items, tabValue, selectedSeverity, searchTerm]);

    const sortedItems = React.useMemo(
      () =>
        [...filteredItems].sort(
          (a, b) => b.latestReportedAt.getTime() - a.latestReportedAt.getTime()
        ),
      [filteredItems]
    );

    const pendingCount = items.filter((i) => i.status === "pending").length;
    const visibleIds = React.useMemo(
      () => sortedItems.map((item) => item.id),
      [sortedItems]
    );

    React.useEffect(() => {
      setSelectedItems((prev) => {
        const next = new Set<string>();
        visibleIds.forEach((id) => {
          if (prev.has(id)) {
            next.add(id);
          }
        });
        return next;
      });
    }, [visibleIds]);

    const isAllSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedItems.has(id));

    const toggleSelectAll = () => {
      setSelectedItems((_prev) => {
        if (isAllSelected) {
          return new Set<string>();
        }
        return new Set<string>(visibleIds);
      });
    };

    const toggleSelection = (id: string) => {
      setSelectedItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    const handleBulkAction = (action: "approve" | "hide" | "remove" | "escalate") => {
      const ids = Array.from(selectedItems);
      if (ids.length === 0) return;
      if (action === "approve") {
        _onBulkApprove?.(ids);
      } else if (action === "hide") {
        _onBulkHide?.(ids);
      } else if (action === "remove") {
        _onBulkRemove?.(ids);
      } else {
        _onBulkEscalate?.(ids);
      }
      setSelectedItems(new Set());
    };

    const handleSearchChange = (value: string) => {
      setSearchTerm(value);
      _onSearchChange?.(value);
    };
    const showBulkBar = allowBulkActions && selectedItems.size > 0;

    return (
      <div ref={ref} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-h3 font-h3">Moderation Queue</h1>
              <p className="text-body-sm font-body-sm text-muted-foreground">
                Review and moderate reported content
              </p>
            </div>
          </div>

          {pendingCount > 0 && (
            <Badge variant="destructive" className="gap-2">
              <AlertTriangle className="h-3 w-3" />
              {pendingCount} pending
            </Badge>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 rounded-2xl border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.85)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={selectedSeverity === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity("all")}
                className={cn(
                  "gap-2",
                  selectedSeverity === "all" &&
                    "bg-[hsl(var(--primary)/0.12)] text-primary"
                )}
              >
                <Filter className="h-4 w-4" />
                All severities
              </Button>
              <Button
                variant={selectedSeverity === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity("high")}
                className={cn(
                  "gap-2 border-[hsl(var(--destructive)/0.35)] text-destructive",
                  selectedSeverity === "high" &&
                    "bg-[hsl(var(--destructive)/0.12)]"
                )}
              >
                High ({severityCounts.high})
              </Button>
              <Button
                variant={selectedSeverity === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity("medium")}
                className={cn(
                  "gap-2 border-[hsl(var(--warning)/0.35)] text-[hsl(var(--warning))]",
                  selectedSeverity === "medium" &&
                    "bg-[hsl(var(--warning)/0.18)]"
                )}
              >
                Medium ({severityCounts.medium})
              </Button>
              <Button
                variant={selectedSeverity === "low" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity("low")}
                className={cn(
                  "gap-2 border-[hsl(var(--success)/0.35)] text-[hsl(var(--success))]",
                  selectedSeverity === "low" &&
                    "bg-[hsl(var(--success)/0.16)]"
                )}
              >
                Low ({severityCounts.low})
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {allowBulkActions && sortedItems.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSelectAll}
                  className="gap-2 text-muted-foreground hover:text-primary"
                >
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  {isAllSelected ? "Clear selection" : "Select visible"}
                </Button>
              )}

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search reports, authors, reasons…"
                  className="pl-9"
                  aria-label="Search moderation queue"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onValueChange={(value) =>
            setTabValue(value as "pending" | "reviewed" | "all")
          }
          className="w-full"
        >
            <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingCount})
            </TabsTrigger>
            <TabsTrigger value="reviewed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Reviewed ({items.length - pendingCount})
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2">
              <Shield className="h-4 w-4" />
              All ({items.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tabValue} className="space-y-4 mt-6">
            {sortedItems.length === 0 ? (
              <Card className="bg-card border-border p-8 text-center">
                <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                  <div className="p-3 rounded-full bg-muted/30">
                    <Shield className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-h4 font-h4">No items to review</h3>
                  <p className="text-body-sm font-body-sm text-muted-foreground">
                    {tabValue === "pending"
                      ? "All reports have been reviewed. Great work!"
                      : "No items match the current filter."}
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {sortedItems.map((item) => {
                  const statusConfig = STATUS_CONFIG[item.status];
                  const StatusIcon = statusConfig.icon;
                  const severity = item.severity ?? "medium";
                  const reporterNotes = item.reporterNotes ?? [];
                  const isSelected = selectedItems.has(item.id);

                  const cardTone =
                    item.status === "pending"
                      ? "border-[hsl(var(--destructive)/0.25)] bg-[hsl(var(--destructive)/0.05)]"
                      : "border-border bg-card";
                  const severityBadgeTone =
                    severity === "high"
                      ? "border-[hsl(var(--destructive)/0.4)] text-destructive"
                      : severity === "medium"
                        ? "border-[hsl(var(--warning)/0.4)] text-[hsl(var(--warning))]"
                        : "border-[hsl(var(--success)/0.4)] text-[hsl(var(--success))]";
                  const severityPanelTone =
                    severity === "high"
                      ? "bg-[hsl(var(--destructive)/0.08)] border-[hsl(var(--destructive)/0.28)]"
                      : severity === "medium"
                        ? "bg-[hsl(var(--warning)/0.08)] border-[hsl(var(--warning)/0.24)]"
                        : "bg-[hsl(var(--success)/0.08)] border-[hsl(var(--success)/0.24)]";

                  return (
                    <Card
                      key={item.id}
                      className={cn(
                        "border p-4 transition-all duration-300 ease-out group",
                        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-0.5",
                        cardTone,
                        allowBulkActions && isSelected && "ring-2 ring-primary/40"
                      )}
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {/* Author avatar */}
                            <Avatar className="h-10 w-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.9)]">
                              <AvatarImage
                                src={item.authorAvatar}
                                alt={item.authorName}
                              />
                              <AvatarFallback className="bg-[hsl(var(--primary)/0.12)] text-sm font-medium text-primary">
                                {item.authorName.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            {allowBulkActions && (
                              <Checkbox
                                checked={selectedItems.has(item.id)}
                                onCheckedChange={() => toggleSelection(item.id)}
                                aria-label={`Select report ${item.id}`}
                                className="mt-2"
                              />
                            )}

                            {/* Content info */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-body-sm font-semibold">
                                  {item.authorName}
                                </span>
                                <span className="text-body-sm text-muted-foreground">
                                  @{item.authorHandle}
                                </span>
                                <span className="text-caption font-caption text-muted-foreground">
                                  •
                                </span>
                                <span className="text-caption font-caption text-muted-foreground">
                                  {formatDistanceToNow(item.createdAt, {
                                    addSuffix: true,
                                  })}
                                </span>
                              </div>

                              {/* Content preview */}
                              <p className="text-body font-body text-foreground line-clamp-3 group-hover:text-primary/80 transition-colors duration-200">
                                {item.contentPreview}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              variant={statusConfig.variant}
                              className="gap-2 flex-shrink-0"
                            >
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn("gap-2", severityBadgeTone)}
                            >
                              <Sparkles className="h-3 w-3" />
                              {severity === "high"
                                ? "High severity"
                                : severity === "medium"
                                  ? "Needs attention"
                                  : "Low severity"}
                            </Badge>
                          </div>
                        </div>

                        {/* Report details */}
                        <div
                          className={cn(
                            "rounded-lg border p-3 space-y-3",
                            severityPanelTone
                          )}
                        >
                          <div className="flex items-center gap-4 text-body-sm font-body-sm flex-wrap">
                            <span className="flex items-center gap-1 text-destructive">
                              <Flag className="h-4 w-4" />
                              {item.reportCount} report
                              {item.reportCount !== 1 ? "s" : ""}
                            </span>
                            <span className="text-muted-foreground">
                              First reported{" "}
                              {formatDistanceToNow(item.firstReportedAt, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>

                          {/* Report reasons */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.reportReasons.map((reason, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.92)]"
                              >
                                {reason}
                              </Badge>
                            ))}
                          </div>

                          {reporterNotes.length > 0 && (
                            <div className="rounded-lg border border-dashed border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.9)] p-3 text-body-sm text-muted-foreground">
                              <p className="font-semibold text-foreground/80 mb-1">
                                Reporter notes
                              </p>
                              <ul className="list-disc space-y-1 pl-5">
                                {reporterNotes.map((note, idx) => (
                                  <li key={idx}>{note}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Moderation actions */}
                        {item.status === "pending" ? (
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <p className="text-caption text-muted-foreground">
                              Select reports to enable moderation actions.
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                onViewContent?.(
                                  item.contentId,
                                  item.contentType
                                )
                              }
                              className="gap-2 text-muted-foreground hover:text-primary"
                            >
                              <Eye className="h-4 w-4" />
                              View full content
                            </Button>
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                            <div className="flex items-center gap-2 text-body-sm font-body-sm text-muted-foreground">
                              <StatusIcon className="h-4 w-4" />
                              <span>
                                Reviewed by {item.reviewedBy} •{" "}
                                {item.reviewedAt &&
                                  format(item.reviewedAt, "MMM d, h:mm a")}
                              </span>
                            </div>
                            {item.moderatorNote && (
                              <p className="text-body-sm font-body-sm text-muted-foreground mt-1">
                                Note: {item.moderatorNote}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {showBulkBar && (
          <div className="sticky bottom-4 z-20 mx-auto flex w-fit items-center gap-3 rounded-full border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--background)/0.92)] px-4 py-2 shadow-[0_20px_40px_rgba(255,215,0,0.18)] backdrop-blur">
            <span className="text-caption font-semibold text-muted-foreground">
              {selectedItems.size} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleBulkAction("approve")}
              disabled={isLoading}
              className="rounded-full border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.98)] px-4 py-2 text-foreground hover:bg-[hsl(var(--background)/1)]"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleBulkAction("hide")}
              disabled={isLoading}
              className="rounded-full border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.98)] px-4 py-2 text-foreground hover:bg-[hsl(var(--background)/1)]"
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Hide
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleBulkAction("remove")}
              disabled={isLoading}
              className="rounded-full px-4 py-2"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
            {_onBulkEscalate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction("escalate")}
                disabled={isLoading}
                className="rounded-full px-4 py-2 text-muted-foreground hover:text-primary"
              >
                Escalate
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

ModerationQueue.displayName = "ModerationQueue";
