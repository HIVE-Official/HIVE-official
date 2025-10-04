"use strict";
/**
 * Profile Aggregate
 * Represents a campus profile with full features
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const AggregateRoot_base_1 = require("../../shared/base/AggregateRoot.base");
const Result_1 = require("../../shared/base/Result");
const campus_id_value_1 = require("../value-objects/campus-id.value");
const user_type_value_1 = require("../value-objects/user-type.value");
const profile_privacy_value_1 = require("../value-objects/profile-privacy.value");
const profile_created_event_1 = require("../events/profile-created.event");
const profile_onboarded_event_1 = require("../events/profile-onboarded.event");
class Profile extends AggregateRoot_base_1.AggregateRoot {
    get profileId() {
        return this.props.profileId;
    }
    get email() {
        return this.props.email;
    }
    get handle() {
        return this.props.handle;
    }
    get userType() {
        return this.props.userType;
    }
    get campusId() {
        return this.props.campusId;
    }
    get isOnboarded() {
        return this.props.isOnboarded;
    }
    get isVerified() {
        return this.props.isVerified;
    }
    get displayName() {
        const { firstName, lastName } = this.props.personalInfo;
        return `${firstName} ${lastName}`.trim() || this.props.handle.value;
    }
    get connections() {
        return this.props.connections;
    }
    get activityScore() {
        return this.props.activityScore;
    }
    get followerCount() {
        return this.props.followerCount;
    }
    get followingCount() {
        return this.props.followingCount;
    }
    get connectionCount() {
        return this.props.connectionCount;
    }
    get spaces() {
        return this.props.spaces;
    }
    get personalInfo() {
        return this.props.personalInfo;
    }
    get interests() {
        return this.props.socialInfo.interests;
    }
    get academicInfo() {
        return this.props.academicInfo;
    }
    get socialInfo() {
        return this.props.socialInfo;
    }
    get privacy() {
        return this.props.privacy;
    }
    get isActive() {
        return this.props.isActive;
    }
    get lastActive() {
        return this.props.lastActive;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    // Individual property accessors for repository layer compatibility
    get bio() {
        return this.props.personalInfo.bio;
    }
    get major() {
        return this.props.academicInfo?.major || this.props.personalInfo.major;
    }
    get graduationYear() {
        return this.props.academicInfo?.graduationYear || this.props.personalInfo.graduationYear;
    }
    get firstName() {
        return this.props.personalInfo.firstName;
    }
    get lastName() {
        return this.props.personalInfo.lastName;
    }
    get username() {
        return this.props.handle.value;
    }
    get photos() {
        const photos = [];
        if (this.props.personalInfo.profilePhoto) {
            photos.push(this.props.personalInfo.profilePhoto);
        }
        if (this.props.personalInfo.coverPhoto) {
            photos.push(this.props.personalInfo.coverPhoto);
        }
        return photos;
    }
    get badges() {
        return this.props.achievements;
    }
    get blockedUsers() {
        // Implement blocked users logic - for now return empty array
        return [];
    }
    get lastSeen() {
        return this.props.lastActive;
    }
    get onboardingCompleted() {
        return this.props.isOnboarded;
    }
    // Temporary setters for repository layer - should be removed once proper construction is implemented
    setIsVerified(isVerified) {
        this.props.isVerified = isVerified;
    }
    setActivityScore(score) {
        this.props.activityScore = score;
    }
    setInterests(interests) {
        this.props.socialInfo = { ...this.props.socialInfo, interests };
    }
    setPrivacy(privacy) {
        this.props.privacy = privacy;
    }
    constructor(props, id) {
        super(props, id || `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        const defaultUserType = user_type_value_1.UserType.createStudent().getValue();
        const defaultCampusId = campus_id_value_1.CampusId.createUBBuffalo().getValue();
        const defaultPrivacy = profile_privacy_value_1.ProfilePrivacy.createDefault().getValue();
        const defaultSocialInfo = {
            interests: [],
            clubs: [],
            sports: [],
            ...props.socialInfo
        };
        const profileProps = {
            profileId: props.profileId,
            email: props.email,
            handle: props.handle,
            userType: props.userType || defaultUserType,
            campusId: props.campusId || defaultCampusId,
            personalInfo: props.personalInfo,
            academicInfo: props.academicInfo,
            socialInfo: defaultSocialInfo,
            privacy: props.privacy || defaultPrivacy,
            connections: [],
            spaces: [],
            achievements: [],
            isOnboarded: false,
            isVerified: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            activityScore: 0,
            followerCount: 0,
            followingCount: 0,
            connectionCount: 0
        };
        const profile = new Profile(profileProps, id);
        // Fire domain event
        profile.addDomainEvent(new profile_created_event_1.ProfileCreatedEvent(profile.id, props.email.value, props.handle.value));
        return Result_1.Result.ok(profile);
    }
    updatePersonalInfo(info) {
        this.props.personalInfo = { ...this.props.personalInfo, ...info };
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    updateAcademicInfo(info) {
        this.props.academicInfo = info;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    updateSocialInfo(info) {
        this.props.socialInfo = { ...this.props.socialInfo, ...info };
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    updatePrivacy(privacy) {
        this.props.privacy = privacy;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    addInterest(interest) {
        if (this.props.socialInfo.interests.includes(interest)) {
            return Result_1.Result.fail('Interest already exists');
        }
        if (this.props.socialInfo.interests.length >= 10) {
            return Result_1.Result.fail('Maximum of 10 interests allowed');
        }
        this.props.socialInfo.interests.push(interest);
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    removeInterest(interest) {
        this.props.socialInfo.interests = this.props.socialInfo.interests.filter(i => i !== interest);
        this.props.updatedAt = new Date();
    }
    addConnection(connectionId) {
        if (!this.props.connections.includes(connectionId)) {
            this.props.connections.push(connectionId);
            this.props.updatedAt = new Date();
        }
    }
    removeConnection(connectionId) {
        this.props.connections = this.props.connections.filter(id => id !== connectionId);
        this.props.updatedAt = new Date();
    }
    joinSpace(spaceId) {
        if (!this.props.spaces.includes(spaceId)) {
            this.props.spaces.push(spaceId);
            this.props.updatedAt = new Date();
        }
    }
    leaveSpace(spaceId) {
        this.props.spaces = this.props.spaces.filter(id => id !== spaceId);
        this.props.updatedAt = new Date();
    }
    addAchievement(achievementId) {
        if (!this.props.achievements.includes(achievementId)) {
            this.props.achievements.push(achievementId);
            this.props.updatedAt = new Date();
        }
    }
    async addPhoto(photoUrl) {
        if (!photoUrl || photoUrl.trim().length === 0) {
            return Result_1.Result.fail('Photo URL cannot be empty');
        }
        this.props.personalInfo.profilePhoto = photoUrl;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    completeOnboarding(personalInfo, interests) {
        if (this.props.isOnboarded) {
            return Result_1.Result.fail('Profile is already onboarded');
        }
        // Update personal info if provided
        if (personalInfo) {
            this.props.personalInfo = { ...this.props.personalInfo, ...personalInfo };
        }
        // Update interests if provided
        if (interests) {
            this.props.socialInfo.interests = interests;
        }
        // Validate required fields
        if (!this.props.personalInfo.firstName || !this.props.personalInfo.lastName) {
            return Result_1.Result.fail('First and last name are required for onboarding');
        }
        if (this.props.userType.isStudent() && !this.props.academicInfo) {
            return Result_1.Result.fail('Academic information is required for students');
        }
        this.props.isOnboarded = true;
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new profile_onboarded_event_1.ProfileOnboardedEvent(this.id));
        return Result_1.Result.ok();
    }
    verify() {
        this.props.isVerified = true;
        this.props.updatedAt = new Date();
    }
    deactivate() {
        this.props.isActive = false;
        this.props.updatedAt = new Date();
    }
    reactivate() {
        this.props.isActive = true;
        this.props.updatedAt = new Date();
    }
    updateLastActive() {
        this.props.lastActive = new Date();
    }
    isProfileComplete() {
        const { personalInfo, academicInfo, socialInfo } = this.props;
        // Basic info required
        if (!personalInfo.firstName || !personalInfo.lastName)
            return false;
        if (!personalInfo.bio)
            return false;
        // Students need academic info
        if (this.props.userType.isStudent() && !academicInfo)
            return false;
        // Social info minimum
        if (socialInfo.interests.length === 0)
            return false;
        return true;
    }
    getCompletionPercentage() {
        let completed = 0;
        let total = 0;
        // Personal Info (40%)
        total += 4;
        if (this.props.personalInfo.firstName)
            completed++;
        if (this.props.personalInfo.lastName)
            completed++;
        if (this.props.personalInfo.bio)
            completed++;
        if (this.props.personalInfo.profilePhoto)
            completed++;
        // Academic Info (30%) - only for students
        if (this.props.userType.isStudent()) {
            total += 3;
            if (this.props.academicInfo?.major)
                completed++;
            if (this.props.academicInfo?.graduationYear)
                completed++;
            if (this.props.academicInfo?.courses.length)
                completed++;
        }
        // Social Info (30%)
        total += 3;
        if (this.props.socialInfo.interests.length > 0)
            completed++;
        if (this.props.socialInfo.clubs.length > 0)
            completed++;
        if (this.props.socialInfo.instagram || this.props.socialInfo.snapchat)
            completed++;
        return Math.round((completed / total) * 100);
    }
    /**
     * Onboarding Business Logic (Moved from ProfileOnboardingService)
     */
    getOnboardingNextSteps(suggestedSpaces) {
        const steps = [];
        // Priority 1: Profile photo
        if (!this.props.personalInfo.profilePhoto) {
            steps.push({
                action: 'add_profile_photo',
                description: 'Add a profile photo to help others recognize you',
                priority: 1
            });
        }
        // Priority 2: Interests
        if (this.props.socialInfo.interests.length < 3) {
            steps.push({
                action: 'add_interests',
                description: 'Add more interests to get better space recommendations',
                priority: 2
            });
        }
        // Priority 3: Join spaces
        if (suggestedSpaces.length > 0) {
            steps.push({
                action: 'join_spaces',
                description: `Join spaces like "${suggestedSpaces[0].name}" to connect with others`,
                priority: 3
            });
        }
        // Priority 4: Explore feed
        steps.push({
            action: 'explore_feed',
            description: 'Check out your personalized feed to see what\'s happening on campus',
            priority: 4
        });
        // Priority 5: Connect with others
        steps.push({
            action: 'connect_with_others',
            description: 'Find and connect with classmates in your major',
            priority: 5
        });
        return steps.sort((a, b) => a.priority - b.priority);
    }
    getOnboardingWarnings() {
        const warnings = [];
        if (!this.props.personalInfo.bio) {
            warnings.push('Adding a bio helps others learn more about you');
        }
        if (!this.props.personalInfo.major && !this.props.academicInfo?.major) {
            warnings.push('Adding your major helps you find relevant study groups');
        }
        if (this.props.socialInfo.interests.length === 0) {
            warnings.push('Adding interests improves your feed and space recommendations');
        }
        return warnings;
    }
    getOnboardingStatus() {
        const requiredSteps = [
            'email_verified',
            'handle_set',
            'basic_info',
            'interests_selected',
            'profile_photo',
            'first_space_joined'
        ];
        const completedSteps = [];
        if (this.props.email)
            completedSteps.push('email_verified');
        if (this.props.handle)
            completedSteps.push('handle_set');
        if (this.props.personalInfo.firstName && this.props.personalInfo.lastName) {
            completedSteps.push('basic_info');
        }
        if (this.props.socialInfo.interests.length > 0)
            completedSteps.push('interests_selected');
        if (this.props.personalInfo.profilePhoto)
            completedSteps.push('profile_photo');
        if (this.props.spaces.length > 0)
            completedSteps.push('first_space_joined');
        const remainingSteps = requiredSteps.filter(step => !completedSteps.includes(step));
        const percentComplete = Math.round((completedSteps.length / requiredSteps.length) * 100);
        return {
            isComplete: this.props.isOnboarded,
            completedSteps,
            remainingSteps,
            percentComplete
        };
    }
    toData() {
        return this.toDTO();
    }
    toDTO() {
        return {
            id: this.props.profileId.value,
            email: this.props.email.value,
            handle: this.props.handle.value,
            personalInfo: this.props.personalInfo,
            academicInfo: this.props.academicInfo,
            socialInfo: this.props.socialInfo,
            interests: this.props.socialInfo.interests,
            connections: this.props.connections,
            spaces: this.props.spaces,
            achievements: this.props.achievements,
            isOnboarded: this.props.isOnboarded,
            isVerified: this.props.isVerified,
            isActive: this.props.isActive,
            lastActive: this.props.lastActive,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            displayName: this.displayName,
            completionPercentage: this.getCompletionPercentage()
        };
    }
}
exports.Profile = Profile;
//# sourceMappingURL=profile.aggregate.js.map