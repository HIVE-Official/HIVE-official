import * as React from "react";

import { cn } from "../lib/utils";

const visuallyHiddenStyles: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

export type VisuallyHiddenProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * VisuallyHidden hides content from sighted users while keeping it available to assistive technology.
 * Useful for screen-reader-only labels, descriptions, or announcements.
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("hive-visually-hidden", className)}
        style={{ ...visuallyHiddenStyles, ...style }}
        {...props}
      />
    );
  },
);

VisuallyHidden.displayName = "VisuallyHidden";
