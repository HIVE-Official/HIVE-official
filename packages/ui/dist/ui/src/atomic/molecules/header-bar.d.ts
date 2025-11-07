import * as React from "react";
export interface HeaderBarProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    description?: string;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    divider?: boolean;
}
export declare function HeaderBar({ title, description, leading, trailing, divider, className, ...props }: HeaderBarProps): import("react/jsx-runtime").JSX.Element;
export interface ProgressHeaderProps extends HeaderBarProps {
    progress?: number;
}
export declare function ProgressHeader({ progress, ...props }: ProgressHeaderProps): import("react/jsx-runtime").JSX.Element;
export interface ActionRowProps extends React.HTMLAttributes<HTMLElement> {
    primaryAction?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    sticky?: boolean;
}
export declare function ActionRow({ primaryAction, secondaryAction, sticky, className, ...props }: ActionRowProps): import("react/jsx-runtime").JSX.Element;
export interface FilterChipsBarProps extends React.HTMLAttributes<HTMLElement> {
    items: Array<{
        id: string;
        label: string;
    }>;
    activeIds?: string[];
    onToggle?: (id: string) => void;
}
export declare function FilterChipsBar({ items, activeIds, onToggle, className, ...props }: FilterChipsBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=header-bar.d.ts.map