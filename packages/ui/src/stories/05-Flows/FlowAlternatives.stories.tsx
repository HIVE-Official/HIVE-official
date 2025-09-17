import type { Meta, StoryObj } from '@storybook/react';
import { 
  InstantActivationFlow,
  CommunityFirstFlow,
  AcademicFirstFlow,
  GamifiedFlow,
  ProgressiveWizardFlow
} from '../../components/onboarding-flows/flow-alternatives';

const meta = {
  component: () => null,
  title: 'Onboarding Flows/🚀 Flow Alternatives',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Onboarding & Authentication Flow Alternatives

Five distinct onboarding and authentication flows designed to test different user psychology approaches and onboarding philosophies. Each flow optimizes for different user types and conversion goals.

## 🎯 **Flow Philosophies**

### 1. **Instant Activation** - Minimize Friction
- **Goal**: Get users into the product as quickly as possible
- **Psychology**: Reduce cognitive load and onboarding friction
- **Best for**: User acquisition and immediate engagement
- **Key Feature**: Skip heavy setup, learn through usage

### 2. **Community-First** - Social Discovery
- **Goal**: Lead with social proof and community discovery
- **Psychology**: FOMO and social belonging drive engagement
- **Best for**: Viral growth and network effects
- **Key Feature**: Live community preview before signup

### 3. **Academic-First** - Educational Context
- **Goal**: Establish academic credibility and context
- **Psychology**: Institution trust and academic identity
- **Best for**: Faculty adoption and academic legitimacy
- **Key Feature**: Academic credentials and institutional focus

### 4. **Gamified** - Achievement & Progress
- **Goal**: Make onboarding fun and engaging
- **Psychology**: Achievement motivation and progress satisfaction
- **Best for**: Young users and engagement retention
- **Key Feature**: XP system, quests, and achievements

### 5. **Progressive Wizard** - Structured & Complete
- **Goal**: Comprehensive data collection with clear progress
- **Psychology**: Completion commitment and structured guidance
- **Best for**: Complete user profiles and data quality
- **Key Feature**: Step-by-step progress with clear indicators

## 🎨 **Design Quality Features**

### **Consistent Brand System**
- **Colors**: var(--hive-gold) gold with proper contrast ratios
- **Typography**: Geist Sans for professional readability
- **Spacing**: 8px grid system throughout
- **Motion**: Smooth transitions and micro-interactions

### **User Experience Patterns**
- **Progressive Disclosure**: Information revealed when needed
- **Visual Feedback**: Loading states, success indicators, errors
- **Mobile-First**: Responsive design for all screen sizes
- **Accessibility**: Proper focus states and keyboard navigation

### **Conversion Optimization**
- **Clear CTAs**: Prominent action buttons with appropriate language
- **Progress Indicators**: Users understand their position in the flow
- **Error Prevention**: Form validation and helpful error messages
- **Skip Options**: Flexibility for different user preferences

## 🧪 **A/B Testing Applications**

Each flow targets different user segments:

### **Instant Activation**
- **Target**: Impatient users who want immediate value
- **Metrics**: Time to first action, signup completion rate
- **Hypothesis**: Reduced friction increases conversion

### **Community-First**
- **Target**: Socially motivated users seeking belonging
- **Metrics**: Community engagement, user retention
- **Hypothesis**: Social proof increases signup intent

### **Academic-First**
- **Target**: Faculty and academically-focused users
- **Metrics**: Faculty adoption, institutional credibility
- **Hypothesis**: Academic context builds trust

### **Gamified**
- **Target**: Young users who enjoy achievement systems
- **Metrics**: Engagement time, profile completion rate
- **Hypothesis**: Gamification increases completion

### **Progressive Wizard**
- **Target**: Users who prefer structured, complete experiences
- **Metrics**: Data quality, profile completeness
- **Hypothesis**: Clear progress increases commitment

## 📊 **Flow Comparison Matrix**

| Flow | Signup Speed | Data Quality | User Engagement | Social Proof |
|------|-------------|-------------|----------------|-------------|
| Instant | ⚡⚡⚡ | ⭐⭐ | ⭐⭐ | ⭐ |
| Community | ⚡⚡ | ⭐⭐⭐ | ⭐⭐⭐ | ⚡⚡⚡ |
| Academic | ⚡⚡ | ⚡⚡⚡ | ⭐⭐ | ⭐⭐ |
| Gamified | ⚡ | ⭐⭐⭐ | ⚡⚡⚡ | ⭐⭐ |
| Progressive | ⚡ | ⚡⚡⚡ | ⭐⭐ | ⭐⭐ |

## 🔧 **Implementation Notes**

### **Technical Requirements**
- Magic link authentication system
- Email verification flow
- School/institution database
- Community preview API
- Progress state management

### **Analytics Events**
- Flow start and completion rates
- Step abandonment points
- Time spent per step
- User segment conversion rates

### **Responsive Design**
- Mobile-first approach
- Touch-friendly interaction areas
- Keyboard navigation support
- Screen reader accessibility

Each flow is production-ready and can be deployed independently for A/B testing different user segments and conversion optimization strategies.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const InstantActivation: Story = {
  render: () => <InstantActivationFlow />,
  parameters: {
    docs: {
      description: {
        story: `
### Instant Activation Flow
Minimize friction and get users into the product as quickly as possible. Perfect for users who want immediate value and are resistant to lengthy onboarding processes.

**Key Features:**
- Minimal form fields (just email and name)
- Skip option for immediate exploration
- Magic link authentication
- Progressive profile building after signup

**Best for:** User acquisition, mobile users, impatient segments
        `,
      },
    },
  },
};

export const CommunityFirst: Story = {
  render: () => <CommunityFirstFlow />,
  parameters: {
    docs: {
      description: {
        story: `
### Community-First Flow
Lead with social proof and community discovery. Shows active communities and member counts before requiring signup to create FOMO and demonstrate value.

**Key Features:**
- Live community preview with member counts
- Social proof through activity indicators
- Community selection before authentication
- Social belonging motivation

**Best for:** Viral growth, social users, network effects
        `,
      },
    },
  },
};

export const AcademicFirst: Story = {
  render: () => <AcademicFirstFlow />,
  parameters: {
    docs: {
      description: {
        story: `
### Academic-First Flow
Establish academic credibility and context. Perfect for faculty and academically-focused users who value institutional trust and educational legitimacy.

**Key Features:**
- Academic role selection (student/faculty/staff)
- Educational credentials collection
- Institution-focused messaging
- Academic community preview

**Best for:** Faculty adoption, institutional credibility, academic users
        `,
      },
    },
  },
};

export const Gamified: Story = {
  render: () => <GamifiedFlow />,
  parameters: {
    docs: {
      description: {
        story: `
### Gamified Flow
Make onboarding fun and engaging through achievement systems, XP points, and quest-based progression. Perfect for younger users who enjoy game-like experiences.

**Key Features:**
- XP system with point rewards
- Achievement unlocks and badges
- Quest-based progression
- Level up celebrations

**Best for:** Young users, engagement retention, completion rates
        `,
      },
    },
  },
};

export const ProgressiveWizard: Story = {
  render: () => <ProgressiveWizardFlow />,
  parameters: {
    docs: {
      description: {
        story: `
### Progressive Wizard Flow
Traditional step-by-step onboarding with clear progress indicators. Comprehensive data collection with structured guidance for users who prefer complete experiences.

**Key Features:**
- Clear step-by-step progression
- Progress bar with completion percentage
- Back/forward navigation
- Comprehensive data collection

**Best for:** Complete user profiles, data quality, structured users
        `,
      },
    },
  },
};

export const AllFlowsComparison: Story = {
  render: () => (
    <div className="bg-[var(--hive-black)] text-[var(--hive-text-primary)] font-['Geist_Sans']">
      <div className="p-8 text-center border-b border-[var(--hive-white)]/10">
        <h1 className="text-3xl font-bold mb-4">HIVE Onboarding Flow Alternatives</h1>
        <p className="text-[var(--hive-text-primary)]/70 max-w-3xl mx-auto leading-relaxed">
          Five distinct onboarding approaches optimized for different user psychology and conversion goals. 
          Each flow targets specific user segments and optimizes for different success metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-8">
        {/* Instant Activation Preview */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-[var(--hive-black)] border border-[var(--hive-white)]/10 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-gold)]/5 to-transparent"></div>
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 bg-[var(--hive-gold)] rounded-2xl flex items-center justify-center mb-4">
                <span className="font-black text-[var(--hive-black)] text-lg">H</span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold">Instant Activation</div>
                <div className="text-xs text-[var(--hive-text-primary)]/60">30-second signup</div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="h-8 bg-[var(--hive-white)]/10 rounded"></div>
                <div className="h-8 bg-[var(--hive-white)]/10 rounded"></div>
                <div className="h-8 bg-[var(--hive-gold)]/20 rounded"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Instant Activation</h3>
            <p className="text-sm text-[var(--hive-text-primary)]/70 leading-relaxed">
              Minimize friction, get users into product immediately
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">⚡ Fast</span>
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">📱 Mobile</span>
            </div>
          </div>
        </div>

        {/* Community-First Preview */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-[var(--hive-black)] border border-[var(--hive-white)]/10 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
                <span className="font-black text-[var(--hive-text-primary)] text-lg">👥</span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold">Community-First</div>
                <div className="text-xs text-[var(--hive-text-primary)]/60">Social discovery</div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="h-6 bg-accent/20 rounded"></div>
                <div className="h-6 bg-accent/20 rounded"></div>
                <div className="h-6 bg-accent/20 rounded"></div>
                <div className="h-6 bg-accent/20 rounded"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Community-First</h3>
            <p className="text-sm text-[var(--hive-text-primary)]/70 leading-relaxed">
              Lead with social proof and community discovery
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">🌐 Social</span>
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">💫 FOMO</span>
            </div>
          </div>
        </div>

        {/* Academic-First Preview */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-[var(--hive-black)] border border-[var(--hive-white)]/10 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
                <span className="font-black text-[var(--hive-text-primary)] text-lg">🎓</span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold">Academic-First</div>
                <div className="text-xs text-[var(--hive-text-primary)]/60">Educational context</div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="h-10 bg-accent/20 rounded"></div>
                <div className="h-10 bg-accent/20 rounded"></div>
                <div className="h-10 bg-accent/20 rounded"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Academic-First</h3>
            <p className="text-sm text-[var(--hive-text-primary)]/70 leading-relaxed">
              Establish academic credibility and institutional trust
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">🎓 Academic</span>
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">✅ Trust</span>
            </div>
          </div>
        </div>

        {/* Gamified Preview */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-[var(--hive-black)] border border-[var(--hive-white)]/10 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-gold)]/5 to-transparent"></div>
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 bg-[var(--hive-gold)] rounded-2xl flex items-center justify-center mb-4">
                <span className="font-black text-[var(--hive-black)] text-lg">🏆</span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold">Gamified</div>
                <div className="text-xs text-[var(--hive-text-primary)]/60">Achievement system</div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="h-2 bg-[var(--hive-gold)]/20 rounded-full">
                  <div className="h-2 bg-[var(--hive-gold)] rounded-full w-3/4"></div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-[var(--hive-gold)]">Level 2</div>
                  <div className="text-xs text-[var(--hive-text-primary)]/60">75 XP</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Gamified</h3>
            <p className="text-sm text-[var(--hive-text-primary)]/70 leading-relaxed">
              Make onboarding fun with achievements and progress
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded">🎮 Game</span>
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">🚀 Engage</span>
            </div>
          </div>
        </div>

        {/* Progressive Wizard Preview */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-[var(--hive-black)] border border-[var(--hive-white)]/10 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
                <span className="font-black text-[var(--hive-text-primary)] text-lg">📋</span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold">Progressive Wizard</div>
                <div className="text-xs text-[var(--hive-text-primary)]/60">Step-by-step</div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="text-xs text-[var(--hive-text-primary)]/60 text-center">Step 3 of 5</div>
                <div className="h-2 bg-[var(--hive-white)]/10 rounded-full">
                  <div className="h-2 bg-accent rounded-full w-3/5"></div>
                </div>
                <div className="h-8 bg-[var(--hive-white)]/10 rounded"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Progressive Wizard</h3>
            <p className="text-sm text-[var(--hive-text-primary)]/70 leading-relaxed">
              Structured guidance with clear progress indicators
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">📊 Complete</span>
              <span className="px-2 py-1 bg-accent/20 text-accent rounded">📋 Guided</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border-t border-[var(--hive-white)]/5 p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Flow Comparison Matrix</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-6 gap-4 text-sm">
            <div className="font-semibold">Flow</div>
            <div className="font-semibold text-center">Speed</div>
            <div className="font-semibold text-center">Data Quality</div>
            <div className="font-semibold text-center">Engagement</div>
            <div className="font-semibold text-center">Social Proof</div>
            <div className="font-semibold text-center">Best For</div>
            
            <div className="font-medium">Instant</div>
            <div className="text-center">⚡⚡⚡</div>
            <div className="text-center">⭐⭐</div>
            <div className="text-center">⭐⭐</div>
            <div className="text-center">⭐</div>
            <div className="text-center text-xs">Acquisition</div>
            
            <div className="font-medium">Community</div>
            <div className="text-center">⚡⚡</div>
            <div className="text-center">⭐⭐⭐</div>
            <div className="text-center">⭐⭐⭐</div>
            <div className="text-center">⚡⚡⚡</div>
            <div className="text-center text-xs">Viral Growth</div>
            
            <div className="font-medium">Academic</div>
            <div className="text-center">⚡⚡</div>
            <div className="text-center">⚡⚡⚡</div>
            <div className="text-center">⭐⭐</div>
            <div className="text-center">⭐⭐</div>
            <div className="text-center text-xs">Faculty</div>
            
            <div className="font-medium">Gamified</div>
            <div className="text-center">⚡</div>
            <div className="text-center">⭐⭐⭐</div>
            <div className="text-center">⚡⚡⚡</div>
            <div className="text-center">⭐⭐</div>
            <div className="text-center text-xs">Young Users</div>
            
            <div className="font-medium">Progressive</div>
            <div className="text-center">⚡</div>
            <div className="text-center">⚡⚡⚡</div>
            <div className="text-center">⭐⭐</div>
            <div className="text-center">⭐⭐</div>
            <div className="text-center text-xs">Complete Data</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Flow Comparison Overview
Side-by-side comparison of all five onboarding flows, showing different approaches to user onboarding with their respective strengths and target audiences.
        `,
      },
    },
  },
};