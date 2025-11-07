import * as React from "react";

import { cn } from "../lib/utils";

type FocusRingStyle = React.CSSProperties & {
  [customProperty: `--${string}`]: string | number | undefined;
};

export interface FocusRingProps {
  /**
   * The interactive element to decorate with a consistent focus outline.
   */
  children: React.ReactElement;
  /**
   * CSS color value for the ring. Defaults to Hive brand gold.
   */
  color?: string;
  /**
   * Outline offset in pixels. Defaults to 3.
   */
  offset?: number | string;
  /**
   * When true, applies the ring when any descendant receives focus.
   */
  within?: boolean;
  /**
   * Optional override for the outline radius (px value or CSS token).
   */
  radius?: number | string;
  /**
   * Extra className to append to the child element.
   */
  className?: string;
}

/**
 * FocusRing ensures every interactive element renders a consistent, high-contrast outline
 * that respects reduced motion and user theme tokens.
 */
export function FocusRing({
  children,
  color = "var(--hive-focus-ring,#ffd166)",
  offset = 3,
  within = false,
  radius,
  className,
}: FocusRingProps) {
  const focusClass = within
    ? "focus-within:outline focus-within:outline-2 focus-within:outline-[var(--focus-ring-color,#ffd166)] focus-within:outline-offset-[var(--focus-ring-offset,3px)] focus-within:rounded-[var(--focus-ring-radius,inherit)]"
    : "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring-color,#ffd166)] focus-visible:outline-offset-[var(--focus-ring-offset,3px)] focus-visible:rounded-[var(--focus-ring-radius,inherit)]";

  const childStyle = (children.props as { style?: FocusRingStyle }).style ?? {};

  const mergedStyle: FocusRingStyle = {
    ...childStyle,
    "--focus-ring-color": color,
    "--focus-ring-offset": typeof offset === "number" ? `${offset}px` : offset,
    ...(radius !== undefined
      ? { "--focus-ring-radius": typeof radius === "number" ? `${radius}px` : radius }
      : {}),
  };

  return React.cloneElement(children, {
    className: cn(
      "transition-shadow duration-150 ease-out outline-none",
      focusClass,
      className,
      (children.props as { className?: string }).className,
    ),
    style: mergedStyle,
  });
}
