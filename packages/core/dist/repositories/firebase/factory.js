"use strict";
/**
 * Firebase Repository Factory
 * Dependency injection factory for Firebase repository implementations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRepositoryHealth = exports.initializeRepositories = exports.getCampusRepository = exports.getRitualRepository = exports.getFeedRepository = exports.getSpaceRepository = exports.getProfileRepository = exports.repositoryFactory = exports.FirebaseRepositoryFactory = void 0;
const profile_repository_1 = require("./profile.repository");
const space_repository_1 = require("./space.repository");
const feed_repository_1 = require("./feed.repository");
const ritual_repository_1 = require("./ritual.repository");
const campus_repository_1 = require("./campus.repository");
/**
 * Firebase Repository Factory Implementation
 * Creates Firebase-backed repository instances for all domains
 */
class FirebaseRepositoryFactory {
    createProfileRepository() {
        if (!FirebaseRepositoryFactory.profileRepository) {
            FirebaseRepositoryFactory.profileRepository = new profile_repository_1.FirebaseProfileRepository();
        }
        return FirebaseRepositoryFactory.profileRepository;
    }
    createSpaceRepository() {
        if (!FirebaseRepositoryFactory.spaceRepository) {
            FirebaseRepositoryFactory.spaceRepository = new space_repository_1.FirebaseSpaceRepository();
        }
        return FirebaseRepositoryFactory.spaceRepository;
    }
    createFeedRepository() {
        if (!FirebaseRepositoryFactory.feedRepository) {
            FirebaseRepositoryFactory.feedRepository = new feed_repository_1.FirebaseFeedRepository();
        }
        return FirebaseRepositoryFactory.feedRepository;
    }
    createRitualRepository() {
        if (!FirebaseRepositoryFactory.ritualRepository) {
            FirebaseRepositoryFactory.ritualRepository = new ritual_repository_1.FirebaseRitualRepository();
        }
        return FirebaseRepositoryFactory.ritualRepository;
    }
    createCampusRepository() {
        if (!FirebaseRepositoryFactory.campusRepository) {
            FirebaseRepositoryFactory.campusRepository = new campus_repository_1.FirebaseCampusRepository();
        }
        return FirebaseRepositoryFactory.campusRepository;
    }
    /**
     * Clear singleton instances (useful for testing)
     */
    static clearInstances() {
        FirebaseRepositoryFactory.profileRepository = undefined;
        FirebaseRepositoryFactory.spaceRepository = undefined;
        FirebaseRepositoryFactory.feedRepository = undefined;
        FirebaseRepositoryFactory.ritualRepository = undefined;
        FirebaseRepositoryFactory.campusRepository = undefined;
    }
}
exports.FirebaseRepositoryFactory = FirebaseRepositoryFactory;
/**
 * Default factory instance for application use
 */
exports.repositoryFactory = new FirebaseRepositoryFactory();
/**
 * Convenience functions for direct repository access
 * Use these in application code for clean dependency injection
 */
const getProfileRepository = () => exports.repositoryFactory.createProfileRepository();
exports.getProfileRepository = getProfileRepository;
const getSpaceRepository = () => exports.repositoryFactory.createSpaceRepository();
exports.getSpaceRepository = getSpaceRepository;
const getFeedRepository = () => exports.repositoryFactory.createFeedRepository();
exports.getFeedRepository = getFeedRepository;
const getRitualRepository = () => exports.repositoryFactory.createRitualRepository();
exports.getRitualRepository = getRitualRepository;
const getCampusRepository = () => exports.repositoryFactory.createCampusRepository();
exports.getCampusRepository = getCampusRepository;
/**
 * Repository initialization helper
 * Call this in your application bootstrap to ensure Firebase is ready
 */
const initializeRepositories = async () => {
    // Pre-create all repository instances to ensure Firebase connection
    exports.repositoryFactory.createProfileRepository();
    exports.repositoryFactory.createSpaceRepository();
    exports.repositoryFactory.createFeedRepository();
    exports.repositoryFactory.createRitualRepository();
    exports.repositoryFactory.createCampusRepository();
    console.log('Firebase repositories initialized successfully');
};
exports.initializeRepositories = initializeRepositories;
/**
 * Repository health check
 * Useful for application monitoring and startup validation
 */
const checkRepositoryHealth = async () => {
    const health = {
        profile: false,
        space: false,
        feed: false,
        ritual: false,
        campus: false
    };
    try {
        // Test each repository with a basic operation
        const profileRepo = (0, exports.getProfileRepository)();
        const spaceRepo = (0, exports.getSpaceRepository)();
        const feedRepo = (0, exports.getFeedRepository)();
        const ritualRepo = (0, exports.getRitualRepository)();
        const campusRepo = (0, exports.getCampusRepository)();
        // Profile repository health check
        try {
            await campusRepo.getValidEmailDomains('ub-buffalo');
            health.profile = true;
        }
        catch (error) {
            console.warn('Profile repository health check failed:', error);
        }
        // Space repository health check
        try {
            await spaceRepo.findByCampus('ub-buffalo', 1);
            health.space = true;
        }
        catch (error) {
            console.warn('Space repository health check failed:', error);
        }
        // Feed repository health check
        try {
            await feedRepo.getTrendingContent('ub-buffalo', 1);
            health.feed = true;
        }
        catch (error) {
            console.warn('Feed repository health check failed:', error);
        }
        // Ritual repository health check
        try {
            await ritualRepo.findActive('ub-buffalo');
            health.ritual = true;
        }
        catch (error) {
            console.warn('Ritual repository health check failed:', error);
        }
        // Campus repository health check
        try {
            await campusRepo.getCampusStats('ub-buffalo');
            health.campus = true;
        }
        catch (error) {
            console.warn('Campus repository health check failed:', error);
        }
    }
    catch (error) {
        console.error('Repository health check failed:', error);
    }
    return health;
};
exports.checkRepositoryHealth = checkRepositoryHealth;
//# sourceMappingURL=factory.js.map