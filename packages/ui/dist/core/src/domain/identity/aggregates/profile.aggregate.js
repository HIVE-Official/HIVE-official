import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { PersonalInfo } from '../value-objects/personal-info.value';
import { ProfileCreatedEvent } from '../events/profile-created.event';
import { ProfileOnboardedEvent } from '../events/profile-onboarded.event';
export class Profile extends AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props) {
        const personalInfoResult = PersonalInfo.create({
            firstName: props.personalInfo.firstName,
            lastName: props.personalInfo.lastName,
            bio: props.personalInfo.bio || '',
            major: props.personalInfo.major || '',
            graduationYear: props.personalInfo.graduationYear || null,
            dorm: props.personalInfo.dorm || ''
        });
        if (personalInfoResult.isFailure) {
            return Result.fail(personalInfoResult.error);
        }
        const profile = new Profile({
            email: props.email,
            handle: props.handle,
            personalInfo: personalInfoResult.getValue(),
            interests: [],
            connections: [],
            isOnboarded: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }, props.id.id);
        profile.addDomainEvent(new ProfileCreatedEvent(props.id.id, props.email.value, props.handle.value));
        return Result.ok(profile);
    }
    updatePersonalInfo(personalInfo) {
        this.props.personalInfo = personalInfo;
        this.props.updatedAt = new Date();
        return Result.ok();
    }
    completeOnboarding(personalInfo, interests) {
        if (this.props.isOnboarded) {
            return Result.fail('Profile is already onboarded');
        }
        this.props.personalInfo = personalInfo;
        this.props.interests = interests;
        this.props.isOnboarded = true;
        this.props.updatedAt = new Date();
        this.addDomainEvent(new ProfileOnboardedEvent(this.id));
        return Result.ok();
    }
    addConnection(connectionId) {
        if (this.props.connections.includes(connectionId)) {
            return Result.fail('Connection already exists');
        }
        this.props.connections.push(connectionId);
        this.props.updatedAt = new Date();
        return Result.ok();
    }
    removeConnection(connectionId) {
        const index = this.props.connections.indexOf(connectionId);
        if (index === -1) {
            return Result.fail('Connection not found');
        }
        this.props.connections.splice(index, 1);
        this.props.updatedAt = new Date();
        return Result.ok();
    }
    updateInterests(interests) {
        this.props.interests = interests;
        this.props.updatedAt = new Date();
        return Result.ok();
    }
    addInterest(interest) {
        if (this.props.interests.includes(interest)) {
            return Result.fail('Interest already exists');
        }
        this.props.interests.push(interest);
        this.props.updatedAt = new Date();
        return Result.ok();
    }
    async addPhoto(photoUrl) {
        // For now, just track it in the domain (photos would be stored separately)
        // This would integrate with photo management when implemented
        this.props.updatedAt = new Date();
        return Result.ok();
    }
    get email() {
        return this.props.email;
    }
    get handle() {
        return this.props.handle;
    }
    get personalInfo() {
        return this.props.personalInfo;
    }
    get interests() {
        return this.props.interests;
    }
    get connections() {
        return this.props.connections;
    }
    get isOnboarded() {
        return this.props.isOnboarded;
    }
    toData() {
        return {
            id: this.id,
            email: this.props.email.value,
            handle: this.props.handle.value,
            personalInfo: {
                firstName: this.props.personalInfo.firstName,
                lastName: this.props.personalInfo.lastName,
                bio: this.props.personalInfo.bio,
                major: this.props.personalInfo.major,
                graduationYear: this.props.personalInfo.graduationYear,
                dorm: this.props.personalInfo.dorm
            },
            interests: this.props.interests,
            connections: this.props.connections,
            photos: [], // Would be implemented when photo management is added
            isOnboarded: this.props.isOnboarded,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt
        };
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
}
//# sourceMappingURL=profile.aggregate.js.map