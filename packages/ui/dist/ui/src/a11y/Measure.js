import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { useMeasure } from "./useMeasure.js";
/**
 * Measure attaches a ResizeObserver to the rendered element and provides live bounds via render props.
 */
export function Measure({ children, className, box, onResize, ...props }) {
    const { ref, bounds } = useMeasure({ box, onResize });
    return (_jsx("div", { ref: ref, className: cn("relative", className), ...props, children: children({ bounds }) }));
}
//# sourceMappingURL=Measure.js.map