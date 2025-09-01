import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ResponsiveLayout, PageHeader, ContentArea } from '../../components/Layout';
import { HiveErrorBoundary, NetworkError, FallbackUI } from '../../components/ErrorHandling';
import { LoadingOrchestrator } from '../../components/Loading';
import { LazyRoutes, Preloader, OfflineHandler } from '../../components/Performance';
import { Text } from '../../atomic/atoms/text';
import { Button } from '../../atomic/atoms/button';

// Mock component for Storybook CSF compliance
const CompleteSystemShowcase = () => <div>Complete System Showcase</div>;

const meta: Meta<typeof CompleteSystemShowcase> = {
  title: '16-HIVE Architecture/Complete System Showcase',
  component: CompleteSystemShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🚀 HIVE Complete Architecture System

**The most advanced, student-focused platform architecture ever built.**

This showcase demonstrates the complete HIVE architecture system working together:
- **Layout System**: Responsive, intelligent, campus-optimized
- **Error Handling**: Empathetic, campus-aware, student-friendly
- **Loading System**: Performance theater with network intelligence
- **Performance**: Smart code splitting, preloading, offline support

## Key Features

### 🎯 Campus Intelligence
- Network quality detection and adaptation
- Campus Wi-Fi specific optimizations
- Location-aware suggestions and messaging
- Time-of-day usage pattern recognition

### 👩‍🎓 Student-First Design
- Encouraging error messages that don't blame the user
- Context-aware interfaces (Profile, Spaces, Tools, Feed)
- Thumb-friendly mobile interactions
- Progressive disclosure of complexity

### ⚡ Performance Excellence
- Layout shift prevention with CLS tracking
- Predictive resource loading
- Intelligent code splitting
- Offline-first with smart sync

### ♿ Accessibility Built-In
- Screen reader announcements
- Focus management
- Keyboard navigation
- WCAG 2.1 AA compliance

Every component follows HIVE's design principles:
- **Clarity Over Decoration**
- **Speed Over Beauty** 
- **Flexibility Over Prescription**
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Mock data and contexts
const mockCampusContext = {
  networkQuality: 'good' as const,
  timeOfDay: 'afternoon' as const,
  campusLoad: 'medium' as const,
  deviceType: 'mobile' as const
};

const mockUser = {
  id: 'user-123',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  isBuilder: true,
  campusRole: 'student' as const
};

const mockResources = [
  {
    id: 'critical-css',
    name: 'Critical Styles',
    priority: 'critical' as const,
    estimatedTime: 200
  },
  {
    id: 'profile-data',
    name: 'Profile Information', 
    priority: 'high' as const,
    estimatedTime: 800
  },
  {
    id: 'tools-data',
    name: 'User Tools',
    priority: 'medium' as const,
    estimatedTime: 1200
  }
];

// Complete Profile Page Example
const ProfilePageShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  const triggerError = () => setHasError(true);
  const toggleOffline = () => setIsOffline(!isOffline);
  const resetDemo = () => {
    setIsLoading(true);
    setHasError(false);
    setIsOffline(false);
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  if (isLoading) {
    return (
      <LoadingOrchestrator
        resources={mockResources}
        campusContext={mockCampusContext}
        userJourney={{
          currentPage: 'profile',
          userPattern: 'creator',
          timeSpent: 0,
          commonNextActions: ['edit-profile', 'view-tools']
        }}
        showProgress
        showStudentFriendlyMessages
        enablePerformanceTheater
      />
    );
  }
  
  return (
    <OfflineHandler
      offlineCapability="read-only"
      campusContext={{
        location: 'dorm',
        commonDisconnectPatterns: {
          expectedDuration: 5,
          reliability: 'medium',
          alternatives: ['Library', 'Student Center']
        },
        campusWifiStatus: isOffline ? 'outage' : 'operational'
      }}
      enableOfflineNotifications
      showOfflineIndicator
    >
      <HiveErrorBoundary
        context={{
          user: mockUser,
          pageType: 'profile'
        }}
        enableErrorReporting
        showDebugInfo
      >
        <ResponsiveLayout
          strategy="mobile-first"
          contentDensity="comfortable"
          campusContext={mockCampusContext}
          adaptToNotch
          enableGestureNavigation
        >
          <PageHeader
            title="Alex Chen"
            subtitle="Computer Science • Class of 2025"
            pageType="profile"
            userRole="student"
            campusContext={{
              isBuilder: true
            }}
            primaryAction={{
              id: 'edit',
              label: 'Edit Profile',
              onClick: () => console.log('Edit profile'),
              priority: 'high'
            }}
            secondaryActions={[
              {
                id: 'share',
                label: 'Share',
                onClick: () => console.log('Share profile'),
                priority: 'medium'
              },
              {
                id: 'settings',
                label: 'Settings',
                onClick: () => console.log('Settings'),
                priority: 'low'
              }
            ]}
            breadcrumbs={[
              { label: 'HIVE', href: '/' },
              { label: 'Profile', isActive: true }
            ]}
          />
          
          <ContentArea
            strategy="static"
            focusStrategy="preserve"
            enableKeyboardNavigation
            padding="adaptive"
            spacing="adaptive"
          >
            <div className="space-y-6">
              {/* Profile Content */}
              <div className="bg-hive-background-secondary/20 rounded-lg p-6">
                <Text variant="heading-md" color="primary" className="mb-4">
                  🎓 Your Campus Command Center
                </Text>
                <Text variant="body-md" color="secondary">
                  This is your personalized HIVE profile - where your academic life, 
                  social connections, and creative projects come together.
                </Text>
              </div>
              
              {/* Tools Section */}
              <div className="bg-hive-background-secondary/20 rounded-lg p-6">
                <Text variant="heading-sm" color="primary" className="mb-3">
                  🛠️ Your Tools & Creations
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-hive-gold/5 border border-hive-gold/20 rounded-lg p-4">
                    <Text variant="body-sm" className="font-medium">Study Group Scheduler</Text>
                    <Text variant="body-xs" color="tertiary" className="mt-1">125 students using</Text>
                  </div>
                  <div className="bg-hive-emerald/5 border border-hive-emerald/20 rounded-lg p-4">
                    <Text variant="body-sm" className="font-medium">GPA Calculator</Text>
                    <Text variant="body-xs" color="tertiary" className="mt-1">89 students using</Text>
                  </div>
                </div>
              </div>
              
              {/* Demo Controls */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
                <Text variant="heading-sm" color="primary" className="mb-4">
                  🎬 Demo Controls
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={triggerError}
                  >
                    Trigger Error
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={toggleOffline}
                  >
                    {isOffline ? 'Go Online' : 'Simulate Offline'}
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={resetDemo}
                  >
                    Reset Demo
                  </Button>
                </div>
              </div>
            </div>
          </ContentArea>
        </ResponsiveLayout>
      </HiveErrorBoundary>
    </OfflineHandler>
  );
};

// Network Error Showcase
const NetworkErrorShowcase = () => {
  const [errorType, setErrorType] = useState<'connection-lost' | 'timeout' | 'campus-maintenance'>('connection-lost');
  
  return (
    <div className="min-h-screen bg-hive-background-primary">
      <div className="p-6 space-y-4">
        <Text variant="heading-lg" color="primary">Network Error Scenarios</Text>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={errorType === 'connection-lost' ? 'primary' : 'secondary'}
            onClick={() => setErrorType('connection-lost')}
          >
            Connection Lost
          </Button>
          <Button 
            size="sm" 
            variant={errorType === 'timeout' ? 'primary' : 'secondary'}
            onClick={() => setErrorType('timeout')}
          >
            Timeout
          </Button>
          <Button 
            size="sm" 
            variant={errorType === 'campus-maintenance' ? 'primary' : 'secondary'}
            onClick={() => setErrorType('campus-maintenance')}
          >
            Campus Maintenance
          </Button>
        </div>
      </div>
      
      <NetworkError
        errorType={errorType}
        campusContext={{
          type: 'campus-wifi',
          name: 'University WiFi',
          knownIssues: [
            'High usage during class hours',
            'Limited bandwidth in dorm areas'
          ],
          alternativeSuggestions: [
            'Try the library - usually faster there',
            'Mobile hotspot as backup'
          ]
        }}
        networkCondition="poor"
        onRetry={async () => {
          console.log('Retrying connection...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }}
        enableNetworkTips
        showAlternativeLocations
        showCampusStatus
      />
    </div>
  );
};

// Fallback UI Showcase
const FallbackUIShowcase = () => {
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe'>('moderate');
  
  return (
    <div className="min-h-screen bg-hive-background-primary p-6">
      <div className="mb-6 space-y-4">
        <Text variant="heading-lg" color="primary">Graceful Degradation Scenarios</Text>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={severity === 'minor' ? 'primary' : 'secondary'}
            onClick={() => setSeverity('minor')}
          >
            Minor Issues
          </Button>
          <Button 
            size="sm" 
            variant={severity === 'moderate' ? 'primary' : 'secondary'}
            onClick={() => setSeverity('moderate')}
          >
            Moderate Issues
          </Button>
          <Button 
            size="sm" 
            variant={severity === 'severe' ? 'primary' : 'secondary'}
            onClick={() => setSeverity('severe')}
          >
            Severe Issues
          </Button>
        </div>
      </div>
      
      <FallbackUI
        severity={severity}
        failedFeatures={severity === 'severe' ? ['creation', 'analytics'] : severity === 'moderate' ? ['analytics'] : []}
        context={{
          area: 'tools',
          user: { isBuilder: true },
          criticalFeatures: ['core', 'social'],
          availableOffline: ['view-tools', 'cached-data']
        }}
        strategy="progressive-disclosure"
        workingFeatures={['Profile access', 'Saved tools', 'Basic navigation']}
        offlineCapabilities={['View cached content', 'Create drafts', 'Queue actions']}
        onRetry={async () => {
          console.log('Attempting to restore full features...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }}
        onSwitchMode={(mode) => console.log('Switched to mode:', mode)}
        showFeatureStatus
      />
    </div>
  );
};

export const CompleteProfilePage: Story = {
  render: ProfilePageShowcase,
  parameters: {
    docs: {
      description: {
        story: `
### 🎯 Complete Profile Page Integration

This story showcases the entire HIVE architecture working together in a real profile page scenario:

- **ResponsiveLayout** with campus network optimization
- **PageHeader** with contextual profile actions
- **ContentArea** with smart content management
- **ErrorBoundary** with student-friendly error handling
- **LoadingOrchestrator** with performance theater
- **OfflineHandler** with campus-aware offline support

**Try the demo controls** to see how the system handles errors and offline scenarios!
        `
      }
    }
  }
};

export const NetworkErrorScenarios: Story = {
  render: NetworkErrorShowcase,
  parameters: {
    docs: {
      description: {
        story: `
### 📡 Campus Network Error Handling

Demonstrates intelligent network error handling with campus-specific context:

- **Connection Lost**: Standard Wi-Fi dropout with encouraging messaging
- **Timeout**: Campus network congestion with helpful tips
- **Campus Maintenance**: Planned outage with alternative suggestions

Each scenario provides contextual help and maintains student confidence.
        `
      }
    }
  }
};

export const GracefulDegradation: Story = {
  render: FallbackUIShowcase,
  parameters: {
    docs: {
      description: {
        story: `
### 🛡️ Progressive Feature Degradation

Shows how HIVE gracefully handles partial system failures:

- **Minor**: Advanced features limited, core functionality intact
- **Moderate**: Some features unavailable, alternatives provided
- **Severe**: Essential-only mode with clear recovery options

The system always maintains core functionality and provides clear paths forward.
        `
      }
    }
  }
};

export const LoadingTheater: Story = {
  render: () => (
    <LoadingOrchestrator
      resources={[
        {
          id: 'user-profile',
          name: 'Loading your profile...',
          priority: 'critical',
          estimatedTime: 1000
        },
        {
          id: 'tools-data',
          name: 'Getting your tools ready...',
          priority: 'high',
          estimatedTime: 1500
        },
        {
          id: 'spaces-feed',
          name: 'Syncing with your communities...',
          priority: 'medium',
          estimatedTime: 2000
        },
        {
          id: 'analytics-data',
          name: 'Preparing your insights...',
          priority: 'low',
          estimatedTime: 2500
        }
      ]}
      campusContext={mockCampusContext}
      userJourney={{
        currentPage: 'profile',
        userPattern: 'creator',
        timeSpent: 0
      }}
      showProgress
      showPredictions
      showNetworkStatus
      enablePerformanceTheater
      showStudentFriendlyMessages
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
### 🎭 Performance Theater Loading

HIVE's loading system turns waiting into an engaging experience:

- **Real Progress**: Actual load progress, not fake progress bars
- **Student-Friendly Messages**: Encouraging, context-aware messaging
- **Network Intelligence**: Adapts to campus network conditions
- **Performance Theater**: Shows what's happening behind the scenes
- **Predictive Loading**: Anticipates what users need next

Makes every loading moment feel intentional and builds anticipation.
        `
      }
    }
  }
};

// Architecture Overview Story
export const SystemArchitecture: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <Text variant="heading-xl" color="primary">
          🏗️ HIVE Complete Architecture
        </Text>
        <Text variant="body-lg" color="secondary" className="max-w-3xl mx-auto">
          The most advanced, student-focused platform architecture ever built.
          Every component designed with campus life, network realities, and student success in mind.
        </Text>
      </div>
      
      {/* System Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-hive-gold/5 border border-hive-gold/20 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <Text variant="heading-sm" color="primary" className="mb-2">Layout System</Text>
          <Text variant="body-sm" color="secondary">
            Responsive, intelligent layouts that adapt to campus network conditions and user context
          </Text>
        </div>
        
        <div className="bg-hive-emerald/5 border border-hive-emerald/20 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <Text variant="heading-sm" color="primary" className="mb-2">Error Handling</Text>
          <Text variant="body-sm" color="secondary">
            Empathetic, campus-aware error handling that never blames the student
          </Text>
        </div>
        
        <div className="bg-hive-purple/5 border border-hive-purple/20 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">⚡</div>
          <Text variant="heading-sm" color="primary" className="mb-2">Loading System</Text>
          <Text variant="body-sm" color="secondary">
            Performance theater that turns waiting into an engaging, informative experience
          </Text>
        </div>
        
        <div className="bg-hive-blue/5 border border-hive-blue/20 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <Text variant="heading-sm" color="primary" className="mb-2">Performance</Text>
          <Text variant="body-sm" color="secondary">
            Smart code splitting, preloading, and offline support optimized for campus networks
          </Text>
        </div>
      </div>
      
      {/* Key Features */}
      <div className="bg-hive-background-secondary/20 rounded-xl p-8">
        <Text variant="heading-lg" color="primary" className="mb-6 text-center">
          🌟 What Makes This Architecture Special
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Text variant="heading-md" color="primary">Campus Intelligence</Text>
            <ul className="space-y-2 text-sm text-hive-text-secondary">
              <li>• Network quality detection and adaptation</li>
              <li>• Campus Wi-Fi specific optimizations</li>
              <li>• Location-aware suggestions</li>
              <li>• Time-of-day usage patterns</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <Text variant="heading-md" color="primary">Student-First Design</Text>
            <ul className="space-y-2 text-sm text-hive-text-secondary">
              <li>• Encouraging, never-blame-the-user messaging</li>
              <li>• Context-aware interfaces</li>
              <li>• Thumb-friendly mobile interactions</li>
              <li>• Progressive complexity disclosure</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <Text variant="heading-md" color="primary">Performance Excellence</Text>
            <ul className="space-y-2 text-sm text-hive-text-secondary">
              <li>• Layout shift prevention (CLS tracking)</li>
              <li>• Predictive resource loading</li>
              <li>• Intelligent code splitting</li>
              <li>• Offline-first with smart sync</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <Text variant="heading-md" color="primary">Accessibility Built-In</Text>
            <ul className="space-y-2 text-sm text-hive-text-secondary">
              <li>• Screen reader announcements</li>
              <li>• Focus management preservation</li>
              <li>• Full keyboard navigation</li>
              <li>• WCAG 2.1 AA compliance</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Integration Example */}
      <div className="bg-gradient-to-br from-hive-gold/10 via-hive-emerald/5 to-hive-purple/10 rounded-xl p-8">
        <Text variant="heading-lg" color="primary" className="mb-4 text-center">
          🎯 Ready for Production
        </Text>
        <Text variant="body-md" color="secondary" className="text-center max-w-3xl mx-auto">
          This architecture is production-ready and will make HIVE feel like the most polished, 
          student-focused social utility platform ever built. Every interaction feels smooth, 
          every error is helpful, and every loading moment builds anticipation.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### 🏗️ Complete System Architecture

This is the complete HIVE architecture system - a production-ready foundation that will make HIVE the platform students **love** to use.

**Every component follows HIVE's design principles:**
- **Clarity Over Decoration**: Generous whitespace, high contrast, minimal color palette
- **Speed Over Beauty**: Performance as a design feature, instant feedback
- **Flexibility Over Prescription**: Multiple ways to accomplish tasks, user-defined workflows

The result is a platform that feels incredibly polished, empathetic to student needs, and optimized for the realities of campus life.
        `
      }
    }
  }
};