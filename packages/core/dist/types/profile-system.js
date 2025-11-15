"use strict";
/**
 * HIVE Profile System Types
 * Complete type definitions matching the Profile PRD
 * Mobile-first, real-time, connection-aware
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilityLevel = exports.ConnectionType = void 0;
// ============================================
// Module 2: Connection System
// ============================================
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["NONE"] = "none";
    ConnectionType["CONNECTION"] = "connection";
    ConnectionType["FRIEND"] = "friend"; // Intentional with mutual approval
})(ConnectionType || (exports.ConnectionType = ConnectionType = {}));
// ============================================
// Module 5: Privacy Controls
// ============================================
var VisibilityLevel;
(function (VisibilityLevel) {
    VisibilityLevel["GHOST"] = "ghost";
    VisibilityLevel["FRIENDS_ONLY"] = "friends";
    VisibilityLevel["CONNECTIONS"] = "connections";
    VisibilityLevel["CAMPUS"] = "campus";
})(VisibilityLevel || (exports.VisibilityLevel = VisibilityLevel = {}));
//# sourceMappingURL=profile-system.js.map