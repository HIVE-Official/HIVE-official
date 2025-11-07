# Topology Storybook Checklist

Use this checklist to bring the topology contracts to Storybook before wiring them into the Next.js app. Each component should read from the slot kit (`@hive/tokens/topology/slot-kit.json`) and mode tokens (`@hive/tokens/topology/mode-tokens.json`) so Storybook stories mirror production constraints.

## ComposerChat
- Document `default`, `withLintError`, `leaderVisibilityToggle`, and `reducedMotion` stories.
- Verify ≤6 actions render; exceeding budget throws the lint banner.
- Showcase Space⇄Campus visibility toggle and ghost-mode disabled state.
- Emit Storybook controls for `mode` (`calm`, `urgent`, `sober`) and `onSubmit` events.

## PostCard Variants
- Provide separate stories for `standard`, `tool`, `event`, and `recap`.
- Ensure a single primary CTA; secondary actions demoted to tertiary links.
- Include explainability chip slot populated with sample reason metadata.
- Add controls for `mode` (calm/focus/urgent) to validate tonal tokens.

## EventSheet
- Stories: `default`, `liveUrgent`, `leaderActions`, `reducedMotion`.
- Confirm sections (`Details`, `Extensions`, `Attendees`, `Chat`, `Activity`) toggle via tabs.
- Demonstrate leadership quick actions (Remind, Open/Close Check-in, Duplicate, Pin) respecting temporal budgets.
- Validate `modeTokens.urgent` styling, and reduced-motion fallback removing pulses.

## RailWidget
- Stories per variant: `action`, `progress`, `eventNow` (with live countdown).
- TTL badge visible; story args allow testing expiry warnings.
- Accessibility tokens (aria-live, role) surfaced for `eventNow`.
- Showcase rail priority ordering (`R1`, `R2`, `R3`) via decorator layout.

## RitualStrip
- Stories: `inactive` (hidden), `activeRitual`, `recapReady`.
- Verify slot width matches `slotKit.slots.S2` constraints.
- Include CTA copy variations and ensure single CTA enforcement.
- Story args to simulate recap injection event.

## Elements (Inline Tool UIs)
- Provide grouped stories covering RSVP chip, Slot picker, Poll/Rank, Quick Form, Ack, Counter.
- Each element demonstrates one primary CTA and compact footprint.
- Add lint state for invalid configuration (e.g., >12 fields).
- Ensure copy stays ≤12 words and uses decisive verbs.

## Global Decorators
- Add viewport decorators for desktop (>1280px) and mobile (390px) to validate slot responsiveness.
- Provide mode switcher knob mapping to `mode-tokens.json` for quick QA across tonal modes.
- Tie Storybook toolbar action to `useCognitiveBudget` mock so over-budget states are easy to inspect.
