"use strict";
/**
 * HIVE Core Type Definitions
 * Centralized type definitions to eliminate duplication across packages
 *
 * This is the single source of truth for all core domain types.
 * Import these types from @hive/core in other packages.
 */
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
//# sourceMappingURL=index.js.map