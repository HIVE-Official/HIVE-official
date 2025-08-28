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
exports.isFirebaseConfigured = exports.authAdmin = exports.dbAdmin = exports.environmentInfo = exports.getFirebaseAdminConfig = exports.isBuildTime = exports.isProduction = exports.isDevelopment = exports.env = void 0;
// Server-side exports only
const env_1 = require("./env");
Object.defineProperty(exports, "env", { enumerable: true, get: function () { return env_1.env; } });
Object.defineProperty(exports, "getFirebaseAdminConfig", { enumerable: true, get: function () { return env_1.getFirebaseAdminConfig; } });
Object.defineProperty(exports, "isDevelopment", { enumerable: true, get: function () { return env_1.isDevelopment; } });
Object.defineProperty(exports, "isProduction", { enumerable: true, get: function () { return env_1.isProduction; } });
Object.defineProperty(exports, "isBuildTime", { enumerable: true, get: function () { return env_1.isBuildTime; } });
Object.defineProperty(exports, "environmentInfo", { enumerable: true, get: function () { return env_1.environmentInfo; } });
const firebase_admin_1 = require("./firebase-admin");
Object.defineProperty(exports, "dbAdmin", { enumerable: true, get: function () { return firebase_admin_1.dbAdmin; } });
Object.defineProperty(exports, "authAdmin", { enumerable: true, get: function () { return firebase_admin_1.firebaseAuth; } });
Object.defineProperty(exports, "isFirebaseConfigured", { enumerable: true, get: function () { return firebase_admin_1.isFirebaseConfigured; } });
// Re-export all Firebase Admin types and utilities
__exportStar(require("./firebase-admin"), exports);
//# sourceMappingURL=server-index.js.map