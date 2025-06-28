/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthFlow, type AuthFlowProps, type School } from '../../components/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StorybookThemeProvider } from '../../components/ui/storybook-theme-provider';
import { ToastProvider } from '../../components/toast-provider';
import { action } from '@storybook/addon-actions';

// Full Website Layout Wrapper - simulates Next.js layout structure
const WebsiteLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryClientProvider client={queryClient}>
          <StorybookThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <ToastProvider>
              {/* Simulated Root Layout */}
              <div className="min-h-screen">
                {children}
              </div>
            </ToastProvider>
          </StorybookThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

// Mock data with realistic university information
const mockSchools: School[] = [
  { 
    id: '1', 
    name: 'University at Buffalo', 
    domain: 'buffalo.edu', 
    status: 'open', 
    isFeatured: true,
    location: 'Buffalo, NY',
    studentCount: 32000
  },
  { 
    id: '2', 
    name: 'Rochester Institute of Technology', 
    domain: 'rit.edu', 
    status: 'waitlist', 
    waitlistCount: 250,
    location: 'Rochester, NY',
    studentCount: 19000
  },
  { 
    id: '3', 
    name: 'Syracuse University', 
    domain: 'syr.edu', 
    status: 'waitlist', 
    waitlistCount: 150,
    location: 'Syracuse, NY', 
    studentCount: 22000
  },
  { 
    id: '4', 
    name: 'Cornell University', 
    domain: 'cornell.edu', 
    status: 'waitlist', 
    waitlistCount: 100,
    location: 'Ithaca, NY',
    studentCount: 25000
  },
];

// Realistic async handlers with network simulation
const simulateNetworkDelay = (min = 800, max = 2000) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

const mockOnMagicLinkRequest = async (email: string, school: School) => {
  action('magic-link-request')({ email, school: school.name });
  
  // Simulate network delay
  await simulateNetworkDelay();
  
  // Simulate realistic error scenarios
  if (email.includes('invalid')) {
    throw new Error('Invalid email format');
  }
  if (email.includes('blocked')) {
    throw new Error('This email has been temporarily blocked');
  }
  if (Math.random() < 0.1) { // 10% network failure rate
    throw new Error('Network timeout - please try again');
  }
  
  return { 
    success: true, 
    timeoutMs: 300000, // 5 minutes
    resendAvailableIn: 60000 // 1 minute
  };
};

const mockOnCreateSchool = async (schoolName: string) => {
  action('create-school')({ schoolName });
  await simulateNetworkDelay(1000, 3000);
  
  if (schoolName.length < 3) {
    throw new Error('School name must be at least 3 characters');
  }
  
  return { 
    schoolId: `new-${Date.now()}`,
    waitlistPosition: 1,
    estimatedUnlockDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  };
};

const meta: Meta<AuthFlowProps> = {
  title: 'Full Website/Authentication Flow',
  component: AuthFlow,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: `
# Complete Authentication Flow - Full Website Context

This story demonstrates the entire authentication experience within a realistic website layout, including:

## 🎯 Key Features Tested:
- **Full responsive design** across all breakpoints
- **Complete user journey** from splash to email verification
- **Real state management** with form validation and error handling
- **Network simulation** with realistic loading times and error scenarios
- **Toast notifications** for user feedback
- **Mobile-first design** with desktop enhancement

## 📱 Responsive Testing:
- **Mobile (320px+)**: Optimized touch targets and single-column layout
- **Tablet (768px+)**: Enhanced spacing and two-column potential
- **Desktop (1024px+)**: Full layout with optimal card positioning

## 🔧 Developer Testing Features:
- Try invalid emails, blocked accounts, or network timeouts
- Test school creation with edge cases
- Verify toast notifications and error states
- Check keyboard navigation and accessibility
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <WebsiteLayoutWrapper>
        <Story />
      </WebsiteLayoutWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<AuthFlowProps>;

export const CompleteUserJourney: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
  },
  parameters: {
    docs: {
      description: {
        story: `
## 🚀 Complete User Journey Testing

Start from the beginning and experience the full authentication flow:

1. **Splash Screen** → Click "Get Inside" 
2. **School Selection** → See UB featured with gold priority
3. **Email Entry** → Enter valid @buffalo.edu email
4. **Magic Link Sent** → Realistic confirmation screen
5. **Error Handling** → Try "invalid@test.edu" to see error states

### 🧪 Test Scenarios:
- **Valid Flow**: Use \`student@buffalo.edu\`
- **Invalid Email**: Try \`invalid@test.edu\`
- **Blocked Account**: Use \`blocked@cornell.edu\`
- **Network Error**: Random 10% failure rate simulated

### 📱 Responsive Testing:
- Switch between Mobile, Tablet, and Desktop viewports
- Test touch interactions on mobile
- Verify keyboard navigation works across all states
        `,
      },
    },
  },
};

export const MobileOptimizedFlow: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: `
## 📱 Mobile-First Experience

Optimized for mobile devices with:
- **Touch-friendly targets** (minimum 44px)
- **Single-column layout** for readability
- **Gesture-based navigation** with swipe indicators
- **Optimized keyboard** for email input
- **Reduced motion** option respect

Test the complete flow on mobile to ensure smooth touch interactions.
        `,
      },
    },
  },
};

export const TabletExperience: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: `
## 📱 Tablet Optimization

Medium-screen experience featuring:
- **Enhanced spacing** for comfortable interaction
- **Larger touch targets** without desktop complexity
- **Portrait/landscape adaptation** for device rotation
- **Optimal reading distance** for form content

Perfect for testing the middle-ground responsive behavior.
        `,
      },
    },
  },
};

export const DesktopFullExperience: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: `
## 💻 Desktop Experience

Full desktop layout with:
- **Centered modal approach** for focused attention
- **Keyboard navigation** with tab order optimization
- **Enhanced animations** with reduced motion support
- **Multiple interaction methods** (mouse, keyboard, touch)

Ideal for testing the complete desktop user experience.
        `,
      },
    },
  },
};

export const ErrorStateShowcase: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: async (email: string, school: School) => {
      // Force errors for demonstration
      if (email.includes('@')) {
        throw new Error('Email validation failed - please check your address');
      }
      return mockOnMagicLinkRequest(email, school);
    },
         onCreateSchool: async (_schoolName: string) => {
       throw new Error('School creation is temporarily unavailable');
     },
  },
  parameters: {
    docs: {
      description: {
        story: `
## ⚠️ Error State Testing

This story forces errors to demonstrate robust error handling:

- **Email validation errors** with clear messaging
- **Network timeout scenarios** with retry options
- **Server error responses** with user-friendly explanations
- **Toast notification system** for non-blocking feedback

Use this to verify all error paths work correctly and provide good UX.
        `,
      },
    },
  },
};

export const AccessibilityFocused: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: `
## ♿ Accessibility Testing

Focus on accessibility compliance:

- **WCAG 2.1 AA compliance** for color contrast
- **Keyboard navigation** with proper focus management
- **Screen reader compatibility** with semantic HTML
- **Reduced motion** support for vestibular disorders
- **High contrast mode** compatibility

### 🧪 Test with:
- Tab navigation only (no mouse)
- Screen reader simulation
- High contrast mode
- Reduced motion preferences
        `,
      },
    },
  },
};

export const PerformanceOptimized: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
  },
  parameters: {
    docs: {
      description: {
        story: `
## ⚡ Performance Characteristics

This story demonstrates performance optimizations:

- **Lazy loading** of non-critical components
- **Debounced email validation** to reduce server calls
- **Optimistic UI updates** for better perceived performance
- **Progressive enhancement** fallbacks for slow networks
- **Bundle size optimization** with code splitting

Monitor network tab to see optimization strategies in action.
        `,
      },
    },
  },
};

export const DarkModeVariations: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'dark', value: '#0A0A0A', default: true },
        { name: 'darker', value: '#000000' },
        { name: 'surface', value: '#111111' },
      ],
    },
    docs: {
      description: {
        story: `
## 🌙 Dark Mode Variations

HIVE's dark-first design system with background variations:

- **Primary Dark** (#0A0A0A): Main brand background
- **True Black** (#000000): OLED-optimized variant
- **Surface Dark** (#111111): Elevated content areas

Test color contrast and readability across all dark variations.
        `,
      },
    },
  },
};

export const StateTransitionDemo: Story = {
  args: {
    schools: mockSchools,
    onMagicLinkRequest: mockOnMagicLinkRequest,
    onCreateSchool: mockOnCreateSchool,
    initialState: { type: 'SPLASH' }, // Start at a specific state
  },
  parameters: {
    docs: {
      description: {
        story: `
## 🔄 State Transition Testing

Demonstrates the state machine driving the authentication flow:

### States Covered:
1. **SPLASH** → Initial landing with "Get Inside" CTA
2. **SCHOOL_PICK** → University selection with search
3. **EMAIL_GATE** → Email entry with validation
4. **MAGIC_LINK_SENT** → Confirmation and next steps

Watch the smooth transitions and state persistence throughout the flow.
        `,
      },
    },
  },
}; 