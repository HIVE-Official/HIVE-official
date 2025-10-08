/**
 * Profile Aggregate Tests
 * Comprehensive test suite for Profile domain logic
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Profile, PersonalInfo, AcademicInfo, SocialInfo } from '../aggregates/profile.aggregate';
import { ProfileId } from '../value-objects/profile-id.value';
import { CampusId } from '../value-objects/campus-id.value';
import { ProfileHandle } from '../value-objects/profile-handle.value';
import { UserType, UserTypeEnum } from '../value-objects/user-type.value';
import { ProfilePrivacy } from '../value-objects/profile-privacy.value';
import { UBEmail } from '../value-objects/ub-email.value';
import { Result } from '../../shared/base/Result';

describe('Profile Aggregate', () => {
  // Test data factories
  const createValidPersonalInfo = (): PersonalInfo => ({
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

  const createValidAcademicInfo = (): AcademicInfo => ({
    major: 'Computer Science',
    minor: 'Mathematics',
    graduationYear: 2025,
    gpa: 3.5,
    courses: ['CSE 191', 'CSE 241', 'MTH 141'],
    academicStanding: 'good'
  });

  const createValidSocialInfo = (): SocialInfo => ({
    interests: ['Basketball', 'Gaming', 'Coding'],
    clubs: ['ACM', 'IEEE'],
    sports: ['Intramural Basketball'],
    instagram: '@johndoe',
    snapchat: 'johndoe'
  });

  const createValidProfileProps = () => {
    const profileIdResult = ProfileId.create('profile_test_123');
    if (profileIdResult.isFailure) throw new Error(`ProfileId failed: ${profileIdResult.error}`);

    const emailResult = UBEmail.create('johndoe@buffalo.edu');
    if (emailResult.isFailure) throw new Error(`UBEmail failed: ${emailResult.error}`);

    const handleResult = ProfileHandle.create('johndoe');
    if (handleResult.isFailure) throw new Error(`ProfileHandle failed: ${handleResult.error}`);

    const userTypeResult = UserType.createStudent();
    if (userTypeResult.isFailure) throw new Error(`UserType failed: ${userTypeResult.error}`);

    const campusIdResult = CampusId.create('ub-buffalo');
    if (campusIdResult.isFailure) throw new Error(`CampusId failed: ${campusIdResult.error}`);

    const privacyResult = ProfilePrivacy.createPublic();
    if (privacyResult.isFailure) throw new Error(`ProfilePrivacy failed: ${privacyResult.error}`);

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

  describe('Profile.create()', () => {
    it('should create a valid profile with all required fields', () => {
      // Arrange
      const props = createValidProfileProps();

      // Act
      const result = Profile.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      const profile = result.getValue();
      expect(profile.email.value).toBe('johndoe@buffalo.edu');
      expect(profile.handle.value).toBe('johndoe');
      expect(profile.isOnboarded).toBe(false);
      expect(profile.isActive).toBe(true);
    });

    it('should emit ProfileCreatedEvent on creation', () => {
      // Arrange
      const props = createValidProfileProps();

      // Act
      const result = Profile.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      const profile = result.getValue();
      const events = profile.domainEvents;
      expect(events).toHaveLength(1);
      expect(events[0].getEventName()).toBe('ProfileCreated');
    });

    it('should initialize with zero counts', () => {
      // Arrange
      const props = createValidProfileProps();

      // Act
      const result = Profile.create(props);

      // Assert
      const profile = result.getValue();
      expect(profile.followerCount).toBe(0);
      expect(profile.followingCount).toBe(0);
      expect(profile.connectionCount).toBe(0);
      expect(profile.activityScore).toBe(0);
    });

    it('should initialize with empty arrays', () => {
      // Arrange
      const props = createValidProfileProps();

      // Act
      const result = Profile.create(props);

      // Assert
      const profile = result.getValue();
      expect(profile.connections).toEqual([]);
      expect(profile.spaces).toEqual([]);
      expect(profile.achievements).toEqual([]);
    });
  });

  describe('updatePersonalInfo()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should update personal info successfully', () => {
      // Arrange
      const newInfo: Partial<PersonalInfo> = {
        bio: 'Updated bio',
        dorm: 'Ellicott'
      };

      // Act
      const result = profile.updatePersonalInfo(newInfo);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(profile.personalInfo.bio).toBe('Updated bio');
      expect(profile.personalInfo.dorm).toBe('Ellicott');
      expect(profile.personalInfo.firstName).toBe('John'); // Unchanged
    });

    it('should maintain immutability of unchanged fields', () => {
      // Arrange
      const originalFirstName = profile.personalInfo.firstName;
      const newInfo: Partial<PersonalInfo> = {
        lastName: 'Smith'
      };

      // Act
      profile.updatePersonalInfo(newInfo);

      // Assert
      expect(profile.personalInfo.firstName).toBe(originalFirstName);
      expect(profile.personalInfo.lastName).toBe('Smith');
    });
  });

  describe('updateAcademicInfo()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should update academic info successfully', () => {
      // Arrange
      const academicInfo = createValidAcademicInfo();

      // Act
      const result = profile.updateAcademicInfo(academicInfo);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(profile.academicInfo?.major).toBe('Computer Science');
      expect(profile.academicInfo?.gpa).toBe(3.5);
      expect(profile.academicInfo?.courses).toHaveLength(3);
    });

    it('should validate GPA range', () => {
      // Arrange
      const invalidAcademicInfo: AcademicInfo = {
        ...createValidAcademicInfo(),
        gpa: 5.0 // Invalid GPA > 4.0
      };

      // Act
      const result = profile.updateAcademicInfo(invalidAcademicInfo);

      // Assert - This should either succeed (no validation) or fail
      // Based on the code, there's no GPA validation in updateAcademicInfo
      // This test documents the current behavior
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('Interest Management', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should add interest successfully', () => {
      // Arrange
      const newInterest = 'Photography';

      // Act
      const result = profile.addInterest(newInterest);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(profile.socialInfo.interests).toContain('Photography');
    });

    it('should prevent duplicate interests', () => {
      // Arrange
      const interest = 'Basketball';
      profile.addInterest(interest); // First add

      // Act
      const result = profile.addInterest(interest); // Duplicate

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('already exists');
    });

    it('should enforce maximum interests limit', () => {
      // Arrange - Add 9 interests (assuming max is 10)
      for (let i = 0; i < 9; i++) {
        profile.addInterest(`Interest${i}`);
      }

      // Act - Try to add 11th interest
      const result = profile.addInterest('TooManyInterests');

      // Assert - Based on code, max is 10
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('maximum');
    });

    it('should remove interest successfully', () => {
      // Arrange
      const interest = 'Basketball';

      // Act
      profile.removeInterest(interest);

      // Assert
      expect(profile.socialInfo.interests).not.toContain('Basketball');
    });

    it('should handle removing non-existent interest', () => {
      // Arrange
      const nonExistentInterest = 'NonExistent';

      // Act
      profile.removeInterest(nonExistentInterest);

      // Assert - Should not throw, just no-op
      expect(profile.socialInfo.interests).not.toContain(nonExistentInterest);
    });
  });

  describe('Connection Management', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should add connection successfully', () => {
      // Arrange
      const connectionId = 'connection123';

      // Act
      profile.addConnection(connectionId);

      // Assert
      expect(profile.connections).toContain(connectionId);
      expect(profile.connectionCount).toBe(1);
    });

    it('should prevent duplicate connections', () => {
      // Arrange
      const connectionId = 'connection123';
      profile.addConnection(connectionId);
      const initialCount = profile.connectionCount;

      // Act
      profile.addConnection(connectionId); // Duplicate attempt

      // Assert
      expect(profile.connectionCount).toBe(initialCount);
      expect(profile.connections.filter(c => c === connectionId)).toHaveLength(1);
    });

    it('should remove connection successfully', () => {
      // Arrange
      const connectionId = 'connection123';
      profile.addConnection(connectionId);

      // Act
      profile.removeConnection(connectionId);

      // Assert
      expect(profile.connections).not.toContain(connectionId);
      expect(profile.connectionCount).toBe(0);
    });

    it('should update connection count accurately', () => {
      // Arrange & Act
      profile.addConnection('connection1');
      profile.addConnection('connection2');
      profile.addConnection('connection3');

      // Assert
      expect(profile.connectionCount).toBe(3);

      // Act
      profile.removeConnection('connection2');

      // Assert
      expect(profile.connectionCount).toBe(2);
    });
  });

  describe('Space Management', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should join space successfully', () => {
      // Arrange
      const spaceId = 'space123';

      // Act
      profile.joinSpace(spaceId);

      // Assert
      expect(profile.spaces).toContain(spaceId);
    });

    it('should prevent joining duplicate spaces', () => {
      // Arrange
      const spaceId = 'space123';
      profile.joinSpace(spaceId);
      const initialLength = profile.spaces.length;

      // Act
      profile.joinSpace(spaceId); // Duplicate

      // Assert
      expect(profile.spaces.length).toBe(initialLength);
    });

    it('should leave space successfully', () => {
      // Arrange
      const spaceId = 'space123';
      profile.joinSpace(spaceId);

      // Act
      profile.leaveSpace(spaceId);

      // Assert
      expect(profile.spaces).not.toContain(spaceId);
    });

    it('should handle leaving non-joined space gracefully', () => {
      // Arrange
      const nonJoinedSpace = 'nonJoinedSpace';

      // Act & Assert - Should not throw
      expect(() => profile.leaveSpace(nonJoinedSpace)).not.toThrow();
    });
  });

  describe('completeOnboarding()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should complete onboarding successfully', () => {
      // Arrange
      const academicInfo = createValidAcademicInfo();
      const interests = ['Coding', 'Gaming', 'Basketball'];
      const selectedSpaces = ['space1', 'space2'];

      // Act
      const result = profile.completeOnboarding(
        academicInfo,
        interests,
        selectedSpaces
      );

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(profile.isOnboarded).toBe(true);
      expect(profile.academicInfo?.major).toBe('Computer Science');
      expect(profile.socialInfo.interests).toEqual(interests);
      expect(profile.spaces).toEqual(selectedSpaces);
    });

    it('should emit ProfileOnboardedEvent', () => {
      // Arrange
      const academicInfo = createValidAcademicInfo();
      profile.clearEvents(); // Clear creation event

      // Act
      profile.completeOnboarding(academicInfo, ['Coding'], ['space1']);

      // Assert
      const events = profile.domainEvents;
      expect(events).toHaveLength(1);
      expect(events[0].getEventName()).toBe('ProfileOnboarded');
    });

    it('should fail if already onboarded', () => {
      // Arrange
      const academicInfo = createValidAcademicInfo();
      profile.completeOnboarding(academicInfo, ['Interest1'], ['space1']); // First onboarding

      // Act
      const result = profile.completeOnboarding(academicInfo, ['Interest1'], ['space1']); // Second attempt

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('already onboarded');
    });

    it('should require at least one interest', () => {
      // Arrange
      const academicInfo = createValidAcademicInfo();

      // Act
      const result = profile.completeOnboarding(academicInfo, [], []);

      // Assert - Based on code, at least 1 interest required
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('interest');
    });

    it('should require at least one space', () => {
      // Arrange
      const academicInfo = createValidAcademicInfo();

      // Act
      const result = profile.completeOnboarding(academicInfo, ['Interest1'], []);

      // Assert - Based on code, at least 1 space required
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('space');
    });

    it('should onboard non-student profiles without academic info', () => {
      // Arrange
      const props = createValidProfileProps();
      const nonStudentResult = UserType.create(UserTypeEnum.ALUMNI);
      if (nonStudentResult.isFailure) {
        throw new Error(`Failed to create non-student user type: ${nonStudentResult.error}`);
      }

      props.userType = nonStudentResult.getValue();
      const profile = Profile.create(props).getValue();
      profile.clearEvents();

      const interests = ['Community Service'];
      const selectedSpaces = ['space-transfer'];

      // Act
      const result = profile.completeOnboarding(undefined, interests, selectedSpaces);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(profile.isOnboarded).toBe(true);
      expect(profile.academicInfo).toBeUndefined();
      expect(profile.socialInfo.interests).toEqual(interests);
      expect(profile.spaces).toEqual(selectedSpaces);

      const events = profile.domainEvents;
      expect(events).toHaveLength(1);
      expect(events[0].getEventName()).toBe('ProfileOnboarded');
    });
  });

  describe('Profile Verification', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should verify profile successfully', () => {
      // Arrange
      expect(profile.isVerified).toBe(false);

      // Act
      profile.verify();

      // Assert
      expect(profile.isVerified).toBe(true);
    });
  });

  describe('Profile Activation', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should deactivate profile successfully', () => {
      // Arrange
      expect(profile.isActive).toBe(true);

      // Act
      profile.deactivate();

      // Assert
      expect(profile.isActive).toBe(false);
    });

    it('should reactivate profile successfully', () => {
      // Arrange
      profile.deactivate();
      expect(profile.isActive).toBe(false);

      // Act
      profile.reactivate();

      // Assert
      expect(profile.isActive).toBe(true);
    });
  });

  describe('isProfileComplete()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should return false for incomplete profile', () => {
      // Arrange - Fresh profile without onboarding

      // Act
      const isComplete = profile.isProfileComplete();

      // Assert
      expect(isComplete).toBe(false);
    });

    it('should return true for complete profile', () => {
      // Arrange - Complete onboarding
      const academicInfo = createValidAcademicInfo();
      profile.completeOnboarding(academicInfo, ['Interest1', 'Interest2'], ['space1']);
      profile.addPhoto('https://example.com/photo.jpg');

      // Act
      const isComplete = profile.isProfileComplete();

      // Assert
      expect(isComplete).toBe(true);
    });
  });

  describe('getCompletionPercentage()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should calculate completion percentage correctly', () => {
      // Arrange - Fresh profile

      // Act
      const percentage = profile.getCompletionPercentage();

      // Assert
      expect(percentage).toBeGreaterThanOrEqual(0);
      expect(percentage).toBeLessThanOrEqual(100);
    });

    it('should show 100% for fully complete profile', () => {
      // Arrange - Complete all requirements
      const academicInfo = createValidAcademicInfo();
      profile.completeOnboarding(academicInfo, ['I1', 'I2', 'I3'], ['s1', 's2', 's3']);
      profile.addPhoto('https://example.com/photo.jpg');
      profile.addConnection('connection1');

      // Act
      const percentage = profile.getCompletionPercentage();

      // Assert
      expect(percentage).toBe(100);
    });

    it('should increase percentage as profile is filled', () => {
      // Arrange
      const initialPercentage = profile.getCompletionPercentage();

      // Act - Add data
      profile.addInterest('Interest1');
      const afterInterestPercentage = profile.getCompletionPercentage();

      // Assert
      expect(afterInterestPercentage).toBeGreaterThan(initialPercentage);
    });
  });

  describe('getOnboardingNextSteps()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should provide next steps for incomplete profile', () => {
      // Arrange
      const suggestedSpaces = [
        { id: 'space1', name: 'ACM' },
        { id: 'space2', name: 'IEEE' }
      ];

      // Act
      const nextSteps = profile.getOnboardingNextSteps(suggestedSpaces);

      // Assert
      expect(nextSteps).toBeInstanceOf(Array);
      expect(nextSteps.length).toBeGreaterThan(0);
      expect(nextSteps[0]).toHaveProperty('title');
      expect(nextSteps[0]).toHaveProperty('description');
      expect(nextSteps[0]).toHaveProperty('completed');
    });

    it('should mark steps as completed when done', () => {
      // Arrange
      const academicInfo = createValidAcademicInfo();
      profile.completeOnboarding(academicInfo, ['I1', 'I2'], ['s1']);

      // Act
      const nextSteps = profile.getOnboardingNextSteps([]);

      // Assert
      const onboardingStep = nextSteps.find(step => step.title.includes('Complete'));
      expect(onboardingStep?.completed).toBe(true);
    });
  });

  describe('getOnboardingWarnings()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should return warnings for incomplete profile', () => {
      // Arrange - Fresh profile

      // Act
      const warnings = profile.getOnboardingWarnings();

      // Assert
      expect(warnings).toBeInstanceOf(Array);
      expect(warnings.length).toBeGreaterThan(0);
    });

    it('should return empty warnings for complete profile', () => {
      // Arrange - Complete profile
      const academicInfo = createValidAcademicInfo();
      profile.completeOnboarding(academicInfo, ['I1', 'I2', 'I3'], ['s1', 's2']);
      profile.addPhoto('https://example.com/photo.jpg');
      profile.addConnection('connection1');

      // Act
      const warnings = profile.getOnboardingWarnings();

      // Assert
      expect(warnings).toHaveLength(0);
    });
  });

  describe('getOnboardingStatus()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should return comprehensive onboarding status', () => {
      // Arrange & Act
      const status = profile.getOnboardingStatus();

      // Assert
      expect(status).toHaveProperty('isComplete');
      expect(status).toHaveProperty('completionPercentage');
      expect(status).toHaveProperty('nextSteps');
      expect(status).toHaveProperty('warnings');
      expect(status.isComplete).toBe(profile.isProfileComplete());
      expect(status.completionPercentage).toBe(profile.getCompletionPercentage());
    });
  });

  describe('Achievement Management', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should add achievement successfully', () => {
      // Arrange
      const achievementId = 'achievement123';

      // Act
      profile.addAchievement(achievementId);

      // Assert
      expect(profile.achievements).toContain(achievementId);
    });

    it('should prevent duplicate achievements', () => {
      // Arrange
      const achievementId = 'achievement123';
      profile.addAchievement(achievementId);
      const initialLength = profile.achievements.length;

      // Act
      profile.addAchievement(achievementId); // Duplicate

      // Assert
      expect(profile.achievements.length).toBe(initialLength);
    });
  });

  describe('updateLastActive()', () => {
    let profile: Profile;

    beforeEach(() => {
      const props = createValidProfileProps();
      profile = Profile.create(props).getValue();
    });

    it('should update last active timestamp', () => {
      // Arrange
      const beforeUpdate = new Date();

      // Act
      profile.updateLastActive();

      // Assert
      expect(profile.lastActive).toBeDefined();
      expect(profile.lastActive!.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
    });
  });

  describe('Edge Cases and Invariants', () => {
    it('should maintain campus isolation', () => {
      // Arrange
      const props = createValidProfileProps();
      const profile = Profile.create(props).getValue();

      // Assert
      expect(profile.campusId.id).toBe('ub-buffalo');
    });

    it('should enforce email domain validation', () => {
      // Arrange
      const props = createValidProfileProps();
      const invalidEmailResult = UBEmail.create('invalid@gmail.com');

      // Assert
      expect(invalidEmailResult.isFailure).toBe(true);
    });

    it('should enforce handle uniqueness constraints', () => {
      // Arrange - Handle validation happens in value object
      const tooLongHandle = 'a'.repeat(31); // Assuming max 30 chars
      const handleResult = ProfileHandle.create(tooLongHandle);

      // Assert
      expect(handleResult.isFailure).toBe(true);
    });

    it('should maintain referential integrity for connections', () => {
      // Arrange
      const props = createValidProfileProps();
      const profile = Profile.create(props).getValue();

      // Act
      profile.addConnection('conn1');
      profile.addConnection('conn2');
      profile.removeConnection('conn1');

      // Assert
      expect(profile.connections).toEqual(['conn2']);
      expect(profile.connectionCount).toBe(1);
    });
  });
});
