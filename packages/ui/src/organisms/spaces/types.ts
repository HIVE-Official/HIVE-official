// Bounded Context Owner: Spaces Domain Guild
// TypeScript definitions for Spaces composition system

/**
 * Space Type - determines default policies and UI behavior
 */
export type SpaceType =
  | "student_org" // Student organizations - open by default
  | "university_org" // University/departmental orgs
  | "greek" // Greek life - members-only by default
  | "residential"; // Residential halls - members-only by default

/**
 * Space source - how the space was created
 */
export type SpaceSource =
  | "manual" // User-created
  | "rss_imported"; // RSS feed import (unclaimed until verified)

/**
 * Visibility policy for posts and space
 */
export type Visibility =
  | "public" // Visible on campus feed
  | "members_only"; // Only visible to space members

/**
 * Join policy for space membership
 */
export type JoinPolicy =
  | "open" // Anyone can join instantly
  | "request" // Must request to join (approval required)
  | "invite_only"; // Invite-only via link/QR

/**
 * Posting policy - who can create posts
 */
export type PostingPolicy =
  | "members" // All members can post
  | "leaders_only"; // Only leaders/mods can post

/**
 * Member role within a space
 */
export type MemberRole =
  | "member" // Standard member
  | "moderator" // Can moderate content
  | "leader" // Full admin access
  | "follower"; // View-only (if enabled)

/**
 * Post type - determines card rendering and interactions
 */
export type PostType =
  | "standard" // Text/media/link post
  | "event" // Event with RSVP/check-in
  | "poll" // Poll with voting
  | "form" // Form/signup with submissions
  | "announcement" // Leader announcement
  | "tracker" // Counter/tracker tool
  | "check_in" // Check-in requirement
  | "digest"; // Bundled auto-posts

/**
 * RSVP status for events
 */
export type RSVPStatus = "going" | "maybe" | "not_going" | "waitlist";

/**
 * Event state
 */
export type EventState = "upcoming" | "active" | "ended";

/**
 * Poll/Form state
 */
export type InteractiveState = "open" | "closed";

/**
 * Core Space interface
 */
export interface Space {
  id: string;
  campusId: string;
  name: string;
  description: string;
  type: SpaceType;
  source: SpaceSource;

  // Visual identity
  avatarUrl?: string;
  coverImageUrl?: string;
  accentColor?: string;

  // Verification & trust
  isVerified: boolean;

  // Policies
  visibility: Visibility;
  joinPolicy: JoinPolicy;
  postingPolicy: PostingPolicy;
  allowPublicPosts: boolean; // Can posts be shared to campus feed

  // Metadata
  tags: string[];
  featuredLinks: SpaceLink[];
  memberCount: number;
  activeMembers7d: number;
  membership?: {
    role: MemberRole;
    joinedAt?: Date;
  } | null;

  // RSS metadata (if source === 'rss_imported')
  rssUrl?: string;
  lastSyncedAt?: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Link for featured content
 */
export interface SpaceLink {
  label: string;
  url: string;
  iconName?: string;
}

/**
 * Space member
 */
export interface SpaceMember {
  userId: string;
  spaceId: string;
  role: MemberRole;
  joinedAt: Date;
  lastActiveAt?: Date;

  // User details (denormalized for display)
  fullName: string;
  handle: string;
  avatarUrl?: string;
  graduationYear?: number;
}

export interface PostAttachment {
  id?: string;
  type: "image" | "file" | "link" | "video";
  url: string;
  title?: string;
  description?: string;
}

export interface ToolContext {
  toolId: string;
  toolSlug?: string;
  placementId?: string;
  variant?: string;
}

/**
 * Base post interface - extended by specific types
 */
export interface BasePost {
  id: string;
  spaceId: string;
  type: PostType;
  visibility: Visibility;

  // Author
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  authorRole: MemberRole; // Author's role in the space

  // Pinning
  isPinned: boolean;
  pinnedUntil?: Date;

  // Moderation
  isHidden: boolean; // Auto-hidden by report threshold
  reportCount: number;

  // Engagement
  commentCount: number;
  reactionCount: number;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date; // For activity-based sorting

  // Rich media and integrations
  attachments?: PostAttachment[];
  toolContext?: ToolContext | null;
}

/**
 * Standard text/media post
 */
export interface StandardPost extends BasePost {
  type: "standard";
  content: string;
  mediaUrls?: string[];
  linkPreview?: LinkPreview;
}

/**
 * Link preview metadata
 */
export interface LinkPreview {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
}

/**
 * Event post with RSVP capabilities
 */
export interface EventPost extends BasePost {
  type: "event";
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  // Visuals (optional cover)
  coverImageUrl?: string;
  coverImageAlt?: string;

  // RSVP settings
  maxAttendees?: number;
  enableWaitlist: boolean;

  // Check-in settings
  checkInEnabled: boolean;
  checkInWindowBefore?: number; // minutes
  checkInWindowAfter?: number; // minutes
  qrCodeEnabled?: boolean;

  // Co-hosts
  coHostIds: string[];

  // State
  state: EventState;

  // Counts
  goingCount: number;
  maybeCount: number;
  waitlistCount: number;
  checkedInCount: number;

  // User's RSVP status (denormalized for display)
  userRsvp?: RSVPStatus;
  userCheckedIn?: boolean;
}

/**
 * Poll post
 */
export interface PollPost extends BasePost {
  type: "poll";
  question: string;
  options: PollOption[];
  state: InteractiveState;

  // Settings
  allowMultiple: boolean;
  showResultsAfterVote: boolean;
  closeAt?: Date;

  // User's vote (denormalized for display)
  userVotes?: string[]; // option IDs
}

/**
 * Poll option
 */
export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

/**
 * Form/Signup post
 */
export interface FormPost extends BasePost {
  type: "form";
  title: string;
  description: string;
  fields: SpaceFormField[];
  state: InteractiveState;

  // Settings
  maxSubmissions?: number;
  closeAt?: Date;
  requiresApproval: boolean;
  allowAnonymous: boolean;

  // Counts
  submissionCount: number;

  // User's submission status (denormalized for display)
  userSubmitted?: boolean;
}

/**
 * Form field definition
 */
export interface SpaceFormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox" | "radio" | "date";
  required: boolean;
  options?: string[]; // For select/radio
  placeholder?: string;
}

/**
 * Announcement post (leader-only)
 */
export interface AnnouncementPost extends BasePost {
  type: "announcement";
  title: string;
  content: string;
  priority: "low" | "normal" | "high";

  // Acknowledgement
  requiresAcknowledgment: boolean;
  acknowledgmentCount: number;

  // User's acknowledgment status
  userAcknowledged?: boolean;
}

/**
 * Tracker/Counter post
 */
export interface TrackerPost extends BasePost {
  type: "tracker";
  title: string;
  description: string;
  currentValue: number;
  goalValue?: number;
  unit: string;

  // Visualization
  chartType: "number" | "progress" | "chart";
}

/**
 * Check-in requirement post
 */
export interface CheckInPost extends BasePost {
  type: "check_in";
  title: string;
  description: string;
  relatedEventId?: string; // Link to event if event-based

  // Check-in window
  checkInStart: Date;
  checkInEnd: Date;

  // Requirements
  requiresLocation: boolean;
  requiresPhoto: boolean;
  requiresConsent: boolean; // Photo consent for Greek/Residential

  // Counts
  checkInCount: number;

  // User's check-in status
  userCheckedIn?: boolean;
}

/**
 * Digest post - bundles multiple auto-generated posts
 */
export interface DigestPost extends BasePost {
  type: "digest";
  title: string; // e.g., "Today's Activity"
  bundledPosts: BundledPostSummary[];
}

/**
 * Summary of a bundled post in digest
 */
export interface BundledPostSummary {
  id: string;
  type: PostType;
  title: string;
  timestamp: Date;
}

/**
 * Union type for all post variants
 */
export type Post =
  | StandardPost
  | EventPost
  | PollPost
  | FormPost
  | AnnouncementPost
  | TrackerPost
  | CheckInPost
  | DigestPost;

/**
 * Calendar event (may be linked to EventPost)
 */
export interface CalendarEvent {
  id: string;
  spaceId: string;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  coverImageUrl?: string;
  coverImageAlt?: string;
  tags?: string[];

  // RSVP
  maxAttendees?: number;
  enableWaitlist: boolean;
  goingCount: number;
  maybeCount: number;
  waitlistCount: number;

  // Check-in
  checkInEnabled: boolean;
  checkedInCount: number;
  checkInWindowBefore?: number;
  checkInWindowAfter?: number;
  qrCodeEnabled?: boolean;

  // Co-hosts
  coHostIds: string[];
  coHostNames: string[];

  // Source
  isRssImported: boolean;
  postId?: string; // Link to EventPost if applicable

  // User state
  userRsvp?: RSVPStatus;
  userCheckedIn?: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Tool installation in a space
 */
export interface SpaceToolInstallation {
  id: string;
  spaceId: string;
  toolId: string; // HiveLab tool ID
  toolName: string;
  toolType: string;

  // Configuration
  isActive: boolean;
  showInComposer: boolean;
  composerLabel?: string;
  composerIcon?: string;

  // Defaults
  defaultVisibility: Visibility;
  autoPostEnabled: boolean;
  autoPostThreshold?: number;

  // Metadata
  installedBy: string;
  installedAt: Date;
  lastUsedAt?: Date;
}

/**
 * Moderation report
 */
export interface ModerationReport {
  id: string;
  spaceId: string;
  contentId: string; // Post ID
  contentType: "post" | "comment";

  reporterId: string;
  reason: "spam" | "harassment" | "inappropriate" | "misinformation" | "other";
  details?: string;

  status: "pending" | "reviewed" | "actioned" | "dismissed";
  reviewedBy?: string;
  reviewedAt?: Date;
  action?: "remove" | "warn" | "mute" | "ban";

  createdAt: Date;
}

/**
 * Space analytics snapshot
 */
export interface SpaceAnalytics {
  spaceId: string;
  period: "day" | "week" | "month";

  // Activity metrics
  postsCreated: number;
  commentsCreated: number;
  reactionsCreated: number;

  // Member metrics
  activeMembersCount: number;
  newMembersCount: number;
  d7Retention: number; // percentage

  // Event metrics (if applicable)
  eventsCreated: number;
  rsvpCount: number;
  attendanceRate: number; // percentage

  // Tool metrics
  toolSubmissions: number;
  toolCompletionRate: number; // percentage

  // Growth metrics
  publicPostReach: number; // views from non-members
  joinsFromPublicPosts: number;

  timestamp: Date;
}

/**
 * Tool Category - categorizes space tools
 */
export type ToolCategory =
  | "automation" // Auto-posting, scheduling
  | "analytics" // Dashboards, reports
  | "engagement" // Polls, surveys, games
  | "content"; // Content generation, curation

/**
 * Tool Template - a tool available in the HiveLab catalog
 */
export interface ToolTemplate {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  authorId: string;
  authorName: string;
  authorAvatar?: string;

  // Stats
  installCount: number;
  rating: number; // 0-5

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Space Tool - an installed instance of a tool template
 */
export interface SpaceTool {
  id: string;
  spaceId: string;
  templateId: string;
  name: string;
  description: string;

  // State
  isActive: boolean;

  // Configuration (tool-specific JSON)
  config: Record<string, unknown>;

  // Stats
  postsCreated: number;
  lastRunAt?: Date;

  // Metadata
  installedAt: Date;
  installedBy: string;
  updatedAt: Date;
}
