/**
 * BRAND GUIDELINES - HIVE IDENTITY SYSTEM
 * 
 * The complete visual identity guidelines for HIVE platform including logo usage,
 * voice and tone, photography standards, and University at Buffalo integration.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Crown,
  Mic,
  Camera,
  FileText,
  GraduationCap,
  Users,
  Heart,
  Zap,
  Shield,
  Target,
  MessageCircle,
  Globe
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta = {
  title: '🏆 01-Foundation/Brand Guidelines',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🏆 Brand Guidelines - HIVE Identity System

**The complete visual and verbal identity that makes HIVE the definitive campus social utility platform**

HIVE's brand identity reflects our core mission: creating authentic campus social utility that transforms how university communities coordinate, collaborate, and thrive together. Every visual element, voice choice, and content decision reinforces our position as the platform where connections have purpose and community gets things done.

## 🎯 BRAND POSITIONING

### **Core Brand Promise**
"The first social platform where connections form around solving real problems together."

### **Brand Pillars**
- **Authentic Social Utility** - Social media that actually makes campus life better
- **Campus-Native Design** - Built specifically for university community needs
- **Purpose-Driven Connection** - Every interaction moves students forward
- **Inclusive Community Building** - Tools for everyone to succeed together

## 🎨 VISUAL IDENTITY SYSTEM

### **Logo Philosophy**
The HIVE wordmark represents structured collaboration - clean, professional typography that conveys both reliability and innovation. The geometric letterforms suggest interconnected systems while maintaining approachable, human warmth.

### **Logo Usage Guidelines**
- **Primary Logo** - Full wordmark for headers, landing pages, official usage
- **Icon Mark** - Simplified H symbol for favicons, mobile apps, social media
- **Monogram** - HV combination for compact spaces, watermarks
- **Lockups** - University partnerships, co-branded applications

### **Color Applications**
- **Primary Gold** - Logo, primary actions, brand emphasis
- **Supporting Navy** - Text, structure, professional elements
- **Accent Copper** - Highlights, secondary actions, warmth
- **Campus Context** - Subtle variations for academic vs social features

### **Typography in Brand Context**
- **Headings** - Inter Semibold/Bold for clarity and modern professionalism
- **Body Text** - Inter Regular/Medium for maximum campus readability
- **UI Elements** - Consistent weight hierarchy for intuitive navigation
- **Code/Technical** - JetBrains Mono for developer and technical content

## 🗣️ VOICE & TONE GUIDELINES

### **Brand Voice Characteristics**
- **Knowledgeable** - We understand authentic campus life and student needs
- **Approachable** - Friendly, supportive, never condescending or corporate
- **Empowering** - Students can build, create, and coordinate with confidence
- **Inclusive** - Every student, every major, every campus community welcome

### **Tone Variations by Context**

#### **Academic Features**
- Professional yet supportive
- Clear, instructional language
- Focus on productivity and success
- *Example: "Coordinate study sessions that actually help everyone succeed."*

#### **Social Features**
- Warm, encouraging, community-focused
- Emphasis on authentic connections
- Celebratory of campus achievements
- *Example: "Your floor just planned the perfect movie night in under 5 minutes."*

#### **Administrative/Settings**
- Direct, transparent, trustworthy
- Clear explanations of privacy and data
- Respect for student autonomy
- *Example: "You control exactly who sees your availability and academic info."*

#### **Onboarding/Help**
- Patient, encouraging, step-by-step
- Acknowledgment of learning curve
- Emphasis on community benefits
- *Example: "Let's get you connected to your campus community. This takes about 3 minutes."*

## 📸 PHOTOGRAPHY & IMAGERY STANDARDS

### **Photography Style**
- **Authentic Campus Life** - Real students in genuine campus scenarios
- **Natural Lighting** - Bright, optimistic, energy-focused imagery
- **Diverse Representation** - All students, backgrounds, academic focuses
- **Activity-Focused** - Students collaborating, building, coordinating

### **Image Categories**

#### **Campus Scenarios**
- Study groups in libraries and residence halls
- Student organizations planning and coordinating
- Academic collaboration and project work
- Campus events and community building

#### **Tool Creation & Usage**
- Students building coordination tools
- Real campus problems being solved
- Technology enhancing (not replacing) human connection
- Before/after scenarios showing improved coordination

#### **Community Building**
- Residence hall floor communities
- Academic department connections
- Club and organization collaboration
- Cross-campus relationship building

### **Technical Specifications**
- **Resolution** - High resolution for all use cases (min 1200px wide)
- **Format** - WebP preferred, JPEG fallback, PNG for graphics
- **Aspect Ratios** - 16:9 for headers, 4:3 for cards, 1:1 for profiles
- **Accessibility** - Alt text for all images, meaningful descriptions

## 🎓 UNIVERSITY AT BUFFALO INTEGRATION

### **Co-Branding Guidelines**
- HIVE logo + "at University at Buffalo" lockup
- UB official colors as accent elements
- Respect for UB brand guidelines and partnership
- Campus-specific imagery and terminology

### **Campus Context Applications**
- **Academic Calendar** - Semester schedules, finals weeks, breaks
- **Campus Geography** - North/South campus references, building names
- **UB Culture** - Bulls athletics, campus traditions, local references
- **Student Life** - Residence halls, dining, campus organizations

### **Buffalo Community Context**
- Western New York weather and seasonal awareness
- Local business and community integration
- Buffalo cultural references and pride
- Regional terminology and expressions

## 📝 CONTENT GUIDELINES

### **Writing Principles**
- **Student-First Language** - How students actually talk to each other
- **Action-Oriented** - Focus on what students can accomplish
- **Community-Focused** - Emphasis on collective success and coordination
- **Problem-Solving** - Address real campus pain points directly

### **Content Types & Voice**

#### **Marketing & Landing Pages**
- Bold, confident claims about campus transformation
- Social proof through real student scenarios
- Clear differentiation from traditional social media
- Call-to-action focused on community building

#### **In-App Content**
- Helpful, contextual guidance
- Celebration of student achievements
- Clear next steps and action opportunities
- Community-building encouragement

#### **Help & Documentation**
- Step-by-step, patient instruction
- Real campus use case examples
- Troubleshooting with empathy
- Community forum integration

#### **Email Communications**
- Personal, relevant, actionable
- Campus event and deadline awareness
- Community highlights and achievements
- Privacy-respectful frequency

## 🛡️ BRAND PROTECTION

### **Do's**
- Use official logo files and brand assets
- Maintain proper spacing and proportions
- Apply brand voice consistently across all touchpoints
- Respect University at Buffalo partnership guidelines
- Focus on authentic campus utility in all communications

### **Don'ts**
- Don't use unofficial logo variations or recreations
- Don't combine with competitor branding
- Don't use corporate or sales-focused language
- Don't ignore accessibility requirements
- Don't misrepresent campus partnerships or endorsements

### **Usage Approval**
- Official marketing materials require brand team review
- Campus partnership content needs UB approval
- Third-party integrations must follow brand guidelines
- Student organization usage encouraged with proper attribution

## 🎨 BRAND APPLICATION EXAMPLES

### **Digital Applications**
- Website headers and navigation
- Mobile app icons and splash screens
- Social media profiles and content
- Email signatures and templates

### **Campus Applications**
- Student organization presentations
- Campus event promotion
- Academic department integration
- Residence hall community building

### **Partnership Applications**
- University official communications
- Student government collaboration
- Campus service integration
- Alumni and donor engagement
        `
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// BRAND COMPONENTS DATA
// =============================================================================

const brandPillars = [
  {
    icon: Target,
    title: 'Authentic Social Utility',
    description: 'Social media that actually makes campus life better',
    examples: ['Study coordination tools', 'Event planning utilities', 'Community resource sharing']
  },
  {
    icon: GraduationCap,
    title: 'Campus-Native Design',
    description: 'Built specifically for university community needs',
    examples: ['Academic calendar integration', 'Residence hall coordination', 'Course-aware tools']
  },
  {
    icon: Users,
    title: 'Purpose-Driven Connection',
    description: 'Every interaction moves students forward',
    examples: ['Project collaboration', 'Study group formation', 'Academic support networks']
  },
  {
    icon: Heart,
    title: 'Inclusive Community Building',
    description: 'Tools for everyone to succeed together',
    examples: ['Diverse representation', 'Accessibility-first design', 'Multiple participation levels']
  }
];

const voiceTones = [
  {
    context: 'Academic Features',
    tone: 'Professional yet supportive',
    characteristics: ['Clear, instructional language', 'Focus on productivity', 'Success-oriented'],
    example: 'Coordinate study sessions that actually help everyone succeed.'
  },
  {
    context: 'Social Features',
    tone: 'Warm, encouraging, community-focused',
    characteristics: ['Emphasis on authentic connections', 'Celebratory language', 'Community achievements'],
    example: 'Your floor just planned the perfect movie night in under 5 minutes.'
  },
  {
    context: 'Administrative/Settings',
    tone: 'Direct, transparent, trustworthy',
    characteristics: ['Clear privacy explanations', 'Respect for autonomy', 'Honest communication'],
    example: 'You control exactly who sees your availability and academic info.'
  },
  {
    context: 'Onboarding/Help',
    tone: 'Patient, encouraging, step-by-step',
    characteristics: ['Learning curve acknowledgment', 'Community benefits focus', 'Supportive guidance'],
    example: 'Let\'s get you connected to your campus community. This takes about 3 minutes.'
  }
];

const contentTypes = [
  {
    type: 'Marketing & Landing Pages',
    approach: 'Bold, confident claims about campus transformation',
    focus: 'Social proof through real student scenarios',
    callToAction: 'Community building and platform adoption'
  },
  {
    type: 'In-App Content',
    approach: 'Helpful, contextual guidance',
    focus: 'Celebration of student achievements',
    callToAction: 'Next steps and action opportunities'
  },
  {
    type: 'Help & Documentation',
    approach: 'Step-by-step, patient instruction',
    focus: 'Real campus use case examples',
    callToAction: 'Community forum integration'
  },
  {
    type: 'Email Communications',
    approach: 'Personal, relevant, actionable',
    focus: 'Campus event and deadline awareness',
    callToAction: 'Community highlights and engagement'
  }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const BrandPillarsShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        HIVE Brand Pillars
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brandPillars.map((pillar, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[var(--hive-text-primary)]">
                <div className="p-2 rounded-lg bg-[var(--hive-brand-primary)]/10">
                  <pillar.icon className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                </div>
                {pillar.title}
              </CardTitle>
              <p className="text-[var(--hive-text-secondary)]">{pillar.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium text-[var(--hive-text-primary)]">Examples:</div>
                <div className="space-y-1">
                  {pillar.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                      <div className="w-1 h-1 rounded-full bg-[var(--hive-brand-primary)]" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const VoiceAndToneShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Voice & Tone Guidelines
      </h3>
      
      <div className="space-y-4">
        {voiceTones.map((voice, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                    <span className="font-semibold text-[var(--hive-text-primary)]">{voice.context}</span>
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)] mb-3">{voice.tone}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {voice.characteristics.map((char, charIndex) => (
                      <Badge key={charIndex} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                  <div className="p-3 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg">
                    <div className="text-xs text-[var(--hive-text-muted)] mb-1">Example:</div>
                    <div className="text-sm text-[var(--hive-text-primary)] italic">
                      "{voice.example}"
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const LogoUsageShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Logo Usage Guidelines
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Primary Logo', usage: 'Headers, landing pages, official usage', size: 'large' },
          { name: 'Icon Mark', usage: 'Favicons, mobile apps, social media', size: 'medium' },
          { name: 'Monogram', usage: 'Compact spaces, watermarks', size: 'small' },
          { name: 'UB Lockup', usage: 'University partnerships, co-branding', size: 'large' }
        ].map((logo, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardContent className="p-6 text-center">
              <div className={`bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg mb-4 flex items-center justify-center ${
                logo.size === 'large' ? 'h-24' : logo.size === 'medium' ? 'h-16' : 'h-12'
              }`}>
                <div className="font-bold text-[var(--hive-brand-primary)]">
                  {logo.name === 'Icon Mark' ? 'H' : 
                   logo.name === 'Monogram' ? 'HV' :
                   logo.name === 'UB Lockup' ? 'HIVE @ UB' : 'HIVE'}
                </div>
              </div>
              <div className="font-medium text-[var(--hive-text-primary)] mb-2">{logo.name}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">{logo.usage}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ContentGuidelinesShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Content Guidelines
      </h3>
      
      <div className="space-y-4">
        {contentTypes.map((content, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
                <FileText className="w-5 h-5" />
                {content.type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Approach</div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">{content.approach}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Focus</div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">{content.focus}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Call to Action</div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">{content.callToAction}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// BRAND GUIDELINES MAIN COMPONENT
// =============================================================================

const BrandGuidelinesSystem = () => {
  const [activeSection, setActiveSection] = useState('pillars');

  const sections = [
    { id: 'pillars', label: 'Brand Pillars', icon: Crown },
    { id: 'voice', label: 'Voice & Tone', icon: Mic },
    { id: 'logo', label: 'Logo Usage', icon: Shield },
    { id: 'content', label: 'Content Guidelines', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Crown className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Brand Guidelines
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                HIVE Identity System
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The complete visual and verbal identity that makes HIVE the definitive campus social utility platform. 
            Every element designed to reinforce authentic community building at University at Buffalo.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'primary' : 'secondary'}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {activeSection === 'pillars' && <BrandPillarsShowcase />}
          {activeSection === 'voice' && <VoiceAndToneShowcase />}
          {activeSection === 'logo' && <LogoUsageShowcase />}
          {activeSection === 'content' && <ContentGuidelinesShowcase />}
        </div>

        {/* University at Buffalo Integration */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <GraduationCap className="w-5 h-5" />
              University at Buffalo Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Campus Brand Integration</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Co-branding with official UB identity guidelines
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Campus-specific imagery and terminology
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Academic calendar and cultural integration
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Buffalo Community Context</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Western New York cultural awareness
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Local business and community integration
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Regional terminology and expressions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const CompleteBrandSystem: Story = {
  render: () => <BrandGuidelinesSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete HIVE brand guidelines including pillars, voice and tone, logo usage, and content guidelines optimized for University at Buffalo campus integration.'
      }
    }
  }
};

export const BrandPillars: Story = {
  render: () => <BrandPillarsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Four core brand pillars that define HIVE\'s position as the authentic campus social utility platform.'
      }
    }
  }
};

export const VoiceAndTone: Story = {
  render: () => <VoiceAndToneShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Voice and tone guidelines with context-specific examples for academic, social, administrative, and onboarding scenarios.'
      }
    }
  }
};

export const LogoUsage: Story = {
  render: () => <LogoUsageShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive logo usage guidelines including primary logo, icon mark, monogram, and University at Buffalo lockups.'
      }
    }
  }
};

export const ContentGuidelines: Story = {
  render: () => <ContentGuidelinesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Content creation guidelines for different content types including marketing, in-app content, documentation, and communications.'
      }
    }
  }
};