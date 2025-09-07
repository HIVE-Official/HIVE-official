import { NextRequest, NextResponse } from 'next/server';

// Mock data for testing the search UI
const MOCK_SPACES = [
  {
    id: 'ub-cs-club',
    name: 'UB Computer Science Club',
    description: 'Building the future of tech at UB, one line of code at a time',
    type: 'academic',
    memberCount: 342,
    isVerified: true,
    tags: ['technology', 'programming', 'hackathons']
  },
  {
    id: 'ub-dance-team',
    name: 'UB Dance Team',
    description: 'From hip hop to contemporary, we move as one',
    type: 'cultural',
    memberCount: 85,
    isVerified: true,
    tags: ['dance', 'performance', 'arts']
  },
  {
    id: 'pre-med-society',
    name: 'Pre-Med Society',
    description: 'Supporting future doctors through MCAT prep, volunteering, and mentorship',
    type: 'academic',
    memberCount: 428,
    isVerified: true,
    tags: ['medicine', 'healthcare', 'mcat']
  },
  {
    id: 'rocket-league-esports',
    name: 'Rocket League Esports',
    description: 'Competitive gaming at its finest - join our ranked team',
    type: 'recreational',
    memberCount: 156,
    isVerified: false,
    tags: ['gaming', 'esports', 'competition']
  },
  {
    id: 'ub-robotics',
    name: 'UB Robotics Club',
    description: 'Building autonomous systems and competing nationally',
    type: 'academic',
    memberCount: 67,
    isVerified: true,
    tags: ['robotics', 'engineering', 'AI']
  },
  {
    id: 'chess-club',
    name: 'Chess Club',
    description: 'Strategic minds unite - from beginners to grandmasters',
    type: 'recreational',
    memberCount: 93,
    isVerified: false,
    tags: ['chess', 'strategy', 'competition']
  },
  {
    id: 'ub-film-society',
    name: 'Film Society',
    description: 'Creating, watching, and discussing cinema',
    type: 'cultural',
    memberCount: 178,
    isVerified: true,
    tags: ['film', 'cinema', 'production']
  },
  {
    id: 'startup-incubator',
    name: 'Startup Incubator',
    description: 'Turn your ideas into reality with mentorship and resources',
    type: 'general',
    memberCount: 234,
    isVerified: true,
    tags: ['entrepreneurship', 'business', 'innovation']
  },
  {
    id: 'ub-volleyball-club',
    name: 'Volleyball Club',
    description: 'Bump, set, spike - competitive and recreational teams',
    type: 'recreational',
    memberCount: 112,
    isVerified: false,
    tags: ['sports', 'volleyball', 'fitness']
  },
  {
    id: 'music-production-collective',
    name: 'Music Production Collective',
    description: 'Beats, bars, and everything in between',
    type: 'cultural',
    memberCount: 89,
    isVerified: false,
    tags: ['music', 'production', 'recording']
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query = '', limit = 10 } = body;
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.length < 2) {
      return NextResponse.json({
        spaces: [],
        total: 0,
        hasMore: false
      });
    }
    
    // Filter spaces based on query
    const queryLower = query.toLowerCase();
    const filteredSpaces = MOCK_SPACES.filter(space => {
      return (
        space.name.toLowerCase().includes(queryLower) ||
        space.description.toLowerCase().includes(queryLower) ||
        space.tags.some(tag => tag.toLowerCase().includes(queryLower))
      );
    });
    
    // Sort by relevance (name match > description match > tag match)
    const sortedSpaces = filteredSpaces.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(queryLower) ? 100 : 0;
      const bNameMatch = b.name.toLowerCase().includes(queryLower) ? 100 : 0;
      
      const aDescMatch = a.description.toLowerCase().includes(queryLower) ? 50 : 0;
      const bDescMatch = b.description.toLowerCase().includes(queryLower) ? 50 : 0;
      
      const aScore = aNameMatch + aDescMatch + (a.isVerified ? 20 : 0) + (a.memberCount / 10);
      const bScore = bNameMatch + bDescMatch + (b.isVerified ? 20 : 0) + (b.memberCount / 10);
      
      return bScore - aScore;
    });
    
    // Apply limit
    const paginatedSpaces = sortedSpaces.slice(0, limit);
    
    return NextResponse.json({
      spaces: paginatedSpaces,
      total: sortedSpaces.length,
      hasMore: sortedSpaces.length > limit,
      query: {
        query,
        limit,
        executedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Mock search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}