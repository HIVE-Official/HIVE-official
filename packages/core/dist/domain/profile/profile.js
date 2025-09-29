"use strict";
/**
 * Profile Aggregate - Student Identity Domain
 * Based on SPEC.md onboarding flow and profile requirements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const value_objects_1 = require("./value-objects");
/**
 * Profile Aggregate Root
 * Represents a student's identity and campus presence
 */
class Profile {
    constructor(data) {
        this.data = data;
    }
    // Getters for accessing profile data
    get id() {
        return this.data.id;
    }
    get email() {
        return this.data.email;
    }
    get handle() {
        return this.data.handle;
    }
    get fullName() {
        return `${this.data.personalInfo.firstName} ${this.data.personalInfo.lastName}`;
    }
    get firstName() {
        return this.data.personalInfo.firstName;
    }
    get lastName() {
        return this.data.personalInfo.lastName;
    }
    get bio() {
        return this.data.personalInfo.bio || '';
    }
    get major() {
        return this.data.personalInfo.major || '';
    }
    get graduationYear() {
        return this.data.personalInfo.graduationYear;
    }
    get isVerified() {
        return this.data.isVerified ?? false;
    }
    get isActive() {
        return this.data.isActive ?? true;
    }
    set isActive(active) {
        this.data.isActive = active;
        this.data.updatedAt = new Date();
    }
    get photos() {
        return [...this.data.photos];
    }
    get interests() {
        return [...this.data.interests];
    }
    get connections() {
        return [...this.data.connections];
    }
    get isOnboarded() {
        return this.data.isOnboarded;
    }
    get createdAt() {
        return this.data.createdAt;
    }
    // Factory method to create new profile
    static create(props) {
        // Validate email
        const emailResult = value_objects_1.UBEmail.create(props.email);
        if (emailResult.isFailure) {
            return value_objects_1.Result.fail(emailResult.error);
        }
        // Validate handle
        const handleResult = value_objects_1.Handle.create(props.handle);
        if (handleResult.isFailure) {
            return value_objects_1.Result.fail(handleResult.error);
        }
        // Validate names
        if (!props.firstName || props.firstName.trim().length === 0) {
            return value_objects_1.Result.fail('First name is required');
        }
        if (!props.lastName || props.lastName.trim().length === 0) {
            return value_objects_1.Result.fail('Last name is required');
        }
        const now = new Date();
        const profile = new Profile({
            id: value_objects_1.ProfileId.generate(),
            email: emailResult.getValue(),
            handle: handleResult.getValue(),
            personalInfo: {
                firstName: props.firstName.trim(),
                lastName: props.lastName.trim(),
            },
            photos: [],
            interests: [],
            connections: [],
            isOnboarded: false,
            isActive: true,
            createdAt: now,
            updatedAt: now,
        });
        return value_objects_1.Result.ok(profile);
    }
    // Update personal information
    updatePersonalInfo(info) {
        if (info.bio && info.bio.length > 500) {
            return value_objects_1.Result.fail('Bio cannot exceed 500 characters');
        }
        if (info.graduationYear) {
            const yearResult = value_objects_1.GraduationYear.create(info.graduationYear);
            if (yearResult.isFailure) {
                return value_objects_1.Result.fail(yearResult.error);
            }
        }
        // Update personal info
        this.data.personalInfo = {
            ...this.data.personalInfo,
            ...info,
        };
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Add photo to profile
    addPhoto(photoUrl) {
        // Validate photo URL
        const photoResult = value_objects_1.PhotoUrl.create(photoUrl);
        if (photoResult.isFailure) {
            return value_objects_1.Result.fail(photoResult.error);
        }
        // SPEC.md: Maximum 5 photos per profile
        if (this.data.photos.length >= 5) {
            return value_objects_1.Result.fail('Cannot add more than 5 photos');
        }
        this.data.photos.push(photoResult.getValue());
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Remove photo
    removePhoto(photoUrl) {
        const index = this.data.photos.findIndex(photo => photo.url === photoUrl);
        if (index === -1) {
            return value_objects_1.Result.fail('Photo not found');
        }
        this.data.photos.splice(index, 1);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Update interests
    updateInterests(interests) {
        // Validate interests
        const validInterests = interests
            .filter(interest => interest.trim().length > 0)
            .map(interest => interest.trim())
            .slice(0, 20); // Max 20 interests
        this.data.interests = validInterests;
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Add connection
    addConnection(profileId) {
        // Don't connect to self
        if (this.data.id.equals(profileId)) {
            return value_objects_1.Result.fail('Cannot connect to yourself');
        }
        // Check if already connected
        if (this.data.connections.some(conn => conn.equals(profileId))) {
            return value_objects_1.Result.fail('Already connected');
        }
        this.data.connections.push(profileId);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Remove connection
    removeConnection(profileId) {
        const index = this.data.connections.findIndex(conn => conn.equals(profileId));
        if (index === -1) {
            return value_objects_1.Result.fail('Connection not found');
        }
        this.data.connections.splice(index, 1);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Complete onboarding process
    completeOnboarding() {
        // SPEC.md onboarding requirements
        if (!this.data.personalInfo.major) {
            return value_objects_1.Result.fail('Major is required to complete onboarding');
        }
        if (this.data.interests.length === 0) {
            return value_objects_1.Result.fail('At least one interest is required');
        }
        if (this.data.photos.length === 0) {
            return value_objects_1.Result.fail('Profile photo is required');
        }
        this.data.isOnboarded = true;
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Check if profile is complete enough for specific actions
    canJoinSpaces() {
        return this.data.isOnboarded;
    }
    canCreatePosts() {
        return this.data.isOnboarded;
    }
    // Convert to plain object for persistence
    toData() {
        return {
            ...this.data,
            photos: [...this.data.photos],
            interests: [...this.data.interests],
            connections: [...this.data.connections],
        };
    }
    // Recreate from persistence data
    static fromData(data) {
        return new Profile(data);
    }
}
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map