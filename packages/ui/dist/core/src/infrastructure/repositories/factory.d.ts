/**
 * Repository Factory
 * Creates and manages repository instances with real Firebase implementations
 */
import { IProfileRepository, ISpaceRepository, IFeedRepository, IRitualRepository, IConnectionRepository } from './interfaces';
/**
 * Get or create ProfileRepository instance
 */
export declare function getProfileRepository(): IProfileRepository;
/**
 * Get or create SpaceRepository instance
 */
export declare function getSpaceRepository(): ISpaceRepository;
/**
 * Get or create FeedRepository instance
 */
export declare function getFeedRepository(): IFeedRepository;
/**
 * Get or create RitualRepository instance
 */
export declare function getRitualRepository(): IRitualRepository;
/**
 * Get or create ConnectionRepository instance
 */
export declare function getConnectionRepository(): IConnectionRepository;
/**
 * Initialize repositories with custom implementations (for testing)
 */
export declare function initializeRepositories(config: {
    profile?: IProfileRepository;
    space?: ISpaceRepository;
    feed?: IFeedRepository;
    ritual?: IRitualRepository;
    connection?: IConnectionRepository;
}): void;
/**
 * Reset all repository instances (for testing)
 */
export declare function resetRepositories(): void;
//# sourceMappingURL=factory.d.ts.map