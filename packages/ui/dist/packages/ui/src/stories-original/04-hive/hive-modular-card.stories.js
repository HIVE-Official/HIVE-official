import { HiveModularCard } from '../../components';
const meta = {
    title: '04-Hive/Hive Modular Card',
    component: HiveModularCard,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**Advanced modular card system for the HIVE ecosystem**

Highly customizable card component with interchangeable modules and magnetic assembly. Core building block for Spaces, Tools, and Builder interfaces.

## When to Use
- Tool displays in HiveLAB and Spaces
- Space overview cards and previews
- Modular layouts that adapt to content
- Builder interface elements

## Design Principles
- **Modular Assembly**: Cards composed of interchangeable modules with magnetic snapping
- **Infrastructure Feel**: Matte obsidian glass with liquid metal interactions
- **Builder-Optimized**: Designed for drag-and-drop assembly and customization
- **Campus Context**: Adapts to university-specific content and branding

## Module Types
- **Header**: Title, subtitle, and action areas
- **Content**: Rich content area with multiple layout options
- **Media**: Image, video, and interactive media display
- **Stats**: Metrics, progress, and data visualization
- **Actions**: Button groups and interactive controls
- **Footer**: Additional info, timestamps, and secondary actions

## Accessibility
- WCAG 2.1 AA compliant structure and interactions
- Screen reader friendly module organization
- Keyboard navigation between modules
- Clear focus indicators and semantic markup
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'tool', 'space', 'builder', 'premium'],
            description: 'Card variant optimized for different contexts'
        },
        layout: {
            control: 'select',
            options: ['vertical', 'horizontal', 'grid', 'flexible'],
            description: 'Module arrangement and flow'
        },
        interactive: {
            control: 'boolean',
            description: 'Enable hover effects and click interactions'
        }
    }
};
export default meta;
const toolModules = {
    header: {
        title: 'Study Timer Pro',
        subtitle: 'Pomodoro technique with analytics',
        avatar: '⏰',
        rating: 4.8,
        badge: 'Popular'
    },
    stats: {
        items: [
            { label: 'Users', value: '2.1k', trend: '+12%' },
            { label: 'Sessions', value: '156k', trend: '+28%' },
            { label: 'Avg Rating', value: '4.8', icon: '⭐' }
        ]
    },
    content: {
        description: 'Advanced study timer with focus tracking, break reminders, and productivity analytics. Built by @sarah_cs for the Computer Science Space.',
        tags: ['Productivity', 'Study', 'Analytics', 'Timer']
    },
    actions: {
        primary: { label: 'Use Tool', variant: 'accent' },
        secondary: [
            { label: 'Fork', icon: '🔄' },
            { label: 'Share', icon: '🔗' },
            { label: 'Save', icon: '📌' }
        ]
    }
};
const spaceModules = {
    header: {
        title: 'Computer Science',
        subtitle: 'Stanford University • 2,156 members',
        cover: 'https://picsum.photos/400/200?random=1',
        verified: true
    },
    stats: {
        items: [
            { label: 'Tools', value: '342', icon: '🔧' },
            { label: 'Active Today', value: '89', icon: '👥' },
            { label: 'Posts This Week', value: '127', icon: '📝' }
        ]
    },
    content: {
        description: 'The official Computer Science Space for Stanford students. Share code, collaborate on projects, and discover tools built by your peers.',
        highlights: ['AI/ML Projects', 'Coding Bootcamps', 'Internship Prep', 'Study Groups']
    },
    actions: {
        primary: { label: 'Join Space', variant: 'accent' },
        secondary: [
            { label: 'Preview', icon: '👀' },
            { label: 'Share', icon: '🔗' }
        ]
    }
};
export const ToolCard = {
    args: {
        variant: 'tool',
        layout: 'vertical',
        modules: toolModules,
        interactive: true
    }
};
export const SpaceCard = {
    args: {
        variant: 'space',
        layout: 'vertical',
        modules: spaceModules,
        interactive: true
    }
};
export const BuilderInterface = {
    args: {
        variant: 'builder',
        layout: 'grid',
        modules: {
            header: {
                title: 'Element Library',
                subtitle: 'Drag elements to compose your tool',
                actions: { search: true, filter: true }
            },
            content: {
                type: 'element-grid',
                elements: [
                    { id: 'timer', name: 'Timer', icon: '⏰', category: 'UI' },
                    { id: 'chart', name: 'Chart', icon: '📊', category: 'Data' },
                    { id: 'form', name: 'Form', icon: '📋', category: 'Input' },
                    { id: 'media', name: 'Media', icon: '🎬', category: 'Content' }
                ]
            }
        },
        draggable: true
    }
};
export const HorizontalLayout = {
    args: {
        variant: 'default',
        layout: 'horizontal',
        modules: {
            media: {
                type: 'image',
                src: 'https://picsum.photos/200/150?random=2',
                aspectRatio: '4:3'
            },
            content: {
                title: 'Campus Event Manager',
                description: 'Organize and manage campus events with RSVP tracking, notifications, and integration with university calendars.',
                tags: ['Events', 'Campus', 'Organization']
            },
            actions: {
                primary: { label: 'Learn More' }
            }
        }
    }
};
export const PremiumVariant = {
    args: {
        variant: 'premium',
        layout: 'vertical',
        modules: {
            header: {
                title: 'HIVE Pro Features',
                subtitle: 'Unlock advanced Builder capabilities',
                badge: { text: 'Premium', variant: 'gold' }
            },
            content: {
                features: [
                    { name: 'Advanced Elements', description: 'Access 100+ premium Elements', icon: '✨' },
                    { name: 'Private Spaces', description: 'Create invitation-only Spaces', icon: '🔒' },
                    { name: 'Analytics Pro', description: 'Detailed tool performance metrics', icon: '📊' },
                    { name: 'Priority Support', description: '24/7 premium support access', icon: '🎯' }
                ]
            },
            actions: {
                primary: { label: 'Upgrade to Pro', variant: 'premium' },
                secondary: [
                    { label: 'Learn More', variant: 'ghost' }
                ]
            }
        },
        interactive: true,
        premium: true
    }
};
export const MinimalCard = {
    args: {
        variant: 'default',
        layout: 'vertical',
        modules: {
            content: {
                title: 'Quick Note',
                description: 'A simple note-taking tool for capturing ideas during lectures and study sessions.'
            },
            actions: {
                primary: { label: 'Use', size: 'sm' }
            }
        },
        compact: true
    }
};
export const LoadingState = {
    args: {
        variant: 'tool',
        layout: 'vertical',
        loading: true,
        skeleton: {
            header: true,
            content: true,
            stats: true,
            actions: true
        }
    }
};
export const ErrorState = {
    args: {
        variant: 'space',
        layout: 'vertical',
        error: {
            title: 'Failed to load Space',
            description: 'This Space may be private or no longer available.',
            action: { label: 'Try Again', onClick: () => console.log('Retry') }
        }
    }
};
export const InteractiveDemo = {
    args: {
        variant: 'tool',
        layout: 'flexible',
        modules: toolModules,
        interactive: true,
        onModuleClick: (moduleType) => {
            console.log('Module clicked:', moduleType);
        },
        onActionClick: (action) => {
            console.log('Action clicked:', action);
        },
        onCardHover: (hovered) => {
            console.log('Card hovered:', hovered);
        }
    }
};
//# sourceMappingURL=hive-modular-card.stories.js.map