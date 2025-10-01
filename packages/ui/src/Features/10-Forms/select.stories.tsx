import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '../../atomic/atoms/select';
import { Label } from '../../atomic/atoms/label';

/**
 * # Select (shadcn/ui)
 *
 * **Compound Component** - Accessible dropdown select built on Radix UI
 *
 * ## Features
 * - ✅ Full keyboard navigation (Arrow keys, Enter, Escape)
 * - ✅ Automatic portal rendering (avoids z-index issues)
 * - ✅ Scroll buttons for long lists
 * - ✅ Grouped options with labels
 * - ✅ Disabled states and items
 * - ✅ WCAG 2.1 compliant
 *
 * ## Composition
 * ```tsx
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Option 1</SelectItem>
 *     <SelectItem value="2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * ## vs Native Select
 * - Better styling control
 * - Consistent cross-browser appearance
 * - Better mobile UX
 * - Advanced features (grouping, search)
 */
const meta = {
  title: '10-Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui Select built on Radix UI Select primitive. Provides accessible dropdown with keyboard navigation, portals, and rich composition. Use Select + SelectTrigger + SelectValue + SelectContent + SelectItem pattern.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic select dropdown
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * With label (proper form pattern)
 */
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[280px]">
      <Label htmlFor="space-select">Select Space</Label>
      <Select>
        <SelectTrigger id="space-select">
          <SelectValue placeholder="Choose a space" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="acm">ACM Club</SelectItem>
          <SelectItem value="gaming">UB Gaming</SelectItem>
          <SelectItem value="study">Study Group</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Always pair Select with Label for accessibility. Connect with id prop on trigger.',
      },
    },
  },
};

/**
 * Grouped options
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a space category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Student Organizations</SelectLabel>
          <SelectItem value="acm">ACM Club</SelectItem>
          <SelectItem value="ieee">IEEE</SelectItem>
          <SelectItem value="robotics">Robotics Club</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Social</SelectLabel>
          <SelectItem value="gaming">UB Gaming</SelectItem>
          <SelectItem value="esports">Esports Team</SelectItem>
          <SelectItem value="boardgames">Board Game Club</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Academic</SelectLabel>
          <SelectItem value="study">Study Group</SelectItem>
          <SelectItem value="tutoring">Peer Tutoring</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Group related options with SelectGroup + SelectLabel. Use SelectSeparator between groups.',
      },
    },
  },
};

/**
 * Disabled items
 */
export const DisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a space" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="acm">ACM Club</SelectItem>
        <SelectItem value="gaming" disabled>
          UB Gaming (Full)
        </SelectItem>
        <SelectItem value="study">Study Group</SelectItem>
        <SelectItem value="robotics" disabled>
          Robotics (Invite Only)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disable individual items with disabled prop. Useful for full/restricted options.',
      },
    },
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled entire select with disabled prop on root Select component.',
      },
    },
  },
};

/**
 * Different widths
 */
export const Widths: Story = {
  render: () => (
    <div className="space-y-4">
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Narrow" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Default width" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[400px]">
          <SelectValue placeholder="Wide" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control width with className="w-[size]" on SelectTrigger.',
      },
    },
  },
};

/**
 * Long list with scroll
 */
export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select major" />
      </SelectTrigger>
      <SelectContent>
        {[
          'Computer Science',
          'Computer Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Biomedical Engineering',
          'Civil Engineering',
          'Chemical Engineering',
          'Mathematics',
          'Physics',
          'Chemistry',
          'Biology',
          'Psychology',
          'Business Administration',
          'Economics',
          'English',
          'History',
          'Political Science',
        ].map((major) => (
          <SelectItem key={major.toLowerCase().replace(/\s+/g, '-')} value={major}>
            {major}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Long lists automatically show scroll buttons. Max height is constrained by Radix.',
      },
    },
  },
};

/**
 * Real-world: Space filter
 */
export const SpaceFilter: Story = {
  render: () => (
    <div className="max-w-md p-4 border rounded-lg border-border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Browse Spaces</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="category-filter" className="text-sm text-muted-foreground">
            Category:
          </Label>
          <Select defaultValue="all">
            <SelectTrigger id="category-filter" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectSeparator />
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <div className="p-3 border rounded border-border">
          <p className="font-medium text-sm">ACM Club</p>
          <p className="text-xs text-muted-foreground">247 members • Tech</p>
        </div>
        <div className="p-3 border rounded border-border">
          <p className="font-medium text-sm">UB Gaming</p>
          <p className="text-xs text-muted-foreground">512 members • Gaming</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world space browsing with category filter using defaultValue.',
      },
    },
  },
};

/**
 * Real-world: Settings form
 */
export const SettingsForm: Story = {
  render: () => (
    <div className="max-w-md space-y-6 p-6 border rounded-lg border-border">
      <div>
        <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="visibility">Profile Visibility</Label>
        <Select defaultValue="public">
          <SelectTrigger id="visibility">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="friends">Friends Only</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Who can see your profile information</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notifications">Notification Frequency</Label>
        <Select defaultValue="realtime">
          <SelectTrigger id="notifications">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realtime">Real-time</SelectItem>
            <SelectItem value="hourly">Hourly Digest</SelectItem>
            <SelectItem value="daily">Daily Digest</SelectItem>
            <SelectItem value="off">Off</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">How often you receive notifications</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="theme">Theme Preference</Label>
        <Select defaultValue="dark">
          <SelectTrigger id="theme">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Choose your interface theme</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete settings form with multiple selects, labels, and helper text.',
      },
    },
  },
};

/**
 * Real-world: Sort dropdown
 */
export const SortDropdown: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Feed Posts</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="comments">Most Comments</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="p-3 border rounded border-border">Post 1...</div>
        <div className="p-3 border rounded border-border">Post 2...</div>
        <div className="p-3 border rounded border-border">Post 3...</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sort dropdown pattern for feeds and lists. Common UI pattern in HIVE.',
      },
    },
  },
};

/**
 * Responsive full-width
 */
export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="mobile-select">Select Space</Label>
      <Select>
        <SelectTrigger id="mobile-select" className="w-full">
          <SelectValue placeholder="Choose a space" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="acm">ACM Club</SelectItem>
          <SelectItem value="gaming">UB Gaming</SelectItem>
          <SelectItem value="study">Study Group</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Full-width select for mobile. Use className="w-full" on SelectTrigger.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  render: () => (
    <div className="space-y-4 w-[280px]">
      <div className="space-y-2">
        <Label htmlFor="dark-select">Select Space</Label>
        <Select>
          <SelectTrigger id="dark-select">
            <SelectValue placeholder="Choose a space" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Student Orgs</SelectLabel>
              <SelectItem value="acm">ACM Club</SelectItem>
              <SelectItem value="ieee">IEEE</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Social</SelectLabel>
              <SelectItem value="gaming">UB Gaming</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Select optimized for true black backgrounds with minimal borders.
        </p>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Select dropdown on true black background. Portal content uses subtle borders.',
      },
    },
  },
};
