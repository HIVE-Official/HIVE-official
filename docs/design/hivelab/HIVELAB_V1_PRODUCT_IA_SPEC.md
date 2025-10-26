# HiveLab v1 — Product & Interaction Spec (Final)

Source: shared by Product 2025-10-19. This is the canonical HiveLab v1 IA and contracts for engineering, design, and QA. Spaces remains the active slice; use backend‑first execution. Posts/Board, Calendar, and Live tiles render in the Space, not inside HiveLab.

Note on routes: This spec standardizes on `/lab` routes. Current code references `/hivelab` (apps/web/src/app/hivelab). See “Open Decisions” for resolution plan.

---

## 0) Scope (what this is)

- HiveLab is where Space leaders build, run, and manage Tools.
- Canvas‑first (but not canvas‑only): a single Canvas shell with a few lightweight overlays.
- No feeds, no chat, no “system” list inside Elements. Posts/Board, Calendar, and Live tiles render in the Space, not inside HiveLab.

Out of scope (v1): DM/chat, campus-wide community living inside HiveLab, payments, third‑party integrations, custom element SDK.

---

## 1) IA (information architecture)

Entry

- `/lab` → If user is a leader in at least one Space, open `/lab/:spaceId` (Canvas). Otherwise show Space picker (leaders‑only Spaces), then Canvas.

Canvas shell

- Left Rail: System (locked) + Your tools (this Space).
- Center: Tool Home/Manage ↔ Edit (Canvas).
- Right Dock: Elements ↔ Settings.

Overlays / drawers

- Library (modal), Run Test (panel), Publish (modal), Lint drawer (panel), Replace picker (dialog), Inline attach (in Settings).

Routes

- `/lab/:spaceId` — Canvas shell (no tool selected).
- `/lab/:spaceId/tools/:toolId` — Tool Home/Manage in center.
- `/lab/:spaceId/tools/:toolId/edit` — Canvas authoring for that tool.
- Optional routed overlays: `/lab/:spaceId/library`, `/lab/:spaceId/test`.

---

## 2) Runtime model (how Tools “live”)

Tools can occupy multiple Space surfaces—visible and understandable to students:

- Start — composer shortcut (how you begin).
- Live — in‑progress area/tile (can pin to Dock).
- Board — a thread only when asking for input or sharing a recap (otherwise, state‑only).
- Calendar — optional Finish by (point‑in‑time); optional Extends: Events (attach to a scheduled live moment).
- Manage — Space Admin + Tool Home (leaders’ results/controls).

Patterns (implied by elements, not a manual toggle)

- Always‑on (no time): lives in Live; optional Board thread; no Calendar needed.
- Session‑based (start/end): Live while running; optional recap post.
- Event‑attached: elements “ride along” an Event’s live window (Extends: Events).
- Finish‑by only: time‑aware tasks (e.g., submission) with no Event.

Board bump rules

- Routine changes stay in Live (no bumps).
- When input is required: open one thread once or attach a collapsed update under the latest open item (one bump).
- Recap: one clean post at the end (if enabled).

---

## 3) Roles, devices, collaboration

- Who can build: Space leaders only (v1).
- Co‑editing: up to 3 co‑editors live; inline comments on nodes.
- Devices: Authoring is desktop‑only. Members use tools on any device in Space surfaces.

---

## 4) Left Rail (final)

Header

- Space name only. (No counters, no quick actions.)

Section 1 — System (locked)

- Events • Join/Chat • About. State chips: Live / Idle. (Extensions show a tiny “Extends: …” on hover only.)

Section 2 — Your tools

- Single list. Sort: Live → Recently used (48h) → A–Z.
- Row anatomy: icon/emoji • Tool name • status chip (Live / Idle / ⏳ 14d left for limited run, leaders‑only view) • placement markers Start • Live • Manage (filled/hollow).
- Primary click → Tool Home / Manage.

Footer

- Library • Your drafts.

Spam guard

- Overflow becomes state updates in Live; no extra board bumps.

---

## 5) Right Dock — Elements (final)

Tabs: Elements | Settings (this section covers Elements).

Layout

- Header: Search + chips Core (default), Horizons (preview).
- Body: collapsible Core categories (max ~8 visible tiles per category):
  - Gather & RSVP • Finish‑By & Remind • Decide • Collect • Match & Team • Track & Progress • Media & Files • Place & Logistics • Invite & Share • Care & Safety

Tile anatomy (Core)

```
[icon]  Name
1‑line purpose (≤80 chars)
Adds up to {X} fields • Lives in: ●Start ●Live ●Board ●Calendar • Audience: Members|Leaders
(optional) PII • (optional) Extends: Events                            [ Add ]
```

- Lives in lights only what applies (Calendar covers both Finish by and Extends: Events).
- Audience chip sets expectations.
- PII chip only when truly needed.
- Extends: Events only when the element can attach to Events.

Interactions

- Add (or drag) → element drops to canvas → auto‑opens its Element Settings.
- 8‑field cap (per tool) → Replace picker orders placed fields by fields used ↓ then least recent; one‑tap swap; Undo (5s).
- Starter combos suggest safe pairs (e.g., RSVP + Check‑in) that keep you ≤8 fields.
- Search uses synonyms (“attendance”→Check‑in, “sign‑ups”→RSVP/Slots). Never empty: show 2 Core suggestions.

Extensions (attach to Events)

- After add (for tiles with Extends: Events), inline attach step appears in Settings:
  - “Attach to an upcoming Event?” → [Pick (this Space, next 7 days, search)] • Skip • Propose Event (pre‑filled handoff).
  - Settings keeps a “Change attach” link.

Horizons (student autonomy)

- Grayed tiles with Support / Request / Follow + counts (“Requested by 12 spaces • 184 supports”).
- Weights: Request (leader) = 5× Support (student); cap 3 supports/student/week; Campus‑beta unlocks allowed. On unlock, tile turns solid with [Add].

A11y & perf

- Virtualized tiles; Add < 50 ms.
- Keyboard: ↑/↓ navigate, Enter Add, Tab to Settings.
- SR example: “Check‑in — Take attendance when it starts. Adds up to 1 field. Lives in Live and Calendar. Audience: Members. Button Add.”

---

## 6) Right Dock — Settings (final)

Tool Settings (when no node selected)

- Basics: Title/emoji; Audience = Members (default) | Leaders only | Mixed.
- Placement:
  - Show in Start (adds one composer shortcut).
  - Show a Live area (auto‑on if any Live‑type element is present).
  - Open a Board thread = Off | On when asking for input | Recap only.
  - Pin to Dock = On/Off.
- Time:
  - Finish by (chip; hidden unless a time‑capable element is present like File Submit).
  - Extends: Events handled by element’s attach step (not here).
- Reminders: chips → 24h before • At start • After close (More…: 10m before).
- Overflow: Keep inside Live area (default) | Attach under latest item (one bump).
- Safety: Anonymous (if Space allows; auto‑off when PII present); “Allow quiet reports” (default on).
- Results: leaders see full results in Space Admin + Tool Home; Share recap toggle.
- Meters & fixes: Fields X/8, Complexity Light/Medium/Heavy, Fix issues (auto‑fix button).

Element Settings (when a node is selected)

- Only plain‑language options for that element. Examples:
  - RSVP: cap on/off; show attendee list; allow anonymous (if allowed).
  - Check‑in: attach/skip/propose; window (e.g., T‑15→T+60); show live roster (on/off).
  - Slots: slot length; max per person; waitlist; auto‑release timeout.
  - Quick Poll: single/multi; show results after vote; allow revote (off).
  - File Submit: types (images/PDF); replace allowed; optional Finish by chip.
  - Roster Import (Leaders): CSV mapping; dedupe rule; preview first 10.
- Placement readout: “Lives in: Start / Live / Board / Calendar” (derived).
- Audience hint: “Members will see this” or “Leaders only.”
- PII & policy checks inline with one‑tap auto‑fixes.

Lints & auto‑fixes

- > 8 fields → Replace picker; auto‑fix: remove last added field.
- Live element but Live area off → warn; auto‑fix: turn Live area on.
- Time‑dependent element but no time → hint; auto‑fix: set Finish by (editable).
- PII + Anonymous → block; auto‑fix: turn anonymous off.
- Leader‑only element in member tool → hint; auto‑fix: switch audience (or move to leader sub‑flow).
- No way to start (misconfig) → warn; auto‑fix: add Start for Leaders.
- Extends: Events but no attach → hint; auto‑fix: Attach or Propose Event.

---

## 7) Top Bar & Action Dock

Top Bar (left→right)

- ToolName · version chip (e.g., `v0.3`) · “Saved • 12s ago”.
- Lint chip (• count) opens issues drawer with auto‑fixes.
- Undo / Redo (⌘Z / ⇧⌘Z).
- Run Test (primary when changes since last test).
- Publish (Draft → Limited run (14 days) → Certified).

Rules

- Must have Run Test freshness ≤ 10 min and no blocking lints to publish.
- Autosave; Restore previous via overflow (last 3 save points).

Action Dock (floating, bottom‑right)

- Context primary: Run Test (pulses when needed) or Publish (when green).
- Quick menu: Run Test • Fix issues • Publish ▸ Limited run / Certified • View as student • Restore point…
- Micro‑badges: Lints count, Fields X/8.
- Keyboard: F6 focus Dock; T run test; P publish; / lint fixes.

---

## 8) Run Test (panel)

Shows

- Student view previews: Start sheet, Live area.
- Timeline: reminder chips (24h before / at start / after close) and any Finish by/Event attach markers.
- Posting: “No new posts (state‑only)” or “Creates one post for input.”
- Attach status: “Attached to Event: …” or “No event attached.”
- Results snapshot: attendance/completion summary.
- Health: “Looks good” / “Heads‑up” / “Fix required” with one‑tap fixes.

Controls

- Ghost roster: 25 / 100 / 400.
- Fast‑forward: Now → +10m → +24h → +48h.
- Export JSON (debug) under “Advanced”.

Gate

- Publish disabled unless last test ≤ 10 min and Health ≠ Fix required.

---

## 9) Publish flow

Stages

- Draft → private.
- Limited run (14 days) → Space‑only trial (leaders see ⏳ countdown on the tool row; members never see the label).
- Certified → eligible for Library (installable anywhere).

Versioning

- Publishing pins `tool@version`. Safe migrations offer “Upgrade open items?” wizard; breaking changes (schema removals) require a new version.

---

## 10) Data & model contracts (minimal)

ElementTile

```ts
type ElementTile = {
  id: string
  name: string
  category: string
  purpose: string // ≤ 80 chars
  max_fields: number
  placement: { start: boolean; live: boolean; board: boolean; calendar: boolean }
  audience_default: "members" | "leaders"
  pii: boolean
  extends?: "events" | null
  synonyms: string[]
  starter_combos: string[]
  horizons?: { preview: boolean; requests: number; supports: number; campus_beta?: boolean }
}
```

ToolDefinition (authoring)

```ts
type ToolDefinition = {
  slug: string
  version: string
  title: string
  emoji?: string
  audience: "members" | "leaders" | "mixed"
  placement: { start: boolean; live: boolean; board: "off"|"on_input"|"recap_only"; dock: boolean }
  time?: { finishBy?: string } // ISO; optional
  elements: Array<{ id: string; config: Record<string, any>; attachedEventId?: string | null }>
  settings: { reminders: { h24?: boolean; start?: boolean; afterClose?: boolean; m10?: boolean };
              anonymous?: boolean; quietReports?: boolean; overflow: "state" | "attach_under_latest" }
}
```

LintIssue

```ts
type LintIssue = {
  id: string
  severity: "block" | "warn"
  message: string
  autofix?: { label: string; action: string; payload?: any }
}
```

---

## 11) Accessibility & performance

- A11y: All chips have text + shape (not color‑only). SR strings mirror tile meta. Focus traps only in open panels.
- Keyboard: Elements add via Enter; Settings navigable by Tab; Top Bar and Dock fully keyboardable.
- Perf: Tile Add < 50 ms; Settings open < 100 ms; Canvas pan/zoom ≥ 60 fps; Live tile update < 200 ms.

---

## 12) Safety, privacy, governance

- Anonymous disabled automatically when any PII element is present (with clear copy).
- Report elements create private threads for leaders; never public.
- Rate limits: action invocations/user = 10 per 10 minutes; backoff by IP.
- Data retention: raw records 12 months active + 24 months cold; proofs retained.
- Who can build: Space leaders only (verify role by Space membership).

---

## 13) Telemetry (events we instrument)

- Elements: `tile_view/add`, `replace_picker_open/confirm/undo`, `attach_choose/skip/propose`, `search_query`.
- Settings: `settings.change/*` (audience, placement, time, reminders, overflow, safety).
- Test/Publish: `run_test_click`, `publish_open/confirm`, `undo/redo`, `restore`.
- Horizons: `horizons.support/request/follow`.
- Outcomes KPIs: add→run conversion, board‑bump rate, completion %, limited‑run→certified %, top combos.

---

## 14) QA & acceptance

Golden paths

1. Add RSVP + Check‑in; attach to existing Event; Run Test; Publish to Limited run; tool shows ⏳ to leaders; members use it normally.
2. Build an always‑on Queue: Live only; optional Board thread; no Calendar; no spam.
3. File Submit with Finish by: reminders fire; recap optional; results export CSV/PDF.
4. Add a leader‑only element to a member tool → yellow hint + one‑tap fix; anonymous auto‑off when PII detected.
5. Hit 8/8 fields → Replace picker + Undo works reliably.

Acceptance (ship when)

- A leader can go from blank to “published, usable tool” in < 60 seconds for simple cases.
- Publish enforces fresh Run Test (≤10 min) and no blocking lints.
- Elements tiles consistently light Start • Live • Board • Calendar.
- Limited run = 14 days, leaders‑only countdown; no “pilot” wording.

---

## 15) Future arc (tease only, not IA)

- Leader Commons (as a normal Space): teased via a Lab Home card and Publish success toast with Reserve early access.
- Ask for Help in Top Bar creates a contextual thread (pre‑Commons: private ticket; post‑Commons: thread in Commons).
- Weekly Builder Drops live in Commons (one card mirrored in Lab Home).

This arc lives outside HiveLab’s Canvas; no additional surfaces in v1.

---

## Open Decisions (resolve before routing/UI work begins)

- Route prefix: adopt `/lab` (spec) vs `/hivelab` (current code). Proposal: canonicalize on `/lab` and set a transitional redirect from `/hivelab`.
- Space scoping: spec centers `/lab/:spaceId`; current page is campus/global. Proposal: require a Space context and lift any global lists into a Space picker.
- Overlay routing flags: confirm `?library=1` and `?test=1` usage for SSR vs client routing.
- Event attach window: default pick-list scope (next 7 days) and search behavior.
- Lint engine actions: finalize action registry names for auto-fix payloads.
