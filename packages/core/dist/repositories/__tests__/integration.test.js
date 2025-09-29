"use strict";
/**
 * Repository Integration Tests
 * End-to-end tests for Firebase repository implementations
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const domain_1 = require("../../domain");
const firebase_1 = require("../firebase");
// Mock Firebase for testing
const rules_unit_testing_1 = require("@firebase/rules-unit-testing");
(0, vitest_1.describe)('Repository Integration Tests', () => {
    let testEnv;
    (0, vitest_1.beforeEach)(async () => {
        // Initialize test environment with Firebase emulator
        testEnv = await (0, rules_unit_testing_1.initializeTestEnvironment)({
            projectId: 'test-hive-repositories',
            firestore: {
                rules: `
          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /{document=**} {
                allow read, write: if true;
              }
            }
          }
        `
            }
        });
        // Clear any existing instances
        firebase_1.FirebaseRepositoryFactory.clearInstances();
    });
    (0, vitest_1.afterEach)(async () => {
        await testEnv.cleanup();
    });
    (0, vitest_1.describe)('Profile Repository Integration', () => {
        (0, vitest_1.it)('should save and retrieve a profile', async () => {
            const profileRepo = (0, firebase_1.getProfileRepository)();
            // Create test profile
            const email = domain_1.UBEmail.create('test@buffalo.edu').getValue();
            const handle = domain_1.Handle.create('testuser').getValue();
            const profileId = domain_1.ProfileId.create('test-profile-id').getValue();
            const profile = domain_1.Profile.create({
                id: profileId,
                email,
                handle,
                personalInfo: {
                    firstName: 'Test',
                    lastName: 'User',
                    bio: 'Test bio',
                    major: 'Computer Science',
                    graduationYear: 2025,
                    dorm: 'Ellicott'
                }
            }).getValue();
            // Save profile
            const saveResult = await profileRepo.save(profile);
            (0, vitest_1.expect)(saveResult.isSuccess).toBe(true);
            // Retrieve profile by ID
            const retrieveResult = await profileRepo.findById(profileId);
            (0, vitest_1.expect)(retrieveResult.isSuccess).toBe(true);
            const retrievedProfile = retrieveResult.getValue();
            (0, vitest_1.expect)(retrievedProfile.toData().email.email).toBe('test@buffalo.edu');
            (0, vitest_1.expect)(retrievedProfile.toData().handle.username).toBe('testuser');
        });
        (0, vitest_1.it)('should find profile by email', async () => {
            const profileRepo = (0, firebase_1.getProfileRepository)();
            const email = domain_1.UBEmail.create('email-test@buffalo.edu').getValue();
            const handle = domain_1.Handle.create('emailuser').getValue();
            const profileId = domain_1.ProfileId.create('email-test-id').getValue();
            const profile = domain_1.Profile.create({
                id: profileId,
                email,
                handle,
                personalInfo: {
                    firstName: 'Email',
                    lastName: 'Test'
                }
            }).getValue();
            await profileRepo.save(profile);
            const findResult = await profileRepo.findByEmail(email);
            (0, vitest_1.expect)(findResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(findResult.getValue().toData().id.id).toBe('email-test-id');
        });
        (0, vitest_1.it)('should find profile by handle', async () => {
            const profileRepo = (0, firebase_1.getProfileRepository)();
            const email = domain_1.UBEmail.create('handle-test@buffalo.edu').getValue();
            const handle = domain_1.Handle.create('uniquehandle').getValue();
            const profileId = domain_1.ProfileId.create('handle-test-id').getValue();
            const profile = domain_1.Profile.create({
                id: profileId,
                email,
                handle,
                personalInfo: {
                    firstName: 'Handle',
                    lastName: 'Test'
                }
            }).getValue();
            await profileRepo.save(profile);
            const findResult = await profileRepo.findByHandle(handle);
            (0, vitest_1.expect)(findResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(findResult.getValue().toData().id.id).toBe('handle-test-id');
        });
    });
    (0, vitest_1.describe)('Space Repository Integration', () => {
        (0, vitest_1.it)('should save and retrieve a space', async () => {
            const spaceRepo = (0, firebase_1.getSpaceRepository)();
            const profileRepo = (0, firebase_1.getProfileRepository)();
            // Create test creator profile
            const creatorEmail = domain_1.UBEmail.create('creator@buffalo.edu').getValue();
            const creatorHandle = domain_1.Handle.create('spacecreator').getValue();
            const creatorId = domain_1.ProfileId.create('creator-id').getValue();
            const creator = domain_1.Profile.create({
                id: creatorId,
                email: creatorEmail,
                handle: creatorHandle,
                personalInfo: {
                    firstName: 'Space',
                    lastName: 'Creator'
                }
            }).getValue();
            await profileRepo.save(creator);
            // Create test space
            const spaceName = domain_1.SpaceName.create('Test Study Group').getValue();
            const spaceId = domain_1.SpaceId.create('test-space-id').getValue();
            const space = domain_1.Space.create({
                id: spaceId,
                name: spaceName,
                description: 'A test study group for integration testing',
                spaceType: 'study-group',
                visibility: 'public',
                createdBy: creatorId
            }).getValue();
            // Save space
            const saveResult = await spaceRepo.save(space);
            (0, vitest_1.expect)(saveResult.isSuccess).toBe(true);
            // Retrieve space
            const retrieveResult = await spaceRepo.findById(spaceId);
            (0, vitest_1.expect)(retrieveResult.isSuccess).toBe(true);
            const retrievedSpace = retrieveResult.getValue();
            (0, vitest_1.expect)(retrievedSpace.toData().name.name).toBe('Test Study Group');
            (0, vitest_1.expect)(retrievedSpace.toData().spaceType).toBe('study-group');
        });
        (0, vitest_1.it)('should find spaces by campus', async () => {
            const spaceRepo = (0, firebase_1.getSpaceRepository)();
            const profileRepo = (0, firebase_1.getProfileRepository)();
            // Create creator
            const creatorEmail = domain_1.UBEmail.create('campus-creator@buffalo.edu').getValue();
            const creatorHandle = domain_1.Handle.create('campuscreator').getValue();
            const creatorId = domain_1.ProfileId.create('campus-creator-id').getValue();
            const creator = domain_1.Profile.create({
                id: creatorId,
                email: creatorEmail,
                handle: creatorHandle,
                personalInfo: { firstName: 'Campus', lastName: 'Creator' }
            }).getValue();
            await profileRepo.save(creator);
            // Create multiple spaces
            const spaces = [];
            for (let i = 0; i < 3; i++) {
                const spaceName = domain_1.SpaceName.create(`Campus Space ${i}`).getValue();
                const spaceId = domain_1.SpaceId.create(`campus-space-${i}`).getValue();
                const space = domain_1.Space.create({
                    id: spaceId,
                    name: spaceName,
                    description: `Campus space ${i} description`,
                    spaceType: 'general',
                    visibility: 'public',
                    createdBy: creatorId
                }).getValue();
                spaces.push(space);
                await spaceRepo.save(space);
            }
            // Find by campus
            const findResult = await spaceRepo.findByCampus('ub-buffalo', 10);
            (0, vitest_1.expect)(findResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(findResult.getValue().length).toBeGreaterThanOrEqual(3);
        });
    });
    (0, vitest_1.describe)('Feed Repository Integration', () => {
        (0, vitest_1.it)('should create and retrieve user feed', async () => {
            const feedRepo = (0, firebase_1.getFeedRepository)();
            const profileRepo = (0, firebase_1.getProfileRepository)();
            // Create test user
            const userEmail = domain_1.UBEmail.create('feed-user@buffalo.edu').getValue();
            const userHandle = domain_1.Handle.create('feeduser').getValue();
            const userId = domain_1.ProfileId.create('feed-user-id').getValue();
            const user = domain_1.Profile.create({
                id: userId,
                email: userEmail,
                handle: userHandle,
                personalInfo: { firstName: 'Feed', lastName: 'User' }
            }).getValue();
            await profileRepo.save(user);
            // Get feed (should create default if not exists)
            const feedResult = await feedRepo.findByUserId(userId);
            (0, vitest_1.expect)(feedResult.isSuccess).toBe(true);
            const feed = feedResult.getValue();
            (0, vitest_1.expect)(feed.toData().userId.id).toBe('feed-user-id');
            (0, vitest_1.expect)(feed.toData().preferences.showSpacePosts).toBe(true);
        });
        (0, vitest_1.it)('should get trending content', async () => {
            const feedRepo = (0, firebase_1.getFeedRepository)();
            const trendingResult = await feedRepo.getTrendingContent('ub-buffalo', 5);
            (0, vitest_1.expect)(trendingResult.isSuccess).toBe(true);
            const trendingItems = trendingResult.getValue();
            (0, vitest_1.expect)(Array.isArray(trendingItems)).toBe(true);
        });
        (0, vitest_1.it)('should record user interactions', async () => {
            const feedRepo = (0, firebase_1.getFeedRepository)();
            const userId = domain_1.ProfileId.create('interaction-user').getValue();
            const interactionResult = await feedRepo.recordInteraction(userId, 'test-item-id', 'view', { timestamp: Date.now() });
            (0, vitest_1.expect)(interactionResult.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('Ritual Repository Integration', () => {
        (0, vitest_1.it)('should save and retrieve a ritual', async () => {
            const ritualRepo = (0, firebase_1.getRitualRepository)();
            const profileRepo = (0, firebase_1.getProfileRepository)();
            // Create ritual creator
            const creatorEmail = domain_1.UBEmail.create('ritual-creator@buffalo.edu').getValue();
            const creatorHandle = domain_1.Handle.create('ritualcreator').getValue();
            const creatorId = domain_1.ProfileId.create('ritual-creator-id').getValue();
            const creator = domain_1.Profile.create({
                id: creatorId,
                email: creatorEmail,
                handle: creatorHandle,
                personalInfo: { firstName: 'Ritual', lastName: 'Creator' }
            }).getValue();
            await profileRepo.save(creator);
            // Create ritual
            const ritualId = domain_1.RitualId.create('test-ritual-id').getValue();
            const startDate = new Date();
            const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days later
            const ritual = domain_1.Ritual.create({
                id: ritualId,
                name: 'Test Study Challenge',
                description: 'A test ritual for studying habits',
                ritualType: 'study-challenge',
                startDate,
                endDate,
                createdBy: creatorId,
                milestones: [
                    {
                        id: 'milestone-1',
                        name: 'First Study Session',
                        description: 'Complete your first study session',
                        targetValue: 1,
                        rewards: [
                            {
                                type: 'points',
                                value: '10',
                                description: '10 points for completing first session'
                            }
                        ]
                    }
                ]
            }).getValue();
            // Save ritual
            const saveResult = await ritualRepo.save(ritual);
            (0, vitest_1.expect)(saveResult.isSuccess).toBe(true);
            // Retrieve ritual
            const retrieveResult = await ritualRepo.findById(ritualId);
            (0, vitest_1.expect)(retrieveResult.isSuccess).toBe(true);
            const retrievedRitual = retrieveResult.getValue();
            (0, vitest_1.expect)(retrievedRitual.toData().name).toBe('Test Study Challenge');
            (0, vitest_1.expect)(retrievedRitual.toData().ritualType).toBe('study-challenge');
        });
        (0, vitest_1.it)('should save and retrieve participation', async () => {
            const ritualRepo = (0, firebase_1.getRitualRepository)();
            const profileRepo = (0, firebase_1.getProfileRepository)();
            // Create participant
            const participantEmail = domain_1.UBEmail.create('participant@buffalo.edu').getValue();
            const participantHandle = domain_1.Handle.create('participant').getValue();
            const participantId = domain_1.ProfileId.create('participant-id').getValue();
            const participant = domain_1.Profile.create({
                id: participantId,
                email: participantEmail,
                handle: participantHandle,
                personalInfo: { firstName: 'Test', lastName: 'Participant' }
            }).getValue();
            await profileRepo.save(participant);
            // Create participation
            const ritualId = domain_1.RitualId.create('participation-ritual-id').getValue();
            const participation = domain_1.Participation.create({
                ritualId,
                profileId: participantId,
                status: 'active'
            }).getValue();
            // Save participation
            const saveResult = await ritualRepo.saveParticipation(participation);
            (0, vitest_1.expect)(saveResult.isSuccess).toBe(true);
            // Retrieve participation
            const retrieveResult = await ritualRepo.findParticipation(ritualId, participantId);
            (0, vitest_1.expect)(retrieveResult.isSuccess).toBe(true);
            const retrievedParticipation = retrieveResult.getValue();
            (0, vitest_1.expect)(retrievedParticipation.toData().status).toBe('active');
        });
        (0, vitest_1.it)('should find active rituals', async () => {
            const ritualRepo = (0, firebase_1.getRitualRepository)();
            const activeResult = await ritualRepo.findActive('ub-buffalo');
            (0, vitest_1.expect)(activeResult.isSuccess).toBe(true);
            const activeRituals = activeResult.getValue();
            (0, vitest_1.expect)(Array.isArray(activeRituals)).toBe(true);
        });
    });
    (0, vitest_1.describe)('Campus Repository Integration', () => {
        (0, vitest_1.it)('should verify campus emails', async () => {
            const campusRepo = (0, firebase_1.getCampusRepository)();
            // Test valid UB email
            const validResult = await campusRepo.verifyCampusEmail('student@buffalo.edu');
            (0, vitest_1.expect)(validResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(validResult.getValue()).toBe(true);
            // Test invalid email
            const invalidResult = await campusRepo.verifyCampusEmail('student@gmail.com');
            (0, vitest_1.expect)(invalidResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(invalidResult.getValue()).toBe(false);
        });
        (0, vitest_1.it)('should get valid email domains', async () => {
            const campusRepo = (0, firebase_1.getCampusRepository)();
            const domainsResult = await campusRepo.getValidEmailDomains('ub-buffalo');
            (0, vitest_1.expect)(domainsResult.isSuccess).toBe(true);
            const domains = domainsResult.getValue();
            (0, vitest_1.expect)(domains).toContain('@buffalo.edu');
        });
        (0, vitest_1.it)('should get campus statistics', async () => {
            const campusRepo = (0, firebase_1.getCampusRepository)();
            const statsResult = await campusRepo.getCampusStats('ub-buffalo');
            (0, vitest_1.expect)(statsResult.isSuccess).toBe(true);
            const stats = statsResult.getValue();
            (0, vitest_1.expect)(typeof stats.totalUsers).toBe('number');
            (0, vitest_1.expect)(typeof stats.totalSpaces).toBe('number');
            (0, vitest_1.expect)(typeof stats.activeRituals).toBe('number');
            (0, vitest_1.expect)(typeof stats.dailyActiveUsers).toBe('number');
        });
    });
    (0, vitest_1.describe)('Cross-Repository Integration', () => {
        (0, vitest_1.it)('should handle profile-space relationship', async () => {
            const profileRepo = (0, firebase_1.getProfileRepository)();
            const spaceRepo = (0, firebase_1.getSpaceRepository)();
            // Create user
            const userEmail = domain_1.UBEmail.create('integration@buffalo.edu').getValue();
            const userHandle = domain_1.Handle.create('integrationuser').getValue();
            const userId = domain_1.ProfileId.create('integration-user-id').getValue();
            const user = domain_1.Profile.create({
                id: userId,
                email: userEmail,
                handle: userHandle,
                personalInfo: { firstName: 'Integration', lastName: 'User' }
            }).getValue();
            await profileRepo.save(user);
            // Create space by user
            const spaceName = domain_1.SpaceName.create('Integration Space').getValue();
            const spaceId = domain_1.SpaceId.create('integration-space-id').getValue();
            const space = domain_1.Space.create({
                id: spaceId,
                name: spaceName,
                description: 'Integration test space',
                spaceType: 'general',
                visibility: 'public',
                createdBy: userId
            }).getValue();
            await spaceRepo.save(space);
            // Find spaces by member (creator)
            const memberSpacesResult = await spaceRepo.findByMember(userId, 10);
            (0, vitest_1.expect)(memberSpacesResult.isSuccess).toBe(true);
            const memberSpaces = memberSpacesResult.getValue();
            const foundSpace = memberSpaces.find(s => s.toData().id.id === 'integration-space-id');
            (0, vitest_1.expect)(foundSpace).toBeDefined();
        });
        (0, vitest_1.it)('should handle feed-space content integration', async () => {
            const feedRepo = (0, firebase_1.getFeedRepository)();
            const spaceRepo = (0, firebase_1.getSpaceRepository)();
            const profileRepo = (0, firebase_1.getProfileRepository)();
            // Create user and space
            const userId = domain_1.ProfileId.create('feed-integration-user').getValue();
            const spaceId = domain_1.SpaceId.create('feed-integration-space').getValue();
            // Get user's feed content based on their spaces
            const feedContentResult = await feedRepo.getFeedContent(userId, [spaceId], [], 10);
            (0, vitest_1.expect)(feedContentResult.isSuccess).toBe(true);
            const feedItems = feedContentResult.getValue();
            (0, vitest_1.expect)(Array.isArray(feedItems)).toBe(true);
        });
    });
});
//# sourceMappingURL=integration.test.js.map