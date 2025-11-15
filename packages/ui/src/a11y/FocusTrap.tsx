import * as React from "react";

import { cn } from "../lib/utils";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contentEditable=true]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
  );
}

export interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When false the focus trap is inert and does nothing.
   */
  active?: boolean;
  /**
   * CSS selector or element that should receive initial focus when the trap activates.
   */
  initialFocus?: string | HTMLElement;
  /**
   * When true, focus returns to the previously focused element when the trap unmounts.
   */
  returnFocus?: boolean;
  /**
   * Callback fired when Escape is pressed while the trap is active.
   */
  onEscape?: () => void;
  /**
   * Prevent escape from deactivating the trap. Defaults to true.
   */
  escapeDeactivates?: boolean;
}

/**
 * FocusTrap keeps focus within a region (dialog, sheet, dropdown) and restores the previously
 * focused element on cleanup. It is intentionally dependency-free to work on the edge.
 */
export const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(
  (
    {
      children,
      className,
      active = true,
      initialFocus,
      returnFocus = true,
      onEscape,
      escapeDeactivates = true,
      tabIndex = -1,
      ...props
    },
    forwardedRef,
  ) => {
    const internalRef = React.useRef<HTMLDivElement | null>(null);

    const mergeRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef],
    );

    React.useEffect(() => {
      if (!active) return;

      const node = internalRef.current;
      if (!node) return;

      const previouslyFocused = document.activeElement as HTMLElement | null;

      function focusInitial() {
        if (!node) return;

        let element: HTMLElement | null = null;
        if (typeof initialFocus === "string") {
          element = node.querySelector<HTMLElement>(initialFocus);
        } else if (initialFocus instanceof HTMLElement) {
          element = initialFocus;
        }

        const focusable = getFocusableElements(node);
        const target = element ?? focusable[0] ?? node;
        if (target && typeof target.focus === "function") {
          requestAnimationFrame(() => target.focus({ preventScroll: true }));
        }
      }

      focusInitial();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (!node || !active) return;
        if (event.key === "Tab") {
          const focusable = getFocusableElements(node);
          if (focusable.length === 0) {
            event.preventDefault();
            node.focus({ preventScroll: true });
            return;
          }

          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const current = document.activeElement as HTMLElement | null;

          if (event.shiftKey) {
            if (current === first || !node.contains(current)) {
              event.preventDefault();
              last.focus({ preventScroll: true });
            }
          } else if (current === last) {
            event.preventDefault();
            first.focus({ preventScroll: true });
          }
        }

        if (event.key === "Escape") {
          onEscape?.();
          if (escapeDeactivates) {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      };

      const handleFocusIn = (event: FocusEvent) => {
        if (!node || !active) return;
        if (!node.contains(event.target as Node)) {
          const focusable = getFocusableElements(node);
          const target = focusable[0] ?? node;
          target.focus({ preventScroll: true });
        }
      };

      document.addEventListener("keydown", handleKeyDown, true);
      document.addEventListener("focusin", handleFocusIn, true);

      return () => {
        document.removeEventListener("keydown", handleKeyDown, true);
        document.removeEventListener("focusin", handleFocusIn, true);
        if (returnFocus && previouslyFocused && typeof previouslyFocused.focus === "function") {
          requestAnimationFrame(() => previouslyFocused.focus({ preventScroll: true }));
        }
      };
    }, [active, initialFocus, returnFocus, onEscape, escapeDeactivates]);

    return (
      <div ref={mergeRefs} tabIndex={tabIndex} className={cn("outline-none", className)} {...props}>
        {children}
      </div>
    );
  },
);

FocusTrap.displayName = "FocusTrap";

