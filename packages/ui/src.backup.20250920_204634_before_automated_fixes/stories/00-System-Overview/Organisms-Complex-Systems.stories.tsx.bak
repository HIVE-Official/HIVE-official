/**
 * ORGANISM COMPLEX SYSTEMS - COMPLETE INTERFACE PATTERNS
 * 
 * This story showcases all organism components that represent complete
 * campus interface systems and sophisticated workflows.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Label } from '../../components/ui/label';
import { 
  Building2,
  Search,
  Settings,
  Filter,
  Users,
  Calendar,
  BookOpen,
  Home,
  GraduationCap,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Bell,
  MessageCircle,
  Share2,
  MoreHorizontal,
  User,
  Shield,
  Award,
  Activity,
  TrendingUp,
  Eye,
  Heart,
  Menu,
  Grid3X3,
  Layout,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  Smartphone,
  Monitor,
  Tablet,
  Navigation,
  Layers,
  Command
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '🦠 04-Organisms/Complex Systems',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🦠 Organism Complex Systems - HIVE Complete Interface Patterns

**Sophisticated campus platform workflows and complete system interfaces**

Our organism components represent the most sophisticated level of our design system - complete interface systems that deliver full campus experiences. Each organism combines multiple molecules and atoms into comprehensive workflows optimized for University at Buffalo scenarios.

## 🔬 ORGANISM DESIGN PHILOSOPHY

### **Complete Campus Systems**
Every organism delivers complete functionality for real campus scenarios:
- **Navigation Systems** - Full campus wayfinding with context-aware routing
- **Content Systems** - Complete information architecture for campus content
- **Form Systems** - End-to-end workflows for campus data and coordination
- **Data Systems** - Campus analytics, metrics, and information management

### **Sophisticated Interaction Patterns**
- **Multi-Step Workflows** - Complex campus processes broken into manageable steps
- **Real-Time Integration** - Live updates, notifications, and collaborative features
- **Context Awareness** - Campus location, academic calendar, and student status integration
- **Progressive Enhancement** - Works perfectly on any device or connection quality

## 🎯 ORGANISM CATEGORIES

### **🧭 Navigation Systems**
Complete campus navigation and wayfinding:
- **Desktop Sidebar** - Full navigation hierarchy with space notifications
- **Mobile Bottom Navigation** - Touch-optimized tabs for campus usage
- **Header Systems** - Brand, search, user menu with campus context
- **Breadcrumb Systems** - Complex navigation paths for deep workflows

### **📋 Content Systems** 
Comprehensive campus content management:
- **Feed Systems** - Social content streams with campus rituals integration
- **Dashboard Layouts** - Analytics overview with campus metrics
- **Directory Systems** - Space browsing with UB-specific filtering
- **Gallery Systems** - Photo sharing and tool showcases

### **📝 Form Systems**
Complete campus workflow management:
- **Authentication Systems** - UB email verification and onboarding
- **Profile Management** - Complete identity and preference workflows
- **Space Creation** - New community setup with UB templates
- **Tool Builder** - Campus utility creation system

### **📊 Data Systems**
Campus information architecture:
- **Table Systems** - Member lists, tool directories, analytics
- **Chart Systems** - Engagement metrics, campus activity analytics
- **Calendar Systems** - Events, availability, academic schedule integration
- **Map Systems** - Campus locations, space discovery, routing

## 📱 CAMPUS OPTIMIZATION STANDARDS

Every organism system designed for authentic university usage:

### **Academic Integration (Semester System)**
- **Calendar Awareness** - Finals weeks, breaks, academic deadlines
- **Course Integration** - Class schedules, study group coordination
- **Housing Context** - Dorm communities, off-campus coordination
- **Club Integration** - Student organizations, Greek life, athletics

### **Campus Social Dynamics**
- **Social Proof** - Activity indicators, member counts, engagement metrics
- **FOMO Creation** - Event highlights, space activity, trending content
- **Viral Mechanics** - Easy sharing, invitation flows, referral systems
- **Community Building** - Tools for authentic relationship formation

### **Mobile Campus Scenarios**
- **Walking Between Classes** - Quick interactions, glanceable information
- **Study Sessions** - Deep engagement, collaboration tools, focus modes
- **Social Events** - Photo sharing, coordination, real-time updates
- **Academic Work** - Tool creation, project collaboration, resource sharing

## 🏆 TECHNICAL EXCELLENCE STANDARDS

### **Performance Optimization**
- **Sub-3 Second Loads** - Optimized for campus WiFi conditions
- **Progressive Enhancement** - Core functionality works on any device
- **Efficient Rendering** - Large datasets optimized for mobile performance
- **Intelligent Caching** - Repeated visits load instantly

### **Accessibility Compliance**
- **WCAG 2.1 AA** - Full compliance across all interactive elements
- **Screen Reader Optimization** - Complete navigation and content access
- **Keyboard Navigation** - Every action accessible without mouse
- **High Contrast Support** - Visual accessibility across all components

### **Campus Security**
- **UB Email Verification** - Buffalo.edu domain validation throughout
- **Privacy Controls** - Student data protection and visibility management
- **Content Moderation** - Community safety and platform quality
- **Secure Authentication** - Session management and access control
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
// ORGANISM COMPONENT CATEGORIES
// =============================================================================

const organismCategories = [
  {
    id: 'navigation',
    title: '🧭 Navigation Systems',
    description: 'Complete campus wayfinding and app navigation',
    icon: Navigation,
    color: 'blue',
    components: [
      {
        name: 'Desktop Sidebar',
        description: 'Full navigation hierarchy with space notifications',
        path: '04-Organisms/Desktop Sidebar',
        usage: 'Primary desktop navigation, space quick access',
        complexity: 'High',
        status: 'complete'
      },
      {
        name: 'Mobile Bottom Navigation',
        description: 'Touch-optimized tab system with haptic feedback',
        path: '04-Organisms/Mobile Navigation',
        usage: 'Primary mobile navigation, thumb-reachable actions',
        complexity: 'Medium',
        status: 'complete'
      },
      {
        name: 'Header Systems',
        description: 'Brand, search, notifications, user menu',
        path: '04-Organisms/Header Systems',
        usage: 'Global app header, search interface, user account',
        complexity: 'Medium',
        status: 'complete'
      },
      {
        name: 'Breadcrumb Systems',
        description: 'Complex navigation paths for deep workflows',
        path: '04-Organisms/Breadcrumb Systems',
        usage: 'Admin panels, multi-step forms, deep navigation',
        complexity: 'Low',
        status: 'complete'
      }
    ]
  },
  {
    id: 'content',
    title: '📋 Content Systems',
    description: 'Complete campus content management interfaces',
    icon: BookOpen,
    color: 'green',
    components: [
      {
        name: 'Feed Systems',
        description: 'Real-time campus social content with filtering',
        path: '04-Organisms/Feed Systems',
        usage: 'Main social feed, space feeds, campus activity streams',
        complexity: 'High',
        status: 'complete'
      },
      {
        name: 'Dashboard Layouts',
        description: 'Analytics overview with campus metrics',
        path: '04-Organisms/Dashboard Layouts',
        usage: 'Profile dashboard, admin overview, space analytics',
        complexity: 'High',
        status: 'complete'
      },
      {
        name: 'Directory Systems',
        description: 'Space browsing with UB-specific filtering',
        path: '04-Organisms/Directory Systems',
        usage: 'Space discovery, student directory, tool marketplace',
        complexity: 'Medium',
        status: 'complete'
      },
      {
        name: 'Gallery Systems',
        description: 'Photo sharing and tool showcases',
        path: '04-Organisms/Gallery Systems',
        usage: 'Space photos, tool portfolios, event galleries',
        complexity: 'Medium',
        status: 'complete'
      }
    ]
  },
  {
    id: 'forms',
    title: '📝 Form Systems',
    description: 'Complete campus workflow management',
    icon: Settings,
    color: 'purple',
    components: [
      {
        name: 'Authentication Systems',
        description: 'UB email verification and onboarding',
        path: '04-Organisms/Authentication Systems',
        usage: 'Login, registration, 8-step onboarding flow',
        complexity: 'High',
        status: 'complete'
      },
      {
        name: 'Profile Management',
        description: 'Complete identity and preference workflows',
        path: '04-Organisms/Profile Management',
        usage: 'Profile editing, privacy settings, academic info',
        complexity: 'Medium',
        status: 'complete'
      },
      {
        name: 'Space Creation',
        description: 'New community setup with UB templates',
        path: '04-Organisms/Space Creation',
        usage: 'Create spaces, dorm communities, study groups',
        complexity: 'Medium',
        status: 'complete'
      },
      {
        name: 'Tool Builder',
        description: 'Campus utility creation system',
        path: '04-Organisms/Tool Builder',
        usage: 'Create tools, forms, coordination utilities',
        complexity: 'High',
        status: 'complete'
      }
    ]
  },
  {
    id: 'data',
    title: '📊 Data Systems',
    description: 'Campus information architecture',
    icon: BarChart3,
    color: 'gold',
    components: [
      {
        name: 'Table Systems',
        description: 'Member lists, tool directories, analytics',
        path: '04-Organisms/Table Systems',
        usage: 'Member management, tool browsing, data display',
        complexity: 'Medium',
        status: 'complete'
      },
      {
        name: 'Chart Systems',
        description: 'Engagement metrics, campus activity analytics',
        path: '04-Organisms/Chart Systems',
        usage: 'Space analytics, tool performance, user insights',
        complexity: 'Medium',
        status: 'complete'
      },
      {
        name: 'Calendar Systems',
        description: 'Events, availability, academic schedule integration',
        path: '04-Organisms/Calendar Systems',
        usage: 'Event management, scheduling, academic calendar',
        complexity: 'High',
        status: 'complete'
      },
      {
        name: 'Map Systems',
        description: 'Campus locations, space discovery, routing',
        path: '04-Organisms/Map Systems',
        usage: 'Campus navigation, space locations, event venues',
        complexity: 'High',
        status: 'complete'
      }
    ]
  }
];

// =============================================================================
// INTERACTIVE SHOWCASE EXAMPLES
// =============================================================================

const NavigationSystemShowcase = () => {
  const [activeTab, setActiveTab] = useState('desktop');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Navigation Systems
      </h3>
      
      {/* Navigation Type Selector */}
      <div className="flex flex-wrap gap-2">
        {['desktop', 'mobile', 'header'].map((type) => (
          <Button
            key={type}
            variant={activeTab === type ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab(type)}
            className="capitalize"
          >
            {type === 'desktop' ? <Monitor className="w-4 h-4 mr-1" /> :
             type === 'mobile' ? <Smartphone className="w-4 h-4 mr-1" /> :
             <Menu className="w-4 h-4 mr-1" />}
            {type}
          </Button>
        ))}
      </div>

      {/* Desktop Sidebar Example */}
      {activeTab === 'desktop' && (
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardContent className="p-6">
            <div className="flex">
              {/* Sidebar */}
              <div className="w-64 bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)] p-4 space-y-3">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[var(--hive-brand-primary)]"></div>
                  <span className="font-semibold text-[var(--hive-text-primary)]">HIVE</span>
                </div>
                
                {[
                  { icon: Home, label: 'Dashboard', badge: null },
                  { icon: Users, label: 'Spaces', badge: '3' },
                  { icon: Calendar, label: 'Events', badge: '12' },
                  { icon: BookOpen, label: 'Tools', badge: null },
                  { icon: User, label: 'Profile', badge: null }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--hive-background-secondary)] cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-brand-primary)]" />
                      <span className="text-sm text-[var(--hive-text-primary)]">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 p-6">
                <div className="text-sm text-[var(--hive-text-secondary)] mb-2">Navigation Example</div>
                <div className="text-lg font-medium text-[var(--hive-text-primary)]">Desktop Sidebar Navigation</div>
                <div className="text-sm text-[var(--hive-text-secondary)] mt-2">
                  Full navigation hierarchy with space notifications and quick access to all campus features.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile Navigation Example */}
      {activeTab === 'mobile' && (
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardContent className="p-6">
            <div className="max-w-sm mx-auto">
              {/* Mobile Screen */}
              <div className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-xl overflow-hidden">
                {/* Content Area */}
                <div className="h-64 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">Mobile Content</div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">
                      Touch-optimized interface with thumb-reachable navigation
                    </div>
                  </div>
                </div>
                
                {/* Bottom Navigation */}
                <div className="bg-[var(--hive-background-secondary)] border-t border-[var(--hive-border-default)] p-2">
                  <div className="flex justify-around">
                    {[
                      { icon: Home, label: 'Home', active: true },
                      { icon: Users, label: 'Spaces', active: false },
                      { icon: Calendar, label: 'Events', active: false },
                      { icon: BookOpen, label: 'Tools', active: false },
                      { icon: User, label: 'Profile', active: false }
                    ].map((item, index) => (
                      <div key={index} className={`flex flex-col items-center gap-1 p-2 rounded-lg ${item.active ? 'text-[var(--hive-brand-primary)]' : 'text-[var(--hive-text-secondary)]'}`}>
                        <item.icon className="w-5 h-5" />
                        <span className="text-xs">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header System Example */}
      {activeTab === 'header' && (
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg">
                {/* Brand */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--hive-brand-primary)]"></div>
                  <span className="font-semibold text-[var(--hive-text-primary)]">HIVE</span>
                </div>
                
                {/* Search */}
                <div className="flex-1 max-w-md mx-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)] w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search spaces, students, tools..."
                      className="pl-10 bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]"
                    />
                  </div>
                </div>
                
                {/* User Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-4 h-4" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)] text-xs">
                        SC
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-[var(--hive-text-secondary)]">Header System Example</div>
                <div className="text-lg font-medium text-[var(--hive-text-primary)]">Global Navigation Header</div>
                <div className="text-sm text-[var(--hive-text-secondary)] mt-1">
                  Brand identity, campus search, notifications, and user menu in one cohesive system.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const DashboardSystemShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Dashboard Systems
      </h3>
      
      {/* Profile Bento Grid Example */}
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Grid3X3 className="w-5 h-5" />
            Profile Bento Grid Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Avatar', icon: User, color: 'blue' },
              { name: 'Calendar', icon: Calendar, color: 'green' },
              { name: 'Tools', icon: BookOpen, color: 'purple' },
              { name: 'Spaces', icon: Users, color: 'yellow' },
              { name: 'Activity', icon: Activity, color: 'red' },
              { name: 'Ghost Mode', icon: Shield, color: 'gray' },
              { name: 'HiveLab', icon: Star, color: 'gold' },
              { name: 'Stats', icon: BarChart3, color: 'indigo' }
            ].map((widget, index) => (
              <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-primary)] hover:border-[var(--hive-brand-primary)] transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <widget.icon className="w-4 h-4 text-[var(--hive-text-secondary)]" />
                    <span className="text-sm font-medium text-[var(--hive-text-primary)]">{widget.name}</span>
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)]">
                    Campus {widget.name.toLowerCase()} management
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-sm text-[var(--hive-text-secondary)] text-center">
            8-card personal command center with campus life coordination
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ComplexSystemsShowcase = () => {
  return (
    <div className="space-y-8">
      <NavigationSystemShowcase />
      <DashboardSystemShowcase />
    </div>
  );
};

// =============================================================================
// ORGANISM SYSTEMS LIBRARY COMPONENT
// =============================================================================

const OrganismSystemsLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('navigation');
  const [searchQuery, setSearchQuery] = useState('');

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',
      green: 'from-green-500/20 to-green-600/10 border-green-500/20 text-green-400',
      purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400',
      gold: 'from-yellow-400/20 to-amber-500/10 border-yellow-400/20 text-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getComplexityColor = (complexity: string) => {
    const colors = {
      Low: 'bg-green-500/20 text-green-400',
      Medium: 'bg-yellow-500/20 text-yellow-400',
      High: 'bg-red-500/20 text-red-400'
    };
    return colors[complexity as keyof typeof colors] || colors.Medium;
  };

  const filteredCategories = organismCategories.filter(category =>
    searchQuery === '' ||
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.components.some(comp => 
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Building2 className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Organism Systems
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                HIVE Complete Interface Patterns
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            Sophisticated interface systems that combine multiple components into complete campus workflows. 
            Each organism delivers full-featured University at Buffalo experiences.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)] w-4 h-4" />
            <Input
              type="text"
              placeholder="Search organism systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]"
            />
          </div>
        </div>

        {/* Interactive Showcases */}
        <div className="mb-12">
          <ComplexSystemsShowcase />
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {organismCategories.map((category) => (
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

        {/* Component Categories */}
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
                {category.components.map((component, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] hover:border-[var(--hive-brand-primary)] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)] transition-colors">
                          {component.name}
                        </div>
                        <div className="text-sm text-[var(--hive-text-secondary)] mt-1">
                          {component.description}
                        </div>
                        <div className="text-xs text-[var(--hive-text-muted)] mt-2">
                          Usage: {component.usage}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            className={`text-xs ${getComplexityColor(component.complexity)}`}
                          >
                            {component.complexity} Complexity
                          </Badge>
                          <Badge 
                            className={`text-xs ${component.status === 'complete' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                          >
                            {component.status}
                          </Badge>
                          <div className="text-xs text-[var(--hive-text-tertiary)] font-mono">
                            {component.path}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campus Integration Examples */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <GraduationCap className="w-5 h-5" />
              University at Buffalo Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Academic Integration</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Semester schedule awareness in all calendar systems
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Course-aware tool creation and study group coordination
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Finals week and academic deadline integration
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Campus Community</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Residential life integration with dorm floor communities
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Campus location awareness with North/South campus context
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      UB traditions and cultural integration throughout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const CompleteOrganismLibrary: Story = {
  render: () => <OrganismSystemsLibrary />,
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all organism systems in the HIVE design system with University at Buffalo campus integration and interactive examples.'
      }
    }
  }
};

export const NavigationSystems: Story = {
  render: () => <NavigationSystemShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus navigation systems including desktop sidebar, mobile navigation, and header systems with UB context.'
      }
    }
  }
};

export const DashboardSystems: Story = {
  render: () => <DashboardSystemShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus dashboard systems featuring the 8-card bento grid profile dashboard and admin interfaces.'
      }
    }
  }
};

export const ComplexInterfaces: Story = {
  render: () => <ComplexSystemsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive showcase of complex organism systems with campus scenarios and multi-device examples.'
      }
    }
  }
};