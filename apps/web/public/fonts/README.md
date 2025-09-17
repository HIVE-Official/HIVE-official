# HIVE UI Fonts

This directory contains the font files for the HIVE design system, properly organized and served from the UI package.

## Font Stack

### Space Grotesk Variable
- **Usage**: Headlines, hero text, call-to-actions
- **Files**: `space-grotesk/space-grotesk-latin-*.woff2`
- **Weights**: 300, 400, 500, 600, 700
- **CSS Family**: `'Space Grotesk Variable'`

### Geist Sans
- **Usage**: Body text, menus, micro-copy
- **Files**: `geist/GeistSans-Variable.woff2`
- **Weights**: 100-900 (variable font)
- **CSS Family**: `'Geist Sans'`

### Geist Mono
- **Usage**: Code snippets, technical content, countdown numerals
- **Files**: `geist/GeistMono-Variable.woff2`
- **Weights**: 100-900 (variable font)
- **CSS Family**: `'Geist Mono'`

## Implementation

Fonts are loaded via CSS custom properties in `packages/ui/src/styles/fonts.css`:

```css
:root {
  --font-display: 'Space Grotesk Variable', 'Space Grotesk', system-ui, sans-serif;
  --font-sans: 'Geist Sans', 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
}
```

## Usage in Components

```tsx
// Display text (Space Grotesk)
<h1 className="font-display text-h1 font-semibold">Hero Title</h1>

// Body text (Geist Sans)
<p className="font-sans text-body">Main content</p>

// Code (Geist Mono)
<code className="font-mono text-code">const example = "code"</code>
```

## Storybook Preview

View the font showcase in Storybook:
- **Design System/Fonts** - Complete font preview and validation

## Benefits of Local Fonts

1. **Performance**: No external CDN dependencies
2. **Reliability**: Fonts always available, even offline
3. **Version Control**: Font versions are locked to the package
4. **Privacy**: No external font requests
5. **Consistency**: Same fonts across all environments

## File Structure

```
packages/ui/public/fonts/
├── README.md
├── space-grotesk/
│   ├── space-grotesk-latin-300-normal.woff2
│   ├── space-grotesk-latin-400-normal.woff2
│   ├── space-grotesk-latin-500-normal.woff2
│   ├── space-grotesk-latin-600-normal.woff2
│   └── space-grotesk-latin-700-normal.woff2
└── geist/
    ├── GeistSans-Variable.woff2
    └── GeistMono-Variable.woff2
``` 