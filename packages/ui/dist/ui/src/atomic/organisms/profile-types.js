export function specProfileToUIProfile(profile) {
    const avatarUrl = profile.identity.photoCarousel?.photos?.[0]?.url;
    const majors = profile.identity.academic.majors?.join(", ") || undefined;
    const createdAt = profile.createdAt instanceof Date ? profile.createdAt : new Date(profile.createdAt);
    const updatedAt = profile.updatedAt instanceof Date ? profile.updatedAt : new Date(profile.updatedAt);
    const personalData = profile.personal ?? {};
    const widgetPrivacy = {
        myActivity: { level: profile.privacy.availabilityBroadcast.campus ? "public" : "private" },
        mySpaces: { level: profile.privacy.discoveryParticipation ? "public" : "private" },
        myConnections: { level: profile.privacy.visibilityLevel },
    };
    return {
        identity: {
            id: profile.userId,
            fullName: profile.identity.academic.name,
            email: profile.handle ? `${profile.handle}@buffalo.edu` : undefined,
            avatarUrl,
            bio: personalData.bio,
        },
        academic: {
            campusId: profile.campusId,
            major: majors,
            academicYear: profile.identity.academic.year,
            graduationYear: profile.identity.academic.graduationYear,
            pronouns: profile.identity.academic.pronouns,
        },
        personal: {
            bio: personalData.bio,
            interests: personalData.interests ?? [],
            currentVibe: profile.presence?.currentActivity?.context ?? profile.presence?.vibe,
            lookingFor: personalData.lookingFor ?? [],
        },
        social: {
            connections: {
                connectionIds: profile.connections.connections?.map((connection) => connection.userId) ?? [],
                friendIds: profile.connections.friends?.map((friend) => friend.userId) ?? [],
                strength: {},
            },
            mutualSpaces: [],
        },
        privacy: {
            level: profile.privacy.visibilityLevel,
            widgets: widgetPrivacy,
        },
        verification: {
            facultyVerified: false,
            emailVerified: true,
            profileVerified: profile.isSetupComplete,
            accountStatus: profile.isSetupComplete ? "active" : "incomplete",
            userType: "student",
            onboardingCompleted: profile.isSetupComplete,
        },
        metadata: {
            completionPercentage: profile.completeness,
            createdAt,
            updatedAt,
            lastActiveAt: profile.presence?.lastActive,
        },
        widgets: widgetPrivacy,
    };
}
//# sourceMappingURL=profile-types.js.map