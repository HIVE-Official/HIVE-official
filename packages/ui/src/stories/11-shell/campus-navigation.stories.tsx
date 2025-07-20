import type { Meta, StoryObj } from '@storybook/react';
import { 
  CampusBar,
  ContextBreadcrumbs, 
  SixSurfacesTabBar,
  CampusLayoutShell,
  NavigationProvider
} from '../../components/navigation';
import { 
  Home, Users, BookOpen, Calendar, Zap, MessageSquare,
  Building, Coffee, FlaskConical, User
} from 'lucide-react';

const meta: Meta<typeof CampusLayoutShell> = {
  title: '11. Shell/Campus Navigation',
  component: CampusLayoutShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Campus Navigation

The HIVE Campus Navigation system implements a spatial metaphor where the platform feels like a university campus. This creates intuitive navigation that mirrors real-world spatial understanding.

## Navigation Philosophy

**"Think of HIVE as a Campus"**

- **Feed**: The quad where everyone gathers - social, discovery, general activity
- **Spaces**: Buildings you enter for focused work - organized by purpose/topic  
- **Profile**: Your dorm room - personal space for reflection and management
- **HiveLAB**: The maker space - where tools are built and creativity happens

## Components

### CampusBar
Top navigation with the three main campus areas and HiveLAB builder toggle.

### ContextBreadcrumbs
Spatial awareness - shows where you are in the campus hierarchy.

### SixSurfacesTabBar
Within each Space, navigate between the six surfaces (Posts, Chat, Members, Events, Tools, Pinned).

### CampusLayoutShell
Complete layout wrapper that combines all campus navigation elements.
        `
      }
    }
  },
  argTypes: {
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof CampusLayoutShell>;

// Mock data
const mockUser = {
  id: '1',
  name: 'Jacob Wilson',
  handle: '@jacob',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  role: 'Founder',
  status: 'online' as const
};

const mockNavigationConfig = {
  variant: 'topbar' as const,
  size: 'standard' as const,
  position: 'sticky' as const,
  showSearch: true,
  showNotifications: true,
  showUserMenu: true,
  showBranding: true,
  keyboardShortcuts: true,
};

const mockBreadcrumbs = [
  { id: 'campus', label: 'Campus', icon: Home },
  { id: 'spaces', label: 'Spaces', icon: Building },
  { id: 'design-system', label: 'Design System Space', icon: Zap },
];

const mockSurfaces = [
  { id: 'posts', label: 'Posts', icon: BookOpen, count: 24, isActive: true },
  { id: 'chat', label: 'Chat', icon: MessageSquare, count: 5 },
  { id: 'members', label: 'Members', icon: Users, count: 12 },
  { id: 'events', label: 'Events', icon: Calendar, count: 3 },
  { id: 'tools', label: 'Tools', icon: Zap, count: 8 },
  { id: 'pinned', label: 'Pinned', icon: Coffee, count: 2 },
];

const CampusNavigationWrapper = ({ children, ...props }: any) => (
  <NavigationProvider
    config={mockNavigationConfig}
    user={mockUser}
    sections={[]}
  >
    <CampusLayoutShell {...props}>
      {children}
    </CampusLayoutShell>
  </NavigationProvider>
);

export const CampusOverview: Story = {
  render: (args) => (
    <CampusNavigationWrapper {...args}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Campus Navigation Demo</h2>
              <p className="text-gray-600 mb-4">
                This demonstrates the HIVE campus metaphor in action. The navigation 
                follows spatial understanding patterns that mirror real university campus navigation.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">🏛️ Campus Areas</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Feed</strong> (The Quad) - Social gathering space<br/>
                    <strong>Spaces</strong> (Buildings) - Focused work environments<br/>
                    <strong>Profile</strong> (Dorm Room) - Personal management space
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">🔬 HiveLAB</h3>
                  <p className="text-sm text-gray-600">
                    The maker space where tools are built. Toggle shows entry into creator mode
                    with pulsing gold accent when tools are available to build.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">🗺️ Spatial Awareness</h3>
                  <p className="text-sm text-gray-600">
                    Breadcrumbs show your location in the campus hierarchy. Six Surfaces
                    provide focused navigation within each Space.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-medium mb-4">Navigation State</h3>
              <div className="space-y-2 text-sm">
                <div>Current Area: <span className="font-medium">Spaces</span></div>
                <div>Location: <span className="font-medium">Design System Space</span></div>
                <div>Surface: <span className="font-medium">Posts</span></div>
                <div>HiveLAB: <span className="font-medium">Available</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CampusNavigationWrapper>
  ),
  args: {
    breadcrumbs: mockBreadcrumbs,
    surfaces: mockSurfaces,
  },
};

export const CampusBarOnly: Story = {
  render: () => (
    <NavigationProvider
      config={mockNavigationConfig}
      user={mockUser}
      sections={[]}
    >
      <div className="min-h-screen bg-gray-50">
        <CampusBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-4">Campus Bar Component</h2>
            <p className="text-gray-600 mb-6">
              The main navigation bar that provides access to the three core campus areas
              and the HiveLAB builder toggle.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Coffee className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <h3 className="font-medium">Feed</h3>
                <p className="text-sm text-gray-600">The campus quad</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Spaces</h3>
                <p className="text-sm text-gray-600">Academic buildings</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <User className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Profile</h3>
                <p className="text-sm text-gray-600">Your dorm room</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center">
                <FlaskConical className="w-5 h-5 mr-2 text-yellow-600" />
                <h4 className="font-medium">HiveLAB Maker Space</h4>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                The builder toggle with pulsing indicator shows when tools are available to create.
              </p>
            </div>
          </div>
        </div>
      </div>
    </NavigationProvider>
  ),
};

export const SixSurfacesDemo: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Six Surfaces Navigation</h2>
        <p className="text-gray-600 mb-8">
          Within each Space, navigate between the six core surfaces that organize all content and functionality.
        </p>
        
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <SixSurfacesTabBar 
            surfaces={mockSurfaces}
            onSurfaceChange={(surfaceId) => console.log('Surface changed to:', surfaceId)}
          />
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockSurfaces.map((surface) => {
              const Icon = surface.icon;
              return (
                <div key={surface.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Icon className="w-5 h-5 mr-2" />
                    <h3 className="font-medium">{surface.label}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {surface.count ? `${surface.count} items` : 'No items'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BreadcrumbsDemo: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Context Breadcrumbs</h2>
        <p className="text-gray-600 mb-8">
          Spatial awareness navigation that shows your current location in the campus hierarchy.
        </p>
        
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-medium mb-4">Campus Level</h3>
            <ContextBreadcrumbs 
              items={[
                { id: 'campus', label: 'Campus', icon: Home }
              ]}
            />
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-medium mb-4">Area Level</h3>
            <ContextBreadcrumbs 
              items={[
                { id: 'campus', label: 'Campus', icon: Home },
                { id: 'spaces', label: 'Spaces', icon: Building }
              ]}
            />
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-medium mb-4">Space Level</h3>
            <ContextBreadcrumbs items={mockBreadcrumbs} />
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-medium mb-4">Deep Navigation</h3>
            <ContextBreadcrumbs 
              items={[
                { id: 'campus', label: 'Campus', icon: Home },
                { id: 'spaces', label: 'Spaces', icon: Building },
                { id: 'design-system', label: 'Design System Space', icon: Zap },
                { id: 'posts', label: 'Posts', icon: BookOpen },
                { id: 'post-123', label: 'Component Guidelines' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};