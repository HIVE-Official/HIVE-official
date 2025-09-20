import type { Meta, StoryObj } from '@storybook/react';
import { HiveOnboardingWizardEnhanced, OnboardingProvider, useOnboarding, type OnboardingStep } from './hive-onboarding-wizard-enhanced';
import { useState } from 'react';

// =============================================================================
// ENHANCED HIVE ONBOARDING WIZARD DOCUMENTATION WITH LATEST BRAND DESIGN
// =============================================================================

/**
 * # Enhanced HIVE Onboarding Wizard - Latest Brand Design Evolution
 * 
 * ## Overview
 * The Enhanced HiveOnboardingWizard represents the pinnacle of HIVE's onboarding experience design,
 * featuring sophisticated visual effects, advanced animations, premium glass morphism, and complete
 * brand integration using the latest design system evolution.
 * 
 * ## Enhanced Features
 * - **Liquid Metal & Glass-Strong Design**: Advanced multi-layer glass morphism effects
 * - **Brand Constellation System**: Animated geometric patterns with floating brand particles
 * - **Premium Progress Visualization**: Enhanced progress bars with shimmer animations
 * - **Sophisticated Micro-interactions**: Advanced hover states and focus animations
 * - **Enhanced Form Design**: Premium input fields with sophisticated validation feedback
 * 
 * ## Latest Design Elements
 * - **Animated Brand Grid**: Dynamic geometric patterns with brand color integration
 * - **Premium Icon System**: Enhanced iconography with crowns, sparkles, and trophies
 * - **Advanced Typography**: Space Grotesk display font with sophisticated hierarchy
 * - **Enhanced Shadow Systems**: Multi-layer gold glow effects and depth systems
 * - **Sophisticated Color Gradients**: Brand primary to accent transitions throughout
 * 
 * ## Brand Evolution Showcase
 * This enhanced version demonstrates HIVE's evolution toward a more premium, sophisticated
 * platform identity while maintaining the educational focus and accessibility standards.
 */

const meta: Meta<typeof HiveOnboardingWizardEnhanced> = {
  title: '03-Organisms/Onboarding System/HiveOnboardingWizardEnhanced',
  component: HiveOnboardingWizardEnhanced,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Enhanced HIVE Student Onboarding System - Premium Brand Design

The Enhanced HiveOnboardingWizard showcases the latest evolution of HIVE's onboarding experience with sophisticated visual design, advanced animations, and premium brand integration.

### Enhanced Visual Features
- **Liquid Metal Design System** with advanced glass morphism and shimmer effects
- **Brand Constellation Background** with animated geometric patterns and floating particles
- **Premium Progress Visualization** with enhanced progress bars and step indicators
- **Sophisticated Form Design** with advanced input animations and validation feedback
- **Enhanced Micro-interactions** with hover states and focus animations throughout

### Latest Brand Integration
- **Complete Semantic Token Usage** across all components and states
- **Advanced Typography System** with Space Grotesk display font integration
- **Sophisticated Icon System** with premium brand elements and celebration iconography
- **Enhanced Color Gradients** from brand primary to accent with smooth transitions
- **Premium Shadow Effects** with gold glow systems and multi-layer depth

### Enhanced User Experience
- **Sophisticated Step Navigation** with premium visual feedback and animations
- **Advanced Validation System** with enhanced visual indicators and messaging
- **Premium Success States** with celebration animations and visual delight
- **Enhanced Accessibility** maintaining WCAG 2.1 AA compliance with premium design
- **Sophisticated Mobile Experience** with touch-optimized premium interactions

This enhanced version represents HIVE's evolution toward a more premium, sophisticated platform experience.
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
// ENHANCED ONBOARDING FLOW STORIES
// =============================================================================

/**
 * Enhanced welcome screen with premium brand showcase
 */
export const EnhancedDefault: Story = {
  args: {
    initialStep: 'welcome',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced onboarding complete:', userData);
      alert(`🎉 Enhanced Welcome to HIVE, ${userData.name}! Premium builder profile activated.`)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Welcome Screen - Premium Brand Experience**

The enhanced welcome screen showcases HIVE's latest onboarding evolution:

### **Premium Visual Design**
- **Liquid Metal Glass Morphism**: Advanced multi-layer transparency with sophisticated backdrop filters
- **Enhanced Brand Logo**: 24px premium logo with crown, sparkle, and trophy celebration elements
- **Brand Constellation Background**: Animated geometric grid with floating brand particles
- **Advanced Progress System**: Enhanced progress bar with shimmer animations and step indicators

### **Sophisticated Feature Preview**
- **Premium Card Design**: Glass-strong morphism with enhanced border systems
- **Advanced Icon Backgrounds**: Gradient backgrounds with brand color integration and animations
- **Enhanced Typography**: Space Grotesk display font with sophisticated color treatments
- **Premium Feature Highlights**: Advanced visual hierarchy with brand color integration

### **Enhanced Micro-interactions**
- **Advanced Hover States**: Scale and glow transitions with brand color integration
- **Premium Focus Animations**: Multi-layer ring effects with gold glow systems
- **Sophisticated Loading States**: Premium animation sequences with brand integration
- **Enhanced Button Design**: Gradient backgrounds with advanced shadow effects

### **Brand Evolution Features**
- **Advanced Typography System**: Space Grotesk display font with premium hierarchy
- **Sophisticated Icon Integration**: Rockets, sparkles, and premium brand iconography
- **Enhanced Color Gradients**: Brand primary to accent transitions with sophisticated timing
- **Premium Shadow Systems**: Gold glow effects with multiple layer depth systems

This enhanced welcome experience represents HIVE's evolution toward premium platform identity.
        `
      }
    }
  }
};

/**
 * Enhanced name step with premium validation design
 */
export const EnhancedNameStep: Story = {
  args: {
    initialStep: 'name',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced name step:', userData)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Name Collection - Premium Identity Setup**

The enhanced name step features sophisticated form design:

### **Premium Input Design**
- **Enhanced Input Fields**: 16px height with sophisticated border animations
- **Advanced Focus States**: Multi-layer ring effects with brand color gradients
- **Premium Validation Feedback**: Real-time character count with success/warning indicators
- **Sophisticated Overlay Effects**: Gradient overlays that respond to user interaction

### **Enhanced Visual Feedback**
- **Premium Success States**: Advanced check mark animations with brand integration
- **Sophisticated Error Handling**: Enhanced visual messaging with brand consistency
- **Advanced Character Validation**: Real-time feedback with premium visual indicators
- **Enhanced Typography**: Space Grotesk integration with sophisticated hierarchy

### **Brand Integration Evolution**
- **Advanced Icon System**: User icon with premium background gradient effects
- **Sophisticated Color System**: Brand primary integration with enhanced visual states
- **Enhanced Shadow Effects**: Advanced input field shadows with gold glow systems
- **Premium Animation States**: Sophisticated hover and focus micro-interactions

### **Enhanced User Experience**
- **Real-time Validation**: Premium visual feedback with sophisticated animations
- **Advanced Accessibility**: Enhanced focus indicators with maintained WCAG compliance
- **Sophisticated Mobile Design**: Touch-optimized with premium visual enhancements
- **Premium Success Celebration**: Advanced visual feedback for successful name entry

The enhanced name collection provides premium identity setup with sophisticated validation.
        `
      }
    }
  }
};

/**
 * Enhanced handle step with premium availability checking
 */
export const EnhancedHandleStep: Story = {
  args: {
    initialStep: 'handle',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced handle step:', userData)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Handle Creation - Premium Username System**

The enhanced handle step showcases sophisticated username creation:

### **Premium Username Interface**
- **Enhanced @ Symbol Display**: Sophisticated typography integration with advanced positioning
- **Advanced Input Design**: Premium field styling with sophisticated border animations
- **Premium Availability Checking**: Enhanced visual feedback with loading animations
- **Sophisticated Status Indicators**: Advanced success/error states with brand integration

### **Enhanced Validation System**
- **Real-time Availability**: Premium loading animations with brand color integration
- **Advanced Success States**: Sophisticated celebration animations with check marks
- **Enhanced Error Feedback**: Premium visual messaging with helpful guidance
- **Premium Status Cards**: Advanced glass morphism cards for availability feedback

### **Brand Integration Features**
- **Advanced Icon System**: Hash icon with premium background gradient effects
- **Sophisticated Color Gradients**: Status info to brand primary transitions
- **Enhanced Typography**: Premium font treatment with brand color integration
- **Advanced Shadow Systems**: Input field shadows with sophisticated depth effects

### **Enhanced User Experience**
- **Sophisticated Loading States**: Premium spinner animations during availability checks
- **Advanced Visual Hierarchy**: Enhanced messaging with sophisticated typography
- **Premium Success Celebration**: Advanced visual feedback for available usernames
- **Enhanced Accessibility**: Maintained screen reader support with premium visual design

The enhanced handle creation provides premium username selection with sophisticated validation.
        `
      }
    }
  }
};

/**
 * Enhanced photo step with premium upload design
 */
export const EnhancedPhotoStep: Story = {
  args: {
    initialStep: 'photo',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced photo step:', userData)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Photo Upload - Premium Visual Identity**

The enhanced photo step features sophisticated upload design:

### **Premium Upload Interface**
- **Enhanced Drag & Drop Zone**: 80x80px zone with sophisticated border animations
- **Advanced Visual Feedback**: Premium hover states with brand color integration
- **Premium Photo Preview**: Enhanced circular crop with brand border effects
- **Sophisticated Upload States**: Advanced visual feedback throughout upload process

### **Enhanced Visual Design**
- **Premium Upload Icon**: Camera icon with advanced background gradient effects
- **Sophisticated Drop Zone**: Enhanced border animations with brand color transitions
- **Advanced Preview Design**: Premium photo display with gold border and shadow effects
- **Enhanced Remove Button**: Sophisticated removal interface with premium styling

### **Brand Integration Evolution**
- **Advanced Icon System**: Camera icon with premium brand accent integration
- **Sophisticated Border Effects**: Enhanced drag states with brand color animations
- **Premium Shadow Systems**: Photo preview with gold glow shadow effects
- **Enhanced Typography**: Premium messaging with brand color integration

### **Enhanced User Experience**
- **Sophisticated Drag States**: Premium visual feedback during drag interactions
- **Advanced Upload Feedback**: Enhanced progress indicators with brand integration
- **Premium Optional Messaging**: Sophisticated communication about optional step
- **Enhanced Mobile Support**: Touch-optimized upload with premium visual design

The enhanced photo upload provides premium visual identity setup with sophisticated interactions.
        `
      }
    }
  }
};

/**
 * Enhanced academics step with premium university integration
 */
export const EnhancedAcademicsStep: Story = {
  args: {
    initialStep: 'academics',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced academics step:', userData)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Academic Information - Premium University Integration**

The enhanced academics step showcases sophisticated university integration:

### **Premium Form Design**
- **Enhanced Input Fields**: 14px height with sophisticated styling and animations
- **Advanced Search Integration**: Premium university search with icon integration
- **Sophisticated Dropdown Design**: Enhanced graduation year selection with brand styling
- **Premium Field Layouts**: Advanced spacing and visual hierarchy throughout

### **Enhanced University Features**
- **Advanced Search Icon**: Premium search iconography with brand color integration
- **Sophisticated Field Labels**: Enhanced typography with brand color treatments
- **Premium Validation States**: Advanced visual feedback for required fields
- **Enhanced Auto-complete**: Sophisticated university search with premium styling

### **Brand Integration Evolution**
- **Advanced Icon System**: Graduation cap with premium success color integration
- **Sophisticated Color System**: Success green to info blue gradient transitions
- **Enhanced Typography**: Premium field labels with brand hierarchy integration
- **Advanced Shadow Effects**: Input field shadows with sophisticated depth systems

### **Enhanced User Experience**
- **Sophisticated Field Interactions**: Premium hover and focus states throughout
- **Advanced Validation Feedback**: Enhanced visual messaging for form completion
- **Premium Mobile Design**: Touch-optimized with sophisticated visual enhancements
- **Enhanced Accessibility**: Maintained form accessibility with premium visual design

The enhanced academics collection provides premium university integration with sophisticated form design.
        `
      }
    }
  }
};

/**
 * Enhanced builder step with premium experience assessment
 */
export const EnhancedBuilderStep: Story = {
  args: {
    initialStep: 'builder',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced builder step:', userData)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Builder Assessment - Premium Technical Profiling**

The enhanced builder step features sophisticated experience assessment:

### **Premium Experience Selection**
- **Enhanced Experience Cards**: Advanced card design with premium icon backgrounds
- **Sophisticated Icon System**: Star, code, trophy, and crown icons with brand integration
- **Premium Selection States**: Advanced visual feedback with brand color animations
- **Enhanced Card Animations**: Sophisticated hover states with scale and glow effects

### **Advanced Goal Selection**
- **Premium Goal Cards**: 2x2 grid with sophisticated card design and animations
- **Enhanced Icon Backgrounds**: Gradient backgrounds with brand color integration
- **Sophisticated Selection Feedback**: Advanced visual states with check mark animations
- **Premium Multi-select Design**: Enhanced visual hierarchy for multiple selections

### **Brand Integration Features**
- **Advanced Icon System**: Zap, target, and premium iconography throughout
- **Sophisticated Color Gradients**: Experience and goal cards with brand transitions
- **Enhanced Typography**: Premium section headers with brand hierarchy
- **Advanced Shadow Systems**: Card shadows with sophisticated depth and glow effects

### **Enhanced User Experience**
- **Sophisticated Interaction Design**: Premium hover states and selection animations
- **Advanced Visual Hierarchy**: Enhanced messaging and instruction typography
- **Premium Multi-step Validation**: Sophisticated requirements for experience and goals
- **Enhanced Mobile Design**: Touch-optimized cards with premium visual enhancements

The enhanced builder assessment provides premium technical profiling with sophisticated interaction design.
        `
      }
    }
  }
};

/**
 * Enhanced legal step with premium compliance design
 */
export const EnhancedLegalStep: Story = {
  args: {
    initialStep: 'legal',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced legal step:', userData)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Legal Agreements - Premium Compliance Interface**

The enhanced legal step showcases sophisticated compliance design:

### **Premium Agreement Design**
- **Enhanced Agreement Cards**: Advanced card layout with sophisticated spacing
- **Premium Checkbox Styling**: Enhanced checkbox design with brand integration
- **Sophisticated Icon Integration**: Scale, users, and heart icons with premium styling
- **Advanced Card Animations**: Premium hover states with sophisticated transitions

### **Enhanced Visual Hierarchy**
- **Premium Section Headers**: Advanced typography with brand color integration
- **Sophisticated Agreement Text**: Enhanced readability with premium styling
- **Advanced Layout Design**: Sophisticated spacing and visual organization
- **Enhanced Completion Messaging**: Premium typography for age verification

### **Brand Integration Evolution**
- **Advanced Icon System**: Legal icons with premium background styling
- **Sophisticated Color System**: Info blue to brand primary gradient integration
- **Enhanced Typography**: Premium agreement text with brand hierarchy
- **Advanced Shadow Effects**: Card shadows with sophisticated depth systems

### **Enhanced User Experience**
- **Sophisticated Checkbox Interactions**: Premium selection states with animations
- **Advanced Validation Feedback**: Enhanced visual requirements for completion
- **Premium Mobile Design**: Touch-optimized checkboxes with enhanced styling
- **Enhanced Accessibility**: Maintained form accessibility with premium visual design

The enhanced legal agreements provide premium compliance interface with sophisticated interaction design.
        `
      }
    }
  }
};

/**
 * Enhanced completion step with premium celebration
 */
export const EnhancedCompleteStep: Story = {
  args: {
    initialStep: 'complete',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Enhanced completion:', userData)
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Completion Celebration - Premium Success Experience**

The enhanced completion step features sophisticated celebration design:

### **Premium Success Visualization**
- **Enhanced Success Icon**: 32px icon with advanced multi-layer glow effects
- **Premium Celebration Elements**: Sparkles, crowns, and trophy iconography
- **Sophisticated Animation States**: Advanced pulse animations with brand timing
- **Enhanced Success Colors**: Brand primary to accent gradient celebration

### **Advanced Completion Design**
- **Premium Typography**: Enhanced name integration with sophisticated styling
- **Sophisticated Card Design**: Glass-strong morphism with enhanced visual effects
- **Advanced Next Steps**: Premium iconography with enhanced visual hierarchy
- **Enhanced Loading States**: Sophisticated profile setup animations

### **Brand Integration Evolution**
- **Advanced Icon System**: Check marks with premium celebration iconography
- **Sophisticated Color Gradients**: Success celebration with brand integration
- **Enhanced Typography**: Space Grotesk with premium hierarchy and celebrations
- **Premium Shadow Systems**: Advanced glow effects with gold celebration lighting

### **Enhanced User Experience**
- **Sophisticated Success Communication**: Premium messaging with enhanced typography
- **Advanced Celebration Animation**: Hardware-accelerated success animations
- **Premium Next Steps Guidance**: Enhanced visual hierarchy for platform introduction
- **Enhanced Auto-completion**: Sophisticated transition timing with premium feedback

The enhanced completion celebration provides premium success experience with sophisticated visual design.
        `
      }
    }
  }
};

// =============================================================================
// ENHANCED INTERACTIVE FLOW DEMONSTRATION
// =============================================================================

/**
 * Enhanced interactive demo with premium progress tracking
 */
export const EnhancedInteractiveFlowDemo: Story = {
  render: () => {
    const [completedData, setCompletedData] = useState<any>(null);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [isShowcasing, setIsShowcasing] = useState(false);
    
    const handleComplete = (userData: any) => {
      setCompletedData(userData);
      setIsShowcasing(true);
      console.log('Enhanced interactive demo complete:', userData)
    };

    // Enhanced Progress tracker component
    const EnhancedProgressTracker = () => {
      const { state } = useOnboarding();
      const steps = ['welcome', 'name', 'handle', 'photo', 'academics', 'builder', 'legal', 'complete'];
      const currentIndex = steps.indexOf(state.step);
      
      React.useEffect(() => {
        setCurrentProgress(((currentIndex + 1) / steps.length) * 100)
      }, [currentIndex]);

      return (
        <div className="fixed top-4 left-4 right-4 z-50">
          <div className="max-w-md mx-auto glass-strong rounded-xl p-4 border border-[var(--hive-border-glass-strong)]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-[var(--hive-text-primary)] font-semibold">Enhanced Onboarding Progress</span>
              <span className="text-sm text-[var(--hive-brand-primary)]">{currentIndex + 1}/8</span>
            </div>
            <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-3 border border-[var(--hive-border-glass)]">
              <div 
                className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] h-3 rounded-full transition-all duration-700 relative overflow-hidden"
                style={{ width: `${currentProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer" />
              </div>
            </div>
            <div className="mt-2 text-xs text-[var(--hive-text-secondary)] capitalize flex items-center gap-2">
              ✨ Current: {state.step.replace('-', ' ')}
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="relative">
        <OnboardingProvider
          mockMode={true}
          onComplete={handleComplete}
        >
          <EnhancedProgressTracker />
          <HiveOnboardingWizardEnhanced />
        </OnboardingProvider>
        
        {completedData && (
          <div className="fixed top-20 right-4 p-6 glass-strong rounded-xl border border-[var(--hive-status-success)]/30 text-[var(--hive-status-success)] max-w-sm shadow-[var(--hive-shadow-emerald-glow)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--hive-status-success)]/20 to-[var(--hive-brand-primary)]/20 flex items-center justify-center">
                🎉
              </div>
              <h3 className="font-semibold">Enhanced Onboarding Complete!</h3>
            </div>
            <div className="text-sm space-y-1 text-[var(--hive-text-secondary)]">
              <p><strong>Name:</strong> {completedData.name}</p>
              <p><strong>Handle:</strong> @{completedData.handle}</p>
              <p><strong>University:</strong> {completedData.university}</p>
              <p><strong>Major:</strong> {completedData.major}</p>
              <p><strong>Experience:</strong> {completedData.builderExperience}</p>
              <p><strong>Goals:</strong> {completedData.builderGoals.join(', ')}</p>
              <p><strong>Design:</strong> Premium Enhanced</p>
            </div>
          </div>
        )}

        {isShowcasing && (
          <div className="fixed bottom-4 left-4 right-4 p-4 glass-strong rounded-xl border border-[var(--hive-brand-primary)]/30 text-center">
            <p className="text-[var(--hive-brand-primary)] text-sm">
              🎉 <strong>Enhanced HIVE Onboarding Complete</strong> - Premium builder profile activated
            </p>
          </div>
        )}

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%) }
            100% { transform: translateX(100%) }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite
          }
        `}</style>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Complete Interactive Onboarding Demo**

This enhanced interactive demo showcases the premium HIVE onboarding experience:

### **Enhanced Demo Features**
1. **Premium Progress Tracking**: Enhanced progress bar with shimmer animations and step indicators
2. **Sophisticated Step Navigation**: Advanced transitions between onboarding steps
3. **Premium Form Interactions**: Enhanced input fields with sophisticated validation
4. **Advanced Visual Feedback**: Premium success states and celebration animations
5. **Enhanced Brand Integration**: Complete semantic token usage throughout

### **Enhanced Visual Elements**
- **Liquid Metal Glass Morphism**: Advanced transparency effects with backdrop blur
- **Brand Constellation Background**: Dynamic geometric patterns with floating particles
- **Premium Progress Visualization**: Enhanced progress bars with shimmer animations
- **Sophisticated Shadow Systems**: Gold glow effects with multiple layer depth
- **Advanced Typography**: Space Grotesk display font with premium hierarchy

### **Enhanced Testing Experience**
Navigate through each step to experience:
- Premium welcome screen with brand constellation effects
- Sophisticated name collection with advanced validation
- Enhanced handle creation with availability checking animations
- Premium photo upload with drag & drop enhancements
- Advanced academics form with university integration
- Sophisticated builder assessment with premium card design
- Enhanced legal agreements with compliance interface
- Premium completion celebration with success animations

### **Enhanced Progress Tracking**
The enhanced progress tracker provides:
- **Shimmer Animation Effects**: Premium loading animations in progress bar
- **Sophisticated Step Indicators**: Advanced visual feedback for completed steps
- **Enhanced Typography**: Premium font treatment for progress messaging
- **Advanced Visual Hierarchy**: Sophisticated organization of progress information

The enhanced demo showcases the complete premium onboarding experience with sophisticated visual design.
        `
      }
    }
  }
};

// =============================================================================
// ENHANCED BRAND DESIGN SHOWCASE
// =============================================================================

/**
 * Enhanced brand design system showcase
 */
export const EnhancedBrandDesignShowcase: Story = {
  render: () => {
    const [selectedFeature, setSelectedFeature] = useState('liquid-metal-system');
    
    const brandFeatures = {
      'liquid-metal-system': {
        title: 'Liquid Metal Design System',
        description: 'Advanced glass morphism with shimmer effects',
        step: 'welcome' as OnboardingStep
      },
      'premium-form-design': {
        title: 'Premium Form Design',
        description: 'Sophisticated input fields with enhanced validation',
        step: 'name' as OnboardingStep
      },
      'brand-constellation': {
        title: 'Brand Constellation Effects',
        description: 'Animated geometric patterns and floating particles',
        step: 'builder' as OnboardingStep
      },
      'celebration-system': {
        title: 'Premium Celebration System',
        description: 'Advanced success states with sophisticated animations',
        step: 'complete' as OnboardingStep
      }
    };

    return (
      <div className="space-y-6">
        {/* Enhanced Feature Selector */}
        <div className="max-w-6xl mx-auto p-6 glass-strong rounded-xl border border-[var(--hive-border-glass-strong)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
            ✨ Enhanced HIVE Brand Design Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(brandFeatures).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setSelectedFeature(key)}
                className={`p-3 rounded-lg border transition-all text-left hive-interactive ${
                  selectedFeature === key
                    ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]'
                    : 'border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] text-[var(--hive-text-secondary)]'
                }`}
              >
                <div className="font-medium text-sm">{feature.title}</div>
                <div className="text-xs opacity-75 mt-1">{feature.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Feature Details */}
        <div className="text-center space-y-2">
          <h4 className="text-xl font-bold text-[var(--hive-text-primary)]">
            {brandFeatures[selectedFeature as keyof typeof brandFeatures].title}
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            {brandFeatures[selectedFeature as keyof typeof brandFeatures].description}
          </p>
        </div>

        {/* Enhanced Onboarding Flow */}
        <HiveOnboardingWizardEnhanced 
          key={selectedFeature}
          initialStep={brandFeatures[selectedFeature as keyof typeof brandFeatures].step}
          mockMode={true}
          onComplete={(userData) => {
            alert(`🎉 Enhanced ${brandFeatures[selectedFeature as keyof typeof brandFeatures].title} - Welcome ${userData.name}!`)
          })}
        />
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Enhanced HIVE Brand Design System Showcase**

This showcase demonstrates the enhanced HIVE onboarding brand design features:

### **Liquid Metal Design System**
- **Advanced Glass Morphism**: Multi-layer transparency with sophisticated backdrop filters
- **Shimmer Animation Effects**: Premium loading animations with brand color integration
- **Enhanced Border Systems**: Dynamic borders that respond to user interaction
- **Sophisticated Shadow Depths**: Multiple layer shadows with gold glow effects

### **Premium Form Design**
- **Enhanced Input Fields**: Advanced styling with sophisticated border animations
- **Premium Validation Feedback**: Real-time character count with success/error indicators
- **Sophisticated Focus States**: Multi-layer ring effects with brand color gradients
- **Advanced Micro-interactions**: Premium hover states and interaction animations

### **Brand Constellation Effects**
- **Animated Geometric Patterns**: Dynamic background grids with brand colors
- **Floating Brand Particles**: Subtle animation elements for visual interest
- **Premium Background Layers**: Multiple overlay systems with brand integration
- **Advanced Visual Depth**: Sophisticated layering with brand constellation themes

### **Premium Celebration System**
- **Advanced Success States**: Sophisticated celebration animations with premium iconography
- **Enhanced Visual Feedback**: Premium success messaging with brand integration
- **Sophisticated Animation Timing**: Hardware-accelerated transitions with brand timing
- **Premium Icon Integration**: Sparkles, crowns, and trophy celebration elements

Each feature can be selected to experience the specific enhanced design elements in context.
        `
      }
    }
  }
};