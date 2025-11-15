import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
const tokenMap = {
    xs: "var(--hive-spacing-1)",
    sm: "var(--hive-spacing-2)",
    md: "var(--hive-spacing-4)",
    lg: "var(--hive-spacing-6)",
    xl: "var(--hive-spacing-8)",
    "2xl": "var(--hive-spacing-12)",
};
export const Spacer = React.forwardRef(({ size = "md", direction = "vertical", grow = false, inert = false, style, ...props }, ref) => {
    const dimension = size === "none"
        ? "0px"
        : tokenMap[size] ?? "var(--hive-spacing-4)";
    const baseStyle = direction === "vertical"
        ? { height: dimension, minHeight: dimension }
        : { width: dimension, minWidth: dimension };
    const flexStyle = grow
        ? {
            flexGrow: 1,
            flexBasis: "auto",
            minWidth: direction === "horizontal" ? 0 : baseStyle.minWidth,
            minHeight: direction === "vertical" ? 0 : baseStyle.minHeight,
        }
        : { flexGrow: 0 };
    return (_jsx("div", { ref: ref, "aria-hidden": inert || undefined, style: {
            flexShrink: 0,
            ...baseStyle,
            ...flexStyle,
            ...(style ?? {}),
        }, ...props }));
});
Spacer.displayName = "Spacer";
//# sourceMappingURL=spacer.js.map