import type { Meta, StoryObj } from '@storybook/react';
import { 
  MinimalFloatingSidebar,
  CleanVerticalSidebar,
  TopHorizontalNav,
  BottomTabNav,
  CompactIconRail
} from './navigation-variants';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Navigation Variants',
  component: CleanVerticalSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Collection of navigation variants for different layout needs and device types. Each variant maintains consistent HIVE branding while optimizing for specific use cases.

**Available Variants:**
- **MinimalFloatingSidebar**: Floating pill-style navigation
- **CleanVerticalSidebar**: Traditional sidebar with clean styling
- **TopHorizontalNav**: Horizontal navigation bar
- **BottomTabNav**: Mobile-style bottom tab navigation
- **CompactIconRail**: Icon-only vertical navigation

**Features:**
- Consistent active states across all variants
- Responsive design patterns
- User profile integration
- Smooth animations and transitions
- Campus-focused navigation structure
        `,
      },
    },
  },
  argTypes: {
    currentPath: {
      control: 'select',
      options: ['/', '/spaces', '/hivelab', '/profile'],
      description: 'Current active path',
    },
    user: {
      control: 'object',
      description: 'User profile information',
    },
  },
} satisfies Meta<typeof CleanVerticalSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user data
const sampleUser = {
  id: '1',
  name: 'Sarah Chen',
  handle: 'sarahc',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
};

// Interactive wrapper for navigation demos
const InteractiveDemo = ({ Component, initialPath = '/', ...props }: any) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  
  return (
    <div className="relative h-screen bg-[var(--hive-background-primary)]">
      <Component
        currentPath={currentPath}
        onItemClick={setCurrentPath}
        {...props}
      />
      <div className="flex-1 flex items-center justify-center p-8 absolute inset-0 pointer-events-none">
        <div className="text-center pointer-events-auto">
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

// 1. Minimal Floating Sidebar
export const MinimalFloating: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={MinimalFloatingSidebar}
      user={sampleUser}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Floating pill-style navigation that hovers over content. Perfect for immersive experiences.',
      },
    },
  },
};

export const MinimalFloatingWithoutUser: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={MinimalFloatingSidebar}
      user={null}
      {...args}
    />
  ),
};

export const MinimalFloatingActive: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={MinimalFloatingSidebar}
      user={sampleUser}
      initialPath="/spaces"
      {...args}
    />
  ),
};

// 2. Clean Vertical Sidebar
export const CleanVertical: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={CleanVerticalSidebar}
      user={sampleUser}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Traditional sidebar with clean styling and full labels. Ideal for desktop applications.',
      },
    },
  },
};

export const CleanVerticalWithoutUser: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={CleanVerticalSidebar}
      user={null}
      {...args}
    />
  ),
};

export const CleanVerticalActive: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={CleanVerticalSidebar}
      user={sampleUser}
      initialPath="/hivelab"
      {...args}
    />
  ),
};

// 3. Top Horizontal Navigation
export const TopHorizontal: Story = {
  render: (args) => (
    <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo 
        Component={TopHorizontalNav}
        user={sampleUser}
        {...args}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal navigation bar at the top. Great for web applications and content-focused layouts.',
      },
    },
  },
};

export const TopHorizontalWithoutUser: Story = {
  render: (args) => (
    <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo 
        Component={TopHorizontalNav}
        user={null}
        {...args}
      />
    </div>
  ),
};

export const TopHorizontalActive: Story = {
  render: (args) => (
    <div className="h-screen bg-[var(--hive-background-primary)]">
      <InteractiveDemo 
        Component={TopHorizontalNav}
        user={sampleUser}
        initialPath="/profile"
        {...args}
      />
    </div>
  ),
};

// 4. Bottom Tab Navigation
export const BottomTabs: Story = {
  render: (args) => (
    <div className="h-screen bg-[var(--hive-background-primary)] pb-20">
      <InteractiveDemo 
        Component={BottomTabNav}
        {...args}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-style bottom tab navigation. Perfect for mobile applications and touch interfaces.',
      },
    },
  },
};

export const BottomTabsActive: Story = {
  render: (args) => (
    <div className="h-screen bg-[var(--hive-background-primary)] pb-20">
      <InteractiveDemo 
        Component={BottomTabNav}
        initialPath="/spaces"
        {...args}
      />
    </div>
  ),
};

// 5. Compact Icon Rail
export const CompactIcons: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={CompactIconRail}
      user={sampleUser}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only vertical navigation with tooltips. Maximizes content space while maintaining navigation.',
      },
    },
  },
};

export const CompactIconsWithoutUser: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={CompactIconRail}
      user={null}
      {...args}
    />
  ),
};

export const CompactIconsActive: Story = {
  render: (args) => (
    <InteractiveDemo 
      Component={CompactIconRail}
      user={sampleUser}
      initialPath="/hivelab"
      {...args}
    />
  ),
};

// Comparison Views
export const AllVariantsComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-screen bg-[var(--hive-background-secondary)]">
      {/* Clean Vertical */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Clean Vertical</h3>
        </div>
        <div className="h-64 relative">
          <CleanVerticalSidebar
            currentPath="/spaces"
            user={sampleUser}
            className="h-full transform scale-75 origin-top-left w-[133%]"
          />
        </div>
      </div>

      {/* Top Horizontal */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Top Horizontal</h3>
        </div>
        <div className="h-64 relative">
          <TopHorizontalNav
            currentPath="/spaces"
            user={sampleUser}
            className="transform scale-75 origin-top"
          />
        </div>
      </div>

      {/* Compact Icons */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Compact Icons</h3>
        </div>
        <div className="h-64 relative">
          <CompactIconRail
            currentPath="/spaces"
            user={sampleUser}
            className="h-full transform scale-75 origin-top-left w-[133%]"
          />
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Bottom Tabs</h3>
        </div>
        <div className="h-64 relative">
          <div className="absolute bottom-0 left-0 right-0">
            <BottomTabNav
              currentPath="/spaces"
              className="relative transform scale-75 origin-bottom"
            />
          </div>
        </div>
      </div>

      {/* Minimal Floating */}
      <div className="bg-[var(--hive-background-primary)] rounded-lg overflow-hidden relative">
        <div className="p-2 border-b border-[var(--hive-border-default)]">
          <h3 className="text-sm font-medium text-[var(--hive-text-primary)]">Minimal Floating</h3>
        </div>
        <div className="h-64 relative">
          <MinimalFloatingSidebar
            currentPath="/spaces"
            user={sampleUser}
            className="relative left-4 top-1/2 -translate-y-1/2 transform scale-75"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all navigation variants.',
      },
    },
  },
};

// User Variants
export const DifferentUsers: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-screen bg-[var(--hive-background-primary)]">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Student User</h3>
        <CleanVerticalSidebar
          currentPath="/spaces"
          user={{
            id: '1',
            name: 'Maya Patel',
            handle: 'mayap',
          }}
          className="h-96"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Faculty User</h3>
        <CleanVerticalSidebar
          currentPath="/profile"
          user={{
            id: '2',
            name: 'Dr. Michael Foster',
            handle: 'profmike',
          }}
          className="h-96"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation with different user types showing initials generation.',
      },
    },
  },
};

// Responsive Scenarios
export const MobileLayout: Story = {
  render: () => (
    <div className="w-full max-w-sm mx-auto h-screen bg-[var(--hive-background-primary)]">
      <div className="h-full pb-20 relative">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">
              Mobile Layout
            </h2>
            <p className="text-[var(--hive-text-secondary)]">
              Bottom tabs for mobile navigation
            </p>
          </div>
        </div>
        <BottomTabNav currentPath="/spaces" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized layout with bottom tab navigation.',
      },
    },
  },
};

export const TabletLayout: Story = {
  render: () => (
    <div className="w-full max-w-md mx-auto h-screen bg-[var(--hive-background-primary)] flex">
      <CompactIconRail
        currentPath="/hivelab"
        user={sampleUser}
      />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">
            Tablet Layout
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Compact icons for medium screens
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tablet-optimized layout with compact icon navigation.',
      },
    },
  },
};

// Static Examples
export const StaticExamples: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Clean Vertical Sidebar</h3>
        <div className="h-64 border border-[var(--hive-border-default)] rounded-lg overflow-hidden">
          <CleanVerticalSidebar
            currentPath="/spaces"
            user={sampleUser}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Top Horizontal Navigation</h3>
        <div className="border border-[var(--hive-border-default)] rounded-lg overflow-hidden">
          <TopHorizontalNav
            currentPath="/hivelab"
            user={sampleUser}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Static examples of different navigation variants.',
      },
    },
  },
};