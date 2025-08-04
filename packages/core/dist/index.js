"use strict";
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
exports.canViewProfile = exports.isProfilePublic = exports.getProfileUrl = exports.getDisplayName = exports.isValidEmail = exports.isValidProfileHandle = exports.DEFAULT_BUILDER_INFO = exports.DEFAULT_PRIVACY_SETTINGS = exports.getProfileCompleteness = void 0;
// Domain types - Creation
__exportStar(require("./domain/creation/element"), exports);
__exportStar(require("./domain/creation/tool"), exports);
// Domain types - Firestore
__exportStar(require("./domain/firestore/handle"), exports);
__exportStar(require("./domain/firestore/member"), exports);
__exportStar(require("./domain/firestore/post"), exports);
__exportStar(require("./domain/firestore/space"), exports);
__exportStar(require("./domain/firestore/user"), exports);
var profile_1 = require("./domain/profile/profile");
Object.defineProperty(exports, "getProfileCompleteness", { enumerable: true, get: function () { return profile_1.getProfileCompleteness; } });
Object.defineProperty(exports, "DEFAULT_PRIVACY_SETTINGS", { enumerable: true, get: function () { return profile_1.DEFAULT_PRIVACY_SETTINGS; } });
Object.defineProperty(exports, "DEFAULT_BUILDER_INFO", { enumerable: true, get: function () { return profile_1.DEFAULT_BUILDER_INFO; } });
Object.defineProperty(exports, "isValidProfileHandle", { enumerable: true, get: function () { return profile_1.isValidHandle; } });
Object.defineProperty(exports, "isValidEmail", { enumerable: true, get: function () { return profile_1.isValidEmail; } });
Object.defineProperty(exports, "getDisplayName", { enumerable: true, get: function () { return profile_1.getDisplayName; } });
Object.defineProperty(exports, "getProfileUrl", { enumerable: true, get: function () { return profile_1.getProfileUrl; } });
Object.defineProperty(exports, "isProfilePublic", { enumerable: true, get: function () { return profile_1.isProfilePublic; } });
Object.defineProperty(exports, "canViewProfile", { enumerable: true, get: function () { return profile_1.canViewProfile; } });
// Domain types - Auth
__exportStar(require("./domain/auth/emailLink"), exports);
// Domain types - Analytics
// Note: Both creation and feed modules export hashUserId - use specific imports if needed
__exportStar(require("./domain/analytics/creation"), exports);
__exportStar(require("./domain/analytics/onboarding"), exports);
__exportStar(require("./domain/analytics/feed"), exports);
__exportStar(require("./domain/analytics/events"), exports);
// Cohort utilities
__exportStar(require("./domain/cohort/cohort-spaces"), exports);
// Constants
__exportStar(require("./constants/majors"), exports);
// Stores
__exportStar(require("./stores/useAppStore"), exports);
// Firebase client config
__exportStar(require("./firebase"), exports);
// Feature flags
__exportStar(require("./feature-flags"), exports);
// Privacy utilities
__exportStar(require("./utils/privacy-utils"), exports);
//# sourceMappingURL=index.js.map