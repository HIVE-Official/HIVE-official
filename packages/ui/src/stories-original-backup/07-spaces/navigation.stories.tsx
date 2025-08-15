import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveCard } from '../../components/hive-card';
import { motion, AnimatePresence } from 'framer-motion';

const meta: Meta = {
  title: '07-Spaces/Navigation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Space Navigation & Routing

Navigation patterns and routing behaviors within and between HIVE spaces. These stories demonstrate how users move through the space ecosystem and maintain context during navigation.

## Navigation Patterns

1. **Space-to-Space Navigation** - Moving between different spaces
2. **Surface Navigation** - Moving between surfaces within a space
3. **Breadcrumb Navigation** - Showing navigation hierarchy
4. **Deep Linking** - Direct links to specific content or surfaces
5. **State Preservation** - Maintaining context during navigation

## Navigation Components

- **Space Switcher** - Quick access to user's spaces
- **Surface Tabs** - Navigate between space surfaces
- **Breadcrumb Trail** - Show current location in hierarchy
- **Navigation Sidebar** - Persistent navigation menu
- **Quick Actions** - Contextual navigation shortcuts

## When to Use

- **Space Interior** - Navigation within space layout
- **Multi-Space Workflows** - Users managing multiple spaces
- **Deep Content Access** - Direct links to specific content
- **Mobile Navigation** - Responsive navigation patterns
- **State Management** - Preserving user context and preferences
        `,
      },
    },
  },
};

export default meta;

// Mock data for navigation
const mockSpaces = [
  {
    id: 'space1',
    name: 'Stanford CS Study Group',
    type: 'academic',
    memberCount: 156,
    isActive: true,
    color: 'var(--hive-status-info)',
    icon: '💻',
    unreadCount: 3,
  },
  {
    id: 'space2',
    name: 'Wilbur Hall Community',
    type: 'residential',
    memberCount: 89,
    isActive: false,
    color: 'var(--hive-status-success)',
    icon: '🏠',
    unreadCount: 1,
  },
  {
    id: 'space3',
    name: 'Entrepreneurship Club',
    type: 'social',
    memberCount: 234,
    isActive: false,
    color: 'var(--hive-status-info)',
    icon: '🚀',
    unreadCount: 0,
  },
  {
    id: 'space4',
    name: 'CS106B TAs',
    type: 'academic',
    memberCount: 12,
    isActive: false,
    color: 'var(--hive-status-warning)',
    icon: '🎓',
    unreadCount: 7,
  },
];

const mockSurfaces = [
  { id: 'pinned', name: 'Pinned', icon: '📌', count: 3 },
  { id: 'posts', name: 'Posts', icon: '💬', count: 24 },
  { id: 'events', name: 'Events', icon: '📅', count: 3 },
  { id: 'tools', name: 'Tools', icon: '🔧', count: 4 },
  { id: 'members', name: 'Members', icon: '👥', count: 156 },
  { id: 'chat', name: 'Chat', icon: '💬', count: 0, disabled: true },
];

const mockBreadcrumbs = [
  { id: 'spaces', name: 'Spaces', href: '/spaces' },
  { id: 'space', name: 'Stanford CS Study Group', href: '/spaces/cs-study-group' },
  { id: 'surface', name: 'Posts', href: '/spaces/cs-study-group/posts' },
];

const mockUser = {
  id: 'user123',
  name: 'Alex Chen',
  avatar: '/api/placeholder/32/32',
  role: 'builder',
};

// Space Switcher Component
const SpaceSwitcher = ({ 
  spaces, 
  activeSpace, 
  onSpaceChange 
}: {
  spaces: any[];
  activeSpace: string;
  onSpaceChange: (spaceId: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const currentSpace = spaces.find(s => s.id === activeSpace);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 bg-[var(--hive-text-primary)] border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">{currentSpace?.icon}</span>
        <span className="font-medium">{currentSpace?.name}</span>
        <span className="text-gray-400">⌄</span>
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-[var(--hive-text-primary)] border rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="text-sm font-medium text-gray-700 px-3 py-2">
              Your Spaces
            </div>
            <div className="space-y-1">
              {spaces.map((space) => (
                <button
                  key={space.id}
                  onClick={() => {
                    onSpaceChange(space.id);
                    setShowDropdown(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${space.id === activeSpace 
                      ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' 
                      : 'hover:bg-gray-50'}
                  `}
                >
                  <span className="text-lg">{space.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{space.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {space.memberCount} members
                    </div>
                  </div>
                  {space.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center">
                      {space.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t p-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-left text-[var(--hive-brand-secondary)] hover:bg-gray-50 rounded-lg">
              <span>+</span>
              <span>Create New Space</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Surface Navigation Component
const SurfaceNavigation = ({ 
  surfaces, 
  activeSurface, 
  onSurfaceChange 
}: {
  surfaces: any[];
  activeSurface: string;
  onSurfaceChange: (surfaceId: string) => void;
}) => (
  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
    {surfaces.map((surface) => (
      <button
        key={surface.id}
        onClick={() => onSurfaceChange(surface.id)}
        disabled={surface.disabled}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
          ${surface.disabled 
            ? 'text-gray-400 cursor-not-allowed' 
            : activeSurface === surface.id 
              ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'}
        `}
      >
        <span>{surface.icon}</span>
        <span>{surface.name}</span>
        {surface.count > 0 && (
          <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
            {surface.count}
          </span>
        )}
      </button>
    ))}
  </div>
);

// Breadcrumb Component
const Breadcrumbs = ({ 
  breadcrumbs, 
  onNavigate 
}: {
  breadcrumbs: any[];
  onNavigate: (href: string) => void;
}) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    {breadcrumbs.map((crumb, index) => (
      <div key={crumb.id} className="flex items-center gap-2">
        {index > 0 && <span>/</span>}
        <button
          onClick={() => onNavigate(crumb.href)}
          className={`
            hover:text-gray-900 transition-colors
            ${index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}
          `}
        >
          {crumb.name}
        </button>
      </div>
    ))}
  </div>
);

// Navigation Sidebar Component
const NavigationSidebar = ({ 
  spaces, 
  activeSpace, 
  activeSurface, 
  onSpaceChange, 
  onSurfaceChange 
}: {
  spaces: any[];
  activeSpace: string;
  activeSurface: string;
  onSpaceChange: (spaceId: string) => void;
  onSurfaceChange: (surfaceId: string) => void;
}) => {
  const currentSpace = spaces.find(s => s.id === activeSpace);

  return (
    <div className="w-64 bg-[var(--hive-text-primary)] border-r flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-[var(--hive-background-primary)]">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium">{mockUser.name}</div>
            <div className="text-sm text-gray-600">{mockUser.role}</div>
          </div>
        </div>
      </div>

      {/* Current Space */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-lg">{currentSpace?.icon}</span>
          <div>
            <div className="font-medium">{currentSpace?.name}</div>
            <div className="text-sm text-gray-600">
              {currentSpace?.memberCount} members
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {mockSurfaces.map((surface) => (
            <button
              key={surface.id}
              onClick={() => onSurfaceChange(surface.id)}
              disabled={surface.disabled}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                ${surface.disabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : activeSurface === surface.id 
                    ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' 
                    : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <span>{surface.icon}</span>
              <span className="font-medium">{surface.name}</span>
              {surface.count > 0 && (
                <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full ml-auto">
                  {surface.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Other Spaces */}
      <div className="p-4 flex-1">
        <div className="text-sm font-medium text-gray-700 mb-3">Other Spaces</div>
        <div className="space-y-1">
          {spaces.filter(s => s.id !== activeSpace).map((space) => (
            <button
              key={space.id}
              onClick={() => onSpaceChange(space.id)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors"
            >
              <span>{space.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{space.name}</div>
                <div className="text-sm text-gray-500 truncate">
                  {space.memberCount} members
                </div>
              </div>
              {space.unreadCount > 0 && (
                <div className="w-4 h-4 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center">
                  {space.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <HiveButton variant="outline" size="sm" className="w-full">
            Create Space
          </HiveButton>
          <HiveButton variant="outline" size="sm" className="w-full">
            Browse Spaces
          </HiveButton>
        </div>
      </div>
    </div>
  );
};

export const SpaceToSpaceNavigation: StoryObj = {
  render: () => {
    const [activeSpace, setActiveSpace] = useState('space1');
    const [activeSurface, setActiveSurface] = useState('posts');
    
    const currentSpace = mockSpaces.find(s => s.id === activeSpace);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SpaceSwitcher
                  spaces={mockSpaces}
                  activeSpace={activeSpace}
                  onSpaceChange={setActiveSpace}
                />
                <div className="h-6 w-px bg-gray-300"></div>
                <Breadcrumbs
                  breadcrumbs={mockBreadcrumbs}
                  onNavigate={(href) => console.log('Navigate to:', href)}
                />
              </div>
              <div className="flex items-center gap-3">
                <HiveButton variant="outline" size="sm">
                  Browse All Spaces
                </HiveButton>
                <HiveButton size="sm">
                  Create Space
                </HiveButton>
              </div>
            </div>
          </div>

          {/* Space Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: currentSpace?.color + '20' }}
              >
                {currentSpace?.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentSpace?.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{currentSpace?.memberCount} members</span>
                  <HiveBadge variant="outline" className="capitalize">
                    {currentSpace?.type}
                  </HiveBadge>
                  {currentSpace?.unreadCount > 0 && (
                    <HiveBadge variant="default" className="bg-red-500">
                      {currentSpace?.unreadCount} unread
                    </HiveBadge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Surface Navigation */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <SurfaceNavigation
              surfaces={mockSurfaces}
              activeSurface={activeSurface}
              onSurfaceChange={setActiveSurface}
            />
          </div>

          {/* Content Area */}
          <div className="bg-[var(--hive-text-primary)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2">
                <HiveCard className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {mockSurfaces.find(s => s.id === activeSurface)?.name} Surface
                  </h2>
                  <p className="text-gray-600 mb-4">
                    This is the content area for the {activeSurface} surface in {currentSpace?.name}.
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Sample Content {i}</h3>
                        <p className="text-gray-600 text-sm">
                          This represents content that would appear in the {activeSurface} surface.
                        </p>
                      </div>
                    ))}
                  </div>
                </HiveCard>
              </div>

              {/* Space Overview */}
              <div className="space-y-4">
                <HiveCard className="p-4">
                  <h3 className="font-semibold mb-3">Space Quick Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Members</span>
                      <span className="font-medium">{currentSpace?.memberCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Today</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Posts This Week</span>
                      <span className="font-medium">45</span>
                    </div>
                  </div>
                </HiveCard>

                <HiveCard className="p-4">
                  <h3 className="font-semibold mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="text-sm">
                          <div className="font-medium">Member {i} posted</div>
                          <div className="text-gray-500">{i * 2} hours ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </HiveCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const SurfaceNavigationStory: StoryObj = {
  render: () => {
    const [activeSurface, setActiveSurface] = useState('posts');
    const [viewMode, setViewMode] = useState('tabs');
    
    const currentSurface = mockSurfaces.find(s => s.id === activeSurface);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Stanford CS Study Group
                </h1>
                <p className="text-gray-600">Surface navigation patterns</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('tabs')}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${viewMode === 'tabs' ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  Tab View
                </button>
                <button
                  onClick={() => setViewMode('sidebar')}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${viewMode === 'sidebar' ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  Sidebar View
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'tabs' ? (
            <div>
              {/* Tab Navigation */}
              <div className="bg-[var(--hive-text-primary)] border-b p-4">
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  {mockSurfaces.map((surface) => (
                    <button
                      key={surface.id}
                      onClick={() => setActiveSurface(surface.id)}
                      disabled={surface.disabled}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                        ${surface.disabled 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : activeSurface === surface.id 
                            ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'}
                      `}
                    >
                      <span>{surface.icon}</span>
                      <span>{surface.name}</span>
                      {surface.count > 0 && (
                        <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                          {surface.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-[var(--hive-text-primary)] p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSurface}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{currentSurface?.icon}</span>
                      <div>
                        <h2 className="text-xl font-semibold">{currentSurface?.name}</h2>
                        <p className="text-gray-600">
                          {currentSurface?.count} items in this surface
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <HiveCard key={i} className="p-4">
                          <h3 className="font-medium mb-2">
                            {currentSurface?.name} Item {i}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Sample content for the {currentSurface?.name} surface.
                          </p>
                        </HiveCard>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex">
              {/* Sidebar Navigation */}
              <div className="w-64 bg-[var(--hive-text-primary)] border-r">
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Space Surfaces</h3>
                  <div className="space-y-1">
                    {mockSurfaces.map((surface) => (
                      <button
                        key={surface.id}
                        onClick={() => setActiveSurface(surface.id)}
                        disabled={surface.disabled}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                          ${surface.disabled 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : activeSurface === surface.id 
                              ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' 
                              : 'text-gray-600 hover:bg-gray-100'}
                        `}
                      >
                        <span>{surface.icon}</span>
                        <span className="font-medium">{surface.name}</span>
                        {surface.count > 0 && (
                          <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full ml-auto">
                            {surface.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-[var(--hive-text-primary)] p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSurface}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{currentSurface?.icon}</span>
                      <div>
                        <h2 className="text-xl font-semibold">{currentSurface?.name}</h2>
                        <p className="text-gray-600">
                          {currentSurface?.count} items in this surface
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <HiveCard key={i} className="p-4">
                          <h3 className="font-medium mb-2">
                            {currentSurface?.name} Item {i}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Sample content for the {currentSurface?.name} surface.
                          </p>
                        </HiveCard>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const BreadcrumbNavigation: StoryObj = {
  render: () => {
    const [currentPath, setCurrentPath] = useState(['spaces', 'cs-study-group', 'posts']);
    
    const pathMappings = {
      spaces: { name: 'Spaces', icon: '🏠' },
      'cs-study-group': { name: 'Stanford CS Study Group', icon: '💻' },
      posts: { name: 'Posts', icon: '💬' },
      events: { name: 'Events', icon: '📅' },
      members: { name: 'Members', icon: '👥' },
      tools: { name: 'Tools', icon: '🔧' },
      settings: { name: 'Settings', icon: '⚙️' },
    };

    const generateBreadcrumbs = (path: string[]) => {
      return path.map((segment, index) => ({
        id: segment,
        name: pathMappings[segment]?.name || segment,
        icon: pathMappings[segment]?.icon,
        href: '/' + path.slice(0, index + 1).join('/'),
        isLast: index === path.length - 1,
      }));
    };

    const navigateTo = (href: string) => {
      const newPath = href.split('/').filter(Boolean);
      setCurrentPath(newPath);
    };

    const breadcrumbs = generateBreadcrumbs(currentPath);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Breadcrumb Navigation
                </h1>
                <p className="text-gray-600">Navigation hierarchy and deep linking</p>
              </div>
              <div className="text-sm text-gray-500">
                Current path: /{currentPath.join('/')}
              </div>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="text-gray-400">/</span>
                  )}
                  <button
                    onClick={() => navigateTo(crumb.href)}
                    className={`
                      flex items-center gap-2 px-2 py-1 rounded-md transition-colors
                      ${crumb.isLast 
                        ? 'text-gray-900 font-medium bg-gray-100' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
                    `}
                  >
                    {crumb.icon && <span>{crumb.icon}</span>}
                    <span>{crumb.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-[var(--hive-text-primary)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Location */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Current Location</h2>
                <HiveCard className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">
                      {pathMappings[currentPath[currentPath.length - 1]]?.icon}
                    </span>
                    <div>
                      <h3 className="font-medium">
                        {pathMappings[currentPath[currentPath.length - 1]]?.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        You are currently viewing this section
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Path: /{currentPath.join('/')}</div>
                    <div>Depth: {currentPath.length} levels</div>
                  </div>
                </HiveCard>
              </div>

              {/* Quick Navigation */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => navigateTo('/spaces')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>🏠</span>
                    <span>Back to Spaces</span>
                  </button>
                  
                  {currentPath.length > 1 && (
                    <button
                      onClick={() => navigateTo('/spaces/cs-study-group')}
                      className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span>💻</span>
                      <span>Space Home</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => navigateTo('/spaces/cs-study-group/posts')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>💬</span>
                    <span>Posts</span>
                  </button>
                  
                  <button
                    onClick={() => navigateTo('/spaces/cs-study-group/events')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>📅</span>
                    <span>Events</span>
                  </button>
                  
                  <button
                    onClick={() => navigateTo('/spaces/cs-study-group/members')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>👥</span>
                    <span>Members</span>
                  </button>
                  
                  <button
                    onClick={() => navigateTo('/spaces/cs-study-group/settings')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>⚙️</span>
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const DeepLinkingBehavior: StoryObj = {
  render: () => {
    const [currentUrl, setCurrentUrl] = useState('/spaces/cs-study-group/posts/post-123');
    const [showShareModal, setShowShareModal] = useState(false);
    
    const parseUrl = (url: string) => {
      const parts = url.split('/').filter(Boolean);
      return {
        sections: parts,
        isSpace: parts.length >= 2 && parts[0] === 'spaces',
        spaceId: parts[1],
        surface: parts[2],
        contentId: parts[3],
      };
    };

    const generateShareableLinks = () => {
      const base = 'https://hive.stanford.edu';
      return [
        { 
          name: 'Space Home', 
          url: `${base}/spaces/cs-study-group`,
          description: 'Link to the space homepage'
        },
        { 
          name: 'Posts Surface', 
          url: `${base}/spaces/cs-study-group/posts`,
          description: 'Link to the posts surface'
        },
        { 
          name: 'Specific Post', 
          url: `${base}/spaces/cs-study-group/posts/post-123`,
          description: 'Link to a specific post'
        },
        { 
          name: 'Events Surface', 
          url: `${base}/spaces/cs-study-group/events`,
          description: 'Link to the events surface'
        },
        { 
          name: 'Members Directory', 
          url: `${base}/spaces/cs-study-group/members`,
          description: 'Link to the members directory'
        },
      ];
    };

    const urlInfo = parseUrl(currentUrl);
    const shareableLinks = generateShareableLinks();

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Deep Linking & URL Handling
                </h1>
                <p className="text-gray-600">Direct links to specific content and surfaces</p>
              </div>
              <HiveButton onClick={() => setShowShareModal(true)}>
                Share Links
              </HiveButton>
            </div>
          </div>

          {/* URL Display */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Current URL:</span>
              <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">
                {currentUrl}
              </code>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-[var(--hive-text-primary)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">URL Structure</h2>
                <HiveCard className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">URL Segments:</span>
                      <span className="text-sm text-gray-600">
                        {urlInfo.sections.join(' → ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Space ID:</span>
                      <span className="text-sm text-gray-600">
                        {urlInfo.spaceId || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Surface:</span>
                      <span className="text-sm text-gray-600">
                        {urlInfo.surface || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Content ID:</span>
                      <span className="text-sm text-gray-600">
                        {urlInfo.contentId || 'N/A'}
                      </span>
                    </div>
                  </div>
                </HiveCard>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">URL Patterns</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <code>/spaces</code> - All spaces directory
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <code>/spaces/[id]</code> - Space homepage
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <code>/spaces/[id]/[surface]</code> - Specific surface
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <code>/spaces/[id]/[surface]/[content]</code> - Specific content
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Examples */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Navigation Examples</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setCurrentUrl('/spaces')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>🏠</span>
                    <div className="text-left">
                      <div className="font-medium">Spaces Directory</div>
                      <div className="text-sm text-gray-600">/spaces</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentUrl('/spaces/cs-study-group')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>💻</span>
                    <div className="text-left">
                      <div className="font-medium">Space Home</div>
                      <div className="text-sm text-gray-600">/spaces/cs-study-group</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentUrl('/spaces/cs-study-group/posts')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>💬</span>
                    <div className="text-left">
                      <div className="font-medium">Posts Surface</div>
                      <div className="text-sm text-gray-600">/spaces/cs-study-group/posts</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentUrl('/spaces/cs-study-group/posts/post-123')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>📄</span>
                    <div className="text-left">
                      <div className="font-medium">Specific Post</div>
                      <div className="text-sm text-gray-600">/spaces/cs-study-group/posts/post-123</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentUrl('/spaces/cs-study-group/events/event-456')}
                    className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>📅</span>
                    <div className="text-left">
                      <div className="font-medium">Specific Event</div>
                      <div className="text-sm text-gray-600">/spaces/cs-study-group/events/event-456</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Share Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[var(--hive-text-primary)] rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Shareable Links</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-3">
                  {shareableLinks.map((link, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium text-sm mb-1">{link.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{link.description}</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={link.url}
                          readOnly
                          className="flex-1 px-2 py-1 bg-gray-50 border rounded text-xs font-mono"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(link.url)}
                          className="px-2 py-1 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded text-xs"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Deep Linking Features</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Direct links to specific content</li>
                    <li>• Preserve user context and state</li>
                    <li>• SEO-friendly URLs</li>
                    <li>• Social media sharing optimization</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const NavigationWithState: StoryObj = {
  render: () => {
    const [activeSpace, setActiveSpace] = useState('space1');
    const [activeSurface, setActiveSurface] = useState('posts');
    const [viewPreferences, setViewPreferences] = useState({
      sidebarCollapsed: false,
      sortBy: 'recent',
      filterBy: 'all',
    });
    const [navigationHistory, setNavigationHistory] = useState([
      { path: '/spaces', timestamp: new Date(Date.now() - 300000) },
      { path: '/spaces/cs-study-group', timestamp: new Date(Date.now() - 180000) },
      { path: '/spaces/cs-study-group/posts', timestamp: new Date(Date.now() - 60000) },
    ]);

    const handleNavigation = (path: string) => {
      setNavigationHistory([...navigationHistory, { path, timestamp: new Date() }]);
    };

    const handleSpaceChange = (spaceId: string) => {
      setActiveSpace(spaceId);
      handleNavigation(`/spaces/${spaceId}`);
    };

    const handleSurfaceChange = (surfaceId: string) => {
      setActiveSurface(surfaceId);
      handleNavigation(`/spaces/${activeSpace}/${surfaceId}`);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Navigation with State Management
                </h1>
                <p className="text-gray-600">
                  Context preservation and user preferences
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewPreferences({
                    ...viewPreferences,
                    sidebarCollapsed: !viewPreferences.sidebarCollapsed
                  })}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {viewPreferences.sidebarCollapsed ? '→' : '←'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className={`
              transition-all duration-300 bg-[var(--hive-text-primary)] border-r
              ${viewPreferences.sidebarCollapsed ? 'w-16' : 'w-64'}
            `}>
              <NavigationSidebar
                spaces={mockSpaces}
                activeSpace={activeSpace}
                activeSurface={activeSurface}
                onSpaceChange={handleSpaceChange}
                onSurfaceChange={handleSurfaceChange}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Content Header */}
              <div className="bg-[var(--hive-text-primary)] border-b p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {mockSurfaces.find(s => s.id === activeSurface)?.name}
                    </h2>
                    <p className="text-gray-600">
                      {mockSpaces.find(s => s.id === activeSpace)?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={viewPreferences.sortBy}
                      onChange={(e) => setViewPreferences({
                        ...viewPreferences,
                        sortBy: e.target.value
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                    <select
                      value={viewPreferences.filterBy}
                      onChange={(e) => setViewPreferences({
                        ...viewPreferences,
                        filterBy: e.target.value
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Content</option>
                      <option value="unread">Unread</option>
                      <option value="favorites">Favorites</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* State Information */}
                  <div>
                    <h3 className="font-semibold mb-3">Current State</h3>
                    <HiveCard className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Active Space:</span>
                          <span className="text-sm text-gray-600">
                            {mockSpaces.find(s => s.id === activeSpace)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Active Surface:</span>
                          <span className="text-sm text-gray-600">
                            {mockSurfaces.find(s => s.id === activeSurface)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Sidebar:</span>
                          <span className="text-sm text-gray-600">
                            {viewPreferences.sidebarCollapsed ? 'Collapsed' : 'Expanded'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Sort By:</span>
                          <span className="text-sm text-gray-600">
                            {viewPreferences.sortBy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Filter:</span>
                          <span className="text-sm text-gray-600">
                            {viewPreferences.filterBy}
                          </span>
                        </div>
                      </div>
                    </HiveCard>

                    <div className="mt-4">
                      <h3 className="font-semibold mb-3">User Preferences</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={viewPreferences.sidebarCollapsed}
                            onChange={(e) => setViewPreferences({
                              ...viewPreferences,
                              sidebarCollapsed: e.target.checked
                            })}
                            className="text-[var(--hive-brand-secondary)]"
                          />
                          <span className="text-sm">Collapse sidebar by default</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="text-[var(--hive-brand-secondary)]"
                          />
                          <span className="text-sm">Remember last visited surface</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="text-[var(--hive-brand-secondary)]"
                          />
                          <span className="text-sm">Preserve scroll position</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Navigation History */}
                  <div>
                    <h3 className="font-semibold mb-3">Navigation History</h3>
                    <HiveCard className="p-4">
                      <div className="space-y-3">
                        {navigationHistory.slice(-5).reverse().map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-mono">{item.path}</span>
                            <span className="text-xs text-gray-500">
                              {item.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </HiveCard>

                    <div className="mt-4">
                      <h3 className="font-semibold mb-3">Quick Actions</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleNavigation('/spaces')}
                          className="w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span>🏠</span>
                          <span className="text-sm">Back to Spaces</span>
                        </button>
                        <button
                          onClick={() => handleNavigation('/spaces/cs-study-group')}
                          className="w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span>💻</span>
                          <span className="text-sm">Space Home</span>
                        </button>
                        <button
                          onClick={() => handleNavigation('/profile')}
                          className="w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span>👤</span>
                          <span className="text-sm">My Profile</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};