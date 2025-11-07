"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualUnionSchema = exports.RitualSchema = exports.RitualArchetype = void 0;
exports.parseRitualUnion = parseRitualUnion;
const zod_1 = require("zod");
var RitualArchetype;
(function (RitualArchetype) {
    RitualArchetype["FoundingClass"] = "FOUNDING_CLASS";
    RitualArchetype["LaunchCountdown"] = "LAUNCH_COUNTDOWN";
    RitualArchetype["BetaLottery"] = "BETA_LOTTERY";
    RitualArchetype["UnlockChallenge"] = "UNLOCK_CHALLENGE";
    RitualArchetype["Survival"] = "SURVIVAL";
    RitualArchetype["Leak"] = "LEAK";
    RitualArchetype["Tournament"] = "TOURNAMENT";
    RitualArchetype["FeatureDrop"] = "FEATURE_DROP";
    RitualArchetype["RuleInversion"] = "RULE_INVERSION";
})(RitualArchetype || (exports.RitualArchetype = RitualArchetype = {}));
exports.RitualSchema = zod_1.z.object({
    id: zod_1.z.string(),
    slug: zod_1.z.string().optional(),
    campusId: zod_1.z.string(),
    title: zod_1.z.string(),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    archetype: zod_1.z.nativeEnum(RitualArchetype),
    phase: zod_1.z.union([
        zod_1.z.literal("draft"),
        zod_1.z.literal("announced"),
        zod_1.z.literal("active"),
        zod_1.z.literal("cooldown"),
        zod_1.z.literal("ended"),
    ]),
    startsAt: zod_1.z.string(),
    endsAt: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    visibility: zod_1.z.union([
        zod_1.z.literal("public"),
        zod_1.z.literal("invite_only"),
        zod_1.z.literal("secret"),
    ]),
    presentation: zod_1.z
        .object({
        accentColor: zod_1.z.string().optional(),
        bannerImage: zod_1.z.string().optional(),
        icon: zod_1.z.string().optional(),
        ctaLabel: zod_1.z.string().optional(),
        ctaLink: zod_1.z.string().optional(),
        videoUrl: zod_1.z.string().optional(),
        spotlightSpaceId: zod_1.z.string().optional(),
    })
        .optional(),
    metrics: zod_1.z
        .object({
        participants: zod_1.z.number().optional(),
        submissions: zod_1.z.number().optional(),
        conversions: zod_1.z.number().optional(),
        completionRate: zod_1.z.number().optional(),
        updatedAt: zod_1.z.string().optional(),
    })
        .optional(),
    config: zod_1.z.record(zod_1.z.any()),
});
const FoundingClassConfigSchema = zod_1.z.object({
    limit: zod_1.z.number().int().positive(),
    currentCount: zod_1.z.number().int().nonnegative(),
    deadline: zod_1.z.string(),
    founderBadge: zod_1.z.object({
        permanent: zod_1.z.boolean(),
        visibleOn: zod_1.z.literal("profile"),
        exclusive: zod_1.z.boolean(),
    }),
    founderPerks: zod_1.z.array(zod_1.z.string()),
    founderWall: zod_1.z.object({
        enabled: zod_1.z.boolean(),
        showOrder: zod_1.z.boolean(),
        showTimestamp: zod_1.z.boolean(),
    }),
    urgency: zod_1.z.string(),
    socialProof: zod_1.z.string(),
});
const LaunchCountdownConfigSchema = zod_1.z.object({
    targetRitual: zod_1.z.string(),
    launchDate: zod_1.z.string(),
    dailyUnlocks: zod_1.z
        .array(zod_1.z.object({
        daysRemaining: zod_1.z.number().int().nonnegative(),
        reveal: zod_1.z.string(),
        content: zod_1.z
            .object({
            image: zod_1.z.string().optional(),
            video: zod_1.z.string().optional(),
            text: zod_1.z.string(),
        })
            .optional(),
    }))
        .max(30),
    preRegistration: zod_1.z
        .object({
        enabled: zod_1.z.boolean(),
        entity: zod_1.z.union([zod_1.z.literal("spaces"), zod_1.z.literal("users")]),
        goal: zod_1.z.number().int().positive(),
        current: zod_1.z.number().int().nonnegative(),
    })
        .optional(),
    activities: zod_1.z.object({
        predictions: zod_1.z.boolean(),
        trashTalk: zod_1.z.boolean(),
        teamSelection: zod_1.z.boolean(),
    }),
    shareables: zod_1.z.object({
        countdownWidget: zod_1.z.boolean(),
        teaserVideo: zod_1.z.boolean(),
        bracketPreview: zod_1.z.boolean(),
    }),
});
const BetaLotteryConfigSchema = zod_1.z.object({
    feature: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        teaser: zod_1.z.object({
            video: zod_1.z.string().optional(),
            images: zod_1.z.array(zod_1.z.string()),
            demo: zod_1.z.string().optional(),
        }),
    }),
    slots: zod_1.z.number().int().positive(),
    applicants: zod_1.z.number().int().nonnegative(),
    entry: zod_1.z.object({
        requirement: zod_1.z.union([zod_1.z.literal("click"), zod_1.z.literal("referral"), zod_1.z.literal("action")]),
        deadline: zod_1.z.string(),
        multipleEntries: zod_1.z.boolean(),
    }),
    drawing: zod_1.z.object({
        date: zod_1.z.string(),
        format: zod_1.z.union([zod_1.z.literal("instant"), zod_1.z.literal("live_event"), zod_1.z.literal("scheduled")]),
        notification: zod_1.z.boolean(),
        publicAnnouncement: zod_1.z.boolean(),
    }),
    winnerAccess: zod_1.z.object({
        duration: zod_1.z.number().int().positive(),
        featureFlags: zod_1.z.array(zod_1.z.string()),
        badge: zod_1.z.string().optional(),
        feedback: zod_1.z.boolean(),
    }),
    loserFlow: zod_1.z.object({
        consolationMessage: zod_1.z.string(),
        waitlist: zod_1.z.boolean(),
        nextLottery: zod_1.z.string().optional(),
    }),
});
const UnlockChallengeConfigSchema = zod_1.z.object({
    goal: zod_1.z.object({
        metric: zod_1.z.union([
            zod_1.z.literal("posts"),
            zod_1.z.literal("comments"),
            zod_1.z.literal("votes"),
            zod_1.z.literal("joins"),
            zod_1.z.literal("custom"),
        ]),
        target: zod_1.z.number().int().positive(),
        current: zod_1.z.number().int().nonnegative(),
        deadline: zod_1.z.string(),
    }),
    reward: zod_1.z.object({
        type: zod_1.z.union([zod_1.z.literal("ritual"), zod_1.z.literal("feature"), zod_1.z.literal("content"), zod_1.z.literal("prize")]),
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        teaser: zod_1.z.string(),
        preview: zod_1.z.string().optional(),
    }),
    visualization: zod_1.z.object({
        progressBar: zod_1.z.boolean(),
        percentage: zod_1.z.boolean(),
        countdown: zod_1.z.boolean(),
        recentActivity: zod_1.z.boolean(),
        leaderboard: zod_1.z.boolean(),
    }),
    milestones: zod_1.z.array(zod_1.z.object({
        threshold: zod_1.z.number().int().positive(),
        unlock: zod_1.z.string(),
        message: zod_1.z.string(),
    })),
    urgency: zod_1.z.object({
        remaining: zod_1.z.string(),
        timeLeft: zod_1.z.string(),
        encouragement: zod_1.z.string(),
    }),
});
const SurvivalConfigSchema = zod_1.z.object({
    format: zod_1.z.literal("instant_elimination"),
    participants: zod_1.z.number().int().positive(),
    rounds: zod_1.z.array(zod_1.z.object({
        number: zod_1.z.number().int().positive(),
        duration: zod_1.z.number().int().positive(),
        matchups: zod_1.z.number().int().positive(),
        startTime: zod_1.z.string(),
    })),
    liveUpdates: zod_1.z.object({
        realTime: zod_1.z.boolean(),
        updateInterval: zod_1.z.number().int().positive(),
        notifications: zod_1.z.boolean(),
        commentary: zod_1.z.array(zod_1.z.string()),
    }),
    elimination: zod_1.z.object({
        instant: zod_1.z.boolean(),
        messaging: zod_1.z.string(),
        soundEffect: zod_1.z.string().optional(),
    }),
    eventWindow: zod_1.z.object({
        start: zod_1.z.string(),
        end: zod_1.z.string(),
        duration: zod_1.z.number().int().positive(),
    }),
    voting: zod_1.z.object({
        method: zod_1.z.literal("direct_vote"),
        showLiveCount: zod_1.z.boolean(),
        speed: zod_1.z.literal("urgent"),
    }),
});
const LeakConfigSchema = zod_1.z.object({
    hiddenRitual: zod_1.z.object({
        name: zod_1.z.string(),
        archetype: zod_1.z.string(),
        launchDate: zod_1.z.string(),
    }),
    clues: zod_1.z.array(zod_1.z.object({
        day: zod_1.z.number().int().nonnegative(),
        clue: zod_1.z.string(),
        hint: zod_1.z.string().optional(),
        media: zod_1.z.string().optional(),
    })),
    reveal: zod_1.z.object({
        date: zod_1.z.string(),
        method: zod_1.z.union([zod_1.z.literal("instant"), zod_1.z.literal("gradual"), zod_1.z.literal("live_event")]),
        announcement: zod_1.z.string(),
    }),
    speculation: zod_1.z.object({
        enabled: zod_1.z.boolean(),
        discussionSpace: zod_1.z.string(),
        prompt: zod_1.z.string(),
        voting: zod_1.z.boolean(),
    }),
    shareables: zod_1.z.object({
        mysteryPoster: zod_1.z.boolean(),
        clueCards: zod_1.z.boolean(),
        countdown: zod_1.z.boolean(),
    }),
});
const TournamentMatchupSchema = zod_1.z.object({
    id: zod_1.z.string(),
    roundId: zod_1.z.string(),
    competitor1: zod_1.z.object({ id: zod_1.z.string(), name: zod_1.z.string(), votes: zod_1.z.number().int().nonnegative() }),
    competitor2: zod_1.z.object({ id: zod_1.z.string(), name: zod_1.z.string(), votes: zod_1.z.number().int().nonnegative() }),
    status: zod_1.z.union([zod_1.z.literal("upcoming"), zod_1.z.literal("active"), zod_1.z.literal("completed")]),
    winner: zod_1.z.string().optional(),
    featuredInFeed: zod_1.z.boolean(),
});
const TournamentConfigSchema = zod_1.z.object({
    format: zod_1.z.union([zod_1.z.literal("single_elimination"), zod_1.z.literal("double_elimination"), zod_1.z.literal("round_robin")]),
    participants: zod_1.z.object({
        type: zod_1.z.union([zod_1.z.literal("spaces"), zod_1.z.literal("majors"), zod_1.z.literal("dorms"), zod_1.z.literal("years"), zod_1.z.literal("custom")]),
        count: zod_1.z.number().int().positive(),
        selection: zod_1.z.union([zod_1.z.literal("all"), zod_1.z.literal("opt_in"), zod_1.z.literal("admin_pick")]),
        seeding: zod_1.z.union([zod_1.z.literal("random"), zod_1.z.literal("by_size"), zod_1.z.literal("by_activity"), zod_1.z.literal("manual")]),
    }),
    rounds: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        matchups: zod_1.z.array(TournamentMatchupSchema),
    })),
    currentRound: zod_1.z.string(),
    liveMatchups: zod_1.z.array(zod_1.z.string()),
    voting: zod_1.z.object({
        mechanism: zod_1.z.union([zod_1.z.literal("direct_vote"), zod_1.z.literal("posts_as_votes"), zod_1.z.literal("reactions")]),
        postsAsVotes: zod_1.z
            .object({
            countMechanism: zod_1.z.union([zod_1.z.literal("any_mention"), zod_1.z.literal("hashtag"), zod_1.z.literal("space_posts")]),
            hashtag: zod_1.z.string().optional(),
            voteWeight: zod_1.z.object({
                post: zod_1.z.number().int().positive(),
                withMedia: zod_1.z.number().int().positive(),
                upvoted: zod_1.z.number().int().positive(),
            }),
        })
            .optional(),
        directVote: zod_1.z
            .object({
            allowMultiple: zod_1.z.boolean(),
            voteChanging: zod_1.z.boolean(),
        })
            .optional(),
    }),
    prize: zod_1.z.object({
        title: zod_1.z.string(),
        badge: zod_1.z.string(),
        featuredDuration: zod_1.z.number().int().positive(),
        specialPerks: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
const FeatureDropAnalyticsMetricSchema = zod_1.z.object({
    key: zod_1.z.string(),
    displayName: zod_1.z.string(),
    aggregation: zod_1.z.union([zod_1.z.literal("count"), zod_1.z.literal("unique_users"), zod_1.z.literal("avg")]),
});
const FeatureDropSurveyQuestionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    prompt: zod_1.z.string(),
    type: zod_1.z.union([zod_1.z.literal("rating"), zod_1.z.literal("nps"), zod_1.z.literal("multiple_choice"), zod_1.z.literal("open_text")]),
    options: zod_1.z.array(zod_1.z.string()).optional(),
    required: zod_1.z.boolean().optional(),
});
const FeatureDropConfigSchema = zod_1.z.object({
    feature: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        demo: zod_1.z
            .object({
            video: zod_1.z.string(),
            images: zod_1.z.array(zod_1.z.string()),
        })
            .partial()
            .optional(),
    }),
    framingStrategy: zod_1.z.union([
        zod_1.z.literal("limited_edition"),
        zod_1.z.literal("exclusive_access"),
        zod_1.z.literal("beta_test"),
        zod_1.z.literal("game"),
    ]),
    urgencyMessage: zod_1.z.string(),
    featureFlags: zod_1.z.array(zod_1.z.object({
        flagName: zod_1.z.string(),
        enabledDuring: zod_1.z.union([zod_1.z.literal("announced"), zod_1.z.literal("active")]),
        autoDisable: zod_1.z.boolean(),
        fallbackBehavior: zod_1.z.union([zod_1.z.literal("hide"), zod_1.z.literal("show_teaser"), zod_1.z.literal("waitlist")]),
    })),
    eligibility: zod_1.z.object({
        scope: zod_1.z.union([zod_1.z.literal("all"), zod_1.z.literal("early_adopters"), zod_1.z.literal("space_leaders"), zod_1.z.literal("custom")]),
        maxParticipants: zod_1.z.number().int().positive().optional(),
    }),
    analytics: zod_1.z.object({
        trackUsage: zod_1.z.boolean(),
        metrics: zod_1.z.array(FeatureDropAnalyticsMetricSchema),
        realTimeUpdates: zod_1.z.boolean(),
    }),
    feedback: zod_1.z.object({
        enabled: zod_1.z.boolean(),
        timing: zod_1.z.union([zod_1.z.literal("during"), zod_1.z.literal("after"), zod_1.z.literal("both")]),
        questions: zod_1.z.array(FeatureDropSurveyQuestionSchema),
        incentive: zod_1.z.string().optional(),
    }),
    postRitualPlan: zod_1.z.object({
        strategy: zod_1.z.union([
            zod_1.z.literal("permanent_enable"),
            zod_1.z.literal("recurring_ritual"),
            zod_1.z.literal("waitlist"),
            zod_1.z.literal("sunset"),
        ]),
        nextDate: zod_1.z.string().optional(),
        threshold: zod_1.z
            .object({
            metric: zod_1.z.string(),
            value: zod_1.z.number(),
        })
            .optional(),
    }),
    currentParticipants: zod_1.z.number().int().nonnegative(),
    totalUsageEvents: zod_1.z.number().int().nonnegative(),
});
const RuleInversionGuardrailSchema = zod_1.z.object({
    ruleId: zod_1.z.string(),
    ruleName: zod_1.z.string(),
    enforcement: zod_1.z.literal("strict"),
});
const RuleInversionConfigSchema = zod_1.z.object({
    inversions: zod_1.z.array(zod_1.z.object({
        ruleId: zod_1.z.string(),
        ruleName: zod_1.z.string(),
        normalBehavior: zod_1.z.string(),
        invertedBehavior: zod_1.z.string(),
        featureFlags: zod_1.z.array(zod_1.z.string()),
        middlewareOverrides: zod_1.z.array(zod_1.z.object({
            endpoint: zod_1.z.string(),
            normalValidation: zod_1.z.string(),
            invertedValidation: zod_1.z.string(),
        })),
        canInvert: zod_1.z.boolean(),
        safetyNotes: zod_1.z.string().optional(),
    })),
    anonymity: zod_1.z
        .object({
        enabled: zod_1.z.boolean(),
        scope: zod_1.z.union([zod_1.z.literal("posts"), zod_1.z.literal("comments"), zod_1.z.literal("reactions"), zod_1.z.literal("all")]),
        identityStripping: zod_1.z.object({
            removeAvatar: zod_1.z.boolean(),
            removeHandle: zod_1.z.boolean(),
            removeName: zod_1.z.boolean(),
            pseudonym: zod_1.z.union([
                zod_1.z.literal("random"),
                zod_1.z.literal("consistent_per_ritual"),
                zod_1.z.literal("consistent_forever"),
            ]),
        }),
        accountabilityLayer: zod_1.z.object({
            logRealIdentity: zod_1.z.boolean(),
            moderatorCanUnmask: zod_1.z.boolean(),
            postRitualReveal: zod_1.z.boolean(),
            abuseHandling: zod_1.z.union([zod_1.z.literal("immediate_ban"), zod_1.z.literal("post_ritual_action")]),
        }),
        anonymousDisplayName: zod_1.z.string(),
        anonymousAvatarStyle: zod_1.z.string(),
    })
        .optional(),
    moderation: zod_1.z.object({
        strategy: zod_1.z.union([zod_1.z.literal("increased_capacity"), zod_1.z.literal("pre_moderation"), zod_1.z.literal("community_flags")]),
        autoModRules: zod_1.z.object({
            enabled: zod_1.z.boolean(),
            sensitivity: zod_1.z.union([zod_1.z.literal("low"), zod_1.z.literal("medium"), zod_1.z.literal("high")]),
            keywords: zod_1.z.array(zod_1.z.string()),
        }),
        postRitualCleanup: zod_1.z.object({
            enabled: zod_1.z.boolean(),
            reviewAll: zod_1.z.boolean(),
            deleteViolations: zod_1.z.boolean(),
        }),
    }),
    permanentRules: zod_1.z.array(RuleInversionGuardrailSchema),
    currentInversions: zod_1.z.array(zod_1.z.object({
        ruleId: zod_1.z.string(),
        invertedAt: zod_1.z.string(),
        revertedAt: zod_1.z.string().optional(),
        status: zod_1.z.union([zod_1.z.literal("inverted"), zod_1.z.literal("reverted"), zod_1.z.literal("error")]),
    })),
    contentCreated: zod_1.z.object({ posts: zod_1.z.number().int().nonnegative(), comments: zod_1.z.number().int().nonnegative() }),
    moderationActivity: zod_1.z.object({ flagged: zod_1.z.number().int().nonnegative(), removed: zod_1.z.number().int().nonnegative() }),
});
const FoundingClassRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.FoundingClass),
    config: zod_1.z.object({
        founding: FoundingClassConfigSchema,
    }),
});
const LaunchCountdownRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.LaunchCountdown),
    config: zod_1.z.object({
        countdown: LaunchCountdownConfigSchema,
    }),
});
const BetaLotteryRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.BetaLottery),
    config: zod_1.z.object({
        lottery: BetaLotteryConfigSchema,
    }),
});
const UnlockChallengeRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.UnlockChallenge),
    config: zod_1.z.object({
        unlock: UnlockChallengeConfigSchema,
    }),
});
const SurvivalRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.Survival),
    config: zod_1.z.object({
        survival: SurvivalConfigSchema,
    }),
});
const LeakRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.Leak),
    config: zod_1.z.object({
        leak: LeakConfigSchema,
    }),
});
const TournamentRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.Tournament),
    config: zod_1.z.object({
        tournament: TournamentConfigSchema,
    }),
});
const FeatureDropRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.FeatureDrop),
    config: zod_1.z.object({
        featureDrop: FeatureDropConfigSchema,
    }),
});
const RuleInversionRitualSchema = exports.RitualSchema.extend({
    archetype: zod_1.z.literal(RitualArchetype.RuleInversion),
    config: zod_1.z.object({
        ruleInversion: RuleInversionConfigSchema,
    }),
});
exports.RitualUnionSchema = zod_1.z.union([
    FoundingClassRitualSchema,
    LaunchCountdownRitualSchema,
    BetaLotteryRitualSchema,
    UnlockChallengeRitualSchema,
    SurvivalRitualSchema,
    LeakRitualSchema,
    TournamentRitualSchema,
    FeatureDropRitualSchema,
    RuleInversionRitualSchema,
]);
function parseRitualUnion(input) {
    return exports.RitualUnionSchema.safeParse(input);
}
//# sourceMappingURL=archetypes.js.map