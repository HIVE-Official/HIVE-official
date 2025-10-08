import type { Meta, StoryObj } from "@storybook/react";
import { CommentCard } from "../../atomic/molecules/comment-card";
import { useState } from "react";

/**
 * # CommentCard
 *
 * Molecule component for displaying comments with expandable text.
 * Used throughout HIVE for post comments, discussion threads, and replies.
 *
 * ## HIVE Motion System
 * - Uses `transition-smooth ease-liquid` for expand/collapse animations
 * - Like button and action buttons use smooth hover transitions
 * - Portrait card avatar with border styling
 *
 * ## Features
 * - **Auto-expandable**: Long comments collapse to `maxLines` (default 4) with "Show more" button
 * - **Author actions**: Edit and Delete buttons for comment author
 * - **Social actions**: Like (with count) and Reply buttons
 * - **Author highlighting**: "You" badge and different background for own comments
 * - **Portrait avatar**: Rectangular user photo with fallback initials
 *
 * ## Usage
 * ```tsx
 * <CommentCard
 *   userName="Sarah Chen"
 *   avatar="https://..."
 *   timestamp="2 hours ago"
 *   content="This is a great post! Thanks for sharing."
 *   likeCount={5}
 *   isLiked={false}
 *   onLike={() => handleLike()}
 *   onReply={() => handleReply()}
 * />
 * ```
 */
const meta = {
  title: "11-Shared/CommentCard",
  component: CommentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default comment
 */
export const Default: Story = {
  args: {
    userName: "Sarah Chen",
    avatar: "https://github.com/shadcn.png",
    timestamp: "2 hours ago",
    content: "This is a great post! I learned a lot from this explanation.",
    className: "w-[600px]",
  },
};

/**
 * With likes and interactions
 */
export const WithLikes: Story = {
  args: {
    userName: "Alex Morgan",
    avatar: "https://github.com/vercel.png",
    timestamp: "5 hours ago",
    content: "Thanks for sharing this! The examples really helped me understand the concept.",
    likeCount: 12,
    isLiked: false,
    showActions: true,
    className: "w-[600px]",
  },
};

/**
 * Liked by current user
 */
export const Liked: Story = {
  args: {
    userName: "Jordan Lee",
    timestamp: "1 day ago",
    content: "Amazing explanation! This clarified all my doubts.",
    likeCount: 8,
    isLiked: true,
    showActions: true,
    className: "w-[600px]",
  },
};

/**
 * Author's own comment (with edit/delete)
 */
export const AuthorComment: Story = {
  args: {
    userName: "Riley Park",
    avatar: "https://github.com/shadcn.png",
    timestamp: "Just now",
    content: "I just posted this comment and can edit or delete it.",
    isAuthor: true,
    likeCount: 2,
    showActions: true,
    className: "w-[600px]",
  },
};

/**
 * With badge (Leader, Moderator, etc.)
 */
export const WithBadge: Story = {
  args: {
    userName: "Casey Kim",
    avatar: "https://github.com/vercel.png",
    timestamp: "3 days ago",
    content: "As the space leader, I want to thank everyone for the great discussion!",
    badge: "Leader",
    badgeVariant: "default",
    likeCount: 24,
    showActions: true,
    className: "w-[600px]",
  },
};

/**
 * Long comment (expandable)
 */
export const LongComment: Story = {
  args: {
    userName: "Morgan Taylor",
    avatar: "https://github.com/shadcn.png",
    timestamp: "1 week ago",
    content: `This is a really long comment that will need to be collapsed by default.

I wanted to share my thoughts on this topic in detail because I think it's really important for everyone to understand the full context.

The main points I want to make are:
1. First, we need to consider the historical background
2. Second, the current state of affairs is quite complex
3. Third, there are multiple perspectives to consider
4. Finally, we should think about the future implications

I hope this helps everyone understand the nuances of this discussion. Feel free to ask if you have any questions!`,
    maxLines: 4,
    likeCount: 15,
    showActions: true,
    className: "w-[600px]",
  },
};

/**
 * Short comment (no expansion needed)
 */
export const ShortComment: Story = {
  args: {
    userName: "Jamie Davis",
    timestamp: "30 minutes ago",
    content: "Great post! 👍",
    likeCount: 3,
    showActions: true,
    className: "w-[600px]",
  },
};

/**
 * Without actions (read-only)
 */
export const ReadOnly: Story = {
  args: {
    userName: "Taylor Brown",
    avatar: "https://github.com/vercel.png",
    timestamp: "2 weeks ago",
    content: "This comment is read-only with no interaction buttons.",
    showActions: false,
    className: "w-[600px]",
  },
};

/**
 * HIVE Pattern: Comment thread
 */
export const CommentThread: Story = {
  render: () => (
    <div className="flex w-[650px] flex-col gap-3">
      <h3 className="text-lg font-semibold text-foreground">Discussion Thread</h3>

      <CommentCard
        userName="Sarah Chen"
        avatar="https://github.com/shadcn.png"
        timestamp="2 hours ago"
        content="Does anyone have notes from yesterday's lecture on binary search trees? I had to miss it for a doctor's appointment."
        likeCount={5}
        showActions
      />

      <div className="ml-12 border-l-2 border-border pl-4">
        <CommentCard
          userName="Alex Morgan"
          avatar="https://github.com/vercel.png"
          timestamp="1 hour ago"
          content="I have them! I'll upload to the shared drive in a few minutes."
          likeCount={12}
          isLiked
          badge="TA"
          badgeVariant="default"
          showActions
        />
      </div>

      <div className="ml-12 border-l-2 border-border pl-4">
        <CommentCard
          userName="Jordan Lee"
          timestamp="45 minutes ago"
          content="Thanks Alex! I missed it too and was looking for notes."
          likeCount={3}
          showActions
        />
      </div>

      <div className="ml-12 border-l-2 border-border pl-4">
        <CommentCard
          userName="Sarah Chen"
          avatar="https://github.com/shadcn.png"
          timestamp="Just now"
          content="Perfect, thanks so much!"
          isAuthor
          showActions
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Mixed comment types
 */
export const MixedComments: Story = {
  render: () => (
    <div className="flex w-[650px] flex-col gap-3 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Comments (4)</h3>
        <span className="text-xs text-muted-foreground">Most recent first</span>
      </div>

      <div className="flex flex-col gap-3">
        <CommentCard
          userName="Riley Park"
          avatar="https://github.com/shadcn.png"
          timestamp="Just now"
          content="I just added this comment!"
          isAuthor
          likeCount={0}
          showActions
        />

        <CommentCard
          userName="Casey Kim"
          avatar="https://github.com/vercel.png"
          timestamp="5 minutes ago"
          content="This is really helpful! I've been struggling with this concept for a while. The way you explained it with the real-world examples made it click for me. I especially liked the part about optimization strategies."
          badge="Leader"
          badgeVariant="default"
          likeCount={8}
          isLiked
          showActions
        />

        <CommentCard
          userName="Morgan Taylor"
          timestamp="1 hour ago"
          content="Great explanation!"
          likeCount={3}
          showActions
        />

        <CommentCard
          userName="Jamie Davis"
          avatar="https://github.com/shadcn.png"
          timestamp="2 hours ago"
          content="Thanks for posting this. Can you share more details about the implementation?"
          likeCount={5}
          showActions
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Space discussion
 */
export const SpaceDiscussion: Story = {
  render: () => (
    <div className="flex w-[700px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-lg">
          💬
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            CS Study Group Discussion
          </h3>
          <p className="text-sm text-muted-foreground">Algorithms study session notes</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <CommentCard
          userName="Alex Morgan"
          avatar="https://github.com/vercel.png"
          timestamp="1 day ago"
          content={`Here are the key points from today's session on graph algorithms:

**Breadth-First Search (BFS):**
- Uses a queue data structure
- Explores neighbors level by level
- Time complexity: O(V + E)

**Depth-First Search (DFS):**
- Uses a stack (or recursion)
- Explores as far as possible before backtracking
- Time complexity: O(V + E)

Let me know if you have questions!`}
          badge="TA"
          badgeVariant="default"
          likeCount={23}
          showActions
        />

        <CommentCard
          userName="Sarah Chen"
          avatar="https://github.com/shadcn.png"
          timestamp="18 hours ago"
          content="This is super helpful! Can you explain when to use BFS vs DFS?"
          likeCount={5}
          isLiked
          showActions
        />

        <CommentCard
          userName="Jordan Lee"
          timestamp="12 hours ago"
          content="Great summary! I'm going to reference this for the exam."
          badge="Leader"
          badgeVariant="default"
          likeCount={8}
          showActions
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * Interactive demo with state
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [comments, setComments] = useState([
      {
        id: 1,
        userName: "Alex Morgan",
        avatar: "https://github.com/vercel.png",
        timestamp: "2 hours ago",
        content: "This is a great post! Thanks for sharing.",
        likes: 5,
        likedByUser: false,
      },
      {
        id: 2,
        userName: "Jordan Lee",
        timestamp: "1 hour ago",
        content: "I agree! Very helpful explanation.",
        likes: 3,
        likedByUser: false,
      },
    ]);

    const handleLike = (id: number) => {
      setComments(comments.map(comment =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.likedByUser ? comment.likes - 1 : comment.likes + 1,
              likedByUser: !comment.likedByUser,
            }
          : comment
      ));
    };

    return (
      <div className="flex w-[600px] flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Try clicking the Like button
        </h3>
        {comments.map(comment => (
          <CommentCard
            key={comment.id}
            userName={comment.userName}
            avatar={comment.avatar}
            timestamp={comment.timestamp}
            content={comment.content}
            likeCount={comment.likes}
            isLiked={comment.likedByUser}
            onLike={() => handleLike(comment.id)}
            onReply={() => console.log(`Reply to ${comment.userName}`)}
            showActions
          />
        ))}
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * Different max lines settings
 */
export const MaxLinesComparison: Story = {
  render: () => {
    const longContent = `This is a longer comment that demonstrates different max line settings.

When you set maxLines to different values, the comment will collapse at different points. This is useful for controlling the visual density of comment sections.

You can customize this based on your layout needs. For example, compact views might use 2-3 lines, while detailed views might use 6-8 lines.

The "Show more" button appears automatically when the content exceeds the maxLines threshold.`;

    return (
      <div className="flex w-[650px] flex-col gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">maxLines = 2</p>
          <CommentCard
            userName="User"
            timestamp="now"
            content={longContent}
            maxLines={2}
            showActions
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">maxLines = 4 (default)</p>
          <CommentCard
            userName="User"
            timestamp="now"
            content={longContent}
            maxLines={4}
            showActions
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">maxLines = 6</p>
          <CommentCard
            userName="User"
            timestamp="now"
            content={longContent}
            maxLines={6}
            showActions
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};
