/**
 * Trending Algorithm for HIVE Feed
 * 
 * Calculates trending scores based on:
 * - Engagement velocity (reactions, comments, shares over time)
 * - Cross-space virality (how many different spaces engaged)
 * - Content freshness (time decay factor)
 * - User authority (creator's influence score)
 * - Coordination relevance (study sessions, events, etc.)
 */

import { logger } from '../structured-logger';

export interface TrendingPost {
  id: string;
  spaceId: string;
  content: any;
  metrics: {
    views: number;
    reactions: number;
    comments: number;
    shares: number;
    uniqueEngagers: number;
    crossSpaceEngagement: number;
  };
  timestamp: Date;
  authorMetrics?: {
    followerCount: number;
    authorityScore: number;
    verifiedStatus: boolean;
  };
}

export interface TrendingScore {
  postId: string;
  score: number;
  components: {
    velocityScore: number;
    viralityScore: number;
    freshnessScore: number;
    authorityScore: number;
    relevanceScore: number;
  };
  trending: boolean;
  trendingCategory?: 'hot' | 'rising' | 'viral' | 'evergreen';
}

export class TrendingAlgorithm {
  private readonly VELOCITY_WEIGHT = 0.35;
  private readonly VIRALITY_WEIGHT = 0.25;
  private readonly FRESHNESS_WEIGHT = 0.20;
  private readonly AUTHORITY_WEIGHT = 0.10;
  private readonly RELEVANCE_WEIGHT = 0.10;

  // Time windows for velocity calculation (in hours)
  private readonly TIME_WINDOWS = {
    immediate: 1,
    short: 6,
    medium: 24,
    long: 72
  };

  // Decay factors for time-based scoring
  private readonly DECAY_RATES = {
    fast: 0.95, // For breaking news/events
    medium: 0.85, // For general content
    slow: 0.70 // For evergreen content
  };

  /**
   * Calculate trending score for a single post
   */
  calculateTrendingScore(post: TrendingPost): TrendingScore {
    const velocityScore = this.calculateVelocityScore(post);
    const viralityScore = this.calculateViralityScore(post);
    const freshnessScore = this.calculateFreshnessScore(post);
    const authorityScore = this.calculateAuthorityScore(post);
    const relevanceScore = this.calculateRelevanceScore(post);

    // Weighted combination of all scores
    const totalScore = 
      (velocityScore * this.VELOCITY_WEIGHT) +
      (viralityScore * this.VIRALITY_WEIGHT) +
      (freshnessScore * this.FRESHNESS_WEIGHT) +
      (authorityScore * this.AUTHORITY_WEIGHT) +
      (relevanceScore * this.RELEVANCE_WEIGHT);

    // Determine trending category
    const trendingCategory = this.determineTrendingCategory(
      velocityScore,
      viralityScore,
      freshnessScore
    );

    return {
      postId: post.id,
      score: totalScore,
      components: {
        velocityScore,
        viralityScore,
        freshnessScore,
        authorityScore,
        relevanceScore
      },
      trending: totalScore > 50, // Threshold for trending
      trendingCategory
    };
  }

  /**
   * Calculate engagement velocity (how fast engagement is growing)
   */
  private calculateVelocityScore(post: TrendingPost): number {
    const now = Date.now();
    const postAge = (now - post.timestamp.getTime()) / (1000 * 60 * 60); // in hours

    if (postAge === 0) return 100; // Brand new post gets max velocity

    // Calculate engagement rate per hour
    const totalEngagement = 
      post.metrics.reactions + 
      (post.metrics.comments * 2) + // Comments weighted higher
      (post.metrics.shares * 3); // Shares weighted highest

    const engagementRate = totalEngagement / postAge;

    // Apply logarithmic scaling to prevent outliers
    const scaledRate = Math.log10(engagementRate + 1) * 20;

    // Boost for recent high engagement
    let velocityBoost = 0;
    if (postAge < this.TIME_WINDOWS.immediate) {
      velocityBoost = 30; // Strong boost for very recent engagement
    } else if (postAge < this.TIME_WINDOWS.short) {
      velocityBoost = 15;
    } else if (postAge < this.TIME_WINDOWS.medium) {
      velocityBoost = 5;
    }

    return Math.min(100, scaledRate + velocityBoost);
  }

  /**
   * Calculate virality score (cross-space engagement)
   */
  private calculateViralityScore(post: TrendingPost): number {
    const uniqueEngagementRatio = post.metrics.uniqueEngagers / 
      Math.max(1, post.metrics.views) * 100;

    const crossSpaceMultiplier = Math.log10(
      post.metrics.crossSpaceEngagement + 1
    ) * 15;

    // Viral threshold: high unique engagement + cross-space spread
    const viralityBase = uniqueEngagementRatio * 0.7 + crossSpaceMultiplier * 0.3;

    // Bonus for hitting viral thresholds
    let viralBonus = 0;
    if (post.metrics.shares > 50) viralBonus += 20;
    if (post.metrics.crossSpaceEngagement > 5) viralBonus += 15;
    if (uniqueEngagementRatio > 30) viralBonus += 10;

    return Math.min(100, viralityBase + viralBonus);
  }

  /**
   * Calculate freshness score (time decay)
   */
  private calculateFreshnessScore(post: TrendingPost): number {
    const now = Date.now();
    const ageInHours = (now - post.timestamp.getTime()) / (1000 * 60 * 60);

    // Determine decay rate based on content type
    const decayRate = this.getDecayRate(post);

    // Exponential decay with content-specific rate
    const freshnessScore = 100 * Math.pow(decayRate, ageInHours / 24);

    // Minimum score for active content
    return Math.max(10, freshnessScore);
  }

  /**
   * Calculate authority score (creator influence)
   */
  private calculateAuthorityScore(post: TrendingPost): number {
    if (!post.authorMetrics) return 30; // Default score for unknown authors

    const { followerCount, authorityScore, verifiedStatus } = post.authorMetrics;

    // Base score from author's existing authority
    let score = Math.min(50, authorityScore);

    // Follower influence (logarithmic scale)
    const followerInfluence = Math.log10(followerCount + 1) * 10;
    score += Math.min(30, followerInfluence);

    // Verification bonus
    if (verifiedStatus) {
      score += 20;
    }

    return Math.min(100, score);
  }

  /**
   * Calculate relevance score (coordination & campus activity)
   */
  private calculateRelevanceScore(post: TrendingPost): number {
    let score = 40; // Base relevance

    const content = post.content;

    // Boost for coordination posts
    if (content.type === 'coordination' || 
        content.type === 'study_session' ||
        content.type === 'food_run' ||
        content.type === 'ride_share') {
      score += 30;
    }

    // Boost for event posts
    if (content.type === 'event' || content.hasEvent) {
      score += 20;
    }

    // Boost for campus-wide relevance
    if (content.tags?.includes('campus-wide') || 
        content.visibility === 'public') {
      score += 10;
    }

    // Time-sensitive boost (upcoming events, deadlines)
    if (content.deadline || content.eventDate) {
      const deadline = new Date(content.deadline || content.eventDate);
      const hoursUntil = (deadline.getTime() - Date.now()) / (1000 * 60 * 60);
      
      if (hoursUntil > 0 && hoursUntil < 48) {
        score += 20; // Boost for upcoming time-sensitive content
      }
    }

    return Math.min(100, score);
  }

  /**
   * Determine content decay rate based on type
   */
  private getDecayRate(post: TrendingPost): number {
    const content = post.content;

    // Fast decay for time-sensitive content
    if (content.type === 'coordination' || 
        content.type === 'food_run' ||
        content.type === 'ride_share') {
      return this.DECAY_RATES.fast;
    }

    // Slow decay for evergreen content
    if (content.type === 'resource' || 
        content.type === 'guide' ||
        content.type === 'tool_share') {
      return this.DECAY_RATES.slow;
    }

    // Default medium decay
    return this.DECAY_RATES.medium;
  }

  /**
   * Determine trending category
   */
  private determineTrendingCategory(
    velocityScore: number,
    viralityScore: number,
    freshnessScore: number
  ): 'hot' | 'rising' | 'viral' | 'evergreen' | undefined {
    // Hot: High velocity + high freshness
    if (velocityScore > 70 && freshnessScore > 60) {
      return 'hot';
    }

    // Viral: High virality score
    if (viralityScore > 70) {
      return 'viral';
    }

    // Rising: Good velocity but not fresh
    if (velocityScore > 50 && freshnessScore < 60) {
      return 'rising';
    }

    // Evergreen: Consistent engagement over time
    if (velocityScore > 30 && freshnessScore < 40) {
      return 'evergreen';
    }

    return undefined;
  }

  /**
   * Batch calculate trending scores for multiple posts
   */
  calculateBatchTrendingScores(posts: TrendingPost[]): TrendingScore[] {
    const scores = posts.map(post => this.calculateTrendingScore(post));
    
    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    // Log top trending posts
    if (scores.length > 0) {
      logger.info('🔥 Top trending posts calculated', {
        topPost: scores[0],
        totalPosts: scores.length,
        trendingCount: scores.filter(s => s.trending).length
      });
    }

    return scores;
  }

  /**
   * Get trending posts from a list
   */
  getTrendingPosts(
    posts: TrendingPost[],
    limit: number = 10,
    category?: 'hot' | 'rising' | 'viral' | 'evergreen'
  ): TrendingPost[] {
    const scores = this.calculateBatchTrendingScores(posts);
    
    // Filter by category if specified
    const filteredScores = category
      ? scores.filter(s => s.trendingCategory === category)
      : scores.filter(s => s.trending);

    // Get post IDs of trending posts
    const trendingPostIds = filteredScores
      .slice(0, limit)
      .map(s => s.postId);

    // Return original posts in trending order
    return trendingPostIds
      .map(id => posts.find(p => p.id === id))
      .filter((p): p is TrendingPost => p !== undefined);
  }
}

// Export singleton instance
export const trendingAlgorithm = new TrendingAlgorithm();