import { z } from "zod";
export var RitualArchetype;
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
})(RitualArchetype || (RitualArchetype = {}));
export const RitualSchema = z.object({
    id: z.string(),
    slug: z.string().optional(),
    campusId: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    archetype: z.nativeEnum(RitualArchetype),
    phase: z.union([
        z.literal("draft"),
        z.literal("announced"),
        z.literal("active"),
        z.literal("cooldown"),
        z.literal("ended"),
    ]),
    startsAt: z.string(),
    endsAt: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    visibility: z.union([
        z.literal("public"),
        z.literal("invite_only"),
        z.literal("secret"),
    ]),
    presentation: z
        .object({
        accentColor: z.string().optional(),
        bannerImage: z.string().optional(),
        icon: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaLink: z.string().optional(),
        videoUrl: z.string().optional(),
        spotlightSpaceId: z.string().optional(),
    })
        .optional(),
    metrics: z
        .object({
        participants: z.number().optional(),
        submissions: z.number().optional(),
        conversions: z.number().optional(),
        completionRate: z.number().optional(),
        updatedAt: z.string().optional(),
    })
        .optional(),
    config: z.record(z.any()),
});
const FoundingClassConfigSchema = z.object({
    limit: z.number().int().positive(),
    currentCount: z.number().int().nonnegative(),
    deadline: z.string(),
    founderBadge: z.object({
        permanent: z.boolean(),
        visibleOn: z.literal("profile"),
        exclusive: z.boolean(),
    }),
    founderPerks: z.array(z.string()),
    founderWall: z.object({
        enabled: z.boolean(),
        showOrder: z.boolean(),
        showTimestamp: z.boolean(),
    }),
    urgency: z.string(),
    socialProof: z.string(),
});
const LaunchCountdownConfigSchema = z.object({
    targetRitual: z.string(),
    launchDate: z.string(),
    dailyUnlocks: z
        .array(z.object({
        daysRemaining: z.number().int().nonnegative(),
        reveal: z.string(),
        content: z
            .object({
            image: z.string().optional(),
            video: z.string().optional(),
            text: z.string(),
        })
            .optional(),
    }))
        .max(30),
    preRegistration: z
        .object({
        enabled: z.boolean(),
        entity: z.union([z.literal("spaces"), z.literal("users")]),
        goal: z.number().int().positive(),
        current: z.number().int().nonnegative(),
    })
        .optional(),
    activities: z.object({
        predictions: z.boolean(),
        trashTalk: z.boolean(),
        teamSelection: z.boolean(),
    }),
    shareables: z.object({
        countdownWidget: z.boolean(),
        teaserVideo: z.boolean(),
        bracketPreview: z.boolean(),
    }),
});
const BetaLotteryConfigSchema = z.object({
    feature: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        teaser: z.object({
            video: z.string().optional(),
            images: z.array(z.string()),
            demo: z.string().optional(),
        }),
    }),
    slots: z.number().int().positive(),
    applicants: z.number().int().nonnegative(),
    entry: z.object({
        requirement: z.union([z.literal("click"), z.literal("referral"), z.literal("action")]),
        deadline: z.string(),
        multipleEntries: z.boolean(),
    }),
    drawing: z.object({
        date: z.string(),
        format: z.union([z.literal("instant"), z.literal("live_event"), z.literal("scheduled")]),
        notification: z.boolean(),
        publicAnnouncement: z.boolean(),
    }),
    winnerAccess: z.object({
        duration: z.number().int().positive(),
        featureFlags: z.array(z.string()),
        badge: z.string().optional(),
        feedback: z.boolean(),
    }),
    loserFlow: z.object({
        consolationMessage: z.string(),
        waitlist: z.boolean(),
        nextLottery: z.string().optional(),
    }),
});
const UnlockChallengeConfigSchema = z.object({
    goal: z.object({
        metric: z.union([
            z.literal("posts"),
            z.literal("comments"),
            z.literal("votes"),
            z.literal("joins"),
            z.literal("custom"),
        ]),
        target: z.number().int().positive(),
        current: z.number().int().nonnegative(),
        deadline: z.string(),
    }),
    reward: z.object({
        type: z.union([z.literal("ritual"), z.literal("feature"), z.literal("content"), z.literal("prize")]),
        name: z.string(),
        description: z.string(),
        teaser: z.string(),
        preview: z.string().optional(),
    }),
    visualization: z.object({
        progressBar: z.boolean(),
        percentage: z.boolean(),
        countdown: z.boolean(),
        recentActivity: z.boolean(),
        leaderboard: z.boolean(),
    }),
    milestones: z.array(z.object({
        threshold: z.number().int().positive(),
        unlock: z.string(),
        message: z.string(),
    })),
    urgency: z.object({
        remaining: z.string(),
        timeLeft: z.string(),
        encouragement: z.string(),
    }),
});
const SurvivalConfigSchema = z.object({
    format: z.literal("instant_elimination"),
    participants: z.number().int().positive(),
    rounds: z.array(z.object({
        number: z.number().int().positive(),
        duration: z.number().int().positive(),
        matchups: z.number().int().positive(),
        startTime: z.string(),
    })),
    liveUpdates: z.object({
        realTime: z.boolean(),
        updateInterval: z.number().int().positive(),
        notifications: z.boolean(),
        commentary: z.array(z.string()),
    }),
    elimination: z.object({
        instant: z.boolean(),
        messaging: z.string(),
        soundEffect: z.string().optional(),
    }),
    eventWindow: z.object({
        start: z.string(),
        end: z.string(),
        duration: z.number().int().positive(),
    }),
    voting: z.object({
        method: z.literal("direct_vote"),
        showLiveCount: z.boolean(),
        speed: z.literal("urgent"),
    }),
});
const LeakConfigSchema = z.object({
    hiddenRitual: z.object({
        name: z.string(),
        archetype: z.string(),
        launchDate: z.string(),
    }),
    clues: z.array(z.object({
        day: z.number().int().nonnegative(),
        clue: z.string(),
        hint: z.string().optional(),
        media: z.string().optional(),
    })),
    reveal: z.object({
        date: z.string(),
        method: z.union([z.literal("instant"), z.literal("gradual"), z.literal("live_event")]),
        announcement: z.string(),
    }),
    speculation: z.object({
        enabled: z.boolean(),
        discussionSpace: z.string(),
        prompt: z.string(),
        voting: z.boolean(),
    }),
    shareables: z.object({
        mysteryPoster: z.boolean(),
        clueCards: z.boolean(),
        countdown: z.boolean(),
    }),
});
const TournamentMatchupSchema = z.object({
    id: z.string(),
    roundId: z.string(),
    competitor1: z.object({ id: z.string(), name: z.string(), votes: z.number().int().nonnegative() }),
    competitor2: z.object({ id: z.string(), name: z.string(), votes: z.number().int().nonnegative() }),
    status: z.union([z.literal("upcoming"), z.literal("active"), z.literal("completed")]),
    winner: z.string().optional(),
    featuredInFeed: z.boolean(),
});
const TournamentConfigSchema = z.object({
    format: z.union([z.literal("single_elimination"), z.literal("double_elimination"), z.literal("round_robin")]),
    participants: z.object({
        type: z.union([z.literal("spaces"), z.literal("majors"), z.literal("dorms"), z.literal("years"), z.literal("custom")]),
        count: z.number().int().positive(),
        selection: z.union([z.literal("all"), z.literal("opt_in"), z.literal("admin_pick")]),
        seeding: z.union([z.literal("random"), z.literal("by_size"), z.literal("by_activity"), z.literal("manual")]),
    }),
    rounds: z.array(z.object({
        id: z.string(),
        name: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        matchups: z.array(TournamentMatchupSchema),
    })),
    currentRound: z.string(),
    liveMatchups: z.array(z.string()),
    voting: z.object({
        mechanism: z.union([z.literal("direct_vote"), z.literal("posts_as_votes"), z.literal("reactions")]),
        postsAsVotes: z
            .object({
            countMechanism: z.union([z.literal("any_mention"), z.literal("hashtag"), z.literal("space_posts")]),
            hashtag: z.string().optional(),
            voteWeight: z.object({
                post: z.number().int().positive(),
                withMedia: z.number().int().positive(),
                upvoted: z.number().int().positive(),
            }),
        })
            .optional(),
        directVote: z
            .object({
            allowMultiple: z.boolean(),
            voteChanging: z.boolean(),
        })
            .optional(),
    }),
    prize: z.object({
        title: z.string(),
        badge: z.string(),
        featuredDuration: z.number().int().positive(),
        specialPerks: z.array(z.string()).optional(),
    }),
});
const FeatureDropAnalyticsMetricSchema = z.object({
    key: z.string(),
    displayName: z.string(),
    aggregation: z.union([z.literal("count"), z.literal("unique_users"), z.literal("avg")]),
});
const FeatureDropSurveyQuestionSchema = z.object({
    id: z.string(),
    prompt: z.string(),
    type: z.union([z.literal("rating"), z.literal("nps"), z.literal("multiple_choice"), z.literal("open_text")]),
    options: z.array(z.string()).optional(),
    required: z.boolean().optional(),
});
const FeatureDropConfigSchema = z.object({
    feature: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        demo: z
            .object({
            video: z.string(),
            images: z.array(z.string()),
        })
            .partial()
            .optional(),
    }),
    framingStrategy: z.union([
        z.literal("limited_edition"),
        z.literal("exclusive_access"),
        z.literal("beta_test"),
        z.literal("game"),
    ]),
    urgencyMessage: z.string(),
    featureFlags: z.array(z.object({
        flagName: z.string(),
        enabledDuring: z.union([z.literal("announced"), z.literal("active")]),
        autoDisable: z.boolean(),
        fallbackBehavior: z.union([z.literal("hide"), z.literal("show_teaser"), z.literal("waitlist")]),
    })),
    eligibility: z.object({
        scope: z.union([z.literal("all"), z.literal("early_adopters"), z.literal("space_leaders"), z.literal("custom")]),
        maxParticipants: z.number().int().positive().optional(),
    }),
    analytics: z.object({
        trackUsage: z.boolean(),
        metrics: z.array(FeatureDropAnalyticsMetricSchema),
        realTimeUpdates: z.boolean(),
    }),
    feedback: z.object({
        enabled: z.boolean(),
        timing: z.union([z.literal("during"), z.literal("after"), z.literal("both")]),
        questions: z.array(FeatureDropSurveyQuestionSchema),
        incentive: z.string().optional(),
    }),
    postRitualPlan: z.object({
        strategy: z.union([
            z.literal("permanent_enable"),
            z.literal("recurring_ritual"),
            z.literal("waitlist"),
            z.literal("sunset"),
        ]),
        nextDate: z.string().optional(),
        threshold: z
            .object({
            metric: z.string(),
            value: z.number(),
        })
            .optional(),
    }),
    currentParticipants: z.number().int().nonnegative(),
    totalUsageEvents: z.number().int().nonnegative(),
});
const RuleInversionGuardrailSchema = z.object({
    ruleId: z.string(),
    ruleName: z.string(),
    enforcement: z.literal("strict"),
});
const RuleInversionConfigSchema = z.object({
    inversions: z.array(z.object({
        ruleId: z.string(),
        ruleName: z.string(),
        normalBehavior: z.string(),
        invertedBehavior: z.string(),
        featureFlags: z.array(z.string()),
        middlewareOverrides: z.array(z.object({
            endpoint: z.string(),
            normalValidation: z.string(),
            invertedValidation: z.string(),
        })),
        canInvert: z.boolean(),
        safetyNotes: z.string().optional(),
    })),
    anonymity: z
        .object({
        enabled: z.boolean(),
        scope: z.union([z.literal("posts"), z.literal("comments"), z.literal("reactions"), z.literal("all")]),
        identityStripping: z.object({
            removeAvatar: z.boolean(),
            removeHandle: z.boolean(),
            removeName: z.boolean(),
            pseudonym: z.union([
                z.literal("random"),
                z.literal("consistent_per_ritual"),
                z.literal("consistent_forever"),
            ]),
        }),
        accountabilityLayer: z.object({
            logRealIdentity: z.boolean(),
            moderatorCanUnmask: z.boolean(),
            postRitualReveal: z.boolean(),
            abuseHandling: z.union([z.literal("immediate_ban"), z.literal("post_ritual_action")]),
        }),
        anonymousDisplayName: z.string(),
        anonymousAvatarStyle: z.string(),
    })
        .optional(),
    moderation: z.object({
        strategy: z.union([z.literal("increased_capacity"), z.literal("pre_moderation"), z.literal("community_flags")]),
        autoModRules: z.object({
            enabled: z.boolean(),
            sensitivity: z.union([z.literal("low"), z.literal("medium"), z.literal("high")]),
            keywords: z.array(z.string()),
        }),
        postRitualCleanup: z.object({
            enabled: z.boolean(),
            reviewAll: z.boolean(),
            deleteViolations: z.boolean(),
        }),
    }),
    permanentRules: z.array(RuleInversionGuardrailSchema),
    currentInversions: z.array(z.object({
        ruleId: z.string(),
        invertedAt: z.string(),
        revertedAt: z.string().optional(),
        status: z.union([z.literal("inverted"), z.literal("reverted"), z.literal("error")]),
    })),
    contentCreated: z.object({ posts: z.number().int().nonnegative(), comments: z.number().int().nonnegative() }),
    moderationActivity: z.object({ flagged: z.number().int().nonnegative(), removed: z.number().int().nonnegative() }),
});
const FoundingClassRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.FoundingClass),
    config: z.object({
        founding: FoundingClassConfigSchema,
    }),
});
const LaunchCountdownRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.LaunchCountdown),
    config: z.object({
        countdown: LaunchCountdownConfigSchema,
    }),
});
const BetaLotteryRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.BetaLottery),
    config: z.object({
        lottery: BetaLotteryConfigSchema,
    }),
});
const UnlockChallengeRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.UnlockChallenge),
    config: z.object({
        unlock: UnlockChallengeConfigSchema,
    }),
});
const SurvivalRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.Survival),
    config: z.object({
        survival: SurvivalConfigSchema,
    }),
});
const LeakRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.Leak),
    config: z.object({
        leak: LeakConfigSchema,
    }),
});
const TournamentRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.Tournament),
    config: z.object({
        tournament: TournamentConfigSchema,
    }),
});
const FeatureDropRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.FeatureDrop),
    config: z.object({
        featureDrop: FeatureDropConfigSchema,
    }),
});
const RuleInversionRitualSchema = RitualSchema.extend({
    archetype: z.literal(RitualArchetype.RuleInversion),
    config: z.object({
        ruleInversion: RuleInversionConfigSchema,
    }),
});
export const RitualUnionSchema = z.union([
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
export function parseRitualUnion(input) {
    return RitualUnionSchema.safeParse(input);
}
//# sourceMappingURL=archetypes.js.map