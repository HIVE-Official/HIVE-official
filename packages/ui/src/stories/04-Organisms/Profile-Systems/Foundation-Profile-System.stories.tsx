/**
 * HIVE Profile System: Complete Foundation-Driven Rebuild
 * Entirely new Profile System built from the ground up using HIVE Design System Foundation (00-04)
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Progress } from '../../components/ui/progress';
import '../../hive-tokens.css';
import { 
  User,
  Users,
  Calendar,
  Bell,
  Heart,
  MessageSquare,
  Share,
  Settings, 
  BarChart3, 
  Shield, 
  Edit, 
  Wrench,
  ChevronLeft,
  Home,
  Plus,
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Zap,
  Sparkles,
  Trophy,
  Target,
  TrendingUp,
  Activity,
  Eye,
  EyeOff,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Camera,
  Upload,
  Palette,
  Layout,
  Sliders,
  Download,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Maximize,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  UserPlus,
  Circle,
  Database,
  AlertTriangle,
  Trash,
  Lightbulb,
  UserX,
  Code,
  BarChart
} from 'lucide-react';

const meta = {
  title: '05-Live-Frontend/Profile System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Profile System: Complete Foundation Rebuild

**Entirely new Profile System built from scratch using the complete HIVE Design System Foundation (00-04)**

## 🏗️ Complete Architectural Rebuild
- **Brand New Layout**: Revolutionary bento-grid based profile dashboard
- **Foundation-First Design**: Every pixel uses Foundation design tokens and components
- **Campus-Optimized UX**: Built specifically for university student workflows
- **Mobile-First Responsive**: Completely new responsive system for campus life

## 🎨 Foundation Integration
- **01-Foundation**: Complete design token system (colors, typography, spacing, motion)
- **02-Atoms**: Every atomic component integrated (buttons, inputs, badges, avatars)
- **03-Molecules**: All molecular patterns (cards, navigation, forms)
- **04-Organisms**: Complex composed interfaces with HIVE interaction patterns

## 💫 Revolutionary Features
- **Adaptive Profile Layout**: Dynamic bento-grid system that adapts to content
- **Campus Context Engine**: UB-specific locations, majors, housing integration
- **Builder Workflow**: Complete tool creation and management system
- **Social Utility Dashboard**: Real-time campus community engagement
- **Advanced Analytics**: Personal metrics and campus involvement tracking
- **Privacy Command Center**: Granular control over campus visibility

## 🚀 New Interaction Patterns
- **Magnetic Hover Effects**: Advanced cursor-following interactions
- **Liquid Motion**: Smooth HIVE easing throughout all transitions
- **Glass Morphism**: Professional backdrop blur and overlay system
- **Gold Glow States**: Interactive feedback with HIVE brand colors

Every component has been rebuilt from the ground up to showcase the complete HIVE Foundation system.
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Enhanced UB Student Profile Data
const ubStudentProfile = {
  identity: {
    id: 'ub_sarah_2025',
    firstName: 'Sarah',
    lastName: 'Chen', 
    displayName: 'Sarah Chen',
    handle: 'sarahc',
    email: 'sarah.chen@buffalo.edu',
    avatarUrl: '',
    bio: 'CS Major • Builder • Creating tools that bring UB students together 🐂',
    statusMessage: 'Building the future of campus life',
    pronouns: 'she/her',
    year: 'Junior',
    graduationYear: 2025
  },
  academic: {
    university: 'University at Buffalo',
    campus: 'North Campus',
    school: 'School of Engineering and Applied Sciences',
    major: 'Computer Science',
    minor: 'Business Administration',
    gpa: 3.87,
    credits: 89,
    standing: 'Junior'
  },
  campus: {
    housing: {
      type: 'residence_hall',
      name: 'Ellicott Complex',
      building: 'Porter Hall',
      room: '312',
      floor: 3
    },
    location: 'North Campus, Amherst NY',
    diningPlan: 'Unlimited Plus',
    parkingPermit: 'North Campus Student'
  },
  builder: {
    status: 'verified_builder',
    level: 'advanced',
    toolsCreated: 8,
    totalUsage: 12847,
    monthlyUsage: 2341,
    specializations: ['Form Builder', 'Event Management', 'Data Collection', 'Campus Tools'],
    achievements: ['First Tool', 'Popular Creator', '10k Uses', 'Community Builder']
  },
  activity: {
    spacesJoined: 15,
    spacesLeading: 3,
    eventsAttended: 34,
    eventsCreated: 8,
    connectionsCount: 127,
    weeklyActiveHours: 28,
    campusEngagement: 'high',
    lastActive: new Date().toISOString(),
    streak: 47
  },
  social: {
    followers: 89,
    following: 156,
    posts: 234,
    likes: 1847,
    connections: ['Computer Science Study Group', 'UB Builders', 'Ellicott Community'],
    interests: ['Full Stack Development', 'Campus Events', 'Entrepreneurship', 'Community Building']
  },
  privacy: {
    profileVisibility: 'campus',
    ghostMode: false,
    showActivity: true,
    showLocation: true,
    allowDirectMessages: true,
    showOnlineStatus: true
  },
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    theme: 'dark',
    language: 'en-US'
  }
};

// Campus Tools and Spaces Data
const campusSpaces = [
  {
    id: 'cs_study_group',
    name: 'CS 101 Study Group',
    type: 'academic',
    category: 'Computer Science',
    memberCount: 28,
    isLeader: false,
    lastActivity: '2 hours ago',
    engagement: 'high',
    color: 'blue'
  },
  {
    id: 'ellicott_floor3',
    name: 'Ellicott Floor 3',
    type: 'housing',
    category: 'Residence Hall',
    memberCount: 24,
    isLeader: true,
    lastActivity: '15 minutes ago',
    engagement: 'very_high',
    color: 'green'
  },
  {
    id: 'ub_builders',
    name: 'UB Builders',
    type: 'interest',
    category: 'Technology',
    memberCount: 156,
    isLeader: true,
    lastActivity: '1 hour ago',
    engagement: 'high',
    color: 'purple'
  }
];

const createdTools = [
  {
    id: 'study_room_finder',
    name: 'Study Room Finder',
    description: 'Find and reserve available study spaces across UB campus',
    category: 'productivity',
    type: 'web_app',
    usageCount: 4729,
    monthlyGrowth: 23,
    status: 'published',
    rating: 4.8,
    lastUpdated: '2024-01-15',
    isPopular: true
  },
  {
    id: 'laundry_tracker',
    name: 'Dorm Laundry Tracker',
    description: 'Real-time laundry machine availability for Ellicott residents',
    category: 'utility',
    type: 'widget',
    usageCount: 2847,
    monthlyGrowth: 34,
    status: 'published',
    rating: 4.6,
    lastUpdated: '2024-01-20',
    isPopular: false
  },
  {
    id: 'group_scheduler',
    name: 'Group Study Scheduler',
    description: 'Coordinate group meeting times with availability polling',
    category: 'productivity',
    type: 'form',
    usageCount: 1923,
    monthlyGrowth: 18,
    status: 'published',
    rating: 4.7,
    lastUpdated: '2024-01-18',
    isPopular: false
  }
];

// Revolutionary Profile Layout Component
const RevolutionaryProfileLayout: React.FC = () => {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Enhanced responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 30%, var(--hive-background-secondary) 70%, var(--hive-background-primary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      
      {/* Revolutionary Mobile-First Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: 'var(--hive-overlay-glass-strong)',
          borderColor: 'var(--hive-border-subtle)'
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            
            {/* Brand & Profile Identity - Mobile Optimized */}
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--hive-brand-primary), var(--hive-brand-accent))',
                  boxShadow: 'var(--hive-shadow-gold-glow)'
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 1500 1500" className="w-5 h-5 sm:w-7 sm:h-7">
                  <path fill="var(--hive-text-inverse)" d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"/>
                </svg>
              </motion.div>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold truncate" style={{ color: 'var(--hive-text-primary)' }}>
                  {ubStudentProfile.identity.displayName}
                </h1>
                <p className="text-xs sm:text-sm truncate" style={{ color: 'var(--hive-text-muted)' }}>
                  @{ubStudentProfile.identity.handle} • {ubStudentProfile.academic.major}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Pills */}
            <div className="hidden lg:flex items-center space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: Home },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'tools', label: 'Builder', icon: Wrench },
                { id: 'spaces', label: 'Spaces', icon: Users },
                { id: 'privacy', label: 'Privacy', icon: Shield }
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className="flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? 'var(--hive-brand-primary)' : 'transparent',
                      color: isActive ? 'var(--hive-text-inverse)' : 'var(--hive-text-secondary)',
                      border: isActive ? 'none' : '1px solid var(--hive-border-subtle)'
                    }}
                    whileHover={{
                      backgroundColor: isActive ? 'var(--hive-brand-primary)' : 'var(--hive-background-interactive)',
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile & Tablet Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Quick Action - Mobile Optimized */}
              <Button
                size="sm"
                variant="outline"
                className="hidden sm:flex lg:hidden"
                style={{
                  borderColor: 'var(--hive-border-gold)',
                  color: 'var(--hive-brand-primary)'
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                className="hidden sm:flex"
                style={{
                  backgroundColor: 'var(--hive-brand-primary)',
                  color: 'var(--hive-text-inverse)'
                }}
              >
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden md:inline lg:hidden xl:inline">Create Tool</span>
              </Button>

              {/* Mobile Menu Button */}
              <motion.button
                className="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl"
                style={{
                  backgroundColor: 'var(--hive-background-secondary)',
                  border: '1px solid var(--hive-border-subtle)'
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-5 h-5" style={{ color: 'var(--hive-text-primary)' }} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t"
              style={{
                backgroundColor: 'var(--hive-overlay-glass-strong)',
                borderColor: 'var(--hive-border-subtle)'
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'overview', label: 'Overview', icon: Home },
                    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                    { id: 'tools', label: 'Builder', icon: Wrench },
                    { id: 'spaces', label: 'Spaces', icon: Users },
                    { id: 'privacy', label: 'Privacy', icon: Shield }
                  ].map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeView === item.id;
                    
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          setActiveView(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 p-4 rounded-xl text-left font-medium"
                        style={{
                          backgroundColor: isActive ? 'var(--hive-brand-primary)' : 'var(--hive-background-secondary)',
                          color: isActive ? 'var(--hive-text-inverse)' : 'var(--hive-text-primary)',
                          border: isActive ? 'none' : '1px solid var(--hive-border-subtle)'
                        }}
                        whileHover={{
                          backgroundColor: isActive ? 'var(--hive-brand-primary)' : 'var(--hive-background-interactive)',
                          scale: 1.02
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                
                {/* Mobile Actions */}
                <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: 'var(--hive-border-subtle)' }}>
                  <Button
                    className="w-full justify-center"
                    variant="outline"
                    style={{
                      borderColor: 'var(--hive-border-gold)',
                      color: 'var(--hive-brand-primary)'
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    className="w-full justify-center"
                    style={{
                      backgroundColor: 'var(--hive-brand-primary)',
                      color: 'var(--hive-text-inverse)'
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Tool
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Revolutionary Mobile-First Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Mobile-First Sidebar - Profile Summary */}
          <motion.div
            className="order-2 lg:order-1 lg:col-span-4 xl:col-span-3"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Profile Identity Card */}
            <Card className="mb-6 overflow-hidden" style={{
              background: 'var(--hive-overlay-glass-strong)',
              borderColor: 'var(--hive-border-primary)',
              backdropFilter: 'blur(16px) saturate(180%)'
            }}>
              <CardContent className="p-6">
                {/* Avatar & Basic Info */}
                <div className="text-center mb-6">
                  <motion.div
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4"
                            style={{ borderColor: 'var(--hive-border-gold)' }}>
                      <AvatarFallback 
                        className="text-2xl font-bold"
                        style={{
                          background: 'linear-gradient(135deg, var(--hive-brand-primary), var(--hive-brand-accent))',
                          color: 'var(--hive-text-inverse)'
                        }}
                      >
                        {ubStudentProfile.identity.firstName[0]}{ubStudentProfile.identity.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Online Status */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4"
                         style={{
                           backgroundColor: 'var(--hive-status-success)',
                           borderColor: 'var(--hive-background-primary)'
                         }} />
                  </motion.div>
                  
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--hive-text-primary)' }}>
                    {ubStudentProfile.identity.displayName}
                  </h2>
                  <p className="text-sm mb-2" style={{ color: 'var(--hive-text-muted)' }}>
                    @{ubStudentProfile.identity.handle}
                  </p>
                  
                  {/* Builder Badge */}
                  <Badge className="mb-4" style={{
                    backgroundColor: 'var(--hive-overlay-gold-subtle)',
                    color: 'var(--hive-brand-primary)',
                    border: '1px solid var(--hive-border-gold)'
                  }}>
                    <Star className="w-3 h-3 mr-1" />
                    Verified Builder
                  </Badge>
                </div>

                {/* Bio & Status */}
                <div className="mb-6 text-center">
                  <p className="text-sm mb-3" style={{ color: 'var(--hive-text-secondary)' }}>
                    {ubStudentProfile.identity.bio}
                  </p>
                  <p className="text-xs px-3 py-2 rounded-full inline-block"
                     style={{
                       backgroundColor: 'var(--hive-background-interactive)',
                       color: 'var(--hive-text-muted)'
                     }}>
                    💭 {ubStudentProfile.identity.statusMessage}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold" style={{ color: 'var(--hive-brand-primary)' }}>
                      {ubStudentProfile.builder.toolsCreated}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>Tools</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold" style={{ color: 'var(--hive-status-success)' }}>
                      {ubStudentProfile.activity.spacesJoined}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>Spaces</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold" style={{ color: 'var(--hive-text-primary)' }}>
                      {ubStudentProfile.activity.connectionsCount}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>Connections</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Info Card */}
            <Card style={{
              background: 'var(--hive-overlay-glass)',
              borderColor: 'var(--hive-border-subtle)'
            }}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                  <Trophy className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                  Academic Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>Major</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                      {ubStudentProfile.academic.major}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>Year</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                      {ubStudentProfile.identity.year}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>Housing</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                      {ubStudentProfile.campus.housing.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>GPA</span>
                    <Badge style={{
                      backgroundColor: 'var(--hive-status-success)',
                      color: 'var(--hive-text-inverse)'
                    }}>
                      {ubStudentProfile.academic.gpa}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mobile-First Main Content Area */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-8 xl:col-span-9"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            
            <AnimatePresence mode="wait">
              {activeView === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Revolutionary Bento-Grid Dashboard */}
                  <div className="space-y-8">
                    
                    {/* Mobile-First Activity Cards - Enhanced Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      {[
                        {
                          title: 'Campus Engagement',
                          value: '92%',
                          change: '+12% this week',
                          color: 'var(--hive-brand-primary)',
                          icon: Activity,
                          trend: 'up',
                          description: 'Your involvement across UB communities'
                        },
                        {
                          title: 'Tools Built',
                          value: ubStudentProfile.builder.toolsCreated,
                          change: '+2 this month',
                          color: 'var(--hive-status-success)',
                          icon: Wrench,
                          trend: 'up',
                          description: 'Campus tools you\'ve created'
                        },
                        {
                          title: 'Tool Impact',
                          value: '12.8k',
                          change: '+2.3k uses this month',
                          color: 'var(--hive-status-info)',
                          icon: TrendingUp,
                          trend: 'up',
                          description: 'Total usage of your tools'
                        },
                        {
                          title: 'Active Streak',
                          value: `${ubStudentProfile.activity.streak}`,
                          change: 'Personal best!',
                          color: 'var(--hive-brand-accent)',
                          icon: Target,
                          trend: 'record',
                          description: 'Days of continuous campus engagement'
                        }
                      ].map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                          <motion.div
                            key={index}
                            variants={hiveVariants.feedCascade}
                            custom={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setHoveredCard(`stat-${index}`)}
                            onHoverEnd={() => setHoveredCard(null)}
                            role="button"
                            tabIndex={0}
                            aria-label={`${stat.title}: ${stat.value}, ${stat.description}`}
                          >
                            <Card 
                              className="overflow-hidden cursor-pointer group relative touch-manipulation select-none"
                              style={{
                                background: hoveredCard === `stat-${index}` 
                                  ? 'var(--hive-overlay-glass-strong)' 
                                  : 'var(--hive-overlay-glass)',
                                borderColor: hoveredCard === `stat-${index}` 
                                  ? 'var(--hive-border-gold)' 
                                  : 'var(--hive-border-subtle)',
                                transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)',
                                transformOrigin: 'center',
                                willChange: 'transform, border-color, background-color, box-shadow',
                                boxShadow: hoveredCard === `stat-${index}` 
                                  ? 'var(--hive-shadow-gold-glow)' 
                                  : 'none'
                              }}
                            >
                              {/* Hover Gradient Background */}
                              <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                style={{
                                  background: `linear-gradient(135deg, ${stat.color}08, transparent 70%)`,
                                  transition: 'opacity var(--hive-duration-smooth) var(--hive-easing-liquid)'
                                }}
                              />
                              
                              {/* Magnetic Shimmer Effect */}
                              <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                style={{
                                  background: 'linear-gradient(90deg, transparent, var(--hive-overlay-gold-subtle) 50%, transparent)',
                                  transform: 'translateX(-100%)'
                                }}
                                animate={hoveredCard === `stat-${index}` ? { transform: 'translateX(100%)' } : {}}
                                transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
                              />
                              
                              <CardContent className="p-6 relative z-10">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-3">
                                      <motion.div 
                                        className="p-2.5 rounded-lg"
                                        style={{
                                          backgroundColor: hoveredCard === `stat-${index}` 
                                            ? `${stat.color}15` 
                                            : 'var(--hive-background-interactive)',
                                          transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                                        }}
                                        animate={hoveredCard === `stat-${index}` ? { rotate: 360 } : { rotate: 0 }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                      >
                                        <IconComponent 
                                          className="w-5 h-5" 
                                          style={{ 
                                            color: hoveredCard === `stat-${index}` ? stat.color : 'var(--hive-text-secondary)'
                                          }} 
                                        />
                                      </motion.div>
                                      
                                      {stat.trend === 'up' && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ 
                                            opacity: hoveredCard === `stat-${index}` ? 1 : 0.7,
                                            scale: hoveredCard === `stat-${index}` ? 1 : 0.9
                                          }}
                                        >
                                          <Badge 
                                            style={{
                                              backgroundColor: 'var(--hive-status-success)',
                                              color: 'var(--hive-text-inverse)',
                                              fontSize: '10px'
                                            }}
                                          >
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            Trending
                                          </Badge>
                                        </motion.div>
                                      )}
                                      
                                      {stat.trend === 'record' && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ 
                                            opacity: hoveredCard === `stat-${index}` ? 1 : 0.7,
                                            scale: hoveredCard === `stat-${index}` ? 1 : 0.9
                                          }}
                                        >
                                          <Badge 
                                            style={{
                                              backgroundColor: 'var(--hive-overlay-gold-subtle)',
                                              color: 'var(--hive-brand-primary)',
                                              border: '1px solid var(--hive-border-gold)',
                                              fontSize: '10px'
                                            }}
                                          >
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            Record
                                          </Badge>
                                        </motion.div>
                                      )}
                                    </div>
                                    
                                    <motion.div 
                                      className="text-3xl font-bold mb-1"
                                      style={{ 
                                        color: hoveredCard === `stat-${index}` ? stat.color : 'var(--hive-text-primary)',
                                        transition: 'color var(--hive-duration-smooth) var(--hive-easing-liquid)'
                                      }}
                                      animate={hoveredCard === `stat-${index}` ? { scale: 1.05 } : { scale: 1 }}
                                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    >
                                      {stat.value}
                                      {stat.title === 'Active Streak' && (
                                        <span className="text-lg ml-1" style={{ color: 'var(--hive-text-muted)' }}>
                                          days
                                        </span>
                                      )}
                                    </motion.div>
                                    
                                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                                      {stat.title}
                                    </div>
                                    
                                    <motion.p 
                                      className="text-xs mb-2"
                                      style={{ color: 'var(--hive-text-muted)' }}
                                      animate={{
                                        opacity: hoveredCard === `stat-${index}` ? 1 : 0.7
                                      }}
                                    >
                                      {stat.description}
                                    </motion.p>
                                    
                                    <motion.div 
                                      className="text-xs flex items-center"
                                      style={{ color: stat.color }}
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ 
                                        opacity: hoveredCard === `stat-${index}` ? 1 : 0.8,
                                        y: hoveredCard === `stat-${index}` ? 0 : 2
                                      }}
                                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    >
                                      <ArrowRight className="w-3 h-3 mr-1" />
                                      {stat.change}
                                    </motion.div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Revolutionary Progress Visualization */}
                    <Card 
                      className="overflow-hidden"
                      style={{
                        background: 'var(--hive-overlay-glass-strong)',
                        borderColor: 'var(--hive-border-primary)'
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                            <Sparkles className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                            Campus Impact Journey
                          </div>
                          <Badge style={{
                            backgroundColor: 'var(--hive-overlay-gold-subtle)',
                            color: 'var(--hive-brand-primary)',
                            border: '1px solid var(--hive-border-gold)'
                          }}>
                            Level {Math.floor(ubStudentProfile.builder.totalUsage / 2000) + 1}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          
                          {/* Builder Progress */}
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <Wrench className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                              Builder Mastery
                            </h4>
                            
                            {[
                              { label: 'Tools Created', current: 8, max: 10, color: 'var(--hive-brand-primary)' },
                              { label: 'Total Usage', current: 12847, max: 15000, color: 'var(--hive-status-success)' },
                              { label: 'Monthly Growth', current: 2341, max: 3000, color: 'var(--hive-status-info)' }
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
                                    {item.label}
                                  </span>
                                  <span className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                    {item.current.toLocaleString()} / {item.max.toLocaleString()}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                  <motion.div 
                                    className="h-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.current / item.max) * 100}%` }}
                                    transition={{ duration: 1, delay: idx * 0.2, ease: 'easeInOut' }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Social Impact */}
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <Users className="w-4 h-4 mr-2" style={{ color: 'var(--hive-status-success)' }} />
                              Community Impact
                            </h4>
                            
                            {[
                              { label: 'Spaces Leading', current: 3, max: 5, color: 'var(--hive-status-success)' },
                              { label: 'Events Created', current: 8, max: 12, color: 'var(--hive-brand-accent)' },
                              { label: 'Connections', current: 127, max: 200, color: 'var(--hive-status-info)' }
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
                                    {item.label}
                                  </span>
                                  <span className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                    {item.current} / {item.max}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                  <motion.div 
                                    className="h-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.current / item.max) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 + idx * 0.2, ease: 'easeInOut' }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Achievement Showcase */}
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <Trophy className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-accent)' }} />
                              Recent Achievements
                            </h4>
                            
                            <div className="space-y-3">
                              {ubStudentProfile.builder.achievements.map((achievement, idx) => (
                                <motion.div
                                  key={idx}
                                  className="flex items-center p-3 rounded-lg cursor-pointer"
                                  style={{
                                    background: 'var(--hive-background-secondary)',
                                    border: '1px solid var(--hive-border-subtle)'
                                  }}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1 + idx * 0.1 }}
                                  whileHover={{
                                    borderColor: 'var(--hive-border-gold)',
                                    scale: 1.02
                                  }}
                                >
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                       style={{
                                         backgroundColor: idx === 0 ? 'var(--hive-overlay-gold-subtle)' :
                                                       idx === 1 ? 'rgba(34, 197, 94, 0.1)' :
                                                       idx === 2 ? 'rgba(59, 130, 246, 0.1)' :
                                                       'rgba(168, 85, 247, 0.1)',
                                         border: `1px solid ${idx === 0 ? 'var(--hive-border-gold)' :
                                                             idx === 1 ? 'rgba(34, 197, 94, 0.3)' :
                                                             idx === 2 ? 'rgba(59, 130, 246, 0.3)' :
                                                             'rgba(168, 85, 247, 0.3)'}`
                                       }}>
                                    {idx === 0 ? <Star className="w-4 h-4" style={{ color: 'var(--hive-brand-primary)' }} /> :
                                     idx === 1 ? <Trophy className="w-4 h-4 text-green-400" /> :
                                     idx === 2 ? <Target className="w-4 h-4 text-blue-400" /> :
                                     <Sparkles className="w-4 h-4 text-purple-400" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                      {achievement}
                                    </div>
                                    <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                      Unlocked {Math.floor(Math.random() * 7) + 1} days ago
                                    </div>
                                  </div>
                                  <Check className="w-4 h-4" style={{ color: 'var(--hive-status-success)' }} />
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Revolutionary Campus Spaces Widget */}
                  <Card 
                    className="overflow-hidden group"
                    style={{
                      background: 'var(--hive-overlay-glass-strong)',
                      borderColor: 'var(--hive-border-primary)'
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                          <motion.div
                            className="p-2 rounded-lg mr-3"
                            style={{
                              background: 'var(--hive-overlay-gold-subtle)',
                              border: '1px solid var(--hive-border-gold)'
                            }}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          >
                            <Users className="w-5 h-5" style={{ color: 'var(--hive-brand-primary)' }} />
                          </motion.div>
                          <div>
                            <div className="text-lg font-bold">My Campus Spaces</div>
                            <div className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                              {campusSpaces.length} active communities • {campusSpaces.filter(s => s.isLeader).length} leading
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" style={{ color: 'var(--hive-brand-primary)' }}>
                          Manage Spaces
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {campusSpaces.map((space, index) => (
                          <motion.div
                            key={space.id}
                            className="relative p-5 rounded-xl cursor-pointer border overflow-hidden group/card"
                            style={{
                              background: 'var(--hive-background-secondary)',
                              borderColor: 'var(--hive-border-subtle)',
                              transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                              scale: 1.03,
                              borderColor: 'var(--hive-border-gold)',
                              y: -4
                            }}
                            onHoverStart={() => setHoveredCard(`space-${space.id}`)}
                            onHoverEnd={() => setHoveredCard(null)}
                          >
                            {/* Dynamic Background */}
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover/card:opacity-100"
                              style={{
                                background: space.type === 'academic' ? 'linear-gradient(135deg, var(--hive-overlay-gold-subtle), transparent 70%)' :
                                           space.type === 'housing' ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), transparent 70%)' :
                                           'linear-gradient(135deg, rgba(168, 85, 247, 0.1), transparent 70%)'
                              }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                            
                            <div className="relative z-10">
                              {/* Header with Icon and Leadership Badge */}
                              <div className="flex items-start justify-between mb-4">
                                <motion.div 
                                  className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                                  style={{
                                    backgroundColor: space.type === 'academic' ? 'var(--hive-overlay-gold-subtle)' :
                                                   space.type === 'housing' ? 'rgba(34, 197, 94, 0.15)' :
                                                   'rgba(168, 85, 247, 0.15)',
                                    border: `2px solid ${space.type === 'academic' ? 'var(--hive-border-gold)' :
                                                         space.type === 'housing' ? 'rgba(34, 197, 94, 0.4)' :
                                                         'rgba(168, 85, 247, 0.4)'}`
                                  }}
                                  whileHover={{ rotate: 15, scale: 1.1 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                  <span className="text-sm font-bold"
                                        style={{
                                          color: space.type === 'academic' ? 'var(--hive-brand-primary)' :
                                                 space.type === 'housing' ? 'rgb(34, 197, 94)' :
                                                 'rgb(168, 85, 247)'
                                        }}>
                                    {space.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                  </span>
                                  
                                  {/* Pulse Effect for High Engagement */}
                                  {space.engagement === 'very_high' && (
                                    <motion.div
                                      className="absolute inset-0 rounded-xl border-2"
                                      style={{
                                        borderColor: space.type === 'academic' ? 'var(--hive-brand-primary)' :
                                                   space.type === 'housing' ? 'rgb(34, 197, 94)' :
                                                   'rgb(168, 85, 247)'
                                      }}
                                      animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0, 0.5]
                                      }}
                                      transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                      }}
                                    />
                                  )}
                                </motion.div>
                                
                                <div className="flex flex-col items-end space-y-2">
                                  {space.isLeader && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                      <Badge style={{
                                        backgroundColor: 'var(--hive-overlay-gold-subtle)',
                                        color: 'var(--hive-brand-primary)',
                                        border: '1px solid var(--hive-border-gold)',
                                        fontSize: '10px'
                                      }}>
                                        <Star className="w-3 h-3 mr-1" />
                                        Leader
                                      </Badge>
                                    </motion.div>
                                  )}
                                  
                                  {/* Engagement Indicator */}
                                  <motion.div 
                                    className="flex items-center space-x-1"
                                    animate={{
                                      opacity: hoveredCard === `space-${space.id}` ? 1 : 0.8
                                    }}
                                  >
                                    <motion.div 
                                      className={`w-2 h-2 rounded-full`}
                                      style={{
                                        backgroundColor: space.engagement === 'very_high' ? 'var(--hive-status-success)' :
                                                      space.engagement === 'high' ? 'var(--hive-status-warning)' : 
                                                      'var(--hive-text-muted)'
                                      }}
                                      animate={{
                                        scale: space.engagement === 'very_high' ? [1, 1.3, 1] : 1
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: space.engagement === 'very_high' ? Infinity : 0,
                                        ease: 'easeInOut'
                                      }}
                                    />
                                    <span className="text-xs font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                      {space.engagement === 'very_high' ? 'Very Active' :
                                       space.engagement === 'high' ? 'Active' : 'Quiet'}
                                    </span>
                                  </motion.div>
                                </div>
                              </div>
                              
                              {/* Space Info */}
                              <div className="mb-4">
                                <h4 className="text-lg font-bold mb-1" style={{ color: 'var(--hive-text-primary)' }}>
                                  {space.name}
                                </h4>
                                <p className="text-sm mb-3" style={{ color: 'var(--hive-text-secondary)' }}>
                                  Active campus community for {space.category.toLowerCase()}
                                </p>
                                
                                {/* Stats Row */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                      <Users className="w-4 h-4" style={{ color: 'var(--hive-text-muted)' }} />
                                      <span className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                        {space.memberCount}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-4 h-4" style={{ color: 'var(--hive-text-muted)' }} />
                                      <span className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                        {space.lastActivity}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs"
                                    style={{
                                      borderColor: space.type === 'academic' ? 'var(--hive-border-gold)' :
                                                 space.type === 'housing' ? 'rgba(34, 197, 94, 0.3)' :
                                                 'rgba(168, 85, 247, 0.3)',
                                      color: space.type === 'academic' ? 'var(--hive-brand-primary)' :
                                             space.type === 'housing' ? 'rgb(34, 197, 94)' :
                                             'rgb(168, 85, 247)',
                                      backgroundColor: 'transparent'
                                    }}
                                  >
                                    {space.category}
                                  </Badge>
                                </div>
                              </div>
                              
                              {/* Quick Action Button */}
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredCard === `space-${space.id}` ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-4 right-4"
                              >
                                <Button
                                  size="sm"
                                  style={{
                                    backgroundColor: space.type === 'academic' ? 'var(--hive-brand-primary)' :
                                                   space.type === 'housing' ? 'rgb(34, 197, 94)' :
                                                   'rgb(168, 85, 247)',
                                    color: 'var(--hive-text-inverse)',
                                    fontSize: '11px'
                                  }}
                                >
                                  <ArrowRight className="w-3 h-3 mr-1" />
                                  Open
                                </Button>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revolutionary Campus Tools Showcase */}
                  <Card 
                    className="overflow-hidden group"
                    style={{
                      background: 'var(--hive-overlay-glass-strong)',
                      borderColor: 'var(--hive-border-primary)'
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                          <motion.div
                            className="p-2 rounded-lg mr-3"
                            style={{
                              background: 'var(--hive-overlay-gold-subtle)',
                              border: '1px solid var(--hive-border-gold)'
                            }}
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          >
                            <Wrench className="w-5 h-5" style={{ color: 'var(--hive-brand-primary)' }} />
                          </motion.div>
                          <div>
                            <div className="text-lg font-bold">My Campus Tools</div>
                            <div className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                              {ubStudentProfile.builder.toolsCreated} tools created • {ubStudentProfile.builder.totalUsage.toLocaleString()} total uses
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" style={{ color: 'var(--hive-brand-primary)' }}>
                          Builder Dashboard
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {createdTools.slice(0, 2).map((tool, index) => (
                          <motion.div
                            key={tool.id}
                            className="relative p-6 rounded-2xl cursor-pointer border overflow-hidden group/tool"
                            style={{
                              background: 'var(--hive-background-secondary)',
                              borderColor: 'var(--hive-border-subtle)',
                              transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ 
                              scale: 1.03,
                              y: -8,
                              borderColor: 'var(--hive-border-gold)'
                            }}
                            onHoverStart={() => setHoveredCard(`tool-${tool.id}`)}
                            onHoverEnd={() => setHoveredCard(null)}
                          >
                            {/* Animated Background Patterns */}
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover/tool:opacity-100"
                              style={{
                                background: 'linear-gradient(135deg, var(--hive-overlay-gold-subtle) 0%, transparent 50%, var(--hive-overlay-gold-subtle) 100%)'
                              }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                            
                            {/* Floating Particles Effect */}
                            <motion.div 
                              className="absolute top-4 right-4 w-2 h-2 rounded-full"
                              style={{ backgroundColor: 'var(--hive-brand-primary)' }}
                              animate={{
                                y: hoveredCard === `tool-${tool.id}` ? [-5, -15, -5] : 0,
                                opacity: hoveredCard === `tool-${tool.id}` ? [1, 0.5, 1] : 0.3
                              }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div 
                              className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: 'var(--hive-brand-accent)' }}
                              animate={{
                                y: hoveredCard === `tool-${tool.id}` ? [-3, -12, -3] : 0,
                                opacity: hoveredCard === `tool-${tool.id}` ? [0.8, 0.3, 0.8] : 0.2
                              }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            />
                            <motion.div 
                              className="absolute top-6 right-12 w-1 h-1 rounded-full"
                              style={{ backgroundColor: 'var(--hive-status-success)' }}
                              animate={{
                                y: hoveredCard === `tool-${tool.id}` ? [-2, -8, -2] : 0,
                                opacity: hoveredCard === `tool-${tool.id}` ? [0.6, 0.2, 0.6] : 0.1
                              }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            />
                            
                            <div className="relative z-10">
                              {/* Header Section */}
                              <div className="flex items-start justify-between mb-6">
                                <motion.div 
                                  className="p-4 rounded-xl relative"
                                  style={{
                                    background: hoveredCard === `tool-${tool.id}` 
                                      ? 'var(--hive-overlay-gold-subtle)'
                                      : 'var(--hive-background-interactive)',
                                    border: hoveredCard === `tool-${tool.id}` 
                                      ? '1px solid var(--hive-border-gold)' 
                                      : '1px solid var(--hive-border-subtle)',
                                    transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                                  }}
                                  whileHover={{ rotate: 360, scale: 1.1 }}
                                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                                >
                                  <Zap className="w-7 h-7" 
                                       style={{ 
                                         color: hoveredCard === `tool-${tool.id}` 
                                           ? 'var(--hive-brand-primary)' 
                                           : 'var(--hive-text-secondary)' 
                                       }} />
                                  
                                  {/* Tool Type Indicator */}
                                  <motion.div
                                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                                    style={{
                                      backgroundColor: tool.type === 'web_app' ? 'var(--hive-status-info)' :
                                                     tool.type === 'widget' ? 'var(--hive-status-warning)' :
                                                     'var(--hive-status-success)'
                                    }}
                                    animate={{
                                      scale: hoveredCard === `tool-${tool.id}` ? [1, 1.3, 1] : 1
                                    }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                                  />
                                </motion.div>
                                
                                <div className="flex flex-col items-end space-y-2">
                                  {tool.isPopular && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                      transition={{ delay: 0.5 + index * 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                                    >
                                      <Badge style={{
                                        backgroundColor: 'var(--hive-status-success)',
                                        color: 'var(--hive-text-inverse)',
                                        fontSize: '11px'
                                      }}>
                                        <Star className="w-3 h-3 mr-1" />
                                        Popular
                                      </Badge>
                                    </motion.div>
                                  )}
                                  
                                  {/* Growth Indicator */}
                                  <motion.div
                                    className="flex items-center space-x-1"
                                    animate={{
                                      opacity: hoveredCard === `tool-${tool.id}` ? 1 : 0.7
                                    }}
                                  >
                                    <motion.div
                                      animate={{
                                        rotate: hoveredCard === `tool-${tool.id}` ? 360 : 0
                                      }}
                                      transition={{ duration: 1, ease: 'easeInOut' }}
                                    >
                                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--hive-status-success)' }} />
                                    </motion.div>
                                    <span className="text-xs font-medium" style={{ color: 'var(--hive-status-success)' }}>
                                      +{tool.monthlyGrowth}%
                                    </span>
                                  </motion.div>
                                </div>
                              </div>
                              
                              {/* Tool Information */}
                              <div className="mb-6">
                                <motion.h3 
                                  className="text-xl font-bold mb-2" 
                                  style={{ color: 'var(--hive-text-primary)' }}
                                  animate={{
                                    color: hoveredCard === `tool-${tool.id}` ? 'var(--hive-brand-primary)' : 'var(--hive-text-primary)'
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {tool.name}
                                </motion.h3>
                                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--hive-text-secondary)' }}>
                                  {tool.description}
                                </p>
                                
                                {/* Tool Category */}
                                <Badge 
                                  variant="outline" 
                                  className="text-xs"
                                  style={{
                                    borderColor: 'var(--hive-border-gold)',
                                    color: 'var(--hive-brand-primary)',
                                    backgroundColor: 'var(--hive-overlay-gold-subtle)'
                                  }}
                                >
                                  {tool.category} • {tool.type.replace('_', ' ')}
                                </Badge>
                              </div>
                              
                              {/* Revolutionary Stats Display */}
                              <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-3 gap-4">
                                  <motion.div 
                                    className="text-center p-3 rounded-lg"
                                    style={{
                                      background: hoveredCard === `tool-${tool.id}` 
                                        ? 'var(--hive-background-interactive)' 
                                        : 'transparent'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <motion.div 
                                      className="text-2xl font-bold"
                                      style={{ color: 'var(--hive-brand-primary)' }}
                                      animate={hoveredCard === `tool-${tool.id}` ? { scale: [1, 1.2, 1] } : {}}
                                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                      {(tool.usageCount / 1000).toFixed(1)}k
                                    </motion.div>
                                    <div className="text-xs font-medium" style={{ color: 'var(--hive-text-muted)' }}>
                                      Total Uses
                                    </div>
                                  </motion.div>
                                  
                                  <motion.div 
                                    className="text-center p-3 rounded-lg"
                                    style={{
                                      background: hoveredCard === `tool-${tool.id}` 
                                        ? 'var(--hive-background-interactive)' 
                                        : 'transparent'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <motion.div 
                                      className="text-2xl font-bold flex items-center justify-center"
                                      style={{ color: 'var(--hive-status-success)' }}
                                      animate={hoveredCard === `tool-${tool.id}` ? { scale: [1, 1.2, 1] } : {}}
                                      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
                                    >
                                      {tool.rating}
                                      <Star className="w-4 h-4 ml-1" fill="currentColor" />
                                    </motion.div>
                                    <div className="text-xs font-medium" style={{ color: 'var(--hive-text-muted)' }}>
                                      User Rating
                                    </div>
                                  </motion.div>
                                  
                                  <motion.div 
                                    className="text-center p-3 rounded-lg"
                                    style={{
                                      background: hoveredCard === `tool-${tool.id}` 
                                        ? 'var(--hive-background-interactive)' 
                                        : 'transparent'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <motion.div 
                                      className="text-2xl font-bold"
                                      style={{ color: 'var(--hive-status-info)' }}
                                      animate={hoveredCard === `tool-${tool.id}` ? { scale: [1, 1.2, 1] } : {}}
                                      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
                                    >
                                      #{index + 1}
                                    </motion.div>
                                    <div className="text-xs font-medium" style={{ color: 'var(--hive-text-muted)' }}>
                                      Your Rank
                                    </div>
                                  </motion.div>
                                </div>
                                
                                {/* Usage Progress Bar */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                      Monthly Growth
                                    </span>
                                    <span className="text-xs font-bold" style={{ color: 'var(--hive-status-success)' }}>
                                      +{tool.monthlyGrowth}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <motion.div 
                                      className="h-2 rounded-full bg-gradient-to-r"
                                      style={{ 
                                        backgroundImage: 'linear-gradient(90deg, var(--hive-brand-primary), var(--hive-status-success))'
                                      }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.min(tool.monthlyGrowth * 3, 100)}%` }}
                                      transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: 'easeInOut' }}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Enhanced Action Button */}
                              <div className="flex items-center justify-between">
                                <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                  Updated {new Date(tool.lastUpdated).toLocaleDateString()}
                                </div>
                                
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button 
                                    size="sm"
                                    className="group/btn"
                                    style={{
                                      backgroundColor: 'var(--hive-brand-primary)',
                                      color: 'var(--hive-text-inverse)',
                                      border: 'none'
                                    }}
                                  >
                                    <motion.div
                                      className="flex items-center"
                                      whileHover={{ x: 2 }}
                                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      <span>Launch Tool</span>
                                    </motion.div>
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Quick Create New Tool */}
                      <motion.div
                        className="mt-8 p-6 rounded-xl border-2 border-dashed cursor-pointer"
                        style={{
                          borderColor: 'var(--hive-border-gold)',
                          background: 'var(--hive-overlay-gold-subtle)'
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          borderStyle: 'solid',
                          background: 'var(--hive-background-interactive)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-center">
                          <motion.div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                            style={{
                              background: 'var(--hive-brand-primary)',
                              color: 'var(--hive-text-inverse)'
                            }}
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                          >
                            <Plus className="w-6 h-6" />
                          </motion.div>
                          <h4 className="font-semibold mb-1" style={{ color: 'var(--hive-text-primary)' }}>
                            Create New Campus Tool
                          </h4>
                          <p className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
                            Build something useful for the UB community
                          </p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeView === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Revolutionary Analytics Dashboard */}
                  <div className="space-y-8">
                    
                    {/* Analytics Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                      {[
                        {
                          title: 'Profile Views',
                          value: '2,847',
                          change: '+18% this week',
                          trend: [65, 72, 68, 78, 85, 92, 89],
                          color: 'var(--hive-brand-primary)',
                          icon: Eye
                        },
                        {
                          title: 'Tool Interactions',
                          value: '12,439',
                          change: '+24% this month',
                          trend: [45, 52, 48, 61, 68, 75, 82],
                          color: 'var(--hive-status-success)',
                          icon: Zap
                        },
                        {
                          title: 'Space Engagement',
                          value: '847',
                          change: '+12% this week',
                          trend: [30, 35, 42, 48, 52, 58, 64],
                          color: 'var(--hive-status-info)',
                          icon: Users
                        },
                        {
                          title: 'Campus Impact',
                          value: '94%',
                          change: 'Top 5% at UB',
                          trend: [70, 75, 78, 82, 88, 91, 94],
                          color: 'var(--hive-brand-accent)',
                          icon: TrendingUp
                        }
                      ].map((metric, index) => {
                        const IconComponent = metric.icon;
                        return (
                          <motion.div
                            key={index}
                            variants={hiveVariants.feedCascade}
                            custom={index}
                            whileHover={{ scale: 1.02, y: -4 }}
                            onHoverStart={() => setHoveredCard(`analytics-${index}`)}
                            onHoverEnd={() => setHoveredCard(null)}
                          >
                            <Card 
                              className="overflow-hidden cursor-pointer group relative"
                              style={{
                                background: hoveredCard === `analytics-${index}` 
                                  ? 'var(--hive-overlay-glass-strong)' 
                                  : 'var(--hive-overlay-glass)',
                                borderColor: hoveredCard === `analytics-${index}` 
                                  ? 'var(--hive-border-gold)' 
                                  : 'var(--hive-border-subtle)',
                                transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                              }}
                            >
                              {/* Animated Background */}
                              <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                style={{
                                  background: `linear-gradient(135deg, ${metric.color}08, transparent 70%)`
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                              />
                              
                              <CardContent className="p-6 relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                  <motion.div 
                                    className="p-3 rounded-xl"
                                    style={{
                                      backgroundColor: hoveredCard === `analytics-${index}` 
                                        ? `${metric.color}15` 
                                        : 'var(--hive-background-interactive)',
                                      transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                                    }}
                                    animate={hoveredCard === `analytics-${index}` ? { rotate: 360 } : {}}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                  >
                                    <IconComponent 
                                      className="w-5 h-5" 
                                      style={{ color: metric.color }} 
                                    />
                                  </motion.div>
                                  
                                  {/* Mini Trend Chart */}
                                  <div className="flex items-end space-x-0.5 h-8">
                                    {metric.trend.map((value, idx) => (
                                      <motion.div
                                        key={idx}
                                        className="w-1 rounded-full"
                                        style={{
                                          backgroundColor: metric.color,
                                          height: `${(value / 100) * 32}px`,
                                          opacity: 0.7
                                        }}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(value / 100) * 32}px` }}
                                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                                      />
                                    ))}
                                  </div>
                                </div>
                                
                                <motion.div 
                                  className="text-3xl font-bold mb-1"
                                  style={{ 
                                    color: hoveredCard === `analytics-${index}` ? metric.color : 'var(--hive-text-primary)'
                                  }}
                                  animate={hoveredCard === `analytics-${index}` ? { scale: 1.05 } : {}}
                                >
                                  {metric.value}
                                </motion.div>
                                
                                <div className="text-sm font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                                  {metric.title}
                                </div>
                                
                                <motion.div 
                                  className="text-xs flex items-center"
                                  style={{ color: metric.color }}
                                  animate={{
                                    opacity: hoveredCard === `analytics-${index}` ? 1 : 0.8
                                  }}
                                >
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  {metric.change}
                                </motion.div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Interactive Analytics Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* Campus Engagement Timeline */}
                      <Card style={{
                        background: 'var(--hive-overlay-glass-strong)',
                        borderColor: 'var(--hive-border-primary)'
                      }}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <Activity className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                              Campus Engagement Timeline
                            </div>
                            <Badge style={{
                              backgroundColor: 'var(--hive-overlay-gold-subtle)',
                              color: 'var(--hive-brand-primary)'
                            }}>
                              Last 7 Days
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Activity Graph Visualization */}
                            <div className="h-32 flex items-end justify-between bg-gray-900/20 rounded-lg p-4">
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                                const height = Math.random() * 80 + 20;
                                return (
                                  <div key={day} className="flex flex-col items-center space-y-2">
                                    <motion.div
                                      className="w-6 rounded-full bg-gradient-to-t"
                                      style={{
                                        backgroundImage: 'linear-gradient(to top, var(--hive-brand-primary), var(--hive-brand-accent))',
                                        height: `${height}px`
                                      }}
                                      initial={{ height: 0 }}
                                      animate={{ height: `${height}px` }}
                                      transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
                                      whileHover={{ 
                                        scale: 1.1,
                                        backgroundImage: 'linear-gradient(to top, var(--hive-status-success), var(--hive-brand-primary))'
                                      }}
                                    />
                                    <span className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                      {day}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Engagement Metrics */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-3 rounded-lg" style={{ background: 'var(--hive-background-interactive)' }}>
                                <div className="text-lg font-bold" style={{ color: 'var(--hive-brand-primary)' }}>47</div>
                                <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>Avg Daily</div>
                              </div>
                              <div className="text-center p-3 rounded-lg" style={{ background: 'var(--hive-background-interactive)' }}>
                                <div className="text-lg font-bold" style={{ color: 'var(--hive-status-success)' }}>89%</div>
                                <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>Peak Time</div>
                              </div>
                              <div className="text-center p-3 rounded-lg" style={{ background: 'var(--hive-background-interactive)' }}>
                                <div className="text-lg font-bold" style={{ color: 'var(--hive-status-info)' }}>12hr</div>
                                <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>Avg Session</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tool Performance Analysis */}
                      <Card style={{
                        background: 'var(--hive-overlay-glass-strong)',
                        borderColor: 'var(--hive-border-primary)'
                      }}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <Wrench className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                              Tool Performance Analysis
                            </div>
                            <Button variant="ghost" size="sm" style={{ color: 'var(--hive-brand-primary)' }}>
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {createdTools.map((tool, idx) => (
                              <motion.div
                                key={tool.id}
                                className="flex items-center justify-between p-4 rounded-lg border"
                                style={{
                                  background: 'var(--hive-background-secondary)',
                                  borderColor: 'var(--hive-border-subtle)'
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{
                                  borderColor: 'var(--hive-border-gold)',
                                  scale: 1.01
                                }}
                              >
                                <div className="flex items-center space-x-3">
                                  <div 
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{
                                      background: 'var(--hive-overlay-gold-subtle)',
                                      border: '1px solid var(--hive-border-gold)'
                                    }}
                                  >
                                    <Zap className="w-5 h-5" style={{ color: 'var(--hive-brand-primary)' }} />
                                  </div>
                                  <div>
                                    <div className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                      {tool.name}
                                    </div>
                                    <div className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                                      {(tool.usageCount / 1000).toFixed(1)}k uses • {tool.rating}★
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <div className="text-right">
                                    <div className="text-sm font-medium" style={{ color: 'var(--hive-status-success)' }}>
                                      +{tool.monthlyGrowth}%
                                    </div>
                                    <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                      Growth
                                    </div>
                                  </div>
                                  <div className="w-16 h-8 flex items-end space-x-0.5">
                                    {Array.from({ length: 7 }, (_, i) => (
                                      <motion.div
                                        key={i}
                                        className="flex-1 bg-gradient-to-t rounded-sm"
                                        style={{
                                          backgroundImage: 'linear-gradient(to top, var(--hive-brand-primary), var(--hive-status-success))',
                                          height: `${Math.random() * 100 + 20}%`
                                        }}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${Math.random() * 100 + 20}%` }}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Campus Impact Insights */}
                    <Card style={{
                      background: 'var(--hive-overlay-glass-strong)',
                      borderColor: 'var(--hive-border-primary)'
                    }}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                            <Trophy className="w-5 h-5 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                            Campus Impact Insights
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge style={{
                              backgroundColor: 'var(--hive-overlay-gold-subtle)',
                              color: 'var(--hive-brand-primary)',
                              border: '1px solid var(--hive-border-gold)'
                            }}>
                              Top 5% at UB
                            </Badge>
                            <Button variant="ghost" size="sm" style={{ color: 'var(--hive-brand-primary)' }}>
                              <Share className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          
                          {/* Community Influence */}
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <Users className="w-4 h-4 mr-2" style={{ color: 'var(--hive-status-success)' }} />
                              Community Influence
                            </h4>
                            
                            <div className="space-y-3">
                              {[
                                { label: 'Students Helped', value: 1247, max: 2000, color: 'var(--hive-status-success)' },
                                { label: 'Problems Solved', value: 89, max: 150, color: 'var(--hive-brand-primary)' },
                                { label: 'Connections Made', value: 156, max: 300, color: 'var(--hive-status-info)' }
                              ].map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                      {item.label}
                                    </span>
                                    <span className="text-sm font-bold" style={{ color: 'var(--hive-text-primary)' }}>
                                      {item.value.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <motion.div 
                                      className="h-2 rounded-full"
                                      style={{ backgroundColor: item.color }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                                      transition={{ duration: 1.5, delay: idx * 0.2, ease: 'easeInOut' }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Builder Recognition */}
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <Star className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-primary)' }} />
                              Builder Recognition
                            </h4>
                            
                            <div className="space-y-3">
                              {[
                                { title: 'Innovation Award', date: '2 weeks ago', type: 'gold' },
                                { title: 'Community Builder', date: '1 month ago', type: 'silver' },
                                { title: 'First Tool Creator', date: '3 months ago', type: 'bronze' }
                              ].map((award, idx) => (
                                <motion.div
                                  key={idx}
                                  className="flex items-center p-3 rounded-lg border"
                                  style={{
                                    background: 'var(--hive-background-secondary)',
                                    borderColor: 'var(--hive-border-subtle)'
                                  }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.8 + idx * 0.1 }}
                                  whileHover={{
                                    borderColor: award.type === 'gold' ? 'var(--hive-border-gold)' :
                                                award.type === 'silver' ? 'rgba(156, 163, 175, 0.5)' :
                                                'rgba(194, 120, 3, 0.5)',
                                    scale: 1.02
                                  }}
                                >
                                  <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                    style={{
                                      backgroundColor: award.type === 'gold' ? 'var(--hive-overlay-gold-subtle)' :
                                                     award.type === 'silver' ? 'rgba(156, 163, 175, 0.1)' :
                                                     'rgba(194, 120, 3, 0.1)',
                                      border: `1px solid ${award.type === 'gold' ? 'var(--hive-border-gold)' :
                                                          award.type === 'silver' ? 'rgba(156, 163, 175, 0.3)' :
                                                          'rgba(194, 120, 3, 0.3)'}`
                                    }}
                                  >
                                    <Trophy 
                                      className="w-4 h-4" 
                                      style={{
                                        color: award.type === 'gold' ? 'var(--hive-brand-primary)' :
                                               award.type === 'silver' ? 'rgb(156, 163, 175)' :
                                               'rgb(194, 120, 3)'
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                      {award.title}
                                    </div>
                                    <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                      Earned {award.date}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Campus Rankings */}
                          <div className="space-y-4">
                            <h4 className="font-semibold flex items-center" style={{ color: 'var(--hive-text-primary)' }}>
                              <TrendingUp className="w-4 h-4 mr-2" style={{ color: 'var(--hive-brand-accent)' }} />
                              Campus Rankings
                            </h4>
                            
                            <div className="space-y-4">
                              {[
                                { category: 'Tool Creators', rank: 3, total: 1247, percentile: 99.8 },
                                { category: 'Space Leaders', rank: 12, total: 2891, percentile: 99.6 },
                                { category: 'Community Helpers', rank: 8, total: 5432, percentile: 99.9 }
                              ].map((ranking, idx) => (
                                <motion.div
                                  key={idx}
                                  className="space-y-2"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 1 + idx * 0.1 }}
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium" style={{ color: 'var(--hive-text-secondary)' }}>
                                      {ranking.category}
                                    </span>
                                    <div className="text-right">
                                      <div className="text-sm font-bold" style={{ color: 'var(--hive-brand-primary)' }}>
                                        #{ranking.rank}
                                      </div>
                                      <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                        of {ranking.total.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                      <motion.div 
                                        className="h-1.5 rounded-full bg-gradient-to-r"
                                        style={{ 
                                          backgroundImage: 'linear-gradient(90deg, var(--hive-brand-primary), var(--hive-brand-accent))'
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${ranking.percentile}%` }}
                                        transition={{ duration: 2, delay: 1.2 + idx * 0.2, ease: 'easeInOut' }}
                                      />
                                    </div>
                                    <span className="text-xs font-medium" style={{ color: 'var(--hive-brand-primary)' }}>
                                      {ranking.percentile}%
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeView === 'tools' && (
                <motion.div
                  key="tools"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Revolutionary Builder Command Center */}
                  <Card className="hive-glass border hive-interactive overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, var(--hive-overlay-glass) 0%, rgba(255, 215, 0, 0.08) 100%)',
                          borderColor: 'var(--hive-border-gold)',
                          position: 'relative'
                        }}>
                    
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div 
                        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5"
                        style={{ background: 'radial-gradient(circle, var(--hive-brand-primary) 0%, transparent 70%)' }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 25, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      />
                      <motion.div 
                        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5"
                        style={{ background: 'radial-gradient(circle, var(--hive-status-success) 0%, transparent 70%)' }}
                        animate={{ 
                          scale: [1.2, 1, 1.2],
                          rotate: [360, 0]
                        }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      />
                      
                      {/* Floating Particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full opacity-15"
                          style={{
                            background: 'var(--hive-brand-primary)',
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                          animate={{
                            y: [0, -30, 0],
                            x: [0, 15, -15, 0],
                            scale: [1, 1.5, 0.5, 1],
                            rotate: [0, 180, 360],
                            opacity: [0.1, 0.3, 0.1]
                          }}
                          transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'easeInOut'
                          }}
                        />
                      ))}
                    </div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                          <motion.div 
                            className="flex items-center mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <motion.div
                              className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                              style={{
                                background: 'linear-gradient(135deg, var(--hive-brand-primary), var(--hive-status-success))',
                                color: 'var(--hive-text-inverse)'
                              }}
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <Zap className="w-4 h-4" />
                            </motion.div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-status-success)] bg-clip-text text-transparent">
                              Campus Builder Hub
                            </CardTitle>
                          </motion.div>
                          <p style={{ color: 'var(--hive-text-secondary)' }} className="text-lg">
                            Tools and systems I've built that are transforming UB campus life
                          </p>
                        </div>
                        
                        {/* Builder Status Dashboard */}
                        <motion.div 
                          className="flex flex-col lg:flex-row gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="text-center lg:text-right">
                            <motion.div 
                              className="text-2xl font-bold"
                              style={{ color: 'var(--hive-brand-primary)' }}
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Builder Level 7
                            </motion.div>
                            <div className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                              2,847 XP to next level
                            </div>
                          </div>
                          
                          <Badge 
                            className="text-sm px-4 py-2 self-center lg:self-start"
                            style={{
                              background: 'linear-gradient(135deg, var(--hive-brand-primary), var(--hive-status-success))',
                              color: 'var(--hive-text-inverse)',
                              border: 'none'
                            }}
                          >
                            🏆 Top 3% Builder
                          </Badge>
                        </motion.div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      {/* Builder Stats Overview */}
                      <motion.div 
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                        variants={hiveVariants.feedCascade}
                        initial="hidden"
                        animate="visible"
                      >
                        {[
                          { label: 'Active Tools', value: '7', icon: Zap, color: 'var(--hive-brand-primary)' },
                          { label: 'Total Users', value: '12.4k', icon: Users, color: 'var(--hive-status-success)' },
                          { label: 'Campus Reach', value: '89%', icon: Target, color: 'var(--hive-status-info)' },
                          { label: 'Builder Score', value: '947', icon: Trophy, color: 'var(--hive-status-warning)' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            variants={hiveVariants.feedCascade}
                            custom={index}
                            className="text-center p-4 rounded-lg hive-interactive cursor-pointer"
                            style={{
                              background: 'var(--hive-background-secondary)',
                              border: '1px solid var(--hive-border-subtle)',
                              transition: 'all var(--hive-duration-smooth)'
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              borderColor: 'var(--hive-border-gold)',
                              boxShadow: 'var(--hive-shadow-gold-glow)'
                            }}
                            onHoverStart={() => setHoveredCard(`stat-${index}`)}
                            onHoverEnd={() => setHoveredCard(null)}
                          >
                            <motion.div
                              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                              style={{ 
                                backgroundColor: `${stat.color}15`,
                                color: stat.color
                              }}
                              animate={hoveredCard === `stat-${index}` ? { 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              <stat.icon className="w-5 h-5" />
                            </motion.div>
                            <motion.div 
                              className="text-xl font-bold"
                              style={{ color: stat.color }}
                              animate={hoveredCard === `stat-${index}` ? { scale: [1, 1.2, 1] } : {}}
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-xs font-medium" style={{ color: 'var(--hive-text-muted)' }}>
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Revolutionary Tool Builder Interface */}
                      <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {/* Quick Builder */}
                        <motion.div
                          className="p-6 rounded-xl border-2 border-dashed cursor-pointer relative overflow-hidden"
                          style={{
                            borderColor: 'var(--hive-border-gold)',
                            background: 'var(--hive-overlay-gold-subtle)'
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            borderStyle: 'solid',
                            background: 'var(--hive-background-interactive)',
                            borderColor: 'var(--hive-brand-primary)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => setHoveredCard('quick-builder')}
                          onHoverEnd={() => setHoveredCard(null)}
                        >
                          {/* Animated Background */}
                          <motion.div
                            className="absolute inset-0 opacity-10"
                            style={{
                              background: 'linear-gradient(45deg, var(--hive-brand-primary), transparent, var(--hive-status-success))'
                            }}
                            animate={hoveredCard === 'quick-builder' ? {
                              backgroundPosition: ['0% 0%', '100% 100%']
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                          />

                          <div className="text-center relative z-10">
                            <motion.div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                              style={{
                                background: 'linear-gradient(135deg, var(--hive-brand-primary), var(--hive-status-success))',
                                color: 'var(--hive-text-inverse)'
                              }}
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <Plus className="w-8 h-8" />
                            </motion.div>
                            <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                              Quick Tool Builder
                            </h4>
                            <p className="text-sm mb-4" style={{ color: 'var(--hive-text-secondary)' }}>
                              Create forms, polls, signup sheets, and simple tools in minutes
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                              {['Forms', 'Polls', 'Signups', 'Schedulers'].map((type, i) => (
                                <Badge 
                                  key={i}
                                  variant="outline" 
                                  className="text-xs"
                                  style={{
                                    borderColor: 'var(--hive-border-gold)',
                                    color: 'var(--hive-brand-primary)'
                                  }}
                                >
                                  {type}
                                </Badge>
                              ))}
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button 
                                className="w-full"
                                style={{
                                  backgroundColor: 'var(--hive-brand-primary)',
                                  color: 'var(--hive-text-inverse)'
                                }}
                              >
                                Start Building
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Advanced Builder */}
                        <motion.div
                          className="p-6 rounded-xl border cursor-pointer relative overflow-hidden"
                          style={{
                            background: 'var(--hive-background-secondary)',
                            borderColor: 'var(--hive-border-subtle)'
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            borderColor: 'var(--hive-border-gold)',
                            boxShadow: 'var(--hive-shadow-gold-glow)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => setHoveredCard('advanced-builder')}
                          onHoverEnd={() => setHoveredCard(null)}
                        >
                          {/* Premium Gradient Overlay */}
                          <motion.div
                            className="absolute top-0 right-0 w-24 h-24 opacity-10"
                            style={{
                              background: 'radial-gradient(circle, var(--hive-status-warning) 0%, transparent 70%)'
                            }}
                            animate={hoveredCard === 'advanced-builder' ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />

                          <div className="text-center relative z-10">
                            <motion.div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                              style={{
                                background: 'linear-gradient(135deg, var(--hive-status-warning), var(--hive-status-info))',
                                color: 'var(--hive-text-inverse)'
                              }}
                              whileHover={{ rotate: -15, scale: 1.1 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <Code className="w-8 h-8" />
                            </motion.div>
                            <div className="flex items-center justify-center mb-2">
                              <h4 className="text-xl font-bold mr-2" style={{ color: 'var(--hive-text-primary)' }}>
                                Advanced Builder
                              </h4>
                              <Badge 
                                className="text-xs"
                                style={{
                                  backgroundColor: 'var(--hive-status-warning)',
                                  color: 'white'
                                }}
                              >
                                Pro
                              </Badge>
                            </div>
                            <p className="text-sm mb-4" style={{ color: 'var(--hive-text-secondary)' }}>
                              Full-featured tool development with custom logic, integrations, and deployment
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                              {['Custom Logic', 'APIs', 'Database', 'Deploy'].map((feature, i) => (
                                <Badge 
                                  key={i}
                                  variant="outline" 
                                  className="text-xs"
                                  style={{
                                    borderColor: 'var(--hive-status-warning)',
                                    color: 'var(--hive-status-warning)'
                                  }}
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button 
                                variant="outline"
                                className="w-full"
                                style={{
                                  borderColor: 'var(--hive-status-warning)',
                                  color: 'var(--hive-status-warning)'
                                }}
                              >
                                Coming Soon
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeView === 'spaces' && (
                <motion.div
                  key="spaces"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Spaces Management Content */}
                  <Card style={{
                    background: 'var(--hive-overlay-glass-strong)',
                    borderColor: 'var(--hive-border-primary)'
                  }}>
                    <CardHeader>
                      <CardTitle style={{ color: 'var(--hive-text-primary)' }}>
                        Campus Spaces Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12" style={{ color: 'var(--hive-text-muted)' }}>
                        <Users className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--hive-brand-primary)' }} />
                        <p>Spaces management interface coming soon...</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeView === 'privacy' && (
                <motion.div
                  key="privacy"
                  variants={hiveVariants.fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-8"
                >
                  {/* Privacy Dashboard Header */}
                  <Card className="hive-glass border hive-interactive overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, var(--hive-overlay-glass) 0%, rgba(255, 215, 0, 0.08) 100%)',
                        borderColor: 'var(--hive-border-gold)',
                        position: 'relative'
                      }}>
                    
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div 
                        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, var(--hive-brand-primary) 0%, transparent 70%)' }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      />
                      <motion.div 
                        className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-5"
                        style={{ background: 'radial-gradient(circle, var(--hive-brand-secondary) 0%, transparent 70%)' }}
                        animate={{ 
                          scale: [1.2, 1, 1.2],
                          rotate: [360, 180, 0]
                        }}
                        transition={{ 
                          duration: 15, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      />
                    </div>
                    
                    <CardContent className="p-8 relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center">
                          <motion.div 
                            className="p-4 rounded-xl mr-6 hive-interactive relative"
                            style={{ 
                              backgroundColor: 'var(--hive-brand-primary)', 
                              color: 'var(--hive-text-inverse)',
                              boxShadow: 'var(--hive-shadow-gold-glow)'
                            }}
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: 'var(--hive-shadow-gold-glow-strong)'
                            }}
                          >
                            <Shield className="w-8 h-8" />
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              style={{
                                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                              }}
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                          </motion.div>
                          <div>
                            <h2 className="text-3xl font-bold mb-2" 
                                style={{ color: 'var(--hive-text-primary)' }}>
                              Privacy Command Center
                            </h2>
                            <p className="text-lg" style={{ color: 'var(--hive-text-muted)' }}>
                              Complete control over your campus digital identity
                            </p>
                            <div className="flex items-center mt-3">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                              <span style={{ color: 'var(--hive-text-secondary)' }} className="text-sm">
                                Privacy shields active
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Privacy Score Dashboard */}
                        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border"
                             style={{ borderColor: 'var(--hive-border-primary)' }}>
                          <div className="text-center">
                            <div className="text-sm mb-2" style={{ color: 'var(--hive-text-muted)' }}>
                              Privacy Security Score
                            </div>
                            <motion.div 
                              className="text-5xl font-bold mb-2"
                              style={{ color: 'var(--hive-brand-primary)' }}
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              87%
                            </motion.div>
                            <div className="flex items-center justify-center">
                              <div className="w-16 h-2 bg-gray-700 rounded-full mr-3">
                                <motion.div 
                                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-yellow-500"
                                  initial={{ width: '0%' }}
                                  animate={{ width: '87%' }}
                                  transition={{ duration: 2, ease: 'easeOut' }}
                                />
                              </div>
                              <Badge 
                                className="bg-green-500 text-white text-xs"
                                style={{ backgroundColor: 'var(--hive-status-success)' }}
                              >
                                Excellent
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Privacy Mode Switcher */}
                      <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--hive-border-subtle)' }}>
                        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
                          Quick Privacy Modes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {[
                            { 
                              label: 'Ghost Mode', 
                              description: 'Invisible to all discovery',
                              icon: EyeOff,
                              active: false,
                              color: 'var(--hive-status-error)'
                            },
                            { 
                              label: 'Study Focus', 
                              description: 'Limited notifications only',
                              icon: BookOpen,
                              active: true,
                              color: 'var(--hive-brand-primary)'
                            },
                            { 
                              label: 'Social Mode', 
                              description: 'Full campus interaction',
                              icon: Users,
                              active: false,
                              color: 'var(--hive-status-info)'
                            },
                            { 
                              label: 'Custom', 
                              description: 'Your personalized settings',
                              icon: Settings,
                              active: false,
                              color: 'var(--hive-text-secondary)'
                            }
                          ].map((mode, index) => (
                            <motion.div
                              key={mode.label}
                              className="p-4 rounded-lg border cursor-pointer hive-interactive relative overflow-hidden"
                              style={{
                                backgroundColor: mode.active 
                                  ? 'var(--hive-overlay-gold-subtle)' 
                                  : 'var(--hive-background-tertiary)',
                                borderColor: mode.active 
                                  ? 'var(--hive-border-gold)' 
                                  : 'var(--hive-border-primary)'
                              }}
                              whileHover={{ 
                                scale: 1.02,
                                borderColor: 'var(--hive-border-gold)'
                              }}
                              whileTap={{ scale: 0.98 }}
                              onHoverStart={() => setHoveredCard(mode.label)}
                              onHoverEnd={() => setHoveredCard(null)}
                            >
                              {mode.active && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"
                                  animate={{ x: ['-100%', '200%'] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                />
                              )}
                              
                              <div className="relative z-10 text-center">
                                <mode.icon 
                                  className="w-6 h-6 mx-auto mb-2" 
                                  style={{ color: mode.active ? mode.color : 'var(--hive-text-secondary)' }}
                                />
                                <div className={`font-medium text-sm ${
                                  mode.active ? 'text-yellow-400' : 'text-white'
                                }`}>
                                  {mode.label}
                                </div>
                                <div className="text-xs mt-1 text-gray-400">
                                  {mode.description}
                                </div>
                                {mode.active && (
                                  <motion.div 
                                    className="w-2 h-2 rounded-full bg-green-500 mx-auto mt-2"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advanced Privacy Controls Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Profile Visibility Controls */}
                    <Card className="hive-glass border hive-interactive col-span-2"
                        style={{
                          background: 'var(--hive-overlay-glass)',
                          borderColor: 'var(--hive-border-subtle)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                          e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--hive-border-subtle)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}>
                      <CardHeader>
                        <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                          <Eye className="w-5 h-5 mr-2" />
                          Campus Visibility Settings
                        </CardTitle>
                        <p style={{ color: 'var(--hive-text-muted)' }}>
                          Fine-tune who can discover and interact with your profile
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {[
                            { 
                              category: 'Profile Discovery',
                              settings: [
                                { 
                                  label: 'Appear in search results',
                                  description: 'Allow students to find you through campus search',
                                  enabled: true,
                                  audience: 'All UB students',
                                  icon: Search
                                },
                                {
                                  label: 'Show in space member lists', 
                                  description: 'Display your profile in space rosters',
                                  enabled: true,
                                  audience: 'Space members',
                                  icon: Users
                                },
                                {
                                  label: 'Suggest to similar students',
                                  description: 'Recommend your profile to classmates and dorm-mates',
                                  enabled: false,
                                  audience: 'Academic matches',
                                  icon: UserPlus
                                }
                              ]
                            },
                            {
                              category: 'Activity & Status',
                              settings: [
                                {
                                  label: 'Online status indicator',
                                  description: 'Show green dot when you\'re active on HIVE',
                                  enabled: false,
                                  audience: 'Connections only',
                                  icon: Circle
                                },
                                {
                                  label: 'Recent activity feed',
                                  description: 'Display your space posts and tool usage',
                                  enabled: true,
                                  audience: 'Space members',
                                  icon: Activity
                                },
                                {
                                  label: 'Location sharing',
                                  description: 'Share which campus building you\'re currently in',
                                  enabled: false,
                                  audience: 'Disabled',
                                  icon: MapPin
                                }
                              ]
                            }
                          ].map((category, catIndex) => (
                            <div key={category.category}>
                              <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
                                {category.category}
                              </h4>
                              <div className="space-y-4">
                                {category.settings.map((setting, index) => (
                                  <motion.div
                                    key={setting.label}
                                    className="flex items-start justify-between p-4 rounded-lg border hive-interactive"
                                    style={{ 
                                      backgroundColor: setting.enabled 
                                        ? 'var(--hive-overlay-gold-subtle)' 
                                        : 'var(--hive-background-tertiary)',
                                      borderColor: setting.enabled 
                                        ? 'var(--hive-border-gold)' 
                                        : 'var(--hive-border-primary)'
                                    }}
                                    whileHover={{ 
                                      backgroundColor: setting.enabled 
                                        ? 'var(--hive-overlay-gold-subtle)' 
                                        : 'var(--hive-background-interactive)'
                                    }}
                                  >
                                    <div className="flex items-start flex-1">
                                      <setting.icon 
                                        className="w-5 h-5 mt-0.5 mr-3" 
                                        style={{ 
                                          color: setting.enabled 
                                            ? 'var(--hive-brand-primary)' 
                                            : 'var(--hive-text-muted)' 
                                        }} 
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                          <span style={{ color: 'var(--hive-text-primary)' }} className="font-medium">
                                            {setting.label}
                                          </span>
                                          {setting.enabled && (
                                            <motion.div 
                                              className="w-2 h-2 rounded-full bg-green-500 ml-2"
                                              animate={{ opacity: [1, 0.5, 1] }}
                                              transition={{ duration: 2, repeat: Infinity }}
                                            />
                                          )}
                                        </div>
                                        <p style={{ color: 'var(--hive-text-muted)' }} className="text-sm mb-2">
                                          {setting.description}
                                        </p>
                                        <Badge 
                                          variant="outline" 
                                          className="text-xs"
                                          style={{ 
                                            borderColor: setting.enabled 
                                              ? 'var(--hive-border-gold)' 
                                              : 'var(--hive-border-subtle)',
                                            color: setting.enabled 
                                              ? 'var(--hive-brand-primary)' 
                                              : 'var(--hive-text-muted)'
                                          }}
                                        >
                                          {setting.audience}
                                        </Badge>
                                      </div>
                                    </div>
                                    <Switch 
                                      checked={setting.enabled} 
                                      className="ml-4"
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Privacy Actions Sidebar */}
                    <div className="space-y-6">
                      
                      {/* Data Control Center */}
                      <Card className="hive-glass border hive-interactive"
                          style={{
                            background: 'var(--hive-overlay-glass)',
                            borderColor: 'var(--hive-border-subtle)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                            e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--hive-border-subtle)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg" style={{ color: 'var(--hive-brand-primary)' }}>
                            <Database className="w-5 h-5 mr-2" />
                            Data Control
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              {
                                label: 'Analytics Sharing',
                                description: 'Help improve HIVE with usage data',
                                enabled: true,
                                type: 'analytics'
                              },
                              {
                                label: 'Research Participation', 
                                description: 'Contribute to campus research studies',
                                enabled: false,
                                type: 'research'
                              },
                              {
                                label: 'Recommendation Engine',
                                description: 'Personalized space and tool suggestions',
                                enabled: true,
                                type: 'recommendations'
                              }
                            ].map((control) => (
                              <div key={control.label} className="flex items-center justify-between p-3 rounded-lg"
                                   style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>
                                <div className="flex-1">
                                  <div className="text-sm font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                    {control.label}
                                  </div>
                                  <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                    {control.description}
                                  </div>
                                </div>
                                <Switch checked={control.enabled} />
                              </div>
                            ))}
                            
                            {/* Data Export */}
                            <div className="pt-4 border-t" style={{ borderColor: 'var(--hive-border-subtle)' }}>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full hive-interactive"
                                style={{ 
                                  borderColor: 'var(--hive-border-primary)', 
                                  color: 'var(--hive-text-primary)' 
                                }}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Export My Data
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Security Status */}
                      <Card className="hive-glass border hive-interactive"
                          style={{
                            background: 'linear-gradient(135deg, var(--hive-overlay-glass) 0%, rgba(34, 197, 94, 0.05) 100%)',
                            borderColor: 'var(--hive-status-success)'
                          }}>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="p-2 rounded-lg mr-3"
                                 style={{ backgroundColor: 'var(--hive-status-success)' }}>
                              <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                                Security Status
                              </div>
                              <div className="text-sm" style={{ color: 'var(--hive-status-success)' }}>
                                All systems secure
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {[
                              { label: 'Password strength', status: 'Strong', color: 'var(--hive-status-success)' },
                              { label: 'Email verification', status: 'Verified', color: 'var(--hive-status-success)' },
                              { label: 'Login sessions', status: '3 active', color: 'var(--hive-status-info)' }
                            ].map((item) => (
                              <div key={item.label} className="flex items-center justify-between text-sm">
                                <span style={{ color: 'var(--hive-text-secondary)' }}>{item.label}</span>
                                <span style={{ color: item.color }}>{item.status}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Emergency Controls */}
                      <Card className="hive-glass border"
                          style={{
                            background: 'linear-gradient(135deg, var(--hive-overlay-glass) 0%, rgba(239, 68, 68, 0.05) 100%)',
                            borderColor: 'var(--hive-status-error)'
                          }}>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <AlertTriangle className="w-5 h-5 mr-2" style={{ color: 'var(--hive-status-error)' }} />
                            <div className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                              Emergency Controls
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full hive-interactive"
                              style={{ 
                                borderColor: 'var(--hive-status-warning)',
                                color: 'var(--hive-status-warning)'
                              }}
                            >
                              <EyeOff className="w-4 h-4 mr-2" />
                              Go Invisible
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full hive-interactive"
                              style={{ 
                                borderColor: 'var(--hive-status-error)',
                                color: 'var(--hive-status-error)'
                              }}
                            >
                              <Trash className="w-4 h-4 mr-2" />
                              Delete Account
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Privacy Insights & Tips */}
                  <Card className="hive-glass border"
                      style={{
                        background: 'linear-gradient(135deg, var(--hive-background-secondary) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        borderColor: 'var(--hive-border-primary)'
                      }}>
                    <CardHeader>
                      <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Privacy Insights & Recommendations
                      </CardTitle>
                      <p style={{ color: 'var(--hive-text-muted)' }}>
                        Personalized tips to enhance your campus privacy
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            title: 'Great Privacy Habits',
                            description: 'You\'ve maintained excellent privacy settings for 3 weeks',
                            icon: TrendingUp,
                            type: 'success',
                            color: 'var(--hive-status-success)'
                          },
                          {
                            title: 'Consider Location Privacy',
                            description: 'Your study location is shared with all space members',
                            icon: MapPin,
                            type: 'warning', 
                            color: 'var(--hive-status-warning)'
                          },
                          {
                            title: 'New Privacy Features',
                            description: 'Check out enhanced profile visibility controls',
                            icon: Star,
                            type: 'info',
                            color: 'var(--hive-status-info)'
                          }
                        ].map((insight) => (
                          <div key={insight.title} 
                               className="p-4 rounded-lg border hive-interactive cursor-pointer"
                               style={{ 
                                 backgroundColor: 'var(--hive-background-tertiary)',
                                 borderColor: 'var(--hive-border-primary)'
                               }}
                               onMouseEnter={(e) => {
                                 e.currentTarget.style.borderColor = insight.color;
                                 e.currentTarget.style.boxShadow = `0 0 20px ${insight.color}20`;
                               }}
                               onMouseLeave={(e) => {
                                 e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                                 e.currentTarget.style.boxShadow = 'none';
                               }}>
                            <div className="flex items-start">
                              <div className="p-2 rounded-lg mr-3"
                                   style={{ backgroundColor: `${insight.color}20` }}>
                                <insight.icon className="w-5 h-5" style={{ color: insight.color }} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1" style={{ color: 'var(--hive-text-primary)' }}>
                                  {insight.title}
                                </h4>
                                <p className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                                  {insight.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Story Definitions
export const CompleteProfileSystemRebuild: Story = {
  render: () => <RevolutionaryProfileLayout />,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
};

export const MobileProfileSystemRebuild: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <RevolutionaryProfileLayout />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' }
  }
};

export const FoundationShowcaseProfileSystem: Story = {
  render: () => (
    <div className="min-h-screen p-8" style={{
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--hive-brand-primary)' }}>
            HIVE Profile System
          </h1>
          <p className="text-xl" style={{ color: 'var(--hive-text-secondary)' }}>
            Completely rebuilt from scratch using the complete HIVE Design System Foundation
          </p>
        </motion.div>
        
        <RevolutionaryProfileLayout />
      </div>
    </div>
  ),
  parameters: { layout: 'fullscreen' }
};