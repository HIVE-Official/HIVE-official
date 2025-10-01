import type { Meta, StoryObj } from '@storybook/react';
import { SkipNav } from './skip-nav';

const meta = {
  title: 'Atoms/SkipNav',
  component: SkipNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# SkipNav

Accessibility component that provides keyboard users a way to skip repetitive navigation.

## WCAG 2.1 Compliance

- **2.4.1 Bypass Blocks (Level A)**: Provides mechanism to bypass blocks of repeated content
- **2.1.1 Keyboard (Level A)**: Fully keyboard accessible
- **2.4.4 Link Purpose (Level A)**: Clear link text describing destination

## Usage

Place at the **very beginning** of your layout, before any navigation:

\`\`\`tsx
<SkipNav />
<Navigation />
<main id="main-content">
  {/* Your main content */}
</main>
\`\`\`

## Keyboard Navigation

- **Tab**: Focus on skip link (becomes visible)
- **Enter**: Jump to main content
- **Shift+Tab**: Return to skip link

## Testing

1. Press **Tab** key when page loads
2. You should see "Skip to main content" appear
3. Press **Enter** to jump to main content
4. Focus should move past navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    targetId: {
      control: 'text',
      description: 'ID of target element to skip to (without #)',
      table: {
        defaultValue: { summary: 'main-content' },
      },
    },
    children: {
      control: 'text',
      description: 'Text to display when focused',
      table: {
        defaultValue: { summary: 'Skip to main content' },
      },
    },
  },
} satisfies Meta<typeof SkipNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default skip navigation link.
 *
 * **To test**: Press Tab key to see the link appear.
 */
export const Default: Story = {
  args: {},
  render: (args) => (
    <div>
      <SkipNav {...args} />

      {/* Simulated navigation */}
      <nav
        className="bg-[var(--hive-background-secondary)] p-4 mb-4"
        aria-label="Main navigation"
      >
        <div className="flex gap-4">
          <a href="#" className="text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-primary)]">
            Home
          </a>
          <a href="#" className="text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-primary)]">
            Spaces
          </a>
          <a href="#" className="text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-primary)]">
            Feed
          </a>
          <a href="#" className="text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-primary)]">
            Profile
          </a>
        </div>
      </nav>

      {/* Main content target */}
      <main
        id="main-content"
        className="bg-[var(--hive-background-tertiary)] p-6 rounded-lg"
        tabIndex={-1}
      >
        <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">
          Main Content
        </h1>
        <p className="text-[var(--hive-text-secondary)]">
          This is the main content area. When you press Tab at the top of the page,
          the "Skip to main content" link becomes visible. Pressing Enter will jump
          you directly here, bypassing the navigation.
        </p>
      </main>
    </div>
  ),
};

/**
 * Custom target ID for skipping to specific sections.
 */
export const CustomTarget: Story = {
  args: {
    targetId: 'dashboard',
    children: 'Skip to dashboard',
  },
  render: (args) => (
    <div>
      <SkipNav {...args} />

      <nav
        className="bg-[var(--hive-background-secondary)] p-4 mb-4"
        aria-label="Main navigation"
      >
        <p className="text-[var(--hive-text-secondary)] text-sm">
          Press Tab to see custom skip link
        </p>
      </nav>

      <div
        id="dashboard"
        className="bg-[var(--hive-background-tertiary)] p-6 rounded-lg"
        tabIndex={-1}
      >
        <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          Dashboard
        </h1>
        <p className="text-[var(--hive-text-secondary)] mt-2">
          Custom skip target reached!
        </p>
      </div>
    </div>
  ),
};

/**
 * Multiple skip links for complex layouts.
 */
export const MultipleSkipLinks: Story = {
  render: () => (
    <div>
      <SkipNav targetId="main-content" />
      <SkipNav targetId="sidebar">Skip to sidebar</SkipNav>
      <SkipNav targetId="footer">Skip to footer</SkipNav>

      <div className="text-[var(--hive-text-secondary)] p-4 bg-[var(--hive-background-secondary)] mb-4">
        <p className="text-sm">
          Press Tab multiple times to see all skip links
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <aside
          id="sidebar"
          className="col-span-1 bg-[var(--hive-background-tertiary)] p-4 rounded-lg"
          tabIndex={-1}
        >
          <h2 className="text-lg font-semibold text-[var(--hive-text-primary)]">
            Sidebar
          </h2>
        </aside>

        <main
          id="main-content"
          className="col-span-3 bg-[var(--hive-background-tertiary)] p-4 rounded-lg"
          tabIndex={-1}
        >
          <h1 className="text-xl font-bold text-[var(--hive-text-primary)]">
            Main Content
          </h1>
        </main>
      </div>

      <footer
        id="footer"
        className="mt-4 bg-[var(--hive-background-secondary)] p-4 rounded-lg"
        tabIndex={-1}
      >
        <p className="text-[var(--hive-text-secondary)] text-sm">
          Footer Content
        </p>
      </footer>
    </div>
  ),
};

/**
 * Accessibility testing demonstration.
 *
 * This story shows how the SkipNav component helps keyboard users.
 */
export const AccessibilityDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Keyboard Testing Steps

1. **Load this story**
2. **Press Tab** - Skip link appears at top-left
3. **Press Enter** - Jumps to main content
4. **Press Shift+Tab** - Returns to skip link

### Screen Reader Announcement

When focused, screen readers will announce:
> "Skip to main content, link"

### ARIA Structure

\`\`\`html
<a href="#main-content">Skip to main content</a>
<nav aria-label="Main navigation">...</nav>
<main id="main-content" tabIndex={-1}>...</main>
\`\`\`

The \`tabIndex={-1}\` on main allows programmatic focus without adding it to tab order.
        `,
      },
    },
  },
  render: () => (
    <div className="relative">
      <SkipNav />

      <div className="absolute top-16 left-4 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)] rounded-lg p-4 max-w-md">
        <h3 className="text-[var(--hive-brand-primary)] font-semibold mb-2">
          🎯 Testing Instructions
        </h3>
        <ol className="text-[var(--hive-text-secondary)] text-sm space-y-1 list-decimal list-inside">
          <li>Click anywhere on this page to ensure focus is not on skip link</li>
          <li>Press <kbd className="px-2 py-1 bg-[var(--hive-background-tertiary)] rounded">Tab</kbd></li>
          <li>Watch top-left corner for skip link to appear</li>
          <li>Press <kbd className="px-2 py-1 bg-[var(--hive-background-tertiary)] rounded">Enter</kbd> to skip</li>
        </ol>
      </div>

      <nav
        className="mt-32 bg-[var(--hive-background-secondary)] p-6 rounded-lg mb-4"
        aria-label="Main navigation"
      >
        <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">
          Navigation (Skippable)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <a
              key={i}
              href="#"
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] p-2 rounded"
            >
              Navigation Link {i + 1}
            </a>
          ))}
        </div>
      </nav>

      <main
        id="main-content"
        className="bg-[var(--hive-background-tertiary)] p-6 rounded-lg"
        tabIndex={-1}
      >
        <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-4">
          ✅ Main Content (Skip Target)
        </h1>
        <p className="text-[var(--hive-text-secondary)]">
          If the skip link worked correctly, focus jumped directly here,
          bypassing the 12 navigation links above.
        </p>
        <p className="text-[var(--hive-text-secondary)] mt-2">
          This significantly improves the experience for keyboard and screen reader users
          who would otherwise have to tab through all navigation links on every page load.
        </p>
      </main>
    </div>
  ),
};
