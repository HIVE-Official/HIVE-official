"use strict";
/**
 * HIVE Notification System
 * Relief amplifiers that create connection opportunities
 * Never anxiety triggers - always "someone needs you" framing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationMessage = createNotificationMessage;
exports.batchNotifications = batchNotifications;
// Helper to create relief-focused notification messages
function createNotificationMessage(type, metadata) {
    switch (type) {
        case 'friend_request':
            return {
                title: `${metadata.sourceUserName} wants to connect`,
                body: "You're not alone - someone reached out"
            };
        case 'space_invite':
            return {
                title: `You're invited to ${metadata.spaceName}`,
                body: "Your community is waiting for you"
            };
        case 'post_comment':
            return {
                title: `${metadata.sourceUserName} responded to you`,
                body: "Your thoughts resonated with someone"
            };
        case 'ritual_invite':
            return {
                title: "Join a campus moment",
                body: "Be part of something bigger happening now"
            };
        case 'mention':
            return {
                title: `${metadata.sourceUserName} mentioned you`,
                body: "You're part of the conversation"
            };
        case 'space_activity':
            return {
                title: `New activity in ${metadata.spaceName}`,
                body: "Your community is active right now"
            };
        case 'connection_milestone':
            return {
                title: "You made a difference",
                body: metadata.previewText || "Someone benefited from your contribution"
            };
        case 'insider_knowledge':
            return {
                title: "Exclusive info for you",
                body: metadata.previewText || "Something not everyone knows yet"
            };
        case 'system':
            return {
                title: "HIVE Update",
                body: metadata.previewText || "New features to help you connect"
            };
        default:
            return {
                title: "You have a notification",
                body: "Check what's happening in your community"
            };
    }
}
// Batch similar notifications for less overwhelm
function batchNotifications(notifications) {
    const grouped = notifications.reduce((acc, notif) => {
        const key = notif.metadata.groupKey || `${notif.type}_${notif.metadata.spaceId || 'global'}`;
        if (!acc[key])
            acc[key] = [];
        acc[key].push(notif);
        return acc;
    }, {});
    return Object.values(grouped).map(group => {
        if (group.length === 1)
            return group[0];
        // Create a batched notification
        const first = group[0];
        const count = group.length;
        return {
            ...first,
            title: `${count} ${first.type.replace('_', ' ')}s`,
            body: `Multiple people ${getActionVerb(first.type)}`,
            metadata: {
                ...first.metadata,
                previewText: `${count} similar notifications`
            }
        };
    });
}
function getActionVerb(type) {
    switch (type) {
        case 'friend_request': return 'want to connect';
        case 'space_invite': return 'invited you';
        case 'post_comment': return 'responded';
        case 'mention': return 'mentioned you';
        default: return 'need your attention';
    }
}
//# sourceMappingURL=notification.js.map