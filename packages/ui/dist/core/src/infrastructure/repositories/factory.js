/**
 * Repository Factory
 * Creates and manages repository instances with real Firebase implementations
 */
// Import real Firebase implementations
import { FirebaseProfileRepository } from './firebase/profile.repository';
import { FirebaseSpaceRepository } from './firebase/space.repository';
import { FirebaseFeedRepository } from './firebase/feed.repository';
import { FirebaseRitualRepository } from './firebase/ritual.repository';
import { FirebaseConnectionRepository } from './firebase/connection.repository';
// Singleton instances
let profileRepo = null;
let spaceRepo = null;
let feedRepo = null;
let ritualRepo = null;
let connectionRepo = null;
/**
 * Get or create ProfileRepository instance
 */
export function getProfileRepository() {
    if (!profileRepo) {
        profileRepo = new FirebaseProfileRepository();
    }
    return profileRepo;
}
/**
 * Get or create SpaceRepository instance
 */
export function getSpaceRepository() {
    if (!spaceRepo) {
        spaceRepo = new FirebaseSpaceRepository();
    }
    return spaceRepo;
}
/**
 * Get or create FeedRepository instance
 */
export function getFeedRepository() {
    if (!feedRepo) {
        feedRepo = new FirebaseFeedRepository();
    }
    return feedRepo;
}
/**
 * Get or create RitualRepository instance
 */
export function getRitualRepository() {
    if (!ritualRepo) {
        ritualRepo = new FirebaseRitualRepository();
    }
    return ritualRepo;
}
/**
 * Get or create ConnectionRepository instance
 */
export function getConnectionRepository() {
    if (!connectionRepo) {
        connectionRepo = new FirebaseConnectionRepository();
    }
    return connectionRepo;
}
/**
 * Initialize repositories with custom implementations (for testing)
 */
export function initializeRepositories(config) {
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
}
/**
 * Reset all repository instances (for testing)
 */
export function resetRepositories() {
    profileRepo = null;
    spaceRepo = null;
    feedRepo = null;
    ritualRepo = null;
    connectionRepo = null;
}
//# sourceMappingURL=factory.js.map