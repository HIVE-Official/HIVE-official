import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  // Button Options
  VercelButton,
  AppleButton,
  CampusButton,
  TechButton,
  SocialButton
} from '../../components/visual-improvements/button-options';
import { 
  // Card Options
  MinimalCard,
  GlassCard,
  CampusCard,
  TechCard,
  SocialCard
} from '../../components/visual-improvements/card-options';
import { 
  // Typography Options
  MinimalTypography,
  DisplayTypography,
  CampusTypography,
  TechTypography,
  SocialTypography
} from '../../components/visual-improvements/typography-options';
import { 
  Users, 
  Zap, 
  Star, 
  Coffee, 
  Code, 
  Heart,
  MessageCircle,
  BookOpen,
  Terminal,
  Clock
} from 'lucide-react';

const meta = {
  component: React.Fragment,
  title: 'Visual Improvements/🎨 Master Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Component Options Master Overview

This is your comprehensive design system playground featuring 15+ component variations across 5 distinct design philosophies.

## 🎯 Design Philosophies

### 1. **Minimal** - Clean, Professional, Timeless
Clean readability, functional clarity, professional interfaces

### 2. **Glass** - Premium, Sophisticated, Modern  
Blur effects, transparency, premium feel with depth

### 3. **Campus** - Authentic, Energetic, Student-Focused
Bulletin boards, handwritten notes, authentic campus vibes

### 4. **Tech** - Precise, Developer-Focused, Command-Line
Monospace precision, terminal aesthetic, function-first

### 5. **Social** - Friendly, Conversational, Community
Emoji-native, connection-focused, conversational design

## 🧪 A/B Testing Ready

Each component option is production-ready and can be easily swapped for A/B testing. Choose based on:
- **User Context**: Who's using this feature?
- **Content Type**: What kind of information are you presenting?
- **Brand Moment**: What experience do you want to create?
- **Technical Context**: Is this a developer tool or user-facing feature?

## 🎨 Mix and Match

These components are designed to work together within the same interface. You can mix different philosophies for different contexts:
- Tech buttons for developer actions
- Campus cards for student content  
- Social typography for community features
- Glass components for premium experiences
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const InteractiveShowcase: Story = {
  render: () => {
    const [selectedStyle, setSelectedStyle] = useState('campus');
    const [selectedComponent, setSelectedComponent] = useState('buttons');

    const styles = [
      { id: 'minimal', name: 'Minimal', emoji: '📋', color: 'white' },
      { id: 'glass', name: 'Glass', emoji: '🌟', color: 'accent' },
      { id: 'campus', name: 'Campus', emoji: '🏫', color: 'accent' },
      { id: 'tech', name: 'Tech', emoji: '💻', color: 'accent' },
      { id: 'social', name: 'Social', emoji: '💬', color: 'accent' }
    ];

    const components = [
      { id: 'buttons', name: 'Buttons', icon: '🔘' },
      { id: 'cards', name: 'Cards', icon: '🃏' },
      { id: 'typography', name: 'Typography', icon: '🔤' }
    ];

    const ButtonComponent = {
      minimal: VercelButton,
      glass: AppleButton,
      campus: CampusButton,
      tech: TechButton,
      social: SocialButton
    }[selectedStyle];

    const CardComponent = {
      minimal: MinimalCard,
      glass: GlassCard,
      campus: CampusCard,
      tech: TechCard,
      social: SocialCard
    }[selectedStyle];

    const TypographyComponent = {
      minimal: MinimalTypography,
      glass: DisplayTypography,
      campus: CampusTypography,
      tech: TechTypography,
      social: SocialTypography
    }[selectedStyle];

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                HIVE Component Options
              </h1>
              <p className="text-white/70 text-lg">
                Interactive design system playground with 15+ component variations
              </p>
            </div>
            
            {/* Style Selector */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center">Choose Design Philosophy</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {styles.map((style: any) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedStyle === style.id
                        ? 'bg-accent text-black border-accent'
                        : 'bg-transparent text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span className="mr-2">{style.emoji}</span>
                    {style.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Component Selector */}
            <div className="space-y-4 mt-6">
              <h2 className="text-lg font-semibold text-center">Component Type</h2>
              <div className="flex justify-center gap-3">
                {components.map((comp: any) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp.id)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedComponent === comp.id
                        ? 'bg-white/10 text-white border-white/30'
                        : 'bg-transparent text-white/70 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="mr-2">{comp.icon}</span>
                    {comp.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Current Selection Display */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-surface border border-white/10 rounded-xl px-6 py-4">
              <span className="text-2xl">
                {styles.find(s => s.id === selectedStyle)?.emoji}
              </span>
              <span className="text-xl font-semibold text-accent">
                {styles.find(s => s.id === selectedStyle)?.name}
              </span>
              <span className="text-white/40">×</span>
              <span className="text-lg">
                {components.find(c => c.id === selectedComponent)?.name}
              </span>
            </div>
          </div>

          {/* Component Showcase */}
          {selectedComponent === 'buttons' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                {styles.find(s => s.id === selectedStyle)?.name} Buttons
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Primary Actions</h3>
                  <div className="space-y-3">
                    {selectedStyle === 'minimal' && (
                      <>
                        <ButtonComponent variant="primary" className="w-full">
                          <Zap className="w-4 h-4 mr-2" />
                          Join Study Group
                        </ButtonComponent>
                        <ButtonComponent variant="secondary" className="w-full">
                          <Users className="w-4 h-4 mr-2" />
                          Browse Spaces
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'glass' && (
                      <>
                        <ButtonComponent variant="primary" className="w-full">
                          <Star className="w-4 h-4 mr-2" />
                          Premium Experience
                        </ButtonComponent>
                        <ButtonComponent variant="secondary" className="w-full">
                          <Zap className="w-4 h-4 mr-2" />
                          Unlock Features
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'campus' && (
                      <>
                        <ButtonComponent variant="energy" className="w-full">
                          <Coffee className="w-4 h-4 mr-2" />
                          Study Session!
                        </ButtonComponent>
                        <ButtonComponent variant="hype" className="w-full">
                          <Zap className="w-4 h-4 mr-2" />
                          PARTY MODE!
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'tech' && (
                      <>
                        <ButtonComponent variant="terminal" className="w-full">
                          <Terminal className="w-4 h-4 mr-2" />
                          $ execute
                        </ButtonComponent>
                        <ButtonComponent variant="system" className="w-full">
                          <Code className="w-4 h-4 mr-2" />
                          build --dev
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'social' && (
                      <>
                        <ButtonComponent variant="connect" className="w-full">
                          <Heart className="w-4 h-4 mr-2" />
                          Let's Connect!
                        </ButtonComponent>
                        <ButtonComponent variant="engage" className="w-full">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Start Chat
                        </ButtonComponent>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Secondary Actions</h3>
                  <div className="space-y-3">
                    {selectedStyle === 'minimal' && (
                      <>
                        <ButtonComponent variant="secondary" className="w-full">
                          Browse Spaces
                        </ButtonComponent>
                        <ButtonComponent variant="ghost" className="w-full">
                          Maybe Later
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'glass' && (
                      <>
                        <ButtonComponent variant="secondary" className="w-full">
                          Explore Features
                        </ButtonComponent>
                        <ButtonComponent variant="destructive" className="w-full">
                          Delete Account
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'campus' && (
                      <>
                        <ButtonComponent variant="chill" className="w-full">
                          Browse Spaces
                        </ButtonComponent>
                        <ButtonComponent variant="subtle" className="w-full">
                          Nah, I'm good
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'tech' && (
                      <>
                        <ButtonComponent variant="debug" className="w-full">
                          debug mode
                        </ButtonComponent>
                        <ButtonComponent variant="system" className="w-full">
                          cancel
                        </ButtonComponent>
                      </>
                    )}
                    
                    {selectedStyle === 'social' && (
                      <>
                        <ButtonComponent variant="share" className="w-full">
                          Share with Friends
                        </ButtonComponent>
                        <ButtonComponent variant="react" className="w-full">
                          Show Love
                        </ButtonComponent>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Icon Buttons</h3>
                  <div className="flex gap-2">
                    <ButtonComponent variant={selectedStyle === 'minimal' ? 'secondary' : selectedStyle === 'campus' ? 'energy' : selectedStyle === 'social' ? 'react' : 'primary'} size="icon">
                      <Heart className="w-4 h-4" />
                    </ButtonComponent>
                    <ButtonComponent variant={selectedStyle === 'minimal' ? 'accent' : selectedStyle === 'campus' ? 'chill' : selectedStyle === 'social' ? 'react' : 'secondary'} size="icon">
                      <Star className="w-4 h-4" />
                    </ButtonComponent>
                    <ButtonComponent variant={selectedStyle === 'minimal' ? 'ghost' : selectedStyle === 'campus' ? 'subtle' : selectedStyle === 'social' ? 'react' : 'terminal'} size="icon">
                      <MessageCircle className="w-4 h-4" />
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedComponent === 'cards' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                {styles.find(s => s.id === selectedStyle)?.name} Cards
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CardComponent 
                  variant={selectedStyle === 'minimal' ? 'default' : selectedStyle === 'glass' ? 'frosted' : selectedStyle === 'campus' ? 'bulletin' : selectedStyle === 'tech' ? 'terminal' : 'post'} 
                  padding="md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Study Session</h3>
                        <p className="text-sm text-white/60">Tonight at 8pm</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">
                      {selectedStyle === 'campus' 
                        ? 'Coffee, snacks, and collaborative problem solving! Bring your laptops ☕️'
                        : selectedStyle === 'social'
                        ? 'Who\'s joining for some late-night coding? 🤔'
                        : selectedStyle === 'tech'
                        ? 'algorithm_review --collaborative --snacks-provided'
                        : 'Join us for collaborative algorithm review and problem solving.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Users className="w-4 h-4" />
                        <span>12 joined</span>
                      </div>
                      <ButtonComponent 
                        variant={selectedStyle === 'minimal' ? 'secondary' : selectedStyle === 'campus' ? 'energy' : selectedStyle === 'social' ? 'connect' : 'primary'} 
                        size="sm"
                      >
                        {selectedStyle === 'campus' ? 'I\'m In!' : selectedStyle === 'social' ? 'Count Me In!' : selectedStyle === 'tech' ? 'exec' : 'Join'}
                      </ButtonComponent>
                    </div>
                  </div>
                </CardComponent>
                
                <CardComponent 
                  variant={selectedStyle === 'minimal' ? 'elevated' : selectedStyle === 'glass' ? 'iridescent' : selectedStyle === 'campus' ? 'dorm' : selectedStyle === 'tech' ? 'system' : 'community'} 
                  padding="md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {selectedStyle === 'tech' ? 'System Status' : 'Campus Energy'}
                      </h3>
                      <div className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                        {selectedStyle === 'tech' ? 'Online' : 'High'}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-accent mb-2">
                      {selectedStyle === 'tech' ? '99.9%' : '87%'}
                    </div>
                    <p className="text-white/60 text-sm">
                      {selectedStyle === 'tech' 
                        ? 'Uptime • 247 users connected'
                        : 'Peak activity in CS Building and Library'}
                    </p>
                  </div>
                </CardComponent>
                
                <CardComponent 
                  variant={selectedStyle === 'minimal' ? 'feature' : selectedStyle === 'glass' ? 'crystal' : selectedStyle === 'campus' ? 'sticky' : selectedStyle === 'tech' ? 'console' : 'chat'} 
                  padding={selectedStyle === 'campus' ? 'sm' : 'md'}
                  className={selectedStyle === 'campus' ? 'text-black' : ''}
                >
                  {selectedStyle === 'campus' ? (
                    <div className="text-center space-y-2">
                      <div className="text-2xl">🎉</div>
                      <h3 className="font-black text-lg">PIZZA PARTY!</h3>
                      <p className="font-semibold text-sm">Dorm 3A Common Room</p>
                      <p className="text-xs opacity-80">Tonight @ 8pm</p>
                    </div>
                  ) : selectedStyle === 'tech' ? (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="text-accent">[INFO] Campus system online</div>
                      <div className="text-white/80">[LOG] 247 students connected</div>
                      <div className="text-accent">[EVENT] New study group: algorithms</div>
                      <div className="text-white/80">[STATUS] Server load: 23%</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Star className="w-6 h-6 text-accent" />
                        <h3 className="text-lg font-semibold">Featured Space</h3>
                      </div>
                      <h4 className="font-semibold">CS Study Hub</h4>
                      <p className="text-white/80 text-sm">
                        Most active study space with 247 sessions this week.
                      </p>
                    </div>
                  )}
                </CardComponent>
              </div>
            </div>
          )}

          {selectedComponent === 'typography' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                {styles.find(s => s.id === selectedStyle)?.name} Typography
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    {selectedStyle === 'minimal' && (
                      <TypographyComponent variant="hero" as="h1">
                        Welcome to HIVE
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'glass' && (
                      <TypographyComponent variant="hero" as="h1">
                        The Future is Here
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'campus' && (
                      <TypographyComponent variant="energy" as="h1">
                        Campus Life Rocks! ⚡
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'tech' && (
                      <TypographyComponent variant="terminal" as="h1">
                        hive --init campus
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'social' && (
                      <TypographyComponent variant="friendly" as="h1">
                        Hey there, future friend! 👋
                      </TypographyComponent>
                    )}
                    <p className="text-sm text-white/60 mt-2">Primary headline style</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    {selectedStyle === 'minimal' && (
                      <TypographyComponent variant="body" as="p">
                        Connect with fellow students, join study groups, and build meaningful relationships 
                        that last beyond graduation. Your campus community is waiting.
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'glass' && (
                      <TypographyComponent variant="subhead" as="p">
                        Unlock premium features designed for ambitious students who want to excel 
                        in their academic journey.
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'campus' && (
                      <TypographyComponent variant="handwritten" as="p">
                        Coffee, snacks, and late-night problem solving! Bring your laptops and good vibes ✨
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'tech' && (
                      <TypographyComponent variant="output" as="p">
                        Connected to campus network. 247 students online. 
                        12 active study sessions. System status: optimal.
                      </TypographyComponent>
                    )}
                    {selectedStyle === 'social' && (
                      <TypographyComponent variant="chat" as="p">
                        Anyone up for a study session tonight? I've got snacks and good energy! 
                        <TypographyComponent variant="hashtag" as="span"> #StudyBuddies</TypographyComponent>
                        <TypographyComponent variant="emoji" as="span"> ✨</TypographyComponent>
                      </TypographyComponent>
                    )}
                    <p className="text-sm text-white/60 mt-2">Body text style</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-surface/50 py-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-2xl font-bold text-accent mb-4">Ready to Implement?</h2>
            <p className="text-white/80 mb-6">
              Each component option is production-ready and can be easily integrated into your HIVE interface. 
              Mix and match based on user context, content type, and the experience you want to create.
            </p>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2">
              <Code className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium">
                import {`{ ${styles.find(s => s.id === selectedStyle)?.name}Button }`} from '@hive/ui'
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const QuickComparison: Story = {
  render: () => (
    <div className="bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-accent">Quick Style Comparison</h1>
          <p className="text-white/70">See all 5 design philosophies side-by-side</p>
        </div>

        {/* Buttons Comparison */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-accent text-center">📋 Minimal</h3>
              <VercelButton variant="primary" className="w-full">Join</VercelButton>
              <VercelButton variant="secondary" className="w-full">Browse</VercelButton>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-accent text-center">🌟 Glass</h3>
              <AppleButton variant="primary" className="w-full">Join</AppleButton>
              <AppleButton variant="secondary" className="w-full">Browse</AppleButton>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-accent text-center">🏫 Campus</h3>
              <CampusButton variant="energy" className="w-full">Join!</CampusButton>
              <CampusButton variant="chill" className="w-full">Browse</CampusButton>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-accent text-center">💻 Tech</h3>
              <TechButton variant="execute" className="w-full">exec</TechButton>
              <TechButton variant="system" className="w-full">list</TechButton>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-accent text-center">💬 Social</h3>
              <SocialButton variant="connect" className="w-full">Join!</SocialButton>
              <SocialButton variant="engage" className="w-full">Chat</SocialButton>
            </div>
          </div>
        </div>

        {/* Cards Comparison */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <MinimalCard variant="primary" padding="sm" className="min-h-[120px] flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-accent" />
                <div className="font-semibold">Study Group</div>
                <div className="text-xs text-white/60">Clean & Functional</div>
              </div>
            </MinimalCard>
            
            <GlassCard variant="frosted" padding="sm" className="min-h-[120px] flex items-center justify-center">
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-accent" />
                <div className="font-semibold">Premium</div>
                <div className="text-xs text-white/60">Elegant & Refined</div>
              </div>
            </GlassCard>
            
            <CampusCard variant="bulletin" padding="sm" className="min-h-[120px] flex items-center justify-center">
              <div className="text-center">
                <Coffee className="w-6 h-6 mx-auto mb-2 text-accent" />
                <div className="font-semibold">Study Session!</div>
                <div className="text-xs text-white/60">Authentic & Energetic</div>
              </div>
            </CampusCard>
            
            <TechCard variant="terminal" padding="sm" className="min-h-[120px] flex items-center justify-center">
              <div className="text-center">
                <Terminal className="w-6 h-6 mx-auto mb-2 text-accent" />
                <div className="font-semibold">$ session</div>
                <div className="text-xs text-white/60">Precise & Functional</div>
              </div>
            </TechCard>
            
            <SocialCard variant="post" padding="sm" className="min-h-[120px] flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-6 h-6 mx-auto mb-2 text-accent" />
                <div className="font-semibold">Let's Connect!</div>
                <div className="text-xs text-white/60">Friendly & Social</div>
              </div>
            </SocialCard>
          </div>
        </div>

        {/* Typography Comparison */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-semibold text-accent">📋 Minimal</h3>
              <MinimalTypography variant="title" as="h4">Clean Headers</MinimalTypography>
              <MinimalTypography variant="body" as="p" className="text-sm">Readable body text for professional interfaces</MinimalTypography>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-sm font-semibold text-accent">🌟 Glass</h3>
              <DisplayTypography variant="headline" as="h4">Bold Impact</DisplayTypography>
              <DisplayTypography variant="subhead" as="p" className="text-sm">Premium brand presence</DisplayTypography>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-sm font-semibold text-accent">🏫 Campus</h3>
              <CampusTypography variant="energy" as="h4">High Energy! ⚡</CampusTypography>
              <CampusTypography variant="handwritten" as="p" className="text-sm">Authentic campus vibes ✏️</CampusTypography>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-sm font-semibold text-accent">💻 Tech</h3>
              <TechTypography variant="terminal" as="h4">$ command</TechTypography>
              <TechTypography variant="output" as="p" className="text-sm">monospace precision</TechTypography>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-sm font-semibold text-accent">💬 Social</h3>
              <SocialTypography variant="friendly" as="h4">Hey friend! 👋</SocialTypography>
              <SocialTypography variant="chat" as="p" className="text-sm">Conversational and emoji-native 💬</SocialTypography>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MixAndMatchDemo: Story = {
  render: () => (
    <div className="bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-accent">Mix & Match in Action</h1>
          <p className="text-white/70">How different component styles work together in real interfaces</p>
        </div>

        {/* Developer Dashboard Example */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Developer Dashboard</h2>
          <p className="text-white/70">Tech cards + Minimal buttons + Campus social elements</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TechCard variant="terminal" padding="md">
              <div className="space-y-3">
                <TechTypography variant="terminal" as="div">
                  hive-session --status
                </TechTypography>
                <TechTypography variant="output" as="div">
                  Connected: cs-study-hub
                </TechTypography>
                <TechTypography variant="success" as="div">
                  24 students online
                </TechTypography>
                <VercelButton variant="secondary" size="sm" className="w-full">
                  View Details
                </VercelButton>
              </div>
            </TechCard>
            
            <MinimalCard variant="elevated" padding="md">
              <MinimalTypography variant="title" as="h3" className="mb-4">
                Active Sessions
              </MinimalTypography>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Algorithm Review</span>
                  <span className="text-accent">12 users</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Structures</span>
                  <span className="text-accent">8 users</span>
                </div>
              </div>
            </MinimalCard>
            
            <CampusCard variant="bulletin" padding="md">
              <CampusTypography variant="bulletin" as="h3" className="mb-3">
                Quick Updates
              </CampusTypography>
              <CampusTypography variant="handwritten" as="p" className="mb-4">
                New study group forming! Coffee provided ☕
              </CampusTypography>
              <SocialButton variant="connect" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Join Us!
              </SocialButton>
            </CampusCard>
          </div>
        </div>

        {/* Student Interface Example */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Student Social Interface</h2>
          <p className="text-white/70">Social cards + Campus typography + Glass accents</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SocialCard variant="post" padding="md">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="font-bold text-accent">JS</span>
                  </div>
                  <div className="flex-1">
                    <SocialTypography variant="username" as="span">jacob_smith</SocialTypography>
                    <SocialTypography variant="timestamp" as="span" className="ml-2">2 min ago</SocialTypography>
                    <SocialTypography variant="chat" as="p" className="mt-1">
                      Late night coding session anyone? 
                      <SocialTypography variant="hashtag" as="span"> #StudyBuddies</SocialTypography>
                      <SocialTypography variant="emoji" as="span"> ✨</SocialTypography>
                    </SocialTypography>
                  </div>
                </div>
                <div className="flex gap-3">
                  <SocialButton variant="react" size="icon">
                    <Heart className="w-4 h-4" />
                  </SocialButton>
                  <SocialButton variant="engage" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reply
                  </SocialButton>
                </div>
              </div>
            </SocialCard>
            
            <GlassCard variant="iridescent" padding="md">
              <div className="text-center space-y-4">
                <CampusTypography variant="energy" as="h3">
                  Achievement Unlocked! 🏆
                </CampusTypography>
                <DisplayTypography variant="subhead" as="p">
                  Study Streak Champion
                </DisplayTypography>
                <AppleButton variant="secondary" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Celebrate
                </AppleButton>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Admin Interface Example */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Admin Control Panel</h2>
          <p className="text-white/70">Minimal cards + Apple buttons + Tech typography</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MinimalCard variant="primary" padding="md">
              <MinimalTypography variant="title" as="h3" className="mb-4">
                System Overview
              </MinimalTypography>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <TechTypography variant="output" as="span">CPU Usage</TechTypography>
                  <span className="text-accent">23%</span>
                </div>
                <div className="flex justify-between">
                  <TechTypography variant="output" as="span">Active Users</TechTypography>
                  <span className="text-accent">247</span>
                </div>
                <div className="flex justify-between">
                  <TechTypography variant="output" as="span">Uptime</TechTypography>
                  <span className="text-accent">99.9%</span>
                </div>
              </div>
              <AppleButton variant="secondary" size="sm" className="w-full">
                View Details
              </AppleButton>
            </MinimalCard>
            
            <MinimalCard variant="feature" padding="md">
              <MinimalTypography variant="subtitle" as="h3" className="mb-4">
                Recent Activity
              </MinimalTypography>
              <div className="space-y-2 text-sm mb-4">
                <TechTypography variant="success" as="div">
                  New user registered: jacob_cs_2025
                </TechTypography>
                <TechTypography variant="output" as="div">
                  Study group created: CS 301 Review
                </TechTypography>
                <TechTypography variant="output" as="div">
                  Space activated: Dorm 3A
                </TechTypography>
              </div>
              <AppleButton variant="primary" size="sm" className="w-full">
                Manage Users
              </AppleButton>
            </MinimalCard>
            
            <MinimalCard variant="elevated" padding="md">
              <MinimalTypography variant="subtitle" as="h3" className="mb-4">
                Quick Actions
              </MinimalTypography>
              <div className="space-y-3">
                <AppleButton variant="secondary" size="sm" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Send Announcement
                </AppleButton>
                <AppleButton variant="secondary" size="sm" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Maintenance
                </AppleButton>
                <AppleButton variant="destructive" size="sm" className="w-full">
                  Emergency Shutdown
                </AppleButton>
              </div>
            </MinimalCard>
          </div>
        </div>
      </div>
    </div>
  ),
};