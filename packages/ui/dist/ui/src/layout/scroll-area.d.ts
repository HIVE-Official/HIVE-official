import * as React from "react";
type Orientation = "vertical" | "horizontal";
export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: Orientation;
    /**
     * When true, renders gradient shadows at the edges indicating overflow.
     */
    showShadows?: boolean;
    /**
     * Enables subtle momentum scrolling on supported devices.
     */
    inertial?: boolean;
}
export declare const ScrollArea: React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>;
export interface ScrollViewportProps extends ScrollAreaProps {
    /**
     * Fixed height for the viewport; falls back to intrinsic height when undefined.
     */
    height?: string | number;
}
export declare const ScrollViewport: React.ForwardRefExoticComponent<ScrollViewportProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=scroll-area.d.ts.map