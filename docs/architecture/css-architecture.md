# HIVE CSS Architecture Guide

## Overview

HIVE uses a centralized, token-based CSS architecture that ensures design consistency, maintainability, and scalability across the entire monorepo. This architecture follows the **Single Source of Truth** principle for all design tokens.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        HIVE CSS ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  @hive/tokens (Single Source of Truth)                        │
│  ├── src/                                                     │
│  │   ├── colors.ts              ← Design token definitions   │
│  │   ├── typography.ts          ← Typography scales          │
│  │   ├── spacing.ts             ← Spacing tokens             │
│  │   ├── radius.ts              ← Border radius tokens       │
│  │   ├── motion.ts              ← Animation & transitions    │
│  │   ├── effects.ts             ← Shadows & visual effects   │
│  │   ├── css-generator.ts       ← CSS custom property gen    │
│  │   └── tailwind-config.ts     ← Tailwind theme extension   │
│  │                                                            │
│  ├── dist/                      ← Compiled TypeScript        │
│  ├── hive-tokens.css           ← Generated CSS variables     │
│  └── generated-tokens.css      ← Build tool CSS file        │
│                                                                 │
│  ▼ Import & Extend                                            │
│                                                                 │
│  @hive/ui (Design System)                                     │
│  ├── tailwind.config.ts         ← Imports hiveTailwindConfig │
│  ├── src/styles.css            ← Imports hive-tokens.css     │
│  └── dist/styles.css           ← Compiled CSS output         │
│                                                                 │
│  ▼ Consumer Applications                                       │
│                                                                 │
│  apps/web, apps/admin                                         │
│  └── Import @hive/ui styles automatically                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Token System

### 1. Design Token Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Colors** | Brand colors, semantic colors, grayscale | `--hive-color-gold`, `--hive-brand-primary` |
| **Typography** | Font sizes, weights, line heights | `--hive-font-size-lg`, `--hive-font-weight-bold` |
| **Spacing** | Margins, padding, gaps | `--hive-spacing-4`, `--hive-spacing-xl` |
| **Radius** | Border radius values | `--hive-radius-md`, `--hive-radius-full` |
| **Motion** | Easing curves, durations | `--hive-easing-liquid`, `--hive-duration-smooth` |
| **Effects** | Shadows, overlays, z-index | `--hive-shadow-level3`, `--hive-z-modal` |

### 2. Naming Convention

All HIVE design tokens follow this pattern:
```css
--hive-{category}-{variant}-{modifier}
```

Examples:
- `--hive-color-gold` (color category, gold variant)
- `--hive-shadow-level3` (shadow category, level3 variant)
- `--hive-brand-primary` (brand category, primary variant)

## Implementation Guide

### 1. Package Structure

```
packages/
├── tokens/                    # Design token source
│   ├── src/
│   │   ├── colors.ts         # Color definitions
│   │   ├── tailwind-config.ts # Tailwind theme
│   │   └── css-generator.ts  # CSS generation
│   ├── scripts/
│   │   └── generate-css.ts   # Build script
│   ├── hive-tokens.css       # Generated CSS
│   └── package.json          # Build scripts
│
└── ui/                       # Design system
    ├── tailwind.config.ts    # Tailwind configuration
    ├── src/styles.css        # Main stylesheet
    └── dist/styles.css       # Compiled output
```

### 2. Build Process

The CSS architecture uses a two-stage build process:

#### Stage 1: Token Generation
```bash
cd packages/tokens
npm run build:css  # Generates hive-tokens.css
```

#### Stage 2: UI Compilation
```bash
cd packages/ui
npm run build      # Compiles Tailwind with tokens
```

### 3. Import Pattern

#### In @hive/ui package:
```css
/* src/styles.css */
@import "@hive/tokens/hive-tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### In Tailwind config:
```typescript
// tailwind.config.ts
import { hiveTailwindConfig } from "@hive/tokens";

const config = {
  theme: {
    extend: {
      ...hiveTailwindConfig,
    }
  }
}
```

## Usage Guidelines

### 1. Using Design Tokens

#### CSS Custom Properties
```css
.my-component {
  background-color: var(--hive-background-primary);
  color: var(--hive-text-primary);
  border-radius: var(--hive-radius-lg);
  box-shadow: var(--hive-shadow-level2);
}
```

#### Tailwind CSS Classes
```html
<div class="bg-obsidian text-platinum rounded-lg shadow-level2">
  Content with HIVE design tokens
</div>
```

#### React Components
```tsx
import { Button } from '@hive/ui';

function MyComponent() {
  return (
    <Button className="bg-gold text-obsidian hover:bg-amber">
      HIVE Button
    </Button>
  );
}
```

### 2. Utility Classes

HIVE provides pre-built utility classes for common patterns:

```html
<!-- Glass morphism effects -->
<div class="hive-glass">Glass effect</div>
<div class="hive-glass-strong">Strong glass effect</div>

<!-- Interactive states -->
<button class="hive-interactive">Interactive button</button>

<!-- Gold glow effects -->
<div class="hive-gold-glow">Subtle glow</div>
<div class="hive-gold-glow-strong">Strong glow</div>
```

## Maintenance & Updates

### 1. Adding New Tokens

To add new design tokens:

1. **Update token definitions** in `packages/tokens/src/`
2. **Regenerate CSS** with `npm run build:css`
3. **Update Tailwind config** if needed
4. **Test across applications**

### 2. Modifying Existing Tokens

⚠️ **Breaking Change Warning**: Modifying existing tokens affects all applications.

1. **Review usage** across the monorepo
2. **Update token values** in source files
3. **Regenerate CSS files**
4. **Test thoroughly** before deployment

### 3. Build Integration

The token build process is integrated into the monorepo build:

```json
// packages/tokens/package.json
{
  "scripts": {
    "build": "npm run build:types && npm run build:css",
    "build:css": "tsx scripts/generate-css.ts",
    "postbuild": "npm run build:css"
  }
}
```

## Migration Notes

### From Previous Architecture

If migrating from the old hardcoded CSS variables:

1. **Replace hardcoded values** with token imports
2. **Update CSS custom properties** to use HIVE naming
3. **Remove duplicate definitions**
4. **Test component rendering**

### Example Migration:
```css
/* OLD - Hardcoded */
:root {
  --background-primary: #0A0A0B;
  --text-primary: #E5E5E7;
}

/* NEW - Token-based */
@import "@hive/tokens/hive-tokens.css";
:root {
  --background: var(--hive-background-primary);
  --foreground: var(--hive-text-primary);
}
```

## Troubleshooting

### Common Issues

1. **Import Resolution Errors**
   - Ensure `@hive/tokens` is built before `@hive/ui`
   - Check package.json workspace dependencies

2. **CSS Not Updating**
   - Run `npm run build:css` in tokens package
   - Clear build cache and rebuild

3. **Tailwind Classes Missing**
   - Verify `hiveTailwindConfig` import in tailwind.config.ts
   - Check build process completed successfully

### Debug Commands

```bash
# Check token package build
cd packages/tokens && npm run build

# Verify UI build
cd packages/ui && npm run build

# Full monorepo build test
pnpm build
```

## Best Practices

### 1. Token Usage
- ✅ **Use semantic tokens** over primitive colors
- ✅ **Prefer CSS custom properties** for dynamic values
- ✅ **Use Tailwind classes** for static styling
- ❌ **Don't hardcode** color/spacing values

### 2. Architecture
- ✅ **Single source of truth** for all tokens
- ✅ **Automated generation** of CSS files
- ✅ **Build process integration**
- ❌ **Don't bypass** the token system

### 3. Maintenance
- ✅ **Document** token changes
- ✅ **Test** across all applications
- ✅ **Version control** generated files
- ❌ **Don't edit** generated CSS directly

## Performance Considerations

### 1. CSS Bundle Size
- Generated CSS is optimized and minified
- Only used utility classes are included in final build
- Token CSS variables are loaded once globally

### 2. Runtime Performance
- CSS custom properties have minimal runtime cost
- Tailwind utilities compile to optimized CSS
- No JavaScript required for token system

---

## Support & Contribution

For questions about the CSS architecture or to propose changes:

1. **Review** this documentation
2. **Test** changes locally first
3. **Update** documentation with changes
4. **Coordinate** with team for breaking changes

**Remember**: This architecture serves the entire HIVE platform. Changes should be deliberate and well-tested across all applications.