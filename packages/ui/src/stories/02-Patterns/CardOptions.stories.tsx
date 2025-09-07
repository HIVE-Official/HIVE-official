import type { Meta, StoryObj } from '@storybook/react';
import { 
  MinimalCard,
  GlassCard, 
  CampusCard, 
  TechCard, 
  SocialCard 
} from '../../components/visual-improvements/card-options';
import { 
  Users, 
  Clock, 
  Star, 
  Heart, 
  MessageCircle, 
  Coffee, 
  Code, 
  Terminal,
  Zap,
  Calendar,
  BookOpen,
  MapPin,
  Activity,
  AlertCircle
} from 'lucide-react';

const meta = {
  component: React.Fragment,
  title: 'Visual Improvements/🃏 Card Options',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Card Design Options

Five distinct card styles for different contexts and content types. Each option creates different user experiences and brand expressions.

## When to Use Each Option:

### 📋 Minimal Cards
**Best for:** Core platform content, professional interfaces, clean layouts
**Personality:** Clean precision, functional clarity, timeless design

### 🌟 Glass Cards  
**Best for:** Premium features, hero content, modern interfaces
**Personality:** Premium elegance, depth and layering, sophisticated blur effects

### 🏫 Campus Cards
**Best for:** Student-facing content, campus tools, authentic experiences
**Personality:** Bulletin board vibes, authentic campus life, approachable design

### 💻 Tech Cards
**Best for:** Developer tools, system information, technical interfaces  
**Personality:** Command-line aesthetic, function-first, precise information

### 💬 Social Cards
**Best for:** Social features, conversations, community content
**Personality:** Friendly interactions, conversational design, connection-focused
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllCardOptions: Story = {
  render: () => (
    <div className="min-h-screen bg-black text-white p-8 space-y-16">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
          Card Design Options
        </h1>
        <p className="text-white/70 text-lg">
          Five distinct approaches for different content types and user experiences
        </p>
      </div>

      {/* MINIMAL CARDS */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">📋 Minimal Cards</h2>
          <p className="text-white/70 mb-6">Clean precision • Functional clarity • Timeless design</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MinimalCard variant="primary" padding="md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Study Session</h3>
                <p className="text-sm text-white/60">Algorithm Review</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              Join us for a deep dive into sorting algorithms and complexity analysis.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Users className="w-4 h-4" />
                <span>12 joined</span>
              </div>
              <button className="bg-accent text-black px-3 py-1 rounded text-sm">Join</button>
            </div>
          </MinimalCard>

          <MinimalCard variant="elevated" padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Campus Energy</h3>
              <div className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">High</div>
            </div>
            <div className="text-3xl font-bold text-accent mb-2">87%</div>
            <p className="text-white/60 text-sm mb-4">
              Peak activity in CS Building and Library
            </p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-accent h-2 rounded-full w-[87%]"></div>
            </div>
          </MinimalCard>

          <MinimalCard variant="feature" padding="md">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-accent" />
              <h3 className="text-lg font-semibold">Featured Space</h3>
            </div>
            <h4 className="font-semibold mb-2">CS Study Hub</h4>
            <p className="text-white/80 text-sm mb-4">
              Most active study space this week with 247 collaborative sessions.
            </p>
            <button className="bg-accent text-black px-3 py-1 rounded text-sm w-full flex items-center justify-center">
              <Zap className="w-4 h-4 mr-2" />
              Join the Energy
            </button>
          </MinimalCard>

          <MinimalCard variant="interactive" padding="md" className="cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Upcoming</span>
              </div>
              <span className="text-xs text-white/60">In 20 mins</span>
            </div>
            <h3 className="font-semibold mb-2">Coffee & Code</h3>
            <p className="text-white/80 text-sm">Casual coding session at the campus café</p>
          </MinimalCard>
        </div>
      </section>

      {/* GLASS CARDS */}
      <section className="space-y-6">
        <div className="border-l-4 border-white pl-6">
          <h2 className="text-2xl font-bold text-white mb-2">🌟 Glass Cards</h2>
          <p className="text-white/70 mb-6">Premium elegance • Depth and layering • Sophisticated blur effects</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard variant="primary" padding="md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center backdrop-blur-sm">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Study Group</h3>
                <p className="text-white/70">Premium experience</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">
              Exclusive study session with personalized mentoring and advanced resources.
            </p>
            <button className="bg-accent text-black px-4 py-2 rounded text-sm w-full">
              Join Premium Session
            </button>
          </GlassCard>

          <GlassCard variant="frosted" padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Campus Pulse</h3>
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Active Spaces</span>
                <span className="text-accent font-semibold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Students Online</span>
                <span className="text-accent font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Sessions Today</span>
                <span className="text-accent font-semibold">89</span>
              </div>
            </div>
            <button className="bg-white/10 text-white px-4 py-2 rounded text-sm w-full">
              View Real-time Data
            </button>
          </GlassCard>

          <GlassCard variant="iridescent" padding="md">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent/40 to-white/20 flex items-center justify-center">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Achievement Unlocked</h3>
                <p className="text-white/80 text-sm">
                  Study Streak Champion - 30 days of consistent learning!
                </p>
              </div>
              <button className="bg-accent text-black px-4 py-2 rounded text-sm flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Celebrate
              </button>
            </div>
          </GlassCard>

          <GlassCard variant="crystal" padding="lg">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Welcome to HIVE</h2>
                <p className="text-white/70">Your campus community awaits</p>
              </div>
              <div className="space-y-3">
                <button className="bg-white text-black px-4 py-2 rounded text-sm w-full flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Find Your Community
                </button>
                <button className="bg-white/10 text-white px-4 py-2 rounded text-sm w-full">
                  Explore Spaces
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CAMPUS CARDS */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">🏫 Campus Cards</h2>
          <p className="text-white/70 mb-6">Bulletin board vibes • Authentic campus life • Approachable design</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CampusCard variant="bulletin" padding="md">
            <div className="flex items-start gap-3">
              <Coffee className="w-5 h-5 text-accent mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Late Night Study Session</h3>
                <p className="text-white/80 text-sm mb-3">
                  Coffee, snacks, and collaborative problem solving. Bring your laptops! ☕️
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Posted 2 hours ago</span>
                  <button className="bg-accent text-black px-3 py-1 rounded text-sm">I'm In!</button>
                </div>
              </div>
            </div>
          </CampusCard>

          <CampusCard variant="sticky" padding="sm" className="text-black">
            <div className="text-center space-y-2">
              <div className="text-2xl">🎉</div>
              <h3 className="font-black text-lg">PIZZA PARTY!</h3>
              <p className="font-semibold text-sm">Dorm 3A Common Room</p>
              <p className="text-xs opacity-80">Tonight @ 8pm</p>
            </div>
          </CampusCard>

          <CampusCard variant="dorm" padding="md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dorm 3A</h3>
                    <p className="text-sm text-white/60">47 residents</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-accent">High Energy</div>
                  <div className="text-xs text-white/60">12 active now</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-white/10 text-white px-3 py-1 rounded text-sm flex-1 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </button>
                <button className="bg-accent text-black px-3 py-1 rounded text-sm flex-1">
                  Join Space
                </button>
              </div>
            </div>
          </CampusCard>

          <CampusCard variant="study" padding="md">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="font-bold">CS 301 Study Group</h3>
                  <p className="text-sm text-white/70">Data Structures & Algorithms</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Next Session:</span>
                  <span className="text-accent">Tomorrow 2pm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Location:</span>
                  <span>Library Study Room 3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Members:</span>
                  <span>8/12</span>
                </div>
              </div>
              <button className="bg-accent text-black px-4 py-2 rounded text-sm w-full flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                Add to Schedule
              </button>
            </div>
          </CampusCard>
        </div>
      </section>

      {/* TECH CARDS */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">💻 Tech Cards</h2>
          <p className="text-white/70 mb-6">Command-line aesthetic • Function-first • Precise information</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TechCard variant="terminal" padding="md">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-semibold">hive-session</span>
              </div>
              <div className="space-y-1 text-sm">
                <div><span className="text-accent">user:</span> jacob_cs_2025</div>
                <div><span className="text-accent">space:</span> cs-study-hub</div>
                <div><span className="text-accent">status:</span> active</div>
                <div><span className="text-accent">uptime:</span> 2h 34m</div>
              </div>
              <button className="bg-accent text-black px-4 py-2 rounded text-sm w-full font-mono">
                $ join --space=study-session
              </button>
            </div>
          </TechCard>

          <TechCard variant="console" padding="md">
            <div className="space-y-2 text-xs">
              <div className="text-accent">[INFO] Campus system online</div>
              <div className="text-white/80">[LOG] 247 students connected</div>
              <div className="text-accent">[EVENT] New study group: algorithms</div>
              <div className="text-white/80">[STATUS] Server load: 23%</div>
              <div className="text-accent">[ALERT] High activity in cs-building</div>
            </div>
            <div className="mt-4 pt-2 border-t border-white/20">
              <button className="bg-white/10 text-white px-3 py-1 rounded text-sm flex items-center font-mono">
                <Code className="w-3 h-3 mr-2" />
                View Logs
              </button>
            </div>
          </TechCard>

          <TechCard variant="debug" padding="md">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground font-semibold">Debug Mode</span>
              </div>
              <div className="text-sm space-y-1">
                <div className="text-muted-foreground">ERROR: Connection timeout</div>
                <div className="text-white/70">Failed to join space: cs-lab</div>
                <div className="text-white/70">Retrying in 5 seconds...</div>
              </div>
              <div className="flex gap-2">
                <button className="bg-surface text-foreground px-3 py-1 rounded text-sm font-mono">Retry</button>
                <button className="bg-white/10 text-white px-3 py-1 rounded text-sm font-mono">Cancel</button>
              </div>
            </div>
          </TechCard>

          <TechCard variant="system" padding="md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-accent font-semibold">System Status</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-white/60">CPU</div>
                  <div className="text-accent font-mono">23%</div>
                </div>
                <div>
                  <div className="text-white/60">Memory</div>
                  <div className="text-accent font-mono">1.2GB</div>
                </div>
                <div>
                  <div className="text-white/60">Users</div>
                  <div className="text-accent font-mono">247</div>
                </div>
                <div>
                  <div className="text-white/60">Uptime</div>
                  <div className="text-accent font-mono">99.9%</div>
                </div>
              </div>
            </div>
          </TechCard>
        </div>
      </section>

      {/* SOCIAL CARDS */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">💬 Social Cards</h2>
          <p className="text-white/70 mb-6">Friendly interactions • Conversational design • Connection-focused</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SocialCard variant="post" padding="md">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-bold text-accent">JS</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Jacob Smith</span>
                    <span className="text-xs text-white/60">2 min ago</span>
                  </div>
                  <p className="text-white/90">
                    Anyone up for a late-night coding session? I've got snacks and good vibes! ✨
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex gap-4">
                  <button className="bg-white/10 text-white p-2 rounded">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="bg-white/10 text-white p-2 rounded">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-white/60">12 reactions</div>
              </div>
            </div>
          </SocialCard>

          <SocialCard variant="chat" padding="md">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Study Buddy Chat</h3>
                  <p className="text-sm text-white/60">3 messages</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="bg-white/5 rounded-lg p-2">
                  <span className="text-white/90">"Hey, still on for algorithms review?"</span>
                </div>
                <div className="bg-accent/20 rounded-lg p-2 ml-4">
                  <span className="text-black">"Absolutely! Bringing coffee ☕"</span>
                </div>
              </div>
              <button className="bg-accent text-black px-4 py-2 rounded text-sm w-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Reply
              </button>
            </div>
          </SocialCard>

          <SocialCard variant="reaction" padding="sm">
            <div className="text-center space-y-2">
              <div className="text-2xl">🔥</div>
              <div className="text-sm font-semibold">Fire Streak!</div>
              <div className="text-xs text-white/70">7 days coding</div>
            </div>
          </SocialCard>

          <SocialCard variant="community" padding="md">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">CS Study Community</h3>
                  <p className="text-white/70">247 members • 12 active now</p>
                </div>
              </div>
              <p className="text-white/80">
                Join our thriving community of computer science students. Share knowledge, find study partners, and grow together!
              </p>
              <div className="flex gap-3">
                <button className="bg-accent text-black px-4 py-2 rounded text-sm flex-1 flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </button>
                <button className="bg-white/10 text-white p-2 rounded">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SocialCard>
        </div>
      </section>

      {/* COMPARISON GRID */}
      <section className="space-y-6 pt-16 border-t border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8">Style Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent text-center">Minimal</h3>
            <MinimalCard variant="primary" padding="sm">
              <h4 className="font-semibold mb-2">Study Group</h4>
              <p className="text-sm text-white/70 mb-3">Join us for algorithms</p>
              <button className="bg-white/10 text-white px-3 py-1 rounded text-sm w-full">Join</button>
            </MinimalCard>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent text-center">Glass</h3>
            <GlassCard variant="frosted" padding="sm">
              <h4 className="font-semibold mb-2">Study Group</h4>
              <p className="text-sm text-white/70 mb-3">Premium experience</p>
              <button className="bg-accent text-black px-3 py-1 rounded text-sm w-full">Join</button>
            </GlassCard>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent text-center">Campus</h3>
            <CampusCard variant="bulletin" padding="sm">
              <h4 className="font-semibold mb-2">Study Group</h4>
              <p className="text-sm text-white/70 mb-3">Coffee & algorithms! ☕</p>
              <button className="bg-accent text-black px-3 py-1 rounded text-sm w-full">I'm In!</button>
            </CampusCard>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent text-center">Tech</h3>
            <TechCard variant="terminal" padding="sm">
              <div className="text-xs mb-2">$ study-session</div>
              <div className="text-xs text-white/70 mb-3">algorithms --group</div>
              <button className="bg-accent text-black px-3 py-1 rounded text-sm w-full font-mono">exec</button>
            </TechCard>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-accent text-center">Social</h3>
            <SocialCard variant="post" padding="sm">
              <h4 className="font-semibold mb-2">Study Group</h4>
              <p className="text-sm text-white/70 mb-3">Who's joining? 🤔</p>
              <button className="bg-accent text-black px-3 py-1 rounded text-sm w-full">Count Me In!</button>
            </SocialCard>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="text-center pt-16 border-t border-accent/20">
        <p className="text-white/70 max-w-2xl mx-auto">
          Each card style creates different user experiences and emotional connections. 
          Choose based on your content type and the relationship you want to build with users.
        </p>
      </div>
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="bg-black text-white p-8 space-y-8">
      <h2 className="text-2xl font-bold text-accent text-center mb-8">Interactive States & Hover Effects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Minimal</h3>
          <MinimalCard variant="interactive" padding="md" className="min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="font-semibold">Hover Me</div>
              <div className="text-sm text-white/60">Interactive card</div>
            </div>
          </MinimalCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Glass</h3>
          <GlassCard variant="iridescent" padding="md" className="min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <Star className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="font-semibold">Hover Me</div>
              <div className="text-sm text-white/60">Glass effect</div>
            </div>
          </GlassCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Campus</h3>
          <CampusCard variant="sticky" padding="md" className="min-h-[120px] flex items-center justify-center text-black">
            <div className="text-center">
              <Coffee className="w-8 h-8 mx-auto mb-2" />
              <div className="font-black">Hover Me</div>
              <div className="text-sm opacity-80">Sticky note</div>
            </div>
          </CampusCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Tech</h3>
          <TechCard variant="terminal" padding="md" className="min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <Terminal className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="font-semibold">$ hover</div>
              <div className="text-sm text-white/60">Terminal card</div>
            </div>
          </TechCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Social</h3>
          <SocialCard variant="reaction" padding="md" className="min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="font-semibold">Hover Me</div>
              <div className="text-sm text-white/60">Reaction card</div>
            </div>
          </SocialCard>
        </div>
      </div>
    </div>
  ),
};