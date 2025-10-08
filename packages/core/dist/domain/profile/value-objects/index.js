"use strict";
/**
 * Profile Value Objects
 * Export all value objects for the Profile bounded context
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalInfo = exports.Handle = exports.UBEmail = exports.ProfilePrivacy = exports.UserType = exports.ConnectionId = exports.ProfileHandle = exports.CampusId = exports.ProfileId = void 0;
var profile_id_value_1 = require("./profile-id.value");
Object.defineProperty(exports, "ProfileId", { enumerable: true, get: function () { return profile_id_value_1.ProfileId; } });
var campus_id_value_1 = require("./campus-id.value");
Object.defineProperty(exports, "CampusId", { enumerable: true, get: function () { return campus_id_value_1.CampusId; } });
var profile_handle_value_1 = require("./profile-handle.value");
Object.defineProperty(exports, "ProfileHandle", { enumerable: true, get: function () { return profile_handle_value_1.ProfileHandle; } });
var connection_id_value_1 = require("./connection-id.value");
Object.defineProperty(exports, "ConnectionId", { enumerable: true, get: function () { return connection_id_value_1.ConnectionId; } });
var user_type_value_1 = require("./user-type.value");
Object.defineProperty(exports, "UserType", { enumerable: true, get: function () { return user_type_value_1.UserType; } });
var profile_privacy_value_1 = require("./profile-privacy.value");
Object.defineProperty(exports, "ProfilePrivacy", { enumerable: true, get: function () { return profile_privacy_value_1.ProfilePrivacy; } });
// Re-export existing value objects
var ub_email_value_1 = require("./ub-email.value");
Object.defineProperty(exports, "UBEmail", { enumerable: true, get: function () { return ub_email_value_1.UBEmail; } });
var handle_value_1 = require("./handle.value");
Object.defineProperty(exports, "Handle", { enumerable: true, get: function () { return handle_value_1.Handle; } });
var personal_info_value_1 = require("./personal-info.value");
Object.defineProperty(exports, "PersonalInfo", { enumerable: true, get: function () { return personal_info_value_1.PersonalInfo; } });
//# sourceMappingURL=index.js.map