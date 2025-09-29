/**
 * ProfilePrivacy Value Object
 * Represents privacy settings for a profile
 */
import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';
export declare enum PrivacyLevel {
    PUBLIC = "public",
    CAMPUS_ONLY = "campus_only",
    CONNECTIONS_ONLY = "connections_only",
    PRIVATE = "private"
}
interface ProfilePrivacyProps {
    level: PrivacyLevel;
    showEmail: boolean;
    showPhone: boolean;
    showDorm: boolean;
    showSchedule: boolean;
    showActivity: boolean;
}
export declare class ProfilePrivacy extends ValueObject<ProfilePrivacyProps> {
    get level(): PrivacyLevel;
    get showEmail(): boolean;
    get showPhone(): boolean;
    get showDorm(): boolean;
    get showSchedule(): boolean;
    get showActivity(): boolean;
    private constructor();
    static create(props: Partial<ProfilePrivacyProps>): Result<ProfilePrivacy>;
    static createDefault(): Result<ProfilePrivacy>;
    static createPublic(): Result<ProfilePrivacy>;
    static createPrivate(): Result<ProfilePrivacy>;
    canViewProfile(viewerType: 'public' | 'campus' | 'connection'): boolean;
}
export {};
//# sourceMappingURL=profile-privacy.value.d.ts.map