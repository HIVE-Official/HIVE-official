/**
 * Canonical Space Data Model
 *
 * This file defines the contract for all Space components in the HIVE UI system.
 * These types mirror @hive/core domain models but are simplified for UI layer consumption.
 *
 * @module types/space
 */
/**
 * Helper: Create Empty Campus Context
 */
export const createEmptyCampusContext = () => ({
    friendsInSpace: [],
    isTrending: false,
});
/**
 * Helper: Create Default User Context
 */
export const createDefaultUserContext = () => ({
    isJoined: false,
    isLeader: false,
    unreadCount: 0,
});
/**
 * Helper: Create Default Stats
 */
export const createDefaultStats = () => ({
    memberCount: 0,
    postCount: 0,
    eventCount: 0,
    activeToday: 0,
});
/**
 * Type Guard: Check if action is post-related
 */
export const isPostAction = (action) => {
    return action.type.startsWith('post.');
};
/**
 * Type Guard: Check if action is event-related
 */
export const isEventAction = (action) => {
    return action.type.startsWith('event.');
};
/**
 * Type Guard: Check if action is member-related
 */
export const isMemberAction = (action) => {
    return action.type.startsWith('member.');
};
/**
 * Type Guard: Check if action requires leader permissions
 */
export const isLeaderAction = (action) => {
    const leaderActions = [
        'space.edit',
        'space.settings',
        'space.analytics',
        'event.create',
        'event.edit',
        'event.delete',
        'resource.add',
        'resource.edit',
        'resource.delete',
        'member.remove',
        'member.promote',
        'member.demote',
        'content.remove',
        'description.edit',
        'rules.edit',
    ];
    return leaderActions.includes(action.type);
};
//# sourceMappingURL=space.types.js.map