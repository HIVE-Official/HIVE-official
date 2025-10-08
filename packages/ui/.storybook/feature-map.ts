/**
 * HIVE Feature Map
 *
 * Maps components to product features (vertical slices)
 * Used for organizing Storybook by feature area
 */

export interface FeatureConfig {
  title: string;
  description: string;
  icon: string;
  components: string[];
  color: string;
  priority: number;
}

export const FEATURE_MAP: Record<string, FeatureConfig> = {
  'design-system': {
    title: '📐 Design System',
    description: 'Foundational design tokens, components, and patterns',
    icon: '📐',
    components: [
      // Core atoms that are feature-agnostic
      'button',
      'input',
      'textarea',
      'label',
      'badge',
      'avatar',
      'card',
      'checkbox',
      'select',
      'slider',
      'switch',
      'tabs',
      'dialog',
      'alert',
      'skeleton',
      'progress',
      'grid',
      'command',
      'presence-indicator',
      'hive-button',
      'hive-card',
      'hive-input',
      'hive-modal',
      'hive-progress',
      'hive-logo',
      'hive-logo-dynamic',
      'hive-confirm-modal',
      'check-icon',
      'universal-atoms',
    ],
    color: '#9333EA', // Purple
    priority: 0,
  },

  'onboarding': {
    title: '🎯 Onboarding & Auth',
    description: 'User onboarding flow and authentication components',
    icon: '🎯',
    components: [
      'welcome-mat',
      'completion-psychology-enhancer',
      'interest-selector',
      'hive-avatar-upload-with-crop',
      'privacy-control',
      'tech-sleek-showcase',
    ],
    color: '#FFD700', // Gold
    priority: 1,
  },

  'profile': {
    title: '👤 Profile System',
    description: 'User profiles, identity, connections, and personal data',
    icon: '👤',
    components: [
      'profile-identity-widget',
      'profile-activity-widget',
      'profile-connections-widget',
      'profile-spaces-widget',
      'profile-completion-card',
      'profile-bento-grid',
      'profile-view-layout',
      'simple-avatar',
      'input-enhanced',
      'textarea-enhanced',
    ],
    color: '#4F46E5', // Indigo
    priority: 2,
  },

  'spaces': {
    title: '🏠 Spaces & Communities',
    description: 'Community spaces, discovery, membership, and engagement',
    icon: '🏠',
    components: [
      // Space-related components (to be identified)
    ],
    color: '#10B981', // Green
    priority: 3,
  },

  'feed': {
    title: '📱 Feed & Content',
    description: 'Content feed, posts, media, and discovery',
    icon: '📱',
    components: [
      'photo-carousel',
      'page-container',
    ],
    color: '#F59E0B', // Amber
    priority: 4,
  },

  'tools': {
    title: '🛠️ Tools & HiveLab',
    description: 'Tool builder, custom tools, and creation systems',
    icon: '🛠️',
    components: [
      'complete-hive-tools-system',
      'hivelab-widget',
    ],
    color: '#8B5CF6', // Purple
    priority: 5,
  },

  'notifications': {
    title: '🔔 Notifications',
    description: 'Notification system, alerts, and real-time updates',
    icon: '🔔',
    components: [
      'notification-bell',
      'notification-item',
      'notification-dropdown',
      'notification-toast-manager',
      'notification-system',
    ],
    color: '#EF4444', // Red
    priority: 6,
  },

  'navigation': {
    title: '🧭 Navigation',
    description: 'App navigation, routing, and shell components',
    icon: '🧭',
    components: [
      'navigation-shell',
      'top-bar-nav',
      'navigation-preferences',
    ],
    color: '#06B6D4', // Cyan
    priority: 7,
  },

  'forms': {
    title: '📝 Forms & Input',
    description: 'Form components, validation, and data collection',
    icon: '📝',
    components: [
      'form-field',
    ],
    color: '#84CC16', // Lime
    priority: 8,
  },

  'social': {
    title: '💬 Social & Engagement',
    description: 'Social features, interactions, and connections',
    icon: '💬',
    components: [
      'friend-request-manager',
      'social-proof-accelerator',
      'crisis-relief-interface',
    ],
    color: '#EC4899', // Pink
    priority: 9,
  },
};

/**
 * Detect which feature a component belongs to based on its name/path
 */
export function detectFeature(componentName: string): string {
  const name = componentName.toLowerCase();

  // Check each feature's components
  for (const [featureKey, feature] of Object.entries(FEATURE_MAP)) {
    if (feature.components.some(comp => name.includes(comp.toLowerCase()))) {
      return featureKey;
    }
  }

  // Fallback patterns
  if (name.includes('profile-')) return 'profile';
  if (name.includes('notification-')) return 'notifications';
  if (name.includes('navigation-') || name.includes('nav-')) return 'navigation';
  if (name.includes('welcome-') || name.includes('onboard')) return 'onboarding';
  if (name.includes('tool-') || name.includes('hivelab-') || name.includes('lab-')) return 'tools';
  if (name.includes('space-')) return 'spaces';
  if (name.includes('feed-') || name.includes('post-')) return 'feed';
  if (name.includes('form-') || name.includes('input') || name.includes('textarea')) return 'forms';
  if (name.includes('friend-') || name.includes('social-')) return 'social';

  // Default to design-system for foundational components
  return 'design-system';
}

/**
 * Get feature config by key
 */
export function getFeature(key: string): FeatureConfig | undefined {
  return FEATURE_MAP[key];
}

/**
 * Get all features sorted by priority
 */
export function getAllFeatures(): FeatureConfig[] {
  return Object.values(FEATURE_MAP).sort((a, b) => a.priority - b.priority);
}
