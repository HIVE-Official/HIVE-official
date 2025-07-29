import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveSpaceCard } from '../../components';
const meta = {
    title: '07-Spaces/Space Card',
    component: HiveSpaceCard,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'hive',
            values: [{ name: 'hive', value: 'var(--hive-background-primary)' }],
        },
        docs: {
            description: {
                component: `
**HIVE Space Card Component**

A sophisticated card component for displaying Space information with campus-focused design patterns. Built with HIVE's glass morphism aesthetic and liquid metal interactions.

## Features
- **Glass Morphism**: Backdrop blur effects with subtle transparency
- **Status Indicators**: Visual representation of space activation states
- **Member Count**: Dynamic formatting for different membership scales
- **Magnetic Hover**: Subtle lift and attraction effects on interaction
- **Campus Types**: Support for major, residential, interest, and organization spaces

## Design System Integration
- Uses semantic tokens for consistent theming
- Follows HIVE component variant patterns
- Implements accessibility standards with ARIA labels
- Responsive design with mobile-first approach
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        space: {
            control: 'object',
            description: 'The space object containing name, description, member count, and metadata.',
        },
        href: {
            control: 'text',
            description: 'Navigation URL when card is clicked (follows Next.js Link patterns).',
        },
        onClick: {
            action: 'clicked',
            description: 'Optional click handler that overrides default navigation behavior.',
        },
        variant: {
            control: 'select',
            options: ['default', 'premium', 'elevated', 'minimal'],
            description: 'Visual variant following HIVE design system patterns.',
        },
        interactive: {
            control: 'boolean',
            description: 'Enable magnetic hover effects and interactive behaviors.',
        },
    },
};
export default meta;
// Sample space data following HIVE campus entity patterns
const baseSpace = {
    name: 'Computer Science Majors',
    name_lowercase: 'computer science majors',
    description: 'A collaborative community for CS students to share resources, work on projects, and connect with peers and faculty.',
    bannerUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7948b4?w=800&q=80',
    memberCount: 1248,
    schoolId: 'ub',
    type: 'major',
    status: 'activated',
};
export const Default = {
    args: {
        space: {
            ...baseSpace,
            id: 'cs-majors',
        },
        href: '/spaces/cs-majors',
    },
};
export const WithoutBanner = {
    args: {
        space: {
            ...baseSpace,
            id: 'no-banner-space',
            bannerUrl: undefined,
            name: 'Philosophy Club',
            description: 'Deep discussions, critical thinking, and exploring life\'s biggest questions together.',
            memberCount: 89,
            type: 'interest',
        },
        href: '/spaces/no-banner-space',
    },
};
export const LongDescription = {
    args: {
        space: {
            ...baseSpace,
            id: 'long-desc-space',
            name: 'Campus Creatives & Innovators Guild',
            description: 'This is an exceptionally long description designed to test the line-clamping functionality of the card component to ensure that the layout remains stable and visually appealing even when presented with a large amount of text content that exceeds the typical summary length.',
            memberCount: 567,
            type: 'creative',
        },
        href: '/spaces/long-desc-space',
    },
};
export const DormantStatus = {
    args: {
        space: {
            ...baseSpace,
            id: 'dormant-space',
            name: 'Advanced Robotics Lab',
            description: 'Cutting-edge robotics research and development. Opening soon for student collaboration.',
            bannerUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
            memberCount: 0,
            type: 'organization',
            status: 'dormant',
        },
        href: '/spaces/dormant-space',
    },
};
export const FrozenStatus = {
    args: {
        space: {
            ...baseSpace,
            id: 'frozen-space',
            name: 'Spring Break Planning',
            description: 'Coordinate group trips and activities for spring break. Currently in view-only mode.',
            bannerUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            memberCount: 234,
            type: 'interest',
            status: 'frozen',
        },
        href: '/spaces/frozen-space',
    },
};
export const SmallMembership = {
    args: {
        space: {
            ...baseSpace,
            id: 'small-space',
            name: 'Latin Dance Society',
            description: 'Learn salsa, bachata, and more. All skill levels welcome!',
            bannerUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
            memberCount: 1,
            type: 'interest',
        },
        href: '/spaces/small-space',
    },
};
export const LargeMembership = {
    args: {
        space: {
            ...baseSpace,
            id: 'large-space',
            name: 'UB Community',
            description: 'The main residential community for all University at Buffalo students.',
            bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
            memberCount: 15847,
            type: 'residential',
        },
        href: '/spaces/large-space',
    },
};
export const GridLayout = {
    render: () => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl", children: [_jsx(HiveSpaceCard, { space: { ...baseSpace, id: '1', name: 'Computer Science Majors', type: 'major' }, href: "/spaces/cs-majors" }), _jsx(HiveSpaceCard, { space: {
                    ...baseSpace,
                    id: '2',
                    name: 'Ellicott Complex',
                    type: 'residential',
                    bannerUrl: undefined,
                    memberCount: 567,
                    description: 'Connect with your neighbors and build community in Ellicott.'
                }, href: "/spaces/ellicott" }), _jsx(HiveSpaceCard, { space: {
                    ...baseSpace,
                    id: '3',
                    name: 'Photography Club',
                    type: 'interest',
                    status: 'dormant',
                    memberCount: 0,
                    bannerUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
                    description: 'Capture campus life and improve your photography skills together.'
                }, href: "/spaces/photography" }), _jsx(HiveSpaceCard, { space: {
                    ...baseSpace,
                    id: '4',
                    name: 'Student Government',
                    type: 'organization',
                    status: 'frozen',
                    memberCount: 89,
                    bannerUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80',
                    description: 'Voice student concerns and shape campus policy. Currently in transition.'
                }, href: "/spaces/student-gov" }), _jsx(HiveSpaceCard, { space: {
                    ...baseSpace,
                    id: '5',
                    name: 'Creative Writing Workshop',
                    type: 'creative',
                    memberCount: 23,
                    bannerUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
                    description: 'Share your stories, get feedback, and grow as a writer.'
                }, href: "/spaces/creative-writing" }), _jsx(HiveSpaceCard, { space: {
                    ...baseSpace,
                    id: '6',
                    name: 'Business Administration',
                    type: 'major',
                    memberCount: 2156,
                    bannerUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
                    description: 'Network with fellow business students and share opportunities.'
                }, href: "/spaces/business" })] })),
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'responsive',
        },
    },
};
//# sourceMappingURL=space-card.stories.js.map