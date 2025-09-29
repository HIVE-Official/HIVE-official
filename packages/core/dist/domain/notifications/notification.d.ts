/**
 * HIVE Notification System
 * Relief amplifiers that create connection opportunities
 * Never anxiety triggers - always "someone needs you" framing
 */
import type { Timestamp } from 'firebase/firestore';
export type NotificationType = 'friend_request' | 'space_invite' | 'post_comment' | 'ritual_invite' | 'mention' | 'space_activity' | 'connection_milestone' | 'insider_knowledge' | 'system';
export type NotificationPriority = 'relief' | 'social' | 'insider' | 'normal';
export interface NotificationMetadata {
    sourceUserId?: string;
    sourceUserName?: string;
    sourceUserAvatar?: string;
    spaceId?: string;
    spaceName?: string;
    postId?: string;
    ritualId?: string;
    eventId?: string;
    actionUrl?: string;
    previewText?: string;
    groupKey?: string;
    expiresAt?: Timestamp;
}
export interface Notification {
    id: string;
    userId: string;
    campusId: string;
    type: NotificationType;
    priority: NotificationPriority;
    title: string;
    body: string;
    metadata: NotificationMetadata;
    isRead: boolean;
    isActioned: boolean;
    createdAt: Timestamp;
    readAt?: Timestamp;
    actionedAt?: Timestamp;
    engagementScore: number;
    reliefScore: number;
}
export interface NotificationPreferences {
    userId: string;
    inApp: boolean;
    email: boolean;
    push: boolean;
    friendRequests: boolean;
    spaceInvites: boolean;
    postComments: boolean;
    ritualInvites: boolean;
    mentions: boolean;
    spaceActivity: boolean;
    milestones: boolean;
    insiderKnowledge: boolean;
    system: boolean;
    batchSimilar: boolean;
    quietHours: {
        enabled: boolean;
        start: string;
        end: string;
    };
    maxPerHour: number;
    digestFrequency: 'instant' | 'hourly' | 'daily' | 'never';
}
export interface NotificationStats {
    userId: string;
    totalReceived: number;
    totalRead: number;
    totalActioned: number;
    averageTimeToRead: number;
    averageTimeToAction: number;
    mostEngagedType: NotificationType;
    leastEngagedType: NotificationType;
    lastNotificationAt: Timestamp;
    lastReadAt: Timestamp;
}
export declare function createNotificationMessage(type: NotificationType, metadata: NotificationMetadata): {
    title: string;
    body: string;
};
export declare function batchNotifications(notifications: Notification[]): Notification[];
export type { Timestamp };
//# sourceMappingURL=notification.d.ts.map