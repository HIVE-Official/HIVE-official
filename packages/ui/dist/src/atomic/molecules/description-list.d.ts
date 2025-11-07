import * as React from "react";
export type DescriptionItem = {
    label: React.ReactNode;
    value: React.ReactNode;
    icon?: React.ReactNode;
    helpText?: React.ReactNode;
};
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
    items: DescriptionItem[];
    variant?: "stacked" | "inline" | "grid";
    columns?: 1 | 2 | 3;
    tone?: "default" | "subtle";
}
/**
 * Accessible description list with optional icons and responsive layouts.
 * Uses semantic <dl>/<dt>/<dd> for key/value pairs.
 */
export declare function DescriptionList({ items, className, variant, columns, tone, ...props }: DescriptionListProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=description-list.d.ts.map