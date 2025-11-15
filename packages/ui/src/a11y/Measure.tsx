import * as React from "react";

import { cn } from "../lib/utils";
import { type MeasureBounds, type UseMeasureOptions, useMeasure } from "./useMeasure";

export interface MeasureRenderProps {
  bounds: MeasureBounds;
}

export interface MeasureProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onResize">,
    UseMeasureOptions {
  children: (props: MeasureRenderProps) => React.ReactNode;
}

/**
 * Measure attaches a ResizeObserver to the rendered element and provides live bounds via render props.
 */
export function Measure({
  children,
  className,
  box,
  onResize,
  ...props
}: MeasureProps) {
  const { ref, bounds } = useMeasure<HTMLDivElement>({ box, onResize });

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {children({ bounds })}
    </div>
  );
}
