/**
 * 🔔 HIVE Notification Types
 *
 * Behavioral Psychology Type System:
 * - someone_needs_you: Relief amplifier notifications
 * - social_proof: Recognition and status notifications
 * - insider_knowledge: Exclusive information notifications
 * - community_growth: Platform expansion notifications
 */
// Behavioral notification templates
export const NOTIFICATION_TEMPLATES = {
    HELP_REQUEST: {
        type: 'help_request',
        priority: 'high',
        category: 'someone_needs_you',
        title: 'Someone needs your expertise!',
        message: 'A classmate is struggling and could use your help.',
        urgencyLevel: 'immediate',
        socialProofTemplate: '{count} others are also helping',
        exclusivityTemplate: 'You have experience they need'
    },
    SPACE_MENTION: {
        type: 'space',
        priority: 'medium',
        category: 'social_proof',
        title: 'You were mentioned in {spaceName}',
        message: 'Someone brought up your expertise in a discussion.',
        socialProofTemplate: 'Your insights helped {count} people',
        exclusivityTemplate: 'You\'re recognized as a go-to person'
    },
    ACHIEVEMENT_UNLOCK: {
        type: 'achievement',
        priority: 'medium',
        category: 'social_proof',
        title: 'Achievement unlocked!',
        message: 'You\'ve reached a new milestone in the community.',
        exclusivityTemplate: 'You\'re in the top {percentile}% of contributors'
    },
    INSIDER_UPDATE: {
        type: 'system',
        priority: 'low',
        category: 'insider_knowledge',
        title: 'Early access update',
        message: 'New features are available for active community members.',
        exclusivityTemplate: 'You\'re among the first to get access'
    },
    CONNECTION_REQUEST: {
        type: 'connection',
        priority: 'medium',
        category: 'social_proof',
        title: 'Someone wants to connect!',
        message: '{senderName} sent you a connection request.',
        socialProofTemplate: 'You have {count} mutual connections'
    }
};
//# sourceMappingURL=notifications.js.map