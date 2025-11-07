# Third-Party UI Sourcing Policy

Principles
- Use third-party UI primitives (shadcn/ui, Radix, etc.) only through @hive/ui wrappers.
- No direct imports of third-party UI from apps/; centralize in packages/ui.

Why
- Ensures consistent tokens, motion, a11y, and API shapes across the product.
- Enables Storybook-first workflows and visual regression testing.

Allowed
- Wrap and export curated primitives in packages/ui with Hive tokens and accessibility defaults.
- Add design-system stories and docs for every new wrapper.

Disallowed
- Direct use of third-party primitives in apps/*.
- Adding libraries that duplicate primitives already covered by @hive/ui.

Enforcement
- Code review checks in PRs
- Visual/a11y tests through Storybook and e2e
- UI guidelines compliance: UI_GUIDELINES.md

