import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';

const meta = {
  title: '05-Profile System/01-Animation System/Profile Animations',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Profile Animation System - Comprehensive animation framework for profile interactions, transitions, and micro-interactions'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Animation Utilities
const AnimationShowcase: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>('transitions');
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusState, setStatusState] = useState<'online' | 'away' | 'busy' | 'ghost'>('online');

  // Status pulse animation
  const statusColors = {
    online: 'bg-hive-status-success',
    away: 'bg-hive-status-warning', 
    busy: 'bg-hive-status-error',
    ghost: 'bg-hive-text-tertiary'
  };

  const handleLoadingDemo = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('success'), 2000);
    setTimeout(() => setLoadingState('idle'), 3500);
  };

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Profile Animation System
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Smooth, purposeful animations that enhance user experience without being distracting
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {[
            { key: 'transitions', label: 'State Transitions', icon: '🔄' },
            { key: 'interactions', label: 'Micro-interactions', icon: '✨' },
            { key: 'focus', label: 'Focus Animations', icon: '🎯' },
            { key: 'feedback', label: 'Loading & Feedback', icon: '⏳' },
            { key: 'gestures', label: 'Drag & Drop', icon: '🖱️' }
          ].map(demo => (
            <button
              key={demo.key}
              onClick={() => setActiveDemo(demo.key)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 transform
                ${activeDemo === demo.key 
                  ? 'bg-hive-brand-secondary text-white shadow-lg scale-105' 
                  : 'bg-white text-hive-text-secondary hover:bg-hive-background-primary hover:text-hive-text-primary hover:shadow-md hover:scale-102'
                }
              `}
            >
              <span className="text-lg">{demo.icon}</span>
              <span className="font-medium">{demo.label}</span>
            </button>
          ))}
        </div>

        {/* State Transitions Demo */}
        {activeDemo === 'transitions' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-hive-text-primary">State Transitions</h2>
              <p className="text-hive-text-secondary max-w-2xl mx-auto">
                Smooth transitions between different profile states with proper easing and timing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Visibility Toggle */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Visibility Toggle</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/90 transition-colors"
                  >
                    Toggle Visibility
                  </button>
                  
                  <div className={`
                    transition-all duration-500 ease-in-out transform
                    ${isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                    }
                  `}>
                    <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">
                          SC
                        </div>
                        <div>
                          <div className="font-medium text-hive-text-primary">Sarah Chen</div>
                          <div className="text-sm text-hive-text-secondary">Computer Science</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Status Transitions</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['online', 'away', 'busy', 'ghost'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setStatusState(status)}
                        className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                          statusState === status
                            ? 'bg-hive-brand-primary text-white'
                            : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-background-primary'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-hive-background-primary rounded-xl">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-full"></div>
                      <div className={`
                        absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white transition-all duration-300
                        ${statusColors[statusState]}
                        ${statusState === 'online' ? 'animate-pulse' : ''}
                        ${statusState === 'ghost' ? 'opacity-50' : ''}
                      `}></div>
                    </div>
                    <div>
                      <div className="font-medium text-hive-text-primary">Sarah Chen</div>
                      <div className={`text-sm transition-colors duration-300 ${
                        statusState === 'ghost' ? 'text-hive-text-tertiary' : 'text-hive-text-secondary'
                      }`}>
                        {statusState === 'online' && 'Active now'}
                        {statusState === 'away' && 'Away • Back in 15 min'}
                        {statusState === 'busy' && 'Busy • In study session'}
                        {statusState === 'ghost' && 'Invisible'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expansion Animation */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Expansion Animation</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/90 transition-colors"
                  >
                    {isExpanded ? 'Collapse' : 'Expand'} Widget
                  </button>
                  
                  <div className={`
                    bg-hive-background-primary rounded-xl border border-hive-border-default overflow-hidden
                    transition-all duration-500 ease-out
                    ${isExpanded ? 'max-h-96' : 'max-h-20'}
                  `}>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl">📊</div>
                        <div className="font-medium text-hive-text-primary">Statistics</div>
                      </div>
                      
                      <div className={`
                        transition-all duration-300 delay-100
                        ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
                      `}>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-hive-text-primary">247</div>
                            <div className="text-xs text-hive-text-secondary">Connections</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-hive-text-primary">12</div>
                            <div className="text-xs text-hive-text-secondary">Spaces</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-hive-brand-secondary">4.9</div>
                            <div className="text-xs text-hive-text-secondary">Rating</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-hive-status-success">98%</div>
                            <div className="text-xs text-hive-text-secondary">Uptime</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Micro-interactions Demo */}
        {activeDemo === 'interactions' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-hive-text-primary">Micro-interactions</h2>
              <p className="text-hive-text-secondary max-w-2xl mx-auto">
                Subtle animations that provide feedback and enhance usability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hover Effects */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Hover Effects</h3>
                <div className="space-y-4">
                  <div className="group cursor-pointer p-4 bg-hive-background-primary rounded-xl border border-hive-border-default transition-all duration-200 hover:shadow-lg hover:border-hive-brand-secondary/50 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110">
                        📚
                      </div>
                      <div>
                        <div className="font-medium text-hive-text-primary">CS Study Group</div>
                        <div className="text-sm text-hive-text-secondary transition-colors duration-200 group-hover:text-hive-text-primary">
                          12 members active
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer p-4 bg-hive-background-primary rounded-xl border border-hive-border-default transition-all duration-200 hover:shadow-lg hover:border-hive-brand-secondary/50 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110">
                        🏠
                      </div>
                      <div>
                        <div className="font-medium text-hive-text-primary">Floor 3 Community</div>
                        <div className="text-sm text-hive-text-secondary transition-colors duration-200 group-hover:text-hive-text-primary">
                          8 members active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button States */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Button Interactions</h3>
                <div className="space-y-4">
                  <button className="w-full px-4 py-3 bg-hive-brand-primary text-white rounded-lg transition-all duration-200 hover:bg-hive-brand-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
                    Primary Action
                  </button>
                  
                  <button className="w-full px-4 py-3 border border-hive-border-default text-hive-text-primary rounded-lg transition-all duration-200 hover:border-hive-brand-primary hover:text-hive-brand-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                    Secondary Action
                  </button>

                  <button className="w-full px-4 py-3 bg-hive-status-error text-white rounded-lg transition-all duration-200 hover:bg-hive-status-error/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
                    Destructive Action
                  </button>
                </div>
              </div>

              {/* Notification Badges */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Badge Animations</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-hive-brand-primary rounded-full flex items-center justify-center text-white">
                        💬
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-hive-status-error rounded-full flex items-center justify-center text-white text-xs animate-bounce">
                        3
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-hive-text-primary">Messages</div>
                      <div className="text-sm text-hive-text-secondary">New messages available</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white">
                        🔔
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-hive-status-success rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <div className="font-medium text-hive-text-primary">Notifications</div>
                      <div className="text-sm text-hive-text-secondary">Activity indicator</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Focus Animations Demo */}
        {activeDemo === 'focus' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-hive-text-primary">Focus & Expand Animations</h2>
              <p className="text-hive-text-secondary max-w-2xl mx-auto">
                Smooth transitions when expanding widgets into focus mode
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-6">Expand & Focus Sequence</h3>
                
                <div className="space-y-6">
                  <div className="text-sm text-hive-text-secondary">Click a widget below to see the focus animation:</div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'avatar', icon: '👤', title: 'Avatar', color: 'bg-blue-500' },
                      { id: 'priority', icon: '📋', title: 'Priority', color: 'bg-green-500' },
                      { id: 'calendar', icon: '📅', title: 'Calendar', color: 'bg-purple-500' },
                      { id: 'privacy', icon: '🔒', title: 'Privacy', color: 'bg-orange-500' }
                    ].map((widget) => (
                      <div
                        key={widget.id}
                        className="group cursor-pointer p-4 bg-hive-background-primary rounded-xl border border-hive-border-default transition-all duration-300 hover:shadow-lg hover:border-hive-brand-secondary/50 hover:-translate-y-1 hover:scale-105"
                        onClick={() => {
                          // Simulate focus animation
                          const element = document.getElementById(`widget-${widget.id}`);
                          if (element) {
                            element.classList.add('animate-pulse');
                            setTimeout(() => element.classList.remove('animate-pulse'), 1000);
                          }
                        }}
                      >
                        <div id={`widget-${widget.id}`} className="text-center space-y-2">
                          <div className={`w-12 h-12 ${widget.color} rounded-xl flex items-center justify-center text-white text-xl mx-auto transition-transform duration-300 group-hover:scale-110`}>
                            {widget.icon}
                          </div>
                          <div className="font-medium text-hive-text-primary">{widget.title}</div>
                        </div>
                        
                        <div className="absolute bottom-2 left-4 right-4 bg-black/50 text-white text-xs text-center py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Click to focus →
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
                    <h4 className="font-semibold text-hive-text-primary mb-3">Animation Sequence:</h4>
                    <div className="space-y-2 text-sm text-hive-text-secondary">
                      <div>1. Widget scales up slightly (hover state)</div>
                      <div>2. Background overlay fades in (200ms)</div>
                      <div>3. Widget animates to center position (300ms)</div>
                      <div>4. Widget expands to full modal (400ms)</div>
                      <div>5. Content fades in with staggered delay (200ms)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading & Feedback Demo */}
        {activeDemo === 'feedback' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-hive-text-primary">Loading & Feedback States</h2>
              <p className="text-hive-text-secondary max-w-2xl mx-auto">
                Clear visual feedback for user actions and system states
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Loading States */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Loading States</h3>
                <div className="space-y-4">
                  <button
                    onClick={handleLoadingDemo}
                    className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/90 transition-colors"
                  >
                    Trigger Loading Demo
                  </button>

                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    {loadingState === 'idle' && (
                      <div className="text-center text-hive-text-secondary">Ready to load...</div>
                    )}
                    
                    {loadingState === 'loading' && (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-hive-brand-primary border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-hive-text-primary">Loading profile data...</div>
                      </div>
                    )}
                    
                    {loadingState === 'success' && (
                      <div className="flex items-center justify-center gap-3 text-hive-status-success">
                        <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white animate-bounce">
                          ✓
                        </div>
                        <div>Profile updated successfully!</div>
                      </div>
                    )}
                  </div>

                  {/* Skeleton Loading */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-hive-text-primary">Skeleton Loading:</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-hive-background-secondary rounded animate-pulse"></div>
                      <div className="h-4 bg-hive-background-secondary rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-hive-background-secondary rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-4">Progress Indicators</h3>
                <div className="space-y-6">
                  {/* Circular Progress */}
                  <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-hive-background-secondary"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray="175.929"
                          strokeDashoffset="52.779"
                          className="text-hive-brand-primary transition-all duration-500"
                          style={{ strokeLinecap: 'round' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-hive-text-primary">
                        70%
                      </div>
                    </div>
                    <div className="text-sm text-hive-text-secondary mt-2">Profile Completion</div>
                  </div>

                  {/* Linear Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-hive-text-primary">Upload Progress</span>
                      <span className="text-hive-text-secondary">45%</span>
                    </div>
                    <div className="w-full h-2 bg-hive-background-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary rounded-full transition-all duration-500 ease-out" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  {/* Step Progress */}
                  <div>
                    <div className="text-sm text-hive-text-primary mb-3">Onboarding Progress</div>
                    <div className="flex items-center justify-between">
                      {[1, 2, 3, 4, 5].map((step, index) => (
                        <React.Fragment key={step}>
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                            ${index < 3 
                              ? 'bg-hive-status-success text-white' 
                              : index === 3 
                                ? 'bg-hive-brand-primary text-white animate-pulse' 
                                : 'bg-hive-background-secondary text-hive-text-secondary'
                            }
                          `}>
                            {index < 3 ? '✓' : step}
                          </div>
                          {index < 4 && (
                            <div className={`flex-1 h-1 mx-2 rounded transition-colors duration-300 ${
                              index < 2 ? 'bg-hive-status-success' : 'bg-hive-background-secondary'
                            }`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drag & Drop Demo */}
        {activeDemo === 'gestures' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-hive-text-primary">Drag & Drop Animations</h2>
              <p className="text-hive-text-secondary max-w-2xl mx-auto">
                Smooth drag interactions with visual feedback and grid snapping
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-hive-border-default">
                <h3 className="text-lg font-bold text-hive-text-primary mb-6">Interactive Drag Demo</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-hive-text-secondary">Drag the widgets below to rearrange them:</div>
                    <button
                      onClick={() => setIsDragging(!isDragging)}
                      className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                        isDragging 
                          ? 'bg-hive-brand-secondary text-white' 
                          : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-background-primary'
                      }`}
                    >
                      {isDragging ? '✏️ Edit Mode' : 'Enable Edit Mode'}
                    </button>
                  </div>

                  <div className={`
                    grid grid-cols-4 gap-4 p-4 rounded-xl transition-all duration-300
                    ${isDragging ? 'bg-hive-background-secondary/30 border-2 border-dashed border-hive-brand-secondary/30' : ''}
                  `}>
                    {[
                      { id: 'widget1', icon: '👤', title: 'Avatar', color: 'bg-blue-500' },
                      { id: 'widget2', icon: '📋', title: 'Tasks', color: 'bg-green-500' },
                      { id: 'widget3', icon: '📅', title: 'Calendar', color: 'bg-purple-500' },
                      { id: 'widget4', icon: '🔒', title: 'Privacy', color: 'bg-orange-500' }
                    ].map((widget) => (
                      <div
                        key={widget.id}
                        className={`
                          group relative p-4 bg-white rounded-xl border-2 transition-all duration-200
                          ${isDragging 
                            ? 'cursor-move border-hive-brand-secondary hover:shadow-xl hover:scale-105 hover:-rotate-1' 
                            : 'cursor-pointer border-hive-border-default hover:border-hive-brand-secondary/50 hover:shadow-lg'
                          }
                        `}
                        draggable={isDragging}
                        onDragStart={(e) => {
                          e.currentTarget.classList.add('opacity-50', 'transform', 'scale-105', 'rotate-3');
                        }}
                        onDragEnd={(e) => {
                          e.currentTarget.classList.remove('opacity-50', 'transform', 'scale-105', 'rotate-3');
                        }}
                      >
                        {isDragging && (
                          <>
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-hive-brand-secondary rounded-full flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-3 h-3 grid grid-cols-2 gap-0.5">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </>
                        )}

                        <div className="text-center space-y-2">
                          <div className={`w-12 h-12 ${widget.color} rounded-xl flex items-center justify-center text-white text-xl mx-auto transition-transform duration-200 ${isDragging ? 'group-hover:scale-110' : ''}`}>
                            {widget.icon}
                          </div>
                          <div className="font-medium text-hive-text-primary">{widget.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <h4 className="font-semibold text-hive-text-primary mb-3">Drag Animation Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-hive-text-secondary">
                      <div>
                        <div className="font-medium text-hive-text-primary mb-1">Visual Feedback:</div>
                        <div>• Opacity reduction during drag</div>
                        <div>• Scale and rotation transforms</div>
                        <div>• Drop zone highlighting</div>
                      </div>
                      <div>
                        <div className="font-medium text-hive-text-primary mb-1">Interaction States:</div>
                        <div>• Hover effects with scale</div>
                        <div>• Drag handles on edit mode</div>
                        <div>• Grid snapping animation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animation Guidelines */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Animation Design Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto">
                ⚡
              </div>
              <h3 className="font-bold text-hive-text-primary">Performance First</h3>
              <div className="text-sm text-hive-text-secondary space-y-2">
                <div>• GPU-accelerated transforms</div>
                <div>• 60fps smooth animations</div>
                <div>• Optimized for all devices</div>
                <div>• Reduced motion support</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto">
                🎯
              </div>
              <h3 className="font-bold text-hive-text-primary">Purpose Driven</h3>
              <div className="text-sm text-hive-text-secondary space-y-2">
                <div>• Enhance user understanding</div>
                <div>• Provide clear feedback</div>
                <div>• Guide user attention</div>
                <div>• Support task completion</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto">
                🎨
              </div>
              <h3 className="font-bold text-hive-text-primary">Brand Consistent</h3>
              <div className="text-sm text-hive-text-secondary space-y-2">
                <div>• HIVE timing curves</div>
                <div>• Brand color transitions</div>
                <div>• Consistent easing functions</div>
                <div>• Cohesive motion language</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileAnimationSystem: Story = {
  name: '🎭 Profile Animation System',
  render: () => <AnimationShowcase />
};