import * as React from "react";
export type TableAlign = "left" | "center" | "right";
export interface SimpleTableColumn<Row extends Record<string, unknown>> {
    key: keyof Row & (string | number | symbol);
    header: React.ReactNode;
    align?: TableAlign;
    render?: (row: Row) => React.ReactNode;
}
export interface SimpleTableProps<Row extends Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
    columns: Array<SimpleTableColumn<Row>>;
    rows: Row[];
    caption?: React.ReactNode;
    stickyHeader?: boolean;
    dense?: boolean;
}
export declare const SimpleTable: React.ForwardRefExoticComponent<SimpleTableProps<Record<string, unknown>> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=table.d.ts.map