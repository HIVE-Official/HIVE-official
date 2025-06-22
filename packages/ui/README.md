# HIVE UI Package

> **"Minimal surface. Maximal spark."** — The comprehensive UI component library and design system for HIVE.

## Overview

The HIVE UI package contains all reusable components, design tokens, and styling utilities that make up the HIVE design system. Built with React, TypeScript, Tailwind CSS, and Storybook for documentation.

## Quick Start

### Installation

```bash
# Install the package (from monorepo root)
pnpm add @hive/ui

# Or if developing within the monorepo
cd packages/ui
pnpm install
```

### Basic Usage

```typescript
import { Button, Card, CardHeader, CardTitle } from '@hive/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to HIVE</CardTitle>
      </CardHeader>
      <Button variant="accent">Get Started</Button>
    </Card>
  );
}
```

## Design System Documentation

📖 **[Complete Design System Guide](./DESIGN_SYSTEM.md)**

Our comprehensive design system documentation covers:

- **Design Philosophy** - Core principles and inspirational benchmarks
- **Visual Identity** - Logo system and brand colors
- **Design Tokens** - Colors, typography, spacing, and motion
- **Component Library** - All available components with usage guidelines
- **Accessibility Guidelines** - WCAG compliance and inclusive design
- **Development Guidelines** - Best practices and code standards

## Available Components

### Core Components

| Component  | Description                                     | Story                                                              |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| **Button** | Interactive button with multiple variants       | [View Story](http://localhost:6006/?path=/story/components-button) |
| **Card**   | Content container with header, body, and footer | [View Story](http://localhost:6006/?path=/story/components-card)   |
| **Input**  | Form input field with validation states         | [View Story](http://localhost:6006/?path=/story/components-input)  |
| **Badge**  | Status indicators and tags                      | [View Story](http://localhost:6006/?path=/story/components-badge)  |
| **Avatar** | User profile images with fallbacks              | [View Story](http://localhost:6006/?path=/story/components-avatar) |

### Navigation Components

| Component         | Description                          | Story                                                                     |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| **Tabs**          | Tab navigation with keyboard support | [View Story](http://localhost:6006/?path=/story/components-tabs)          |
| **Dropdown Menu** | Context menus and dropdowns          | [View Story](http://localhost:6006/?path=/story/components-dropdown-menu) |

### Form Components

| Component    | Description                       | Story                                                                |
| ------------ | --------------------------------- | -------------------------------------------------------------------- |
| **Input**    | Text input with validation states | [View Story](http://localhost:6006/?path=/story/components-input)    |
| **Textarea** | Multi-line text input             | [View Story](http://localhost:6006/?path=/story/components-textarea) |
| **Switch**   | Toggle controls                   | [View Story](http://localhost:6006/?path=/story/components-switch)   |

### Layout Components

| Component       | Description                   | Story                                                                   |
| --------------- | ----------------------------- | ----------------------------------------------------------------------- |
| **Scroll Area** | Custom scrollable areas       | [View Story](http://localhost:6006/?path=/story/components-scroll-area) |
| **Resizable**   | Adjustable panels and layouts | [View Story](http://localhost:6006/?path=/story/components-resizable)   |

### Feedback Components

| Component        | Description                    | Story                                                                    |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------ |
| **Alert Dialog** | Modal confirmations and alerts | [View Story](http://localhost:6006/?path=/story/components-alert-dialog) |

## Development

### Local Development

```bash
# Start Storybook for component development
cd packages/ui
pnpm storybook
# Open http://localhost:6006

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Run tests
pnpm test
```

### Building Components

When creating new components:

1. **Follow the existing patterns** - Use `class-variance-authority` for variants
2. **Include proper TypeScript types** - Extend HTML element types
3. **Add to Storybook** - Create comprehensive stories with all variants
4. **Update exports** - Add to `src/index.ts`
5. **Document in design system** - Update `DESIGN_SYSTEM.md`

### Component Template

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        default: "default-size",
        sm: "small-size",
        lg: "large-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

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

## Design Tokens

### Using Design Tokens

```typescript
// Import tokens from the tokens package
import { colors, spacing, typography } from "@hive/tokens";

// Use in your components
const styles = {
  backgroundColor: colors.bg.canvas,
  padding: spacing["4"],
  fontFamily: typography.fontFamily.display,
};
```

### Tailwind Integration

All design tokens are integrated into Tailwind CSS:

```typescript
// Use Tailwind classes that map to design tokens
className = "bg-bg-canvas text-text-primary p-4 font-display text-h2";
```

## Brand Aesthetic

### Color Philosophy

**"One bright note in a monochrome orchestra"** - Our color system uses:

- **Primary Background**: `#0A0A0A` (bg-canvas) - Deep, immersive dark
- **Surface Color**: `rgba(255,255,255,0.02)` (bg-card) - Subtle elevation
- **Accent Gold**: `#FFD700` (accent-gold) - Strategic, purposeful highlights
- **Text Primary**: `#FFFFFF` (text-primary) - High contrast readability
- **Text Muted**: `#A1A1AA` (text-muted) - Secondary information

### Typography System

- **Display Font**: Space Grotesk (600 weight) - Headlines and emphasis
- **Body Font**: Inter (400 weight) - Body text and UI elements
- **Monospace**: JetBrains Mono - Code and technical content

### Motion Principles

- **Micro-interactions**: 90ms - Button hovers, small state changes
- **Standard transitions**: 200ms - Page navigation, content updates
- **Emphasized animations**: 350ms - Modals, notifications
- **Custom easing**: `cubic-bezier(0.33, 0.65, 0, 1)` - iOS-inspired spring

## Accessibility

### WCAG Compliance

All components are built to meet **WCAG 2.1 AA** standards:

- ✅ **Color contrast**: ≥ 4.5:1 ratio for text
- ✅ **Keyboard navigation**: Full keyboard support
- ✅ **Screen reader support**: Proper ARIA labels and semantic HTML
- ✅ **Focus management**: Visible focus indicators
- ✅ **Motion preferences**: Respects `prefers-reduced-motion`

### Testing Accessibility

```bash
# Run accessibility tests
pnpm test:a11y

# Test with screen reader
# Use NVDA, JAWS, or VoiceOver to test components
```

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## Contributing

### Adding New Components

1. **Create component** in `src/components/ui/`
2. **Add TypeScript types** with proper interfaces
3. **Create Storybook story** with all variants
4. **Add to index exports** in `src/index.ts`
5. **Update documentation** in `DESIGN_SYSTEM.md`
6. **Write tests** for critical functionality

### Component Guidelines

- **Use Radix primitives** when available for accessibility
- **Follow naming conventions** - PascalCase for components
- **Include prop documentation** - JSDoc comments
- **Support ref forwarding** - Use `React.forwardRef`
- **Handle edge cases** - Loading, error, empty states

### Code Quality

```bash
# Before submitting PR
pnpm lint          # ESLint checks
pnpm typecheck     # TypeScript compilation
pnpm test          # Unit tests
pnpm build         # Build verification
```

## Package Dependencies

### Core Dependencies

- **React** ^19.0.0 - UI library
- **Radix UI** - Accessible primitives
- **class-variance-authority** - Variant management
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon system

### Development Dependencies

- **Storybook** - Component documentation
- **TypeScript** - Type safety
- **Vitest** - Testing framework
- **ESLint** - Code quality

## Resources

### Links

- 🎨 **[Storybook](http://localhost:6006)** - Component playground
- 📖 **[Design System](./DESIGN_SYSTEM.md)** - Complete design guide
- 🎯 **[Figma Library](https://figma.com/hive-design-system)** - Design source of truth
- 📝 **[Component API](./docs/api)** - Technical documentation

### Getting Help

- **Slack**: `#hive-design-system` - Design system discussions
- **GitHub Issues**: Component bugs and feature requests
- **Design Council**: 3 students + 1 staff for design decisions

---

**Version**: v0.9.0 beta  
**Last Updated**: December 2024  
**License**: MIT
