/**
 * Firebase Repository Exports
 * Central export point for all Firebase repository implementations
 */
export { FirebaseProfileRepository } from './profile.repository';
export { FirebaseSpaceRepository } from './space.repository';
export { FirebaseFeedRepository } from './feed.repository';
export { FirebaseRitualRepository } from './ritual.repository';
export { FirebaseCampusRepository } from './campus.repository';
export { FirebaseRepositoryFactory, repositoryFactory, getProfileRepository, getSpaceRepository, getFeedRepository, getRitualRepository, getCampusRepository, initializeRepositories, checkRepositoryHealth } from './factory';
export type { IProfileRepository, ISpaceRepository, IFeedRepository, IRitualRepository, ICampusRepository, IRepositoryFactory } from '../interfaces';
//# sourceMappingURL=index.d.ts.map