import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/button';
import { cn } from '../../../lib/utils';

const meta = {
  title: 'Interfaces/Feed & Rituals Interface',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Feed & Rituals Interface

The Feed is campus pulse - an intelligent activity stream that creates genuine engagement. Rituals are campus-wide moments that bring everyone together.

## Philosophy
- **Campus Pulse**: Only Tool-generated content, filtered by user's Spaces
- **FOMO Creation**: Participation stats that create genuine engagement
- **RSS-like Intelligence**: Algorithmic but transparent, student-controlled
- **Ritual Moments**: Weekly drops that unite the entire campus

## Feed Characteristics
- Shows only activities from Tools in your Spaces
- Filtered by relevance and campus energy
- Creates natural FOMO through participation visibility
- Promotes tool discovery and space joining

## Ritual System
- **Weekly Drops**: Campus-wide experiences every week
- **Participation Tracking**: Who's participating, creating genuine momentum
- **Community Building**: Shared experiences that transcend individual spaces
- **Celebration Focus**: Gold animations, achievement moments

## Campus Energy Adaptation
Feed intensity and ritual participation adapt to campus rhythms and student energy states.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Feed Layout Component
const FeedLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <div className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-display font-bold text-accent">HIVE</h1>
            <nav className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Profile</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Spaces</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Tools</a>
              <a href="#" className="text-sm hover:text-accent transition-colors">Feed</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="secondary" size="sm">Filter</Button>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-foreground">SK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="max-w-4xl mx-auto px-4 py-8">
      {children}
    </div>
  </div>
);

// Feed Item Component
const FeedItem = ({
  item,
  onParticipate,
  onViewTool,
}: {
  item: {
    id: string;
    icon: string;
    title: string;
    space: string;
    time: string;
    description: string;
    participants: string;
    views: string;
    trending?: boolean;
    participated?: boolean;
  };
  onParticipate?: () => void;
  onViewTool?: () => void;
}) => (
  <div className="bg-surface border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
        <span className="text-2xl">{item.icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="font-semibold">{item.title}</h3>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{item.space}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{item.time}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
        
        {/* Participation Stats */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{item.participants}</span>
            <span className="text-xs text-muted-foreground">participated</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{item.views}</span>
            <span className="text-xs text-muted-foreground">views</span>
          </div>
          {item.trending && (
            <div className="flex items-center space-x-1">
              <span className="text-xs">🔥</span>
              <span className="text-xs font-medium">Trending</span>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" onClick={onParticipate}>
            {item.participated ? 'Participated ✓' : 'Participate'}
          </Button>
          <Button variant="secondary" size="sm" onClick={onViewTool}>
            View Tool
          </Button>
          <Button variant="surface" size="sm">
            Share
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Ritual Card Component
const RitualCard = ({
  ritual,
  onParticipate,
  isParticipating,
}: {
  ritual: {
    id: string;
    icon: string;
    name: string;
    description: string;
    participants: string;
    completion: string;
    timeLeft: string;
    isActive: boolean;
    action: string;
    status: string;
    reward?: string;
  };
  onParticipate?: () => void;
  isParticipating?: boolean;
}) => (
  <div className={cn(
    "bg-surface border rounded-lg p-6 transition-all",
    ritual.isActive ? "border-accent/50 bg-accent/5" : "border-border"
  )}>
    <div className="text-center space-y-4">
      <div className={cn(
        "w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto",
        ritual.isActive && "animate-hive-gold-pulse"
      )}>
        <span className="text-4xl">{ritual.icon}</span>
      </div>
      
      <div>
        <h3 className="text-xl font-display font-bold">{ritual.name}</h3>
        <p className="text-sm text-muted-foreground">{ritual.description}</p>
      </div>
      
      {/* Participation Stats */}
      <div className="bg-background p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{ritual.participants}</div>
            <div className="text-xs text-muted-foreground">participated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{ritual.completion}%</div>
            <div className="text-xs text-muted-foreground">completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{ritual.timeLeft}</div>
            <div className="text-xs text-muted-foreground">time left</div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div>
        {ritual.isActive ? (
          <Button 
            className={cn(
              "w-full font-semibold",
              "bg-accent text-accent-foreground hover:bg-accent/90",
              "animate-hive-gold-glow"
            )}
            onClick={onParticipate}
            disabled={isParticipating}
          >
            {isParticipating ? '🕯️ Flame Lit!' : `🕯️ ${ritual.action}`}
          </Button>
        ) : (
          <Button variant="secondary" className="w-full" disabled>
            {ritual.status}
          </Button>
        )}
      </div>
      
      {/* Reward Preview */}
      {ritual.reward && (
        <div className="text-xs text-muted-foreground">
          Reward: {ritual.reward}
        </div>
      )}
    </div>
  </div>
);

// Mock Data
const mockFeedItems = [
  {
    id: 1,
    title: "Study Buddy Match Created",
    space: "CS Majors",
    icon: "📚",
    description: "Sarah and Mike were matched for Data Structures studying",
    participants: 23,
    views: 89,
    time: "2 hours ago",
    trending: true,
    participated: false,
  },
  {
    id: 2,
    title: "Room Availability Updated",
    space: "Ellicott Complex",
    icon: "🏠",
    description: "5 study rooms available in the lobby until 10pm",
    participants: 12,
    views: 34,
    time: "4 hours ago",
    trending: false,
    participated: true,
  },
  {
    id: 3,
    title: "Event Poll Results",
    space: "Hack Club",
    icon: "📊",
    description: "Pizza party won! Friday 6pm in Davis Hall",
    participants: 45,
    views: 156,
    time: "1 day ago",
    trending: false,
    participated: false,
  },
];

const mockRituals = [
  {
    id: 1,
    name: "First Light",
    description: "Light your flame to welcome new students",
    icon: "🕯️",
    action: "Light Your Flame",
    participants: 247,
    completion: 78,
    timeLeft: "2 days",
    isActive: true,
    reward: "Golden Flame badge",
  },
  {
    id: 2,
    name: "Torch Pass",
    description: "Share wisdom with younger students",
    icon: "🔥",
    action: "Pass the Torch",
    participants: 89,
    completion: 34,
    timeLeft: "5 days",
    isActive: false,
    status: "Starts Monday",
    reward: "Mentor badge",
  },
  {
    id: 3,
    name: "Space Hunt",
    description: "Discover and join 3 new campus spaces",
    icon: "🗺️",
    action: "Begin Hunt",
    participants: 156,
    completion: 62,
    timeLeft: "1 week",
    isActive: false,
    status: "Coming Soon",
    reward: "Explorer badge",
  },
];

export const CampusFeed: Story = {
  render: () => {
    const [filter, setFilter] = useState('all');
    
    const filters = [
      { id: 'all', name: 'All Activity' },
      { id: 'trending', name: 'Trending' },
      { id: 'spaces', name: 'My Spaces' },
      { id: 'tools', name: 'Tools' },
    ];
    
    return (
      <FeedLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold">Campus Feed</h2>
                <p className="text-muted-foreground">What's happening in your spaces</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-hive-gold-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {filters.map((filterItem) => (
                <button
                  key={filterItem.id}
                  onClick={() => setFilter(filterItem.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-all whitespace-nowrap",
                    filter === filterItem.id
                      ? "border-accent bg-surface"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  {filterItem.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Feed Items */}
          <div className="space-y-4">
            {mockFeedItems.map((item) => (
              <FeedItem
                key={item.id}
                item={item}
                onParticipate={() => console.log(`Participate in ${item.title}`)}
                onViewTool={() => console.log(`View tool for ${item.title}`)}
              />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center">
            <Button variant="secondary">Load More Activities</Button>
          </div>
        </div>
      </FeedLayout>
    );
  },
};

export const RitualCenter: Story = {
  render: () => {
    const [participatingRituals, setParticipatingRituals] = useState<number[]>([]);
    
    const handleParticipate = (ritualId: number) => {
      setParticipatingRituals(prev => [...prev, ritualId]);
    };
    
    return (
      <FeedLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-hive-gold-pulse">
              <span className="text-4xl">🕯️</span>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold">Campus Rituals</h2>
              <p className="text-muted-foreground">Weekly experiences that bring everyone together</p>
            </div>
          </div>
          
          {/* Active Ritual */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">This Week's Ritual</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-hive-gold-pulse"></div>
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
            
            <RitualCard
              ritual={mockRituals[0]}
              onParticipate={() => handleParticipate(mockRituals[0].id)}
              isParticipating={participatingRituals.includes(mockRituals[0].id)}
            />
          </div>
          
          {/* Upcoming Rituals */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Upcoming Rituals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRituals.slice(1).map((ritual) => (
                <RitualCard
                  key={ritual.id}
                  ritual={ritual}
                  onParticipate={() => handleParticipate(ritual.id)}
                  isParticipating={participatingRituals.includes(ritual.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Ritual History */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Past Rituals</h3>
            <div className="bg-surface rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Welcome Week</h4>
                    <p className="text-sm text-muted-foreground">
                      324 students participated • 89% completion
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Goal Setting</h4>
                    <p className="text-sm text-muted-foreground">
                      267 students participated • 76% completion
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">🤝</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Connection Quest</h4>
                    <p className="text-sm text-muted-foreground">
                      198 students participated • 82% completion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FeedLayout>
    );
  },
};

export const FeedRitualIntegration: Story = {
  render: () => {
    const [selectedView, setSelectedView] = useState('combined');
    
    const views = [
      { id: 'combined', name: 'Combined' },
      { id: 'feed', name: 'Feed Only' },
      { id: 'rituals', name: 'Rituals Only' },
    ];
    
    return (
      <FeedLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold">Campus Pulse</h2>
                <p className="text-muted-foreground">Live feed and ritual participation</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-hive-gold-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex space-x-2">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-all",
                    selectedView === view.id
                      ? "border-accent bg-surface"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  {view.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Combined View */}
          {selectedView === 'combined' && (
            <div className="space-y-6">
              {/* Current Ritual Highlight */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center animate-hive-gold-pulse">
                    <span className="text-2xl">🕯️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">First Light ritual is active!</h3>
                    <p className="text-sm text-muted-foreground">
                      247 students have participated • 2 days left
                    </p>
                  </div>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Participate
                  </Button>
                </div>
              </div>
              
              {/* Mixed Feed */}
              <div className="space-y-4">
                <FeedItem
                  item={mockFeedItems[0]}
                  onParticipate={() => console.log('Participate')}
                  onViewTool={() => console.log('View tool')}
                />
                
                {/* Ritual Activity */}
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🕯️</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">12 students just lit their flame</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        First Light ritual • Join them in welcoming new students
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          Light Your Flame
                        </Button>
                        <Button variant="secondary" size="sm">
                          View Ritual
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <FeedItem
                  item={mockFeedItems[1]}
                  onParticipate={() => console.log('Participate')}
                  onViewTool={() => console.log('View tool')}
                />
              </div>
            </div>
          )}
        </div>
      </FeedLayout>
    );
  },
};

export const CampusEnergyFeed: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Feed & Rituals</h2>
        <p className="text-muted-foreground">
          How the feed and rituals adapt to different campus energy states.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Energy */}
        <div className="space-y-4">
          <h3 className="font-semibold">High Energy Period</h3>
          <div className="bg-surface p-4 rounded-lg border-2 border-accent/50">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-hive-gold-pulse">
                  <span className="text-3xl">🔥</span>
                </div>
                <h4 className="font-bold">Campus is buzzing!</h4>
                <p className="text-sm font-medium">347 active now</p>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-accent/10 rounded">
                  <p className="text-sm font-bold">🎉 Welcome Week Ritual</p>
                  <p className="text-xs">89% participation</p>
                </div>
                <div className="p-3 bg-background rounded">
                  <p className="text-sm font-medium">🏃‍♂️ 23 students joined spaces</p>
                  <p className="text-xs">in the last hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Focus Period */}
        <div className="space-y-4">
          <h3 className="font-semibold">Focus Period</h3>
          <div className="bg-surface p-4 rounded-lg">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl opacity-75">📚</span>
                </div>
                <h4 className="font-normal">Quiet study time</h4>
                <p className="text-sm text-muted-foreground">89 studying</p>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-background rounded">
                  <p className="text-sm">📖 Study rooms updated</p>
                  <p className="text-xs text-muted-foreground">5 available</p>
                </div>
                <div className="p-3 bg-background rounded">
                  <p className="text-sm">🤝 Study buddy matched</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Celebration */}
        <div className="space-y-4">
          <h3 className="font-semibold">Celebration Period</h3>
          <div className="bg-surface p-4 rounded-lg">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-hive-ritual-burst">
                  <span className="text-3xl">🎊</span>
                </div>
                <h4 className="font-bold">Achievement unlocked!</h4>
                <p className="text-sm font-medium">Ritual completed</p>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-accent/20 rounded animate-hive-gold-glow">
                  <p className="text-sm font-bold">🏆 Goal Setting Complete</p>
                  <p className="text-xs">267 students participated</p>
                </div>
                <div className="p-3 bg-accent/10 rounded">
                  <p className="text-sm font-medium">✨ 45 new achievements</p>
                  <p className="text-xs">earned this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};