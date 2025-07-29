import { ProfileSystem } from '../../components/profile';
const meta = {
    title: 'HIVE/Profile System',
    component: ProfileSystem,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Complete profile system with all possible states and scenarios - kitchen sink approach'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
// =========================
// PROFILE SYSTEM SCAFFOLDS
// =========================
export const CompleteProfile = {
    name: '🎯 Complete Profile (Ideal State)',
    args: {
        user: {
            id: 'user123',
            fullName: 'Sarah Chen',
            handle: 'sarahc',
            email: 'sarah.chen@university.edu',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
            major: 'Computer Science',
            graduationYear: 2025,
            school: 'University of California',
            isBuilder: true,
            isPublic: true,
            builderLevel: 'Advanced',
            memberSince: '2024-01-15',
            onlineStatus: 'online',
            timezone: 'PST',
            bio: 'Building the future of student collaboration. Love React, coffee, and late-night coding sessions.',
            interests: ['React', 'Machine Learning', 'Startups', 'Photography'],
            stats: {
                totalSpaces: 8,
                activeSpaces: 5,
                toolsCreated: 3,
                connectionsCount: 47,
                streakDays: 12,
                totalActivity: 156
            }
        },
        spaces: [
            {
                id: 'cs101',
                name: 'CS 101 - Fall 2024',
                type: 'course',
                memberCount: 234,
                unreadCount: 3,
                lastActivity: '2 minutes ago',
                recentPosts: [
                    {
                        id: 'post1',
                        author: 'Prof. Martinez',
                        content: 'Assignment 3 due tomorrow - office hours extended until 8pm',
                        timestamp: '2 minutes ago',
                        type: 'announcement'
                    },
                    {
                        id: 'post2',
                        author: 'Mike Johnson',
                        content: 'Anyone want to form a study group for the midterm?',
                        timestamp: '15 minutes ago',
                        type: 'discussion',
                        replies: 7
                    }
                ]
            },
            {
                id: 'ellicott',
                name: 'Ellicott Hall',
                type: 'housing',
                memberCount: 156,
                unreadCount: 1,
                lastActivity: '5 minutes ago',
                recentPosts: [
                    {
                        id: 'post3',
                        author: 'Building Manager',
                        content: 'Laundry room on 3rd floor is now fixed! 🎉',
                        timestamp: '5 minutes ago',
                        type: 'update'
                    }
                ]
            }
        ],
        events: [
            {
                id: 'event1',
                title: 'Physics 101 - Lecture',
                time: '20 minutes',
                type: 'class',
                location: 'Science Building 101',
                attendees: ['You', 'Sarah M.', 'Alex K.'],
                overlap: {
                    count: 3,
                    message: '3 people from your dorm are in this class'
                }
            },
            {
                id: 'event2',
                title: 'CS Club Mixer',
                time: 'Tomorrow 7pm',
                type: 'social',
                location: 'Student Union',
                attendees: ['You', '23 others'],
                overlap: {
                    count: 4,
                    message: '4 people from your floor are going'
                }
            }
        ],
        connections: [
            {
                id: 'conn1',
                type: 'dorm_classmate',
                message: '3 people in your dorm are also in Physics 101',
                people: ['Sarah M.', 'Alex K.', 'Jordan L.'],
                action: 'Create study group'
            },
            {
                id: 'conn2',
                type: 'tool_usage',
                message: 'Sarah built the GPA calculator you used yesterday',
                people: ['Sarah Chen'],
                action: 'Connect'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: ['Calendar', 'GPA Calculator', 'Study Planner'],
            createdTools: ['Class Schedule Sync', 'Dorm Noise Tracker'],
            comingSoon: ['Assignment Tracker', 'Group Project Manager']
        }
    }
};
export const NewStudent = {
    name: '🌱 New Student (Onboarding)',
    args: {
        user: {
            id: 'newuser',
            fullName: 'Alex Rivera',
            handle: 'alexr',
            email: 'alex.rivera@university.edu',
            avatar: null,
            major: 'Undeclared',
            graduationYear: 2028,
            school: 'University of California',
            isBuilder: false,
            isPublic: false,
            memberSince: '2024-07-15',
            onlineStatus: 'online',
            bio: null,
            interests: [],
            stats: {
                totalSpaces: 0,
                activeSpaces: 0,
                toolsCreated: 0,
                connectionsCount: 0,
                streakDays: 0,
                totalActivity: 0
            }
        },
        spaces: [],
        events: [],
        connections: [],
        hiveLab: {
            isLocked: true,
            availableTools: ['Calendar'],
            createdTools: [],
            comingSoon: ['Personal Tools Coming Soon']
        },
        showOnboarding: true,
        completionStatus: {
            percentage: 30,
            missing: ['profile photo', 'bio', 'interests', 'join spaces']
        }
    }
};
export const HeavyUser = {
    name: '🔥 Heavy User (Power Student)',
    args: {
        user: {
            id: 'poweruser',
            fullName: 'Marcus Williams',
            handle: 'marcusw',
            email: 'marcus.williams@university.edu',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            major: 'Engineering + Business',
            graduationYear: 2025,
            school: 'MIT',
            isBuilder: true,
            isPublic: true,
            builderLevel: 'Expert',
            memberSince: '2023-08-20',
            onlineStatus: 'online',
            bio: 'Serial builder, hackathon winner, coffee addict. Building tools that make student life easier.',
            interests: ['Full Stack', 'Entrepreneurship', 'AI/ML', 'Basketball', 'Productivity'],
            stats: {
                totalSpaces: 23,
                activeSpaces: 15,
                toolsCreated: 12,
                connectionsCount: 234,
                streakDays: 87,
                totalActivity: 2340
            }
        },
        spaces: [
            // Multiple spaces with varying activity levels
            {
                id: 'engineering',
                name: 'MIT Engineering',
                type: 'school',
                memberCount: 1200,
                unreadCount: 12,
                lastActivity: '1 minute ago',
                recentPosts: [
                    { id: 'p1', author: 'Dean Smith', content: 'New makerspace hours announced', timestamp: '1 minute ago', type: 'announcement' },
                    { id: 'p2', author: 'Sarah K.', content: 'Looking for teammates for robotics competition', timestamp: '5 minutes ago', type: 'discussion', replies: 23 }
                ]
            },
            {
                id: 'hackathon',
                name: 'HackMIT Organizers',
                type: 'club',
                memberCount: 45,
                unreadCount: 8,
                lastActivity: '3 minutes ago',
                recentPosts: [
                    { id: 'p3', author: 'Event Team', content: 'Sponsor meetings start tomorrow', timestamp: '3 minutes ago', type: 'update' }
                ]
            }
        ],
        events: [
            // Multiple overlapping events
            {
                id: 'event1',
                title: 'Advanced Algorithms',
                time: '10 minutes',
                type: 'class',
                location: 'Building 32-123',
                attendees: ['You', '8 others'],
                overlap: { count: 8, message: '8 people from your study group' }
            },
            {
                id: 'event2',
                title: 'Startup Pitch Practice',
                time: '2 hours',
                type: 'meeting',
                location: 'Innovation Lab',
                attendees: ['You', 'Team'],
                overlap: { count: 0, message: '' }
            }
        ],
        connections: [
            // Rich connection opportunities
            {
                id: 'conn1',
                type: 'multi_overlap',
                message: '12 people share 3+ classes with you',
                people: ['Sarah K.', 'Alex M.', 'Jordan P.', '+9 others'],
                action: 'View all'
            },
            {
                id: 'conn2',
                type: 'tool_collaboration',
                message: 'Your study planner is used by 89 students',
                people: ['89 students'],
                action: 'View analytics'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: ['Calendar', 'GPA Calculator', 'Study Planner', 'Grade Tracker'],
            createdTools: ['MIT Course Planner', 'Hackathon Team Matcher', 'Study Room Booker'],
            comingSoon: ['AI Study Assistant', 'Project Collaboration Suite']
        }
    }
};
export const PrivateProfile = {
    name: '🔒 Private Profile (Ghost Mode)',
    args: {
        user: {
            id: 'privateuser',
            fullName: 'Jordan Smith',
            handle: 'jsmith',
            email: 'jordan.smith@university.edu',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            major: 'Psychology',
            graduationYear: 2026,
            school: 'Stanford University',
            isBuilder: false,
            isPublic: false,
            memberSince: '2024-02-10',
            onlineStatus: 'invisible',
            bio: 'Focused on academics and personal growth.',
            interests: ['Psychology', 'Research', 'Reading'],
            stats: {
                totalSpaces: 3,
                activeSpaces: 2,
                toolsCreated: 0,
                connectionsCount: 12,
                streakDays: 3,
                totalActivity: 45
            },
            privacy: {
                ghostMode: true,
                showActivity: false,
                showSpaces: false,
                showConnections: false
            }
        },
        spaces: [
            {
                id: 'psych',
                name: 'Psychology Majors',
                type: 'academic',
                memberCount: 89,
                unreadCount: 2,
                lastActivity: '1 hour ago',
                recentPosts: [
                    { id: 'p1', author: 'Dr. Williams', content: 'Research opportunities available', timestamp: '1 hour ago', type: 'announcement' }
                ]
            }
        ],
        events: [
            {
                id: 'event1',
                title: 'Research Methods',
                time: '45 minutes',
                type: 'class',
                location: 'Psychology Building',
                attendees: ['You'],
                overlap: { count: 0, message: '' }
            }
        ],
        connections: [],
        hiveLab: {
            isLocked: true,
            availableTools: ['Calendar'],
            createdTools: [],
            comingSoon: ['Personal Tools Coming Soon']
        },
        showPrivacyBanner: true
    }
};
export const InternationalStudent = {
    name: '🌍 International Student',
    args: {
        user: {
            id: 'intluser',
            fullName: 'Yuki Tanaka',
            handle: 'yukitan',
            email: 'yuki.tanaka@university.edu',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            major: 'International Business',
            graduationYear: 2025,
            school: 'UC Berkeley',
            isBuilder: false,
            isPublic: true,
            memberSince: '2024-01-10',
            onlineStatus: 'online',
            timezone: 'PST',
            location: 'From Tokyo, Japan',
            bio: 'Exchange student from Waseda University. Love exploring American culture and making friends!',
            interests: ['Cultural Exchange', 'Business', 'Photography', 'Hiking'],
            stats: {
                totalSpaces: 6,
                activeSpaces: 4,
                toolsCreated: 0,
                connectionsCount: 23,
                streakDays: 15,
                totalActivity: 78
            }
        },
        spaces: [
            {
                id: 'international',
                name: 'International Students',
                type: 'community',
                memberCount: 156,
                unreadCount: 5,
                lastActivity: '10 minutes ago',
                recentPosts: [
                    { id: 'p1', author: 'Lisa Chen', content: 'Anyone want to explore SF this weekend?', timestamp: '10 minutes ago', type: 'discussion', replies: 12 }
                ]
            },
            {
                id: 'business',
                name: 'Business Students',
                type: 'academic',
                memberCount: 234,
                unreadCount: 2,
                lastActivity: '30 minutes ago',
                recentPosts: [
                    { id: 'p2', author: 'Prof. Johnson', content: 'Case study presentations next week', timestamp: '30 minutes ago', type: 'announcement' }
                ]
            }
        ],
        events: [
            {
                id: 'event1',
                title: 'Cultural Exchange Meetup',
                time: 'Tonight 6pm',
                type: 'social',
                location: 'International House',
                attendees: ['You', '15 others'],
                overlap: { count: 3, message: '3 people from your dorm' }
            }
        ],
        connections: [
            {
                id: 'conn1',
                type: 'cultural_connection',
                message: '5 students from Asia are in your business classes',
                people: ['Lisa C.', 'Raj P.', 'Min K.', '+2 others'],
                action: 'Connect'
            }
        ],
        hiveLab: {
            isLocked: true,
            availableTools: ['Calendar'],
            createdTools: [],
            comingSoon: ['Personal Tools Coming Soon']
        }
    }
};
export const GraduatingStudent = {
    name: '🎓 Graduating Student',
    args: {
        user: {
            id: 'graduser',
            fullName: 'Emma Rodriguez',
            handle: 'emmar',
            email: 'emma.rodriguez@university.edu',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            major: 'Computer Science',
            graduationYear: 2024,
            school: 'Georgia Tech',
            isBuilder: true,
            isPublic: true,
            memberSince: '2020-08-15',
            onlineStatus: 'online',
            bio: 'Senior CS major. Interned at Google, heading to Microsoft after graduation. Building tools to help underclassmen succeed.',
            interests: ['Software Engineering', 'Mentoring', 'Career Advice', 'Tech Industry'],
            stats: {
                totalSpaces: 15,
                activeSpaces: 8,
                toolsCreated: 5,
                connectionsCount: 156,
                streakDays: 45,
                totalActivity: 890
            }
        },
        spaces: [
            {
                id: 'cs_seniors',
                name: 'CS Seniors 2024',
                type: 'graduation',
                memberCount: 78,
                unreadCount: 7,
                lastActivity: '5 minutes ago',
                recentPosts: [
                    { id: 'p1', author: 'Career Services', content: 'Job fair feedback survey', timestamp: '5 minutes ago', type: 'announcement' },
                    { id: 'p2', author: 'Mike T.', content: 'Anyone else nervous about Microsoft start date?', timestamp: '20 minutes ago', type: 'discussion', replies: 15 }
                ]
            },
            {
                id: 'mentorship',
                name: 'CS Mentorship Program',
                type: 'mentoring',
                memberCount: 234,
                unreadCount: 3,
                lastActivity: '15 minutes ago',
                recentPosts: [
                    { id: 'p3', author: 'Emma R.', content: 'Office hours this week: Tuesday 3-5pm for interview prep', timestamp: '15 minutes ago', type: 'announcement' }
                ]
            }
        ],
        events: [
            {
                id: 'event1',
                title: 'Senior Capstone Presentation',
                time: '2 days',
                type: 'academic',
                location: 'Klaus Building',
                attendees: ['You', 'Team'],
                overlap: { count: 0, message: '' }
            },
            {
                id: 'event2',
                title: 'Graduation Ceremony',
                time: '3 weeks',
                type: 'milestone',
                location: 'Bobby Dodd Stadium',
                attendees: ['You', 'Class of 2024'],
                overlap: { count: 77, message: '77 classmates graduating' }
            }
        ],
        connections: [
            {
                id: 'conn1',
                type: 'mentorship',
                message: '12 underclassmen are using your study guides',
                people: ['Sophomore CS students'],
                action: 'View mentees'
            },
            {
                id: 'conn2',
                type: 'alumni_network',
                message: '5 Georgia Tech alumni work at Microsoft',
                people: ['Alumni Network'],
                action: 'Connect'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: ['Calendar', 'GPA Calculator', 'Study Planner', 'Interview Prep'],
            createdTools: ['CS Course Planner', 'Interview Question Bank', 'Salary Negotiation Guide'],
            comingSoon: ['Alumni Network Tool']
        },
        showGraduationBanner: true
    }
};
export const ErrorStates = {
    name: '❌ Error States & Edge Cases',
    args: {
        user: {
            id: 'erroruser',
            fullName: 'Test User',
            handle: 'testuser',
            email: 'test@university.edu',
            avatar: null,
            major: null,
            graduationYear: null,
            school: null,
            isBuilder: false,
            isPublic: true,
            memberSince: '2024-07-18',
            onlineStatus: 'offline',
            bio: null,
            interests: [],
            stats: {
                totalSpaces: 0,
                activeSpaces: 0,
                toolsCreated: 0,
                connectionsCount: 0,
                streakDays: 0,
                totalActivity: 0
            }
        },
        spaces: [],
        events: [],
        connections: [],
        hiveLab: {
            isLocked: true,
            availableTools: [],
            createdTools: [],
            comingSoon: []
        },
        showErrors: true,
        errors: {
            spacesError: 'Failed to load spaces',
            eventsError: 'Calendar service unavailable',
            connectionsError: 'Network error',
            apiError: 'Server temporarily unavailable'
        }
    }
};
export const LoadingStates = {
    name: '⏳ Loading States',
    args: {
        user: null,
        spaces: [],
        events: [],
        connections: [],
        hiveLab: null,
        isLoading: true,
        loadingStates: {
            profile: true,
            spaces: true,
            events: true,
            connections: true,
            hiveLab: true
        }
    }
};
export const MobileView = {
    name: '📱 Mobile View',
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    args: {
        ...CompleteProfile.args,
        isMobile: true
    }
};
export const TabletView = {
    name: '📱 Tablet View',
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    },
    args: {
        ...CompleteProfile.args,
        isTablet: true
    }
};
//# sourceMappingURL=profile-system.stories.js.map