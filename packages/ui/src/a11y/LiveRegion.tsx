import * as React from "react";

import { VisuallyHidden } from "./VisuallyHidden";

export interface LiveRegionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When provided, this string will be announced to assistive tech. Controlled via React state.
   */
  message?: string | null;
  /**
   * Choose polite (default) or assertive announcements.
   */
  politeness?: "polite" | "assertive";
  /**
    * Show the region visually. Defaults to false (screen reader only).
   */
  visible?: boolean;
  /**
   * Automatically clear the region after N milliseconds. Set to null to disable.
   */
  clearAfter?: number | null;
}

/**
 * LiveRegion announces dynamic updates to assistive technology using aria-live.
 * Useful for toasts, async status updates, and background operations.
 */
export const LiveRegion = React.forwardRef<HTMLDivElement, LiveRegionProps>(
  (
    {
      message,
      politeness = "polite",
      visible = false,
      clearAfter = 4000,
      children,
      ...props
    },
    ref,
  ) => {
    const [announcement, setAnnouncement] = React.useState<string | null>(message ?? null);

    React.useEffect(() => {
      if (message === undefined) return;
      setAnnouncement(message ?? "");

      if (message && typeof clearAfter === "number" && clearAfter > 0) {
        const timeout = window.setTimeout(() => {
          setAnnouncement("");
        }, clearAfter);
        return () => window.clearTimeout(timeout);
      }

      return undefined;
    }, [message, clearAfter]);

    const role = politeness === "assertive" ? "alert" : "status";
    const Component = visible ? "div" : VisuallyHidden;

    return (
      <Component
        ref={ref as React.Ref<any>}
        role={role}
        aria-live={politeness}
        aria-atomic="true"
        {...props}
      >
        {children ?? announcement}
      </Component>
    );
  },
);

LiveRegion.displayName = "LiveRegion";

