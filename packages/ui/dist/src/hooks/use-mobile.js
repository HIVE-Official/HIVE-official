// Bounded Context Owner: Design System Guild
import * as React from "react";
const DEFAULT_BREAKPOINT = 768;
export function useMobile(breakpoint = DEFAULT_BREAKPOINT) {
    const query = `(max-width: ${breakpoint}px)`;
    const getMatch = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);
    const [isMobile, setIsMobile] = React.useState(getMatch);
    React.useEffect(() => {
        if (typeof window === "undefined")
            return;
        const mql = window.matchMedia(query);
        const handler = (event) => {
            const matches = "matches" in event ? event.matches : event.matches;
            setIsMobile(matches);
        };
        handler(mql);
        mql.addEventListener?.("change", handler);
        return () => mql.removeEventListener?.("change", handler);
    }, [query]);
    return isMobile;
}
export function useIsMobile(breakpoint = DEFAULT_BREAKPOINT) {
    return useMobile(breakpoint);
}
//# sourceMappingURL=use-mobile.js.map