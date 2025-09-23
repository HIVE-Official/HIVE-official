/**
 * HIVE Profile System Types
 * Complete type definitions matching the Profile PRD
 * Mobile-first, real-time, connection-aware
 */
// ============================================
// Module 2: Connection System
// ============================================
export var ConnectionType;
(function (ConnectionType) {
    ConnectionType["NONE"] = "none";
    ConnectionType["CONNECTION"] = "connection";
    ConnectionType["FRIEND"] = "friend"; // Intentional with mutual approval
})(ConnectionType || (ConnectionType = {}));
// ============================================
// Module 5: Privacy Controls
// ============================================
export var VisibilityLevel;
(function (VisibilityLevel) {
    VisibilityLevel["GHOST"] = "ghost";
    VisibilityLevel["FRIENDS_ONLY"] = "friends";
    VisibilityLevel["CONNECTIONS"] = "connections";
    VisibilityLevel["CAMPUS"] = "campus";
})(VisibilityLevel || (VisibilityLevel = {}));
// Export all types
export * from './profile-system';
//# sourceMappingURL=profile-system.js.map