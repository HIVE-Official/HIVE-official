import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '06-Feed & Rituals/00-Feed Rituals Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of the Feed & Rituals system - social feed, community rituals, and content discovery patterns'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const FeedRitualsOverview: React.FC = () => {
  const systemComponents = [
    {
      title: 'Feed Components',
      description: 'Social feed display and content consumption',
      icon: '📰',
      components: [
        'Feed Algorithm',
        'Content Cards',
        'Post Interactions',
        'Feed Filtering'
      ],
      status: 'in-progress' as const
    },
    {
      title: 'Ritual Framework',
      description: 'Community coordination and shared experiences',
      icon: '🔄',
      components: [
        'Rituals Hub',
        'Ritual Creation',
        'Ritual Participation',
        'Ritual Analytics'
      ],
      status: 'in-progress' as const
    },
    {
      title: 'Content Systems',
      description: 'Content creation, validation, and distribution',
      icon: '📝',
      components: [
        'Content Validation',
        'Content Types',
        'Media Handling',
        'Content Moderation'
      ],
      status: 'planned' as const
    }
  ];

  const feedPrinciples = [
    {
      title: 'Utility-First Content',
      description: 'Prioritize useful, actionable content over entertainment',
      icon: '🎯',
      examples: [
        'Study session coordination',
        'Academic resource sharing',
        'Event announcements',
        'Tool collaboration requests'
      ]
    },
    {
      title: 'Community Rituals',
      description: 'Recurring community activities that build connection',
      icon: '🔄',
      examples: [
        'Weekly study check-ins',
        'Morning motivation posts',
        'Project showcase Fridays',
        'Peer feedback sessions'
      ]
    },
    {
      title: 'Contextual Relevance',
      description: 'Content filtered by academic context and personal interests',
      icon: '📍',
      examples: [
        'Course-specific discussions',
        'Major-related opportunities',
        'Campus event notifications',
        'Study group invitations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Feed & Rituals System
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Social utility feed that prioritizes coordination, collaboration, and community building over mindless consumption
          </div>
        </div>

        {/* System Philosophy */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Social Utility Philosophy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ❌
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Not This</h3>
              <p className="text-sm text-hive-text-secondary">Endless scrolling, passive consumption, algorithmic manipulation for engagement</p>
            </div>
            
            <div className="flex items-center justify-center">
              <svg className="w-12 h-12 text-hive-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-hive-status-success to-green-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ✅
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">This Instead</h3>
              <p className="text-sm text-hive-text-secondary">Purposeful coordination, active collaboration, content that moves your life forward</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-xl">
            <blockquote className="text-center italic text-hive-text-primary">
              "Your feed doesn't show you what your friends had for lunch — it surfaces the coordination, collaboration, and community building that's actually happening around you."
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

        {/* Feed Principles */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-8 text-center">Feed Design Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedPrinciples.map((principle) => (
              <div key={principle.title} className="bg-white/50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{principle.icon}</div>
                  <h3 className="font-bold text-hive-text-primary">{principle.title}</h3>
                  <p className="text-sm text-hive-text-secondary mt-2">{principle.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-hive-text-primary">Examples:</div>
                  {principle.examples.map((example) => (
                    <div key={example} className="flex items-center gap-2 text-sm text-hive-text-secondary">
                      <div className="w-1.5 h-1.5 bg-hive-brand-primary rounded-full flex-shrink-0"></div>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Types */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Content Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-2xl mb-2">📅</div>
              <h4 className="font-bold text-blue-800 mb-2">Coordination</h4>
              <p className="text-sm text-blue-600">Study sessions, group meetings, project planning</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-bold text-green-800 mb-2">Collaboration</h4>
              <p className="text-sm text-green-600">Shared resources, tool partnerships, skill exchanges</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-bold text-purple-800 mb-2">Achievement</h4>
              <p className="text-sm text-purple-600">Project completions, learning milestones, celebrations</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-2xl mb-2">❓</div>
              <h4 className="font-bold text-orange-800 mb-2">Support</h4>
              <p className="text-sm text-orange-600">Questions, help requests, knowledge sharing</p>
            </div>
          </div>
        </div>

        {/* Ritual Framework */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Community Ritual Framework</h2>
          
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-hive-text-secondary max-w-2xl mx-auto">
                Rituals are recurring community activities that build stronger connections and shared purpose. 
                They transform individual actions into collective experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                  <span>⏰</span>
                  Temporal Rituals
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-hive-background-primary rounded-lg">
                    <div className="font-medium text-hive-text-primary">Monday Motivation</div>
                    <div className="text-sm text-hive-text-secondary">Weekly goal setting and encouragement</div>
                  </div>
                  <div className="p-3 bg-hive-background-primary rounded-lg">
                    <div className="font-medium text-hive-text-primary">Friday Reflections</div>
                    <div className="text-sm text-hive-text-secondary">Share wins and lessons learned</div>
                  </div>
                  <div className="p-3 bg-hive-background-primary rounded-lg">
                    <div className="font-medium text-hive-text-primary">Study Session Prep</div>
                    <div className="text-sm text-hive-text-secondary">Pre-exam coordination and support</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Purpose-Driven Rituals
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-hive-background-primary rounded-lg">
                    <div className="font-medium text-hive-text-primary">Project Showcases</div>
                    <div className="text-sm text-hive-text-secondary">Share and celebrate completed work</div>
                  </div>
                  <div className="p-3 bg-hive-background-primary rounded-lg">
                    <div className="font-medium text-hive-text-primary">Peer Code Reviews</div>
                    <div className="text-sm text-hive-text-secondary">Collaborative learning and improvement</div>
                  </div>
                  <div className="p-3 bg-hive-background-primary rounded-lg">
                    <div className="font-medium text-hive-text-primary">Knowledge Exchanges</div>
                    <div className="text-sm text-hive-text-secondary">Teaching and learning from peers</div>
                  </div>
                </div>
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
                The Feed & Rituals system is currently being designed and built. This overview represents the planned approach and philosophy.
              </p>
              <div className="text-sm text-yellow-600">
                <strong>Current Status:</strong> Architectural planning and core component development
                <br />
                <strong>Next Steps:</strong> Feed algorithm implementation, ritual framework, and content validation systems
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeedRitualsSystemOverview: Story = {
  name: '📰 Feed & Rituals System Overview', 
  render: () => <FeedRitualsOverview />
};