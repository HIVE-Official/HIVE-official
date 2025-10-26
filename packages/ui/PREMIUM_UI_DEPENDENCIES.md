# 📦 Premium UI Dependencies - Complete Setup Guide

**Goal**: Install and configure the exact packages needed for OpenAI/Vercel/Linear aesthetic  
**For**: HIVE design system (@hive/ui)

---

## 🎯 Core Dependencies (Must Have)

### **1. Framer Motion** (Animation Engine)

**Why**: OpenAI, Vercel, Linear all use Framer Motion for smooth animations

```bash
pnpm add framer-motion
```

**Current Status**: ✅ Already in your package.json (version ^11.11.17)

**Usage**:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
>
  {content}
</motion.div>;
```

---

### **2. Class Variance Authority (CVA)** (Component Variants)

**Why**: Type-safe variant management (shadcn uses this)

```bash
pnpm add class-variance-authority
```

**Current Status**: ✅ Already installed

**Usage**:

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-black hover:scale-102",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

---

### **3. clsx / cn Utility** (Class Merging)

**Why**: Merge Tailwind classes cleanly (handles conflicts)

```bash
pnpm add clsx tailwind-merge
```

**Current Status**: ✅ Already have `cn` utility at `packages/ui/src/utils/cn.ts`

**Usage**:

```tsx
import { cn } from "@/utils/cn";

<div
  className={cn("base classes", condition && "conditional classes", className)}
/>;
```

---

### **4. Radix UI Primitives** (Accessible Components)

**Why**: OpenAI/Vercel use accessible primitives (Radix is industry standard)

```bash
# Install only what you need (don't install all at once)
pnpm add @radix-ui/react-dialog
pnpm add @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-popover
pnpm add @radix-ui/react-tooltip
pnpm add @radix-ui/react-slot
pnpm add @radix-ui/react-tabs
pnpm add @radix-ui/react-accordion
pnpm add @radix-ui/react-select
pnpm add @radix-ui/react-checkbox
pnpm add @radix-ui/react-radio-group
pnpm add @radix-ui/react-switch
pnpm add @radix-ui/react-slider
pnpm add @radix-ui/react-separator
```

**Current Status**: ✅ You have most of these (shadcn brings them in)

---

## 🎨 Styling Dependencies (Must Have)

### **5. Tailwind CSS** (Utility-First CSS)

**Why**: Every modern app (OpenAI, Vercel, Linear) uses Tailwind

```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm add tailwindcss-animate
```

**Current Status**: ✅ Already installed with `tailwindcss-animate`

**Config** (`tailwind.config.ts`):

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        // ... your token colors
      },
      transitionDuration: {
        swift: "200ms",
        smooth: "300ms",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.32, 0.72, 0, 1)",
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## ✨ Premium Add-Ons (Highly Recommended)

### **6. Sonner** (Toast Notifications)

**Why**: Vercel uses Sonner for toasts (better than vanilla toasts)

```bash
pnpm add sonner
```

**Current Status**: ❌ Not installed (but you have custom toast)

**Usage**:

```tsx
import { toast } from "sonner";

toast.success("Deployment complete", {
  description: "Your changes are now live",
  duration: 5000,
});
```

**Setup**:

```tsx
// app/layout.tsx
import { Toaster } from "sonner";

<Toaster
  theme="dark"
  position="bottom-right"
  toastOptions={{
    style: {
      background: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
    },
  }}
/>;
```

---

### **7. Cmdk** (Command Palette)

**Why**: Linear's Cmd+K is built with this (Vercel also uses it)

```bash
pnpm add cmdk
```

**Current Status**: ✅ Already installed (via shadcn command)

**Usage**:

```tsx
import { Command } from "cmdk";

<Command.Dialog open={open} onOpenChange={setOpen}>
  <Command.Input placeholder="Type a command..." />
  <Command.List>
    <Command.Group heading="Actions">
      <Command.Item onSelect={() => navigate("/spaces")}>
        Go to Spaces
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>;
```

---

### **8. React Hook Form** (Form Management)

**Why**: Type-safe form state (OpenAI uses for complex forms)

```bash
pnpm add react-hook-form
pnpm add @hookform/resolvers zod
```

**Current Status**: ✅ Already installed

**Usage**:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

const form = useForm({
  resolver: zodResolver(formSchema),
});
```

---

### **9. Vaul** (Bottom Sheets)

**Why**: Vercel-style mobile drawers (better than basic sheets)

```bash
pnpm add vaul
```

**Current Status**: ❌ Not installed

**Usage**:

```tsx
import { Drawer } from "vaul";

<Drawer.Root>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content>{/* Content */}</Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>;
```

---

## 🎭 Animation Add-Ons (Optional But Nice)

### **10. React Intersection Observer** (Scroll Animations)

**Why**: Trigger animations on scroll (OpenAI landing pages)

```bash
pnpm add react-intersection-observer
```

**Current Status**: ❌ Not installed

**Usage**:

```tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const { ref, inView } = useInView({ triggerOnce: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
>
  {content}
</motion.div>;
```

---

### **11. React CountUp** (Number Animations)

**Why**: Animated counters (Vercel deployment stats)

```bash
pnpm add react-countup
```

**Current Status**: ❌ Not installed (but you have custom CountUp)

**Alternative**: Use your existing `motion/count-up.tsx` ✅

---

### **12. Lottie React** (Complex Animations)

**Why**: OpenAI uses Lottie for loading states

```bash
pnpm add lottie-react
```

**Current Status**: ❌ Not installed

**When to Use**: Complex illustrations, loading animations, success states

---

## 🛠️ Developer Experience (Recommended)

### **13. Storybook** (Component Playground)

**Why**: Test components in isolation (you already have this)

```bash
# Already installed ✅
pnpm add -D @storybook/react-vite @storybook/addon-essentials
```

**Current Status**: ✅ Fully configured at v8.4.7

---

### **14. TypeScript** (Type Safety)

**Why**: All premium apps are TypeScript

```bash
pnpm add -D typescript @types/react @types/react-dom
```

**Current Status**: ✅ Already have v5.8.3

---

## 📊 Your Current Dependency Audit

Based on your `packages/ui/package.json`:

### ✅ **Already Have (Premium Stack)**:

- `framer-motion` (^11.11.17) ✅
- `class-variance-authority` ✅
- `clsx` ✅
- `tailwind-merge` ✅
- `tailwindcss` ✅
- `tailwindcss-animate` ✅
- All Radix UI primitives ✅
- `cmdk` (Command palette) ✅
- `react-hook-form` ✅

### ❌ **Missing (Recommended to Add)**:

- `sonner` (Better toasts) - **Install this**
- `vaul` (Mobile drawers) - **Install this**
- `react-intersection-observer` (Scroll animations) - **Optional**

---

## 🚀 Installation Commands

### **Quick Install (Everything You Need)**:

```bash
# Navigate to UI package
cd packages/ui

# Install missing premium dependencies
pnpm add sonner vaul

# Optional but nice
pnpm add react-intersection-observer

# Dev dependencies (if missing)
pnpm add -D @types/node
```

---

## ⚙️ Configuration Files

### **1. Create Motion Config** (`src/motion/config.tsx`)

```tsx
import { MotionConfig } from "framer-motion";

// OpenAI/Vercel motion settings
const transition = {
  type: "tween",
  duration: 0.2,
  ease: [0.32, 0.72, 0, 1], // Entrance easing
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={transition}>
      {children}
    </MotionConfig>
  );
}
```

---

### **2. Update Tailwind Config** (`tailwind.config.ts`)

```typescript
export default {
  theme: {
    extend: {
      // Add custom durations
      transitionDuration: {
        micro: "150ms",
        swift: "200ms",
        smooth: "300ms",
        deliberate: "500ms",
      },

      // Add custom easings
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.32, 0.72, 0, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },

      // Add shimmer animation
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
} satisfies Config;
```

---

### **3. Setup Sonner Toasts** (`src/providers/toast-provider.tsx`)

```tsx
"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "12px",
        },
        className: "sonner-toast",
      }}
      gap={12}
      expand={true}
      richColors
    />
  );
}
```

---

## 📦 Package.json Structure

Your `packages/ui/package.json` should look like:

```json
{
  "name": "@hive/ui",
  "dependencies": {
    // Animation
    "framer-motion": "^11.11.17",

    // Component Utilities
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",

    // UI Primitives (Radix)
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-tooltip": "^1.1.4",
    // ... other Radix components

    // Premium Add-ons
    "sonner": "^1.7.1",
    "vaul": "^1.1.1",
    "cmdk": "^1.0.0",

    // Forms
    "react-hook-form": "^7.54.2",
    "@hookform/resolvers": "^3.9.1",
    "zod": "^3.24.1",

    // Optional
    "react-intersection-observer": "^9.13.1"
  },
  "devDependencies": {
    // Styling
    "tailwindcss": "^3.5.0",
    "tailwindcss-animate": "^1.0.7",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",

    // TypeScript
    "typescript": "^5.8.3",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/node": "^22.10.2",

    // Storybook
    "@storybook/react-vite": "^8.4.7",
    "@storybook/addon-essentials": "^8.4.7"
  }
}
```

---

## 🎯 What Each Package Does

| Package         | Purpose               | OpenAI Uses | Vercel Uses | Linear Uses |
| --------------- | --------------------- | ----------- | ----------- | ----------- |
| `framer-motion` | Smooth animations     | ✅          | ✅          | ✅          |
| `sonner`        | Toast notifications   | ❌          | ✅          | ❌          |
| `cmdk`          | Command palette       | ❌          | ✅          | ✅          |
| `vaul`          | Bottom sheets         | ❌          | ✅          | ❌          |
| `radix-ui`      | Accessible primitives | ✅          | ✅          | ✅          |
| `tailwindcss`   | Utility CSS           | ✅          | ✅          | ✅          |

---

## 🚀 Action Plan

### **Step 1: Install Missing Dependencies** (5 minutes)

```bash
cd packages/ui
pnpm add sonner vaul react-intersection-observer
```

### **Step 2: Update Tailwind Config** (10 minutes)

Add custom durations, easings, and animations to `tailwind.config.ts`

### **Step 3: Setup Providers** (15 minutes)

Create:

- `src/providers/motion-provider.tsx`
- `src/providers/toast-provider.tsx`

Export from `src/index.ts`

### **Step 4: Update Root Layout** (5 minutes)

In `apps/web/src/app/layout.tsx`:

```tsx
import { MotionProvider } from "@hive/ui/providers/motion-provider";
import { ToastProvider } from "@hive/ui/providers/toast-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MotionProvider>
          {children}
          <ToastProvider />
        </MotionProvider>
      </body>
    </html>
  );
}
```

---

## ✅ Verification Checklist

After installation:

- [ ] `framer-motion` animations work smoothly
- [ ] Toast notifications appear (test with `toast.success('Test')`)
- [ ] Command palette opens (Cmd+K)
- [ ] Tailwind custom classes work (`duration-swift`, `ease-entrance`)
- [ ] No console errors about missing packages
- [ ] TypeScript types resolve correctly
- [ ] Storybook builds without errors

---

## 🔧 Troubleshooting

### **Issue: "Cannot find module 'sonner'"**

```bash
# Make sure you're in the right directory
cd packages/ui
pnpm add sonner

# If still failing, clear cache
pnpm store prune
pnpm install
```

### **Issue: "Framer Motion animations don't work"**

```tsx
// Wrap app in MotionProvider
import { MotionProvider } from "@hive/ui";

<MotionProvider>
  <YourApp />
</MotionProvider>;
```

### **Issue: "Tailwind classes not applying"**

```bash
# Check content paths in tailwind.config.ts
content: [
  "./src/**/*.{ts,tsx}",
  "../../packages/ui/src/**/*.{ts,tsx}", // If importing from packages
]
```

---

**TL;DR**: You already have 90% of what you need. Just add `sonner` and `vaul` for that extra premium feel. Everything else is already in your stack! 🚀
