import type { Meta, StoryObj } from '@storybook/react';
import { HiveOnboardingWizard, OnboardingProvider, useOnboarding, type OnboardingStep } from './hive-onboarding-wizard';
import { useState } from 'react';

// =============================================================================
// HIVE ONBOARDING WIZARD DOCUMENTATION
// =============================================================================

/**
 * # HIVE Onboarding Wizard Component
 * 
 * ## Overview
 * The HiveOnboardingWizard is a comprehensive multi-step onboarding system designed to guide new university students 
 * through their initial HIVE profile setup. It collects essential information while introducing students to the platform's 
 * core concepts and building their excitement for the HIVE experience.
 * 
 * ## Key Features
 * - **8-Step Onboarding Flow**: Welcome → Name → Handle → Photo → Academics → Builder → Legal → Complete
 * - **Progressive Profile Building**: Collects user information step by step with validation
 * - **Builder Journey Assessment**: Evaluates technical experience and goals
 * - **University Integration**: Captures academic information and campus affiliation
 * - **Legal Compliance**: Terms of service, privacy policy, and community guidelines
 * - **State Management**: Built-in context for managing onboarding state and progress
 * - **Validation & Error Handling**: Comprehensive form validation with helpful error messages
 * - **Responsive Design**: Optimized for both desktop and mobile experiences
 * - **HIVE Brand Integration**: Consistent styling with semantic CSS tokens
 * 
 * ## Onboarding Flow Steps
 * 1. **Welcome**: Introduction to HIVE with value proposition
 * 2. **Name**: Full name collection for community building
 * 3. **Handle**: Unique username (@handle) selection
 * 4. **Photo**: Optional profile photo upload with drag & drop
 * 5. **Academics**: University, major, and graduation year
 * 6. **Builder**: Technical experience and platform goals assessment
 * 7. **Legal**: Terms of service, privacy policy, and community guidelines
 * 8. **Complete**: Success screen with next steps
 * 
 * ## Context Architecture
 * The component uses React Context for comprehensive state management:
 * - OnboardingProvider: Manages onboarding state and navigation
 * - useOnboarding hook: Provides access to state and actions
 * - Step validation with canProceed() logic
 * - Back/forward navigation with error handling
 * 
 * ## University Student Focus
 * - Designed specifically for university .edu email holders
 * - Academic information collection (major, graduation year)
 * - Builder experience assessment from none to advanced
 * - Campus community integration preparation
 * - Professional profile development
 * 
 * ## Data Collection Strategy
 * - **Personal Identity**: Name, handle, photo for community building
 * - **Academic Context**: University affiliation, major, graduation year
 * - **Technical Profile**: Builder experience level and goals
 * - **Legal Compliance**: Required agreements for platform use
 * - **Progressive Disclosure**: Information collected when most relevant
 * 
 * ## Builder Experience Assessment
 * - **Experience Levels**: None, Beginner, Intermediate, Advanced
 * - **Goal Categories**: Learn to build, Solve campus problems, Connect with builders, Create impact
 * - **Personalization**: Platform experience customized based on responses
 * - **Growth Tracking**: Baseline for measuring student development
 * 
 * ## Mobile Experience
 * - Touch-friendly interface with large interactive targets
 * - Optimized form layouts for mobile keyboards
 * - Responsive image upload with drag & drop alternatives
 * - Thumb-reachable navigation and controls
 * 
 * ## Brand Consistency
 * - HIVE semantic CSS tokens (--hive-*) throughout
 * - Glass morphism design system
 * - Consistent typography and spacing
 * - Brand-appropriate animations and transitions
 */

// Story Configuration
const meta: Meta<typeof HiveOnboardingWizard> = {
  title: '03-Organisms/Onboarding System/HiveOnboardingWizard',
  component: HiveOnboardingWizard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## HIVE Student Onboarding System

The HiveOnboardingWizard provides a comprehensive first-time user experience designed specifically for university students joining the HIVE platform. It combines profile setup with platform education to create engaging and informative onboarding.

### Core Functionality
- **8-step guided flow** from welcome to completion
- **Progressive data collection** with step-by-step validation
- **Builder experience assessment** for platform personalization
- **Academic information gathering** for campus community building
- **Legal compliance handling** with clear agreement workflows

### Educational Approach
The onboarding doesn't just collect data—it educates students about HIVE's capabilities:
1. **Platform Introduction**: Clear value proposition and community focus
2. **Profile Building**: Importance of authentic campus identity
3. **Builder Journey**: Technical skill assessment and growth planning
4. **Community Standards**: Legal and social expectations

### University Integration
Designed specifically for university environments with:
- Academic information collection (major, graduation year)
- University-specific customization capabilities
- Campus community preparation
- Academic calendar integration planning

### State Management
Uses React Context for sophisticated state management across all onboarding steps, with validation, error handling, and progress tracking.

### Mobile Optimization
Fully responsive with mobile-first design principles, optimized for students who primarily use mobile devices.
        `
      }
    }
  },
  argTypes: {
    initialStep: {
      control: 'select',
      options: ['welcome', 'name', 'handle', 'photo', 'academics', 'builder', 'legal', 'complete'],
      description: 'Initial onboarding step to display'
    },
    mockMode: {
      control: 'boolean',
      description: 'Enable mock mode for Storybook demonstrations'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// COMPLETE ONBOARDING FLOW STORIES
// =============================================================================

/**
 * Default welcome screen - the entry point for new students
 */
export const Default: Story = {
  args: {
    initialStep: 'welcome',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding complete:', userData);
      alert(`Welcome to HIVE, ${userData.name}! Your builder profile is ready.`);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Welcome Screen - Onboarding Entry Point**

The welcome screen sets the tone for the entire HIVE experience with:
- **Clear Value Proposition**: What HIVE offers to university students
- **Process Overview**: What students will accomplish during onboarding
- **Community Focus**: Emphasis on campus builder community
- **Visual Branding**: HIVE logo and brand elements
- **Getting Started**: Clear call-to-action to begin the journey

Key elements:
- Animated HIVE logo to create visual interest
- Three-column overview of what students will do
- Encouraging messaging about campus transformation
- Professional yet approachable design
- Progress indicator to show this is step 1 of 8

This screen should build excitement while setting clear expectations for the onboarding process.
        `
      }
    }
  }
};

/**
 * Personal identity setup - name collection
 */
export const NameStep: Story = {
  args: {
    initialStep: 'name',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Name step complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Name Collection - Personal Identity**

The name step establishes personal identity within the HIVE community:
- **Full Name Collection**: Real names for authentic campus community
- **Community Context**: Explanation of how names are used
- **Validation**: Minimum 2 characters with real-time feedback
- **Progress Tracking**: Clear indication of step 2 of 8
- **Navigation**: Back button to return to welcome

Design considerations:
- Large, friendly input field
- Clear labeling and placeholder text
- Immediate validation feedback
- Professional appearance appropriate for university setting
- Error handling with helpful guidance

The name becomes the foundation for the student's HIVE identity and community presence.
        `
      }
    }
  }
};

/**
 * Username selection - @handle creation
 */
export const HandleStep: Story = {
  args: {
    initialStep: 'handle',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Handle step complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Handle Creation - Unique Identity**

The handle step creates a unique platform identifier:
- **@Username Format**: Clear @ symbol prefix display
- **Availability Checking**: Real-time validation feedback
- **Character Restrictions**: Letters, numbers, and underscores only
- **Minimum Length**: 3 character requirement
- **Usage Explanation**: How handles are used for mentions and discovery

Key features:
- Automatic @ symbol display
- Input sanitization (removes @ if typed)
- Green checkmark for available handles
- Clear error messaging for invalid formats
- Professional appearance for university context

The handle becomes the student's unique identifier for collaboration and community building.
        `
      }
    }
  }
};

/**
 * Profile photo upload - visual identity
 */
export const PhotoStep: Story = {
  args: {
    initialStep: 'photo',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Photo step complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Photo Upload - Visual Identity**

The photo step adds visual identity to the student's profile:
- **Optional Upload**: Students can skip this step if preferred
- **Drag & Drop Interface**: Modern file upload experience
- **Click to Browse**: Alternative upload method
- **Image Preview**: Immediate feedback with circular crop preview
- **Remove Option**: Ability to change or remove uploaded photo
- **File Validation**: Image format and size checking

Advanced features:
- Drag state visual feedback
- Large drop zone for easy targeting
- Professional circular crop preview
- Clean removal interaction
- Mobile-friendly upload options

Photos help create authentic campus community connections and improve recognition at in-person events.
        `
      }
    }
  }
};

/**
 * Academic information - university integration
 */
export const AcademicsStep: Story = {
  args: {
    initialStep: 'academics',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Academics step complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Academic Information - University Integration**

The academics step connects students to their university context:
- **University Search**: Search-enabled university selection
- **Major/Field**: Academic discipline for community matching
- **Graduation Year**: Academic timeline and cohort identification
- **Community Building**: Information used for relevant space recommendations
- **Academic Calendar**: Integration with university academic cycles

Form design:
- Search icon and functionality for university field
- Free-form major input for flexibility
- Dropdown graduation year selection
- Clear validation requirements
- Professional academic appearance

This information enables HIVE to recommend relevant academic spaces, connect students with peers in their field, and provide appropriate tools and resources.
        `
      }
    }
  }
};

/**
 * Builder experience assessment - technical profiling
 */
export const BuilderStep: Story = {
  args: {
    initialStep: 'builder',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Builder step complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Builder Experience Assessment - Technical Profiling**

The builder step assesses technical experience and platform goals:

### **Experience Levels**
- **None**: New to building digital tools
- **Beginner**: Some basic coding or tool-building experience  
- **Intermediate**: Built apps or tools before
- **Advanced**: Experienced developer or maker

### **Platform Goals** (Multi-select)
- **Learn to Build**: Educational focus and skill development
- **Solve Campus Problems**: Practical problem-solving orientation
- **Connect with Builders**: Community and networking focus
- **Create Campus Impact**: Leadership and influence goals

### **Personalization Benefits**
- Customized platform experience based on skill level
- Appropriate tool recommendations and tutorials
- Relevant community and collaboration suggestions
- Growth tracking from baseline assessment

### **UI/UX Design**
- Radio button experience selection with descriptions
- Multi-select goal buttons with icons
- Visual feedback for selections
- Professional assessment appearance
- Clear explanations of how information is used

This assessment enables HIVE to provide personalized experiences that match each student's technical background and aspirations.
        `
      }
    }
  }
};

/**
 * Legal agreements - compliance and community standards
 */
export const LegalStep: Story = {
  args: {
    initialStep: 'legal',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Legal step complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Legal Agreements - Compliance and Community Standards**

The legal step ensures compliance and sets community expectations:

### **Required Agreements**
- **Terms of Service**: Platform usage terms and acceptable use policy
- **Privacy Policy**: Data collection, usage, and protection practices  
- **Community Guidelines**: Social norms and behavior expectations

### **Compliance Features**
- **Individual Checkboxes**: Separate acknowledgment for each agreement
- **Clear Descriptions**: Plain language explanation of each agreement
- **Age Verification**: Confirmation of 13+ age requirement
- **Required Completion**: Cannot proceed without all agreements

### **Legal Design**
- Professional checkbox styling
- Clear, readable agreement descriptions
- Structured layout for easy scanning
- Visual indication of required vs. optional items
- Accessible form controls

### **University Context**
- Appropriate for educational environments
- Compliance with FERPA and educational privacy requirements
- Community standards suitable for campus environments
- Professional tone appropriate for academic settings

This step ensures students understand their rights, responsibilities, and the community standards that make HIVE a positive campus environment.
        `
      }
    }
  }
};

/**
 * Completion screen - success and next steps
 */
export const CompleteStep: Story = {
  args: {
    initialStep: 'complete',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Completion Screen - Success and Next Steps**

The completion screen celebrates successful onboarding and guides next steps:

### **Success Celebration**
- **Personal Welcome**: Uses student's name for personalization
- **Achievement Recognition**: Acknowledges completed profile setup
- **Visual Success**: Animated checkmark and celebration design
- **Platform Introduction**: "Transform your campus experience" messaging

### **Next Steps Guidance**
- **Explore Spaces**: Pre-seeded campus communities to join
- **Create Tools**: Introduction to HiveLAB tool building
- **Connect with Builders**: Community networking opportunities
- **Clear Progression**: Logical next actions for platform engagement

### **Auto-Completion**
- **Automatic Transition**: 2-second delay before completion callback
- **Loading Indicator**: Shows profile setup in progress
- **Smooth Experience**: Seamless transition to main platform

### **Welcome Design**
- Celebratory visual design with animations
- Personal touch with student's name
- Professional achievement recognition
- Excitement building for platform use

This screen ensures students feel accomplished and excited to begin using HIVE for their campus experience.
        `
      }
    }
  }
};

// =============================================================================
// INTERACTIVE FLOW DEMONSTRATION
// =============================================================================

/**
 * Interactive demo showing complete onboarding flow navigation
 */
export const InteractiveFlowDemo: Story = {
  render: () => {
    const [completedData, setCompletedData] = useState<any>(null);
    const [currentProgress, setCurrentProgress] = useState(0);
    
    const handleComplete = (userData: any) => {
      setCompletedData(userData);
      console.log('Interactive demo complete:', userData);
    };

    // Progress tracker component
    const ProgressTracker = () => {
      const { state } = useOnboarding();
      const steps = ['welcome', 'name', 'handle', 'photo', 'academics', 'builder', 'legal', 'complete'];
      const currentIndex = steps.indexOf(state.step);
      
      React.useEffect(() => {
        setCurrentProgress(((currentIndex + 1) / steps.length) * 100);
      }, [currentIndex]);

      return (
        <div className="fixed top-4 left-4 right-4 z-50">
          <div className="max-w-md mx-auto bg-black/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/80">Onboarding Progress</span>
              <span className="text-sm text-white/80">{currentIndex + 1}/8</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-white/60 capitalize">
              Current: {state.step.replace('-', ' ')}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="relative">
        <OnboardingProvider
          mockMode={true}
          onComplete={handleComplete}
        >
          <ProgressTracker />
          <HiveOnboardingWizard />
        </OnboardingProvider>
        
        {completedData && (
          <div className="fixed top-20 right-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-700 max-w-sm">
            <h3 className="font-semibold mb-2">Onboarding Complete! 🎉</h3>
            <div className="text-sm space-y-1">
              <p><strong>Name:</strong> {completedData.name}</p>
              <p><strong>Handle:</strong> @{completedData.handle}</p>
              <p><strong>University:</strong> {completedData.university}</p>
              <p><strong>Major:</strong> {completedData.major}</p>
              <p><strong>Experience:</strong> {completedData.builderExperience}</p>
              <p><strong>Goals:</strong> {completedData.builderGoals.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Complete Interactive Onboarding Demo**

This interactive demo showcases the full onboarding experience:

### **Features to Test**
1. **Progress Tracking**: Watch the progress bar advance through each step
2. **Step Navigation**: Use next/back buttons to move through the flow
3. **Form Validation**: Try submitting incomplete forms to see validation
4. **Data Collection**: Fill out each step and see data accumulate
5. **Completion Flow**: Complete the entire process to see final data

### **Step-by-Step Testing**
- **Welcome**: Get started with the platform introduction
- **Name**: Enter your full name (minimum 2 characters)
- **Handle**: Choose a unique @username (3+ characters, alphanumeric + underscore)
- **Photo**: Upload a profile photo or skip this optional step
- **Academics**: Enter university, major, and graduation year
- **Builder**: Select experience level and goals
- **Legal**: Agree to all required terms
- **Complete**: See the success screen and final data

### **Validation Testing**
- Try proceeding without required information
- Test invalid handles (too short, special characters)
- Experience the error handling and helpful messaging
- Use the back button to revise previous steps

The demo uses mock mode so no real data is saved, but you can see the complete onboarding data structure upon completion.
        `
      }
    }
  }
};

// =============================================================================
// UNIVERSITY OF BUFFALO SPECIFIC SCENARIOS
// =============================================================================

/**
 * University at Buffalo specific onboarding scenarios
 */
export const UniversityOfBuffaloScenarios: Story = {
  render: () => {
    const [scenario, setScenario] = useState('freshman-cs');
    
    const ubScenarios = {
      'freshman-cs': {
        title: 'Freshman CS Student',
        description: 'New Computer Science student, first semester at UB',
        data: {
          name: 'Alex Rivera',
          handle: 'alexrivera2028',
          university: 'University at Buffalo',
          major: 'Computer Science',
          graduationYear: '2028',
          builderExperience: 'beginner',
          builderGoals: ['learn', 'connect']
        }
      },
      'junior-engineering': {
        title: 'Junior Engineering Student', 
        description: 'Experienced engineering student, junior year',
        data: {
          name: 'Maria Chen',
          handle: 'mchen_ub',
          university: 'University at Buffalo',
          major: 'Electrical Engineering',
          graduationYear: '2026',
          builderExperience: 'intermediate',
          builderGoals: ['solve', 'impact']
        }
      },
      'senior-business': {
        title: 'Senior Business Student',
        description: 'Business major interested in campus entrepreneurship',
        data: {
          name: 'Jordan Washington',
          handle: 'jwash_biz',
          university: 'University at Buffalo',
          major: 'Business Administration',
          graduationYear: '2025',
          builderExperience: 'none',
          builderGoals: ['solve', 'impact', 'connect']
        }
      },
      'grad-researcher': {
        title: 'Graduate Research Student',
        description: 'PhD student in advanced research program',
        data: {
          name: 'Dr. Priya Patel',
          handle: 'ppatel_research',
          university: 'University at Buffalo',
          major: 'Biomedical Engineering PhD',
          graduationYear: '2026',
          builderExperience: 'advanced',
          builderGoals: ['solve', 'impact', 'learn', 'connect']
        }
      }
    };

    const currentScenario = ubScenarios[scenario as keyof typeof ubScenarios];

    return (
      <div className="space-y-6">
        {/* Scenario Selector */}
        <div className="max-w-4xl mx-auto p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">University at Buffalo Student Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(ubScenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  scenario === key
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{scenario.title}</div>
                <div className="text-xs opacity-75 mt-1">{scenario.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Scenario Details */}
        <div className="text-center space-y-2">
          <h4 className="text-xl font-bold text-white">{currentScenario.title}</h4>
          <p className="text-gray-400">{currentScenario.description}</p>
          <div className="text-sm text-blue-400 space-y-1">
            <p>Major: {currentScenario.data.major}</p>
            <p>Experience: {currentScenario.data.builderExperience}</p>
            <p>Goals: {currentScenario.data.builderGoals.join(', ')}</p>
          </div>
        </div>

        {/* Onboarding Flow */}
        <HiveOnboardingWizard 
          key={scenario}
          mockMode={true}
          onComplete={(userData) => {
            alert(`${currentScenario.title} onboarding complete! Welcome to HIVE, ${userData.name}!`);
            console.log(`${currentScenario.title} data:`, userData);
          }}
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**University at Buffalo Student Onboarding Scenarios**

This story demonstrates how onboarding adapts to different UB student profiles:

### **Freshman CS Student - Alex Rivera**
- **Profile**: New to university and programming
- **Goals**: Learn to build, connect with other students
- **Experience**: Beginner level, some coding background
- **Campus Integration**: Needs introduction to campus tech community
- **Onboarding Focus**: Educational content, community building

### **Junior Engineering Student - Maria Chen**
- **Profile**: Experienced student with technical background
- **Goals**: Solve campus problems, create impact
- **Experience**: Intermediate level, project experience
- **Campus Integration**: Ready for leadership opportunities
- **Onboarding Focus**: Problem-solving tools, impact creation

### **Senior Business Student - Jordan Washington**
- **Profile**: Business-focused with entrepreneurial interests
- **Goals**: Campus problem solving, impact creation, networking
- **Experience**: Non-technical but interested in innovation
- **Campus Integration**: Bridge between business and tech communities
- **Onboarding Focus**: No-code tools, business applications

### **Graduate Research Student - Dr. Priya Patel**
- **Profile**: Advanced researcher with comprehensive goals
- **Goals**: All aspects - learning, solving, impact, connecting
- **Experience**: Advanced technical capabilities
- **Campus Integration**: Research tool development, mentorship
- **Onboarding Focus**: Advanced features, research applications

Each scenario can be selected to see how the onboarding experience might differ based on student profile, while maintaining the same core flow structure.
        `
      }
    }
  }
};

// =============================================================================
// STEP-BY-STEP COMPONENT SHOWCASE
// =============================================================================

/**
 * Individual step component showcase for detailed examination
 */
export const StepByStepShowcase: Story = {
  render: () => {
    const [selectedStep, setSelectedStep] = useState<OnboardingStep>('welcome');
    
    const steps: { key: OnboardingStep; title: string; description: string }[] = [
      { key: 'welcome', title: 'Welcome', description: 'Platform introduction and value proposition' },
      { key: 'name', title: 'Name', description: 'Full name collection for community identity' },
      { key: 'handle', title: 'Handle', description: 'Unique @username selection and validation' },
      { key: 'photo', title: 'Photo', description: 'Optional profile photo upload with drag & drop' },
      { key: 'academics', title: 'Academics', description: 'University, major, and graduation year' },
      { key: 'builder', title: 'Builder', description: 'Technical experience and goals assessment' },
      { key: 'legal', title: 'Legal', description: 'Terms of service and community agreements' },
      { key: 'complete', title: 'Complete', description: 'Success celebration and next steps' }
    ];

    return (
      <div className="space-y-6">
        {/* Step Selector */}
        <div className="max-w-6xl mx-auto p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Onboarding Step Components</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {steps.map((step) => (
              <button
                key={step.key}
                onClick={() => setSelectedStep(step.key)}
                className={`p-3 rounded-lg border transition-all text-center ${
                  selectedStep === step.key
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{step.title}</div>
                <div className="text-xs opacity-75 mt-1 line-clamp-2">{step.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Details */}
        <div className="text-center space-y-2">
          <h4 className="text-xl font-bold text-white">
            Step {steps.findIndex(s => s.key === selectedStep) + 1}: {steps.find(s => s.key === selectedStep)?.title}
          </h4>
          <p className="text-gray-400">
            {steps.find(s => s.key === selectedStep)?.description}
          </p>
        </div>

        {/* Selected Step Component */}
        <div className="max-w-2xl mx-auto">
          <HiveOnboardingWizard 
            key={selectedStep}
            initialStep={selectedStep}
            mockMode={true}
            onComplete={(userData) => {
              console.log(`Step ${selectedStep} demo:`, userData);
            }}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Individual Step Component Analysis**

This showcase allows detailed examination of each onboarding step:

### **Step Navigation**
Click any step button to jump directly to that component and examine:
- Visual design and layout
- Form interactions and validation
- Error handling and messaging
- Progress indication
- Navigation controls

### **Step-Specific Features**

**Welcome**: Introduction and motivation
- HIVE branding and logo
- Value proposition messaging
- Process overview icons
- Getting started call-to-action

**Name**: Personal identity collection
- Large input field with validation
- Real-time character requirements
- Error messaging for invalid names
- Community context explanation

**Handle**: Unique identifier creation
- @ symbol integration
- Availability checking simulation
- Character validation and restrictions
- Success feedback for valid handles

**Photo**: Visual identity upload
- Drag and drop file upload
- Click to browse alternative
- Image preview with circular crop
- Optional step with skip option

**Academics**: University integration
- Search-enabled university field
- Free-form major input
- Graduation year dropdown
- Academic community preparation

**Builder**: Technical assessment
- Experience level radio selection
- Multi-select goal buttons
- Personalization explanation
- Visual feedback for selections

**Legal**: Compliance and agreements
- Individual agreement checkboxes
- Clear descriptions for each policy
- Age verification confirmation
- Required completion validation

**Complete**: Success and next steps
- Celebration animation and design
- Personal welcome message
- Next steps guidance
- Automatic completion flow

Each step demonstrates specific UX patterns and interactions relevant to that stage of the onboarding process.
        `
      }
    }
  }
};

// =============================================================================
// MOBILE RESPONSIVE EXPERIENCE
// =============================================================================

/**
 * Mobile-optimized onboarding experience
 */
export const MobileExperience: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <HiveOnboardingWizard 
        mockMode={true}
        onComplete={(userData) => {
          alert(`Mobile onboarding complete: Welcome ${userData.name}!`);
        }}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: `
**Mobile-First Onboarding Experience**

The HIVE onboarding wizard is optimized for mobile devices with:

### **Touch-Friendly Design**
- Large input fields and buttons (minimum 44px tap targets)
- Generous spacing between interactive elements
- Easy thumb navigation and form interaction
- Optimized keyboard types for different input fields

### **Mobile Form Optimization**
- **Email Inputs**: Email keyboard with @ symbol
- **Text Inputs**: Standard keyboard with autocomplete
- **Number Inputs**: Numeric keypad for graduation year
- **File Upload**: Mobile-optimized photo selection

### **Responsive Layout**
- Single-column layout for optimal mobile viewing
- Adaptive typography sizing for readability
- Optimized spacing and padding for small screens
- Progress bar sized appropriately for mobile

### **Photo Upload Mobile Experience**
- Touch-friendly drag and drop area
- Camera integration for direct photo capture
- Photo library access for existing images
- Preview sizing optimized for mobile screens

### **Performance Considerations**
- Optimized bundle size for mobile networks
- Efficient rendering for battery conservation
- Smooth animations that don't impact performance
- Quick loading on slower campus WiFi

### **Campus Mobile Usage Patterns**
- Quick completion between classes
- One-handed operation capability
- Works well in various lighting conditions
- Optimized for portrait orientation

The mobile experience ensures students can complete onboarding anywhere on campus using their primary device.
        `
      }
    }
  }
};

// =============================================================================
// ACCESSIBILITY AND COMPLIANCE
// =============================================================================

/**
 * Accessibility features and keyboard navigation showcase
 */
export const AccessibilityFeatures: Story = {
  args: {
    mockMode: true,
    onComplete: (userData) => {
      console.log('Accessible onboarding complete:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Comprehensive Accessibility Features**

The HIVE onboarding wizard includes extensive accessibility support:

### **Keyboard Navigation**
- **Full keyboard navigation** through all interactive elements
- **Logical tab order** following visual flow
- **Focus indicators** on all focusable elements
- **Enter key submission** for forms
- **Escape key support** for dismissing overlays

### **Screen Reader Support**
- **Semantic HTML structure** with proper heading hierarchy
- **Form labels** properly associated with inputs
- **ARIA labels** for complex interactions and icons
- **Progress announcements** as users advance through steps
- **Error messages** announced immediately when they appear

### **Visual Accessibility**
- **High contrast ratios** meeting WCAG AA standards (4.5:1 minimum)
- **Focus indicators** clearly visible on all interactive elements
- **Color independence** - information not conveyed by color alone
- **Scalable text** that works with browser zoom up to 200%
- **Consistent visual hierarchy** throughout all steps

### **Motor Accessibility**
- **Large touch targets** (44px minimum) for all interactive elements
- **Generous spacing** between clickable areas
- **No time-sensitive interactions** - users can take as long as needed
- **Alternative input methods** supported
- **Drag and drop alternatives** - click to upload option

### **Cognitive Accessibility**
- **Clear, simple language** in all instructions and messaging
- **Consistent interaction patterns** across all steps
- **Progress indicators** to reduce cognitive load
- **Error prevention** with validation before submission
- **Clear recovery paths** when errors occur

### **Testing Instructions**
- Use **Tab** to navigate through elements
- Use **Enter** to activate buttons and submit forms
- Use **Space** to toggle checkboxes and radio buttons
- Test with **screen reader** software
- Verify **high contrast mode** compatibility

### **Compliance Standards**
- **WCAG 2.1 AA compliance** for web accessibility
- **Section 508 compatibility** for federal accessibility requirements
- **ADA compliance** considerations for public accommodations
- **University accessibility policies** adherence

The onboarding experience is designed to be fully accessible to all students regardless of their abilities or assistive technology needs.
        `
      }
    }
  }
};

// =============================================================================
// DATA VALIDATION AND ERROR HANDLING
// =============================================================================

/**
 * Comprehensive validation and error handling showcase
 */
export const ValidationAndErrorHandling: Story = {
  render: () => {
    const [errorType, setErrorType] = useState('name-validation');
    
    const errorScenarios = {
      'name-validation': {
        title: 'Name Validation',
        description: 'Too short names, special characters',
        testCase: 'Try entering single character or empty name'
      },
      'handle-validation': {
        title: 'Handle Validation', 
        description: 'Invalid characters, too short, unavailable',
        testCase: 'Try special characters (!@#$) or very short handles'
      },
      'email-validation': {
        title: 'University Email',
        description: 'Non-.edu emails, invalid formats',
        testCase: 'Try gmail.com or malformed email addresses'
      },
      'photo-validation': {
        title: 'Photo Upload',
        description: 'Invalid file types, oversized files',
        testCase: 'Try uploading non-image files or very large images'
      },
      'academic-validation': {
        title: 'Academic Requirements',
        description: 'Missing university, major, or graduation year',
        testCase: 'Try submitting with empty required fields'
      },
      'builder-validation': {
        title: 'Builder Assessment',
        description: 'No experience or goals selected',
        testCase: 'Try proceeding without selecting experience or goals'
      },
      'legal-validation': {
        title: 'Legal Agreements',
        description: 'Incomplete agreement acceptance',
        testCase: 'Try proceeding without checking all required boxes'
      }
    };

    return (
      <div className="space-y-6">
        {/* Error Type Selector */}
        <div className="max-w-6xl mx-auto p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Validation and Error Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(errorScenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => setErrorType(key)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  errorType === key
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{scenario.title}</div>
                <div className="text-xs opacity-75 mt-1">{scenario.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Test Case */}
        <div className="text-center space-y-2">
          <h4 className="text-xl font-bold text-white">
            Testing: {errorScenarios[errorType as keyof typeof errorScenarios].title}
          </h4>
          <p className="text-gray-400">
            {errorScenarios[errorType as keyof typeof errorScenarios].description}
          </p>
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-400">
              💡 {errorScenarios[errorType as keyof typeof errorScenarios].testCase}
            </p>
          </div>
        </div>

        <HiveOnboardingWizard 
          mockMode={true}
          onComplete={(userData) => {
            console.log('Validation test complete:', userData);
          }}
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Comprehensive Validation and Error Handling**

The HIVE onboarding system includes robust validation and error handling:

### **Real-Time Validation**
- **Immediate Feedback**: Validation occurs as users type or interact
- **Clear Error Messages**: Specific, actionable guidance for fixing errors
- **Visual Indicators**: Red styling and icons for error states
- **Success Feedback**: Green checkmarks and positive messaging for valid inputs

### **Step-Specific Validation**

**Name Validation**
- Minimum 2 characters required
- No numbers or special characters in names
- Trimmed whitespace handling
- Real-time character count feedback

**Handle Validation**
- Minimum 3 characters required
- Alphanumeric characters and underscores only
- Automatic @ symbol removal if typed
- Availability checking (simulated in mock mode)
- Success state with green checkmark

**Email Validation**
- University email requirement (.edu domains)
- Proper email format validation
- Clear messaging about university email requirements
- Integration with university verification systems

**Photo Upload Validation**
- File type checking (images only)
- File size limitations
- Drag and drop error handling
- Clear messaging for invalid files

**Academic Information**
- Required field validation for university and major
- Graduation year selection validation
- Format checking for academic information
- Clear indication of required vs. optional fields

**Builder Assessment**
- Experience level selection required
- At least one goal must be selected
- Clear indication when requirements are not met
- Explanation of how information is used

**Legal Agreements**
- All three agreements must be checked
- Individual validation for each agreement
- Clear messaging about requirements
- Age verification confirmation

### **Error Recovery**
- **Clear Next Steps**: Every error message includes guidance
- **Persistent Errors**: Error messages remain until resolved
- **No Blame Language**: Errors presented as helpful guidance
- **Multiple Attempts**: No penalties for multiple validation attempts

### **User Experience Principles**
- **Immediate Feedback**: Users know instantly if input is valid
- **Helpful Guidance**: Error messages help users succeed
- **Visual Clarity**: Errors are unmistakably highlighted
- **Accessibility**: Error messages work with screen readers

Test different validation scenarios using the selector above to see how the system handles various error conditions.
        `
      }
    }
  }
};