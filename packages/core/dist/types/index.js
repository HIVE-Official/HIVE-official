"use strict";
/**
 * HIVE Core Type Definitions
 * Centralized type definitions to eliminate duplication across packages
 *
 * This is the single source of truth for all core domain types.
 * Import these types from @hive/core in other packages.
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
exports.PostType = void 0;
// Enums removed - using type aliases defined above instead
var PostType;
(function (PostType) {
    PostType["TEXT"] = "text";
    PostType["IMAGE"] = "image";
    PostType["VIDEO"] = "video";
    PostType["LINK"] = "link";
    PostType["POLL"] = "poll";
    PostType["EVENT"] = "event";
})(PostType || (exports.PostType = PostType = {}));
// Re-export profile system types
__exportStar(require("./profile-system"), exports);
//# sourceMappingURL=index.js.map