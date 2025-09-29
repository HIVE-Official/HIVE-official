"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileReadyForOnboardingSpecification = exports.ProfileOnboardedSpecification = exports.ProfileCompletionSpecification = exports.ProfileOnboardedEvent = exports.ProfileCreatedEvent = exports.PersonalInfo = exports.Handle = exports.UBEmail = exports.Profile = void 0;
// Aggregates
var profile_aggregate_1 = require("./aggregates/profile.aggregate");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return profile_aggregate_1.Profile; } });
// Value Objects
var ub_email_value_1 = require("./value-objects/ub-email.value");
Object.defineProperty(exports, "UBEmail", { enumerable: true, get: function () { return ub_email_value_1.UBEmail; } });
var handle_value_1 = require("./value-objects/handle.value");
Object.defineProperty(exports, "Handle", { enumerable: true, get: function () { return handle_value_1.Handle; } });
var personal_info_value_1 = require("./value-objects/personal-info.value");
Object.defineProperty(exports, "PersonalInfo", { enumerable: true, get: function () { return personal_info_value_1.PersonalInfo; } });
// Events
var profile_created_event_1 = require("./events/profile-created.event");
Object.defineProperty(exports, "ProfileCreatedEvent", { enumerable: true, get: function () { return profile_created_event_1.ProfileCreatedEvent; } });
var profile_onboarded_event_1 = require("./events/profile-onboarded.event");
Object.defineProperty(exports, "ProfileOnboardedEvent", { enumerable: true, get: function () { return profile_onboarded_event_1.ProfileOnboardedEvent; } });
// Specifications
var profile_completion_spec_1 = require("./specifications/profile-completion.spec");
Object.defineProperty(exports, "ProfileCompletionSpecification", { enumerable: true, get: function () { return profile_completion_spec_1.ProfileCompletionSpecification; } });
Object.defineProperty(exports, "ProfileOnboardedSpecification", { enumerable: true, get: function () { return profile_completion_spec_1.ProfileOnboardedSpecification; } });
Object.defineProperty(exports, "ProfileReadyForOnboardingSpecification", { enumerable: true, get: function () { return profile_completion_spec_1.ProfileReadyForOnboardingSpecification; } });
//# sourceMappingURL=index.js.map