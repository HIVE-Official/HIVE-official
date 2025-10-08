/**
 * Canonical Space Data Model
 *
 * This file defines the contract for all Space components in the HIVE UI system.
 * These types mirror @hive/core domain models but are simplified for UI layer consumption.
 *
 * @module types/space
 */

/**
 * Space Type Classification
 */
export type SpaceType = "academic" | "greek" | "residential" | "interest" | "official"

/**
 * Space Privacy Level
 */
export type SpacePrivacy = "public" | "private" | "hidden"

/**
 * Space Category
 */
export type SpaceCategory =
  | "student_org"
  | "academic"
  | "residential"
  | "athletics"
  | "arts"
  | "campus_services"
  | "social"
  | "community"

/**
 * Minimal User Info (for avatars, social proof)
 */
export interface UserPreview {
  id: string
  name: string
  handle?: string
  avatar?: string
  major?: string
}

/**
 * Space Statistics
 */
export interface SpaceStats {
  memberCount: number
  postCount: number
  eventCount: number
  activeToday: number
}

/**
 * Campus Context (Social Proof)
 *
 * Provides campus-specific signals that help students decide
 * whether to join a space.
 */
export interface SpaceCampusContext {
  /** Friends/connections who are members (strongest social proof) */
  friendsInSpace: UserPreview[]

  /** Whether this space is trending on campus */
  isTrending: boolean

  /** Trending category (if trending) */
  trendingCategory?: string

  /** Primary major/discipline (for academic spaces) */
  primaryMajor?: string

  /** Building/dorm (for residential spaces) */
  building?: string
}

/**
 * User Context (Computed for Current User)
 *
 * Represents the current user's relationship with the space.
 */
export interface SpaceUserContext {
  /** Whether current user has joined */
  isJoined: boolean

  /** Whether current user is a leader */
  isLeader: boolean

  /** Unread post count (for joined spaces) */
  unreadCount: number

  /** Last activity timestamp */
  lastActivity?: Date
}

/**
 * Canonical Space Data Model
 *
 * This is the single source of truth for space data flowing through
 * the component hierarchy: Template → Organism → Molecule.
 *
 * All Space components should accept this type (or subsets of it).
 */
export interface SpaceData {
  // Identity
  id: string
  name: string
  description: string
  coverPhoto?: string

  // Classification
  category: SpaceCategory
  spaceType: SpaceType
  privacy: SpacePrivacy
  tags: string[]

  // Stats (always present, even if zero)
  stats: SpaceStats

  // Campus context (social proof, trending, etc.)
  campus: SpaceCampusContext

  // User context (computed for current user)
  userContext: SpaceUserContext

  // Optional rich data
  creator?: UserPreview
  createdAt?: Date
  rules?: string[]
  memberAvatars?: UserPreview[]
}

/**
 * Space Card Variant
 *
 * Determines the visual presentation of the space card.
 */
export type SpaceCardVariant =
  | "default"     // Standard vertical card
  | "discovery"   // Horizontal card for browse/discovery
  | "joined"      // Card for joined spaces (shows unread badge)
  | "compact"     // Minimal card for lists

/**
 * Space Card Layout
 */
export type SpaceCardLayout =
  | "vertical"    // Cover on top, content below
  | "horizontal"  // Cover on left, content on right

/**
 * Space Action Types
 *
 * Aggregated action type for event handling.
 * Allows components to emit any space-related action through a single handler.
 *
 * This eliminates prop explosion (20+ callbacks) by using discriminated unions.
 */
export type SpaceAction =
  // Space-level actions
  | { type: 'space.join' }
  | { type: 'space.leave' }
  | { type: 'space.click' }
  | { type: 'space.edit' }
  | { type: 'space.settings' }
  | { type: 'space.analytics' }
  | { type: 'space.invite' }

  // Post actions
  | { type: 'post.create'; content: string; attachments?: string[] }
  | { type: 'post.click'; postId: string }
  | { type: 'post.like'; postId: string }
  | { type: 'post.unlike'; postId: string }
  | { type: 'post.comment'; postId: string }
  | { type: 'post.share'; postId: string }
  | { type: 'post.delete'; postId: string }
  | { type: 'post.report'; postId: string }
  | { type: 'post.pin'; postId: string }
  | { type: 'post.unpin'; postId: string }

  // Event actions
  | { type: 'event.create' }
  | { type: 'event.click'; eventId: string }
  | { type: 'event.edit'; eventId: string }
  | { type: 'event.delete'; eventId: string }
  | { type: 'event.rsvp'; eventId: string; attending: boolean }

  // Tool actions (HiveLab)
  | { type: 'tool.event.create' }
  | { type: 'tool.poll.create' }
  | { type: 'tool.task.create' }
  | { type: 'tool.resource.upload' }

  // Resource actions
  | { type: 'resource.add' }
  | { type: 'resource.click'; resourceId: string }
  | { type: 'resource.edit'; resourceId: string }
  | { type: 'resource.delete'; resourceId: string }

  // Member actions
  | { type: 'member.click'; memberId: string }
  | { type: 'member.invite' }
  | { type: 'member.remove'; memberId: string }
  | { type: 'member.promote'; memberId: string }
  | { type: 'member.demote'; memberId: string }
  | { type: 'member.viewAll' }

  // Content moderation
  | { type: 'content.report'; contentType: 'post' | 'comment' | 'event'; contentId: string }
  | { type: 'content.remove'; contentType: 'post' | 'comment' | 'event'; contentId: string }

  // Description/rules editing (leader only)
  | { type: 'description.edit' }
  | { type: 'rules.edit' }

  // Feed interactions
  | { type: 'feed.loadMore' }
  | { type: 'feed.refresh' }

/**
 * Space Action Handler
 *
 * Single callback that handles all space-related actions.
 * Components should call this with the appropriate action object.
 *
 * Example usage:
 * ```tsx
 * <SpaceCard
 *   space={space}
 *   onAction={(action) => {
 *     switch (action.type) {
 *       case 'space.join':
 *         return handleJoin()
 *       case 'space.click':
 *         return router.push(`/spaces/${space.id}`)
 *       case 'post.like':
 *         return likePost(action.postId)
 *     }
 *   }}
 * />
 * ```
 */
export type SpaceActionHandler = (action: SpaceAction) => void | Promise<void>

/**
 * Loading State
 *
 * Represents async operation states for space components.
 */
export type LoadingState = "idle" | "loading" | "success" | "error"

/**
 * Space Component Status
 *
 * Used for components that need to show different states.
 */
export interface SpaceComponentStatus {
  posts?: LoadingState
  events?: LoadingState
  resources?: LoadingState
  members?: LoadingState
}

/**
 * Space Layout Mode
 */
export type SpaceLayoutMode = "sidebar" | "fullwidth"

/**
 * Context Panel State
 *
 * State for the sliding context panel (thread view).
 */
export interface ContextPanelState {
  isOpen: boolean
  postId?: string
}

/**
 * Helper: Create Empty Campus Context
 */
export const createEmptyCampusContext = (): SpaceCampusContext => ({
  friendsInSpace: [],
  isTrending: false,
})

/**
 * Helper: Create Default User Context
 */
export const createDefaultUserContext = (): SpaceUserContext => ({
  isJoined: false,
  isLeader: false,
  unreadCount: 0,
})

/**
 * Helper: Create Default Stats
 */
export const createDefaultStats = (): SpaceStats => ({
  memberCount: 0,
  postCount: 0,
  eventCount: 0,
  activeToday: 0,
})

/**
 * Type Guard: Check if action is post-related
 */
export const isPostAction = (action: SpaceAction): boolean => {
  return action.type.startsWith('post.')
}

/**
 * Type Guard: Check if action is event-related
 */
export const isEventAction = (action: SpaceAction): boolean => {
  return action.type.startsWith('event.')
}

/**
 * Type Guard: Check if action is member-related
 */
export const isMemberAction = (action: SpaceAction): boolean => {
  return action.type.startsWith('member.')
}

/**
 * Type Guard: Check if action requires leader permissions
 */
export const isLeaderAction = (action: SpaceAction): boolean => {
  const leaderActions = [
    'space.edit',
    'space.settings',
    'space.analytics',
    'event.create',
    'event.edit',
    'event.delete',
    'resource.add',
    'resource.edit',
    'resource.delete',
    'member.remove',
    'member.promote',
    'member.demote',
    'content.remove',
    'description.edit',
    'rules.edit',
  ]
  return leaderActions.includes(action.type)
}

/**
 * Re-export common types from other domains
 * (These will reference actual types once we integrate with @hive/core)
 */
export type { SpacePost } from '../atomic/organisms/space-post-feed'
export type { SpaceEvent } from '../atomic/organisms/space-events-panel'
export type { SpaceResource } from '../atomic/organisms/space-resources-panel'
export type { SpaceMemberPreview } from '../atomic/organisms/space-members-panel'
