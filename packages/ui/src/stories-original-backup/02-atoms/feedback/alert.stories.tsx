import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '../../../components/alert';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Icon } from '../../../atomic/atoms/icon';
import { 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Lightbulb,
  Zap,
  Shield,
  Clock,
  Bell,
  Download,
  Upload,
  Wifi,
  WifiOff,
  Database,
  Server,
  Code,
  GitBranch,
  AlertCircle,
  HelpCircle,
  Star,
  Bookmark,
  Heart,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: '02-atoms/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Alert Component** - Status messages and notifications for user feedback

Part of the HIVE Atomic Design System providing consistent feedback communication across the platform.

## Features
- **2 Semantic Variants**: Default and destructive with appropriate styling
- **Icon Support**: SVG icons with automatic positioning and spacing
- **Structured Content**: Title and description components for organized messaging
- **Accessibility**: Proper ARIA roles and semantic structure
- **Flexible Layout**: Accommodates various content types and lengths
- **Visual Hierarchy**: Clear distinction between title and description content

## Components
- **Alert**: Root container with variant styling and ARIA role
- **AlertTitle**: Semantic heading for alert titles
- **AlertDescription**: Content area for detailed alert messages

## Use Cases
- **System Status**: Server status, maintenance notifications
- **User Actions**: Success confirmations, error messages
- **Information**: Tips, warnings, and helpful information
- **Process Updates**: Loading states, completion notifications
- **Validation**: Form errors and success messages

## Accessibility Notes
- Uses proper alert role for screen reader announcements
- Semantic heading structure with AlertTitle
- Icon positioning accounts for screen reader navigation
- Clear visual hierarchy for easy scanning
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Alert variant style'
    },
    children: {
      control: 'text',
      description: 'Alert content (can include AlertTitle and AlertDescription)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Alert
export const Default: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a default alert with informational content to help guide user actions.
      </AlertDescription>
    </Alert>
  )
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert variant="default">
        <Info className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is the default alert variant for general information and neutral messages.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is the destructive alert variant for errors, warnings, and critical messages.
        </AlertDescription>
      </Alert>
    </div>
  )
};

// Status Messages
export const StatusMessages: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Success Messages</Text>
        <Alert variant="default">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully. All systems are operational.
          </AlertDescription>
        </Alert>
        
        <Alert variant="default">
          <Upload className="h-4 w-4 text-green-500" />
          <AlertTitle>Upload Complete</AlertTitle>
          <AlertDescription>
            Your file has been uploaded and processed. It's now available in your dashboard.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Warning Messages</Text>
        <Alert variant="default">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Your subscription expires in 3 days. Renew now to avoid service interruption.
          </AlertDescription>
        </Alert>
        
        <Alert variant="default">
          <Clock className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Maintenance Scheduled</AlertTitle>
          <AlertDescription>
            System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM UTC. Some features may be unavailable.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Error Messages</Text>
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to save changes. Please check your connection and try again.
          </AlertDescription>
        </Alert>
        
        <Alert variant="destructive">
          <WifiOff className="h-4 w-4" />
          <AlertTitle>Connection Lost</AlertTitle>
          <AlertDescription>
            Unable to connect to the server. Your changes may not be saved.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Info Messages</Text>
        <Alert variant="default">
          <Lightbulb className="h-4 w-4 text-blue-500" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>
            Use keyboard shortcuts Cmd+S (Mac) or Ctrl+S (Windows) to save your work quickly.
          </AlertDescription>
        </Alert>
        
        <Alert variant="default">
          <HelpCircle className="h-4 w-4 text-blue-500" />
          <AlertTitle>Getting Started</AlertTitle>
          <AlertDescription>
            New to HIVE? Check out our documentation to learn about all the powerful features available.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
};

// System Alerts
export const SystemAlerts: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Performance & System</Text>
        
        <Alert variant="default">
          <Activity className="h-4 w-4 text-green-500" />
          <AlertTitle>System Performance</AlertTitle>
          <AlertDescription>
            All systems operating normally. Response time: 120ms. Uptime: 99.9%
          </AlertDescription>
        </Alert>
        
        <Alert variant="default">
          <Server className="h-4 w-4 text-yellow-500" />
          <AlertTitle>High Server Load</AlertTitle>
          <AlertDescription>
            Current server load is at 85%. Performance may be slower than usual.
          </AlertDescription>
        </Alert>
        
        <Alert variant="destructive">
          <Database className="h-4 w-4" />
          <AlertTitle>Database Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to the database. Some features may not work properly.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Security & Updates</Text>
        
        <Alert variant="default">
          <Shield className="h-4 w-4 text-green-500" />
          <AlertTitle>Security Update Available</AlertTitle>
          <AlertDescription>
            A new security patch is available. Update now to keep your system secure.
          </AlertDescription>
        </Alert>
        
        <Alert variant="default">
          <Zap className="h-4 w-4 text-blue-500" />
          <AlertTitle>New Features Released</AlertTitle>
          <AlertDescription>
            Version 2.1 is now available with enhanced performance and new collaboration tools.
          </AlertDescription>
        </Alert>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Security Alert</AlertTitle>
          <AlertDescription>
            Unusual login activity detected. Please verify your account security settings.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
};

// Development Alerts
export const DevelopmentAlerts: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Development Status</Text>
        
        <Alert variant="default">
          <GitBranch className="h-4 w-4 text-green-500" />
          <AlertTitle>Deployment Successful</AlertTitle>
          <AlertDescription>
            Your changes have been deployed to production. Build #1247 is now live.
          </AlertDescription>
        </Alert>
        
        <Alert variant="default">
          <Code className="h-4 w-4 text-blue-500" />
          <AlertTitle>Build in Progress</AlertTitle>
          <AlertDescription>
            Your application is being built. This usually takes 2-3 minutes to complete.
          </AlertDescription>
        </Alert>
        
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Build Failed</AlertTitle>
          <AlertDescription>
            Build failed due to compilation errors. Check the logs for more details.
          </AlertDescription>
        </Alert>
        
        <Alert variant="default">
          <Download className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Dependencies Updated</AlertTitle>
          <AlertDescription>
            Some dependencies have been updated. Run npm install to get the latest versions.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
};

// Without Icons
export const WithoutIcons: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert variant="default">
        <AlertTitle>Simple Alert</AlertTitle>
        <AlertDescription>
          This alert doesn't use an icon, relying on clear text and styling for communication.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>
          This destructive alert uses color and typography to convey urgency without an icon.
        </AlertDescription>
      </Alert>
      
      <Alert variant="default">
        <AlertDescription>
          This alert only has a description without a title, useful for simple messages.
        </AlertDescription>
      </Alert>
    </div>
  )
};

// Complex Content
export const ComplexContent: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Alert variant="default">
        <Star className="h-4 w-4 text-yellow-500" />
        <AlertTitle>New Features Available</AlertTitle>
        <AlertDescription>
          <div className="space-y-3">
            <p>We've released several new features to improve your workflow:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Advanced search with filters and sorting</li>
              <li>Real-time collaboration tools</li>
              <li>Enhanced security with 2FA support</li>
              <li>Mobile app improvements</li>
            </ul>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="primary" size="sm">New</Badge>
              <Badge variant="success" size="sm">Free</Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>
      
      <Alert variant="default">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <AlertTitle>Performance Insights</AlertTitle>
        <AlertDescription>
          <div className="space-y-3">
            <p>Your application performance has improved significantly:</p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-green-500">23%</div>
                <div className="text-xs text-gray-400">Faster Load Times</div>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-blue-500">99.9%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Action Required</AlertTitle>
        <AlertDescription>
          <div className="space-y-3">
            <p>Your account requires immediate attention:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="error" size="sm">Critical</Badge>
                <span className="text-sm">Payment method expired</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning" size="sm">Warning</Badge>
                <span className="text-sm">Security settings need review</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-red-600 text-[var(--hive-text-primary)] text-sm rounded">
                Update Payment
              </button>
              <button className="px-3 py-1 bg-gray-600 text-[var(--hive-text-primary)] text-sm rounded">
                Review Settings
              </button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
};

// Application Context
export const ApplicationContext: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Dashboard Alerts</Text>
        <HiveCard className="p-6">
          <div className="space-y-4">
            <Alert variant="default">
              <Wifi className="h-4 w-4 text-green-500" />
              <AlertTitle>System Status: Operational</AlertTitle>
              <AlertDescription>
                All services are running normally. API response time: 145ms.
              </AlertDescription>
            </Alert>
            
            <Alert variant="default">
              <Bell className="h-4 w-4 text-blue-500" />
              <AlertTitle>3 New Notifications</AlertTitle>
              <AlertDescription>
                You have unread messages and updates waiting in your inbox.
              </AlertDescription>
            </Alert>
          </div>
        </HiveCard>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Form Validation</Text>
        <HiveCard className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Email Address</label>
              <input 
                type="email" 
                className="w-full p-3 bg-gray-800 border border-red-500 rounded-lg text-[var(--hive-text-primary)]"
                value="invalid-email"
                readOnly
              />
            </div>
            
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Invalid Email Format</AlertTitle>
              <AlertDescription>
                Please enter a valid email address in the format: user@example.com
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Password</label>
              <input 
                type="password" 
                className="w-full p-3 bg-gray-800 border border-green-500 rounded-lg text-[var(--hive-text-primary)]"
                value="••••••••"
                readOnly
              />
            </div>
            
            <Alert variant="default">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Strong Password</AlertTitle>
              <AlertDescription>
                Your password meets all security requirements.
              </AlertDescription>
            </Alert>
          </div>
        </HiveCard>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Onboarding Progress</Text>
        <HiveCard className="p-6">
          <div className="space-y-4">
            <Alert variant="default">
              <Target className="h-4 w-4 text-blue-500" />
              <AlertTitle>Welcome to HIVE!</AlertTitle>
              <AlertDescription>
                <div className="space-y-3">
                  <p>Complete your profile setup to get the most out of HIVE:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Create account</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Verify email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-gray-500 rounded-full" />
                      <span className="text-sm">Complete profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-gray-500 rounded-full" />
                      <span className="text-sm">Join your first space</span>
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

// Minimal Alerts
export const MinimalAlerts: Story = {
  render: () => (
    <div className="space-y-4 max-w-xl">
      <Text variant="heading-sm" className="mb-4">Minimal Alert Styles</Text>
      
      <Alert variant="default" className="border-green-500/20 bg-green-500/5">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-200">
          Changes saved successfully.
        </AlertDescription>
      </Alert>
      
      <Alert variant="default" className="border-yellow-500/20 bg-yellow-500/5">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-yellow-200">
          Warning: This action cannot be undone.
        </AlertDescription>
      </Alert>
      
      <Alert variant="default" className="border-blue-500/20 bg-blue-500/5">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-200">
          Tip: Use Cmd+K to open the command palette.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          Error: Failed to process your request.
        </AlertDescription>
      </Alert>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <Alert {...args}>
        <Info className="h-4 w-4" />
        <AlertTitle>Interactive Alert</AlertTitle>
        <AlertDescription>
          Use the controls below to customize this alert's appearance and content.
        </AlertDescription>
      </Alert>
    </div>
  ),
  args: {
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different alert configurations. You can change the variant and customize the styling.'
      }
    }
  }
};