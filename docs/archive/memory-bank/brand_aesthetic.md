# HIVE vBETA Brand Whitepaper

## 0 · Purpose & Scope

This whitepaper codifies the visual, verbal, and experiential language of HIVE. It empowers any designer, engineer, or storyteller to build new surfaces that feel unmistakably HIVE—elegant, playful-sharp, and student-first—while leaving room for future evolution.

**Core promise:** “Minimal surface. Maximal spark.” We strip friction to amplify student creativity.

**Guiding Principles**

- **Radical Clarity:** content > chrome.
- **Tactile Minimalism:** dark canvas, light glyphs, single accent.
- **Subtle Magic:** micro‑motion & haptics that reward intent, never distract.
- **Temporal Rhythm:** UI mirrors academic & seasonal pulses (e.g., orientation bursts, finals calm).
- **Builder DNA:** components are primitives; users remix.

## 1 · Inspirational Benchmarks

HIVE's aesthetic intentionally borrows notes from three modern paragons of digital experience:

- **Vercel — Developer‑first Minimalism**
  - Ultra‑flat, high‑contrast canvases with generous whitespace
  - Utility‑driven layouts that surface only what's essential
  - Micro‑motion that communicates state, never distracts

- **ChatGPT — Ambient Intelligence**
  - Warm yet neutral typographic rhythm that feels conversational
  - Hushed, dark surfaces that let content—and code snippets—glow
  - Playful bot personality cues delivered through microcopy and iconography

- **Apple — Polished Craft & Human Delight**
  - Obsessive alignment, optical balance, and motion physics
  - Elevated materials: translucency, soft‑shadow elevation, and haptic‑like visual feedback
  - Sparse but high‑impact accent color that guides attention without overwhelming

**Synthesis:** HIVE combines Vercel's stripped‑down clarity, ChatGPT's approachable AI presence, and Apple's perfectionist polish to create an interface that feels both serious and spark‑charged—exactly right for ambitious students.

---

## 2 · Visual Identity System

### 2.1 Logo

| Variant              | Usage                  | Construction                       |
| -------------------- | ---------------------- | ---------------------------------- |
| **Primary Horizontal** | App header, site nav   | Hexagon‑bee glyph + "HIVE" wordmark |
| **Glyph‑only**         | Favicon, buttons, app icon | 1:1 hexagon grid cell              |
| **Inverted**         | Dark backgrounds       | Stroke glyph, white wordmark       |

**Clear‑space:** ≥ 1× glyph height on all sides.
**Never:** recolor, skew, shadow, or animate without brand approval.

### 2.2 Color Palette

| Token              | Hex                        | Role                       |
| ------------------ | -------------------------- | -------------------------- |
| `bg.canvas`        | `#0A0A0A`                  | Root backdrop              |
| `bg.card`          | `rgba(255,255,255,0.02)`   | Surfaces, modals           |
| `accent.gold`      | `#FFD700`                  | Interactive affordances    |
| `accent.gold‑hover`| `#FFE255`                  | Hover & focus              |
| `text.primary`     | `#FFFFFF`                  | Headlines, body            |
| `text.muted`       | `#A1A1AA`                  | Meta text, labels          |
| `error`            | `#FF5555`                  | Destructive states         |
| `success`          | `#22C55E`                  | Positive states            |

**Philosophy:** one bright note in a monochrome orchestra. Gold is scarce, purposeful, never decorative.

### 2.3 Typography

| Level      | Token         | Font              | Specs              |
| ---------- | ------------- | ----------------- | ------------------ |
| Display 1  | `type.display`| Space Grotesk / 600 | 48px / 56px        |
| H1         | `type.h1`     | Space Grotesk / 600 | 32px / 40px        |
| H2         | `type.h2`     | Space Grotesk / 600 | 24px / 32px        |
| Body       | `type.body`   | Inter / 400       | 16px / 24px        |
| Caption    | `type.caption`| Inter / 400       | 12px / 18px        |

All fonts served locally; fallback to system-ui stack.

### 2.4 Iconography

- **Set:** Lucide‑React (outline, 1.5px stroke).
- **Size:** Base 20×20px; scale optically.
- Customize stroke weight for contrast on dark.

### 2.5 Imagery & Illustration

- **Photography:** candid student life, low‑contrast edits, natural grain overlay 4%.
- **Illustrations:** isometric line art in `accent.gold` on transparent.

---

## 3 · Component Aesthetic

### 3.1 Card

```css
padding: 24px 20px;
background: var(--bg-card);
border: 1px solid rgba(255,255,255,0.06);
border-radius: 12px;
box-shadow: 0 4px 24px rgba(0,0,0,0.45);
```
Elevation increases to shadow-lg on hover.

### 3.2 Button

| State      | BG                          | Text      | Border                 | Motion      |
| ---------- | --------------------------- | --------- | ---------------------- | ----------- |
| Default    | `accent.gold`               | `#0A0A0A` | none                   | scale 1.0   |
| Hover      | `accent.gold‑hover`         | `#0A0A0A` | none                   | scale 1.02  |
| Focus      | same as hover               |           | outline 2px accent.gold| —           |
| Disabled   | `rgba(255,255,255,0.08)`    | `#3F3F46` | none                   | scale 1.0   |

**Interaction:** 90ms ease‑out transform.

### 3.3 Input

- **Fill:** transparent.
- **Border:** 1px `rgba(255,255,255,0.12)`; 2px gold on focus.
- **Placeholder:** `text.muted` 60%.

More components: badge (pill 999px), modal, toast, alert banner, progress bar—see Design Token table in DSN‑01.

---

## 4 · Layout & Composition

- **Grid system:** 12‑col, 16px gutter (desktop); 4‑col, 8px gutter (mobile).
- **Spacing scale (rem):** 0 / 0.25 / 0.5 / 1 / 1.5 / 2 / 3.
- **Rounded geometry:** 12px default; 24px for prominent surfaces.
- **Depth rhythm:** surfaces > cards > elements, 3 elevation levels only.

---

## 5 · Motion & Interaction

### 5.1 Core Durations

| Type         | Token        | Duration |
| ------------ | ------------ | -------- |
| Instant      | `motion.fast`| 90ms     |
| Standard     | `motion.base`| 200ms    |
| Emphasized   | `motion.slow`| 350ms    |

Custom `cubic‑bezier(0.33,0.65,0,1)` mimics iOS spring.

### 5.2 Patterns

- Slide‑in for wizard steps, direction conveys hierarchy.
- Fade + scale‑up (4%) for modal open.
- Micro haptic (8ms) on primary action for devices that support.
- Respect `prefers-reduced-motion`; fall back to instant fade.

---

## 6 · Sound & Haptics

| Event   | Sound                     | Haptic              |
| ------- | ------------------------- | ------------------- |
| Success | soft "ding" (A4, -12dB)   | light 20ms tap      |
| Error   | low "thud" (E2)           | 30ms double‑pulse   |

All sounds under 250ms, -10 LUFS, CC0 licensed.

---

## 7 · Accessibility & Inclusivity

- Color contrast ≥ 4.5:1 for text.
- ALT text mandatory on imagery.
- Keyboard focus visible on all interactive elements.
- Support screen‑reader labels mirroring visual copy.
- Localized typography auto‑switches to Noto Sans for CJK.

---

## 8 · Voice & Tone

- **Voice pillars:** Curious, direct, gently irreverent ("fuck it, build it.").
- **Grammar:** Use contractions, active verbs.
- **No corporate jargon:** speak like a savvy peer, not a policy doc.

### Microcopy Patterns

| Context     | Do                               | Avoid                                        |
| ----------- | -------------------------------- | -------------------------------------------- |
| Button      | "Send magic link →"              | "Submit"                                     |
| Empty State | "No posts yet — start the convo."| "There are currently no posts in this space."|

---

## 9 · Brand Governance

- **Source of truth:** Figma library + this doc.
- **Versioning:** Semantic (v0.9.0 beta).
- **Proposals:** PR → Design Council (3 students + 1 staff) → Merge.

---

## 10 · Do / Don't Cheatsheet

| ✓ Do                                                  | ✗ Don't                                   |
| ----------------------------------------------------- | ----------------------------------------- |
| Use gold only for interactive or celebratory moments  | Add gold borders for decoration           |
| Maintain generous whitespace                          | Cram dense text blocks                    |
| Keep animation under 400ms                            | Loop or autoplay motion                   |
| Test on OLED & LCD                                    | Assume all screens render pure black      |

---

## 11 · Reference Mockups

See linked Figma file "HIVE Brand Kit v0.9". 