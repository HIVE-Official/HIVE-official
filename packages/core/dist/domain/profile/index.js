"use strict";
/**
 * Profile Domain Exports
 * Central export point for all profile domain components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileMigrationService = exports.ProfileAdapter = exports.ProfileFactory = exports.ProfileEventFactory = exports.VisibilityLevel = exports.ProfilePrivacy = exports.UserTypeEnum = exports.UserType = exports.CampusId = exports.PhotoUrl = exports.ProfileId = exports.GraduationYear = exports.Major = exports.Bio = exports.Handle = exports.UBEmail = exports.Result = exports.ConnectionType = exports.ConnectionStatus = exports.Connection = exports.EnhancedProfile = exports.Profile = void 0;
// Legacy Profile (existing)
var profile_1 = require("./profile");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return profile_1.Profile; } });
// Enhanced Profile (new)
var enhanced_profile_1 = require("./aggregates/enhanced-profile");
Object.defineProperty(exports, "EnhancedProfile", { enumerable: true, get: function () { return enhanced_profile_1.EnhancedProfile; } });
// Connection Aggregate
var connection_1 = require("./aggregates/connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return connection_1.Connection; } });
Object.defineProperty(exports, "ConnectionStatus", { enumerable: true, get: function () { return connection_1.ConnectionStatus; } });
Object.defineProperty(exports, "ConnectionType", { enumerable: true, get: function () { return connection_1.ConnectionType; } });
// Value Objects
var value_objects_1 = require("./value-objects");
Object.defineProperty(exports, "Result", { enumerable: true, get: function () { return value_objects_1.Result; } });
Object.defineProperty(exports, "UBEmail", { enumerable: true, get: function () { return value_objects_1.UBEmail; } });
Object.defineProperty(exports, "Handle", { enumerable: true, get: function () { return value_objects_1.Handle; } });
Object.defineProperty(exports, "Bio", { enumerable: true, get: function () { return value_objects_1.Bio; } });
Object.defineProperty(exports, "Major", { enumerable: true, get: function () { return value_objects_1.Major; } });
Object.defineProperty(exports, "GraduationYear", { enumerable: true, get: function () { return value_objects_1.GraduationYear; } });
Object.defineProperty(exports, "ProfileId", { enumerable: true, get: function () { return value_objects_1.ProfileId; } });
Object.defineProperty(exports, "PhotoUrl", { enumerable: true, get: function () { return value_objects_1.PhotoUrl; } });
// New Value Objects
var campus_id_1 = require("./value-objects/campus-id");
Object.defineProperty(exports, "CampusId", { enumerable: true, get: function () { return campus_id_1.CampusId; } });
var user_type_1 = require("./value-objects/user-type");
Object.defineProperty(exports, "UserType", { enumerable: true, get: function () { return user_type_1.UserType; } });
Object.defineProperty(exports, "UserTypeEnum", { enumerable: true, get: function () { return user_type_1.UserTypeEnum; } });
var profile_privacy_1 = require("./value-objects/profile-privacy");
Object.defineProperty(exports, "ProfilePrivacy", { enumerable: true, get: function () { return profile_privacy_1.ProfilePrivacy; } });
Object.defineProperty(exports, "VisibilityLevel", { enumerable: true, get: function () { return profile_privacy_1.VisibilityLevel; } });
// Domain Events
var events_1 = require("./events");
Object.defineProperty(exports, "ProfileEventFactory", { enumerable: true, get: function () { return events_1.ProfileEventFactory; } });
// Factory and Migration
var profile_factory_1 = require("./profile-factory");
Object.defineProperty(exports, "ProfileFactory", { enumerable: true, get: function () { return profile_factory_1.ProfileFactory; } });
Object.defineProperty(exports, "ProfileAdapter", { enumerable: true, get: function () { return profile_factory_1.ProfileAdapter; } });
Object.defineProperty(exports, "ProfileMigrationService", { enumerable: true, get: function () { return profile_factory_1.ProfileMigrationService; } });
//# sourceMappingURL=index.js.map