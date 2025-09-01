import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveBreadcrumbsVariants: (props?: ({
    variant?: "default" | "minimal" | "prominent" | null | undefined;
    separator?: "dot" | "arrow" | "chevron" | "slash" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BreadcrumbItem {
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isClickable?: boolean;
}
export interface HiveBreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveBreadcrumbsVariants> {
    items: BreadcrumbItem[];
    showHome?: boolean;
    homeIcon?: React.ReactNode;
    onHomeClick?: () => void;
    maxItems?: number;
    showOverflow?: boolean;
}
declare const HiveBreadcrumbs: React.ForwardRefExoticComponent<HiveBreadcrumbsProps & React.RefAttributes<HTMLDivElement>>;
export declare function useHiveBreadcrumbs(initialItems?: BreadcrumbItem[]): {
    items: BreadcrumbItem[];
    pushItem: (item: BreadcrumbItem) => void;
    popItem: () => void;
    replaceItems: (newItems: BreadcrumbItem[]) => void;
    navigateToIndex: (index: number) => void;
    setItems: React.Dispatch<React.SetStateAction<BreadcrumbItem[]>>;
};
export { HiveBreadcrumbs, hiveBreadcrumbsVariants };
//# sourceMappingURL=hive-breadcrumbs.d.ts.map