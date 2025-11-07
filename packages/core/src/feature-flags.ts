export interface FeatureFlags {
  // Tool Builder Variants
  toolBuilderVariant: 'visual' | 'wizard' | 'template' | 'code';
  
  // Navigation Variants  
  navigationVariant: 'sidebar' | 'topnav' | 'command' | 'mobile';
  
  // UI Experiments
  dashboardLayout: 'cards' | 'list' | 'timeline';
  spaceDiscovery: 'grid' | 'map' | 'feed' | 'recommendations';
  
  // Feature Toggles
  enableAdvancedBuilder: boolean;
  enableCollaborativeEditing: boolean;
  enableRealTimeNotifications: boolean;
  adminDashboard: boolean;
  
  // Analytics Categories (for tracking events)
  spaces: 'enabled';
  tools: 'enabled';
  analytics: 'enabled';
  realtime: 'enabled';
  ai: 'enabled' | 'disabled';
  gamification: 'enabled' | 'disabled';
}

export const DEFAULT_FLAGS: FeatureFlags = {
  toolBuilderVariant: 'visual',
  navigationVariant: 'sidebar', 
  dashboardLayout: 'cards',
  spaceDiscovery: 'grid',
  enableAdvancedBuilder: false,
  enableCollaborativeEditing: false,
  enableRealTimeNotifications: false,
  adminDashboard: true,
  spaces: 'enabled',
  tools: 'enabled',
  analytics: 'enabled',
  realtime: 'enabled',
  ai: 'disabled',
  gamification: 'disabled',
};

// User-based variant assignment for A/B testing
export function getFeatureFlags(userId: string): FeatureFlags {
  const hash = simpleHash(userId);
  
  return {
    // Distribute tool builder variants evenly
    toolBuilderVariant: (['visual', 'wizard', 'template', 'code'] as const)[hash % 4] as FeatureFlags['toolBuilderVariant'],
    
    // Test navigation patterns
    navigationVariant: (['sidebar', 'topnav', 'command'] as const)[hash % 3] as FeatureFlags['navigationVariant'],
    
    // Dashboard experiments
    dashboardLayout: (['cards', 'list'] as const)[hash % 2] as FeatureFlags['dashboardLayout'],
    
    // Space discovery testing
    spaceDiscovery: (['grid', 'feed'] as const)[hash % 2] as FeatureFlags['spaceDiscovery'],
    
    // Feature toggles based on user cohort
    enableAdvancedBuilder: hash % 10 < 3, // 30% of users
    enableCollaborativeEditing: hash % 10 < 2, // 20% of users  
    enableRealTimeNotifications: hash % 10 < 5, // 50% of users
    adminDashboard: hash % 10 < 9, // 90% of users enabled by default
    
    // Analytics categories - always enabled
    spaces: 'enabled',
    tools: 'enabled',
    analytics: 'enabled',
    realtime: 'enabled',
    ai: hash % 10 < 2 ? 'enabled' : 'disabled', // 20% of users
    gamification: hash % 10 < 3 ? 'enabled' : 'disabled', // 30% of users
  };
}

// Simple hash function for consistent user assignment
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Analytics event tracking for variants
export interface VariantEvent {
  userId: string;
  variant: string;
  feature: keyof FeatureFlags;
  action: 'view' | 'interact' | 'complete' | 'abandon';
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export function trackVariantEvent(event: Omit<VariantEvent, 'timestamp'>): void {
  const fullEvent: VariantEvent = {
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
