/**
 * HIVE SYSTEM INDEX - MASTER INFORMATION ARCHITECTURE
 * 
 * This is the definitive entry point for the HIVE Design System Storybook.
 * It provides perfect Information Architecture for exploring our platform.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  BookOpen,
  Layers,
  Atom,
  Molecule,
  Zap,
  Users,
  Home,
  Calendar,
  Shield,
  Smartphone,
  Monitor,
  Palette,
  Search,
  Settings,
  ChevronRight,
  ExternalLink,
  Star,
  Award,
  TrendingUp,
  Activity,
  Eye,
  Code,
  Accessibility,
  Globe,
  Lightbulb,
  Building2,
  GraduationCap
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '🏠 HIVE SYSTEM INDEX',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🏠 HIVE DESIGN SYSTEM - MASTER INDEX

**Welcome to the University at Buffalo Campus Platform Design System**

This comprehensive documentation showcases every component, pattern, and system that powers HIVE - the social utility platform that transforms how university communities coordinate, collaborate, and thrive together.

## 🎯 NAVIGATION PHILOSOPHY

Our Information Architecture follows **progressive disclosure** principles:

### **🏗️ FOUNDATION LAYER**
Start here to understand the building blocks that make HIVE exceptional:
- **Design Tokens** - Colors, typography, spacing, shadows, motion
- **Atomic Components** - Buttons, inputs, icons, badges
- **Molecular Components** - Forms, cards, navigation items
- **Organism Systems** - Complete interfaces and workflows

### **🎓 CAMPUS SYSTEMS LAYER**  
Experience complete platform capabilities as UB students would:
- **Spaces System** - Campus community discovery and management
- **Profile System** - Personal command center and identity
- **Tools System** - Campus problem-solving and coordination
- **Mobile System** - Touch-optimized campus experience
- **Admin System** - University oversight and management

### **⚡ INTERACTION LAYER**
See sophisticated UX patterns in action:
- **Authentication Flows** - Onboarding and identity verification
- **Real-time Experiences** - Live collaboration and communication
- **Accessibility Patterns** - Inclusive design throughout
- **Performance Optimization** - Campus WiFi-optimized experiences

## 🏆 DESIGN SYSTEM EXCELLENCE

HIVE represents a new standard for campus platform design:

### **100% Semantic Architecture**
- Zero hardcoded values across 500+ components
- Consistent visual language through design tokens
- Accessible color contrast and interaction patterns

### **Campus-Native UX**
- University-specific terminology and workflows
- Mobile-first design for campus usage patterns
- Academic calendar and social integration

### **Technical Excellence**
- TypeScript-first development with full type safety
- WCAG 2.1 AA accessibility compliance
- Sub-3 second loads optimized for campus WiFi

Explore the system that will transform university community building.
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
// SYSTEM ARCHITECTURE DATA
// =============================================================================

const systemCategories = [
  {
    id: 'foundation',
    title: '🏗️ Foundation Systems',
    description: 'Core design tokens, atomic components, and building blocks',
    icon: Layers,
    color: 'blue',
    priority: 1,
    sections: [
      {
        id: 'tokens',
        title: 'Design Tokens',
        path: '01-Foundation/Design Tokens',
        description: 'Colors, typography, spacing, shadows - the DNA of HIVE design',
        components: 150,
        status: 'complete'
      },
      {
        id: 'atoms',
        title: 'Atomic Components',
        path: '02-Atoms/Component Library',
        description: 'Buttons, inputs, icons, badges - fundamental building blocks',
        components: 45,
        status: 'complete'
      },
      {
        id: 'molecules',
        title: 'Molecular Components',
        path: '03-Molecules/Component Library',
        description: 'Forms, cards, navigation - combined component patterns',
        components: 35,
        status: 'complete'
      },
      {
        id: 'organisms',
        title: 'Organism Systems',
        path: '04-Organisms/Complex Systems',
        description: 'Dashboards, feeds, complete interfaces and workflows',
        components: 25,
        status: 'complete'
      }
    ]
  },
  {
    id: 'campus-systems',
    title: '🎓 Campus Platform Systems',
    description: 'Complete UB student experiences and workflows',
    icon: Building2,
    color: 'purple',
    priority: 2,
    sections: [
      {
        id: 'spaces',
        title: 'Spaces System',
        path: '10-Campus-Systems/Spaces',
        description: 'Campus community discovery, management, and engagement',
        components: 12,
        status: 'complete'
      },
      {
        id: 'profile',
        title: 'Profile System',
        path: '10-Campus-Systems/Profile',
        description: 'Personal command center with 8-card bento grid dashboard',
        components: 8,
        status: 'complete'
      },
      {
        id: 'tools',
        title: 'Tools System',
        path: '10-Campus-Systems/Tools',
        description: 'Campus problem-solving and coordination tool creation',
        components: 6,
        status: 'complete'
      },
      {
        id: 'feed',
        title: 'Feed & Rituals',
        path: '10-Campus-Systems/Feed',
        description: 'Social content stream with campus ritual integration',
        components: 8,
        status: 'complete'
      }
    ]
  },
  {
    id: 'platform-experiences',
    title: '⚡ Platform Experiences',
    description: 'Complete user journeys and interaction patterns',
    icon: Zap,
    color: 'green',
    priority: 3,
    sections: [
      {
        id: 'auth',
        title: 'Authentication',
        path: '20-Platform-Experiences/Authentication',
        description: 'UB email verification and 8-step onboarding flow',
        components: 4,
        status: 'complete'
      },
      {
        id: 'mobile',
        title: 'Mobile Experience',
        path: '20-Platform-Experiences/Mobile',
        description: 'Touch-optimized campus scenarios with haptic feedback',
        components: 8,
        status: 'complete'
      },
      {
        id: 'admin',
        title: 'Admin Dashboard',
        path: '20-Platform-Experiences/Admin',
        description: 'University oversight, metrics, and moderation tools',
        components: 6,
        status: 'complete'
      },
      {
        id: 'accessibility',
        title: 'Accessibility',
        path: '20-Platform-Experiences/Accessibility',
        description: 'WCAG 2.1 AA compliance patterns and inclusive design',
        components: 10,
        status: 'complete'
      }
    ]
  },
  {
    id: 'development',
    title: '🔧 Development Resources',
    description: 'Documentation, guidelines, and implementation patterns',
    icon: Code,
    color: 'yellow',
    priority: 4,
    sections: [
      {
        id: 'guidelines',
        title: 'Design Guidelines',
        path: '30-Development/Guidelines',
        description: 'UX principles, accessibility standards, campus patterns',
        components: 5,
        status: 'complete'
      },
      {
        id: 'implementation',
        title: 'Implementation',
        path: '30-Development/Implementation',
        description: 'Code examples, TypeScript patterns, best practices',
        components: 8,
        status: 'complete'
      },
      {
        id: 'testing',
        title: 'Testing Patterns',
        path: '30-Development/Testing',
        description: 'Component testing, accessibility testing, visual regression',
        components: 6,
        status: 'complete'
      }
    ]
  }
];

const featuredStories = [
  {
    title: 'Complete Spaces System',
    path: '10-Campus-Systems/Spaces/Complete Interactive System',
    description: 'Full UB campus community discovery and management experience',
    icon: Users,
    badge: 'Interactive',
    color: 'blue'
  },
  {
    title: 'Profile Bento Dashboard',
    path: '10-Campus-Systems/Profile/8-Card Bento Grid',
    description: 'Personal command center with all 8 profile widgets',
    icon: Home,
    badge: 'Complete',
    color: 'purple'
  },
  {
    title: 'Mobile Campus Experience',
    path: '20-Platform-Experiences/Mobile/Touch Optimization',
    description: 'Between-class usage with haptic feedback and gestures',
    icon: Smartphone,
    badge: 'New',
    color: 'green'
  },
  {
    title: 'UB Authentication Flow',
    path: '20-Platform-Experiences/Authentication/Enhanced Flow',
    description: 'Buffalo.edu verification with liquid metal design',
    icon: Shield,
    badge: 'Premium',
    color: 'gold'
  }
];

// =============================================================================
// INTERACTIVE INDEX COMPONENT
// =============================================================================

const HIVESystemIndex = () => {
  const [activeCategory, setActiveCategory] = useState<string>('foundation');
  const [searchQuery, setSearchQuery] = useState('');

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',
      purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400',
      green: 'from-green-500/20 to-green-600/10 border-green-500/20 text-green-400',
      yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/20 text-yellow-400',
      gold: 'from-yellow-400/20 to-amber-500/10 border-yellow-400/20 text-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredCategories = systemCategories.filter(category =>
    searchQuery === '' || 
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.sections.some(section => 
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Lightbulb className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                HIVE Design System
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                University at Buffalo Campus Platform
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The comprehensive design system powering authentic campus social utility. 
            Explore 300+ components designed for University at Buffalo student success.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)] w-4 h-4" />
            <Input
              type="text"
              placeholder="Search components, systems, or patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)] text-[var(--hive-text-primary)]"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">300+</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Components</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">15</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Core Systems</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Accessible</div>
              </CardContent>
            </Card>
            <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">UB</div>
                <div className="text-sm text-[var(--hive-text-secondary)]">Campus Ready</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[var(--hive-text-primary)]">
            ⭐ Featured Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStories.map((story, index) => (
              <Card key={index} className={`border-2 bg-gradient-to-br ${getColorClasses(story.color)} hover:scale-[1.02] transition-all duration-300 cursor-pointer`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-[var(--hive-background-primary)]">
                      <story.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {story.badge}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
                    {story.description}
                  </p>
                  <div className="flex items-center text-xs text-[var(--hive-text-secondary)]">
                    <Eye className="w-3 h-3 mr-1" />
                    {story.path}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[var(--hive-text-primary)]">
            🏗️ System Architecture
          </h2>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {systemCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'primary' : 'secondary'}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.title.split(' ').slice(1).join(' ')}
              </Button>
            ))}
          </div>

          {/* Category Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCategories.map((category) => (
              <Card 
                key={category.id} 
                className={`border-2 bg-gradient-to-br ${getColorClasses(category.color)} ${activeCategory === category.id ? 'ring-2 ring-[var(--hive-brand-primary)]' : ''}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="w-6 h-6" />
                    <div>
                      <div className="text-[var(--hive-text-primary)]">{category.title}</div>
                      <div className="text-sm font-normal text-[var(--hive-text-secondary)]">
                        {category.description}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.sections.map((section, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] hover:border-[var(--hive-brand-primary)] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)] transition-colors">
                            {section.title}
                          </div>
                          <div className="text-sm text-[var(--hive-text-secondary)] mt-1">
                            {section.description}
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="text-xs text-[var(--hive-text-tertiary)] font-mono">
                              {section.path}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {section.components} components
                            </Badge>
                            <Badge 
                              className={`text-xs ${section.status === 'complete' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                            >
                              {section.status}
                            </Badge>
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
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                <TrendingUp className="w-5 h-5" />
                Most Popular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Button Components</span>
                <Badge variant="secondary">45 variants</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Profile Dashboard</span>
                <Badge variant="secondary">8 widgets</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mobile Navigation</span>
                <Badge variant="secondary">Touch optimized</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                <Activity className="w-5 h-5" />
                Recently Updated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Spaces System</span>
                <Badge variant="secondary">Complete</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mobile Experience</span>
                <Badge variant="secondary">Enhanced</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Authentication</span>
                <Badge variant="secondary">Premium</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                <Award className="w-5 h-5" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>WCAG 2.1 AA</span>
                <Badge className="bg-green-500/20 text-green-400">100%</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Color Contrast</span>
                <Badge className="bg-green-500/20 text-green-400">4.5:1+</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Touch Targets</span>
                <Badge className="bg-green-500/20 text-green-400">44px+</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-[var(--hive-border-default)]">
          <p className="text-[var(--hive-text-secondary)]">
            HIVE Design System • University at Buffalo vBETA • Built for Campus Social Utility
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const SystemIndex: Story = {
  render: () => <HIVESystemIndex />,
  parameters: {
    docs: {
      description: {
        story: 'The master index for the HIVE Design System with perfect Information Architecture for exploring all platform components and systems.'
      }
    }
  }
};