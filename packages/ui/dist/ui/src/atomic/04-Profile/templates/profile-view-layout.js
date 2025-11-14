"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../../lib/utils.js";
import { Card } from "../../00-Global/atoms/card.js";
import { ProfileIdentityWidget, ProfileActivityWidget, ProfileSpacesWidget, ProfileConnectionsWidget, ProfileCompletionCard, HiveLabWidget, } from "../organisms/profile-widgets.js";
const widgetLevel = (profile, widget, fallback) => {
    const widgets = profile.widgets;
    const level = widgets?.[widget]?.level ?? profile.privacy?.visibilityLevel;
    return level ?? fallback;
};
export function ProfileViewLayout({ profile, isOwnProfile = false, activities = [], spaces = [], connections = [], isSpaceLeader, hasHiveLabAccess, toolsCreated, leadingSpaces, onEditPhoto, onPrivacyChange, onStepClick, onRequestHiveLabAccess, onOpenHiveLab, className, }) {
    const completion = profile.completeness ?? 0;
    const extendedProfile = profile;
    const handlePrivacyChange = (widget) => (level) => {
        onPrivacyChange?.(widget, level);
    };
    const derivedPresenceStatus = React.useMemo(() => {
        const candidate = extendedProfile.presence?.status;
        if (candidate === "online" ||
            candidate === "away" ||
            candidate === "offline" ||
            candidate === "ghost") {
            return candidate;
        }
        if (profile.presence?.isOnline) {
            return "online";
        }
        if (profile.presence?.beacon?.active) {
            return "away";
        }
        return "offline";
    }, [extendedProfile.presence?.status, profile.presence?.isOnline, profile.presence?.beacon]);
    const lastSeen = extendedProfile.presence?.lastSeen ?? profile.presence?.lastActive ?? null;
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsx(ProfileIdentityWidget, { profile: {
                    id: profile.userId,
                    handle: profile.handle,
                    displayName: profile.identity.academic.name,
                    campusId: profile.campusId,
                    identity: {
                        id: profile.userId,
                        fullName: profile.identity.academic.name,
                        avatarUrl: profile.identity.photoCarousel?.photos?.[0]?.url,
                    },
                    academic: {
                        campusId: profile.campusId,
                        major: profile.identity.academic.majors?.join(", ") ?? undefined,
                        academicYear: profile.identity.academic.year,
                        graduationYear: profile.identity.academic.graduationYear,
                        pronouns: profile.identity.academic.pronouns,
                    },
                    personal: {
                        bio: extendedProfile.personal?.bio,
                        currentVibe: profile.presence?.currentActivity?.context ?? profile.presence?.vibe,
                    },
                    social: {
                        connections: {
                            connectionIds: profile.connections.connections?.map((c) => c.userId) ?? [],
                            friendIds: profile.connections.friends?.map((c) => c.userId) ?? [],
                        },
                        mutualSpaces: extendedProfile.spaces?.map((space) => space.id) ?? [],
                    },
                    metadata: {
                        completionPercentage: completion,
                    },
                    widgets: {
                        myActivity: { level: widgetLevel(profile, "myActivity", "public") },
                    },
                }, isOwnProfile: isOwnProfile, presenceStatus: derivedPresenceStatus, lastSeen: lastSeen, completionPercentage: completion, onEditPhoto: onEditPhoto, privacyLevel: widgetLevel(profile, "myActivity", "public"), onPrivacyChange: onPrivacyChange ? handlePrivacyChange("myActivity") : undefined }), isOwnProfile ? (_jsx(ProfileCompletionCard, { completionPercentage: completion, completedSteps: extendedProfile.completedSteps ?? [], onStepClick: onStepClick })) : null, _jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [_jsxs("div", { className: "space-y-6 lg:col-span-2", children: [_jsx(ProfileActivityWidget, { activities: activities, isOwnProfile: isOwnProfile, privacyLevel: widgetLevel(profile, "myActivity", "public"), onPrivacyChange: onPrivacyChange ? handlePrivacyChange("myActivity") : undefined }), _jsx(ProfileSpacesWidget, { spaces: spaces, isOwnProfile: isOwnProfile, privacyLevel: widgetLevel(profile, "mySpaces", "connections"), onPrivacyChange: onPrivacyChange ? handlePrivacyChange("mySpaces") : undefined })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(ProfileConnectionsWidget, { connections: connections, isOwnProfile: isOwnProfile, privacyLevel: widgetLevel(profile, "myConnections", "connections"), onPrivacyChange: onPrivacyChange ? handlePrivacyChange("myConnections") : undefined }), _jsx(HiveLabWidget, { hasAccess: hasHiveLabAccess, isSpaceLeader: isSpaceLeader, toolsCreated: toolsCreated, toolsUsed: extendedProfile.stats?.toolsUsed ?? 0, leadingSpaces: leadingSpaces, onRequestAccess: onRequestHiveLabAccess, onOpenStudio: onOpenHiveLab })] })] }), _jsxs(Card, { className: "rounded-3xl border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 55%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 90%,transparent)] p-6", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]", children: "Timeline" }), _jsx("p", { className: "mt-2 text-sm text-[var(--hive-text-secondary,#c0c2cc)]", children: "Ritual streaks, actions, and campus milestones will appear here in the next iteration." })] })] }));
}
//# sourceMappingURL=profile-view-layout.js.map