import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export type SortDirection = 'asc' | 'desc' | null;
export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'custom';
export interface TableColumn<T = any> {
    id: string;
    header: string;
    accessor?: keyof T | ((row: T) => any);
    type?: ColumnType;
    width?: string | number;
    minWidth?: string | number;
    sortable?: boolean;
    filterable?: boolean;
    render?: (value: any, row: T, index: number) => React.ReactNode;
    headerRender?: () => React.ReactNode;
    filterRender?: (value: any, onChange: (value: any) => void) => React.ReactNode;
}
export interface TableFilter {
    column: string;
    value: any;
    operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
}
export interface TableSort {
    column: string;
    direction: SortDirection;
}
export interface PaginationOptions {
    page: number;
    pageSize: number;
    total: number;
}
declare const hiveTableVariants: (props?: {
    variant?: "default" | "premium" | "minimal";
    density?: "default" | "compact" | "spacious";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveTableProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>, VariantProps<typeof hiveTableVariants> {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    empty?: React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
    selectable?: boolean;
    pagination?: boolean;
    pageSize?: number;
    onSort?: (sort: TableSort) => void;
    onFilter?: (filters: TableFilter[]) => void;
    onSearch?: (query: string) => void;
    onSelect?: (selectedRows: T[]) => void;
    onRowClick?: (row: T, index: number) => void;
    onRowDoubleClick?: (row: T, index: number) => void;
    rowActions?: (row: T, index: number) => React.ReactNode;
    bulkActions?: React.ReactNode;
    toolbar?: React.ReactNode;
    stickyHeader?: boolean;
    virtualizeRows?: boolean;
    expandable?: boolean;
    expandedRowRender?: (row: T, index: number) => React.ReactNode;
}
declare const HiveTable: <T extends Record<string, any>>({ className, variant, density, data, columns, loading, empty, sortable, filterable, searchable, selectable, pagination, pageSize, onSort, onFilter, onSearch, onSelect, onRowClick, onRowDoubleClick, rowActions, bulkActions, toolbar, stickyHeader, virtualizeRows, expandable, expandedRowRender, ...props }: HiveTableProps<T>) => import("react/jsx-runtime").JSX.Element;
export declare const DefaultRowActions: React.FC<{
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}>;
export { HiveTable, hiveTableVariants };
//# sourceMappingURL=hive-table.d.ts.map