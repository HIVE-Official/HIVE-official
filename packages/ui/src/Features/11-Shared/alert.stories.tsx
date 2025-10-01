import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '../../atomic/atoms/alert';
import { AlertCircle, CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * # Alert (shadcn/ui)
 *
 * **Compound Component** - Full-width notification/message banner
 *
 * ## Features
 * - ✅ Two semantic variants (default, destructive)
 * - ✅ Icon support with automatic positioning
 * - ✅ WCAG role="alert" for screen readers
 * - ✅ Compound pattern: Alert + AlertTitle + AlertDescription
 * - ✅ Full-width block display
 * - ✅ Squared corners (Vercel Geist aesthetic)
 *
 * ## Composition
 * ```tsx
 * <Alert>
 *   <Icon className="h-4 w-4" />
 *   <AlertTitle>Title</AlertTitle>
 *   <AlertDescription>Description text</AlertDescription>
 * </Alert>
 * ```
 *
 * ## Usage
 * - Form validation feedback
 * - System status messages
 * - Important announcements
 * - Error/success notifications
 */
const meta = {
  title: '11-Shared/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'shadcn/ui Alert component for displaying important messages. Use Alert + AlertTitle + AlertDescription composition. Supports icons with automatic positioning.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Semantic variant - default for info, destructive for errors',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default alert (informational)
 */
export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is a default informational alert message.</AlertDescription>
    </Alert>
  ),
};

/**
 * All variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          General information, tips, or neutral status updates.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>Errors, critical warnings, or failed operations.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Variant Guidelines:**\\n- `default`: Info, tips, neutral messages\\n- `destructive`: Errors, critical warnings',
      },
    },
  },
};

/**
 * With icons (recommended pattern)
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Your profile has been successfully updated with new information.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to save changes. Please check your connection and try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icons are automatically positioned to the left. Use lucide-react icons at h-4 w-4 size.',
      },
    },
  },
};

/**
 * Different icon types
 */
export const IconTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>General information or neutral updates.</AlertDescription>
      </Alert>

      <Alert>
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed successfully.</AlertDescription>
      </Alert>

      <Alert>
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action may have unintended consequences. Proceed with caution.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>An error occurred while processing your request.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use semantic icons: Info (neutral), CheckCircle2 (success), AlertTriangle (warning), XCircle (error).',
      },
    },
  },
};

/**
 * Title only (brief alerts)
 */
export const TitleOnly: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle>Profile updated successfully</AlertTitle>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Failed to connect to server</AlertTitle>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Brief alerts with title only. Use for simple status messages.',
      },
    },
  },
};

/**
 * Description only (no title)
 */
export const DescriptionOnly: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This space has been archived and is now read-only. Contact an admin to restore access.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your session has expired. Please sign in again to continue.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts without title. Use for single-line messages or simple notifications.',
      },
    },
  },
};

/**
 * Long content
 */
export const LongContent: Story = {
  render: () => (
    <Alert className="max-w-2xl">
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
      <AlertTitle>Terms of Service Update</AlertTitle>
      <AlertDescription>
        We've updated our Terms of Service to include new community guidelines and content policies.
        By continuing to use HIVE, you agree to these updated terms. Key changes include enhanced
        privacy protections, clearer content moderation rules, and updated data retention policies.
        Please review the full terms at hive.app/terms.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts automatically handle long content with proper wrapping.',
      },
    },
  },
};

/**
 * Custom colors (success example)
 */
export const CustomColors: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert className="border-green-500/50 bg-green-500/10 text-green-500">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle className="text-green-500">Success</AlertTitle>
        <AlertDescription className="text-green-500/90">
          Your space "ACM Club" has been created successfully!
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-500/50 bg-yellow-500/10 text-yellow-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-yellow-500">Warning</AlertTitle>
        <AlertDescription className="text-yellow-500/90">
          This space will be archived in 7 days due to inactivity.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom success/warning colors using className. Match border, bg, and text colors.',
      },
    },
  },
};

/**
 * Real-world: Form validation
 */
export const FormValidation: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Validation Error</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Email must be a valid @buffalo.edu address</li>
            <li>Password must be at least 8 characters</li>
            <li>Profile photo is required</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form validation errors displayed as alert with bullet list.',
      },
    },
  },
};

/**
 * Real-world: Space announcement
 */
export const SpaceAnnouncement: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Alert className="border-primary/50 bg-primary/10">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">New Ritual: Morning Gratitude</AlertTitle>
        <AlertDescription className="text-foreground">
          Join our campus-wide morning gratitude ritual! Check in daily at 9am to share what you're
          grateful for. Track streaks and earn recognition badges.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Space announcement with gold accent (primary color) for featured content.',
      },
    },
  },
};

/**
 * Real-world: System status
 */
export const SystemStatus: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertTitle className="text-yellow-500">Scheduled Maintenance</AlertTitle>
        <AlertDescription className="text-yellow-500/90">
          HIVE will be unavailable on Sunday, Oct 15 from 2-4am EST for scheduled maintenance.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'System maintenance notification with warning styling.',
      },
    },
  },
};

/**
 * Dismissible pattern (with button)
 */
export const Dismissible: Story = {
  render: () => (
    <Alert className="max-w-2xl">
      <Info className="h-4 w-4" />
      <div className="flex items-start justify-between flex-1">
        <div>
          <AlertTitle>New features available</AlertTitle>
          <AlertDescription>
            Check out our updated profile customization options and new ritual badges.
          </AlertDescription>
        </div>
        <button
          className="text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible alert with close button. Use flex layout for proper alignment.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Alerts optimized for true black backgrounds with subtle borders.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Destructive variant with high contrast for visibility on dark backgrounds.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Alerts optimized for true black backgrounds. Squared corners for technical feel.',
      },
    },
  },
};
