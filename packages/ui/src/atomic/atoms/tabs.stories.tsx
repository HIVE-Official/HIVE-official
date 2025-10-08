import type { Meta, StoryObj } from '@storybook/react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './tabs';
import { Card } from './card';

const meta = {
  title: 'Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#000000' }] },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[500px]">
      <TabsList className="w-full">
        <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
        <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
        <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="p-4">
          <p className="text-white/70">Manage your account settings and preferences.</p>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="p-4">
          <p className="text-white/70">Update your password and security settings.</p>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card className="p-4">
          <p className="text-white/70">Control how and when you receive notifications.</p>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const ProfileTabs: Story = {
  render: () => (
    <Tabs defaultValue="posts" className="w-[600px]">
      <TabsList className="w-full">
        <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
        <TabsTrigger value="spaces" className="flex-1">Spaces</TabsTrigger>
        <TabsTrigger value="connections" className="flex-1">Connections</TabsTrigger>
        <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="space-y-3 pt-4">
          <Card className="p-4">
            <p className="text-white text-sm">Posted in CS Study Group • 2 hours ago</p>
            <p className="text-white/70 text-sm mt-2">Anyone free to study for the algorithms midterm?</p>
          </Card>
          <Card className="p-4">
            <p className="text-white text-sm">Posted in Engineering Social • 1 day ago</p>
            <p className="text-white/70 text-sm mt-2">Great turnout at yesterday's event! 🎉</p>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="spaces">
        <div className="pt-4 text-white/70">Showing 12 joined spaces...</div>
      </TabsContent>
      <TabsContent value="connections">
        <div className="pt-4 text-white/70">87 connections on campus...</div>
      </TabsContent>
      <TabsContent value="activity">
        <div className="pt-4 text-white/70">Recent activity timeline...</div>
      </TabsContent>
    </Tabs>
  ),
};

export const SpaceTabs: Story = {
  render: () => (
    <Tabs defaultValue="feed" className="w-[700px]">
      <TabsList className="w-full">
        <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
        <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
        <TabsTrigger value="members" className="flex-1">Members</TabsTrigger>
        <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
      </TabsList>
      <TabsContent value="feed">
        <Card className="p-6 mt-4">
          <h3 className="text-white font-semibold mb-2">Latest Posts</h3>
          <p className="text-white/70 text-sm">This is where members share updates and discussions.</p>
        </Card>
      </TabsContent>
      <TabsContent value="events">
        <Card className="p-6 mt-4">
          <h3 className="text-white font-semibold mb-2">Upcoming Events</h3>
          <p className="text-white/70 text-sm">Study session • Tomorrow at 6pm</p>
        </Card>
      </TabsContent>
      <TabsContent value="members">
        <Card className="p-6 mt-4">
          <h3 className="text-white font-semibold mb-2">87 Members</h3>
          <p className="text-white/70 text-sm">Active students in this space.</p>
        </Card>
      </TabsContent>
      <TabsContent value="about">
        <Card className="p-6 mt-4">
          <h3 className="text-white font-semibold mb-2">About CS Study Group</h3>
          <p className="text-white/70 text-sm">A community for computer science students to collaborate and learn together.</p>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const CompactTabs: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
        <TabsTrigger value="sports">Sports</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="pt-4">
        <p className="text-white/70 text-sm">Showing all spaces...</p>
      </TabsContent>
      <TabsContent value="academic" className="pt-4">
        <p className="text-white/70 text-sm">Academic spaces only...</p>
      </TabsContent>
      <TabsContent value="social" className="pt-4">
        <p className="text-white/70 text-sm">Social spaces only...</p>
      </TabsContent>
      <TabsContent value="sports" className="pt-4">
        <p className="text-white/70 text-sm">Sports spaces only...</p>
      </TabsContent>
    </Tabs>
  ),
};