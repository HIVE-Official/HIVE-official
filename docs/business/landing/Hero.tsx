// Paste-ready marketing hero snippet for Next.js + Tailwind
// Aligns with repo tokens (bg-background, text-foreground, bg-card)
// Keep this as reference until the marketing surface is ready.
import React from 'react'

export function Hero() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
            Campus OS — run by students.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Student-owned. Tech-sleek. Trust-visible. Always evolving.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#get-in"
              aria-label="Get in"
              className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-primary-foreground shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Get in →
            </a>
            <a
              href="#today"
              aria-label="See what’s happening today"
              className="inline-flex items-center rounded-md bg-card px-5 py-3 text-foreground shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border"
            >
              See what’s happening today →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

