# HIVE UX Law
**The One-Page Reference for Building HIVE**

> **North Star**: Belong fast. Act fast. Feel safe.
> **Design Stance**: Calm chrome, crisp hierarchy, zero mystery.
> **Vision**: Campus OS built from vertical slices (Feed/Spaces/Profile/Tools/Rituals as mini-products)

---

## 1. Spatial Slots (Rendering Rules)

### Desktop Layout
```
┌─────────────────────────────────────────────────────┐
│ S0: Shell (collapsible sidebar + top bar)          │
├──────────┬──────────────────────────┬───────────────┤
│          │ S1: Header               │               │
│  Sidebar │ (title, chips, actions)  │   R: Rail     │
│          ├──────────────────────────┤  (optional)   │
│  Feed    │ S2: Pinned (1+2 max)     │               │
│  Spaces  │ (ritual strip + banners) │  - Now widget │
│  Profile ├──────────────────────────┤  - ≤2 active  │
│  HiveLab │ S3: Stream               │               │
│  Notifs  │ (cards, infinite scroll) │               │
│          ├──────────────────────────┤               │
│          │ S4: Composer (in-place)  │               │
└──────────┴──────────────────────────┴───────────────┘

Z1: Sheet (overlay, slides up from bottom, no route flip)
```

### Mobile Layout
```
┌─────────────────────────────────────┐
│ S0: Top Bar (context + search)     │
├─────────────────────────────────────┤
│ S2: Pinned (compresses on scroll)  │
├─────────────────────────────────────┤
│ S3: Stream (single column)         │
│                                     │
│ (cards, infinite scroll)            │
│                                     │
├─────────────────────────────────────┤
│ S4: Composer (FAB or inline)       │
├─────────────────────────────────────┤
│ Bottom Nav: Feed|Spaces|+|Notif|Me │
└─────────────────────────────────────┘

Z1: Sheet (full-screen on mobile)
```

### **Rendering Law**:
- **Member surfaces** = single-column only
- **Details** = L1 sheets (not route flips)
- **No right rail on member surfaces** (Feed, Space Board, Profile Timeline)
- **Rail (R)** = desktop-only, HiveLab/Admin surfaces only

---

## 2. Cognitive Caps (Complexity Limits)

### Per-Card Rules
| Element | Cap | Rationale |
|---------|-----|-----------|
| Primary CTA | **1** | One clear next action |
| Tool Actions | **≤2** | Prevent decision paralysis |
| Tool Fields | **≤12** | Keep forms scannable |
| Composer Actions | **≤6** | Tool picker grid limit |
| Space Rail Widgets | **1 Now + ≤2 active** | Focus, not clutter |
| Auto-Posts per Space | **≤2/day** | Prevent feed spam |
| Space pins | **≤2** | Carousel stays scannable |

### Information Density Budgets
- **Card body text**: Max 2 lines before "Read more"
- **Space description**: Max 3 lines in grid view
- **Profile bio**: Max 4 lines before truncation
- **Explainability chips**: 1 per card ("Why am I seeing this?")

### **Cognitive Law**:
> If a card has 3+ CTAs, it's actually 3 cards. Split it.

---

## 3. Temporal Rules (Time-Based Behavior)

### Tool Lifecycle States
```
OPEN → REMIND → ACT → CLOSE → RECAP
```

**Hard Pacing**:
- **OPEN**: Tool post created, clock starts
- **REMIND**: T–24h, T–1h notifications
- **ACT**: Live window (highlighted with "Now" chip)
- **CLOSE**: Deadline hits, submissions freeze
- **RECAP**: Auto-post with results lands in Feed

### Ritual Phases
```
Upcoming → Active → Ended → Recap
```

**Constraints**:
- **1 active ritual** per campus at a time
- Strip visible in **S2 Pinned** during Active phase
- Recap posts go to **S3 Stream** (Feed)

### **Temporal Law**:
- Every time-boxed workflow **must** end with a recap card
- No more than **2 auto-posts/day/space** (prevent spam)
- "Now" chips appear during live windows (events, tool deadlines)

---

## 4. Emotional Modes (Rhythm, Not Ornament)

### Mode Palette
| Mode | When | Visual Treatment | Motion |
|------|------|------------------|--------|
| **Calm** | Default browsing | Neutral grays, subtle shadows | 120ms fades |
| **Focus** | Composing, deep work | Dim background, spotlight content | Minimal motion |
| **Warm** | Social moments | Gold accents, soft glows | 160ms springs |
| **Celebrate** | Milestones, completions | Confetti (rare!), gold bursts | 240ms with easing |
| **Urgent** | Deadlines, "Now" states | Orange pulse, countdown | 100ms instant feedback |
| **Sober** | Reports, moderation | Red accents, firm borders | No decorative motion |

### **Emotional Law**:
- Modes are **pacing and timing**, not color overlays
- Motion: 100–160ms for affordances, 240ms for overlays
- Respect `prefers-reduced-motion` (swap parallax for fades)
- Confetti reserved for **recap milestones only**

---

## 5. Social Topology (Visibility & Fairness)

### Visibility Levels
```typescript
enum Visibility {
  SPACE_ONLY = "space",      // Default for Space Board posts
  CAMPUS_WIDE = "campus",    // Promoted to Feed (explicit choice)
  DIRECT = "dm"              // Future: 1:1 messages
}
```

### Ranking Principles
- **Feed**: Chronological with engagement boost
- **Space Board**: Strict chronological (pins exempt)
- **Discovery**: Balanced rotation (≤3 items/space/page)

### Explainability
- Every Feed card shows **why** it's there:
  - "You're in Photography Club"
  - "Matches your interest: Sustainability"
  - "Popular on campus today"

### Reputation Gates
- New users (<30 days): "New Member" badge
- Power users (high engagement): "Top Contributor" badge
- Leaders: "Space Leader" badge
- Verified: "@buffalo.edu" badge

### **Social Law**:
- Visibility choice is **explicit at compose time**
- No more than **≤3 items from same Space per Feed page** (fairness cap)
- Every card needs an explainability chip (no mystery algorithms)

---

## 6. Performance Budgets (Speed = Trust)

### Page Load Targets
| Surface | Cold Load | Warm Load | Rationale |
|---------|-----------|-----------|-----------|
| Feed | **≤1.8s** | **≤1.2s** | First impression is everything |
| Space Board | **≤1.5s** | **≤1.0s** | High-frequency surface |
| Profile | **≤2.0s** | **≤1.5s** | Image-heavy, can tolerate slightly slower |
| HiveLab Studio | **≤2.5s** | **≤2.0s** | Desktop-only, complex UI acceptable |

### Interaction Targets
- **Button feedback**: ≤100ms (tap → visual response)
- **Sheet open/close**: 200–240ms slide + scrim fade
- **Card hover**: 120ms lift animation
- **Composer expand**: 160ms height animation

### Bundle Optimization
- **Critical CSS**: Inline for above-the-fold
- **Lazy load**: Below-the-fold images, tool runtime
- **Code splitting**: HiveLab, Admin, Analytics on-demand
- **Prefetch**: Next page of infinite scroll at 70% scroll

### **Performance Law**:
> If it doesn't feel instant, it's broken. Ship fast > ship big.

---

## 7. Component Contracts (Atomic Design)

### Atoms (Primitives)
- **Button**: Primary, Secondary, Ghost, Danger (4 variants max)
- **Input**: Text, Textarea, Select, DatePicker
- **Card**: Base container with hover/focus states
- **Avatar**: Small (32px), Medium (48px), Large (96px)
- **Badge**: Status, Role, Verification indicators
- **Chip**: Filters, tags, explainability
- **Skeleton**: Loading states for all card types

### Key Organisms (Composed)
- **PostCard**: Feed/Space posts (1 primary CTA, ≤2 tool actions)
- **EventCard**: Time, location, RSVP state, capacity
- **Composer**: Auto-growing textarea, tool picker (≤6 actions), visibility toggle
- **ProfileHeader**: Avatar, name/handle, bio, stats ribbon, primary action
- **RitualStrip**: Theme, countdown, single CTA, snooze/hide
- **EventSheet**: RSVP, check-in, attendee list, chat (Z1 overlay)

### **Component Law**:
- Every component accepts `aria-*` and `data-testid`
- Long text truncates with ellipsis + tooltip
- Primary actions **always include text labels** (no icon-only CTAs)

---

## 8. Tool System (Builder Autonomy)

### Element Types (Building Blocks)
```typescript
enum ToolElement {
  TEXT_INPUT,      // Short text field
  TEXTAREA,        // Long text field
  RADIO,           // Single choice
  CHECKBOX,        // Multiple choice
  DATE_PICKER,     // Date/time selection
  IMAGE_UPLOAD,    // Single image
  FILE_UPLOAD,     // Document attachment
  SLIDER,          // Numeric range
  RATING,          // Star/emoji rating
  RESULTS_BAR,     // Vote/poll display
  PHOTO_GRID,      // Gallery of submissions
  COUNTER_RING     // Participation count
}
```

### Tool Lifecycle (Draft → Certified)
```
1. Draft (lab-only, infinite iterations)
   ↓
2. Pilot (≤2 spaces, 30 days, metrics collection)
   ↓
3. Certified (campus-wide, analytics dashboard, proof exports)
```

### Depth Budgets (Complexity Limits)
- **Max fields**: 12 per tool
- **Max actions**: 2 per tool post (e.g., "Vote + Share")
- **Max results views**: 3 tabs (Summary, Breakdown, Responses)

### Lint Panel (Pre-Publish Checks)
- **Blocking**: Missing title, no close time, >12 fields
- **Warning**: No image, no description, <2 responses expected

### **Tool Law**:
- Tools **must** end with a recap (auto-post results to Feed)
- Leaders can export proofs (CSV, images) for accountability
- Certified tools get analytics dashboard (engagement, completion rate)

---

## 9. Design System (Vercel-Style DX)

### Tokens (Source of Truth)
```
@hive/tokens → CSS variables → Tailwind config → Components
```

**Color Scale**:
- Neutrals: `gray-50` to `gray-900` (layered surfaces)
- Accent: `gold-500` (#FFD700) for primary actions
- Semantic: `success`, `info`, `warn`, `danger`

**Type Scale**:
- Display: 28px/32px (page titles)
- Title: 22px/26px (section headers)
- Heading: 18px/22px (card titles)
- Body: 14px/20px (main content)
- Caption: 12px/16px (metadata)

**Spacing**: 4, 8, 12, 16, 24, 32 (8px grid)

**Radii**: xs=6px, sm=10px, md=14px (cards), lg=22px (chips/pills)

**Elevation**: e0 (flat), e1 (hover), e2 (popover), e3 (modal)

### Next.js App Router Patterns
- **Server Components**: Default for all pages
- **Client Components**: `"use client"` only when needed (forms, animations)
- **Route Handlers**: `/api/*` with `withAuthAndErrors` middleware
- **Edge-Safe**: No Node.js APIs, no `eval`, no dynamic requires

### **DX Law**:
- Deploy-driven confidence (Vercel previews for every PR)
- Type-safe end-to-end (Zod schemas, TypeScript strict mode)
- Token-first (never hardcode colors/spacing)

---

## 10. Why It Feels Like ChatGPT

### Single-Surface Interaction
- **No route flips for details**: Everything opens as a sheet (Z1 overlay)
- **Act in place**: RSVP, vote, comment without leaving context
- **Breadcrumb-free**: Back button always works intuitively

### One Verb Per Card
- Feed cards: "Join Space", "RSVP", "Vote Now"
- Space cards: "Post", "Invite", "Settings"
- Profile actions: "Connect", "Message" (future)

### Explainability Throughout
- "Why am I seeing this?" chips on Feed cards
- Tool lints explain blocking issues
- Ritual strip shows countdown + reasoning

### Progressive Disclosure
- Simple → Advanced → Expert
- Post → Post with poll → Post with embedded tool
- Default to least complex, reveal power on demand

### **ChatGPT Law**:
> Every interaction should feel like a conversation: Ask → Answer → Next question flows naturally.

---

## Quick Reference Card

### Spatial
- S0: Shell | S1: Header | S2: Pinned (1+2) | S3: Stream | S4: Composer | Z1: Sheet | R: Rail (desktop HiveLab/Admin only)

### Cognitive
- 1 CTA/card | ≤2 tool actions | ≤6 composer actions | ≤12 fields | 1 Now + ≤2 active rail widgets

### Temporal
- OPEN → REMIND → ACT → CLOSE → RECAP | ≤2 auto-posts/day/space | 1 active ritual/campus

### Emotional
- Calm (120ms) | Focus (minimal) | Warm (160ms) | Celebrate (240ms confetti rare) | Urgent (100ms) | Sober (no decoration)

### Social
- Visibility explicit at compose | ≤3 items/space/page | Explainability chips | Reputation badges

### Performance
- Feed ≤1.8s cold / ≤1.2s warm | Interactions ≤150ms | Code split non-critical

### Components
- Atoms (primitives) | Organisms (composed) | All accept aria-* + data-testid | Text labels on primary CTAs

### Tools
- Draft → Pilot (≤2 spaces, 30 days) → Certified | ≤12 fields | ≤2 actions | Lint panel (blocking/warning)

### DX
- Tokens → CSS vars → Tailwind → Components | Server Components default | `withAuthAndErrors` middleware | Deploy previews

### ChatGPT
- Single surface | One verb/card | Sheet-first | Explainability | Progressive disclosure

---

## Enforcement Checklist

Before shipping **any** feature, verify:

- [ ] **Spatial**: Uses correct slots (S0-S4, Z1, R rules followed)
- [ ] **Cognitive**: ≤1 primary CTA per card, complexity caps respected
- [ ] **Temporal**: Time-boxed workflows end with recap
- [ ] **Emotional**: Motion timing correct (100-240ms), reduced-motion respected
- [ ] **Social**: Visibility choice explicit, explainability chips present
- [ ] **Performance**: Meets load/interaction budgets
- [ ] **Components**: Uses @hive/ui atoms, accepts aria-*/testid, labels on CTAs
- [ ] **Tools**: Draft→Pilot→Certified flow, depth budgets, lints implemented
- [ ] **DX**: Token-based styling, TypeScript strict, edge-safe patterns
- [ ] **ChatGPT**: Sheet-first details, one verb/card, progressive disclosure

---

**Remember**: "We're not building another social network. We're building the operating system for college life."

Every decision should make **belong fast, act fast, feel safe** more true.
