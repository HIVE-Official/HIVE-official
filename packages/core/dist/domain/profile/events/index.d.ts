/**
 * Profile Domain Events
 * Events emitted by profile aggregates for audit and integration
 */
import { UserTypeEnum } from '../value-objects/user-type';
import { VisibilityLevel } from '../value-objects/profile-privacy';
import { ConnectionType, ConnectionStatus } from '../aggregates/connection';
export interface DomainEvent {
    eventId: string;
    aggregateId: string;
    eventType: string;
    occurredAt: Date;
    campusId: string;
    userId: string;
    metadata?: Record<string, any>;
}
export interface ProfileCreatedEvent extends DomainEvent {
    eventType: 'profile.created';
    payload: {
        profileId: string;
        email: string;
        handle: string;
        firstName: string;
        lastName: string;
        userType: UserTypeEnum;
        campusId: string;
    };
}
export interface ProfileUpdatedEvent extends DomainEvent {
    eventType: 'profile.updated';
    payload: {
        profileId: string;
        changes: {
            field: string;
            oldValue: any;
            newValue: any;
        }[];
    };
}
export interface ProfileOnboardingCompletedEvent extends DomainEvent {
    eventType: 'profile.onboarding_completed';
    payload: {
        profileId: string;
        completionScore: number;
        timeToComplete: number;
    };
}
export interface ProfileVerifiedEvent extends DomainEvent {
    eventType: 'profile.verified';
    payload: {
        profileId: string;
        verificationType: 'faculty' | 'athlete' | 'student_leader';
        verifiedBy: string;
    };
}
export interface ProfileViewedEvent extends DomainEvent {
    eventType: 'profile.viewed';
    payload: {
        profileId: string;
        viewerId: string;
        viewerType: 'public' | 'campus' | 'connection' | 'self';
        viewDuration?: number;
    };
}
export interface ProfilePrivacyUpdatedEvent extends DomainEvent {
    eventType: 'profile.privacy_updated';
    payload: {
        profileId: string;
        oldVisibility: VisibilityLevel;
        newVisibility: VisibilityLevel;
        changedSettings: string[];
    };
}
export interface ConnectionCreatedEvent extends DomainEvent {
    eventType: 'connection.created';
    payload: {
        connectionId: string;
        fromProfileId: string;
        toProfileId: string;
        type: ConnectionType;
        status: ConnectionStatus;
    };
}
export interface ConnectionAcceptedEvent extends DomainEvent {
    eventType: 'connection.accepted';
    payload: {
        connectionId: string;
        fromProfileId: string;
        toProfileId: string;
        type: ConnectionType;
    };
}
export interface ConnectionBlockedEvent extends DomainEvent {
    eventType: 'connection.blocked';
    payload: {
        connectionId: string;
        blockerProfileId: string;
        blockedProfileId: string;
        reason?: string;
    };
}
export interface ConnectionUpgradedEvent extends DomainEvent {
    eventType: 'connection.upgraded';
    payload: {
        connectionId: string;
        fromProfileId: string;
        toProfileId: string;
        oldType: ConnectionType;
        newType: ConnectionType;
    };
}
export interface MutualConnectionFormedEvent extends DomainEvent {
    eventType: 'connection.mutual_formed';
    payload: {
        profile1Id: string;
        profile2Id: string;
        connectionStrength: number;
        mutualConnectionCount: number;
    };
}
export interface ProfileSearchedEvent extends DomainEvent {
    eventType: 'profile.searched';
    payload: {
        searcherId: string;
        searchQuery: string;
        resultsCount: number;
        clickedResults: string[];
    };
}
export interface ProfileDiscoveredEvent extends DomainEvent {
    eventType: 'profile.discovered';
    payload: {
        profileId: string;
        discoveredBy: string;
        discoveryMethod: 'search' | 'recommendation' | 'space' | 'feed' | 'connection';
    };
}
export interface ProfileEngagementEvent extends DomainEvent {
    eventType: 'profile.engagement';
    payload: {
        profileId: string;
        engagementType: 'post_created' | 'comment_added' | 'space_joined' | 'event_attended';
        targetId: string;
        targetType: 'post' | 'comment' | 'space' | 'event';
    };
}
export declare class ProfileEventFactory {
    static createProfileCreated(profileId: string, email: string, handle: string, firstName: string, lastName: string, userType: UserTypeEnum, campusId: string, userId: string): ProfileCreatedEvent;
    static createProfileViewed(profileId: string, viewerId: string, viewerType: 'public' | 'campus' | 'connection' | 'self', campusId: string): ProfileViewedEvent;
    static createConnectionCreated(connection: any, // Connection aggregate
    campusId: string): ConnectionCreatedEvent;
    static createPrivacyUpdated(profileId: string, oldVisibility: VisibilityLevel, newVisibility: VisibilityLevel, changedSettings: string[], campusId: string, userId: string): ProfilePrivacyUpdatedEvent;
}
export interface IEventBus {
    publish(event: DomainEvent): Promise<void>;
    subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void;
    unsubscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void;
}
//# sourceMappingURL=index.d.ts.map