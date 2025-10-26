// Bounded Context Owner: Design System Guild
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DUR, EASE, SPRING } from '../../motion/tokens'
import { fadeIn, fadeScale, liftY, slideX, sheetRight, routeCrossfade } from '../../motion/variants'

export default { title: 'Polish/Motion & Depth Spec', parameters: { layout: 'padded' } }

export function TokensOverview() {
  return (
    <div className="space-y-4">
      <h2 className="text-h4 font-body">Timing & Easing</h2>
      <div className="grid gap-3 md:grid-cols-5 text-body-sm">
        {Object.entries(DUR).map(([k, v]) => (
          <div key={k} className="rounded-md border p-3">duration {k}: {v}ms</div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-3 text-body-sm">
        {Object.entries(EASE as any).map(([k, v]) => (
          <div key={k} className="rounded-md border p-3">ease {k}: {Array.isArray(v) ? v.join(',') : v}</div>
        ))}
      </div>

      <h3 className="text-h4 font-body mt-6">Depth Palette</h3>
      <div className="grid gap-4 md:grid-cols-5">
        {['0','1','2','3','4'].map(l => (
          <div key={l} className={`rounded-xl p-4 border shadow-e${l} z-app-${l} bg-card`}>E{l} shadow-e{l}</div>
        ))}
      </div>
    </div>
  )
}

export function Primitives() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Demo variants={fadeIn} label="fadeIn" />
      <Demo variants={fadeScale} label="fadeScale" />
      <Demo variants={liftY} label="liftY" />
      <Demo variants={slideX(1)} label="slideX" />
      <Demo variants={slideX(-1)} label="slideX (-)" />
      <Demo variants={sheetRight} label="sheetRight" />
    </div>
  )
}

export function RouteWrapperExample() {
  const [show, setShow] = React.useState(true)
  return (
    <div className="space-y-3">
      <button className="rounded-md border px-3 py-1 focus-ring" onClick={() => setShow(s => !s)}>Toggle</button>
      <div className="relative h-40 overflow-hidden rounded-xl border">
        <AnimatePresence mode="wait">
          {show ? (
            <motion.div key="a" className="absolute inset-0 grid place-items-center" variants={routeCrossfade} initial="hidden" animate="show" exit="exit">A</motion.div>
          ) : (
            <motion.div key="b" className="absolute inset-0 grid place-items-center" variants={routeCrossfade} initial="hidden" animate="show" exit="exit">B</motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Demo({ variants, label }: { variants: any, label: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="rounded-xl border p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-body font-semibold">{label}</div>
        <button className="rounded-md border px-2 py-1 focus-ring" onClick={() => setOpen(o => !o)}>{open ? 'Close' : 'Open'}</button>
      </div>
      <div className="relative h-32 overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div className="absolute inset-2 rounded-lg border bg-card grid place-items-center" variants={variants} initial="hidden" animate="show" exit="exit">
              <span className="text-body-sm">{label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )}
