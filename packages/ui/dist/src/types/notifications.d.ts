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
    urgencyLevel?: 'immediate' | 'today' | 'this_week';
    socialProofText?: string;
    exclusivityText?: string;
}
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
export declare const NOTIFICATION_TEMPLATES: Record<string, NotificationTemplate>;
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
    urgencyLevel?: 'immediate' | 'high';
    category?: HiveNotification['category'];
}
export default HiveNotification;
//# sourceMappingURL=notifications.d.ts.map