/**
 * Firebase Repository Factory
 * Dependency injection factory for Firebase repository implementations
 */
import { IRepositoryFactory, IProfileRepository, ISpaceRepository, IFeedRepository, IRitualRepository, ICampusRepository } from '../interfaces';
/**
 * Firebase Repository Factory Implementation
 * Creates Firebase-backed repository instances for all domains
 */
export declare class FirebaseRepositoryFactory implements IRepositoryFactory {
    private static profileRepository?;
    private static spaceRepository?;
    private static feedRepository?;
    private static ritualRepository?;
    private static campusRepository?;
    createProfileRepository(): IProfileRepository;
    createSpaceRepository(): ISpaceRepository;
    createFeedRepository(): IFeedRepository;
    createRitualRepository(): IRitualRepository;
    createCampusRepository(): ICampusRepository;
    /**
     * Clear singleton instances (useful for testing)
     */
    static clearInstances(): void;
}
/**
 * Default factory instance for application use
 */
export declare const repositoryFactory: FirebaseRepositoryFactory;
/**
 * Convenience functions for direct repository access
 * Use these in application code for clean dependency injection
 */
export declare const getProfileRepository: () => IProfileRepository;
export declare const getSpaceRepository: () => ISpaceRepository;
export declare const getFeedRepository: () => IFeedRepository;
export declare const getRitualRepository: () => IRitualRepository;
export declare const getCampusRepository: () => ICampusRepository;
/**
 * Repository initialization helper
 * Call this in your application bootstrap to ensure Firebase is ready
 */
export declare const initializeRepositories: () => Promise<void>;
/**
 * Repository health check
 * Useful for application monitoring and startup validation
 */
export declare const checkRepositoryHealth: () => Promise<{
    profile: boolean;
    space: boolean;
    feed: boolean;
    ritual: boolean;
    campus: boolean;
}>;
//# sourceMappingURL=factory.d.ts.map