import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: '05-Profile System/00-Profile System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of the HIVE Profile System - personal identity, privacy controls, and dashboard coordination'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ProfileSystemOverviewComponent: React.FC = () => {
  const profileTypes = [
    {
      title: 'Student Profiles',
      description: 'Academic-focused profiles with course integration and study coordination',
      icon: '🎓',
      examples: [
        'CS Major with coding projects',
        'Pre-med with study groups', 
        'Business student with internships',
        'Art student with portfolio'
      ],
      features: ['Academic info display', 'Course coordination', 'Study group integration', 'Achievement tracking'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Faculty Profiles',
      description: 'Professional profiles for instructors and academic staff',
      icon: '👨‍🏫',
      examples: [
        'Professor with office hours',
        'TA with tutoring availability',
        'Advisor with meeting slots',
        'Researcher with lab info'
      ],
      features: ['Office hours display', 'Course management', 'Student interaction', 'Professional credentials'],
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Builder Profiles',
      description: 'Creator-focused profiles showcasing tools and projects built',
      icon: '🛠️',
      examples: [
        'Tool creator with portfolio',
        'Community organizer profile',
        'Event coordinator showcase',
        'Mentor with specialties'
      ],
      features: ['Tool portfolio', 'Creation analytics', 'Community leadership', 'Skill showcase'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Private Profiles',
      description: 'Privacy-first profiles with limited visibility and ghost mode',
      icon: '👻',
      examples: [
        'Ghost mode enabled',
        'Friends-only visibility',
        'Anonymous participation',
        'Selective sharing'
      ],
      features: ['Privacy controls', 'Visibility settings', 'Anonymous modes', 'Selective disclosure'],
      color: 'bg-gray-50 border-gray-200'
    }
  ];

  const systemComponents = [
    {
      title: 'Profile Core',
      description: 'Essential profile identity and display components',
      icon: '👤',
      components: [
        'Profile Avatar System',
        'Identity Display',
        'Status Indicators',
        'Badge System'
      ],
      status: 'completed' as const
    },
    {
      title: 'Profile Dashboard',
      description: 'Personal command center with widgets and coordination tools',
      icon: '📊',
      components: [
        'Bento Grid Layout',
        'Widget System',
        'Personal Tools Card',
        'Coordination Widgets'
      ],
      status: 'completed' as const
    },
    {
      title: 'Privacy & Security',
      description: 'Comprehensive privacy controls and security settings',
      icon: '🔒',
      components: [
        'Privacy Modal',
        'Visibility Controls',
        'Ghost Mode Toggle',
        'Connection Management'
      ],
      status: 'completed' as const
    },
    {
      title: 'Profile Settings',
      description: 'Profile customization and preference management',
      icon: '⚙️',
      components: [
        'Profile Editor',
        'Privacy Settings',
        'Notification Preferences',
        'Account Security'
      ],
      status: 'completed' as const
    }
  ];

  const profileFeatures = [
    {
      phase: 'Identity',
      description: 'Core profile information and academic context',
      icon: '🆔',
      activities: ['Set profile photo', 'Add academic info', 'Choose username', 'Set bio']
    },
    {
      phase: 'Customization',
      description: 'Personalize dashboard and widget arrangement',
      icon: '🎨',
      activities: ['Arrange widgets', 'Choose themes', 'Set preferences', 'Configure tools']
    },
    {
      phase: 'Connection',
      description: 'Build network and manage relationships',
      icon: '🤝',
      activities: ['Connect with peers', 'Join communities', 'Set visibility', 'Manage privacy']
    },
    {
      phase: 'Coordination',
      description: 'Use profile as campus command center',  
      icon: '📅',
      activities: ['Schedule coordination', 'Tool management', 'Space participation', 'Event planning']
    },
    {
      phase: 'Growth',
      description: 'Track progress and build reputation',
      icon: '📈',
      activities: ['Achievement tracking', 'Skill development', 'Community contributions', 'Leadership roles']
    }
  ];

  const designPrinciples = [
    {
      title: 'Command Center Philosophy',
      description: 'Profile as the central hub for all campus coordination and activity',
      icon: '🎯',
      details: [
        'Personal dashboard integration',
        'Unified coordination interface',
        'Context-aware widgets',
        'Actionable information display'
      ]
    },
    {
      title: 'Privacy by Design',
      description: 'Granular privacy controls with user agency over data sharing',
      icon: '🛡️',
      details: [
        'Selective information sharing',
        'Ghost mode capabilities',
        'Audience-specific visibility',
        'Transparent data usage'
      ]
    },
    {
      title: 'Academic Context First',
      description: 'Profile structure optimized for educational and campus life',
      icon: '🎓',
      details: [
        'Course integration built-in',
        'Academic achievement focus',
        'Study group coordination',
        'Educational goal tracking'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Profile System
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Personal command center where identity meets utility - your campus dashboard that connects your calendar, tools, communities, and goals
          </div>
        </div>

        {/* Profile Philosophy */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Profile Philosophy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🎯
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Command Center</h3>
              <p className="text-sm text-hive-text-secondary">Your profile is your campus operations hub</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🔒
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Privacy First</h3>
              <p className="text-sm text-hive-text-secondary">You control what you share and with whom</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🎓
              </div>
              <h3 className="font-bold text-hive-text-primary mb-2">Academic Focus</h3>
              <p className="text-sm text-hive-text-secondary">Built for educational success and campus life</p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-xl">
            <blockquote className="text-center italic text-hive-text-primary">
              "Your Profile isn't a highlight reel — it's your campus command center, connecting your calendar, your tools, your communities, and your goals in one personalized dashboard that actually runs your life."
            </blockquote>
          </div>
        </div>

        {/* Profile Types */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-hive-text-primary text-center">Profile Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileTypes.map((type) => (
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

        {/* Profile Lifecycle */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Profile Development Lifecycle</h2>
          
          <div className="space-y-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {profileFeatures.map((phase, index, array) => (
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
              {profileFeatures.map((phase) => (
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

        {/* Profile Success Metrics */}
        <div className="bg-white rounded-2xl border border-hive-border-default p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Profile Success Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-bold text-blue-800">Goal Achievement</div>
              <div className="text-sm text-blue-600">Academic and personal goals met</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-bold text-green-800">Connection Quality</div>
              <div className="text-sm text-green-600">Meaningful relationships formed</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-bold text-purple-800">Dashboard Usage</div>
              <div className="text-sm text-purple-600">Active coordination and management</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-bold text-orange-800">Privacy Control</div>
              <div className="text-sm text-orange-600">User agency over data sharing</div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✅</div>
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-2">System Complete</h3>
              <p className="text-green-700 mb-4">
                The Profile System has been fully implemented with all core components, widgets, privacy controls, and settings interfaces.
              </p>
              <div className="text-sm text-green-600">
                <strong>Completed:</strong> Profile dashboard, privacy controls, widget system, and settings management
                <br />
                <strong>Available:</strong> Complete profile customization, privacy management, and personal command center functionality
                <br />
                <strong>Status:</strong> Ready for production use with comprehensive feature set
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSystemOverview: Story = {
  name: '👤 Profile System Overview',
  render: () => <ProfileSystemOverviewComponent />
};