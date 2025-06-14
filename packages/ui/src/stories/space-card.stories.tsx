import { type Meta, type StoryObj } from '@storybook/react';
import { SpaceCard } from '../components/space-card';
import { type Space } from '@hive/core/src/domain/firestore/space';

const meta: Meta<typeof SpaceCard> = {
  title: 'Components/SpaceCard',
  component: SpaceCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'hive',
      values: [{ name: 'hive', value: '#0a0a0a' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    space: {
      control: 'object',
      description: 'The space object to display.',
    },
    href: {
      control: 'text',
      description: 'The URL to navigate to when the card is clicked.',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler that overrides navigation.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceCard>;

const baseSpace: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'tags'> = {
  name: 'Computer Science Majors',
  name_lowercase: 'computer science majors',
  description: 'A community for all CS students to collaborate, share resources, and connect with peers and faculty.',
  bannerUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7948b4?w=800&q=80',
  memberCount: 1248,
  schoolId: 'ub',
  type: 'major',
  status: 'activated',
};

export const Default: Story = {
  args: {
    space: {
      ...baseSpace,
      id: 'cs-majors',
    } as Space,
    href: '/spaces/cs-majors',
  },
};

export const WithoutBanner: Story = {
  args: {
    space: {
      ...baseSpace,
      id: 'no-banner-space',
      bannerUrl: undefined,
      name: 'Philosophy Club',
      description: 'Deep discussions, critical thinking, and exploring life\'s biggest questions together.',
      memberCount: 89,
      type: 'interest',
    } as Space,
    href: '/spaces/no-banner-space',
  },
};

export const LongDescription: Story = {
  args: {
    space: {
      ...baseSpace,
      id: 'long-desc-space',
      name: 'Campus Creatives & Innovators Guild',
      description: 'This is an exceptionally long description designed to test the line-clamping functionality of the card component to ensure that the layout remains stable and visually appealing even when presented with a large amount of text content that exceeds the typical summary length.',
      memberCount: 567,
      type: 'creative',
    } as Space,
    href: '/spaces/long-desc-space',
  },
};

export const DormantStatus: Story = {
  args: {
    space: {
      ...baseSpace,
      id: 'dormant-space',
      name: 'Advanced Robotics Lab',
      description: 'Cutting-edge robotics research and development. Opening soon for student collaboration.',
      bannerUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      memberCount: 0,
      type: 'organization',
      status: 'dormant',
    } as Space,
    href: '/spaces/dormant-space',
  },
};

export const FrozenStatus: Story = {
  args: {
    space: {
      ...baseSpace,
      id: 'frozen-space',
      name: 'Spring Break Planning',
      description: 'Coordinate group trips and activities for spring break. Currently in view-only mode.',
      bannerUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      memberCount: 234,
      type: 'interest',
      status: 'frozen',
    } as Space,
    href: '/spaces/frozen-space',
  },
};

export const SmallMembership: Story = {
  args: {
    space: {
      ...baseSpace,
      id: 'small-space',
      name: 'Latin Dance Society',
      description: 'Learn salsa, bachata, and more. All skill levels welcome!',
      bannerUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
      memberCount: 1,
      type: 'interest',
    } as Space,
    href: '/spaces/small-space',
  },
};

export const LargeMembership: Story = {
  args: {
    space: {
      ...baseSpace,
      id: 'large-space',
      name: 'UB Community',
      description: 'The main residential community for all University at Buffalo students.',
      bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      memberCount: 15847,
      type: 'residential',
    } as Space,
    href: '/spaces/large-space',
  },
};

export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <SpaceCard
        space={{ ...baseSpace, id: '1', name: 'Computer Science Majors', type: 'major' } as Space}
        href="/spaces/cs-majors"
      />
      <SpaceCard
        space={{ 
          ...baseSpace, 
          id: '2', 
          name: 'Ellicott Complex', 
          type: 'residential',
          bannerUrl: undefined,
          memberCount: 567,
          description: 'Connect with your neighbors and build community in Ellicott.'
        } as Space}
        href="/spaces/ellicott"
      />
      <SpaceCard
        space={{ 
          ...baseSpace, 
          id: '3', 
          name: 'Photography Club', 
          type: 'interest',
          status: 'dormant',
          memberCount: 0,
          bannerUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
          description: 'Capture campus life and improve your photography skills together.'
        } as Space}
        href="/spaces/photography"
      />
      <SpaceCard
        space={{ 
          ...baseSpace, 
          id: '4', 
          name: 'Student Government', 
          type: 'organization',
          status: 'frozen',
          memberCount: 89,
          bannerUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80',
          description: 'Voice student concerns and shape campus policy. Currently in transition.'
        } as Space}
        href="/spaces/student-gov"
      />
      <SpaceCard
        space={{ 
          ...baseSpace, 
          id: '5', 
          name: 'Creative Writing Workshop', 
          type: 'creative',
          memberCount: 23,
          bannerUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
          description: 'Share your stories, get feedback, and grow as a writer.'
        } as Space}
        href="/spaces/creative-writing"
      />
      <SpaceCard
        space={{ 
          ...baseSpace, 
          id: '6', 
          name: 'Business Administration', 
          type: 'major',
          memberCount: 2156,
          bannerUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
          description: 'Network with fellow business students and share opportunities.'
        } as Space}
        href="/spaces/business"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
}; 