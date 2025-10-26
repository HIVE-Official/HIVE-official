"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export type AppHeaderProps = {
  children: React.ReactNode;
  className?: string;
  elevateOnScroll?: boolean;
};

/**
 * AppHeader — glassy, token-aligned top bar wrapper.
 * - Adds backdrop blur and subtle border.
 * - Optional elevate on scroll using tokenized shadows.
 * - Consumers provide breadcrumb/actions/user capsule as children.
 */
export function AppHeader({ children, className, elevateOnScroll = true }: AppHeaderProps): JSX.Element {
  const [elevated, setElevated] = React.useState(false);

  React.useEffect(() => {
    if (!elevateOnScroll) return;
    const onScroll = () => setElevated(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [elevateOnScroll]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/70 bg-background/40 backdrop-blur-lg",
        // Smoothly transition shadow/background changes using motion tokens
        "transition-[box-shadow,background-color,backdrop-filter] duration-smooth ease-standard",
        elevated ? "shadow-level1" : "shadow-subtle",
        className
      )}
      role="banner"
    >
      {children}
    </header>
  );
}

export default AppHeader;
