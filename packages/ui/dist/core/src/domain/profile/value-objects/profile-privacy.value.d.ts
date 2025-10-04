/**
 * ProfilePrivacy Value Object
 * Represents privacy settings for a profile
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
type ProfileVisibility = 'public' | 'private' | 'connections';
interface ProfilePrivacyProps {
    profileVisibility: ProfileVisibility;
    showEmail: boolean;
    showConnections: boolean;
    allowConnectionRequests: boolean;
}
export declare class ProfilePrivacy extends ValueObject<ProfilePrivacyProps> {
    get profileVisibility(): string;
    get visibility(): string;
    get showEmail(): boolean;
    get showConnections(): boolean;
    get allowConnectionRequests(): boolean;
    private constructor();
    isPublic(): boolean;
    isPrivate(): boolean;
    isConnectionsOnly(): boolean;
    static create(props: Partial<ProfilePrivacyProps>): Result<ProfilePrivacy>;
    static createDefault(): Result<ProfilePrivacy>;
    static createPublic(): Result<ProfilePrivacy>;
    static createPrivate(): Result<ProfilePrivacy>;
    static createConnectionsOnly(): Result<ProfilePrivacy>;
    canViewProfile(viewerType: 'public' | 'campus' | 'connection'): boolean;
}
export {};
//# sourceMappingURL=profile-privacy.value.d.ts.map