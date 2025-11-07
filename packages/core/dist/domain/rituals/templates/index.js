"use strict";
/**
 * Ritual Templates Library
 *
 * Pre-configured ritual templates for rapid admin deployment.
 * Each template provides smart defaults for a specific archetype,
 * allowing < 30 second ritual creation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RITUAL_TEMPLATES = exports.BANG_ANONYMOUS_TEMPLATE = exports.DM_GAME_TEMPLATE = exports.DORM_WARS_TEMPLATE = exports.MAJOR_WARS_TEMPLATE = exports.CAMPUS_MADNESS_TEMPLATE = exports.LEAK_TEMPLATE = exports.SURVIVAL_TEMPLATE = exports.UNLOCK_CHALLENGE_TEMPLATE = exports.BETA_LOTTERY_TEMPLATE = exports.LAUNCH_COUNTDOWN_TEMPLATE = exports.FOUNDING_CLASS_TEMPLATE = void 0;
exports.getAvailableTemplates = getAvailableTemplates;
exports.getTemplate = getTemplate;
exports.getTemplatesByCategory = getTemplatesByCategory;
exports.getTemplatesByArchetype = getTemplatesByArchetype;
const archetypes_1 = require("../archetypes");
// ═════════════════════════════════════════════════════════════════
// COLD START TEMPLATES (0-500 users)
// ═════════════════════════════════════════════════════════════════
exports.FOUNDING_CLASS_TEMPLATE = {
    metadata: {
        id: 'founding-class',
        name: 'Founding Class',
        archetype: archetypes_1.RitualArchetype.FoundingClass,
        description: 'First 100 students get permanent founder status',
        category: 'cold_start',
        minUsers: 1,
        difficulty: 'easy',
        duration: '1 week',
        tags: ['launch', 'fomo', 'status', 'badges'],
    },
    defaults: {
        title: 'Founding Class',
        subtitle: 'Be Part of HIVE History',
        description: 'First 100 students to join get permanent Founder status and exclusive perks.',
        visibility: 'public',
        presentation: {
            accentColor: '#FFD700',
            icon: '🏆',
            ctaLabel: 'Claim Founder Status',
        },
        config: {
            founding: {
                limit: 100,
                currentCount: 0,
                deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                founderBadge: {
                    permanent: true,
                    visibleOn: 'profile',
                    exclusive: true,
                },
                founderPerks: [
                    'Founder Badge',
                    'Early access to new features',
                    'Exclusive Founder-only space',
                    'Priority support',
                ],
                founderWall: {
                    enabled: true,
                    showOrder: true,
                    showTimestamp: true,
                },
                urgency: 'Only {remaining} spots left!',
                socialProof: '{count} students already joined',
            },
        },
    },
};
exports.LAUNCH_COUNTDOWN_TEMPLATE = {
    metadata: {
        id: 'launch-countdown',
        name: 'Launch Countdown',
        archetype: archetypes_1.RitualArchetype.LaunchCountdown,
        description: 'Build anticipation for upcoming major ritual',
        category: 'cold_start',
        minUsers: 0,
        difficulty: 'medium',
        duration: '1-2 weeks',
        tags: ['hype', 'anticipation', 'marketing', 'pre-launch'],
    },
    defaults: {
        title: 'Campus Madness Coming Soon',
        subtitle: 'The Biggest Tournament Ever',
        description: 'Daily unlocks, bracket reveals, and more. Registration opens soon.',
        visibility: 'public',
        presentation: {
            accentColor: '#FF6B6B',
            icon: '⏰',
            ctaLabel: 'Pre-Register',
        },
        config: {
            countdown: {
                targetRitual: 'campus-madness',
                launchDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                dailyUnlocks: [
                    {
                        daysRemaining: 7,
                        reveal: 'Full bracket revealed!',
                        content: { text: 'See all 32 competing spaces' },
                    },
                    {
                        daysRemaining: 3,
                        reveal: 'Prize announcement',
                        content: { text: 'Winning space gets featured for 2 weeks' },
                    },
                    {
                        daysRemaining: 1,
                        reveal: 'Final hype video',
                        content: { text: 'Get ready for the biggest event of the semester' },
                    },
                ],
                preRegistration: {
                    enabled: true,
                    entity: 'spaces',
                    goal: 20,
                    current: 0,
                },
                activities: {
                    predictions: true,
                    trashTalk: true,
                    teamSelection: true,
                },
                shareables: {
                    countdownWidget: true,
                    teaserVideo: true,
                    bracketPreview: true,
                },
            },
        },
    },
};
exports.BETA_LOTTERY_TEMPLATE = {
    metadata: {
        id: 'beta-lottery',
        name: 'Beta Lottery',
        archetype: archetypes_1.RitualArchetype.BetaLottery,
        description: 'Random selection for exclusive feature beta access',
        category: 'cold_start',
        minUsers: 20,
        difficulty: 'easy',
        duration: '3 days',
        tags: ['feature', 'beta', 'lottery', 'fomo'],
    },
    defaults: {
        title: 'DM Beta Lottery',
        subtitle: '25 Winners Get 24h Access',
        description: 'We built Direct Messages. Enter to win early access.',
        visibility: 'public',
        presentation: {
            accentColor: '#9B59B6',
            icon: '🎟️',
            ctaLabel: 'Enter Lottery',
        },
        config: {
            lottery: {
                feature: {
                    id: 'direct-messages',
                    name: 'Direct Messages',
                    description: 'Private 1-on-1 conversations with any student',
                    teaser: {
                        images: [],
                        demo: '/demos/dm-beta.mp4',
                    },
                },
                slots: 25,
                applicants: 0,
                entry: {
                    requirement: 'click',
                    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                    multipleEntries: false,
                },
                drawing: {
                    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                    format: 'live_event',
                    notification: true,
                    publicAnnouncement: true,
                },
                winnerAccess: {
                    duration: 24,
                    featureFlags: ['enable_direct_messages'],
                    badge: 'Beta Tester',
                    feedback: true,
                },
                loserFlow: {
                    consolationMessage: 'Thanks for entering! Check back for future opportunities.',
                    waitlist: true,
                },
            },
        },
    },
};
exports.UNLOCK_CHALLENGE_TEMPLATE = {
    metadata: {
        id: 'unlock-challenge',
        name: 'Unlock Challenge',
        archetype: archetypes_1.RitualArchetype.UnlockChallenge,
        description: 'Campus works together to unlock reward',
        category: 'cold_start',
        minUsers: 20,
        difficulty: 'medium',
        duration: '3-7 days',
        tags: ['collective', 'goal', 'community', 'reward'],
    },
    defaults: {
        title: 'Unlock Bang Anonymous Day',
        subtitle: 'Campus Goal: 500 Posts',
        description: 'Post 500 times as a campus to unlock 24h of anonymous posting.',
        visibility: 'public',
        presentation: {
            accentColor: '#3498DB',
            icon: '🎯',
            ctaLabel: 'Post Now to Help',
        },
        config: {
            unlock: {
                goal: {
                    metric: 'posts',
                    target: 500,
                    current: 0,
                    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                },
                reward: {
                    type: 'ritual',
                    name: 'Bang Anonymous Day',
                    description: '24 hours of anonymous posting',
                    teaser: 'Campus rules suspended for one day',
                },
                visualization: {
                    progressBar: true,
                    percentage: true,
                    countdown: true,
                    recentActivity: true,
                    leaderboard: true,
                },
                milestones: [
                    { threshold: 100, unlock: '20% there', message: 'Great start!' },
                    { threshold: 250, unlock: '50% milestone', message: 'Halfway there!' },
                    { threshold: 400, unlock: '80% milestone', message: 'Almost there!' },
                ],
                urgency: {
                    remaining: 'Need {remaining} more posts!',
                    timeLeft: '{days} days left',
                    encouragement: 'We can do this!',
                },
            },
        },
    },
};
exports.SURVIVAL_TEMPLATE = {
    metadata: {
        id: 'survival-mode',
        name: 'Survival Mode',
        archetype: archetypes_1.RitualArchetype.Survival,
        description: 'Fast-paced 3-hour live elimination tournament',
        category: 'cold_start',
        minUsers: 50,
        difficulty: 'hard',
        duration: '3 hours',
        tags: ['live', 'fast', 'tournament', 'elimination'],
    },
    defaults: {
        title: 'Survival Mode',
        subtitle: 'Live Elimination Tournament',
        description: '8 spaces compete. 3 hours. Only 1 survives.',
        visibility: 'public',
        presentation: {
            accentColor: '#E74C3C',
            icon: '⚡',
            ctaLabel: 'Watch Live',
        },
        config: {
            survival: {
                format: 'instant_elimination',
                participants: 8,
                rounds: [
                    {
                        number: 1,
                        duration: 60,
                        matchups: 4,
                        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        number: 2,
                        duration: 60,
                        matchups: 2,
                        startTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        number: 3,
                        duration: 60,
                        matchups: 1,
                        startTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
                    },
                ],
                liveUpdates: {
                    realTime: true,
                    updateInterval: 30,
                    notifications: true,
                    commentary: [],
                },
                elimination: {
                    instant: true,
                    messaging: '{name} ELIMINATED',
                },
                eventWindow: {
                    start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    end: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString(),
                    duration: 180,
                },
                voting: {
                    method: 'direct_vote',
                    showLiveCount: true,
                    speed: 'urgent',
                },
            },
        },
    },
};
exports.LEAK_TEMPLATE = {
    metadata: {
        id: 'mystery-leak',
        name: 'Mystery Leak',
        archetype: archetypes_1.RitualArchetype.Leak,
        description: 'Build hype with cryptic daily clues',
        category: 'cold_start',
        minUsers: 20,
        difficulty: 'easy',
        duration: '5-7 days',
        tags: ['mystery', 'hype', 'speculation', 'marketing'],
    },
    defaults: {
        title: 'Something is Coming...',
        subtitle: 'Mystery Ritual Leaked',
        description: 'Daily clues reveal a major upcoming event.',
        visibility: 'public',
        presentation: {
            accentColor: '#8E44AD',
            icon: '🔮',
            ctaLabel: 'Discuss Theories',
        },
        config: {
            leak: {
                hiddenRitual: {
                    name: 'Bang Anonymous',
                    archetype: 'RULE_INVERSION',
                    launchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                },
                clues: [
                    { day: 5, clue: 'Rules will break' },
                    { day: 4, clue: 'Identity is optional' },
                    { day: 3, clue: 'November 15th' },
                    { day: 2, clue: 'Say what you really think' },
                    { day: 1, clue: 'Bang 💥' },
                ],
                reveal: {
                    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    method: 'instant',
                    announcement: 'BANG ANONYMOUS DAY - 24h of anonymous posting starts NOW',
                },
                speculation: {
                    enabled: true,
                    discussionSpace: 'campus-general',
                    prompt: 'What do you think is coming?',
                    voting: true,
                },
                shareables: {
                    mysteryPoster: true,
                    clueCards: true,
                    countdown: true,
                },
            },
        },
    },
};
// ═════════════════════════════════════════════════════════════════
// SCALE TEMPLATES (500+ users)
// ═════════════════════════════════════════════════════════════════
exports.CAMPUS_MADNESS_TEMPLATE = {
    metadata: {
        id: 'campus-madness',
        name: 'Campus Madness',
        archetype: archetypes_1.RitualArchetype.Tournament,
        description: '32-space single-elimination tournament',
        category: 'scale',
        minUsers: 200,
        difficulty: 'hard',
        duration: '2 weeks',
        tags: ['tournament', 'competition', 'bracket', 'voting'],
    },
    defaults: {
        title: 'Campus Madness',
        subtitle: 'The Ultimate Space Tournament',
        description: '32 spaces compete. Students vote. Only 1 winner.',
        visibility: 'public',
        presentation: {
            accentColor: '#F39C12',
            icon: '🏆',
            ctaLabel: 'Vote Now',
        },
        config: {
            tournament: {
                format: 'single_elimination',
                participants: {
                    type: 'spaces',
                    count: 32,
                    selection: 'opt_in',
                    seeding: 'by_activity',
                },
                rounds: [],
                currentRound: 'round-1',
                liveMatchups: [],
                voting: {
                    mechanism: 'direct_vote',
                    directVote: {
                        allowMultiple: false,
                        voteChanging: true,
                    },
                },
                prize: {
                    title: 'Campus Madness Champion',
                    badge: 'Champion Badge',
                    featuredDuration: 14,
                    specialPerks: ['Featured on feed for 2 weeks', 'Champion badge for all members'],
                },
            },
        },
    },
};
exports.MAJOR_WARS_TEMPLATE = {
    metadata: {
        id: 'major-wars',
        name: 'Major Wars',
        archetype: archetypes_1.RitualArchetype.Tournament,
        description: 'Majors compete in bracket tournament',
        category: 'scale',
        minUsers: 200,
        difficulty: 'medium',
        duration: '1 week',
        tags: ['tournament', 'academics', 'majors', 'competition'],
    },
    defaults: {
        title: 'Major Wars',
        subtitle: 'Which Major Reigns Supreme?',
        description: 'All majors compete. Students vote for their major.',
        visibility: 'public',
        presentation: {
            accentColor: '#16A085',
            icon: '📚',
            ctaLabel: 'Vote for Your Major',
        },
        config: {
            tournament: {
                format: 'single_elimination',
                participants: {
                    type: 'majors',
                    count: 16,
                    selection: 'all',
                    seeding: 'by_size',
                },
                rounds: [],
                currentRound: 'round-1',
                liveMatchups: [],
                voting: {
                    mechanism: 'direct_vote',
                    directVote: {
                        allowMultiple: false,
                        voteChanging: false,
                    },
                },
                prize: {
                    title: 'Best Major',
                    badge: 'Major Champion',
                    featuredDuration: 7,
                },
            },
        },
    },
};
exports.DORM_WARS_TEMPLATE = {
    metadata: {
        id: 'dorm-wars',
        name: 'Dorm Wars',
        archetype: archetypes_1.RitualArchetype.Tournament,
        description: 'Residence halls battle for supremacy',
        category: 'scale',
        minUsers: 200,
        difficulty: 'medium',
        duration: '1 week',
        tags: ['tournament', 'housing', 'dorms', 'community'],
    },
    defaults: {
        title: 'Dorm Wars',
        subtitle: 'Best Dorm on Campus',
        description: 'Residence halls compete. Show your dorm pride.',
        visibility: 'public',
        presentation: {
            accentColor: '#E67E22',
            icon: '🏠',
            ctaLabel: 'Vote for Your Dorm',
        },
        config: {
            tournament: {
                format: 'single_elimination',
                participants: {
                    type: 'dorms',
                    count: 8,
                    selection: 'all',
                    seeding: 'random',
                },
                rounds: [],
                currentRound: 'round-1',
                liveMatchups: [],
                voting: {
                    mechanism: 'direct_vote',
                    directVote: {
                        allowMultiple: false,
                        voteChanging: true,
                    },
                },
                prize: {
                    title: 'Best Dorm',
                    badge: 'Dorm Champion',
                    featuredDuration: 7,
                },
            },
        },
    },
};
exports.DM_GAME_TEMPLATE = {
    metadata: {
        id: 'dm-game',
        name: 'DM Game',
        archetype: archetypes_1.RitualArchetype.FeatureDrop,
        description: '24h limited edition Direct Messages feature',
        category: 'scale',
        minUsers: 100,
        difficulty: 'medium',
        duration: '24 hours',
        tags: ['feature', 'limited', 'messaging', 'beta'],
    },
    defaults: {
        title: 'DM Game',
        subtitle: 'Direct Messages - 24 Hours Only',
        description: 'Send private messages. Limited time only.',
        visibility: 'public',
        presentation: {
            accentColor: '#3498DB',
            icon: '💬',
            ctaLabel: 'Send a DM',
        },
        config: {
            featureDrop: {
                feature: {
                    id: 'direct-messages',
                    name: 'Direct Messages',
                    description: 'Private 1-on-1 messaging with any student',
                },
                framingStrategy: 'limited_edition',
                urgencyMessage: '24 HOURS ONLY',
                featureFlags: [
                    {
                        flagName: 'enable_direct_messages',
                        enabledDuring: 'active',
                        autoDisable: true,
                        fallbackBehavior: 'waitlist',
                    },
                ],
                eligibility: {
                    scope: 'all',
                },
                analytics: {
                    trackUsage: true,
                    metrics: [
                        { key: 'dm_sent', displayName: 'Messages Sent', aggregation: 'count' },
                        { key: 'unique_senders', displayName: 'Active Users', aggregation: 'unique_users' },
                    ],
                    realTimeUpdates: true,
                },
                feedback: {
                    enabled: true,
                    timing: 'after',
                    questions: [
                        {
                            id: 'nps',
                            prompt: 'Would you want DMs permanently?',
                            type: 'nps',
                            required: true,
                        },
                    ],
                },
                postRitualPlan: {
                    strategy: 'permanent_enable',
                    threshold: { metric: 'nps', value: 8 },
                },
                currentParticipants: 0,
                totalUsageEvents: 0,
            },
        },
    },
};
exports.BANG_ANONYMOUS_TEMPLATE = {
    metadata: {
        id: 'bang-anonymous',
        name: 'Bang Anonymous',
        archetype: archetypes_1.RitualArchetype.RuleInversion,
        description: '24h anonymous posting chaos',
        category: 'scale',
        minUsers: 500,
        difficulty: 'hard',
        duration: '24 hours',
        tags: ['chaos', 'anonymous', 'rules', 'controversial'],
    },
    defaults: {
        title: 'Bang Anonymous',
        subtitle: '24 Hours of Anonymous Posting',
        description: 'Identity hidden. Say what you really think.',
        visibility: 'public',
        presentation: {
            accentColor: '#95A5A6',
            icon: '🎭',
            ctaLabel: 'Post Anonymously',
        },
        config: {
            ruleInversion: {
                inversions: [
                    {
                        ruleId: 'feed-read-only',
                        ruleName: 'Feed Read-Only',
                        normalBehavior: 'Students cannot post directly to feed',
                        invertedBehavior: 'Students can post anonymously to feed',
                        featureFlags: ['enable_anonymous_feed_posts'],
                        middlewareOverrides: [],
                        canInvert: true,
                        safetyNotes: 'Requires active moderation',
                    },
                ],
                anonymity: {
                    enabled: true,
                    scope: 'posts',
                    identityStripping: {
                        removeAvatar: true,
                        removeHandle: true,
                        removeName: true,
                        pseudonym: 'consistent_per_ritual',
                    },
                    accountabilityLayer: {
                        logRealIdentity: true,
                        moderatorCanUnmask: true,
                        postRitualReveal: false,
                        abuseHandling: 'immediate_ban',
                    },
                    anonymousDisplayName: 'Anonymous Bull',
                    anonymousAvatarStyle: 'silhouette',
                },
                moderation: {
                    strategy: 'increased_capacity',
                    autoModRules: {
                        enabled: true,
                        sensitivity: 'high',
                        keywords: [],
                    },
                    postRitualCleanup: {
                        enabled: true,
                        reviewAll: true,
                        deleteViolations: true,
                    },
                },
                permanentRules: [
                    {
                        ruleId: 'no-harassment',
                        ruleName: 'No Harassment',
                        enforcement: 'strict',
                    },
                    {
                        ruleId: 'no-personal-info',
                        ruleName: 'No Personal Info',
                        enforcement: 'strict',
                    },
                ],
                currentInversions: [],
                contentCreated: { posts: 0, comments: 0 },
                moderationActivity: { flagged: 0, removed: 0 },
            },
        },
    },
};
// ═════════════════════════════════════════════════════════════════
// TEMPLATE REGISTRY
// ═════════════════════════════════════════════════════════════════
exports.RITUAL_TEMPLATES = {
    // Cold Start
    FOUNDING_CLASS: exports.FOUNDING_CLASS_TEMPLATE,
    LAUNCH_COUNTDOWN: exports.LAUNCH_COUNTDOWN_TEMPLATE,
    BETA_LOTTERY: exports.BETA_LOTTERY_TEMPLATE,
    UNLOCK_CHALLENGE: exports.UNLOCK_CHALLENGE_TEMPLATE,
    SURVIVAL: exports.SURVIVAL_TEMPLATE,
    LEAK: exports.LEAK_TEMPLATE,
    // Scale
    CAMPUS_MADNESS: exports.CAMPUS_MADNESS_TEMPLATE,
    MAJOR_WARS: exports.MAJOR_WARS_TEMPLATE,
    DORM_WARS: exports.DORM_WARS_TEMPLATE,
    DM_GAME: exports.DM_GAME_TEMPLATE,
    BANG_ANONYMOUS: exports.BANG_ANONYMOUS_TEMPLATE,
};
// Helper function to get available templates based on user count
function getAvailableTemplates(currentUsers) {
    return Object.values(exports.RITUAL_TEMPLATES)
        .filter((template) => currentUsers >= template.metadata.minUsers)
        .sort((a, b) => a.metadata.minUsers - b.metadata.minUsers);
}
// Helper function to get template by ID
function getTemplate(id) {
    return exports.RITUAL_TEMPLATES[id];
}
// Helper function to list templates by category
function getTemplatesByCategory(category) {
    return Object.values(exports.RITUAL_TEMPLATES).filter((template) => template.metadata.category === category);
}
// Helper function to list templates by archetype
function getTemplatesByArchetype(archetype) {
    return Object.values(exports.RITUAL_TEMPLATES).filter((template) => template.metadata.archetype === archetype);
}
//# sourceMappingURL=index.js.map