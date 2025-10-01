import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../atomic/atoms/button';
import { Loader2, Mail, Download, ChevronRight, Plus } from 'lucide-react';

/**
 * # Button (shadcn/ui)
 *
 * **Foundation Component** - Accessible button built on Radix UI primitives
 *
 * ## Features
 * - ✅ Full keyboard navigation support
 * - ✅ WCAG 2.2 compliant focus states
 * - ✅ Slot composition for custom elements
 * - ✅ Vercel Geist-inspired minimal design
 * - ✅ Gold accent for primary CTAs
 *
 * ## Design Philosophy
 * - Monochrome variants for most actions
 * - Gold (primary) reserved for critical CTAs
 * - Minimal decoration, maximum clarity
 * - True black backgrounds (#000)
 */
const meta = {
  title: '11-Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui Button component with Vercel Geist customization. Uses Radix UI Slot for composition. Supports all standard HTML button attributes plus asChild for custom element rendering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
      description: 'Visual variant - use "default" (gold) sparingly for CTAs',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
      description: 'Size variant - all maintain 44px+ minimum for touch targets',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (Radix Slot pattern)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default gold button - use sparingly for primary CTAs only
 */
export const Default: Story = {
  args: {
    children: 'Join Space',
    variant: 'default',
  },
};

/**
 * All button variants showcasing the Vercel Geist-inspired palette
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap items-center">
      <Button variant="default">Primary (Gold)</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Variant Guidelines:**\n- `default` (gold): Primary CTAs only\n- `outline`: Most common for actions\n- `secondary`: Subtle backgrounds\n- `ghost`: Minimal chrome\n- `link`: Text-only\n- `destructive`: Delete/remove actions',
      },
    },
  },
};

/**
 * Size variants - all mobile-optimized
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All sizes maintain WCAG touch target minimums (44px+)',
      },
    },
  },
};

/**
 * Icon buttons for compact actions
 */
export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Button size="icon" variant="default">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <Download className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive">
        <span>×</span>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons for compact UIs. Always include aria-label for accessibility.',
      },
    },
  },
};

/**
 * Buttons with icons alongside text
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-3 flex-col sm:flex-row">
      <Button>
        <Mail className="h-4 w-4" />
        Send Email
      </Button>
      <Button variant="outline">
        Download
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="secondary">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'shadcn Button automatically handles icon spacing with `gap-2`. Icons are automatically sized with `[&_svg]:size-4`.',
      },
    },
  },
};

/**
 * Interactive states (hover, focus, disabled)
 */
export const States: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Button>Normal</Button>
      <Button className="hover:bg-primary/90">Hover</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Focus states show 2px gold ring (WCAG 2.2 compliant). Disabled buttons have 50% opacity.',
      },
    },
  },
};

/**
 * Loading states for async actions
 */
export const Loading: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Button disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        Processing
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disable button and show spinner for async operations. Use lucide-react icons.',
      },
    },
  },
};

/**
 * Full-width responsive button
 */
export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Button className="w-full">Join Now</Button>
      <Button className="w-full" variant="outline">
        Learn More
      </Button>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Use `className="w-full"` for full-width buttons on mobile.',
      },
    },
  },
};

/**
 * As child element (advanced composition)
 */
export const AsChild: Story = {
  render: () => (
    <div className="flex gap-3 flex-col">
      <Button asChild>
        <a href="https://hive.com" target="_blank" rel="noopener noreferrer">
          External Link
          <ChevronRight className="h-4 w-4" />
        </a>
      </Button>
      <Button asChild variant="outline">
        <button type="submit" form="my-form">
          Custom Submit
        </button>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Radix Slot pattern:** Use `asChild` to render Button styles on custom elements like `<a>` or `<Link>`. The child element inherits all Button props.',
      },
    },
  },
};

/**
 * Real-world usage example
 */
export const RealWorldExample: Story = {
  render: () => (
    <div className="max-w-md p-6 bg-card rounded-lg border border-border space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Join ACM Club</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Weekly coding challenges and tech talks
        </p>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1">Join Space</Button>
        <Button variant="outline" size="icon">
          <span className="sr-only">More options</span>
          ⋯
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typical usage in a Space card with primary CTA and secondary action.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  args: {
    children: 'Dark Theme Default',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story:
          'HIVE uses true black (#000) by default. All variants tested for WCAG AAA contrast on black backgrounds.',
      },
    },
  },
};
