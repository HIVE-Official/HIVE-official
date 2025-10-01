import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../atomic/atoms/badge';
import { X } from 'lucide-react';

/**
 * # Badge (shadcn/ui)
 *
 * **Simple Component** - Inline label/tag for status, categories, counts
 *
 * ## Features
 * - ✅ Four semantic variants (default, secondary, destructive, outline)
 * - ✅ Compact inline display
 * - ✅ Composable with icons
 * - ✅ WCAG compliant contrast
 * - ✅ Hover states for interactive badges
 *
 * ## Usage
 * - Category tags (e.g., "Tech", "Events")
 * - Status indicators (e.g., "New", "Active", "Offline")
 * - Counts/metrics (e.g., "5 members", "+12")
 * - Role labels (e.g., "Admin", "Moderator")
 *
 * ## Design Philosophy
 * - Use sparingly - too many badges = visual noise
 * - Prefer secondary variant for non-critical labels
 * - Reserve default (gold) for primary/featured items
 * - Use destructive for errors or urgent status
 */
const meta = {
  title: '11-Shared/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui Badge component for inline labels and tags. Use for categories, status indicators, counts, and role labels. Supports four semantic variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Visual variant - default (gold) for featured, secondary for most labels',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge (gold accent)
 */
export const Default: Story = {
  args: {
    children: 'New',
  },
};

/**
 * All badge variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Badge variant="default">Default (Gold)</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Variant Guidelines:**\\n- `default` (gold): Featured items, "New" labels\\n- `secondary`: Most common - categories, tags\\n- `destructive`: Errors, urgent status\\n- `outline`: Subtle emphasis',
      },
    },
  },
};

/**
 * Status indicators
 */
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
        Online
      </Badge>
      <Badge variant="secondary" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-500 mr-1.5" />
        Offline
      </Badge>
      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-1.5" />
        Away
      </Badge>
      <Badge variant="destructive">
        <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5" />
        Busy
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status badges with dot indicators. Use custom colors for semantic states.',
      },
    },
  },
};

/**
 * Category tags (most common usage)
 */
export const CategoryTags: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="secondary">Tech</Badge>
      <Badge variant="secondary">Coding</Badge>
      <Badge variant="secondary">Events</Badge>
      <Badge variant="secondary">Gaming</Badge>
      <Badge variant="secondary">Social</Badge>
      <Badge variant="secondary">Academic</Badge>
      <Badge variant="secondary">Sports</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Category tags using secondary variant. Most common badge pattern in HIVE.',
      },
    },
  },
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Badge>
        <span className="mr-1">⭐</span>
        Featured
      </Badge>
      <Badge variant="secondary">
        <span className="mr-1">📅</span>
        Event
      </Badge>
      <Badge variant="destructive">
        <span className="mr-1">🚨</span>
        Urgent
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with emoji or icon prefix. Keep icons small for proper alignment.',
      },
    },
  },
};

/**
 * Interactive badges (dismissible)
 */
export const InteractiveBadges: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Badge variant="secondary" className="pr-1 cursor-pointer hover:bg-secondary">
        Tech
        <button className="ml-1 rounded-sm hover:bg-secondary-foreground/20 p-0.5">
          <X className="h-3 w-3" />
        </button>
      </Badge>
      <Badge variant="secondary" className="pr-1 cursor-pointer hover:bg-secondary">
        Events
        <button className="ml-1 rounded-sm hover:bg-secondary-foreground/20 p-0.5">
          <X className="h-3 w-3" />
        </button>
      </Badge>
      <Badge variant="outline" className="pr-1 cursor-pointer hover:bg-secondary/50">
        Gaming
        <button className="ml-1 rounded-sm hover:bg-foreground/20 p-0.5">
          <X className="h-3 w-3" />
        </button>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Dismissible badges with close button. Add cursor-pointer and hover state for interactivity.',
      },
    },
  },
};

/**
 * Count badges
 */
export const CountBadges: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="flex items-center gap-2">
        <span className="text-sm">Members</span>
        <Badge variant="secondary">247</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Posts</span>
        <Badge variant="secondary">1.2K</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">New</span>
        <Badge>12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Unread</span>
        <Badge variant="destructive">3</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges for counts and metrics. Use default/destructive for attention-grabbing counts.',
      },
    },
  },
};

/**
 * Role/permission badges
 */
export const RoleBadges: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Badge>Admin</Badge>
      <Badge>Moderator</Badge>
      <Badge variant="secondary">Member</Badge>
      <Badge variant="secondary">Verified</Badge>
      <Badge variant="outline">Guest</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Role indicators. Use default (gold) for privileged roles, secondary for standard.',
      },
    },
  },
};

/**
 * Size customization
 */
export const CustomSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
        Tiny
      </Badge>
      <Badge variant="secondary" className="text-xs px-2 py-0.5">
        Small (Default)
      </Badge>
      <Badge variant="secondary" className="text-sm px-3 py-1">
        Medium
      </Badge>
      <Badge variant="secondary" className="text-base px-4 py-1.5">
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom sizes using className. Default is text-xs with px-2.5 py-0.5.',
      },
    },
  },
};

/**
 * Real-world: Space card tags
 */
export const SpaceCardTags: Story = {
  render: () => (
    <div className="max-w-sm p-4 border rounded-lg border-border space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
          🖥️
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">ACM Club</h3>
          <p className="text-xs text-muted-foreground">247 members</p>
        </div>
        <Badge>New</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Weekly coding challenges, tech talks, and hackathons.
      </p>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary">Tech</Badge>
        <Badge variant="secondary">Coding</Badge>
        <Badge variant="secondary">Events</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world space card with "New" badge and category tags.',
      },
    },
  },
};

/**
 * Real-world: Notification with badge
 */
export const NotificationBadge: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div>
            <p className="text-sm font-medium">New space invitation</p>
            <p className="text-xs text-muted-foreground">ACM Club invited you</p>
          </div>
        </div>
        <Badge>1</Badge>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-transparent" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">You joined UB Gaming</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Notification list with unread badge. Use dot indicator + badge for new items.',
      },
    },
  },
};

/**
 * Real-world: User profile with badges
 */
export const ProfileBadges: Story = {
  render: () => (
    <div className="max-w-md p-6 border rounded-lg border-border space-y-4">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-2xl">
          JD
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-lg">John Doe</h3>
            <Badge variant="secondary" className="text-[10px]">
              Verified
            </Badge>
            <Badge className="text-[10px]">Admin</Badge>
          </div>
          <p className="text-sm text-muted-foreground">@johndoe</p>
          <p className="text-sm mt-2">Computer Science '25 | ACM President</p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary">Tech Enthusiast</Badge>
        <Badge variant="secondary">Open Source</Badge>
        <Badge variant="secondary">Hackathons</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile with verification, role badges, and interest tags.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Badge variant="default">Featured</Badge>
      <Badge variant="secondary">Tech</Badge>
      <Badge variant="destructive">Urgent</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story:
          'Badges optimized for true black backgrounds. Gold (default) provides strong contrast.',
      },
    },
  },
};
