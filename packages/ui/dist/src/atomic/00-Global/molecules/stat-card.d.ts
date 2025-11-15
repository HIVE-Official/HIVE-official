import type { ReactNode } from "react";
export interface StatCardProps {
    label: string;
    value: ReactNode;
    delta?: ReactNode;
    icon?: ReactNode;
    className?: string;
}
/**
 * Elevated stat card with optional delta and icon slot.
 */
export declare function StatCard({ label, value, delta, icon, className, }: StatCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=stat-card.d.ts.map