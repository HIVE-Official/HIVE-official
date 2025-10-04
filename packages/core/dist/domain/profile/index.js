"use strict";
/**
 * Profile Domain Exports
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.ProfileOnboardedEvent = exports.ProfileCreatedEvent = exports.PersonalInfoValue = exports.Handle = exports.UBEmail = exports.ProfilePrivacy = exports.UserType = exports.CampusId = exports.ProfileHandle = exports.ProfileId = exports.Profile = void 0;
// Aggregates
var profile_aggregate_1 = require("./aggregates/profile.aggregate");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return profile_aggregate_1.Profile; } });
// Value Objects
var profile_id_value_1 = require("./value-objects/profile-id.value");
Object.defineProperty(exports, "ProfileId", { enumerable: true, get: function () { return profile_id_value_1.ProfileId; } });
var profile_handle_value_1 = require("./value-objects/profile-handle.value");
Object.defineProperty(exports, "ProfileHandle", { enumerable: true, get: function () { return profile_handle_value_1.ProfileHandle; } });
var campus_id_value_1 = require("./value-objects/campus-id.value");
Object.defineProperty(exports, "CampusId", { enumerable: true, get: function () { return campus_id_value_1.CampusId; } });
var user_type_value_1 = require("./value-objects/user-type.value");
Object.defineProperty(exports, "UserType", { enumerable: true, get: function () { return user_type_value_1.UserType; } });
var profile_privacy_value_1 = require("./value-objects/profile-privacy.value");
Object.defineProperty(exports, "ProfilePrivacy", { enumerable: true, get: function () { return profile_privacy_value_1.ProfilePrivacy; } });
var ub_email_value_1 = require("./value-objects/ub-email.value");
Object.defineProperty(exports, "UBEmail", { enumerable: true, get: function () { return ub_email_value_1.UBEmail; } });
var handle_value_1 = require("./value-objects/handle.value");
Object.defineProperty(exports, "Handle", { enumerable: true, get: function () { return handle_value_1.Handle; } });
var personal_info_value_1 = require("./value-objects/personal-info.value");
Object.defineProperty(exports, "PersonalInfoValue", { enumerable: true, get: function () { return personal_info_value_1.PersonalInfo; } });
// Domain Events
var profile_created_event_1 = require("./events/profile-created.event");
Object.defineProperty(exports, "ProfileCreatedEvent", { enumerable: true, get: function () { return profile_created_event_1.ProfileCreatedEvent; } });
var profile_onboarded_event_1 = require("./events/profile-onboarded.event");
Object.defineProperty(exports, "ProfileOnboardedEvent", { enumerable: true, get: function () { return profile_onboarded_event_1.ProfileOnboardedEvent; } });
// Aggregates (legacy - kept for backward compatibility during migration)
var connection_1 = require("./aggregates/connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return connection_1.Connection; } });
//# sourceMappingURL=index.js.map