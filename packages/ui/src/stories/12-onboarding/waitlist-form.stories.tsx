import type { Meta, StoryObj } from "@storybook/react";
import { WaitlistForm } from "../../components/waitlist-form";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof WaitlistForm> = {
  title: "12. Onboarding/Waitlist Form",
  component: WaitlistForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Waitlist Form

A sleek waitlist signup form for pre-launch user acquisition. Features:

## Key Features
- **Email Collection**: Validates .edu email addresses for campus verification
- **Loading States**: Visual feedback during submission
- **Success Animation**: Smooth transition to confirmation state
- **HIVE Branding**: Uses HIVE design system components
- **Motion System**: Integrated with गति (HIVE motion library)

## Design Elements
- Premium HIVE card styling with elevation
- Gold accent colors matching HIVE brand
- Responsive layout with proper spacing
- Micro-interactions for enhanced UX

## Use Cases
- Pre-launch landing pages
- Campus beta program signups
- Early access registration
- University partnership onboarding
        `
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    onSubmit: { 
      action: "submitted",
      description: 'Callback function when form is submitted'
    },
  },
};

export default meta;
type Story = StoryObj<typeof WaitlistForm>;

// Mock submission function for stories
const mockSubmit = async (email: string) => {
  action("submitted")(email);
  console.log('Waitlist submission:', email);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  if (email.includes('error')) {
    throw new Error('Submission failed');
  }
};

export const Default: Story = {
  args: {
    onSubmit: mockSubmit
  }
};

export const LoadingState: Story = {
  args: {
    onSubmit: async (email: string) => {
      action("loading-demo")(email);
      console.log('Loading state demo:', email);
      // Extended delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the loading state during form submission with extended delay.'
      }
    }
  }
};

export const SuccessState: Story = {
  args: {
    onSubmit: async (email: string) => {
      action("success-demo")(email);
      console.log('Success state demo:', email);
      // Quick success
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the success animation and confirmation message after form submission.'
      }
    }
  }
};

export const ErrorState: Story = {
  args: {
    onSubmit: async (email: string) => {
      action("error-demo")(email);
      console.log('Error state demo:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Network error - please try again');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates error handling when form submission fails.'
      }
    }
  }
};

// Campus-specific examples
export const BuffaloStudents: Story = {
  args: {
    onSubmit: mockSubmit
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          University at Buffalo
        </h2>
        <p className="text-[var(--hive-text-muted)]">
          Join the HIVE community at UB
        </p>
      </div>
      <WaitlistForm {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific branding for University at Buffalo students.'
      }
    }
  }
};

export const StoneyBrookStudents: Story = {
  args: {
    onSubmit: mockSubmit
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          Stony Brook University
        </h2>
        <p className="text-[var(--hive-text-muted)]">
          Connect with builders at Stony Brook
        </p>
      </div>
      <WaitlistForm {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific branding for Stony Brook University students.'
      }
    }
  }
};

export const MultipleFormsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] text-center">
          Engineering Students
        </h3>
        <WaitlistForm onSubmit={mockSubmit} />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] text-center">
          Business Students
        </h3>
        <WaitlistForm onSubmit={mockSubmit} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple waitlist forms for different student demographics.'
      }
    }
  }
};

// Dark theme showcase
export const DarkTheme: Story = {
  args: {
    onSubmit: mockSubmit
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    docs: {
      description: {
        story: 'Waitlist form in dark theme environment.'
      }
    }
  },
  render: (args) => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen flex items-center justify-center">
      <WaitlistForm {...args} />
    </div>
  )
};

// Integration with landing page
export const LandingPageIntegration: Story = {
  args: {
    onSubmit: mockSubmit
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete landing page integration showing waitlist form in context with hero content and metrics.'
      }
    }
  },
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--hive-text-primary)]">
              Build the Future
              <span className="text-[var(--hive-brand-primary)]"> Together</span>
            </h1>
            <p className="text-xl text-[var(--hive-text-muted)]">
              HIVE is the digital campus platform where student builders create tools, 
              share knowledge, and transform their university experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">1000+</div>
              <div className="text-sm text-[var(--hive-text-muted)]">Student Builders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">50+</div>
              <div className="text-sm text-[var(--hive-text-muted)]">Campus Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-brand-primary)]">25</div>
              <div className="text-sm text-[var(--hive-text-muted)]">Universities</div>
            </div>
          </div>
        </div>
        
        {/* Waitlist Form */}
        <div className="flex justify-center">
          <WaitlistForm {...args} />
        </div>
      </div>
    </div>
  )
};
