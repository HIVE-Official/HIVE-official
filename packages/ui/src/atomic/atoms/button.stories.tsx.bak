import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Heart, Plus, Trash2, ExternalLink } from 'lucide-react';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Primary (White filled)</p>
        <div className="flex gap-3">
          <Button variant="default">Primary Button</Button>
          <Button variant="default" size="sm">Small</Button>
          <Button variant="default" size="lg">Large</Button>
          <Button variant="default" disabled>Disabled</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Gold Accent (High-intent CTAs)</p>
        <div className="flex gap-3">
          <Button variant="gold">Join Space</Button>
          <Button variant="gold" size="sm">Create Tool</Button>
          <Button variant="gold" size="lg">Get Started</Button>
          <Button variant="gold" disabled>Disabled</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Outline (Secondary actions)</p>
        <div className="flex gap-3">
          <Button variant="outline">Outline Button</Button>
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="lg">Large</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Ghost (Tertiary actions)</p>
        <div className="flex gap-3">
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="ghost" size="sm">Small</Button>
          <Button variant="ghost" size="lg">Large</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Destructive (Delete, remove)</p>
        <div className="flex gap-3">
          <Button variant="destructive">Delete</Button>
          <Button variant="destructive" size="sm">Remove</Button>
          <Button variant="destructive" size="lg">Destroy</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Link (Text links)</p>
        <div className="flex gap-3">
          <Button variant="link">Learn More</Button>
          <Button variant="link" size="sm">View Details</Button>
          <Button variant="link" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex gap-3">
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
        <Button variant="gold">
          <Heart className="mr-2 h-4 w-4" />
          Join Space
        </Button>
        <Button variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      <div className="flex gap-3">
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
        <Button variant="ghost">
          <Heart className="mr-2 h-4 w-4" />
          Like
        </Button>
      </div>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-3 p-8">
      <Button variant="default" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
      <Button variant="gold" size="icon">
        <Heart className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <ExternalLink className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Heart className="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  name: 'Real-world Usage',
  render: () => (
    <div className="flex flex-col gap-8 p-8 max-w-md">
      {/* Feed post actions */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <p className="text-sm text-white mb-3">Check out this cool event happening tomorrow!</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Heart className="mr-1 h-3 w-3" />
            React
          </Button>
          <Button variant="ghost" size="sm">Comment</Button>
          <Button variant="ghost" size="sm">Share</Button>
        </div>
      </div>

      {/* Space join CTA */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-1">Computer Science Club</h3>
        <p className="text-sm text-white/70 mb-3">234 members • 12 events this month</p>
        <div className="flex gap-2">
          <Button variant="gold" className="flex-1">Join Space</Button>
          <Button variant="outline">Preview</Button>
        </div>
      </div>

      {/* Profile edit */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <p className="text-sm text-white/70 mb-3">Update your profile to let others know more about you</p>
        <div className="flex gap-2">
          <Button variant="default">Save Changes</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>

      {/* Dangerous action */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <p className="text-sm text-white mb-1 font-semibold">Delete this space?</p>
        <p className="text-sm text-white/70 mb-3">This action cannot be undone.</p>
        <div className="flex gap-2">
          <Button variant="destructive">Delete Forever</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </div>
  ),
};