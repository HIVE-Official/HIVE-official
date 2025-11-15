import * as React from "react";

import { cn } from "../lib/utils";

export interface SkipToContentProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * ID of the main content container. Used to generate the default href.
   * Defaults to `main-content`.
   */
  targetId?: string;
}

/**
 * SkipToContent provides a focusable link that lets keyboard and assistive technology users jump directly
 * to the primary page content, bypassing navigation chrome.
 */
export const SkipToContent = React.forwardRef<HTMLAnchorElement, SkipToContentProps>(
  (
    {
      targetId = "main-content",
      children = "Skip to main content",
      className,
      href,
      style,
      ...props
    },
    ref,
  ) => {
    const derivedHref = href ?? `#${targetId}`;

    return (
      <a
        ref={ref}
        href={derivedHref}
        className={cn(
          "hive-skip-link pointer-events-auto absolute left-6 top-6 z-[1000] -translate-y-24 rounded-full bg-[var(--hive-background-primary,rgba(12,12,12,0.92))] px-5 py-2 text-sm font-semibold text-[var(--hive-text-contrast,#ffffff)] shadow-lg outline-none transition-transform duration-200 focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-[var(--hive-focus-ring,#ffd166)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-page,#050505)]",
          className,
        )}
        style={{ clipPath: "inset(-1px)", ...style }}
        {...props}
      >
        {children}
      </a>
    );
  },
);

SkipToContent.displayName = "SkipToContent";

