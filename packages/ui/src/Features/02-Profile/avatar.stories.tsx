import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from '../../atomic/atoms/avatar';
import { Badge } from '../../atomic/atoms/badge';

/**
 * # Avatar (shadcn/ui)
 *
 * **Compound Component** - Radix UI Avatar with image + fallback pattern
 *
 * ## Features
 * - ✅ Automatic fallback when image fails to load
 * - ✅ Smooth loading transition
 * - ✅ Perfect circle with aspect-ratio preservation
 * - ✅ Accessible image labeling
 * - ✅ Composable with status indicators
 *
 * ## Composition
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/user.jpg" alt="User name" />
 *   <AvatarFallback>UN</AvatarFallback>
 * </Avatar>
 * ```
 *
 * ## Pattern
 * - AvatarImage attempts to load image
 * - If successful, shows image
 * - If fails or loading, shows AvatarFallback
 * - Fallback typically shows initials
 */
const meta = {
  title: '02-Profile/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui Avatar built on Radix UI Avatar primitive. Provides automatic fallback handling for failed/loading images. Use Avatar + AvatarImage + AvatarFallback composition pattern.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Avatar with fallback initials
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Avatar with image (simulated with SVG placeholder)
 */
export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23FFD700'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23000'%3EJD%3C/text%3E%3C/svg%3E"
        alt="John Doe"
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Avatar with image. If image fails to load or is loading, fallback automatically shows.',
      },
    },
  },
};

/**
 * Fallback behavior (broken image)
 */
export const FallbackBehavior: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="space-y-2 text-center">
        <Avatar>
          <AvatarImage src="/broken-image.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground">Broken Image</p>
      </div>
      <div className="space-y-2 text-center">
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground">Fallback Only</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar automatically shows fallback when image URL is broken or missing.',
      },
    },
  },
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="space-y-2 text-center">
        <Avatar className="h-8 w-8 text-xs">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground">Small (32px)</p>
      </div>
      <div className="space-y-2 text-center">
        <Avatar className="h-10 w-10">
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground">Default (40px)</p>
      </div>
      <div className="space-y-2 text-center">
        <Avatar className="h-12 w-12">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground">Large (48px)</p>
      </div>
      <div className="space-y-2 text-center">
        <Avatar className="h-16 w-16 text-xl">
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground">XL (64px)</p>
      </div>
      <div className="space-y-2 text-center">
        <Avatar className="h-24 w-24 text-2xl">
          <AvatarFallback>2X</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground">2XL (96px)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use className="h-[size] w-[size]" to control size. Adjust text size with text-* for larger avatars.',
      },
    },
  },
};

/**
 * With status indicator
 */
export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <div className="space-y-2 text-center">
        <div className="relative inline-block">
          <Avatar className="h-12 w-12">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
        </div>
        <p className="text-xs text-muted-foreground">Online</p>
      </div>

      <div className="space-y-2 text-center">
        <div className="relative inline-block">
          <Avatar className="h-12 w-12">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-500 border-2 border-background" />
        </div>
        <p className="text-xs text-muted-foreground">Offline</p>
      </div>

      <div className="space-y-2 text-center">
        <div className="relative inline-block">
          <Avatar className="h-12 w-12">
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500 border-2 border-background" />
        </div>
        <p className="text-xs text-muted-foreground">Away</p>
      </div>

      <div className="space-y-2 text-center">
        <div className="relative inline-block">
          <Avatar className="h-12 w-12">
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-background" />
        </div>
        <p className="text-xs text-muted-foreground">Busy</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Add status indicators with absolute positioning. Use border-background for clean separation.',
      },
    },
  },
};

/**
 * Avatar group/stack
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Overlapping Stack</p>
        <div className="flex -space-x-3">
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 border-2 border-background bg-secondary">
            <AvatarFallback>+5</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">With Count</p>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">J</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">A</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">C</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm text-muted-foreground">and 12 others</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Avatar groups using flex with negative space-x. Add border-background for clean overlaps.',
      },
    },
  },
};

/**
 * With custom colors
 */
export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-destructive text-destructive-foreground">AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-green-500 text-white">CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-blue-500 text-white">EF</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-purple-500 text-white">GH</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize avatar colors using className on AvatarFallback.',
      },
    },
  },
};

/**
 * Real-world: Comment author
 */
export const CommentAuthor: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground">@johndoe</p>
            <span className="text-xs text-muted-foreground">• 2h ago</span>
          </div>
          <p className="text-sm mt-1">
            Just finished the HIVE migration! The new shadcn components are amazing 🚀
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">Alice Brown</p>
            <Badge variant="secondary" className="text-xs">
              Admin
            </Badge>
            <span className="text-xs text-muted-foreground">• 1h ago</span>
          </div>
          <p className="text-sm mt-1">
            Great work! Make sure to check out the new Storybook docs.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage in comment/post layout with user info and timestamp.',
      },
    },
  },
};

/**
 * Real-world: Profile header
 */
export const ProfileHeader: Story = {
  render: () => (
    <div className="max-w-md space-y-4 p-6 border rounded-lg border-border">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
            <p className="text-sm mt-2">Computer Science '25 | ACM Club President</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-sm">
        <div>
          <span className="font-semibold">247</span>
          <span className="text-muted-foreground ml-1">Connections</span>
        </div>
        <div>
          <span className="font-semibold">89</span>
          <span className="text-muted-foreground ml-1">Posts</span>
        </div>
        <div>
          <span className="font-semibold">12</span>
          <span className="text-muted-foreground ml-1">Spaces</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile header with large avatar and user information.',
      },
    },
  },
};

/**
 * Real-world: Space members list
 */
export const MembersList: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <h3 className="font-semibold">Space Members (247)</h3>
      <div className="space-y-2">
        {[
          { name: 'John Doe', handle: 'johndoe', role: 'Admin', initials: 'JD' },
          { name: 'Alice Brown', handle: 'aliceb', role: 'Moderator', initials: 'AB' },
          { name: 'Charlie Davis', handle: 'charlied', role: 'Member', initials: 'CD' },
          { name: 'Emma Foster', handle: 'emmaf', role: 'Member', initials: 'EF' },
        ].map((member) => (
          <div
            key={member.handle}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">@{member.handle}</p>
              </div>
            </div>
            <Badge variant={member.role === 'Member' ? 'secondary' : 'default'} className="text-xs">
              {member.role}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Members list showing avatars with names, handles, and roles.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar className="h-12 w-12">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
      </Avatar>
      <div className="relative inline-block">
        <Avatar className="h-12 w-12">
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Avatars optimized for true black backgrounds. Fallback uses muted background.',
      },
    },
  },
};
