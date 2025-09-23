"use strict";
/**
 * HIVE Profile System Types
 * Complete type definitions matching the Profile PRD
 * Mobile-first, real-time, connection-aware
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
// Export all types
__exportStar(require("./profile-system"), exports);
//# sourceMappingURL=profile-system.js.map