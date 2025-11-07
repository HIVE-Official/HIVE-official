import * as React from "react";
export interface PercentSegment {
    id: string;
    label: string;
    value: number;
    color?: string;
}
export interface PercentBarProps extends React.HTMLAttributes<HTMLDivElement> {
    segments: PercentSegment[];
    total?: number;
    showLabels?: boolean;
    rounded?: boolean;
    ariaLabel?: string;
}
/** Horizontal segmented distribution bar with optional tooltips */
export declare function PercentBar({ segments, total, showLabels, rounded, ariaLabel, className, ...props }: PercentBarProps): import("react/jsx-runtime").JSX.Element;
/** Alias for voting scenarios */
export declare function VoteBar(props: PercentBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=percent-bar.d.ts.map