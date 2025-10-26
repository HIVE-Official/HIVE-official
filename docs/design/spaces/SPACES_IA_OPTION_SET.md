Status: Draft (Compare & Decide)
Owner: Design Architect
Last updated: 2025-10-19

# Spaces — IA Option Set (Compare Alternatives)

Purpose
- Present mutually exclusive IA options for Spaces without assumptions. Each option includes mobile/desktop, primary navigation, and default detail pattern. Use this to drive card sorting, tree testing, and usability.

Option A — Chat‑First Space (Discord‑like)
- Nav: Sidebar on desktop (Channels/Threads/Events/Resources); Bottom tabs on mobile (Home/Events/Members/More).
- Default view: Messages/threads; composer fixed.
- Detail: Thread drawer (desktop), bottom sheet (mobile).
- Strength: Social presence; fast replies.
- Risk: Harder to reveal policies/resources; event planning feels secondary.

Option B — Feed‑First Space (Twitter/FB‑like)
- Nav: Tabs (Posts/Events/Members/About/Tools) or segmented control.
- Default view: Post stream; composer at top/bottom.
- Detail: Sheet overlay by default.
- Strength: Broadcast updates + quick reactions; easy scannability.
- Risk: Deep tools and events require good entry points.

Option C — Events‑First Space (Calendar‑centric)
- Nav: Primary tab for Events; secondary for Posts/Members/About.
- Default view: List (mobile) or List+Month (desktop).
- Detail: Sheet overlay; RSVP first.
- Strength: Clear value for planning communities.
- Risk: Everyday conversation may feel buried.

Option D — Board/Topic‑First Space (Forum‑like)
- Nav: Boards (Announcements, Q&A, Planning) as primary.
- Default view: Topic lists; composer per board.
- Detail: Inline expand or sheet.
- Strength: Knowledge organization; long‑form threads.
- Risk: Feels formal; slower casual engagement.

Detail Pattern Alternatives
- Sheet overlay (keeps context; great for RSVP/comment).
- Route page (deep/long tasks; SEO; complex forms).
- Inline expand (fast scan; limited tasks; hard to deep‑link).
- Drawer (mobile ergonomic; desktop cramped).

Evaluation Checklist (for each option)
- Orientation retained? • Time‑to‑RSVP • Posting friction • Policy visibility • Member discovery • Safety visibility • A11y success • Perf budget • Learnability • Satisfaction

What to Test First
- Mobile navigation comprehension (tap targets; swipe vs tap)
- RSVP speed (sheet vs route) from each entry point (stream/widget/calendar)
- Join clarity (open vs request vs invite‑only) in each IA
- Safety affordances (report, approval) discoverability without clutter

Artifacts to Produce
- Card sort deck + labels
- Tree test tasks and baseline success paths
- Clickable Figma frames (phone + desktop) per option
- Storybook prototypes mirroring Figma frames

