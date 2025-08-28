"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultUserPreferences = createDefaultUserPreferences;
// Default preferences factory
function createDefaultUserPreferences() {
    return {
        theme: "system",
        language: "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        notifications: {
            email: {
                enabled: true,
                frequency: "daily",
                types: ["new-post", "comment", "mention", "space-invite"],
            },
            push: {
                enabled: true,
                types: ["comment", "mention", "space-invite", "security-alert"],
            },
            inApp: {
                enabled: true,
                types: [
                    "new-post",
                    "comment",
                    "mention",
                    "follow",
                    "space-invite",
                    "event-reminder",
                    "system-update",
                    "security-alert",
                ],
            },
        },
        privacy: {
            profileVisibility: "campus-only",
            showEmail: false,
            showSchool: true,
            allowDirectMessages: true,
            allowSpaceInvites: true,
            dataCollection: true,
            analytics: true,
        },
        accessibility: {
            reducedMotion: false,
            highContrast: false,
            fontSize: "medium",
            screenReader: false,
            keyboardNavigation: false,
        },
    };
}
//# sourceMappingURL=user-types.js.map