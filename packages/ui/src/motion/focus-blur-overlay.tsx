"use client";
// Bounded Context Owner: Design System Guild
import React from 'react'

type Props = {
  blur?: number // px
}

/**
 * Global overlay that blurs the background when any element with
 * [data-focus-blur] gains focus (click or keyboard).
 *
 * Usage:
 * - Mount once near the root (e.g., app layout or Storybook preview)
 * - Mark focusable elements with `data-focus-blur` and optionally add `focus-elevate`
 *   to ensure the focused element sits above the blur layer.
 */
export function FocusBlurOverlay({ blur = 8 }: Props) {
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const onFocusIn = (e: Event) => {
      const t = e.target as Element | null
      const scoped = t?.closest('[data-focus-blur]')
      setActive(Boolean(scoped))
    }
    const onPointerDown = (e: Event) => {
      const t = e.target as Element | null
      const scoped = t?.closest('[data-focus-blur]')
      if (scoped && (scoped as HTMLElement).focus) (scoped as HTMLElement).focus()
    }
    const onFocusOut = () => {
      // Defer to next tick so focusin after focusout can re-activate
      setTimeout(() => {
        const el = document.activeElement as Element | null
        setActive(Boolean(el?.closest('[data-focus-blur]')))
      }, 0)
    }
    document.addEventListener('focusin', onFocusIn, true)
    document.addEventListener('focusout', onFocusOut, true)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      document.removeEventListener('focusin', onFocusIn, true)
      document.removeEventListener('focusout', onFocusOut, true)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [])

  if (!active) return null

  const style: React.CSSProperties = {
    // Respect tokens; allow override via props
    // scrimOverlay class sets color/opacity; we can adjust opacity inline
    zIndex: 40,
    // Let tokens drive blur if present
    // fallback to provided px
    // @ts-ignore custom prop
    '--backdrop-blur-overlay': `${blur}px`,
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 scrim-overlay scrim-blur"
      style={{ ...style }}
    />
  )
}

export default FocusBlurOverlay
