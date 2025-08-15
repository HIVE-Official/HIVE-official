import type { Meta, StoryObj } from '@storybook/react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../../../components/ui/alert-dialog';
import { Button } from '../../../components/ui/button';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Icon } from '../../../atomic/atoms/icon';
import { 
  AlertTriangle,
  Trash2,
  Archive,
  Download,
  Upload,
  Share,
  Copy,
  Settings,
  UserMinus,
  LogOut,
  RefreshCw,
  Database,
  ShieldAlert,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  Zap,
  Crown,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Heart,
  Star,
  Bookmark,
  Clock,
  Calendar,
  Mail,
  Phone,
  Globe,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof AlertDialog> = {
  title: '02-atoms/Overlay/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Alert Dialog Component** - Modal dialog for critical actions and confirmations

Part of the HIVE Atomic Design System providing consistent modal experiences for confirmation dialogs and important interactions.

## Features
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Context Management**: Internal context for state management between components
- **Backdrop Click**: Closes dialog when clicking outside content area
- **Keyboard Accessible**: Proper focus management and keyboard navigation
- **Action Buttons**: Dedicated Action and Cancel button components
- **Flexible Content**: Header, title, description, and footer composition
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Z-index Management**: Proper layering with backdrop overlay

## Components Structure
- **AlertDialog**: Root container managing open/close state
- **AlertDialogTrigger**: Button or element that opens the dialog
- **AlertDialogContent**: Main dialog content container
- **AlertDialogHeader**: Header section for title and description
- **AlertDialogTitle**: Main dialog title (semantic h2)
- **AlertDialogDescription**: Descriptive text content
- **AlertDialogFooter**: Footer section containing action buttons
- **AlertDialogAction**: Primary action button (auto-closes dialog)
- **AlertDialogCancel**: Cancel/secondary button (auto-closes dialog)

## Use Cases
- **Destructive Actions**: Delete confirmations, permanent changes
- **System Warnings**: Critical system messages requiring acknowledgment
- **Process Confirmations**: Important workflow steps requiring user consent
- **Error Recovery**: Error states requiring user action to proceed
- **Account Actions**: Profile changes, security updates, logout confirmations

## Accessibility Notes
- Uses proper dialog role and ARIA attributes
- Focus management when opening/closing
- Keyboard navigation support (Tab, Enter, Escape)
- Screen reader announcements for state changes
- Semantic heading structure with proper hierarchy
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state'
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes'
    },
    children: {
      control: 'text',
      description: 'Dialog content'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Alert Dialog
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

// Destructive Actions
export const DestructiveActions: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text variant="heading-sm">Destructive Action Confirmations</Text>
      
      <div className="flex flex-wrap gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-400">
                <Trash2 className="h-5 w-5" />
                Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>This action will permanently delete your account and all associated data:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    <li>All your projects and files</li>
                    <li>Profile information and settings</li>
                    <li>Collaboration history</li>
                    <li>Subscription and billing data</li>
                  </ul>
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <Badge variant="error" size="sm" className="mb-2">Critical</Badge>
                    <p className="text-sm text-red-300">This action cannot be undone.</p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Account</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Delete Forever
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              Archive Project
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-yellow-500" />
                Archive Project
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>Archiving will:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    <li>Make the project read-only</li>
                    <li>Remove it from active projects</li>
                    <li>Preserve all data for future restoration</li>
                  </ul>
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Info className="h-4 w-4 text-blue-400 mb-1" />
                    <p className="text-sm text-blue-300">You can restore archived projects at any time.</p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-yellow-600 hover:bg-yellow-700">
                Archive Project
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
              <UserMinus className="h-4 w-4 mr-2" />
              Remove User
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-400">
                <UserMinus className="h-5 w-5" />
                Remove Team Member
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>Remove John Doe from the HIVE Platform team?</p>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] font-medium">
                        JD
                      </div>
                      <div>
                        <p className="font-medium text-[var(--hive-text-primary)]">John Doe</p>
                        <p className="text-sm text-gray-400">john@example.com</p>
                        <Badge variant="secondary" size="sm">Developer</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    They will lose access to all team projects and resources immediately.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Remove User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
};

// System Alerts
export const SystemAlerts: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text variant="heading-sm">System Status & Alerts</Text>
      
      <div className="flex flex-wrap gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="border-red-500/50 text-red-400">
              <ShieldAlert className="h-4 w-4 mr-2" />
              Security Alert
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-400">
                <ShieldAlert className="h-5 w-5" />
                Security Alert
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>We detected unusual activity on your account:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-sm">Failed login attempts from unknown location</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">Last successful login: 2 hours ago</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Text variant="body-sm" className="text-blue-300">
                      We recommend changing your password and enabling two-factor authentication.
                    </Text>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Review Later</AlertDialogCancel>
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                Secure Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="border-yellow-500/50 text-yellow-400">
              <Database className="h-4 w-4 mr-2" />
              Maintenance
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-yellow-400">
                <Database className="h-5 w-5" />
                Scheduled Maintenance
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>System maintenance is scheduled for tonight:</p>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Start Time:</span>
                        <p className="text-[var(--hive-text-primary)] font-medium">2:00 AM UTC</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <p className="text-[var(--hive-text-primary)] font-medium">2 hours</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Services:</span>
                        <p className="text-[var(--hive-text-primary)] font-medium">Database, API</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Impact:</span>
                        <p className="text-[var(--hive-text-primary)] font-medium">Limited access</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Some features may be temporarily unavailable during this time.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Remind Me Later</AlertDialogCancel>
              <AlertDialogAction>Acknowledge</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="border-blue-500/50 text-blue-400">
              <RefreshCw className="h-4 w-4 mr-2" />
              Update Available
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-blue-400">
                <Zap className="h-5 w-5" />
                Update Available
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>HIVE Platform v2.1.0 is now available with exciting new features:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Enhanced collaboration tools</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Improved performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">New design system components</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Security enhancements</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="primary" size="sm">New</Badge>
                    <Badge variant="success" size="sm">Free</Badge>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Update Later</AlertDialogCancel>
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                Update Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
};

// Process Confirmations
export const ProcessConfirmations: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text variant="heading-sm">Process & Workflow Confirmations</Text>
      
      <div className="flex flex-wrap gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Publish Changes
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-500" />
                Publish Changes
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>Ready to publish your changes to production?</p>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <Text variant="body-sm" className="font-medium mb-2">Changes to be published:</Text>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Updated homepage design</li>
                      <li>• New feature announcement banner</li>
                      <li>• Performance optimizations</li>
                      <li>• Bug fixes for mobile layout</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">4 files</Badge>
                    <Badge variant="secondary" size="sm">Ready</Badge>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Review Again</AlertDialogCancel>
              <AlertDialogAction className="bg-green-600 hover:bg-green-700">
                Publish Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-500" />
                Export Data
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>Export all your HIVE Platform data?</p>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <Text variant="body-sm" className="font-medium mb-2">Export includes:</Text>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                      <div>• Projects (24)</div>
                      <div>• Templates (12)</div>
                      <div>• Assets (156)</div>
                      <div>• Settings</div>
                      <div>• Collaborations (8)</div>
                      <div>• Analytics data</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <Text variant="body-sm" className="text-yellow-300">
                      Large exports may take several minutes to process.
                    </Text>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                Start Export
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                Sign Out
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>Are you sure you want to sign out of your HIVE account?</p>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mb-1" />
                    <Text variant="body-sm" className="text-yellow-300">
                      Make sure all your work is saved. Unsaved changes will be lost.
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <Text variant="body-sm" className="text-green-300">
                      All projects are automatically saved
                    </Text>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay Signed In</AlertDialogCancel>
              <AlertDialogAction>Sign Out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
};

// Premium Features
export const PremiumFeatures: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text variant="heading-sm">Premium Feature Access</Text>
      
      <div className="flex flex-wrap gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="border-yellow-500/50">
              <Crown className="h-4 w-4 mr-2 text-yellow-500" />
              Upgrade to Pro
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-yellow-400">
                <Crown className="h-5 w-5" />
                Upgrade to HIVE Pro
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-4">
                  <p>Unlock the full potential of HIVE with Pro features:</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div>
                        <Text variant="body-sm" className="font-medium text-[var(--hive-text-primary)]">Unlimited Projects</Text>
                        <Text variant="body-xs" color="secondary">Create and manage unlimited projects</Text>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                      <Globe className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <Text variant="body-sm" className="font-medium text-[var(--hive-text-primary)]">Advanced Collaboration</Text>
                        <Text variant="body-xs" color="secondary">Real-time editing with unlimited team members</Text>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                      <Zap className="h-5 w-5 text-purple-400 mt-0.5" />
                      <div>
                        <Text variant="body-sm" className="font-medium text-[var(--hive-text-primary)]">AI-Powered Tools</Text>
                        <Text variant="body-xs" color="secondary">Smart code generation and optimization</Text>
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 rounded-lg border border-yellow-500/20">
                    <Text variant="heading-sm" className="text-yellow-400">$19/month</Text>
                    <Text variant="body-xs" color="secondary">Cancel anytime</Text>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Maybe Later</AlertDialogCancel>
              <AlertDialogAction className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600">
                Upgrade Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-purple-400">
              <Lock className="h-4 w-4 mr-2" />
              Unlock Feature
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-purple-400">
                <Lock className="h-5 w-5" />
                Premium Feature
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-3">
                  <p>Advanced Analytics is a premium feature that provides:</p>
                  <ul className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Detailed performance metrics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Custom reporting dashboards</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Data export capabilities</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm">Historical trend analysis</span>
                    </div>
                  </ul>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <Badge variant="secondary" size="sm" className="mb-2">Pro Feature</Badge>
                    <Text variant="body-sm" className="text-purple-300">
                      Start your 14-day free trial to access all premium features.
                    </Text>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Not Now</AlertDialogCancel>
              <AlertDialogAction className="bg-purple-600 hover:bg-purple-700">
                Start Free Trial
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
};

// Application Context
export const ApplicationContext: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="heading-sm">Settings Context</Text>
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text variant="heading-md">Privacy Settings</Text>
              <Text variant="body-sm" color="secondary">
                Manage your account privacy and data sharing preferences
              </Text>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Make Profile Public
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    Make Profile Public
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="space-y-3">
                      <p>Making your profile public will allow others to:</p>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• View your profile information</li>
                        <li>• See your public projects</li>
                        <li>• Send you collaboration requests</li>
                        <li>• Find you in search results</li>
                      </ul>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Info className="h-4 w-4 text-blue-400 mb-1" />
                        <Text variant="body-sm" className="text-blue-300">
                          You can change this setting back to private at any time.
                        </Text>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Private</AlertDialogCancel>
                  <AlertDialogAction>Make Public</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </HiveCard>
      </div>
      
      <div className="space-y-4">
        <Text variant="heading-sm">Project Management</Text>
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-[var(--hive-text-primary)]" />
              </div>
              <div>
                <Text variant="heading-md">HIVE Platform Redesign</Text>
                <Text variant="body-sm" color="secondary">
                  Complete UI/UX overhaul with new design system
                </Text>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="primary" size="sm">Active</Badge>
                  <Badge variant="secondary" size="sm">23 files</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <Share className="h-5 w-5 text-blue-500" />
                      Share Project
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="space-y-3">
                        <p>Choose how you want to share "HIVE Platform Redesign":</p>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg cursor-pointer hover:bg-gray-800">
                            <input type="radio" name="shareType" defaultChecked className="text-blue-500" />
                            <div>
                              <Text variant="body-sm" className="font-medium">View Only</Text>
                              <Text variant="body-xs" color="secondary">Recipients can view but not edit</Text>
                            </div>
                          </label>
                          <label className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg cursor-pointer hover:bg-gray-800">
                            <input type="radio" name="shareType" className="text-blue-500" />
                            <div>
                              <Text variant="body-sm" className="font-medium">Collaborate</Text>
                              <Text variant="body-xs" color="secondary">Recipients can view and edit</Text>
                            </div>
                          </label>
                        </div>
                        <div className="mt-3">
                          <input 
                            type="email" 
                            placeholder="Enter email addresses..." 
                            className="w-full p-3 bg-gray-800 border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-gray-400"
                          />
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Send Invitation</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-red-400">
                      <Trash2 className="h-5 w-5" />
                      Delete Project
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="space-y-3">
                        <p>Are you sure you want to delete "HIVE Platform Redesign"?</p>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <Badge variant="error" size="sm" className="mb-2">Warning</Badge>
                          <p className="text-sm text-red-300">
                            This will permanently delete 23 files and all project history. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Project</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Delete Forever
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </HiveCard>
      </div>
    </div>
  )
};

// Kitchen Sink
export const KitchenSink: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <Text variant="heading-lg">Alert Dialog Kitchen Sink</Text>
      <Text variant="body-md" color="secondary">
        Comprehensive showcase of all AlertDialog variants, use cases, and configurations
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <HelpCircle className="h-4 w-4 mr-2" />
              Basic Confirmation
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Action</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to continue? This action will proceed with the selected operation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Success Confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Success Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                Operation Successful
              </AlertDialogTitle>
              <AlertDialogDescription>
                Your changes have been saved successfully. All systems are updated and operational.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-green-600 hover:bg-green-700">
                Great!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Error Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <XCircle className="h-4 w-4 mr-2" />
              Error Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-400">
                <XCircle className="h-5 w-5" />
                Operation Failed
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-2">
                  <p>The operation could not be completed due to the following error:</p>
                  <div className="p-2 bg-red-500/10 border border-red-500/20 rounded font-mono text-sm">
                    Network timeout: Unable to connect to server
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction>Retry</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Information Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full">
              <Info className="h-4 w-4 mr-2" />
              Information
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-blue-400">
                <Info className="h-5 w-5" />
                Important Information
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-2">
                  <p>Please note the following important updates:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>System maintenance scheduled for tonight</li>
                    <li>New features will be available after restart</li>
                    <li>Backup your important data before proceeding</li>
                  </ul>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Understood</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Complex Content */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Complex Content
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Advanced Settings
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-4">
                  <p>Configure your advanced preferences:</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <span className="text-sm">Auto-save enabled</span>
                      <Badge variant="success" size="sm">On</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <span className="text-sm">Dark mode</span>
                      <Badge variant="primary" size="sm">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <span className="text-sm">Notifications</span>
                      <Badge variant="secondary" size="sm">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Save Settings</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* No Footer Actions */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Notification Only
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-yellow-400">
                <Bell className="h-5 w-5" />
                System Notification
              </AlertDialogTitle>
              <AlertDialogDescription>
                This is a simple notification dialog that only displays information without requiring user action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Acknowledge</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="max-w-2xl">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen} {...args}>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Open Interactive Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Interactive Demo</AlertDialogTitle>
              <AlertDialogDescription>
                This is an interactive AlertDialog demo. Use the controls in the story panel to customize the dialog's behavior and appearance.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
  args: {
    // Default args for the interactive demo
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different AlertDialog configurations. You can control the open state and customize behavior through the story controls.'
      }
    }
  }
};