import type { Meta, StoryObj } from '@storybook/react';
import { ConnectionList, type Connection } from './connection-list';

const meta = {
  title: 'Atomic/Organisms/Connection List',
  component: ConnectionList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectionList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    handle: 'sarachen',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'CS major passionate about AI/ML. Always down for coffee chats!',
    major: 'Computer Science',
    academicYear: 'Junior',
    verified: true,
    mutualConnections: 12,
    isFollowing: true,
  },
  {
    id: '2',
    name: 'Alex Martinez',
    handle: 'alexm',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Data Science major, ML enthusiast. Looking to collaborate on research projects',
    major: 'Data Science',
    academicYear: 'Senior',
    mutualConnections: 8,
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    handle: 'jordanl',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    bio: 'Engineering student, robotics club president',
    major: 'Mechanical Engineering',
    academicYear: 'Junior',
    mutualConnections: 5,
    isFollowing: false,
  },
  {
    id: '4',
    name: 'Taylor Kim',
    handle: 'taylork',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
    bio: 'Business major, startup founder. Building the next big thing!',
    major: 'Business Administration',
    academicYear: 'Sophomore',
    mutualConnections: 3,
    isFollowing: false,
  },
  {
    id: '5',
    name: 'Morgan Davis',
    handle: 'morgand',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
    bio: 'Psychology major, mental health advocate',
    major: 'Psychology',
    academicYear: 'Senior',
    verified: true,
    mutualConnections: 15,
    isFollowing: true,
  },
  {
    id: '6',
    name: 'Casey Johnson',
    handle: 'caseyj',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
    bio: 'Pre-med track, volunteer at the campus clinic',
    major: 'Biology',
    academicYear: 'Junior',
    mutualConnections: 7,
    isFollowing: false,
  },
];

const mockFollowers: Connection[] = mockConnections.slice(0, 4);
const mockFollowing: Connection[] = mockConnections.slice(2, 6);

export const Following: Story = {
  args: {
    connections: mockConnections.filter(c => c.isFollowing),
    variant: 'following',
    showActions: true,
    onToggleFollow: (id, isFollowing) => {
      console.log(`Toggle follow for ${id}: ${isFollowing ? 'follow' : 'unfollow'}`);
    },
    onConnectionClick: (id) => {
      console.log(`Clicked connection: ${id}`);
    },
  },
};

export const Followers: Story = {
  args: {
    connections: mockFollowers,
    variant: 'followers',
    showActions: true,
    onToggleFollow: (id, isFollowing) => {
      console.log(`Toggle follow for ${id}: ${isFollowing ? 'follow' : 'unfollow'}`);
    },
    onConnectionClick: (id) => {
      console.log(`Clicked connection: ${id}`);
    },
  },
};

export const BothTabs: Story = {
  args: {
    connections: mockFollowers,
    following: mockFollowing,
    variant: 'both',
    showActions: true,
    onToggleFollow: (id, isFollowing) => {
      console.log(`Toggle follow for ${id}: ${isFollowing ? 'follow' : 'unfollow'}`);
    },
    onConnectionClick: (id) => {
      console.log(`Clicked connection: ${id}`);
    },
  },
};

export const WithoutActions: Story = {
  args: {
    connections: mockConnections,
    variant: 'following',
    showActions: false,
    onConnectionClick: (id) => {
      console.log(`Clicked connection: ${id}`);
    },
  },
};

export const Empty: Story = {
  args: {
    connections: [],
    variant: 'following',
  },
};

export const EmptyFollowers: Story = {
  args: {
    connections: [],
    variant: 'followers',
  },
};

export const SingleConnection: Story = {
  args: {
    connections: [mockConnections[0]],
    variant: 'following',
    showActions: true,
  },
};
