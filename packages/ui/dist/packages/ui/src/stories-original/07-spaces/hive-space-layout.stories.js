import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveSpaceLayout } from '../../components';
const meta = {
    title: '07-Spaces/Hive Space Layout',
    component: HiveSpaceLayout,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
**6-Surface architecture implementation for HIVE Spaces**

The core layout system that implements HIVE's revolutionary 6-Surface architecture. Each Space contains six distinct surfaces for different types of campus content and interaction.

## The 6 Surfaces
1. **Pinned Surface** - Important announcements and persistent content
2. **Posts Surface** - Community discussions and updates  
3. **Events Surface** - Campus events and academic calendar
4. **Tools Surface** - Student-built tools and utilities
5. **Chat Surface** - Real-time community communication
6. **Members Surface** - Community directory and networking

## When to Use
- Main Space viewing interface
- Space content organization
- Multi-surface navigation
- Community content management

## Design Principles
- **Campus Infrastructure**: Feels like comprehensive university platform
- **Surface Clarity**: Each surface has distinct purpose and identity
- **Fluid Navigation**: Seamless transitions between surfaces
- **Builder Integration**: Tools surface showcases student creativity
- **Community Focus**: Surfaces optimize for different community needs

## Layout Variants
- **Default**: Full 6-surface layout with navigation
- **Focused**: Single surface view with context  
- **Split**: Two-surface comparative view (60:40 ratio)
- **Mobile**: Stacked surface navigation with bottom tabs

## HIVE Design Integration
- **Glass Morphism**: All surfaces use backdrop blur and transparency
- **Semantic Tokens**: Consistent color system with CSS custom properties
- **Liquid Metal Motion**: Smooth transitions between surface states
- **Magnetic Interactions**: Hover effects with subtle animations

## Accessibility
- WCAG 2.1 AA compliant surface navigation
- Screen reader friendly surface identification  
- Keyboard navigation between surfaces (Tab, Arrow keys)
- Clear focus management with golden ring indicators
- Reduced motion support for accessibility preferences
- High contrast mode compatibility
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        activeSurface: {
            control: 'select',
            options: ['pinned', 'posts', 'events', 'tools', 'chat', 'members'],
            description: 'Currently active surface'
        },
        layout: {
            control: 'select',
            options: ['default', 'focused', 'split', 'mobile'],
            description: 'Layout variant for different viewing contexts'
        },
        showNavigation: {
            control: 'boolean',
            description: 'Display surface navigation tabs'
        }
    }
};
export default meta;
const sampleSpace = {
    id: 'cs-stanford',
    name: 'Computer Science',
    university: 'Stanford University',
    description: 'The official Computer Science space for Stanford students.',
    members: 2156,
    verified: true,
    cover: 'https://picsum.photos/1200/300?random=1',
    surfaces: {
        pinned: {
            count: 5,
            lastActivity: '2 hours ago',
            items: [
                {
                    id: 1,
                    title: 'Welcome to CS Space!',
                    content: 'Important resources and guidelines for our community.',
                    type: 'announcement',
                    pinned: true,
                    author: 'CS Moderators'
                },
                {
                    id: 2,
                    title: 'Study Group Schedule',
                    content: 'Weekly study groups for core CS courses.',
                    type: 'resource',
                    pinned: true,
                    author: 'Academic Committee'
                }
            ]
        },
        posts: {
            count: 156,
            lastActivity: '5 minutes ago',
            trending: ['Algorithm Help', 'Internship Tips', 'Project Showcase']
        },
        events: {
            count: 12,
            lastActivity: '1 hour ago',
            upcoming: ['Tech Talk: AI Ethics', 'Career Fair Prep', 'Hackathon 2024']
        },
        tools: {
            count: 342,
            lastActivity: '10 minutes ago',
            featured: ['Study Timer Pro', 'GPA Calculator', 'Schedule Optimizer'],
            newThisWeek: 8
        },
        chat: {
            online: 89,
            lastActivity: 'now',
            channels: ['general', 'help', 'projects', 'internships']
        },
        members: {
            count: 2156,
            online: 234,
            builders: 23,
            newThisWeek: 45
        }
    }
};
export const DefaultLayout = {
    args: {
        space: sampleSpace,
        activeSurface: 'posts',
        layout: 'default',
        showNavigation: true
    }
};
export const PinnedSurface = {
    args: {
        space: sampleSpace,
        activeSurface: 'pinned',
        layout: 'focused',
        showNavigation: true
    }
};
export const ToolsSurface = {
    args: {
        space: sampleSpace,
        activeSurface: 'tools',
        layout: 'default',
        showNavigation: true
    }
};
export const ChatSurface = {
    args: {
        space: sampleSpace,
        activeSurface: 'chat',
        layout: 'focused',
        showNavigation: true,
        realTimeUpdates: true
    }
};
export const MembersSurface = {
    args: {
        space: sampleSpace,
        activeSurface: 'members',
        layout: 'default',
        showNavigation: true,
        showMemberSearch: true
    }
};
export const SplitView = {
    args: {
        space: sampleSpace,
        activeSurface: 'posts',
        layout: 'split',
        secondarySurface: 'chat',
        showNavigation: true,
        splitRatio: '60:40'
    }
};
export const MobileLayout = {
    args: {
        space: sampleSpace,
        activeSurface: 'posts',
        layout: 'mobile',
        showNavigation: true,
        mobileNavigation: 'bottom'
    }
};
export const BuilderView = {
    args: {
        space: sampleSpace,
        activeSurface: 'tools',
        layout: 'default',
        showNavigation: true,
        builderMode: true,
        canPlantTools: true
    }
};
export const LoadingState = {
    args: {
        space: {
            ...sampleSpace,
            surfaces: {}
        },
        activeSurface: 'posts',
        layout: 'default',
        loading: true,
        showNavigation: true
    }
};
export const EmptySpace = {
    args: {
        space: {
            ...sampleSpace,
            members: 1,
            surfaces: {
                pinned: { count: 0, items: [] },
                posts: { count: 0 },
                events: { count: 0 },
                tools: { count: 0 },
                chat: { online: 0, channels: [] },
                members: { count: 1, online: 1, builders: 0 }
            }
        },
        activeSurface: 'posts',
        layout: 'default',
        showNavigation: true,
        emptyState: true
    }
};
export const InteractiveSurfaceNavigation = {
    render: () => {
        const [activeSurface, setActiveSurface] = useState('posts');
        const [notifications, setNotifications] = useState({
            pinned: 0,
            posts: 3,
            events: 1,
            tools: 5,
            chat: 12,
            members: 2
        });
        return (_jsx(HiveSpaceLayout, { space: sampleSpace, activeSurface: activeSurface, layout: "default", showNavigation: true, notifications: notifications, onSurfaceChange: (surface) => {
                setActiveSurface(surface);
                // Clear notifications for visited surface
                setNotifications(prev => ({ ...prev, [surface]: 0 }));
                console.log('Surface changed to:', surface);
            }, onMemberClick: (member) => console.log('Member clicked:', member), onToolClick: (tool) => console.log('Tool clicked:', tool), onEventClick: (event) => console.log('Event clicked:', event), onPostClick: (post) => console.log('Post clicked:', post) }));
    }
};
export const ResponsiveDemo = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Desktop Layout" }), _jsx("div", { className: "border rounded-lg overflow-hidden", children: _jsx(HiveSpaceLayout, { space: sampleSpace, activeSurface: "tools", layout: "default", showNavigation: true, responsive: false }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Tablet Layout" }), _jsx("div", { className: "border rounded-lg overflow-hidden max-w-3xl", children: _jsx(HiveSpaceLayout, { space: sampleSpace, activeSurface: "tools", layout: "default", showNavigation: true, responsive: true, breakpoint: "tablet" }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Mobile Layout" }), _jsx("div", { className: "border rounded-lg overflow-hidden max-w-sm", children: _jsx(HiveSpaceLayout, { space: sampleSpace, activeSurface: "chat", layout: "mobile", showNavigation: true, responsive: true, breakpoint: "mobile" }) })] })] }))
};
export const SurfaceComparison = {
    render: () => (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ['pinned', 'posts', 'events', 'tools', 'chat', 'members'].map((surface) => (_jsxs("div", { className: "border rounded-lg overflow-hidden", children: [_jsx("div", { className: "p-3 border-b bg-[var(--hive-background-secondary)] hive-glass", children: _jsxs("h4", { className: "font-semibold capitalize text-[var(--hive-text-primary)]", children: [surface, " Surface"] }) }), _jsx("div", { className: "h-64", children: _jsx(HiveSpaceLayout, { space: sampleSpace, activeSurface: surface, layout: "focused", showNavigation: false, compact: true }) })] }, surface))) }))
};
//# sourceMappingURL=hive-space-layout.stories.js.map