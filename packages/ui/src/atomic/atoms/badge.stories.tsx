import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { Star, Check, AlertTriangle } from 'lucide-react';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Default (White outline)</p>
        <div className="flex gap-2">
          <Badge variant="default">Active</Badge>
          <Badge variant="default">New</Badge>
          <Badge variant="default">Member</Badge>
          <Badge variant="default">Student</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Gold (Leaders, Verification)</p>
        <div className="flex gap-2">
          <Badge variant="gold">Space Leader</Badge>
          <Badge variant="gold">Verified</Badge>
          <Badge variant="gold">Featured</Badge>
          <Badge variant="gold">Premium</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wide">Destructive (Errors, Warnings)</p>
        <div className="flex gap-2">
          <Badge variant="destructive">Error</Badge>
          <Badge variant="destructive">Failed</Badge>
          <Badge variant="destructive">Blocked</Badge>
          <Badge variant="destructive">Expired</Badge>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex gap-3">
        <Badge variant="gold" className="gap-1">
          <Star className="h-3 w-3 fill-current" />
          Space Leader
        </Badge>
        <Badge variant="gold" className="gap-1">
          <Check className="h-3 w-3" />
          Verified
        </Badge>
      </div>

      <div className="flex gap-3">
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Warning
        </Badge>
      </div>

      <div className="flex gap-3">
        <Badge variant="default">234 members</Badge>
        <Badge variant="default">12 events</Badge>
        <Badge variant="default">Active now</Badge>
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  name: 'Real-world Usage',
  render: () => (
    <div className="flex flex-col gap-6 p-8 max-w-lg">
      {/* Space card with badges */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-white mb-1">Computer Science Club</h3>
            <p className="text-xs text-white/60">Student Organization</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="gold" className="gap-1">
              <Star className="h-3 w-3 fill-current" />
              Leader
            </Badge>
            <Badge variant="default">Active</Badge>
          </div>
        </div>
        <p className="text-sm text-white/70">Weekly meetups and hackathons for CS students.</p>
      </div>

      {/* Profile with verification */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white/10" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Sarah Chen</span>
              <Badge variant="gold" className="gap-1">
                <Check className="h-3 w-3" />
                Verified
              </Badge>
            </div>
            <p className="text-sm text-white/60">@sarahchen • Junior</p>
          </div>
        </div>
      </div>

      {/* Event with status badges */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-white mb-1">Hackathon Kickoff</h3>
            <p className="text-xs text-white/60">Tomorrow at 6:00 PM</p>
          </div>
          <Badge variant="gold">Featured</Badge>
        </div>
        <div className="flex gap-2 mt-3">
          <Badge variant="default">50/100 spots</Badge>
          <Badge variant="default">Davis Hall</Badge>
        </div>
      </div>

      {/* Tool status indicators */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-3">My Tools</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Event RSVP System</span>
            <Badge variant="default">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Poll Creator</span>
            <Badge variant="default">Draft</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Old Tool</span>
            <Badge variant="destructive">Deprecated</Badge>
          </div>
        </div>
      </div>

      {/* Space categories */}
      <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-3">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Academic</Badge>
          <Badge variant="default">Student Org</Badge>
          <Badge variant="default">Social</Badge>
          <Badge variant="default">Sports</Badge>
          <Badge variant="default">Arts</Badge>
          <Badge variant="default">Career</Badge>
        </div>
      </div>
    </div>
  ),
};