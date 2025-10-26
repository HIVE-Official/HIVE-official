// Bounded Context Owner: Design System Guild
import React from 'react'
import { FocusBlurOverlay } from '../motion/focus-blur-overlay'

export default { title: 'Foundation/Focus Blur Background', parameters: { layout: 'padded' } }

export function Demo() {
  return (
    <div className="space-y-6">
      {/* Mount the overlay once */}
      <FocusBlurOverlay />
      <header className="space-y-1">
        <h2 className="text-h4 font-body">Blur background on focus (click or keyboard)</h2>
        <p className="text-muted-foreground text-body-sm">Elements marked with <code>data-focus-blur</code> will blur the background while focused. Add <code>focus-elevate</code> to keep the target above the blur layer.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-4 space-y-3">
          <input data-focus-blur className="focus-elevate w-full rounded-md border bg-card px-3 py-2 focus-keyline" placeholder="Focus me to blur background" />
          <button data-focus-blur className="focus-elevate rounded-md border px-3 py-2 focus-ring">Or click me</button>
          <p className="text-muted-foreground text-body-sm">Other content remains interactive; overlay ignores pointer events.</p>
        </div>
        <div className="rounded-xl border p-4 space-y-2">
          <p className="text-body">This panel helps you see the blur effect.</p>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-md border bg-card p-3 text-center text-body-sm">Item {i+1}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

