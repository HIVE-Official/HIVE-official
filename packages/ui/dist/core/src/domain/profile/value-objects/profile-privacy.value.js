/**
 * ProfilePrivacy Value Object
 * Represents privacy settings for a profile
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export class ProfilePrivacy extends ValueObject {
    get profileVisibility() {
        return this.props.profileVisibility;
    }
    get visibility() {
        return this.props.profileVisibility;
    }
    get showEmail() {
        return this.props.showEmail;
    }
    get showConnections() {
        return this.props.showConnections;
    }
    get allowConnectionRequests() {
        return this.props.allowConnectionRequests;
    }
    constructor(props) {
        super(props);
    }
    isPublic() {
        return this.props.profileVisibility === 'public';
    }
    isPrivate() {
        return this.props.profileVisibility === 'private';
    }
    isConnectionsOnly() {
        return this.props.profileVisibility === 'connections';
    }
    static create(props) {
        // Validate visibility if provided
        if (props.profileVisibility) {
            const validVisibilities = ['public', 'private', 'connections'];
            if (!validVisibilities.includes(props.profileVisibility)) {
                return Result.fail('Invalid profile visibility');
            }
        }
        const defaultProps = {
            profileVisibility: 'public',
            showEmail: false,
            showConnections: true,
            allowConnectionRequests: true,
            ...props
        };
        return Result.ok(new ProfilePrivacy(defaultProps));
    }
    static createDefault() {
        return ProfilePrivacy.create({});
    }
    static createPublic() {
        return ProfilePrivacy.create({
            profileVisibility: 'public',
            showEmail: true,
            showConnections: true,
            allowConnectionRequests: true
        });
    }
    static createPrivate() {
        return ProfilePrivacy.create({
            profileVisibility: 'private',
            showEmail: false,
            showConnections: false,
            allowConnectionRequests: false
        });
    }
    static createConnectionsOnly() {
        return ProfilePrivacy.create({
            profileVisibility: 'connections',
            showEmail: false,
            showConnections: true,
            allowConnectionRequests: true
        });
    }
    canViewProfile(viewerType) {
        switch (this.props.profileVisibility) {
            case 'public':
                return true;
            case 'connections':
                return viewerType === 'connection';
            case 'private':
                return false;
            default:
                return false;
        }
    }
}
//# sourceMappingURL=profile-privacy.value.js.map