# Dark Monochrome Quick Reference

**Last Updated**: October 2024
**Use this**: Quick copy-paste patterns for building HIVE components

---

## Color Classes (Copy-Paste Ready)

### Backgrounds
```tsx
bg-black              // True black (#000) - primary background
bg-[#0c0c0c]         // Elevated surface (cards, modals) - hive-obsidian
bg-[#1a1a1a]         // More elevated (popovers, dropdowns)
bg-white/5           // Subtle hover background
bg-white/10          // Stronger hover background
```

### Text
```tsx
text-white           // Primary headings, emphasis
text-white/80        // Secondary text, descriptions
text-white/60        // Tertiary text, metadata
text-white/40        // Disabled states, placeholders
```

### Borders
```tsx
border-white/8       // Default subtle border (Linear-style)
border-white/12      // Input borders (slightly stronger)
border-white/20      // Button outlines
border-white/50      // Hover state (brighter)
border-white         // Full hover (maximum emphasis)
```

### Gold Accents (Use Sparingly)
```tsx
// Leader badges, verification
border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700]

// Gold glow effect
hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]

// Focus rings
focus:ring-2 focus:ring-[#FFD700]/50
```

---

## Component Patterns

### Standard Card
```tsx
<Card className="bg-[#0c0c0c] border border-white/8">
  <CardContent className="p-6">
    <h3 className="text-lg font-semibold text-white mb-2">Heading</h3>
    <p className="text-sm text-white/70">Description text</p>
  </CardContent>
</Card>
```

### Interactive Card (Hover Effects)
```tsx
<Card className="bg-[#0c0c0c] border border-white/8 hover:border-white/50 hover:bg-white/5 transition-all duration-300 cursor-pointer">
  {/* Content */}
</Card>
```

### Gold Accent Card (HiveLab, Special Features)
```tsx
<Card className="bg-[#0c0c0c] border-2 border-[#FFD700]/50 bg-[#FFD700]/5">
  {/* Special content */}
</Card>
```

### Primary Button
```tsx
<Button className="bg-white text-black hover:bg-white/90 border border-white">
  Primary Action
</Button>
```

### Outline Button
```tsx
<Button variant="outline" className="border border-white/20 text-white hover:bg-white hover:text-black">
  Secondary Action
</Button>
```

### Gold CTA Button (High-Intent Only)
```tsx
<Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 border border-[#FFD700]">
  Join Space
</Button>
```

### Ghost Button
```tsx
<Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
  Tertiary Action
</Button>
```

### Leader Badge (Gold)
```tsx
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/50">
  <svg className="h-3.5 w-3.5" fill="#FFD700">{/* Star icon */}</svg>
  <span className="text-xs font-semibold text-white">Space Leader</span>
</div>
```

### Standard Badge
```tsx
<Badge variant="outline" className="border-white/20 text-white">
  Label
</Badge>
```

### Stats Display
```tsx
<div className="grid grid-cols-4 divide-x divide-white/10">
  <div className="text-center px-3">
    <p className="text-3xl font-bold text-white">234</p>
    <p className="text-xs text-white/60 uppercase tracking-wide">Connections</p>
  </div>
</div>
```

### Input Field
```tsx
<Input
  className="bg-[#0c0c0c] border-white/12 text-white placeholder:text-white/40 focus:border-white/50"
  placeholder="Enter text..."
/>
```

### Search Bar
```tsx
<div className="relative">
  <Input
    className="bg-[#0c0c0c] border-white/12 text-white pl-10"
    placeholder="Search..."
  />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40">
    {/* Search icon */}
  </svg>
</div>
```

---

## Typography Hierarchy

```tsx
// Page heading
<h1 className="text-3xl font-bold text-white tracking-tight">Page Title</h1>

// Section heading
<h2 className="text-2xl font-semibold text-white">Section</h2>

// Card heading
<h3 className="text-lg font-semibold text-white">Card Title</h3>

// Body text
<p className="text-sm text-white/80">Body paragraph text</p>

// Secondary text
<p className="text-sm text-white/60">Secondary information</p>

// Metadata / timestamps
<p className="text-xs text-white/50">2h ago</p>

// Labels (uppercase, tracked)
<label className="text-xs text-white/70 uppercase tracking-wide">Label</label>
```

---

## Spacing Patterns

```tsx
// Card padding
p-6              // Standard card padding (24px)
p-4              // Compact card padding (16px)
p-8              // Large card padding (32px)

// Section spacing
space-y-4        // Between sections (16px vertical)
space-y-6        // More generous (24px vertical)
gap-4            // Grid/flex gaps (16px)
gap-6            // Larger grid gaps (24px)
```

---

## Hover & Interaction Patterns

```tsx
// Standard transition
transition-all duration-300 ease-in-out

// Border brighten on hover
hover:border-white/50

// Background lighten on hover
hover:bg-white/5

// Full invert (button pattern)
hover:bg-white hover:text-black

// Scale on hover (icons, emojis)
hover:scale-110 transition-transform duration-300

// Gold glow on hover
hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]
```

---

## Accessibility

```tsx
// Focus rings (always include)
focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-2 focus:ring-offset-black

// Focus visible (keyboard navigation)
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
```

---

## Don'ts

❌ **Don't use:**
- Pure white backgrounds (`bg-white`) - Use `bg-[#0c0c0c]` for surfaces
- Heavy shadows - Use borders instead (`border-white/8`)
- Colored gradients - Monochrome only
- Gold everywhere - Reserve for leaders/verification/high-intent CTAs
- Gray-500, gray-600 - Use `white/60`, `white/40` instead

✅ **Do use:**
- True black `#000` for primary background
- Elevated surfaces `bg-[#0c0c0c]` for cards
- Opacity-based borders `border-white/8`
- White text with opacity for hierarchy
- Gold sparingly for emphasis

---

**Remember**: Less is more. Let content (photos, emojis, user-generated stuff) provide the color. Keep chrome minimal.
