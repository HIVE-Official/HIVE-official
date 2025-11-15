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
exports.SearchQueryHandler = exports.SearchType = exports.GetFeedQueryHandler = exports.feedListener = exports.storage = exports.auth = exports.db = exports.app = exports.presenceService = exports.FirebaseUnitOfWork = exports.getTemplatesByArchetype = exports.getTemplatesByCategory = exports.getTemplate = exports.getAvailableTemplates = exports.RITUAL_TEMPLATES = exports.createDefaultConfig = exports.RitualComposerSchema = exports.parseRitualUnion = exports.RitualUnionSchema = exports.RitualSchema = exports.RitualArchetype = exports.EnhancedFeed = exports.FeedItem = exports.EnhancedRitual = exports.RitualId = exports.Widget = exports.Tab = exports.EnhancedSpace = exports.SpaceCategory = exports.SpaceDescription = exports.SpaceName = exports.SpaceId = exports.ConnectionSource = exports.ConnectionType = exports.Connection = exports.createDefaultProfile = exports.getProfileCompletionPercentage = exports.isProfileComplete = exports.EnhancedProfile = void 0;
// Domain Models - Specific exports to avoid conflicts
var enhanced_profile_1 = require("./domain/profile/aggregates/enhanced-profile");
Object.defineProperty(exports, "EnhancedProfile", { enumerable: true, get: function () { return enhanced_profile_1.EnhancedProfile; } });
var spec_compliant_profile_1 = require("./domain/profile/spec-compliant-profile");
Object.defineProperty(exports, "isProfileComplete", { enumerable: true, get: function () { return spec_compliant_profile_1.isProfileComplete; } });
Object.defineProperty(exports, "getProfileCompletionPercentage", { enumerable: true, get: function () { return spec_compliant_profile_1.getProfileCompletionPercentage; } });
Object.defineProperty(exports, "createDefaultProfile", { enumerable: true, get: function () { return spec_compliant_profile_1.createDefaultProfile; } });
var connection_1 = require("./domain/profile/aggregates/connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return connection_1.Connection; } });
Object.defineProperty(exports, "ConnectionType", { enumerable: true, get: function () { return connection_1.ConnectionType; } });
Object.defineProperty(exports, "ConnectionSource", { enumerable: true, get: function () { return connection_1.ConnectionSource; } });
var space_id_value_1 = require("./domain/spaces/value-objects/space-id.value");
Object.defineProperty(exports, "SpaceId", { enumerable: true, get: function () { return space_id_value_1.SpaceId; } });
var space_name_value_1 = require("./domain/spaces/value-objects/space-name.value");
Object.defineProperty(exports, "SpaceName", { enumerable: true, get: function () { return space_name_value_1.SpaceName; } });
var space_description_value_1 = require("./domain/spaces/value-objects/space-description.value");
Object.defineProperty(exports, "SpaceDescription", { enumerable: true, get: function () { return space_description_value_1.SpaceDescription; } });
var space_category_value_1 = require("./domain/spaces/value-objects/space-category.value");
Object.defineProperty(exports, "SpaceCategory", { enumerable: true, get: function () { return space_category_value_1.SpaceCategory; } });
var enhanced_space_1 = require("./domain/spaces/aggregates/enhanced-space");
Object.defineProperty(exports, "EnhancedSpace", { enumerable: true, get: function () { return enhanced_space_1.EnhancedSpace; } });
var tab_1 = require("./domain/spaces/entities/tab");
Object.defineProperty(exports, "Tab", { enumerable: true, get: function () { return tab_1.Tab; } });
var widget_1 = require("./domain/spaces/entities/widget");
Object.defineProperty(exports, "Widget", { enumerable: true, get: function () { return widget_1.Widget; } });
var ritual_id_value_1 = require("./domain/rituals/value-objects/ritual-id.value");
Object.defineProperty(exports, "RitualId", { enumerable: true, get: function () { return ritual_id_value_1.RitualId; } });
var enhanced_ritual_1 = require("./domain/rituals/aggregates/enhanced-ritual");
Object.defineProperty(exports, "EnhancedRitual", { enumerable: true, get: function () { return enhanced_ritual_1.EnhancedRitual; } });
var feed_item_1 = require("./domain/feed/feed-item");
Object.defineProperty(exports, "FeedItem", { enumerable: true, get: function () { return feed_item_1.FeedItem; } });
var enhanced_feed_1 = require("./domain/feed/enhanced-feed");
Object.defineProperty(exports, "EnhancedFeed", { enumerable: true, get: function () { return enhanced_feed_1.EnhancedFeed; } });
var archetypes_1 = require("./domain/rituals/archetypes");
Object.defineProperty(exports, "RitualArchetype", { enumerable: true, get: function () { return archetypes_1.RitualArchetype; } });
Object.defineProperty(exports, "RitualSchema", { enumerable: true, get: function () { return archetypes_1.RitualSchema; } });
Object.defineProperty(exports, "RitualUnionSchema", { enumerable: true, get: function () { return archetypes_1.RitualUnionSchema; } });
Object.defineProperty(exports, "parseRitualUnion", { enumerable: true, get: function () { return archetypes_1.parseRitualUnion; } });
__exportStar(require("./domain/rituals/events"), exports);
var composer_1 = require("./domain/rituals/composer");
Object.defineProperty(exports, "RitualComposerSchema", { enumerable: true, get: function () { return composer_1.RitualComposerSchema; } });
Object.defineProperty(exports, "createDefaultConfig", { enumerable: true, get: function () { return composer_1.createDefaultConfig; } });
// Ritual Templates
var templates_1 = require("./domain/rituals/templates");
Object.defineProperty(exports, "RITUAL_TEMPLATES", { enumerable: true, get: function () { return templates_1.RITUAL_TEMPLATES; } });
Object.defineProperty(exports, "getAvailableTemplates", { enumerable: true, get: function () { return templates_1.getAvailableTemplates; } });
Object.defineProperty(exports, "getTemplate", { enumerable: true, get: function () { return templates_1.getTemplate; } });
Object.defineProperty(exports, "getTemplatesByCategory", { enumerable: true, get: function () { return templates_1.getTemplatesByCategory; } });
Object.defineProperty(exports, "getTemplatesByArchetype", { enumerable: true, get: function () { return templates_1.getTemplatesByArchetype; } });
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
__exportStar(require("./constants/onboarding-interests"), exports);
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
// Types and Interfaces - Specific exports to avoid conflicts
__exportStar(require("./types/profile-system"), exports);
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
// Schemas
__exportStar(require("./schemas/admin/dashboard"), exports);
//# sourceMappingURL=index.js.map