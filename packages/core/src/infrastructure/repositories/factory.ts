/**
 * Repository Factory
 * Creates and manages repository instances with real Firebase implementations
 */

import {
  IProfileRepository,
  ISpaceRepository,
  IFeedRepository,
  IRitualRepository,
  IConnectionRepository,
  IToolRepository
} from './interfaces';

// Import real Firebase implementations
import { FirebaseProfileRepository } from './firebase/profile.repository';
import { FirebaseSpaceRepository } from './firebase/space.repository';
import { FirebaseFeedRepository } from './firebase/feed.repository';
import { FirebaseRitualRepository } from './firebase/ritual.repository';
import { FirebaseConnectionRepository } from './firebase/connection.repository';
import { FirebaseToolRepository } from './firebase/tool.repository';

// Singleton instances
let profileRepo: IProfileRepository | null = null;
let spaceRepo: ISpaceRepository | null = null;
let feedRepo: IFeedRepository | null = null;
let ritualRepo: IRitualRepository | null = null;
let connectionRepo: IConnectionRepository | null = null;
let toolRepo: IToolRepository | null = null;

/**
 * Get or create ProfileRepository instance
 */
export function getProfileRepository(): IProfileRepository {
  if (!profileRepo) {
    profileRepo = new FirebaseProfileRepository();
  }
  return profileRepo;
}

/**
 * Get or create SpaceRepository instance
 */
export function getSpaceRepository(): ISpaceRepository {
  if (!spaceRepo) {
    spaceRepo = new FirebaseSpaceRepository();
  }
  return spaceRepo;
}

/**
 * Get or create FeedRepository instance
 */
export function getFeedRepository(): IFeedRepository {
  if (!feedRepo) {
    feedRepo = new FirebaseFeedRepository();
  }
  return feedRepo;
}

/**
 * Get or create RitualRepository instance
 */
export function getRitualRepository(): IRitualRepository {
  if (!ritualRepo) {
    ritualRepo = new FirebaseRitualRepository();
  }
  return ritualRepo;
}

/**
 * Get or create ConnectionRepository instance
 */
export function getConnectionRepository(): IConnectionRepository {
  if (!connectionRepo) {
    connectionRepo = new FirebaseConnectionRepository();
  }
  return connectionRepo;
}

/**
 * Get or create ToolRepository instance
 */
export function getToolRepository(): IToolRepository {
  if (!toolRepo) {
    toolRepo = new FirebaseToolRepository();
  }
  return toolRepo;
}

/**
 * Initialize repositories with custom implementations (for testing)
 */
export function initializeRepositories(config: {
  profile?: IProfileRepository;
  space?: ISpaceRepository;
  feed?: IFeedRepository;
  ritual?: IRitualRepository;
  connection?: IConnectionRepository;
  tool?: IToolRepository;
}) {
  if (config.profile) profileRepo = config.profile;
  if (config.space) spaceRepo = config.space;
  if (config.feed) feedRepo = config.feed;
  if (config.ritual) ritualRepo = config.ritual;
  if (config.connection) connectionRepo = config.connection;
  if (config.tool) toolRepo = config.tool;
}

/**
 * Reset all repository instances (for testing)
 */
export function resetRepositories(): void {
  profileRepo = null;
  spaceRepo = null;
  feedRepo = null;
  ritualRepo = null;
  connectionRepo = null;
  toolRepo = null;
}