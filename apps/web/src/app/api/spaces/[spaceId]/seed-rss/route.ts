import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { sseRealtimeService } from '@/lib/sse-realtime-service';
import { requireSpaceMembership } from '@/lib/space-security';
import { HttpStatus } from '@/lib/api-response-types';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

/**
 * RSS Feed Seeding for Spaces
 * Seeds spaces with initial content from RSS feeds to avoid empty feeling
 */

interface RSSFeedItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  categories?: string[];
}

// Example RSS feeds by space category
const RSS_FEEDS = {
  'student_org': [
    'https://feeds.feedburner.com/TechCrunch',
    'https://www.reddit.com/r/compsci/.rss'
  ],
  'university_org': [
    'https://www.buffalo.edu/news.rss'
  ],
  'greek_life': [
    'https://www.buffalo.edu/studentlife.rss'
  ],
  'residential': [
    'https://www.buffalo.edu/campuslife.rss'
  ]
};

export const POST = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond
) => {
  const userId = getUserId(request);
  const { spaceId } = await params;

  try {
    const membership = await requireSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.error, code, { status: membership.status });
    }

    const spaceData = membership.space;
    const membershipRole = membership.membership.role as string | undefined;
    if (!['owner', 'admin', 'moderator', 'builder', 'leader'].includes(membershipRole || '')) {
      return respond.error("Only space leaders can seed RSS content", "FORBIDDEN", {
        status: HttpStatus.FORBIDDEN,
      });
    }

    // Get appropriate RSS feeds for space category
    const categoryFeeds = RSS_FEEDS[spaceData.type as keyof typeof RSS_FEEDS] || RSS_FEEDS['student_org'];

    let totalSeeded = 0;

    for (const feedUrl of categoryFeeds) {
      try {
        // Fetch RSS feed (simplified for demo)
        const feedItems = await fetchRSSFeed(feedUrl);

        // Seed recent items (last 5)
        const recentItems = feedItems.slice(0, 5);

        for (const item of recentItems) {
          const postData = {
            content: `📰 **${item.title}**\n\n${item.description}\n\n[Read more](${item.link})`,
            type: 'text',
            authorId: 'system',
            spaceId: spaceId,
            createdAt: new Date(item.pubDate),
            updatedAt: new Date(),
            lastActivity: new Date(item.pubDate),
            commentCount: 0,
            reactions: { heart: 0 },
            reactedUsers: { heart: [] },
            isPinned: false,
            isEdited: false,
            isDeleted: false,
            isRSSSeeded: true, // Mark as RSS content
            rssSource: feedUrl,
            campusId: CURRENT_CAMPUS_ID,
          };

          const postRef = await dbAdmin
            .collection('spaces')
            .doc(spaceId)
            .collection('posts')
            .add(postData);

          totalSeeded++;

          // Broadcast new post to space members via SSE
          try {
            await sseRealtimeService.sendMessage({
              type: 'chat',
              channel: `space:${spaceId}:posts`,
              senderId: 'system',
              content: {
                type: 'new_post',
                post: {
                  id: postRef.id,
                  ...postData,
                  author: {
                    id: 'system',
                    fullName: 'RSS Feed',
                    handle: 'rss-bot',
                    photoURL: null,
                  }
                },
                spaceId: spaceId
              },
              metadata: {
                timestamp: new Date().toISOString(),
                priority: 'low', // RSS content is lower priority
                requiresAck: false,
                retryCount: 0
              }
            });
          } catch (sseError) {
            logger.warn('Failed to broadcast RSS post via SSE', { sseError, postId: postRef.id });
          }
        }
      } catch (feedError) {
        logger.warn('Failed to process RSS feed', { feedUrl, error: feedError });
      }
    }

    // Update space metadata
    await dbAdmin.collection('spaces').doc(spaceId).update({
      lastRSSSeeded: new Date(),
      rssSeededCount: (spaceData.rssSeededCount || 0) + totalSeeded,
      updatedAt: new Date()
    });

    return respond.success({
      seededPosts: totalSeeded,
      feedsProcessed: categoryFeeds.length
    }, {
      message: `Successfully seeded ${totalSeeded} posts from RSS feeds`
    });

  } catch (error) {
    logger.error('Error seeding RSS content', { error: error instanceof Error ? error : new Error(String(error)), spaceId, userId });
    return respond.error("Failed to seed RSS content", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

/**
 * Simplified RSS feed fetcher
 * In production, would use a proper RSS parsing library
 */
async function fetchRSSFeed(feedUrl: string): Promise<RSSFeedItem[]> {
  // Mock RSS data for demo purposes
  // In production, would use a library like 'rss-parser' or similar

  const mockFeedItems: RSSFeedItem[] = [
    {
      title: "Welcome to the Space!",
      description: "This is sample content to get the conversation started. Share your thoughts and connect with fellow members.",
      link: "https://example.com/welcome",
      pubDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      categories: ["welcome", "community"]
    },
    {
      title: "Getting Started Guide",
      description: "New to this space? Here's everything you need to know to get the most out of your membership.",
      link: "https://example.com/guide",
      pubDate: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
      categories: ["guide", "tips"]
    },
    {
      title: "Community Guidelines",
      description: "Let's keep this space welcoming and productive for everyone. Here are our community standards.",
      link: "https://example.com/guidelines",
      pubDate: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      categories: ["guidelines", "community"]
    }
  ];

  // Add some randomization based on feed URL
  if (feedUrl.includes('techcrunch')) {
    mockFeedItems[0].title = "Latest Tech News Discussion";
    mockFeedItems[0].description = "What's everyone thinking about the latest developments in technology?";
  } else if (feedUrl.includes('buffalo.edu')) {
    mockFeedItems[0].title = "Campus Update";
    mockFeedItems[0].description = "Stay connected with what's happening around campus.";
  }

  return mockFeedItems;
}
