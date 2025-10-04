import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from './label';
import { Search, Mail, Lock } from 'lucide-react';

const meta = {
  title: 'Atoms/Input',
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type here...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Example text value',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const AllInputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 w-[400px]">
      <div className="space-y-2">
        <Label className="text-white/70">Text Input</Label>
        <Input type="text" placeholder="Enter your name" />
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Email Input</Label>
        <Input type="email" placeholder="you@buffalo.edu" />
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Password Input</Label>
        <Input type="password" placeholder="Enter password" />
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Number Input</Label>
        <Input type="number" placeholder="0" />
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">URL Input</Label>
        <Input type="url" placeholder="https://example.com" />
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Date Input</Label>
        <Input type="date" />
      </div>

      <div className="space-y-2">
        <Label className="text-white/70">Time Input</Label>
        <Input type="time" />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 w-[400px]">
      {/* Search with icon */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <Input className="pl-10" placeholder="Search spaces..." />
      </div>

      {/* Email with icon */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <Input className="pl-10" type="email" placeholder="you@buffalo.edu" />
      </div>

      {/* Password with icon */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <Input className="pl-10" type="password" placeholder="Enter password" />
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  name: 'Real-world Forms',
  render: () => (
    <div className="flex flex-col gap-8 p-8 w-[450px]">
      {/* Profile edit form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Edit Profile</h3>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Display Name</Label>
          <Input defaultValue="Sarah Chen" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Handle</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/40">@</span>
            <Input className="pl-6" defaultValue="sarahchen" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Bio</Label>
          <Input placeholder="Tell us about yourself..." />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Major</Label>
          <Input defaultValue="Computer Science" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-white/70">Year</Label>
            <Input defaultValue="Junior" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-white/70">Graduation</Label>
            <Input type="number" defaultValue="2026" />
          </div>
        </div>
      </div>

      {/* Space creation form */}
      <div className="space-y-4 pt-8 border-t border-white/8">
        <h3 className="text-lg font-semibold text-white">Create a Space</h3>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Space Name</Label>
          <Input placeholder="e.g., UB Study Group" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Category</Label>
          <Input placeholder="e.g., Academic" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Description</Label>
          <Input placeholder="What's this space about?" />
        </div>
      </div>

      {/* Event creation */}
      <div className="space-y-4 pt-8 border-t border-white/8">
        <h3 className="text-lg font-semibold text-white">Create Event</h3>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Event Title</Label>
          <Input placeholder="e.g., Hackathon Kickoff" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-white/70">Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-white/70">Time</Label>
            <Input type="time" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Location</Label>
          <Input placeholder="e.g., Davis Hall 3rd Floor" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-white/70">Capacity</Label>
          <Input type="number" placeholder="Max attendees (optional)" />
        </div>
      </div>
    </div>
  ),
};