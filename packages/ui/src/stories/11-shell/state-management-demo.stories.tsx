/**
 * HIVE State Management Demo
 * 
 * Demonstrates the social-first state management system with:
 * - Tool-level permissions (view, use, edit, create)
 * - Profile completion tracking (% complete, next steps)
 * - Builder progression (novice → expert)
 * - Privacy controls and Ghost mode
 * - Feed-centric navigation persistence
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  HiveStateProvider, 
  useAuth, 
  useOnboarding, 
  useBuilderProgression, 
  usePrivacy,
  useHiveState
} from '../../components/state';
import { HiveCard } from '../../components/hive-card';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveProgress } from '../../components/hive-progress';
import { 
  User, 
  Shield, 
  Eye, 
  EyeOff, 
  Wrench, 
  GraduationCap, 
  Lock,
  Unlock,
  Activity,
  CheckCircle
} from 'lucide-react';

const meta: Meta = {
  title: '11-Shell/State Management Demo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE State Management System

Social-first state management optimized for campus platform interactions:

## Key Features
- **Tool-level permissions** - Fine-grained access control
- **Profile completion tracking** - Guided onboarding flow
- **Builder progression** - Skill-based feature unlocks
- **Privacy controls** - Ghost mode and selective sharing
- **Feed persistence** - Always return to social gravity well

## Strategic Decisions Implemented
- **Private by default** during vBETA (privacy-first approach)
- **Tool permissions** at individual tool level (not space level)
- **State persistence** always returns to feed unless deep-linked
- **Social features** unlocked in V1, not vBETA
        `
      }
    }
  }
};

export default meta;

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

function AuthenticationDemo() {
  const { isAuthenticated, isLoading, user, sendMagicLink, logout } = useAuth();
  const [email, setEmail] = useState('student@university.edu');
  
  if (!isAuthenticated) {
    return (
      <HiveCard className="max-w-md mx-auto">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Authentication Demo</h3>
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@university.edu"
              className="w-full p-3 border rounded-lg"
            />
            <HiveButton
              onClick={() => sendMagicLink(email)}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </HiveButton>
          </div>
          <p className="text-sm text-gray-600">
            Demo: Use any .edu email to simulate the magic link flow
          </p>
        </div>
      </HiveCard>
    );
  }
  
  return (
    <HiveCard className="max-w-md mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="font-semibold">{user?.name || user?.email}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <HiveButton variant="outline" onClick={logout} className="w-full">
          Logout
        </HiveButton>
      </div>
    </HiveCard>
  );
}

function OnboardingDemo() {
  const { 
    currentStage, 
    completionPercentage, 
    nextSteps, 
    isComplete,
    advanceStage,
    canAccessFeature 
  } = useOnboarding();
  
  const stageNames = {
    welcome: 'Welcome',
    academics: 'Academic Info',
    handle: 'Choose Handle',
    photo: 'Profile Photo',
    legal: 'Terms & Privacy',
    complete: 'Complete'
  };
  
  const handleAdvance = () => {
    const stages: Array<keyof typeof stageNames> = ['welcome', 'academics', 'handle', 'photo', 'legal', 'complete'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      advanceStage(nextStage, { demo: true });
    }
  };
  
  return (
    <HiveCard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Profile Completion</h3>
          <HiveBadge variant={isComplete ? "success" : "warning"}>
            {completionPercentage}%
          </HiveBadge>
        </div>
        
        <HiveProgress value={completionPercentage} className="w-full" />
        
        <div className="space-y-2">
          <p className="font-medium">Current Stage: {stageNames[currentStage]}</p>
          {nextSteps.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Next steps:</p>
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  {step}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className={`p-2 rounded ${canAccessFeature('spaces') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <span className="font-medium">Spaces:</span> {canAccessFeature('spaces') ? 'Unlocked' : 'Locked'}
          </div>
          <div className={`p-2 rounded ${canAccessFeature('tools') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <span className="font-medium">Tools:</span> {canAccessFeature('tools') ? 'Unlocked' : 'Locked'}
          </div>
          <div className={`p-2 rounded ${canAccessFeature('lab') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <span className="font-medium">Lab:</span> {canAccessFeature('lab') ? 'Unlocked' : 'Locked'}
          </div>
          <div className={`p-2 rounded ${canAccessFeature('social') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <span className="font-medium">Social:</span> {canAccessFeature('social') ? 'Unlocked' : 'V1 Only'}
          </div>
        </div>
        
        {!isComplete && (
          <HiveButton onClick={handleAdvance} className="w-full">
            Advance to Next Stage
          </HiveButton>
        )}
      </div>
    </HiveCard>
  );
}

function BuilderProgressionDemo() {
  const { 
    level, 
    progress, 
    nextLevel, 
    capabilities,
    advanceBuilderLevel,
    canAccessLab 
  } = useBuilderProgression();
  
  const levelColors = {
    novice: 'bg-gray-100 text-gray-700',
    intermediate: 'bg-blue-100 text-blue-700',
    advanced: 'bg-purple-100 text-purple-700',
    expert: 'bg-gold-100 text-gold-700'
  };
  
  const handleAdvance = () => {
    const levels = ['novice', 'intermediate', 'advanced', 'expert'] as const;
    const currentIndex = levels.indexOf(level);
    if (currentIndex < levels.length - 1) {
      advanceBuilderLevel(levels[currentIndex + 1]);
    }
  };
  
  return (
    <HiveCard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Builder Progression</h3>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            <HiveBadge className={levelColors[level]}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </HiveBadge>
          </div>
        </div>
        
        <HiveProgress value={progress} className="w-full" />
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className={`p-3 rounded-lg ${capabilities.canUsePersonalTools ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              {capabilities.canUsePersonalTools ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-gray-400" />}
              <span className="font-medium">Personal Tools</span>
            </div>
            <p className="text-xs mt-1">Max: {capabilities.maxPersonalTools === Infinity ? '∞' : capabilities.maxPersonalTools}</p>
          </div>
          
          <div className={`p-3 rounded-lg ${capabilities.canCreatePersonalTools ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              {capabilities.canCreatePersonalTools ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-gray-400" />}
              <span className="font-medium">Create Tools</span>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg ${capabilities.canUseSpaceTools ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              {capabilities.canUseSpaceTools ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-gray-400" />}
              <span className="font-medium">Space Tools</span>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg ${capabilities.canCreateRituals ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              {capabilities.canCreateRituals ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-gray-400" />}
              <span className="font-medium">Create Rituals</span>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">HiveLAB Access</span>
          </div>
          <p className="text-sm text-blue-700">
            {canAccessLab ? 'You can access the builder console' : 'Complete onboarding to unlock'}
          </p>
        </div>
        
        {nextLevel && (
          <HiveButton onClick={handleAdvance} className="w-full">
            Advance to {nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)}
          </HiveButton>
        )}
      </div>
    </HiveCard>
  );
}

function PrivacyControlsDemo() {
  const { 
    privacy, 
    ghostMode, 
    isGhost, 
    visibility,
    toggleGhostMode,
    setProfileVisibility,
    setToolSharingDefault,
    toggleActivityTracking,
    toggleFriendDiscovery 
  } = usePrivacy();
  
  return (
    <HiveCard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Privacy Controls</h3>
          <div className="flex items-center gap-2">
            {isGhost ? <EyeOff className="w-5 h-5 text-red-600" /> : <Eye className="w-5 h-5 text-green-600" />}
            <HiveBadge variant={isGhost ? "error" : "success"}>
              {isGhost ? 'Ghost Mode' : 'Visible'}
            </HiveBadge>
          </div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Current Status:</strong> {visibility.description}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2 rounded ${visibility.profileVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              Profile: {visibility.profileVisible ? 'Visible' : 'Hidden'}
            </div>
            <div className={`p-2 rounded ${visibility.activityVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              Activity: {visibility.activityVisible ? 'Tracked' : 'Private'}
            </div>
            <div className={`p-2 rounded ${visibility.toolsVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              Tools: {visibility.toolsVisible ? 'Shared' : 'Private'}
            </div>
            <div className={`p-2 rounded ${visibility.spaceMembershipVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              Friends: {visibility.spaceMembershipVisible ? 'Discoverable' : 'Hidden'}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <HiveButton 
            onClick={toggleGhostMode}
            variant={isGhost ? "error" : "outline"}
            className="w-full"
          >
            {isGhost ? 'Disable Ghost Mode' : 'Enable Ghost Mode'}
          </HiveButton>
          
          <div className="grid grid-cols-2 gap-2">
            <select 
              value={privacy.profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value as any)}
              className="p-2 border rounded text-sm"
            >
              <option value="private">Private Profile</option>
              <option value="friends">Friends Only</option>
              <option value="public">Public Profile</option>
            </select>
            
            <select 
              value={privacy.toolSharingDefault}
              onChange={(e) => setToolSharingDefault(e.target.value as any)}
              className="p-2 border rounded text-sm"
            >
              <option value="private">Private Tools</option>
              <option value="space">Space Sharing</option>
              <option value="public">Public Tools</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={toggleActivityTracking}
              className={`p-2 rounded text-sm ${privacy.activityTracking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Activity Tracking: {privacy.activityTracking ? 'On' : 'Off'}
            </button>
            
            <button
              onClick={toggleFriendDiscovery}
              className={`p-2 rounded text-sm ${privacy.friendDiscovery ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Friend Discovery: {privacy.friendDiscovery ? 'On' : 'Off'}
            </button>
          </div>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-yellow-600" />
            <span className="font-medium text-yellow-900">vBETA Privacy</span>
          </div>
          <p className="text-sm text-yellow-700">
            During vBETA, all profiles are private by default. Social features unlock in V1.
          </p>
        </div>
      </div>
    </HiveCard>
  );
}

function StateOverviewDemo() {
  const { state } = useHiveState();
  
  return (
    <HiveCard>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">State Overview</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Navigation</h4>
            <div className="space-y-1 text-xs">
              <div>Current: <code className="bg-gray-100 px-1 rounded">{state.navigation.currentRoute}</code></div>
              <div>Return to Feed: {state.navigation.returnToFeed ? '✅' : '❌'}</div>
              <div>Deep Linked: {state.navigation.deepLinked ? '✅' : '❌'}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Features</h4>
            <div className="space-y-1 text-xs">
              <div>Social Features: {state.features.socialFeaturesEnabled ? '✅ V1' : '❌ vBETA'}</div>
              <div>Builder Tools: {state.features.builderToolsEnabled ? '✅' : '❌'}</div>
              <div>Rituals: {state.features.ritualParticipation ? '✅' : '❌'}</div>
              <div>Deep Links: {state.features.deepLinkSharing ? '✅' : '❌'}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">UI State</h4>
            <div className="space-y-1 text-xs">
              <div>Mobile: {state.ui.isMobile ? '✅' : '❌'}</div>
              <div>Bottom Tabs: {state.ui.bottomTabsVisible ? '✅' : '❌'}</div>
              <div>Theme: {state.ui.theme}</div>
              <div>Compact: {state.ui.compactMode ? '✅' : '❌'}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Spaces</h4>
            <div className="space-y-1 text-xs">
              <div>Joined: {state.spaces.joined.length}</div>
              <div>Discovered: {state.spaces.discovered.length}</div>
              <div>Memberships: {Object.keys(state.spaces.memberships).length}</div>
            </div>
          </div>
        </div>
      </div>
    </HiveCard>
  );
}

// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================

function StateManagementDemo() {
  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">HIVE State Management Demo</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Social-first state management with tool-level permissions, privacy controls, 
          and feed-centric navigation persistence.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AuthenticationDemo />
        <OnboardingDemo />
        <BuilderProgressionDemo />
        <PrivacyControlsDemo />
        <div className="md:col-span-2 lg:col-span-1">
          <StateOverviewDemo />
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Strategic Implementation
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Privacy Strategy</h4>
            <ul className="space-y-1">
              <li>• Private by default during vBETA</li>
              <li>• Ghost mode for complete invisibility</li>
              <li>• Tool-level permission controls</li>
              <li>• Social features unlock in V1</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Navigation Persistence</h4>
            <ul className="space-y-1">
              <li>• Feed as social gravity well</li>
              <li>• Always return to feed unless deep-linked</li>
              <li>• Mobile bottom tabs (Feed | Spaces | Profile | Lab)</li>
              <li>• State preserves user intent</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

type Story = StoryObj<typeof StateManagementDemo>;

export const Default: Story = {
  render: () => (
    <HiveStateProvider>
      <StateManagementDemo />
    </HiveStateProvider>
  )
};

export const WithMockUser: Story = {
  render: () => {
    const mockUser = {
      id: 'user-demo',
      handle: 'sarah.chen',
      name: 'Sarah Chen',
      email: 'sarah.chen@university.edu',
      university: 'University of California',
      year: 'Senior',
      major: 'Computer Science',
      builderLevel: 'intermediate' as const,
      ghostMode: 'visible' as const,
      joinedAt: new Date(),
      lastActive: new Date(),
      profileCompletion: {
        stage: 'photo' as const,
        percentage: 75,
        nextSteps: ['Review terms & privacy', 'Complete your HIVE profile']
      },
      privacy: {
        profileVisibility: 'private' as const,
        toolSharingDefault: 'space' as const,
        activityTracking: true,
        friendDiscovery: false
      }
    };
    
    return (
      <HiveStateProvider initialUser={mockUser}>
        <StateManagementDemo />
      </HiveStateProvider>
    );
  }
};