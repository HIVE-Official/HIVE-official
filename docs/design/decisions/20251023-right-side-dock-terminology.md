Status: Accepted
Date: 2025-10-23

# Spaces Right-Side Terminology — Dock (not Rail)

Context
- Prior docs and some code refer to the Spaces right-side context area as a “rail”. This conflicted with left navigation “rail mode” and caused ambiguity.

Decision
- Use the term “Dock” for the Spaces right-side context area in all copy, specs, and UI guidelines.
- Treat “rail” as a legacy code term. Components/files may retain `rail` in identifiers until a non-breaking migration is planned.
- UI_GUIDELINES.md adds a Vocabulary section clarifying “Dock” vs “Sidebar rail mode”.

Impact
- Specs/docs updated to use “Dock” (SPACES_SHELL_LAYOUT.md, packages/ui Spaces README). Code comments updated; an alias export `Dock` points to `ContextRail` for gradual adoption.

Verification
- Storybook stories referring to Context Rail should be labeled Dock going forward.
- New PRs must use “Dock” in copy/docs. Lint/review to catch “rail” in new text.

