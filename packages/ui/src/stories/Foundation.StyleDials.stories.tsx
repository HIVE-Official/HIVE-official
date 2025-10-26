// Bounded Context Owner: Design System Guild
import React from "react";

export default {
  title: "Foundation/Style Dials",
  parameters: {
    layout: "padded"
  }
};

export function Playground() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-h3 font-body">Style Dials Playground</h2>
        <p className="text-muted-foreground text-body-sm">
          Use the Storybook toolbar (top) to toggle radius, elevation, density, contrast, glass, stroke, gold usage, and motion.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="bg-card border rounded-xl shadow-level1 state-layer interactive p-6">
          <h3 className="text-h4 font-body mb-2">Neutral Card</h3>
          <p className="text-muted-foreground text-body-sm mb-4">
            Neutral surface using tokenized roles. Elevation, radius, density and contrast respond to toolbar dials.
          </p>
          <div className="flex items-center gap-3">
            <button className="btn-prominent rounded-md focus-ring btn-anim-icons px-4 py-2">
              <span className="icon-leading icon-motion-pop" aria-hidden>
                ➜
              </span>
              Primary CTA
              <span className="icon-trailing icon-motion-pop" aria-hidden>
                →
              </span>
            </button>
            <button className="btn-quiet rounded-md focus-ring px-4 py-2">Secondary</button>
          </div>
        </article>

        <article className="surface-glass rounded-xl p-6">
          <h3 className="text-h4 font-body mb-2">Glass Overlay Panel</h3>
          <p className="text-muted-foreground text-body-sm mb-4">
            Glass intensity and elevation adapt to the Glass and Elevation dials. "Glass Off" disables backdrop blur.
          </p>
          <div className="flex items-center gap-3">
            <button className="btn-quiet rounded-md focus-ring px-4 py-2">Dismiss</button>
            <button className="btn-prominent rounded-md focus-ring btn-anim-icons px-4 py-2">
              <span className="icon-leading icon-motion-pop" aria-hidden>
                ★
              </span>
              Continue
              <span className="icon-trailing icon-motion-pop" aria-hidden>
                →
              </span>
            </button>
          </div>
        </article>
      </section>

      <section className="rounded-xl border p-6">
        <h3 className="text-h4 font-body mb-2">Motion + Reduced Motion</h3>
        <p className="text-muted-foreground text-body-sm mb-4">
          Toggle Motion in the toolbar to preview minimal, standard, and expressive durations. Reduced motion is respected globally.
        </p>
        <div className="flex gap-3">
          <span className="inline-block rounded-md border px-3 py-1 enter-pop">pop-in</span>
          <span className="inline-block rounded-md border px-3 py-1 enter-fade">fade-in</span>
          <span className="inline-block rounded-md border px-3 py-1 enter-slide-up">slide-up</span>
        </div>
      </section>

      <section className="rounded-xl border p-6">
        <h3 className="text-h4 font-body mb-2">Glass Elevation Levels</h3>
        <p className="text-muted-foreground text-body-sm mb-4">
          Use elevation-aware glass utilities for hierarchy and performance.
        </p>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="glass-subtle rounded-xl p-4 border">glass-subtle</div>
          <div className="glass-float rounded-xl p-4 border">glass-float</div>
          <div className="glass-elevated rounded-xl p-4 border">glass-elevated</div>
          <div className="glass-command rounded-xl p-4 border">glass-command</div>
        </div>
      </section>
    </div>
  );
}
