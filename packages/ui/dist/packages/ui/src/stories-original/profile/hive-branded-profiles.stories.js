import { ProfileSystem } from '../../components/profile/profile-system';
// HIVE Profile System - Strict Brand Colors & Dense Responsive Layout
const meta = {
    title: 'Profile/🏆 HIVE Branded Profiles',
    component: ProfileSystem,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
**HIVE Branded Profile System** - Strict color palette with responsive dense layouts

Pure HIVE brand execution using only our core palette: HIVE Gold (var(--hive-brand-secondary)), Obsidian Black (#0A0A0B), and Platinum White (#E5E5E7). Dense, responsive layouts that scale intelligently across all screen sizes.

## Brand Compliance
- **Gold Only**: HIVE Gold (var(--hive-brand-secondary)) for all accents, highlights, and interactive states
- **Black Variants**: Obsidian (var(--hive-background-primary)), Charcoal (#111113), Graphite (#1A1A1C) for backgrounds
- **White Variants**: Platinum (#E5E5E7), Silver (var(--hive-text-secondary)) for text and borders
- **No Other Colors**: Zero blues, greens, reds, or any non-brand colors

## Dense Responsive Layout
- **Tight Spacing**: Minimal gaps that scale with screen size
- **Compact Cards**: Information density optimized for scanning
- **Smart Grid**: 1-2-3 column responsive grid that packs content efficiently
- **Mobile-First**: Stacked layout on mobile, efficient use of space on desktop

## Campus Social Context
- Real Stanford/Berkeley course codes and building names
- Authentic dorm communities and academic spaces
- HIVE Lab tools focused on campus productivity
- Tech-focused student personas building actual campus tools
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// HIVE Brand-Compliant Users
const createBrandedBuilder = () => ({
    id: 'branded-builder',
    fullName: 'Maya Patel',
    handle: 'maya_builds',
    email: 'maya.patel@stanford.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b950?w=150&h=150&fit=crop&crop=face',
    major: 'Computer Science',
    graduationYear: 2025,
    school: 'Stanford University',
    isBuilder: true,
    isPublic: true,
    builderLevel: 'Expert',
    memberSince: '2023-09-01',
    onlineStatus: 'online',
    bio: 'Building HIVE tools that connect students. CS + HCI focus. Always down to collaborate on campus tech.',
    interests: ['React', 'Design Systems', 'Campus Tech', 'HCI', 'TypeScript', 'Mobile Development'],
    stats: {
        totalSpaces: 23,
        activeSpaces: 15,
        toolsCreated: 12,
        connectionsCount: 187,
        streakDays: 124,
        totalActivity: 3247
    },
    privacy: {
        ghostMode: false,
        showActivity: true,
        showSpaces: true,
        showConnections: true
    }
});
const createBrandedStudent = () => ({
    id: 'branded-student',
    fullName: 'Jordan Chen',
    handle: 'jordanc_cs',
    email: 'jordan.chen@berkeley.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    major: 'EECS',
    graduationYear: 2026,
    school: 'UC Berkeley',
    isBuilder: false,
    isPublic: true,
    builderLevel: 'Intermediate',
    memberSince: '2023-08-15',
    onlineStatus: 'online',
    bio: 'EECS student at Cal. Love building things and connecting with fellow engineers.',
    interests: ['Machine Learning', 'Web Development', 'Algorithms', 'Open Source'],
    stats: {
        totalSpaces: 12,
        activeSpaces: 9,
        toolsCreated: 3,
        connectionsCount: 67,
        streakDays: 78,
        totalActivity: 1456
    },
    privacy: {
        ghostMode: false,
        showActivity: true,
        showSpaces: true,
        showConnections: true
    }
});
// Dense Campus Spaces - Brand Compliant
const createDenseSpaces = () => [
    {
        id: 'cs106b',
        name: 'CS 106B: Programming Abstractions',
        type: 'course',
        memberCount: 312,
        unreadCount: 8,
        lastActivity: '12 min ago',
        isPrivate: false,
        isFavorite: true,
        isPinned: true,
        recentPosts: [
            {
                id: 'p1',
                author: 'Prof. Roberts',
                content: 'Assignment 4 starter code is live. Remember to use proper recursion patterns.',
                timestamp: '12 min ago',
                type: 'announcement',
                replies: 15,
                reactions: { likes: 28, helpful: 12 }
            }
        ]
    },
    {
        id: 'wilbur-3rd',
        name: 'Wilbur Hall 3rd Floor',
        type: 'housing',
        memberCount: 28,
        unreadCount: 4,
        lastActivity: '34 min ago',
        isPrivate: false,
        isFavorite: true,
        recentPosts: [
            {
                id: 'p2',
                author: 'Alex Kim',
                content: 'Study room is free tonight if anyone wants to work on CS homework together!',
                timestamp: '34 min ago',
                type: 'discussion',
                replies: 6,
                reactions: { likes: 9, helpful: 3 }
            }
        ]
    },
    {
        id: 'hci-club',
        name: 'Stanford HCI',
        type: 'club',
        memberCount: 89,
        unreadCount: 2,
        lastActivity: '1 hr ago',
        isPrivate: false,
        isFavorite: false
    },
    {
        id: 'cs161',
        name: 'CS 161: Algorithms',
        type: 'course',
        memberCount: 234,
        unreadCount: 12,
        lastActivity: '45 min ago',
        isPrivate: false,
        isFavorite: false
    },
    {
        id: 'startup-garage',
        name: 'd.school Startup Garage',
        type: 'club',
        memberCount: 45,
        unreadCount: 6,
        lastActivity: '2 hr ago',
        isPrivate: false,
        isFavorite: false
    }
];
// Compact Campus Events
const createDenseEvents = () => [
    {
        id: 'cs106b-lec',
        title: 'CS 106B: Recursion & Backtracking',
        time: '15 min',
        type: 'class',
        location: 'Hewlett 200',
        attendees: ['Prof. Roberts', '312 students'],
        isRecurring: true,
        hasReminder: true,
        reminderMinutes: 10
    },
    {
        id: 'office-hours',
        title: 'CS 106B Office Hours',
        time: '1.5 hr',
        type: 'academic',
        location: 'Gates B21',
        attendees: ['TAs', 'Students'],
        hasReminder: true,
        reminderMinutes: 15
    },
    {
        id: 'hci-meeting',
        title: 'HCI Club: Design Thinking Workshop',
        time: 'Today 7pm',
        type: 'meeting',
        location: 'd.school',
        attendees: ['HCI members']
    },
    {
        id: 'study-group',
        title: 'Algorithms Study Session',
        time: 'Tomorrow 3pm',
        type: 'academic',
        location: 'Green Library',
        attendees: ['Study group']
    }
];
// Campus Connections - Gold Accent Only
const createDenseConnections = () => [
    {
        id: 'dorm-cs',
        type: 'dorm_classmate',
        message: '4 people in Wilbur Hall are also in CS 106B',
        people: ['Sarah Liu', 'David Park', 'Emma Rodriguez', 'Marcus Wong'],
        action: 'Form study group',
        priority: 'high'
    },
    {
        id: 'tool-users',
        type: 'tool_usage',
        message: '23 students love your Grade Tracker tool',
        people: ['Tool community'],
        action: 'View feedback',
        priority: 'medium'
    },
    {
        id: 'cs-overlap',
        type: 'multi_overlap',
        message: 'Found CS students with matching schedules',
        people: ['Potential study partners'],
        action: 'Connect now',
        priority: 'high'
    }
];
// HIVE Lab - Campus Tools Only
const createDenseHiveLab = () => ({
    isLocked: false,
    availableTools: [
        'Course Planner',
        'Grade Tracker',
        'Study Timer',
        'Assignment Calendar',
        'Room Finder',
        'Textbook Exchange'
    ],
    createdTools: [
        'CS 106B Helper',
        'Dorm Study Scheduler',
        'Campus Map Navigator',
        'Class Reminder Bot',
        'Dining Hall Tracker',
        'Library Seat Finder'
    ],
    comingSoon: [
        'AI Study Assistant',
        'Smart Schedule Optimizer',
        'Peer Code Review Tool'
    ]
});
// Main Brand-Compliant Stories
export const HIVEBrandedBuilder = {
    name: '🏆 HIVE Gold - Builder Profile',
    args: {
        user: createBrandedBuilder(),
        spaces: createDenseSpaces(),
        events: createDenseEvents(),
        connections: createDenseConnections(),
        hiveLab: createDenseHiveLab(),
        completionStatus: {
            percentage: 92,
            missing: ['Add LinkedIn profile']
        }
    }
};
export const HIVEBrandedStudent = {
    name: '🎓 HIVE Gold - Student Profile',
    args: {
        user: createBrandedStudent(),
        spaces: createDenseSpaces().slice(0, 3),
        events: createDenseEvents().slice(0, 3),
        connections: createDenseConnections().slice(0, 2),
        hiveLab: {
            isLocked: false,
            availableTools: [
                'Grade Tracker',
                'Study Timer',
                'Assignment Calendar',
                'Room Finder'
            ],
            createdTools: [
                'Personal Study Planner',
                'Campus Navigation Helper',
                'Class Schedule Optimizer'
            ],
            comingSoon: [
                'AI Study Assistant',
                'Peer Tutoring Network'
            ]
        },
        completionStatus: {
            percentage: 76,
            missing: ['Join more communities', 'Add bio details']
        }
    }
};
export const HIVECompactMobile = {
    name: '📱 HIVE Mobile - Dense Layout',
    args: {
        ...HIVEBrandedBuilder.args,
        isMobile: true
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        }
    }
};
export const HIVETabletDense = {
    name: '📱 HIVE Tablet - 2-Column Dense',
    args: {
        ...HIVEBrandedBuilder.args,
        isTablet: true
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
};
export const HIVEDesktopPacked = {
    name: '💻 HIVE Desktop - 3-Column Packed',
    args: {
        user: createBrandedBuilder(),
        spaces: [
            ...createDenseSpaces(),
            {
                id: 'cs142',
                name: 'CS 142: Web Applications',
                type: 'course',
                memberCount: 156,
                unreadCount: 5,
                lastActivity: '23 min ago',
                isPrivate: false,
                isFavorite: false
            },
            {
                id: 'roble-hall',
                name: 'Roble Hall Community',
                type: 'housing',
                memberCount: 67,
                unreadCount: 3,
                lastActivity: '1 hr ago',
                isPrivate: false,
                isFavorite: false
            }
        ],
        events: [
            ...createDenseEvents(),
            {
                id: 'cs142-lab',
                title: 'CS 142: React Lab',
                time: '2 hr',
                type: 'class',
                location: 'Sweet Hall 110',
                attendees: ['TAs', 'Students']
            }
        ],
        connections: [
            ...createDenseConnections(),
            {
                id: 'builders',
                type: 'tool_collaboration',
                message: 'Connect with other HIVE tool builders',
                people: ['Builder community'],
                action: 'Join builders',
                priority: 'medium'
            }
        ],
        hiveLab: createDenseHiveLab()
    }
};
export const HIVEMinimalNew = {
    name: '✨ HIVE New User - Minimal Data',
    args: {
        user: {
            id: 'new-minimal',
            fullName: 'Casey Rodriguez',
            handle: 'casey_new',
            email: 'casey.rodriguez@stanford.edu',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            major: 'Computer Science',
            graduationYear: 2027,
            school: 'Stanford University',
            isBuilder: false,
            isPublic: true,
            memberSince: '2024-01-10',
            onlineStatus: 'online',
            bio: 'New to Stanford and HIVE!',
            interests: ['Programming', 'Design'],
            stats: {
                totalSpaces: 2,
                activeSpaces: 2,
                toolsCreated: 0,
                connectionsCount: 5,
                streakDays: 3,
                totalActivity: 47
            },
            privacy: {
                ghostMode: false,
                showActivity: true,
                showSpaces: true,
                showConnections: true
            }
        },
        spaces: [
            {
                id: 'cs106a',
                name: 'CS 106A: Programming Methodology',
                type: 'course',
                memberCount: 400,
                unreadCount: 2,
                lastActivity: '1 hr ago',
                isPrivate: false,
                isFavorite: true
            },
            {
                id: 'frosh-dorm',
                name: 'Freshman Dorm Community',
                type: 'housing',
                memberCount: 85,
                unreadCount: 4,
                lastActivity: '45 min ago',
                isPrivate: false,
                isFavorite: true
            }
        ],
        events: [
            {
                id: 'cs106a-lec',
                title: 'CS 106A: Introduction to Programming',
                time: '50 min',
                type: 'class',
                location: 'Memorial Auditorium',
                attendees: ['Prof. Sahami', '400 students']
            }
        ],
        connections: [
            {
                id: 'frosh-welcome',
                type: 'dorm_classmate',
                message: 'Welcome! Found 12 freshmen in your dorm and classes',
                people: ['New freshman community'],
                action: 'Get connected',
                priority: 'high'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: [
                'Study Planner',
                'Campus Map',
                'Dining Hours'
            ],
            createdTools: [],
            comingSoon: [
                'Grade Tracker',
                'Study Group Finder'
            ]
        },
        showOnboarding: true,
        completionStatus: {
            percentage: 28,
            missing: [
                'Complete profile setup',
                'Add more interests',
                'Join campus communities',
                'Connect your calendar'
            ]
        }
    }
};
//# sourceMappingURL=hive-branded-profiles.stories.js.map