import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveNavigationShell } from '../../components/navigation/hive-navigation-shell';
import { Home, Users, Zap, Settings, User } from 'lucide-react';
const meta = {
    title: '11-Shell/Getting Started with Navigation',
    component: HiveNavigationShell,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Getting Started with HIVE Navigation

This guide shows you how to quickly set up navigation in your HIVE application.

## 1. Basic Setup

The simplest way to add navigation to your app is with the \`HiveNavigationShell\` component:

\`\`\`tsx
import { HiveNavigationShell } from '@hive/ui';

const sections = [
  {
    id: 'main',
    label: 'Main',
    items: [
      { id: 'feed', label: 'Feed', icon: Home, href: '/', isActive: true },
      { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces' }
    ]
  }
];

function App() {
  return (
    <HiveNavigationShell sections={sections}>
      <YourAppContent />
    </HiveNavigationShell>
  );
}
\`\`\`

## 2. Add User Information

Include user information for a complete experience:

\`\`\`tsx
const user = {
  id: 'user-1',
  name: 'Alex Rivera',
  handle: 'alexr',
  avatar: '/path/to/avatar.jpg'
};

<HiveNavigationShell sections={sections} user={user}>
  <YourAppContent />
</HiveNavigationShell>
\`\`\`

## 3. Choose Your Variant

Select the navigation style that fits your app:

\`\`\`tsx
// Sidebar (default) - Traditional left sidebar
<HiveNavigationShell variant="sidebar" sections={sections} />

// Topbar - Horizontal navigation bar
<HiveNavigationShell variant="topbar" sections={sections} />

// Command - Minimal with command palette
<HiveNavigationShell variant="command" sections={sections} />

// Minimal - Floating navigation
<HiveNavigationShell variant="minimal" sections={sections} />
\`\`\`

## 4. Handle Navigation

Add navigation handling to respond to user clicks:

\`\`\`tsx
function App() {
  const handleNavigate = (item) => {
    console.log('Navigating to:', item.href);
    // Add your navigation logic here
  };

  return (
    <HiveNavigationShell 
      sections={sections} 
      onNavigate={handleNavigate}
    >
      <YourAppContent />
    </HiveNavigationShell>
  );
}
\`\`\`

## 5. Customize Features

Enable or disable features based on your needs:

\`\`\`tsx
<HiveNavigationShell
  sections={sections}
  showSearch={true}           // Enable search
  showNotifications={true}    // Enable notifications
  showUserMenu={true}         // Enable user menu
  keyboardShortcuts={true}    // Enable keyboard shortcuts
  collapsible={true}          // Enable sidebar collapse
>
  <YourAppContent />
</HiveNavigationShell>
\`\`\`

That's it! You now have a fully functional navigation system.
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Simple content component for examples
const ExampleContent = ({ title, description }) => (_jsxs("div", { className: "p-8 max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", style: { color: 'var(--hive-text-primary)' }, children: title }), _jsx("p", { className: "text-lg mb-8", style: { color: 'var(--hive-text-secondary)' }, children: description }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "p-6 rounded-lg border", style: {
                        backgroundColor: 'var(--hive-background-secondary)',
                        borderColor: 'var(--hive-border-primary)'
                    }, children: [_jsx("h3", { className: "font-semibold mb-3", style: { color: 'var(--hive-text-primary)' }, children: "Quick Actions" }), _jsxs("div", { className: "space-y-2", children: [_jsx("button", { className: "w-full text-left p-2 rounded hover:bg-gray-700 transition-colors", children: "Create New Tool" }), _jsx("button", { className: "w-full text-left p-2 rounded hover:bg-gray-700 transition-colors", children: "Join Study Group" }), _jsx("button", { className: "w-full text-left p-2 rounded hover:bg-gray-700 transition-colors", children: "View Analytics" })] })] }), _jsxs("div", { className: "p-6 rounded-lg border", style: {
                        backgroundColor: 'var(--hive-background-secondary)',
                        borderColor: 'var(--hive-border-primary)'
                    }, children: [_jsx("h3", { className: "font-semibold mb-3", style: { color: 'var(--hive-text-primary)' }, children: "Recent Activity" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { children: "Built GPA calculator" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { children: "Joined CS Study Group" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-yellow-500 rounded-full" }), _jsx("span", { children: "Updated profile" })] })] })] })] })] }));
// Basic navigation sections
const basicSections = [
    {
        id: 'main',
        label: 'Main',
        items: [
            {
                id: 'feed',
                label: 'Feed',
                icon: Home,
                href: '/',
                isActive: true
            },
            {
                id: 'spaces',
                label: 'Spaces',
                icon: Users,
                href: '/spaces'
            },
            {
                id: 'build',
                label: 'Build',
                icon: Zap,
                href: '/build'
            }
        ]
    },
    {
        id: 'personal',
        label: 'Personal',
        items: [
            {
                id: 'profile',
                label: 'Profile',
                icon: User,
                href: '/profile'
            },
            {
                id: 'settings',
                label: 'Settings',
                icon: Settings,
                href: '/settings'
            }
        ]
    }
];
// ============================================================================
// GETTING STARTED STORIES
// ============================================================================
export const Step1_BasicSetup = {
    name: '1. Basic Setup',
    args: {
        sections: basicSections,
        children: (_jsx(ExampleContent, { title: "Step 1: Basic Setup", description: "This is the simplest navigation setup - just pass your navigation sections and you're ready to go!" }))
    }
};
export const Step2_AddUser = {
    name: '2. Add User Information',
    args: {
        sections: basicSections,
        user: {
            id: 'user-1',
            name: 'Alex Rivera',
            handle: 'alexr',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        children: (_jsx(ExampleContent, { title: "Step 2: Add User Information", description: "Add user information to enable the user menu and personalized experience." }))
    }
};
export const Step3_ChooseVariant = {
    name: '3. Choose Your Variant',
    args: {
        variant: 'topbar',
        sections: basicSections,
        user: {
            id: 'user-1',
            name: 'Alex Rivera',
            handle: 'alexr',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        children: (_jsx(ExampleContent, { title: "Step 3: Choose Your Variant", description: "This example shows the 'topbar' variant. Try changing the variant in the controls to see different navigation styles." }))
    }
};
export const Step4_HandleNavigation = {
    name: '4. Handle Navigation',
    args: {
        sections: basicSections,
        user: {
            id: 'user-1',
            name: 'Alex Rivera',
            handle: 'alexr',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        onNavigate: (item) => {
            console.log('Navigating to:', item.href);
            alert(`Navigating to: ${item.label} (${item.href})`);
        },
        children: (_jsx(ExampleContent, { title: "Step 4: Handle Navigation", description: "Click any navigation item to see the navigation handler in action. Check the console for logs." }))
    }
};
export const Step5_CustomizeFeatures = {
    name: '5. Customize Features',
    args: {
        sections: basicSections,
        user: {
            id: 'user-1',
            name: 'Alex Rivera',
            handle: 'alexr',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        keyboardShortcuts: true,
        collapsible: true,
        children: (_jsx(ExampleContent, { title: "Step 5: Customize Features", description: "Enable features like search, notifications, keyboard shortcuts, and more. Try pressing Cmd+K to open the search!" }))
    }
};
// ============================================================================
// COMPARISON EXAMPLES
// ============================================================================
export const AllVariantsComparison = {
    name: 'All Variants Comparison',
    render: () => (_jsxs("div", { className: "space-y-8 p-8", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-8", style: { color: 'var(--hive-text-primary)' }, children: "Navigation Variants Comparison" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", style: { color: 'var(--hive-text-primary)' }, children: "Sidebar Navigation" }), _jsx("div", { className: "text-sm", style: { color: 'var(--hive-text-secondary)' }, children: "Traditional left sidebar - perfect for desktop applications" }), _jsx("div", { className: "border rounded-lg overflow-hidden", style: { borderColor: 'var(--hive-border-primary)' }, children: _jsx("div", { className: "h-40 bg-gray-800 flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: "Sidebar variant preview" }) }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", style: { color: 'var(--hive-text-primary)' }, children: "Topbar Navigation" }), _jsx("div", { className: "text-sm", style: { color: 'var(--hive-text-secondary)' }, children: "Horizontal navigation bar - great for content-heavy apps" }), _jsx("div", { className: "border rounded-lg overflow-hidden", style: { borderColor: 'var(--hive-border-primary)' }, children: _jsx("div", { className: "h-40 bg-gray-800 flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: "Topbar variant preview" }) }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", style: { color: 'var(--hive-text-primary)' }, children: "Command Navigation" }), _jsx("div", { className: "text-sm", style: { color: 'var(--hive-text-secondary)' }, children: "Minimal UI with command palette - ideal for power users" }), _jsx("div", { className: "border rounded-lg overflow-hidden", style: { borderColor: 'var(--hive-border-primary)' }, children: _jsx("div", { className: "h-40 bg-gray-800 flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: "Command variant preview" }) }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", style: { color: 'var(--hive-text-primary)' }, children: "Minimal Navigation" }), _jsx("div", { className: "text-sm", style: { color: 'var(--hive-text-secondary)' }, children: "Floating navigation - perfect for immersive experiences" }), _jsx("div", { className: "border rounded-lg overflow-hidden", style: { borderColor: 'var(--hive-border-primary)' }, children: _jsx("div", { className: "h-40 bg-gray-800 flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: "Minimal variant preview" }) }) })] })] })] }))
};
export const FullExampleApp = {
    name: 'Complete Example App',
    args: {
        variant: 'sidebar',
        size: 'standard',
        sections: [
            {
                id: 'main',
                label: 'Main Navigation',
                items: [
                    {
                        id: 'feed',
                        label: 'Feed',
                        icon: Home,
                        href: '/',
                        isActive: true,
                        description: 'Your personalized campus feed'
                    },
                    {
                        id: 'spaces',
                        label: 'Spaces',
                        icon: Users,
                        href: '/spaces',
                        badge: { count: 5 },
                        description: 'Campus communities and groups'
                    },
                    {
                        id: 'build',
                        label: 'Build',
                        icon: Zap,
                        href: '/build',
                        description: 'Create tools with HiveLab'
                    }
                ]
            },
            {
                id: 'personal',
                label: 'Personal',
                items: [
                    {
                        id: 'profile',
                        label: 'Profile',
                        icon: User,
                        href: '/profile',
                        description: 'Your personal profile'
                    },
                    {
                        id: 'settings',
                        label: 'Settings',
                        icon: Settings,
                        href: '/settings',
                        description: 'App preferences and settings'
                    }
                ]
            }
        ],
        user: {
            id: 'user-1',
            name: 'Alex Rivera',
            handle: 'alexr',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            role: 'Student',
            status: 'online'
        },
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        collapsible: true,
        keyboardShortcuts: true,
        onNavigate: (item) => console.log('Navigating to:', item),
        children: (_jsxs("div", { className: "p-8 max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", style: { color: 'var(--hive-text-primary)' }, children: "Complete Example App" }), _jsx("p", { className: "text-lg mb-6", style: { color: 'var(--hive-text-secondary)' }, children: "This example shows all features enabled: search, notifications, user menu, keyboard shortcuts, and more." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: [
                        { title: 'Active Spaces', value: '12', color: 'text-blue-400' },
                        { title: 'Tools Built', value: '8', color: 'text-green-400' },
                        { title: 'Events This Week', value: '5', color: 'text-yellow-400' }
                    ].map((metric) => (_jsxs("div", { className: "p-6 rounded-lg border", style: {
                            backgroundColor: 'var(--hive-background-secondary)',
                            borderColor: 'var(--hive-border-primary)'
                        }, children: [_jsx("h3", { className: "font-semibold mb-2", style: { color: 'var(--hive-text-secondary)' }, children: metric.title }), _jsx("p", { className: `text-2xl font-bold ${metric.color}`, children: metric.value })] }, metric.title))) }), _jsxs("div", { className: "prose prose-invert max-w-none", children: [_jsx("h2", { style: { color: 'var(--hive-text-primary)' }, children: "Try These Features" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 not-prose", children: [_jsxs("div", { className: "p-4 rounded-lg border", style: {
                                        backgroundColor: 'var(--hive-background-secondary)',
                                        borderColor: 'var(--hive-border-primary)'
                                    }, children: [_jsx("h4", { className: "font-semibold mb-2", style: { color: 'var(--hive-text-primary)' }, children: "Keyboard Shortcuts" }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { children: [_jsx("kbd", { className: "bg-gray-700 px-2 py-1 rounded", children: "\u2318K" }), " Open search"] }), _jsxs("div", { children: [_jsx("kbd", { className: "bg-gray-700 px-2 py-1 rounded", children: "\u2318B" }), " Toggle sidebar"] }), _jsxs("div", { children: [_jsx("kbd", { className: "bg-gray-700 px-2 py-1 rounded", children: "ESC" }), " Close overlays"] })] })] }), _jsxs("div", { className: "p-4 rounded-lg border", style: {
                                        backgroundColor: 'var(--hive-background-secondary)',
                                        borderColor: 'var(--hive-border-primary)'
                                    }, children: [_jsx("h4", { className: "font-semibold mb-2", style: { color: 'var(--hive-text-primary)' }, children: "Interactive Elements" }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsx("div", { children: "\u2022 Click navigation items" }), _jsx("div", { children: "\u2022 Try the search bar" }), _jsx("div", { children: "\u2022 Check notifications" }), _jsx("div", { children: "\u2022 Collapse the sidebar" })] })] })] })] })] }))
    }
};
//# sourceMappingURL=getting-started-navigation.stories.js.map