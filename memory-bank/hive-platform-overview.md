# HIVE COMPONENT LIBRARY OVERVIEW

**🎨 "Building the UI/UX foundation for a programmable campus OS"**

This document guides the **component library development** for HIVE - a modular, mobile-first campus platform where students build and shape their own digital campus life through programmable Tools.

---

## **🧭 COMPONENT DEVELOPMENT PHILOSOPHY**

### **🔹 Storybook-First Development**
Every component starts in Storybook with comprehensive stories showcasing all variants, states, and use cases. Components are designed as isolated, reusable building blocks before being integrated into the platform.

### **🔹 Mobile-First, Thumb-Zone Native**
Every component is designed for 390px width with gold-standard UX. One-handed navigation, subtle motion, embossed texture. A premium social surface that's elegant but rebellious.

### **🔹 Platform-Context Aware**
While components are isolated, they understand their role in the HIVE ecosystem. Each component can be used across different contexts (Elements in Tools, Tools in Spaces, etc.) while maintaining consistent behavior.

### **🔹 Builder-Ready Design**
Components support the eventual Builder programming model where students will compose these pieces to create custom Tools and experiences.

---

## **🎯 PLATFORM CONTEXT UNDERSTANDING**

### **The 7 Core HIVE Primitives**
Our component library serves these platform concepts:

**🧱 Elements** → Atomic UI components (counters, timers, toggles)
**🧰 Tools** → Composed interfaces using Elements  
**📦 Spaces** → Group containers (dorms, orgs, classes)
**🗓 Calendar** → Time-based campus integration
**🌐 Feed** → Campus-wide activity stream
**🔥 Rituals** → System-driven timed events
**👤 Profile** → Personal identity and participation

### **Component Hierarchy Understanding**
```
DESIGN TOKENS → ATOMIC ELEMENTS → COMPOUND COMPONENTS → LAYOUT SCAFFOLDS → BEHAVIOR PATTERNS → MOBILE VARIANTS
```

---

## **🎨 DESIGN SYSTEM FOUNDATION**

### **🎨 Brand Aesthetic: "One bright note in a monochrome orchestra"**

**Color System:**
- **#0A0A0A**: Primary background (deep black)
- **rgba(255,255,255,0.02)**: Surface overlays (subtle)
- **#FFD700**: Accent gold (the "bright note")
- **White opacity scales**: 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0

**Typography:**
- **Space Grotesk**: Headlines and display text
- **Inter**: Body text and interface elements  
- **JetBrains Mono**: Code and technical content

**Motion Timing:**
- **90ms**: Micro-interactions (hover, focus states)
- **200ms**: Standard transitions (component state changes)
- **350ms**: Emphasized animations (reveals, notifications)
- **Custom easing**: cubic-bezier(0.4, 0.0, 0.2, 1)

### **📱 Mobile-First Constraints**

- **390px minimum width** (iPhone 12 mini baseline)
- **44px minimum touch targets** (Apple HIG standard)
- **8dp grid system** (8, 16, 24, 32, 40, 48px)
- **Safe area respect** (notches, home indicators)
- **One-handed operation priority**

---

## **🧱 COMPONENT CATEGORIES**

### **1. ATOMIC ELEMENTS** `[Building Blocks]`
Basic UI components that can be composed into larger interfaces:

**Form Controls**: Input fields, buttons, toggles, selectors
**Data Display**: Progress bars, badges, avatars, cards
**Feedback**: Loading states, toasts, tooltips, error messages
**Navigation**: Tabs, breadcrumbs, pagination

### **2. COMPOUND COMPONENTS** `[Functional Units]`
Combinations of atomic elements that serve specific purposes:

**Social**: Comment threads, user cards, reaction systems
**Content**: Post cards, event listings, media galleries
**Interactive**: Voting interfaces, RSVP trackers, counters

### **3. LAYOUT SCAFFOLDS** `[Page Structures]`
Larger structural components that organize content:

**Headers**: Navigation bars, space headers, profile headers
**Feeds**: Activity streams, content lists, timeline layouts
**Modals**: Dialogs, drawers, full-screen overlays

### **4. SPECIALIZED INTERFACES** `[Platform-Specific]`
Components unique to HIVE's programmable campus concept:

**Builder Tools**: Element palettes, tool canvases, settings panels
**Campus Context**: Space selectors, event calendars, ritual displays
**System Feedback**: Unlock animations, countdown timers, progress tracking

---

## **🔧 COMPONENT DEVELOPMENT WORKFLOW**

### **Phase 1: Storybook Foundation**
1. **Create Isolated Component** in `packages/ui/src/components/`
2. **Write Comprehensive Stories** in `packages/ui/src/stories/`
3. **Document All Variants** (states, sizes, themes)
4. **Test Accessibility** (screen readers, keyboard nav)
5. **Validate Mobile Experience** (touch targets, responsive behavior)

### **Phase 2: Integration Preparation**
1. **Define Component APIs** (props, events, state management)
2. **Create Usage Examples** (common patterns, edge cases)
3. **Document Builder Context** (how component fits in Tool creation)
4. **Performance Optimization** (bundle size, runtime performance)

### **Phase 3: Platform Integration**
1. **Export from Package** (`packages/ui/src/index.ts`)
2. **Import in Applications** (`apps/web`, `apps/admin`)
3. **Real-World Testing** (actual data, user flows)
4. **Feedback Iteration** (usability, performance, accessibility)

---

## **🎯 DEVELOPMENT PRIORITIES**

### **🚨 FOUNDATION LAYER (Build First)**
Essential components that everything else depends on:

1. **Design Tokens** - Colors, typography, spacing, motion
2. **Basic Form Controls** - Inputs, buttons, selectors
3. **Layout Primitives** - Containers, grids, spacing
4. **Loading & Error States** - Skeletons, spinners, error boundaries

### **⚡ CORE INTERFACE (Build Next)**
Primary user interface components:

1. **Navigation** - Tab bars, headers, breadcrumbs
2. **Content Cards** - Posts, events, spaces, profiles
3. **Feedback Systems** - Toasts, modals, confirmations
4. **Form Patterns** - Multi-step forms, validation, submission

### **🔧 PLATFORM-SPECIFIC (Build Throughout)**
Components unique to HIVE's programmable concept:

1. **Element Components** - Counter, timer, toggle, progress
2. **Tool Interfaces** - Canvas, palette, settings
3. **Campus Context** - Space headers, event calendars
4. **System Behaviors** - Ritual displays, unlock animations

---

## **📋 COMPONENT QUALITY STANDARDS**

### **🎨 Visual Design**
- Consistent with HIVE brand aesthetic (#0A0A0A + #FFD700)
- Mobile-first responsive behavior
- Dark mode optimized (primary design paradigm)
- Subtle depth and texture through shadows/borders

### **⚡ Performance**
- Bundle size optimization (tree-shaking ready)
- Runtime performance (minimal re-renders)
- Loading state management
- Progressive enhancement

### **♿ Accessibility**
- WCAG 2.1 AA compliance minimum
- Screen reader compatibility
- Keyboard navigation support
- Focus management and indication

### **📱 Mobile Experience**
- Touch-friendly interaction areas (44px minimum)
- One-handed operation patterns
- Swipe gestures where appropriate
- Platform-native feeling interactions

### **🔧 Developer Experience**
- Clear TypeScript interfaces
- Comprehensive prop documentation
- Helpful error messages and warnings
- Consistent API patterns across components

---

## **🧪 STORYBOOK ORGANIZATION**

### **Story Structure**
Each component should have stories covering:

1. **Default State** - Basic usage example
2. **All Variants** - Sizes, styles, themes
3. **Interactive States** - Hover, focus, active, disabled
4. **Data States** - Loading, error, empty, success
5. **Mobile Preview** - Touch interactions, responsive behavior
6. **Accessibility** - Keyboard navigation, screen reader testing

### **Documentation Standards**
- **Component Description** - Purpose and use cases
- **Props Table** - All properties with types and descriptions
- **Usage Examples** - Common patterns and integrations
- **Design Notes** - Visual design decisions and rationale
- **Platform Context** - How component fits in HIVE ecosystem

---

## **🚀 ITERATIVE DEVELOPMENT APPROACH**

### **Build → Test → Refine → Integrate**

Since we're building the UI foundation for a complex programmable platform, expect multiple rounds of refinement as we:

1. **Discover new requirements** through platform development
2. **Adjust component APIs** based on real usage patterns  
3. **Add new variants** to support Builder customization
4. **Optimize performance** for mobile campus usage
5. **Enhance accessibility** based on user testing

### **Component Evolution Strategy**
- Start with **core functionality** in Storybook
- Add **platform-specific features** as needed
- Build **Builder customization** capabilities
- Support **advanced campus workflows**

---

This component library serves as the foundation for HIVE's vision of a programmable campus OS where students can build and shape their own digital campus experiences. Every component we build brings that vision closer to reality.