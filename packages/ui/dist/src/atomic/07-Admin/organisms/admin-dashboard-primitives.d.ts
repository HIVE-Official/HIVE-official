import * as React from "react";
type IconComponent = React.ComponentType<{
    className?: string;
}>;
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
export declare function AdminMetricCard({ title, value, format, currency, delta, icon: Icon, description, footer, subtle, }: AdminMetricCardProps): import("react/jsx-runtime").JSX.Element;
export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";
export interface StatusPillProps {
    label: string;
    tone?: StatusTone;
    icon?: IconComponent;
    "aria-label"?: string;
    className?: string;
}
export declare function StatusPill({ label, tone, icon: Icon, className, ...rest }: StatusPillProps): import("react/jsx-runtime").JSX.Element;
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
export declare function AuditLogList({ events, emptyState, title, className, }: AuditLogListProps): import("react/jsx-runtime").JSX.Element;
export type ModerationStatus = "pending" | "under_review" | "escalated" | "resolved" | "dismissed";
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
export declare function ModerationQueue({ items, onAction, emptyState, className, }: ModerationQueueProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=admin-dashboard-primitives.d.ts.map