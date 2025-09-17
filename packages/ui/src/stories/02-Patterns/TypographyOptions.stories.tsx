import type { Meta, StoryObj } from '@storybook/react';
import { 
  MinimalTypography,
  DisplayTypography, 
  CampusTypography, 
  TechTypography, 
  SocialTypography,
  MinimalHero,
  DisplayImpact,
  CampusEnergy,
  SocialFriendly
} from '../../components/visual-improvements/typography-options';

const meta = {
  title: 'Visual Improvements/🔤 Typography Options',
  component: MinimalTypography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Typography Design Options

Five distinct typography styles that create different voices and personalities for your interface.

## When to Use Each Option:

### 📄 Minimal Typography
**Best for:** Core platform content, professional interfaces, clean layouts
**Personality:** Clean readability, timeless elegance, functional clarity

### 🎯 Display Typography  
**Best for:** Hero sections, brand moments, impactful headlines
**Personality:** Bold confidence, visual impact, brand presence

### 🏫 Campus Typography
**Best for:** Student-facing content, authentic campus vibes, approachable messaging
**Personality:** Handwritten notes, bulletin boards, authentic student life

### 💻 Tech Typography
**Best for:** Developer tools, system information, technical interfaces
**Personality:** Monospace precision, command-line aesthetic, function-first

### 💬 Social Typography
**Best for:** Social features, conversations, community interactions
**Personality:** Friendly conversations, emoji-native, connection-focused
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllTypographyOptions: Story = {
  render: () => (
    <div className="min-h-screen bg-black text-white p-8 space-y-16">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
          Typography Design Options
        </h1>
        <p className="text-white/70 text-lg">
          Five distinct voices and personalities for your interface
        </p>
      </div>

      {/* MINIMAL TYPOGRAPHY */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">📄 Minimal Typography</h2>
          <p className="text-white/70 mb-6">Clean readability • Timeless elegance • Functional clarity</p>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <MinimalTypography variant="hero" as="h1">
                  Welcome to HIVE
                </MinimalTypography>
                <p className="text-sm text-white/60 mt-2">Hero text for major headlines</p>
              </div>
              
              <div>
                <MinimalTypography variant="title" as="h2">
                  Your Campus Community
                </MinimalTypography>
                <p className="text-sm text-white/60 mt-1">Title text for section headers</p>
              </div>
              
              <div>
                <MinimalTypography variant="subtitle" as="h3">
                  Connect, Study, and Grow Together
                </MinimalTypography>
                <p className="text-sm text-white/60 mt-1">Subtitle text for supporting headlines</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <MinimalTypography variant="body" as="p">
                  This is body text that provides detailed information in a clean, readable format. 
                  Perfect for articles, descriptions, and main content areas where clarity is essential.
                </MinimalTypography>
                <p className="text-sm text-white/60 mt-2">Body text for main content</p>
              </div>
              
              <div>
                <MinimalTypography variant="caption" as="p">
                  Caption text for supporting information, metadata, and secondary details
                </MinimalTypography>
                <p className="text-sm text-white/60 mt-1">Caption text for metadata</p>
              </div>
              
              <div>
                <MinimalTypography variant="secondary" as="span">
                  Accent text for highlights and important information
                </MinimalTypography>
                <p className="text-sm text-white/60 mt-1">Accent text for emphasis</p>
              </div>
            </div>
          </div>
          
          <div className="border border-white/10 rounded-lg p-6 bg-surface/50">
            <MinimalTypography variant="title" as="h3" className="mb-4">Example Content Card</MinimalTypography>
            <MinimalTypography variant="body" as="p" className="mb-4">
              Join our CS Study Group for collaborative learning and peer support. We meet every Tuesday and Thursday 
              to work through challenging algorithms and data structures together.
            </MinimalTypography>
            <div className="flex justify-between items-center">
              <MinimalTypography variant="caption" as="span">
                Posted 2 hours ago • CS Building
              </MinimalTypography>
              <MinimalTypography variant="secondary" as="span">
                12 members joined
              </MinimalTypography>
            </div>
          </div>
        </div>
      </section>

      {/* DISPLAY TYPOGRAPHY */}
      <section className="space-y-6">
        <div className="border-l-4 border-white pl-6">
          <h2 className="text-2xl font-bold text-white mb-2">🎯 Display Typography</h2>
          <p className="text-white/70 mb-6">Bold confidence • Visual impact • Brand presence</p>
        </div>
        
        <div className="space-y-8">
          <div className="text-center space-y-8">
            <div>
              <DisplayTypography variant="brand" as="h1" align="center">
                HIVE
              </DisplayTypography>
              <p className="text-sm text-white/60 mt-4">Brand typography for logo and major brand moments</p>
            </div>
            
            <div>
              <DisplayTypography variant="hero" as="h1" align="center">
                The Future of Campus Life
              </DisplayTypography>
              <p className="text-sm text-white/60 mt-2">Hero display for landing pages and major announcements</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <DisplayTypography variant="impact" as="h2">
                  Make Your Mark
                </DisplayTypography>
                <p className="text-sm text-white/60 mt-2">Impact headlines for calls-to-action</p>
              </div>
              
              <div>
                <DisplayTypography variant="headline" as="h3">
                  Join 1,000+ Students
                </DisplayTypography>
                <p className="text-sm text-white/60 mt-1">Standard headlines for features</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <DisplayTypography variant="subhead" as="h4">
                  Connect • Study • Succeed
                </DisplayTypography>
                <p className="text-sm text-white/60 mt-1">Subheadings for sections</p>
              </div>
              
              <div>
                <DisplayTypography variant="emphasis" as="span">
                  Limited Time Offer
                </DisplayTypography>
                <p className="text-sm text-white/60 mt-1">Emphasis text for urgency</p>
              </div>
            </div>
          </div>
          
          <div className="border border-accent/20 rounded-xl p-8 bg-gradient-to-br from-accent/5 to-transparent text-center">
            <DisplayTypography variant="impact" as="h2" className="mb-4">
              Ready to Transform Your Campus Experience?
            </DisplayTypography>
            <DisplayTypography variant="subhead" as="p" className="mb-6">
              Join thousands of students already building their future
            </DisplayTypography>
            <DisplayTypography variant="emphasis" as="span">
              Get Started Today
            </DisplayTypography>
          </div>
        </div>
      </section>

      {/* CAMPUS TYPOGRAPHY */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">🏫 Campus Typography</h2>
          <p className="text-white/70 mb-6">Handwritten notes • Bulletin boards • Authentic student life</p>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <CampusTypography variant="energy" as="h2">
                High Energy Vibes! ⚡
              </CampusTypography>
              <p className="text-sm text-white/60">Energy text for exciting moments</p>
            </div>
            
            <div className="space-y-4">
              <CampusTypography variant="handwritten" as="span">
                Quick note: study session @ 8pm ✏️
              </CampusTypography>
              <p className="text-sm text-white/60">Handwritten style for personal notes</p>
            </div>
            
            <div className="space-y-4">
              <CampusTypography variant="sticker" as="span">
                CS ROCKS!
              </CampusTypography>
              <p className="text-sm text-white/60">Sticker text for fun callouts</p>
            </div>
            
            <div className="space-y-4">
              <CampusTypography variant="bulletin" as="h3">
                Important Announcement
              </CampusTypography>
              <p className="text-sm text-white/60">Bulletin style for notices</p>
            </div>
            
            <div className="space-y-4">
              <CampusTypography variant="chalk" as="h3">
                Today's Schedule
              </CampusTypography>
              <p className="text-sm text-white/60">Chalk board text for academic content</p>
            </div>
            
            <div className="space-y-4">
              <CampusTypography variant="campus" as="span">
                Campus Life is Amazing!
              </CampusTypography>
              <p className="text-sm text-white/60">General campus-themed text</p>
            </div>
          </div>
          
          <div className="border-l-4 border-l-accent border border-white/10 rounded-r-xl rounded-l-sm p-6 bg-surface/50 relative">
            <div className="absolute top-2 left-2 w-3 h-3 bg-accent rounded-full"></div>
            <CampusTypography variant="bulletin" as="h3" className="mb-3">
              Study Group Formation
            </CampusTypography>
            <CampusTypography variant="handwritten" as="p" className="mb-4">
              Looking for motivated students to tackle CS 301 together! Coffee provided ☕
            </CampusTypography>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Posted by @sarah_cs</span>
              <CampusTypography variant="sticker" as="span">
                JOIN US!
              </CampusTypography>
            </div>
          </div>
        </div>
      </section>

      {/* TECH TYPOGRAPHY */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">💻 Tech Typography</h2>
          <p className="text-white/70 mb-6">Monospace precision • Command-line aesthetic • Function-first</p>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <TechTypography variant="terminal" as="code">
                  hive --connect study-group
                </TechTypography>
                <p className="text-sm text-white/60 mt-2">Terminal commands</p>
              </div>
              
              <div>
                <TechTypography variant="code" as="code">
                  const session = await joinSpace('cs-study')
                </TechTypography>
                <p className="text-sm text-white/60 mt-1">Inline code blocks</p>
              </div>
              
              <div>
                <TechTypography variant="command" as="span">
                  execute study-session
                </TechTypography>
                <p className="text-sm text-white/60 mt-1">Interactive commands</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <TechTypography variant="success" as="div">
                  Connected to CS Study Hub
                </TechTypography>
                <p className="text-sm text-white/60 mt-1">Success messages</p>
              </div>
              
              <div>
                <TechTypography variant="error" as="div">
                  Failed to join space: Permission denied
                </TechTypography>
                <p className="text-sm text-white/60 mt-1">Error messages</p>
              </div>
              
              <div>
                <TechTypography variant="debug" as="div">
                  Checking user permissions...
                </TechTypography>
                <p className="text-sm text-white/60 mt-1">Debug information</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black border border-accent/50 rounded p-4 font-mono">
            <div className="space-y-2 text-sm">
              <TechTypography variant="terminal" as="div">
                connect --space=cs-study-hub
              </TechTypography>
              <TechTypography variant="output" as="div">
                Connecting to study space...
              </TechTypography>
              <TechTypography variant="success" as="div">
                Successfully joined CS Study Hub
              </TechTypography>
              <TechTypography variant="output" as="div">
                24 students currently online
              </TechTypography>
              <TechTypography variant="terminal" as="div">
                list --active-sessions
              </TechTypography>
              <TechTypography variant="output" as="div">
                - Algorithm Review (12 participants)
              </TechTypography>
              <TechTypography variant="output" as="div">
                - Data Structures Workshop (8 participants)
              </TechTypography>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL TYPOGRAPHY */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">💬 Social Typography</h2>
          <p className="text-white/70 mb-6">Friendly conversations • Emoji-native • Connection-focused</p>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <SocialTypography variant="friendly" as="h3">
                Hey there, study buddy! 👋
              </SocialTypography>
              <p className="text-sm text-white/60">Friendly greetings and headlines</p>
            </div>
            
            <div className="space-y-4">
              <SocialTypography variant="username" as="span">
                @jacob_cs_2025
              </SocialTypography>
              <p className="text-sm text-white/60">Usernames and handles</p>
            </div>
            
            <div className="space-y-4">
              <SocialTypography variant="hashtag" as="span">
                #StudySquad #CS301 #LateNightCoding
              </SocialTypography>
              <p className="text-sm text-white/60">Hashtags for discovery</p>
            </div>
            
            <div className="space-y-4">
              <SocialTypography variant="mention" as="span">
                @sarah mentioned you in CS Study Group
              </SocialTypography>
              <p className="text-sm text-white/60">Mentions and notifications</p>
            </div>
            
            <div className="space-y-4">
              <SocialTypography variant="reaction" as="span">
                🔥
              </SocialTypography>
              <SocialTypography variant="reaction" as="span">
                💯
              </SocialTypography>
              <SocialTypography variant="reaction" as="span">
                ❤️
              </SocialTypography>
              <p className="text-sm text-white/60">Reaction emojis</p>
            </div>
            
            <div className="space-y-4">
              <SocialTypography variant="timestamp" as="span">
                2 minutes ago
              </SocialTypography>
              <p className="text-sm text-white/60">Timestamps and metadata</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-bold text-accent">JS</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <SocialTypography variant="username" as="span">
                      jacob_smith
                    </SocialTypography>
                    <SocialTypography variant="timestamp" as="span">
                      2 min ago
                    </SocialTypography>
                  </div>
                  <SocialTypography variant="chat" as="p" className="mb-3">
                    Anyone up for a coding session tonight? I've got energy drinks and good vibes! 
                    <SocialTypography variant="hashtag" as="span"> #LateNightCoding</SocialTypography>
                    <SocialTypography variant="emoji" as="span"> ✨</SocialTypography>
                  </SocialTypography>
                  <div className="flex items-center gap-4">
                    <SocialTypography variant="reaction" as="span">❤️</SocialTypography>
                    <SocialTypography variant="reaction" as="span">🔥</SocialTypography>
                    <SocialTypography variant="reaction" as="span">💻</SocialTypography>
                    <SocialTypography variant="chat" as="span" className="text-sm">
                      12 reactions • 5 replies
                    </SocialTypography>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-01 border border-accent/20 rounded-3xl p-4 max-w-md">
              <SocialTypography variant="chat" as="p" className="mb-2">
                <SocialTypography variant="mention" as="span">@everyone</SocialTypography> quick reminder: 
                study group starts in 10 minutes! 
                <SocialTypography variant="emoji" as="span">⏰</SocialTypography>
              </SocialTypography>
              <SocialTypography variant="timestamp" as="span">
                Just now
              </SocialTypography>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON GRID */}
      <section className="space-y-6 pt-16 border-t border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8">Typography Style Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent text-center">Minimal</h3>
            <div className="space-y-2">
              <MinimalTypography variant="title" as="h4">Study Group</MinimalTypography>
              <MinimalTypography variant="body" as="p" className="text-sm">Join us for collaborative learning</MinimalTypography>
              <MinimalTypography variant="caption" as="span">Tonight at 8pm</MinimalTypography>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent text-center">Display</h3>
            <div className="space-y-2">
              <DisplayTypography variant="headline" as="h4">Study Group</DisplayTypography>
              <DisplayTypography variant="subhead" as="p" className="text-sm">Make Your Mark</DisplayTypography>
              <DisplayTypography variant="emphasis" as="span">Join Now</DisplayTypography>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent text-center">Campus</h3>
            <div className="space-y-2">
              <CampusTypography variant="bulletin" as="h4">Study Group</CampusTypography>
              <CampusTypography variant="handwritten" as="p" className="text-sm">Coffee & algorithms! ☕</CampusTypography>
              <CampusTypography variant="sticker" as="span">TONIGHT!</CampusTypography>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent text-center">Tech</h3>
            <div className="space-y-2">
              <TechTypography variant="command" as="h4">study-group</TechTypography>
              <TechTypography variant="output" as="p" className="text-sm">execute --join session</TechTypography>
              <TechTypography variant="success" as="span">connected</TechTypography>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-accent text-center">Social</h3>
            <div className="space-y-2">
              <SocialTypography variant="friendly" as="h4">Study Group! 📚</SocialTypography>
              <SocialTypography variant="chat" as="p" className="text-sm">Who's joining tonight? 🤔</SocialTypography>
              <SocialTypography variant="hashtag" as="span">#StudyBuddies</SocialTypography>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="text-center pt-16 border-t border-accent/20">
        <p className="text-white/70 max-w-2xl mx-auto">
          Each typography style creates a distinct voice and personality. Choose based on your content's purpose 
          and the emotional connection you want to create with your users.
        </p>
      </div>
    </div>
  ),
};

export const HierarchyExamples: Story = {
  render: () => (
    <div className="bg-black text-white p-8 space-y-12">
      <h2 className="text-2xl font-bold text-accent text-center mb-8">Typography Hierarchy Examples</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Minimal Hierarchy */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-accent mb-4">Minimal Hierarchy</h3>
          <div className="border border-white/10 rounded-lg p-6 space-y-4">
            <MinimalHero>Welcome to HIVE</MinimalHero>
            <MinimalTypography variant="title" as="h2">Your Campus Community</MinimalTypography>
            <MinimalTypography variant="subtitle" as="h3">Connect, Study, and Grow</MinimalTypography>
            <MinimalTypography variant="body" as="p">
              Discover your campus community through meaningful connections and collaborative learning experiences.
            </MinimalTypography>
            <MinimalTypography variant="caption" as="p">
              Join thousands of students already building their future
            </MinimalTypography>
          </div>
        </div>
        
        {/* Display Hierarchy */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-accent mb-4">Display Hierarchy</h3>
          <div className="border border-white/10 rounded-lg p-6 space-y-4">
            <DisplayImpact>Transform Your Future</DisplayImpact>
            <DisplayTypography variant="headline" as="h2">Join the Movement</DisplayTypography>
            <DisplayTypography variant="subhead" as="h3">1,000+ Students Strong</DisplayTypography>
            <DisplayTypography variant="emphasis" as="span">Limited Time • Act Now</DisplayTypography>
          </div>
        </div>
        
        {/* Campus Hierarchy */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-accent mb-4">Campus Hierarchy</h3>
          <div className="border border-white/10 rounded-lg p-6 space-y-4">
            <CampusEnergy>Study Session Tonight! ⚡</CampusEnergy>
            <CampusTypography variant="bulletin" as="h3">CS 301 - Algorithm Review</CampusTypography>
            <CampusTypography variant="handwritten" as="p">
              Bring your laptops and questions! Pizza provided 🍕
            </CampusTypography>
            <CampusTypography variant="sticker" as="span">DON'T MISS OUT!</CampusTypography>
          </div>
        </div>
        
        {/* Social Hierarchy */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-accent mb-4">Social Hierarchy</h3>
          <div className="border border-white/10 rounded-lg p-6 space-y-4">
            <SocialFriendly>What's happening on campus? 👀</SocialFriendly>
            <SocialTypography variant="username" as="span">@campus_updates</SocialTypography>
            <SocialTypography variant="chat" as="p">
              Big things happening in the CS building today! 
              <SocialTypography variant="hashtag" as="span"> #CampusLife</SocialTypography>
            </SocialTypography>
            <div className="flex gap-2">
              <SocialTypography variant="reaction" as="span">🔥</SocialTypography>
              <SocialTypography variant="reaction" as="span">💯</SocialTypography>
              <SocialTypography variant="reaction" as="span">❤️</SocialTypography>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};