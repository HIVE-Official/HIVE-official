import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '../../components/ui/alert-dialog';
import { HiveButton } from '../../components/hive-button';
const meta = {
    title: '03-UI/Alert Dialog',
    component: AlertDialog,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**Modal dialog for important confirmations and alerts**

Alert dialog component for critical user decisions with HIVE's premium styling. Used for destructive actions, important confirmations, and system alerts.

## When to Use
- Destructive actions (delete tool, leave space)
- Important confirmations (publish tool, activate space)
- System alerts and warnings
- Critical user decisions that need focus

## Design Principles
- **Clear Intent**: Obvious action outcomes with clear language
- **Premium Feel**: HIVE's matte obsidian glass aesthetic
- **Focused Interaction**: Blocks other actions until resolved
- **Campus Context**: Messages relevant to university platform usage

## Dialog Types
- **Destructive**: Red accent for dangerous actions
- **Warning**: Yellow accent for caution
- **Info**: Blue accent for information
- **Success**: Green accent for positive confirmations

## Accessibility
- WCAG 2.1 AA compliant modal behavior
- Focus trap within dialog
- Screen reader friendly content structure
- Escape key to cancel/close
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'warning'],
            description: 'Alert dialog style variant'
        }
    }
};
export default meta;
export const Default = {
    render: () => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { children: "Show Dialog" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }), _jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { children: "Continue" })] })] })] }))
};
export const DeleteTool = {
    render: () => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { variant: "destructive", children: "Delete Tool" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete \"Study Timer Pro\"?" }), _jsx(AlertDialogDescription, { children: "This will permanently delete your tool and remove it from all Spaces where it's planted. This action cannot be undone." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Keep Tool" }), _jsx(AlertDialogAction, { variant: "destructive", children: "Delete Tool" })] })] })] }))
};
export const LeaveSpace = {
    render: () => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { variant: "outline", children: "Leave Space" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Leave Computer Science Space?" }), _jsx(AlertDialogDescription, { children: "You'll lose access to Space tools, discussions, and events. You can rejoin later, but your activity history in this Space will be lost." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Stay in Space" }), _jsx(AlertDialogAction, { variant: "destructive", children: "Leave Space" })] })] })] }))
};
export const PublishTool = {
    render: () => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { children: "Publish Tool" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Publish \"GPA Calculator\" to Computer Science Space?" }), _jsx(AlertDialogDescription, { children: "This will make your tool available to all 2,156 members of the Computer Science Space. You can unpublish it later, but usage analytics will be shared with the community." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Keep Private" }), _jsx(AlertDialogAction, { children: "Publish Tool" })] })] })] }))
};
export const SystemAlert = {
    render: () => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { variant: "outline", children: "System Alert" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "\uD83D\uDD04 New Elements Available" }), _jsx(AlertDialogDescription, { children: "This week's Element drop includes 3 new components: Advanced Chart, PDF Generator, and Voice Recorder. Update your tools in HiveLAB to access these new capabilities." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Later" }), _jsx(AlertDialogAction, { children: "Open HiveLAB" })] })] })] }))
};
export const UnsavedChanges = {
    render: () => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { variant: "outline", children: "Exit Builder" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "\u26A0\uFE0F Unsaved Changes" }), _jsx(AlertDialogDescription, { children: "You have unsaved changes to your tool. If you leave now, your progress will be lost. Would you like to save your work first?" })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Keep Editing" }), _jsx(AlertDialogAction, { variant: "outline", children: "Exit Without Saving" }), _jsx(AlertDialogAction, { children: "Save & Exit" })] })] })] }))
};
export const SpaceActivation = {
    render: () => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { children: "Activate Space" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "\uD83D\uDE80 Ready to Activate \"Engineering\" Space?" }), _jsx(AlertDialogDescription, { children: "This will make the Engineering Space discoverable to all verified Stanford students. As the Space Builder, you'll be responsible for moderating content and managing the community." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Not Yet" }), _jsx(AlertDialogAction, { children: "Activate Space" })] })] })] }))
};
export const InteractiveDemo = {
    render: () => {
        const [result, setResult] = useState('');
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "text-center", children: _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(HiveButton, { children: "Interactive Demo" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Test Alert Dialog" }), _jsx(AlertDialogDescription, { children: "Click an action below to see the result displayed outside the dialog." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { onClick: () => setResult('User cancelled'), children: "Cancel" }), _jsx(AlertDialogAction, { onClick: () => setResult('User confirmed'), children: "Confirm" })] })] })] }) }), result && (_jsxs("div", { className: "text-center p-4 bg-hive-background-card border border-hive-border rounded-lg", children: [_jsx("div", { className: "text-sm text-hive-foreground-muted", children: "Result:" }), _jsx("div", { className: "font-medium", children: result })] }))] }));
    }
};
//# sourceMappingURL=alert-dialog.stories.js.map