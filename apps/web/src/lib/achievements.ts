/**
 * Achievement System for HIVE Profile
 * Tracks and unlocks user achievements based on activity
 */

import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { logger } from '@/lib/logger';

import { db } from './firebase/firebase';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon name
  category: 'social' | 'academic' | 'community' | 'content' | 'special';
  points: number;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

// Achievement definitions
export const ACHIEVEMENTS: Record<string, Omit<Achievement, 'unlockedAt'>> = {
  // Social Achievements
  first_connection: {
    id: 'first_connection',
    name: 'First Connection',
    description: 'Made your first connection on HIVE',
    icon: '🤝',
    category: 'social',
    points: 10,
    rarity: 'common'
  },
  social_butterfly: {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Connected with 25 people',
    icon: '🦋',
    category: 'social',
    points: 50,
    rarity: 'uncommon'
  },
  super_connector: {
    id: 'super_connector',
    name: 'Super Connector',
    description: 'Connected with 100 people',
    icon: '🌟',
    category: 'social',
    points: 100,
    rarity: 'rare'
  },
  
  // Academic Achievements
  study_group_creator: {
    id: 'study_group_creator',
    name: 'Study Group Creator',
    description: 'Created your first study group',
    icon: '📚',
    category: 'academic',
    points: 20,
    rarity: 'common'
  },
  knowledge_sharer: {
    id: 'knowledge_sharer',
    name: 'Knowledge Sharer',
    description: 'Shared 10 study resources',
    icon: '🎓',
    category: 'academic',
    points: 40,
    rarity: 'uncommon'
  },
  academic_mentor: {
    id: 'academic_mentor',
    name: 'Academic Mentor',
    description: 'Helped 50 students with their studies',
    icon: '👨‍🏫',
    category: 'academic',
    points: 100,
    rarity: 'rare'
  },
  
  // Community Achievements
  space_explorer: {
    id: 'space_explorer',
    name: 'Space Explorer',
    description: 'Joined 5 different spaces',
    icon: '🚀',
    category: 'community',
    points: 15,
    rarity: 'common'
  },
  community_builder: {
    id: 'community_builder',
    name: 'Community Builder',
    description: 'Created a space with 50+ members',
    icon: '🏗️',
    category: 'community',
    points: 75,
    rarity: 'rare'
  },
  event_organizer: {
    id: 'event_organizer',
    name: 'Event Organizer',
    description: 'Organized 10 successful events',
    icon: '🎉',
    category: 'community',
    points: 60,
    rarity: 'uncommon'
  },
  
  // Content Achievements
  first_post: {
    id: 'first_post',
    name: 'First Post',
    description: 'Created your first post',
    icon: '✍️',
    category: 'content',
    points: 5,
    rarity: 'common'
  },
  viral_post: {
    id: 'viral_post',
    name: 'Viral Post',
    description: 'Post received 100+ likes',
    icon: '🔥',
    category: 'content',
    points: 50,
    rarity: 'uncommon'
  },
  tool_creator: {
    id: 'tool_creator',
    name: 'Tool Creator',
    description: 'Created your first HiveLab tool',
    icon: '🛠️',
    category: 'content',
    points: 30,
    rarity: 'uncommon'
  },
  
  // Special Achievements
  early_adopter: {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'Joined HIVE in the first month',
    icon: '🌅',
    category: 'special',
    points: 100,
    rarity: 'epic'
  },
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Active after midnight for 7 days straight',
    icon: '🦉',
    category: 'special',
    points: 25,
    rarity: 'uncommon'
  },
  perfect_profile: {
    id: 'perfect_profile',
    name: 'Perfect Profile',
    description: '100% profile completion',
    icon: '💯',
    category: 'special',
    points: 30,
    rarity: 'uncommon'
  },
  ghost_mode_master: {
    id: 'ghost_mode_master',
    name: 'Ghost Mode Master',
    description: 'Used ghost mode for 30 days',
    icon: '👻',
    category: 'special',
    points: 40,
    rarity: 'rare'
  },
  consistency_king: {
    id: 'consistency_king',
    name: 'Consistency King',
    description: 'Active for 30 days in a row',
    icon: '👑',
    category: 'special',
    points: 80,
    rarity: 'rare'
  },
  campus_legend: {
    id: 'campus_legend',
    name: 'Campus Legend',
    description: 'Unlocked all achievements',
    icon: '🏆',
    category: 'special',
    points: 500,
    rarity: 'legendary'
  }
};

/**
 * Check and unlock achievements based on user stats
 */
export async function checkAchievements(
  userId: string,
  stats: {
    connections?: number;
    posts?: number;
    spacesJoined?: number;
    eventsOrganized?: number;
    toolsCreated?: number;
    studyResourcesShared?: number;
    profileCompleteness?: number;
    consecutiveDays?: number;
    joinedDate?: Date;
  }
): Promise<string[]> {
  const newAchievements: string[] = [];
  
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) return [];
    
    const userData = userDoc.data();
    const unlockedAchievements = userData.achievements || [];
    
    // Check Social Achievements
    if (stats.connections) {
      if (stats.connections >= 1 && !unlockedAchievements.includes('first_connection')) {
        newAchievements.push('first_connection');
      }
      if (stats.connections >= 25 && !unlockedAchievements.includes('social_butterfly')) {
        newAchievements.push('social_butterfly');
      }
      if (stats.connections >= 100 && !unlockedAchievements.includes('super_connector')) {
        newAchievements.push('super_connector');
      }
    }
    
    // Check Content Achievements
    if (stats.posts) {
      if (stats.posts >= 1 && !unlockedAchievements.includes('first_post')) {
        newAchievements.push('first_post');
      }
    }
    
    // Check Community Achievements
    if (stats.spacesJoined) {
      if (stats.spacesJoined >= 5 && !unlockedAchievements.includes('space_explorer')) {
        newAchievements.push('space_explorer');
      }
    }
    
    if (stats.eventsOrganized) {
      if (stats.eventsOrganized >= 10 && !unlockedAchievements.includes('event_organizer')) {
        newAchievements.push('event_organizer');
      }
    }
    
    // Check Academic Achievements
    if (stats.studyResourcesShared) {
      if (stats.studyResourcesShared >= 10 && !unlockedAchievements.includes('knowledge_sharer')) {
        newAchievements.push('knowledge_sharer');
      }
    }
    
    if (stats.toolsCreated) {
      if (stats.toolsCreated >= 1 && !unlockedAchievements.includes('tool_creator')) {
        newAchievements.push('tool_creator');
      }
    }
    
    // Check Special Achievements
    if (stats.profileCompleteness === 100 && !unlockedAchievements.includes('perfect_profile')) {
      newAchievements.push('perfect_profile');
    }
    
    if (stats.consecutiveDays) {
      if (stats.consecutiveDays >= 30 && !unlockedAchievements.includes('consistency_king')) {
        newAchievements.push('consistency_king');
      }
    }
    
    // Check early adopter (within first month of September 2024)
    if (stats.joinedDate) {
      const launchDate = new Date('2024-09-01');
      const oneMonthLater = new Date('2024-10-01');
      if (stats.joinedDate >= launchDate && stats.joinedDate < oneMonthLater && 
          !unlockedAchievements.includes('early_adopter')) {
        newAchievements.push('early_adopter');
      }
    }
    
    // Update user's achievements if there are new ones
    if (newAchievements.length > 0) {
      const allAchievements = [...unlockedAchievements, ...newAchievements];
      
      // Check for campus legend (all achievements)
      if (allAchievements.length >= Object.keys(ACHIEVEMENTS).length - 1 && 
          !allAchievements.includes('campus_legend')) {
        newAchievements.push('campus_legend');
        allAchievements.push('campus_legend');
      }
      
      // Update Firebase
      await updateDoc(userRef, {
        achievements: allAchievements,
        achievementPoints: calculateTotalPoints(allAchievements),
        lastAchievementUnlock: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Create achievement notifications
      for (const achievementId of newAchievements) {
        const achievement = ACHIEVEMENTS[achievementId];
        if (achievement) {
          await createAchievementNotification(userId, achievement);
        }
      }
    }
    
    return newAchievements;
  } catch (error) {
    logger.error('Error checking achievements:', { error: String(error) });
    return [];
  }
}

/**
 * Get user's achievements with full details
 */
export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) return [];
    
    const userData = userDoc.data();
    const unlockedIds = userData.achievements || [];
    
    // Map unlocked achievements with their details
    const achievements: Achievement[] = Object.values(ACHIEVEMENTS).map(achievement => {
      const isUnlocked = unlockedIds.includes(achievement.id);
      return {
        ...achievement,
        unlockedAt: isUnlocked ? userData[`achievement_${achievement.id}_date`] : undefined
      };
    });
    
    // Sort by unlocked status and rarity
    achievements.sort((a, b) => {
      if (a.unlockedAt && !b.unlockedAt) return -1;
      if (!a.unlockedAt && b.unlockedAt) return 1;
      
      const rarityOrder = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    });
    
    return achievements;
  } catch (error) {
    logger.error('Error fetching user achievements:', { error: String(error) });
    return [];
  }
}

/**
 * Calculate total achievement points
 */
function calculateTotalPoints(achievementIds: string[]): number {
  return achievementIds.reduce((total, id) => {
    const achievement = ACHIEVEMENTS[id];
    return total + (achievement?.points || 0);
  }, 0);
}

/**
 * Create achievement notification
 */
async function createAchievementNotification(
  userId: string,
  achievement: Omit<Achievement, 'unlockedAt'>
): Promise<void> {
  try {
    const { doc: docRef, collection, addDoc } = await import('firebase/firestore');
    await addDoc(collection(db, 'notifications'), {
      userId,
      type: 'achievement_unlocked',
      title: 'Achievement Unlocked!',
      body: `You've earned "${achievement.name}" - ${achievement.description}`,
      data: {
        achievementId: achievement.id,
        icon: achievement.icon,
        points: achievement.points,
        rarity: achievement.rarity
      },
      read: false,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    logger.error('Error creating achievement notification:', { error: String(error) });
  }
}

/**
 * Get achievement progress for a specific achievement
 */
export function getAchievementProgress(
  achievementId: string,
  currentValue: number
): { progress: number; maxProgress: number; percentage: number } {
  const thresholds: Record<string, number> = {
    first_connection: 1,
    social_butterfly: 25,
    super_connector: 100,
    first_post: 1,
    space_explorer: 5,
    event_organizer: 10,
    knowledge_sharer: 10,
    tool_creator: 1,
    consistency_king: 30
  };
  
  const maxProgress = thresholds[achievementId] || 1;
  const progress = Math.min(currentValue, maxProgress);
  const percentage = Math.round((progress / maxProgress) * 100);
  
  return { progress, maxProgress, percentage };
}