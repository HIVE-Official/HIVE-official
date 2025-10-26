# 🎯 How to Prompt AI for OpenAI/Vercel/Linear Aesthetic

**Purpose**: Get AI to generate premium, polished UI components that match the tech-sleek aesthetic  
**For**: HIVE design system work

---

## 🔑 The Magic Words

### **Instead of This (Generic)**:

> "Create a button component"

### **Say This (Specific)**:

> "Create a button with **OpenAI-style polish**: solid black background, gold accent, **hover scale to 1.02**, **active scale to 0.98**, **200ms transition with [0.32, 0.72, 0, 1] easing**, and a **subtle shimmer effect on hover**. Include **all interaction states**."

---

## 📋 The Premium UI Prompting Framework

### **Formula**: Context + Style Reference + Micro-Interactions + Motion Spec

```
Create a [COMPONENT] inspired by [REFERENCE] with:
- [VISUAL DETAILS]
- [INTERACTION STATES: hover, active, focus, disabled]
- [MOTION: duration, easing, transforms]
- [ACCESSIBILITY: keyboard nav, screen reader, ARIA]
```

---

## 🎨 Sample Prompts (Copy These)

### **For Buttons**

```
Create a primary CTA button with Vercel-style polish:
- Solid gold background (#FFD700), black text
- Rounded-lg (12px)
- Hover: scale to 1.02, add gold glow shadow [0_0_20px_rgba(255,215,0,0.4)]
- Active: scale to 0.98
- Transition: 200ms with entrance easing [0.32, 0.72, 0, 1]
- Add shimmer effect that sweeps left-to-right on hover
- Include loading state with animated spinner
- Full TypeScript types and accessibility
```

### **For Cards**

```
Create an interactive card with Linear-style fluidity:
- Solid black background, hairline border (border-border/50)
- Rounded-xl (20px)
- Group hover effects: border shifts to gold/30, subtle lift (-translate-y-1), gold shadow glow
- Add gradient overlay that fades in on hover (from-primary/5)
- Smooth 300ms transitions
- Cursor pointer, full clickable area
- Ensure no layout shift on hover
```

### **For Inputs**

```
Create a text input with ChatGPT-style minimalism:
- Transparent background, bottom border only
- Border color: border/30 default, primary on focus
- Focus: add gold shadow underline [0_4px_0_0_rgba(255,215,0,0.2)]
- 300ms smooth transition
- No outline, use custom focus ring
- Placeholder text in muted-foreground
- Include label with focus animation (shrink and lift)
```

### **For Navigation**

```
Create a nav item with Linear-style active states:
- Default: text-foreground, no decoration
- Hover: text-primary with 200ms transition
- Active: text-primary with animated bottom border
  - Border slides in from center (scale-x-0 to scale-x-100)
  - Use after: pseudo-element with gold background
  - 300ms transition with smooth easing
- Include keyboard focus state with visible outline
```

### **For Modals/Dialogs**

```
Create a command menu modal like Linear's Cmd+K:
- Rounded-xl, dark background with 95% opacity
- Subtle backdrop blur (only on modal, not everywhere)
- Large shadow: [0_20px_70px_rgba(0,0,0,0.55)]
- Border: hairline white/10
- Entrance: fade + scale from 0.95 to 1.0
- Exit: reverse animation
- Use Framer Motion with 200ms entrance easing
- Include search input with focus trap
- List items with hover states (bg-accent/50)
```

### **For Loading States**

```
Create a loading skeleton with OpenAI-style shimmer:
- Background: muted/20 color
- Animated gradient shimmer that moves left-to-right
- Use linear gradient with 3 stops: transparent → white/10 → transparent
- Animation: translateX from -100% to 100%, 2s infinite
- Apply to: text lines (h-4), avatars (rounded-full), buttons (rounded-lg)
- Ensure shimmer respects border radius
- Add reduced-motion fallback (pulse instead of shimmer)
```

---

## 🎯 Key Phrases to Include

### **For Motion**

- "Use entrance easing `[0.32, 0.72, 0, 1]`"
- "200ms swift transition"
- "Scale to 1.02 on hover, 0.98 on active"
- "Smooth 300ms duration"
- "Spring animation with Framer Motion"
- "Respect reduced-motion preference"

### **For Styling**

- "Solid black background, no glass"
- "Hairline border (1px, white/10)"
- "Gold glow shadow on hover"
- "Rounded-xl (20px) corners"
- "Use design tokens, no hardcoded values"
- "Text gradient from white to white/60"

### **For Interactions**

- "Include all states: hover, active, focus, disabled"
- "Add micro-feedback on every interaction"
- "Hover should lift element (-translate-y-1)"
- "Focus should have visible gold ring"
- "Loading state with animated spinner"
- "Error state with shake animation"

### **For Accessibility**

- "Full keyboard navigation support"
- "Visible focus indicators"
- "ARIA labels for screen readers"
- "44px minimum touch targets"
- "Color contrast meets WCAG AA"

---

## 🚫 Words to AVOID (They Produce Generic UI)

### **Don't Say**:

- "Make it look nice" ❌
- "Add some animations" ❌
- "Style it" ❌
- "Make it interactive" ❌
- "Add hover effects" ❌

### **DO Say**:

- "Add 200ms scale transform on hover" ✅
- "Include entrance animation with [0.32, 0.72, 0, 1] easing" ✅
- "Use solid backgrounds with hairline borders" ✅
- "Implement full interaction state machine" ✅
- "Add gold glow shadow [0_0_20px_rgba(255,215,0,0.4)]" ✅

---

## 📐 Complete Example Prompt

### **Prompt for Premium Profile Card**

```
Create a user profile card component with Vercel-style premium polish:

LAYOUT:
- Solid black background (bg-background)
- Hairline border (border border-border/50)
- Rounded-xl (20px)
- Padding p-6
- Max width 400px

STRUCTURE:
- Avatar (64px circle) with gold ring on hover
- Name (text-h4 font-semibold text-primary)
- Handle (@username in text-caption text-muted-foreground)
- Bio (text-body-sm, max 2 lines with ellipsis)
- Stats row (followers, following - text-caption)
- Follow button (gold CTA style)

INTERACTIONS:
- Card hover: scale-[1.01], border-primary/30, gold shadow [0_0_30px_rgba(255,215,0,0.15)]
- Card transition: 300ms smooth easing [0.25, 0.1, 0.25, 1]
- Avatar hover: scale-105, add gold ring (ring-2 ring-primary)
- Button hover: scale-102, shadow intensifies
- Button active: scale-98
- Button transition: 200ms entrance easing [0.32, 0.72, 0, 1]

MOTION:
- Entrance animation: fade in + slide up 20px
- Use Framer Motion initial/animate
- Duration: 500ms with entrance easing
- Stagger children by 50ms
- Exit animation: fade out + slide down

ACCESSIBILITY:
- Full keyboard navigation
- Focus ring on all interactive elements
- ARIA labels for icons
- Semantic HTML (article, header, etc.)
- Touch target minimum 44px for button

RESPONSIVE:
- Mobile: full width, smaller padding
- Desktop: fixed width, generous spacing

TYPESCRIPT:
- Strict prop types
- Export as const component
- Include JSDoc comments
```

---

## 🔄 Refinement Prompts

### **If Output is Close But Not Perfect**:

```
Refine this component with these specific changes:
1. Make border more subtle (border-border/50 → border-border/30)
2. Increase hover scale (1.01 → 1.02)
3. Add shimmer effect on gold elements (gradient sweep animation)
4. Ensure no layout shift on hover (use transform, not margin/padding)
5. Add loading skeleton variant with shimmer
```

### **To Add Missing Polish**:

```
Add premium micro-interactions to this component:
- Shimmer gradient on hover (sweeps left-to-right, 700ms)
- Ripple effect on click (starts at cursor position)
- Haptic-like feedback (subtle bounce with spring physics)
- Smooth number counting animation for stats
- Optimistic UI update (instant feedback before API response)
```

### **To Match a Reference**:

```
Make this component match the polish level of [OpenAI ChatGPT sidebar / Vercel dashboard cards / Linear issue cards]:
- Study the motion timing (likely 200-300ms)
- Match the shadow depth
- Replicate the hover state exactly
- Use the same border treatment
- Match the spacing rhythm
```

---

## 💡 Pro Tips for Better Prompts

### **1. Be Pixel-Specific**

❌ "Add some padding"  
✅ "Add p-6 (24px) padding"

### **2. Name the Easing Curve**

❌ "Smooth animation"  
✅ "300ms transition with [0.25, 0.1, 0.25, 1] easing"

### **3. Reference Real Products**

❌ "Make it look modern"  
✅ "Match OpenAI ChatGPT's button style"

### **4. Specify All States**

❌ "Add hover effect"  
✅ "Add hover (scale-102), active (scale-98), focus (gold ring), disabled (opacity-50) states"

### **5. Include Motion Direction**

❌ "Animate it"  
✅ "Slide in from bottom, fade in simultaneously, 500ms entrance easing"

### **6. Mention Reduced Motion**

Always add: "Include reduced-motion fallback"

### **7. Request Variants**

"Also create: loading, error, success, empty variants"

---

## 📚 Reference Phrases Library

### **For Buttons**

- "Solid gold CTA with black text"
- "Scale to 1.02 on hover with 200ms swift transition"
- "Add shimmer sweep on hover"
- "Include loading spinner state"
- "Gold glow shadow on hover"

### **For Cards**

- "Hairline border that glows gold on hover"
- "Lift 4px on hover with shadow"
- "Group hover effects on child elements"
- "Gradient overlay that fades in"
- "No layout shift on interaction"

### **For Inputs**

- "Bottom border only, no background"
- "Gold underline shadow on focus"
- "Floating label animation"
- "Clear button with fade-in on value"
- "Error state with shake animation"

### **For Layout**

- "Generous whitespace, not cramped"
- "4px base spacing unit"
- "Max content width 3xl"
- "Sticky header with blur background"
- "Centered layout with side padding"

### **For Typography**

- "Text gradient from white to white/60"
- "Tight letter spacing (-0.02em)"
- "Generous line height (1.6)"
- "Semibold headings (600 weight)"
- "Muted foreground for secondary text"

---

## 🎯 The Ultimate "Make It Premium" Prompt

When you want to elevate ANY component:

```
Take this component and apply OpenAI/Vercel-level polish:

VISUAL:
- Replace any glass effects with solid backgrounds
- Use hairline borders (1px, subtle)
- Add gold accents strategically (not everywhere)
- Ensure high contrast (white on black)
- Use generous spacing (not cramped)

MOTION:
- Add hover scale (1.01-1.02)
- Add active scale (0.98)
- Use 200ms for micro, 300ms for smooth transitions
- Apply entrance easing [0.32, 0.72, 0, 1]
- Add entrance animations (fade + slide)
- Respect reduced-motion

INTERACTION:
- All interactive elements have feedback
- Hover changes scale AND adds glow shadow
- Focus has visible gold ring
- Disabled has clear visual treatment
- Loading shows spinner or skeleton

DETAILS:
- No layout shift on any interaction
- Smooth transitions between states
- Consistent motion timing across component
- Micro-feedback on every click/tap
- Optimistic updates where applicable

QUALITY:
- Full TypeScript types
- Accessibility compliant (WCAG AA)
- Keyboard navigable
- Mobile responsive
- Production-ready code
```

---

## 🚀 Quick Reference Card

**Copy this for every component request:**

```
Style: [OpenAI/Vercel/Linear]-inspired
Background: Solid black, no glass
Borders: Hairline (1px), subtle
Accent: Gold strategic highlights
Motion: 200ms hover, 300ms transitions, entrance easing [0.32, 0.72, 0, 1]
Interaction: Scale on hover/active, gold glow, micro-feedback
States: Default, hover, active, focus, disabled, loading, error
A11y: Keyboard nav, visible focus, ARIA labels, WCAG AA
Polish: Shimmer effects, smooth animations, no layout shift
```

---

## 💎 Example Conversation Flow

**You**:

> "I need a notification toast component"

**Better You**:

> "Create a notification toast with Vercel's elegant style: slides in from bottom-right, solid black background with hairline border, includes icon and close button, auto-dismisses after 5s with progress bar, supports success/error/info variants with color-coded left border, 200ms entrance animation with scale + fade. Make it feel premium."

**Even Better You**:

> "Create a notification toast system matching Vercel's aesthetic:
>
> **Visual**: Solid bg-background, rounded-xl, hairline border, subtle shadow, 400px max width
>
> **Variants**: Success (green left border), Error (red), Info (blue), with color-coded icon
>
> **Motion**: Slides from bottom-right, initial scale 0.95 → 1.0, fade 0 → 1, 300ms entrance easing, exit reverses animation
>
> **Features**: Auto-dismiss 5s, pauseable on hover, progress bar showing time remaining, close button, keyboard dismissible (Esc)
>
> **Interaction**: Hover pauses timer + lifts slightly, close button scales on hover, drag to dismiss with spring physics
>
> **Stack**: Multiple toasts stack with 12px gap, max 3 visible, older ones collapse
>
> **Accessibility**: Announces via screen reader, keyboard dismissible, focus trap when present
>
> Include full TypeScript implementation with Framer Motion."

---

## ✅ Checklist: Did Your Prompt Include...

Before sending, verify:

- [ ] Named a style reference (OpenAI/Vercel/Linear)
- [ ] Specified motion timing (200ms, 300ms)
- [ ] Included easing curve values
- [ ] Listed all interaction states
- [ ] Mentioned scale transforms for hover/active
- [ ] Requested shadow/glow effects
- [ ] Specified "solid backgrounds, no glass"
- [ ] Asked for reduced-motion support
- [ ] Required TypeScript types
- [ ] Mentioned accessibility needs

---

**TL;DR**: Be specific about motion timing, interaction states, and visual details. Reference real products. The more specific you are, the more premium the output will be.
