import { z } from "zod";
export declare enum RitualArchetype {
    FoundingClass = "FOUNDING_CLASS",
    LaunchCountdown = "LAUNCH_COUNTDOWN",
    BetaLottery = "BETA_LOTTERY",
    UnlockChallenge = "UNLOCK_CHALLENGE",
    Survival = "SURVIVAL",
    Leak = "LEAK",
    Tournament = "TOURNAMENT",
    FeatureDrop = "FEATURE_DROP",
    RuleInversion = "RULE_INVERSION"
}
export type RitualPhase = "draft" | "announced" | "active" | "cooldown" | "ended";
export interface RitualPresentation {
    accentColor?: string;
    bannerImage?: string;
    icon?: string;
    ctaLabel?: string;
    ctaLink?: string;
    videoUrl?: string;
    spotlightSpaceId?: string;
}
export interface RitualMetricsSnapshot {
    participants?: number;
    submissions?: number;
    conversions?: number;
    completionRate?: number;
    updatedAt?: string;
}
export interface BaseRitual<TArchetype extends RitualArchetype = RitualArchetype, TConfig extends Record<string, unknown> = Record<string, unknown>> {
    id: string;
    slug?: string;
    campusId: string;
    title: string;
    subtitle?: string;
    description?: string;
    archetype: TArchetype;
    phase: RitualPhase;
    startsAt: string;
    endsAt: string;
    createdAt: string;
    updatedAt: string;
    visibility: "public" | "invite_only" | "secret";
    presentation?: RitualPresentation;
    metrics?: RitualMetricsSnapshot;
    config: TConfig;
}
export interface FoundingClassConfig {
    limit: number;
    currentCount: number;
    deadline: string;
    founderBadge: {
        permanent: boolean;
        visibleOn: "profile";
        exclusive: boolean;
    };
    founderPerks: string[];
    founderWall: {
        enabled: boolean;
        showOrder: boolean;
        showTimestamp: boolean;
    };
    urgency: string;
    socialProof: string;
}
export interface LaunchCountdownConfig {
    targetRitual: string;
    launchDate: string;
    dailyUnlocks: Array<{
        daysRemaining: number;
        reveal: string;
        content?: {
            image?: string;
            video?: string;
            text: string;
        };
    }>;
    preRegistration?: {
        enabled: boolean;
        entity: "spaces" | "users";
        goal: number;
        current: number;
    };
    activities: {
        predictions: boolean;
        trashTalk: boolean;
        teamSelection: boolean;
    };
    shareables: {
        countdownWidget: boolean;
        teaserVideo: boolean;
        bracketPreview: boolean;
    };
}
export interface BetaLotteryConfig {
    feature: {
        id: string;
        name: string;
        description: string;
        teaser: {
            video?: string;
            images: string[];
            demo?: string;
        };
    };
    slots: number;
    applicants: number;
    entry: {
        requirement: "click" | "referral" | "action";
        deadline: string;
        multipleEntries: boolean;
    };
    drawing: {
        date: string;
        format: "instant" | "live_event" | "scheduled";
        notification: boolean;
        publicAnnouncement: boolean;
    };
    winnerAccess: {
        duration: number;
        featureFlags: string[];
        badge?: string;
        feedback: boolean;
    };
    loserFlow: {
        consolationMessage: string;
        waitlist: boolean;
        nextLottery?: string;
    };
}
export interface UnlockChallengeConfig {
    goal: {
        metric: "posts" | "comments" | "votes" | "joins" | "custom";
        target: number;
        current: number;
        deadline: string;
    };
    reward: {
        type: "ritual" | "feature" | "content" | "prize";
        name: string;
        description: string;
        teaser: string;
        preview?: string;
    };
    visualization: {
        progressBar: boolean;
        percentage: boolean;
        countdown: boolean;
        recentActivity: boolean;
        leaderboard: boolean;
    };
    milestones: Array<{
        threshold: number;
        unlock: string;
        message: string;
    }>;
    urgency: {
        remaining: string;
        timeLeft: string;
        encouragement: string;
    };
}
export interface SurvivalConfig {
    format: "instant_elimination";
    participants: number;
    rounds: Array<{
        number: number;
        duration: number;
        matchups: number;
        startTime: string;
    }>;
    liveUpdates: {
        realTime: boolean;
        updateInterval: number;
        notifications: boolean;
        commentary: string[];
    };
    elimination: {
        instant: boolean;
        messaging: string;
        soundEffect?: string;
    };
    eventWindow: {
        start: string;
        end: string;
        duration: number;
    };
    voting: {
        method: "direct_vote";
        showLiveCount: boolean;
        speed: "urgent";
    };
}
export interface LeakConfig {
    hiddenRitual: {
        name: string;
        archetype: string;
        launchDate: string;
    };
    clues: Array<{
        day: number;
        clue: string;
        hint?: string;
        media?: string;
    }>;
    reveal: {
        date: string;
        method: "instant" | "gradual" | "live_event";
        announcement: string;
    };
    speculation: {
        enabled: boolean;
        discussionSpace: string;
        prompt: string;
        voting: boolean;
    };
    shareables: {
        mysteryPoster: boolean;
        clueCards: boolean;
        countdown: boolean;
    };
}
export interface TournamentMatchup {
    id: string;
    roundId: string;
    competitor1: {
        id: string;
        name: string;
        votes: number;
    };
    competitor2: {
        id: string;
        name: string;
        votes: number;
    };
    status: "upcoming" | "active" | "completed";
    winner?: string;
    featuredInFeed: boolean;
}
export interface TournamentConfig {
    format: "single_elimination" | "double_elimination" | "round_robin";
    participants: {
        type: "spaces" | "majors" | "dorms" | "years" | "custom";
        count: number;
        selection: "all" | "opt_in" | "admin_pick";
        seeding: "random" | "by_size" | "by_activity" | "manual";
    };
    rounds: Array<{
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        matchups: TournamentMatchup[];
    }>;
    currentRound: string;
    liveMatchups: string[];
    voting: {
        mechanism: "direct_vote" | "posts_as_votes" | "reactions";
        postsAsVotes?: {
            countMechanism: "any_mention" | "hashtag" | "space_posts";
            hashtag?: string;
            voteWeight: {
                post: number;
                withMedia: number;
                upvoted: number;
            };
        };
        directVote?: {
            allowMultiple: boolean;
            voteChanging: boolean;
        };
    };
    prize: {
        title: string;
        badge: string;
        featuredDuration: number;
        specialPerks?: string[];
    };
}
export interface FeatureDropAnalyticsMetric {
    key: string;
    displayName: string;
    aggregation: "count" | "unique_users" | "avg";
}
export interface FeatureDropSurveyQuestion {
    id: string;
    prompt: string;
    type: "rating" | "nps" | "multiple_choice" | "open_text";
    options?: string[];
    required?: boolean;
}
export interface FeatureDropConfig {
    feature: {
        id: string;
        name: string;
        description: string;
        demo?: {
            video: string;
            images: string[];
        };
    };
    framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
    urgencyMessage: string;
    featureFlags: Array<{
        flagName: string;
        enabledDuring: "announced" | "active";
        autoDisable: boolean;
        fallbackBehavior: "hide" | "show_teaser" | "waitlist";
    }>;
    eligibility: {
        scope: "all" | "early_adopters" | "space_leaders" | "custom";
        maxParticipants?: number;
    };
    analytics: {
        trackUsage: boolean;
        metrics: FeatureDropAnalyticsMetric[];
        realTimeUpdates: boolean;
    };
    feedback: {
        enabled: boolean;
        timing: "during" | "after" | "both";
        questions: FeatureDropSurveyQuestion[];
        incentive?: string;
    };
    postRitualPlan: {
        strategy: "permanent_enable" | "recurring_ritual" | "waitlist" | "sunset";
        nextDate?: string;
        threshold?: {
            metric: string;
            value: number;
        };
    };
    currentParticipants: number;
    totalUsageEvents: number;
}
export interface RuleInversionGuardrail {
    ruleId: string;
    ruleName: string;
    enforcement: "strict";
}
export interface RuleInversionConfig {
    inversions: Array<{
        ruleId: string;
        ruleName: string;
        normalBehavior: string;
        invertedBehavior: string;
        featureFlags: string[];
        middlewareOverrides: Array<{
            endpoint: string;
            normalValidation: string;
            invertedValidation: string;
        }>;
        canInvert: boolean;
        safetyNotes?: string;
    }>;
    anonymity?: {
        enabled: boolean;
        scope: "posts" | "comments" | "reactions" | "all";
        identityStripping: {
            removeAvatar: boolean;
            removeHandle: boolean;
            removeName: boolean;
            pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
        };
        accountabilityLayer: {
            logRealIdentity: boolean;
            moderatorCanUnmask: boolean;
            postRitualReveal: boolean;
            abuseHandling: "immediate_ban" | "post_ritual_action";
        };
        anonymousDisplayName: string;
        anonymousAvatarStyle: string;
    };
    moderation: {
        strategy: "increased_capacity" | "pre_moderation" | "community_flags";
        autoModRules: {
            enabled: boolean;
            sensitivity: "low" | "medium" | "high";
            keywords: string[];
        };
        postRitualCleanup: {
            enabled: boolean;
            reviewAll: boolean;
            deleteViolations: boolean;
        };
    };
    permanentRules: RuleInversionGuardrail[];
    currentInversions: Array<{
        ruleId: string;
        invertedAt: string;
        revertedAt?: string;
        status: "inverted" | "reverted" | "error";
    }>;
    contentCreated: {
        posts: number;
        comments: number;
    };
    moderationActivity: {
        flagged: number;
        removed: number;
    };
}
export type FoundingClassRitual = BaseRitual<RitualArchetype.FoundingClass, {
    founding: FoundingClassConfig;
}>;
export type LaunchCountdownRitual = BaseRitual<RitualArchetype.LaunchCountdown, {
    countdown: LaunchCountdownConfig;
}>;
export type BetaLotteryRitual = BaseRitual<RitualArchetype.BetaLottery, {
    lottery: BetaLotteryConfig;
}>;
export type UnlockChallengeRitual = BaseRitual<RitualArchetype.UnlockChallenge, {
    unlock: UnlockChallengeConfig;
}>;
export type SurvivalRitual = BaseRitual<RitualArchetype.Survival, {
    survival: SurvivalConfig;
}>;
export type LeakRitual = BaseRitual<RitualArchetype.Leak, {
    leak: LeakConfig;
}>;
export type TournamentRitual = BaseRitual<RitualArchetype.Tournament, {
    tournament: TournamentConfig;
}>;
export type FeatureDropRitual = BaseRitual<RitualArchetype.FeatureDrop, {
    featureDrop: FeatureDropConfig;
}>;
export type RuleInversionRitual = BaseRitual<RitualArchetype.RuleInversion, {
    ruleInversion: RuleInversionConfig;
}>;
export type RitualUnion = FoundingClassRitual | LaunchCountdownRitual | BetaLotteryRitual | UnlockChallengeRitual | SurvivalRitual | LeakRitual | TournamentRitual | FeatureDropRitual | RuleInversionRitual;
export declare const RitualSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    archetype: z.ZodNativeEnum<typeof RitualArchetype>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
    config: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: Record<string, any>;
    archetype: RitualArchetype;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: Record<string, any>;
    archetype: RitualArchetype;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>;
export declare const RitualUnionSchema: z.ZodUnion<[z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.FoundingClass>;
    config: z.ZodObject<{
        founding: z.ZodObject<{
            limit: z.ZodNumber;
            currentCount: z.ZodNumber;
            deadline: z.ZodString;
            founderBadge: z.ZodObject<{
                permanent: z.ZodBoolean;
                visibleOn: z.ZodLiteral<"profile">;
                exclusive: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            }, {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            }>;
            founderPerks: z.ZodArray<z.ZodString, "many">;
            founderWall: z.ZodObject<{
                enabled: z.ZodBoolean;
                showOrder: z.ZodBoolean;
                showTimestamp: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            }, {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            }>;
            urgency: z.ZodString;
            socialProof: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        }, {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        founding: {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        };
    }, {
        founding: {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        founding: {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        };
    };
    archetype: RitualArchetype.FoundingClass;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        founding: {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        };
    };
    archetype: RitualArchetype.FoundingClass;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.LaunchCountdown>;
    config: z.ZodObject<{
        countdown: z.ZodObject<{
            targetRitual: z.ZodString;
            launchDate: z.ZodString;
            dailyUnlocks: z.ZodArray<z.ZodObject<{
                daysRemaining: z.ZodNumber;
                reveal: z.ZodString;
                content: z.ZodOptional<z.ZodObject<{
                    image: z.ZodOptional<z.ZodString>;
                    video: z.ZodOptional<z.ZodString>;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                }, {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }, {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }>, "many">;
            preRegistration: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                entity: z.ZodUnion<[z.ZodLiteral<"spaces">, z.ZodLiteral<"users">]>;
                goal: z.ZodNumber;
                current: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            }, {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            }>>;
            activities: z.ZodObject<{
                predictions: z.ZodBoolean;
                trashTalk: z.ZodBoolean;
                teamSelection: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            }, {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            }>;
            shareables: z.ZodObject<{
                countdownWidget: z.ZodBoolean;
                teaserVideo: z.ZodBoolean;
                bracketPreview: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            }, {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        }, {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        countdown: {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        };
    }, {
        countdown: {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        countdown: {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        };
    };
    archetype: RitualArchetype.LaunchCountdown;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        countdown: {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        };
    };
    archetype: RitualArchetype.LaunchCountdown;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.BetaLottery>;
    config: z.ZodObject<{
        lottery: z.ZodObject<{
            feature: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                description: z.ZodString;
                teaser: z.ZodObject<{
                    video: z.ZodOptional<z.ZodString>;
                    images: z.ZodArray<z.ZodString, "many">;
                    demo: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                }, {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            }, {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            }>;
            slots: z.ZodNumber;
            applicants: z.ZodNumber;
            entry: z.ZodObject<{
                requirement: z.ZodUnion<[z.ZodLiteral<"click">, z.ZodLiteral<"referral">, z.ZodLiteral<"action">]>;
                deadline: z.ZodString;
                multipleEntries: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            }, {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            }>;
            drawing: z.ZodObject<{
                date: z.ZodString;
                format: z.ZodUnion<[z.ZodLiteral<"instant">, z.ZodLiteral<"live_event">, z.ZodLiteral<"scheduled">]>;
                notification: z.ZodBoolean;
                publicAnnouncement: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            }, {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            }>;
            winnerAccess: z.ZodObject<{
                duration: z.ZodNumber;
                featureFlags: z.ZodArray<z.ZodString, "many">;
                badge: z.ZodOptional<z.ZodString>;
                feedback: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            }, {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            }>;
            loserFlow: z.ZodObject<{
                consolationMessage: z.ZodString;
                waitlist: z.ZodBoolean;
                nextLottery: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            }, {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        }, {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        lottery: {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        };
    }, {
        lottery: {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        lottery: {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        };
    };
    archetype: RitualArchetype.BetaLottery;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        lottery: {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        };
    };
    archetype: RitualArchetype.BetaLottery;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.UnlockChallenge>;
    config: z.ZodObject<{
        unlock: z.ZodObject<{
            goal: z.ZodObject<{
                metric: z.ZodUnion<[z.ZodLiteral<"posts">, z.ZodLiteral<"comments">, z.ZodLiteral<"votes">, z.ZodLiteral<"joins">, z.ZodLiteral<"custom">]>;
                target: z.ZodNumber;
                current: z.ZodNumber;
                deadline: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            }, {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            }>;
            reward: z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"ritual">, z.ZodLiteral<"feature">, z.ZodLiteral<"content">, z.ZodLiteral<"prize">]>;
                name: z.ZodString;
                description: z.ZodString;
                teaser: z.ZodString;
                preview: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            }, {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            }>;
            visualization: z.ZodObject<{
                progressBar: z.ZodBoolean;
                percentage: z.ZodBoolean;
                countdown: z.ZodBoolean;
                recentActivity: z.ZodBoolean;
                leaderboard: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            }, {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            }>;
            milestones: z.ZodArray<z.ZodObject<{
                threshold: z.ZodNumber;
                unlock: z.ZodString;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                unlock: string;
                message: string;
                threshold: number;
            }, {
                unlock: string;
                message: string;
                threshold: number;
            }>, "many">;
            urgency: z.ZodObject<{
                remaining: z.ZodString;
                timeLeft: z.ZodString;
                encouragement: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            }, {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        }, {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        unlock: {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        };
    }, {
        unlock: {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        unlock: {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        };
    };
    archetype: RitualArchetype.UnlockChallenge;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        unlock: {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        };
    };
    archetype: RitualArchetype.UnlockChallenge;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.Survival>;
    config: z.ZodObject<{
        survival: z.ZodObject<{
            format: z.ZodLiteral<"instant_elimination">;
            participants: z.ZodNumber;
            rounds: z.ZodArray<z.ZodObject<{
                number: z.ZodNumber;
                duration: z.ZodNumber;
                matchups: z.ZodNumber;
                startTime: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }, {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }>, "many">;
            liveUpdates: z.ZodObject<{
                realTime: z.ZodBoolean;
                updateInterval: z.ZodNumber;
                notifications: z.ZodBoolean;
                commentary: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            }, {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            }>;
            elimination: z.ZodObject<{
                instant: z.ZodBoolean;
                messaging: z.ZodString;
                soundEffect: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            }, {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            }>;
            eventWindow: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                duration: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                duration: number;
                start: string;
                end: string;
            }, {
                duration: number;
                start: string;
                end: string;
            }>;
            voting: z.ZodObject<{
                method: z.ZodLiteral<"direct_vote">;
                showLiveCount: z.ZodBoolean;
                speed: z.ZodLiteral<"urgent">;
            }, "strip", z.ZodTypeAny, {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            }, {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            }>;
        }, "strip", z.ZodTypeAny, {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        }, {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        survival: {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        };
    }, {
        survival: {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        survival: {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        };
    };
    archetype: RitualArchetype.Survival;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        survival: {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        };
    };
    archetype: RitualArchetype.Survival;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.Leak>;
    config: z.ZodObject<{
        leak: z.ZodObject<{
            hiddenRitual: z.ZodObject<{
                name: z.ZodString;
                archetype: z.ZodString;
                launchDate: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                archetype: string;
                launchDate: string;
            }, {
                name: string;
                archetype: string;
                launchDate: string;
            }>;
            clues: z.ZodArray<z.ZodObject<{
                day: z.ZodNumber;
                clue: z.ZodString;
                hint: z.ZodOptional<z.ZodString>;
                media: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }, {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }>, "many">;
            reveal: z.ZodObject<{
                date: z.ZodString;
                method: z.ZodUnion<[z.ZodLiteral<"instant">, z.ZodLiteral<"gradual">, z.ZodLiteral<"live_event">]>;
                announcement: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            }, {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            }>;
            speculation: z.ZodObject<{
                enabled: z.ZodBoolean;
                discussionSpace: z.ZodString;
                prompt: z.ZodString;
                voting: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            }, {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            }>;
            shareables: z.ZodObject<{
                mysteryPoster: z.ZodBoolean;
                clueCards: z.ZodBoolean;
                countdown: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            }, {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        }, {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        leak: {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        };
    }, {
        leak: {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        leak: {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        };
    };
    archetype: RitualArchetype.Leak;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        leak: {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        };
    };
    archetype: RitualArchetype.Leak;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.Tournament>;
    config: z.ZodObject<{
        tournament: z.ZodObject<{
            format: z.ZodUnion<[z.ZodLiteral<"single_elimination">, z.ZodLiteral<"double_elimination">, z.ZodLiteral<"round_robin">]>;
            participants: z.ZodObject<{
                type: z.ZodUnion<[z.ZodLiteral<"spaces">, z.ZodLiteral<"majors">, z.ZodLiteral<"dorms">, z.ZodLiteral<"years">, z.ZodLiteral<"custom">]>;
                count: z.ZodNumber;
                selection: z.ZodUnion<[z.ZodLiteral<"all">, z.ZodLiteral<"opt_in">, z.ZodLiteral<"admin_pick">]>;
                seeding: z.ZodUnion<[z.ZodLiteral<"random">, z.ZodLiteral<"by_size">, z.ZodLiteral<"by_activity">, z.ZodLiteral<"manual">]>;
            }, "strip", z.ZodTypeAny, {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            }, {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            }>;
            rounds: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                startDate: z.ZodString;
                endDate: z.ZodString;
                matchups: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    roundId: z.ZodString;
                    competitor1: z.ZodObject<{
                        id: z.ZodString;
                        name: z.ZodString;
                        votes: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        id: string;
                        votes: number;
                    }, {
                        name: string;
                        id: string;
                        votes: number;
                    }>;
                    competitor2: z.ZodObject<{
                        id: z.ZodString;
                        name: z.ZodString;
                        votes: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        id: string;
                        votes: number;
                    }, {
                        name: string;
                        id: string;
                        votes: number;
                    }>;
                    status: z.ZodUnion<[z.ZodLiteral<"upcoming">, z.ZodLiteral<"active">, z.ZodLiteral<"completed">]>;
                    winner: z.ZodOptional<z.ZodString>;
                    featuredInFeed: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }, {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }, {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }>, "many">;
            currentRound: z.ZodString;
            liveMatchups: z.ZodArray<z.ZodString, "many">;
            voting: z.ZodObject<{
                mechanism: z.ZodUnion<[z.ZodLiteral<"direct_vote">, z.ZodLiteral<"posts_as_votes">, z.ZodLiteral<"reactions">]>;
                postsAsVotes: z.ZodOptional<z.ZodObject<{
                    countMechanism: z.ZodUnion<[z.ZodLiteral<"any_mention">, z.ZodLiteral<"hashtag">, z.ZodLiteral<"space_posts">]>;
                    hashtag: z.ZodOptional<z.ZodString>;
                    voteWeight: z.ZodObject<{
                        post: z.ZodNumber;
                        withMedia: z.ZodNumber;
                        upvoted: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    }, {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                }, {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                }>>;
                directVote: z.ZodOptional<z.ZodObject<{
                    allowMultiple: z.ZodBoolean;
                    voteChanging: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                }, {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                }>>;
            }, "strip", z.ZodTypeAny, {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            }, {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            }>;
            prize: z.ZodObject<{
                title: z.ZodString;
                badge: z.ZodString;
                featuredDuration: z.ZodNumber;
                specialPerks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            }, {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        }, {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        }>;
    }, "strip", z.ZodTypeAny, {
        tournament: {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        };
    }, {
        tournament: {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        tournament: {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        };
    };
    archetype: RitualArchetype.Tournament;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        tournament: {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        };
    };
    archetype: RitualArchetype.Tournament;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.FeatureDrop>;
    config: z.ZodObject<{
        featureDrop: z.ZodObject<{
            feature: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                description: z.ZodString;
                demo: z.ZodOptional<z.ZodObject<{
                    video: z.ZodOptional<z.ZodString>;
                    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    video?: string | undefined;
                    images?: string[] | undefined;
                }, {
                    video?: string | undefined;
                    images?: string[] | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            }, {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            }>;
            framingStrategy: z.ZodUnion<[z.ZodLiteral<"limited_edition">, z.ZodLiteral<"exclusive_access">, z.ZodLiteral<"beta_test">, z.ZodLiteral<"game">]>;
            urgencyMessage: z.ZodString;
            featureFlags: z.ZodArray<z.ZodObject<{
                flagName: z.ZodString;
                enabledDuring: z.ZodUnion<[z.ZodLiteral<"announced">, z.ZodLiteral<"active">]>;
                autoDisable: z.ZodBoolean;
                fallbackBehavior: z.ZodUnion<[z.ZodLiteral<"hide">, z.ZodLiteral<"show_teaser">, z.ZodLiteral<"waitlist">]>;
            }, "strip", z.ZodTypeAny, {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }, {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }>, "many">;
            eligibility: z.ZodObject<{
                scope: z.ZodUnion<[z.ZodLiteral<"all">, z.ZodLiteral<"early_adopters">, z.ZodLiteral<"space_leaders">, z.ZodLiteral<"custom">]>;
                maxParticipants: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            }, {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            }>;
            analytics: z.ZodObject<{
                trackUsage: z.ZodBoolean;
                metrics: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    displayName: z.ZodString;
                    aggregation: z.ZodUnion<[z.ZodLiteral<"count">, z.ZodLiteral<"unique_users">, z.ZodLiteral<"avg">]>;
                }, "strip", z.ZodTypeAny, {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }, {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }>, "many">;
                realTimeUpdates: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            }, {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            }>;
            feedback: z.ZodObject<{
                enabled: z.ZodBoolean;
                timing: z.ZodUnion<[z.ZodLiteral<"during">, z.ZodLiteral<"after">, z.ZodLiteral<"both">]>;
                questions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    prompt: z.ZodString;
                    type: z.ZodUnion<[z.ZodLiteral<"rating">, z.ZodLiteral<"nps">, z.ZodLiteral<"multiple_choice">, z.ZodLiteral<"open_text">]>;
                    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    required: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }, {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }>, "many">;
                incentive: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            }, {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            }>;
            postRitualPlan: z.ZodObject<{
                strategy: z.ZodUnion<[z.ZodLiteral<"permanent_enable">, z.ZodLiteral<"recurring_ritual">, z.ZodLiteral<"waitlist">, z.ZodLiteral<"sunset">]>;
                nextDate: z.ZodOptional<z.ZodString>;
                threshold: z.ZodOptional<z.ZodObject<{
                    metric: z.ZodString;
                    value: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    value: number;
                    metric: string;
                }, {
                    value: number;
                    metric: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            }, {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            }>;
            currentParticipants: z.ZodNumber;
            totalUsageEvents: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        }, {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        featureDrop: {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        };
    }, {
        featureDrop: {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        featureDrop: {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        };
    };
    archetype: RitualArchetype.FeatureDrop;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        featureDrop: {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        };
    };
    archetype: RitualArchetype.FeatureDrop;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    campusId: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    phase: z.ZodUnion<[z.ZodLiteral<"draft">, z.ZodLiteral<"announced">, z.ZodLiteral<"active">, z.ZodLiteral<"cooldown">, z.ZodLiteral<"ended">]>;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    visibility: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"invite_only">, z.ZodLiteral<"secret">]>;
    presentation: z.ZodOptional<z.ZodObject<{
        accentColor: z.ZodOptional<z.ZodString>;
        bannerImage: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaLink: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        spotlightSpaceId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }, {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    }>>;
    metrics: z.ZodOptional<z.ZodObject<{
        participants: z.ZodOptional<z.ZodNumber>;
        submissions: z.ZodOptional<z.ZodNumber>;
        conversions: z.ZodOptional<z.ZodNumber>;
        completionRate: z.ZodOptional<z.ZodNumber>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }, {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    }>>;
} & {
    archetype: z.ZodLiteral<RitualArchetype.RuleInversion>;
    config: z.ZodObject<{
        ruleInversion: z.ZodObject<{
            inversions: z.ZodArray<z.ZodObject<{
                ruleId: z.ZodString;
                ruleName: z.ZodString;
                normalBehavior: z.ZodString;
                invertedBehavior: z.ZodString;
                featureFlags: z.ZodArray<z.ZodString, "many">;
                middlewareOverrides: z.ZodArray<z.ZodObject<{
                    endpoint: z.ZodString;
                    normalValidation: z.ZodString;
                    invertedValidation: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }, {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }>, "many">;
                canInvert: z.ZodBoolean;
                safetyNotes: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }, {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }>, "many">;
            anonymity: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                scope: z.ZodUnion<[z.ZodLiteral<"posts">, z.ZodLiteral<"comments">, z.ZodLiteral<"reactions">, z.ZodLiteral<"all">]>;
                identityStripping: z.ZodObject<{
                    removeAvatar: z.ZodBoolean;
                    removeHandle: z.ZodBoolean;
                    removeName: z.ZodBoolean;
                    pseudonym: z.ZodUnion<[z.ZodLiteral<"random">, z.ZodLiteral<"consistent_per_ritual">, z.ZodLiteral<"consistent_forever">]>;
                }, "strip", z.ZodTypeAny, {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                }, {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                }>;
                accountabilityLayer: z.ZodObject<{
                    logRealIdentity: z.ZodBoolean;
                    moderatorCanUnmask: z.ZodBoolean;
                    postRitualReveal: z.ZodBoolean;
                    abuseHandling: z.ZodUnion<[z.ZodLiteral<"immediate_ban">, z.ZodLiteral<"post_ritual_action">]>;
                }, "strip", z.ZodTypeAny, {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                }, {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                }>;
                anonymousDisplayName: z.ZodString;
                anonymousAvatarStyle: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            }, {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            }>>;
            moderation: z.ZodObject<{
                strategy: z.ZodUnion<[z.ZodLiteral<"increased_capacity">, z.ZodLiteral<"pre_moderation">, z.ZodLiteral<"community_flags">]>;
                autoModRules: z.ZodObject<{
                    enabled: z.ZodBoolean;
                    sensitivity: z.ZodUnion<[z.ZodLiteral<"low">, z.ZodLiteral<"medium">, z.ZodLiteral<"high">]>;
                    keywords: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                }, {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                }>;
                postRitualCleanup: z.ZodObject<{
                    enabled: z.ZodBoolean;
                    reviewAll: z.ZodBoolean;
                    deleteViolations: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                }, {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                }>;
            }, "strip", z.ZodTypeAny, {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            }, {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            }>;
            permanentRules: z.ZodArray<z.ZodObject<{
                ruleId: z.ZodString;
                ruleName: z.ZodString;
                enforcement: z.ZodLiteral<"strict">;
            }, "strip", z.ZodTypeAny, {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }, {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }>, "many">;
            currentInversions: z.ZodArray<z.ZodObject<{
                ruleId: z.ZodString;
                invertedAt: z.ZodString;
                revertedAt: z.ZodOptional<z.ZodString>;
                status: z.ZodUnion<[z.ZodLiteral<"inverted">, z.ZodLiteral<"reverted">, z.ZodLiteral<"error">]>;
            }, "strip", z.ZodTypeAny, {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }, {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }>, "many">;
            contentCreated: z.ZodObject<{
                posts: z.ZodNumber;
                comments: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                posts: number;
                comments: number;
            }, {
                posts: number;
                comments: number;
            }>;
            moderationActivity: z.ZodObject<{
                flagged: z.ZodNumber;
                removed: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                flagged: number;
                removed: number;
            }, {
                flagged: number;
                removed: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        }, {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        ruleInversion: {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        };
    }, {
        ruleInversion: {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        ruleInversion: {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        };
    };
    archetype: RitualArchetype.RuleInversion;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        ruleInversion: {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        };
    };
    archetype: RitualArchetype.RuleInversion;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>]>;
export type RitualUnionDto = z.infer<typeof RitualUnionSchema>;
export declare function parseRitualUnion(input: unknown): z.SafeParseReturnType<{
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        founding: {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        };
    };
    archetype: RitualArchetype.FoundingClass;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        countdown: {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        };
    };
    archetype: RitualArchetype.LaunchCountdown;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        lottery: {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        };
    };
    archetype: RitualArchetype.BetaLottery;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        unlock: {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        };
    };
    archetype: RitualArchetype.UnlockChallenge;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        survival: {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        };
    };
    archetype: RitualArchetype.Survival;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        leak: {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        };
    };
    archetype: RitualArchetype.Leak;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        tournament: {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        };
    };
    archetype: RitualArchetype.Tournament;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        featureDrop: {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        };
    };
    archetype: RitualArchetype.FeatureDrop;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        ruleInversion: {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        };
    };
    archetype: RitualArchetype.RuleInversion;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}, {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        founding: {
            limit: number;
            currentCount: number;
            deadline: string;
            founderBadge: {
                permanent: boolean;
                visibleOn: "profile";
                exclusive: boolean;
            };
            founderPerks: string[];
            founderWall: {
                enabled: boolean;
                showOrder: boolean;
                showTimestamp: boolean;
            };
            urgency: string;
            socialProof: string;
        };
    };
    archetype: RitualArchetype.FoundingClass;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        countdown: {
            targetRitual: string;
            launchDate: string;
            dailyUnlocks: {
                daysRemaining: number;
                reveal: string;
                content?: {
                    text: string;
                    image?: string | undefined;
                    video?: string | undefined;
                } | undefined;
            }[];
            activities: {
                predictions: boolean;
                trashTalk: boolean;
                teamSelection: boolean;
            };
            shareables: {
                countdownWidget: boolean;
                teaserVideo: boolean;
                bracketPreview: boolean;
            };
            preRegistration?: {
                enabled: boolean;
                entity: "spaces" | "users";
                goal: number;
                current: number;
            } | undefined;
        };
    };
    archetype: RitualArchetype.LaunchCountdown;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        lottery: {
            feature: {
                name: string;
                id: string;
                description: string;
                teaser: {
                    images: string[];
                    video?: string | undefined;
                    demo?: string | undefined;
                };
            };
            slots: number;
            applicants: number;
            entry: {
                deadline: string;
                requirement: "action" | "click" | "referral";
                multipleEntries: boolean;
            };
            drawing: {
                date: string;
                format: "instant" | "live_event" | "scheduled";
                notification: boolean;
                publicAnnouncement: boolean;
            };
            winnerAccess: {
                duration: number;
                featureFlags: string[];
                feedback: boolean;
                badge?: string | undefined;
            };
            loserFlow: {
                waitlist: boolean;
                consolationMessage: string;
                nextLottery?: string | undefined;
            };
        };
    };
    archetype: RitualArchetype.BetaLottery;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        unlock: {
            urgency: {
                remaining: string;
                timeLeft: string;
                encouragement: string;
            };
            goal: {
                deadline: string;
                current: number;
                metric: "custom" | "posts" | "comments" | "votes" | "joins";
                target: number;
            };
            reward: {
                name: string;
                type: "feature" | "ritual" | "content" | "prize";
                description: string;
                teaser: string;
                preview?: string | undefined;
            };
            visualization: {
                countdown: boolean;
                progressBar: boolean;
                percentage: boolean;
                recentActivity: boolean;
                leaderboard: boolean;
            };
            milestones: {
                unlock: string;
                message: string;
                threshold: number;
            }[];
        };
    };
    archetype: RitualArchetype.UnlockChallenge;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        survival: {
            participants: number;
            format: "instant_elimination";
            rounds: {
                number: number;
                duration: number;
                matchups: number;
                startTime: string;
            }[];
            liveUpdates: {
                realTime: boolean;
                updateInterval: number;
                notifications: boolean;
                commentary: string[];
            };
            elimination: {
                instant: boolean;
                messaging: string;
                soundEffect?: string | undefined;
            };
            eventWindow: {
                duration: number;
                start: string;
                end: string;
            };
            voting: {
                method: "direct_vote";
                showLiveCount: boolean;
                speed: "urgent";
            };
        };
    };
    archetype: RitualArchetype.Survival;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        leak: {
            reveal: {
                announcement: string;
                date: string;
                method: "instant" | "live_event" | "gradual";
            };
            shareables: {
                countdown: boolean;
                mysteryPoster: boolean;
                clueCards: boolean;
            };
            hiddenRitual: {
                name: string;
                archetype: string;
                launchDate: string;
            };
            clues: {
                day: number;
                clue: string;
                hint?: string | undefined;
                media?: string | undefined;
            }[];
            speculation: {
                enabled: boolean;
                voting: boolean;
                discussionSpace: string;
                prompt: string;
            };
        };
    };
    archetype: RitualArchetype.Leak;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        tournament: {
            prize: {
                title: string;
                badge: string;
                featuredDuration: number;
                specialPerks?: string[] | undefined;
            };
            participants: {
                type: "spaces" | "custom" | "majors" | "dorms" | "years";
                count: number;
                selection: "all" | "opt_in" | "admin_pick";
                seeding: "random" | "by_size" | "by_activity" | "manual";
            };
            format: "single_elimination" | "double_elimination" | "round_robin";
            rounds: {
                name: string;
                id: string;
                matchups: {
                    id: string;
                    status: "active" | "upcoming" | "completed";
                    roundId: string;
                    competitor1: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    competitor2: {
                        name: string;
                        id: string;
                        votes: number;
                    };
                    featuredInFeed: boolean;
                    winner?: string | undefined;
                }[];
                startDate: string;
                endDate: string;
            }[];
            voting: {
                mechanism: "direct_vote" | "posts_as_votes" | "reactions";
                postsAsVotes?: {
                    countMechanism: "any_mention" | "hashtag" | "space_posts";
                    voteWeight: {
                        post: number;
                        withMedia: number;
                        upvoted: number;
                    };
                    hashtag?: string | undefined;
                } | undefined;
                directVote?: {
                    allowMultiple: boolean;
                    voteChanging: boolean;
                } | undefined;
            };
            currentRound: string;
            liveMatchups: string[];
        };
    };
    archetype: RitualArchetype.Tournament;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        featureDrop: {
            analytics: {
                metrics: {
                    displayName: string;
                    key: string;
                    aggregation: "count" | "unique_users" | "avg";
                }[];
                trackUsage: boolean;
                realTimeUpdates: boolean;
            };
            feature: {
                name: string;
                id: string;
                description: string;
                demo?: {
                    video?: string | undefined;
                    images?: string[] | undefined;
                } | undefined;
            };
            featureFlags: {
                flagName: string;
                enabledDuring: "announced" | "active";
                autoDisable: boolean;
                fallbackBehavior: "hide" | "show_teaser" | "waitlist";
            }[];
            feedback: {
                enabled: boolean;
                timing: "during" | "after" | "both";
                questions: {
                    id: string;
                    type: "rating" | "nps" | "multiple_choice" | "open_text";
                    prompt: string;
                    options?: string[] | undefined;
                    required?: boolean | undefined;
                }[];
                incentive?: string | undefined;
            };
            framingStrategy: "limited_edition" | "exclusive_access" | "beta_test" | "game";
            urgencyMessage: string;
            eligibility: {
                scope: "custom" | "all" | "early_adopters" | "space_leaders";
                maxParticipants?: number | undefined;
            };
            postRitualPlan: {
                strategy: "waitlist" | "permanent_enable" | "recurring_ritual" | "sunset";
                threshold?: {
                    value: number;
                    metric: string;
                } | undefined;
                nextDate?: string | undefined;
            };
            currentParticipants: number;
            totalUsageEvents: number;
        };
    };
    archetype: RitualArchetype.FeatureDrop;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
} | {
    id: string;
    campusId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    config: {
        ruleInversion: {
            inversions: {
                featureFlags: string[];
                ruleId: string;
                ruleName: string;
                normalBehavior: string;
                invertedBehavior: string;
                middlewareOverrides: {
                    endpoint: string;
                    normalValidation: string;
                    invertedValidation: string;
                }[];
                canInvert: boolean;
                safetyNotes?: string | undefined;
            }[];
            moderation: {
                strategy: "increased_capacity" | "pre_moderation" | "community_flags";
                autoModRules: {
                    enabled: boolean;
                    sensitivity: "low" | "medium" | "high";
                    keywords: string[];
                };
                postRitualCleanup: {
                    enabled: boolean;
                    reviewAll: boolean;
                    deleteViolations: boolean;
                };
            };
            permanentRules: {
                ruleId: string;
                ruleName: string;
                enforcement: "strict";
            }[];
            currentInversions: {
                status: "inverted" | "reverted" | "error";
                ruleId: string;
                invertedAt: string;
                revertedAt?: string | undefined;
            }[];
            contentCreated: {
                posts: number;
                comments: number;
            };
            moderationActivity: {
                flagged: number;
                removed: number;
            };
            anonymity?: {
                enabled: boolean;
                scope: "all" | "posts" | "comments" | "reactions";
                identityStripping: {
                    removeAvatar: boolean;
                    removeHandle: boolean;
                    removeName: boolean;
                    pseudonym: "random" | "consistent_per_ritual" | "consistent_forever";
                };
                accountabilityLayer: {
                    logRealIdentity: boolean;
                    moderatorCanUnmask: boolean;
                    postRitualReveal: boolean;
                    abuseHandling: "immediate_ban" | "post_ritual_action";
                };
                anonymousDisplayName: string;
                anonymousAvatarStyle: string;
            } | undefined;
        };
    };
    archetype: RitualArchetype.RuleInversion;
    phase: "draft" | "announced" | "active" | "cooldown" | "ended";
    startsAt: string;
    endsAt: string;
    visibility: "public" | "invite_only" | "secret";
    slug?: string | undefined;
    subtitle?: string | undefined;
    description?: string | undefined;
    presentation?: {
        accentColor?: string | undefined;
        bannerImage?: string | undefined;
        icon?: string | undefined;
        ctaLabel?: string | undefined;
        ctaLink?: string | undefined;
        videoUrl?: string | undefined;
        spotlightSpaceId?: string | undefined;
    } | undefined;
    metrics?: {
        updatedAt?: string | undefined;
        participants?: number | undefined;
        submissions?: number | undefined;
        conversions?: number | undefined;
        completionRate?: number | undefined;
    } | undefined;
}>;
//# sourceMappingURL=archetypes.d.ts.map