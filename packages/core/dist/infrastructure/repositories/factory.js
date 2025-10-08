"use strict";
/**
 * Repository Factory
 * Creates and manages repository instances with real Firebase implementations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileRepository = getProfileRepository;
exports.getSpaceRepository = getSpaceRepository;
exports.getFeedRepository = getFeedRepository;
exports.getRitualRepository = getRitualRepository;
exports.getConnectionRepository = getConnectionRepository;
exports.getToolRepository = getToolRepository;
exports.initializeRepositories = initializeRepositories;
exports.resetRepositories = resetRepositories;
// Import real Firebase implementations
const profile_repository_1 = require("./firebase/profile.repository");
const space_repository_1 = require("./firebase/space.repository");
const feed_repository_1 = require("./firebase/feed.repository");
const ritual_repository_1 = require("./firebase/ritual.repository");
const connection_repository_1 = require("./firebase/connection.repository");
const tool_repository_1 = require("./firebase/tool.repository");
// Singleton instances
let profileRepo = null;
let spaceRepo = null;
let feedRepo = null;
let ritualRepo = null;
let connectionRepo = null;
let toolRepo = null;
/**
 * Get or create ProfileRepository instance
 */
function getProfileRepository() {
    if (!profileRepo) {
        profileRepo = new profile_repository_1.FirebaseProfileRepository();
    }
    return profileRepo;
}
/**
 * Get or create SpaceRepository instance
 */
function getSpaceRepository() {
    if (!spaceRepo) {
        spaceRepo = new space_repository_1.FirebaseSpaceRepository();
    }
    return spaceRepo;
}
/**
 * Get or create FeedRepository instance
 */
function getFeedRepository() {
    if (!feedRepo) {
        feedRepo = new feed_repository_1.FirebaseFeedRepository();
    }
    return feedRepo;
}
/**
 * Get or create RitualRepository instance
 */
function getRitualRepository() {
    if (!ritualRepo) {
        ritualRepo = new ritual_repository_1.FirebaseRitualRepository();
    }
    return ritualRepo;
}
/**
 * Get or create ConnectionRepository instance
 */
function getConnectionRepository() {
    if (!connectionRepo) {
        connectionRepo = new connection_repository_1.FirebaseConnectionRepository();
    }
    return connectionRepo;
}
/**
 * Get or create ToolRepository instance
 */
function getToolRepository() {
    if (!toolRepo) {
        toolRepo = new tool_repository_1.FirebaseToolRepository();
    }
    return toolRepo;
}
/**
 * Initialize repositories with custom implementations (for testing)
 */
function initializeRepositories(config) {
    if (config.profile)
        profileRepo = config.profile;
    if (config.space)
        spaceRepo = config.space;
    if (config.feed)
        feedRepo = config.feed;
    if (config.ritual)
        ritualRepo = config.ritual;
    if (config.connection)
        connectionRepo = config.connection;
    if (config.tool)
        toolRepo = config.tool;
}
/**
 * Reset all repository instances (for testing)
 */
function resetRepositories() {
    profileRepo = null;
    spaceRepo = null;
    feedRepo = null;
    ritualRepo = null;
    connectionRepo = null;
    toolRepo = null;
}
//# sourceMappingURL=factory.js.map