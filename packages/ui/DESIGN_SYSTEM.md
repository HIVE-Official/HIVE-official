# HIVE Design System

> **"Minimal surface. Maximal spark."** — Building elegant, student-first interfaces that amplify creativity while reducing friction.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Visual Identity](#visual-identity)
3. [Design Tokens](#design-tokens)
4. [Typography](#typography)
5. [Component Library](#component-library)
6. [Layout & Composition](#layout--composition)
7. [Motion & Animation](#motion--animation)
8. [Accessibility Guidelines](#accessibility-guidelines)
9. [Development Guidelines](#development-guidelines)
10. [Storybook Documentation](#storybook-documentation)

---

## Design Philosophy

### Core Principles

- **Radical Clarity**: Content over chrome. Every interface element serves a purpose.
- **Tactile Minimalism**: Dark canvas, light text, strategic gold accents.
- **Subtle Magic**: Micro-interactions that reward intent without distraction.
- **Temporal Rhythm**: UI that mirrors academic and seasonal cycles.
- **Builder DNA**: Components are primitives; users remix and create.

### Inspirational Benchmarks

Our aesthetic intentionally draws from:

- **Vercel**: Developer-first minimalism with ultra-flat, high-contrast layouts
- **ChatGPT**: Ambient intelligence with warm, conversational typography
- **Apple**: Polished craft with obsessive attention to detail and human delight

**Synthesis**: HIVE combines stripped-down clarity, approachable AI presence, and perfectionist polish for ambitious students.

---

## Visual Identity

### Logo System

| Variant                | Usage                       | Construction                        |
| ---------------------- | --------------------------- | ----------------------------------- |
| **Primary Horizontal** | App header, site navigation | Hexagon-bee glyph + "HIVE" wordmark |
| **Glyph-only**         | Favicon, buttons, app icon  | 1:1 hexagon grid cell               |
| **Inverted**           | Dark backgrounds            | Stroke glyph, white wordmark        |

**Clear-space**: ≥ 1× glyph height on all sides  
**Never**: Recolor, skew, shadow, or animate without brand approval

### Brand Colors

Our color philosophy: **One bright note in a monochrome orchestra**. Gold is scarce, purposeful, never decorative.

```css
/* Primary Brand Colors */
--bg-canvas: #0a0a0a; /* Root backdrop */
--bg-card: rgba(255, 255, 255, 0.02); /* Surfaces, modals */
--accent-gold: #ffd700; /* Interactive affordances */
--accent-gold-hover: #ffe255; /* Hover & focus states */
--text-primary: #ffffff; /* Headlines, body text */
--text-muted: #a1a1aa; /* Meta text, labels */
--error: #ff5555; /* Destructive states */
--success: #22c55e; /* Positive states */
```

---

## Design Tokens

### Color System

#### Semantic Colors

```typescript
// Core brand colors (from tailwind.config.ts)
colors: {
  'bg-canvas': '#0A0A0A',
  'bg-card': 'rgba(255,255,255,0.02)',
  'accent-gold': '#FFD700',
  'accent-gold-hover': '#FFE255',
  'text-primary': '#FFFFFF',
  'text-muted': '#A1A1AA',
  'error': '#FF5555',
  'success': '#22C55E',
}
```

#### Usage Guidelines

- **bg-canvas**: Primary background for all surfaces
- **bg-card**: Elevated surfaces, modals, cards
- **accent-gold**: Primary CTAs, focus states, brand moments
- **text-primary**: All primary text content
- **text-muted**: Secondary text, metadata, placeholders

### Spacing System

```typescript
// Spacing scale (4px base unit)
spacing: {
  '0': '0',
  '1': '4px',    // 0.25rem
  '2': '8px',    // 0.5rem
  '3': '12px',   // 0.75rem
  '4': '16px',   // 1rem
  '5': '20px',   // 1.25rem
  '6': '24px',   // 1.5rem
  '8': '32px',   // 2rem
  '10': '40px',  // 2.5rem
  '12': '48px',  // 3rem
  '16': '64px',  // 4rem
  '20': '80px',  // 5rem
  '24': '96px',  // 6rem
}
```

### Border Radius

```css
border-radius: {
  'sm': '4px',     /* Small elements */
  'default': '12px', /* Standard components */
  'lg': '12px',    /* Consistent with default */
  'xl': '24px',    /* Prominent surfaces */
  'full': '9999px' /* Circular elements */
}
```

### Shadow System

```css
box-shadow: {
  '1': '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
  '2': '0px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
  '3': '0px 10px 20px 0px rgba(0, 0, 0, 0.15), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)',
  '4': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
}
```

---

## Typography

### Font Stack

- **Display/Headers**: Space Grotesk (600 weight)
- **Body/UI**: Inter (400 weight)
- **Fallback**: System-ui stack

### Type Scale

```typescript
fontSize: {
  'display': ['48px', '56px'],  // Hero headlines
  'h1': ['32px', '40px'],       // Page titles
  'h2': ['24px', '32px'],       // Section headers
  'body': ['16px', '24px'],     // Body text
  'caption': ['12px', '18px'],  // Small text, metadata
}
```

### Typography Usage

| Level   | Class                       | Font          | Weight | Size/Line Height | Usage           |
| ------- | --------------------------- | ------------- | ------ | ---------------- | --------------- |
| Display | `text-display font-display` | Space Grotesk | 600    | 48px/56px        | Hero headlines  |
| H1      | `text-h1 font-display`      | Space Grotesk | 600    | 32px/40px        | Page titles     |
| H2      | `text-h2 font-display`      | Space Grotesk | 600    | 24px/32px        | Section headers |
| Body    | `text-body font-sans`       | Inter         | 400    | 16px/24px        | Body text       |
| Caption | `text-caption font-sans`    | Inter         | 400    | 12px/18px        | Metadata        |

---

## Component Library

### Button System

Our button component uses `class-variance-authority` for systematic variant management:

```typescript
// From packages/ui/src/components/ui/button.tsx
buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-text-primary text-bg-canvas hover:bg-text-primary/90",
        accent:
          "bg-transparent border border-accent-gold text-accent-gold hover:bg-accent-gold/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/10 bg-transparent hover:bg-white/5",
        secondary: "bg-white/10 text-text-primary hover:bg-white/20",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
      radius: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
  }
);
```

#### Button Variants

| Variant         | Usage                             | Visual Style                         |
| --------------- | --------------------------------- | ------------------------------------ |
| **primary**     | Primary actions, form submission  | Gold background, dark text           |
| **accent**      | Secondary CTAs, outlined emphasis | Gold border, transparent background  |
| **outline**     | Tertiary actions                  | White border, transparent background |
| **secondary**   | Supporting actions                | Semi-transparent white background    |
| **ghost**       | Subtle interactions               | Hover-only background                |
| **destructive** | Delete, remove actions            | Red background                       |

### Card System

Cards use consistent elevation and spacing:

```typescript
// From packages/ui/src/components/ui/card.tsx
cardVariants = cva(
  "border border-white/5 bg-white/5 p-6 shadow-3 transition-shadow",
  {
    variants: {
      radius: {
        default: "rounded-xl",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
  }
);
```

#### Card Components

- **Card**: Base container with border, background, and padding
- **CardHeader**: Contains title and description with consistent spacing
- **CardTitle**: H3 element with display font and primary text color
- **CardDescription**: Muted text for subtitles
- **CardContent**: Main content area with no padding
- **CardFooter**: Action area with consistent top spacing

### Available Components

Current UI components in `packages/ui/src/components/ui/`:

- **alert-dialog.tsx** - Modal confirmations and alerts
- **avatar.tsx** - User profile images
- **badge.tsx** - Status indicators and tags
- **button.tsx** - Interactive button system
- **card.tsx** - Content containers
- **dropdown-menu.tsx** - Context menus and dropdowns
- **input.tsx** - Form inputs
- **resizable.tsx** - Adjustable panels
- **scroll-area.tsx** - Custom scrollbars
- **switch.tsx** - Toggle controls
- **tabs.tsx** - Tab navigation
- **textarea.tsx** - Multi-line text input

---

## HIVE Component Library

> **"Primitives that feel like finished product."** Every element here is opinionated enough to radiate brand, yet flexible enough for Builders to remix without ever breaking the vibe.

### 1 · Purpose & Scope

- **Single vocabulary** for all HIVE surfaces. A Button on Feed behaves identically inside a Space or Ritual.
- **Balance opinionated defaults** with extensible variants so freshmen can ship in hours, not weeks.
- **Mirror the atom → molecule → organism hierarchy**: tiny primitives compose into complex social surfaces.

### 2 · Naming & File Structure

- **PascalCase file names** (Button, CardHeader).
- **@hive/ui package exports** only public‑facing components. No deep imports.
- **Variants, sizes, and states** live inside each component file—never scattered.

### 3 · Interaction States

_Applies to every component_

| State                | Behavior                                               | Implementation                                       |
| -------------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| **Idle**             | Uses base token colors                                 | Default variant styling                              |
| **Hover / Focus**    | Light accent of accent‑gold or subtle elevation        | `hover:bg-accent-gold/10` or `hover:shadow-2`        |
| **Active / Pressed** | 95% scale snap with spring                             | `active:scale-95 transition-transform duration-fast` |
| **Loading**          | Inline spinner, never full overlay                     | `<Loader2 className="mr-2 h-4 w-4 animate-spin" />`  |
| **Disabled**         | 40% opacity, pointer events none, still meets contrast | `disabled:opacity-40 disabled:pointer-events-none`   |
| **Surge**            | Indigo glow ring for time‑boxed hype moments           | `ring-2 ring-indigo-500 ring-opacity-50`             |
| **Decay / Archived** | Desaturated, opacity 60%, interactions off             | `opacity-60 saturate-50 pointer-events-none`         |

### 4 · Atoms

#### 4.1 Button

```typescript
// Button variants aligned with HIVE brand
buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-fast",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-gold text-bg-canvas hover:bg-accent-gold-hover active:scale-95",
        secondary:
          "border border-accent-gold bg-transparent text-accent-gold hover:bg-accent-gold/10",
        tertiary: "bg-bg-card text-text-primary hover:bg-white/10",
        destructive: "bg-error text-white hover:bg-error/90",
        icon: "w-10 h-10 p-0 rounded-full",
      },
      size: {
        default: "h-10 px-4 py-2 text-button",
        sm: "h-8 px-3 text-caption",
        lg: "h-12 px-6 text-body",
      },
    },
  }
);
```

- **Primary** – fills with accent‑gold; text bg‑canvas
- **Secondary** – outline accent‑gold; transparent fill
- **Tertiary** – solid bg‑card; subtle white text
- **Destructive** – fills with error
- **IconButton** – square, centers Lucide icon, same variant colors

#### 4.2 Badge

```typescript
// Badge - Size XS only, displays status or count
badgeVariants = cva(
  "inline-flex items-center px-2 py-1 text-caption font-medium rounded-full",
  {
    variants: {
      variant: {
        success: "bg-success/20 text-success border border-success/30",
        error: "bg-error/20 text-error border border-error/30",
        info: "bg-accent-gold/20 text-accent-gold border border-accent-gold/30",
        neutral: "bg-white/10 text-text-muted border border-white/20",
      },
    },
  }
);
```

**Color mapping**:

- Success → success
- Error → error
- Info → accent‑gold 40% opacity
- Neutral → white/text-muted

#### 4.3 Avatar

```typescript
// Avatar - Circular, 48px default
avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-8 w-8",
      default: "h-12 w-12", // 48px default
      lg: "h-16 w-16",
      xl: "h-20 w-20",
    },
  },
});
```

- **Circular, 48px default**
- **Placeholder** uses hashed color and first initial
- **Fallback** gracefully handles missing images

#### 4.4 Divider

```typescript
// Divider - Hairline 1px white 5% opacity
const Divider = () => (
  <div className="border-t border-white/5 w-full" />
);
```

### 5 · Molecules

#### 5.1 Card

```typescript
// Card - Padding space-6, radius lg, elevation tier 2
cardVariants = cva(
  "border border-white/5 bg-bg-card p-6 rounded-lg shadow-2 transition-shadow",
  {
    variants: {
      elevation: {
        1: "shadow-1",
        2: "shadow-2", // default
        3: "shadow-3",
        4: "shadow-4",
      },
    },
  }
);
```

**Structure**:

- **Optional Header, Content, Footer slots**
- **Elevation tier 2 by default**
- **Padding uses space‑6, Radius lg**

#### 5.2 Tabs

```typescript
// Tabs - Underline indicator follows accent-gold
tabsVariants = cva("relative border-b border-white/10", {
  variants: {
    orientation: {
      horizontal: "flex items-center space-x-6",
      vertical: "flex flex-col space-y-2",
    },
  },
});

// Tab trigger with animated underline
tabTriggerVariants = cva(
  "relative px-0 pb-3 text-text-muted hover:text-text-primary transition-colors duration-base",
  {
    variants: {
      active: {
        true: "text-accent-gold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent-gold after:transform after:transition-transform after:duration-base",
        false: "",
      },
    },
  }
);
```

**Features**:

- **Underline indicator** follows accent‑gold
- **Animates on x‑axis** 200ms ease
- **Keyboard accessible** with arrow key navigation

#### 5.3 Modal Sheet

```typescript
// Modal Sheet - Anchors bottom, slides up 16px over 200ms
const ModalSheet = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
    <div className="fixed bottom-0 left-0 right-0 bg-bg-card rounded-t-xl p-6 transform translate-y-0 transition-transform duration-base animate-slide-in-from-bottom">
      {/* Content */}
    </div>
  </div>
);
```

**Features**:

- **Anchors bottom** — slides up 16px over 200ms
- **Backdrop** 50% black with blur
- **Spring animation** using custom easing

#### 5.4 Dropdown Menu

```typescript
// Dropdown Menu - Surface bg-card, shadow tier 3, radius lg
dropdownVariants = cva(
  "bg-bg-card border border-white/10 rounded-lg shadow-3 p-1 min-w-48",
  {
    variants: {
      size: {
        sm: "min-w-32",
        default: "min-w-48",
        lg: "min-w-64",
      },
    },
  }
);
```

**Features**:

- **Surface** bg‑card, shadow tier 3, radius lg
- **Keyboard navigable** — arrow keys cycle, enter triggers
- **Consistent with Radix primitives**

### 6 · Organisms

#### 6.1 ToolCard

```typescript
// ToolCard - Wrapper for any Tool JSON preview
const ToolCard = ({ tool, builder, onOpen }) => (
  <Card className="relative overflow-hidden hover:shadow-3 transition-shadow duration-base">
    {tool.isActive && (
      <div className="absolute inset-0 ring-2 ring-indigo-500 ring-opacity-50 rounded-lg pointer-events-none" />
    )}
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar src={builder.avatar} fallback={builder.initials} size="default" />
      <div className="flex-1">
        <CardTitle className="text-h4">{tool.name}</CardTitle>
        <p className="text-caption text-text-muted">by {builder.name}</p>
      </div>
      <div className="w-8 h-8 rounded bg-accent-gold/20 flex items-center justify-center">
        {tool.icon}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-body-sm text-text-muted mb-4">{tool.description}</p>
    </CardContent>
    <CardFooter>
      <Button variant="secondary" onClick={onOpen} className="w-full">
        Open Tool
      </Button>
    </CardFooter>
  </Card>
);
```

**Features**:

- **Wrapper for any Tool JSON preview**
- **Shows Builder name, Tool icon, "Open" CTA**
- **Glow surge** when Tool enters active cycle

#### 6.2 FeedPost

```typescript
// FeedPost - Author Avatar 40px, content max width 720px
const FeedPost = ({ post, author, reactions }) => (
  <Card className="max-w-3xl mx-auto">
    <CardHeader className="flex flex-row items-start gap-3 pb-4">
      <Avatar src={author.avatar} fallback={author.initials} size="sm" />
      <div className="flex-1">
        <p className="text-body-sm font-medium text-text-primary">{author.name}</p>
        <p className="text-caption text-text-muted">{post.timestamp}</p>
      </div>
    </CardHeader>
    <CardContent className="max-w-[720px]">
      <p className="text-body text-text-primary leading-relaxed">{post.content}</p>
    </CardContent>
    <CardFooter className="flex items-center gap-4 pt-4 border-t border-white/5">
      {reactions.map((reaction) => (
        <Button
          key={reaction.type}
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-accent-gold/10"
        >
          {reaction.icon}
          <span className="text-caption">{reaction.count}</span>
        </Button>
      ))}
    </CardFooter>
  </Card>
);
```

**Features**:

- **Author Avatar 40px**, content max width 720px
- **Reactions bar** anchored below with subtle haptics
- **Responsive layout** with proper spacing

#### 6.3 SpaceScaffold

```typescript
// SpaceScaffold - Six canonical surfaces with tab navigation
const SpaceScaffold = ({ space, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'pinned', label: 'Pinned', icon: Pin },
    { id: 'posts', label: 'Posts', icon: MessageSquare },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'tools', label: 'Tools Stack', icon: Wrench },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'members', label: 'Members', icon: Users },
  ];

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={onTabChange} orientation="horizontal">
        <div className="flex items-center gap-6 px-6 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "flex items-center gap-2 py-4 text-body-sm transition-colors duration-base",
                activeTab === tab.id
                  ? "text-accent-gold border-b-2 border-accent-gold"
                  : "text-text-muted hover:text-text-primary"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </Tabs>

      <div className="flex-1 overflow-auto">
        {/* Each surface uses local state store */}
        <TabContent value={activeTab} />
      </div>
    </div>
  );
};
```

**Features**:

- **Six canonical surfaces**: Pinned, Posts, Events, Tools Stack, Chat, Members
- **Tabs at top** — each surface uses local state store
- **Consistent navigation** with visual state indicators

#### 6.4 ProfileStack

```typescript
// ProfileStack - Now Panel, Calendar, Personal Tools grid with scroll snap
const ProfileStack = ({ profile, events, tools }) => (
  <div className="h-full overflow-y-auto snap-y snap-mandatory">
    {/* Now Panel */}
    <section className="min-h-screen snap-start p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-h2">Right Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-body">{profile.currentStatus}</span>
            </div>
            <p className="text-body-sm text-text-muted">{profile.currentActivity}</p>
          </div>
        </CardContent>
      </Card>
    </section>

    {/* Calendar Mid */}
    <section className="min-h-screen snap-start p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-h2">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Calendar component */}
        </CardContent>
      </Card>
    </section>

    {/* Personal Tools Grid */}
    <section className="min-h-screen snap-start p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-h2">My Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
);
```

**Features**:

- **Now Panel at top**, Calendar mid, Personal Tools grid bottom
- **Scroll snaps** to each block, momentum 80
- **Responsive grid** for tools section

### 7 · Token Usage Rules

| Element     | Token Rule                                                     | Implementation                              |
| ----------- | -------------------------------------------------------------- | ------------------------------------------- |
| **Colors**  | Components consume semantic tokens only; never raw hex         | `bg-accent-gold` not `bg-[#FFD700]`         |
| **Spacing** | Internal padding multiples of space‑4; external margin space‑6 | `p-4 p-6 p-8` / `m-6`                       |
| **Radius**  | Buttons radius‑default; Cards radius‑xl                        | `rounded-md` / `rounded-xl`                 |
| **Shadow**  | Tier chosen by elevation context; don't stack multiple shadows | `shadow-1` `shadow-2` `shadow-3` `shadow-4` |
| **Motion**  | Use fast for hovers, base for navigations                      | `duration-fast` `duration-base`             |

### 8 · Accessibility Commitments

- ✅ **Every interactive component** has visible focus ring in accent‑gold 70% opacity
- ✅ **Text contrast** always ≥ 4.5:1
- ✅ **Icons** accompanied by visually hidden labels where needed
- ✅ **Keyboard navigation** fully supported across all components
- ✅ **Screen reader** compatibility with proper ARIA labels

### 9 · Contribution Workflow

1. **Branch** from `ui/<component‑name>`
2. **Follow token rules** — no magic numbers
3. **Add Storybook story** covering idle → surge states
4. **Run** `pnpm test:accessibility`
5. **Submit PR** — Design Council reviews states and token compliance

#### Development Commands

```bash
# Create new component branch
git checkout -b ui/new-component-name

# Run accessibility tests
pnpm test:accessibility

# Start Storybook for development
pnpm storybook

# Verify token compliance
pnpm lint:tokens
```

---

## Component API Reference

### Atom Components API

#### Button API

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'icon';
  size?: 'sm' | 'default' | 'lg';
  loading?: boolean;
  surge?: boolean; // Indigo glow for hype moments
  asChild?: boolean; // Radix Slot API for composition
}

// Usage Examples
<Button variant="primary" size="lg" loading>
  Submit Application
</Button>

<Button variant="secondary" surge onClick={handleToolActivation}>
  Activate Tool
</Button>

<Button variant="icon" size="default" aria-label="Open menu">
  <Menu className="w-4 h-4" />
</Button>
```

#### Badge API

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'error' | 'info' | 'neutral';
  count?: number; // For notification badges
  pulse?: boolean; // Animated pulse for live updates
}

// Usage Examples
<Badge variant="success">Online</Badge>
<Badge variant="info" count={3} pulse>New</Badge>
<Badge variant="neutral">Draft</Badge>
```

#### Avatar API

```typescript
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string; // Text fallback (initials)
  size?: 'sm' | 'default' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away'; // Status indicator
  hashColor?: boolean; // Generate color from name/id
}

// Usage Examples
<Avatar
  src="/avatars/student.jpg"
  alt="Jane Doe"
  fallback="JD"
  size="default"
  status="online"
/>

<Avatar
  fallback="AB"
  hashColor
  size="lg"
  className="ring-2 ring-accent-gold"
/>
```

#### Divider API

```typescript
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'strong' | 'subtle';
  spacing?: 'sm' | 'md' | 'lg'; // Margin spacing
}

// Usage Examples
<Divider />
<Divider orientation="vertical" className="h-8" />
<Divider variant="strong" spacing="lg" />
```

### Molecule Components API

#### Card API

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3 | 4;
  padding?: 'sm' | 'md' | 'lg'; // Overrides default space-6
  interactive?: boolean; // Hover states and cursor pointer
  surge?: boolean; // Indigo glow ring for active states
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'tight' | 'default' | 'loose';
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'h1' | 'h2' | 'h3' | 'h4'; // Semantic heading level
}

// Usage Examples
<Card elevation={3} interactive surge>
  <CardHeader>
    <CardTitle level="h3">Space: Web Dev Collective</CardTitle>
    <CardDescription>42 active builders</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Building the future of student collaboration...</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Join Space</Button>
  </CardFooter>
</Card>
```

#### Tabs API

```typescript
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'underline' | 'pills' | 'cards';
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  loop?: boolean; // Keyboard navigation loops
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  badge?: React.ReactNode; // Notification badge
}

// Usage Examples
<Tabs value={activeTab} onValueChange={setActiveTab} orientation="horizontal">
  <TabsList>
    <TabsTrigger value="posts" badge={<Badge count={3} />}>
      Posts
    </TabsTrigger>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="tools">Tools</TabsTrigger>
  </TabsList>
  <TabsContent value="posts">
    <PostsList />
  </TabsContent>
</Tabs>
```

#### Modal Sheet API

```typescript
interface ModalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'bottom' | 'top' | 'center';
  backdrop?: 'blur' | 'solid' | 'none';
  dismissible?: boolean;
  children: React.ReactNode;
}

// Usage Examples
<ModalSheet
  open={showModal}
  onOpenChange={setShowModal}
  title="Create New Tool"
  size="lg"
  position="bottom"
  backdrop="blur"
>
  <ToolCreationForm onSubmit={handleSubmit} />
</ModalSheet>
```

#### Dropdown Menu API

```typescript
interface DropdownMenuProps {
  trigger: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  children: React.ReactNode;
}

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
  disabled?: boolean;
  shortcut?: string; // Keyboard shortcut display
  icon?: React.ReactNode;
}

// Usage Examples
<DropdownMenu
  trigger={<Button variant="ghost">Options</Button>}
  align="end"
  sideOffset={4}
>
  <DropdownMenuItem icon={<Edit />} shortcut="⌘E">
    Edit Space
  </DropdownMenuItem>
  <DropdownMenuItem icon={<Share />}>
    Share Space
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem destructive icon={<Trash />}>
    Delete Space
  </DropdownMenuItem>
</DropdownMenu>
```

### Organism Components API

#### ToolCard API

```typescript
interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    isActive?: boolean;
    category?: string;
    lastUsed?: Date;
  };
  builder: {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
  };
  onOpen: (toolId: string) => void;
  onFavorite?: (toolId: string) => void;
  size?: 'compact' | 'default' | 'detailed';
  showBuilder?: boolean;
}

// Usage Examples
<ToolCard
  tool={{
    id: "pomodoro-timer",
    name: "Focus Timer",
    description: "25-minute focus sessions with break reminders",
    icon: <Timer />,
    isActive: true,
    category: "Productivity"
  }}
  builder={{
    id: "jane-doe",
    name: "Jane Doe",
    initials: "JD",
    avatar: "/avatars/jane.jpg"
  }}
  onOpen={handleToolOpen}
  onFavorite={handleFavorite}
  size="default"
  showBuilder
/>
```

#### FeedPost API

```typescript
interface FeedPostProps {
  post: {
    id: string;
    content: string;
    timestamp: Date;
    edited?: Date;
    attachments?: Array<{
      type: 'image' | 'file' | 'link';
      url: string;
      title?: string;
    }>;
  };
  author: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    initials: string;
    verified?: boolean;
  };
  reactions: Array<{
    type: string;
    icon: React.ReactNode;
    count: number;
    isActive: boolean; // User has reacted
  }>;
  onReaction: (postId: string, reactionType: string) => void;
  onReply?: (postId: string) => void;
  onShare?: (postId: string) => void;
  showReplyCount?: boolean;
}

// Usage Examples
<FeedPost
  post={{
    id: "post-123",
    content: "Just shipped a new collaboration tool for group projects! 🚀",
    timestamp: new Date(),
    attachments: [
      { type: 'image', url: '/uploads/screenshot.png', title: 'Tool Preview' }
    ]
  }}
  author={{
    id: "alex-chen",
    name: "Alex Chen",
    handle: "alexbuilds",
    initials: "AC",
    verified: true
  }}
  reactions={[
    { type: 'spark', icon: <Zap />, count: 12, isActive: false },
    { type: 'love', icon: <Heart />, count: 8, isActive: true }
  ]}
  onReaction={handleReaction}
  onReply={handleReply}
  showReplyCount
/>
```

#### SpaceScaffold API

```typescript
interface SpaceScaffoldProps {
  space: {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    isPrivate: boolean;
  };
  activeTab: string;
  onTabChange: (tabId: string) => void;
  permissions: {
    canPost: boolean;
    canManage: boolean;
    canInvite: boolean;
  };
  customTabs?: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    component: React.ComponentType;
  }>;
}

// Usage Examples
<SpaceScaffold
  space={{
    id: "web-dev-collective",
    name: "Web Dev Collective",
    description: "Building modern web applications together",
    memberCount: 47,
    isPrivate: false
  }}
  activeTab="posts"
  onTabChange={setActiveTab}
  permissions={{
    canPost: true,
    canManage: false,
    canInvite: true
  }}
  customTabs={[
    {
      id: 'code-reviews',
      label: 'Code Reviews',
      icon: <Code />,
      badge: 3,
      component: CodeReviewsTab
    }
  ]}
/>
```

#### ProfileStack API

```typescript
interface ProfileStackProps {
  profile: {
    id: string;
    name: string;
    handle: string;
    bio?: string;
    avatar?: string;
    initials: string;
    currentStatus: string;
    currentActivity?: string;
    joinDate: Date;
    stats: {
      toolsCreated: number;
      spacesJoined: number;
      collaborations: number;
    };
  };
  events: Array<{
    id: string;
    title: string;
    date: Date;
    type: 'class' | 'deadline' | 'meeting' | 'personal';
  }>;
  tools: Array<{
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    lastUsed?: Date;
    isPersonal: boolean;
  }>;
  onStatusUpdate?: (status: string) => void;
  onEventCreate?: (event: any) => void;
  onToolLaunch?: (toolId: string) => void;
}

// Usage Examples
<ProfileStack
  profile={{
    id: "current-user",
    name: "Jordan Smith",
    handle: "jordanbuilds",
    bio: "CS major building tools for better collaboration",
    initials: "JS",
    currentStatus: "In the zone - working on final project",
    currentActivity: "Coding React components",
    joinDate: new Date('2023-09-01'),
    stats: {
      toolsCreated: 7,
      spacesJoined: 12,
      collaborations: 34
    }
  }}
  events={upcomingEvents}
  tools={personalTools}
  onStatusUpdate={handleStatusUpdate}
  onEventCreate={handleEventCreate}
  onToolLaunch={handleToolLaunch}
/>
```

### Interaction State Utilities

#### State Management Hooks

```typescript
// Surge state for hype moments
const useSurgeState = (duration: number = 3000) => {
  const [isSurging, setIsSurging] = useState(false);

  const triggerSurge = useCallback(() => {
    setIsSurging(true);
    setTimeout(() => setIsSurging(false), duration);
  }, [duration]);

  return { isSurging, triggerSurge };
};

// Component loading states
const useAsyncState = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (promise: Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await promise;
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

// Archived/decay state management
const useArchiveState = () => {
  const [isArchived, setIsArchived] = useState(false);
  const [isDecaying, setIsDecaying] = useState(false);

  const archive = useCallback(() => {
    setIsDecaying(true);
    setTimeout(() => {
      setIsArchived(true);
      setIsDecaying(false);
    }, 200); // Decay animation duration
  }, []);

  const restore = useCallback(() => {
    setIsArchived(false);
  }, []);

  return { isArchived, isDecaying, archive, restore };
};
```

#### Component State Classes

```typescript
// Utility classes for interaction states
export const interactionStateClasses = {
  idle: "transition-all duration-fast",
  hover: "hover:bg-accent-gold/10 hover:shadow-2",
  focus: "focus:outline-none focus:ring-2 focus:ring-accent-gold/70",
  active: "active:scale-95 transition-transform",
  loading: "relative overflow-hidden",
  disabled: "disabled:opacity-40 disabled:pointer-events-none",
  surge: "ring-2 ring-indigo-500 ring-opacity-50 animate-pulse",
  decay: "opacity-60 saturate-50 pointer-events-none transition-all duration-slow"
};

// Usage in components
const ButtonComponent = ({ surge, archived, ...props }) => (
  <button
    className={cn(
      "base-button-classes",
      interactionStateClasses.idle,
      interactionStateClasses.hover,
      interactionStateClasses.focus,
      interactionStateClasses.active,
      surge && interactionStateClasses.surge,
      archived && interactionStateClasses.decay
    )}
    {...props}
  />
);
```

### Accessibility Patterns

#### Focus Management

```typescript
// Focus trap for modals
const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  return containerRef;
};

// Screen reader announcements
const useAnnounce = () => {
  const announce = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", priority);
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = message;

      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    },
    []
  );

  return { announce };
};
```

---

## Layout & Composition

### Grid System

- **Desktop**: 12-column grid with 16px gutters
- **Mobile**: 4-column grid with 8px gutters

### Spacing Principles

- **Component internal spacing**: Use padding tokens (`p-4`, `p-6`)
- **Component external spacing**: Use margin tokens (`m-4`, `mb-6`)
- **Layout spacing**: Use gap utilities (`gap-4`, `gap-6`)

### Container Widths

```css
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px",
  },
}
```

### Elevation Hierarchy

1. **Canvas** (`bg-canvas`): Base application background
2. **Surfaces** (`bg-card`): Cards, modals, elevated content
3. **Elements**: Interactive components on surfaces

---

## Motion & Animation

### Animation Tokens

```typescript
// Timing functions
transitionTimingFunction: {
  'custom-bezier': 'cubic-bezier(0.33, 0.65, 0, 1)', // iOS-inspired spring
}

// Durations
transitionDuration: {
  'fast': '90ms',    // Instant feedback
  'base': '200ms',   // Standard transitions
  'slow': '350ms',   // Emphasized transitions
}
```

### Animation Patterns

- **Micro-interactions**: 90ms ease-out transforms for buttons
- **Page transitions**: 200ms slide-in for wizard steps
- **Modal entrances**: Fade + scale-up (4%) over 200ms
- **Loading states**: Smooth spinner animations

### Motion Guidelines

- **Respect `prefers-reduced-motion`**: Fall back to instant fade
- **Directional meaning**: Slide direction conveys hierarchy
- **Spring physics**: Use custom cubic-bezier for natural feel
- **Subtle haptics**: 8ms vibration on primary actions (where supported)

---

## Accessibility Guidelines

### Color Contrast

- **Text contrast**: ≥ 4.5:1 ratio for all text
- **Interactive elements**: ≥ 3:1 ratio for UI components
- **Focus indicators**: High contrast, 2px outline ring

### Keyboard Navigation

- **Focus management**: Visible focus ring on all interactive elements
- **Tab order**: Logical, sequential navigation
- **Escape patterns**: Consistent modal and dropdown dismissal

### Screen Reader Support

- **Semantic HTML**: Use proper heading hierarchy and landmarks
- **ARIA labels**: Descriptive labels for all interactive elements
- **Alt text**: Mandatory for all images and icons
- **State communication**: Loading, error, and success states announced

### Internationalization

- **Font fallbacks**: Noto Sans for CJK languages
- **Text expansion**: Design accommodates 30% text growth
- **RTL support**: Planned for Arabic and Hebrew

---

## Development Guidelines

### CSS-in-JS vs Tailwind

**✅ Use Tailwind CSS exclusively**

- Consistent with design system tokens
- Better performance through atomic CSS
- Enhanced developer experience with IntelliSense

**❌ Avoid styled-components or emotion**

- Increases bundle size
- Creates inconsistencies with design tokens

### Component Architecture

```typescript
// ✅ CORRECT: Use class-variance-authority for variants
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      /* ... */
    },
    size: {
      /* ... */
    },
  },
});

// ✅ CORRECT: TypeScript interfaces for props
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}
```

### Import Strategy

```typescript
// ✅ CORRECT: Import from package root
import { Button, Card } from "@hive/ui";

// ❌ WRONG: Deep imports break encapsulation
import { Button } from "@hive/ui/src/components/ui/button";
```

### Styling Patterns

```typescript
// ✅ CORRECT: Use design tokens
className = "bg-bg-card border-white/5 text-text-primary";

// ❌ WRONG: Magic values
className = "bg-gray-900 border-gray-800 text-white";
```

---

## Storybook Documentation

### Component Stories

All components must have corresponding `.stories.tsx` files with:

1. **Default state** - Basic component usage
2. **All variants** - Every variant and size option
3. **Interactive states** - Hover, focus, disabled
4. **Documentation** - Props table and usage guidelines

### Story Structure

```typescript
// Example story structure
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primary button component with multiple variants and states.'
      }
    }
  }
} as Meta<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
};
```

### Storybook Access

- **Development**: `http://localhost:6006`
- **Command**: `cd packages/ui && pnpm storybook`

---

## Implementation Checklist

### For New Components

- [ ] Create component in `packages/ui/src/components/ui/`
- [ ] Use `class-variance-authority` for variants
- [ ] Include proper TypeScript types
- [ ] Add to `packages/ui/src/index.ts` exports
- [ ] Create comprehensive Storybook story
- [ ] Document in this design system guide
- [ ] Test accessibility with screen reader
- [ ] Verify responsive behavior
- [ ] Test keyboard navigation
- [ ] Validate against brand guidelines

### For Component Updates

- [ ] Update variant definitions if needed
- [ ] Regenerate TypeScript types
- [ ] Update Storybook stories
- [ ] Test breaking changes across apps
- [ ] Update documentation
- [ ] Review accessibility impact

---

## Resources & Tools

### Design Tools

- **Figma**: Source of truth for visual designs
- **Storybook**: Component development and documentation
- **Tailwind**: CSS framework and design token system

### Development Tools

- **class-variance-authority**: Component variant system
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon system (1.5px stroke weight)
- **Framer Motion**: Animation library (when needed)

### Quality Assurance

- **ESLint**: Code quality and consistency
- **TypeScript**: Type safety and developer experience
- **Prettier**: Code formatting with Tailwind class sorting
- **Accessibility testing**: Screen readers and automated tools

---

## Governance & Evolution

### Source of Truth

- **Visual Design**: Figma library
- **Implementation**: This design system documentation
- **Version Control**: Semantic versioning (currently v0.9.0 beta)

### Change Process

1. **Proposal**: Create PR with design system updates
2. **Review**: Design Council (3 students + 1 staff)
3. **Approval**: Consensus required for major changes
4. **Implementation**: Update components and documentation
5. **Migration**: Provide clear upgrade path for consumers

### Versioning Strategy

- **Major** (1.0.0): Breaking changes to component APIs
- **Minor** (0.1.0): New components or non-breaking features
- **Patch** (0.0.1): Bug fixes and documentation updates

---

_Last updated: December 2024_  
_Design System Version: v0.9.0 beta_
