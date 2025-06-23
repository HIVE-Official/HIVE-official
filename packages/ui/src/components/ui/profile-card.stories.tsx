import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './enhanced-cards';

const meta: Meta = {
  title: 'UI/Profile Card',
  component: ProfileCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tinder-style profile card with full image background, swipe gestures, and interactive buttons. Features HIVE brand colors and 90ms motion timing for micro-interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card size variant',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data with reliable SVG placeholders
const sampleUser = {
  id: '1',
  name: 'Sarah Chen',
  bio: 'Computer Science major passionate about AI and machine learning. Looking to collaborate on innovative projects and meet fellow builders in the HIVE community.',
  major: 'Computer Science',
  year: 'Junior',
  imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkQ3MDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY4QzAwO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyNDAiIHI9IjgwIiBmaWxsPSIjMEEwQTBBIiBvcGFjaXR5PSIwLjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzBBMEEwQSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNhcmFoIENoZW48L3RleHQ+PC9zdmc+',
  isOnline: true,
  mutualConnections: 3,
};

export const Default: Story = {
  args: {
    variant: 'profile',
    user: sampleUser,
    hoverable: true,
    size: 'lg',
  },
};

export const WithoutImage: Story = {
  args: {
    variant: 'profile',
    user: {
      ...sampleUser,
      imageUrl: undefined,
    },
    hoverable: true,
    size: 'lg',
  },
};

export const Offline: Story = {
  args: {
    variant: 'profile',
    user: {
      ...sampleUser,
      name: 'Marcus Rodriguez',
      major: 'Mechanical Engineering', 
      year: 'Senior',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY2NjY2O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzMzMzMztzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQyKSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjI0MCIgcj0iODAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TWFyY3VzIFJvZHJpZ3VlejwvdGV4dD48L3N2Zz4=',
      isOnline: false,
      mutualConnections: 7,
      bio: 'Building the next generation of sustainable transportation. Passionate about clean energy and innovative design solutions.',
    },
    hoverable: true,
    size: 'lg',
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex gap-6 items-end justify-center">
      <ProfileCard
        variant="profile"
        user={{...sampleUser, name: 'Small'}}
        size="sm"
      />
      <ProfileCard
        variant="profile"
        user={{...sampleUser, name: 'Medium'}}
        size="md"
      />
      <ProfileCard
        variant="profile"
        user={sampleUser}
        size="lg"
      />
    </div>
  ),
};

export const InteractiveShowcase: Story = {
  render: () => (
    <div className="flex gap-8 justify-center">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Swipe Enabled</h3>
        <ProfileCard
          variant="profile"
          user={sampleUser}
          size="md"
          hoverable={true}
        />
        <p className="text-xs text-muted-foreground max-w-[200px]">
          Try dragging left/right for swipe gestures
        </p>
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Hover Effects</h3>
        <ProfileCard
          variant="profile"
          user={{
            ...sampleUser,
            name: 'Alex Kim',
            imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDI4NWY0O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzNjZjYztzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQzKSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjI0MCIgcj0iODAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjMyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWxleCBLaW08L3RleHQ+PC9zdmc+',
          }}
          size="md"
          hoverable={true}
        />
        <p className="text-xs text-muted-foreground max-w-[200px]">
          Hover for smooth scaling and shadow effects
        </p>
      </div>
    </div>
  ),
}; 