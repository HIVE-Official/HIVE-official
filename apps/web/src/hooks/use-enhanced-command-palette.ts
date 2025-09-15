import { useState, useCallback } from 'react';
import { logger } from '@hive/core/utils/logger';

import { SearchableItem } from "@hive/ui";

interface SearchAPI {
  spaces: (_query: string) => Promise<SearchableItem[]>;
  tools: (_query: string) => Promise<SearchableItem[]>;
  people: (_query: string) => Promise<SearchableItem[]>;
  events: (_query: string) => Promise<SearchableItem[]>;
  posts: (_query: string) => Promise<SearchableItem[]>;
}

// Mock search functions - replace with actual API calls
const createMockSearchAPI = (): SearchAPI => ({
  spaces: async (_query: string): Promise<SearchableItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const mockSpaces = [
      {
        id: 'space-cs-majors',
        title: 'Computer Science Majors',
        description: 'Study groups, internship tips, and career advice',
        icon: '🖥️',
        category: 'spaces',
        type: 'space' as const,
        keywords: ['computer', 'science', 'programming', 'coding', 'tech'],
        action: () => window.location.href = '/spaces/cs-majors',
        metadata: { memberCount: 234, status: 'active' }
      },
      {
        id: 'space-study-groups',
        title: 'Study Groups',
        description: 'Find study partners for all subjects',
        icon: '📚',
        category: 'spaces',
        type: 'space' as const,
        keywords: ['study', 'groups', 'academic', 'learning'],
        action: () => window.location.href = '/spaces/study-groups',
        metadata: { memberCount: 156, status: 'active' }
      },
      {
        id: 'space-greek-life',
        title: 'Greek Life',
        description: 'Fraternities and sororities community',
        icon: '🏛️',
        category: 'spaces',
        type: 'space' as const,
        keywords: ['greek', 'fraternity', 'sorority', 'social'],
        action: () => window.location.href = '/spaces/greek-life',
        metadata: { memberCount: 89, status: 'active' }
      }
    ];

    return mockSpaces.filter(space =>
      space.title.toLowerCase().includes(_query.toLowerCase()) ||
      space.description.toLowerCase().includes(_query.toLowerCase()) ||
      space.keywords.some(keyword => keyword.includes(_query.toLowerCase()))
    );
  },

  tools: async (_query: string): Promise<SearchableItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const mockTools = [
      {
        id: 'tool-poll-maker',
        title: 'Poll Maker',
        description: 'Create interactive polls for spaces',
        icon: '📊',
        category: 'tools',
        type: 'tool' as const,
        keywords: ['poll', 'vote', 'survey', 'feedback'],
        action: () => window.location.href = '/tools/poll-maker',
        metadata: { rating: 4.8, creator: 'HIVE Team' }
      },
      {
        id: 'tool-study-timer',
        title: 'Study Timer',
        description: 'Pomodoro timer with focus tracking',
        icon: '⏰',
        category: 'tools',
        type: 'tool' as const,
        keywords: ['timer', 'pomodoro', 'focus', 'study', 'productivity'],
        action: () => window.location.href = '/tools/study-timer',
        metadata: { rating: 4.6, creator: 'Focus Labs' }
      },
      {
        id: 'tool-grade-calculator',
        title: 'Grade Calculator',
        description: 'Calculate GPA and track academic progress',
        icon: '🧮',
        category: 'tools',
        type: 'tool' as const,
        keywords: ['grade', 'gpa', 'calculator', 'academic'],
        action: () => window.location.href = '/tools/grade-calculator',
        metadata: { rating: 4.9, creator: 'Academic Tools' }
      }
    ];

    return mockTools.filter(tool =>
      tool.title.toLowerCase().includes(_query.toLowerCase()) ||
      tool.description.toLowerCase().includes(_query.toLowerCase()) ||
      tool.keywords.some(keyword => keyword.includes(_query.toLowerCase()))
    );
  },

  people: async (_query: string): Promise<SearchableItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockPeople = [
      {
        id: 'user-sarah-chen',
        title: 'Sarah Chen',
        description: 'Computer Science • Junior • Study Group Leader',
        icon: '👩‍💻',
        category: 'people',
        type: 'person' as const,
        keywords: ['sarah', 'chen', 'cs', 'computer', 'science'],
        action: () => window.location.href = '/profile/sarah-chen'
      },
      {
        id: 'user-alex-kim',
        title: 'Alex Kim',
        description: 'Engineering • Senior • Event Organizer',
        icon: '👨‍🔧',
        category: 'people',
        type: 'person' as const,
        keywords: ['alex', 'kim', 'engineering', 'events'],
        action: () => window.location.href = '/profile/alex-kim'
      },
      {
        id: 'user-jamie-rivera',
        title: 'Jamie Rivera',
        description: 'Business • Sophomore • Space Builder',
        icon: '👩‍💼',
        category: 'people',
        type: 'person' as const,
        keywords: ['jamie', 'rivera', 'business', 'builder'],
        action: () => window.location.href = '/profile/jamie-rivera'
      }
    ];

    return mockPeople.filter(person =>
      person.title.toLowerCase().includes(_query.toLowerCase()) ||
      person.description.toLowerCase().includes(_query.toLowerCase()) ||
      person.keywords.some(keyword => keyword.includes(_query.toLowerCase()))
    );
  },

  events: async (_query: string): Promise<SearchableItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const mockEvents = [
      {
        id: 'event-career-fair',
        title: 'Spring Career Fair',
        description: 'Connect with top employers and explore opportunities',
        icon: '💼',
        category: 'events',
        type: 'event' as const,
        keywords: ['career', 'fair', 'jobs', 'networking', 'employers'],
        action: () => window.location.href = '/events/career-fair-2024',
        metadata: { date: 'March 15, 2024' }
      },
      {
        id: 'event-hackathon',
        title: 'HIVE Hackathon',
        description: '48-hour coding competition with amazing prizes',
        icon: '💻',
        category: 'events',
        type: 'event' as const,
        keywords: ['hackathon', 'coding', 'programming', 'competition'],
        action: () => window.location.href = '/events/hive-hackathon',
        metadata: { date: 'April 20-22, 2024' }
      },
      {
        id: 'event-study-session',
        title: 'Group Study Session - Calculus',
        description: 'Prepare for midterm exam together',
        icon: '📐',
        category: 'events',
        type: 'event' as const,
        keywords: ['study', 'calculus', 'math', 'midterm'],
        action: () => window.location.href = '/events/calculus-study',
        metadata: { date: 'Tomorrow, 7 PM' }
      }
    ];

    return mockEvents.filter(event =>
      event.title.toLowerCase().includes(_query.toLowerCase()) ||
      event.description.toLowerCase().includes(_query.toLowerCase()) ||
      event.keywords.some(keyword => keyword.includes(_query.toLowerCase()))
    );
  },

  posts: async (_query: string): Promise<SearchableItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 180));
    
    const mockPosts = [
      {
        id: 'post-internship-tips',
        title: 'Top 10 Internship Application Tips',
        description: 'Sarah Chen shared her experience landing at Google',
        icon: '📝',
        category: 'posts',
        type: 'post' as const,
        keywords: ['internship', 'tips', 'application', 'career'],
        action: () => window.location.href = '/posts/internship-tips',
        metadata: { date: '2 hours ago' }
      },
      {
        id: 'post-study-spots',
        title: 'Best Study Spots on Campus',
        description: 'Community-curated list of quiet places to study',
        icon: '📍',
        category: 'posts',
        type: 'post' as const,
        keywords: ['study', 'spots', 'campus', 'quiet'],
        action: () => window.location.href = '/posts/study-spots',
        metadata: { date: '1 day ago' }
      },
      {
        id: 'post-tool-showcase',
        title: 'New Tool: Course Scheduler',
        description: 'Alex built an amazing tool for planning next semester',
        icon: '🛠️',
        category: 'posts',
        type: 'post' as const,
        keywords: ['tool', 'scheduler', 'course', 'planning'],
        action: () => window.location.href = '/posts/course-scheduler-tool',
        metadata: { date: '3 days ago' }
      }
    ];

    return mockPosts.filter(post =>
      post.title.toLowerCase().includes(_query.toLowerCase()) ||
      post.description.toLowerCase().includes(_query.toLowerCase()) ||
      post.keywords.some(keyword => keyword.includes(_query.toLowerCase()))
    );
  }
});

export function useEnhancedCommandPalette() {
  const [searchAPI] = useState(createMockSearchAPI());

  const handleSearch = useCallback(async (
    query: string, 
    category?: string
  ): Promise<SearchableItem[]> => {
    if (!query.trim()) return [];

    try {
      const results: SearchableItem[] = [];

      if (!category) {
        // Search all categories
        const [spaces, tools, people, events, posts] = await Promise.all([
          searchAPI.spaces(query),
          searchAPI.tools(query),
          searchAPI.people(query),
          searchAPI.events(query),
          searchAPI.posts(query)
        ]);
        
        results.push(...spaces, ...tools, ...people, ...events, ...posts);
      } else {
        // Search specific category
        switch (category) {
          case 'spaces':
            results.push(...await searchAPI.spaces(query));
            break;
          case 'tools':
            results.push(...await searchAPI.tools(query));
            break;
          case 'people':
            results.push(...await searchAPI.people(query));
            break;
          case 'events':
            results.push(...await searchAPI.events(query));
            break;
          case 'posts':
            results.push(...await searchAPI.posts(query));
            break;
        }
      }

      // Sort by relevance (exact title matches first, then description matches)
      return results.sort((a, b) => {
        const aExactTitle = a.title.toLowerCase() === query.toLowerCase();
        const bExactTitle = b.title.toLowerCase() === query.toLowerCase();
        if (aExactTitle && !bExactTitle) return -1;
        if (!aExactTitle && bExactTitle) return 1;
        
        const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase());
        const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase());
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        
        return 0;
      });
      
    } catch (error) {
      logger.error('Search error:', error);
      return [];
    }
  }, [searchAPI]);

  return {
    handleSearch
  };
}