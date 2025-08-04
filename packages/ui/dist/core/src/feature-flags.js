export const DEFAULT_FLAGS = {
    toolBuilderVariant: 'visual',
    navigationVariant: 'sidebar',
    dashboardLayout: 'cards',
    spaceDiscovery: 'grid',
    enableAdvancedBuilder: false,
    enableCollaborativeEditing: false,
    enableRealTimeNotifications: false,
    spaces: 'enabled',
    tools: 'enabled',
};
// User-based variant assignment for A/B testing
export function getFeatureFlags(userId) {
    const hash = simpleHash(userId);
    return {
        // Distribute tool builder variants evenly
        toolBuilderVariant: ['visual', 'wizard', 'template', 'code'][hash % 4],
        // Test navigation patterns
        navigationVariant: ['sidebar', 'topnav', 'command'][hash % 3],
        // Dashboard experiments
        dashboardLayout: ['cards', 'list'][hash % 2],
        // Space discovery testing
        spaceDiscovery: ['grid', 'feed'][hash % 2],
        // Feature toggles based on user cohort
        enableAdvancedBuilder: hash % 10 < 3, // 30% of users
        enableCollaborativeEditing: hash % 10 < 2, // 20% of users  
        enableRealTimeNotifications: hash % 10 < 5, // 50% of users
        // Analytics categories - always enabled
        spaces: 'enabled',
        tools: 'enabled',
    };
}
// Simple hash function for consistent user assignment
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
export function trackVariantEvent(event) {
    const fullEvent = {
        ...event,
        timestamp: new Date(),
    };
    // Send to analytics service
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hive:variant-event', {
            detail: fullEvent
        }));
    }
}
//# sourceMappingURL=feature-flags.js.map