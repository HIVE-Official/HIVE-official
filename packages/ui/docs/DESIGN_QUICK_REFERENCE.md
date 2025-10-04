# 🎯 HIVE Design Quick Reference

**One-page visual guide to locked design standards**

---

## 📝 Typography

### Font Family
```
Primary: Geist Sans (all UI text)
Mono: Geist Mono (code only)
```

### Size Scale (Most Used)
```
text-xs  (12px) ████████████████████ 49% - Metadata, timestamps
text-sm  (14px) ████████████████     40% - DEFAULT BODY TEXT ⭐
text-lg  (18px) ███                   3% - Card titles
text-2xl (24px) ██                    2% - Page titles
```

### Weight Scale (Most Used)
```
font-medium    (500) ████████████████████ 45% - Buttons, labels ⭐
font-semibold  (600) ████████████████     40% - ALL headings ⭐
font-bold      (700) ███████              13% - Titles, metrics
```

### Standard Patterns
| Element | Size | Weight | Example |
|---------|------|--------|---------|
| **Button** | `text-sm` | `font-medium` | Default |
| **Body** | `text-sm` | (normal) | Default |
| **Metadata** | `text-xs` | (normal) | Timestamps |
| **Card Title** | `text-lg` | `font-semibold` | Headers |
| **Page Title** | `text-2xl` | `font-bold` | H1 |

---

## 🎨 Icons

### Library
```
✅ Lucide React (ALL new components)
⚠️  Radix UI Icons (existing shadcn atoms only)
```

### Standard Sizes
| Usage | Class | Size |
|-------|-------|------|
| **Default** | `h-4 w-4` | 16px ⭐ |
| Icon buttons | `h-5 w-5` | 20px |
| Features | `h-6 w-6` | 24px |

### Most Used Icons
```typescript
// Navigation
Home, Search, Bell, Settings, Menu, X, ChevronDown

// Social
Heart, MessageCircle, Share2, Users, Star

// Status
CheckCircle2, AlertCircle, Loader2, Clock

// Campus
GraduationCap, Calendar, MapPin, Building
```

### Standard Pattern
```typescript
// With text
<Button>
  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
  Send
</Button>

// Icon only
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings className="h-5 w-5" aria-hidden="true" />
</Button>
```

---

## 🎬 Animation

### Duration (Apple-Inspired)
| Token | Time | Usage |
|-------|------|-------|
| `fast` | **250ms** | Hover, focus ⭐ |
| `smooth` | **400ms** | DEFAULT - modals, pages ⭐ |
| `slow` | 600ms | Onboarding |

### Easing
| Token | Usage |
|-------|-------|
| `ease-smooth` | **Default - cubic-bezier(0.25, 0.1, 0.25, 1)** ⭐ |
| `ease-liquid` | Page transitions - cubic-bezier(0.42, 0, 0.58, 1) |
| `ease-gentle` | Modals - cubic-bezier(0.16, 1, 0.3, 1) |

### Standard Transitions
```typescript
// Default interactive
className="transition-all duration-smooth ease-smooth"

// Hover state
className="hover:scale-102 duration-fast"

// Loading spinner
<Loader2 className="h-4 w-4 animate-spin" />
```

---

## 🎨 Colors

### Monochrome Scale
```
Background:  #000000  (true black, OLED optimized)
Card/Input:  #121212  (surface level)
Modal:       #1A1A1C  (elevated)

Text:        #FFFFFF  (primary)
Secondary:   #A1A1AA  (muted-foreground)
Tertiary:    #71717A  (labels)
```

### Primary Accent
```
Gold:        #FFD700  (HIVE brand - use strategically)
On Gold:     #09090B  (text on gold background)
```

### Semantic
```
Error:       #EF4444  (destructive)
Success:     #22C55E  (green-500)
Warning:     #F59E0B  (amber-500)
Info:        #3B82F6  (blue-500)
```

### Usage Rules
```typescript
// ✅ ALWAYS use semantic classes
text-foreground         // primary text
text-muted-foreground  // secondary text
bg-primary             // gold accent
text-destructive       // errors

// ❌ NEVER use arbitrary colors
text-[#FF0000]  // NO!
bg-[#FFD700]    // NO!
```

---

## 📏 Spacing

### Common Gaps
```
space-y-1  (4px)   - Tight grouping
space-y-2  (8px)   - Related items ⭐
space-y-4  (16px)  - Section spacing ⭐
space-y-6  (24px)  - Component spacing
```

### Component Padding
```
Card:    p-6  (24px)
Modal:   p-8  (32px)
Button:  px-4 py-2  (16px × 8px)
Input:   px-3 py-2  (12px × 8px)
```

### Touch Targets
```
Minimum: 44px (iOS/Android standard)

Button:     h-10  (40px + border = 44px) ✅
Icon btn:   h-10 w-10  (meets standard) ✅
```

---

## ✅ Component Checklist

### EVERY Component Must Have:
- [ ] Geist Sans font (implicit or `font-sans`)
- [ ] Lucide React icons (NOT Radix)
- [ ] Semantic colors (NO hex values)
- [ ] Standard type scale (`text-sm`, `font-medium`)
- [ ] Proper icon size (`h-4 w-4` default)
- [ ] Apple timing (400ms default)
- [ ] 44px touch target minimum
- [ ] aria-label on icon-only buttons
- [ ] Semantic HTML (`<h1>`, `<button>`, etc.)

### Design Approval Required For:
- ❌ Icons outside standard set
- ❌ Custom animation timing
- ❌ Arbitrary colors
- ❌ Font sizes outside scale
- ❌ Touch targets below 44px
- ❌ Text below 12px

---

## 🚀 Copy-Paste Templates

### Button
```typescript
<Button className="text-sm font-medium">
  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
  Send Email
</Button>
```

### Card
```typescript
<Card className="p-6">
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">Card Title</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
</Card>
```

### Loading State
```typescript
<Button disabled={isLoading} className="text-sm font-medium">
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

### Icon Button
```typescript
<Button variant="ghost" size="icon" aria-label="Open settings">
  <Settings className="h-5 w-5" aria-hidden="true" />
</Button>
```

### Interactive Icon
```typescript
<Heart
  className={cn(
    "h-5 w-5 transition-colors duration-fast",
    liked ? "text-destructive fill-current" : "text-muted-foreground"
  )}
/>
```

---

## 🚨 Common Mistakes

### ❌ WRONG → ✅ CORRECT

**Typography:**
```typescript
// ❌ <Button className="text-base">
✅ <Button className="text-sm font-medium">

// ❌ <h3 className="text-lg">
✅ <h3 className="text-lg font-semibold">
```

**Icons:**
```typescript
// ❌ import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
✅ import { Search } from "lucide-react"

// ❌ <Search className="h-3 w-4" />
✅ <Search className="h-4 w-4" />
```

**Animation:**
```typescript
// ❌ className="transition-all duration-100"
✅ className="transition-all duration-smooth ease-smooth"
```

**Colors:**
```typescript
// ❌ className="text-[#666]"
✅ className="text-muted-foreground"
```

---

## 📚 Full Documentation

- **Complete Standards:** `DESIGN_STANDARDS_LOCKED.md`
- **Typography Guide:** `TYPOGRAPHY_GUIDE.md`
- **Icon Guide:** `ICON_USAGE_GUIDE.md`
- **Animation System:** `HIVE_ANIMATION_SYSTEM.md`

---

**🔒 Standards Locked - Do Not Deviate**
**Last Updated:** 2025-10-02
