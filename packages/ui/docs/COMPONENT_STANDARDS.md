# HIVE Component Standards

**All UI/UX is built in Storybook first. Consistency is enforced automatically.**

---

## 🎯 Core Principle

**Storybook is the single source of truth for all HIVE UI components.**

- Components are BUILT in Storybook
- Apps CONSUME components from `@hive/ui`
- Standards are ENFORCED by templates and generators
- Consistency is AUTOMATIC, not manual

---

## ✅ REQUIRED Component Patterns

Every HIVE component MUST follow these patterns:

### 1. Component Structure

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ✅ REQUIRED: CVA variants
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "..." },
      size: { default: "h-11 px-4 min-h-[44px]" }, // Mobile-first
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ✅ REQUIRED: Exported TypeScript interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

// ✅ REQUIRED: React.forwardRef
export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

// ✅ REQUIRED: displayName
Component.displayName = "Component";
```

### 2. Styling Standards

✅ **HIVE CSS Variables ONLY**
```css
/* ✅ CORRECT */
bg-[var(--hive-brand-primary)]
text-[var(--hive-text-primary)]
border-[var(--hive-border-default)]

/* ❌ WRONG */
bg-blue-500
text-white
border-gray-300
```

✅ **Mobile-First Sizing**
```typescript
// All interactive elements: 44px minimum touch target
size: {
  default: "h-11 px-4 min-h-[44px]",  // ✅ CORRECT
  sm: "h-8 px-2",                      // ❌ WRONG (too small)
}
```

✅ **Responsive Breakpoints**
```
sm: 640px   (mobile)
md: 768px   (tablet)
lg: 1024px  (desktop)
```

### 3. TypeScript Requirements

✅ **Strict Types (no `any`)**
```typescript
// ✅ CORRECT
interface Props {
  variant?: 'default' | 'primary';
  onClick?: (event: React.MouseEvent) => void;
}

// ❌ WRONG
interface Props {
  variant?: any;
  onClick?: any;
}
```

✅ **Extend React Types**
```typescript
// ✅ CORRECT: Extends React.HTMLAttributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// ❌ WRONG: Missing React types
interface ButtonProps {
  onClick: Function;
}
```

### 4. Component Composition

✅ **Atoms**: Basic building blocks
- Button, Input, Badge, Avatar, Label
- No internal state, pure presentation
- CVA variants for styling

✅ **Molecules**: Combinations of atoms
- FormField, SearchBar, Card with actions
- May have simple internal state
- Loading and error states

✅ **Organisms**: Complex systems
- Navigation, ProfileCard, ToolBuilder
- Complex state management
- Behavioral psychology considerations
- Framer Motion animations

✅ **Templates**: Page layouts
- ProfileViewLayout, DashboardLayout
- Grid systems and spacing
- Responsive behavior

---

## 📖 Story Requirements

Every component MUST have a story with:

### Required Exports

```typescript
// ✅ REQUIRED: Meta configuration
const meta = {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'], // ✅ REQUIRED
} satisfies Meta<typeof ComponentName>;

// ✅ REQUIRED: Default story
export const Default: Story = {
  args: {},
};

// ✅ REQUIRED: All variants
export const AllVariants: Story = {
  render: () => <>{/* Show all variant combinations */}</>
};

// ✅ REQUIRED: Interactive states
export const States: Story = {
  render: () => <>{/* hover, focus, disabled */}</>
};

// ✅ RECOMMENDED: Responsive examples
export const Responsive: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
```

### Story Organization

```
src/atomic/
├── atoms/
│   ├── button.tsx
│   └── button.stories.tsx          ← Co-located
├── molecules/
│   ├── form-field.tsx
│   └── form-field.stories.tsx      ← Co-located
└── organisms/
    ├── navigation.tsx
    └── navigation.stories.tsx       ← Co-located
```

---

## 🛠️ Development Workflow

### Creating New Components

```bash
# 1. Generate component with story
pnpm create:atom button-name
pnpm create:molecule search-bar
pnpm create:organism nav-menu

# 2. Edit in Storybook
pnpm storybook
# Open http://localhost:6006

# 3. Component automatically exported
# Import in apps:
import { ButtonName } from '@hive/ui';
```

### Updating Existing Components

```bash
# 1. Find component in Storybook
# Navigate to http://localhost:6006

# 2. Edit component file
# Changes reflect instantly (HMR)

# 3. Update story to show new variants

# 4. Rebuild package
pnpm build
```

### Generating Stories

```bash
# Generate story for one component
pnpm generate:story atoms/button

# Generate stories for all components
pnpm generate:stories
```

---

## ⚠️ Common Mistakes

### ❌ Don't: Hardcode Colors
```typescript
// ❌ WRONG
className="bg-blue-500 text-white"

// ✅ CORRECT
className="bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]"
```

### ❌ Don't: Skip ForwardRef
```typescript
// ❌ WRONG
export const Button = (props) => <button {...props} />;

// ✅ CORRECT
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
);
```

### ❌ Don't: Use `any` Types
```typescript
// ❌ WRONG
interface Props {
  data: any;
  onClick: any;
}

// ✅ CORRECT
interface Props {
  data: DataType;
  onClick: (event: React.MouseEvent) => void;
}
```

### ❌ Don't: Skip CVA Variants
```typescript
// ❌ WRONG
<button className={variant === 'primary' ? 'bg-blue' : 'bg-gray'}>

// ✅ CORRECT
const buttonVariants = cva("base", {
  variants: { variant: { primary: "bg-blue", secondary: "bg-gray" } }
});
<button className={cn(buttonVariants({ variant }))}>
```

---

## 🚀 Automated Tools

### Component Generator
```bash
pnpm create:atom fancy-button
```
- Creates component from template
- Creates story with required exports
- Updates exports in index.ts
- Enforces HIVE standards

### Story Generator
```bash
pnpm generate:stories
```
- Scans all components
- Generates stories following template
- Validates component structure
- Skips existing stories

### Quality Checks
```bash
pnpm lint              # ESLint with HIVE rules
pnpm quality:check     # Full validation
```

---

## 📚 Resources

- **Storybook**: http://localhost:6006
- **HIVE CSS Variables**: `packages/tokens/src/variables.css`
- **Component Templates**: `packages/ui/templates/`
- **Example Components**: `packages/ui/src/atomic/atoms/button.tsx`

---

## ✅ Checklist for New Components

- [ ] Created from template (`pnpm create:atom name`)
- [ ] Uses React.forwardRef
- [ ] Uses CVA for variants
- [ ] Uses HIVE CSS variables
- [ ] Mobile-first sizing (44px+ touch targets)
- [ ] TypeScript interfaces exported
- [ ] Story has required exports (Default, AllVariants, States)
- [ ] Story has `tags: ['autodocs']`
- [ ] Component tested in Storybook
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (WCAG 2.1 AA)

---

**Remember**: Consistency is automatic when you use the tools. The "right way" is the "easy way."
