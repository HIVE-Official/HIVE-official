"use strict";
// This file is the client-safe entry point for the package.
// It should not export anything that uses server-side dependencies.
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
exports.logger = exports.isDebugMode = exports.getFirebaseConfig = exports.isProduction = exports.isDevelopment = exports.env = exports.db = exports.auth = exports.app = exports.SpaceDiscoverySchema = exports.SpaceOwnerType = exports.SpaceSection = exports.CreatePostSchema = void 0;
// Domain types - Safe to export
__exportStar(require("./domain/creation/element"), exports);
__exportStar(require("./domain/creation/tool"), exports);
__exportStar(require("./domain/firestore/handle"), exports);
__exportStar(require("./domain/firestore/member"), exports);
__exportStar(require("./domain/firestore/post"), exports);
__exportStar(require("./domain/firestore/user"), exports);
__exportStar(require("./domain/firestore/leader-claim"), exports);
__exportStar(require("./domain/auth/emailLink"), exports);
__exportStar(require("./domain/analytics/creation"), exports);
__exportStar(require("./domain/analytics/onboarding"), exports);
__exportStar(require("./domain/analytics/feed"), exports);
__exportStar(require("./domain/analytics/events"), exports);
// Constants - Safe to export
__exportStar(require("./constants/majors"), exports);
__exportStar(require("./constants/academic-years"), exports);
__exportStar(require("./constants/academics"), exports);
__exportStar(require("./constants/interests"), exports);
// Feed System Core - Assumed to be types and client-side logic
__exportStar(require("./domain/feed/top-strip"), exports);
__exportStar(require("./domain/feed/main-feed"), exports);
__exportStar(require("./domain/feed/composer"), exports);
var posting_1 = require("./domain/feed/posting");
Object.defineProperty(exports, "CreatePostSchema", { enumerable: true, get: function () { return posting_1.CreatePostSchema; } });
// Space Discovery System - Types and client-side schemas
var discovery_1 = require("./domain/space/discovery");
Object.defineProperty(exports, "SpaceSection", { enumerable: true, get: function () { return discovery_1.SpaceSection; } });
Object.defineProperty(exports, "SpaceOwnerType", { enumerable: true, get: function () { return discovery_1.SpaceOwnerType; } });
var discovery_2 = require("./domain/space/discovery");
Object.defineProperty(exports, "SpaceDiscoverySchema", { enumerable: true, get: function () { return discovery_2.SpaceDiscoverySchema; } });
// Type exports - Safe
__exportStar(require("./types/major"), exports);
__exportStar(require("./types/onboarding"), exports);
// Client-side Firebase utilities - Safe
var firebase_1 = require("./firebase");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return firebase_1.app; } });
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return firebase_1.auth; } });
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return firebase_1.db; } });
// Client-side stores - Safe
__exportStar(require("./stores/useAppStore"), exports);
__exportStar(require("./stores/useUnseenCountStore"), exports);
// Environment variables (client-safe parts) - Safe
var env_1 = require("./env");
Object.defineProperty(exports, "env", { enumerable: true, get: function () { return env_1.env; } });
Object.defineProperty(exports, "isDevelopment", { enumerable: true, get: function () { return env_1.isDevelopment; } });
Object.defineProperty(exports, "isProduction", { enumerable: true, get: function () { return env_1.isProduction; } });
Object.defineProperty(exports, "getFirebaseConfig", { enumerable: true, get: function () { return env_1.getFirebaseConfig; } });
Object.defineProperty(exports, "isDebugMode", { enumerable: true, get: function () { return env_1.isDebugMode; } });
// Logger (client-side) - Safe
var logger_1 = require("./utils/logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_1.logger; } });
//# sourceMappingURL=client.js.map