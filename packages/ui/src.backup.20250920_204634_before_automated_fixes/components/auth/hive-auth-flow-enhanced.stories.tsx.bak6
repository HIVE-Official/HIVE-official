import type { Meta, StoryObj } from '@storybook/react';
import { HiveAuthFlowEnhanced, AuthProvider, useAuth, type AuthStep } from './hive-auth-flow-enhanced';
import { useState } from 'react';

// =============================================================================
// ENHANCED HIVE AUTH FLOW DOCUMENTATION WITH LATEST BRAND DESIGN
// =============================================================================

/**
 * # Enhanced HIVE Auth Flow Component - Latest Brand Design
 * 
 * ## Overview
 * The Enhanced HiveAuthFlow showcases the latest HIVE brand design evolution with premium visual effects,
 * advanced animations, and sophisticated glass morphism patterns. This version represents the pinnacle
 * of HIVE's authentication experience design.
 * 
 * ## Enhanced Features
 * - **Liquid Metal Design System**: Advanced glass morphism with shimmer effects
 * - **Brand Constellation Effects**: Animated geometric patterns and floating particles
 * - **Premium Visual Hierarchy**: Gradient overlays and sophisticated shadow systems
 * - **Enhanced Micro-interactions**: Hover states, focus animations, and loading sequences
 * - **Advanced Brand Integration**: Complete semantic token usage with brand consistency
 * 
 * ## Latest Design Elements
 * - **Animated Background Grid**: Dynamic geometric patterns with brand colors
 * - **Gold Glow Orbs**: Premium brand accent lighting effects
 * - **Floating Brand Particles**: Subtle animation elements for visual interest
 * - **Enhanced Glass Morphism**: Multi-layer transparency and backdrop filters
 * - **Premium Input Design**: Advanced focus states and validation feedback
 * 
 * ## Brand Evolution
 * This enhanced version represents HIVE's evolution toward a more premium, sophisticated
 * visual identity while maintaining accessibility and usability standards.
 */

const meta: Meta<typeof HiveAuthFlowEnhanced> = {
  title: '03-Organisms/Auth System/HiveAuthFlowEnhanced',
  component: HiveAuthFlowEnhanced,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Enhanced HIVE Authentication Flow - Premium Brand Design

The Enhanced HiveAuthFlow represents the latest evolution of HIVE's authentication experience, featuring sophisticated visual design, advanced animations, and premium brand integration.

### Enhanced Visual Features
- **Liquid Metal Design System** with advanced glass morphism effects
- **Animated brand constellation** with geometric patterns and particles
- **Premium gradient overlays** and sophisticated shadow systems
- **Enhanced micro-interactions** with hover states and focus animations
- **Advanced loading sequences** with shimmer effects and brand integration

### Latest Brand Integration
- **Complete semantic token usage** across all components
- **Sophisticated color gradients** from brand primary to accent
- **Premium shadow systems** with gold glow effects
- **Enhanced typography** with Space Grotesk display font
- **Advanced brand iconography** with sparkles and premium elements

### Technical Enhancements
- **Advanced CSS animations** with hardware acceleration
- **Sophisticated backdrop filters** for glass morphism effects
- **Premium interaction states** with scale and glow transitions
- **Enhanced accessibility** maintaining WCAG 2.1 AA compliance
- **Optimized performance** with efficient animation systems

This enhanced version showcases HIVE's evolution toward a more premium, sophisticated platform while maintaining the core functionality and accessibility standards.
        `
      }
    }
  },
  argTypes: {
    initialStep: {
      control: 'select',
      options: ['welcome', 'sign-in', 'sign-up', 'forgot-password', 'verify-email', 'magic-link-sent', 'onboarding'],
      description: 'Initial authentication step to display'
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
// ENHANCED AUTHENTICATION FLOW STORIES
// =============================================================================

/**
 * Enhanced welcome screen with premium brand design
 */
export const EnhancedDefault: Story = {
  args: {
    initialStep: 'welcome',
    mockMode: true,
    onAuthSuccess: (user) => {
      console.log('Enhanced auth success:', user);
      alert(`🎉 Welcome to HIVE, ${user.name}! Enhanced experience activated.`);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Welcome Screen - Premium Brand Experience**

The enhanced welcome screen showcases HIVE's latest brand evolution:

### **Premium Visual Design**
- **Liquid Metal Glass Morphism**: Advanced transparency effects with backdrop blur
- **Animated Brand Logo**: 24px enhanced logo with multi-layer glow effects
- **Gold Constellation Background**: Animated geometric patterns and floating particles
- **Premium Gradient Overlays**: Sophisticated brand color transitions

### **Enhanced Micro-interactions**
- **Hover State Animations**: Scale and glow transitions on interactive elements
- **Loading Shimmer Effects**: Premium loading animations with brand colors
- **Focus State Enhancements**: Advanced ring and shadow focus indicators
- **Button Gradient Animations**: Dynamic color transitions on call-to-action

### **Brand Integration Evolution**
- **Space Grotesk Typography**: Premium display font for headings
- **Advanced Icon System**: Sparkles, crowns, and premium brand elements
- **Sophisticated Color Gradients**: Brand primary to accent transitions
- **Enhanced Shadow System**: Gold glow effects with multiple layers

### **Feature Highlights Enhancement**
- **Premium Card Design**: Glass-strong morphism with enhanced borders
- **Advanced Icon Backgrounds**: Gradient backgrounds with brand color integration
- **Enhanced Typography Hierarchy**: Sophisticated text treatment with brand colors
- **Premium Success States**: Advanced visual feedback with celebration elements

This enhanced experience represents HIVE's evolution toward a more premium, sophisticated platform identity.
        `
      }
    }
  }
};

/**
 * Enhanced sign-up flow with liquid metal design
 */
export const EnhancedSignUpFlow: Story = {
  args: {
    initialStep: 'sign-up',
    mockMode: true,
    onAuthSuccess: (user) => {
      console.log('Enhanced sign up success:', user);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Student Registration - Premium UX Design**

The enhanced sign-up flow features sophisticated visual design:

### **Liquid Metal Form Design**
- **Glass-Strong Morphism**: Advanced transparency with enhanced backdrop filters
- **Premium Input Fields**: 14px height with sophisticated border animations
- **Enhanced Focus States**: Multi-layer ring effects with brand color gradients
- **Advanced Validation**: Premium visual feedback with success/error animations

### **Enhanced Visual Hierarchy**
- **Sophisticated Header Design**: Premium icon backgrounds with gradient effects
- **Advanced Typography**: Space Grotesk display font with brand color integration
- **Enhanced Error Handling**: Glass morphism error cards with sophisticated styling
- **Premium Button Design**: Gradient backgrounds with gold glow shadow effects

### **Brand Integration Enhancements**
- **Advanced Icon System**: Sparkles and premium elements for visual interest
- **Sophisticated Color Gradients**: Brand primary to accent transitions throughout
- **Enhanced Shadow Systems**: Multiple layer shadows with gold glow effects
- **Premium Animation States**: Advanced hover and focus micro-interactions

### **UX Improvements**
- **Enhanced Feedback**: Real-time validation with premium visual indicators
- **Sophisticated Loading States**: Advanced shimmer effects and brand integration
- **Premium Success States**: Celebration animations with enhanced visual design
- **Advanced Accessibility**: Maintained WCAG compliance with enhanced visual design

The enhanced sign-up experience provides a premium onboarding experience while maintaining usability.
        `
      }
    }
  }
};

/**
 * Enhanced sign-in flow with premium authentication methods
 */
export const EnhancedSignInFlow: Story = {
  args: {
    initialStep: 'sign-in',
    mockMode: true,
    onAuthSuccess: (user) => {
      console.log('Enhanced sign in success:', user);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Student Login - Sophisticated Authentication**

The enhanced sign-in flow features premium authentication design:

### **Advanced Authentication Methods**
- **Enhanced Password Authentication**: Premium input design with sophisticated validation
- **Premium Magic Link Experience**: Advanced visual design with blue gradient themes
- **Enhanced Method Toggle**: Sophisticated transition animations between auth methods
- **Advanced Security Indicators**: Premium visual feedback for security states

### **Liquid Metal Design System**
- **Advanced Glass Morphism**: Liquid-metal class with enhanced backdrop effects
- **Premium Input Design**: Multi-layer borders with gold glow focus states
- **Sophisticated Overlay Effects**: Gradient overlays that respond to user interaction
- **Enhanced Visual Feedback**: Advanced success/error states with brand integration

### **Premium Micro-interactions**
- **Advanced Hover States**: Scale and glow transitions on all interactive elements
- **Enhanced Focus Animations**: Multi-layer ring effects with brand color gradients
- **Sophisticated Loading States**: Premium spinner animations with brand integration
- **Advanced Button Transitions**: Dynamic gradient shifts and shadow animations

### **Brand Evolution Features**
- **Enhanced Typography**: Space Grotesk display font with sophisticated hierarchy
- **Advanced Icon Integration**: Shield, Zap, and premium security iconography
- **Sophisticated Color System**: Brand primary to accent gradient transitions
- **Premium Shadow Effects**: Gold glow shadows with multiple layer depth

The enhanced login experience provides enterprise-grade authentication with premium visual design.
        `
      }
    }
  }
};

/**
 * Enhanced magic link confirmation with celebration design
 */
export const EnhancedMagicLinkFlow: Story = {
  args: {
    initialStep: 'magic-link-sent',
    mockMode: true,
    onAuthSuccess: (user) => {
      console.log('Enhanced magic link success:', user);
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Magic Link Confirmation - Premium Success State**

The enhanced magic link confirmation showcases premium success design:

### **Premium Success Visualization**
- **Enhanced Success Icon**: 20px icon with advanced glow effects and border animations
- **Celebration Elements**: Sparkles and premium iconography for visual delight
- **Advanced Animation States**: Pulse animations with sophisticated timing
- **Premium Success Colors**: Success green with enhanced visual hierarchy

### **Sophisticated Message Design**
- **Enhanced Typography**: Premium font treatment with sophisticated color integration
- **Advanced Card Design**: Glass morphism with enhanced border and shadow effects
- **Premium Email Highlighting**: Brand color integration for important information
- **Sophisticated Layout**: Enhanced spacing and visual hierarchy

### **Brand Integration Evolution**
- **Advanced Icon System**: Check marks with sparkle celebration effects
- **Premium Color Gradients**: Success green to brand primary transitions
- **Enhanced Shadow Systems**: Advanced glow effects with multiple layers
- **Sophisticated Animation**: Hardware-accelerated transitions with brand timing

### **Enhanced User Experience**
- **Clear Success Communication**: Premium visual design with enhanced messaging
- **Advanced Call-to-Action**: Sophisticated button design with enhanced hover states
- **Premium Loading Indicators**: Advanced animation states for email checking
- **Enhanced Accessibility**: Maintained compliance with premium visual enhancements

The enhanced magic link experience provides clear success feedback with sophisticated visual design.
        `
      }
    }
  }
};

// =============================================================================
// ENHANCED INTERACTIVE DEMO
// =============================================================================

/**
 * Enhanced interactive demo with premium animations
 */
export const EnhancedInteractiveDemo: Story = {
  render: () => {
    const [authResult, setAuthResult] = useState<any>(null);
    const [isShowcasing, setIsShowcasing] = useState(false);
    
    const handleAuthSuccess = (user: any) => {
      setAuthResult(user);
      setIsShowcasing(true);
      console.log('Enhanced demo auth success:', user);
    };

    return (
      <div className="space-y-4 relative">
        <HiveAuthFlowEnhanced 
          mockMode={true}
          onAuthSuccess={handleAuthSuccess}
        />
        
        {authResult && (
          <div className="fixed top-4 right-4 p-6 glass-strong rounded-xl border border-[var(--hive-status-success)]/30 text-[var(--hive-status-success)] max-w-sm shadow-[var(--hive-shadow-emerald-glow)] animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[var(--hive-status-success)]/20 flex items-center justify-center">
                ✨
              </div>
              <h3 className="font-semibold">Enhanced Auth Success!</h3>
            </div>
            <div className="text-sm space-y-1 text-[var(--hive-text-secondary)]">
              <p><strong>User:</strong> {authResult.name}</p>
              <p><strong>Email:</strong> {authResult.email}</p>
              <p><strong>Status:</strong> {authResult.isNewUser ? 'New Builder' : 'Returning Builder'}</p>
              <p><strong>Experience:</strong> Premium Enhanced</p>
            </div>
          </div>
        )}

        {isShowcasing && (
          <div className="fixed bottom-4 left-4 right-4 p-4 glass-strong rounded-xl border border-[var(--hive-brand-primary)]/30 text-center">
            <p className="text-[var(--hive-brand-primary)] text-sm">
              🎉 <strong>Enhanced HIVE Experience Activated</strong> - Premium brand design showcase complete
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Enhanced Complete Authentication Flow Demo**

This enhanced interactive demo showcases the premium HIVE authentication experience:

### **Enhanced Demo Features**
1. **Premium Visual Design**: Experience the sophisticated liquid metal design system
2. **Advanced Animations**: Observe the enhanced micro-interactions and transitions
3. **Brand Integration**: See the complete semantic token usage and brand consistency
4. **Enhanced Feedback**: Experience the premium success states and visual celebrations
5. **Sophisticated Interactions**: Test the advanced hover states and focus animations

### **Enhanced Visual Elements**
- **Liquid Metal Glass Morphism**: Advanced transparency effects with backdrop blur
- **Animated Brand Constellation**: Dynamic geometric patterns and floating particles
- **Premium Gradient Systems**: Sophisticated brand color transitions throughout
- **Enhanced Shadow Effects**: Gold glow systems with multiple layer depth
- **Advanced Typography**: Space Grotesk display font with premium hierarchy

### **Enhanced User Experience**
- **Sophisticated Navigation**: Enhanced back button animations and step transitions
- **Premium Form Interactions**: Advanced input field animations and validation feedback
- **Enhanced Loading States**: Sophisticated spinner animations with brand integration
- **Advanced Success Celebrations**: Premium visual feedback with celebration elements

### **Enhanced Testing Experience**
Try different authentication paths to experience:
- Enhanced welcome screen with premium brand showcase
- Sophisticated sign-up flow with liquid metal design
- Advanced sign-in experience with premium authentication methods
- Enhanced magic link confirmation with celebration design
- Premium error handling with sophisticated visual feedback

The enhanced demo uses mock mode with premium visual enhancements throughout the entire authentication flow.
        `
      }
    }
  }
};

// =============================================================================
// ENHANCED BRAND SHOWCASE
// =============================================================================

/**
 * Enhanced brand design system showcase
 */
export const EnhancedBrandShowcase: Story = {
  render: () => {
    const [currentFeature, setCurrentFeature] = useState('liquid-metal');
    
    const brandFeatures = {
      'liquid-metal': {
        title: 'Liquid Metal Design System',
        description: 'Advanced glass morphism with shimmer effects',
        step: 'welcome' as AuthStep
      },
      'premium-animations': {
        title: 'Premium Animation System',
        description: 'Sophisticated micro-interactions and transitions',
        step: 'sign-in' as AuthStep
      },
      'brand-constellation': {
        title: 'Brand Constellation Effects',
        description: 'Animated geometric patterns and floating particles',
        step: 'sign-up' as AuthStep
      },
      'enhanced-feedback': {
        title: 'Enhanced Visual Feedback',
        description: 'Premium success states and celebration animations',
        step: 'magic-link-sent' as AuthStep
      }
    };

    return (
      <div className="space-y-6">
        {/* Enhanced Feature Selector */}
        <div className="max-w-4xl mx-auto p-6 glass-strong rounded-xl border border-[var(--hive-border-glass-strong)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
            ✨ Enhanced HIVE Brand Design Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(brandFeatures).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setCurrentFeature(key)}
                className={`p-3 rounded-lg border transition-all text-left hive-interactive ${
                  currentFeature === key
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
            {brandFeatures[currentFeature as keyof typeof brandFeatures].title}
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            {brandFeatures[currentFeature as keyof typeof brandFeatures].description}
          </p>
        </div>

        {/* Enhanced Auth Flow */}
        <HiveAuthFlowEnhanced 
          key={currentFeature}
          initialStep={brandFeatures[currentFeature as keyof typeof brandFeatures].step}
          mockMode={true}
          onAuthSuccess={(user) => {
            alert(`🎉 Enhanced ${brandFeatures[currentFeature as keyof typeof brandFeatures].title} - Welcome ${user.name}!`);
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
**Enhanced HIVE Brand Design System Showcase**

This showcase demonstrates the enhanced HIVE brand design features:

### **Liquid Metal Design System**
- **Advanced Glass Morphism**: Multi-layer transparency with sophisticated backdrop filters
- **Shimmer Animation Effects**: Premium loading animations with brand color integration
- **Enhanced Border Systems**: Dynamic borders that respond to user interaction
- **Sophisticated Shadow Depths**: Multiple layer shadows with gold glow effects

### **Premium Animation System**
- **Hardware-Accelerated Transitions**: Smooth scale and glow animations
- **Advanced Micro-interactions**: Sophisticated hover states and focus animations
- **Enhanced Loading Sequences**: Premium spinner animations with brand integration
- **Celebration Animation States**: Advanced success feedback with visual delight

### **Brand Constellation Effects**
- **Animated Geometric Patterns**: Dynamic background grids with brand colors
- **Floating Brand Particles**: Subtle animation elements for visual interest
- **Gold Glow Orb Systems**: Premium accent lighting effects
- **Advanced Background Layers**: Multiple overlay systems with brand integration

### **Enhanced Visual Feedback**
- **Premium Success States**: Sophisticated celebration animations
- **Advanced Error Handling**: Enhanced visual feedback with brand consistency
- **Sophisticated Loading States**: Premium visual indicators with brand integration
- **Enhanced Accessibility**: Maintained WCAG compliance with premium enhancements

Each feature can be selected to experience the specific enhanced design elements in context.
        `
      }
    }
  }
};

// =============================================================================
// ENHANCED UNIVERSITY OF BUFFALO SCENARIOS
// =============================================================================

/**
 * Enhanced UB-specific authentication with premium campus integration
 */
export const EnhancedUniversityOfBuffaloScenarios: Story = {
  render: () => {
    const [currentScenario, setCurrentScenario] = useState('premium-freshman');
    
    const ubScenarios = {
      'premium-freshman': {
        title: 'Premium Freshman Experience',
        description: 'Enhanced onboarding for new UB students with sophisticated design',
        email: 'alexrivera@buffalo.edu',
        step: 'sign-up' as AuthStep
      },
      'enhanced-returning': {
        title: 'Enhanced Returning Student',
        description: 'Premium login experience for experienced UB builders',
        email: 'mchen3@buffalo.edu', 
        step: 'sign-in' as AuthStep
      },
      'sophisticated-grad': {
        title: 'Sophisticated Graduate Student',
        description: 'Advanced authentication for UB research community',
        email: 'kpatel@buffalo.edu',
        step: 'sign-in' as AuthStep
      },
      'premium-faculty': {
        title: 'Premium Faculty Access',
        description: 'Enhanced authentication for UB faculty and staff',
        email: 'johnson@buffalo.edu',
        step: 'welcome' as AuthStep
      }
    };

    return (
      <div className="space-y-6">
        {/* Enhanced Scenario Selector */}
        <div className="max-w-4xl mx-auto p-6 glass-strong rounded-xl border border-[var(--hive-border-glass-strong)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
            🎓 Enhanced University at Buffalo Authentication Scenarios
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(ubScenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => setCurrentScenario(key)}
                className={`p-3 rounded-lg border transition-all text-left hive-interactive ${
                  currentScenario === key
                    ? 'border-[var(--hive-status-success)] bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)]'
                    : 'border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] text-[var(--hive-text-secondary)]'
                }`}
              >
                <div className="font-medium text-sm">{scenario.title}</div>
                <div className="text-xs opacity-75 mt-1">{scenario.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Scenario */}
        <div className="text-center space-y-2">
          <h4 className="text-xl font-bold text-[var(--hive-text-primary)]">
            {ubScenarios[currentScenario as keyof typeof ubScenarios].title}
          </h4>
          <p className="text-[var(--hive-text-secondary)]">
            {ubScenarios[currentScenario as keyof typeof ubScenarios].description}
          </p>
          <p className="text-sm text-[var(--hive-status-success)]">
            Enhanced Email: {ubScenarios[currentScenario as keyof typeof ubScenarios].email}
          </p>
        </div>

        {/* Enhanced Auth Flow */}
        <HiveAuthFlowEnhanced 
          key={currentScenario}
          initialStep={ubScenarios[currentScenario as keyof typeof ubScenarios].step}
          mockMode={true}
          onAuthSuccess={(user) => {
            alert(`🎉 ${ubScenarios[currentScenario as keyof typeof ubScenarios].title} - Enhanced Welcome to HIVE, ${user.name}!`);
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
**Enhanced University at Buffalo Authentication Scenarios**

This enhanced showcase demonstrates premium UB community authentication:

### **Premium Freshman Experience**
- **Sophisticated Onboarding**: Enhanced visual design for new student orientation
- **Advanced Welcome Messaging**: Premium brand integration for first-time users
- **Enhanced Educational Content**: Sophisticated introduction to campus builder community
- **Premium Visual Hierarchy**: Advanced typography and iconography for engagement

### **Enhanced Returning Student Experience**
- **Streamlined Premium Login**: Sophisticated authentication for experienced users
- **Advanced Recognition**: Enhanced visual feedback for returning builder community
- **Premium Quick Access**: Advanced login methods with sophisticated design
- **Enhanced Personalization**: Premium visual customization for returning users

### **Sophisticated Graduate Student Access**
- **Advanced Authentication**: Premium design for research community access
- **Enhanced Professional Features**: Sophisticated visual design for academic users
- **Premium Research Integration**: Advanced visual hierarchy for academic workflows
- **Sophisticated Access Controls**: Enhanced visual feedback for elevated permissions

### **Premium Faculty Access**
- **Enhanced Administrative Design**: Sophisticated visual hierarchy for faculty users
- **Advanced Professional Interface**: Premium design appropriate for academic staff
- **Sophisticated Integration Features**: Enhanced visual design for institutional tools
- **Premium Brand Consistency**: Advanced brand integration for university context

Each scenario showcases enhanced visual design appropriate for different UB community segments.
        `
      }
    }
  }
};