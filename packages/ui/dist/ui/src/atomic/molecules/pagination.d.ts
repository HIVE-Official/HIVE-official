import * as React from "react";
export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    showFirstLast?: boolean;
    showInput?: boolean;
}
export declare function Pagination({ page, pageCount, onPageChange, siblingCount, showFirstLast, showInput, className, ...props }: PaginationProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=pagination.d.ts.map