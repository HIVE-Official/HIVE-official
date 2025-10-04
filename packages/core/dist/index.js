"use strict";
/**
 * @hive/core - Main export file
 * Domain-Driven Design architecture with proper bounded contexts
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
exports.SearchQueryHandler = exports.SearchType = exports.GetFeedQueryHandler = exports.feedListener = exports.storage = exports.auth = exports.db = exports.app = exports.presenceService = exports.FirebaseUnitOfWork = exports.EnhancedFeed = exports.FeedItem = exports.ToolId = exports.Tool = exports.RitualId = exports.Ritual = exports.Widget = exports.Tab = exports.SpaceCategoryEnum = exports.SpaceCategory = exports.SpaceDescription = exports.SpaceName = exports.SpaceId = exports.Space = exports.ConnectionSource = exports.ConnectionType = exports.Connection = exports.createDefaultProfile = exports.getProfileCompletionPercentage = exports.isProfileComplete = exports.Profile = void 0;
// Domain Models - Specific exports to avoid conflicts
var profile_aggregate_1 = require("./domain/profile/aggregates/profile.aggregate");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return profile_aggregate_1.Profile; } });
var spec_compliant_profile_1 = require("./domain/profile/spec-compliant-profile");
Object.defineProperty(exports, "isProfileComplete", { enumerable: true, get: function () { return spec_compliant_profile_1.isProfileComplete; } });
Object.defineProperty(exports, "getProfileCompletionPercentage", { enumerable: true, get: function () { return spec_compliant_profile_1.getProfileCompletionPercentage; } });
Object.defineProperty(exports, "createDefaultProfile", { enumerable: true, get: function () { return spec_compliant_profile_1.createDefaultProfile; } });
var connection_1 = require("./domain/profile/aggregates/connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return connection_1.Connection; } });
Object.defineProperty(exports, "ConnectionType", { enumerable: true, get: function () { return connection_1.ConnectionType; } });
Object.defineProperty(exports, "ConnectionSource", { enumerable: true, get: function () { return connection_1.ConnectionSource; } });
var space_aggregate_1 = require("./domain/spaces/aggregates/space.aggregate");
Object.defineProperty(exports, "Space", { enumerable: true, get: function () { return space_aggregate_1.Space; } });
var space_id_value_1 = require("./domain/spaces/value-objects/space-id.value");
Object.defineProperty(exports, "SpaceId", { enumerable: true, get: function () { return space_id_value_1.SpaceId; } });
var space_name_value_1 = require("./domain/spaces/value-objects/space-name.value");
Object.defineProperty(exports, "SpaceName", { enumerable: true, get: function () { return space_name_value_1.SpaceName; } });
var space_description_value_1 = require("./domain/spaces/value-objects/space-description.value");
Object.defineProperty(exports, "SpaceDescription", { enumerable: true, get: function () { return space_description_value_1.SpaceDescription; } });
var space_category_value_1 = require("./domain/spaces/value-objects/space-category.value");
Object.defineProperty(exports, "SpaceCategory", { enumerable: true, get: function () { return space_category_value_1.SpaceCategory; } });
Object.defineProperty(exports, "SpaceCategoryEnum", { enumerable: true, get: function () { return space_category_value_1.SpaceCategoryEnum; } });
var tab_1 = require("./domain/spaces/entities/tab");
Object.defineProperty(exports, "Tab", { enumerable: true, get: function () { return tab_1.Tab; } });
var widget_1 = require("./domain/spaces/entities/widget");
Object.defineProperty(exports, "Widget", { enumerable: true, get: function () { return widget_1.Widget; } });
var ritual_aggregate_1 = require("./domain/rituals/aggregates/ritual.aggregate");
Object.defineProperty(exports, "Ritual", { enumerable: true, get: function () { return ritual_aggregate_1.Ritual; } });
var ritual_id_value_1 = require("./domain/rituals/value-objects/ritual-id.value");
Object.defineProperty(exports, "RitualId", { enumerable: true, get: function () { return ritual_id_value_1.RitualId; } });
var tool_aggregate_1 = require("./domain/tools/aggregates/tool.aggregate");
Object.defineProperty(exports, "Tool", { enumerable: true, get: function () { return tool_aggregate_1.Tool; } });
var tool_id_value_1 = require("./domain/tools/value-objects/tool-id.value");
Object.defineProperty(exports, "ToolId", { enumerable: true, get: function () { return tool_id_value_1.ToolId; } });
var feed_item_1 = require("./domain/feed/feed-item");
Object.defineProperty(exports, "FeedItem", { enumerable: true, get: function () { return feed_item_1.FeedItem; } });
var enhanced_feed_1 = require("./domain/feed/enhanced-feed");
Object.defineProperty(exports, "EnhancedFeed", { enumerable: true, get: function () { return enhanced_feed_1.EnhancedFeed; } });
// Application Services - Use Case Orchestration
__exportStar(require("./application"), exports);
// Repository Pattern - Data Access Layer
__exportStar(require("./infrastructure/repositories/interfaces"), exports);
__exportStar(require("./infrastructure/repositories/factory"), exports);
var unit_of_work_1 = require("./infrastructure/repositories/firebase/unit-of-work");
Object.defineProperty(exports, "FirebaseUnitOfWork", { enumerable: true, get: function () { return unit_of_work_1.FirebaseUnitOfWork; } });
// DTOs and Mappers
__exportStar(require("./application/identity/dtos/profile.dto"), exports);
__exportStar(require("./infrastructure/mappers/profile.firebase-mapper"), exports);
// Services
var presence_service_1 = require("./services/presence-service");
Object.defineProperty(exports, "presenceService", { enumerable: true, get: function () { return presence_service_1.presenceService; } });
// Constants
__exportStar(require("./constants/majors"), exports);
// Stores
__exportStar(require("./stores/useAppStore"), exports);
// Feature Flags
__exportStar(require("./feature-flags"), exports);
// Firebase Configuration (temporary until @hive/firebase is fixed)
var firebase_1 = require("./firebase");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return firebase_1.app; } });
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return firebase_1.db; } });
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return firebase_1.auth; } });
Object.defineProperty(exports, "storage", { enumerable: true, get: function () { return firebase_1.storage; } });
// Server-side utilities
__exportStar(require("./server"), exports);
// Utilities
__exportStar(require("./utils/activity-tracker"), exports);
__exportStar(require("./utils/privacy-utils"), exports);
__exportStar(require("./utils/profile-aggregator"), exports);
// Analytics convenience functions (for backwards compatibility)
__exportStar(require("./analytics-temp-exports"), exports);
// Realtime and Query exports
var feed_listener_1 = require("./infrastructure/realtime/feed-listener");
Object.defineProperty(exports, "feedListener", { enumerable: true, get: function () { return feed_listener_1.feedListener; } });
var get_feed_query_1 = require("./application/feed/queries/get-feed.query");
Object.defineProperty(exports, "GetFeedQueryHandler", { enumerable: true, get: function () { return get_feed_query_1.GetFeedQueryHandler; } });
var search_query_1 = require("./application/search/queries/search.query");
Object.defineProperty(exports, "SearchType", { enumerable: true, get: function () { return search_query_1.SearchType; } });
Object.defineProperty(exports, "SearchQueryHandler", { enumerable: true, get: function () { return search_query_1.SearchQueryHandler; } });
// Temporary backward compatibility (will be removed)
__exportStar(require("./application/shared/temporary-types"), exports);
//# sourceMappingURL=index.js.map