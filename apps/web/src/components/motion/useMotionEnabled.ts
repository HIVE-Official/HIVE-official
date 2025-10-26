// Bounded Context Owner: Design System Guild
"use client";

import { useEffect, useMemo, useState } from "react";

export function useMotionEnabled() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return useMemo(() => {
    // SSR and initial client render: keep disabled to avoid hydration mismatch.
    if (!mounted || typeof window === "undefined") return false;
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disabledCookie = document.cookie.split(";").some((c) => c.trim().startsWith("ff.motion.disable=1"));
    return !(reduced || disabledCookie);
  }, [mounted]);
}
