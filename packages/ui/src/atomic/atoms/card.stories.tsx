import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { Button } from './button';
import { Badge } from './badge';

const meta = {
  title: 'Atoms/Card',
  component: Card,
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/80">Card content goes here. This is a basic card with header and content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Join This Space?</CardTitle>
        <CardDescription>234 members • 12 events this month</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/80">Connect with students interested in computer science, hackathons, and tech careers.</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="gold" className="flex-1">Join Space</Button>
        <Button variant="outline">Preview</Button>
      </CardFooter>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  name: 'Interactive (Hover)',
  render: () => (
    <Card className="w-[380px] hover:border-white/50 transition-all cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Computer Science Club</CardTitle>
            <CardDescription>Student Organization</CardDescription>
          </div>
          <Badge variant="outline" className="border-white/20 text-white">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/80 mb-3">Weekly meetups, hackathons, and career workshops for CS students.</p>
        <div className="flex gap-4 text-xs text-white/60">
          <span>234 members</span>
          <span>•</span>
          <span>12 events</span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const GoldAccentCard: Story = {
  name: 'Gold Accent (HiveLab)',
  render: () => (
    <Card className="w-[380px] border-[#FFD700]/50 bg-[#FFD700]/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-[#FFD700] flex items-center justify-center">
            <span className="text-sm font-bold text-black">⚡</span>
          </div>
          <div>
            <CardTitle>Event RSVP Tool</CardTitle>
            <CardDescription className="text-white/60">HiveLab Template</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/80">Let members RSVP to your events with automatic reminders and capacity limits.</p>
      </CardContent>
      <CardFooter>
        <Button variant="gold" className="w-full">Use Template</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatCard: Story = {
  render: () => (
    <Card className="w-[200px]">
      <CardContent className="p-6">
        <div className="text-center space-y-2">
          <p className="text-4xl font-bold text-white">1,234</p>
          <p className="text-xs text-white/60 uppercase tracking-wide">Profile Views</p>
        </div>
      </CardContent>
    </Card>
  ),
};

export const CompactCard: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-lg">👋</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Welcome to HIVE!</p>
            <p className="text-xs text-white/60">Complete your profile to get started</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const RealWorldExamples: Story = {
  name: 'Real-world Layouts',
  render: () => (
    <div className="flex flex-col gap-6 p-8 max-w-2xl">
      {/* Feed post card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Sarah Chen</p>
              <p className="text-xs text-white/50">2h ago • CS Study Group</p>
            </div>
          </div>
          <p className="text-sm text-white mb-3">
            Anyone want to study for the algorithms midterm tomorrow? Meeting at Davis Hall 3rd floor at 6pm 📚
          </p>
          <div className="flex gap-4 text-xs text-white/60">
            <button className="hover:text-white transition-colors">❤️ 12</button>
            <button className="hover:text-white transition-colors">💬 5</button>
            <button className="hover:text-white transition-colors">🔄 2</button>
          </div>
        </CardContent>
      </Card>

      {/* Space discovery card */}
      <Card className="hover:border-white/50 transition-all cursor-pointer">
        <div className="h-32 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
          <span className="text-5xl">🎨</span>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-white mb-1">UB Design Club</h3>
              <p className="text-xs text-white/60">Student Organization</p>
            </div>
            <Badge variant="outline" className="border-white/20 text-white text-xs">New</Badge>
          </div>
          <p className="text-sm text-white/70 mb-3">
            Learn UI/UX design, collaborate on projects, and build your portfolio.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-xs text-white/60">
              <span>89 members</span>
              <span>•</span>
              <span>5 events</span>
            </div>
            <Button variant="outline" size="sm">Join</Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile widget */}
      <Card>
        <CardHeader>
          <CardTitle>Campus Identity</CardTitle>
          <CardDescription>Your UB student profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Major</span>
            <span className="text-white font-medium">Computer Science</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Year</span>
            <span className="text-white font-medium">Junior</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Graduation</span>
            <span className="text-white font-medium">2026</span>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};