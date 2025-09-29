/**
 * 🔔 HIVE Notification Types
 *
 * Behavioral Psychology Type System:
 * - someone_needs_you: Relief amplifier notifications
 * - social_proof: Recognition and status notifications
 * - insider_knowledge: Exclusive information notifications
 * - community_growth: Platform expansion notifications
 */

import { Timestamp } from 'firebase/firestore';

export interface HiveNotification {
  id: string;
  title: string;
  message: string;
  type: 'connection' | 'space' | 'help_request' | 'achievement' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'social_proof' | 'someone_needs_you' | 'insider_knowledge' | 'community_growth';
  isRead: boolean;
  timestamp: Timestamp;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    spaceId?: string;
    userId?: string;
    toolId?: string;
    ritualId?: string;
    avatarUrl?: string;
    senderName?: string;
    helpersCount?: number;
    percentile?: string;
    [key: string]: any;
  };
  // Behavioral triggers
  urgencyLevel?: 'immediate' | 'today' | 'this_week';
  socialProofText?: string; // "3 people need your help with..."
  exclusivityText?: string; // "You're one of 5 people who can..."
}

// Notification creation helpers
export interface NotificationTemplate {
  type: HiveNotification['type'];
  priority: HiveNotification['priority'];
  category: HiveNotification['category'];
  title: string;
  message: string;
  urgencyLevel?: HiveNotification['urgencyLevel'];
  socialProofTemplate?: string;
  exclusivityTemplate?: string;
}

// Behavioral notification templates
export const NOTIFICATION_TEMPLATES: Record<string, NotificationTemplate> = {
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

// Toast notification interface for high-priority alerts
export interface ToastNotificationData {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  // Behavioral enhancements
  urgencyLevel?: 'immediate' | 'high';
  category?: HiveNotification['category'];
}

export default HiveNotification;