import * as React from "react";
export type DescriptionListVariant = "grid" | "stacked" | "inline";
export type DescriptionListTone = "default" | "subtle";
export interface DescriptionListItem {
    label: React.ReactNode;
    value: React.ReactNode;
    icon?: React.ReactNode;
    helpText?: React.ReactNode;
}
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
    items: DescriptionListItem[];
    variant?: DescriptionListVariant;
    columns?: 1 | 2 | 3;
    tone?: DescriptionListTone;
}
export declare const DescriptionList: React.ForwardRefExoticComponent<DescriptionListProps & React.RefAttributes<HTMLDListElement>>;
//# sourceMappingURL=description-list.d.ts.map