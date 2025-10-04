import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FeedPostCard, FeedPost } from "../../atomic/molecules/feed-post-card";

/**
 * # Feed Post Card
 *
 * Content card for campus posts in the feed. All posts originate from Spaces
 * and can be amplified through reactions, reposts, and requotes.
 *
 * ## Features
 * - Space attribution with member count
 * - One-tap reactions with haptic feedback
 * - Comment threading
 * - Repost and requote amplification
 * - Friend activity social proof
 * - Media grid (1-4 images)
 * - Long content truncation
 * - Promoted and trending indicators
 *
 * ## HIVE Motion System
 * - `hover:shadow-md` for card depth
 * - `transition-smooth ease-liquid` on interaction buttons
 * - Reaction scale animation on tap
 * - Smooth expand/collapse for long content
 *
 * ## Usage
 * ```tsx
 * <FeedPostCard
 *   post={post}
 *   onReact={(id) => handleReact(id)}
 *   onComment={(id) => handleComment(id)}
 *   onRepost={(id) => handleRepost(id)}
 * />
 * ```
 */
const meta = {
  title: "04-Feed/FeedPostCard",
  component: FeedPostCard,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeedPostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const basePost: FeedPost = {
  id: "1",
  content: "Just aced my CSE 250 midterm! The study sessions in Lockwood Library really paid off ",
  author: {
    name: "Sarah Chen",
    handle: "sarahc",
    avatar: "https://github.com/shadcn.png",
  },
  space: {
    name: "CS Study Group",
    id: "cs-1",
    memberCount: 234,
  },
  timestamp: "2h ago",
  reactions: { count: 12, hasReacted: false },
  comments: { count: 3 },
  reposts: { count: 2, hasReposted: false },
  requotes: { count: 0 },
  saves: { count: 1, hasSaved: false },
};

/**
 * Default post with basic text content
 */
export const Default: Story = {
  args: {
    post: basePost,
    className: "max-w-2xl",
  },
};

/**
 * Post with user already reacted (filled heart)
 */
export const Reacted: Story = {
  args: {
    post: {
      ...basePost,
      reactions: { count: 13, hasReacted: true, topEmoji: "❤️" },
    },
    className: "max-w-2xl",
  },
};

/**
 * Post with comments preview showing recent comments
 */
export const WithCommentPreview: Story = {
  args: {
    post: {
      ...basePost,
      id: "2",
      content: "Anyone know where the best late-night study spot is on campus?",
      comments: {
        count: 8,
        preview: [
          { author: "Mike J.", text: "Lockwood is open until 2am on weekdays!" },
          { author: "Taylor", text: "Silverman Library 3rd floor is super quiet" },
        ],
      },
    },
    className: "max-w-2xl",
  },
};

/**
 * Post with single image
 */
export const WithSingleImage: Story = {
  args: {
    post: {
      ...basePost,
      id: "3",
      content: "Beautiful sunset from my dorm window today ",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        },
      ],
      reactions: { count: 45, hasReacted: false, topEmoji: "❤️" },
    },
    className: "max-w-2xl",
  },
};

/**
 * Post with multiple images (grid layout)
 */
export const WithMultipleImages: Story = {
  args: {
    post: {
      ...basePost,
      id: "4",
      content: "Highlights from UB Football game yesterday! What a win! ",
      media: [
        { type: "image", url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400" },
        { type: "image", url: "https://images.unsplash.com/photo-1519511110699-c371eeabe1b4?w=400" },
        { type: "image", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400" },
        { type: "image", url: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400" },
      ],
      reactions: { count: 89, hasReacted: true, topEmoji: "" },
      comments: { count: 24 },
    },
    className: "max-w-2xl",
  },
};

/**
 * Promoted post (space leaders boost)
 */
export const Promoted: Story = {
  args: {
    post: {
      ...basePost,
      id: "5",
      content: " Open Mic Night this Friday at 7pm in the Student Union! Come show your talent or just enjoy the vibes. Free snacks!",
      isPromoted: true,
      space: {
        name: "Campus Events",
        id: "events-1",
        memberCount: 1842,
      },
      reactions: { count: 156, hasReacted: false },
    },
    className: "max-w-2xl",
  },
};

/**
 * Trending post (popular on campus)
 */
export const Trending: Story = {
  args: {
    post: {
      ...basePost,
      id: "6",
      content: "PSA: The campus bookstore is having a 40% off sale on merch tomorrow only! Get there early 👕",
      isTrending: true,
      reactions: { count: 234, hasReacted: false, topEmoji: "" },
      comments: { count: 67 },
      reposts: { count: 45, hasReposted: false },
    },
    className: "max-w-2xl",
  },
};

/**
 * Post with friend activity ("Jake and Sarah reacted")
 */
export const WithFriendActivity: Story = {
  args: {
    post: {
      ...basePost,
      id: "7",
      content: "Looking for 2 more people for intramural basketball team. Games are Wednesday nights!",
      friendActivity: {
        names: ["Jake", "Sarah", "Mike"],
        action: "reacted",
      },
      reactions: { count: 8, hasReacted: false },
    },
    className: "max-w-2xl",
  },
};

/**
 * Requoted post (quote tweet style)
 */
export const WithRequote: Story = {
  args: {
    post: {
      ...basePost,
      id: "8",
      content: "Couldn't agree more! Everyone should check out this space",
      requotedPost: {
        author: "Alex Morgan",
        content: "Just discovered the Engineering Social space and it's amazing for networking! Highly recommend joining ",
        timestamp: "5h ago",
      },
      requotes: { count: 3 },
    },
    className: "max-w-2xl",
  },
};

/**
 * Long content with "Show more" truncation
 */
export const LongContent: Story = {
  args: {
    post: {
      ...basePost,
      id: "9",
      content: `Just wanted to share my experience with the CS Department here at UB. When I first started, I was really intimidated by the workload and the pace of the classes. But over time, I found some amazing study groups and made friends who helped me understand difficult concepts.

The professors are generally really approachable during office hours, and the TA sessions have been invaluable. If you're struggling with CSE 220 or CSE 250, I highly recommend going to the tutoring center in Davis Hall.

Also, joining the CS Study Group space on HIVE was one of the best decisions I made. Everyone there is super supportive and we organize study sessions before every major exam. Big shoutout to Sarah and Mike for always helping me debug my code!

To all the freshmen and sophomores out there - it gets easier, I promise. Don't be afraid to ask for help!`,
      reactions: { count: 78, hasReacted: false },
      comments: { count: 21 },
    },
    className: "max-w-2xl",
  },
};

/**
 * Post user has saved (bookmarked)
 */
export const Saved: Story = {
  args: {
    post: {
      ...basePost,
      id: "10",
      content: " Ultimate guide to surviving finals week:\n1. Start early\n2. Make a schedule\n3. Take breaks\n4. Sleep!\n5. Don't panic\n\nYou got this! ",
      saves: { count: 12, hasSaved: true },
      reactions: { count: 45, hasReacted: false },
    },
    className: "max-w-2xl",
  },
};

/**
 * Post user has reposted
 */
export const Reposted: Story = {
  args: {
    post: {
      ...basePost,
      id: "11",
      content: "Free pizza in Capen Hall right now! First come first served ",
      reposts: { count: 23, hasReposted: true },
      reactions: { count: 56, hasReacted: false },
    },
    className: "max-w-2xl",
  },
};

/**
 * Compact mode (for dense feeds)
 */
export const Compact: Story = {
  args: {
    post: basePost,
    compact: true,
    className: "max-w-2xl",
  },
};

/**
 * HIVE Pattern: Mixed feed with different post types
 */
export const FeedStream: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <FeedPostCard
        post={{
          ...basePost,
          content: "Just aced my CSE 250 midterm! ",
          reactions: { count: 12, hasReacted: true },
        }}
      />
      <FeedPostCard
        post={{
          ...basePost,
          id: "12",
          content: "Campus Events space is hosting Open Mic Night this Friday!",
          isPromoted: true,
          space: { name: "Campus Events", id: "events", memberCount: 1842 },
        }}
      />
      <FeedPostCard
        post={{
          ...basePost,
          id: "13",
          content: "Beautiful day at UB! ",
          media: [
            { type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" },
          ],
          reactions: { count: 34, hasReacted: false },
        }}
      />
      <FeedPostCard
        post={{
          ...basePost,
          id: "14",
          content: "The bookstore sale is amazing! 40% off everything",
          isTrending: true,
          reactions: { count: 123, hasReacted: false, topEmoji: "" },
        }}
      />
    </div>
  ),
};

/**
 * Empty state variations for testing
 */
export const NoInteractions: Story = {
  args: {
    post: {
      ...basePost,
      reactions: { count: 0, hasReacted: false },
      comments: { count: 0 },
      reposts: { count: 0, hasReposted: false },
      requotes: { count: 0 },
      saves: { count: 0, hasSaved: false },
    },
    className: "max-w-2xl",
  },
};

/**
 * High engagement post (viral)
 */
export const HighEngagement: Story = {
  args: {
    post: {
      ...basePost,
      id: "15",
      content: "BREAKING: UB just announced a snow day for tomorrow! No classes! ",
      reactions: { count: 2834, hasReacted: true, topEmoji: "❤️" },
      comments: { count: 456 },
      reposts: { count: 789, hasReposted: false },
      requotes: { count: 123 },
      saves: { count: 234, hasSaved: false },
      isTrending: true,
      friendActivity: {
        names: ["Jake", "Sarah", "Mike", "Alex", "Jordan"],
        action: "reacted",
      },
    },
    className: "max-w-2xl",
  },
};

/**
 * PROOF: Heart reaction animation
 * Demonstrates scale animation and haptic feedback on tap
 */
export const HeartReactionAnimation: Story = {
  render: () => {
    const [reacted, setReacted] = React.useState(false);
    const [animating, setAnimating] = React.useState(false);
    const [reactCount, setReactCount] = React.useState(24);

    const handleReact = () => {
      setAnimating(true);
      setReacted(!reacted);
      setReactCount(reacted ? reactCount - 1 : reactCount + 1);

      setTimeout(() => setAnimating(false), 300);
    };

    const post: FeedPost = {
      ...basePost,
      reactions: { count: reactCount, hasReacted: reacted, topEmoji: "❤️" },
    };

    return (
      <div className="min-h-screen bg-[#000000] p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-white">
              Heart Reaction Animation
            </h3>
            <p className="text-sm text-white/70">
              Click the heart button to see the scale animation (1.0 → 1.25 → 1.0)
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-white/70">State:</span>
              <span className="font-mono text-sm font-semibold text-white">
                {reacted ? "reacted ❤️" : "not reacted 🤍"}
              </span>
            </div>
          </div>

          <FeedPostCard
            post={post}
            onReact={handleReact}
            onComment={() => {}}
            onRepost={() => {}}
            onRequote={() => {}}
            onSave={() => {}}
          />

          {/* Visual feedback overlay */}
          {animating && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
              <div className="animate-in zoom-in fade-in duration-300 animate-out zoom-out fade-out">
                <div className={`text-8xl ${reacted ? 'scale-125' : 'scale-75'} transition-transform duration-300`}>
                  {reacted ? '❤️' : '💔'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * PROOF: All interaction animations
 * React, save, repost - all with smooth transitions
 */
export const AllInteractions: Story = {
  render: () => {
    const [reacted, setReacted] = React.useState(false);
    const [saved, setSaved] = React.useState(false);
    const [reposted, setReposted] = React.useState(false);
    const [lastAction, setLastAction] = React.useState<string | null>(null);

    const handleAction = (action: string, setter: (v: boolean) => void, current: boolean) => {
      setter(!current);
      setLastAction(action);
      setTimeout(() => setLastAction(null), 2000);
    };

    const post: FeedPost = {
      ...basePost,
      reactions: { count: reacted ? 25 : 24, hasReacted: reacted },
      saves: { count: saved ? 13 : 12, hasSaved: saved },
      reposts: { count: reposted ? 4 : 3, hasReposted: reposted },
    };

    return (
      <div className="min-h-screen bg-[#000000] p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-white">
              Interactive Button States
            </h3>
            <p className="text-sm text-white/70">
              Click reaction, save, or repost to see smooth state transitions
            </p>
            {lastAction && (
              <div className="inline-flex items-center gap-2 rounded-md bg-[#FFD700]/20 border border-[#FFD700]/50 px-3 py-1.5 text-xs font-medium text-[#FFD700] animate-in fade-in slide-in-from-top-2 duration-300">
                ✓ {lastAction}
              </div>
            )}
          </div>

          <FeedPostCard
            post={post}
            onReact={() => handleAction("Reacted", setReacted, reacted)}
            onSave={() => handleAction("Saved", setSaved, saved)}
            onRepost={() => handleAction("Reposted", setReposted, reposted)}
            onComment={() => handleAction("Opened comments", () => {}, false)}
            onRequote={() => handleAction("Opening requote composer", () => {}, false)}
          />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className={`rounded-lg border p-3 transition-all duration-300 ${reacted ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/8 bg-white/5'}`}>
              <div className="text-xs font-medium text-white/70">Reaction</div>
              <div className={`mt-1 text-lg font-bold ${reacted ? 'text-[#FFD700]' : 'text-white'}`}>
                {reacted ? "❤️" : "🤍"}
              </div>
            </div>
            <div className={`rounded-lg border p-3 transition-all duration-300 ${saved ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/8 bg-white/5'}`}>
              <div className="text-xs font-medium text-white/70">Saved</div>
              <div className={`mt-1 text-lg font-bold ${saved ? 'text-[#FFD700]' : 'text-white'}`}>
                {saved ? "" : ""}
              </div>
            </div>
            <div className={`rounded-lg border p-3 transition-all duration-300 ${reposted ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/8 bg-white/5'}`}>
              <div className="text-xs font-medium text-white/70">Repost</div>
              <div className={`mt-1 text-lg font-bold ${reposted ? 'text-[#FFD700]' : 'text-white'}`}>
                {reposted ? "" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * PROOF: Comment count pulse animation
 * Shows micro-animation when new comment is added
 */
export const CommentPulse: Story = {
  render: () => {
    const [commentCount, setCommentCount] = React.useState(3);
    const [pulseKey, setPulseKey] = React.useState(0);

    const addComment = () => {
      setCommentCount(commentCount + 1);
      setPulseKey(pulseKey + 1);
    };

    const post: FeedPost = {
      ...basePost,
      comments: { count: commentCount },
    };

    return (
      <div className="min-h-screen bg-[#000000] p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-white">
              Comment Count Pulse
            </h3>
            <p className="text-sm text-white/70">
              Click to add a comment and watch the count pulse
            </p>
          </div>

          <FeedPostCard
            post={post}
            onComment={addComment}
            onReact={() => {}}
            onRepost={() => {}}
            onRequote={() => {}}
            onSave={() => {}}
          />

          <button
            onClick={addComment}
            className="w-full rounded-md bg-white text-black px-6 py-3 text-sm font-medium transition-smooth ease-liquid hover:bg-white/90"
          >
            Simulate New Comment (+1)
          </button>

          <div className="text-center">
            <div className="text-xs text-white/70 mb-2">Comment count</div>
            <div
              key={pulseKey}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/50 text-2xl font-bold text-[#FFD700] animate-in zoom-in duration-300"
            >
              {commentCount}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
