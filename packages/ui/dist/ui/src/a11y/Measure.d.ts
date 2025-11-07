import * as React from "react";
import { type MeasureBounds, type UseMeasureOptions } from "./useMeasure";
export interface MeasureRenderProps {
    bounds: MeasureBounds;
}
export interface MeasureProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onResize">, UseMeasureOptions {
    children: (props: MeasureRenderProps) => React.ReactNode;
}
/**
 * Measure attaches a ResizeObserver to the rendered element and provides live bounds via render props.
 */
export declare function Measure({ children, className, box, onResize, ...props }: MeasureProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Measure.d.ts.map