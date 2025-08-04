"use client";

import { useEffect, useState } from "react";
import { type Space } from "@hive/core";

// Core recommendation data types
interface UserProfile {
  id: string;
  year: "freshman" | "sophomore" | "junior" | "senior";
  major?: string;
  interests: string[];
  joinedSpaces: string[];
  friendIds: string[];
  activityLevel: "low" | "medium" | "high";
  timeCommitment: "low" | "medium" | "high";
  socialPreference: "intimate" | "medium" | "large";
  location?: {
    dorm?: string;
    building?: string;
  };
  behavioral: {
    joinedSpacesCount: number;
    averageSessionTime: number;
    lastActiveTime: Date;
    preferredDiscoveryTime: "morning" | "afternoon" | "evening";
    deviceType: "mobile" | "desktop";
  };
}

interface SpaceFeatures {
  id: string;
  category: string;
  size: number;
  activityLevel: number; // 0-1 scale
  averageCommitment: number; // hours per week
  demographics: {
    yearDistribution: Record<string, number>;
    majorDistribution: Record<string, number>;
  };
  engagement: {
    postsPerWeek: number;
    eventsPerMonth: number;
    memberRetention: number; // 30-day retention rate
  };
  social: {
    friendConnectionRate: number; // how often friends join together
    crossSpaceConnections: string[]; // related space IDs
  };
}

interface RecommendationResult {
  spaceId: string;
  score: number;
  confidence: number;
  reasons: string[];
  category: "perfect_match" | "explore_new" | "social_discovery" | "trending";
  freshmanBoost?: boolean;
}

class HIVERecommendationEngine {
  private userProfile: UserProfile;
  private spaceFeatures: Map<string, SpaceFeatures>;
  private collaborativeFiltering: Map<string, string[]>; // user -> similar users

  constructor(userProfile: UserProfile, spaceFeatures: SpaceFeatures[]) {
    this.userProfile = userProfile;
    this.spaceFeatures = new Map(spaceFeatures.map(sf => [sf.id, sf]));
    this.collaborativeFiltering = new Map();
  }

  // Main recommendation generation
  generateRecommendations(spaces: Space[], limit: number = 20): RecommendationResult[] {
    const recommendations: RecommendationResult[] = [];

    for (const space of spaces) {
      // Skip already joined spaces
      if (this.userProfile.joinedSpaces.includes(space.id)) continue;

      const features = this.spaceFeatures.get(space.id);
      if (!features) continue;

      const result = this.scoreSpace(space, features);
      if (result.score > 0.3) { // Minimum threshold
        recommendations.push(result);
      }
    }

    // Sort by score and apply diversity
    const sortedRecs = recommendations.sort((a, b) => b.score - a.score);
    return this.applyDiversityFilter(sortedRecs, limit);
  }

  private scoreSpace(space: Space, features: SpaceFeatures): RecommendationResult {
    let score = 0;
    let confidence = 0;
    const reasons: string[] = [];
    let category: RecommendationResult["category"] = "explore_new";

    // 1. Interest Alignment (30% weight)
    const interestScore = this.calculateInterestScore(space, features);
    score += interestScore * 0.3;
    confidence += 0.3;
    
    if (interestScore > 0.8) {
      reasons.push("Perfect match for your interests");
      category = "perfect_match";
    } else if (interestScore > 0.6) {
      reasons.push("Aligns with your interests");
    }

    // 2. Social Connections (25% weight)
    const socialScore = this.calculateSocialScore(space, features);
    score += socialScore * 0.25;
    confidence += 0.25;
    
    if (socialScore > 0.7) {
      reasons.push(`${this.getFriendsInSpace(space.id)} of your friends are here`);
      category = "social_discovery";
    }

    // 3. Behavioral Fit (20% weight)
    const behavioralScore = this.calculateBehavioralScore(features);
    score += behavioralScore * 0.2;
    confidence += 0.2;
    
    if (behavioralScore > 0.8) {
      reasons.push("Great fit for your activity level");
    }

    // 4. Demographic Similarity (15% weight)
    const demographicScore = this.calculateDemographicScore(features);
    score += demographicScore * 0.15;
    confidence += 0.15;

    // 5. Trending/Popular Signal (10% weight)
    const trendingScore = this.calculateTrendingScore(space, features);
    score += trendingScore * 0.1;
    confidence += 0.1;
    
    if (trendingScore > 0.8) {
      reasons.push("Trending in your network");
      category = "trending";
    }

    // Freshman boost for onboarding
    let freshmanBoost = false;
    if (this.userProfile.year === "freshman") {
      score += this.applyFreshmanBoost(space, features);
      freshmanBoost = true;
      reasons.push("Great for first-year students");
    }

    // Cold start handling
    if (this.userProfile.joinedSpaces.length < 3) {
      score = this.applyColdStartBoost(score, space, features);
    }

    return {
      spaceId: space.id,
      score: Math.min(score, 1.0), // Cap at 1.0
      confidence: Math.min(confidence, 1.0),
      reasons: reasons.slice(0, 2), // Keep top 2 reasons
      category,
      freshmanBoost
    };
  }

  private calculateInterestScore(space: Space, features: SpaceFeatures): number {
    let score = 0;
    
    // Direct interest matching
    const userInterests = (this.userProfile.interests || []).map(i => i.toLowerCase());
    const spaceKeywords = [
      space.name.toLowerCase(),
      space.description?.toLowerCase() || "",
      features.category.toLowerCase()
    ].join(" ");

    let matchCount = 0;
    for (const interest of userInterests) {
      if (spaceKeywords.includes(interest)) {
        matchCount++;
      }
    }
    
    score = matchCount / Math.max(userInterests.length, 1);
    
    // Boost for exact category match
    if (userInterests.includes(features.category.toLowerCase())) {
      score += 0.3;
    }

    return Math.min(score, 1.0);
  }

  private calculateSocialScore(space: Space, _features: SpaceFeatures): number {
    const friendsInSpace = this.getFriendsInSpace(space.id);
    
    if (friendsInSpace === 0) return 0;
    
    // Exponential relationship - more friends = much higher score
    const friendRatio = friendsInSpace / Math.max(this.userProfile.friendIds.length, 1);
    return Math.min(friendRatio * 2, 1.0); // 50% of friends = perfect score
  }

  private calculateBehavioralScore(features: SpaceFeatures): number {
    let score = 0;
    
    // Activity level matching
    const userActivityMap = { low: 0.3, medium: 0.6, high: 1.0 };
    const userActivity = userActivityMap[this.userProfile.activityLevel];
    const activityDiff = Math.abs(userActivity - features.activityLevel);
    score += (1 - activityDiff) * 0.4;
    
    // Time commitment matching
    const commitmentMap = { low: 2, medium: 5, high: 10 }; // hours/week
    const userCommitment = commitmentMap[this.userProfile.timeCommitment];
    const commitmentDiff = Math.abs(userCommitment - features.averageCommitment) / 10;
    score += Math.max(0, 1 - commitmentDiff) * 0.3;
    
    // Social preference matching
    const sizeScore = this.calculateSizePreferenceScore(features.size);
    score += sizeScore * 0.3;
    
    return Math.min(score, 1.0);
  }

  private calculateSizePreferenceScore(spaceSize: number): number {
    const sizeRanges = {
      intimate: [5, 25],
      medium: [25, 100], 
      large: [100, 1000]
    };
    
    const [min, max] = sizeRanges[this.userProfile.socialPreference];
    
    if (spaceSize >= min && spaceSize <= max) {
      return 1.0;
    } else if (spaceSize < min) {
      return Math.max(0, spaceSize / min);
    } else {
      return Math.max(0, max / spaceSize);
    }
  }

  private calculateDemographicScore(features: SpaceFeatures): number {
    let score = 0;
    
    // Year distribution match
    const userYearRatio = features.demographics.yearDistribution[this.userProfile.year] || 0;
    score += userYearRatio * 0.5;
    
    // Major match (if available)
    if (this.userProfile.major) {
      const majorRatio = features.demographics.majorDistribution[this.userProfile.major] || 0;
      score += majorRatio * 0.5;
    } else {
      score += 0.25; // Neutral score if no major data
    }
    
    return Math.min(score, 1.0);
  }

  private calculateTrendingScore(space: Space, features: SpaceFeatures): number {
    // Mock trending calculation - in production would use real analytics
    const engagementScore = Math.min(features.engagement.postsPerWeek / 50, 1.0);
    const growthScore = Math.min(features.engagement.memberRetention, 1.0);
    
    return (engagementScore + growthScore) / 2;
  }

  private applyFreshmanBoost(space: Space, features: SpaceFeatures): number {
    // Boost popular, welcoming spaces for freshmen
    const freshmanRatio = features.demographics.yearDistribution["freshman"] || 0;
    const sizeBoost = features.size > 50 ? 0.1 : 0; // Larger spaces feel safer
    const retentionBoost = features.engagement.memberRetention > 0.8 ? 0.1 : 0;
    
    return freshmanRatio * 0.1 + sizeBoost + retentionBoost;
  }

  private applyColdStartBoost(score: number, space: Space, features: SpaceFeatures): number {
    // Boost high-quality, beginner-friendly spaces for new users
    const qualityBoost = features.engagement.memberRetention > 0.8 ? 0.2 : 0;
    const popularityBoost = features.size > 30 ? 0.1 : 0;
    
    return score + qualityBoost + popularityBoost;
  }

  private getFriendsInSpace(_spaceId: string): number {
    // Mock implementation - would query actual friendship data
    return Math.floor(Math.random() * 3); // 0-2 friends typically
  }

  private applyDiversityFilter(recommendations: RecommendationResult[], limit: number): RecommendationResult[] {
    const result: RecommendationResult[] = [];
    const categoryCount: Record<string, number> = {};
    
    for (const rec of recommendations) {
      if (result.length >= limit) break;
      
      const features = this.spaceFeatures.get(rec.spaceId);
      if (!features) continue;
      
      const category = features.category;
      const currentCount = categoryCount[category] || 0;
      
      // Limit to 3 spaces per category for diversity
      if (currentCount < 3) {
        result.push(rec);
        categoryCount[category] = currentCount + 1;
      }
    }
    
    // Fill remaining slots with highest scoring regardless of category
    const remaining = recommendations.filter(r => !result.includes(r));
    while (result.length < limit && remaining.length > 0) {
      result.push(remaining.shift()!);
    }
    
    return result;
  }
}

// React Hook for using the recommendation engine
export function useSpaceRecommendations(
  userProfile: UserProfile,
  spaces: Space[],
  spaceFeatures: SpaceFeatures[]
) {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const engine = new HIVERecommendationEngine(userProfile, spaceFeatures);
    const recs = engine.generateRecommendations(spaces, 20);
    setRecommendations(recs);
    setLoading(false);
  }, [userProfile, spaces, spaceFeatures]);

  return { recommendations, loading };
}

// Export types and engine for external use
export type { UserProfile, SpaceFeatures, RecommendationResult };
export { HIVERecommendationEngine };