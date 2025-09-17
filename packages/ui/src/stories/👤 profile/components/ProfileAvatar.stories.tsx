import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from '../../../atomic/atoms/avatar';

// Create a ProfileAvatar wrapper component for the story
const ProfileAvatar = ({ src, alt, size = 'md' }: { src?: string; alt: string; size?: string }) => (
  <Avatar size={size}>
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback>{alt.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
  </Avatar>
);

const meta: Meta<typeof ProfileAvatar> = {
  title: '👤 Profile/Components/ProfileAvatar',
  component: ProfileAvatar,
  parameters: {
    docs: {
      description: {
        component: 'User avatar displays with various sizes and states for HIVE profiles.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileAvatar>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Sarah Chen',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Sarah Chen"
          size="sm"
        />
        <p className="text-xs mt-1">Small (32px)</p>
      </div>
      
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Sarah Chen"
          size="md"
        />
        <p className="text-xs mt-1">Medium (40px)</p>
      </div>
      
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Sarah Chen"
          size="lg"
        />
        <p className="text-xs mt-1">Large (48px)</p>
      </div>
      
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Sarah Chen"
          size="xl"
        />
        <p className="text-xs mt-1">Extra Large (64px)</p>
      </div>
    </div>
  ),
};

export const WithoutImage: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <div className="text-center">
        <ProfileAvatar
          alt="John Doe"
          size="sm"
        />
        <p className="text-xs mt-1">Small Fallback</p>
      </div>
      
      <div className="text-center">
        <ProfileAvatar
          alt="Jane Smith"
          size="md"
        />
        <p className="text-xs mt-1">Medium Fallback</p>
      </div>
      
      <div className="text-center">
        <ProfileAvatar
          alt="Mike Johnson"
          size="lg"
        />
        <p className="text-xs mt-1">Large Fallback</p>
      </div>
    </div>
  ),
};

export const OnlineStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <div className="text-center">
        <div className="relative inline-block">
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Sarah Chen"
            size="lg"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <p className="text-xs mt-1">Online</p>
      </div>
      
      <div className="text-center">
        <div className="relative inline-block">
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Alex Rodriguez"
            size="lg"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 border-2 border-white rounded-full"></div>
        </div>
        <p className="text-xs mt-1">Away</p>
      </div>
      
      <div className="text-center">
        <div className="relative inline-block">
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1494790108755-2616b667c99a?w=150&h=150&fit=crop&crop=face"
            alt="Emma Wilson"
            size="lg"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"></div>
        </div>
        <p className="text-xs mt-1">Offline</p>
      </div>
    </div>
  ),
};

export const CampusContext: Story = {
  name: 'Campus Context Usage',
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="font-bold mb-3">Feed Post Avatars</h3>
        <div className="flex gap-3">
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Sarah Chen"
            size="sm"
          />
          <div>
            <p className="font-medium text-sm">Sarah Chen</p>
            <p className="text-xs text-gray-600">Posted a new study tool</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold mb-3">Space Members</h3>
        <div className="flex -space-x-2">
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Sarah Chen"
            size="sm"
          />
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Alex Rodriguez"
            size="sm"
          />
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1494790108755-2616b667c99a?w=150&h=150&fit=crop&crop=face"
            alt="Emma Wilson"
            size="sm"
          />
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
            +12
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold mb-3">Profile Header</h3>
        <div className="flex items-center gap-4">
          <ProfileAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Sarah Chen"
            size="2xl"
          />
          <div>
            <h2 className="text-xl font-bold">Sarah Chen</h2>
            <p className="text-gray-600">@sarah_chen</p>
            <p className="text-sm">CS Major • Junior • UB Buffalo</p>
          </div>
        </div>
      </div>
    </div>
  ),
};