import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveStateProvider, useAuth, useOnboarding, useBuilderProgression, usePrivacy, useHiveState } from '../../components/state';
import { HiveCard } from '../../components/hive-card';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveProgress } from '../../components/hive-progress';
import { User, Shield, Eye, EyeOff, Wrench, GraduationCap, Lock, Unlock, Activity, CheckCircle } from 'lucide-react';
const meta = {
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
        return (_jsx(HiveCard, { className: "max-w-md mx-auto", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Authentication Demo" }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your.email@university.edu", className: "w-full p-3 border rounded-lg" }), _jsx(HiveButton, { onClick: () => sendMagicLink(email), disabled: isLoading, className: "w-full", children: isLoading ? 'Sending...' : 'Send Magic Link' })] }), _jsx("p", { className: "text-sm text-gray-600", children: "Demo: Use any .edu email to simulate the magic link flow" })] }) }));
    }
    return (_jsx(HiveCard, { className: "max-w-md mx-auto", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(User, { className: "w-8 h-8 text-blue-600" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: user?.name || user?.email }), _jsx("p", { className: "text-sm text-gray-600", children: user?.email })] })] }), _jsx(HiveButton, { variant: "outline", onClick: logout, className: "w-full", children: "Logout" })] }) }));
}
function OnboardingDemo() {
    const { currentStage, completionPercentage, nextSteps, isComplete, advanceStage, canAccessFeature } = useOnboarding();
    const stageNames = {
        welcome: 'Welcome',
        academics: 'Academic Info',
        handle: 'Choose Handle',
        photo: 'Profile Photo',
        legal: 'Terms & Privacy',
        complete: 'Complete'
    };
    const handleAdvance = () => {
        const stages = ['welcome', 'academics', 'handle', 'photo', 'legal', 'complete'];
        const currentIndex = stages.indexOf(currentStage);
        if (currentIndex < stages.length - 1) {
            const nextStage = stages[currentIndex + 1];
            advanceStage(nextStage, { demo: true });
        }
    };
    return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Profile Completion" }), _jsxs(HiveBadge, { variant: isComplete ? "success" : "warning", children: [completionPercentage, "%"] })] }), _jsx(HiveProgress, { value: completionPercentage, className: "w-full" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "font-medium", children: ["Current Stage: ", stageNames[currentStage]] }), nextSteps.length > 0 && (_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Next steps:" }), nextSteps.map((step, index) => (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-gray-400" }), step] }, index)))] }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [_jsxs("div", { className: `p-2 rounded ${canAccessFeature('spaces') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`, children: [_jsx("span", { className: "font-medium", children: "Spaces:" }), " ", canAccessFeature('spaces') ? 'Unlocked' : 'Locked'] }), _jsxs("div", { className: `p-2 rounded ${canAccessFeature('tools') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`, children: [_jsx("span", { className: "font-medium", children: "Tools:" }), " ", canAccessFeature('tools') ? 'Unlocked' : 'Locked'] }), _jsxs("div", { className: `p-2 rounded ${canAccessFeature('lab') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`, children: [_jsx("span", { className: "font-medium", children: "Lab:" }), " ", canAccessFeature('lab') ? 'Unlocked' : 'Locked'] }), _jsxs("div", { className: `p-2 rounded ${canAccessFeature('social') ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`, children: [_jsx("span", { className: "font-medium", children: "Social:" }), " ", canAccessFeature('social') ? 'Unlocked' : 'V1 Only'] })] }), !isComplete && (_jsx(HiveButton, { onClick: handleAdvance, className: "w-full", children: "Advance to Next Stage" }))] }) }));
}
function BuilderProgressionDemo() {
    const { level, progress, nextLevel, capabilities, advanceBuilderLevel, canAccessLab } = useBuilderProgression();
    const levelColors = {
        novice: 'bg-gray-100 text-gray-700',
        intermediate: 'bg-blue-100 text-blue-700',
        advanced: 'bg-purple-100 text-purple-700',
        expert: 'bg-gold-100 text-gold-700'
    };
    const handleAdvance = () => {
        const levels = ['novice', 'intermediate', 'advanced', 'expert'];
        const currentIndex = levels.indexOf(level);
        if (currentIndex < levels.length - 1) {
            advanceBuilderLevel(levels[currentIndex + 1]);
        }
    };
    return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Builder Progression" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Wrench, { className: "w-5 h-5 text-blue-600" }), _jsx(HiveBadge, { className: levelColors[level], children: level.charAt(0).toUpperCase() + level.slice(1) })] })] }), _jsx(HiveProgress, { value: progress, className: "w-full" }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [_jsxs("div", { className: `p-3 rounded-lg ${capabilities.canUsePersonalTools ? 'bg-green-50' : 'bg-gray-50'}`, children: [_jsxs("div", { className: "flex items-center gap-2", children: [capabilities.canUsePersonalTools ? _jsx(Unlock, { className: "w-4 h-4 text-green-600" }) : _jsx(Lock, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "font-medium", children: "Personal Tools" })] }), _jsxs("p", { className: "text-xs mt-1", children: ["Max: ", capabilities.maxPersonalTools === Infinity ? '∞' : capabilities.maxPersonalTools] })] }), _jsx("div", { className: `p-3 rounded-lg ${capabilities.canCreatePersonalTools ? 'bg-green-50' : 'bg-gray-50'}`, children: _jsxs("div", { className: "flex items-center gap-2", children: [capabilities.canCreatePersonalTools ? _jsx(Unlock, { className: "w-4 h-4 text-green-600" }) : _jsx(Lock, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "font-medium", children: "Create Tools" })] }) }), _jsx("div", { className: `p-3 rounded-lg ${capabilities.canUseSpaceTools ? 'bg-green-50' : 'bg-gray-50'}`, children: _jsxs("div", { className: "flex items-center gap-2", children: [capabilities.canUseSpaceTools ? _jsx(Unlock, { className: "w-4 h-4 text-green-600" }) : _jsx(Lock, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "font-medium", children: "Space Tools" })] }) }), _jsx("div", { className: `p-3 rounded-lg ${capabilities.canCreateRituals ? 'bg-green-50' : 'bg-gray-50'}`, children: _jsxs("div", { className: "flex items-center gap-2", children: [capabilities.canCreateRituals ? _jsx(Unlock, { className: "w-4 h-4 text-green-600" }) : _jsx(Lock, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "font-medium", children: "Create Rituals" })] }) })] }), _jsxs("div", { className: "p-3 bg-blue-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(GraduationCap, { className: "w-4 h-4 text-blue-600" }), _jsx("span", { className: "font-medium text-blue-900", children: "HiveLAB Access" })] }), _jsx("p", { className: "text-sm text-blue-700", children: canAccessLab ? 'You can access the builder console' : 'Complete onboarding to unlock' })] }), nextLevel && (_jsxs(HiveButton, { onClick: handleAdvance, className: "w-full", children: ["Advance to ", nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)] }))] }) }));
}
function PrivacyControlsDemo() {
    const { privacy, ghostMode, isGhost, visibility, toggleGhostMode, setProfileVisibility, setToolSharingDefault, toggleActivityTracking, toggleFriendDiscovery } = usePrivacy();
    return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Privacy Controls" }), _jsxs("div", { className: "flex items-center gap-2", children: [isGhost ? _jsx(EyeOff, { className: "w-5 h-5 text-red-600" }) : _jsx(Eye, { className: "w-5 h-5 text-green-600" }), _jsx(HiveBadge, { variant: isGhost ? "error" : "success", children: isGhost ? 'Ghost Mode' : 'Visible' })] })] }), _jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [_jsxs("p", { className: "text-sm text-gray-700 mb-2", children: [_jsx("strong", { children: "Current Status:" }), " ", visibility.description] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [_jsxs("div", { className: `p-2 rounded ${visibility.profileVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`, children: ["Profile: ", visibility.profileVisible ? 'Visible' : 'Hidden'] }), _jsxs("div", { className: `p-2 rounded ${visibility.activityVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`, children: ["Activity: ", visibility.activityVisible ? 'Tracked' : 'Private'] }), _jsxs("div", { className: `p-2 rounded ${visibility.toolsVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`, children: ["Tools: ", visibility.toolsVisible ? 'Shared' : 'Private'] }), _jsxs("div", { className: `p-2 rounded ${visibility.spaceMembershipVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`, children: ["Friends: ", visibility.spaceMembershipVisible ? 'Discoverable' : 'Hidden'] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(HiveButton, { onClick: toggleGhostMode, variant: isGhost ? "error" : "outline", className: "w-full", children: isGhost ? 'Disable Ghost Mode' : 'Enable Ghost Mode' }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("select", { value: privacy.profileVisibility, onChange: (e) => setProfileVisibility(e.target.value), className: "p-2 border rounded text-sm", children: [_jsx("option", { value: "private", children: "Private Profile" }), _jsx("option", { value: "friends", children: "Friends Only" }), _jsx("option", { value: "public", children: "Public Profile" })] }), _jsxs("select", { value: privacy.toolSharingDefault, onChange: (e) => setToolSharingDefault(e.target.value), className: "p-2 border rounded text-sm", children: [_jsx("option", { value: "private", children: "Private Tools" }), _jsx("option", { value: "space", children: "Space Sharing" }), _jsx("option", { value: "public", children: "Public Tools" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("button", { onClick: toggleActivityTracking, className: `p-2 rounded text-sm ${privacy.activityTracking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`, children: ["Activity Tracking: ", privacy.activityTracking ? 'On' : 'Off'] }), _jsxs("button", { onClick: toggleFriendDiscovery, className: `p-2 rounded text-sm ${privacy.friendDiscovery ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`, children: ["Friend Discovery: ", privacy.friendDiscovery ? 'On' : 'Off'] })] })] }), _jsxs("div", { className: "p-3 bg-yellow-50 border border-yellow-200 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Shield, { className: "w-4 h-4 text-yellow-600" }), _jsx("span", { className: "font-medium text-yellow-900", children: "vBETA Privacy" })] }), _jsx("p", { className: "text-sm text-yellow-700", children: "During vBETA, all profiles are private by default. Social features unlock in V1." })] })] }) }));
}
function StateOverviewDemo() {
    const { state } = useHiveState();
    return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "w-5 h-5 text-blue-600" }), _jsx("h3", { className: "text-lg font-semibold", children: "State Overview" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Navigation" }), _jsxs("div", { className: "space-y-1 text-xs", children: [_jsxs("div", { children: ["Current: ", _jsx("code", { className: "bg-gray-100 px-1 rounded", children: state.navigation.currentRoute })] }), _jsxs("div", { children: ["Return to Feed: ", state.navigation.returnToFeed ? '✅' : '❌'] }), _jsxs("div", { children: ["Deep Linked: ", state.navigation.deepLinked ? '✅' : '❌'] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Features" }), _jsxs("div", { className: "space-y-1 text-xs", children: [_jsxs("div", { children: ["Social Features: ", state.features.socialFeaturesEnabled ? '✅ V1' : '❌ vBETA'] }), _jsxs("div", { children: ["Builder Tools: ", state.features.builderToolsEnabled ? '✅' : '❌'] }), _jsxs("div", { children: ["Rituals: ", state.features.ritualParticipation ? '✅' : '❌'] }), _jsxs("div", { children: ["Deep Links: ", state.features.deepLinkSharing ? '✅' : '❌'] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "UI State" }), _jsxs("div", { className: "space-y-1 text-xs", children: [_jsxs("div", { children: ["Mobile: ", state.ui.isMobile ? '✅' : '❌'] }), _jsxs("div", { children: ["Bottom Tabs: ", state.ui.bottomTabsVisible ? '✅' : '❌'] }), _jsxs("div", { children: ["Theme: ", state.ui.theme] }), _jsxs("div", { children: ["Compact: ", state.ui.compactMode ? '✅' : '❌'] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Spaces" }), _jsxs("div", { className: "space-y-1 text-xs", children: [_jsxs("div", { children: ["Joined: ", state.spaces.joined.length] }), _jsxs("div", { children: ["Discovered: ", state.spaces.discovered.length] }), _jsxs("div", { children: ["Memberships: ", Object.keys(state.spaces.memberships).length] })] })] })] })] }) }));
}
// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================
function StateManagementDemo() {
    return (_jsxs("div", { className: "p-8 space-y-8 max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold", children: "HIVE State Management Demo" }), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Social-first state management with tool-level permissions, privacy controls, and feed-centric navigation persistence." })] }), _jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsx(AuthenticationDemo, {}), _jsx(OnboardingDemo, {}), _jsx(BuilderProgressionDemo, {}), _jsx(PrivacyControlsDemo, {}), _jsx("div", { className: "md:col-span-2 lg:col-span-1", children: _jsx(StateOverviewDemo, {}) })] }), _jsxs("div", { className: "bg-blue-50 p-6 rounded-2xl border border-blue-200", children: [_jsx("h3", { className: "text-lg font-semibold text-blue-900 mb-3", children: "Strategic Implementation" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4 text-sm text-blue-800", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Privacy Strategy" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Private by default during vBETA" }), _jsx("li", { children: "\u2022 Ghost mode for complete invisibility" }), _jsx("li", { children: "\u2022 Tool-level permission controls" }), _jsx("li", { children: "\u2022 Social features unlock in V1" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Navigation Persistence" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Feed as social gravity well" }), _jsx("li", { children: "\u2022 Always return to feed unless deep-linked" }), _jsx("li", { children: "\u2022 Mobile bottom tabs (Feed | Spaces | Profile | Lab)" }), _jsx("li", { children: "\u2022 State preserves user intent" })] })] })] })] })] }));
}
export const Default = {
    render: () => (_jsx(HiveStateProvider, { children: _jsx(StateManagementDemo, {}) }))
};
export const WithMockUser = {
    render: () => {
        const mockUser = {
            id: 'user-demo',
            handle: 'sarah.chen',
            name: 'Sarah Chen',
            email: 'sarah.chen@university.edu',
            university: 'University of California',
            year: 'Senior',
            major: 'Computer Science',
            builderLevel: 'intermediate',
            ghostMode: 'visible',
            joinedAt: new Date(),
            lastActive: new Date(),
            profileCompletion: {
                stage: 'photo',
                percentage: 75,
                nextSteps: ['Review terms & privacy', 'Complete your HIVE profile']
            },
            privacy: {
                profileVisibility: 'private',
                toolSharingDefault: 'space',
                activityTracking: true,
                friendDiscovery: false
            }
        };
        return (_jsx(HiveStateProvider, { initialUser: mockUser, children: _jsx(StateManagementDemo, {}) }));
    }
};
//# sourceMappingURL=state-management-demo.stories.js.map