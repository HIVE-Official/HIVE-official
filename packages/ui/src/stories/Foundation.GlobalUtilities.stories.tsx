// Bounded Context Owner: Design System Guild
import React from "react";

export default {
  title: "Foundation/Global Utilities",
  parameters: { layout: "padded" }
};

export function FocusVariants() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-h4 font-body">Focus System</h2>
        <p className="text-muted-foreground text-body-sm">
          Hybrid focus: Dual ring, Gold keyline, Inset underline, Halo, plus Inset/Outline-Offset/Glow/Visible-Only. All gated by :focus-visible.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4 space-y-3">
          <h3 className="text-body font-semibold">Dual Ring (primary actions)</h3>
          <div className="flex gap-3">
            <button className="btn-prominent rounded-md focus-ring px-4 py-2">Join Space</button>
            <button className="btn-quiet rounded-md focus-ring px-4 py-2">Secondary</button>
          </div>
        </div>

        <div className="rounded-xl border p-4 space-y-3">
          <h3 className="text-body font-semibold">Gold Keyline (inputs/icon buttons)</h3>
          <div className="flex items-center gap-3">
            <input
              placeholder="Type here"
              className="rounded-md border bg-card px-3 py-2 focus-keyline"
            />
            <button aria-label="Options" className="rounded-md border p-2 focus-keyline">⋯</button>
          </div>
        </div>

        <div className="rounded-xl border p-4 space-y-3 md:col-span-2">
          <h3 className="text-body font-semibold">Inset Underline (tabs/menus)</h3>
          <nav className="flex gap-6 border-b">
            <button className="relative pb-2 text-body focus-underline-offset">Overview</button>
            <button className="relative pb-2 text-body focus-underline-offset">Members</button>
            <button className="relative pb-2 text-body focus-underline-offset">Events</button>
          </nav>
        </div>

        <div className="rounded-xl border p-4 space-y-3 md:col-span-2">
          <h3 className="text-body font-semibold">Halo (chips/filters)</h3>
          <div className="flex flex-wrap gap-2">
            {"All,Joined,Recommended,Admin".split(",").map((t) => (
              <button key={t} className="state-layer rounded-full border px-3 py-1 text-body-sm focus-halo">
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4 space-y-3">
          <h3 className="text-body font-semibold">Inset (filled buttons)</h3>
          <div className="flex gap-3">
            <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 focus-inset">Primary</button>
            <button className="rounded-md bg-secondary text-secondary-foreground px-4 py-2 focus-inset">Secondary</button>
          </div>
        </div>
        <div className="rounded-xl border p-4 space-y-3">
          <h3 className="text-body font-semibold">Outline Offset (cards)</h3>
          <button className="focus-outline-offset rounded-xl border bg-card p-6 text-left">
            <span className="block text-body font-semibold mb-1">Interactive Card</span>
            <span className="block text-muted-foreground text-body-sm">Outline 2px with 4px offset.</span>
          </button>
        </div>
        <div className="rounded-xl border p-4 space-y-3">
          <h3 className="text-body font-semibold">Glow (primary CTAs)</h3>
          <button className="btn-prominent rounded-md px-4 py-2 focus-glow">Continue</button>
        </div>
        <div className="rounded-xl border p-4 space-y-3">
          <h3 className="text-body font-semibold">Visible Only (keyboard)</h3>
          <button className="rounded-md border px-4 py-2 focus-visible-only">Open</button>
        </div>
      </section>
    </div>
  );
}

export function GlassSurfaces() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-h4 font-body">Glass Surfaces</h2>
        <p className="text-muted-foreground text-body-sm">
          Allowed on header chrome, Composer Dock, Context Panel, Ritual strip. Use elevation classes for depth. Toggle .no-glass on a parent to disable.
        </p>
      </header>
      <div className="rounded-xl border p-0 overflow-hidden">
        <header className="surface-glass keyline-gold-bottom px-4 py-3">Header (Glass)</header>
        <div className="p-4 grid gap-4 md:grid-cols-2">
          <aside className="surface-glass rounded-xl p-4">Context Panel</aside>
          <div className="surface-glass rounded-xl p-4">Composer Dock</div>
        </div>
      </div>
      <div className="no-glass rounded-xl border p-0 overflow-hidden">
        <header className="surface-glass px-4 py-3">Header (Glass disabled by .no-glass)</header>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="glass-subtle rounded-xl p-4 border">glass-subtle</div>
        <div className="glass-float rounded-xl p-4 border">glass-float</div>
        <div className="glass-elevated rounded-xl p-4 border">glass-elevated</div>
        <div className="glass-command rounded-xl p-4 border">glass-command</div>
      </section>
    </div>
  );
}

export function MotionPresets() {
  const [sheet, setSheet] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-h4 font-body">Motion Presets</h2>
        <p className="text-muted-foreground text-body-sm">150/200/300/400ms scale with reduced-motion respected.</p>
      </header>
      <div className="flex gap-3">
        <button className="rounded-md border px-3 py-2 focus-ring" onClick={() => setSheet(true)}>Open Sheet</button>
        <button className="rounded-md border px-3 py-2 focus-ring" onClick={() => setModal(true)}>Open Modal</button>
      </div>
      {sheet && (
        <div className="fixed inset-0 z-layer-3">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSheet(false)} />
          <aside className="absolute right-0 top-0 h-full w-[360px] bg-card border-l enter-sheet-right p-4">
            <header className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-h4 font-body">Sheet</h3>
              <button className="rounded-md border px-2 py-1 focus-ring" onClick={() => setSheet(false)}>Close</button>
            </header>
            <div className="pt-4 space-y-3 text-body">
              <p>Slide-in from right, 300ms.</p>
              <p>Use for off-canvas panels.</p>
            </div>
          </aside>
        </div>
      )}
      {modal && (
        <div className="fixed inset-0 z-layer-3 grid place-items-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal(false)} />
          <div className="relative rounded-xl border bg-card p-6 enter-modal">
            <h3 className="text-h4 font-body mb-2">Modal</h3>
            <p className="text-muted-foreground text-body-sm mb-4">Pop-in, 300ms. Fade-out on close.</p>
            <button className="rounded-md border px-3 py-2 focus-ring" onClick={() => setModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ElevationScale() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-h4 font-body">Elevation Scale</h2>
        <p className="text-muted-foreground text-body-sm">Levels 0–3 with dark-surface lift.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="elev-0 rounded-xl border p-4">elev-0</div>
        <div className="elev-1 rounded-xl border p-4">elev-1</div>
        <div className="elev-2 rounded-xl border p-4">elev-2</div>
        <div className="elev-3 rounded-xl border p-4">elev-3</div>
      </div>
    </div>
  );
}

export function SafeAreasAndScrollbar() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-h4 font-body">Safe Areas + Scrollbar</h2>
        <p className="text-muted-foreground text-body-sm">Use env(safe-area-inset-*) for off-canvas and sticky bars. Opt-in styled scrollbars, or hide them cleanly.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative rounded-xl border overflow-hidden">
          <div className="sticky top-0 pad-safe-top bg-card/80 border-b px-4 py-2">Sticky Header (safe-top)</div>
          <div className="h-48 overflow-y-auto scrollbar-styled p-4 space-y-2" data-density="compact">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="rounded-md border px-3 py-2">Styled Row {i + 1}</div>
            ))}
          </div>
          <div className="sticky bottom-0 pad-safe-bottom bg-card/80 border-t px-4 py-2">Sticky Footer (safe-bottom)</div>
        </div>

        <div className="relative rounded-xl border overflow-hidden">
          <div className="sticky top-0 pad-safe-top bg-card/80 border-b px-4 py-2">Hidden Scrollbar</div>
          <div className="h-48 overflow-y-auto scrollbar-none p-4 space-y-2">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="rounded-md border px-3 py-2">Hidden Row {i + 1}</div>
            ))}
          </div>
          <div className="sticky bottom-0 pad-safe-bottom bg-card/80 border-t px-4 py-2">Footer</div>
        </div>
      </div>
    </div>
  );
}
