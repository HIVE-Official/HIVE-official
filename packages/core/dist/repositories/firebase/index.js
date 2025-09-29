"use strict";
/**
 * Firebase Repository Exports
 * Central export point for all Firebase repository implementations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRepositoryHealth = exports.initializeRepositories = exports.getCampusRepository = exports.getRitualRepository = exports.getFeedRepository = exports.getSpaceRepository = exports.getProfileRepository = exports.repositoryFactory = exports.FirebaseRepositoryFactory = exports.FirebaseCampusRepository = exports.FirebaseRitualRepository = exports.FirebaseFeedRepository = exports.FirebaseSpaceRepository = exports.FirebaseProfileRepository = void 0;
// Repository implementations
var profile_repository_1 = require("./profile.repository");
Object.defineProperty(exports, "FirebaseProfileRepository", { enumerable: true, get: function () { return profile_repository_1.FirebaseProfileRepository; } });
var space_repository_1 = require("./space.repository");
Object.defineProperty(exports, "FirebaseSpaceRepository", { enumerable: true, get: function () { return space_repository_1.FirebaseSpaceRepository; } });
var feed_repository_1 = require("./feed.repository");
Object.defineProperty(exports, "FirebaseFeedRepository", { enumerable: true, get: function () { return feed_repository_1.FirebaseFeedRepository; } });
var ritual_repository_1 = require("./ritual.repository");
Object.defineProperty(exports, "FirebaseRitualRepository", { enumerable: true, get: function () { return ritual_repository_1.FirebaseRitualRepository; } });
var campus_repository_1 = require("./campus.repository");
Object.defineProperty(exports, "FirebaseCampusRepository", { enumerable: true, get: function () { return campus_repository_1.FirebaseCampusRepository; } });
// Factory and utilities
var factory_1 = require("./factory");
Object.defineProperty(exports, "FirebaseRepositoryFactory", { enumerable: true, get: function () { return factory_1.FirebaseRepositoryFactory; } });
Object.defineProperty(exports, "repositoryFactory", { enumerable: true, get: function () { return factory_1.repositoryFactory; } });
Object.defineProperty(exports, "getProfileRepository", { enumerable: true, get: function () { return factory_1.getProfileRepository; } });
Object.defineProperty(exports, "getSpaceRepository", { enumerable: true, get: function () { return factory_1.getSpaceRepository; } });
Object.defineProperty(exports, "getFeedRepository", { enumerable: true, get: function () { return factory_1.getFeedRepository; } });
Object.defineProperty(exports, "getRitualRepository", { enumerable: true, get: function () { return factory_1.getRitualRepository; } });
Object.defineProperty(exports, "getCampusRepository", { enumerable: true, get: function () { return factory_1.getCampusRepository; } });
Object.defineProperty(exports, "initializeRepositories", { enumerable: true, get: function () { return factory_1.initializeRepositories; } });
Object.defineProperty(exports, "checkRepositoryHealth", { enumerable: true, get: function () { return factory_1.checkRepositoryHealth; } });
//# sourceMappingURL=index.js.map