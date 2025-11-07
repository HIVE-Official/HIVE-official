import * as React from "react";

import { cn } from "../lib/utils";

type Orientation = "vertical" | "horizontal";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation;
  /**
   * When true, renders gradient shadows at the edges indicating overflow.
   */
  showShadows?: boolean;
  /**
   * Enables subtle momentum scrolling on supported devices.
   */
  inertial?: boolean;
}

type ScrollState = {
  atStart: boolean;
  atEnd: boolean;
};

const defaultState: ScrollState = { atStart: true, atEnd: false };

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      children,
      orientation = "vertical",
      showShadows = true,
      inertial = true,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = React.useRef<HTMLDivElement | null>(null);
    const [state, setState] = React.useState<ScrollState>(defaultState);

    const mergeRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const updateScrollState = React.useCallback(() => {
      const node = internalRef.current;
      if (!node) return;

      if (orientation === "vertical") {
        const { scrollTop, scrollHeight, clientHeight } = node;
        const atStart = scrollTop <= 1;
        const atEnd = scrollTop + clientHeight >= scrollHeight - 1;
        setState({ atStart, atEnd });
      } else {
        const { scrollLeft, scrollWidth, clientWidth } = node;
        const atStart = scrollLeft <= 1;
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        setState({ atStart, atEnd });
      }
    }, [orientation]);

    React.useLayoutEffect(() => {
      const node = internalRef.current;
      if (!node) return;

      updateScrollState();
      const handleScroll = () => updateScrollState();
      node.addEventListener("scroll", handleScroll, { passive: true });
      return () => node.removeEventListener("scroll", handleScroll);
    }, [updateScrollState]);

    React.useEffect(() => {
      const node = internalRef.current;
      if (!node || typeof ResizeObserver === "undefined") return;

      updateScrollState();
      const observer = new ResizeObserver(updateScrollState);
      observer.observe(node);
      return () => observer.disconnect();
    }, [updateScrollState]);

    const isVertical = orientation === "vertical";

    return (
      <div className={cn("relative", className)}>
        <div
          ref={mergeRefs}
          className={cn(
            "overflow-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]",
            isVertical ? "max-h-full" : "max-w-full",
            inertial && "motion-safe:scroll-smooth",
            "[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--hive-border-muted)]/60 [&::-webkit-scrollbar-track]:bg-transparent"
          )}
          {...props}
        >
          {children}
        </div>
        {showShadows && isVertical && (
          <>
            {!state.atStart && (
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" />
            )}
            {!state.atEnd && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" />
            )}
          </>
        )}
        {showShadows && !isVertical && (
          <>
            {!state.atStart && (
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" />
            )}
            {!state.atEnd && (
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--hive-background-primary)]/80 via-[var(--hive-background-primary)]/40 to-transparent transition-opacity duration-200" />
            )}
          </>
        )}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

export interface ScrollViewportProps extends ScrollAreaProps {
  /**
   * Fixed height for the viewport; falls back to intrinsic height when undefined.
   */
  height?: string | number;
}

export const ScrollViewport = React.forwardRef<HTMLDivElement, ScrollViewportProps>(
  ({ height, style, ...props }, ref) => {
    return (
      <ScrollArea
        ref={ref}
        style={{
          maxHeight: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  }
);
ScrollViewport.displayName = "ScrollViewport";
