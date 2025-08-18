/**
 * MOLECULAR COMPONENTS LIBRARY - COMBINED COMPONENT PATTERNS
 * 
 * This story showcases all molecular components that combine atomic elements
 * into meaningful campus-focused interaction patterns.
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
  Molecule,
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
  ChatBubbleLeftEllipsisIcon
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '🧬 03-Molecules/Component Library',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🧬 Molecular Components Library - HIVE Combined Patterns

**Campus-focused component combinations with sophisticated interaction patterns**

Our molecular components represent the intelligent combination of atomic elements into meaningful campus interaction patterns. Each molecule is designed for authentic University at Buffalo usage scenarios with built-in accessibility and mobile optimization.

## 🔬 MOLECULAR DESIGN PHILOSOPHY

### **Campus Pattern Integration**
Every molecule reflects real campus coordination scenarios:
- **Form Components** - UB email validation, academic info collection, privacy settings
- **Navigation Elements** - Campus-aware routing with space notifications and quick actions
- **Content Cards** - Student identity, space previews, event coordination, tool showcases
- **Interactive Elements** - Touch-optimized campus social patterns

### **Sophisticated Interaction Patterns**
- **Progressive Disclosure** - Show relevant information at the right interaction depth
- **Contextual Actions** - Campus-specific functionality based on user state and location
- **Social Proof Integration** - Member counts, activity indicators, engagement metrics
- **Mobile-First Touch Patterns** - Optimized for one-handed use while walking to class

## 🎯 MOLECULAR CATEGORIES

### **📝 Form Components**
Intelligent form patterns that make campus data entry effortless:
- **Enhanced Form Fields** - Label, input, validation with UB-specific patterns
- **Campus Search Bars** - Smart discovery for spaces, tools, students, events
- **Filter Controls** - Category selection, date ranges, major filters, housing options
- **Preference Sections** - Privacy settings, notification controls, availability status

### **🧭 Navigation Components** 
Campus-aware navigation that adapts to student context:
- **Smart Navigation Items** - Route awareness with badge notifications and quick actions
- **Contextual Menus** - Space-specific actions, tool options, profile controls
- **Tab Groups** - Content switching with space feeds, profile sections, tool categories
- **Breadcrumb Systems** - Clear navigation path for complex campus workflows

### **📄 Content Components**
Rich content display optimized for campus social utility:
- **Avatar Cards** - Student identity with major, year, housing, verification status
- **Space Preview Cards** - Community information with activity, events, member counts
- **Event Cards** - Campus calendar integration with RSVP, location, academic context
- **Tool Widget Cards** - Campus utility showcases with usage stats and sharing

### **⚡ Interactive Components**
Touch-optimized interaction patterns for campus scenarios:
- **Modal Triggers** - Context-aware actions with campus-specific content flows
- **Dropdown Menus** - Quick actions for spaces, profiles, tools, administrative functions
- **Tooltip Systems** - Contextual help, student verification, space information
- **Social Action Groups** - Like, comment, share, RSVP with campus social dynamics

## 📱 MOBILE CAMPUS OPTIMIZATION

Every molecular component designed for authentic campus usage:

### **Between-Classes Scenarios (2-5 minutes)**
- **Quick Interactions** - Single-tap actions, glanceable information
- **Swipe Patterns** - Space browsing, notification management, quick responses
- **Voice-Friendly** - Minimal typing required, smart defaults, predictive input

### **Study Break Scenarios (10-15 minutes)**
- **Deeper Engagement** - Full conversation threads, event planning, tool creation
- **Multi-Step Workflows** - Space creation, profile editing, privacy configuration
- **Content Creation** - Post composition, photo sharing, tool customization

### **Touch Optimization Standards**
- **44px+ Touch Targets** - Thumb-friendly interaction areas throughout
- **Haptic Feedback** - Native mobile feel for confirmations and state changes
- **Gesture Support** - Swipe, pinch, long press with accessible alternatives
- **Performance** - Sub-300ms response times for all interactive elements
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
// MOLECULAR COMPONENT CATEGORIES
// =============================================================================

const molecularCategories = [
  {
    id: 'forms',
    title: '📝 Form Components',
    description: 'Campus data collection and interaction patterns',
    icon: Settings,
    color: 'blue',
    components: [
      {
        name: 'Enhanced Form Fields',
        description: 'Label, input, validation with UB email patterns',
        path: '03-Molecules/Enhanced Form Fields',
        usage: 'Profile setup, space creation, academic information',
        status: 'complete'
      },
      {
        name: 'Campus Search Bars',
        description: 'Smart discovery for spaces, tools, students, events',
        path: '03-Molecules/Campus Search',
        usage: 'Content discovery, member finding, tool browsing',
        status: 'complete'
      },
      {
        name: 'Filter Controls',
        description: 'Category, date, major, housing filter systems',
        path: '03-Molecules/Filter Controls',
        usage: 'Space browsing, event filtering, student directory',
        status: 'complete'
      },
      {
        name: 'Preference Sections',
        description: 'Privacy, notifications, availability settings',
        path: '03-Molecules/Preference Controls',
        usage: 'Profile configuration, space settings, ghost mode',
        status: 'complete'
      }
    ]
  },
  {
    id: 'navigation',
    title: '🧭 Navigation Components',
    description: 'Campus-aware routing and menu systems',
    icon: ChevronRight,
    color: 'purple',
    components: [
      {
        name: 'Smart Navigation Items',
        description: 'Route awareness with badge notifications',
        path: '03-Molecules/Navigation Items',
        usage: 'Sidebar navigation, tab switching, quick actions',
        status: 'complete'
      },
      {
        name: 'Contextual Menus',
        description: 'Space actions, tool options, profile controls',
        path: '03-Molecules/Context Menus',
        usage: 'Right-click actions, mobile long-press menus',
        status: 'complete'
      },
      {
        name: 'Tab Groups',
        description: 'Content switching with badge indicators',
        path: '03-Molecules/Tab Systems',
        usage: 'Profile sections, space content, tool categories',
        status: 'complete'
      },
      {
        name: 'Breadcrumb Systems',
        description: 'Clear navigation path for complex workflows',
        path: '03-Molecules/Breadcrumbs',
        usage: 'Deep navigation, workflow progress, admin panels',
        status: 'complete'
      }
    ]
  },
  {
    id: 'content',
    title: '📄 Content Components',
    description: 'Rich campus content display patterns',
    icon: BookOpen,
    color: 'green',
    components: [
      {
        name: 'Avatar Cards',
        description: 'Student identity with major, year, verification',
        path: '03-Molecules/Avatar Cards',
        usage: 'Member lists, comment threads, profile previews',
        status: 'complete'
      },
      {
        name: 'Space Preview Cards',
        description: 'Community info with activity and member counts',
        path: '03-Molecules/Space Cards',
        usage: 'Space browsing, recommendations, directory listing',
        status: 'complete'
      },
      {
        name: 'Event Cards',
        description: 'Campus calendar with RSVP and location info',
        path: '03-Molecules/Event Cards',
        usage: 'Event browsing, calendar display, space activities',
        status: 'complete'
      },
      {
        name: 'Tool Widget Cards',
        description: 'Campus utility showcases with usage stats',
        path: '03-Molecules/Tool Widgets',
        usage: 'Tool browsing, portfolio display, sharing interface',
        status: 'complete'
      }
    ]
  },
  {
    id: 'interactive',
    title: '⚡ Interactive Components',
    description: 'Touch-optimized campus social patterns',
    icon: Star,
    color: 'gold',
    components: [
      {
        name: 'Modal Triggers',
        description: 'Context-aware actions with campus content flows',
        path: '03-Molecules/Modal Systems',
        usage: 'Space joining, tool sharing, profile editing',
        status: 'complete'
      },
      {
        name: 'Dropdown Menus',
        description: 'Quick actions for spaces, profiles, tools',
        path: '03-Molecules/Dropdown Menus',
        usage: 'Settings access, bulk actions, administrative functions',
        status: 'complete'
      },
      {
        name: 'Social Action Groups',
        description: 'Like, comment, share, RSVP with campus dynamics',
        path: '03-Molecules/Social Actions',
        usage: 'Post interactions, event responses, tool reactions',
        status: 'complete'
      },
      {
        name: 'Tooltip Systems',
        description: 'Contextual help and verification status',
        path: '03-Molecules/Tooltip Systems',
        usage: 'Feature explanations, status information, quick previews',
        status: 'complete'
      }
    ]
  }
];

// =============================================================================
// INTERACTIVE SHOWCASE EXAMPLES
// =============================================================================

const AvatarCardShowcase = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Avatar Cards
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            name: 'Sarah Chen',
            handle: '@sarah_chen_2025',
            major: 'Computer Science',
            year: 'Senior',
            housing: 'Ellicott Complex',
            status: 'online',
            verified: true
          },
          {
            name: 'Marcus Johnson',
            handle: '@marcus_j',
            major: 'Mechanical Engineering',
            year: 'Junior',
            housing: 'Governors',
            status: 'studying',
            verified: true
          },
          {
            name: 'Emma Rodriguez',
            handle: '@emma_r',
            major: 'Business Administration',
            year: 'Sophomore',
            housing: 'Creekside Village',
            status: 'away',
            verified: false
          }
        ].map((student, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-brand-primary)] transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)] font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--hive-background-secondary)] ${
                    student.status === 'online' ? 'bg-green-400' :
                    student.status === 'studying' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-[var(--hive-text-primary)] truncate">
                      {student.name}
                    </div>
                    {student.verified && (
                      <Shield className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {student.handle}
                  </div>
                  <div className="text-xs text-[var(--hive-text-muted)] mt-1">
                    {student.major} • {student.year}
                  </div>
                  <div className="text-xs text-[var(--hive-text-muted)]">
                    {student.housing}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SpacePreviewShowcase = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Space Preview Cards
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            name: 'UB CSE Study Group',
            category: 'Academic',
            members: 147,
            activity: '12 new posts today',
            description: 'Computer Science and Engineering students collaborating on projects and study sessions.',
            tags: ['CSE', 'Study Groups', 'Projects'],
            isJoined: false,
            color: 'blue'
          },
          {
            name: 'Ellicott Complex Floor 3',
            category: 'Residential',
            members: 28,
            activity: '3 events this week',
            description: 'Third floor community for coordination, events, and building friendships.',
            tags: ['Ellicott', 'Community', 'Events'],
            isJoined: true,
            color: 'green'
          }
        ].map((space, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-brand-primary)] transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-[var(--hive-text-primary)] mb-2">
                    {space.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {space.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-[var(--hive-text-secondary)]">
                      <Users className="w-3 h-3" />
                      {space.members} members
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[var(--hive-text-muted)] mb-2">
                    {space.activity}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
                {space.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                {space.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Button 
                  variant={space.isJoined ? "secondary" : "primary"} 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {space.isJoined ? (
                    <>
                      <Eye className="w-3 h-3" />
                      View Space
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3" />
                      Join Space
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const InteractiveComponentsShowcase = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Interactive Campus Components
      </h3>
      
      {/* Social Action Groups */}
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="text-[var(--hive-text-primary)]">
            Campus Social Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">
                CSE Study Session Tonight
              </div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                Davis Hall 338 • 7:00 PM
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1 ${liked ? 'text-red-400' : 'text-[var(--hive-text-secondary)]'}`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-xs">{liked ? '24' : '23'}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-[var(--hive-text-secondary)]">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">12</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-[var(--hive-text-secondary)]">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--hive-text-primary)]">
              Campus Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)] w-4 h-4" />
              <Input
                type="text"
                placeholder="Search spaces, students, tools, events..."
                className="pl-10 bg-[var(--hive-background-primary)] border-[var(--hive-border-default)]"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--hive-text-primary)]">
              Space Filters
            </Label>
            <div className="flex flex-wrap gap-2">
              {['Academic', 'Residential', 'Social', 'Athletic', 'Clubs'].map((filter) => (
                <Button key={filter} variant="outline" size="sm" className="text-xs">
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// MOLECULAR COMPONENTS LIBRARY COMPONENT
// =============================================================================

const MolecularComponentsLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('forms');
  const [searchQuery, setSearchQuery] = useState('');

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',
      purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400',
      green: 'from-green-500/20 to-green-600/10 border-green-500/20 text-green-400',
      gold: 'from-yellow-400/20 to-amber-500/10 border-yellow-400/20 text-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredCategories = molecularCategories.filter(category =>
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
              <Molecule className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Molecular Components
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                HIVE Combined Interaction Patterns
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            Sophisticated component combinations designed for University at Buffalo campus scenarios. 
            Each molecule combines atomic elements into meaningful campus interaction patterns.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)] w-4 h-4" />
            <Input
              type="text"
              placeholder="Search molecular components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]"
            />
          </div>
        </div>

        {/* Interactive Showcases */}
        <div className="space-y-8 mb-12">
          <AvatarCardShowcase />
          <SpacePreviewShowcase />
          <InteractiveComponentsShowcase />
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {molecularCategories.map((category) => (
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

        {/* Campus Context Examples */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <GraduationCap className="w-5 h-5" />
              Campus Usage Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Between Classes (2-5 minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Quick space notifications check
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Swipe through campus events
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      React to study group posts
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Study Breaks (10-15 minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Browse and join academic spaces
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Plan study sessions with tools
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Coordinate dorm floor events
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

export const CompleteMolecularLibrary: Story = {
  render: () => <MolecularComponentsLibrary />,
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all molecular components in the HIVE design system with University at Buffalo campus scenarios and interactive examples.'
      }
    }
  }
};

export const AvatarCards: Story = {
  render: () => <AvatarCardShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus avatar cards showing student identity with major, year, housing, and verification status.'
      }
    }
  }
};

export const SpacePreviewCards: Story = {
  render: () => <SpacePreviewShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Space preview cards for campus community discovery with activity indicators and social proof.'
      }
    }
  }
};

export const InteractiveComponents: Story = {
  render: () => <InteractiveComponentsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive molecular components including social actions, search, and filter controls.'
      }
    }
  }
};