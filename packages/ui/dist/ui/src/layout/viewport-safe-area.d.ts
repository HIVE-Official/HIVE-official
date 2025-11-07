import * as React from "react";
type Edge = "top" | "bottom" | "left" | "right";
type Mode = "padding" | "margin";
type BaseSpacing = number | string | Partial<Record<Edge, number | string>>;
export interface ViewportSafeAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    edges?: Edge[];
    mode?: Mode;
    /**
     * Optional base spacing added before safe-area inset is applied.
     * Accepts either a single value (applied to all edges) or a map per-edge.
     */
    base?: BaseSpacing;
}
export declare const ViewportSafeArea: React.ForwardRefExoticComponent<ViewportSafeAreaProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=viewport-safe-area.d.ts.map