/**
 * HIVE SYSTEM NAVIGATION - COMPLETE STORYBOOK INDEX
 * 
 * Master navigation for all HIVE system components with direct links
 * to every interactive story and component in the design system
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Home,
  Users,
  Zap,
  Calendar,
  Settings,
  Shield,
  Search,
  Activity,
  Building2,
  GraduationCap,
  Smartphone,
  Monitor,
  Eye,
  Layout,
  Layers,
  Globe,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '🏠 SYSTEM NAVIGATION/Complete Storybook Index',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🏠 HIVE SYSTEM NAVIGATION - COMPLETE STORYBOOK INDEX

Master navigation for the entire HIVE design system with direct links to every interactive story and component. Use this index to quickly find and navigate to any part of the system.

## 🎯 SYSTEM OVERVIEW

The HIVE platform consists of 5 core systems, each fully documented with interactive Storybook stories:

### **🏛️ SPACES SYSTEM** - Campus Community Building
Complete discovery, management, and interaction system for University at Buffalo campus communities.

### **👤 PROFILE SYSTEM** - Personal Campus Command Center  
Comprehensive dashboard connecting calendar, tools, communities, and goals in one personalized interface.

### **⚡ TOOLS SYSTEM** - Campus Solution Building
Platform for students to build and share tools that solve real campus problems together.

### **📱 MOBILE SYSTEM** - Touch-Optimized Campus Experience
Complete mobile-first interface with haptic feedback, gestures, and accessibility for on-campus use.

### **🛡️ ADMIN SYSTEM** - Campus Platform Management
Administrative tools for University oversight, content moderation, and system health monitoring.

## 📚 COMPONENT LIBRARIES

### **⚛️ ATOMIC DESIGN** - Foundation Components
- **Atoms** - Basic building blocks (buttons, inputs, avatars, badges)
- **Molecules** - Combined components (forms, cards, navigation items)  
- **Organisms** - Complex systems (dashboards, feeds, directories)

### **🎨 BRAND SYSTEM** - HIVE Visual Identity
- **Design Tokens** - Colors, typography, spacing, shadows, motion
- **Liquid Metal Design** - Advanced glass morphism and constellation effects
- **Interactive States** - Hover animations, transitions, micro-interactions

All components include comprehensive accessibility features, mobile optimization, and UB campus context.
        `
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// SYSTEM NAVIGATION DATA
// =============================================================================

const systemCategories = [
  {
    id: 'spaces',
    title: '🏛️ Spaces System',
    description: 'Campus community building and discovery platform',
    color: 'blue',
    stories: [
      {
        title: 'Complete Interactive System',
        path: '🏛️ SPACES SYSTEM/Complete Interactive System',
        description: 'Full system with UX flows and Information Architecture'
      },
      {
        title: 'UB Campus Templates',
        path: 'Spaces System/UB Campus Templates',
        description: 'Pre-seeded campus communities and activation workflows'
      },
      {
        title: 'Live Frontend System',
        path: '06-Live-Frontend/Spaces System',
        description: 'Production discovery and management interface'
      },
      {
        title: 'Campus Spaces Card',
        path: 'HIVE/Spaces/Molecules/CampusSpacesCard',
        description: 'Personal spaces dashboard component'
      },
      {
        title: 'Profile Spaces Widget',
        path: 'Profile System/Profile Widgets/Spaces Widget',
        description: 'Joined communities card for profile dashboard'
      }
    ]
  },
  {
    id: 'profile',
    title: '👤 Profile System',
    description: 'Personal campus command center and identity management',
    color: 'purple',
    stories: [
      {
        title: 'Complete Profile System',
        path: '05-Live-Frontend/Profile System',
        description: 'Full bento grid dashboard with all 8 profile cards'
      },
      {
        title: 'Avatar Widget',
        path: 'Profile System/Profile Widgets/Avatar Widget',
        description: 'Personal identity and photo management'
      },
      {
        title: 'Calendar Widget',
        path: 'Profile System/Profile Widgets/Calendar Widget',
        description: 'Personal schedule and availability tracking'
      },
      {
        title: 'Tools Widget',
        path: 'Profile System/Profile Widgets/Tools Widget',
        description: 'Personal tool portfolio and builder status'
      },
      {
        title: 'Activity Widget',
        path: 'Profile System/Profile Widgets/Activity Widget',
        description: 'Recent platform engagement and stats'
      },
      {
        title: 'Privacy Controls',
        path: 'Profile System/Profile Widgets/Ghost Mode Widget',
        description: 'Campus privacy and visibility management'
      }
    ]
  },
  {
    id: 'tools',
    title: '⚡ Tools System',
    description: 'Campus solution building and collaboration platform',
    color: 'yellow',
    stories: [
      {
        title: 'Simple Tool Builder',
        path: 'Tools System/Simple Campus Builder',
        description: 'UB-specific tool creation and deployment system'
      },
      {
        title: 'Tools Dashboard',
        path: '08-Live-Frontend/Tools System',
        description: 'Tool discovery, management, and marketplace'
      },
      {
        title: 'Builder Portfolio',
        path: 'Profile System/Profile Components/Builder Portfolio',
        description: 'Personal tool showcase and achievements'
      }
    ]
  },
  {
    id: 'mobile',
    title: '📱 Mobile System',
    description: 'Touch-optimized campus experience with haptic feedback',
    color: 'green',
    stories: [
      {
        title: 'UB Mobile Touch Optimization',
        path: 'Mobile System/UB Touch Optimization',
        description: 'Complete mobile interface with haptic feedback and gestures'
      },
      {
        title: 'Mobile Navigation',
        path: 'Navigation System/Mobile Navigation',
        description: 'Bottom tab navigation with touch optimization'
      },
      {
        title: 'Mobile Experiences',
        path: '15-Live-Frontend/Mobile Specific Components',
        description: 'Campus scenario-based mobile workflows'
      }
    ]
  },
  {
    id: 'admin',
    title: '🛡️ Admin System',
    description: 'Campus platform management and oversight tools',
    color: 'red',
    stories: [
      {
        title: 'UB Admin Dashboard',
        path: 'Admin System/UB Campus Admin Dashboard',
        description: 'Complete campus management and moderation tools'
      },
      {
        title: 'Admin Analytics',
        path: '13-Live-Frontend/Admin Dashboard',
        description: 'Platform metrics and system health monitoring'
      }
    ]
  },
  {
    id: 'foundation',
    title: '⚛️ Atomic Design',
    description: 'Foundation components and design system building blocks',
    color: 'gray',
    stories: [
      {
        title: 'Design Tokens',
        path: '00-Foundation/Design Tokens',
        description: 'Complete HIVE brand system tokens and variables'
      },
      {
        title: 'Core Atoms',
        path: '02-Atoms/Core Components',
        description: 'Buttons, inputs, avatars, badges, and basic elements'
      },
      {
        title: 'Combined Molecules',
        path: '03-Molecules/Combined Components',
        description: 'Forms, cards, navigation items, and component groups'
      },
      {
        title: 'Complex Organisms',
        path: '04-Organisms/Complex Systems',
        description: 'Dashboards, feeds, directories, and complete interfaces'
      }
    ]
  },
  {
    id: 'auth',
    title: '🔐 Authentication',
    description: 'Enhanced UB authentication and onboarding flows',
    color: 'indigo',
    stories: [
      {
        title: 'Enhanced Auth Flow',
        path: 'Authentication System/Enhanced Auth Flow',
        description: 'Premium auth experience with liquid metal design'
      },
      {
        title: 'Enhanced Onboarding',
        path: 'Authentication System/Enhanced Onboarding Wizard',
        description: 'Sophisticated 8-step UB student onboarding'
      },
      {
        title: 'Live Auth System',
        path: '12-Live-Frontend/Auth & Onboarding',
        description: 'Production authentication and user flows'
      }
    ]
  }
];

// =============================================================================
// NAVIGATION COMPONENT
// =============================================================================

const SystemNavigation = () => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
      purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20',
      yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/20',
      green: 'from-green-500/20 to-green-600/10 border-green-500/20',
      red: 'from-red-500/20 to-red-600/10 border-red-500/20',
      gray: 'from-gray-500/20 to-gray-600/10 border-gray-500/20',
      indigo: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/20'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      yellow: 'text-yellow-400',
      green: 'text-green-400',
      red: 'text-red-400',
      gray: 'text-gray-400',
      indigo: 'text-indigo-400'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] bg-clip-text text-transparent">
            🏠 HIVE System Navigation
          </h1>
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8">
            Complete interactive documentation for the University at Buffalo campus platform
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">7</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Core Systems</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">150+</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Components</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">50+</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Interactive Stories</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Mobile Optimized</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {systemCategories.map((category) => (
            <Card 
              key={category.id} 
              className={`border-2 bg-gradient-to-br ${getColorClasses(category.color)} hover:scale-[1.02] transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-[var(--hive-background-primary)] ${getIconColor(category.color)}`}>
                    {category.id === 'spaces' && <Building2 className="w-6 h-6" />}
                    {category.id === 'profile' && <Users className="w-6 h-6" />}
                    {category.id === 'tools' && <Zap className="w-6 h-6" />}
                    {category.id === 'mobile' && <Smartphone className="w-6 h-6" />}
                    {category.id === 'admin' && <Shield className="w-6 h-6" />}
                    {category.id === 'foundation' && <Layers className="w-6 h-6" />}
                    {category.id === 'auth' && <GraduationCap className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[var(--hive-text-primary)]">{category.title}</div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">{category.description}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.stories.map((story, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] hover:border-[var(--hive-brand-primary)] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)] transition-colors">
                          {story.title}
                        </div>
                        <div className="text-sm text-[var(--hive-text-secondary)] mt-1">
                          {story.description}
                        </div>
                        <div className="text-xs text-[var(--hive-text-tertiary)] mt-1 font-mono">
                          {story.path}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-brand-primary)] transition-colors" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                <Eye className="w-5 h-5" />
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Layout className="w-4 h-4 mr-2" />
                Complete Spaces System
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Profile Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Experience
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                <Activity className="w-5 h-5" />
                Popular Stories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">UB Campus Templates</span>
                <Badge variant="secondary">New</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mobile Touch Optimization</span>
                <Badge variant="secondary">Updated</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enhanced Auth Flow</span>
                <Badge variant="secondary">Interactive</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                <Globe className="w-5 h-5" />
                System Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--hive-text-secondary)]">Platform</span>
                <span className="text-[var(--hive-text-primary)]">HIVE vBETA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--hive-text-secondary)]">University</span>
                <span className="text-[var(--hive-text-primary)]">Buffalo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--hive-text-secondary)]">Components</span>
                <span className="text-[var(--hive-text-primary)]">150+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--hive-text-secondary)]">Stories</span>
                <span className="text-[var(--hive-text-primary)]">50+</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-[var(--hive-border-default)]">
          <p className="text-[var(--hive-text-secondary)]">
            Complete interactive documentation for the HIVE campus platform • University at Buffalo vBETA
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const CompleteSystemNavigation: Story = {
  render: () => <SystemNavigation />,
  parameters: {
    docs: {
      description: {
        story: 'Master navigation index for the entire HIVE design system with direct links to every interactive story and component documentation.'
      }
    }
  }
};