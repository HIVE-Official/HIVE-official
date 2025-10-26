"use client";

// Landing-Only GSAP motion wrapper
// - Opt-in via dynamic loader; no GSAP usage outside this component
// - Respects reduced motion; aligns durations to tokens

import * as React from "react";
import * as UI from "@hive/ui";
import { loadGsap, readMsVar, prefersReducedMotion } from "../../lib/gsap";

export default function LandingHero(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (prefersReducedMotion()) return;
      const gsap = await loadGsap();
      if (!gsap || canceled) return;

      const d1 = readMsVar("--motion-duration-swift", 200) / 1000; // seconds
      const d2 = readMsVar("--motion-duration-smooth", 300) / 1000; // seconds

      const root = containerRef.current;
      if (!root) return;
      const [copy, art] = [
        root.querySelector("[data-hero-copy]"),
        root.querySelector("[data-hero-art]")
      ];
      // Safe-guard if structure changes
      if (!copy || !art) return;

      const tl = (gsap as any).timeline?.({ defaults: { ease: "power2.out" } }) ?? null;
      if (!tl) return;

      (gsap as any).set([copy, art], { opacity: 0, y: 12 });
      tl.to(copy, { opacity: 1, y: 0, duration: d1 })
        .to(art, { opacity: 1, y: 0, duration: d2 }, "-=0.05");
    };
    void run();
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <section className="container-page mx-auto max-w-6xl" ref={containerRef}>
      <UI.Spotlight
        variant="radial"
        intensity="low"
        className="rounded-2xl border border-border bg-card/40 p-8 sm:p-12"
      >
        <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2">
          <div className="space-y-4" data-hero-copy>
            <h1 className="text-h1 font-h1 tracking-tight">Campus OS — run by students</h1>
            <p className="text-lead font-body text-muted-foreground">
              Spaces, events, and tools that put students in charge. Trust‑visible, mobile‑first, and fast.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <UI.Button asChild variant="gold" size="lg" className="focus-ring">
                <a href="/login" aria-label="Sign in to HIVE">Sign in</a>
              </UI.Button>
              <UI.Button asChild variant="outline" size="lg" className="focus-ring">
                <a href="/spaces" aria-label="Explore spaces">Explore spaces</a>
              </UI.Button>
            </div>
            <p className="text-caption text-muted-foreground">No ads. No tracking dark patterns. Student‑owned.</p>
          </div>
          <div
            className="order-first aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/20 md:order-none"
            data-hero-art
          >
            <div className="grid h-full w-full place-items-center text-caption text-muted-foreground">
              Preview — replace with product hero capture.
            </div>
          </div>
        </div>
      </UI.Spotlight>
    </section>
  );
}

