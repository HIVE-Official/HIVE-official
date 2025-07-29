import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertTitle, AlertDescription } from '../../../components/alert';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { AlertTriangle, CheckCircle, XCircle, Info, Lightbulb, Zap, Shield, Clock, Bell, Download, Upload, Wifi, WifiOff, Database, Server, Code, GitBranch, AlertCircle, HelpCircle, Star, Target, TrendingUp, Activity } from 'lucide-react';
const meta = {
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
// Default Alert
export const Default = {
    render: () => (_jsxs(Alert, { children: [_jsx(Info, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Information" }), _jsx(AlertDescription, { children: "This is a default alert with informational content to help guide user actions." })] }))
};
// All Variants
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsxs(Alert, { variant: "default", children: [_jsx(Info, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Default Alert" }), _jsx(AlertDescription, { children: "This is the default alert variant for general information and neutral messages." })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(XCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Destructive Alert" }), _jsx(AlertDescription, { children: "This is the destructive alert variant for errors, warnings, and critical messages." })] })] }))
};
// Status Messages
export const StatusMessages = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Success Messages" }), _jsxs(Alert, { variant: "default", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "Success!" }), _jsx(AlertDescription, { children: "Your changes have been saved successfully. All systems are operational." })] }), _jsxs(Alert, { variant: "default", children: [_jsx(Upload, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "Upload Complete" }), _jsx(AlertDescription, { children: "Your file has been uploaded and processed. It's now available in your dashboard." })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Warning Messages" }), _jsxs(Alert, { variant: "default", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500" }), _jsx(AlertTitle, { children: "Warning" }), _jsx(AlertDescription, { children: "Your subscription expires in 3 days. Renew now to avoid service interruption." })] }), _jsxs(Alert, { variant: "default", children: [_jsx(Clock, { className: "h-4 w-4 text-yellow-500" }), _jsx(AlertTitle, { children: "Maintenance Scheduled" }), _jsx(AlertDescription, { children: "System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM UTC. Some features may be unavailable." })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Error Messages" }), _jsxs(Alert, { variant: "destructive", children: [_jsx(XCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: "Failed to save changes. Please check your connection and try again." })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(WifiOff, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Connection Lost" }), _jsx(AlertDescription, { children: "Unable to connect to the server. Your changes may not be saved." })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Info Messages" }), _jsxs(Alert, { variant: "default", children: [_jsx(Lightbulb, { className: "h-4 w-4 text-blue-500" }), _jsx(AlertTitle, { children: "Tip" }), _jsx(AlertDescription, { children: "Use keyboard shortcuts Cmd+S (Mac) or Ctrl+S (Windows) to save your work quickly." })] }), _jsxs(Alert, { variant: "default", children: [_jsx(HelpCircle, { className: "h-4 w-4 text-blue-500" }), _jsx(AlertTitle, { children: "Getting Started" }), _jsx(AlertDescription, { children: "New to HIVE? Check out our documentation to learn about all the powerful features available." })] })] })] }))
};
// System Alerts
export const SystemAlerts = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Performance & System" }), _jsxs(Alert, { variant: "default", children: [_jsx(Activity, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "System Performance" }), _jsx(AlertDescription, { children: "All systems operating normally. Response time: 120ms. Uptime: 99.9%" })] }), _jsxs(Alert, { variant: "default", children: [_jsx(Server, { className: "h-4 w-4 text-yellow-500" }), _jsx(AlertTitle, { children: "High Server Load" }), _jsx(AlertDescription, { children: "Current server load is at 85%. Performance may be slower than usual." })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(Database, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Database Connection Error" }), _jsx(AlertDescription, { children: "Unable to connect to the database. Some features may not work properly." })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Security & Updates" }), _jsxs(Alert, { variant: "default", children: [_jsx(Shield, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "Security Update Available" }), _jsx(AlertDescription, { children: "A new security patch is available. Update now to keep your system secure." })] }), _jsxs(Alert, { variant: "default", children: [_jsx(Zap, { className: "h-4 w-4 text-blue-500" }), _jsx(AlertTitle, { children: "New Features Released" }), _jsx(AlertDescription, { children: "Version 2.1 is now available with enhanced performance and new collaboration tools." })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Security Alert" }), _jsx(AlertDescription, { children: "Unusual login activity detected. Please verify your account security settings." })] })] })] }))
};
// Development Alerts
export const DevelopmentAlerts = {
    render: () => (_jsx("div", { className: "space-y-6 max-w-2xl", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Development Status" }), _jsxs(Alert, { variant: "default", children: [_jsx(GitBranch, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "Deployment Successful" }), _jsx(AlertDescription, { children: "Your changes have been deployed to production. Build #1247 is now live." })] }), _jsxs(Alert, { variant: "default", children: [_jsx(Code, { className: "h-4 w-4 text-blue-500" }), _jsx(AlertTitle, { children: "Build in Progress" }), _jsx(AlertDescription, { children: "Your application is being built. This usually takes 2-3 minutes to complete." })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(XCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Build Failed" }), _jsx(AlertDescription, { children: "Build failed due to compilation errors. Check the logs for more details." })] }), _jsxs(Alert, { variant: "default", children: [_jsx(Download, { className: "h-4 w-4 text-yellow-500" }), _jsx(AlertTitle, { children: "Dependencies Updated" }), _jsx(AlertDescription, { children: "Some dependencies have been updated. Run npm install to get the latest versions." })] })] }) }))
};
// Without Icons
export const WithoutIcons = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsxs(Alert, { variant: "default", children: [_jsx(AlertTitle, { children: "Simple Alert" }), _jsx(AlertDescription, { children: "This alert doesn't use an icon, relying on clear text and styling for communication." })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTitle, { children: "Error Alert" }), _jsx(AlertDescription, { children: "This destructive alert uses color and typography to convey urgency without an icon." })] }), _jsx(Alert, { variant: "default", children: _jsx(AlertDescription, { children: "This alert only has a description without a title, useful for simple messages." }) })] }))
};
// Complex Content
export const ComplexContent = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-2xl", children: [_jsxs(Alert, { variant: "default", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-500" }), _jsx(AlertTitle, { children: "New Features Available" }), _jsx(AlertDescription, { children: _jsxs("div", { className: "space-y-3", children: [_jsx("p", { children: "We've released several new features to improve your workflow:" }), _jsxs("ul", { className: "list-disc list-inside space-y-1 text-sm", children: [_jsx("li", { children: "Advanced search with filters and sorting" }), _jsx("li", { children: "Real-time collaboration tools" }), _jsx("li", { children: "Enhanced security with 2FA support" }), _jsx("li", { children: "Mobile app improvements" })] }), _jsxs("div", { className: "flex items-center gap-2 mt-3", children: [_jsx(Badge, { variant: "primary", size: "sm", children: "New" }), _jsx(Badge, { variant: "success", size: "sm", children: "Free" })] })] }) })] }), _jsxs(Alert, { variant: "default", children: [_jsx(TrendingUp, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "Performance Insights" }), _jsx(AlertDescription, { children: _jsxs("div", { className: "space-y-3", children: [_jsx("p", { children: "Your application performance has improved significantly:" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mt-3", children: [_jsxs("div", { className: "text-center p-3 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-green-500", children: "23%" }), _jsx("div", { className: "text-xs text-gray-400", children: "Faster Load Times" })] }), _jsxs("div", { className: "text-center p-3 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-blue-500", children: "99.9%" }), _jsx("div", { className: "text-xs text-gray-400", children: "Uptime" })] })] })] }) })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Action Required" }), _jsx(AlertDescription, { children: _jsxs("div", { className: "space-y-3", children: [_jsx("p", { children: "Your account requires immediate attention:" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "error", size: "sm", children: "Critical" }), _jsx("span", { className: "text-sm", children: "Payment method expired" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "warning", size: "sm", children: "Warning" }), _jsx("span", { className: "text-sm", children: "Security settings need review" })] })] }), _jsxs("div", { className: "flex gap-2 mt-3", children: [_jsx("button", { className: "px-3 py-1 bg-red-600 text-[var(--hive-text-primary)] text-sm rounded", children: "Update Payment" }), _jsx("button", { className: "px-3 py-1 bg-gray-600 text-[var(--hive-text-primary)] text-sm rounded", children: "Review Settings" })] })] }) })] })] }))
};
// Application Context
export const ApplicationContext = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Dashboard Alerts" }), _jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs(Alert, { variant: "default", children: [_jsx(Wifi, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "System Status: Operational" }), _jsx(AlertDescription, { children: "All services are running normally. API response time: 145ms." })] }), _jsxs(Alert, { variant: "default", children: [_jsx(Bell, { className: "h-4 w-4 text-blue-500" }), _jsx(AlertTitle, { children: "3 New Notifications" }), _jsx(AlertDescription, { children: "You have unread messages and updates waiting in your inbox." })] })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Form Validation" }), _jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Email Address" }), _jsx("input", { type: "email", className: "w-full p-3 bg-gray-800 border border-red-500 rounded-lg text-[var(--hive-text-primary)]", value: "invalid-email", readOnly: true })] }), _jsxs(Alert, { variant: "destructive", children: [_jsx(XCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Invalid Email Format" }), _jsx(AlertDescription, { children: "Please enter a valid email address in the format: user@example.com" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Password" }), _jsx("input", { type: "password", className: "w-full p-3 bg-gray-800 border border-green-500 rounded-lg text-[var(--hive-text-primary)]", value: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", readOnly: true })] }), _jsxs(Alert, { variant: "default", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { children: "Strong Password" }), _jsx(AlertDescription, { children: "Your password meets all security requirements." })] })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Onboarding Progress" }), _jsx(HiveCard, { className: "p-6", children: _jsx("div", { className: "space-y-4", children: _jsxs(Alert, { variant: "default", children: [_jsx(Target, { className: "h-4 w-4 text-blue-500" }), _jsx(AlertTitle, { children: "Welcome to HIVE!" }), _jsx(AlertDescription, { children: _jsxs("div", { className: "space-y-3", children: [_jsx("p", { children: "Complete your profile setup to get the most out of HIVE:" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx("span", { className: "text-sm", children: "Create account" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx("span", { className: "text-sm", children: "Verify email" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-4 w-4 border-2 border-gray-500 rounded-full" }), _jsx("span", { className: "text-sm", children: "Complete profile" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-4 w-4 border-2 border-gray-500 rounded-full" }), _jsx("span", { className: "text-sm", children: "Join your first space" })] })] })] }) })] }) }) })] })] }))
};
// Minimal Alerts
export const MinimalAlerts = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-xl", children: [_jsx(Text, { variant: "heading-sm", className: "mb-4", children: "Minimal Alert Styles" }), _jsxs(Alert, { variant: "default", className: "border-green-500/20 bg-green-500/5", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx(AlertDescription, { className: "text-green-200", children: "Changes saved successfully." })] }), _jsxs(Alert, { variant: "default", className: "border-yellow-500/20 bg-yellow-500/5", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500" }), _jsx(AlertDescription, { className: "text-yellow-200", children: "Warning: This action cannot be undone." })] }), _jsxs(Alert, { variant: "default", className: "border-blue-500/20 bg-blue-500/5", children: [_jsx(Info, { className: "h-4 w-4 text-blue-500" }), _jsx(AlertDescription, { className: "text-blue-200", children: "Tip: Use Cmd+K to open the command palette." })] }), _jsxs(Alert, { variant: "destructive", className: "border-red-500/50 bg-red-500/10", children: [_jsx(XCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Error: Failed to process your request." })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "max-w-2xl", children: _jsxs(Alert, { ...args, children: [_jsx(Info, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Interactive Alert" }), _jsx(AlertDescription, { children: "Use the controls below to customize this alert's appearance and content." })] }) })),
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
//# sourceMappingURL=alert.stories.js.map