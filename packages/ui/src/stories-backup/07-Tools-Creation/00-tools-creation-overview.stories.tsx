import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '07-Tools & Creation/00-Tools Creation Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of the Tools & Creation system - tool building, marketplace, and collaborative creation workflows'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ToolsCreationOverview: React.FC = () => {
  const systemComponents = [
    {
      title: 'Tool Builder',
      description: 'Visual tool creation and customization interface',
      icon: '🛠️',
      components: [
        'Visual Tool Builder',
        'Element Library',
        'Logic Editor',
        'Preview System'
      ],
      status: 'in-progress' as const
    },
    {
      title: 'Marketplace',
      description: 'Tool discovery, sharing, and distribution platform',
      icon: '🏪',
      components: [
        'Tools Marketplace',  
        'Tool Categories',
        'Rating System',
        'Installation Flow'
      ],
      status: 'in-progress' as const
    },
    {
      title: 'Creation Tools',
      description: 'Advanced creation utilities and collaborative features',
      icon: '⚡',
      components: [
        'Template System',
        'Collaboration Tools',
        'Version Control',
        'Publishing Workflow'
      ],
      status: 'planned' as const
    }
  ];

  const toolCategories = [
    {
      title: 'Academic Tools',
      description: 'Study aids, calculators, and educational utilities',
      icon: '📚',
      examples: [
        'GPA Calculator',
        'Study Timer',
        'Flashcard System',
        'Citation Generator',
        'Research Tracker'
      ],
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      title: 'Coordination Tools',
      description: 'Group organization and project management',
      icon: '📅',
      examples: [
        'Group Scheduler',
        'Task Tracker',
        'Meeting Planner',
        'Resource Allocator',
        'Progress Dashboard'
      ],
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      title: 'Campus Life Tools',
      description: 'Daily campus utilities and convenience tools',
      icon: '🏫',
      examples: [
        'Laundry Tracker',
        'Dining Hall Menu',
        'Room Finder',
        'Event Calendar',
        'Bus Tracker'
      ],
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      title: 'Social Tools',
      description: 'Community building and social interaction utilities',
      icon: '👥',
      examples: [
        'Icebreaker Generator',
        'Study Group Matcher',
        'Skill Exchange',
        'Event Organizer',
        'Feedback Collector'
      ],
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    }
  ];

  const creationPrinciples = [
    {
      title: 'Student-Built Solutions',
      description: 'Tools created by students, for students, addressing real campus needs',
      icon: '🎓',
      benefits: [
        'Authentic problem understanding',
        'Peer-to-peer knowledge sharing',
        'Rapid iteration based on feedback',
        'Community ownership and investment'
      ]
    },
    {
      title: 'Collaborative Development',
      description: 'Multiple students can contribute to and improve tools together',
      icon: '🤝',
      benefits: [
        'Shared knowledge and skills',
        'Distributed development effort',
        'Cross-disciplinary perspectives',
        'Sustainable tool maintenance'
      ]
    },
    {
      title: 'Social Distribution',
      description: 'Tools spread through communities rather than top-down deployment',
      icon: '🌐',
      benefits: [
        'Organic quality filtering',
        'Context-aware recommendations',
        'Community-driven support',
        'Natural adoption patterns'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Tools & Creation System
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Empower students to build, share, and collaborate on tools that solve real campus problems and enhance academic success
          </div>
        </div>

        {/* Creation Philosophy */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Student-Driven Creation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🛠️
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Build</h3>
              <p className="text-sm text-hive-text-secondary">Create tools that solve problems you actually face</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🤝
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Share</h3>
              <p className="text-sm text-hive-text-secondary">Help others by sharing your solutions and insights</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Improve</h3>
              <p className="text-sm text-hive-text-secondary">Collaborate to make tools better for everyone</p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-xl">
            <blockquote className="text-center italic text-hive-text-primary">
              "Your tools aren't just productivity apps — they're solutions you build and share with your community, creating connections around solving real problems together."
            </blockquote>
          </div>
        </div>

        {/* System Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systemComponents.map((category) => {
            const statusConfig = {
              'completed': { color: 'bg-hive-status-success', text: 'Complete' },
              'in-progress': { color: 'bg-hive-status-warning', text: 'In Progress' },
              'planned': { color: 'bg-hive-status-info', text: 'Planned' }
            };
            
            const config = statusConfig[category.status];
            
            return (
              <div key={category.title} className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-hive-text-primary">{category.title}</h3>
                      <p className="text-sm text-hive-text-secondary">{category.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
                    {config.text}
                  </span>
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
            );
          })}
        </div>

        {/* Tool Categories */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-hive-text-primary text-center">Tool Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolCategories.map((category) => (
              <div key={category.title} className={`rounded-2xl border p-6 ${category.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold">{category.title}</h3>
                    <p className="text-sm opacity-80">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium opacity-90">Popular tools:</div>
                  {category.examples.map((example) => (
                    <div key={example} className="flex items-center gap-2 text-sm opacity-75">
                      <div className="w-1.5 h-1.5 bg-current rounded-full flex-shrink-0"></div>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creation Principles */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-8 text-center">Creation Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {creationPrinciples.map((principle) => (
              <div key={principle.title} className="bg-white/50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{principle.icon}</div>
                  <h3 className="font-bold text-hive-text-primary">{principle.title}</h3>
                  <p className="text-sm text-hive-text-secondary mt-2">{principle.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-hive-text-primary">Benefits:</div>
                  {principle.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm text-hive-text-secondary">
                      <div className="w-1.5 h-1.5 bg-hive-brand-primary rounded-full flex-shrink-0"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tool Lifecycle */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Tool Development Lifecycle</h2>
          
          <div className="space-y-8">
            {/* Lifecycle Steps */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {[
                  { step: '1', title: 'Ideate', desc: 'Identify problem', icon: '💡' },
                  { step: '2', title: 'Build', desc: 'Create solution', icon: '🛠️' },
                  { step: '3', title: 'Test', desc: 'Validate with peers', icon: '🧪' },
                  { step: '4', title: 'Share', desc: 'Publish to community', icon: '🌐' },
                  { step: '5', title: 'Collaborate', desc: 'Iterate together', icon: '🤝' },
                  { step: '6', title: 'Scale', desc: 'Expand reach', icon: '📈' }
                ].map((item, index, array) => (
                  <div key={item.step} className="flex items-center">
                    <div className="text-center min-w-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full flex items-center justify-center text-white text-xl mb-2">
                        {item.icon}
                      </div>
                      <div className="font-bold text-hive-text-primary text-sm">{item.title}</div>
                      <div className="text-xs text-hive-text-secondary">{item.desc}</div>
                    </div>
                    {index < array.length - 1 && (
                      <svg className="w-8 h-8 text-hive-text-secondary mx-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Success Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-hive-background-primary rounded-xl">
                <div className="text-2xl mb-2">👥</div>
                <div className="font-bold text-hive-text-primary">Community Usage</div>
                <div className="text-sm text-hive-text-secondary">Tools used by peers</div>
              </div>
              
              <div className="text-center p-4 bg-hive-background-primary rounded-xl">
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-bold text-hive-text-primary">Collaborative Improvement</div>
                <div className="text-sm text-hive-text-secondary">Multiple contributors</div>
              </div>
              
              <div className="text-center p-4 bg-hive-background-primary rounded-xl">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-bold text-hive-text-primary">Problem Solving</div>
                <div className="text-sm text-hive-text-secondary">Real needs addressed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚧</div>
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">System in Development</h3>
              <p className="text-yellow-700 mb-4">
                The Tools & Creation system is actively being built, with visual tool builder and marketplace components in progress.
              </p>
              <div className="text-sm text-yellow-600">
                <strong>Current Status:</strong> Visual tool builder and marketplace surface development
                <br />
                <strong>Next Steps:</strong> Collaboration features, publishing workflows, and community rating systems
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToolsCreationSystemOverview: Story = {
  name: '🛠️ Tools & Creation System Overview',
  render: () => <ToolsCreationOverview />
};