import * as React from "react";
export interface TableColumn<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: T) => React.ReactNode;
    align?: "left" | "center" | "right";
}
export interface SimpleTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    columns: TableColumn<T>[];
    rows: T[];
    caption?: string;
    stickyHeader?: boolean;
    dense?: boolean;
}
/**
 * Simple, responsive table with optional sticky header.
 * Uses semantic <table> and respects reduced-motion.
 */
export declare function SimpleTable<T extends Record<string, any>>({ columns, rows, caption, stickyHeader, dense, className, ...props }: SimpleTableProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=table.d.ts.map