# HIVE UI Design & UX Psychology Foundation

> **Purpose**: Establish the visual aesthetic and UX psychology principles that inform every component in the HIVE library.

---

## 1. Target Audience: College Students (Gen Z, 18-24)

### 1.1 Behavioral Characteristics

**Attention Patterns**:

- **8-second attention span** (down from 12 seconds in 2000)
- **Scroll speed**: 3-5 screens per second on mobile
- **Decision time**: < 3 seconds to engage or bounce
- **Notification fatigue**: 80+ notifications/day from all apps

**Device Behavior**:

- **Mobile-first**: 90% of time on phones
- **Thumb zone dominance**: Bottom 1/3 of screen is "hot zone"
- **One-handed use**: 75% use phone with one hand
- **Dark mode preference**: 82% use dark mode by default

**Social Media Conditioning**:

- **Infinite scroll expectation**: Linear feeds with pull-to-refresh
- **Story format**: Ephemeral, visual-first content
- **Algorithmic trust**: Expect personalized content without asking
- **Private group preference**: 68% prefer small groups over public posting

### 1.2 Pain Points with Current Campus Tools

**Email (Institutional)**:

- Buried announcements in 200+ unread messages
- No social proof ("Who else is going?")
- Formal tone feels disconnected from campus life

**GroupMe/Discord (Student-run)**:

- Notification chaos (100+ messages/hour)
- Lost announcements in chat scroll
- No event management or RSVP
- Organizer burnout from manual reminders

**Instagram/TikTok (Social)**:

- Great for discovery, terrible for coordination
- DMs get lost in direct messages
- No structured tools (forms, polls, event management)

### 1.3 What Students Actually Want

From user research (UB students, Oct 2024):

1. **"I want to know what's happening tonight without checking 5 apps"**

   - Single source of truth for campus events
   - Real-time, not buried in email

2. **"I want to see who else is going before I commit"**

   - Social proof > marketing copy
   - FOMO is real, but so is anxiety about going alone

3. **"I want to find my people without awkward DMs"**

   - Interest-based discovery (not just major/year)
   - Low-stakes ways to join conversations

4. **"I want tools that actually help, not more clutter"**

   - Forms that pre-fill my info
   - Polls that close automatically
   - Reminders I don't have to set manually

5. **"I want it to feel like MY school, not another corporate app"**
   - Campus-specific (not generic)
   - Student-run vibe, not admin-controlled

---

## 2. UX Psychology Principles

### 2.1 Cognitive Load Management

**Problem**: Students are cognitively overloaded (classes, work, social, clubs)

**Design Response**:

- ✅ **Progressive disclosure**: Show essentials first, details on demand
- ✅ **Recognition over recall**: Icons + labels, not icon-only
- ✅ **Defaults that work**: Pre-fill forms, smart suggestions
- ✅ **Error prevention**: Disable invalid actions, not error messages after
- ❌ **Avoid**: Multi-step flows, wizards, "getting started" tutorials

**Example**:

```
❌ BAD: "Create Event" → 12-field form → Save
✅ GOOD: "Create Event" → Title + Time (2 fields) → Save → Edit details later
```

### 2.2 Social Proof & FOMO

**Problem**: Students fear missing out but also fear awkward solo arrival

**Design Response**:

- ✅ **Who's going**: Show RSVP'd members with avatars (max 5, then "+12 more")
- ✅ **Activity indicators**: "23 people viewed this in the last hour"
- ✅ **Presence**: "Sarah, Alex, and 5 others are here now" (online members)
- ❌ **Avoid**: Empty states that say "Be the first!" (creates anxiety)

**Example**:

```
Event Card:
┌─────────────────────────────┐
│ TypeScript Workshop         │
│ Tonight, 7pm • Davis 101    │
│                             │
│ 🟢🟢🟢🟢🟢 +18 going          │ ← Social proof
│ Sarah, Alex, Jordan...      │ ← Familiar faces
│                             │
│ [RSVP: Going]   [Maybe]     │
└─────────────────────────────┘
```

### 2.3 Friction vs. Flow

**Problem**: Students abandon flows with >2 taps or unclear next steps

**Design Response**:

- ✅ **One-tap actions**: RSVP, vote, react (no confirmation dialogs)
- ✅ **Inline editing**: Click to edit, auto-save (no "Edit" button)
- ✅ **Forgiving undo**: "Undo RSVP" (5 sec toast), not "Are you sure?"
- ✅ **Persistent CTAs**: Sticky "Join Space" button, not buried in header
- ❌ **Avoid**: Modal dialogs, multi-step confirmations, "success" screens

**Tap Budget**:

- **Browse**: 0 taps (auto-load feed)
- **Engage**: 1 tap (RSVP, vote, react)
- **Create**: 2 taps (open composer → post)
- **Settings**: 3 taps max (nav → section → edit)

### 2.4 Trust & Safety Balance

**Problem**: Students want freedom but need protection from harassment/spam

**Design Response**:

- ✅ **Quiet moderation**: Flag/report → invisible to others until reviewed
- ✅ **Soft limits**: "Whoa, 10 posts in 10 minutes? Maybe take a break 😅"
- ✅ **Leader transparency**: "This space is led by Sarah Chen (verified)"
- ✅ **Privacy defaults**: Members-only by default, opt-in to campus-wide
- ❌ **Avoid**: Public "banned" labels, aggressive warnings, corporate language

### 2.5 Habit Formation

**Problem**: Need daily engagement without being annoying

**Design Response**:

- ✅ **Variable rewards**: Feed mix (events, discussions, polls, memes)
- ✅ **Completion loops**: "3/5 friends RSVP'd to this event"
- ✅ **Streaks (subtle)**: "You've checked in to 5 events this month 🔥"
- ✅ **Notifications that add value**: "Event starts in 15 min" (not "New post!")
- ❌ **Avoid**: Daily login prompts, gamification badges, growth hacks

---

## 3. Visual Design Aesthetic

### 3.1 Core Aesthetic: "Tech Sleek, Campus Warm"

**Not LinkedIn** (corporate, sterile, transactional)
**Not Instagram** (influencer, polished, performative)
**Not Discord** (gamer, chaotic, overwhelming)

**IS HIVE**: Tech-forward meets student-run community

### 3.2 Visual Principles

#### **Chromium Foundation** (Borrowed from Linear, Notion, Arc)

- **Neutral surfaces**: bg-neutral-950, bg-card (not pure black)
- **Hairline borders**: 1px, low opacity (border-white/5)
- **Subtle elevation**: Shadows for depth, not decoration
- **Cool grays**: Blue-tinted neutrals, not warm grays
- **Monochrome dominance**: 90% grayscale, 10% gold accent

#### **Gold as "Campus Energy"** (Not decoration)

- **Primary CTA only**: "Join Space", "RSVP Going", "Post"
- **Verification badge**: Verified orgs/events
- **Pinned content**: Gold border on pinned posts
- **Active state**: Gold underline on active filter tab
- ❌ **Not used for**: All buttons, backgrounds, text

#### **Typography Hierarchy**

- **Headings**: Bold, tight line-height (1.2), uppercase labels in caption size
- **Body**: Regular, comfortable line-height (1.6), 16px base
- **Metadata**: Small (14px), muted color, uppercase tracking
- **Emphasis**: Semibold > color change (accessibility)

#### **Spacing Scale** (8px base)

- **Micro**: 4px (icon-to-label)
- **Small**: 8px (label-to-input)
- **Medium**: 16px (section spacing)
- **Large**: 24px (module spacing)
- **XL**: 32px (page margins)

#### **Motion Philosophy**

- **Instant feedback**: < 100ms (button press, toggle)
- **Transitions**: 200-300ms ease-out (drawer open, filter change)
- **Animations**: 400ms max (skeleton → content)
- **Respect prefers-reduced-motion**: Disable all decorative animation
- ❌ **Avoid**: Bounces, rotations, over-the-top entrances

### 3.3 Component Visual Patterns

#### **Cards (Primary UI Unit)**

```
┌─────────────────────────────────┐
│ META BAR (muted, small)         │ ← Author, timestamp, badges
├─────────────────────────────────┤
│                                 │
│ CONTENT (readable, spacious)    │ ← Body text, attachments
│                                 │
├─────────────────────────────────┤
│ ACTIONS (icon + label)          │ ← React, Comment, Share
└─────────────────────────────────┘
```

**Visual Specs**:

- Border: 1px solid border-white/5
- Padding: 16px (mobile), 20px (desktop)
- Border-radius: 8px (not rounded-lg, not sharp)
- Hover: border-white/10 + bg-white/2 (subtle lift)
- Active: border-gold/30 (when clicked)

#### **Buttons (Hierarchy)**

```
PRIMARY (gold):     bg-gold text-black font-semibold
SECONDARY (ghost):  border-white/10 text-foreground
TERTIARY (text):    text-muted hover:text-foreground
DESTRUCTIVE (red):  bg-red-500/10 text-red-400 border-red-500/20
```

**Touch Targets**:

- Minimum: 44px height (iOS guideline)
- Recommended: 48px (Android Material)
- Desktop: 40px (mouse precision)

#### **Badges (Status Communication)**

```
VERIFICATION:  bg-gold/10 text-gold border-gold/20
ROLE (Leader): bg-primary/10 text-primary border-primary/20
ROLE (Mod):    bg-blue-500/10 text-blue-400 border-blue-500/20
PINNED:        bg-gold/10 text-gold-400 border-gold/20
CLOSED:        bg-red-500/10 text-red-400 border-red-500/20
```

#### **Input Fields**

```
DEFAULT:  border-white/10 bg-transparent
FOCUS:    border-primary ring-primary/20
ERROR:    border-red-500 ring-red-500/20
SUCCESS:  border-green-500 ring-green-500/20
```

**Accessibility**:

- Always: Label + placeholder (not placeholder-only)
- Errors: Text below field (not just red border)
- Required: Asterisk + aria-required

---

## 4. Mobile-First Design Constraints

### 4.1 Thumb Zone Optimization

**Safe Zone (Bottom 1/3)**:

- Primary CTAs ("Join", "RSVP", "Post")
- Tab navigation
- Bottom sheet handles

**Stretch Zone (Middle 1/3)**:

- Secondary actions ("Share", "Save")
- Filter tabs
- Inline interactions (vote, react)

**Dead Zone (Top 1/3)**:

- Header (space name, back button)
- Non-interactive content
- Status indicators

### 4.2 Safe Area Insets

```css
/* iOS notch/home indicator */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);

/* Bottom nav */
padding-bottom: calc(env(safe-area-inset-bottom) + 60px);
```

### 4.3 Touch Gesture Vocabulary

**Primary Gestures**:

- **Tap**: Select, activate
- **Long press**: Context menu (not used often)
- **Swipe left**: Delete/archive (destructive)
- **Swipe right**: RSVP/react (positive)
- **Pull down**: Refresh feed
- **Pull up**: Load more

❌ **Avoid**:

- Double-tap (conflicts with zoom)
- Pinch (conflicts with browser zoom)
- Three-finger gestures (inaccessible)

---

## 5. Accessibility as Default

### 5.1 WCAG 2.1 AA Requirements

**Color Contrast**:

- Text on background: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

**Keyboard Navigation**:

- All actions accessible via Tab
- Focus visible (not outline: none!)
- Skip links for main content

**Screen Readers**:

- Semantic HTML (not div-soup)
- ARIA labels for icon-only buttons
- Live regions for dynamic content

### 5.2 Inclusive Design Choices

**Neurodiversity**:

- Avoid flashing/strobing (seizure risk)
- Provide text alternatives for all icons
- Allow users to control motion (prefers-reduced-motion)

**Motor Impairments**:

- Large touch targets (44px+)
- No hover-required actions
- Undo/redo for destructive actions

**Vision Impairments**:

- High contrast mode support
- Zoom to 200% without horizontal scroll
- Icons + text labels (not icon-only)

---

## 6. Component Design Guidelines

### 6.1 Every Component Must Have

1. **Default State**: The happy path
2. **Hover State**: Visual feedback on interactive elements
3. **Active/Pressed State**: Immediate tactile response
4. **Disabled State**: Visually distinct, with reason shown
5. **Loading State**: Skeleton or spinner (not blank)
6. **Empty State**: Helpful message + next action
7. **Error State**: Clear message + recovery action

### 6.2 Design Token Usage

**Colors**:

- Use semantic tokens: `bg-card`, `text-foreground`, `border-primary`
- ❌ Never hardcode: `bg-[#1a1a1a]`, `text-[#ffd700]`

**Spacing**:

- Use Tailwind scale: `p-4`, `gap-2`, `space-y-6`
- ❌ Never arbitrary: `p-[13px]`, `m-[7px]`

**Typography**:

- Use text scale: `text-body`, `text-caption`, `text-h3`
- ❌ Never inline styles: `fontSize: '14.5px'`

### 6.3 Interactive Feedback Checklist

For every clickable element:

- [ ] Hover state (desktop only)
- [ ] Active/pressed state (all devices)
- [ ] Focus visible (keyboard)
- [ ] Disabled state (if applicable)
- [ ] Loading state (if async action)
- [ ] Success feedback (toast, checkmark)
- [ ] Error feedback (toast, inline message)

---

## 7. Anti-Patterns to Avoid

### 7.1 Visual Anti-Patterns

❌ **Rainbow Buttons**: Every button has a different color
✅ **Use hierarchy**: Primary (gold), secondary (ghost), tertiary (text)

❌ **Decoration Shadows**: Drop shadows on everything
✅ **Use purposefully**: Elevation for dialogs, cards on hover

❌ **Icon Soup**: Icons without labels
✅ **Use both**: Icon + label for clarity

❌ **Walls of Text**: Paragraphs in UI
✅ **Use hierarchy**: Headings, bullet points, short paragraphs

### 7.2 UX Anti-Patterns

❌ **Confirmation Dialogs**: "Are you sure?" for every action
✅ **Use undo**: 5-second toast with "Undo" button

❌ **Success Screens**: Full page "Success!" after action
✅ **Use inline**: Toast notification, stay on page

❌ **Placeholder-only Forms**: No labels
✅ **Use labels**: Always visible, placeholder is hint

❌ **Infinite Options**: Dropdowns with 50+ items
✅ **Use search**: Searchable select, auto-complete

---

## 8. Design System Tiers

### Tier 1: Primitives (Shadcn UI)

- Button, Input, Select, Checkbox, Radio, Toggle
- Card, Badge, Avatar, Separator
- Dialog, Sheet, Popover, Tooltip
- ✅ **Use as-is**: Already styled to HIVE brand

### Tier 2: Patterns (HIVE Molecules)

- FormField (label + input + error)
- SearchInput (input + icon + clear)
- AvatarGroup (overlapping avatars)
- ✅ **Build once**: Compose from Tier 1

### Tier 3: Components (HIVE Organisms)

- BoardCard variants (Standard, Event, Poll)
- Widgets (Events, Community, Resources)
- Modules (Calendar, Members, Settings)
- ✅ **Build carefully**: Domain-specific, stateful

---

## 9. Implementation Checklist (Per Component)

Before marking a component "Done":

**Design**:

- [ ] Figma mockup reviewed by designer (if applicable)
- [ ] Matches HIVE aesthetic (neutral + gold accent)
- [ ] Mobile and desktop layouts defined
- [ ] All 7 states designed (default, hover, active, disabled, loading, empty, error)

**Code**:

- [ ] TypeScript types from domain contracts
- [ ] All states implemented
- [ ] Responsive breakpoints (sm, md, lg)
- [ ] Accessibility attributes (ARIA, semantic HTML)
- [ ] Analytics hooks (onView, onAction)

**Storybook**:

- [ ] Story shows all states
- [ ] Interactive controls for props
- [ ] A11y addon passes
- [ ] Mobile viewport tested
- [ ] Design dials verified (density, glass, elevation)

**Documentation**:

- [ ] Component purpose clear
- [ ] Props documented (JSDoc)
- [ ] Usage examples in story

---

## 10. Success Metrics

A component library succeeds when:

**Velocity**:

- Engineers ship features 3x faster (using library vs. custom)
- Designers spend 50% less time on redlines (tokens handle it)

**Consistency**:

- 95% of UI uses library components (not one-offs)
- Visual QA takes minutes, not hours

**Accessibility**:

- 100% WCAG 2.1 AA compliance
- Zero accessibility regressions in QA

**User Satisfaction**:

- Students say "This feels like my school"
- Time-to-task completion < 3 seconds (browse → engage)
- Daily active users return because it's useful, not annoying

---

> **Next Steps**: Use this document to inform every component decision. When in doubt, refer to Section 2 (UX Psychology) and Section 3 (Visual Aesthetic).
>
> **Last Updated**: Jan 2025





