# HIVE Component Library Completion Roadmap

**Philosophy**: Build for the **core loop first** (Feed → Spaces → Profile), then expand.
**Standard**: Dark monochrome with gold accents, 2025 tech platform aesthetic.
**Launch Date**: October 1st, 2025

---

## Current State (Baseline)

- ✅ **46 shadcn/ui atoms** installed and functional
- ✅ **30 molecules** exist but need dark monochrome styling applied
- ✅ **27 organisms** exist but need dark monochrome styling applied
- ✅ **Design tokens aligned** (styles.css + Tailwind config)
- ✅ **Dark monochrome standards defined** (MONOCHROME_DESIGN_SYSTEM.md + Quick Ref)

**Gap**: Components use generic Tailwind classes, not enforcing dark monochrome aesthetic.

---

## Phase 1: Core Atoms Polish (1-2 days)

**Goal**: Ensure all core atoms follow dark monochrome standards out of the box.

### 1.1 Form Controls (Priority: Critical)
**Components**:
- `button.tsx` - Apply dark monochrome variants (white primary, outline, gold CTA, ghost)
- `input.tsx` - Dark backgrounds, 12% white borders, white text
- `textarea.tsx` - Match input styling
- `select.tsx` - Dark dropdown, white/8 borders
- `checkbox.tsx` - Dark variant, gold checked state
- `switch.tsx` - Dark variant, gold active state

**Success Criteria**:
- Default button is white/black (not shadcn blue)
- All inputs have `bg-[#0c0c0c]` and `border-white/12`
- Focus rings are gold (`#FFD700`)
- Hover states brighten borders to `white/50`

**Story Updates**: Refactor Button.stories.tsx, Input.stories.tsx to show all dark variants

---

### 1.2 Feedback Components (Priority: High)
**Components**:
- `card.tsx` - Default to `bg-[#0c0c0c]` with `border-white/8`
- `badge.tsx` - Dark variants (outline, gold leader badge)
- `alert.tsx` - Dark backgrounds, white text, gold/red/blue borders
- `skeleton.tsx` - Dark shimmer effect (white/5 → white/10)
- `progress.tsx` - Dark track, gold fill

**Success Criteria**:
- Cards use elevated surface color (#0c0c0c) by default
- Badges don't have colored backgrounds (outline only)
- Gold badges exist for leader/verification use cases

---

### 1.3 Overlay Components (Priority: Medium)
**Components**:
- `dialog.tsx` - Dark backdrop, #0c0c0c content, white/8 border
- `popover.tsx` - Match dialog styling
- `tooltip.tsx` - Dark background, white text, subtle border
- `sheet.tsx` - Dark slide-over panel

**Success Criteria**:
- All overlays have dark backgrounds (not white)
- Backdrop is `bg-black/80` (not gray)

---

## Phase 2: Core Loop Molecules (2-3 days)

**Goal**: Style the 20 molecules used in Feed → Spaces → Profile flow.

### 2.1 Feed Components (Priority: Critical)
**Refactor for Dark Monochrome**:
- `feed-post-card.tsx` - Dark card, white text, gold for promoted posts, white/8 borders
- `feed-event-card.tsx` - Dark background, gold accent for urgency, time hierarchy
- `feed-filters.tsx` - Dark buttons, outline style, gold for active filter
- `comment-card.tsx` - Nested dark cards, white text, subtle borders
- `comment-input.tsx` - Dark input, white placeholder, white/12 border

**Success Criteria**:
- Feed cards are dark (#0c0c0c) with minimal borders
- Promoted posts have gold border (`border-[#FFD700]/50`)
- All text is white with proper hierarchy (white → 80% → 60%)
- Engagement buttons (heart, comment) are white/20 borders

**Story Updates**: Feed.stories.tsx should show dark feed with mixed content types

---

### 2.2 Space Components (Priority: Critical)
**Refactor for Dark Monochrome**:
- `space-card.tsx` - Dark card, emoji prominent, member count white/60, hover brightens border
- `space-composer-with-tools.tsx` - Dark input area, white text, subtle dividers
- `inline-tool-menu.tsx` - Dark dropdown, white/8 borders, gold for HiveLab tools
- `discoverable-space-card.tsx` - Dark with category badge, member previews

**Success Criteria**:
- Space cards are visually consistent (dark, minimal borders, emoji focus)
- HiveLab tools have gold accent borders
- Composer uses dark backgrounds with white text
- All space cards have hover state (border brightens to white/50)

**Story Updates**: Spaces.stories.tsx shows dark space discovery + joined spaces

---

### 2.3 Profile Components (Priority: High)
**Refactor for Dark Monochrome**:
- `user-card.tsx` - Dark card, avatar prominent, white name, white/60 bio
- `stat-card.tsx` - Dark background, large white numbers, white/60 labels
- `stat-grid.tsx` - Grid with white/10 dividers
- `activity-timeline.tsx` - Dark timeline, white dots, white/60 timestamps
- `photo-carousel.tsx` - Photos pop against dark background, white nav buttons

**Success Criteria**:
- Profile components emphasize content (photos, avatars) against dark
- Stats are high-contrast (large white numbers)
- Timeline has subtle white/8 connecting lines
- Avatars have white/20 border (not colored)

**Story Updates**: Profile.stories.tsx shows complete dark profile layout

---

### 2.4 Shared Utilities (Priority: Medium)
**Refactor for Dark Monochrome**:
- `search-bar.tsx` - Dark input, white/40 icon, white/12 border, white/50 on focus
- `notification-item.tsx` - Dark card, white text, gold dot for unread
- `rituals-card-strip.tsx` - Horizontal scroll, dark cards, gold accents

**Success Criteria**:
- Search is dark with white text and icons
- Notifications use gold dots for unread state
- Rituals cards have gold borders for active campaigns

---

## Phase 3: Core Loop Organisms (2-3 days)

**Goal**: Compose dark monochrome layouts from polished molecules.

### 3.1 Profile Organisms
**Refactor for Dark Monochrome**:
- `profile-header.tsx` - Dark background, white name (3xl), photo carousel prominent, white/60 bio
- `connection-list.tsx` - Dark cards, avatars prominent, white names, white/60 handles
- `profile-widgets.ts` - Ensure all widgets use dark theme

**Success Criteria**:
- Profile page is cohesive dark monochrome
- Photos/avatars are visual focal points (content provides color)
- Text hierarchy is clear (white → 80% → 60%)

---

### 3.2 Space Organisms
**Refactor for Dark Monochrome**:
- `space-header.tsx` - Dark header, white title, gold leader badge, member count white/60
- `space-post-feed.tsx` - Dark cards, chronological posts, white text
- `space-events-panel.tsx` - Dark cards, gold event indicators, white time
- `space-members-panel.tsx` - Dark cards, avatars grid, white names
- `space-leader-toolbar.tsx` - Dark toolbar, white/20 button outlines, gold for special actions

**Success Criteria**:
- Space page has consistent dark aesthetic
- Leader tools use gold accents to indicate elevated permissions
- Member list is scannable (avatars + white names)

---

### 3.3 Navigation & Shell
**Refactor for Dark Monochrome**:
- `navigation-shell.tsx` - Dark nav, white icons, gold for active route, white/8 dividers

**Success Criteria**:
- Nav is minimal (true black background, white icons)
- Active state uses gold accent or white background
- Mobile nav slides from dark background

---

## Phase 4: Secondary Features (1-2 days)

**Goal**: Apply dark monochrome to rituals, HiveLab, notifications.

### 4.1 HiveLab Components (Priority: Medium - Post-launch)
**Refactor for Dark Monochrome**:
- `hivelab-builder-canvas.tsx` - Dark canvas, white/8 grid, elements have white borders
- `hivelab-template-browser.tsx` - Dark cards, gold borders for templates
- `hivelab-element-library.tsx` - Dark sidebar, white icons, gold for active
- `hivelab-properties-panel.tsx` - Dark panel, white inputs, white/10 dividers
- `hivelab-analytics-dashboard.tsx` - Dark background, white text, gold accents for metrics

**Success Criteria**:
- HiveLab has distinct gold accent identity (border-[#FFD700]/50)
- Canvas is dark with subtle grid (white/5)
- All panels use dark backgrounds with white text

---

### 4.2 Rituals Components (Priority: Low - Post-launch)
**Refactor for Dark Monochrome**:
- All ritual-related molecules inherit dark monochrome from atoms
- Gold accents for active campaigns
- White/60 for metadata (dates, participant counts)

---

## Testing & Validation

### Storybook Audit
**Action**: Review all .stories.tsx files and ensure:
1. Default story shows dark background (`bg-black` decorator)
2. All variants are demonstrated (default, hover, active, disabled)
3. Gold accents are used appropriately (not everywhere)
4. Text hierarchy is visible (white → 80% → 60%)

**Tools**:
```bash
pnpm storybook  # Run local Storybook
# Navigate through each component story
# Verify dark aesthetic is consistent
```

---

### Production Readiness Checklist

For each component, verify:
- [ ] Uses dark backgrounds (`bg-black` or `bg-[#0c0c0c]`)
- [ ] Text is white with opacity variants for hierarchy
- [ ] Borders use white/8, white/12, or white/20 (not gray-X)
- [ ] Hover states brighten borders to white/50
- [ ] Focus rings are gold with halo effect
- [ ] Gold accents used sparingly (leaders, verification, high-intent CTAs)
- [ ] Component works on mobile (test in Storybook with viewport addon)
- [ ] Accessible (keyboard navigation, focus visible, WCAG AA contrast)

---

## Success Metrics

### Visual Consistency
- All components pass the "squint test" - look like they belong to the same system
- Gold accents are rare and impactful (< 5% of UI elements)
- Borders are subtle and minimal (not heavy/thick)

### Performance
- Storybook loads in < 3 seconds
- Component re-renders are optimized (React.memo where appropriate)
- No layout shift (CLS < 0.1)

### Developer Experience
- Components can be composed easily (atoms → molecules → organisms)
- Dark monochrome patterns are copy-pasteable from Quick Ref
- Storybook stories serve as living documentation

---

## Estimated Timeline

| Phase | Focus | Days | Priority |
|-------|-------|------|----------|
| Phase 1 | Core Atoms | 1-2 days | Critical |
| Phase 2 | Feed/Spaces/Profile Molecules | 2-3 days | Critical |
| Phase 3 | Complete Layouts (Organisms) | 2-3 days | High |
| Phase 4 | HiveLab/Rituals Polish | 1-2 days | Medium |
| **Total** | **End-to-end dark monochrome** | **6-10 days** | — |

**Launch Blocker**: Phases 1-3 must be complete. Phase 4 can ship post-October 1st.

---

## Next Steps (Start Here)

1. **Pick a component** from Phase 1.1 (suggest: `button.tsx`)
2. **Read the Quick Ref** (DARK_MONOCHROME_QUICK_REF.md)
3. **Apply dark monochrome patterns** (update variants)
4. **Update Storybook story** to show all dark variants
5. **Test in Storybook** - verify it looks like Linear/Vercel/Arc
6. **Repeat** for all Phase 1 components

Once Phase 1 is done, the patterns will be established and Phases 2-3 will move faster (molecules/organisms just compose from atoms).

---

**Remember**: Less is more. Dark backgrounds, white text, subtle borders, gold sparingly. Let content (photos, emojis) provide the color.
