import type { Meta, StoryObj } from '@storybook/react';
import { HiveNavigation } from './hive-navigation';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Hive Navigation',
  component: HiveNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The core navigation component for HIVE platform, providing access to main sections: Feed, Spaces, HiveLab, and Profile. Features both full and compact variants for different layout needs.

**Key Features:**
- Full and compact variants
- Active state indicators
- User profile integration
- Hover tooltips (compact mode)
- Smooth animations and transitions
- Campus-focused navigation structure
- Responsive design patterns
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'compact'],
      description: 'Navigation display variant',
    },
    currentPath: {
      control: 'text',
      description: 'Current active path for highlighting',
    },
    user: {
      control: 'object',
      description: 'User object with profile information',
    },
  },
} satisfies Meta<typeof HiveNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user data
const sampleUser = {
  id: '1',
  name: 'Sarah Chen',
  handle: 'sarahc',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
};

const alternateUser = {
  id: '2',
  name: 'Alex Rodriguez',
  handle: 'alexr',
};

// Interactive component for navigation demos
const InteractiveNavigation = ({ currentPath: initialPath = '/', ...props }: any) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  
  return (
    <div className="flex h-screen bg-[var(--hive-background-primary)]">
      <HiveNavigation
        currentPath={currentPath}
        onItemClick={setCurrentPath}
        {...props}
      />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            {currentPath === '/' ? 'Feed' : 
             currentPath === '/spaces' ? 'Spaces' :
             currentPath === '/hivelab' ? 'HiveLab' :
             currentPath === '/profile' ? 'Profile' : 'Page'}
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Current path: {currentPath}
          </p>
          <p className="text-sm text-[var(--hive-text-tertiary)] mt-4">
            Click navigation items to see active states
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic Examples
export const Default: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
  },
};

export const WithoutUser: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: null,
  },
};

// Variant Examples
export const FullVariant: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full navigation with expanded labels and user profile section.',
      },
    },
  },
};

export const CompactVariant: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: sampleUser,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact navigation with icons only and hover tooltips.',
      },
    },
  },
};

// Active States
export const FeedActive: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/',
  },
};

export const SpacesActive: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/spaces',
  },
};

export const HiveLabActive: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/hivelab',
  },
};

export const ProfileActive: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/profile',
  },
};

// User Variants
export const StudentUser: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '3',
      name: 'Maya Patel',
      handle: 'mayap',
    },
  },
};

export const FacultyUser: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '4',
      name: 'Dr. Michael Foster',
      handle: 'profmike',
    },
  },
};

export const LongNameUser: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: '5',
      name: 'Alexandra Elizabeth Rodriguez-Martinez',
      handle: 'alexrodriguezmart',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with long user name demonstrating text truncation.',
      },
    },
  },
};

// Compact Variants
export const CompactWithUser: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: alternateUser,
  },
};

export const CompactWithoutUser: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: null,
  },
};

export const CompactSpacesActive: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: sampleUser,
    currentPath: '/spaces',
  },
};

// Layout Comparisons
export const SideBySideComparison: Story = {
  render: () => (
    <div className="flex h-screen bg-[var(--hive-background-primary)]">
      <div className="flex">
        <HiveNavigation
          variant="full"
          user={sampleUser}
          currentPath="/spaces"
          onItemClick={() => {}}
        />
        <div className="w-px bg-[var(--hive-border-default)]" />
        <HiveNavigation
          variant="compact"
          user={sampleUser}
          currentPath="/spaces"
          onItemClick={() => {}}
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            Navigation Comparison
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Full vs Compact variants side by side
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of full and compact navigation variants.',
      },
    },
  },
};

// Campus Scenarios
export const StudentDashboard: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: 'student1',
      name: 'Jordan Kim',
      handle: 'jordank',
    },
    currentPath: '/',
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation as seen by a typical student user on their dashboard.',
      },
    },
  },
};

export const BuilderWorkspace: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'compact',
    user: {
      id: 'builder1',
      name: 'Taylor Davis',
      handle: 'taylord',
    },
    currentPath: '/hivelab',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact navigation for builders working in HiveLab, maximizing workspace.',
      },
    },
  },
};

export const SpaceLeaderView: Story = {
  render: (args) => <InteractiveNavigation {...args} />,
  args: {
    variant: 'full',
    user: {
      id: 'leader1',
      name: 'Emily Watson',
      handle: 'emilyw',
    },
    currentPath: '/spaces',
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation for space leaders managing their communities.',
      },
    },
  },
};

// Responsive Behavior
export const MobileLayout: Story = {
  render: (args) => (
    <div className="w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]">
      <InteractiveNavigation {...args} />
    </div>
  ),
  args: {
    variant: 'compact',
    user: sampleUser,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact navigation optimized for mobile and narrow screens.',
      },
    },
  },
};

// Static Examples (non-interactive)
export const StaticFull: Story = {
  args: {
    variant: 'full',
    user: sampleUser,
    currentPath: '/spaces',
  },
  render: (args) => (
    <div className="h-screen bg-[var(--hive-background-primary)]">
      <HiveNavigation {...args} />
    </div>
  ),
};

export const StaticCompact: Story = {
  args: {
    variant: 'compact',
    user: sampleUser,
    currentPath: '/hivelab',
  },
  render: (args) => (
    <div className="h-screen bg-[var(--hive-background-primary)]">
      <HiveNavigation {...args} />
    </div>
  ),
};