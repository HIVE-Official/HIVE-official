import { z } from "zod";
import {
  RitualArchetype,
} from "./archetypes";

export const RitualComposerSchema = z.object({
  campusId: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().max(140).optional(),
  description: z.string().min(10, "Description is required"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/i, "Slug may only contain letters, numbers, and hyphens")
    .optional(),
  archetype: z.nativeEnum(RitualArchetype),
  startsAt: z.string().min(1),
  endsAt: z.string().min(1),
  visibility: z
    .union([
      z.literal("public"),
      z.literal("invite_only"),
      z.literal("secret"),
    ])
    .default("public"),
  presentation: z
    .object({
      accentColor: z.string().optional(),
      bannerImage: z.string().optional(),
      icon: z.string().optional(),
      ctaLabel: z.string().optional(),
      ctaLink: z.string().optional(),
      videoUrl: z.string().optional(),
    })
    .optional(),
  config: z.record(z.any()).default({}),
});

export type RitualComposerInput = z.infer<typeof RitualComposerSchema>;

export function createDefaultConfig(archetype: RitualArchetype): Record<string, unknown> {
  const now = new Date();
  const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();

  switch (archetype) {
    case RitualArchetype.FoundingClass:
      return {
        founding: {
          limit: 100,
          currentCount: 0,
          deadline: inThreeDays,
          founderBadge: {
            permanent: true,
            visibleOn: "profile",
            exclusive: true,
          },
          founderPerks: ["Priority access", "Founder badge"],
          founderWall: {
            enabled: true,
            showOrder: true,
            showTimestamp: true,
          },
          urgency: "Only 100 spots",
          socialProof: "Be among the first to join",
        },
      };
    case RitualArchetype.LaunchCountdown:
      return {
        countdown: {
          targetRitual: "founding-class",
          launchDate: inThreeDays,
          dailyUnlocks: [
            {
              daysRemaining: 3,
              reveal: "Teaser content goes live",
              content: {
                text: "Get ready for launch week reveals.",
              },
            },
          ],
          preRegistration: {
            enabled: true,
            entity: "spaces",
            goal: 50,
            current: 0,
          },
          activities: {
            predictions: true,
            trashTalk: false,
            teamSelection: true,
          },
          shareables: {
            countdownWidget: true,
            teaserVideo: true,
            bracketPreview: false,
          },
        },
      };
    case RitualArchetype.BetaLottery:
      return {
        lottery: {
          feature: {
            id: "beta_feature",
            name: "Beta Feature Access",
            description: "Preview an upcoming Hive experience.",
            teaser: {
              video: undefined,
              images: ["https://example.com/feature.png"],
              demo: undefined,
            },
          },
          slots: 25,
          applicants: 0,
          entry: {
            requirement: "click",
            deadline: inThreeDays,
            multipleEntries: false,
          },
          drawing: {
            date: inThreeDays,
            format: "scheduled",
            notification: true,
            publicAnnouncement: true,
          },
          winnerAccess: {
            duration: 72,
            featureFlags: [],
            badge: undefined,
            feedback: true,
          },
          loserFlow: {
            consolationMessage: "Stay tuned for the next wave.",
            waitlist: true,
            nextLottery: undefined,
          },
        },
      };
    case RitualArchetype.UnlockChallenge:
      return {
        unlock: {
          goal: {
            metric: "posts",
            target: 100,
            current: 0,
            deadline: inThreeDays,
          },
          reward: {
            type: "feature",
            name: "Feature Unlock",
            description: "Unlock the next campus tool when the goal hits.",
            teaser: "A new experience drops when the community rallies.",
            preview: undefined,
          },
          visualization: {
            progressBar: true,
            percentage: true,
            countdown: true,
            recentActivity: true,
            leaderboard: true,
          },
          milestones: [
            {
              threshold: 25,
              unlock: "Behind-the-scenes preview",
              message: "First milestone cleared.",
            },
          ],
          urgency: {
            remaining: "100 actions remaining",
            timeLeft: "3 days left",
            encouragement: "Rally the campus to unlock the drop.",
          },
        },
      };
    case RitualArchetype.Survival: {
      const nowIso = now.toISOString();
      const durationHours = Math.max(
        1,
        Math.round((new Date(inThreeDays).getTime() - now.getTime()) / (1000 * 60 * 60)),
      );
      return {
        survival: {
          format: "instant_elimination",
          participants: 16,
          rounds: [
            {
              number: 1,
              duration: 30,
              matchups: 8,
              startTime: nowIso,
            },
          ],
          liveUpdates: {
            realTime: true,
            updateInterval: 2,
            notifications: true,
            commentary: ["The arena is live."],
          },
          elimination: {
            instant: true,
            messaging: "Eliminated from the arena",
            soundEffect: undefined,
          },
          eventWindow: {
            start: nowIso,
            end: inThreeDays,
            duration: durationHours,
          },
          voting: {
            method: "direct_vote",
            showLiveCount: true,
            speed: "urgent",
          },
        },
      };
    }
    case RitualArchetype.Leak:
      return {
        leak: {
          hiddenRitual: {
            name: "Secret Ritual",
            archetype: "FEATURE_DROP",
            launchDate: inThreeDays,
          },
          clues: [
            {
              day: 0,
              clue: "A secret drop is brewing.",
              hint: "Watch the ritual feed banner.",
              media: undefined,
            },
          ],
          reveal: {
            date: inThreeDays,
            method: "live_event",
            announcement: "Campus-wide reveal stream",
          },
          speculation: {
            enabled: true,
            discussionSpace: "speculation-lounge",
            prompt: "What do you think we are shipping?",
            voting: true,
          },
          shareables: {
            mysteryPoster: true,
            clueCards: true,
            countdown: true,
          },
        },
      };
    case RitualArchetype.Tournament:
      return {
        tournament: {
          format: "single_elimination",
          participants: {
            type: "spaces",
            count: 16,
            selection: "opt_in",
            seeding: "random",
          },
          rounds: [],
          currentRound: "Round 1",
          liveMatchups: [],
          voting: {
            mechanism: "direct_vote",
            directVote: { allowMultiple: false, voteChanging: false },
          },
          prize: {
            title: "Campus Champion",
            badge: "campus_champion",
            featuredDuration: 7,
            specialPerks: ["Feed spotlight"],
          },
        },
      };
    case RitualArchetype.FeatureDrop:
      return {
        featureDrop: {
          feature: {
            id: "feature_drop",
            name: "Limited Feature",
            description: "Test our latest experience",
            demo: {
              video: "https://example.com/feature-drop-demo.mp4",
              images: ["https://example.com/feature-drop.png"],
            },
          },
          framingStrategy: "limited_edition",
          urgencyMessage: "Available for 48 hours",
          featureFlags: [
            {
              flagName: "feature_drop_beta",
              enabledDuring: "active",
              autoDisable: true,
              fallbackBehavior: "waitlist",
            },
          ],
          eligibility: { scope: "all" },
          analytics: {
            trackUsage: true,
            metrics: [
              {
                key: "feature_drop_joins",
                displayName: "Joins",
                aggregation: "count",
              },
            ],
            realTimeUpdates: true,
          },
          feedback: {
            enabled: true,
            timing: "after",
            questions: [],
          },
          postRitualPlan: {
            strategy: "waitlist",
          },
          currentParticipants: 0,
          totalUsageEvents: 0,
        },
      };
    case RitualArchetype.RuleInversion:
      return {
        ruleInversion: {
          inversions: [
            {
              ruleId: "feed_posting",
              ruleName: "Feed posting",
              normalBehavior: "Moderated",
              invertedBehavior: "Open posting",
              featureFlags: [],
              middlewareOverrides: [],
              canInvert: true,
            },
          ],
          moderation: {
            strategy: "increased_capacity",
            autoModRules: { enabled: true, sensitivity: "medium", keywords: [] },
            postRitualCleanup: { enabled: true, reviewAll: true, deleteViolations: true },
          },
          permanentRules: [],
          currentInversions: [],
          contentCreated: { posts: 0, comments: 0 },
          moderationActivity: { flagged: 0, removed: 0 },
        },
      };
    default:
      return {};
  }
}
