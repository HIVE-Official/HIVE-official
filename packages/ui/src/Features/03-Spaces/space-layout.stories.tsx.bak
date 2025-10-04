import type { Meta, StoryObj } from "@storybook/react";
import { SpaceLayout } from "../../atomic/templates/space-layout";
import { SpacePost } from "../../atomic/organisms/space-post-feed";
import { SpaceEvent } from "../../atomic/organisms/space-events-panel";
import { SpaceResource } from "../../atomic/organisms/space-resources-panel";
import { SpaceMemberPreview } from "../../atomic/organisms/space-members-panel";

/**
 * # SpaceLayout (SPEC-COMPLIANT ✅)
 *
 * **This is the correct Spaces implementation matching SPEC.md requirements.**
 *
 * Template component providing 60/40 split layout with 4 Universal Widgets.
 * Combines Chat Board (60%) with Members/Events/Tools/Resources sidebar (40%).
 *
 * ## SPEC.md Compliance
 * - ✅ 60/40 responsive split (Chat Board + Widgets Sidebar)
 * - ✅ 4 Universal Widgets (Members, Events, Tools, Resources)
 * - ✅ Hot thread tabs (10+ replies → tab, max 5)
 * - ✅ Widget expansion with modals (will become side panels)
 * - ⏳ Hash navigation (#events, #members) - Coming soon
 * - ⏳ Inline tools (📅📊📋📚) - Coming soon
 *
 * ## Layout Modes
 *
 * ### Sidebar Mode (Default)
 * Traditional 60/40 split with sticky sidebar:
 * - **Desktop**: Feed (60%) + Sidebar (40%)
 * - **Mobile**: Stacks vertically
 * - **Thread View**: Sliding overlay panel on mobile, full-width on desktop
 *
 * ### Fullwidth Mode
 * Discord-style with sliding context panel:
 * - **Desktop**: Full-width feed + sliding 400px context panel
 * - **Mobile**: Same as desktop
 * - **Thread View**: Smooth slide-in animation when clicking posts
 *
 * ## HIVE Motion System
 * - **Context Panel**: Framer Motion slide-in (400ms with cubic-bezier easing)
 * - **Feed Compression**: Smooth margin animation when context opens
 * - **Mobile Overlay**: Backdrop blur with slide-in panel
 * - **Sticky Sidebar**: Follows scroll on large screens (sidebar mode)
 *
 * ## Features
 * - **Two Layout Modes**: Sidebar or fullwidth
 * - **Sliding Context Panel**: Discord-style thread/post detail view
 * - **Responsive Design**: Mobile overlay, desktop sliding panel
 * - **Smooth Animations**: Framer Motion with HIVE easing
 * - **Context-Aware**: Shows/hides sections based on permissions
 * - **Complete Integration**: All space components working together
 *
 * ## Layout Structure (Sidebar Mode)
 * ```
 * ┌─────────────────────────────────────────────────────┐
 * │  60% Main Content      │  40% Sidebar               │
 * │  ─────────────────────  │  ──────────────────────── │
 * │  Post Composer         │  About Section             │
 * │  ─────────────────────  │  ──────────────────────── │
 * │  Post Card 1           │  Upcoming Events           │
 * │  Post Card 2           │  ──────────────────────── │
 * │  Post Card 3           │  Resources                 │
 * │  ...                   │  ──────────────────────── │
 * │  Load More             │  Members Preview           │
 * └─────────────────────────────────────────────────────┘
 * ```
 *
 * ## Layout Structure (Fullwidth Mode)
 * ```
 * ┌──────────────────────────────────────┬──────────────┐
 * │  Full-width Feed                     │  Context     │
 * │  ───────────────────────────────────  │  Panel       │
 * │  Post Composer                       │  (slides in) │
 * │  ───────────────────────────────────  │              │
 * │  Post Card 1                         │  Thread      │
 * │  Post Card 2                         │  Detail      │
 * │  Post Card 3                         │  + Comments  │
 * │  ...                                 │              │
 * │  Load More                           │              │
 * └──────────────────────────────────────┴──────────────┘
 * ```
 *
 * ## Usage
 * ```tsx
 * // Sidebar mode (default)
 * <SpaceLayout
 *   layoutMode="sidebar"
 *   space={{ description: "..." }}
 *   posts={posts}
 *   onPostClick={(post) => openThread(post)}
 * />
 *
 * // Fullwidth mode with context panel
 * <SpaceLayout
 *   layoutMode="fullwidth"
 *   space={{ description: "..." }}
 *   posts={posts}
 *   onPostClick={(post) => openThread(post)}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceLayout (SPEC-Compliant 60/40)",
  component: SpaceLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# SPEC-Compliant Spaces Layout

This is the **correct** implementation matching SPEC.md requirements.

**Key Features:**
- 60/40 split (Chat Board + Universal Widgets Sidebar)
- 4 Universal Widgets in sidebar: Members, Events, Tools, Resources
- Hot thread tabs (10+ replies automatically become tabs, max 5)
- Widget modals expand to show full content
- Responsive design (stacks on mobile)

**In Development:**
- Hash-based navigation (\`#events\`, \`#members\`, \`#resources\`)
- Side panel overlays (replacing modals)
- Inline tools system (📅📊📋📚)
- Post promotion UI for leaders

**Note:** The deprecated "adaptive three-zone" layout has been removed.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleSpace = {
  description: "Weekly study sessions for Computer Science students. Join us to collaborate on assignments, prepare for exams, and build lasting connections with fellow CS majors.",
  tags: ["computer-science", "study-group", "academic"],
  category: "Academic",
  type: "academic" as const,
  memberCount: 87,
  postCount: 234,
  eventCount: 12,
  createdAt: new Date("2024-01-15"),
  createdBy: {
    name: "Sarah Chen",
    handle: "@sarahc",
    avatar: "https://github.com/shadcn.png",
  },
  rules: [
    "Be respectful and kind to all members",
    "No spam or self-promotion",
    "Keep discussions on-topic and relevant",
    "Help each other learn and grow",
  ],
};

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
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likeCount: 42,
    commentCount: 15,
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
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likeCount: 3,
    commentCount: 7,
  },
];

const sampleEvents: SpaceEvent[] = [
  {
    id: "1",
    title: "Midterm Study Session",
    description: "Group study session to prepare for upcoming CS midterms.",
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    location: "Lockwood Library, 3rd Floor",
    rsvpCount: 12,
    isAttending: true,
    type: "academic",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Pizza Social",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    location: "Student Union, Room 201",
    rsvpCount: 28,
    type: "social",
    status: "upcoming",
  },
];

const sampleResources: SpaceResource[] = [
  {
    id: "1",
    title: "CS Course Schedule",
    description: "Complete course offerings for Computer Science department.",
    url: "https://engineering.buffalo.edu/computer-science",
    type: "link",
    addedAt: new Date("2024-01-15"),
    isPinned: true,
    clicks: 234,
  },
  {
    id: "2",
    title: "Data Structures Study Guide",
    url: "https://docs.google.com/document/d/abc123",
    type: "document",
    addedAt: new Date("2024-02-01"),
    isPinned: true,
    clicks: 187,
  },
  {
    id: "3",
    title: "Group Project Repository",
    url: "https://github.com/ub-cs/cse220-project",
    type: "github",
    addedAt: new Date("2024-03-01"),
    clicks: 56,
  },
];

const sampleMembers: SpaceMemberPreview[] = [
  {
    userId: "1",
    name: "Sarah Chen",
    handle: "@sarahc",
    avatar: "https://github.com/shadcn.png",
    role: "founder",
    isOnline: true,
  },
  {
    userId: "2",
    name: "Alex Morgan",
    handle: "@alex",
    avatar: "https://github.com/vercel.png",
    role: "leader",
    isOnline: true,
  },
  {
    userId: "3",
    name: "Jordan Lee",
    handle: "@jordan",
    role: "moderator",
    isOnline: false,
  },
  {
    userId: "4",
    name: "Casey Kim",
    handle: "@casey",
    avatar: "https://github.com/shadcn.png",
    role: "member",
    isOnline: true,
  },
  {
    userId: "5",
    name: "Morgan Taylor",
    handle: "@morgan",
    avatar: "https://github.com/vercel.png",
    role: "member",
    isOnline: false,
  },
  {
    userId: "6",
    name: "Riley Park",
    handle: "@riley",
    role: "member",
    isOnline: true,
  },
];

/**
 * Default space layout (as regular member)
 */
export const Default: Story = {
  args: {
    space: sampleSpace,
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isMember: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLikePost: (postId) => console.log("Like:", postId),
    onCommentPost: (postId) => console.log("Comment:", postId),
    onEventClick: (event) => console.log("Event clicked:", event),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onViewAllMembers: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * As space leader (full permissions)
 */
export const AsSpaceLeader: Story = {
  args: {
    space: sampleSpace,
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isLeader: true,
    isMember: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLikePost: (postId) => console.log("Like:", postId),
    onCommentPost: (postId) => console.log("Comment:", postId),
    onSharePost: (postId) => console.log("Share:", postId),
    onLoadMore: () => console.log("Load more posts"),
    hasMorePosts: true,
    onEditDescription: () => console.log("Edit description"),
    onEditRules: () => console.log("Edit rules"),
    onCreateEvent: () => console.log("Create event"),
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
    onAddResource: () => console.log("Add resource"),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onInviteMembers: () => console.log("Invite members"),
    onViewAllMembers: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * As visitor (non-member viewing)
 */
export const AsVisitor: Story = {
  args: {
    space: sampleSpace,
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isLeader: false,
    isMember: false,
    onPostClick: (post) => console.log("Post clicked:", post),
    onEventClick: (event) => console.log("Event clicked:", event),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onViewAllMembers: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * New space (no content yet)
 */
export const NewSpace: Story = {
  args: {
    space: {
      ...sampleSpace,
      description: "Just getting started! Join us to capture moments and improve your photography skills.",
      tags: ["photography", "art", "creative"],
      category: "Arts",
      type: "interest" as const,
      memberCount: 3,
      postCount: 0,
      eventCount: 0,
      createdAt: new Date(),
      rules: [
        "Be constructive with feedback",
        "Give credit when sharing others' work",
        "All skill levels welcome",
      ],
    },
    posts: [],
    events: [],
    resources: [],
    members: sampleMembers.slice(0, 3),
    totalMemberCount: 3,
    isLeader: true,
    isMember: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onEditDescription: () => console.log("Edit description"),
    onEditRules: () => console.log("Edit rules"),
    onCreateEvent: () => console.log("Create event"),
    onAddResource: () => console.log("Add resource"),
    onInviteMembers: () => console.log("Invite members"),
    onViewAllMembers: () => console.log("View all members"),
  },
};

/**
 * Active community (lots of content)
 */
export const ActiveCommunity: Story = {
  args: {
    space: {
      ...sampleSpace,
      memberCount: 523,
      postCount: 1847,
      eventCount: 38,
    },
    posts: [...samplePosts, ...samplePosts, ...samplePosts],
    events: [...sampleEvents, ...sampleEvents],
    resources: [...sampleResources, ...sampleResources],
    members: sampleMembers,
    totalMemberCount: 523,
    isMember: true,
    hasMorePosts: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLikePost: (postId) => console.log("Like:", postId),
    onCommentPost: (postId) => console.log("Comment:", postId),
    onLoadMore: () => console.log("Load more posts"),
    onEventClick: (event) => console.log("Event clicked:", event),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onViewAllMembers: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Official university space
 */
export const OfficialSpace: Story = {
  args: {
    space: {
      description: "Official announcements and resources from UB Housing & Residential Life. Stay informed about housing updates, maintenance, and community events.",
      tags: ["official", "housing", "announcements"],
      category: "Official",
      type: "official" as const,
      memberCount: 1847,
      postCount: 423,
      eventCount: 67,
      createdAt: new Date("2023-08-01"),
      createdBy: {
        name: "UB Housing",
        handle: "@ub-housing",
      },
      rules: [
        "This is an official university space",
        "Follow UB student code of conduct",
        "Report maintenance issues through official channels",
      ],
    },
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 1847,
    isMember: true,
    onPostClick: (post) => console.log("Post clicked:", post),
    onEventClick: (event) => console.log("Event clicked:", event),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onViewAllMembers: () => console.log("View all members"),
  },
};

/**
 * Left sidebar variant
 */
export const LeftSidebar: Story = {
  args: {
    space: sampleSpace,
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isMember: true,
    sidebarPosition: "left",
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLikePost: (postId) => console.log("Like:", postId),
    onCommentPost: (postId) => console.log("Comment:", postId),
    onEventClick: (event) => console.log("Event clicked:", event),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onViewAllMembers: () => console.log("View all members"),
  },
};

/**
 * Non-sticky sidebar (scrolls with content)
 */
export const NonStickySidebar: Story = {
  args: {
    space: sampleSpace,
    posts: [...samplePosts, ...samplePosts, ...samplePosts],
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isMember: true,
    sidebarSticky: false,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked:", post),
    onLikePost: (postId) => console.log("Like:", postId),
    onCommentPost: (postId) => console.log("Comment:", postId),
    onEventClick: (event) => console.log("Event clicked:", event),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onViewAllMembers: () => console.log("View all members"),
  },
};

/**
 * Interactive demo with all features
 */
export const InteractiveDemo: Story = {
  args: {
    space: sampleSpace,
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isLeader: true,
    isMember: true,
    hasMorePosts: true,
    onCreatePost: (content) => alert(`Creating post:\n${content}`),
    onPostClick: (post) => alert(`Viewing post:\n${post.content.substring(0, 50)}...`),
    onLikePost: (postId) => alert(`Liked post: ${postId}`),
    onCommentPost: (postId) => alert(`Opening comments for post: ${postId}`),
    onSharePost: (postId) => alert(`Sharing post: ${postId}`),
    onLoadMore: () => alert("Loading more posts..."),
    onEditDescription: () => alert("Opening description editor..."),
    onEditRules: () => alert("Opening rules editor..."),
    onCreateEvent: () => alert("Opening event creation modal..."),
    onEventClick: (event) => alert(`Viewing event: ${event.title}`),
    onRSVP: (eventId, attending) => alert(`RSVP ${attending ? "confirmed" : "cancelled"}`),
    onAddResource: () => alert("Opening resource creation modal..."),
    onResourceClick: (resource) => alert(`Opening resource: ${resource.title}`),
    onInviteMembers: () => alert("Opening invite dialog..."),
    onViewAllMembers: () => alert("Navigating to full member list..."),
    onMemberClick: (member) => alert(`Viewing profile: ${member.name}`),
  },
};

/**
 * Fullwidth mode (Discord-style)
 *
 * Click any post to see the sliding context panel animation.
 * The feed compresses smoothly to make room for the 400px thread view.
 */
export const FullwidthMode: Story = {
  args: {
    layoutMode: "fullwidth",
    space: sampleSpace,
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isMember: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked (opens context panel):", post),
    onLikePost: (postId) => console.log("Like:", postId),
    onCommentPost: (postId) => console.log("Comment:", postId),
    onEventClick: (event) => console.log("Event clicked:", event),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onViewAllMembers: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Fullwidth mode as leader
 *
 * Shows the Discord-style layout with all leader controls.
 * Context panel slides in when viewing post threads.
 */
export const FullwidthAsLeader: Story = {
  args: {
    layoutMode: "fullwidth",
    space: sampleSpace,
    posts: samplePosts,
    events: sampleEvents,
    resources: sampleResources,
    members: sampleMembers,
    totalMemberCount: 87,
    isLeader: true,
    isMember: true,
    hasMorePosts: true,
    onCreatePost: (content) => console.log("Create post:", content),
    onPostClick: (post) => console.log("Post clicked (opens context panel):", post),
    onLikePost: (postId) => console.log("Like:", postId),
    onCommentPost: (postId) => console.log("Comment:", postId),
    onSharePost: (postId) => console.log("Share:", postId),
    onLoadMore: () => console.log("Load more posts"),
    onEditDescription: () => console.log("Edit description"),
    onEditRules: () => console.log("Edit rules"),
    onCreateEvent: () => console.log("Create event"),
    onEventClick: (event) => console.log("Event clicked:", event),
    onRSVP: (eventId, attending) => console.log("RSVP:", eventId, attending),
    onAddResource: () => console.log("Add resource"),
    onResourceClick: (resource) => console.log("Resource clicked:", resource),
    onInviteMembers: () => console.log("Invite members"),
    onViewAllMembers: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};
