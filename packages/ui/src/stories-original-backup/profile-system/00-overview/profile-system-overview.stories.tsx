import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/00-Overview/Profile System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive overview of the HIVE Profile Frontend System - a complete social utility platform designed for campus communities where connections form around solving real problems together.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// =========================
// PROFILE SYSTEM OVERVIEW
// =========================

export const SystemOverview: Story = {
  name: '🎯 Profile System Overview',
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-hive-brand-primary/5 to-hive-brand-secondary/5 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-hive-brand-primary/10 border border-hive-brand-primary/20 rounded-full">
            <div className="w-8 h-8 bg-hive-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-hive-brand-primary font-semibold">HIVE Profile System</span>
          </div>
          
          <h1 className="text-5xl font-bold text-hive-text-primary">
            Social Utility Platform
          </h1>
          
          <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto leading-relaxed">
            Where connections form around solving real problems together. This is social media that actually makes your life better - 
            featuring 152 comprehensive components organized across atomic design principles.
          </p>
        </div>

        {/* Core Philosophy */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-hive-text-primary mb-6 text-center">🌟 Social Utility Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-hive-brand-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold text-hive-text-primary">Purposeful Connections</h3>
              <p className="text-hive-text-secondary">
                Every connection has purpose, every community solves problems, and every interaction moves your life forward.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-hive-brand-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-hive-text-primary">Utility-First Design</h3>
              <p className="text-hive-text-secondary">
                Your profile isn't a highlight reel - it's your campus command center that actually runs your life.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-hive-status-success/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-hive-text-primary">Mutual Success</h3>
              <p className="text-hive-text-secondary">
                Communities become engines of mutual success where being social means being useful to each other.
              </p>
            </div>
          </div>
        </div>

        {/* Atomic Design Structure */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-hive-text-primary text-center">🔬 Atomic Design Structure</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Atoms */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 hover:border-hive-brand-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold">A</span>
                </div>
                <h3 className="text-xl font-semibold text-hive-text-primary">Atoms</h3>
              </div>
              <p className="text-hive-text-secondary mb-4">
                Fundamental profile building blocks
              </p>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Profile Avatar System</li>
                <li>• Status Indicators</li>
                <li>• Badges Collection</li>
                <li>• Statistics Display</li>
                <li>• Action Buttons</li>
                <li>• Privacy Controls</li>
              </ul>
              <div className="mt-4 text-sm font-medium text-hive-brand-primary">
                24 Components
              </div>
            </div>

            {/* Molecules */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 hover:border-hive-brand-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold">M</span>
                </div>
                <h3 className="text-xl font-semibold text-hive-text-primary">Molecules</h3>
              </div>
              <p className="text-hive-text-secondary mb-4">
                Simple profile compositions
              </p>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• User Identity Cards</li>
                <li>• Profile Forms</li>
                <li>• Navigation Components</li>
                <li>• Data Display Cards</li>
              </ul>
              <div className="mt-4 text-sm font-medium text-hive-brand-primary">
                18 Components
              </div>
            </div>

            {/* Organisms */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 hover:border-hive-brand-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">O</span>
                </div>
                <h3 className="text-xl font-semibold text-hive-text-primary">Organisms</h3>
              </div>
              <p className="text-hive-text-secondary mb-4">
                Complex profile sections
              </p>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Widget Systems</li>
                <li>• Modal Systems</li>
                <li>• Section Organisms</li>
                <li>• Interaction Systems</li>
              </ul>
              <div className="mt-4 text-sm font-medium text-hive-brand-primary">
                32 Components
              </div>
            </div>

            {/* Templates */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 hover:border-hive-brand-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">T</span>
                </div>
                <h3 className="text-xl font-semibold text-hive-text-primary">Templates</h3>
              </div>
              <p className="text-hive-text-secondary mb-4">
                Profile page structures
              </p>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Layout Templates</li>
                <li>• Flow Templates</li>
                <li>• State Templates</li>
              </ul>
              <div className="mt-4 text-sm font-medium text-hive-brand-primary">
                15 Components
              </div>
            </div>

            {/* Pages */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 hover:border-hive-brand-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">P</span>
                </div>
                <h3 className="text-xl font-semibold text-hive-text-primary">Pages</h3>
              </div>
              <p className="text-hive-text-secondary mb-4">
                Complete profile experiences
              </p>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Profile Experiences</li>
                <li>• Profile Variants</li>
                <li>• Profile Contexts</li>
              </ul>
              <div className="mt-4 text-sm font-medium text-hive-brand-primary">
                18 Components
              </div>
            </div>

            {/* Integration */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 hover:border-hive-brand-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">I</span>
                </div>
                <h3 className="text-xl font-semibold text-hive-text-primary">Integration</h3>
              </div>
              <p className="text-hive-text-secondary mb-4">
                System integrations
              </p>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• System Integration</li>
                <li>• API Integration</li>
                <li>• Platform Integration</li>
              </ul>
              <div className="mt-4 text-sm font-medium text-hive-brand-primary">
                12 Components
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-hive-text-primary text-center">✨ Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-hive-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-hive-brand-primary text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Bento Grid Layout</h3>
              <p className="text-sm text-hive-text-secondary">
                4-column responsive grid system with customizable widgets
              </p>
            </div>

            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-hive-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-hive-brand-secondary text-xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Expand & Focus</h3>
              <p className="text-sm text-hive-text-secondary">
                Modal system for detailed widget interactions
              </p>
            </div>

            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-hive-status-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-hive-status-success text-xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Configuration Panels</h3>
              <p className="text-sm text-hive-text-secondary">
                Comprehensive customization and settings management
              </p>
            </div>

            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-hive-status-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-hive-status-warning text-xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Privacy Controls</h3>
              <p className="text-sm text-hive-text-secondary">
                Ghost mode and comprehensive privacy management
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-hive-text-primary mb-6 text-center">🗺️ Implementation Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-red-600 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary">Foundation</h3>
              <p className="text-sm text-hive-text-secondary">
                Design tokens, accessibility, and core atomic components
              </p>
              <div className="text-xs font-medium text-red-600">High Priority</div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary">Components</h3>
              <p className="text-sm text-hive-text-secondary">
                Molecules, organisms, and complex interaction systems
              </p>
              <div className="text-xs font-medium text-orange-600">Medium Priority</div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary">Experiences</h3>
              <p className="text-sm text-hive-text-secondary">
                Complete page experiences and advanced features
              </p>
              <div className="text-xs font-medium text-blue-600">Medium Priority</div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-hive-text-primary">Examples</h3>
              <p className="text-sm text-hive-text-secondary">
                Documentation, edge cases, and comprehensive examples
              </p>
              <div className="text-xs font-medium text-green-600">Low Priority</div>
            </div>
          </div>
        </div>

        {/* Navigation Guide */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-primary/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-hive-text-primary mb-6 text-center">🧭 Navigation Guide</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">🔰 Getting Started</h3>
              <ul className="space-y-3 text-hive-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-primary">1.</span>
                  <span>Start with <strong>01-Foundation</strong> to understand design principles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-primary">2.</span>
                  <span>Explore <strong>02-Atoms</strong> for basic building blocks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-primary">3.</span>
                  <span>Progress through <strong>03-Molecules</strong> and <strong>04-Organisms</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-primary">4.</span>
                  <span>See complete experiences in <strong>06-Pages</strong></span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">🎯 Quick Access</h3>
              <ul className="space-y-3 text-hive-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-secondary">🔍</span>
                  <span><strong>Profile Board System</strong> - Core implementation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-secondary">⚙️</span>
                  <span><strong>Configuration Panels</strong> - Customization system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-secondary">📱</span>
                  <span><strong>Responsive Templates</strong> - Mobile optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-brand-secondary">🌟</span>
                  <span><strong>Kitchen Sink</strong> - Comprehensive examples</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-hive-border-default">
          <p className="text-hive-text-secondary">
            HIVE Profile System - 152 Components • Atomic Design • Social Utility Platform
          </p>
          <p className="text-sm text-hive-text-tertiary mt-2">
            Where connections have purpose and community gets things done.
          </p>
        </div>
      </div>
    </div>
  )
};

export const ArchitectureGuide: Story = {
  name: '🏗️ Architecture Guide',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Profile System Architecture</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Comprehensive architectural overview of the HIVE Profile Frontend System, 
            designed for scalability, maintainability, and exceptional user experience.
          </p>
        </div>

        {/* Core Principles */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">🎯 Core Architectural Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">🔬 Atomic Design</h3>
              <p className="text-hive-text-secondary text-sm">
                Systematic component hierarchy from atoms to complete pages, ensuring consistency and reusability.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">🍽️ Kitchen Sink Philosophy</h3>
              <p className="text-hive-text-secondary text-sm">
                Handle every potential scenario, edge case, and interaction pattern comprehensively.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">🌐 Social Utility Focus</h3>
              <p className="text-hive-text-secondary text-sm">
                Every component designed for meaningful connections and mutual success in campus communities.
              </p>
            </div>
          </div>
        </div>

        {/* Component Hierarchy */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🏗️ Component Hierarchy</h2>
          
          <div className="space-y-4">
            {[
              { level: 'Atoms', count: 24, color: 'red', description: 'Avatar, badges, buttons, status indicators' },
              { level: 'Molecules', count: 18, color: 'orange', description: 'User cards, forms, navigation elements' },
              { level: 'Organisms', count: 32, color: 'yellow', description: 'Widgets, modals, complex sections' },
              { level: 'Templates', count: 15, color: 'green', description: 'Layout structures and flow templates' },
              { level: 'Pages', count: 18, color: 'blue', description: 'Complete profile experiences' },
              { level: 'Integration', count: 12, color: 'purple', description: 'System and API integrations' },
              { level: 'Advanced', count: 12, color: 'indigo', description: 'Performance, accessibility, security' },
              { level: 'Examples', count: 10, color: 'gray', description: 'Use cases, edge cases, demonstrations' }
            ].map(({ level, count, color, description }) => (
              <div key={level} className="flex items-center gap-4 p-4 bg-hive-background-secondary border border-hive-border-default rounded-lg">
                <div className={`w-12 h-12 bg-${color}-500/20 rounded-lg flex items-center justify-center`}>
                  <span className={`text-${color}-600 font-bold`}>{level[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-hive-text-primary">{level}</h3>
                    <span className="px-2 py-1 bg-hive-brand-primary/10 text-hive-brand-primary text-xs font-medium rounded">
                      {count} components
                    </span>
                  </div>
                  <p className="text-sm text-hive-text-secondary">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">⚡ Technical Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-blue-600 text-xl">⚛️</span>
              </div>
              <h3 className="font-semibold text-hive-text-primary">React + TypeScript</h3>
              <p className="text-sm text-hive-text-secondary">Type-safe component development</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-purple-600 text-xl">🎨</span>
              </div>
              <h3 className="font-semibold text-hive-text-primary">Tailwind CSS</h3>
              <p className="text-sm text-hive-text-secondary">Utility-first styling system</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-orange-600 text-xl">📚</span>
              </div>
              <h3 className="font-semibold text-hive-text-primary">Storybook</h3>
              <p className="text-sm text-hive-text-secondary">Component documentation & testing</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-green-600 text-xl">🎭</span>
              </div>
              <h3 className="font-semibold text-hive-text-primary">Framer Motion</h3>
              <p className="text-sm text-hive-text-secondary">Smooth animations & transitions</p>
            </div>
          </div>
        </div>

        {/* Development Workflow */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🔄 Development Workflow</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">📋 Implementation Process</h3>
              <ol className="space-y-3 text-hive-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="bg-hive-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Foundation: Design tokens, accessibility, core atoms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-hive-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Components: Molecules, organisms, interaction systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-hive-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span>Templates: Layout structures and flow templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-hive-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <span>Pages: Complete profile experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-hive-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                  <span>Integration: System connections and advanced features</span>
                </li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">✅ Quality Standards</h3>
              <ul className="space-y-3 text-hive-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-hive-status-success">✓</span>
                  <span>Accessibility compliance (WCAG 2.1 AA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-status-success">✓</span>
                  <span>Mobile-first responsive design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-status-success">✓</span>
                  <span>Comprehensive error handling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-status-success">✓</span>
                  <span>Performance optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-hive-status-success">✓</span>
                  <span>Design system consistency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const ImplementationRoadmap: Story = {
  name: '🗺️ Implementation Roadmap',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Implementation Roadmap</h1>
          <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Strategic development plan for the 152 Profile System components, 
            organized by priority and dependencies to ensure efficient implementation.
          </p>
        </div>

        {/* Phase Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { phase: 'Phase 1', title: 'Foundation', priority: 'High', components: 35, color: 'red' },
            { phase: 'Phase 2', title: 'Components', priority: 'Medium', components: 50, color: 'orange' },
            { phase: 'Phase 3', title: 'Experiences', priority: 'Medium', components: 45, color: 'blue' },
            { phase: 'Phase 4', title: 'Examples', priority: 'Low', components: 22, color: 'green' }
          ].map(({ phase, title, priority, components, color }) => (
            <div key={phase} className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
              <div className={`w-16 h-16 bg-${color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className={`text-${color}-600 font-bold text-lg`}>{phase.split(' ')[1]}</span>
              </div>
              <h3 className="text-xl font-semibold text-hive-text-primary mb-2">{title}</h3>
              <div className={`inline-block px-3 py-1 bg-${color}-500/10 text-${color}-600 text-sm font-medium rounded-full mb-3`}>
                {priority} Priority
              </div>
              <p className="text-hive-text-secondary text-sm mb-3">{components} components</p>
            </div>
          ))}
        </div>

        {/* Detailed Phases */}
        <div className="space-y-8">
          {/* Phase 1 */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold">1</span>
              </div>
              <h2 className="text-2xl font-bold text-hive-text-primary">Phase 1: Foundation & Core Components</h2>
              <span className="px-3 py-1 bg-red-500/10 text-red-600 text-sm font-medium rounded-full">High Priority</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { section: '00-Overview', count: 3, description: 'System documentation' },
                { section: '01-Foundation', count: 8, description: 'Design tokens & accessibility' },
                { section: '02-Atoms', count: 24, description: 'Core building blocks' }
              ].map(({ section, count, description }) => (
                <div key={section} className="bg-white/50 border border-red-500/10 rounded-lg p-4">
                  <h3 className="font-semibold text-hive-text-primary">{section}</h3>
                  <p className="text-sm text-hive-text-secondary mb-2">{description}</p>
                  <span className="text-xs font-medium text-red-600">{count} components</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white/30 rounded-lg p-4">
              <h3 className="font-semibold text-hive-text-primary mb-2">🎯 Phase 1 Goals</h3>
              <ul className="text-sm text-hive-text-secondary space-y-1">
                <li>• Establish design system foundation</li>
                <li>• Create core atomic components</li>
                <li>• Implement accessibility standards</li>
                <li>• Set up responsive framework</li>
              </ul>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <h2 className="text-2xl font-bold text-hive-text-primary">Phase 2: Complex Components & Integration</h2>
              <span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-sm font-medium rounded-full">Medium Priority</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { section: '03-Molecules', count: 18, description: 'Component compositions' },
                { section: '04-Organisms', count: 32, description: 'Complex systems' },
                { section: '07-Integration', count: 12, description: 'System connections' }
              ].map(({ section, count, description }) => (
                <div key={section} className="bg-white/50 border border-orange-500/10 rounded-lg p-4">
                  <h3 className="font-semibold text-hive-text-primary">{section}</h3>
                  <p className="text-sm text-hive-text-secondary mb-2">{description}</p>
                  <span className="text-xs font-medium text-orange-600">{count} components</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white/30 rounded-lg p-4">
              <h3 className="font-semibold text-hive-text-primary mb-2">🎯 Phase 2 Goals</h3>
              <ul className="text-sm text-hive-text-secondary space-y-1">
                <li>• Build complex widget systems</li>
                <li>• Implement modal interactions</li>
                <li>• Create integration patterns</li>
                <li>• Establish configuration systems</li>
              </ul>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h2 className="text-2xl font-bold text-hive-text-primary">Phase 3: Complete Experiences</h2>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-sm font-medium rounded-full">Medium Priority</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { section: '05-Templates', count: 15, description: 'Layout structures' },
                { section: '06-Pages', count: 18, description: 'Complete experiences' },
                { section: '08-Advanced', count: 12, description: 'Advanced features' }
              ].map(({ section, count, description }) => (
                <div key={section} className="bg-white/50 border border-blue-500/10 rounded-lg p-4">
                  <h3 className="font-semibold text-hive-text-primary">{section}</h3>
                  <p className="text-sm text-hive-text-secondary mb-2">{description}</p>
                  <span className="text-xs font-medium text-blue-600">{count} components</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white/30 rounded-lg p-4">
              <h3 className="font-semibold text-hive-text-primary mb-2">🎯 Phase 3 Goals</h3>
              <ul className="text-sm text-hive-text-secondary space-y-1">
                <li>• Create complete profile pages</li>
                <li>• Implement advanced features</li>
                <li>• Optimize performance</li>
                <li>• Enhance security features</li>
              </ul>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">4</span>
              </div>
              <h2 className="text-2xl font-bold text-hive-text-primary">Phase 4: Documentation & Examples</h2>
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm font-medium rounded-full">Low Priority</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { section: '99-Examples', count: 22, description: 'Comprehensive examples' }
              ].map(({ section, count, description }) => (
                <div key={section} className="bg-white/50 border border-green-500/10 rounded-lg p-4">
                  <h3 className="font-semibold text-hive-text-primary">{section}</h3>
                  <p className="text-sm text-hive-text-secondary mb-2">{description}</p>
                  <span className="text-xs font-medium text-green-600">{count} components</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white/30 rounded-lg p-4">
              <h3 className="font-semibold text-hive-text-primary mb-2">🎯 Phase 4 Goals</h3>
              <ul className="text-sm text-hive-text-secondary space-y-1">
                <li>• Document all use cases</li>
                <li>• Create edge case examples</li>
                <li>• Build comprehensive demos</li>
                <li>• Establish best practices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">📅 Development Timeline</h2>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-hive-border-default"></div>
            
            <div className="space-y-8">
              {[
                { phase: 'Phase 1', duration: 'Weeks 1-3', status: 'Foundation & Atoms' },
                { phase: 'Phase 2', duration: 'Weeks 4-7', status: 'Molecules & Organisms' },
                { phase: 'Phase 3', duration: 'Weeks 8-11', status: 'Templates & Pages' },
                { phase: 'Phase 4', duration: 'Weeks 12-14', status: 'Examples & Documentation' }
              ].map(({ phase, duration, status }, index) => (
                <div key={phase} className="relative flex items-center gap-6">
                  <div className="w-8 h-8 bg-hive-brand-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 bg-white border border-hive-border-default rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-hive-text-primary">{phase}</h3>
                      <span className="text-sm text-hive-text-secondary">{duration}</span>
                    </div>
                    <p className="text-sm text-hive-text-secondary mt-1">{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};