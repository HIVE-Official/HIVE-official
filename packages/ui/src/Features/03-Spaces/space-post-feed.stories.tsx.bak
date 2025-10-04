import type { Meta, StoryObj } from "@storybook/react";
import { SpacePostFeed, SpacePost } from "../../atomic/organisms/space-post-feed";

/**
 * # SpacePostFeed
 *
 * Organism component displaying the main feed of posts within a space (60% main content area).
 * Includes post composer, individual post cards, and infinite scroll loading.
 *
 * ## HIVE Motion System
 * - Smooth hover effects on post cards
 * - Composer expand/collapse animation
 * - Like button state transitions
 * - Load more button hover
 *
 * ## Features
 * - **Post Composer**: Expandable textarea for creating new posts
 * - **Post Cards**: Individual post display with author info, content, images, links
 * - **Engagement**: Like, comment, share actions with counts
 * - **Pinned Posts**: Visual indicators for pinned content
 * - **Announcements**: Badge for announcement posts
 * - **Timestamps**: Smart relative time display (1m, 2h, 3d ago)
 * - **Link Previews**: Rich preview cards for shared links
 * - **Image Grid**: Responsive image layout (1-4 images)
 * - **Empty States**: Helpful prompts when no posts exist
 * - **Loading States**: Skeleton loaders for async content
 * - **Infinite Scroll**: Load more button for pagination
 *
 * ## Usage
 * ```tsx
 * <SpacePostFeed
 *   posts={spacePosts}
 *   canPost={isMember}
 *   showComposer={true}
 *   onCreatePost={(content) => createPost(content)}
 *   onLike={(postId) => likePost(postId)}
 *   onComment={(postId) => navigate(`/post/${postId}#comments`)}
 *   onLoadMore={() => fetchMorePosts()}
 *   hasMore={true}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpacePostFeed",
  component: SpacePostFeed,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpacePostFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample post data
const samplePosts: SpacePost[] = [
  {
    id: "1",
    author: {
      userId: "1",
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "https://github.com/shadcn.png",
    },
    content: "Just finished the CSE220 project! Thanks everyone for the help in study sessions. Couldn't have done it without this community 🎉",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likeCount: 24,
    commentCount: 8,
    isLiked: true,
    isPinned: true,
  },
  {
    id: "2",
    author: {
      userId: "2",
      name: "Alex Morgan",
      handle: "@alex",
      avatar: "https://github.com/vercel.png",
    },
    content: "Pizza social next Friday at 6pm! Free pizza and drinks for all members. RSVP in the events section.",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likeCount: 42,
    commentCount: 15,
    isLiked: false,
    isAnnouncement: true,
  },
  {
    id: "3",
    author: {
      userId: "3",
      name: "Jordan Lee",
      handle: "@jordan",
    },
    content: "Does anyone have notes from Monday's lecture? I was sick and missed it 😷",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likeCount: 3,
    commentCount: 7,
    isLiked: false,
  },
  {
    id: "4",
    author: {
      userId: "4",
      name: "Casey Kim",
      handle: "@casey",
      avatar: "https://github.com/shadcn.png",
    },
    content: "Check out this amazing recursion tutorial! Really helped me understand the concept.\n\nhttps://www.youtube.com/watch?v=example",
    linkPreview: {
      title: "Recursion Explained - The Complete Guide",
      description: "Learn recursion from scratch with clear examples and visualizations. Perfect for CS students!",
      url: "https://www.youtube.com/watch?v=example",
      image: "https://via.placeholder.com/300x200/4f46e5/ffffff?text=Video+Preview",
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likeCount: 18,
    commentCount: 4,
    isLiked: true,
  },
  {
    id: "5",
    author: {
      userId: "5",
      name: "Morgan Taylor",
      handle: "@morgan",
      avatar: "https://github.com/vercel.png",
    },
    content: "Study group photos from last week! Great turnout 📚",
    images: [
      "https://via.placeholder.com/600x400/3b82f6/ffffff?text=Study+Group+1",
      "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Study+Group+2",
      "https://via.placeholder.com/600x400/ec4899/ffffff?text=Study+Group+3",
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likeCount: 31,
    commentCount: 12,
    isLiked: false,
  },
];

/**
 * Default feed with multiple posts
 */
export const Default: Story = {
  args: {
    posts: samplePosts,
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
    onShare: (postId) => console.log("Share:", postId),
  },
};

/**
 * With post composer (space member)
 */
export const WithComposer: Story = {
  args: {
    posts: samplePosts,
    canPost: true,
    showComposer: true,
    composerPlaceholder: "Share something with CS Study Group...",
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
    onShare: (postId) => console.log("Share:", postId),
  },
};

/**
 * Empty state - no posts yet
 */
export const EmptyState: Story = {
  args: {
    posts: [],
    canPost: true,
    showComposer: true,
    emptyStateMessage: "No posts yet. Be the first to share something!",
    onCreatePost: (content) => console.log("Create post:", content),
  },
};

/**
 * Empty state without composer (non-member viewing)
 */
export const EmptyStateViewer: Story = {
  args: {
    posts: [],
    canPost: false,
    showComposer: false,
    emptyStateMessage: "This space doesn't have any posts yet",
  },
};

/**
 * Loading state
 */
export const LoadingState: Story = {
  args: {
    posts: [],
    isLoading: true,
  },
};

/**
 * With pinned post at top
 */
export const WithPinnedPost: Story = {
  args: {
    posts: samplePosts,
    canPost: true,
    showComposer: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
  },
};

/**
 * With announcements
 */
export const WithAnnouncements: Story = {
  args: {
    posts: samplePosts.slice(0, 3),
    canPost: true,
    showComposer: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
  },
};

/**
 * Single text post
 */
export const SingleTextPost: Story = {
  args: {
    posts: [samplePosts[0]],
    canPost: true,
    showComposer: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
  },
};

/**
 * Post with images
 */
export const PostWithImages: Story = {
  args: {
    posts: [samplePosts[4]],
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
  },
};

/**
 * Post with link preview
 */
export const PostWithLinkPreview: Story = {
  args: {
    posts: [samplePosts[3]],
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
  },
};

/**
 * With load more pagination
 */
export const WithLoadMore: Story = {
  args: {
    posts: samplePosts,
    hasMore: true,
    canPost: true,
    showComposer: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
    onLoadMore: () => console.log("Load more posts"),
  },
};

/**
 * Active feed (many recent posts)
 */
export const ActiveFeed: Story = {
  args: {
    posts: [
      ...samplePosts,
      {
        id: "6",
        author: {
          userId: "6",
          name: "Riley Park",
          handle: "@riley",
        },
        content: "Anyone up for a study session this weekend?",
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        likeCount: 2,
        commentCount: 1,
      },
      {
        id: "7",
        author: {
          userId: "7",
          name: "Jamie Davis",
          handle: "@jamie",
          avatar: "https://github.com/shadcn.png",
        },
        content: "Just pushed the group project to GitHub. Check it out!",
        createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        likeCount: 5,
        commentCount: 2,
      },
    ],
    canPost: true,
    showComposer: true,
    hasMore: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLike: (postId) => console.log("Like:", postId),
    onComment: (postId) => console.log("Comment:", postId),
    onLoadMore: () => console.log("Load more posts"),
  },
};

/**
 * HIVE Pattern: In 60% main content area (complete 60/40 layout)
 */
export const In60MainContent: Story = {
  render: () => (
    <div className="flex gap-6 w-full max-w-6xl">
      {/* 60% Main Content */}
      <div className="flex-[6]">
        <SpacePostFeed
          posts={samplePosts}
          canPost={true}
          showComposer={true}
          hasMore={true}
          onCreatePost={(content) => console.log("Create post:", content)}
          onPostClick={(post) => console.log("Post clicked:", post)}
          onLike={(postId) => console.log("Like:", postId)}
          onComment={(postId) => console.log("Comment:", postId)}
          onShare={(postId) => console.log("Share:", postId)}
          onLoadMore={() => console.log("Load more posts")}
        />
      </div>

      {/* 40% Sidebar */}
      <div className="flex-[4] space-y-4">
        {/* About Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
          <p className="text-xs text-muted-foreground">
            CS Study Group - Weekly study sessions and collaboration
          </p>
        </div>

        {/* Events Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Upcoming Events</h4>
          <p className="text-xs text-muted-foreground">
            Pizza Social - Friday 6pm
          </p>
        </div>

        {/* Resources Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Resources</h4>
          <p className="text-xs text-muted-foreground">
            Study guides, code repos, tutorials
          </p>
        </div>

        {/* Members Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Members</h4>
          <p className="text-xs text-muted-foreground">
            87 active members
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive demo with all features
 */
export const InteractiveDemo: Story = {
  args: {
    posts: samplePosts,
    canPost: true,
    showComposer: true,
    hasMore: true,
    composerPlaceholder: "What's happening in CS Study Group?",
    onCreatePost: (content) => alert(`Creating post:\n${content}`),
    onPostClick: (post) => alert(`Viewing post:\n${post.content.substring(0, 50)}...`),
    onLike: (postId) => alert(`Liked post: ${postId}`),
    onComment: (postId) => alert(`Opening comments for post: ${postId}`),
    onShare: (postId) => alert(`Sharing post: ${postId}`),
    onLoadMore: () => alert("Loading more posts..."),
  },
};
