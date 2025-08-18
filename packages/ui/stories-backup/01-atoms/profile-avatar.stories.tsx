import type { Meta, StoryObj } from '@storybook/react';
import { ProfileAvatar } from '../../atomic/atoms/profile-avatar';

const meta: Meta<typeof ProfileAvatar> = {
  title: '01-Atoms/Profile Avatar',
  component: ProfileAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Profile Avatar component with upload functionality and fallback handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Profile image URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size variant',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text (usually initials)',
    },
    showUpload: {
      control: 'boolean',
      description: 'Show upload button on hover',
    },
    onUpload: {
      action: 'upload clicked',
      description: 'Upload handler function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic states
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    fallback: 'JD',
    size: 'md',
  },
};

export const WithFallback: Story = {
  args: {
    src: '', // Empty to trigger fallback
    alt: 'Jane Smith',
    fallback: 'JS',
    size: 'md',
  },
};

export const WithUpload: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face',
    alt: 'Sarah Wilson',
    fallback: 'SW',
    size: 'md',
    showUpload: true,
  },
};

// Size variations
export const Small: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    alt: 'Mike Johnson',
    fallback: 'MJ',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    alt: 'Emily Chen',
    fallback: 'EC',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    alt: 'David Park',
    fallback: 'DP',
    size: 'xl',
  },
};

// Interactive states
export const Loading: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Loading user',
    fallback: 'LU',
    size: 'md',
    // You might want to add a loading prop to the component
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-image-url.jpg',
    alt: 'Broken Image',
    fallback: 'BI',
    size: 'md',
  },
};

// Campus scenarios
export const StudentProfile: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    alt: 'Alex Rodriguez - CS Major',
    fallback: 'AR',
    size: 'md',
    showUpload: true,
  },
};

export const FacultyProfile: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1559548331-f9cb98001426?w=150&h=150&fit=crop&crop=face',
    alt: 'Dr. Maria Santos - Computer Science Professor',
    fallback: 'MS',
    size: 'lg',
  },
};

// Collection view
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-6 p-6 bg-hive-background-primary">
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Small"
          fallback="SM"
          size="sm"
        />
        <p className="mt-2 text-sm text-hive-text-mutedLight">Small</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face"
          alt="Medium"
          fallback="MD"
          size="md"
        />
        <p className="mt-2 text-sm text-hive-text-mutedLight">Medium</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          alt="Large"
          fallback="LG"
          size="lg"
        />
        <p className="mt-2 text-sm text-hive-text-mutedLight">Large</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
          alt="Extra Large"
          fallback="XL"
          size="xl"
        />
        <p className="mt-2 text-sm text-hive-text-mutedLight">Extra Large</p>
      </div>
    </div>
  ),
};

export const FallbackShowcase: Story = {
  render: () => (
    <div className="flex items-center space-x-6 p-6 bg-hive-background-primary">
      {['AB', 'CD', 'EF', 'GH', 'IJ'].map((initials, index) => (
        <div key={initials} className="text-center">
          <ProfileAvatar
            src="" // Empty to show fallback
            alt={`User ${initials}`}
            fallback={initials}
            size="md"
          />
          <p className="mt-2 text-sm text-hive-text-mutedLight">{initials}</p>
        </div>
      ))}
    </div>
  ),
};