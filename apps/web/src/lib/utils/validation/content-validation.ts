import type { Post  } from '@/types/core';

/**
 * Content validation system for tool-generated content enforcement
 * 
 * Strategy:
 * 1. Tool-generated content: Posts created through tool interactions
 * 2. Tool-enhanced content: User posts that reference or use tools
 * 3. Space events: Official space announcements and events
 * 4. RSS imports: Campus-wide events during early launch
 */

// Content types allowed in main feed
export type FeedContentType = 
  | 'tool_generated'    // Direct tool output
  | 'tool_enhanced'     // User post with tool references
  | 'space_event'       // Official space events
  | 'rss_import'        // Imported campus events
  | 'builder_announcement'; // Builder/admin announcements

// Content validation result
export interface ContentValidationResult {
  isValid: boolean;
  contentType: FeedContentType | null;
  reason?: string;
  confidence: number; // 0-100
  toolMetadata?: {
    toolId?: string;
    toolName?: string;
    interactionType?: string;
  };
}

/**
 * Validate if content should appear in the main campus feed
 */
export function validateFeedContent(post: Post): ContentValidationResult {
  // Check for direct tool-generated content
  if (post.type === 'toolshare') {
    return {
      isValid: true,
      contentType: 'tool_generated',
      confidence: 100,
      toolMetadata: {
        toolId: post.toolShareMetadata?.toolId,
        toolName: post.toolShareMetadata?.toolName,
        interactionType: post.toolShareMetadata?.shareType
      }
    };
  }

  // Check for space events (always allowed)
  if (post.type === 'event') {
    return {
      isValid: true,
      contentType: 'space_event',
      confidence: 100
    };
  }

  // Check for tool-enhanced content (mentions tools or has tool interactions)
  const toolEnhancedResult = validateToolEnhancedContent(post);
  if (toolEnhancedResult.isValid) {
    return toolEnhancedResult;
  }

  // Check for builder/admin announcements
  if (post.author?.role === 'builder' || post.author?.role === 'admin') {
    const announcementResult = validateBuilderAnnouncement(post);
    if (announcementResult.isValid) {
      return announcementResult;
    }
  }

  // Check for RSS imported content
  if (isRSSImportedContent(post)) {
    return {
      isValid: true,
      contentType: 'rss_import',
      confidence: 90
    };
  }

  // Default: not valid for main feed
  return {
    isValid: false,
    contentType: null,
    reason: 'Content does not meet tool-generated criteria',
    confidence: 0
  };
}

/**
 * Check if content is tool-enhanced (references tools or tool interactions)
 */
function validateToolEnhancedContent(post: Post): ContentValidationResult {
  let confidence = 0;
  const toolIndicators: string[] = [];

  // Check for tool mentions in content
  const toolKeywords = [
    'poll', 'timer', 'calculator', 'schedule', 'gpa', 'citation',
    'countdown', 'survey', 'form', 'tracker', 'builder', 'template'
  ];

  const contentLower = post.content.toLowerCase();
  const matchedKeywords = toolKeywords.filter(keyword => 
    contentLower.includes(keyword)
  );

  if (matchedKeywords.length > 0) {
    confidence += matchedKeywords.length * 15;
    toolIndicators.push(...matchedKeywords);
  }

  // Check for @mentions of tool-related handles
  if (post.richContent?.mentions) {
    const toolMentions = post.richContent.mentions.filter(mention =>
      mention.handle.includes('tool') || 
      mention.handle.includes('bot') ||
      mention.handle.includes('hive')
    );
    
    if (toolMentions.length > 0) {
      confidence += toolMentions.length * 20;
    }
  }

  // Check for poll data (indicates poll tool usage)
  if (post.type === 'poll' && post.pollMetadata) {
    confidence += 40;
    toolIndicators.push('poll_tool');
  }

  // Check for images that might be tool-generated
  if (post.type === 'image' && post.imageMetadata) {
    // Look for tool-generated image patterns
    const imageUrl = post.imageMetadata.url;
    if (imageUrl.includes('tool-generated') || 
        imageUrl.includes('chart') || 
        imageUrl.includes('graph')) {
      confidence += 30;
      toolIndicators.push('generated_visual');
    }
  }

  // Minimum confidence threshold for tool-enhanced content
  if (confidence >= 30) {
    return {
      isValid: true,
      contentType: 'tool_enhanced',
      confidence: Math.min(confidence, 100),
      toolMetadata: {
        interactionType: 'enhanced',
        toolName: toolIndicators.join(', ')
      }
    };
  }

  return {
    isValid: false,
    contentType: null,
    confidence
  };
}

/**
 * Validate builder/admin announcements
 */
function validateBuilderAnnouncement(post: Post): ContentValidationResult {
  const contentLower = post.content.toLowerCase();
  
  // Check for announcement keywords
  const announcementKeywords = [
    'announcement', 'update', 'reminder', 'important', 'notice',
    'new feature', 'tool', 'space update', 'community'
  ];

  const hasAnnouncementKeywords = announcementKeywords.some(keyword =>
    contentLower.includes(keyword)
  );

  // Check if post is pinned (indicates importance)
  const isPinned = post.isPinned;

  // Builder/admin posts that are announcements or pinned are allowed
  if (hasAnnouncementKeywords || isPinned) {
    return {
      isValid: true,
      contentType: 'builder_announcement',
      confidence: hasAnnouncementKeywords && isPinned ? 100 : 70,
      reason: isPinned ? 'Pinned by builder/admin' : 'Contains announcement keywords'
    };
  }

  return {
    isValid: false,
    contentType: null,
    confidence: 0
  };
}

/**
 * Check if content is RSS imported
 */
function isRSSImportedContent(post: Post): boolean {
  // Check for RSS metadata or import markers
  // This would be set during the RSS import process
  return (post as any)._source === 'rss_import' || 
         (post as any).importedFrom !== undefined;
}

/**
 * Filter posts for feed based on content validation
 */
export function filterValidFeedContent(posts: Post[]): Post[] {
  return posts.filter(post => {
    const validation = validateFeedContent(post);
    return validation.isValid;
  });
}

/**
 * Sort posts by tool-generated content priority
 */
export function sortByToolPriority(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const aValidation = validateFeedContent(a);
    const bValidation = validateFeedContent(b);

    // Priority order: tool_generated > tool_enhanced > space_event > builder_announcement > rss_import
    const priorityOrder: Record<FeedContentType, number> = {
      'tool_generated': 5,
      'tool_enhanced': 4,
      'space_event': 3,
      'builder_announcement': 2,
      'rss_import': 1
    };

    const aPriority = aValidation.contentType ? priorityOrder[aValidation.contentType] : 0;
    const bPriority = bValidation.contentType ? priorityOrder[bValidation.contentType] : 0;

    if (aPriority !== bPriority) {
      return bPriority - aPriority; // Higher priority first
    }

    // If same priority, sort by confidence
    return bValidation.confidence - aValidation.confidence;
  });
}

/**
 * Get content distribution statistics for analytics
 */
export function getContentDistribution(posts: Post[]): Record<FeedContentType | 'invalid', number> {
  const distribution: Record<FeedContentType | 'invalid', number> = {
    'tool_generated': 0,
    'tool_enhanced': 0,
    'space_event': 0,
    'builder_announcement': 0,
    'rss_import': 0,
    'invalid': 0
  };

  posts.forEach(post => {
    const validation = validateFeedContent(post);
    if (validation.isValid && validation.contentType) {
      distribution[validation.contentType]++;
    } else {
      distribution.invalid++;
    }
  });

  return distribution;
}

/**
 * Batch validate multiple posts efficiently
 */
export function batchValidateContent(posts: Post[]): Map<string, ContentValidationResult> {
  const results = new Map<string, ContentValidationResult>();
  
  posts.forEach(post => {
    results.set(post.id, validateFeedContent(post));
  });
  
  return results;
}

/**
 * Check if a post meets the 90% tool-generated content requirement
 */
export function meetsToolContentThreshold(posts: Post[], threshold = 0.9): boolean {
  const validPosts = posts.filter(post => validateFeedContent(post).isValid);
  const toolGeneratedPosts = validPosts.filter(post => {
    const validation = validateFeedContent(post);
    return validation.contentType === 'tool_generated' || 
           validation.contentType === 'tool_enhanced';
  });

  return validPosts.length > 0 && (toolGeneratedPosts.length / validPosts.length) >= threshold;
}