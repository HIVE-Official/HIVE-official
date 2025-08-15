import type { Meta, StoryObj } from '@storybook/react';
import { ExternalLink, ArrowRight, ChevronRight, Home, Users, Calendar, Settings, BookOpen, MapPin, Bell, Search, Plus, Menu } from 'lucide-react';
import { Link } from '../../atomic/atoms/link';
import { Button } from '../../atomic/atoms/button-enhanced';

const meta: Meta = {
  title: '02-Atoms/Navigation-Elements/Link & Navigation System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Link & Navigation System

A comprehensive navigation system designed for seamless movement through the HIVE platform. This system provides intuitive linking patterns that help University at Buffalo students navigate between spaces, discover content, and access platform features.

## Campus Integration Features
- **Contextual Navigation** - Smart links that understand academic and social contexts
- **Progressive Disclosure** - Navigation that reveals relevant options based on user location
- **Cross-Platform Linking** - Seamless connections between campus systems and HIVE
- **Mobile-First Design** - Touch-optimized navigation for on-campus mobile usage

## Navigation Types
- **Internal Links** - Between HIVE pages and sections
- **External Links** - To campus resources and third-party integrations
- **Action Links** - Trigger platform operations and modal interactions
- **Contextual Links** - Smart suggestions based on user behavior and location

## Accessibility Standards
- **WCAG 2.1 AA Compliant** - Full keyboard navigation and screen reader support
- **Focus Management** - Clear focus indicators and logical tab progression
- **Semantic Linking** - Proper link context and descriptive text
- **Screen Reader Optimization** - Link purposes clearly announced
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Navigation Patterns
const campusNavigationPatterns = [
  {
    category: 'Primary Navigation',
    links: [
      { 
        href: '/feed', 
        label: 'Campus Feed', 
        icon: Home, 
        description: 'Latest campus activity and updates',
        type: 'internal',
        priority: 'high'
      },
      { 
        href: '/spaces', 
        label: 'My Spaces', 
        icon: Users, 
        description: 'Study groups, clubs, and social spaces',
        type: 'internal',
        priority: 'high'
      },
      { 
        href: '/calendar', 
        label: 'Calendar', 
        icon: Calendar, 
        description: 'Academic schedule and social events',
        type: 'internal',
        priority: 'high'
      },
      { 
        href: '/tools', 
        label: 'Campus Tools', 
        icon: BookOpen, 
        description: 'Academic and social utilities',
        type: 'internal',
        priority: 'medium'
      }
    ]
  },
  {
    category: 'Campus Resources',
    links: [
      { 
        href: 'https://buffalo.edu/studentlife', 
        label: 'UB Student Life', 
        icon: ExternalLink, 
        description: 'Official campus resources',
        type: 'external',
        priority: 'medium'
      },
      { 
        href: 'https://myub.buffalo.edu', 
        label: 'MyUB Portal', 
        icon: ExternalLink, 
        description: 'Academic records and registration',
        type: 'external',
        priority: 'high'
      },
      { 
        href: 'https://buffalo.edu/maps', 
        label: 'Campus Maps', 
        icon: MapPin, 
        description: 'Navigate North and South Campus',
        type: 'external',
        priority: 'medium'
      }
    ]
  },
  {
    category: 'Quick Actions',
    links: [
      { 
        href: '/spaces/create', 
        label: 'Create Space', 
        icon: Plus, 
        description: 'Start a new study group or social space',
        type: 'action',
        priority: 'high'
      },
      { 
        href: '/search', 
        label: 'Find Students', 
        icon: Search, 
        description: 'Connect with classmates and peers',
        type: 'action',
        priority: 'medium'
      },
      { 
        href: '/notifications', 
        label: 'Notifications', 
        icon: Bell, 
        description: 'Campus updates and messages',
        type: 'action',
        priority: 'medium'
      }
    ]
  }
];

// Contextual Link Patterns
const contextualLinkPatterns = [
  {
    context: 'Study Group Space',
    links: [
      { label: 'View Members', href: '/spaces/123/members', icon: Users },
      { label: 'Schedule Study Session', href: '/spaces/123/events/create', icon: Calendar },
      { label: 'Share Resources', href: '/spaces/123/resources', icon: BookOpen },
      { label: 'Space Settings', href: '/spaces/123/settings', icon: Settings }
    ]
  },
  {
    context: 'Academic Course',
    links: [
      { label: 'Course Schedule', href: '/courses/cse115/schedule', icon: Calendar },
      { label: 'Study Groups', href: '/courses/cse115/groups', icon: Users },
      { label: 'Course Resources', href: '/courses/cse115/resources', icon: BookOpen },
      { label: 'Class Discussion', href: '/courses/cse115/discussion', icon: Menu }
    ]
  },
  {
    context: 'Dorm Floor Community',
    links: [
      { label: 'Floor Events', href: '/dorms/ellicott/events', icon: Calendar },
      { label: 'Laundry Tracker', href: '/dorms/ellicott/laundry', icon: Settings },
      { label: 'Food Orders', href: '/dorms/ellicott/food', icon: Plus },
      { label: 'Floor Directory', href: '/dorms/ellicott/directory', icon: Users }
    ]
  }
];

// Primary Navigation Story
export const PrimaryNavigation: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Primary Navigation System</h2>
        <p className="text-lg text-gray-600">Core navigation links for University at Buffalo students</p>
      </div>

      {campusNavigationPatterns.map((category) => (
        <div key={category.category} className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            {category.category}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {category.links.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        link.priority === 'high' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <Link 
                          href={link.href} 
                          className={`font-medium ${
                            link.type === 'external' ? 'text-blue-600 hover:text-blue-800' :
                            'text-gray-900 hover:text-blue-600'
                          } transition-colors`}
                          {...(link.type === 'external' && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {link.label}
                          {link.type === 'external' && (
                            <ExternalLink className="inline h-3 w-3 ml-1" />
                          )}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      link.priority === 'high' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {link.priority}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <span className={`px-2 py-1 rounded ${
                      link.type === 'internal' ? 'bg-blue-50 text-blue-700' :
                      link.type === 'external' ? 'bg-purple-50 text-purple-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {link.type}
                    </span>
                    <ArrowRight className="h-3 w-3 ml-auto" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
};

// Contextual Navigation Story
export const ContextualNavigation: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contextual Navigation</h2>
        <p className="text-lg text-gray-600">Smart links that adapt to user context and location</p>
      </div>

      {contextualLinkPatterns.map((context) => (
        <div key={context.context} className="mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {context.context}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-3">
              {context.links.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <IconComponent className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {link.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-gray-600 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

// Link Variants Story
export const LinkVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Link Variants & States</h2>
        <p className="text-lg text-gray-600">Different link styles for various use cases</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Text Link Variants */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Text Link Variants</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Default Link</h4>
              <Link href="/example" className="text-blue-600 hover:text-blue-800 transition-colors">
                Join Study Group for CSE 115
              </Link>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Inline Link</h4>
              <p className="text-gray-700">
                Check out the <Link href="/spaces/cse115" className="text-blue-600 hover:underline">CSE 115 study space</Link> for upcoming sessions.
              </p>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">External Link</h4>
              <Link 
                href="https://buffalo.edu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
              >
                UB Official Website
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Disabled Link</h4>
              <Link href="#" className="text-gray-400 cursor-not-allowed">
                Space Currently Full (15/15 members)
              </Link>
            </div>
          </div>
        </div>

        {/* Button Link Variants */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Button Link Variants</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Primary Action</h4>
              <Button asChild>
                <Link href="/spaces/join">
                  <Users className="h-4 w-4 mr-2" />
                  Join Space
                </Link>
              </Button>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Secondary Action</h4>
              <Button variant="outline" asChild>
                <Link href="/spaces/browse">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Spaces
                </Link>
              </Button>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Ghost Action</h4>
              <Button variant="ghost" asChild>
                <Link href="/profile/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Link Button</h4>
              <Button variant="link" asChild>
                <Link href="/help">
                  Need help? Contact support
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Interactive Navigation Demo Story
export const InteractiveNavigationDemo: Story = {
  render: () => {
    const [activeSection, setActiveSection] = React.useState('feed');
    
    const navigationSections = [
      { id: 'feed', label: 'Campus Feed', icon: Home, color: 'blue' },
      { id: 'spaces', label: 'My Spaces', icon: Users, color: 'green' },
      { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'purple' },
      { id: 'tools', label: 'Tools', icon: BookOpen, color: 'orange' }
    ];

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Navigation Demo</h2>
          <p className="text-lg text-gray-600">Experience HIVE's adaptive navigation system</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {navigationSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      activeSection === section.id
                        ? `border-${section.color}-500 text-${section.color}-600 bg-${section.color}-50`
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Dynamic Content Area */}
          <div className="p-6">
            <div className="text-center py-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                activeSection === 'feed' ? 'bg-blue-100 text-blue-600' :
                activeSection === 'spaces' ? 'bg-green-100 text-green-600' :
                activeSection === 'calendar' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {React.createElement(navigationSections.find(s => s.id === activeSection)?.icon || Home, {
                  className: "h-8 w-8"
                })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {navigationSections.find(s => s.id === activeSection)?.label}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeSection === 'feed' && 'Latest campus activity and social updates'}
                {activeSection === 'spaces' && 'Your study groups, clubs, and social communities'}
                {activeSection === 'calendar' && 'Academic schedule and upcoming events'}
                {activeSection === 'tools' && 'Campus utilities and productivity tools'}
              </p>

              {/* Contextual Quick Links */}
              <div className="grid md:grid-cols-2 gap-3 max-w-md mx-auto">
                {activeSection === 'feed' && (
                  <>
                    <Link href="/feed/trending" className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      <Bell className="h-4 w-4" />
                      Trending Posts
                    </Link>
                    <Link href="/feed/create" className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      <Plus className="h-4 w-4" />
                      Create Post
                    </Link>
                  </>
                )}
                
                {activeSection === 'spaces' && (
                  <>
                    <Link href="/spaces/browse" className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      <Search className="h-4 w-4" />
                      Browse Spaces
                    </Link>
                    <Link href="/spaces/create" className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      <Plus className="h-4 w-4" />
                      Create Space
                    </Link>
                  </>
                )}
                
                {activeSection === 'calendar' && (
                  <>
                    <Link href="/calendar/today" className="flex items-center gap-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                      <Calendar className="h-4 w-4" />
                      Today's Events
                    </Link>
                    <Link href="/calendar/create" className="flex items-center gap-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                      <Plus className="h-4 w-4" />
                      Add Event
                    </Link>
                  </>
                )}
                
                {activeSection === 'tools' && (
                  <>
                    <Link href="/tools/browse" className="flex items-center gap-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                      <Search className="h-4 w-4" />
                      Tool Library
                    </Link>
                    <Link href="/tools/builder" className="flex items-center gap-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                      <Plus className="h-4 w-4" />
                      Build Tool
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-2">Navigation Features</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Context-aware navigation that adapts to user location</li>
            <li>• Quick access to relevant actions based on current section</li>
            <li>• Keyboard navigation support with proper focus management</li>
            <li>• Mobile-optimized touch targets for campus usage</li>
          </ul>
        </div>
      </div>
    );
  }
};