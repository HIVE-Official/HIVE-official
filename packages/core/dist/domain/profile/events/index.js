"use strict";
/**
 * Profile Domain Events
 * Events emitted by profile aggregates for audit and integration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileEventFactory = void 0;
// Event Factory
class ProfileEventFactory {
    static createProfileCreated(profileId, email, handle, firstName, lastName, userType, campusId, userId) {
        return {
            eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            aggregateId: profileId,
            eventType: 'profile.created',
            occurredAt: new Date(),
            campusId,
            userId,
            payload: {
                profileId,
                email,
                handle,
                firstName,
                lastName,
                userType,
                campusId
            }
        };
    }
    static createProfileViewed(profileId, viewerId, viewerType, campusId) {
        return {
            eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            aggregateId: profileId,
            eventType: 'profile.viewed',
            occurredAt: new Date(),
            campusId,
            userId: viewerId,
            payload: {
                profileId,
                viewerId,
                viewerType
            }
        };
    }
    static createConnectionCreated(connection, // Connection aggregate
    campusId) {
        return {
            eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            aggregateId: connection.id,
            eventType: 'connection.created',
            occurredAt: new Date(),
            campusId,
            userId: connection.fromProfileId.id,
            payload: {
                connectionId: connection.id,
                fromProfileId: connection.fromProfileId.id,
                toProfileId: connection.toProfileId.id,
                type: connection.type,
                status: connection.status
            }
        };
    }
    static createPrivacyUpdated(profileId, oldVisibility, newVisibility, changedSettings, campusId, userId) {
        return {
            eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            aggregateId: profileId,
            eventType: 'profile.privacy_updated',
            occurredAt: new Date(),
            campusId,
            userId,
            payload: {
                profileId,
                oldVisibility,
                newVisibility,
                changedSettings
            }
        };
    }
}
exports.ProfileEventFactory = ProfileEventFactory;
//# sourceMappingURL=index.js.map