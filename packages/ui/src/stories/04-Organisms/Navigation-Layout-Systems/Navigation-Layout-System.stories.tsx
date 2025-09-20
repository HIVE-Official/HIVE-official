/**
 * HIVE Live Frontend: Navigation & Layout System
 * Complete navigation, layout patterns, and page flows using actual production components
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';

// Import actual HIVE navigation components
import { 
  SidebarNavigation,
  NavigationContainer,
  NavigationItem, 
  NavigationUser 
} from '../../../components/navigation';
import { CampusBar } from '../../../components/navigation';

// Import UI components
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Input } from '../../../components/ui/input';
import { HiveProgress } from '../../../components/hive-progress';
import { Separator } from '../../../components/ui/separator';
import { Switch } from '../../../components/ui/switch';

// Import icons
import { 
  Home,
  Search, 
  Bell,
  Settings,
  User,
  Users,
  Calendar,
  Zap,
  Plus,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Heart,
  MessageSquare,
  Share,
  Star,
  MapPin,
  Clock,
  BookOpen,
  Target,
  Activity,
  TrendingUp,
  Award,
  Coffee,
  Moon,
  Sun,
  Smartphone,
  Tablet,
  Monitor,
  Palette,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  Crown,
  Sparkles,
  Filter,
  SortDesc,
  Grid,
  List,
  Maximize2,
  Code,
  Play,
  Wrench,
  Hash,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';

import '../../../hive-tokens.css';

const meta = {
  title: '09-Live-Frontend/Navigation & Layout System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Live Navigation & Layout System

The complete navigation architecture and responsive layout patterns using our actual production components. This showcases all main sections: Feed, Spaces, HiveLab, and Profile.

## Production Components
- **DesktopSidebar**: Collapsible sidebar with HIVE branding and UB context
- **MobileNavigation**: Touch-optimized bottom tabs with haptic feedback
- **NavigationContainer**: Responsive orchestrator between desktop/mobile
- **Real HIVE Design Tokens**: Proper colors, spacing, and animations

## Key Features
- **Adaptive Navigation**: Desktop sidebar, tablet drawer, mobile bottom tabs
- **Four Main Sections**: Feed, Spaces, HiveLab, Profile with unique layouts
- **Campus Context**: UB-specific navigation patterns and content
- **State Management**: Persistent navigation states and user preferences
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Fluid transitions between all breakpoints
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock UB student data for navigation system
const mockUser: NavigationUser = {
  id: 'sarah-chen-ub',
  name: 'Sarah Chen',
  handle: 'sarahc',
  email: 'sarahc@buffalo.edu',
  avatar: '/placeholder-avatar.jpg',
  builderStatus: 'active',
  campusId: 'ub-buffalo',
  preferences: {
    sidebarCollapsed: false,
    theme: 'dark'
  }
};

// Navigation items for all four main sections
const createNavigationItems = (activeSection: string): NavigationItem[] => [
  {
    id: 'feed',
    label: 'Feed',
    href: '/feed',
    icon: Home,
    description: 'Campus activity and updates',
    isActive: activeSection === 'feed',
    badge: activeSection === 'feed' ? { type: 'notification', count: 3 } : undefined
  },
  {
    id: 'spaces',
    label: 'Spaces', 
    href: '/spaces',
    icon: Users,
    description: 'Join campus communities',
    isActive: activeSection === 'spaces',
    badge: activeSection === 'spaces' ? { type: 'notification', count: 5 } : undefined
  },
  {
    id: 'hivelab',
    label: 'HiveLab',
    href: '/hivelab', 
    icon: Zap,
    description: 'Build and discover tools',
    isActive: activeSection === 'hivelab',
    badge: activeSection === 'hivelab' ? { type: 'feature', label: 'NEW' } : undefined
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Your campus dashboard',
    isActive: activeSection === 'profile'
  }
];

// UB campus-specific mock data
const ubCampusData = {
  spaces: {
    feed: [
      { id: 'cs101', name: 'CS 101 Study Group', members: 45, activity: 'high', icon: '💻' },
      { id: 'ellicott', name: 'Ellicott Complex', members: 234, activity: 'medium', icon: '🏠' },
      { id: 'engineering', name: 'SEAS Students', members: 1200, activity: 'high', icon: '⚙️' }
    ],
    spaces: [
      { id: 'dorm-life', name: 'UB Dorm Life', members: 890, category: 'Housing', icon: '🏠' },
      { id: 'study-groups', name: 'Study Groups Hub', members: 567, category: 'Academic', icon: '📚' },
      { id: 'club-sports', name: 'Club Sports', members: 445, category: 'Recreation', icon: '⚽' }
    ],
    hivelab: [
      { id: 'room-finder', name: 'Study Room Finder', users: 1200, category: 'Utility', icon: '🔍' },
      { id: 'food-tracker', name: 'Campus Food Tracker', users: 890, category: 'Dining', icon: '🍕' },
      { id: 'laundry-alert', name: 'Laundry Alert System', users: 2340, category: 'Dorm Life', icon: '👕' }
    ]
  },
  notifications: {
    unread: 7,
    recent: [
      { id: 1, type: 'space', text: 'New post in CS 101 Study Group', time: '2m ago', urgent: false },
      { id: 2, type: 'tool', text: 'Study Room Finder updated', time: '15m ago', urgent: false },
      { id: 3, type: 'space', text: 'Ellicott Complex - Laundry reminder', time: '1h ago', urgent: true },
      { id: 4, type: 'hivelab', text: 'New tool: Grade Calculator', time: '2h ago', urgent: false }
    ]
  }
};

// Content Components for Each Section
const FeedContent = ({ mobile = false }: { mobile?: boolean }) => (
  <div className="space-y-6">
    {/* Feed Stats */}
    <div className={`grid gap-4 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
      <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--hive-text-secondary)] text-sm">Active Posts</p>
              <p className="text-2xl font-bold text-[var(--hive-brand-secondary)]">47</p>
            </div>
            <Activity className="w-8 h-8 text-[var(--hive-brand-secondary)]/60" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--hive-text-secondary)] text-sm">Your Spaces</p>
              <p className="text-2xl font-bold text-[var(--hive-brand-secondary)]">12</p>
            </div>
            <Users className="w-8 h-8 text-[var(--hive-brand-secondary)]/60" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--hive-text-secondary)] text-sm">Tools Built</p>
              <p className="text-2xl font-bold text-[var(--hive-brand-secondary)]">3</p>
            </div>
            <Zap className="w-8 h-8 text-[var(--hive-brand-secondary)]/60" />
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity */}
    <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="flex items-center text-[var(--hive-text-primary)]">
          <Home className="w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" />
          Campus Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ubCampusData.spaces.feed.map((space) => (
          <div key={space.id} className="flex items-center space-x-3 p-3 rounded-lg bg-[var(--hive-bg-tertiary)]/30">
            <div className="text-2xl">{space.icon}</div>
            <div className="flex-1">
              <p className="text-[var(--hive-text-primary)] font-medium">{space.name}</p>
              <p className="text-[var(--hive-text-secondary)] text-sm">{space.members} members • {space.activity} activity</p>
            </div>
            <Badge 
              className={`text-xs ${
                space.activity === 'high' 
                  ? 'bg-[var(--hive-success)]/20 text-[var(--hive-success)]'
                  : 'bg-[var(--hive-warning)]/20 text-[var(--hive-warning)]'
              }`}
            >
              {space.activity}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

const SpacesContent = ({ mobile = false }: { mobile?: boolean }) => (
  <div className="space-y-6">
    {/* Spaces Categories */}
    <div className={`grid gap-4 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {ubCampusData.spaces.spaces.map((space) => (
        <Card key={space.id} className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)] hover:border-[var(--hive-brand-secondary)]/30 transition-colors cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{space.icon}</div>
              <div className="flex-1">
                <h3 className="text-[var(--hive-text-primary)] font-semibold">{space.name}</h3>
                <p className="text-[var(--hive-text-secondary)] text-sm">{space.members} members</p>
                <Badge className="mt-2 text-xs bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]">
                  {space.category}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Quick Actions */}
    <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="flex items-center text-[var(--hive-text-primary)]">
          <Plus className="w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start bg-[var(--hive-bg-tertiary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]">
          <Plus className="w-4 h-4 mr-2" />
          Create New Space
        </Button>
        <Button className="w-full justify-start bg-[var(--hive-bg-tertiary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]">
          <Search className="w-4 h-4 mr-2" />
          Browse All Spaces
        </Button>
        <Button className="w-full justify-start bg-[var(--hive-bg-tertiary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]">
          <Heart className="w-4 h-4 mr-2" />
          Join Recommended
        </Button>
      </CardContent>
    </Card>
  </div>
);

const HiveLabContent = ({ mobile = false }: { mobile?: boolean }) => (
  <div className="space-y-6">
    {/* Popular Tools */}
    <div className={`grid gap-4 ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {ubCampusData.spaces.hivelab.map((tool) => (
        <Card key={tool.id} className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)] hover:border-[var(--hive-brand-secondary)]/30 transition-colors cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{tool.icon}</div>
              <div className="flex-1">
                <h3 className="text-[var(--hive-text-primary)] font-semibold mb-1">{tool.name}</h3>
                <p className="text-[var(--hive-text-secondary)] text-sm mb-2">{tool.users} active users</p>
                <Badge className="text-xs bg-[var(--hive-info)]/20 text-[var(--hive-info)]">
                  {tool.category}
                </Badge>
              </div>
            </div>
            <Button size="sm" className="w-full mt-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-secondary)]/80">
              Use Tool
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Build Actions */}
    <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="flex items-center text-[var(--hive-text-primary)]">
          <Wrench className="w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" />
          Build & Create
        </CardTitle>
      </CardHeader>
      <CardContent className={`grid gap-3 ${mobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <Button className="justify-start bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-secondary)]/80">
          <Plus className="w-4 h-4 mr-2" />
          Build New Tool
        </Button>
        <Button className="justify-start bg-[var(--hive-bg-tertiary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]">
          <Code className="w-4 h-4 mr-2" />
          View My Tools
        </Button>
        <Button className="justify-start bg-[var(--hive-bg-tertiary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]">
          <Star className="w-4 h-4 mr-2" />
          Popular Templates
        </Button>
        <Button className="justify-start bg-[var(--hive-bg-tertiary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]">
          <BookOpen className="w-4 h-4 mr-2" />
          Documentation
        </Button>
      </CardContent>
    </Card>
  </div>
);

const ProfileContent = ({ mobile = false }: { mobile?: boolean }) => (
  <div className="space-y-6">
    {/* Profile Overview */}
    <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback 
              className="text-xl font-bold"
              style={{ 
                backgroundColor: 'var(--hive-brand-secondary)', 
                color: 'var(--hive-text-inverse)' 
              }}
            >
              {mockUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">{mockUser.name}</h2>
            <p className="text-[var(--hive-text-secondary)]">@{mockUser.handle} • {mockUser.email}</p>
            <div className="flex items-center mt-2">
              <Badge className="mr-2 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]">
                Builder
              </Badge>
              <Badge className="bg-[var(--hive-success)]/20 text-[var(--hive-success)]">
                Online
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Profile Actions */}
    <div className={`grid gap-4 ${mobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
      <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
        <CardHeader>
          <CardTitle className="flex items-center text-[var(--hive-text-primary)]">
            <Settings className="w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button size="sm" variant="outline" className="w-full justify-start border-[var(--hive-border-default)] text-[var(--hive-text-secondary)]">
            <User className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start border-[var(--hive-border-default)] text-[var(--hive-text-secondary)]">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start border-[var(--hive-border-default)] text-[var(--hive-text-secondary)]">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-[var(--hive-bg-secondary)]/50 border-[var(--hive-border-default)]">
        <CardHeader>
          <CardTitle className="flex items-center text-[var(--hive-text-primary)]">
            <Activity className="w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" />
            Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[var(--hive-text-secondary)]">Spaces Joined</span>
            <span className="text-[var(--hive-text-primary)] font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--hive-text-secondary)]">Tools Built</span>
            <span className="text-[var(--hive-text-primary)] font-medium">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--hive-text-secondary)]">Campus Rank</span>
            <span className="text-[var(--hive-brand-secondary)] font-medium">#47</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Main Navigation Layout System using production components
const NavigationLayoutSystem = () => {
  const [activeSection, setActiveSection] = useState('feed');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile)
  }, []);
  
  const navigationItems = createNavigationItems(activeSection);
  
  const handleNavigate = (href: string) => {
    const section = href.replace('/', '');
    setActiveSection(section)
  };
  
  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  };

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      {/* Desktop Layout */}
      {!isMobile ? (
        <div className="flex">
          {/* Production Desktop Sidebar */}
          <DesktopSidebar
            items={navigationItems}
            user={mockUser}
            collapsed={sidebarCollapsed}
            onNavigate={handleNavigate}
            onToggleCollapse={handleToggleCollapse}
          />

          {/* Main Content Area */}
          <div 
            className="flex-1 flex flex-col transition-all duration-300"
            style={{
              marginLeft: sidebarCollapsed ? '80px' : '256px'
            }}
          >
            {/* Top Navigation Bar */}
            <div className="bg-[var(--hive-bg-secondary)]/95 backdrop-blur-xl border-b border-[var(--hive-border-default)] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.h1 
                    className="text-2xl font-bold text-[var(--hive-text-primary)] capitalize"
                    key={activeSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeSection === 'hivelab' ? 'HiveLab' : activeSection}
                  </motion.h1>
                  <Badge 
                    className="text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--hive-brand-secondary)/20', 
                      color: 'var(--hive-brand-secondary)' 
                    }}
                  >
                    UB Buffalo
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="outline" className="border-[var(--hive-border-default)] text-[var(--hive-text-secondary)] relative">
                    <Bell className="w-4 h-4" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--hive-error)] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">{ubCampusData.notifications.unread}</span>
                    </div>
                  </Button>
                  <Button size="icon" variant="outline" className="border-[var(--hive-border-default)] text-[var(--hive-text-secondary)]">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button 
                    className="font-medium"
                    style={{ 
                      backgroundColor: 'var(--hive-brand-secondary)', 
                      color: 'var(--hive-text-inverse)' 
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                  </Button>
                </div>
              </div>
            </div>

            {/* Dynamic Content Based on Active Section */}
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 'feed' && <FeedContent />}
                  {activeSection === 'spaces' && <SpacesContent />}
                  {activeSection === 'hivelab' && <HiveLabContent />}
                  {activeSection === 'profile' && <ProfileContent />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Layout */
        <div className="flex flex-col h-screen">
          {/* Mobile Top Bar */}
          <div className="bg-[var(--hive-bg-secondary)]/95 backdrop-blur-xl border-b border-[var(--hive-border-default)] p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: 'var(--hive-brand-secondary)' }}
              >
                <Hash className="w-4 h-4 text-[var(--hive-text-inverse)]" />
              </div>
              <div>
                <h1 className="text-[var(--hive-text-primary)] font-bold text-sm tracking-wider">HIVE</h1>
                <p className="text-[var(--hive-text-tertiary)] text-xs">UB Buffalo</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="text-[var(--hive-text-secondary)] relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--hive-error)] rounded-full"></div>
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback 
                  style={{ 
                    backgroundColor: 'var(--hive-brand-secondary)', 
                    color: 'var(--hive-text-inverse)' 
                  }}
                >
                  {mockUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 p-4 pb-20 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4 capitalize">
                  {activeSection === 'hivelab' ? 'HiveLab' : activeSection}
                </h2>
                {activeSection === 'feed' && <FeedContent mobile />}
                {activeSection === 'spaces' && <SpacesContent mobile />}
                {activeSection === 'hivelab' && <HiveLabContent mobile />}
                {activeSection === 'profile' && <ProfileContent mobile />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Production Mobile Navigation */}
          <MobileNavigation
            items={navigationItems}
            onNavigate={handleNavigate}
          />
        </div>
      )}
    </div>
  )
};

// Responsive Showcase Component
const ResponsiveShowcase = () => {
  const [viewportSize, setViewportSize] = useState('desktop');
  const [showcaseSection, setShowcaseSection] = useState('feed');
  
  const viewportSizes = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: '1440px' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' }
  ];
  
  const sections = ['feed', 'spaces', 'hivelab', 'profile'];
  
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
      {/* Controls */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">HIVE Navigation System</h1>
            <p className="text-[var(--hive-text-secondary)]">Production-ready components with responsive design</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[var(--hive-text-secondary)] text-sm mr-2">Viewport:</span>
            {viewportSizes.map(map}) => (
              <Button
                key={id}
                size="sm"
                variant={viewportSize === id ? 'default' : 'outline'}
                onClick={() => setViewportSize(id)}
                className={viewportSize === id 
                  ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]'
                  : 'border-[var(--hive-border-default)] text-[var(--hive-text-secondary)]'
                }
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-[var(--hive-text-secondary)] text-sm mr-2">Section:</span>
          {sections.map((section) => (
            <Button
              key={section}
              size="sm"
              variant={showcaseSection === section ? 'default' : 'outline'}
              onClick={() => setShowcaseSection(section)}
              className={showcaseSection === section 
                ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]'
                : 'border-[var(--hive-border-default)] text-[var(--hive-text-secondary)]'
              }
            >
              {section === 'hivelab' ? 'HiveLab' : section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Responsive Preview */}
      <Card className="bg-[var(--hive-bg-secondary)] border-[var(--hive-border-default)]">
        <CardHeader className="border-b border-[var(--hive-border-subtle)]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[var(--hive-text-primary)]">
              {viewportSizes.find(v => v.id === viewportSize)?.width} Preview
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm" className="bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]">
                <Play className="w-4 h-4 mr-1" />
                Interact
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            className="mx-auto bg-[var(--hive-background-primary)] overflow-hidden border-x border-[var(--hive-border-subtle)]"
            style={{ 
              width: viewportSizes.find(v => v.id === viewportSize)?.width,
              maxWidth: '100%',
              height: '600px'
            }}
          >
            {/* Embed the actual NavigationLayoutSystem with forced viewport */}
            <div className={viewportSize === 'mobile' ? 'block lg:hidden' : viewportSize === 'tablet' ? 'hidden md:block lg:hidden' : 'hidden lg:block'}>
              <NavigationLayoutSystem />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

// Story Definitions
export const CompleteNavigationSystem: Story = {
  render: () => <NavigationLayoutSystem />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'hive-dark' }
  }
};

export const FeedLayout: Story = {
  render: () => {
    // Force feed section active
    const NavigationWithFeed = () => {
      const [activeSection] = useState('feed');
      const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
      const [isMobile, setIsMobile] = useState(false);
      
      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile)
      }, []);
      
      const navigationItems = createNavigationItems('feed');
      
      return (
        <div className="min-h-screen bg-[var(--hive-background-primary)]">
          {!isMobile ? (
            <div className="flex">
              <DesktopSidebar
                items={navigationItems}
                user={mockUser}
                collapsed={sidebarCollapsed}
                onNavigate={() => {}}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className="flex-1" style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}>
                <div className="p-6">
                  <FeedContent />
                </div>
              </div>
            </div>
          ) : (
            <div className="pb-20">
              <div className="p-4">
                <FeedContent mobile />
              </div>
              <MobileNavigation items={navigationItems} onNavigate={() => {}} />
            </div>
          )}
        </div>
      )
    };
    return <NavigationWithFeed />
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'hive-dark' }
  }
};

export const SpacesLayout: Story = {
  render: () => {
    // Similar pattern for Spaces...
    const NavigationWithSpaces = () => {
      const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
      const [isMobile, setIsMobile] = useState(false);
      
      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile)
      }, []);
      
      const navigationItems = createNavigationItems('spaces');
      
      return (
        <div className="min-h-screen bg-[var(--hive-background-primary)]">
          {!isMobile ? (
            <div className="flex">
              <DesktopSidebar
                items={navigationItems}
                user={mockUser}
                collapsed={sidebarCollapsed}
                onNavigate={() => {}}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className="flex-1" style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}>
                <div className="p-6">
                  <SpacesContent />
                </div>
              </div>
            </div>
          ) : (
            <div className="pb-20">
              <div className="p-4">
                <SpacesContent mobile />
              </div>
              <MobileNavigation items={navigationItems} onNavigate={() => {}} />
            </div>
          )}
        </div>
      )
    };
    return <NavigationWithSpaces />
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'hive-dark' }
  }
};

export const HiveLabLayout: Story = {
  render: () => {
    const NavigationWithHiveLab = () => {
      const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
      const [isMobile, setIsMobile] = useState(false);
      
      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile)
      }, []);
      
      const navigationItems = createNavigationItems('hivelab');
      
      return (
        <div className="min-h-screen bg-[var(--hive-background-primary)]">
          {!isMobile ? (
            <div className="flex">
              <DesktopSidebar
                items={navigationItems}
                user={mockUser}
                collapsed={sidebarCollapsed}
                onNavigate={() => {}}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className="flex-1" style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}>
                <div className="p-6">
                  <HiveLabContent />
                </div>
              </div>
            </div>
          ) : (
            <div className="pb-20">
              <div className="p-4">
                <HiveLabContent mobile />
              </div>
              <MobileNavigation items={navigationItems} onNavigate={() => {}} />
            </div>
          )}
        </div>
      )
    };
    return <NavigationWithHiveLab />
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'hive-dark' }
  }
};

export const ProfileLayout: Story = {
  render: () => {
    const NavigationWithProfile = () => {
      const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
      const [isMobile, setIsMobile] = useState(false);
      
      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile)
      }, []);
      
      const navigationItems = createNavigationItems('profile');
      
      return (
        <div className="min-h-screen bg-[var(--hive-background-primary)]">
          {!isMobile ? (
            <div className="flex">
              <DesktopSidebar
                items={navigationItems}
                user={mockUser}
                collapsed={sidebarCollapsed}
                onNavigate={() => {}}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <div className="flex-1" style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}>
                <div className="p-6">
                  <ProfileContent />
                </div>
              </div>
            </div>
          ) : (
            <div className="pb-20">
              <div className="p-4">
                <ProfileContent mobile />
              </div>
              <MobileNavigation items={navigationItems} onNavigate={() => {}} />
            </div>
          )}
        </div>
      )
    };
    return <NavigationWithProfile />
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'hive-dark' }
  }
};

export const ResponsiveShowcaseDemo: Story = {
  render: () => <ResponsiveShowcase />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'hive-dark' }
  }
};