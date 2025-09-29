"use strict";
/**
 * Profile Domain Tests
 * Simple tests to validate business rules work correctly
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_1 = require("../profile");
(0, vitest_1.describe)('Profile Domain', () => {
    (0, vitest_1.describe)('Profile Creation', () => {
        (0, vitest_1.it)('should create a valid profile with UB email', () => {
            const result = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const profile = result.getValue();
            (0, vitest_1.expect)(profile.email.email).toBe('student@buffalo.edu');
            (0, vitest_1.expect)(profile.handle.username).toBe('johndoe123');
            (0, vitest_1.expect)(profile.fullName).toBe('John Doe');
            (0, vitest_1.expect)(profile.isOnboarded).toBe(false);
        });
        (0, vitest_1.it)('should reject non-UB emails', () => {
            const result = profile_1.Profile.create({
                email: 'student@gmail.com',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('@buffalo.edu');
        });
        (0, vitest_1.it)('should reject invalid handles', () => {
            const result = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'ab' // Too short
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('3-20 characters');
        });
        (0, vitest_1.it)('should require first and last name', () => {
            const result = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: '',
                lastName: 'Doe',
                handle: 'johndoe123'
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('First name is required');
        });
    });
    (0, vitest_1.describe)('Personal Info Updates', () => {
        let profile;
        beforeEach(() => {
            const result = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            });
            profile = result.getValue();
        });
        (0, vitest_1.it)('should update bio', () => {
            const result = profile.updatePersonalInfo({
                bio: 'CS major, loves coding'
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.bio).toBe('CS major, loves coding');
        });
        (0, vitest_1.it)('should reject bio longer than 500 characters', () => {
            const longBio = 'a'.repeat(501);
            const result = profile.updatePersonalInfo({
                bio: longBio
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('500 characters');
        });
        (0, vitest_1.it)('should update major and graduation year', () => {
            const result = profile.updatePersonalInfo({
                major: 'Computer Science',
                graduationYear: 2026
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.major).toBe('Computer Science');
            (0, vitest_1.expect)(profile.graduationYear).toBe(2026);
        });
    });
    (0, vitest_1.describe)('Photo Management', () => {
        let profile;
        beforeEach(() => {
            const result = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            });
            profile = result.getValue();
        });
        (0, vitest_1.it)('should add valid photo', () => {
            const result = profile.addPhoto('https://example.com/photo.jpg');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.photos).toHaveLength(1);
        });
        (0, vitest_1.it)('should reject more than 5 photos', () => {
            // Add 5 photos
            for (let i = 0; i < 5; i++) {
                profile.addPhoto(`https://example.com/photo${i}.jpg`);
            }
            // Try to add 6th photo
            const result = profile.addPhoto('https://example.com/photo6.jpg');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('5 photos');
        });
        (0, vitest_1.it)('should remove photo', () => {
            const photoUrl = 'https://example.com/photo.jpg';
            profile.addPhoto(photoUrl);
            const result = profile.removePhoto(photoUrl);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.photos).toHaveLength(0);
        });
    });
    (0, vitest_1.describe)('Interests Management', () => {
        let profile;
        beforeEach(() => {
            const result = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            });
            profile = result.getValue();
        });
        (0, vitest_1.it)('should update interests', () => {
            const result = profile.updateInterests(['coding', 'gaming', 'music']);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.interests).toEqual(['coding', 'gaming', 'music']);
        });
        (0, vitest_1.it)('should filter out empty interests', () => {
            profile.updateInterests(['coding', '', '  ', 'gaming']);
            (0, vitest_1.expect)(profile.interests).toEqual(['coding', 'gaming']);
        });
        (0, vitest_1.it)('should limit to 20 interests', () => {
            const tooManyInterests = Array(25).fill(0).map((_, i) => `interest${i}`);
            profile.updateInterests(tooManyInterests);
            (0, vitest_1.expect)(profile.interests).toHaveLength(20);
        });
    });
    (0, vitest_1.describe)('Connections', () => {
        let profile1;
        let profile2;
        beforeEach(() => {
            profile1 = profile_1.Profile.create({
                email: 'student1@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            }).getValue();
            profile2 = profile_1.Profile.create({
                email: 'student2@buffalo.edu',
                firstName: 'Jane',
                lastName: 'Smith',
                handle: 'janesmith456'
            }).getValue();
        });
        (0, vitest_1.it)('should add connection', () => {
            const result = profile1.addConnection(profile2.id);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile1.connections).toHaveLength(1);
        });
        (0, vitest_1.it)('should reject self-connection', () => {
            const result = profile1.addConnection(profile1.id);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('yourself');
        });
        (0, vitest_1.it)('should reject duplicate connections', () => {
            profile1.addConnection(profile2.id);
            const result = profile1.addConnection(profile2.id);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Already connected');
        });
    });
    (0, vitest_1.describe)('Onboarding', () => {
        let profile;
        beforeEach(() => {
            profile = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            }).getValue();
        });
        (0, vitest_1.it)('should complete onboarding with all requirements', () => {
            // Set up requirements
            profile.updatePersonalInfo({ major: 'Computer Science' });
            profile.updateInterests(['coding']);
            profile.addPhoto('https://example.com/photo.jpg');
            const result = profile.completeOnboarding();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(profile.isOnboarded).toBe(true);
        });
        (0, vitest_1.it)('should require major for onboarding', () => {
            profile.updateInterests(['coding']);
            profile.addPhoto('https://example.com/photo.jpg');
            const result = profile.completeOnboarding();
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Major is required');
        });
        (0, vitest_1.it)('should require interests for onboarding', () => {
            profile.updatePersonalInfo({ major: 'Computer Science' });
            profile.addPhoto('https://example.com/photo.jpg');
            const result = profile.completeOnboarding();
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('interest is required');
        });
        (0, vitest_1.it)('should require photo for onboarding', () => {
            profile.updatePersonalInfo({ major: 'Computer Science' });
            profile.updateInterests(['coding']);
            const result = profile.completeOnboarding();
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('photo is required');
        });
    });
    (0, vitest_1.describe)('Profile Permissions', () => {
        let profile;
        beforeEach(() => {
            profile = profile_1.Profile.create({
                email: 'student@buffalo.edu',
                firstName: 'John',
                lastName: 'Doe',
                handle: 'johndoe123'
            }).getValue();
        });
        (0, vitest_1.it)('should not allow joining spaces before onboarding', () => {
            (0, vitest_1.expect)(profile.canJoinSpaces()).toBe(false);
        });
        (0, vitest_1.it)('should not allow creating posts before onboarding', () => {
            (0, vitest_1.expect)(profile.canCreatePosts()).toBe(false);
        });
        (0, vitest_1.it)('should allow actions after onboarding', () => {
            // Complete onboarding
            profile.updatePersonalInfo({ major: 'Computer Science' });
            profile.updateInterests(['coding']);
            profile.addPhoto('https://example.com/photo.jpg');
            profile.completeOnboarding();
            (0, vitest_1.expect)(profile.canJoinSpaces()).toBe(true);
            (0, vitest_1.expect)(profile.canCreatePosts()).toBe(true);
        });
    });
});
//# sourceMappingURL=profile.test.js.map