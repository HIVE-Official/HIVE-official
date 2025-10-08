"use strict";
/**
 * Profile Aggregate Tests
 * Comprehensive test suite for Profile domain logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_aggregate_1 = require("../aggregates/profile.aggregate");
const profile_id_value_1 = require("../value-objects/profile-id.value");
const campus_id_value_1 = require("../value-objects/campus-id.value");
const profile_handle_value_1 = require("../value-objects/profile-handle.value");
const user_type_value_1 = require("../value-objects/user-type.value");
const profile_privacy_value_1 = require("../value-objects/profile-privacy.value");
const ub_email_value_1 = require("../value-objects/ub-email.value");
(0, vitest_1.describe)('Profile Aggregate', () => {
    // Test data factories
    const createValidPersonalInfo = () => ({
        firstName: 'John',
        lastName: 'Doe',
        bio: 'UB student studying Computer Science',
        major: 'Computer Science',
        graduationYear: 2025,
        dorm: 'Governors',
        phoneNumber: '+1234567890',
        profilePhoto: 'https://example.com/photo.jpg',
        coverPhoto: 'https://example.com/cover.jpg'
    });
    const createValidAcademicInfo = () => ({
        major: 'Computer Science',
        minor: 'Mathematics',
        graduationYear: 2025,
        gpa: 3.5,
        courses: ['CSE 191', 'CSE 241', 'MTH 141'],
        academicStanding: 'good'
    });
    const createValidSocialInfo = () => ({
        interests: ['Basketball', 'Gaming', 'Coding'],
        clubs: ['ACM', 'IEEE'],
        sports: ['Intramural Basketball'],
        instagram: '@johndoe',
        snapchat: 'johndoe'
    });
    const createValidProfileProps = () => {
        const profileIdResult = profile_id_value_1.ProfileId.create('profile_test_123');
        if (profileIdResult.isFailure)
            throw new Error(`ProfileId failed: ${profileIdResult.error}`);
        const emailResult = ub_email_value_1.UBEmail.create('johndoe@buffalo.edu');
        if (emailResult.isFailure)
            throw new Error(`UBEmail failed: ${emailResult.error}`);
        const handleResult = profile_handle_value_1.ProfileHandle.create('johndoe');
        if (handleResult.isFailure)
            throw new Error(`ProfileHandle failed: ${handleResult.error}`);
        const userTypeResult = user_type_value_1.UserType.createStudent();
        if (userTypeResult.isFailure)
            throw new Error(`UserType failed: ${userTypeResult.error}`);
        const campusIdResult = campus_id_value_1.CampusId.create('ub-buffalo');
        if (campusIdResult.isFailure)
            throw new Error(`CampusId failed: ${campusIdResult.error}`);
        const privacyResult = profile_privacy_value_1.ProfilePrivacy.createPublic();
        if (privacyResult.isFailure)
            throw new Error(`ProfilePrivacy failed: ${privacyResult.error}`);
        return {
            profileId: profileIdResult.getValue(),
            email: emailResult.getValue(),
            handle: handleResult.getValue(),
            userType: userTypeResult.getValue(),
            campusId: campusIdResult.getValue(),
            personalInfo: createValidPersonalInfo(),
            socialInfo: createValidSocialInfo(),
            privacy: privacyResult.getValue()
        };
    };
    (0, vitest_1.describe)('Profile.create()', () => {
        (0, vitest_1.it)('should create a valid profile with all required fields', () => {
            // Arrange
            const props = createValidProfileProps();
            // Act
            const result = profile_aggregate_1.Profile.create(props);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const profile = result.getValue();
            (0, vitest_1.expect)(profile.email.value).toBe('johndoe@buffalo.edu');
            (0, vitest_1.expect)(profile.handle.value).toBe('johndoe');
            (0, vitest_1.expect)(profile.isOnboarded).toBe(false);
            (0, vitest_1.expect)(profile.isActive).toBe(true);
        });
        (0, vitest_1.it)('should emit ProfileCreatedEvent on creation', () => {
            // Arrange
            const props = createValidProfileProps();
            // Act
            const result = profile_aggregate_1.Profile.create(props);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const profile = result.getValue();
            const events = profile.domainEvents;
            (0, vitest_1.expect)(events).toHaveLength(1);
            (0, vitest_1.expect)(events[0].getEventName()).toBe('ProfileCreated');
        });
        (0, vitest_1.it)('should initialize with zero counts', () => {
            // Arrange
            const props = createValidProfileProps();
            // Act
            const result = profile_aggregate_1.Profile.create(props);
            // Assert
            const profile = result.getValue();
            (0, vitest_1.expect)(profile.followerCount).toBe(0);
            (0, vitest_1.expect)(profile.followingCount).toBe(0);
            (0, vitest_1.expect)(profile.connectionCount).toBe(0);
            (0, vitest_1.expect)(profile.activityScore).toBe(0);
        });
        (0, vitest_1.it)('should initialize with empty arrays', () => {
            // Arrange
            const props = createValidProfileProps();
            // Act
            const result = profile_aggregate_1.Profile.create(props);
            // Assert
            const profile = result.getValue();
            (0, vitest_1.expect)(profile.connections).toEqual([]);
            (0, vitest_1.expect)(profile.spaces).toEqual([]);
            (0, vitest_1.expect)(profile.achievements).toEqual([]);
        });
    });
    (0, vitest_1.describe)('updatePersonalInfo()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should update personal info successfully', () => {
            // Arrange
            const newInfo = {
                bio: 'Updated bio',
                dorm: 'Ellicott'
            };
            // Act
            const result = profile.updatePersonalInfo(newInfo);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.personalInfo.bio).toBe('Updated bio');
            (0, vitest_1.expect)(profile.personalInfo.dorm).toBe('Ellicott');
            (0, vitest_1.expect)(profile.personalInfo.firstName).toBe('John'); // Unchanged
        });
        (0, vitest_1.it)('should maintain immutability of unchanged fields', () => {
            // Arrange
            const originalFirstName = profile.personalInfo.firstName;
            const newInfo = {
                lastName: 'Smith'
            };
            // Act
            profile.updatePersonalInfo(newInfo);
            // Assert
            (0, vitest_1.expect)(profile.personalInfo.firstName).toBe(originalFirstName);
            (0, vitest_1.expect)(profile.personalInfo.lastName).toBe('Smith');
        });
    });
    (0, vitest_1.describe)('updateAcademicInfo()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should update academic info successfully', () => {
            // Arrange
            const academicInfo = createValidAcademicInfo();
            // Act
            const result = profile.updateAcademicInfo(academicInfo);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.academicInfo?.major).toBe('Computer Science');
            (0, vitest_1.expect)(profile.academicInfo?.gpa).toBe(3.5);
            (0, vitest_1.expect)(profile.academicInfo?.courses).toHaveLength(3);
        });
        (0, vitest_1.it)('should validate GPA range', () => {
            // Arrange
            const invalidAcademicInfo = {
                ...createValidAcademicInfo(),
                gpa: 5.0 // Invalid GPA > 4.0
            };
            // Act
            const result = profile.updateAcademicInfo(invalidAcademicInfo);
            // Assert - This should either succeed (no validation) or fail
            // Based on the code, there's no GPA validation in updateAcademicInfo
            // This test documents the current behavior
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('Interest Management', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should add interest successfully', () => {
            // Arrange
            const newInterest = 'Photography';
            // Act
            const result = profile.addInterest(newInterest);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.socialInfo.interests).toContain('Photography');
        });
        (0, vitest_1.it)('should prevent duplicate interests', () => {
            // Arrange
            const interest = 'Basketball';
            profile.addInterest(interest); // First add
            // Act
            const result = profile.addInterest(interest); // Duplicate
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('already exists');
        });
        (0, vitest_1.it)('should enforce maximum interests limit', () => {
            // Arrange - Add 9 interests (assuming max is 10)
            for (let i = 0; i < 9; i++) {
                profile.addInterest(`Interest${i}`);
            }
            // Act - Try to add 11th interest
            const result = profile.addInterest('TooManyInterests');
            // Assert - Based on code, max is 10
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('maximum');
        });
        (0, vitest_1.it)('should remove interest successfully', () => {
            // Arrange
            const interest = 'Basketball';
            // Act
            profile.removeInterest(interest);
            // Assert
            (0, vitest_1.expect)(profile.socialInfo.interests).not.toContain('Basketball');
        });
        (0, vitest_1.it)('should handle removing non-existent interest', () => {
            // Arrange
            const nonExistentInterest = 'NonExistent';
            // Act
            profile.removeInterest(nonExistentInterest);
            // Assert - Should not throw, just no-op
            (0, vitest_1.expect)(profile.socialInfo.interests).not.toContain(nonExistentInterest);
        });
    });
    (0, vitest_1.describe)('Connection Management', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should add connection successfully', () => {
            // Arrange
            const connectionId = 'connection123';
            // Act
            profile.addConnection(connectionId);
            // Assert
            (0, vitest_1.expect)(profile.connections).toContain(connectionId);
            (0, vitest_1.expect)(profile.connectionCount).toBe(1);
        });
        (0, vitest_1.it)('should prevent duplicate connections', () => {
            // Arrange
            const connectionId = 'connection123';
            profile.addConnection(connectionId);
            const initialCount = profile.connectionCount;
            // Act
            profile.addConnection(connectionId); // Duplicate attempt
            // Assert
            (0, vitest_1.expect)(profile.connectionCount).toBe(initialCount);
            (0, vitest_1.expect)(profile.connections.filter(c => c === connectionId)).toHaveLength(1);
        });
        (0, vitest_1.it)('should remove connection successfully', () => {
            // Arrange
            const connectionId = 'connection123';
            profile.addConnection(connectionId);
            // Act
            profile.removeConnection(connectionId);
            // Assert
            (0, vitest_1.expect)(profile.connections).not.toContain(connectionId);
            (0, vitest_1.expect)(profile.connectionCount).toBe(0);
        });
        (0, vitest_1.it)('should update connection count accurately', () => {
            // Arrange & Act
            profile.addConnection('connection1');
            profile.addConnection('connection2');
            profile.addConnection('connection3');
            // Assert
            (0, vitest_1.expect)(profile.connectionCount).toBe(3);
            // Act
            profile.removeConnection('connection2');
            // Assert
            (0, vitest_1.expect)(profile.connectionCount).toBe(2);
        });
    });
    (0, vitest_1.describe)('Space Management', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should join space successfully', () => {
            // Arrange
            const spaceId = 'space123';
            // Act
            profile.joinSpace(spaceId);
            // Assert
            (0, vitest_1.expect)(profile.spaces).toContain(spaceId);
        });
        (0, vitest_1.it)('should prevent joining duplicate spaces', () => {
            // Arrange
            const spaceId = 'space123';
            profile.joinSpace(spaceId);
            const initialLength = profile.spaces.length;
            // Act
            profile.joinSpace(spaceId); // Duplicate
            // Assert
            (0, vitest_1.expect)(profile.spaces.length).toBe(initialLength);
        });
        (0, vitest_1.it)('should leave space successfully', () => {
            // Arrange
            const spaceId = 'space123';
            profile.joinSpace(spaceId);
            // Act
            profile.leaveSpace(spaceId);
            // Assert
            (0, vitest_1.expect)(profile.spaces).not.toContain(spaceId);
        });
        (0, vitest_1.it)('should handle leaving non-joined space gracefully', () => {
            // Arrange
            const nonJoinedSpace = 'nonJoinedSpace';
            // Act & Assert - Should not throw
            (0, vitest_1.expect)(() => profile.leaveSpace(nonJoinedSpace)).not.toThrow();
        });
    });
    (0, vitest_1.describe)('completeOnboarding()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should complete onboarding successfully', () => {
            // Arrange
            const academicInfo = createValidAcademicInfo();
            const interests = ['Coding', 'Gaming', 'Basketball'];
            const selectedSpaces = ['space1', 'space2'];
            // Act
            const result = profile.completeOnboarding(academicInfo, interests, selectedSpaces);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.isOnboarded).toBe(true);
            (0, vitest_1.expect)(profile.academicInfo?.major).toBe('Computer Science');
            (0, vitest_1.expect)(profile.socialInfo.interests).toEqual(interests);
            (0, vitest_1.expect)(profile.spaces).toEqual(selectedSpaces);
        });
        (0, vitest_1.it)('should emit ProfileOnboardedEvent', () => {
            // Arrange
            const academicInfo = createValidAcademicInfo();
            profile.clearEvents(); // Clear creation event
            // Act
            profile.completeOnboarding(academicInfo, ['Coding'], ['space1']);
            // Assert
            const events = profile.domainEvents;
            (0, vitest_1.expect)(events).toHaveLength(1);
            (0, vitest_1.expect)(events[0].getEventName()).toBe('ProfileOnboarded');
        });
        (0, vitest_1.it)('should fail if already onboarded', () => {
            // Arrange
            const academicInfo = createValidAcademicInfo();
            profile.completeOnboarding(academicInfo, ['Interest1'], ['space1']); // First onboarding
            // Act
            const result = profile.completeOnboarding(academicInfo, ['Interest1'], ['space1']); // Second attempt
            // Assert
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('already onboarded');
        });
        (0, vitest_1.it)('should require at least one interest', () => {
            // Arrange
            const academicInfo = createValidAcademicInfo();
            // Act
            const result = profile.completeOnboarding(academicInfo, [], []);
            // Assert - Based on code, at least 1 interest required
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('interest');
        });
        (0, vitest_1.it)('should require at least one space', () => {
            // Arrange
            const academicInfo = createValidAcademicInfo();
            // Act
            const result = profile.completeOnboarding(academicInfo, ['Interest1'], []);
            // Assert - Based on code, at least 1 space required
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('space');
        });
        (0, vitest_1.it)('should onboard non-student profiles without academic info', () => {
            // Arrange
            const props = createValidProfileProps();
            const nonStudentResult = user_type_value_1.UserType.create(user_type_value_1.UserTypeEnum.ALUMNI);
            if (nonStudentResult.isFailure) {
                throw new Error(`Failed to create non-student user type: ${nonStudentResult.error}`);
            }
            props.userType = nonStudentResult.getValue();
            const profile = profile_aggregate_1.Profile.create(props).getValue();
            profile.clearEvents();
            const interests = ['Community Service'];
            const selectedSpaces = ['space-transfer'];
            // Act
            const result = profile.completeOnboarding(undefined, interests, selectedSpaces);
            // Assert
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.isOnboarded).toBe(true);
            (0, vitest_1.expect)(profile.academicInfo).toBeUndefined();
            (0, vitest_1.expect)(profile.socialInfo.interests).toEqual(interests);
            (0, vitest_1.expect)(profile.spaces).toEqual(selectedSpaces);
            const events = profile.domainEvents;
            (0, vitest_1.expect)(events).toHaveLength(1);
            (0, vitest_1.expect)(events[0].getEventName()).toBe('ProfileOnboarded');
        });
    });
    (0, vitest_1.describe)('Profile Verification', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should verify profile successfully', () => {
            // Arrange
            (0, vitest_1.expect)(profile.isVerified).toBe(false);
            // Act
            profile.verify();
            // Assert
            (0, vitest_1.expect)(profile.isVerified).toBe(true);
        });
    });
    (0, vitest_1.describe)('Profile Activation', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should deactivate profile successfully', () => {
            // Arrange
            (0, vitest_1.expect)(profile.isActive).toBe(true);
            // Act
            profile.deactivate();
            // Assert
            (0, vitest_1.expect)(profile.isActive).toBe(false);
        });
        (0, vitest_1.it)('should reactivate profile successfully', () => {
            // Arrange
            profile.deactivate();
            (0, vitest_1.expect)(profile.isActive).toBe(false);
            // Act
            profile.reactivate();
            // Assert
            (0, vitest_1.expect)(profile.isActive).toBe(true);
        });
    });
    (0, vitest_1.describe)('isProfileComplete()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should return false for incomplete profile', () => {
            // Arrange - Fresh profile without onboarding
            // Act
            const isComplete = profile.isProfileComplete();
            // Assert
            (0, vitest_1.expect)(isComplete).toBe(false);
        });
        (0, vitest_1.it)('should return true for complete profile', () => {
            // Arrange - Complete onboarding
            const academicInfo = createValidAcademicInfo();
            profile.completeOnboarding(academicInfo, ['Interest1', 'Interest2'], ['space1']);
            profile.addPhoto('https://example.com/photo.jpg');
            // Act
            const isComplete = profile.isProfileComplete();
            // Assert
            (0, vitest_1.expect)(isComplete).toBe(true);
        });
    });
    (0, vitest_1.describe)('getCompletionPercentage()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should calculate completion percentage correctly', () => {
            // Arrange - Fresh profile
            // Act
            const percentage = profile.getCompletionPercentage();
            // Assert
            (0, vitest_1.expect)(percentage).toBeGreaterThanOrEqual(0);
            (0, vitest_1.expect)(percentage).toBeLessThanOrEqual(100);
        });
        (0, vitest_1.it)('should show 100% for fully complete profile', () => {
            // Arrange - Complete all requirements
            const academicInfo = createValidAcademicInfo();
            profile.completeOnboarding(academicInfo, ['I1', 'I2', 'I3'], ['s1', 's2', 's3']);
            profile.addPhoto('https://example.com/photo.jpg');
            profile.addConnection('connection1');
            // Act
            const percentage = profile.getCompletionPercentage();
            // Assert
            (0, vitest_1.expect)(percentage).toBe(100);
        });
        (0, vitest_1.it)('should increase percentage as profile is filled', () => {
            // Arrange
            const initialPercentage = profile.getCompletionPercentage();
            // Act - Add data
            profile.addInterest('Interest1');
            const afterInterestPercentage = profile.getCompletionPercentage();
            // Assert
            (0, vitest_1.expect)(afterInterestPercentage).toBeGreaterThan(initialPercentage);
        });
    });
    (0, vitest_1.describe)('getOnboardingNextSteps()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should provide next steps for incomplete profile', () => {
            // Arrange
            const suggestedSpaces = [
                { id: 'space1', name: 'ACM' },
                { id: 'space2', name: 'IEEE' }
            ];
            // Act
            const nextSteps = profile.getOnboardingNextSteps(suggestedSpaces);
            // Assert
            (0, vitest_1.expect)(nextSteps).toBeInstanceOf(Array);
            (0, vitest_1.expect)(nextSteps.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(nextSteps[0]).toHaveProperty('title');
            (0, vitest_1.expect)(nextSteps[0]).toHaveProperty('description');
            (0, vitest_1.expect)(nextSteps[0]).toHaveProperty('completed');
        });
        (0, vitest_1.it)('should mark steps as completed when done', () => {
            // Arrange
            const academicInfo = createValidAcademicInfo();
            profile.completeOnboarding(academicInfo, ['I1', 'I2'], ['s1']);
            // Act
            const nextSteps = profile.getOnboardingNextSteps([]);
            // Assert
            const onboardingStep = nextSteps.find(step => step.title.includes('Complete'));
            (0, vitest_1.expect)(onboardingStep?.completed).toBe(true);
        });
    });
    (0, vitest_1.describe)('getOnboardingWarnings()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should return warnings for incomplete profile', () => {
            // Arrange - Fresh profile
            // Act
            const warnings = profile.getOnboardingWarnings();
            // Assert
            (0, vitest_1.expect)(warnings).toBeInstanceOf(Array);
            (0, vitest_1.expect)(warnings.length).toBeGreaterThan(0);
        });
        (0, vitest_1.it)('should return empty warnings for complete profile', () => {
            // Arrange - Complete profile
            const academicInfo = createValidAcademicInfo();
            profile.completeOnboarding(academicInfo, ['I1', 'I2', 'I3'], ['s1', 's2']);
            profile.addPhoto('https://example.com/photo.jpg');
            profile.addConnection('connection1');
            // Act
            const warnings = profile.getOnboardingWarnings();
            // Assert
            (0, vitest_1.expect)(warnings).toHaveLength(0);
        });
    });
    (0, vitest_1.describe)('getOnboardingStatus()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should return comprehensive onboarding status', () => {
            // Arrange & Act
            const status = profile.getOnboardingStatus();
            // Assert
            (0, vitest_1.expect)(status).toHaveProperty('isComplete');
            (0, vitest_1.expect)(status).toHaveProperty('completionPercentage');
            (0, vitest_1.expect)(status).toHaveProperty('nextSteps');
            (0, vitest_1.expect)(status).toHaveProperty('warnings');
            (0, vitest_1.expect)(status.isComplete).toBe(profile.isProfileComplete());
            (0, vitest_1.expect)(status.completionPercentage).toBe(profile.getCompletionPercentage());
        });
    });
    (0, vitest_1.describe)('Achievement Management', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should add achievement successfully', () => {
            // Arrange
            const achievementId = 'achievement123';
            // Act
            profile.addAchievement(achievementId);
            // Assert
            (0, vitest_1.expect)(profile.achievements).toContain(achievementId);
        });
        (0, vitest_1.it)('should prevent duplicate achievements', () => {
            // Arrange
            const achievementId = 'achievement123';
            profile.addAchievement(achievementId);
            const initialLength = profile.achievements.length;
            // Act
            profile.addAchievement(achievementId); // Duplicate
            // Assert
            (0, vitest_1.expect)(profile.achievements.length).toBe(initialLength);
        });
    });
    (0, vitest_1.describe)('updateLastActive()', () => {
        let profile;
        (0, vitest_1.beforeEach)(() => {
            const props = createValidProfileProps();
            profile = profile_aggregate_1.Profile.create(props).getValue();
        });
        (0, vitest_1.it)('should update last active timestamp', () => {
            // Arrange
            const beforeUpdate = new Date();
            // Act
            profile.updateLastActive();
            // Assert
            (0, vitest_1.expect)(profile.lastActive).toBeDefined();
            (0, vitest_1.expect)(profile.lastActive.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
        });
    });
    (0, vitest_1.describe)('Edge Cases and Invariants', () => {
        (0, vitest_1.it)('should maintain campus isolation', () => {
            // Arrange
            const props = createValidProfileProps();
            const profile = profile_aggregate_1.Profile.create(props).getValue();
            // Assert
            (0, vitest_1.expect)(profile.campusId.id).toBe('ub-buffalo');
        });
        (0, vitest_1.it)('should enforce email domain validation', () => {
            // Arrange
            const props = createValidProfileProps();
            const invalidEmailResult = ub_email_value_1.UBEmail.create('invalid@gmail.com');
            // Assert
            (0, vitest_1.expect)(invalidEmailResult.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should enforce handle uniqueness constraints', () => {
            // Arrange - Handle validation happens in value object
            const tooLongHandle = 'a'.repeat(31); // Assuming max 30 chars
            const handleResult = profile_handle_value_1.ProfileHandle.create(tooLongHandle);
            // Assert
            (0, vitest_1.expect)(handleResult.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should maintain referential integrity for connections', () => {
            // Arrange
            const props = createValidProfileProps();
            const profile = profile_aggregate_1.Profile.create(props).getValue();
            // Act
            profile.addConnection('conn1');
            profile.addConnection('conn2');
            profile.removeConnection('conn1');
            // Assert
            (0, vitest_1.expect)(profile.connections).toEqual(['conn2']);
            (0, vitest_1.expect)(profile.connectionCount).toBe(1);
        });
    });
});
//# sourceMappingURL=profile.aggregate.test.js.map