export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showPageNumbers?: boolean;
    maxVisiblePages?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'compact' | 'minimal';
    className?: string;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
}
export declare function Pagination({ currentPage, totalPages, onPageChange, showPageNumbers, maxVisiblePages, size, variant, className, showFirstLast, showPrevNext }: PaginationProps): import("react/jsx-runtime").JSX.Element;
export interface PaginationInfoProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    className?: string;
}
export declare function PaginationInfo({ currentPage, totalPages, totalItems, itemsPerPage, className }: PaginationInfoProps): import("react/jsx-runtime").JSX.Element;
export declare const PaginationPresets: {
    Table: (props: Omit<PaginationProps, "variant" | "size">) => import("react/jsx-runtime").JSX.Element;
    Feed: (props: Omit<PaginationProps, "variant" | "showPageNumbers">) => import("react/jsx-runtime").JSX.Element;
    Mobile: (props: Omit<PaginationProps, "variant" | "size" | "maxVisiblePages">) => import("react/jsx-runtime").JSX.Element;
    Search: (props: Omit<PaginationProps, "variant" | "showFirstLast">) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=pagination.d.ts.map