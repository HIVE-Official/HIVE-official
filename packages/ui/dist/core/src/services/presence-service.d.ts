import { Timestamp } from 'firebase/firestore';
import type { User } from 'firebase/auth';
/**
 * SPEC-COMPLIANT PRESENCE SERVICE
 *
 * Per SPEC.md:
 * - Real-time online presence tracking
 * - Ghost mode support (appear offline while online)
 * - Campus-isolated presence data
 * - Automatic cleanup on disconnect
 *
 * Behavioral Design: Creates FOMO when you see someone online you want to connect with
 */
export type PresenceStatus = 'online' | 'away' | 'ghost' | 'offline';
export interface PresenceData {
    uid: string;
    campusId: string;
    status: PresenceStatus;
    lastSeen: Timestamp;
    isGhostMode: boolean;
    deviceInfo?: {
        platform: 'web' | 'mobile';
        browser?: string;
    };
}
declare class PresenceService {
    private presenceRef;
    private currentUser;
    private isGhostMode;
    private activityTimer;
    private unsubscribe;
    /**
     * Initialize presence for a user
     */
    initializePresence(user: User, campusId?: string): Promise<void>;
    /**
     * Toggle ghost mode
     */
    toggleGhostMode(enabled: boolean): Promise<void>;
    /**
     * Update user status (online, away, ghost)
     */
    updateStatus(status: PresenceStatus): Promise<void>;
    /**
     * Monitor user activity and set to away after inactivity
     */
    private startActivityMonitoring;
    /**
     * Subscribe to another user's presence
     */
    subscribeToUserPresence(uid: string, callback: (presence: PresenceData | null) => void): () => void;
    /**
     * Get current presence for a user
     */
    getUserPresence(uid: string): Promise<PresenceData | null>;
    /**
     * Clean up presence on logout
     */
    cleanup(): Promise<void>;
    /**
     * Check if a user appears online (accounting for ghost mode)
     */
    isUserOnline(presence: PresenceData | null): boolean;
    /**
     * Get display status for UI (handles ghost mode visibility)
     */
    getDisplayStatus(presence: PresenceData | null, viewerUid?: string): PresenceStatus;
}
export declare const presenceService: PresenceService;
export {};
//# sourceMappingURL=presence-service.d.ts.map