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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.isTemporaryError = exports.isNetworkError = exports.handleAuthError = exports.AuthenticationError = exports.FirebaseErrorHandler = void 0;
exports.getCurrentUser = getCurrentUser;
__exportStar(require("./hooks/use-auth"), exports);
__exportStar(require("./firebase-error-handler"), exports);
var firebase_error_handler_1 = require("./firebase-error-handler");
Object.defineProperty(exports, "FirebaseErrorHandler", { enumerable: true, get: function () { return __importDefault(firebase_error_handler_1).default; } });
__exportStar(require("./session-manager"), exports);
// Export specific items from error-handler to avoid conflicts
var error_handler_1 = require("./error-handler");
Object.defineProperty(exports, "AuthenticationError", { enumerable: true, get: function () { return error_handler_1.AuthenticationError; } });
Object.defineProperty(exports, "handleAuthError", { enumerable: true, get: function () { return error_handler_1.handleAuthError; } });
Object.defineProperty(exports, "isNetworkError", { enumerable: true, get: function () { return error_handler_1.isNetworkError; } });
Object.defineProperty(exports, "isTemporaryError", { enumerable: true, get: function () { return error_handler_1.isTemporaryError; } });
// Export all from errors (newer, cleaner implementation)
__exportStar(require("./errors"), exports);
// export { joinWaitlist } from "./join-waitlist"; // Server-side only, moved to API routes
var firebase_config_1 = require("./firebase-config");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return firebase_config_1.auth; } });
// Temporary stub for server-side auth - points to proper implementation
async function getCurrentUser() {
    throw new Error("getCurrentUser is no longer exported from auth-logic. Use getCurrentUser from your server auth utilities instead.");
}
//# sourceMappingURL=index.js.map