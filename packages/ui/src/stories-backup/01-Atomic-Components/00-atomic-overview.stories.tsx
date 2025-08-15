import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '01-Atomic Components/00-Atomic Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of all atomic components - the foundational building blocks of the HIVE design system'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const AtomicOverview: React.FC = () => {
  const categories = [
    {
      title: 'Form Controls',
      description: 'Interactive input elements and form components',
      icon: '📝',
      components: [
        'Button & Button Enhanced',
        'Input & Input Enhanced', 
        'Textarea & Textarea Enhanced',
        'Checkbox & Checkbox Enhanced',
        'Radio & Radio Enhanced',
        'Select & Select Enhanced',
        'Switch & Switch Enhanced',
        'Slider',
        'File Input'
      ]
    },
    {
      title: 'Navigation',
      description: 'Navigation elements and wayfinding components',
      icon: '🧭',
      components: [
        'Nav Bar',
        'Sidebar',
        'Link',
        'Navigation Preferences'
      ]
    },
    {
      title: 'Media',
      description: 'Visual content and media display components',
      icon: '🖼️',
      components: [
        'Avatar',
        'Image',
        'Icon'
      ]
    },
    {
      title: 'Typography',
      description: 'Text display and typographic elements',
      icon: '📄',
      components: [
        'Text',
        'Typography',
        'Label'
      ]
    },
    {
      title: 'Status Indicators',
      description: 'Visual feedback and state communication',
      icon: '🚦',
      components: [
        'Badge',
        'Progress',
        'Skeleton',
        'Spinner',
        'Status Indicator',
        'Tooltip'
      ]
    },
    {
      title: 'Profile Elements',
      description: 'User profile and identity components',
      icon: '👤',
      components: [
        'Profile Avatar',
        'Profile Badge',
        'Profile Action',
        'Profile Statistic'
      ]
    },
    {
      title: 'Layout',
      description: 'Structural and spacing components',
      icon: '📐',
      components: [
        'Container',
        'Separator',
        'Spacer',
        'Tag'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Atomic Components
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Foundational UI building blocks that form the base of all HIVE interface components
          </div>
        </div>

        {/* Atomic Design Principle */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Atomic Design Principle</h2>
          
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl mb-2">
                  ⚛️
                </div>
                <div className="font-bold text-hive-text-primary">Atoms</div>
                <div className="text-sm text-hive-text-secondary">Basic elements</div>
              </div>
              
              <svg className="w-8 h-8 text-hive-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl mb-2">
                  🧬
                </div>
                <div className="font-bold text-hive-text-primary">Molecules</div>
                <div className="text-sm text-hive-text-secondary">Combined atoms</div>
              </div>
              
              <svg className="w-8 h-8 text-hive-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl mb-2">
                  🏗️
                </div>
                <div className="font-bold text-hive-text-primary">Systems</div>
                <div className="text-sm text-hive-text-secondary">Complete features</div>
              </div>
            </div>
          </div>
          
          <p className="text-hive-text-secondary text-center max-w-2xl mx-auto">
            Atoms are the basic building blocks that can't be broken down further. They include buttons, inputs, icons, and other fundamental HTML elements styled according to HIVE's design principles.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-hive-text-primary">{category.title}</h3>
                  <p className="text-sm text-hive-text-secondary">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {category.components.map((component) => (
                  <div key={component} className="flex items-center gap-2 text-sm text-hive-text-secondary">
                    <div className="w-2 h-2 bg-hive-brand-primary rounded-full"></div>
                    {component}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Guidelines */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Usage Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>✅</span>
                Do
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Use atoms as building blocks for larger components</li>
                <li>• Follow the established design tokens and spacing</li>
                <li>• Maintain consistency across all atomic implementations</li>
                <li>• Test components in isolation for reusability</li>
                <li>• Document props and usage patterns clearly</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>❌</span>
                Don't
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Create atoms that depend on external context</li>
                <li>• Modify atomic styles for specific use cases</li>
                <li>• Include business logic in atomic components</li>
                <li>• Create atoms that are too specific to one feature</li>
                <li>• Break the single responsibility principle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AtomicComponentsOverview: Story = {
  name: '⚛️ Atomic Components Overview',
  render: () => <AtomicOverview />
};