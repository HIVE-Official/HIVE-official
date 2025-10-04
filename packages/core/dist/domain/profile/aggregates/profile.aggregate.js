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
    get achievements() {
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
        profile.addDomainEvent(new profile_created_event_1.ProfileCreatedEvent(profile.id, props.handle.value, props.email.value, profileProps.campusId.value));
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
            return Result_1.Result.fail('maximum of 10 interests allowed');
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
            this.props.connectionCount = this.props.connections.length;
            this.props.updatedAt = new Date();
        }
    }
    removeConnection(connectionId) {
        this.props.connections = this.props.connections.filter(id => id !== connectionId);
        this.props.connectionCount = this.props.connections.length;
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
    completeOnboarding(academicInfo, interests, selectedSpaces) {
        // Check if already onboarded FIRST (for proper error messaging)
        if (this.props.isOnboarded) {
            return Result_1.Result.fail('Profile is already onboarded');
        }
        // Validate required fields
        if (!academicInfo) {
            return Result_1.Result.fail('Academic information is required for students');
        }
        // Update academic info
        this.props.academicInfo = academicInfo;
        // Update interests if provided and non-empty
        if (interests && interests.length > 0) {
            this.props.socialInfo.interests = interests;
        }
        // Add spaces if provided and non-empty
        if (selectedSpaces && selectedSpaces.length > 0) {
            selectedSpaces.forEach(spaceId => this.joinSpace(spaceId));
        }
        this.props.isOnboarded = true;
        this.props.updatedAt = new Date();
        // Fire domain event
        this.addDomainEvent(new profile_onboarded_event_1.ProfileOnboardedEvent(this.id, this.props.campusId.value, this.props.socialInfo.interests));
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
        // Must be in at least one space
        if (this.props.spaces.length === 0)
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
        // Social Info (30%) - Granular calculation with progressive scoring
        total += 3;
        // Interests: 0 = 0, 1 = 0.33, 2 = 0.66, 3+ = 1.0
        const interestCount = this.props.socialInfo.interests.length;
        if (interestCount >= 3) {
            completed++;
        }
        else {
            completed += interestCount / 3;
        }
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
        // Complete onboarding step
        steps.push({
            title: 'Complete onboarding',
            description: 'Finish setting up your profile with academic info, interests, and join spaces',
            completed: this.props.isOnboarded
        });
        // Profile photo step
        steps.push({
            title: 'Add profile photo',
            description: 'Add a profile photo to help others recognize you',
            completed: !!this.props.personalInfo.profilePhoto
        });
        // Interests step
        steps.push({
            title: 'Add interests',
            description: 'Add interests to get better space recommendations',
            completed: this.props.socialInfo.interests.length >= 3
        });
        // Join spaces step
        if (suggestedSpaces.length > 0) {
            steps.push({
                title: 'Join spaces',
                description: `Join spaces like "${suggestedSpaces[0].name}" to connect with others`,
                completed: this.props.spaces.length > 0
            });
        }
        // Explore feed step
        steps.push({
            title: 'Explore feed',
            description: 'Check out your personalized feed to see what\'s happening on campus',
            completed: false // Always show as incomplete for exploration
        });
        // Connect with others step
        steps.push({
            title: 'Connect with others',
            description: 'Find and connect with classmates in your major',
            completed: this.props.connections.length > 0
        });
        return steps;
    }
    getOnboardingWarnings() {
        const warnings = [];
        if (!this.props.personalInfo.bio) {
            warnings.push('Adding a bio helps others learn more about you');
        }
        if (!this.props.academicInfo) {
            warnings.push('Adding academic information helps you find relevant study groups');
        }
        if (this.props.socialInfo.interests.length === 0) {
            warnings.push('Adding interests improves your feed and space recommendations');
        }
        if (this.props.spaces.length === 0) {
            warnings.push('Joining at least one space helps you connect with others');
        }
        if (!this.props.personalInfo.profilePhoto) {
            warnings.push('Adding a profile photo helps others recognize you');
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
        return {
            isComplete: this.props.isOnboarded,
            completedSteps,
            remainingSteps,
            completionPercentage: this.getCompletionPercentage(),
            nextSteps: this.getOnboardingNextSteps([]),
            warnings: this.getOnboardingWarnings()
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