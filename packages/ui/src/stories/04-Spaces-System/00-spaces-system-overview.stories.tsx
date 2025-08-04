import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '04-Spaces System/00-Spaces System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of the HIVE Spaces System - community spaces, coordination tools, and collaborative environments'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SpacesSystemOverviewComponent: React.FC = () => {
  const spaceTypes = [
    {
      title: 'Academic Spaces',
      description: 'Course-based communities for studying and collaboration',
      icon: '📚',
      examples: [
        'CS 220 Study Group',
        'Calculus Help Center',
        'Biology Lab Partners',
        'Writing Workshop'
      ],
      features: ['Study coordination', 'Resource sharing', 'Peer tutoring', 'Assignment collaboration'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Interest Spaces',
      description: 'Communities formed around shared hobbies and interests',
      icon: '🎯',
      examples: [
        'Campus Photography',
        'Debate Society',
        'Entrepreneurship Club',
        'Game Development'
      ],
      features: ['Project collaboration', 'Event planning', 'Skill sharing', 'Community building'],
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Residential Spaces',
      description: 'Dorm floors, buildings, and housing communities',
      icon: '🏠',
      examples: [
        'Ellicott 3rd Floor',
        'Governors Hall',
        'Off-Campus Commons',
        'Greek Life Houses'
      ],
      features: ['Daily coordination', 'Social events', 'Resource sharing', 'Community support'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Professional Spaces',
      description: 'Career development and industry-focused communities',
      icon: '💼',
      examples: [
        'CS Career Prep',
        'Internship Network',
        'Alumni Mentorship',
        'Startup Founders'
      ],
      features: ['Career guidance', 'Networking events', 'Industry insights', 'Professional development'],
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const systemComponents = [
    {
      title: 'Space Cards',
      description: 'Visual representation and interaction patterns for spaces',
      icon: '🗃️',
      components: [
        'Enhanced Space Card',
        'Unified Space Card', 
        'Space Preview Card',
        'Space Stats Display'
      ],
      status: 'in-progress' as const
    },
    {
      title: 'Space Directory',
      description: 'Space browsing, filtering, and discovery interface',
      icon: '📋',
      components: [
        'Space Directory',
        'Space Categories',
        'Space Filtering',
        'Space Search'
      ],
      status: 'in-progress' as const
    },
    {
      title: 'Space Management',
      description: 'Tools for space leaders to manage their communities',
      icon: '⚙️',
      components: [
        'Space Settings',
        'Member Management',
        'Content Moderation',
        'Space Analytics'
      ],
      status: 'planned' as const
    },
    {
      title: 'Space Discovery',
      description: 'Recommendation and trending space identification',
      icon: '🔍',
      components: [
        'Trending Spaces',
        'Recommended Spaces',
        'Discovery Algorithm',
        'Space Matching'
      ],
      status: 'completed' as const
    }
  ];

  const spaceLifecycle = [
    {
      phase: 'Discovery',
      description: 'Finding relevant spaces through search, recommendations, or invites',
      icon: '🔍',
      activities: ['Browse directory', 'Receive recommendations', 'Get invited', 'Search by topic']
    },
    {
      phase: 'Joining',
      description: 'Becoming a member of a space community',
      icon: '🚪',
      activities: ['Request to join', 'Accept invite', 'Complete onboarding', 'Set preferences']
    },
    {
      phase: 'Participation',
      description: 'Active engagement within the space community',
      icon: '🤝',
      activities: ['Create posts', 'Join discussions', 'Attend events', 'Share resources']
    },
    {
      phase: 'Coordination',
      description: 'Organizing activities and collaborating with members',
      icon: '📅',
      activities: ['Schedule meetings', 'Plan events', 'Coordinate projects', 'Share calendars']
    },
    {
      phase: 'Leadership',
      description: 'Taking on leadership roles and helping manage the space',
      icon: '👑',
      activities: ['Moderate discussions', 'Welcome new members', 'Organize events', 'Guide community']
    }
  ];

  const designPrinciples = [
    {
      title: 'Purpose-Driven Communities',
      description: 'Every space exists to solve problems or achieve goals together',
      icon: '🎯',
      details: [
        'Clear community purpose and goals',
        'Actionable coordination tools',
        'Outcome-focused interactions',
        'Measurable community success'
      ]
    },
    {
      title: 'Organic Growth Patterns',
      description: 'Spaces grow naturally based on genuine need and value',
      icon: '🌱',
      details: [
        'Bottom-up space creation',
        'Member-driven growth',
        'Natural community evolution',
        'Quality over quantity focus'
      ]
    },
    {
      title: 'Coordinated Action',
      description: 'Spaces enable members to achieve more together than alone',
      icon: '⚡',
      details: [
        'Shared resource coordination',
        'Collective problem solving',
        'Group project management',
        'Mutual support systems'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Spaces System
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Community coordination system where students organize around shared purposes, solve problems together, and build meaningful connections
          </div>
        </div>

        {/* Spaces Philosophy */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Spaces Philosophy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🏠
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Communities with Purpose</h3>
              <p className="text-sm text-hive-text-secondary">Every space exists to solve problems or achieve goals together</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🤝
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Coordinated Action</h3>
              <p className="text-sm text-hive-text-secondary">Members work together to accomplish more than they could alone</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🌱
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Organic Growth</h3>
              <p className="text-sm text-hive-text-secondary">Communities form naturally around genuine needs and shared interests</p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-xl">
            <blockquote className="text-center italic text-hive-text-primary">
              "Your spaces aren't just discussion forums — they're functional communities where CS majors share interview prep tools, where your floor coordinates everything from study sessions to social events, where clubs actually get things done."
            </blockquote>
          </div>
        </div>

        {/* Space Types */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-hive-text-primary text-center">Types of Spaces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaceTypes.map((type) => (
              <div key={type.title} className={`rounded-2xl border p-6 ${type.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{type.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-hive-text-primary">{type.title}</h3>
                    <p className="text-sm text-hive-text-secondary">{type.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-hive-text-primary mb-2">Examples:</div>
                    <div className="space-y-1">
                      {type.examples.map((example) => (
                        <div key={example} className="flex items-center gap-2 text-sm text-hive-text-secondary">
                          <div className="w-1.5 h-1.5 bg-hive-brand-primary rounded-full flex-shrink-0"></div>
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-hive-text-primary mb-2">Key Features:</div>
                    <div className="space-y-1">
                      {type.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-hive-text-secondary">
                          <div className="w-1.5 h-1.5 bg-hive-brand-secondary rounded-full flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Space Lifecycle */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Space Member Lifecycle</h2>
          
          <div className="space-y-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {spaceLifecycle.map((phase, index, array) => (
                  <div key={phase.phase} className="flex items-center">
                    <div className="text-center min-w-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full flex items-center justify-center text-white text-xl mb-2">
                        {phase.icon}
                      </div>
                      <div className="font-bold text-hive-text-primary text-sm">{phase.phase}</div>
                      <div className="text-xs text-hive-text-secondary max-w-24">{phase.description}</div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {spaceLifecycle.map((phase) => (
                <div key={phase.phase} className="bg-hive-background-primary rounded-xl p-4">
                  <h4 className="font-bold text-hive-text-primary mb-2 text-center">{phase.phase}</h4>
                  <div className="space-y-1">
                    {phase.activities.map((activity) => (
                      <div key={activity} className="text-xs text-hive-text-secondary">
                        • {activity}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Principles */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-8 text-center">Design Principles</h2>
          
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

        {/* Space Success Metrics */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Space Success Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-bold text-blue-800">Goal Achievement</div>
              <div className="text-sm text-blue-600">Spaces complete their stated purposes</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-bold text-green-800">Active Participation</div>
              <div className="text-sm text-green-600">Members regularly engage and contribute</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-bold text-purple-800">Coordination Success</div>
              <div className="text-sm text-purple-600">Events and projects happen successfully</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-2xl mb-2">🌱</div>
              <div className="font-bold text-orange-800">Organic Growth</div>
              <div className="text-sm text-orange-600">Natural member referrals and retention</div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🏗️</div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">System Development</h3>
              <p className="text-blue-700 mb-4">
                The Spaces System has core components in development with space cards, directory, and discovery features actively being built.
              </p>
              <div className="text-sm text-blue-600">
                <strong>Completed:</strong> Space discovery and recommendation algorithms
                <br />
                <strong>In Progress:</strong> Space cards, directory interface, and member interaction patterns
                <br />
                <strong>Next Steps:</strong> Space management tools, analytics, and advanced coordination features
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpacesSystemOverview: Story = {
  name: '🏠 Spaces System Overview',
  render: () => <SpacesSystemOverviewComponent />
};