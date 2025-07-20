/**
 * HIVE Responsive Breakpoint Strategy Demo
 * 
 * Demonstrates mobile-first responsive system with:
 * - Mobile (320-768px): Bottom tabs (Feed | Spaces | Profile | Lab)
 * - Tablet (768-1024px): Hybrid layout with collapsible sidebar
 * - Desktop (1024px+): Full sidebar with feed-optimized layouts
 * - Wide (1440px+): Multi-column layouts for productivity
 */

import type { Meta, StoryObj } from '@storybook/react';
import { 
  ResponsiveProvider,
  useResponsive,
  ResponsiveShow,
  ResponsiveContainer,
  ResponsiveGrid,
  MobileBottomTabs,
  useResponsiveValue
} from '../../components/responsive';
import { HiveCard } from '../../components/hive-card';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { 
  Home, 
  Users, 
  User, 
  Sparkles, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Tv,
  Grid3X3,
  Layout,
  Eye
} from 'lucide-react';

const meta: Meta = {
  title: '11-Shell/Responsive Breakpoints',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Responsive Breakpoint Strategy

Mobile-first responsive system designed for social consumption and campus device usage patterns.

## Breakpoint Strategy
- **Mobile (320-768px)**: Bottom tab navigation, single column, compact cards
- **Tablet (768-1024px)**: Hybrid sidebar, 2-column grid, touch-optimized
- **Desktop (1024-1440px)**: Full sidebar, 3-column grid, productivity focus
- **Wide (1440px+)**: Multi-column layouts, advanced features

## Social-First Design Decisions
- **Mobile priority**: Most campus usage happens on phones
- **Bottom tabs**: Feed | Spaces | Profile | Lab for quick access
- **Feed optimization**: Layouts prioritize social consumption
- **Progressive enhancement**: Features unlock as screen size increases
        `
      }
    }
  }
};

export default meta;

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

function DeviceIndicator() {
  const { deviceType, layoutMode, windowSize, layoutConfig } = useResponsive();
  
  const deviceIcons = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor,
    wide: Tv
  };
  
  const deviceColors = {
    mobile: 'text-green-600 bg-green-100',
    tablet: 'text-blue-600 bg-blue-100',
    desktop: 'text-purple-600 bg-purple-100',
    wide: 'text-gold-600 bg-gold-100'
  };
  
  const DeviceIcon = deviceIcons[deviceType];
  
  return (
    <HiveCard className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${deviceColors[deviceType]}`}>
            <DeviceIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold capitalize">{deviceType} Layout</h3>
            <p className="text-sm text-gray-600">{layoutMode.replace('-', ' ')}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-medium">{windowSize.width} × {windowSize.height}</div>
          <div className="text-xs text-gray-600">
            {layoutConfig.content.columns} columns • {layoutConfig.feed.itemsPerPage} feed items
          </div>
        </div>
      </div>
    </HiveCard>
  );
}

function NavigationDemo() {
  const { layoutConfig, isMobile } = useResponsive();
  const navigationConfig = layoutConfig.navigation;
  
  const mockTabs = [
    { id: 'feed', label: 'Feed', icon: Home, href: '/feed', isActive: true },
    { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', badge: 3 },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
    { id: 'lab', label: 'Lab', icon: Sparkles, href: '/lab', badge: 1 }
  ];
  
  return (
    <HiveCard>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Navigation Layout
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Variant:</span> {navigationConfig.variant}
          </div>
          <div>
            <span className="font-medium">Sidebar:</span> {navigationConfig.showSidebar ? '✅' : '❌'}
          </div>
          <div>
            <span className="font-medium">Bottom Tabs:</span> {navigationConfig.showBottomTabs ? '✅' : '❌'}
          </div>
          <div>
            <span className="font-medium">Collapsible:</span> {navigationConfig.sidebarCollapsible ? '✅' : '❌'}
          </div>
        </div>
        
        {isMobile && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Mobile Bottom Tabs Preview</h4>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-around">
                {mockTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <div key={tab.id} className="flex flex-col items-center text-center">
                      <div className="relative mb-1">
                        <Icon className={`w-5 h-5 ${tab.isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                        {tab.badge && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {tab.badge}
                          </div>
                        )}
                      </div>
                      <span className={`text-xs ${tab.isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                        {tab.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </HiveCard>
  );
}

function LayoutConfigDemo() {
  const { layoutConfig, deviceType } = useResponsive();
  
  const configSections = [
    {
      title: 'Content Layout',
      config: layoutConfig.content,
      icon: Grid3X3
    },
    {
      title: 'Feed Settings',
      config: layoutConfig.feed,
      icon: Home
    },
    {
      title: 'Bento Grid',
      config: layoutConfig.bentoGrid,
      icon: Layout
    },
    {
      title: 'Space Layout',
      config: layoutConfig.spaceLayout,
      icon: Users
    }
  ];
  
  return (
    <div className="grid gap-4">
      {configSections.map((section) => {
        const Icon = section.icon;
        return (
          <HiveCard key={section.title}>
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {section.title}
              </h3>
              <div className="space-y-2 text-sm">
                {Object.entries(section.config).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-medium">
                      {typeof value === 'boolean' ? (value ? '✅' : '❌') : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </HiveCard>
        );
      })}
    </div>
  );
}

function ResponsiveShowDemo() {
  return (
    <HiveCard>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Responsive Visibility
        </h3>
        
        <div className="space-y-3">
          <ResponsiveShow on={['mobile']}>
            <div className="p-3 bg-green-100 text-green-800 rounded-lg">
              📱 This content only shows on mobile devices
            </div>
          </ResponsiveShow>
          
          <ResponsiveShow on={['tablet']}>
            <div className="p-3 bg-blue-100 text-blue-800 rounded-lg">
              📱 This content only shows on tablet devices
            </div>
          </ResponsiveShow>
          
          <ResponsiveShow on={['desktop', 'wide']}>
            <div className="p-3 bg-purple-100 text-purple-800 rounded-lg">
              🖥️ This content shows on desktop and wide screens
            </div>
          </ResponsiveShow>
          
          <ResponsiveShow above="tablet">
            <div className="p-3 bg-orange-100 text-orange-800 rounded-lg">
              ⬆️ This content shows on tablet and above
            </div>
          </ResponsiveShow>
          
          <ResponsiveShow below="desktop">
            <div className="p-3 bg-pink-100 text-pink-800 rounded-lg">
              ⬇️ This content shows on tablet and below
            </div>
          </ResponsiveShow>
        </div>
      </div>
    </HiveCard>
  );
}

function ResponsiveGridDemo() {
  const gridItems = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    description: 'This card adapts to the responsive grid system'
  }));
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Responsive Grid System</h3>
      <ResponsiveGrid>
        {gridItems.map((item) => (
          <HiveCard key={item.id} className="h-32">
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          </HiveCard>
        ))}
      </ResponsiveGrid>
    </div>
  );
}

function BreakpointTestControls() {
  const { windowSize } = useResponsive();
  
  const breakpoints = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1024, height: 768 },
    { name: 'Wide', width: 1440, height: 900 }
  ];
  
  const resizeWindow = (width: number, height: number) => {
    // This is just for demo - in real usage, window resizing would be handled by browser
    console.log(`Simulating resize to ${width}x${height}`);
  };
  
  return (
    <HiveCard>
      <div className="space-y-4">
        <h3 className="font-semibold">Breakpoint Testing</h3>
        <p className="text-sm text-gray-600">
          Current window: {windowSize.width} × {windowSize.height}px
        </p>
        <div className="grid grid-cols-2 gap-2">
          {breakpoints.map((bp) => (
            <HiveButton
              key={bp.name}
              variant="outline"
              size="sm"
              onClick={() => resizeWindow(bp.width, bp.height)}
            >
              {bp.name} ({bp.width}px)
            </HiveButton>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Note: In real usage, resize your browser window to test breakpoints
        </p>
      </div>
    </HiveCard>
  );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

function ResponsiveBreakpointsDemo() {
  return (
    <ResponsiveContainer>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">HIVE Responsive System</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mobile-first responsive breakpoint strategy optimized for social consumption 
            and campus device usage patterns.
          </p>
        </div>
        
        <DeviceIndicator />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <NavigationDemo />
          <ResponsiveShowDemo />
        </div>
        
        <ResponsiveGrid customColumns={{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }}>
          <LayoutConfigDemo />
        </ResponsiveGrid>
        
        <ResponsiveGridDemo />
        
        <BreakpointTestControls />
        
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Mobile-First Strategy
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Design Principles</h4>
              <ul className="space-y-1">
                <li>• Social consumption prioritized</li>
                <li>• Bottom tabs for thumb navigation</li>
                <li>• Feed-centric layouts</li>
                <li>• Progressive feature enhancement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Breakpoint Strategy</h4>
              <ul className="space-y-1">
                <li>• Mobile: 320-768px (primary experience)</li>
                <li>• Tablet: 768-1024px (hybrid layouts)</li>
                <li>• Desktop: 1024-1440px (productivity focus)</li>
                <li>• Wide: 1440px+ (advanced features)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

type Story = StoryObj<typeof ResponsiveBreakpointsDemo>;

export const Default: Story = {
  render: () => (
    <ResponsiveProvider>
      <ResponsiveBreakpointsDemo />
    </ResponsiveProvider>
  )
};

export const MobileFirst: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <ResponsiveProvider>
      <ResponsiveBreakpointsDemo />
      <MobileBottomTabs
        tabs={[
          { id: 'feed', label: 'Feed', icon: Home, href: '/feed', isActive: true },
          { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', badge: 3 },
          { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
          { id: 'lab', label: 'Lab', icon: Sparkles, href: '/lab', badge: 1 }
        ]}
        onTabClick={(tabId) => console.log(`Tab clicked: ${tabId}`)}
      />
    </ResponsiveProvider>
  )
};

export const TabletHybrid: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  render: () => (
    <ResponsiveProvider>
      <ResponsiveBreakpointsDemo />
    </ResponsiveProvider>
  )
};

export const DesktopFull: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: () => (
    <ResponsiveProvider>
      <ResponsiveBreakpointsDemo />
    </ResponsiveProvider>
  )
};