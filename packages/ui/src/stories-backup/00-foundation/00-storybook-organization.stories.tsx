import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '00-Foundation/00-Storybook Organization',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of the HIVE Design System organization in Storybook'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SystemCard: React.FC<{
  number: string;
  title: string;
  description: string;
  status: 'complete' | 'in-progress' | 'planned';
  components: number;
  icon: string;
  sections: string[];
}> = ({ number, title, description, status, components, icon, sections }) => {
  const statusConfig = {
    complete: { color: 'bg-hive-status-success', text: 'Complete', icon: '✅' },
    'in-progress': { color: 'bg-hive-status-warning', text: 'In Progress', icon: '🚧' },
    planned: { color: 'bg-hive-status-info', text: 'Planned', icon: '📋' }
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-hive-text-primary">{number} {title}</h3>
            <p className="text-hive-text-secondary text-sm">{description}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
            <span>{config.icon}</span>
            {config.text}
          </span>
          <span className="text-xs text-hive-text-secondary">{components} components</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-hive-text-primary">Sections:</div>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <span key={section} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
              {section}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const StoryBookOrganization: React.FC = () => {
  const systems = [
    {
      number: '00',
      title: 'Foundation',
      description: 'Design system fundamentals, tokens, and guidelines',
      status: 'complete' as const,
      components: 8,
      icon: '🏗️',
      sections: ['Design Tokens', 'Motion System', 'Navigation Overview', 'Component Guidelines']
    },
    {
      number: '01',
      title: 'Atomic Components',
      description: 'Foundational UI building blocks and atoms',
      status: 'complete' as const,
      components: 45,
      icon: '⚛️',
      sections: ['Form Controls', 'Navigation', 'Media', 'Typography', 'Status Indicators', 'Profile Elements']
    },
    {
      number: '02',
      title: 'Molecular Components', 
      description: 'Composite components built from atoms',
      status: 'complete' as const,
      components: 12,
      icon: '🧬',
      sections: ['Cards', 'Forms', 'Profile Components', 'Search Elements']
    },
    {
      number: '03',
      title: 'Navigation System',
      description: 'App shells, navigation patterns, and layout organisms',
      status: 'complete' as const,
      components: 15,
      icon: '🧭',
      sections: ['App Shells', 'Navigation Bars', 'Sidebars', 'Page Layouts', 'Shell Components']
    },
    {
      number: '04',
      title: 'Profile System',
      description: 'Complete profile management with widget-based coordination',
      status: 'complete' as const,
      components: 12,
      icon: '👤',
      sections: ['Foundation', 'Widgets', 'Templates', 'Comprehensive Demo']
    },
    {
      number: '05',
      title: 'Search & Discovery',
      description: 'Space finding, discovery engine, and browse experience',
      status: 'complete' as const,
      components: 10,
      icon: '🔍',
      sections: ['Search Interface', 'Discovery Engine', 'Browse Experience', 'Comprehensive Demo']
    },
    {
      number: '06',
      title: 'Feed & Rituals',
      description: 'Social feed, community rituals, and content discovery',
      status: 'in-progress' as const,
      components: 8,
      icon: '📰',
      sections: ['Feed Components', 'Ritual Framework', 'Content Systems', 'Social Interactions']
    },
    {
      number: '07',
      title: 'Tools & Creation',
      description: 'Tool building, marketplace, and creation workflows',
      status: 'in-progress' as const,
      components: 6,
      icon: '🔧',
      sections: ['Tool Builder', 'Marketplace', 'Creation Tools', 'Tool Management']
    },
    {
      number: '08',
      title: 'Admin & Analytics',
      description: 'Platform administration and community leadership tools',
      status: 'complete' as const,
      components: 6,
      icon: '⚡',
      sections: ['Power Admin', 'Student Leader', 'Moderation', 'Comprehensive Demo']
    },
    {
      number: '09',
      title: 'Settings & Configuration',
      description: 'User preferences, privacy controls, and system configuration',
      status: 'in-progress' as const,
      components: 8,
      icon: '⚙️',
      sections: ['Profile Settings', 'Notifications', 'Privacy Controls', 'Security', 'Appearance', 'Integrations']
    },
    {
      number: '10',
      title: 'Social & Communication',
      description: 'Messaging, posts, comments, and social interactions',
      status: 'planned' as const,
      components: 0,
      icon: '💬',
      sections: ['Direct Messages', 'Space Posts', 'Comments & Reactions', 'Social Features']
    },
    {
      number: '11',
      title: 'Mobile & Responsive',
      description: 'Touch interactions, mobile patterns, and responsive variants',
      status: 'planned' as const,
      components: 0,
      icon: '📱',
      sections: ['Touch Patterns', 'Mobile Navigation', 'Responsive Variants', 'Mobile-Specific']
    },
    {
      number: '99',
      title: 'System Integration',
      description: 'Complete system showcases and integration examples',
      status: 'in-progress' as const,
      components: 4,
      icon: '🔗',
      sections: ['System Showcases', 'Integration Examples', 'End-to-End Demos']
    }
  ];

  const completedSystems = systems.filter(s => s.status === 'complete').length;
  const totalComponents = systems.reduce((sum, system) => sum + system.components, 0);

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            HIVE Design System Organization
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Comprehensive component library organized by systems for building the social utility platform
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-hive-brand-primary">{systems.length}</div>
              <div className="text-sm text-hive-text-secondary">Total Systems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hive-status-success">{completedSystems}</div>
              <div className="text-sm text-hive-text-secondary">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hive-text-primary">{totalComponents}</div>
              <div className="text-sm text-hive-text-secondary">Components</div>
            </div>
          </div>
        </div>

        {/* Navigation Principles */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Organization Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl mb-4">🏗️</div>
              <h3 className="font-bold text-hive-text-primary mb-2">System-Based</h3>
              <p className="text-sm text-hive-text-secondary">Components organized by functional systems rather than atomic hierarchy</p>
            </div>
            
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="font-bold text-hive-text-primary mb-2">Progressive</h3>
              <p className="text-sm text-hive-text-secondary">Foundation → Atoms → Molecules → Systems → Integration</p>
            </div>
            
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-hive-text-primary mb-2">Purpose-Driven</h3>
              <p className="text-sm text-hive-text-secondary">Each system serves specific user needs and platform goals</p>
            </div>
          </div>
        </div>

        {/* System Grid */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-hive-text-primary text-center">System Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {systems.map((system) => (
              <SystemCard key={system.number} {...system} />
            ))}
          </div>
        </div>

        {/* Navigation Guide */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">How to Navigate</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4">📚 For Developers</h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Start with <strong>00-Foundation</strong> for design principles</li>
                <li>• Use <strong>01-Atomic</strong> and <strong>02-Molecular</strong> for basic components</li>
                <li>• Build features using system-specific components</li>
                <li>• Reference <strong>99-Integration</strong> for complete examples</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4">🎨 For Designers</h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Review <strong>Foundation</strong> for design tokens and guidelines</li>
                <li>• Explore system demos for interaction patterns</li>
                <li>• Use comprehensive demos for workflow inspiration</li>
                <li>• Check integration examples for system relationships</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Quick Access</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="p-4 bg-hive-background-primary rounded-xl hover:bg-hive-brand-primary/10 transition-colors text-center">
              <div className="text-2xl mb-2">🏗️</div>
              <div className="text-sm font-medium text-hive-text-primary">Foundation</div>
            </a>
            
            <a href="#" className="p-4 bg-hive-background-primary rounded-xl hover:bg-hive-brand-primary/10 transition-colors text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="text-sm font-medium text-hive-text-primary">Profile System</div>
            </a>
            
            <a href="#" className="p-4 bg-hive-background-primary rounded-xl hover:bg-hive-brand-primary/10 transition-colors text-center">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-sm font-medium text-hive-text-primary">Search & Discovery</div>
            </a>
            
            <a href="#" className="p-4 bg-hive-background-primary rounded-xl hover:bg-hive-brand-primary/10 transition-colors text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium text-hive-text-primary">Settings</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompleteOrganization: Story = {
  name: '📚 Complete Storybook Organization',
  render: () => <StoryBookOrganization />
};