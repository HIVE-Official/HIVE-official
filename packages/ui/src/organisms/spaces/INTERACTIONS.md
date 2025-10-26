# HIVE Spaces - Interaction Design System

**Tech Sleek Interactive Language** - Inspired by Apple's fluidity, Vercel's polish, Resend's clarity

## Philosophy

Every interaction should feel:

- **Responsive** - Immediate visual feedback
- **Fluid** - Smooth, natural motion
- **Intentional** - Purposeful, not gratuitous
- **Subtle** - Refined, not overwhelming

## Core Interaction Patterns

### 1. Elevation System

**Concept**: Elements lift off the surface when interactive

```
Rest State → Hover → Active
- No shadow → Soft shadow → Slightly compressed
- No lift → -0.5px translate → Scale 0.99
- Static border → Glowing border → Pressed state
```

**Implementation**:

- Feed cards lift up (`-translate-y-0.5`)
- Shadow blooms outward (`shadow-lg shadow-primary/5`)
- Border glows (`border-primary/40`)
- Returns smoothly on mouseout

### 2. Icon Micro-animations

**Concept**: Icons hint at their action through playful movement

**Patterns**:

- **Rotate** (12°): Actions that "add" or "create" (UserPlus, MessageSquare)
- **Scale** (110%): Actions that "open" or "expand" (Calendar, BarChart3)
- **Fill**: Actions that "love" or "save" (Heart fills on hover)

**Why**: Subtle movement creates delight without distraction

### 3. Avatar Interactions

**Concept**: Profile images become portals to identity

**Sequence**:

1. Hover: Scale 110% + ring glow (ring-2 ring-primary/20)
2. Name shifts to accent color
3. Entire card elevates as group

**Effect**: User feels drawn to explore the person

### 4. Composer Intelligence

**Concept**: Input field beckons you to contribute

**Sequence**:

1. Hover avatar: Scales up 110% - "Your turn!"
2. Input field: Glows, shadow blooms, text brightens
3. Post type buttons: Icons animate, backgrounds tint on hover

**Feel**: Inviting, not demanding

### 5. CTA (Call-to-Action) Emphasis

**Concept**: Primary actions demand attention through confidence

**Join Button**:

- Rest: Solid, present
- Hover: Scale 105% + shadow bloom + icon rotates
- Active: Scale 95% - tactile "press"
- Disabled: Muted but maintains presence

**Why**: The most important action should feel the most rewarding

### 6. Content Cards (Feed Items)

**Concept**: Each post is a living entity

**Interaction Layers**:

1. **Card as whole**: Clickable, lifts, glows
2. **Action buttons**: Nested interactions - stopPropagation
   - Comment: Blue accent theme
   - React: Red with heart fill
   - Pin: Leader-only, subtle scale
3. **Group effects**: Icons scale when card hovers

**Result**: Rich, layered interactivity without confusion

### 7. Event Cards in Rail

**Concept**: Upcoming events pulse with anticipation

**Sequence**:

- Hover: Lift + border glow + title color shift
- Active: Slight scale down
- Duration: 300ms for weightier feel (they're important!)

### 8. Member Cards

**Concept**: Each person is an interactive profile preview

**Hover Sequence**:

1. Avatar scales + ring appears
2. Name shifts to accent color
3. Entire card slides left 4px
4. Background tints

**Why**: Multi-element choreography feels premium

### 9. Edit Mode Fluidity

**Concept**: Editing feels playful and immediate

**Tag Removal**:

- Tag: Scales on hover
- X button: Scales 110% + color shift
- Active: Quick scale down

**Link Editing**:

- Icon bounces on hover
- Delete button has destructive feel

## Timing Standards

```
Ultra-fast:  100ms - Color changes only
Quick:       200ms - Icon transforms, text colors
Standard:    300ms - Card elevation, complex transitions
Deliberate:  400ms - Major state changes
```

## Easing Curves

- **ease-out**: Default (natural deceleration)
- **ease-in-out**: Reserved for reversible actions
- **No linear**: Feels robotic, avoid

## Active States (Click Feedback)

```
Cards:      scale-[0.99]  - Subtle press
Buttons:    scale-95      - Clear tactile
Major CTA:  scale-95      - Confident press
Icons:      Inherit from parent button
```

## Color on Interaction

- **Hover**: Accent color at reduced opacity (e.g., `primary/10` background)
- **Focus**: Full accent color
- **Active**: Slightly darker than hover
- **Transitions**: Always smooth, never instant

## Accessibility

All interactions maintain:

- **Keyboard navigation**: Focus rings visible
- **Screen readers**: ARIA labels unchanged
- **Reduced motion**: Respect `prefers-reduced-motion`
- **Touch targets**: Minimum 44x44px
- **Visual clarity**: Never rely on interaction alone

## Performance

- **CSS transforms only**: No layout thrashing
- **GPU-accelerated**: transform, opacity
- **Avoid**: width, height, top, left changes
- **Will-change**: Only when necessary, remove after

## Testing Checklist

For each new interactive component:

- [ ] Hover state is clear and intentional
- [ ] Active/click feedback exists
- [ ] Transition timing feels natural (not too fast/slow)
- [ ] Icon animations don't feel gimmicky
- [ ] Works on touch (hover = tap on mobile)
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Doesn't conflict with parent/child interactions
- [ ] stopPropagation used where needed
- [ ] Performance is smooth (60fps)

---

**Remember**: Interactions should feel like magic, not mechanics. Every hover, every click should reinforce that HIVE is thoughtfully crafted.





