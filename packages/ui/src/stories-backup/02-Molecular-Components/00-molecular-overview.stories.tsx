import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '02-Molecular Components/00-Molecular Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of molecular components - composite UI patterns built from atomic components'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const MolecularOverview: React.FC = () => {
  const categories = [
    {
      title: 'Cards',
      description: 'Structured content containers and information display',
      icon: '🗃️',
      components: [
        'Card (Base)',
        'Avatar Card',
        'User Card'
      ],
      atoms: ['Container', 'Typography', 'Avatar', 'Button', 'Badge']
    },
    {
      title: 'Forms', 
      description: 'Composite form patterns and input groups',
      icon: '📋',
      components: [
        'Form Field',
        'Email Input'
      ],
      atoms: ['Input', 'Label', 'Text', 'Icon']
    },
    {
      title: 'Profile Components',
      description: 'User profile display and interaction patterns',
      icon: '👤',
      components: [
        'Profile Header',
        'Profile Stats'
      ],
      atoms: ['Profile Avatar', 'Profile Badge', 'Profile Statistic', 'Typography']
    },
    {
      title: 'Search Elements',
      description: 'Search interface and discovery patterns',
      icon: '🔍',
      components: [
        'Search Bar'
      ],
      atoms: ['Input', 'Icon', 'Button']
    }
  ];

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Molecular Components
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Composite UI patterns that combine atomic components into reusable interface elements
          </div>
        </div>

        {/* Molecular Design Principle */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Molecular Design Principle</h2>
          
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-1 mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                </div>
                <div className="font-bold text-hive-text-primary">Multiple Atoms</div>
                <div className="text-sm text-hive-text-secondary">Individual elements</div>
              </div>
              
              <svg className="w-8 h-8 text-hive-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4">
                  🧬
                </div>
                <div className="font-bold text-hive-text-primary">One Molecule</div>
                <div className="text-sm text-hive-text-secondary">Cohesive component</div>
              </div>
            </div>
          </div>
          
          <p className="text-hive-text-secondary text-center max-w-2xl mx-auto">
            Molecules are combinations of atoms that work together as a unit. They have their own properties and serve as the backbone of our design systems, providing consistent patterns for common interface needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-6">
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
                
                <div>
                  <h4 className="font-medium text-hive-text-primary mb-2">Built from atoms:</h4>
                  <div className="flex flex-wrap gap-1">
                    {category.atoms.map((atom) => (
                      <span key={atom} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
                        {atom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Guidelines */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Molecular Design Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>🔗</span>
                Composition
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Combine 2-5 atoms that work together</li>
                <li>• Each molecule serves a specific purpose</li>
                <li>• Maintain clear internal relationships</li>
                <li>• Follow single responsibility principle</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>♻️</span>
                Reusability
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Design for multiple contexts</li>
                <li>• Avoid hardcoded content</li>
                <li>• Provide flexible prop interfaces</li>
                <li>• Test across different use cases</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                <span>🎯</span>
                Consistency
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Follow established patterns</li>
                <li>• Use consistent spacing and sizing</li>
                <li>• Maintain brand alignment</li>
                <li>• Document usage guidelines</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Component Hierarchy */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Component Hierarchy</h2>
          
          <div className="flex items-center justify-center">
            <div className="text-center space-y-8">
              {/* Atoms Level */}
              <div>
                <div className="text-lg font-bold text-hive-text-primary mb-4">Atoms</div>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">Button</div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">Input</div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm">Label</div>
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm">Icon</div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center">
                <svg className="w-8 h-8 text-hive-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Molecules Level */}
              <div>
                <div className="text-lg font-bold text-hive-text-primary mb-4">Molecules</div>
                <div className="flex items-center justify-center gap-6">
                  <div className="p-4 border-2 border-dashed border-hive-border-default rounded-xl">
                    <div className="text-sm font-medium text-hive-text-primary mb-2">Form Field</div>
                    <div className="flex flex-col gap-2">
                      <div className="w-12 h-3 bg-purple-300 rounded"></div>
                      <div className="w-16 h-4 bg-green-300 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-2 border-dashed border-hive-border-default rounded-xl">
                    <div className="text-sm font-medium text-hive-text-primary mb-2">Search Bar</div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-4 bg-green-300 rounded"></div>
                      <div className="w-4 h-4 bg-orange-300 rounded"></div>
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
};

export const MolecularComponentsOverview: Story = {
  name: '🧬 Molecular Components Overview',
  render: () => <MolecularOverview />
};