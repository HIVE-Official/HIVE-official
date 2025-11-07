import * as React from "react";

type SpacerSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type SpacerDirection = "horizontal" | "vertical";

const tokenMap: Record<Exclude<SpacerSize, "none">, string> = {
  xs: "var(--hive-spacing-1)",
  sm: "var(--hive-spacing-2)",
  md: "var(--hive-spacing-4)",
  lg: "var(--hive-spacing-6)",
  xl: "var(--hive-spacing-8)",
  "2xl": "var(--hive-spacing-12)",
};

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpacerSize;
  direction?: SpacerDirection;
  grow?: boolean;
  /**
   * When true, renders a visually hidden spacer that only influences layout.
   */
  inert?: boolean;
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ size = "md", direction = "vertical", grow = false, inert = false, style, ...props }, ref) => {
    const dimension =
      size === "none"
        ? "0px"
        : tokenMap[size] ?? "var(--hive-spacing-4)";

    const baseStyle: React.CSSProperties =
      direction === "vertical"
        ? { height: dimension, minHeight: dimension }
        : { width: dimension, minWidth: dimension };

    const flexStyle: React.CSSProperties = grow
      ? {
          flexGrow: 1,
          flexBasis: "auto",
          minWidth: direction === "horizontal" ? 0 : baseStyle.minWidth,
          minHeight: direction === "vertical" ? 0 : baseStyle.minHeight,
        }
      : { flexGrow: 0 };

    return (
      <div
        ref={ref}
        aria-hidden={inert || undefined}
        style={{
          flexShrink: 0,
          ...baseStyle,
          ...flexStyle,
          ...(style ?? {}),
        }}
        {...props}
      />
    );
  }
);
Spacer.displayName = "Spacer";
