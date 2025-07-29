import { HiveDashboard } from '../../components/dashboard/hive-dashboard';
const meta = {
    title: 'Dashboard/HiveDashboard',
    component: HiveDashboard,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# HIVE Dashboard Component

The main dashboard component provides a comprehensive overview of a user's campus activity, featuring:

- **Bento Grid Layout**: Modern, responsive card-based layout
- **Real-time Data**: Activity summaries, upcoming events, and quick actions
- **Interactive Elements**: Smooth animations and hover effects
- **Privacy Controls**: Ghost mode toggle for user privacy
- **Performance Optimized**: Skeletal loading states and smooth transitions

## Features

- Campus activity summary with key metrics
- Weekly goal tracking with progress indicators  
- Quick access to favorite spaces
- Upcoming events calendar integration
- Recent activity across spaces, tools, and social interactions
- Personalized insights and analytics
- Space recommendations based on user behavior
- Privacy controls and ghost mode

## Design System

Built with HIVE's liquid metal motion system and glass morphism design language.
        `
            }
        }
    },
    argTypes: {
        isLoading: {
            control: 'boolean',
            description: 'Shows skeleton loading state'
        },
        onRefresh: {
            action: 'refresh',
            description: 'Callback when refresh button is clicked'
        },
        onNavigate: {
            action: 'navigate',
            description: 'Callback when navigation occurs'
        }
    }
};
export default meta;
// Mock data for stories
const mockDashboardData = {
    user: {
        id: 'user_123',
        name: 'Sarah Chen',
        handle: 'sarahc',
        email: 'sarah.chen@university.edu',
        profilePhotoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        major: 'Computer Science',
        academicYear: 'Junior',
        interests: ['AI/ML', 'Web Development', 'Design', 'Entrepreneurship'],
        joinedAt: '2024-08-15T00:00:00Z',
        lastActive: '2024-12-14T10:30:00Z'
    },
    summary: {
        totalSpaces: 12,
        activeSpaces: 8,
        favoriteSpaces: 4,
        totalTimeSpent: 2340, // minutes
        weeklyActivity: 180, // minutes
        contentCreated: 23,
        toolsUsed: 15,
        socialInteractions: 89
    },
    recentActivity: {
        spaces: [
            {
                spaceId: 'cs_majors',
                spaceName: 'CS Majors',
                action: 'visited',
                timestamp: '2024-12-14T09:30:00Z',
                duration: 45
            },
            {
                spaceId: 'study_groups',
                spaceName: 'Study Groups',
                action: 'posted',
                timestamp: '2024-12-14T08:15:00Z',
                duration: 20
            },
            {
                spaceId: 'campus_events',
                spaceName: 'Campus Events',
                action: 'reacted',
                timestamp: '2024-12-13T19:45:00Z',
                duration: 5
            }
        ],
        tools: [
            {
                toolId: 'gpa_calc',
                toolName: 'GPA Calculator',
                action: 'used',
                timestamp: '2024-12-14T10:00:00Z',
                spaceId: 'cs_majors'
            },
            {
                toolId: 'study_timer',
                toolName: 'Study Timer',
                action: 'completed',
                timestamp: '2024-12-14T08:30:00Z',
                spaceId: 'study_groups'
            },
            {
                toolId: 'poll_maker',
                toolName: 'Poll Maker',
                action: 'created',
                timestamp: '2024-12-13T16:20:00Z',
                spaceId: 'campus_events'
            }
        ],
        social: [
            {
                type: 'comment',
                description: 'Commented on study group post',
                timestamp: '2024-12-14T09:45:00Z',
                spaceId: 'study_groups'
            },
            {
                type: 'reaction',
                description: 'Liked event announcement',
                timestamp: '2024-12-14T08:20:00Z',
                spaceId: 'campus_events'
            },
            {
                type: 'mention',
                description: 'Mentioned in discussion',
                timestamp: '2024-12-13T20:10:00Z',
                spaceId: 'cs_majors'
            }
        ]
    },
    upcomingEvents: [
        {
            id: 'event_1',
            title: 'CS Club Meeting',
            startDate: '2024-12-15T18:00:00Z',
            endDate: '2024-12-15T19:30:00Z',
            type: 'space',
            spaceId: 'cs_majors',
            spaceName: 'CS Majors',
            isToday: false,
            isUpcoming: true
        },
        {
            id: 'event_2',
            title: 'Study Session - Algorithms',
            startDate: '2024-12-14T15:00:00Z',
            endDate: '2024-12-14T17:00:00Z',
            type: 'space',
            spaceId: 'study_groups',
            spaceName: 'Study Groups',
            isToday: true,
            isUpcoming: true
        },
        {
            id: 'event_3',
            title: 'Personal: Final Project Due',
            startDate: '2024-12-16T23:59:00Z',
            endDate: '2024-12-16T23:59:00Z',
            type: 'personal',
            isToday: false,
            isUpcoming: true
        },
        {
            id: 'event_4',
            title: 'Career Fair',
            startDate: '2024-12-17T10:00:00Z',
            endDate: '2024-12-17T16:00:00Z',
            type: 'space',
            spaceId: 'campus_events',
            spaceName: 'Campus Events',
            isToday: false,
            isUpcoming: true
        }
    ],
    quickActions: {
        favoriteSpaces: [
            {
                spaceId: 'cs_majors',
                spaceName: 'CS Majors',
                unreadCount: 3,
                lastActivity: '2024-12-14T09:30:00Z'
            },
            {
                spaceId: 'study_groups',
                spaceName: 'Study Groups',
                unreadCount: 1,
                lastActivity: '2024-12-14T08:15:00Z'
            },
            {
                spaceId: 'campus_events',
                spaceName: 'Campus Events',
                unreadCount: 0,
                lastActivity: '2024-12-13T19:45:00Z'
            },
            {
                spaceId: 'ml_research',
                spaceName: 'ML Research',
                unreadCount: 2,
                lastActivity: '2024-12-13T14:20:00Z'
            }
        ],
        pinnedSpaces: [
            {
                spaceId: 'cs_majors',
                spaceName: 'CS Majors',
                unreadCount: 3,
                lastActivity: '2024-12-14T09:30:00Z'
            },
            {
                spaceId: 'study_groups',
                spaceName: 'Study Groups',
                unreadCount: 1,
                lastActivity: '2024-12-14T08:15:00Z'
            }
        ],
        recommendations: [
            {
                spaceId: 'web_dev_club',
                spaceName: 'Web Development Club',
                matchScore: 92,
                matchReasons: ['Web Development interest', 'Similar activity patterns', 'Mutual connections']
            },
            {
                spaceId: 'startup_community',
                spaceName: 'Startup Community',
                matchScore: 87,
                matchReasons: ['Entrepreneurship interest', 'CS major match', 'Active participation style']
            },
            {
                spaceId: 'design_thinking',
                spaceName: 'Design Thinking',
                matchScore: 81,
                matchReasons: ['Design interest', 'Creative tools usage', 'Collaborative approach']
            }
        ]
    },
    insights: {
        peakActivityTime: '2 PM',
        mostActiveSpace: {
            spaceId: 'cs_majors',
            spaceName: 'CS Majors',
            timeSpent: 680 // minutes
        },
        weeklyGoal: {
            target: 180, // 3 hours
            current: 142, // 2h 22m
            percentage: 79
        },
        streaks: {
            currentStreak: 5,
            longestStreak: 12,
            type: 'daily_activity'
        }
    },
    privacy: {
        ghostMode: {
            enabled: false,
            level: 'normal'
        },
        visibility: {
            profileVisible: true,
            activityVisible: true,
            onlineStatus: true
        }
    }
};
// Default story
export const Default = {
    args: {
        data: mockDashboardData,
        isLoading: false
    }
};
// Loading state
export const Loading = {
    args: {
        isLoading: true
    }
};
// Error state (no data)
export const NoData = {
    args: {
        data: undefined,
        isLoading: false
    }
};
// Ghost mode enabled
export const GhostMode = {
    args: {
        data: {
            ...mockDashboardData,
            privacy: {
                ghostMode: {
                    enabled: true,
                    level: 'high'
                },
                visibility: {
                    profileVisible: false,
                    activityVisible: false,
                    onlineStatus: false
                }
            }
        },
        isLoading: false
    }
};
// New user with minimal data
export const NewUser = {
    args: {
        data: {
            ...mockDashboardData,
            summary: {
                totalSpaces: 2,
                activeSpaces: 1,
                favoriteSpaces: 0,
                totalTimeSpent: 45,
                weeklyActivity: 25,
                contentCreated: 1,
                toolsUsed: 2,
                socialInteractions: 3
            },
            recentActivity: {
                spaces: [
                    {
                        spaceId: 'welcome',
                        spaceName: 'Welcome to HIVE',
                        action: 'joined',
                        timestamp: '2024-12-14T10:00:00Z',
                        duration: 15
                    }
                ],
                tools: [
                    {
                        toolId: 'intro_quiz',
                        toolName: 'Campus Introduction Quiz',
                        action: 'completed',
                        timestamp: '2024-12-14T10:15:00Z',
                        spaceId: 'welcome'
                    }
                ],
                social: [
                    {
                        type: 'welcome',
                        description: 'Received welcome message',
                        timestamp: '2024-12-14T10:00:00Z',
                        spaceId: 'welcome'
                    }
                ]
            },
            upcomingEvents: [
                {
                    id: 'orientation',
                    title: 'New Student Orientation',
                    startDate: '2024-12-15T14:00:00Z',
                    endDate: '2024-12-15T16:00:00Z',
                    type: 'space',
                    spaceId: 'welcome',
                    spaceName: 'Welcome to HIVE',
                    isToday: false,
                    isUpcoming: true
                }
            ],
            quickActions: {
                favoriteSpaces: [],
                pinnedSpaces: [],
                recommendations: [
                    {
                        spaceId: 'cs_majors',
                        spaceName: 'CS Majors',
                        matchScore: 95,
                        matchReasons: ['Major match', 'Year level match']
                    },
                    {
                        spaceId: 'study_groups',
                        spaceName: 'Study Groups',
                        matchScore: 88,
                        matchReasons: ['Academic focus', 'Collaboration preference']
                    }
                ]
            },
            insights: {
                peakActivityTime: 'N/A',
                mostActiveSpace: null,
                weeklyGoal: {
                    target: 60,
                    current: 25,
                    percentage: 42
                },
                streaks: {
                    currentStreak: 1,
                    longestStreak: 1,
                    type: 'daily_activity'
                }
            }
        },
        isLoading: false
    }
};
// Highly active user
export const SuperActiveUser = {
    args: {
        data: {
            ...mockDashboardData,
            summary: {
                totalSpaces: 25,
                activeSpaces: 18,
                favoriteSpaces: 8,
                totalTimeSpent: 5680, // ~94 hours
                weeklyActivity: 420, // 7 hours
                contentCreated: 156,
                toolsUsed: 43,
                socialInteractions: 342
            },
            insights: {
                ...mockDashboardData.insights,
                weeklyGoal: {
                    target: 300, // 5 hours
                    current: 420, // 7 hours - exceeded!
                    percentage: 140
                },
                streaks: {
                    currentStreak: 23,
                    longestStreak: 45,
                    type: 'daily_activity'
                }
            }
        },
        isLoading: false
    }
};
// Mobile viewport
export const Mobile = {
    args: {
        data: mockDashboardData,
        isLoading: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
// Dark mode variant (if supported)
export const DarkMode = {
    args: {
        data: mockDashboardData,
        isLoading: false
    },
    parameters: {
        backgrounds: { default: 'dark' }
    }
};
// Interactive demo with all actions
export const InteractiveDemo = {
    args: {
        data: mockDashboardData,
        isLoading: false,
        onRefresh: () => {
            console.log('Dashboard refreshed!');
            // In real implementation, this would trigger a data reload
        },
        onNavigate: (path) => {
            console.log(`Navigating to: ${path}`);
            // In real implementation, this would trigger navigation
        }
    }
};
//# sourceMappingURL=hive-dashboard.stories.js.map