import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RitualsCardStrip, Ritual } from "../../atomic/molecules/rituals-card-strip";

/**
 * # Rituals Card Strip
 *
 * Horizontal scrollable Instagram-story-style ritual cards. Campus-wide behavioral campaigns
 * driving collective achievement—5% of feed content.
 *
 * ## Features
 * - Progress rings showing completion
 * - Dual progress: Personal (3/5) + Campus (342/500)
 * - Type badges (onboarding, seasonal, challenge, emergency)
 * - Urgency indicators (<24hrs)
 * - Join/Joined states with ring highlights
 * - Current milestone tracking
 * - Trending flame indicator
 * - Rewards preview (badges, titles, features)
 *
 * ## HIVE Motion System
 * - `hover:scale-[1.02]` with `hover:shadow-lg`
 * - Momentum-based horizontal scroll
 * - `ring-2 ring-primary` for joined rituals
 * - Progress ring animations on tap
 * - Smooth transitions with `transition-all`
 *
 * ## Usage
 * ```tsx
 * <RitualsCardStrip
 *   rituals={activeRituals}
 *   onRitualClick={(id) => openDetailModal(id)}
 *   onJoinRitual={(id) => joinRitual(id)}
 * />
 * ```
 */
const meta = {
  title: "04-Feed/RitualsCardStrip",
  component: RitualsCardStrip,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RitualsCardStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleRituals: Ritual[] = [
  {
    id: "1",
    title: "First Week Goals",
    description: "Complete 5 onboarding tasks to explore HIVE and connect with your campus",
    icon: "",
    type: "onboarding",
    progress: {
      current: 3,
      total: 5,
      percentage: 60,
    },
    campusProgress: {
      participants: 1247,
      target: 2000,
      percentage: 62,
    },
    timeRemaining: {
      days: 5,
      hours: 14,
      isUrgent: false,
    },
    rewards: {
      badge: "Pioneer Badge",
      title: "Campus Pioneer",
    },
    status: "active",
    hasJoined: true,
    currentMilestone: {
      name: "Join 3 spaces",
      progress: 67,
    },
  },
  {
    id: "2",
    title: "Buffalo Spirit Week",
    description: "Show your Bulls pride! Participate in daily challenges all week long",
    icon: "",
    type: "seasonal",
    progress: {
      current: 2,
      total: 7,
      percentage: 29,
    },
    campusProgress: {
      participants: 3421,
      target: 5000,
      percentage: 68,
    },
    timeRemaining: {
      days: 4,
      hours: 8,
      isUrgent: false,
    },
    rewards: {
      badge: "Spirit Champion",
    },
    status: "active",
    hasJoined: true,
    isTrending: true,
  },
  {
    id: "3",
    title: "Study Streak Challenge",
    description: "Study for 30 minutes daily for 7 days straight",
    icon: "",
    type: "challenge",
    progress: {
      current: 0,
      total: 7,
      percentage: 0,
    },
    campusProgress: {
      participants: 892,
      target: 0,
      percentage: 0,
    },
    timeRemaining: {
      days: 13,
      hours: 6,
      isUrgent: false,
    },
    rewards: {
      badge: "Study Master",
      feature: "Custom study rooms",
    },
    status: "active",
    hasJoined: false,
  },
];

/**
 * Default strip with multiple rituals
 */
export const Default: Story = {
  args: {
    rituals: sampleRituals,
  },
};

/**
 * Single ritual (user joined)
 */
export const SingleRitualJoined: Story = {
  args: {
    rituals: [sampleRituals[0]],
  },
};

/**
 * Single ritual (not joined)
 */
export const SingleRitualNotJoined: Story = {
  args: {
    rituals: [sampleRituals[2]],
  },
};

/**
 * Urgent ritual (< 24 hours remaining)
 */
export const UrgentRitual: Story = {
  args: {
    rituals: [
      {
        ...sampleRituals[0],
        id: "urgent-1",
        title: "Campus Clean-Up",
        description: "Help make UB beautiful! Join us for Earth Day clean-up",
        icon: "",
        type: "emergency",
        timeRemaining: {
          days: 0,
          hours: 3,
          isUrgent: true,
        },
      },
    ],
  },
};

/**
 * Completed ritual
 */
export const CompletedRitual: Story = {
  args: {
    rituals: [
      {
        ...sampleRituals[0],
        id: "completed-1",
        progress: {
          current: 5,
          total: 5,
          percentage: 100,
        },
        status: "completed",
        hasJoined: true,
      },
    ],
  },
};

/**
 * Trending ritual
 */
export const TrendingRitual: Story = {
  args: {
    rituals: [sampleRituals[1]],
  },
};

/**
 * Nearly complete ritual
 */
export const NearlyComplete: Story = {
  args: {
    rituals: [
      {
        ...sampleRituals[0],
        progress: {
          current: 4,
          total: 5,
          percentage: 80,
        },
        currentMilestone: {
          name: "Invite 1 friend",
          progress: 80,
        },
      },
    ],
  },
};

/**
 * All ritual types
 */
export const AllTypes: Story = {
  args: {
    rituals: [
      {
        ...sampleRituals[0],
        id: "onboarding",
        title: "Welcome to HIVE",
        type: "onboarding",
        icon: "",
      },
      {
        ...sampleRituals[1],
        id: "seasonal",
        title: "Spring Fest",
        type: "seasonal",
        icon: "",
      },
      {
        ...sampleRituals[2],
        id: "challenge",
        title: "Fitness Challenge",
        type: "challenge",
        icon: "",
      },
      {
        ...sampleRituals[0],
        id: "emergency",
        title: "Mental Health Week",
        type: "emergency",
        icon: "",
        hasJoined: false,
      },
    ],
  },
};

/**
 * Mixed progress states
 */
export const MixedProgress: Story = {
  args: {
    rituals: [
      {
        ...sampleRituals[0],
        id: "prog-0",
        progress: { current: 0, total: 5, percentage: 0 },
        hasJoined: false,
      },
      {
        ...sampleRituals[0],
        id: "prog-50",
        progress: { current: 3, total: 5, percentage: 60 },
        hasJoined: true,
      },
      {
        ...sampleRituals[0],
        id: "prog-100",
        progress: { current: 5, total: 5, percentage: 100 },
        status: "completed",
        hasJoined: true,
      },
    ],
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    rituals: [],
    showEmptyState: true,
  },
};

/**
 * High campus participation
 */
export const HighParticipation: Story = {
  args: {
    rituals: [
      {
        ...sampleRituals[1],
        campusProgress: {
          participants: 8234,
          target: 10000,
          percentage: 82,
        },
        isTrending: true,
      },
    ],
  },
};

/**
 * Multiple rewards
 */
export const WithRewards: Story = {
  args: {
    rituals: [
      {
        ...sampleRituals[0],
        rewards: {
          badge: "Super Star",
          title: "Campus Legend",
          feature: "Early access to new features",
        },
      },
    ],
  },
};

/**
 * HIVE Pattern: Feed integration
 */
export const InFeedContext: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      {/* Feed header */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h3 className="text-sm font-semibold">Recent Posts</h3>
        <p className="text-xs text-muted-foreground">3 new posts from your spaces</p>
      </div>

      {/* Rituals strip */}
      <RitualsCardStrip rituals={sampleRituals} />

      {/* More feed content */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <p className="text-sm text-muted-foreground">More feed content...</p>
      </div>
    </div>
  ),
};

/**
 * Long scrollable list
 */
export const LongList: Story = {
  args: {
    rituals: [
      ...sampleRituals,
      {
        ...sampleRituals[0],
        id: "4",
        title: "Wellness Week",
        icon: "",
      },
      {
        ...sampleRituals[0],
        id: "5",
        title: "Green Campus",
        icon: "",
      },
      {
        ...sampleRituals[0],
        id: "6",
        title: "Study Buddy Match",
        icon: "",
      },
    ],
  },
};

/**
 * Mobile viewport (narrow)
 */
export const Mobile: Story = {
  render: () => (
    <div className="max-w-sm">
      <RitualsCardStrip rituals={sampleRituals} />
    </div>
  ),
};

/**
 * PROOF: Progress ring animation (0% → 100%)
 * Demonstrates the Instagram-story progress rings claimed in documentation
 */
export const ProgressRingAnimation: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const startAnimation = () => {
      setIsAnimating(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnimating(false);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    };

    React.useEffect(() => {
      startAnimation();
    }, []);

    const animatedRitual: Ritual = {
      ...sampleRituals[0],
      id: "animated-ritual",
      title: "Watch Progress Fill",
      description: "Demonstrating the progress ring animation that makes rituals feel rewarding",
      progress: {
        current: Math.floor(progress / 20),
        total: 5,
        percentage: progress,
      },
      campusProgress: {
        participants: Math.floor((progress / 100) * 500),
        target: 500,
        percentage: progress,
      },
    };

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Progress Ring Animation
            </h3>
            <p className="text-sm text-muted-foreground">
              Watch the dual progress rings (personal + campus) fill from 0% to 100%
            </p>
            <p className="text-xs text-muted-foreground">
              Current: <span className="font-mono font-semibold text-foreground">{progress}%</span>
            </p>
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="mt-4 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90 disabled:opacity-50"
            >
              {isAnimating ? "Animating..." : "Restart Animation"}
            </button>
          </div>

          <RitualsCardStrip
            rituals={[animatedRitual]}
            onRitualClick={() => {}}
            onJoinRitual={() => {}}
          />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-2xl font-bold text-foreground">
                {animatedRitual.progress.current}/{animatedRitual.progress.total}
              </div>
              <div className="text-xs text-muted-foreground">Personal Progress</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-2xl font-bold text-foreground">
                {animatedRitual.campusProgress.participants}/{animatedRitual.campusProgress.target}
              </div>
              <div className="text-xs text-muted-foreground">Campus Progress</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * PROOF: Milestone completion celebration
 * Shows visual feedback when user completes a milestone
 */
export const MilestoneCompletion: Story = {
  render: () => {
    const [completed, setCompleted] = React.useState(false);
    const [showCelebration, setShowCelebration] = React.useState(false);

    const handleComplete = () => {
      setCompleted(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    };

    const completedRitual: Ritual = {
      ...sampleRituals[0],
      progress: {
        current: completed ? 5 : 4,
        total: 5,
        percentage: completed ? 100 : 80,
      },
      status: completed ? "completed" : "active",
    };

    return (
      <div className="min-h-screen bg-background p-6 relative">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Milestone Completion
            </h3>
            <p className="text-sm text-muted-foreground">
              Click the button to complete the final milestone
            </p>
          </div>

          <RitualsCardStrip
            rituals={[completedRitual]}
            onRitualClick={() => {}}
            onJoinRitual={() => {}}
          />

          {!completed && (
            <button
              onClick={handleComplete}
              className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90"
            >
              Complete Final Milestone (4/5 → 5/5)
            </button>
          )}

          {/* Celebration overlay */}
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="text-center space-y-4 animate-in zoom-in duration-500">
                <div className="text-6xl">🎉</div>
                <div className="text-2xl font-bold text-foreground">
                  Ritual Complete!
                </div>
                <div className="text-sm text-muted-foreground">
                  You earned the Pioneer Badge
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};
