import * as React from "react";
export type Crumb = {
    label: string;
    href?: string;
};
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
    items: Crumb[];
    separator?: React.ReactNode;
}
export declare function Breadcrumbs({ items, separator, className, ...props }: BreadcrumbsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=breadcrumbs.d.ts.map