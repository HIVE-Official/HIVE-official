/**
 * HIVE Profile System - Complete User Flows
 * Streamlined Storybook stories showing complete user journeys for UB students
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../atomic/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../atomic/atoms/avatar';
import { Progress } from '../../components/ui/progress';

// Import the main profile dashboard
import { ProfileDashboard, defaultProfileDashboardProps, type ProfileData } from '../../components/profile/profile-dashboard';
// import { FirebaseProvider } from '../../contexts/firebase-context';

import { 
  Users, 
  Calendar, 
  Bell, 
  Eye, 
  Crown, 
  Zap,
  User,
  Settings,
  Grid,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle,
  Star,
  Award,
  Target,
  BarChart3,
  Rocket,
  ExternalLink,
  PlayCircle,
  BookOpen,
  Code,
  Database,
  Camera,
  MessageSquare,
  Shield,
  Globe,
  Search,
  Filter,
  Plus,
  Edit,
  Save,
  Download,
  Upload,
  Share,
  Heart,
  TrendingUp,
  Flame,
  Sparkles,
  Clock,
  MapPin,
  GraduationCap,
  Building2
} from 'lucide-react';

const meta: Meta<typeof React.Fragment> = {
  title: '05-Profile System/Complete User Flows',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🎯 HIVE Profile System - Complete User Flows

**Streamlined Storybook showcasing complete user journeys for University at Buffalo students**

## 📋 User Flow Coverage

### **1. New Student Onboarding**
Complete profile setup flow for first-time UB students including:
- Profile creation with UB email verification
- Academic information setup (major, year, housing)
- Profile customization and bento grid layout
- Privacy settings and ghost mode configuration

### **2. Active Student Dashboard**
Daily usage scenarios for established UB students:
- Profile dashboard with live updates
- Space management and community engagement
- Tool creation and sharing
- Calendar integration and event coordination

### **3. Builder Recognition Journey**
Advanced user flows for student tool creators:
- Builder status recognition and crown badge
- Tool portfolio management
- Community contribution tracking
- Advanced customization features

## 🏗️ Architecture Highlights

- **Responsive Bento Grid**: 4→2→1 column adaptation
- **6 Interactive Cards**: Avatar, Calendar, Notifications, Spaces, Ghost Mode, HiveLAB
- **Real-time State**: Live updates with Firebase integration
- **UB Integration**: Campus-specific features and authentication
- **Mobile-First**: Perfect thumb-friendly interactions

## 🎓 UB-Specific Features

- **Campus Authentication**: @buffalo.edu email validation
- **Housing Integration**: West Campus, Ellicott Complex, Governors
- **Academic Context**: UB course spaces, study groups, campus events
- **Privacy Controls**: Ghost mode for campus visibility management
- **Builder Ecosystem**: Recognition for student tool creators
        `
      }
    }
  }
};

export default meta;

// Demo User Profiles for Different Flows
const newStudentProfile = {
  user: {
    id: 'new-student-alex',
    displayName: 'Alex Rodriguez',
    email: 'alexr@buffalo.edu',
    profilePhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    bio: '',
    academicInfo: {
      year: '2028',
      major: 'Undeclared',
      school: 'University at Buffalo',
      housing: ''
    },
    builderStatus: false,
    isVerified: false,
    ghostMode: false,
    lastSeen: 'just now',
    isOnline: true
  },
  events: [],
  notifications: [],
  spaces: [],
  recommendedSpaces: [
    {
      id: 'orientation-2024',
      name: 'New Student Orientation 2024',
      description: 'Connect with fellow incoming UB students',
      memberCount: 1247,
      category: 'community',
      isPrivate: false,
      membershipStatus: 'none',
      lastActivity: '5 minutes ago',
      tags: ['orientation', 'social', 'new-students']
    },
    {
      id: 'undeclared-majors',
      name: 'Undeclared Majors Support',
      description: 'Explore academic options and get guidance',
      memberCount: 456,
      category: 'academic',
      isPrivate: false,
      membershipStatus: 'none',
      lastActivity: '12 minutes ago',
      tags: ['academic-support', 'advising']
    }
  ],
  ghostModeSettings: {
    isEnabled: false,
    presets: {
      hideActivity: false,
      hideLocation: false,
      hideOnlineStatus: false
    }
  },
  tools: [],
  builderStats: {
    toolsCreated: 0,
    totalUses: 0,
    totalLikes: 0,
    builderRank: 'Newcomer'
  },
  isBuilder: false
};

const activeStudentProfile = {
  user: {
    id: 'active-student-sarah',
    displayName: 'Sarah Chen',
    email: 'sarahc@buffalo.edu',
    profilePhotoURL: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
    bio: 'CS student passionate about building tools that help campus life. Always down for a good study session! 🚀',
    academicInfo: {
      year: '2026',
      major: 'Computer Science',
      school: 'University at Buffalo',
      housing: 'West Campus'
    },
    builderStatus: false,
    isVerified: true,
    ghostMode: false,
    lastSeen: '2 hours ago',
    isOnline: true
  },
  events: [
    {
      id: 'cs331-lecture',
      title: 'CSE 331 Algorithm Analysis',
      startTime: '2024-01-16T14:00:00Z',
      type: 'class',
      location: 'Knox Hall 104',
      description: 'Weekly lecture on graph algorithms'
    },
    {
      id: 'study-session',
      title: 'CS Study Group',
      startTime: '2024-01-16T19:00:00Z',
      type: 'study',
      location: 'Capen Library',
      description: 'Algorithm practice problems'
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      type: 'space_activity',
      title: 'New post in CS Study Collective',
      message: 'Maria shared study notes for CSE 331',
      timestamp: '15 minutes ago',
      isRead: false,
      actionRequired: false
    },
    {
      id: 'notif-2',
      type: 'event_reminder',
      title: 'Study session starting soon',
      message: 'CS Study Group starts in 1 hour',
      timestamp: '45 minutes ago',
      isRead: false,
      actionRequired: true
    }
  ],
  spaces: [
    {
      id: 'cs331',
      name: 'CSE 331: Algorithm Analysis',
      description: 'Course space for algorithm analysis and design',
      memberCount: 247,
      category: 'course',
      isPrivate: false,
      membershipStatus: 'member',
      lastActivity: '15 minutes ago',
      tags: ['computer-science', 'algorithms']
    },
    {
      id: 'west-campus-residents',
      name: 'West Campus Residents',
      description: 'Community for West Campus residents',
      memberCount: 834,
      category: 'housing',
      isPrivate: false,
      membershipStatus: 'member',
      lastActivity: '32 minutes ago',
      tags: ['housing', 'community', 'west-campus']
    },
    {
      id: 'cs-study-collective',
      name: 'CS Study Collective',
      description: 'Study group for CS students',
      memberCount: 89,
      category: 'study',
      isPrivate: false,
      membershipStatus: 'admin',
      lastActivity: '15 minutes ago',
      tags: ['study-group', 'computer-science']
    }
  ],
  recommendedSpaces: [],
  ghostModeSettings: {
    isEnabled: false,
    presets: {
      hideActivity: false,
      hideLocation: false,
      hideOnlineStatus: false
    }
  },
  tools: [
    {
      id: 'gpa-calculator',
      name: 'UB GPA Calculator',
      description: 'Calculate your semester and cumulative GPA',
      category: 'Academic',
      isCreated: false,
      lastUsed: '2 days ago',
      usageCount: 15,
      icon: '📊'
    }
  ],
  builderStats: {
    toolsCreated: 0,
    totalUses: 15,
    totalLikes: 3,
    builderRank: 'User'
  },
  isBuilder: false
};

const builderProfile = {
  user: {
    id: 'builder-marcus',
    displayName: 'Marcus Thompson',
    email: 'marcust@buffalo.edu',
    profilePhotoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    bio: 'Engineering student building tools to improve campus life. Creator of the UB Laundry Tracker and Study Room Finder. Always looking for new ideas! ⚡',
    academicInfo: {
      year: '2025',
      major: 'Computer Engineering',
      school: 'University at Buffalo',
      housing: 'Ellicott Complex'
    },
    builderStatus: true,
    isVerified: true,
    ghostMode: false,
    lastSeen: '30 minutes ago',
    isOnline: true
  },
  events: [
    {
      id: 'hivelab-workshop',
      title: 'HiveLAB Tool Building Workshop',
      startTime: '2024-01-17T18:00:00Z',
      type: 'workshop',
      location: 'Student Union 330',
      description: 'Teaching other students how to build tools'
    }
  ],
  notifications: [
    {
      id: 'builder-notif-1',
      type: 'tool_feedback',
      title: 'New review on Laundry Tracker',
      message: 'Emily left a 5-star review: "Life-changing!"',
      timestamp: '2 hours ago',
      isRead: false,
      actionRequired: false
    },
    {
      id: 'builder-notif-2',
      type: 'builder_milestone',
      title: 'Builder Milestone Achieved!',
      message: 'Your tools have been used 1000+ times this month',
      timestamp: '1 day ago',
      isRead: true,
      actionRequired: false
    }
  ],
  spaces: [
    {
      id: 'hivelab-builders',
      name: 'HiveLAB Builders',
      description: 'Community for student tool creators',
      memberCount: 45,
      category: 'tools',
      isPrivate: false,
      membershipStatus: 'admin',
      lastActivity: '45 minutes ago',
      tags: ['tools', 'building', 'community']
    },
    {
      id: 'engineering-coop',
      name: 'Engineering Co-op Program',
      description: 'Support and networking for engineering co-op students',
      memberCount: 156,
      category: 'career',
      isPrivate: false,
      membershipStatus: 'member',
      lastActivity: '2 hours ago',
      tags: ['engineering', 'career', 'networking']
    }
  ],
  recommendedSpaces: [],
  ghostModeSettings: {
    isEnabled: false,
    presets: {
      hideActivity: false,
      hideLocation: false,
      hideOnlineStatus: false
    }
  },
  tools: [
    {
      id: 'laundry-tracker',
      name: 'UB Laundry Tracker',
      description: 'Real-time laundry machine availability across campus',
      category: 'Campus Life',
      isCreated: true,
      lastUsed: '1 hour ago',
      usageCount: 1247,
      icon: '🧺'
    },
    {
      id: 'study-room-finder',
      name: 'Study Room Finder',
      description: 'Find and book available study rooms',
      category: 'Academic',
      isCreated: true,
      lastUsed: '3 hours ago',
      usageCount: 892,
      icon: '📚'
    },
    {
      id: 'dining-menu-tracker',
      name: 'Campus Dining Menu',
      description: 'Track dining hall menus and nutrition info',
      category: 'Campus Life',
      isCreated: true,
      lastUsed: '5 hours ago',
      usageCount: 567,
      icon: '🍽️'
    }
  ],
  builderStats: {
    toolsCreated: 3,
    totalUses: 2706,
    totalLikes: 234,
    builderRank: 'Expert Builder'
  },
  isBuilder: true
};

// Flow Navigation Component
function FlowNavigation({ 
  currentFlow, 
  onFlowChange 
}: { 
  currentFlow: string; 
  onFlowChange: (flow: string) => void; 
}) {
  const flows = [
    { 
      id: 'onboarding', 
      name: 'New Student Onboarding', 
      icon: User, 
      description: 'First-time UB student setup',
      persona: 'Alex - Incoming Freshman'
    },
    { 
      id: 'active', 
      name: 'Active Student Dashboard', 
      icon: Users, 
      description: 'Daily campus life management',
      persona: 'Sarah - CS Junior'
    },
    { 
      id: 'builder', 
      name: 'Builder Recognition', 
      icon: Crown, 
      description: 'Advanced tool creator features',
      persona: 'Marcus - Engineering Senior'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {flows.map((flow) => {
        const Icon = flow.icon;
        const isActive = currentFlow === flow.id;
        
        return (
          <motion.div
            key={flow.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all ${
                isActive 
                  ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/5' 
                  : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-secondary)]'
              }`}
              onClick={() => onFlowChange(flow.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isActive 
                      ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-primary)]' 
                      : 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-muted)]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">
                      {flow.name}
                    </h3>
                    <p className="text-sm text-[var(--hive-text-muted)] mb-2">
                      {flow.description}
                    </p>
                    <Badge variant={isActive ? "default" : "outline"} className="text-xs">
                      {flow.persona}
                    </Badge>
                  </div>
                  
                  {isActive && (
                    <CheckCircle className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// User Flow Stats Component
function FlowStats({ profile }: { profile: any }) {
  const stats = [
    {
      label: 'Profile Completion',
      value: calculateProfileCompletion(profile),
      max: 100,
      suffix: '%',
      color: 'bg-blue-500'
    },
    {
      label: 'Spaces Joined',
      value: profile.spaces?.length || 0,
      max: 10,
      suffix: '',
      color: 'bg-green-500'
    },
    {
      label: 'Tools Used',
      value: profile.tools?.length || 0,
      max: 5,
      suffix: '',
      color: 'bg-[var(--hive-gold)]'
    },
    {
      label: 'Campus Integration',
      value: profile.user.isVerified ? 100 : 75,
      max: 100,
      suffix: '%',
      color: 'bg-[var(--hive-gold)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat: any) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[var(--hive-text-primary)] mb-1">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm text-[var(--hive-text-muted)] mb-2">
              {stat.label}
            </div>
            <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${stat.color}`}
                style={{ width: `${(stat.value / stat.max) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Helper function to calculate profile completion
function calculateProfileCompletion(profile: any) {
  let completed = 0;
  const total = 8;
  
  if (profile.user.profilePhotoURL) completed++;
  if (profile.user.bio) completed++;
  if (profile.user.academicInfo.major !== 'Undeclared') completed++;
  if (profile.user.academicInfo.housing) completed++;
  if (profile.user.isVerified) completed++;
  if (profile.spaces?.length > 0) completed++;
  if (profile.tools?.length > 0) completed++;
  if (profile.user.builderStatus) completed++;
  
  return Math.round((completed / total) * 100);
}

// Main Story Component
export const CompleteUserFlows: StoryObj = {
  render: () => {
    const [currentFlow, setCurrentFlow] = useState('onboarding');
    const [showMobileView, setShowMobileView] = useState(false);
    
    const getProfileData = () => {
      switch (currentFlow) {
        case 'onboarding': return newStudentProfile;
        case 'active': return activeStudentProfile;
        case 'builder': return builderProfile;
        default: return activeStudentProfile;
      }
    };

    const profileData = getProfileData();

    return (
      <div>
        <div className="min-h-screen bg-[var(--hive-background-primary)]">
          {/* Header */}
          <div className="bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-[var(--hive-text-primary)] p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">HIVE Profile System</h1>
                  <p className="text-xl text-[var(--hive-text-primary)] text-opacity-90">
                    Complete User Flow Demonstrations for University at Buffalo
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowMobileView(!showMobileView)}
                    className="bg-[var(--hive-white)]/20 border-[var(--hive-white)]/20"
                  >
                    {showMobileView ? <Monitor className="w-4 h-4 mr-2" /> : <Smartphone className="w-4 h-4 mr-2" />}
                    {showMobileView ? 'Desktop' : 'Mobile'} View
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm opacity-80">Complete Flows</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm opacity-80">Interactive Cards</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm opacity-80">UB Integrated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Ready</div>
                  <div className="text-sm opacity-80">Production</div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Flow Navigation */}
            <FlowNavigation 
              currentFlow={currentFlow} 
              onFlowChange={setCurrentFlow} 
            />

            {/* Flow Stats */}
            <FlowStats profile={profileData} />

            {/* Current Flow Description */}
            <Card className="bg-[var(--hive-background-secondary)]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-[var(--hive-text-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                      {currentFlow === 'onboarding' && 'New Student Onboarding Flow'}
                      {currentFlow === 'active' && 'Active Student Dashboard Flow'}
                      {currentFlow === 'builder' && 'Builder Recognition Flow'}
                    </h3>
                    <p className="text-[var(--hive-text-muted)]">
                      {currentFlow === 'onboarding' && 'Alex is a new UB student setting up their profile for the first time. This flow covers profile creation, academic setup, and initial space discovery.'}
                      {currentFlow === 'active' && 'Sarah is an established CS student using HIVE for daily campus life. This flow shows space management, tool usage, and social coordination.'}
                      {currentFlow === 'builder' && 'Marcus is an advanced user who creates tools for other students. This flow highlights builder features, community leadership, and tool management.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Profile Dashboard */}
            <div className={`transition-all duration-300 mx-auto ${
              showMobileView ? 'max-w-sm' : 'max-w-7xl'
            }`}>
              <ProfileDashboard 
                userId={profileData.user.id}
                isOwnProfile={true}
              />
            </div>

            {/* Flow Completion Status */}
            <Card className="bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-[var(--hive-text-primary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">
                      Production Ready for University at Buffalo
                    </h3>
                    <p className="text-[var(--hive-text-muted)]">
                      Complete profile system with responsive design, UB integration, 
                      and comprehensive user flows ready for vBETA launch.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Ready</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Complete user flow demonstrations for the HIVE Profile System**

This story showcases three complete user journeys:

1. **New Student Onboarding** - Profile setup and campus integration
2. **Active Student Dashboard** - Daily usage patterns and space management  
3. **Builder Recognition** - Advanced features for tool creators

Each flow demonstrates the full profile system functionality with realistic UB student data and scenarios.
        `
      }
    }
  }
};
