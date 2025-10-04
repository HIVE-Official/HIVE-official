"use strict";
/**
 * Spaces Domain Exports
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreatedEvent = exports.MemberRoleUpdatedEvent = exports.MemberRemovedEvent = exports.MemberJoinedEvent = exports.SpaceCreatedEvent = exports.SpaceCategory = exports.SpaceDescription = exports.SpaceName = exports.SpaceId = exports.Widget = exports.Tab = exports.Space = void 0;
// Aggregates
var space_aggregate_1 = require("./aggregates/space.aggregate");
Object.defineProperty(exports, "Space", { enumerable: true, get: function () { return space_aggregate_1.Space; } });
// Entities
var tab_1 = require("./entities/tab");
Object.defineProperty(exports, "Tab", { enumerable: true, get: function () { return tab_1.Tab; } });
var widget_1 = require("./entities/widget");
Object.defineProperty(exports, "Widget", { enumerable: true, get: function () { return widget_1.Widget; } });
// Value Objects
var space_id_value_1 = require("./value-objects/space-id.value");
Object.defineProperty(exports, "SpaceId", { enumerable: true, get: function () { return space_id_value_1.SpaceId; } });
var space_name_value_1 = require("./value-objects/space-name.value");
Object.defineProperty(exports, "SpaceName", { enumerable: true, get: function () { return space_name_value_1.SpaceName; } });
var space_description_value_1 = require("./value-objects/space-description.value");
Object.defineProperty(exports, "SpaceDescription", { enumerable: true, get: function () { return space_description_value_1.SpaceDescription; } });
var space_category_value_1 = require("./value-objects/space-category.value");
Object.defineProperty(exports, "SpaceCategory", { enumerable: true, get: function () { return space_category_value_1.SpaceCategory; } });
// Domain Events
var space_created_event_1 = require("./events/space-created.event");
Object.defineProperty(exports, "SpaceCreatedEvent", { enumerable: true, get: function () { return space_created_event_1.SpaceCreatedEvent; } });
var member_joined_event_1 = require("./events/member-joined.event");
Object.defineProperty(exports, "MemberJoinedEvent", { enumerable: true, get: function () { return member_joined_event_1.MemberJoinedEvent; } });
var member_removed_event_1 = require("./events/member-removed.event");
Object.defineProperty(exports, "MemberRemovedEvent", { enumerable: true, get: function () { return member_removed_event_1.MemberRemovedEvent; } });
var member_role_updated_event_1 = require("./events/member-role-updated.event");
Object.defineProperty(exports, "MemberRoleUpdatedEvent", { enumerable: true, get: function () { return member_role_updated_event_1.MemberRoleUpdatedEvent; } });
var post_created_event_1 = require("./events/post-created.event");
Object.defineProperty(exports, "PostCreatedEvent", { enumerable: true, get: function () { return post_created_event_1.PostCreatedEvent; } });
//# sourceMappingURL=index.js.map