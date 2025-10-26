// SSR-safe, opt-in GSAP loader for landing-only usage
// - Prefers local package if installed (dynamic import)
// - Falls back to window.gsap if a CDN script is injected
// - Returns null when unavailable so callers can no-op gracefully

export type GsapApi = {
  to: (target: any, vars: Record<string, unknown>) => unknown;
  fromTo: (target: any, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => unknown;
  timeline: (vars?: Record<string, unknown>) => any;
};

declare global {
  interface Window { gsap?: GsapApi }
}

export async function loadGsap(): Promise<GsapApi | null> {
  if (typeof window === "undefined") return null;
  if (window.gsap) return window.gsap as GsapApi;

  // Try local dependency first
  try {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod: typeof import("gsap") = (await import("gsap")) as any;
    window.gsap = (mod as any).gsap ?? (mod as any).default ?? (mod as any);
    return window.gsap ?? null;
  } catch (_) {
    // Optional CDN fallback when dependency isn’t installed
    const cdn =
      process.env.NEXT_PUBLIC_GSAP_CDN_URL ??
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    try {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = cdn;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load GSAP CDN"));
        document.head.appendChild(s);
      });
      return window.gsap ?? null;
    } catch (__e) {
      return null;
    }
  }
}

// Token helpers: read motion tokens from CSS variables at runtime
export function readMsVar(name: string, fallbackMs: number): number {
  if (typeof window === "undefined") return fallbackMs;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(raw.replace("ms", "").trim());
  return Number.isFinite(n) ? n : fallbackMs;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
