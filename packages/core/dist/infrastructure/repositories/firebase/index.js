"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedRepository = getFeedRepository;
exports.getProfileRepository = getProfileRepository;
exports.getSpaceRepository = getSpaceRepository;
exports.getRitualRepository = getRitualRepository;
// Temporary mock implementations (to be replaced with actual Firebase repos)
function getFeedRepository() {
    return {
        findByUserId: async () => ({ isSuccess: false, error: 'Not implemented' }),
        saveFeed: async () => ({ isSuccess: true }),
        getFeedContent: async () => ({ isSuccess: true, getValue: () => [] }),
        getTrendingContent: async () => ({ isSuccess: true, getValue: () => [] }),
        getEventContent: async () => ({ isSuccess: true, getValue: () => [] }),
        getRitualContent: async () => ({ isSuccess: true, getValue: () => [] }),
        recordInteraction: async () => ({ isSuccess: true }),
        subscribeToFeed: () => () => { }
    };
}
function getProfileRepository() {
    return {
        findById: async () => ({ isSuccess: false, error: 'Not implemented' }),
        findByEmail: async () => ({ isSuccess: false, error: 'Not implemented' }),
        findByHandle: async () => ({ isSuccess: false, error: 'Not implemented' }),
        save: async () => ({ isSuccess: true }),
        delete: async () => ({ isSuccess: true }),
        findOnboardedProfiles: async () => ({ isSuccess: true, getValue: () => [] }),
        findByInterest: async () => ({ isSuccess: true, getValue: () => [] }),
        findByMajor: async () => ({ isSuccess: true, getValue: () => [] }),
        findConnectionsOf: async () => ({ isSuccess: true, getValue: () => [] }),
        getTotalCampusUsers: async () => ({ isSuccess: true, getValue: () => 0 }),
        exists: async () => false,
        searchByName: async () => ({ isSuccess: true, getValue: () => [] }),
        findByCampus: async () => ({ isSuccess: true, getValue: () => [] })
    };
}
function getSpaceRepository() {
    return {
        findById: async () => ({ isSuccess: false, error: 'Not implemented' }),
        findByMember: async () => ({ isSuccess: true, getValue: () => [] }),
        save: async () => ({ isSuccess: true }),
        delete: async () => ({ isSuccess: true }),
        findByName: async () => ({ isSuccess: false, error: 'Not implemented' }),
        findByCampus: async () => ({ isSuccess: true, getValue: () => [] }),
        findByCategory: async () => ({ isSuccess: true, getValue: () => [] }),
        findUserSpaces: async () => ({ isSuccess: true, getValue: () => [] }),
        findTrending: async () => ({ isSuccess: true, getValue: () => [] }),
        findRecommended: async () => ({ isSuccess: true, getValue: () => [] }),
        searchSpaces: async () => ({ isSuccess: true, getValue: () => [] })
    };
}
function getRitualRepository() {
    return {
        findById: async () => ({ isSuccess: false, error: 'Not implemented' }),
        save: async () => ({ isSuccess: true }),
        delete: async () => ({ isSuccess: true }),
        findByCampus: async () => ({ isSuccess: true, getValue: () => [] }),
        findActive: async () => ({ isSuccess: true, getValue: () => [] }),
        findByType: async () => ({ isSuccess: true, getValue: () => [] }),
        findActiveByType: async () => ({ isSuccess: false, error: 'Not implemented' }),
        findUserRituals: async () => ({ isSuccess: true, getValue: () => [] }),
        findParticipation: async () => ({ isSuccess: false, error: 'Not implemented' }),
        saveParticipation: async () => ({ isSuccess: true })
    };
}
//# sourceMappingURL=index.js.map