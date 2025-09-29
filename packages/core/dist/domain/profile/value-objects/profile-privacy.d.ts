/**
 * ProfilePrivacy Value Object
 * Manages all privacy settings for a profile
 */
import { Result } from '../value-objects';
export declare enum VisibilityLevel {
    PUBLIC = "public",
    CAMPUS = "campus",
    CONNECTIONS = "connections",
    PRIVATE = "private"
}
export interface PrivacySettings {
    profileVisibility: VisibilityLevel;
    showActivity: boolean;
    showJoinedSpaces: boolean;
    showConnections: boolean;
    allowMessaging: VisibilityLevel;
    searchable: boolean;
    showOnlineStatus: boolean;
    ghostMode: boolean;
}
export interface WidgetPrivacy {
    bio: VisibilityLevel;
    interests: VisibilityLevel;
    photos: VisibilityLevel;
    activity: VisibilityLevel;
    spaces: VisibilityLevel;
    connections: VisibilityLevel;
}
export declare class ProfilePrivacy {
    private settings;
    private widgetPrivacy;
    private constructor();
    static createDefault(): ProfilePrivacy;
    static createPublic(): ProfilePrivacy;
    static createPrivate(): ProfilePrivacy;
    updateSettings(updates: Partial<PrivacySettings>): Result<ProfilePrivacy>;
    updateWidgetPrivacy(widget: keyof WidgetPrivacy, level: VisibilityLevel): Result<ProfilePrivacy>;
    enableGhostMode(): ProfilePrivacy;
    disableGhostMode(): ProfilePrivacy;
    canViewProfile(viewerType: 'public' | 'campus' | 'connection' | 'self'): boolean;
    canViewWidget(widget: keyof WidgetPrivacy, viewerType: 'public' | 'campus' | 'connection' | 'self'): boolean;
    canReceiveMessage(senderType: 'public' | 'campus' | 'connection'): boolean;
    get isSearchable(): boolean;
    get isInGhostMode(): boolean;
    get profileVisibility(): VisibilityLevel;
    toJSON(): {
        settings: PrivacySettings;
        widgetPrivacy: WidgetPrivacy;
    };
}
//# sourceMappingURL=profile-privacy.d.ts.map