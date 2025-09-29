"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenceService = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
class PresenceService {
    constructor() {
        this.presenceRef = null;
        this.currentUser = null;
        this.isGhostMode = false;
        this.activityTimer = null;
        this.unsubscribe = null;
    }
    /**
     * Initialize presence for a user
     */
    async initializePresence(user, campusId = 'ub-buffalo') {
        if (!user)
            return;
        this.currentUser = user;
        const presenceDocRef = (0, firestore_1.doc)(firebase_1.db, 'presence', user.uid);
        // Set initial online status
        const presenceData = {
            uid: user.uid,
            campusId,
            status: this.isGhostMode ? 'ghost' : 'online',
            lastSeen: (0, firestore_1.serverTimestamp)(),
            isGhostMode: this.isGhostMode,
            deviceInfo: {
                platform: 'web',
                browser: navigator.userAgent.includes('Chrome') ? 'Chrome' :
                    navigator.userAgent.includes('Safari') ? 'Safari' :
                        navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other'
            }
        };
        try {
            // Set online status
            await (0, firestore_1.setDoc)(presenceDocRef, presenceData, { merge: true });
            // Note: onDisconnect is only available with Realtime Database, not Firestore
            // User cleanup will need to be handled differently (e.g., periodic cleanup or on logout)
            // Start activity monitoring
            this.startActivityMonitoring();
            // Store reference for cleanup
            this.presenceRef = presenceDocRef;
            console.log('✅ Presence initialized for user:', user.uid);
        }
        catch (error) {
            console.error('❌ Error initializing presence:', error);
        }
    }
    /**
     * Toggle ghost mode
     */
    async toggleGhostMode(enabled) {
        this.isGhostMode = enabled;
        if (!this.currentUser || !this.presenceRef)
            return;
        const newStatus = enabled ? 'ghost' : 'online';
        try {
            await (0, firestore_1.setDoc)(this.presenceRef, {
                status: newStatus,
                isGhostMode: enabled,
                lastSeen: (0, firestore_1.serverTimestamp)()
            }, { merge: true });
            console.log(`👻 Ghost mode ${enabled ? 'enabled' : 'disabled'}`);
        }
        catch (error) {
            console.error('❌ Error toggling ghost mode:', error);
        }
    }
    /**
     * Update user status (online, away, ghost)
     */
    async updateStatus(status) {
        if (!this.currentUser || !this.presenceRef)
            return;
        // If ghost mode is on, always show as ghost/offline
        const effectiveStatus = this.isGhostMode ? 'ghost' : status;
        try {
            await (0, firestore_1.setDoc)(this.presenceRef, {
                status: effectiveStatus,
                lastSeen: (0, firestore_1.serverTimestamp)()
            }, { merge: true });
            console.log(`📊 Status updated to: ${effectiveStatus}`);
        }
        catch (error) {
            console.error('❌ Error updating status:', error);
        }
    }
    /**
     * Monitor user activity and set to away after inactivity
     */
    startActivityMonitoring() {
        const INACTIVE_THRESHOLD = 5 * 60 * 1000; // 5 minutes
        const resetActivityTimer = () => {
            // Clear existing timer
            if (this.activityTimer) {
                clearTimeout(this.activityTimer);
            }
            // Set status to online if not in ghost mode
            if (!this.isGhostMode) {
                this.updateStatus('online');
            }
            // Set new timer for away status
            this.activityTimer = setTimeout(() => {
                if (!this.isGhostMode) {
                    this.updateStatus('away');
                }
            }, INACTIVE_THRESHOLD);
        };
        // Listen for user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetActivityTimer, true);
        });
        // Start the timer
        resetActivityTimer();
    }
    /**
     * Subscribe to another user's presence
     */
    subscribeToUserPresence(uid, callback) {
        const presenceDocRef = (0, firestore_1.doc)(firebase_1.db, 'presence', uid);
        const unsubscribe = (0, firestore_1.onSnapshot)(presenceDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                // If user is in ghost mode, show as offline to others
                if (data.isGhostMode && uid !== this.currentUser?.uid) {
                    callback({
                        ...data,
                        status: 'offline'
                    });
                }
                else {
                    callback(data);
                }
            }
            else {
                callback(null);
            }
        }, (error) => {
            console.error('❌ Error subscribing to presence:', error);
            callback(null);
        });
        return unsubscribe;
    }
    /**
     * Get current presence for a user
     */
    async getUserPresence(uid) {
        try {
            const presenceDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.db, 'presence', uid));
            if (presenceDoc.exists()) {
                const data = presenceDoc.data();
                // If user is in ghost mode, show as offline to others
                if (data.isGhostMode && uid !== this.currentUser?.uid) {
                    return {
                        ...data,
                        status: 'offline'
                    };
                }
                return data;
            }
            return null;
        }
        catch (error) {
            console.error('❌ Error getting user presence:', error);
            return null;
        }
    }
    /**
     * Clean up presence on logout
     */
    async cleanup() {
        if (this.activityTimer) {
            clearTimeout(this.activityTimer);
        }
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        if (this.presenceRef && this.currentUser) {
            try {
                await (0, firestore_1.setDoc)(this.presenceRef, {
                    status: 'offline',
                    lastSeen: (0, firestore_1.serverTimestamp)()
                }, { merge: true });
            }
            catch (error) {
                console.error('❌ Error cleaning up presence:', error);
            }
        }
        this.presenceRef = null;
        this.currentUser = null;
        this.isGhostMode = false;
    }
    /**
     * Check if a user appears online (accounting for ghost mode)
     */
    isUserOnline(presence) {
        if (!presence)
            return false;
        // For the current user, show true status even in ghost mode
        if (presence.uid === this.currentUser?.uid) {
            return presence.status === 'online' || presence.status === 'away';
        }
        // For others, ghost mode appears as offline
        if (presence.isGhostMode)
            return false;
        return presence.status === 'online' || presence.status === 'away';
    }
    /**
     * Get display status for UI (handles ghost mode visibility)
     */
    getDisplayStatus(presence, viewerUid) {
        if (!presence)
            return 'offline';
        // Show true status to self
        if (presence.uid === viewerUid) {
            return presence.status;
        }
        // Ghost mode appears as offline to others
        if (presence.isGhostMode) {
            return 'offline';
        }
        return presence.status;
    }
}
// Export singleton instance
exports.presenceService = new PresenceService();
//# sourceMappingURL=presence-service.js.map