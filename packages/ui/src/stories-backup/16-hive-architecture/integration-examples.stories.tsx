import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ResponsiveLayout, PageHeader, ContentArea } from '../../components/Layout';
import { HiveErrorBoundary, FallbackUI } from '../../components/ErrorHandling';
import { LoadingOrchestrator } from '../../components/Loading';
import { OfflineHandler, Preloader } from '../../components/Performance';
import { Text } from '../../atomic/atoms/text';
import { Button } from '../../atomic/atoms/button';

const meta: Meta = {
  title: '16-HIVE Architecture/Integration Examples',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 💡 HIVE Integration Examples

**Real-world examples of how to integrate the complete HIVE architecture into your existing pages.**

These examples show you exactly how to upgrade your current HIVE pages with the new architecture system:

## Integration Strategies

### 🔄 Progressive Enhancement
- Start with basic layout upgrades
- Add error handling layer by layer
- Implement loading orchestration
- Enable performance optimizations

### 🎯 Context-Aware Integration
- Profile pages with personalized loading
- Spaces with community-focused error handling
- Tools with builder-specific optimizations
- Feed with social-first performance

### 📱 Mobile-First Approach
- Thumb-friendly interactions
- Campus network optimization
- Offline-capable features
- Progressive Web App ready
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Profile Page Integration Example
const ProfilePageIntegration = () => {
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  React.useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoadingPhase('loaded');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  
  if (loadingPhase === 'loading') {
    return (
      <LoadingOrchestrator
        resources={[
          {
            id: 'profile-data',
            name: 'Loading your profile...',
            priority: 'critical',
            estimatedTime: 800
          },
          {
            id: 'tools-data', 
            name: 'Getting your tools ready...',
            priority: 'high',
            estimatedTime: 1200
          },
          {
            id: 'spaces-data',
            name: 'Syncing with your communities...',
            priority: 'medium',
            estimatedTime: 1500
          }
        ]}
        campusContext={{
          networkQuality: 'good',
          timeOfDay: 'afternoon',
          campusLoad: 'medium',
          deviceType: 'mobile'
        }}
        userJourney={{
          currentPage: 'profile',
          userPattern: 'creator',
          timeSpent: 0,
          commonNextActions: ['edit-profile', 'create-tool', 'view-spaces']
        }}
        onAllComplete={() => setLoadingPhase('loaded')}
        showProgress
        showStudentFriendlyMessages
      />
    );
  }
  
  return (
    <HiveErrorBoundary
      context={{
        user: { 
          id: 'user-123', 
          name: 'Sarah Kim', 
          email: 'sarah.kim@university.edu' 
        },
        pageType: 'profile',
        campus: { id: 'univ-123', name: 'State University' }
      }}
      enableErrorReporting
    >
      <OfflineHandler
        offlineCapability="read-only"
        campusContext={{
          location: 'dorm',
          commonDisconnectPatterns: {
            expectedDuration: 3,
            reliability: 'medium',
            alternatives: ['Library', 'Student Center']
          },
          campusWifiStatus: 'operational'
        }}
        enableOfflineNotifications
        showOfflineIndicator
      >
        <ResponsiveLayout
          strategy="mobile-first"
          contentDensity="comfortable"
          adaptToNotch
          enableGestureNavigation
        >
          <PageHeader
            title="Sarah Kim"
            subtitle="Psychology • Class of 2024"
            description="Your personalized campus command center"
            pageType="profile"
            userRole="student"
            primaryAction={{
              id: 'edit-profile',
              label: 'Edit Profile',
              onClick: () => console.log('Edit profile'),
              priority: 'high'
            }}
            secondaryActions={[
              {
                id: 'share-profile',
                label: 'Share',
                onClick: () => console.log('Share profile'),
                priority: 'medium'
              },
              {
                id: 'profile-settings',
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
            {/* Your existing profile content here */}
            <div className="space-y-6">
              <div className="bg-hive-background-secondary/20 rounded-lg p-6">
                <Text variant="heading-md" color="primary" className="mb-4">
                  🎓 Academic Progress
                </Text>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Text variant="heading-lg" color="primary">3.7</Text>
                    <Text variant="body-sm" color="secondary">GPA</Text>
                  </div>
                  <div className="text-center">
                    <Text variant="heading-lg" color="primary">95</Text>
                    <Text variant="body-sm" color="secondary">Credits</Text>
                  </div>
                </div>
              </div>
              
              <div className="bg-hive-background-secondary/20 rounded-lg p-6">
                <Text variant="heading-md" color="primary" className="mb-4">
                  🛠️ Your Tools
                </Text>
                <div className="space-y-3">
                  <div className="bg-hive-gold/5 border border-hive-gold/20 rounded-lg p-4">
                    <Text variant="body-sm" className="font-medium">Study Buddy Finder</Text>
                    <Text variant="body-xs" color="tertiary">234 students connected</Text>
                  </div>
                  <div className="bg-hive-emerald/5 border border-hive-emerald/20 rounded-lg p-4">
                    <Text variant="body-sm" className="font-medium">Course Planner</Text>
                    <Text variant="body-xs" color="tertiary">156 schedules created</Text>
                  </div>
                </div>
              </div>
            </div>
          </ContentArea>
        </ResponsiveLayout>
      </OfflineHandler>
    </HiveErrorBoundary>
  );
};

// Spaces Page Integration Example
const SpacesPageIntegration = () => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <FallbackUI
        severity="moderate"
        failedFeatures={['social']}
        context={{
          area: 'spaces',
          criticalFeatures: ['core'],
          availableOffline: ['cached-spaces', 'drafts']
        }}
        strategy="progressive-disclosure"
        workingFeatures={['View cached spaces', 'Create drafts', 'Basic navigation']}
        onRetry={async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          setHasError(false);
        }}
        showFeatureStatus
      />
    );
  }
  
  return (
    <HiveErrorBoundary
      context={{
        pageType: 'spaces',
        user: { id: 'user-123', name: 'Alex Chen' }
      }}
      onError={() => setHasError(true)}
    >
      <ResponsiveLayout strategy="content-aware">
        <PageHeader
          title="Campus Spaces"
          subtitle="Where communities solve problems together"
          pageType="spaces"
          primaryAction={{
            id: 'create-space',
            label: 'Create Space',
            onClick: () => console.log('Create space'),
            priority: 'high'
          }}
          secondaryActions={[
            {
              id: 'discover',
              label: 'Discover',
              onClick: () => console.log('Discover spaces'),
              priority: 'medium'
            }
          ]}
        />
        
        <ContentArea
          strategy="infinite-scroll"
          onLoadMore={async () => {
            console.log('Loading more spaces...');
            await new Promise(resolve => setTimeout(resolve, 1500));
          }}
          hasMore={true}
          loading={false}
          enableKeyboardNavigation
        >
          <div className="space-y-4">
            {/* Your existing spaces content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-hive-background-secondary/20 rounded-lg p-6">
                <Text variant="heading-sm" color="primary" className="mb-2">
                  📚 CS Study Group
                </Text>
                <Text variant="body-sm" color="secondary" className="mb-4">
                  Data Structures & Algorithms help
                </Text>
                <Text variant="body-xs" color="tertiary">
                  234 members • Active now
                </Text>
              </div>
              
              <div className="bg-hive-background-secondary/20 rounded-lg p-6">
                <Text variant="heading-sm" color="primary" className="mb-2">
                  🏐 Dorm 5A Floor
                </Text>
                <Text variant="body-sm" color="secondary" className="mb-4">
                  Coordinate laundry, events, study sessions
                </Text>
                <Text variant="body-xs" color="tertiary">
                  28 members • 2 online
                </Text>
              </div>
              
              <div className="bg-hive-background-secondary/20 rounded-lg p-6">
                <Text variant="heading-sm" color="primary" className="mb-2">
                  🎭 Theater Club
                </Text>
                <Text variant="body-sm" color="secondary" className="mb-4">
                  Spring production planning
                </Text>
                <Text variant="body-xs" color="tertiary">
                  67 members • Meeting tonight
                </Text>
              </div>
            </div>
            
            {/* Demo trigger */}
            <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setHasError(true)}
              >
                Simulate Spaces Error
              </Button>
            </div>
          </div>
        </ContentArea>
      </ResponsiveLayout>
    </HiveErrorBoundary>
  );
};

// Tools Page Integration Example  
const ToolsPageIntegration = () => {
  const [isBuilderMode, setIsBuilderMode] = useState(true);
  
  return (
    <HiveErrorBoundary
      context={{
        pageType: 'tools',
        user: { id: 'user-123', name: 'Jordan Taylor' }
      }}
    >
      <Preloader
        resources={[
          {
            id: 'tools-library',
            type: 'tools-data',
            priority: 'high',
            estimatedSize: 250,
            estimatedLoadTime: 1000
          },
          {
            id: 'user-tools',
            type: 'profile-data', 
            priority: 'critical',
            estimatedSize: 100,
            estimatedLoadTime: 500
          }
        ]}
        enableIntelligentPreloading
        enableCampusOptimization
      />
      
      <ResponsiveLayout strategy="performance-optimized">
        <PageHeader
          title={isBuilderMode ? "Building Tools" : "Using Tools"}
          subtitle={isBuilderMode ? "Create solutions for your community" : "Tools built by your community"}
          pageType="tools"
          campusContext={{ isBuilder: isBuilderMode }}
          primaryAction={{
            id: isBuilderMode ? 'create-tool' : 'browse-tools',
            label: isBuilderMode ? 'Create Tool' : 'Browse All',
            onClick: () => console.log(isBuilderMode ? 'Create tool' : 'Browse tools'),
            priority: 'high'
          }}
          secondaryActions={[
            {
              id: 'toggle-mode',
              label: isBuilderMode ? 'Switch to User' : 'Switch to Builder',
              onClick: () => setIsBuilderMode(!isBuilderMode),
              priority: 'medium'
            }
          ]}
        />
        
        <ContentArea
          strategy="virtual-scroll"
          itemHeight={120}
          enableVirtualization
          focusStrategy="first-element"
        >
          <div className="space-y-6">
            {isBuilderMode ? (
              // Builder view
              <div className="space-y-4">
                <div className="bg-hive-gold/5 border border-hive-gold/20 rounded-lg p-6">
                  <Text variant="heading-md" color="primary" className="mb-4">
                    🛠️ Your Creations
                  </Text>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 rounded-lg p-4">
                      <Text variant="body-sm" className="font-medium">GPA Calculator</Text>
                      <Text variant="body-xs" color="tertiary">Active • 234 users</Text>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <Text variant="body-sm" className="font-medium">Study Timer</Text>
                      <Text variant="body-xs" color="tertiary">Draft • Ready to publish</Text>
                    </div>
                  </div>
                </div>
                
                <div className="bg-hive-emerald/5 border border-hive-emerald/20 rounded-lg p-6">
                  <Text variant="heading-md" color="primary" className="mb-4">
                    💡 Quick Start
                  </Text>
                  <div className="space-y-3">
                    <Button variant="primary" className="w-full justify-start">
                      📅 Create Study Schedule Tool
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                      📊 Build Analytics Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      🔗 Import from Template
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // User view
              <div className="space-y-4">
                <div className="bg-hive-purple/5 border border-hive-purple/20 rounded-lg p-6">
                  <Text variant="heading-md" color="primary" className="mb-4">
                    ⭐ Popular This Week
                  </Text>
                  <div className="space-y-3">
                    <div className="bg-white/50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <Text variant="body-sm" className="font-medium">Course Schedule Optimizer</Text>
                        <Text variant="body-xs" color="tertiary">by Alex Chen • 1.2k users</Text>
                      </div>
                      <Button size="sm">Use Tool</Button>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <Text variant="body-sm" className="font-medium">Textbook Price Finder</Text>
                        <Text variant="body-xs" color="tertiary">by Sarah Kim • 856 users</Text>
                      </div>
                      <Button size="sm">Use Tool</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ContentArea>
      </ResponsiveLayout>
    </HiveErrorBoundary>
  );
};

// Feed Page Integration Example
const FeedPageIntegration = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  
  const handleLoadMore = async () => {
    setLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingMore(false);
  };
  
  return (
    <HiveErrorBoundary
      context={{
        pageType: 'feed',
        user: { id: 'user-123', name: 'Taylor Wilson' }
      }}
    >
      <ResponsiveLayout 
        strategy="mobile-first"
        contentDensity="compact"
        enableGestureNavigation
      >
        <PageHeader
          title="Campus Feed"
          subtitle="What's happening in your communities"
          pageType="feed"
          primaryAction={{
            id: 'create-post',
            label: 'Share Update',
            onClick: () => console.log('Create post'),
            priority: 'high'
          }}
          hideHeaderOnMobile
        />
        
        <ContentArea
          strategy="infinite-scroll"
          onLoadMore={handleLoadMore}
          hasMore={true}
          loading={loadingMore}
          loadingThreshold={300}
          enableIntersectionObserver
          padding="sm"
          spacing="tight"
        >
          <div className="space-y-4">
            {/* Feed items */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-hive-background-secondary/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-hive-gold rounded-full flex items-center justify-center">
                    <Text variant="body-xs" className="font-medium">A</Text>
                  </div>
                  <div>
                    <Text variant="body-sm" className="font-medium">Alex Chen</Text>
                    <Text variant="body-xs" color="tertiary">CS Study Group • 2h ago</Text>
                  </div>
                </div>
                <Text variant="body-sm" color="secondary" className="mb-3">
                  Just created a new algorithm visualization tool! Perfect for tomorrow's exam prep 🚀
                </Text>
                <div className="flex items-center space-x-4 text-xs text-hive-text-tertiary">
                  <button className="hover:text-hive-text-secondary transition-colors">
                    👍 12 likes
                  </button>
                  <button className="hover:text-hive-text-secondary transition-colors">
                    💬 3 comments
                  </button>
                  <button className="hover:text-hive-text-secondary transition-colors">
                    🔗 Share
                  </button>
                </div>
              </div>
            ))}
            
            {loadingMore && (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-2 border-hive-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <Text variant="body-sm" color="secondary">Loading more updates...</Text>
              </div>
            )}
          </div>
        </ContentArea>
      </ResponsiveLayout>
    </HiveErrorBoundary>
  );
};

export const ProfilePageExample: Story = {
  render: ProfilePageIntegration,
  parameters: {
    docs: {
      description: {
        story: `
### 👤 Profile Page Integration

Complete profile page integration showing:

**Loading Orchestration**:
- Profile data loaded first (critical priority)
- Tools data loaded second (high priority)  
- Spaces data loaded last (medium priority)
- Student-friendly loading messages

**Layout Intelligence**:
- Mobile-first responsive design
- Campus network adaptation
- Gesture navigation support
- Notch-aware layouts

**Error Handling**:
- Context-aware error reporting
- Student information preserved in errors
- Campus and page context included

**Offline Support**:
- Read-only offline capability
- Campus location awareness
- Alternative location suggestions
        `
      }
    }
  }
};

export const SpacesPageExample: Story = {
  render: SpacesPageIntegration,
  parameters: {
    docs: {
      description: {
        story: `
### 🏢 Spaces Page Integration

Spaces page with community-focused features:

**Content Management**:
- Infinite scroll for space discovery
- Keyboard navigation support
- Smart loading thresholds

**Error Resilience**:
- Graceful degradation for social features
- Cached spaces available offline
- Draft creation when disconnected

**Community Context**:
- Space-specific error messaging
- Community-aware loading states
- Social interaction priorities
        `
      }
    }
  }
};

export const ToolsPageExample: Story = {
  render: ToolsPageIntegration,
  parameters: {
    docs: {
      description: {
        story: `
### 🛠️ Tools Page Integration

Dynamic tools page with builder/user modes:

**Contextual Interface**:
- Different headers for builders vs users
- Mode-specific actions and messaging
- Intelligent preloading based on user type

**Performance Optimization**:
- Virtual scrolling for large tool lists
- Strategic resource preloading
- Campus network optimization

**Builder Experience**:
- Creation-focused interface
- Tool management dashboard
- Publishing workflow integration
        `
      }
    }
  }
};

export const FeedPageExample: Story = {
  render: FeedPageIntegration,
  parameters: {
    docs: {
      description: {
        story: `
### 📱 Feed Page Integration

Mobile-optimized social feed:

**Mobile-First Design**:
- Compact content density
- Hidden header on mobile scroll
- Gesture-friendly interactions
- Thumb-reach optimized actions

**Infinite Scroll**:
- Smart loading thresholds
- Intersection observer optimization
- Smooth loading transitions
- Network-aware batching

**Social Features**:
- Real-time update integration
- Community context awareness
- Engagement tracking
        `
      }
    }
  }
};

export const IntegrationGuide: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <Text variant="heading-xl" color="primary">
          💡 Integration Guide
        </Text>
        <Text variant="body-lg" color="secondary">
          Step-by-step guide to integrating HIVE architecture into your existing pages
        </Text>
      </div>
      
      {/* Step-by-step integration */}
      <div className="space-y-6">
        <div className="bg-hive-background-secondary/20 rounded-lg p-6">
          <Text variant="heading-md" color="primary" className="mb-4">
            🔄 Step 1: Progressive Enhancement
          </Text>
          <div className="space-y-3 text-sm text-hive-text-secondary">
            <div>• Wrap your existing page with <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">ResponsiveLayout</code></div>
            <div>• Replace your current header with <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">PageHeader</code></div>
            <div>• Wrap main content with <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">ContentArea</code></div>
            <div>• Test mobile responsiveness and campus network adaptation</div>
          </div>
        </div>
        
        <div className="bg-hive-background-secondary/20 rounded-lg p-6">
          <Text variant="heading-md" color="primary" className="mb-4">
            🛡️ Step 2: Add Error Boundaries
          </Text>
          <div className="space-y-3 text-sm text-hive-text-secondary">
            <div>• Wrap with <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">HiveErrorBoundary</code> at page level</div>
            <div>• Add user and page context for better error reporting</div>
            <div>• Implement <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">FallbackUI</code> for graceful degradation</div>
            <div>• Test error scenarios and recovery flows</div>
          </div>
        </div>
        
        <div className="bg-hive-background-secondary/20 rounded-lg p-6">
          <Text variant="heading-md" color="primary" className="mb-4">
            ⚡ Step 3: Loading Orchestration
          </Text>
          <div className="space-y-3 text-sm text-hive-text-secondary">
            <div>• Identify critical resources and loading priorities</div>
            <div>• Implement <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">LoadingOrchestrator</code> for initial page load</div>
            <div>• Add campus context for network-aware loading</div>
            <div>• Enable performance theater for engaging loading</div>
          </div>
        </div>
        
        <div className="bg-hive-background-secondary/20 rounded-lg p-6">
          <Text variant="heading-md" color="primary" className="mb-4">
            🚀 Step 4: Performance Optimization
          </Text>
          <div className="space-y-3 text-sm text-hive-text-secondary">
            <div>• Add <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">Preloader</code> for strategic resource loading</div>
            <div>• Implement <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">OfflineHandler</code> for resilient experience</div>
            <div>• Enable smart code splitting with <code className="bg-hive-background-secondary/40 px-2 py-1 rounded">LazyRoutes</code></div>
            <div>• Test offline scenarios and sync behavior</div>
          </div>
        </div>
      </div>
      
      {/* Code example */}
      <div className="bg-black/5 border border-hive-border-default/20 rounded-lg p-6">
        <Text variant="heading-md" color="primary" className="mb-4">
          📝 Quick Integration Template
        </Text>
        <pre className="text-xs text-hive-text-secondary overflow-x-auto">
{`// Your existing page component
export function YourPage() {
  return (
    <HiveErrorBoundary 
      context={{ pageType: 'your-page', user: currentUser }}
    >
      <OfflineHandler offlineCapability="read-only">
        <ResponsiveLayout strategy="mobile-first">
          <PageHeader 
            title="Your Page"
            pageType="your-page"
            primaryAction={{ /* your action */ }}
          />
          <ContentArea strategy="static">
            {/* Your existing content */}
          </ContentArea>
        </ResponsiveLayout>
      </OfflineHandler>
    </HiveErrorBoundary>
  );
}`}
        </pre>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### 💡 Complete Integration Guide

This guide shows you exactly how to upgrade your existing HIVE pages with the new architecture system.

**The integration is designed to be:**
- **Progressive**: Add components one at a time
- **Non-breaking**: Works with your existing code
- **Flexible**: Customize for your specific needs
- **Production-ready**: No experimental features

Follow the step-by-step approach to gradually enhance your pages with campus intelligence, empathetic error handling, performance theater, and offline resilience.
        `
      }
    }
  }
};