import * as React from "react";
type HeaderAlign = "start" | "center" | "end";
type HeaderDensity = "comfortable" | "compact";
export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    eyebrow?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    meta?: React.ReactNode;
    actions?: React.ReactNode;
    align?: HeaderAlign;
    density?: HeaderDensity;
    /**
     * Optional slot rendered below the header before metadata.
     */
    helper?: React.ReactNode;
}
export declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>;
export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    overline?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    align?: HeaderAlign;
    density?: HeaderDensity;
}
export declare const SectionHeader: React.ForwardRefExoticComponent<SectionHeaderProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=page-header.d.ts.map