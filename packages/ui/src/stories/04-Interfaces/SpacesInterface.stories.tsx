import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { cn } from '../../../lib/utils';

const meta = {
  title: 'Interfaces/Spaces Interface',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Spaces Interface

Spaces are pre-mapped containers for campus communities - waiting to be activated by students who care enough to run them.

## Philosophy
- **Preview Mode**: Spaces start dormant, showing what they could become
- **Activation Requests**: Students can request to lead spaces
- **Community Building**: Tools and surfaces for genuine campus connection
- **Organic Growth**: Spaces evolve based on student needs and energy

## Space Types
- **Academic**: Majors, classes, study groups
- **Residential**: Dorms, apartments, neighborhoods
- **Organizations**: Clubs, societies, teams
- **Interest-Based**: Hobbies, career paths, social groups

## Universal Surfaces
Every space has 6 surfaces: Pinned, Posts, Events, Tools, Chat, Members

## Campus Energy Adaptation
Spaces interface adapts to campus rhythms - recruitment energy, study focus, celebration moments.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Space Layout Component
const SpaceLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <div className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-display font-bold text-accent">HIVE</h1>
            <nav className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Profile</a>
              <a href="#" className="text-sm hover:text-accent transition-colors">Spaces</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Tools</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Feed</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="secondary" size="sm">Search</Button>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-foreground">SK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="max-w-6xl mx-auto px-4 py-8">
      {children}
    </div>
  </div>
);

// Space Card Component
const SpaceCard = ({
  space,
  isActive,
  onActivate,
  onJoin,
  onLeave: _onLeave,
}: {
  space: {
    id: string;
    icon: string;
    name: string;
    category: string;
    members: string;
    isActive: boolean;
    description: string;
  };
  isActive: boolean;
  onActivate?: () => void;
  onJoin?: () => void;
  onLeave?: () => void;
}) => (
  <div className={cn(
    "bg-surface border border-border rounded-lg p-6 transition-all duration-base hover:border-accent/50",
    isActive && "border-accent/50 bg-surface/50"
  )}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">{space.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold">{space.name}</h3>
          <p className="text-sm text-muted-foreground">{space.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{space.members} members</p>
        <p className="text-xs text-muted-foreground">
          {space.isActive ? 'Active' : 'Waiting for leader'}
        </p>
      </div>
    </div>
    
    <p className="text-sm text-muted-foreground mb-4">{space.description}</p>
    
    {/* Space Preview */}
    <div className="mb-4">
      <h4 className="text-sm font-medium mb-2">What's inside:</h4>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-background rounded text-center">
          <div className="text-lg mb-1">📌</div>
          <span>Pinned</span>
        </div>
        <div className="p-2 bg-background rounded text-center">
          <div className="text-lg mb-1">📝</div>
          <span>Posts</span>
        </div>
        <div className="p-2 bg-background rounded text-center">
          <div className="text-lg mb-1">📅</div>
          <span>Events</span>
        </div>
        <div className="p-2 bg-background rounded text-center">
          <div className="text-lg mb-1">🛠️</div>
          <span>Tools</span>
        </div>
        <div className="p-2 bg-background rounded text-center">
          <div className="text-lg mb-1">💬</div>
          <span>Chat</span>
        </div>
        <div className="p-2 bg-background rounded text-center">
          <div className="text-lg mb-1">👥</div>
          <span>Members</span>
        </div>
      </div>
    </div>
    
    {/* Actions */}
    <div className="flex space-x-2">
      {space.isActive ? (
        <>
          <Button className="flex-1" onClick={onJoin}>
            Join Space
          </Button>
          <Button variant="secondary" className="flex-1">
            Preview
          </Button>
        </>
      ) : (
        <>
          <Button className="flex-1" onClick={onActivate}>
            Request to Lead
          </Button>
          <Button variant="secondary" className="flex-1">
            Join Waitlist
          </Button>
        </>
      )}
    </div>
  </div>
);

// Space Surface Component
const SpaceSurface = ({
  surface,
  isActive,
  onClick,
}: {
  surface: {
    id: string;
    icon: string;
    name: string;
    description: string;
    count: string;
    type: string;
  };
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full p-4 rounded-lg border transition-all text-left",
      isActive ? "border-accent bg-surface" : "border-border hover:border-accent/50"
    )}
  >
    <div className="flex items-center space-x-3">
      <div className="text-2xl">{surface.icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{surface.name}</h3>
        <p className="text-sm text-muted-foreground">{surface.description}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{surface.count}</p>
        <p className="text-xs text-muted-foreground">{surface.type}</p>
      </div>
    </div>
  </button>
);

// Mock Data
const mockSpaces = [
  {
    id: 1,
    name: "CS Majors",
    category: "Academic",
    icon: "💻",
    members: 247,
    isActive: true,
    description: "Connect with fellow Computer Science students, share resources, and build together."
  },
  {
    id: 2,
    name: "Ellicott Complex",
    category: "Residential",
    icon: "🏠",
    members: 89,
    isActive: false,
    description: "Ellicott Complex residents - events, study groups, and community building."
  },
  {
    id: 3,
    name: "Hack Club",
    category: "Organization",
    icon: "⚡",
    members: 156,
    isActive: true,
    description: "Student hackers building projects and learning together."
  },
  {
    id: 4,
    name: "Class of 2025",
    category: "Academic",
    icon: "🎓",
    members: 1247,
    isActive: false,
    description: "Graduating class community for networking and shared experiences."
  },
];

const mockSurfaces = [
  {
    id: 'pinned',
    name: 'Pinned',
    icon: '📌',
    description: 'Important announcements and resources',
    count: 3,
    type: 'posts'
  },
  {
    id: 'posts',
    name: 'Posts',
    icon: '📝',
    description: 'Community discussions and sharing',
    count: 42,
    type: 'posts'
  },
  {
    id: 'events',
    name: 'Events',
    icon: '📅',
    description: 'Upcoming community events',
    count: 8,
    type: 'events'
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: '🛠️',
    description: 'Shared tools and resources',
    count: 12,
    type: 'tools'
  },
  {
    id: 'chat',
    name: 'Chat',
    icon: '💬',
    description: 'Real-time community chat',
    count: 'Live',
    type: 'messages'
  },
  {
    id: 'members',
    name: 'Members',
    icon: '👥',
    description: 'Community member directory',
    count: 247,
    type: 'members'
  },
];

export const SpacesDirectory: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    const categories = [
      { id: 'all', name: 'All Spaces', count: mockSpaces.length },
      { id: 'academic', name: 'Academic', count: mockSpaces.filter(s => s.category === 'Academic').length },
      { id: 'residential', name: 'Residential', count: mockSpaces.filter(s => s.category === 'Residential').length },
      { id: 'organizations', name: 'Organizations', count: mockSpaces.filter(s => s.category === 'Organization').length },
    ];
    
    return (
      <SpaceLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold">Spaces</h2>
                <p className="text-muted-foreground">Where campus communities come to life</p>
              </div>
              <Button className="font-semibold">
                Request New Space
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative max-w-md">
              <Input
                type="text"
                placeholder="Search spaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                🔍
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-all whitespace-nowrap",
                  selectedCategory === category.id
                    ? "border-accent bg-surface"
                    : "border-border hover:border-accent/50"
                )}
              >
                <span className="font-medium">{category.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">({category.count})</span>
              </button>
            ))}
          </div>
          
          {/* Spaces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockSpaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                isActive={space.isActive}
                onActivate={() => console.log(`Activate ${space.name}`)}
                onJoin={() => console.log(`Join ${space.name}`)}
              />
            ))}
          </div>
        </div>
      </SpaceLayout>
    );
  },
};

export const ActiveSpaceView: Story = {
  render: () => {
    const [activeSurface, setActiveSurface] = useState('pinned');
    
    const space = mockSpaces[0]; // CS Majors
    
    return (
      <SpaceLayout>
        <div className="space-y-6">
          {/* Space Header */}
          <div className="bg-surface rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">{space.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">{space.name}</h2>
                  <p className="text-muted-foreground">{space.category} • {space.members} members</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="secondary" size="sm">Share</Button>
                <Button variant="secondary" size="sm">Settings</Button>
                <Button size="sm">Joined ✓</Button>
              </div>
            </div>
            
            <p className="mt-4 text-muted-foreground">{space.description}</p>
          </div>
          
          {/* Space Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {mockSurfaces.map((surface) => (
              <SpaceSurface
                key={surface.id}
                surface={surface}
                isActive={activeSurface === surface.id}
                onClick={() => setActiveSurface(surface.id)}
              />
            ))}
          </div>
          
          {/* Surface Content */}
          <div className="bg-surface rounded-lg p-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">
                  {mockSurfaces.find(s => s.id === activeSurface)?.icon}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {mockSurfaces.find(s => s.id === activeSurface)?.name}
                </h3>
                <p className="text-muted-foreground">
                  {mockSurfaces.find(s => s.id === activeSurface)?.description}
                </p>
              </div>
            </div>
            
            {/* Sample Content */}
            <div className="mt-8 space-y-4">
              {activeSurface === 'pinned' && (
                <div className="space-y-3">
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">📌</span>
                      </div>
                      <div>
                        <h4 className="font-medium">CS 250 Study Group</h4>
                        <p className="text-sm text-muted-foreground">Mondays 7pm, NSC 220</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">📌</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Internship Resources</h4>
                        <p className="text-sm text-muted-foreground">Resume templates, interview prep</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSurface === 'tools' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg text-center">
                    <div className="text-2xl mb-2">📚</div>
                    <h4 className="font-medium">Study Buddy</h4>
                    <p className="text-sm text-muted-foreground">Match with study partners</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg text-center">
                    <div className="text-2xl mb-2">🔗</div>
                    <h4 className="font-medium">Resource Hub</h4>
                    <p className="text-sm text-muted-foreground">Shared class materials</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SpaceLayout>
    );
  },
};

export const SpaceActivationFlow: Story = {
  render: () => {
    const [activationStep, setActivationStep] = useState(1);
    
    const space = mockSpaces[1]; // Ellicott Complex (inactive)
    
    return (
      <SpaceLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress */}
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`activation-step-${i}`}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-base",
                    i < activationStep ? "bg-accent" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="bg-surface rounded-lg p-8">
            {activationStep === 1 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl">{space.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">Activate {space.name}</h2>
                  <p className="text-muted-foreground">
                    This space is waiting for a student leader to bring it to life
                  </p>
                </div>
                
                <div className="bg-background p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold">What you'll do as a leader:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <span className="text-accent">•</span>
                      <span>Set up the space with relevant tools and resources</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-accent">•</span>
                      <span>Welcome new members and foster community</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-accent">•</span>
                      <span>Organize events and facilitate discussions</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-accent">•</span>
                      <span>Help students connect and collaborate</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full font-semibold"
                  onClick={() => setActivationStep(2)}
                >
                  I'm Ready to Lead
                </Button>
              </div>
            )}
            
            {activationStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-display font-bold">Tell us about your vision</h2>
                  <p className="text-muted-foreground">
                    How do you want to shape this community?
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What's your vision for {space.name}?
                    </label>
                    <textarea
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      rows={4}
                      placeholder="Describe how you want to bring this community together..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What tools or resources will you create?
                    </label>
                    <textarea
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      rows={3}
                      placeholder="Event planning, study groups, resource sharing..."
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setActivationStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 font-semibold"
                    onClick={() => setActivationStep(3)}
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            )}
            
            {activationStep === 3 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-hive-space-join">
                  <span className="text-3xl">🎉</span>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">Request Submitted!</h2>
                  <p className="text-muted-foreground">
                    We'll review your application and get back to you soon
                  </p>
                </div>
                
                <div className="bg-background p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold">What happens next:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <span className="text-accent">1.</span>
                      <span>Your application is reviewed by the HIVE team</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-accent">2.</span>
                      <span>You'll get an email within 24 hours</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-accent">3.</span>
                      <span>If approved, you can start building your community</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full font-semibold">
                  Return to Spaces
                </Button>
              </div>
            )}
          </div>
        </div>
      </SpaceLayout>
    );
  },
};

export const CampusEnergySpaces: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Spaces</h2>
        <p className="text-muted-foreground">
          How spaces interface adapts to different campus energy states.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* High Energy */}
        <div className="space-y-4">
          <h3 className="font-semibold">High Energy Period</h3>
          <div className="bg-surface p-6 rounded-lg border-2 border-accent/50">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center animate-hive-gold-pulse">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h4 className="font-bold">Hack Club</h4>
                  <p className="text-sm font-medium">156 members • Super active</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1 font-bold animate-hive-gold-glow">
                  Join Now!
                </Button>
                <Button variant="secondary" className="flex-1 font-medium">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Focus Period */}
        <div className="space-y-4">
          <h3 className="font-semibold">Focus Period</h3>
          <div className="bg-surface p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl opacity-75">📚</span>
                </div>
                <div>
                  <h4 className="font-normal">Study Groups</h4>
                  <p className="text-sm text-muted-foreground">89 members • Quiet focus</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1 font-normal">
                  Join Quietly
                </Button>
                <Button variant="secondary" className="flex-1 font-normal">
                  Browse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};