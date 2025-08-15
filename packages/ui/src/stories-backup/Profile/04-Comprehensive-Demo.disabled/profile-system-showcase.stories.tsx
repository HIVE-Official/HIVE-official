import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile/04-Comprehensive Demo/HIVE Profile System Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Profile System Showcase - Complete demonstration of the HIVE Profile System featuring all widgets, interactions, and the philosophy of social utility. This represents the culmination of the HIVE vBETA Profile experience.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileSystemShowcase: Story = {
  name: '🎯 Complete HIVE Profile System',
  render: () => {
    const [currentDemo, setCurrentDemo] = useState<'overview' | 'widgets' | 'interactions' | 'philosophy'>('overview');

    return (
      <div className="min-h-screen bg-gradient-to-br from-hive-background-primary via-white to-hive-brand-secondary/5">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-16">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="text-6xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
                  HIVE Profile System
                </div>
                <div className="text-2xl text-hive-text-secondary max-w-4xl mx-auto">
                  Where social connections become engines of mutual success
                </div>
                <div className="text-lg text-hive-text-tertiary max-w-3xl mx-auto">
                  The first social platform where connections form around solving real problems together. 
                  Your profile isn't a highlight reel — it's your campus command center.
                </div>
              </div>

              {/* Demo Navigation */}
              <div className="flex items-center justify-center gap-4">
                {[
                  { key: 'overview', label: 'System Overview', icon: '📊' },
                  { key: 'widgets', label: 'Widget Ecosystem', icon: '🧩' },
                  { key: 'interactions', label: 'User Interactions', icon: '🤝' },
                  { key: 'philosophy', label: 'Design Philosophy', icon: '💡' }
                ].map(demo => (
                  <button
                    key={demo.key}
                    onClick={() => setCurrentDemo(demo.key as any)}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                      ${currentDemo === demo.key 
                        ? 'bg-hive-brand-secondary text-white shadow-lg transform scale-105' 
                        : 'bg-white/80 text-hive-text-secondary hover:bg-white hover:text-hive-text-primary hover:shadow-md'
                      }
                    `}
                  >
                    <span className="text-lg">{demo.icon}</span>
                    <span className="font-medium">{demo.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* System Overview */}
          {currentDemo === 'overview' && (
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold text-hive-text-primary">System Architecture</h2>
                <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
                  The HIVE Profile System is built on atomic design principles with utility-first social interactions at its core.
                </p>
              </div>

              {/* Architecture Diagram */}
              <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Foundation Layer */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        🏗️
                      </div>
                      <h3 className="text-xl font-bold text-hive-text-primary">Foundation</h3>
                      <p className="text-hive-text-secondary">Core systems and interactions</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="font-semibold text-hive-text-primary mb-2">🎯 Expand & Focus System</div>
                        <div className="text-sm text-hive-text-secondary">Modal overlays with smooth transitions for detailed widget interactions</div>
                      </div>
                      
                      <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="font-semibold text-hive-text-primary mb-2">🖱️ Drag & Drop System</div>
                        <div className="text-sm text-hive-text-secondary">Real mouse event handling with grid snapping and collision detection</div>
                      </div>
                      
                      <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="font-semibold text-hive-text-primary mb-2">📦 Widget Container</div>
                        <div className="text-sm text-hive-text-secondary">Universal container with resize, edit mode, and state management</div>
                      </div>
                    </div>
                  </div>

                  {/* Widget Layer */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        🧩
                      </div>
                      <h3 className="text-xl font-bold text-hive-text-primary">Widget Ecosystem</h3>
                      <p className="text-hive-text-secondary">Coordinated utility widgets</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="font-semibold text-blue-800 mb-2">👤 Avatar Widget (1x1)</div>
                        <div className="text-sm text-blue-600">Social identity anchor with status and achievements</div>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="font-semibold text-green-800 mb-2">📋 Priority Coordination (1x1/2x1)</div>
                        <div className="text-sm text-green-600">AI-powered task management with space coordination</div>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="font-semibold text-purple-800 mb-2">🏢 Community Coordination (1x2/2x1)</div>
                        <div className="text-sm text-purple-600">Space management with health analytics</div>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <div className="font-semibold text-orange-800 mb-2">📅 Social Calendar (2x1)</div>
                        <div className="text-sm text-orange-600">Time coordination with conflict detection</div>
                      </div>

                      <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="font-semibold text-red-800 mb-2">🔒 Privacy Control (1x1)</div>
                        <div className="text-sm text-red-600">Ghost Mode and granular privacy management</div>
                      </div>

                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="font-semibold text-amber-800 mb-2">🛠️ Personal Tools (2x2)</div>
                        <div className="text-sm text-amber-600">HiveLAB v1 Preview - Custom app marketplace</div>
                      </div>
                    </div>
                  </div>

                  {/* Experience Layer */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                        ✨
                      </div>
                      <h3 className="text-xl font-bold text-hive-text-primary">User Experience</h3>
                      <p className="text-hive-text-secondary">Seamless social utility</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="font-semibold text-hive-text-primary mb-2">🎨 Customizable Layouts</div>
                        <div className="text-sm text-hive-text-secondary">Drag, drop, and resize widgets to match your workflow</div>
                      </div>
                      
                      <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="font-semibold text-hive-text-primary mb-2">🔍 Deep Dive Focus</div>
                        <div className="text-sm text-hive-text-secondary">Click any widget for full-screen detailed experience</div>
                      </div>
                      
                      <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="font-semibold text-hive-text-primary mb-2">📱 Responsive Design</div>
                        <div className="text-sm text-hive-text-secondary">Works beautifully on desktop, tablet, and mobile</div>
                      </div>
                      
                      <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="font-semibold text-hive-text-primary mb-2">🤖 AI Intelligence</div>
                        <div className="text-sm text-hive-text-secondary">Smart recommendations and coordination optimization</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
                <h3 className="text-2xl font-bold text-hive-text-primary text-center mb-8">System Capabilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-hive-brand-secondary">6</div>
                    <div className="text-hive-text-secondary">Core Widgets</div>
                    <div className="text-xs text-hive-text-tertiary mt-1">vBETA Complete</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-hive-brand-secondary">15+</div>
                    <div className="text-hive-text-secondary">Size Variants</div>
                    <div className="text-xs text-hive-text-tertiary mt-1">Adaptive Layouts</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-hive-brand-secondary">∞</div>
                    <div className="text-hive-text-secondary">Layout Possibilities</div>
                    <div className="text-xs text-hive-text-tertiary mt-1">User Customizable</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-hive-brand-secondary">100%</div>
                    <div className="text-hive-text-secondary">Utility-First</div>
                    <div className="text-xs text-hive-text-tertiary mt-1">Social + Productive</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Widget Ecosystem */}
          {currentDemo === 'widgets' && (
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold text-hive-text-primary">Widget Ecosystem</h2>
                <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
                  Each widget serves a specific purpose in campus life coordination, working together to create a seamless social utility experience.
                </p>
              </div>

              <div className="grid gap-8">
                {/* Avatar Widget */}
                <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl">👤</div>
                        <div>
                          <h3 className="text-2xl font-bold text-hive-text-primary">Avatar Widget</h3>
                          <p className="text-hive-text-secondary">Social identity anchor (1x1)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Key Features</div>
                          <ul className="space-y-2 text-hive-text-secondary">
                            <li>• Real-time status indicators (online, studying, ghost mode)</li>
                            <li>• Connection and space statistics</li>
                            <li>• Achievement badges and campus recognition</li>
                            <li>• Privacy-first design with granular controls</li>
                          </ul>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Focus Mode Experience</div>
                          <p className="text-hive-text-secondary">Expands into comprehensive profile dashboard with social graph, achievement history, and connection management.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-hive-background-primary rounded-xl p-6 border border-hive-border-default">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">SC</div>
                          <div>
                            <div className="font-bold text-hive-text-primary">Sarah Chen</div>
                            <div className="text-sm text-hive-text-secondary">@sarahc</div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-2 h-2 bg-hive-status-success rounded-full"></div>
                              <span className="text-xs text-hive-text-secondary">Online</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="font-bold text-hive-text-primary">247</div>
                            <div className="text-xs text-hive-text-secondary">Connections</div>
                          </div>
                          <div>
                            <div className="font-bold text-hive-text-primary">12</div>
                            <div className="text-xs text-hive-text-secondary">Spaces</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-amber-500 rounded text-white text-xs flex items-center justify-center">🏆</div>
                          <span className="text-xs text-hive-text-secondary">Top Coordinator This Week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority Widget */}
                <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-hive-background-primary rounded-xl p-6 border border-hive-border-default">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-hive-text-primary">Today's Priorities</div>
                          <div className="text-xs text-hive-status-warning">⚠️ 1 conflict</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-hive-status-error rounded-full animate-pulse"></div>
                            <span className="text-sm text-hive-text-primary">CS Final Exam</span>
                            <span className="text-xs text-hive-text-tertiary ml-auto">Tomorrow 2PM</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-hive-status-warning rounded-full"></div>
                            <span className="text-sm text-hive-text-primary">Study Group Session</span>
                            <span className="text-xs text-hive-text-tertiary ml-auto">Today 4PM</span>
                          </div>
                        </div>

                        <div className="p-2 bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-lg">
                          <div className="text-xs text-hive-brand-secondary">
                            💡 AI suggests rescheduling study session to avoid conflict
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl">📋</div>
                        <div>
                          <h3 className="text-2xl font-bold text-hive-text-primary">Priority Coordination</h3>
                          <p className="text-hive-text-secondary">AI task management (1x1/2x1)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Intelligence Features</div>
                          <ul className="space-y-2 text-hive-text-secondary">
                            <li>• AI urgency analysis and priority scoring</li>
                            <li>• Schedule conflict detection and resolution</li>
                            <li>• Cross-space task coordination</li>
                            <li>• Workload balancing and burnout prevention</li>
                          </ul>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Focus Mode Experience</div>
                          <p className="text-hive-text-secondary">Complete task dashboard with AI insights, collaboration tracking, and advanced filtering and coordination tools.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tools Widget Preview */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl">🛠️</div>
                        <div>
                          <h3 className="text-2xl font-bold text-hive-text-primary">Personal Tools Widget</h3>
                          <p className="text-hive-text-secondary">HiveLAB v1 Preview (2x2)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">v1 Preview Features</div>
                          <ul className="space-y-2 text-hive-text-secondary">
                            <li>• Custom app marketplace for campus life</li>
                            <li>• Community-built productivity tools</li>
                            <li>• Visual tool builder (coming in v1)</li>
                            <li>• Integration with HIVE ecosystem</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-white/60 rounded-xl border border-amber-200">
                          <div className="text-sm font-medium text-amber-800 mb-2">🚀 Early Access Waitlist</div>
                          <div className="text-xs text-amber-600">Join the waitlist to be among the first to build custom tools for your campus community</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 rounded-xl p-6 border border-amber-200">
                      <div className="space-y-4 text-center">
                        <div className="text-3xl">🛠️</div>
                        <div>
                          <div className="text-lg font-bold text-hive-text-primary">Personal Tools</div>
                          <div className="text-sm text-hive-text-secondary">HiveLAB v1 Preview</div>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl">
                          <div className="text-sm font-medium text-hive-text-primary mb-2">🚀 Early Access Waitlist</div>
                          <div className="text-xs text-hive-text-secondary mb-3">Position #47 • Est. Early February 2024</div>
                          <button className="px-4 py-2 bg-hive-brand-secondary text-white text-sm rounded-lg">
                            VIEW STATUS
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="font-bold text-hive-text-primary">156</div>
                            <div className="text-hive-text-secondary">Total Tools</div>
                          </div>
                          <div>
                            <div className="font-bold text-hive-text-primary">8</div>
                            <div className="text-hive-text-secondary">Installed</div>
                          </div>
                          <div>
                            <div className="font-bold text-hive-brand-secondary">2</div>
                            <div className="text-hive-text-secondary">Built</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Interactions */}
          {currentDemo === 'interactions' && (
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold text-hive-text-primary">User Interactions</h2>
                <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
                  HIVE Profile System features intuitive interactions that make coordination effortless and customization natural.
                </p>
              </div>

              <div className="grid gap-12">
                {/* Expand & Focus */}
                <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">🎯</div>
                        <div>
                          <h3 className="text-2xl font-bold text-hive-text-primary">Expand & Focus</h3>
                          <p className="text-hive-text-secondary">One-click deep dive into any widget</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Seamless Transitions</div>
                          <p className="text-hive-text-secondary">Click any widget to expand into a full-screen detailed experience with smooth animations and contextual information.</p>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Rich Detail Views</div>
                          <p className="text-hive-text-secondary">Each widget's focus mode provides comprehensive functionality while maintaining the core HIVE design language.</p>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Quick Actions</div>
                          <p className="text-hive-text-secondary">Focus modes include contextual actions, configuration options, and integration with other HIVE systems.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="bg-hive-background-primary rounded-xl p-6 border-2 border-hive-brand-secondary/50 shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer">
                        <div className="text-center space-y-3">
                          <div className="text-2xl">📋</div>
                          <div className="text-sm font-medium text-hive-text-primary">Priority Widget</div>
                          <div className="text-xs text-hive-text-secondary">Click to expand →</div>
                        </div>
                      </div>
                      
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white animate-pulse">
                        ✨
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drag & Drop */}
                <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative bg-hive-background-secondary/30 rounded-xl p-6 border-2 border-dashed border-hive-brand-secondary/30">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 border-2 border-hive-brand-secondary shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-200 cursor-move">
                          <div className="text-center">
                            <div className="text-xl mb-2">👤</div>
                            <div className="text-xs font-medium">Avatar</div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-hive-border-default transform -rotate-1 hover:rotate-0 transition-transform duration-200 cursor-move">
                          <div className="text-center">
                            <div className="text-xl mb-2">📋</div>
                            <div className="text-xs font-medium">Priority</div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-hive-border-default col-span-2 transform rotate-1 hover:rotate-0 transition-transform duration-200 cursor-move">
                          <div className="text-center">
                            <div className="text-xl mb-2">📅</div>
                            <div className="text-xs font-medium">Calendar</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-2 right-2 text-xs text-hive-brand-secondary font-medium">
                        ✏️ Edit Mode
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl">🖱️</div>
                        <div>
                          <h3 className="text-2xl font-bold text-hive-text-primary">Drag & Drop Layout</h3>
                          <p className="text-hive-text-secondary">Customize your profile layout intuitively</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Smart Grid System</div>
                          <p className="text-hive-text-secondary">Widgets automatically snap to a responsive 4-column grid with intelligent collision detection.</p>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Real-time Feedback</div>
                          <p className="text-hive-text-secondary">Visual feedback during dragging shows valid drop zones and prevents overlapping widgets.</p>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Resize Capabilities</div>
                          <p className="text-hive-text-secondary">Corner and edge handles allow resizing widgets to show more or less detail based on your needs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Mode */}
                <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl">⚙️</div>
                        <div>
                          <h3 className="text-2xl font-bold text-hive-text-primary">Edit Mode</h3>
                          <p className="text-hive-text-secondary">Seamless switching between view and edit</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">One-Click Activation</div>
                          <p className="text-hive-text-secondary">Toggle between viewing your profile and customizing the layout with a single button click.</p>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Visual Feedback</div>
                          <p className="text-hive-text-secondary">Edit mode shows drag handles, resize grips, and grid guidelines to make customization intuitive.</p>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-hive-text-primary mb-2">Persistent Settings</div>
                          <p className="text-hive-text-secondary">Layout changes are automatically saved and synchronized across devices and sessions.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <span className="text-hive-text-primary font-medium">View Mode</span>
                        <div className="w-12 h-6 bg-hive-background-secondary rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full shadow transform transition-transform m-0.5"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-hive-brand-secondary/10 rounded-xl border border-hive-brand-secondary/20">
                        <span className="text-hive-text-primary font-medium">Edit Mode</span>
                        <div className="w-12 h-6 bg-hive-brand-secondary rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 transition-transform m-0.5"></div>
                        </div>
                      </div>
                      
                      <div className="text-center p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                        <div className="text-4xl mb-4">✨</div>
                        <div className="text-lg font-bold text-hive-text-primary mb-2">Seamless Transition</div>
                        <div className="text-sm text-hive-text-secondary">Switch modes instantly with smooth animations and preserved context</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Design Philosophy */}
          {currentDemo === 'philosophy' && (
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold text-hive-text-primary">Design Philosophy</h2>
                <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
                  HIVE Profile System embodies our core belief: social connections should enhance productivity, not distract from it.
                </p>
              </div>

              {/* Core Principles */}
              <div className="grid gap-8">
                <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
                  <div className="text-center space-y-6">
                    <div className="text-6xl">🤝</div>
                    <h3 className="text-3xl font-bold text-hive-text-primary">Social Utility First</h3>
                    <p className="text-lg text-hive-text-secondary max-w-3xl mx-auto">
                      Every social interaction in HIVE serves a productive purpose. We don't just connect people — we help them accomplish more together than they could alone.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">🎯</div>
                        <h4 className="text-xl font-bold text-hive-text-primary">Purpose-Driven Design</h4>
                      </div>
                      <p className="text-hive-text-secondary">
                        Every widget, interaction, and feature exists to solve real campus coordination problems. No feature ships without a clear utility purpose.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-hive-text-primary">Examples:</div>
                        <ul className="text-sm text-hive-text-secondary space-y-1">
                          <li>• Priority widget prevents academic overcommitment</li>
                          <li>• Calendar widget eliminates scheduling conflicts</li>
                          <li>• Community widget optimizes space coordination</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">🔒</div>
                        <h4 className="text-xl font-bold text-hive-text-primary">Privacy-First Social</h4>
                      </div>
                      <p className="text-hive-text-secondary">
                        Social utility doesn't require sacrificing privacy. Our Ghost Mode and granular controls ensure users coordinate effectively while maintaining personal boundaries.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-hive-text-primary">Privacy Features:</div>
                        <ul className="text-sm text-hive-text-secondary space-y-1">
                          <li>• Ghost Mode for complete invisibility</li>
                          <li>• Granular sharing controls per data type</li>
                          <li>• Academic exemptions for emergency situations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">🧠</div>
                        <h4 className="text-xl font-bold text-hive-text-primary">AI-Enhanced Coordination</h4>
                      </div>
                      <p className="text-hive-text-secondary">
                        Artificial intelligence amplifies human coordination capabilities without replacing human decision-making. AI suggests, humans decide.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-hive-text-primary">AI Applications:</div>
                        <ul className="text-sm text-hive-text-secondary space-y-1">
                          <li>• Smart priority analysis and urgency detection</li>
                          <li>• Schedule optimization and conflict prevention</li>
                          <li>• Community health insights and recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl">🏗️</div>
                        <h4 className="text-xl font-bold text-hive-text-primary">User-Centered Customization</h4>
                      </div>
                      <p className="text-hive-text-secondary">
                        Every student's coordination needs are unique. The profile system adapts to individual workflows while maintaining platform consistency.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-hive-text-primary">Customization Options:</div>
                        <ul className="text-sm text-hive-text-secondary space-y-1">
                          <li>• Drag & drop layout personalization</li>
                          <li>• Widget size adaptation for detail preferences</li>
                          <li>• Future custom tool building (HiveLAB v1)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vision Statement */}
                <div className="bg-white rounded-2xl p-12 border border-hive-border-default shadow-lg text-center">
                  <div className="space-y-8">
                    <div className="text-4xl">✨</div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-hive-text-primary">The Future of Campus Social</h3>
                      <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
                        "When you graduate, you won't remember the content you consumed. You'll remember the communities you built, the problems you solved together, and the tools you created that made everyone's life better."
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
                      <div>
                        <div className="text-2xl font-bold text-hive-brand-secondary">Community</div>
                        <div className="text-sm text-hive-text-secondary">Building together</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-hive-brand-secondary">Problems</div>
                        <div className="text-sm text-hive-text-secondary">Solving together</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-hive-brand-secondary">Tools</div>
                        <div className="text-sm text-hive-text-secondary">Creating together</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-hive-text-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">HIVE Profile System</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Complete vBETA implementation featuring 6 core widgets, drag & drop customization, expand & focus interactions, and the future of social utility.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-white/60">Core Widgets</div>
              </div>
              <div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-white/60">Size Variants</div>
              </div>
              <div>
                <div className="text-2xl font-bold">∞</div>
                <div className="text-white/60">Layouts</div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-white/60">Utility-First</div>
              </div>
            </div>

            <div className="text-white/60">
              🎯 <strong>HIVE Profile System vBETA</strong> - Where connections form around solving real problems together
            </div>
          </div>
        </div>
      </div>
    );
  }
};