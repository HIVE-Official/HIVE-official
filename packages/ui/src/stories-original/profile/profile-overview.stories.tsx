import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSystem } from '../../components/profile/profile-system';

const meta: Meta<typeof ProfileSystem> = {
  title: 'Profile/📋 System Overview',
  component: ProfileSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive overview of the Profile System architecture, design patterns, and component ecosystem. This collection demonstrates the complete scope and interconnection of profile components.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Profile System Showcase
export const ProfileSystemShowcase: Story = {
  name: '🌟 Complete Profile System',
  args: {
    user: {
      id: 'showcase-user',
      fullName: 'HIVE System Showcase',
      handle: 'hivesystem',
      email: 'showcase@hive.university',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      major: 'System Architecture & Design',
      graduationYear: 2024,
      school: 'HIVE University',
      isBuilder: true,
      isPublic: true,
      memberSince: '2023-01-01',
      onlineStatus: 'online',
      bio: 'Showcasing the complete HIVE Profile System with all components, interactions, and features in harmony 🌟',
      interests: ['System Design', 'Component Architecture', 'User Experience', 'Accessibility'],
      stats: {
        totalSpaces: 42,
        activeSpaces: 12,
        toolsCreated: 25,
        connectionsCount: 156,
        streakDays: 89,
        totalActivity: 2847
      }
    },
    spaces: [
      {
        id: 'design-system',
        name: 'HIVE Design System',
        type: 'design',
        memberCount: 234,
        unreadCount: 15,
        lastActivity: '5 minutes ago',
        recentPosts: [
          {
            id: 'system-1',
            author: 'Design Team',
            content: '🎨 New component patterns released: Enhanced Calendar integration with ProfileSystem',
            timestamp: '5 minutes ago',
            type: 'announcement'
          }
        ]
      },
      {
        id: 'user-research',
        name: 'User Research & Testing',
        type: 'research',
        memberCount: 89,
        unreadCount: 7,
        lastActivity: '20 minutes ago'
      },
      {
        id: 'accessibility',
        name: 'Accessibility Standards',
        type: 'standards',
        memberCount: 67,
        unreadCount: 3,
        lastActivity: '1 hour ago'
      }
    ],
    events: [
      {
        id: 'system-demo',
        title: '🌟 System Showcase Demo',
        time: '30 minutes',
        type: 'demo',
        location: 'Design Studio',
        attendees: ['Design team', 'Developers', 'Stakeholders'],
        metadata: {
          purpose: 'Complete system demonstration',
          features: 'All components and interactions'
        }
      },
      {
        id: 'component-review',
        title: '🔍 Component Architecture Review',
        time: '2 hours',
        type: 'review',
        location: 'Architecture Room',
        attendees: ['System architects', 'Component library team']
      },
      {
        id: 'user-testing',
        title: '👥 User Testing Session',
        time: 'Tomorrow 2:00 PM',
        type: 'testing',
        location: 'UX Research Lab',
        attendees: ['UX researchers', 'Test participants']
      }
    ],
    connections: [
      {
        id: 'design-community',
        type: 'design_system',
        message: 'Your component patterns are being adopted across 15 university systems',
        people: ['Design system community'],
        action: 'View adoption metrics'
      },
      {
        id: 'accessibility-network',
        type: 'accessibility',
        message: 'A11y testing reveals 98% WCAG 2.1 compliance across all profile components',
        people: ['Accessibility experts'],
        action: 'View detailed report'
      }
    ],
    hiveLab: {
      isLocked: false,
      availableTools: [
        'Component Generator',
        'Accessibility Scanner',
        'Performance Analyzer',
        'Design Token Manager'
      ],
      createdTools: [
        'Profile System Builder',
        'Calendar Integration Kit',
        'Responsive Design Tester',
        'Accessibility Validator',
        'Component Documentation Generator'
      ],
      comingSoon: [
        'AI-Powered Component Suggestions',
        'Cross-Platform Component Export',
        'Real-time Collaboration Tools'
      ]
    }
  }
};

// Component Architecture Overview
export const ComponentArchitectureOverview: Story = {
  name: '🏗️ Architecture Overview',
  render: () => {
    return (
      <div className="p-8 space-y-8 bg-hive-background-primary min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--hive-brand-secondary)]">🏗️ HIVE Profile System Architecture</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            A comprehensive, interconnected component ecosystem designed for scalability, accessibility, and evolutionary growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core Components */}
          <div className="bg-hive-background-secondary p-6 rounded-lg border-2 border-hive-gold/20">
            <h2 className="text-xl font-bold text-[var(--hive-brand-secondary)] mb-4">🎯 Core Components</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• ProfileSystem (Main orchestrator)</li>
              <li>• ProfileHeader (Identity & status)</li>
              <li>• CalendarCard (Schedule integration)</li>
              <li>• MySpacesFeed (Social connections)</li>
              <li>• CampusConnections (Network)</li>
              <li>• HiveLabSection (Tools & creation)</li>
              <li>• ProfileStats (Analytics)</li>
              <li>• SmartCalendar (Advanced scheduling)</li>
            </ul>
          </div>
          
          {/* User Scenarios */}
          <div className="bg-hive-background-secondary p-6 rounded-lg border-2 border-blue-500/20">
            <h2 className="text-xl font-bold text-blue-400 mb-4">👥 User Personas</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• 🩺 Pre-Med Overachiever</li>
              <li>• 💻 Tech Startup Founder</li>
              <li>• 📚 Community College Transfer</li>
              <li>• 🏛️ Greek Life President</li>
              <li>• 🎓 PhD Researcher</li>
              <li>• 🌍 International Student</li>
              <li>• ♿ Accessibility-First User</li>
              <li>• 📱 Mobile-Only Student</li>
            </ul>
          </div>
          
          {/* Interactive Features */}
          <div className="bg-hive-background-secondary p-6 rounded-lg border-2 border-green-500/20">
            <h2 className="text-xl font-bold text-green-400 mb-4">🎮 Interactive Features</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• ⏰ Real-time calendar updates</li>
              <li>• 🔔 Live notification flow</li>
              <li>• ⚡ Progressive loading states</li>
              <li>• 📱 Responsive breakpoints</li>
              <li>• 👆 Touch-first interactions</li>
              <li>• 🔄 Cross-device synchronization</li>
              <li>• 📵 Offline functionality</li>
              <li>• 📲 PWA capabilities</li>
            </ul>
          </div>
          
          {/* Accessibility */}
          <div className="bg-hive-background-secondary p-6 rounded-lg border-2 border-purple-500/20">
            <h2 className="text-xl font-bold text-purple-400 mb-4">♿ Accessibility</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• 🔊 Screen reader support</li>
              <li>• ⌨️ Keyboard navigation</li>
              <li>• 🎨 High contrast mode</li>
              <li>• 🌈 Color blind accessibility</li>
              <li>• 📏 WCAG 2.1 compliance</li>
              <li>• 🎯 Focus management</li>
              <li>• 📱 Touch target sizing</li>
              <li>• 🏷️ Semantic HTML structure</li>
            </ul>
          </div>
          
          {/* Edge Cases */}
          <div className="bg-hive-background-secondary p-6 rounded-lg border-2 border-orange-500/20">
            <h2 className="text-xl font-bold text-orange-400 mb-4">🚨 Edge Cases</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• 🌐 Network error handling</li>
              <li>• 🐌 Slow network performance</li>
              <li>• 🚀 Extreme data scenarios</li>
              <li>• 💥 Calendar sync failures</li>
              <li>• 📊 Performance at scale</li>
              <li>• 🔄 State management stress</li>
              <li>• 📱 Device compatibility</li>
              <li>• 🌍 Internationalization</li>
            </ul>
          </div>
          
          {/* Design System */}
          <div className="bg-hive-background-secondary p-6 rounded-lg border-2 border-pink-500/20">
            <h2 className="text-xl font-bold text-pink-400 mb-4">🎨 Design System</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• 🎯 Component interconnection</li>
              <li>• 🏗️ Evolutionary architecture</li>
              <li>• 🔄 Kitchen sink philosophy</li>
              <li>• 📐 Consistent spacing system</li>
              <li>• 🎭 Brand system integration</li>
              <li>• 🌟 Motion and animations</li>
              <li>• 📦 Reusable component library</li>
              <li>• 📚 Comprehensive documentation</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-[var(--hive-brand-secondary)]/10 border border-hive-gold/30 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-[var(--hive-brand-secondary)] mb-4">🌟 Design System Evolution</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Every component enhances and evolves our existing design system. New components work beautifully 
            with existing ones and establish patterns for future development. This evolutionary approach ensures 
            that each addition makes the entire HIVE design system better, not just adds to it.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-hive-background-secondary p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">📊 Story Coverage</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">User Scenarios</span>
                <span className="text-[var(--hive-brand-secondary)] font-medium">8+ personas</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Interactive Demos</span>
                <span className="text-blue-400 font-medium">6 dynamic stories</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Accessibility Tests</span>
                <span className="text-green-400 font-medium">5 a11y scenarios</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Mobile/Responsive</span>
                <span className="text-purple-400 font-medium">6 breakpoint tests</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Edge Cases</span>
                <span className="text-orange-400 font-medium">8 error states</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Calendar Scenarios</span>
                <span className="text-pink-400 font-medium">12+ variations</span>
              </div>
            </div>
          </div>
          
          <div className="bg-hive-background-secondary p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">🛠️ Technical Features</h3>
            <div className="space-y-2 text-gray-300">
              <div>✅ TypeScript with comprehensive types</div>
              <div>✅ React 18+ with modern patterns</div>
              <div>✅ Tailwind CSS with design tokens</div>
              <div>✅ Framer Motion animations</div>
              <div>✅ Storybook 8.4+ documentation</div>
              <div>✅ Accessibility testing integration</div>
              <div>✅ Responsive design utilities</div>
              <div>✅ Performance optimizations</div>
              <div>✅ Error boundary handling</div>
              <div>✅ PWA-ready components</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Kitchen Sink Demo
export const KitchenSinkDemo: Story = {
  name: '🔧 Kitchen Sink (Everything)',
  args: {
    ...ProfileSystemShowcase.args,
    // Enable all possible features and states
    showAllFeatures: true,
    showExperimentalFeatures: true,
    enableAdvancedInteractions: true,
    showDebugInfo: true,
    kitchenSinkMode: true
  }
};