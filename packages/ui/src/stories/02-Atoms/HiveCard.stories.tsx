'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { HiveCard, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, HiveCardFooter, HiveButton, Badge } from '../../atomic/atoms';
import { Users, Heart, MessageCircle, Share, MoreVertical } from 'lucide-react';

const meta: Meta<typeof HiveCard> = {
  title: '02-Atoms/HiveCard',
  component: HiveCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Core card component for HIVE with dark theme optimizations and campus-focused styling. Supports multiple variants for different content types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'flat'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-hive-obsidian min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <HiveCardContent>
        <p className="text-hive-platinum">Basic card content</p>
      </HiveCardContent>
    ),
  },
};

export const WithHeader: Story = {
  render: () => (
    <HiveCard className="w-80">
      <HiveCardHeader>
        <HiveCardTitle>Campus Events</HiveCardTitle>
        <HiveCardDescription>
          Upcoming events happening around campus this week
        </HiveCardDescription>
      </HiveCardHeader>
      <HiveCardContent>
        <p className="text-hive-platinum/80">
          Check out what's happening in your community.
        </p>
      </HiveCardContent>
    </HiveCard>
  ),
};

export const SocialPost: Story = {
  render: () => (
    <HiveCard className="w-96">
      <HiveCardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-hive-obsidian">JS</span>
          </div>
          <div>
            <HiveCardTitle className="text-sm">@john_student</HiveCardTitle>
            <HiveCardDescription className="text-xs">
              Computer Science '25 • 2h ago
            </HiveCardDescription>
          </div>
        </div>
        <button className="ml-auto">
          <MoreVertical className="h-4 w-4 text-hive-platinum/60" />
        </button>
      </HiveCardHeader>
      <HiveCardContent>
        <p className="text-hive-platinum mb-4">
          Just aced my algorithms midterm! 🎉 Anyone else feeling good about CS 350 this semester?
        </p>
        <div className="w-full h-32 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
          <span className="text-hive-platinum/50">[Image: Study notes]</span>
        </div>
      </HiveCardContent>
      <HiveCardFooter className="flex justify-between pt-2">
        <div className="flex space-x-6">
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-sm">23</span>
          </button>
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">5</span>
          </button>
          <button className="flex items-center space-x-2 text-hive-platinum/60 hover:text-hive-gold transition-colors">
            <Share className="h-4 w-4" />
          </button>
        </div>
      </HiveCardFooter>
    </HiveCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a social media post card with user avatar, content, and interaction buttons.',
      },
    },
  },
};

export const SpaceCard: Story = {
  render: () => (
    <HiveCard className="w-80">
      <HiveCardContent className="p-0">
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg"></div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <HiveCardTitle className="text-lg">CS Study Group</HiveCardTitle>
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              127
            </Badge>
          </div>
          <HiveCardDescription className="mb-4">
            Late-night coding sessions, algorithm practice, and moral support for CS majors.
          </HiveCardDescription>
          <div className="flex gap-2">
            <HiveButton size="sm" className="flex-1">Join Space</HiveButton>
            <HiveButton variant="outline" size="sm">Preview</HiveButton>
          </div>
        </div>
      </HiveCardContent>
    </HiveCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Space preview card showing community information and join actions.',
      },
    },
  },
};

export const ProfileCard: Story = {
  render: () => (
    <HiveCard className="w-72">
      <HiveCardContent className="p-6 text-center">
        <div className="w-20 h-20 bg-hive-gold rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-xl font-bold text-hive-obsidian">AM</span>
        </div>
        <HiveCardTitle className="mb-1">Alex Morgan</HiveCardTitle>
        <HiveCardDescription className="mb-4">
          Business Admin '24 • Buffalo, NY
        </HiveCardDescription>
        <div className="flex justify-center space-x-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-hive-gold">12</div>
            <div className="text-xs text-hive-platinum/60">Spaces</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-hive-gold">89</div>
            <div className="text-xs text-hive-platinum/60">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-hive-gold">156</div>
            <div className="text-xs text-hive-platinum/60">Friends</div>
          </div>
        </div>
        <HiveButton className="w-full">View Profile</HiveButton>
      </HiveCardContent>
    </HiveCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User profile card with avatar, stats, and quick actions.',
      },
    },
  },
};

export const EventCard: Story = {
  render: () => (
    <HiveCard className="w-80">
      <HiveCardHeader>
        <div className="flex justify-between items-start">
          <div>
            <HiveCardTitle>Study Hall Night</HiveCardTitle>
            <HiveCardDescription>
              Tomorrow at 8:00 PM
            </HiveCardDescription>
          </div>
          <Badge variant="outline" className="border-hive-gold text-hive-gold">
            Tonight
          </Badge>
        </div>
      </HiveCardHeader>
      <HiveCardContent>
        <p className="text-hive-platinum/80 mb-4">
          Join us for a focused study session in the library. Bring your own materials and let's tackle midterms together!
        </p>
        <div className="flex items-center space-x-2 text-sm text-hive-platinum/60 mb-4">
          <span>📍 Lockwood Library, 3rd Floor</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-hive-gold rounded-full border-2 border-hive-obsidian flex items-center justify-center"
              >
                <span className="text-xs font-semibold text-hive-obsidian">
                  {i}
                </span>
              </div>
            ))}
          </div>
          <span className="text-sm text-hive-platinum/60">+12 going</span>
        </div>
      </HiveCardContent>
      <HiveCardFooter>
        <HiveButton className="w-full">I'm Going</HiveButton>
      </HiveCardFooter>
    </HiveCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Event card with date, location, attendee preview, and RSVP action.',
      },
    },
  },
};

export const VariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <HiveCard variant="default" className="p-4">
        <HiveCardTitle className="mb-2">Default</HiveCardTitle>
        <p className="text-hive-platinum/80">Standard card with subtle background</p>
      </HiveCard>

      <HiveCard variant="elevated" className="p-4">
        <HiveCardTitle className="mb-2">Elevated</HiveCardTitle>
        <p className="text-hive-platinum/80">Enhanced shadow for emphasis</p>
      </HiveCard>

      <HiveCard variant="bordered" className="p-4">
        <HiveCardTitle className="mb-2">Bordered</HiveCardTitle>
        <p className="text-hive-platinum/80">Distinct border outline</p>
      </HiveCard>

      <HiveCard variant="flat" className="p-4">
        <HiveCardTitle className="mb-2">Flat</HiveCardTitle>
        <p className="text-hive-platinum/80">Minimal styling approach</p>
      </HiveCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available card variants side by side for comparison.',
      },
    },
  },
};

export const ResponsiveCards: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-hive-gold font-semibold">Mobile View (320px)</h3>
      <div className="max-w-80">
        <HiveCard>
          <HiveCardHeader>
            <HiveCardTitle>Mobile Optimized</HiveCardTitle>
          </HiveCardHeader>
          <HiveCardContent>
            <p className="text-hive-platinum/80">
              Card designed to work perfectly on mobile devices with touch interactions.
            </p>
          </HiveCardContent>
          <HiveCardFooter>
            <HiveButton className="w-full">Mobile Action</HiveButton>
          </HiveCardFooter>
        </HiveCard>
      </div>

      <h3 className="text-hive-gold font-semibold">Desktop View (640px)</h3>
      <div className="max-w-2xl">
        <HiveCard>
          <HiveCardHeader>
            <HiveCardTitle>Desktop Layout</HiveCardTitle>
          </HiveCardHeader>
          <HiveCardContent>
            <p className="text-hive-platinum/80">
              Expanded layout for desktop viewing with more content space and horizontal actions.
            </p>
          </HiveCardContent>
          <HiveCardFooter className="flex justify-end space-x-2">
            <HiveButton variant="outline">Cancel</HiveButton>
            <HiveButton>Confirm</HiveButton>
          </HiveCardFooter>
        </HiveCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive card layouts optimized for different screen sizes.',
      },
    },
  },
};