# HIVE Logo & Brand Guidelines

## Logo Architecture

### The Mark
The HIVE logo is a **geometric abstraction** of the letter 'H' that evokes:
- **Hexagonal structures** (like a honeycomb/hive)
- **Network connections** (nodes and pathways)
- **Architectural blueprints** (technical precision)
- **Circuit patterns** (tech-forward aesthetic)

### Logo Files
```
Current Location:
/apps/web/public/assets/
├── hive-logo-gold.svg   (#FFD700)
├── hive-logo-black.svg  (#000000)
└── hive-logo-white.svg  (#FFFFFF)

Recommended Organization:
/packages/ui/src/assets/logos/
├── primary/
│   └── hive-logo-gold.svg     (Primary brand mark)
├── variations/
│   ├── hive-logo-black.svg    (For light backgrounds)
│   └── hive-logo-white.svg    (For photos/colors)
├── special/
│   ├── hive-logo-animated.json (Lottie animation)
│   └── hive-logo-3d.glb       (Future 3D version)
└── exports/
    ├── hive-logo-1024.png      (Social media)
    ├── hive-logo-512.png       (App icon)
    └── hive-logo-192.png       (PWA icon)
```

## Usage Guidelines

### Color Selection Logic

| Background Type | Logo Choice | Reasoning |
|----------------|-------------|-----------|
| Pure Black (#000000) | Gold | Maximum premium impact |
| Dark (< 20% brightness) | Gold | Maintains visibility |
| Medium (20-80% brightness) | White | Best contrast |
| Light (> 80% brightness) | Black | Clean and professional |
| Pure White (#FFFFFF) | Black | Classic tech look |
| Gold (#FFD700) | Black | Avoids color collision |
| Photography | White with shadow | Universal visibility |

### Size Requirements

#### Digital Minimum Sizes
```css
/* Never smaller than these */
.logo-minimum {
  /* Icon only */
  min-width: 24px;
  min-height: 24px;

  /* With text lockup */
  min-width: 120px;
  min-height: 32px;
}
```

#### Responsive Sizing
```typescript
const logoSizes = {
  mobile: 32,     // Mobile navigation
  tablet: 40,     // Tablet header
  desktop: 48,    // Desktop header
  hero: 96,       // Landing page hero
  splash: 256     // Loading screen
}
```

### Clear Space Requirements
The logo requires clear space equal to the height of the 'H' mark on all sides:

```
┌─────────────────────────┐
│                         │
│    ┌─────────────┐     │  <- Clear space = H height
│    │             │     │
│    │   H LOGO    │     │
│    │             │     │
│    └─────────────┘     │
│                         │
└─────────────────────────┘
```

## Application Examples

### 1. Navigation Bar (Desktop)
```jsx
<nav className="bg-black border-b border-white/10">
  <HiveLogoDynamic variant="gold" size="md" glow />
</nav>
```

### 2. Mobile App Header
```jsx
<header className="bg-black px-4 py-2">
  <HiveLogoDynamic variant="gold" size="sm" />
</header>
```

### 3. Landing Page Hero
```jsx
<section className="bg-black">
  <HiveLogoLockup
    variant="gold"
    size="lg"
    tagline="Campus Operating System"
    glow
  />
</section>
```

### 4. Print/Document Header
```jsx
<div className="bg-white print:block">
  <HiveLogoDynamic variant="black" size="md" />
</div>
```

### 5. Social Media Profile
```jsx
<div className="bg-gradient-to-br from-black to-gray-900">
  <HiveLogoDynamic variant="gold" size="xl" glow />
</div>
```

## Animation Guidelines

### Entrance Animation
```css
@keyframes logo-entrance {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-180deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}

.logo-animated-entrance {
  animation: logo-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Hover Effects
```css
/* Subtle hover - Navigation */
.logo-hover-subtle:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

/* Dramatic hover - Hero sections */
.logo-hover-dramatic:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.6));
}
```

### Loading Animation
```css
@keyframes logo-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95);
  }
}

.logo-loading {
  animation: logo-pulse 1.5s ease-in-out infinite;
}
```

## Do's and Don'ts

### DO ✅
- Use gold logo on black for maximum impact
- Add subtle glow effects for premium feel
- Maintain consistent sizing across similar contexts
- Ensure adequate contrast (WCAG AA minimum)
- Use SVG format for scalability

### DON'T ❌
- Stretch or distort the logo
- Change the logo colors beyond the trinity
- Place logo on busy backgrounds without container
- Use logo smaller than minimum sizes
- Rotate beyond ±15 degrees
- Apply filters that alter the core colors

## Special Use Cases

### 1. Premium Features Badge
```jsx
<div className="relative">
  <FeatureCard />
  <HiveLogoDynamic
    variant="gold"
    size="xs"
    className="absolute top-2 right-2"
    glow
  />
</div>
```

### 2. Watermark
```css
.watermark {
  position: fixed;
  bottom: 20px;
  right: 20px;
  opacity: 0.05;
  pointer-events: none;
  transform: rotate(-45deg);
}
```

### 3. Loading Screen
```jsx
<div className="fixed inset-0 bg-black flex items-center justify-center">
  <HiveLogoSpinner size="lg" />
</div>
```

### 4. Error States
```jsx
<div className="text-center">
  <HiveLogoDynamic variant="white" size="md" className="opacity-30" />
  <p className="text-white/60 mt-4">Something went wrong</p>
</div>
```

## Co-branding Rules

When HIVE logo appears with other logos:
1. HIVE logo should be equal or larger in size
2. Maintain 2x clear space between logos
3. Use black variant when other logos are colorful
4. Use gold variant to stand out among monochrome logos

## File Export Guidelines

### For Web
- Format: SVG (preferred) or PNG with transparency
- Resolution: 2x for retina displays
- Optimization: SVGO for SVG, TinyPNG for PNG

### For Print
- Format: Vector PDF or EPS
- Color: CMYK conversion for gold (#FFD700)
  - C: 0%, M: 17%, Y: 100%, K: 0%

### For Video
- Format: PNG sequence or After Effects project
- Frame rate: 60fps for smooth animation
- Resolution: 4K (3840x2160) master

## Version Control

```
v1.0 - Original geometric H mark (Current)
v1.1 - [Future] Refined curves and angles
v2.0 - [Future] 3D version for AR/VR contexts
```

## Legal Protection

- Logo is property of HIVE platform
- Trademark pending on logo and wordmark
- Usage requires explicit permission outside HIVE platform
- Modified versions are strictly prohibited

---

*The HIVE logo: Where geometric precision meets premium aesthetics.*