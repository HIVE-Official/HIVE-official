/**
 * ProfilePrivacy Value Object
 * Represents privacy settings for a profile
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export var PrivacyLevel;
(function (PrivacyLevel) {
    PrivacyLevel["PUBLIC"] = "public";
    PrivacyLevel["CAMPUS_ONLY"] = "campus_only";
    PrivacyLevel["CONNECTIONS_ONLY"] = "connections_only";
    PrivacyLevel["PRIVATE"] = "private";
})(PrivacyLevel || (PrivacyLevel = {}));
export class ProfilePrivacy extends ValueObject {
    get level() {
        return this.props.level;
    }
    get showEmail() {
        return this.props.showEmail;
    }
    get showPhone() {
        return this.props.showPhone;
    }
    get showDorm() {
        return this.props.showDorm;
    }
    get showSchedule() {
        return this.props.showSchedule;
    }
    get showActivity() {
        return this.props.showActivity;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const defaultProps = {
            level: PrivacyLevel.CAMPUS_ONLY,
            showEmail: false,
            showPhone: false,
            showDorm: true,
            showSchedule: false,
            showActivity: true,
            ...props
        };
        return Result.ok(new ProfilePrivacy(defaultProps));
    }
    static createDefault() {
        return ProfilePrivacy.create({});
    }
    static createPublic() {
        return ProfilePrivacy.create({
            level: PrivacyLevel.PUBLIC,
            showEmail: false,
            showPhone: false,
            showDorm: true,
            showSchedule: true,
            showActivity: true
        });
    }
    static createPrivate() {
        return ProfilePrivacy.create({
            level: PrivacyLevel.PRIVATE,
            showEmail: false,
            showPhone: false,
            showDorm: false,
            showSchedule: false,
            showActivity: false
        });
    }
    canViewProfile(viewerType) {
        switch (this.props.level) {
            case PrivacyLevel.PUBLIC:
                return true;
            case PrivacyLevel.CAMPUS_ONLY:
                return viewerType === 'campus' || viewerType === 'connection';
            case PrivacyLevel.CONNECTIONS_ONLY:
                return viewerType === 'connection';
            case PrivacyLevel.PRIVATE:
                return false;
            default:
                return false;
        }
    }
}
//# sourceMappingURL=profile-privacy.value.js.map