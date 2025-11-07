import * as React from "react";

type Edge = "top" | "bottom" | "left" | "right";
type Mode = "padding" | "margin";

type BaseSpacing =
  | number
  | string
  | Partial<Record<Edge, number | string>>;

const envMap: Record<Edge, string> = {
  top: "safe-area-inset-top",
  bottom: "safe-area-inset-bottom",
  left: "safe-area-inset-left",
  right: "safe-area-inset-right",
};

const propertyMap: Record<Mode, Record<Edge, keyof React.CSSProperties>> = {
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

const toCssValue = (value: number | string | undefined): string => {
  if (value == null) return "0px";
  return typeof value === "number" ? `${value}px` : value;
};

const resolveBaseValue = (base: BaseSpacing | undefined, edge: Edge): string => {
  if (base == null) return "0px";
  if (typeof base === "number" || typeof base === "string") {
    return toCssValue(base as number | string);
  }
  return toCssValue(base[edge]);
};

export interface ViewportSafeAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  edges?: Edge[];
  mode?: Mode;
  /**
   * Optional base spacing added before safe-area inset is applied.
   * Accepts either a single value (applied to all edges) or a map per-edge.
   */
  base?: BaseSpacing;
}

type SafeAreaStyle = React.CSSProperties & Record<string, string | number | undefined>;

export const ViewportSafeArea = React.forwardRef<HTMLDivElement, ViewportSafeAreaProps>(
  ({ edges = ["bottom", "top"], mode = "padding", base, style, children, ...props }, ref) => {
    const edgeSet = React.useMemo(() => new Set(edges), [edges]);
    const composedStyle: SafeAreaStyle = { ...(style as SafeAreaStyle) };

    edgeSet.forEach((edge) => {
      const property = propertyMap[mode][edge];
      if (property in composedStyle && composedStyle[property] != null) {
        return;
      }
      const computedValue = `calc(${resolveBaseValue(base, edge)} + env(${envMap[edge]}))`;
      // Use string index to satisfy CSSProperties + index signature
      composedStyle[property as string] = computedValue;
    });

    return (
      <div
        ref={ref}
        style={composedStyle}
        data-safe-area={edges.join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ViewportSafeArea.displayName = "ViewportSafeArea";
