Status: Accepted
Date: 2025-10-19
Owner: Community Guild + Design System Guild

# Decision 0003 — Spaces Composer Placement

Context
- Source spec places the Space composer at the top (“Top-docked input (Enter → publish)”). See docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:47-51.
- Current `SpaceLayout` implementation uses a bottom composer aligned with a chat-like interaction model (packages/ui/src/organisms/spaces/space-layout.tsx:1).

Decision
- We will keep composer placement at the bottom across Space surfaces for v1.

Rationale
- Consistency with active `SpaceLayout` interaction model (chat presence, sticky input, cognitive framing: “I’m in a conversation”).
- Lower sequencing risk given existing components and stories; avoids churn across tabs and pinned content.
- Still compatible with spec’s other requirements (tabs, pins, post sheet, safety lints).

Implications
- The IA spec’s “Top-docked input” is a deliberate deviation for v1. We will update UI stories and TODO.md to reflect bottom composer.
- Pinned carousel remains at the top of the stream; composer is sticky at the bottom. Unread separator + “Jump to latest” behavior unchanged.
- Storybook demos will show bottom composer with safety/PII/alt-text preflight and Tool actions (≤6) per spec.

Follow-ups
- Revisit placement after student usage telemetry (composer starts→publishes %, post quality, moderation triggers). If evidence favors top-docked for broadcast-style behavior, consider a Space-type-conditional placement.
- Ensure a11y affordances for sticky bottom composer (focus outlines, SR hints, reduced-motion compliance).

References
- docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:47-51
- packages/ui/src/organisms/spaces/space-layout.tsx:1
