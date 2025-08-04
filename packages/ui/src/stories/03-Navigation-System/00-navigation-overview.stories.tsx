import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '03-Navigation System/00-Navigation Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of the HIVE navigation system - app shells, navigation patterns, and layout components'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const NavigationOverview: React.FC = () => {
  const navigationComponents = [
    {
      title: 'App Shells',
      description: 'Complete application layouts and shell structures',
      icon: '🏗️',
      components: [
        'Enhanced App Shell',
        'Complete App Shell',
        'Shell Overview',
        'Shell Components'
      ],
      purpose: 'Provide consistent application structure and navigation context'
    },
    {
      title: 'Navigation Bars',
      description: 'Top navigation and header components',
      icon: '📱',
      components: [
        'Nav Shell',
        'Top Nav Bar',
        'Header'
      ],
      purpose: 'Primary navigation and branding elements'
    },
    {
      title: 'Page Layouts',
      description: 'Page structure and content organization',
      icon: '📄',
      components: [
        'Page Layouts',
        'Page Templates',
        'Page Layout'
      ],
      purpose: 'Standardized page structures for different content types'
    }
  ];

  const designPrinciples = [
    {
      title: 'Consistent Navigation',
      description: 'Same navigation patterns across all platform areas',
      icon: '🧭',
      details: [
        'Unified navigation structure',
        'Consistent positioning and behavior',
        'Clear visual hierarchy',
        'Predictable interaction patterns'
      ]
    },
    {
      title: 'Context Awareness',
      description: 'Navigation adapts to current user context and location',
      icon: '🎯',
      details: [
        'Location-based navigation highlights',
        'Contextual actions and shortcuts',
        'Role-based navigation elements',
        'Smart navigation suggestions'
      ]
    },
    {
      title: 'Mobile-First Design',
      description: 'Responsive navigation that works beautifully on all devices',
      icon: '📱',
      details: [
        'Touch-friendly navigation elements',
        'Collapsible navigation for small screens',
        'Gesture-based interactions',
        'Progressive enhancement'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Navigation System
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Comprehensive navigation and layout system providing consistent wayfinding and structure across the HIVE platform
          </div>
        </div>

        {/* Navigation Architecture */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Navigation Architecture</h2>
          
          <div className="flex items-center justify-center mb-8">
            <div className="space-y-6">
              {/* Top Level */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary rounded-2xl p-6 text-white mb-2">
                  <div className="text-lg font-bold">App Shell</div>
                  <div className="text-sm opacity-90">Complete application structure</div>
                </div>
              </div>
              
              {/* Middle Level */}
              <div className="flex items-center justify-center gap-8">
                <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4 text-center">
                  <div className="font-bold text-blue-800">Top Navigation</div>
                  <div className="text-sm text-blue-600">Header & primary nav</div>
                </div>
                
                <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 text-center">
                  <div className="font-bold text-green-800">Side Navigation</div>
                  <div className="text-sm text-green-600">Secondary nav & tools</div>
                </div>
              </div>
              
              {/* Bottom Level */}
              <div className="text-center">
                <div className="bg-purple-100 border-2 border-purple-300 rounded-xl p-4">
                  <div className="font-bold text-purple-800">Page Layout</div>
                  <div className="text-sm text-purple-600">Content structure & organization</div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-hive-text-secondary text-center max-w-2xl mx-auto">
            The navigation system follows a hierarchical structure that provides context and wayfinding at every level of the application.
          </p>
        </div>

        {/* Component Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {navigationComponents.map((category) => (
            <div key={category.title} className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-hive-text-primary">{category.title}</h3>
                  <p className="text-sm text-hive-text-secondary">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-hive-text-primary mb-2">Components:</h4>
                  <div className="space-y-1">
                    {category.components.map((component) => (
                      <div key={component} className="flex items-center gap-2 text-sm text-hive-text-secondary">
                        <div className="w-2 h-2 bg-hive-brand-primary rounded-full"></div>
                        {component}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-hive-background-primary rounded-lg">
                  <div className="text-xs font-medium text-hive-text-primary mb-1">Purpose:</div>
                  <div className="text-xs text-hive-text-secondary">{category.purpose}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Principles */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-8 text-center">Navigation Design Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designPrinciples.map((principle) => (
              <div key={principle.title} className="bg-white/50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{principle.icon}</div>
                  <h3 className="font-bold text-hive-text-primary">{principle.title}</h3>
                  <p className="text-sm text-hive-text-secondary mt-2">{principle.description}</p>
                </div>
                
                <div className="space-y-2">
                  {principle.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2 text-sm text-hive-text-secondary">
                      <div className="w-1.5 h-1.5 bg-hive-brand-primary rounded-full flex-shrink-0"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Patterns */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Key Navigation Patterns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>🖥️</span>
                Desktop Navigation
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="font-medium text-hive-text-primary mb-1">Left Sidebar</div>
                  <div className="text-sm text-hive-text-secondary">Primary navigation with collapsible sections</div>
                </div>
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="font-medium text-hive-text-primary mb-1">Top Header</div>
                  <div className="text-sm text-hive-text-secondary">Branding, search, and user actions</div>
                </div>
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="font-medium text-hive-text-primary mb-1">Breadcrumbs</div>
                  <div className="text-sm text-hive-text-secondary">Context and navigation history</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>📱</span>
                Mobile Navigation
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="font-medium text-hive-text-primary mb-1">Bottom Tab Bar</div>
                  <div className="text-sm text-hive-text-secondary">Primary actions and navigation</div>
                </div>
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="font-medium text-hive-text-primary mb-1">Hamburger Menu</div>
                  <div className="text-sm text-hive-text-secondary">Secondary navigation and settings</div>
                </div>
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="font-medium text-hive-text-primary mb-1">Swipe Gestures</div>
                  <div className="text-sm text-hive-text-secondary">Natural navigation between sections</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Guidelines */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Implementation Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>✅</span>
                Best Practices
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Use consistent navigation patterns across the platform</li>
                <li>• Provide clear visual feedback for current location</li>
                <li>• Ensure navigation is accessible via keyboard</li>
                <li>• Test navigation on all supported devices</li>
                <li>• Include proper ARIA labels and semantic HTML</li>
                <li>• Optimize for both mouse and touch interactions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>⚠️</span>
                Considerations
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Consider cognitive load when designing navigation</li>
                <li>• Plan for internationalization and RTL languages</li>
                <li>• Account for different user roles and permissions</li>
                <li>• Design for offline and poor connectivity scenarios</li>
                <li>• Test with screen readers and assistive technology</li>
                <li>• Monitor navigation analytics and user behavior</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NavigationSystemOverview: Story = {
  name: '🧭 Navigation System Overview',
  render: () => <NavigationOverview />
};