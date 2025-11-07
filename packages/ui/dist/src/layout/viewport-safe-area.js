import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
const envMap = {
    top: "safe-area-inset-top",
    bottom: "safe-area-inset-bottom",
    left: "safe-area-inset-left",
    right: "safe-area-inset-right",
};
const propertyMap = {
    padding: {
        top: "paddingTop",
        bottom: "paddingBottom",
        left: "paddingLeft",
        right: "paddingRight",
    },
    margin: {
        top: "marginTop",
        bottom: "marginBottom",
        left: "marginLeft",
        right: "marginRight",
    },
};
const toCssValue = (value) => {
    if (value == null)
        return "0px";
    return typeof value === "number" ? `${value}px` : value;
};
const resolveBaseValue = (base, edge) => {
    if (base == null)
        return "0px";
    if (typeof base === "number" || typeof base === "string") {
        return toCssValue(base);
    }
    return toCssValue(base[edge]);
};
export const ViewportSafeArea = React.forwardRef(({ edges = ["bottom", "top"], mode = "padding", base, style, children, ...props }, ref) => {
    const edgeSet = React.useMemo(() => new Set(edges), [edges]);
    const composedStyle = { ...(style ?? {}) };
    edgeSet.forEach((edge) => {
        const property = propertyMap[mode][edge];
        if (property in composedStyle && composedStyle[property] != null) {
            return;
        }
        composedStyle[property] = `calc(${resolveBaseValue(base, edge)} + env(${envMap[edge]}))`;
    });
    return (_jsx("div", { ref: ref, style: composedStyle, "data-safe-area": edges.join(" "), ...props, children: children }));
});
ViewportSafeArea.displayName = "ViewportSafeArea";
//# sourceMappingURL=viewport-safe-area.js.map