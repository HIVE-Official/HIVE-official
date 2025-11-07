import * as React from "react";
export type RailWidgetVariant = "action" | "progress" | "eventNow";
export interface RailWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    variant: RailWidgetVariant;
    title?: string;
    description?: string;
    progress?: number;
    ctaLabel?: string;
    onCta?: () => void;
    startTimeLabel?: string;
    endTimeLabel?: string;
}
export declare function RailWidget({ variant, title, description, progress, ctaLabel, onCta, startTimeLabel, endTimeLabel, className, ...props }: RailWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=rail-widget.d.ts.map