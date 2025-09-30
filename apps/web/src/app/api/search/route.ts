import { NextRequest, NextResponse } from 'next/server';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'space' | 'tool' | 'person' | 'event' | 'post' | 'navigation';
  category: string;
  url: string;
  metadata?: Record<string, any>;
  relevanceScore: number;
}

// Mock data for comprehensive search
const MOCK_SEARCH_DATA = {
  spaces: [
    {
      id: 'space-cs-majors',
      title: 'Computer Science Majors',
      description: 'Study groups, internship tips, and career advice',
      type: 'space' as const,
      category: 'spaces',
      url: '/spaces/cs-majors',
      metadata: { memberCount: 234, status: 'active', tags: ['computer', 'science', 'tech'] },
      keywords: ['computer', 'science', 'programming', 'coding', 'tech', 'cs', 'software']
    },
    {
      id: 'space-study-groups',
      title: 'Study Groups',
      description: 'Find study partners for all subjects',
      type: 'space' as const,
      category: 'spaces',
      url: '/spaces/study-groups',
      metadata: { memberCount: 156, status: 'active', tags: ['study', 'academic'] },
      keywords: ['study', 'groups', 'academic', 'learning', 'homework']
    },
    {
      id: 'space-greek-life',
      title: 'Greek Life',
      description: 'Fraternities and sororities community',
      type: 'space' as const,
      category: 'spaces',
      url: '/spaces/greek-life',
      metadata: { memberCount: 89, status: 'active', tags: ['greek', 'social'] },
      keywords: ['greek', 'fraternity', 'sorority', 'social', 'brotherhood', 'sisterhood']
    },
    {
      id: 'space-engineering',
      title: 'Engineering Club',
      description: 'All engineering disciplines welcome',
      type: 'space' as const,
      category: 'spaces',
      url: '/spaces/engineering-club',
      metadata: { memberCount: 178, status: 'active', tags: ['engineering', 'stem'] },
      keywords: ['engineering', 'mechanical', 'electrical', 'civil', 'chemical', 'stem']
    }
  ],
  tools: [
    {
      id: 'tool-poll-maker',
      title: 'Poll Maker',
      description: 'Create interactive polls for spaces',
      type: 'tool' as const,
      category: 'tools',
      url: '/tools/poll-maker',
      metadata: { rating: 4.8, creator: 'HIVE Team', downloads: 1247 },
      keywords: ['poll', 'vote', 'survey', 'feedback', 'decision', 'voting']
    },
    {
      id: 'tool-study-timer',
      title: 'Study Timer',
      description: 'Pomodoro timer with focus tracking',
      type: 'tool' as const,
      category: 'tools',
      url: '/tools/study-timer',
      metadata: { rating: 4.6, creator: 'Focus Labs', downloads: 892 },
      keywords: ['timer', 'pomodoro', 'focus', 'study', 'productivity', 'break']
    },
    {
      id: 'tool-grade-calculator',
      title: 'Grade Calculator',
      description: 'Calculate GPA and track academic progress',
      type: 'tool' as const,
      category: 'tools',
      url: '/tools/grade-calculator',
      metadata: { rating: 4.9, creator: 'Academic Tools', downloads: 2156 },
      keywords: ['grade', 'gpa', 'calculator', 'academic', 'transcript', 'scores']
    },
    {
      id: 'tool-event-planner',
      title: 'Event Planner',
      description: 'Plan and manage campus events with RSVP',
      type: 'tool' as const,
      category: 'tools',
      url: '/tools/event-planner',
      metadata: { rating: 4.7, creator: 'Event Pro', downloads: 657 },
      keywords: ['event', 'planning', 'rsvp', 'calendar', 'schedule', 'organize']
    }
  ],
  people: [
    {
      id: 'user-sarah-chen',
      title: 'Sarah Chen',
      description: 'Computer Science • Junior • Study Group Leader',
      type: 'person' as const,
      category: 'people',
      url: '/profile/sarah-chen',
      metadata: { year: 'Junior', major: 'Computer Science', role: 'Study Group Leader' },
      keywords: ['sarah', 'chen', 'cs', 'computer', 'science', 'junior']
    },
    {
      id: 'user-alex-kim',
      title: 'Alex Kim',
      description: 'Engineering • Senior • Event Organizer',
      type: 'person' as const,
      category: 'people',
      url: '/profile/alex-kim',
      metadata: { year: 'Senior', major: 'Engineering', role: 'Event Organizer' },
      keywords: ['alex', 'kim', 'engineering', 'senior', 'events']
    },
    {
      id: 'user-jamie-rivera',
      title: 'Jamie Rivera',
      description: 'Business • Sophomore • Space Builder',
      type: 'person' as const,
      category: 'people',
      url: '/profile/jamie-rivera',
      metadata: { year: 'Sophomore', major: 'Business', role: 'Space Builder' },
      keywords: ['jamie', 'rivera', 'business', 'sophomore', 'builder']
    }
  ],
  events: [
    {
      id: 'event-career-fair',
      title: 'Spring Career Fair',
      description: 'Connect with top employers and explore opportunities',
      type: 'event' as const,
      category: 'events',
      url: '/events/career-fair-2024',
      metadata: { date: '2024-03-15', time: '10:00 AM', location: 'Student Center' },
      keywords: ['career', 'fair', 'jobs', 'networking', 'employers', 'internship']
    },
    {
      id: 'event-hackathon',
      title: 'HIVE Hackathon',
      description: '48-hour coding competition with amazing prizes',
      type: 'event' as const,
      category: 'events',
      url: '/events/hive-hackathon',
      metadata: { date: '2024-04-20', duration: '48 hours', prizes: '$5000' },
      keywords: ['hackathon', 'coding', 'programming', 'competition', 'tech']
    },
    {
      id: 'event-study-session',
      title: 'Group Study Session - Calculus',
      description: 'Prepare for midterm exam together',
      type: 'event' as const,
      category: 'events',
      url: '/events/calculus-study',
      metadata: { date: 'Tomorrow', time: '7:00 PM', subject: 'Calculus' },
      keywords: ['study', 'calculus', 'math', 'midterm', 'group', 'exam']
    }
  ],
  posts: [
    {
      id: 'post-internship-tips',
      title: 'Top 10 Internship Application Tips',
      description: 'Sarah Chen shared her experience landing at Google',
      type: 'post' as const,
      category: 'posts',
      url: '/posts/internship-tips',
      metadata: { author: 'Sarah Chen', likes: 45, comments: 12 },
      keywords: ['internship', 'tips', 'application', 'career', 'google', 'advice']
    },
    {
      id: 'post-study-spots',
      title: 'Best Study Spots on Campus',
      description: 'Community-curated list of quiet places to study',
      type: 'post' as const,
      category: 'posts',
      url: '/posts/study-spots',
      metadata: { author: 'Study Groups Space', likes: 78, comments: 23 },
      keywords: ['study', 'spots', 'campus', 'quiet', 'library', 'places']
    },
    {
      id: 'post-tool-showcase',
      title: 'New Tool: Course Scheduler',
      description: 'Alex built an amazing tool for planning next semester',
      type: 'post' as const,
      category: 'posts',
      url: '/posts/course-scheduler-tool',
      metadata: { author: 'Alex Kim', likes: 34, comments: 8 },
      keywords: ['tool', 'scheduler', 'course', 'planning', 'semester']
    }
  ]
};

function calculateRelevanceScore(
  item: any, 
  query: string, 
  category?: string
): number {
  let score = 0;
  const lowercaseQuery = query.toLowerCase();
  
  // Exact title match gets highest score
  if (item.title.toLowerCase() === lowercaseQuery) {
    score += 100;
  } else if (item.title.toLowerCase().includes(lowercaseQuery)) {
    score += 80;
  }
  
  // Description matches
  if (item.description?.toLowerCase().includes(lowercaseQuery)) {
    score += 60;
  }
  
  // Keyword matches
  const keywordMatches = item.keywords?.filter((keyword: string) => 
    keyword.toLowerCase().includes(lowercaseQuery)
  ).length || 0;
  score += keywordMatches * 20;
  
  // Category match bonus
  if (category && item.category === category) {
    score += 10;
  }
  
  // Metadata-based scoring
  if (item.metadata) {
    if (item.metadata.rating) {
      score += item.metadata.rating; // Higher rated items get slight boost
    }
    if (item.metadata.memberCount) {
      score += Math.min(item.metadata.memberCount / 100, 5); // Popular spaces get boost
    }
  }
  
  return score;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({
        results: [],
        totalCount: 0,
        query: '',
        category: category || null
      });
    }

    let allItems: any[] = [];

    // Collect items based on category filter
    if (!category || category === 'all') {
      allItems = [
        ...MOCK_SEARCH_DATA.spaces,
        ...MOCK_SEARCH_DATA.tools,
        ...MOCK_SEARCH_DATA.people,
        ...MOCK_SEARCH_DATA.events,
        ...MOCK_SEARCH_DATA.posts
      ];
    } else {
      switch (category) {
        case 'spaces':
          allItems = MOCK_SEARCH_DATA.spaces;
          break;
        case 'tools':
          allItems = MOCK_SEARCH_DATA.tools;
          break;
        case 'people':
          allItems = MOCK_SEARCH_DATA.people;
          break;
        case 'events':
          allItems = MOCK_SEARCH_DATA.events;
          break;
        case 'posts':
          allItems = MOCK_SEARCH_DATA.posts;
          break;
      }
    }

    // Filter and score results
    const results: SearchResult[] = allItems
      .map(item => ({
        ...item,
        relevanceScore: calculateRelevanceScore(item, query, category ?? undefined)
      }))
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(({ keywords, ...item }) => item); // Remove keywords from response

    return NextResponse.json({
      results,
      totalCount: results.length,
      query,
      category: category || null,
      suggestions: query.length > 2 ? [
        `${query} in spaces`,
        `${query} tools`,
        `${query} events`
      ] : []
    });

  } catch (error) {
    logger.error(
      `Search error at /api/search`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { error: 'Search failed', results: [], totalCount: 0 },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}