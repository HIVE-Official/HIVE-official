import * as React from "react";
type SpacerSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type SpacerDirection = "horizontal" | "vertical";
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: SpacerSize;
    direction?: SpacerDirection;
    grow?: boolean;
    /**
     * When true, renders a visually hidden spacer that only influences layout.
     */
    inert?: boolean;
}
export declare const Spacer: React.ForwardRefExoticComponent<SpacerProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=spacer.d.ts.map