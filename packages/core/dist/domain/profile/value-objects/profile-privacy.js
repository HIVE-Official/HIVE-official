"use strict";
/**
 * ProfilePrivacy Value Object
 * Manages all privacy settings for a profile
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePrivacy = exports.VisibilityLevel = void 0;
const value_objects_1 = require("../value-objects");
const feature_flags_1 = require("../../../infrastructure/feature-flags");
var VisibilityLevel;
(function (VisibilityLevel) {
    VisibilityLevel["PUBLIC"] = "public";
    VisibilityLevel["CAMPUS"] = "campus";
    VisibilityLevel["CONNECTIONS"] = "connections";
    VisibilityLevel["PRIVATE"] = "private";
})(VisibilityLevel || (exports.VisibilityLevel = VisibilityLevel = {}));
class ProfilePrivacy {
    constructor(settings, widgetPrivacy) {
        this.settings = settings;
        this.widgetPrivacy = widgetPrivacy;
    }
    static createDefault() {
        if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_PRIVACY_CONTROLS')) {
            // If feature is disabled, create fully public profile
            return this.createPublic();
        }
        // Default privacy-friendly settings per SPEC.md
        const defaultSettings = {
            profileVisibility: VisibilityLevel.CAMPUS,
            showActivity: true,
            showJoinedSpaces: true,
            showConnections: true,
            allowMessaging: VisibilityLevel.CAMPUS,
            searchable: true,
            showOnlineStatus: true,
            ghostMode: false
        };
        const defaultWidgetPrivacy = {
            bio: VisibilityLevel.CAMPUS,
            interests: VisibilityLevel.CAMPUS,
            photos: VisibilityLevel.CAMPUS,
            activity: VisibilityLevel.CAMPUS,
            spaces: VisibilityLevel.CAMPUS,
            connections: VisibilityLevel.CONNECTIONS
        };
        return new ProfilePrivacy(defaultSettings, defaultWidgetPrivacy);
    }
    static createPublic() {
        const publicSettings = {
            profileVisibility: VisibilityLevel.PUBLIC,
            showActivity: true,
            showJoinedSpaces: true,
            showConnections: true,
            allowMessaging: VisibilityLevel.PUBLIC,
            searchable: true,
            showOnlineStatus: true,
            ghostMode: false
        };
        const publicWidgetPrivacy = {
            bio: VisibilityLevel.PUBLIC,
            interests: VisibilityLevel.PUBLIC,
            photos: VisibilityLevel.PUBLIC,
            activity: VisibilityLevel.PUBLIC,
            spaces: VisibilityLevel.PUBLIC,
            connections: VisibilityLevel.PUBLIC
        };
        return new ProfilePrivacy(publicSettings, publicWidgetPrivacy);
    }
    static createPrivate() {
        const privateSettings = {
            profileVisibility: VisibilityLevel.PRIVATE,
            showActivity: false,
            showJoinedSpaces: false,
            showConnections: false,
            allowMessaging: VisibilityLevel.CONNECTIONS,
            searchable: false,
            showOnlineStatus: false,
            ghostMode: true
        };
        const privateWidgetPrivacy = {
            bio: VisibilityLevel.PRIVATE,
            interests: VisibilityLevel.PRIVATE,
            photos: VisibilityLevel.PRIVATE,
            activity: VisibilityLevel.PRIVATE,
            spaces: VisibilityLevel.PRIVATE,
            connections: VisibilityLevel.PRIVATE
        };
        return new ProfilePrivacy(privateSettings, privateWidgetPrivacy);
    }
    updateSettings(updates) {
        if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_PRIVACY_CONTROLS')) {
            return value_objects_1.Result.ok(this); // No-op if feature is disabled
        }
        const newSettings = { ...this.settings, ...updates };
        // Validate ghost mode constraints
        if (newSettings.ghostMode && newSettings.showOnlineStatus) {
            return value_objects_1.Result.fail('Cannot show online status in ghost mode');
        }
        return value_objects_1.Result.ok(new ProfilePrivacy(newSettings, this.widgetPrivacy));
    }
    updateWidgetPrivacy(widget, level) {
        if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_WIDGET_PRIVACY')) {
            return value_objects_1.Result.ok(this); // No-op if feature is disabled
        }
        const newWidgetPrivacy = { ...this.widgetPrivacy, [widget]: level };
        return value_objects_1.Result.ok(new ProfilePrivacy(this.settings, newWidgetPrivacy));
    }
    enableGhostMode() {
        if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_PRIVACY_CONTROLS')) {
            return this;
        }
        const newSettings = {
            ...this.settings,
            ghostMode: true,
            showOnlineStatus: false
        };
        return new ProfilePrivacy(newSettings, this.widgetPrivacy);
    }
    disableGhostMode() {
        const newSettings = {
            ...this.settings,
            ghostMode: false
        };
        return new ProfilePrivacy(newSettings, this.widgetPrivacy);
    }
    canViewProfile(viewerType) {
        if (viewerType === 'self')
            return true;
        switch (this.settings.profileVisibility) {
            case VisibilityLevel.PUBLIC:
                return true;
            case VisibilityLevel.CAMPUS:
                return viewerType === 'campus' || viewerType === 'connection';
            case VisibilityLevel.CONNECTIONS:
                return viewerType === 'connection';
            case VisibilityLevel.PRIVATE:
                return false;
            default:
                return false;
        }
    }
    canViewWidget(widget, viewerType) {
        if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_WIDGET_PRIVACY')) {
            return this.canViewProfile(viewerType);
        }
        if (viewerType === 'self')
            return true;
        const widgetLevel = this.widgetPrivacy[widget];
        switch (widgetLevel) {
            case VisibilityLevel.PUBLIC:
                return true;
            case VisibilityLevel.CAMPUS:
                return viewerType === 'campus' || viewerType === 'connection';
            case VisibilityLevel.CONNECTIONS:
                return viewerType === 'connection';
            case VisibilityLevel.PRIVATE:
                return false;
            default:
                return false;
        }
    }
    canReceiveMessage(senderType) {
        switch (this.settings.allowMessaging) {
            case VisibilityLevel.PUBLIC:
                return true;
            case VisibilityLevel.CAMPUS:
                return senderType === 'campus' || senderType === 'connection';
            case VisibilityLevel.CONNECTIONS:
                return senderType === 'connection';
            case VisibilityLevel.PRIVATE:
                return false;
            default:
                return false;
        }
    }
    get isSearchable() {
        return this.settings.searchable && !this.settings.ghostMode;
    }
    get isInGhostMode() {
        return this.settings.ghostMode;
    }
    get profileVisibility() {
        return this.settings.profileVisibility;
    }
    toJSON() {
        return {
            settings: { ...this.settings },
            widgetPrivacy: { ...this.widgetPrivacy }
        };
    }
}
exports.ProfilePrivacy = ProfilePrivacy;
//# sourceMappingURL=profile-privacy.js.map