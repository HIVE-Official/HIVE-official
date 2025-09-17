# HIVE Codebase Audit & Development Rules

## 🏗️ **Monorepo Architecture Overview**

### **Core Structure**
```
hive_ui/
├── apps/                    # Applications
│   ├── web/                # Main Next.js 15.3.4 app (port 3000)
│   └── admin/              # Admin dashboard (future)
├── packages/               # Shared packages
│   ├── ui/                 # Component library + Storybook (port 6006)
│   ├── core/               # Business logic, types, Firebase
│   ├── hooks/              # Shared React hooks
│   ├── tokens/             # Design system tokens
│   ├── auth-logic/         # Authentication logic
│   ├── api-client/         # API client utilities
│   ├── validation/         # Zod schemas
│   ├── analytics/          # Analytics tracking
│   ├── i18n/               # Internationalization
│   ├── utilities/          # Shared utilities
│   ├── firebase/           # Firebase configuration
│   └── config/             # ESLint/TypeScript configs
├── functions/              # Firebase Functions
├── firebase/               # Firebase config & rules
└── docs/                   # Documentation
```

### **Package Manager & Build System**
- **Package Manager**: `pnpm@9.1.1` with workspaces
- **Build Orchestration**: `Turborepo@2.5.4`
- **Language**: TypeScript 5.8.3 (strict mode)
- **Linting**: ESLint 9.x (standalone configs per package)

---

## 🎨 **Design System Architecture**

### **Token System (`packages/tokens/`)**
```
packages/tokens/src/
├── colors.ts      # HIVE color palette (monochrome + gold)
├── typography.ts  # Font families & type scale
├── spacing.ts     # 8dp grid system
├── motion.ts      # Animation & transitions
├── effects.ts     # Shadows & visual effects
└── index.ts       # Main exports
```

### **Font Stack (S-tier Premium)**
- **Display**: `Space Grotesk Variable` (headlines, hero sections)
- **Body**: `Geist` (body text, UI copy, buttons)
- **Code**: `Geist Mono` (code snippets, technical content)

### **Color System**
- **Primary**: Black (`#0A0A0A`), White (`#FFFFFF`)
- **Accent**: Gold (`#FFD700`) - used sparingly (<10% of UI)
- **Surfaces**: Dark greys (`#111111`, `#181818`, `#1F1F1F`)
- **Borders**: `#2A2A2A`
- **No traditional success/error colors** - motion-based feedback

---

## 🧩 **Component Library (`packages/ui/`)**

### **Structure**
```
packages/ui/src/
├── components/           # React components
│   ├── ui/              # Base UI components (shadcn/ui style)
│   ├── auth/            # Authentication components
│   ├── onboarding/      # Onboarding flow components
│   └── [feature]/       # Feature-specific components
├── stories/             # Storybook stories
├── lib/                 # Utilities (cn, etc.)
└── index.ts            # Public exports
```

### **Component Architecture**
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS + class-variance-authority (CVA)
- **Primitives**: Radix UI for accessibility
- **Icons**: Lucide React
- **Build**: tsup for CJS/ESM + TypeScript declarations

### **Storybook Configuration**
- **Framework**: `@storybook/react-vite`
- **Port**: 6006
- **Addons**: Essentials, Interactions, Links
- **Stories**: CSF 3.0 format with autodocs

---

## 🚀 **Application Architecture (`apps/web/`)**

### **Next.js 15.3.4 Configuration**
- **Router**: App Router (new)
- **Components**: React Server Components by default
- **Styling**: Tailwind CSS with HIVE tokens
- **State**: Zustand for client state, React Query for server state
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + Testing Library

### **Key Dependencies**
```json
{
  "@hive/ui": "workspace:*",        // Component library
  "@hive/core": "workspace:*",      // Business logic
  "@hive/hooks": "workspace:*",     // Shared hooks
  "@hive/auth-logic": "workspace:*", // Auth logic
  "@radix-ui/*": "latest",          // UI primitives
  "framer-motion": "latest",        // Animations
  "tailwind-merge": "latest",       // Class merging
  "class-variance-authority": "latest" // Component variants
}
```

---

## 🔧 **Development Workflow**

### **Package Scripts**
```bash
# Root level
pnpm dev              # Start all dev servers
pnpm web              # Start web app only
pnpm storybook        # Start Storybook only
pnpm lint             # Lint all packages
pnpm typecheck        # TypeScript check all
pnpm test             # Run all tests
pnpm build            # Build all packages

# Package level
cd packages/ui && pnpm storybook  # Start Storybook
cd apps/web && pnpm dev           # Start web app
```

### **Turborepo Pipeline**
- **Caching**: Intelligent caching for builds, tests, linting
- **Parallel Execution**: Dependencies respected automatically
- **Filtering**: `--filter=@hive/ui` for specific packages
- **Outputs**: `.next/`, `dist/`, `storybook-static/`

---

## 📋 **Vertical Sliced Feature Development Rules**

### **1. Component Development Workflow**

#### **Step 1: Design in Storybook First**
```bash
cd packages/ui
pnpm storybook
```

#### **Step 2: Create Component Structure**
```
packages/ui/src/components/[feature]/
├── index.ts              # Export all components
├── ComponentName.tsx     # Main component
├── ComponentName.test.tsx # Unit tests
└── ComponentName.stories.tsx # Storybook stories
```

#### **Step 3: Follow HIVE Component Pattern**
```tsx
// 1. Import dependencies
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// 2. Define variants with CVA
const componentVariants = cva(
  "base-classes rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700]",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        secondary: "bg-[#111111] text-white",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// 3. Define props interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

// 4. Create component with forwardRef
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### **2. Storybook Story Pattern**

#### **CSF 3.0 Format**
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from '../ComponentName';

const meta: Meta<typeof Component> = {
  title: 'Feature/ComponentName',
  component: Component,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    children: 'Component',
    variant: 'default',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
    children: 'Secondary',
  },
};
```

### **3. Integration with Web App**

#### **Step 1: Export from UI Package**
```tsx
// packages/ui/src/index.ts
export { Component } from './components/[feature]/ComponentName';
```

#### **Step 2: Import in Web App**
```tsx
// apps/web/src/app/[feature]/page.tsx
import { Component } from '@hive/ui';

export default function FeaturePage() {
  return (
    <div className="p-6">
      <Component variant="default" size="md">
        Feature Content
      </Component>
    </div>
  );
}
```

---

## 🎯 **Feature Development Rules**

### **1. Vertical Slicing Principles**
- **Complete Features**: Build entire user flows, not just components
- **Cross-Package Integration**: Use `@hive/*` imports for shared logic
- **Storybook-First**: Always create stories before integration
- **Type Safety**: Leverage `@hive/core` types for consistency

### **2. Component Design Rules**
- **HIVE Brand**: Follow monochrome + gold aesthetic
- **Accessibility**: Use Radix primitives, proper ARIA
- **Responsive**: Mobile-first design with 8dp grid
- **Performance**: React Server Components by default

### **3. State Management Rules**
- **Local State**: `useState` for component state
- **Global State**: Zustand for app-wide state
- **Server State**: React Query for API data
- **Form State**: React Hook Form + Zod validation

### **4. Testing Strategy**
- **Unit Tests**: Vitest + Testing Library for components
- **Integration Tests**: Test feature flows
- **Visual Tests**: Storybook for component variants
- **E2E Tests**: Playwright for critical user journeys

### **5. Code Quality Rules**
- **TypeScript**: Strict mode, no `any` types
- **ESLint**: All packages must pass linting
- **Imports**: Use `@hive/*` aliases, not relative paths
- **Documentation**: JSDoc for public APIs

---

## 🔄 **Development Commands Reference**

### **Daily Development**
```bash
# Terminal 1: Start web app
cd apps/web && pnpm dev

# Terminal 2: Start Storybook
cd packages/ui && pnpm storybook

# Terminal 3: Monitor builds
pnpm turbo run build --watch
```

### **Quality Checks**
```bash
# Lint all packages
pnpm lint

# Type check all packages
pnpm typecheck

# Run all tests
pnpm test

# Build all packages
pnpm build
```

### **Package-Specific Commands**
```bash
# UI package
cd packages/ui
pnpm storybook        # Start Storybook
pnpm build            # Build component library
pnpm test             # Run component tests

# Web app
cd apps/web
pnpm dev              # Start Next.js dev server
pnpm build            # Build for production
pnpm test             # Run app tests
```

---

## 📚 **Key Files & Configurations**

### **Critical Configuration Files**
- `turbo.json` - Build pipeline configuration
- `pnpm-workspace.yaml` - Workspace package definitions
- `packages/tokens/src/*.ts` - Design system tokens
- `packages/ui/.storybook/main.ts` - Storybook configuration
- `apps/web/tailwind.config.mjs` - Tailwind + HIVE tokens
- `apps/web/next.config.mjs` - Next.js configuration

### **Import Patterns**
```tsx
// ✅ CORRECT - Package imports
import { Button } from '@hive/ui';
import { User, Space } from '@hive/core';
import { useAuth } from '@hive/hooks';

// ❌ WRONG - Relative imports
import { Button } from '../../../packages/ui/src/components/button';
```

### **Token Usage**
```tsx
// ✅ CORRECT - Use token values
className="bg-[#0A0A0A] text-white rounded-lg"

// ✅ CORRECT - Use Tailwind classes (if configured)
className="bg-background text-foreground rounded-lg"
```

---

## 🎉 **Success Metrics**

### **Feature Completion Checklist**
- [ ] Component built in `packages/ui`
- [ ] Storybook stories created and reviewed
- [ ] Unit tests written and passing
- [ ] Integrated into web app
- [ ] Accessibility verified
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Documentation updated

### **Quality Gates**
- [ ] ESLint passes (0 errors, ≤15 warnings)
- [ ] TypeScript compiles successfully
- [ ] All tests pass
- [ ] Storybook builds without errors
- [ ] Web app builds successfully
- [ ] No console errors in development

This audit provides the complete foundation for building vertical sliced features in the HIVE codebase with confidence and consistency. 