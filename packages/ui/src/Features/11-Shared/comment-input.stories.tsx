import type { Meta, StoryObj } from "@storybook/react";
import { CommentInput } from "../../atomic/molecules/comment-input";
import { useState } from "react";

/**
 * # CommentInput
 *
 * Molecule component combining Avatar + Textarea + Button for posting comments.
 * Used throughout HIVE for commenting on posts, replying to comments, and space discussions.
 *
 * ## HIVE Motion System
 * - Uses `transition-smooth ease-liquid` for focus states and button interactions
 * - Auto-resize textarea animates smoothly as content grows
 * - Character count changes color smoothly when approaching limit
 *
 * ## Features
 * - **Auto-resize**: Textarea grows from 1 to 6 rows based on content
 * - **Keyboard shortcut**: ⌘/Ctrl + Enter to submit
 * - **Character limit**: Configurable max length with visual feedback
 * - **Loading state**: Shows "Posting..." while submitting
 * - **Smart validation**: Submit button disabled when empty or at limit
 *
 * ## Usage
 * ```tsx
 * <CommentInput
 *   userName="Sarah Chen"
 *   avatar="https://..."
 *   placeholder="Write a comment..."
 *   maxLength={500}
 *   showCharCount
 *   onSubmit={async (comment) => {
 *     await postComment(comment)
 *   }}
 * />
 * ```
 */
const meta = {
  title: "11-Shared/CommentInput",
  component: CommentInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default comment input
 */
export const Default: Story = {
  args: {
    userName: "Sarah Chen",
    avatar: "https://github.com/shadcn.png",
    placeholder: "Write a comment...",
    className: "w-[500px]",
  },
};

/**
 * With character count
 */
export const WithCharCount: Story = {
  args: {
    userName: "Alex Morgan",
    avatar: "https://github.com/vercel.png",
    placeholder: "Share your thoughts...",
    showCharCount: true,
    maxLength: 500,
    className: "w-[500px]",
  },
};

/**
 * Custom placeholder
 */
export const CustomPlaceholder: Story = {
  args: {
    userName: "Jordan Lee",
    placeholder: "Ask a question about the assignment...",
    showCharCount: true,
    className: "w-[500px]",
  },
};

/**
 * Loading state while submitting
 */
export const Loading: Story = {
  args: {
    userName: "Casey Kim",
    avatar: "https://github.com/shadcn.png",
    placeholder: "Write a comment...",
    isLoading: true,
    showCharCount: true,
    className: "w-[500px]",
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    userName: "Morgan Taylor",
    avatar: "https://github.com/vercel.png",
    placeholder: "Comments are disabled",
    disabled: true,
    className: "w-[500px]",
  },
};

/**
 * Short character limit (Twitter-style)
 */
export const ShortLimit: Story = {
  args: {
    userName: "Riley Park",
    avatar: "https://github.com/shadcn.png",
    placeholder: "Quick reply...",
    maxLength: 140,
    showCharCount: true,
    submitLabel: "Reply",
    className: "w-[500px]",
  },
};

/**
 * HIVE Pattern: Post comment section
 */
export const PostCommentSection: Story = {
  render: () => {
    const [comments, setComments] = useState<string[]>([
      "Great post! This really helped me understand the concept.",
      "Thanks for sharing! When is the study session?",
    ]);

    const handleSubmit = async (comment: string) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setComments([...comments, comment]);
    };

    return (
      <div className="flex w-[600px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Comments</h3>
          <span className="text-sm text-muted-foreground">
            {comments.length} comments
          </span>
        </div>

        <CommentInput
          userName="Sarah Chen"
          avatar="https://github.com/shadcn.png"
          placeholder="Add a comment..."
          showCharCount
          onSubmit={handleSubmit}
        />

        <div className="flex flex-col gap-3 border-t border-border pt-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {index % 2 === 0 ? "AM" : "JL"}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {index % 2 === 0 ? "Alex Morgan" : "Jordan Lee"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {index === comments.length - 1 ? "Just now" : "2 hours ago"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Reply thread
 */
export const ReplyThread: Story = {
  render: () => (
    <div className="flex w-[550px] flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          SC
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Sarah Chen</span>
            <span className="text-xs text-muted-foreground">5 minutes ago</span>
          </div>
          <p className="text-sm text-foreground">
            Does anyone have notes from the lecture on binary search trees? I missed it yesterday.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
            <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
          </div>
        </div>
      </div>

      <div className="ml-12 flex flex-col gap-3 border-l-2 border-border pl-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-medium text-green-500">
            AM
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Alex Morgan</span>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </div>
            <p className="text-sm text-foreground">
              I have them! I'll share them in the space files.
            </p>
          </div>
        </div>

        <CommentInput
          userName="Jordan Lee"
          placeholder="Reply to this thread..."
          maxLength={300}
          showCharCount
          submitLabel="Reply"
          className="mt-2"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Space discussion board
 */
export const SpaceDiscussion: Story = {
  render: () => (
    <div className="flex w-[650px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-foreground">
          CS Study Group Discussion
        </h3>
        <p className="text-sm text-muted-foreground">
          Share resources, ask questions, or discuss topics related to computer science
        </p>
      </div>

      <CommentInput
        userName="Riley Park"
        avatar="https://github.com/shadcn.png"
        placeholder="Start a discussion or ask a question..."
        maxLength={1000}
        showCharCount
        submitLabel="Post"
      />

      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">
          💡 Tip: Use ⌘+Enter to quickly post your comment
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Quick reply (compact)
 */
export const QuickReply: Story = {
  render: () => (
    <div className="flex w-[450px] flex-col gap-3 rounded-lg bg-muted/50 p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">Quick Reply</span>
        <span className="text-xs text-muted-foreground">to Alex Morgan's post</span>
      </div>
      <CommentInput
        userName="Morgan Taylor"
        avatar="https://github.com/vercel.png"
        placeholder="Type your reply..."
        maxLength={280}
        showCharCount
        submitLabel="Send"
      />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Event Q&A
 */
export const EventQA: Story = {
  render: () => (
    <div className="flex w-[600px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-lg">
          📅
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Career Fair Prep Workshop
          </h3>
          <p className="text-sm text-muted-foreground">Ask the organizers anything</p>
        </div>
      </div>

      <CommentInput
        userName="Casey Kim"
        avatar="https://github.com/shadcn.png"
        placeholder="Ask a question about the event..."
        showCharCount
        maxLength={500}
        submitLabel="Ask"
      />

      <div className="flex items-center gap-2 rounded-md bg-muted/50 p-3">
        <svg className="h-4 w-4 text-muted-foreground" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-muted-foreground">
          Your question will be visible to all event attendees
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * Interactive demo with state management
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (comment: string) => {
      setIsLoading(true);
      setSubmitted(false);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsLoading(false);
      setSubmitted(true);

      // Reset success message after 3s
      setTimeout(() => setSubmitted(false), 3000);
    };

    return (
      <div className="flex w-[500px] flex-col gap-4">
        <CommentInput
          userName="Taylor Brown"
          avatar="https://github.com/vercel.png"
          placeholder="Try submitting a comment..."
          showCharCount
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />

        {submitted && (
          <div className="flex items-center gap-2 rounded-md border border-green-500/50 bg-green-500/10 p-3">
            <svg className="h-4 w-4 text-green-500" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-green-500">Comment posted successfully!</p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};
