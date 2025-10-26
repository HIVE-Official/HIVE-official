// Bounded Context Owner: Design System Guild
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { routeCrossfade } from '../../motion/variants'

export default { title: 'Polish/Shared Element (Card → Detail)', parameters: { layout: 'padded' } }

type Item = { id: number; title: string; body: string }
const ITEMS: Item[] = Array.from({ length: 6 }).map((_, i) => ({ id: i+1, title: `Card ${i+1}`, body: 'Lorem ipsum dolor sit amet.' }))

export function CardToDetail() {
  const [active, setActive] = React.useState<Item | null>(null)
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div key="detail" variants={routeCrossfade} initial="hidden" animate="show" exit="exit" className="col-span-3">
            <div className="relative rounded-xl border bg-card p-6 z-app-3 shadow-e3">
              <motion.div layoutId={`title-${active.id}`} className="text-h3 font-body mb-2">{active.title}</motion.div>
              <motion.div layoutId={`card-${active.id}`} className="rounded-xl border bg-card p-4">
                <p className="text-body">{active.body} Shared layoutId preserves continuity.</p>
              </motion.div>
              <button className="mt-4 rounded-md border px-3 py-1 focus-ring" onClick={() => setActive(null)}>Back</button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="grid" variants={routeCrossfade} initial="hidden" animate="show" exit="exit" className="grid gap-4 md:grid-cols-3 col-span-3">
            {ITEMS.map(item => (
              <button key={item.id} className="text-left" onClick={() => setActive(item)}>
                <motion.div layoutId={`card-${item.id}`} className="rounded-xl border bg-card p-4">
                  <motion.div layoutId={`title-${item.id}`} className="text-h4 font-body mb-1">{item.title}</motion.div>
                  <p className="text-body-sm text-muted-foreground">Tap to expand</p>
                </motion.div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

