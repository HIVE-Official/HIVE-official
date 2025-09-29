/**
 * HIVE Feature Gating System
 *
 * Philosophy: "Earn Your Voice"
 * Users must invest time and engagement before unlocking features.
 * This creates scarcity, value, and psychological investment.
 */

import { differenceInDays, differenceInHours } from 'date-fns';

export type UserLevel = 'lurker' | 'reactor' | 'commenter' | 'poster' | 'creator' | 'elite';

export interface UserStats {
  // Identity
  userId: string;
  createdAt: Date;

  // Profile completion
  profileCompleteness: number; // 0-100
  hasAvatar: boolean;
  hasBio: boolean;
  hasInterests: boolean;

  // Engagement metrics
  totalViews: number;
  totalDwellTime: number; // seconds
  totalLikes: number;
  totalComments: number;
  totalPosts: number;

  // Quality metrics
  flaggedContent: number;
  reportedContent: number;

  // Social metrics
  followers: number;
  following: number;
  mutualFollows: number;
  spaceMemberships: number;

  // Activity metrics
  lastActiveAt: Date;
  consecutiveDays: number;
  totalDaysActive: number;
}

export interface FeatureAccess {
  // Core permissions
  canView: boolean;
  canLike: boolean;
  canComment: boolean;
  canPost: boolean;
  canUploadMedia: boolean;
  canCreateEvents: boolean;
  canBuildTools: boolean;
  canStartRituals: boolean;
  canGoLive: boolean;

  // Daily limits
  dailyLikesLimit: number;
  dailyCommentsLimit: number;
  dailyPostsLimit: number;

  // Remaining today
  likesRemaining: number;
  commentsRemaining: number;
  postsRemaining: number;

  // Next unlock info
  currentLevel: UserLevel;
  nextLevel: UserLevel | null;
  nextUnlockFeature: string | null;
  nextUnlockProgress: number; // 0-100
  nextUnlockRequirements: string[];
  estimatedUnlockTime: string | null;
}

export interface UnlockRequirement {
  met: boolean;
  description: string;
  progress: number; // 0-100
}

/**
 * Calculate user's current level based on stats
 */
export function calculateUserLevel(stats: UserStats): UserLevel {
  const daysSinceJoined = differenceInDays(new Date(), stats.createdAt);

  // Elite: 180+ days, creator for 90+ days
  if (daysSinceJoined >= 180 && stats.totalPosts >= 100) {
    return 'elite';
  }

  // Creator: 30+ days, proven poster
  if (
    daysSinceJoined >= 30 &&
    stats.totalPosts >= 5 &&
    stats.profileCompleteness === 100 &&
    stats.flaggedContent === 0
  ) {
    return 'creator';
  }

  // Poster: 14+ days, proven commenter
  if (
    daysSinceJoined >= 14 &&
    stats.totalComments >= 10 &&
    stats.profileCompleteness >= 100 &&
    stats.mutualFollows >= 1 &&
    stats.flaggedContent === 0
  ) {
    return 'poster';
  }

  // Commenter: 7+ days, proven reactor
  if (
    daysSinceJoined >= 7 &&
    stats.totalLikes >= 30 &&
    stats.profileCompleteness >= 80 &&
    stats.following >= 5 &&
    stats.totalDaysActive >= 3
  ) {
    return 'commenter';
  }

  // Reactor: 3+ days, proven lurker
  if (
    daysSinceJoined >= 3 &&
    stats.totalViews >= 50 &&
    stats.profileCompleteness >= 60 &&
    stats.spaceMemberships >= 2 &&
    stats.totalDwellTime >= 600 // 10 minutes
  ) {
    return 'reactor';
  }

  // Lurker: Default starting level
  return 'lurker';
}

/**
 * Get feature access for user level
 */
export function getFeatureAccess(
  stats: UserStats,
  todayStats?: { likes: number; comments: number; posts: number }
): FeatureAccess {
  const level = calculateUserLevel(stats);
  const today = todayStats || { likes: 0, comments: 0, posts: 0 };

  // Define limits per level
  const limits = {
    lurker: { likes: 0, comments: 0, posts: 0 },
    reactor: { likes: 20, comments: 0, posts: 0 },
    commenter: { likes: 50, comments: 10, posts: 0 },
    poster: { likes: 100, comments: 25, posts: 3 },
    creator: { likes: Infinity, comments: Infinity, posts: 10 },
    elite: { likes: Infinity, comments: Infinity, posts: Infinity }
  };

  const currentLimits = limits[level];

  // Calculate next unlock
  const nextLevelMap: Record<UserLevel, UserLevel | null> = {
    lurker: 'reactor',
    reactor: 'commenter',
    commenter: 'poster',
    poster: 'creator',
    creator: 'elite',
    elite: null
  };

  const nextLevel = nextLevelMap[level];
  const { feature: nextFeature, progress, requirements, timeEstimate } =
    getNextUnlockInfo(stats, level, nextLevel);

  return {
    // Core permissions
    canView: true, // Always true
    canLike: level !== 'lurker',
    canComment: ['commenter', 'poster', 'creator', 'elite'].includes(level),
    canPost: ['poster', 'creator', 'elite'].includes(level),
    canUploadMedia: ['creator', 'elite'].includes(level),
    canCreateEvents: ['creator', 'elite'].includes(level),
    canBuildTools: ['creator', 'elite'].includes(level),
    canStartRituals: ['creator', 'elite'].includes(level),
    canGoLive: level === 'elite',

    // Daily limits
    dailyLikesLimit: currentLimits.likes,
    dailyCommentsLimit: currentLimits.comments,
    dailyPostsLimit: currentLimits.posts,

    // Remaining today
    likesRemaining: Math.max(0, currentLimits.likes - today.likes),
    commentsRemaining: Math.max(0, currentLimits.comments - today.comments),
    postsRemaining: Math.max(0, currentLimits.posts - today.posts),

    // Next unlock info
    currentLevel: level,
    nextLevel,
    nextUnlockFeature: nextFeature,
    nextUnlockProgress: progress,
    nextUnlockRequirements: requirements,
    estimatedUnlockTime: timeEstimate
  };
}

/**
 * Get detailed requirements for next unlock
 */
function getNextUnlockInfo(
  stats: UserStats,
  currentLevel: UserLevel,
  nextLevel: UserLevel | null
): {
  feature: string | null;
  progress: number;
  requirements: string[];
  timeEstimate: string | null;
} {
  if (!nextLevel) {
    return {
      feature: null,
      progress: 100,
      requirements: [],
      timeEstimate: null
    };
  }

  const daysSinceJoined = differenceInDays(new Date(), stats.createdAt);

  switch (nextLevel) {
    case 'reactor': {
      const requirements = [
        { met: daysSinceJoined >= 3, description: `Wait ${Math.max(0, 3 - daysSinceJoined)} more days` },
        { met: stats.profileCompleteness >= 60, description: `Complete profile (${stats.profileCompleteness}% done)` },
        { met: stats.spaceMemberships >= 2, description: `Join ${Math.max(0, 2 - stats.spaceMemberships)} more spaces` },
        { met: stats.totalDwellTime >= 600, description: `Spend ${Math.max(0, 10 - Math.floor(stats.totalDwellTime / 60))} more minutes reading` }
      ];

      const progress = (requirements.filter(r => r.met).length / requirements.length) * 100;
      const unmetRequirements = requirements.filter(r => !r.met).map(r => r.description);

      return {
        feature: 'Reactions & Likes',
        progress,
        requirements: unmetRequirements,
        timeEstimate: estimateTimeToUnlock(requirements, daysSinceJoined, 3)
      };
    }

    case 'commenter': {
      const requirements = [
        { met: daysSinceJoined >= 7, description: `Wait ${Math.max(0, 7 - daysSinceJoined)} more days` },
        { met: stats.totalLikes >= 30, description: `Give ${Math.max(0, 30 - stats.totalLikes)} more likes` },
        { met: stats.profileCompleteness >= 80, description: `Complete profile (${stats.profileCompleteness}% done)` },
        { met: stats.following >= 5, description: `Follow ${Math.max(0, 5 - stats.following)} more people` }
      ];

      const progress = (requirements.filter(r => r.met).length / requirements.length) * 100;
      const unmetRequirements = requirements.filter(r => !r.met).map(r => r.description);

      return {
        feature: 'Commenting',
        progress,
        requirements: unmetRequirements,
        timeEstimate: estimateTimeToUnlock(requirements, daysSinceJoined, 7)
      };
    }

    case 'poster': {
      const requirements = [
        { met: daysSinceJoined >= 14, description: `Wait ${Math.max(0, 14 - daysSinceJoined)} more days` },
        { met: stats.totalComments >= 10, description: `Write ${Math.max(0, 10 - stats.totalComments)} more comments` },
        { met: stats.profileCompleteness >= 100, description: `Complete profile (${stats.profileCompleteness}% done)` },
        { met: stats.mutualFollows >= 1, description: 'Get someone to follow you back' }
      ];

      const progress = (requirements.filter(r => r.met).length / requirements.length) * 100;
      const unmetRequirements = requirements.filter(r => !r.met).map(r => r.description);

      return {
        feature: 'Posting',
        progress,
        requirements: unmetRequirements,
        timeEstimate: estimateTimeToUnlock(requirements, daysSinceJoined, 14)
      };
    }

    case 'creator': {
      const requirements = [
        { met: daysSinceJoined >= 30, description: `Wait ${Math.max(0, 30 - daysSinceJoined)} more days` },
        { met: stats.totalPosts >= 5, description: `Create ${Math.max(0, 5 - stats.totalPosts)} more posts` },
        { met: stats.flaggedContent === 0, description: 'Maintain clean record' },
        { met: stats.followers >= 10, description: `Gain ${Math.max(0, 10 - stats.followers)} more followers` }
      ];

      const progress = (requirements.filter(r => r.met).length / requirements.length) * 100;
      const unmetRequirements = requirements.filter(r => !r.met).map(r => r.description);

      return {
        feature: 'Media, Events & Tools',
        progress,
        requirements: unmetRequirements,
        timeEstimate: estimateTimeToUnlock(requirements, daysSinceJoined, 30)
      };
    }

    default:
      return {
        feature: null,
        progress: 0,
        requirements: [],
        timeEstimate: null
      };
  }
}

/**
 * Estimate time until unlock
 */
function estimateTimeToUnlock(
  requirements: { met: boolean; description: string }[],
  currentDays: number,
  requiredDays: number
): string | null {
  if (requirements.every(r => r.met)) {
    return 'Ready to unlock!';
  }

  const daysRemaining = Math.max(0, requiredDays - currentDays);

  if (daysRemaining > 0) {
    if (daysRemaining === 1) return 'Tomorrow';
    if (daysRemaining < 7) return `${daysRemaining} days`;
    if (daysRemaining < 14) return '1 week';
    if (daysRemaining < 30) return `${Math.ceil(daysRemaining / 7)} weeks`;
    return `${Math.ceil(daysRemaining / 30)} months`;
  }

  // If time requirement is met, estimate based on other requirements
  const unmetCount = requirements.filter(r => !r.met).length;
  if (unmetCount === 1) return 'Almost there!';

  return 'Keep engaging!';
}

/**
 * Check if user should see a phantom engagement
 */
export function shouldShowPhantomEngagement(stats: UserStats): {
  show: boolean;
  type: 'profile_view' | 'like' | 'follow' | null;
} {
  const hoursSinceJoined = differenceInHours(new Date(), stats.createdAt);
  const level = calculateUserLevel(stats);

  // New users get phantom profile views
  if (hoursSinceJoined < 24 && Math.random() < 0.3) {
    return { show: true, type: 'profile_view' };
  }

  // First comment gets phantom like
  if (stats.totalComments === 1 && Math.random() < 0.8) {
    return { show: true, type: 'like' };
  }

  // Struggling users get phantom follow
  if (level === 'lurker' && hoursSinceJoined > 48 && stats.followers === 0 && Math.random() < 0.5) {
    return { show: true, type: 'follow' };
  }

  return { show: false, type: null };
}

/**
 * Generate celebration message for unlock
 */
export function getUnlockCelebration(feature: string): {
  title: string;
  message: string;
  icon: string;
  cta: string;
} {
  const celebrations: Record<string, any> = {
    'Reactions & Likes': {
      title: '🎉 Reactions Unlocked!',
      message: 'You can now like and react to posts. Your voice is getting stronger!',
      icon: '❤️',
      cta: 'React to a Post'
    },
    'Commenting': {
      title: '💬 Comments Unlocked!',
      message: 'You can now comment and join conversations. Make your voice heard!',
      icon: '💬',
      cta: 'Write Your First Comment'
    },
    'Posting': {
      title: '🚀 You Can Post Now!',
      message: 'After earning your voice, you can finally create posts. Make it count!',
      icon: '✨',
      cta: 'Create Your First Post'
    },
    'Media, Events & Tools': {
      title: '🎨 Creator Mode Activated!',
      message: 'Upload images, create events, and build tools. You\'re now a HIVE creator!',
      icon: '🎨',
      cta: 'Explore Creator Tools'
    }
  };

  return celebrations[feature] || {
    title: 'New Feature Unlocked!',
    message: 'You\'ve earned access to new capabilities.',
    icon: '🎉',
    cta: 'Explore'
  };
}

/**
 * Track feature unlock for analytics
 */
export function trackUnlock(
  userId: string,
  feature: string,
  level: UserLevel,
  stats: UserStats
): void {
  // This would send to your analytics service
  // Removed analytics tracking
}

/**
 * Calculate overall engagement score (0-100)
 */
function calculateEngagementScore(stats: UserStats): number {
  const weights = {
    profileCompleteness: 0.2,
    socialActivity: 0.3,
    contentCreation: 0.3,
    consistency: 0.2
  };

  const scores = {
    profileCompleteness: stats.profileCompleteness,
    socialActivity: Math.min(100, (stats.totalLikes + stats.followers * 2 + stats.following) / 2),
    contentCreation: Math.min(100, (stats.totalComments * 5 + stats.totalPosts * 10)),
    consistency: Math.min(100, stats.consecutiveDays * 10)
  };

  return Object.keys(weights).reduce((total, key) => {
    const k = key as keyof typeof weights;
    return total + (scores[k] * weights[k]);
  }, 0);
}