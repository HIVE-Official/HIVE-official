// Bounded Context Owner: Design System Guild
import * as React from "react";

const DEFAULT_BREAKPOINT = 768;

export function useMobile(breakpoint: number = DEFAULT_BREAKPOINT): boolean {
  const query = `(max-width: ${breakpoint}px)`;
  const getMatch = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);
  const [isMobile, setIsMobile] = React.useState<boolean>(getMatch);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = "matches" in event ? event.matches : (event as MediaQueryList).matches;
      setIsMobile(matches);
    };

    handler(mql);
    mql.addEventListener?.("change", handler as EventListener);
    return () => mql.removeEventListener?.("change", handler as EventListener);
  }, [query]);

  return isMobile;
}

export function useIsMobile(breakpoint: number = DEFAULT_BREAKPOINT): boolean {
  return useMobile(breakpoint);
}
