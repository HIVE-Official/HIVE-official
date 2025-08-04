/**
 * Avatar Generation Utilities for HIVE
 * Generates consistent, high-quality default avatars for users
 */

export interface AvatarOptions {
  seed?: string;
  size?: number;
  style?: 'avataaars' | 'identicon' | 'initials' | 'geometric';
  backgroundColor?: string;
}

/**
 * Generate a default avatar URL for a user
 */
export function generateDefaultAvatar(
  userId: string, 
  options: AvatarOptions = {}
): string {
  const {
    size = 150,
    style = 'avataaars',
    backgroundColor = 'var(--hive-brand-primary)'
  } = options;

  // Use userId as seed for consistent avatars
  const seed = options.seed || userId;
  
  switch (style) {
    case 'avataaars':
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&size=${size}&backgroundColor=${encodeURIComponent(backgroundColor)}`;
    
    case 'identicon':
      return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&size=${size}&backgroundColor=${encodeURIComponent(backgroundColor)}`;
    
    case 'geometric':
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&size=${size}&backgroundColor=${encodeURIComponent(backgroundColor)}`;
    
    case 'initials':
    default:
      // For initials, we'll use a simple service or generate locally
      return generateInitialsAvatar(seed, size, backgroundColor);
  }
}

/**
 * Generate avatar from user initials
 */
function generateInitialsAvatar(
  seed: string, 
  size: number, 
  backgroundColor: string
): string {
  // Extract initials from seed (could be name or userId)
  const initials = extractInitials(seed);
  
  // Generate a consistent color based on seed
  const colors = [
    '#F59E0B', // Amber
    '#EF4444', // Red  
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#8B5CF6', // Violet
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
  ];
  
  const colorIndex = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];
  
  // Return a data URL or use a service
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=${bgColor.slice(1)}&color=ffffff&bold=true&format=svg`;
}

/**
 * Extract initials from a string (name or ID)
 */
function extractInitials(input: string): string {
  if (!input) return 'HU'; // HIVE User default
  
  // If it looks like a name (contains spaces)
  if (input.includes(' ')) {
    return input
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
  
  // If it's a userId or single word, take first two characters
  return input.slice(0, 2).toUpperCase();
}

/**
 * Get a variety of default avatar options for user selection
 */
export function getDefaultAvatarOptions(userId: string): string[] {
  const baseOptions = [
    { style: 'avataaars' as const, seed: userId },
    { style: 'avataaars' as const, seed: `${userId}-alt1` },
    { style: 'avataaars' as const, seed: `${userId}-alt2` },
    { style: 'geometric' as const, seed: userId },
    { style: 'identicon' as const, seed: userId },
    { style: 'initials' as const, seed: userId },
  ];

  return baseOptions.map(options => generateDefaultAvatar(userId, options));
}

/**
 * Check if a URL is a user-uploaded image (vs generated avatar)
 */
export function isUserUploadedImage(imageUrl: string): boolean {
  if (!imageUrl) return false;
  
  // Firebase Storage URLs
  if (imageUrl.includes('firebasestorage.googleapis.com')) return true;
  
  // Other upload services could be added here
  return false;
}

/**
 * Get fallback avatar if image fails to load
 */
export function getFallbackAvatar(userId: string, userName?: string): string {
  const seed = userName || userId;
  return generateDefaultAvatar(userId, { 
    style: 'initials', 
    seed 
  });
}