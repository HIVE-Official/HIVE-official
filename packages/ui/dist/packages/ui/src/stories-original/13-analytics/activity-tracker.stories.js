import { jsx as _jsx } from "react/jsx-runtime";
import { ActivityTracker, mockActivityTrackerData } from '../../components/dashboard/activity-tracker';
import { Clock, Users, Zap, Target } from 'lucide-react';
const meta = {
    title: 'Dashboard/ActivityTracker',
    component: ActivityTracker,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Activity Tracker Component

The Activity Tracker provides comprehensive insights into student engagement and productivity patterns. Features include:

- **Real-time Metrics**: Live tracking of time spent, spaces visited, tools used, and goals completed
- **Session Management**: Detailed view of individual study and engagement sessions
- **Goal Tracking**: Personal goals with progress monitoring and deadline tracking
- **Weekly Analytics**: Comprehensive weekly summary with patterns and insights
- **Smart Insights**: AI-powered recommendations based on activity patterns
- **Export Capabilities**: Download activity data for external analysis

## Key Features

- **Multi-view Interface**: Overview, Sessions, and Goals tabs for different perspectives
- **Time Range Selection**: Filter by today, week, or month
- **Progress Visualization**: Visual progress bars and trend indicators
- **Actionable Insights**: Personalized recommendations for improved productivity

## Design System

Built with HIVE's liquid metal motion system and data visualization components for clear insights presentation.
        `
            }
        }
    },
    argTypes: {
        isLoading: {
            control: 'boolean',
            description: 'Shows skeleton loading state'
        },
        onTimeRangeChange: {
            action: 'time-range-changed',
            description: 'Callback when time range filter changes'
        },
        onRefresh: {
            action: 'refresh',
            description: 'Callback when refresh button is clicked'
        },
        onExport: {
            action: 'export',
            description: 'Callback when export button is clicked'
        },
        onGoalUpdate: {
            action: 'goal-updated',
            description: 'Callback when a goal target is updated'
        }
    }
};
export default meta;
// Default story with comprehensive activity data
export const Default = {
    args: {
        data: mockActivityTrackerData,
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
// High activity user
export const HighActivity = {
    args: {
        data: {
            metrics: [
                {
                    id: 'total_time',
                    name: 'Total Time',
                    value: 45,
                    unit: 'hours',
                    change: 25,
                    changeType: 'increase',
                    target: 40,
                    color: 'blue',
                    icon: _jsx(Clock, { className: "h-4 w-4" })
                },
                {
                    id: 'spaces_visited',
                    name: 'Spaces',
                    value: 15,
                    unit: 'spaces',
                    change: 8,
                    changeType: 'increase',
                    color: 'green',
                    icon: _jsx(Users, { className: "h-4 w-4" })
                },
                {
                    id: 'tools_used',
                    name: 'Tools',
                    value: 28,
                    unit: 'tools',
                    change: 12,
                    changeType: 'increase',
                    color: 'purple',
                    icon: _jsx(Zap, { className: "h-4 w-4" })
                },
                {
                    id: 'goals_completed',
                    name: 'Goals',
                    value: 8,
                    unit: 'completed',
                    change: 3,
                    changeType: 'increase',
                    color: 'orange',
                    icon: _jsx(Target, { className: "h-4 w-4" })
                }
            ],
            sessions: [
                {
                    id: 'session_1',
                    spaceId: 'cs_majors',
                    spaceName: 'CS Majors',
                    startTime: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
                    endTime: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
                    duration: 180,
                    activityType: 'study',
                    toolsUsed: ['gpa_calculator', 'study_timer', 'citation_manager'],
                    interactions: 45
                },
                {
                    id: 'session_2',
                    spaceId: 'study_groups',
                    spaceName: 'Study Groups',
                    startTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
                    endTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                    duration: 120,
                    activityType: 'social',
                    toolsUsed: ['task_manager', 'link_vault'],
                    interactions: 28
                },
                {
                    id: 'session_3',
                    spaceId: 'makers',
                    spaceName: 'Maker Space',
                    startTime: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
                    endTime: new Date().toISOString(),
                    duration: 30,
                    activityType: 'tool_usage',
                    toolsUsed: ['3d_printer', 'design_software'],
                    interactions: 15
                }
            ],
            insights: [
                {
                    id: 'insight_1',
                    title: 'Exceptional Week!',
                    description: 'You\'ve exceeded all weekly goals and maintained a 95% consistency rate',
                    type: 'achievement',
                    priority: 'high',
                    actionable: false
                },
                {
                    id: 'insight_2',
                    title: 'Peak Performance Window',
                    description: 'Your most productive sessions occur between 2-5 PM. Consider scheduling important tasks during this time.',
                    type: 'recommendation',
                    priority: 'medium',
                    actionable: true,
                    action: {
                        label: 'Schedule Peak Sessions'
                    }
                },
                {
                    id: 'insight_3',
                    title: 'Tool Mastery',
                    description: 'You\'ve become proficient with 15+ tools this week. Consider sharing knowledge in spaces.',
                    type: 'milestone',
                    priority: 'medium',
                    actionable: true,
                    action: {
                        label: 'Share Expertise'
                    }
                }
            ],
            goals: [
                {
                    id: 'goal_1',
                    title: 'Weekly Study Target',
                    description: 'Maintain consistent daily study schedule',
                    target: 35,
                    current: 45,
                    unit: 'hours',
                    deadline: new Date(Date.now() + 172800000).toISOString(), // 2 days
                    category: 'weekly',
                    color: 'blue'
                },
                {
                    id: 'goal_2',
                    title: 'Space Exploration',
                    description: 'Visit diverse learning spaces',
                    target: 10,
                    current: 15,
                    unit: 'spaces',
                    deadline: new Date(Date.now() + 172800000).toISOString(),
                    category: 'weekly',
                    color: 'green'
                },
                {
                    id: 'goal_3',
                    title: 'Tool Mastery',
                    description: 'Learn and use new productivity tools',
                    target: 20,
                    current: 28,
                    unit: 'tools',
                    deadline: new Date(Date.now() + 172800000).toISOString(),
                    category: 'weekly',
                    color: 'purple'
                }
            ],
            timeRange: 'week',
            weeklyStats: {
                totalHours: 45,
                avgSessionLength: 110,
                mostActiveDay: 'Tuesday',
                preferredTimeSlot: '2-5 PM',
                spacesVisited: 15,
                toolsUsed: 28
            }
        },
        isLoading: false
    }
};
// Low activity user
export const LowActivity = {
    args: {
        data: {
            metrics: [
                {
                    id: 'total_time',
                    name: 'Total Time',
                    value: 8,
                    unit: 'hours',
                    change: -15,
                    changeType: 'decrease',
                    target: 20,
                    color: 'blue',
                    icon: _jsx(Clock, { className: "h-4 w-4" })
                },
                {
                    id: 'spaces_visited',
                    name: 'Spaces',
                    value: 3,
                    unit: 'spaces',
                    change: -2,
                    changeType: 'decrease',
                    color: 'green',
                    icon: _jsx(Users, { className: "h-4 w-4" })
                },
                {
                    id: 'tools_used',
                    name: 'Tools',
                    value: 5,
                    unit: 'tools',
                    change: 0,
                    changeType: 'neutral',
                    color: 'purple',
                    icon: _jsx(Zap, { className: "h-4 w-4" })
                },
                {
                    id: 'goals_completed',
                    name: 'Goals',
                    value: 1,
                    unit: 'completed',
                    change: -1,
                    changeType: 'decrease',
                    color: 'orange',
                    icon: _jsx(Target, { className: "h-4 w-4" })
                }
            ],
            sessions: [
                {
                    id: 'session_1',
                    spaceId: 'welcome',
                    spaceName: 'Welcome Space',
                    startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
                    endTime: new Date(Date.now() - 82800000).toISOString(),
                    duration: 60,
                    activityType: 'study',
                    toolsUsed: ['gpa_calculator'],
                    interactions: 5
                }
            ],
            insights: [
                {
                    id: 'insight_1',
                    title: 'Get Back on Track',
                    description: 'Your activity has decreased this week. Consider setting small, achievable daily goals.',
                    type: 'recommendation',
                    priority: 'high',
                    actionable: true,
                    action: {
                        label: 'Set Daily Goals'
                    }
                },
                {
                    id: 'insight_2',
                    title: 'Explore New Spaces',
                    description: 'Try visiting different spaces to find your preferred learning environment.',
                    type: 'recommendation',
                    priority: 'medium',
                    actionable: true,
                    action: {
                        label: 'Browse Spaces'
                    }
                }
            ],
            goals: [
                {
                    id: 'goal_1',
                    title: 'Daily Study Goal',
                    description: 'Start with small, consistent study sessions',
                    target: 60,
                    current: 8,
                    unit: 'minutes',
                    deadline: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                    category: 'daily',
                    color: 'blue'
                }
            ],
            timeRange: 'week',
            weeklyStats: {
                totalHours: 8,
                avgSessionLength: 30,
                mostActiveDay: 'Monday',
                preferredTimeSlot: '10-12 PM',
                spacesVisited: 3,
                toolsUsed: 5
            }
        },
        isLoading: false
    }
};
// New user with minimal data
export const NewUser = {
    args: {
        data: {
            metrics: [
                {
                    id: 'total_time',
                    name: 'Total Time',
                    value: 2,
                    unit: 'hours',
                    change: 0,
                    changeType: 'neutral',
                    target: 5,
                    color: 'blue',
                    icon: _jsx(Clock, { className: "h-4 w-4" })
                },
                {
                    id: 'spaces_visited',
                    name: 'Spaces',
                    value: 1,
                    unit: 'spaces',
                    change: 0,
                    changeType: 'neutral',
                    color: 'green',
                    icon: _jsx(Users, { className: "h-4 w-4" })
                },
                {
                    id: 'tools_used',
                    name: 'Tools',
                    value: 2,
                    unit: 'tools',
                    change: 0,
                    changeType: 'neutral',
                    color: 'purple',
                    icon: _jsx(Zap, { className: "h-4 w-4" })
                },
                {
                    id: 'goals_completed',
                    name: 'Goals',
                    value: 0,
                    unit: 'completed',
                    change: 0,
                    changeType: 'neutral',
                    color: 'orange',
                    icon: _jsx(Target, { className: "h-4 w-4" })
                }
            ],
            sessions: [
                {
                    id: 'session_1',
                    spaceId: 'welcome',
                    spaceName: 'Welcome Space',
                    startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                    endTime: new Date().toISOString(),
                    duration: 60,
                    activityType: 'study',
                    toolsUsed: ['onboarding_guide'],
                    interactions: 8
                }
            ],
            insights: [
                {
                    id: 'insight_1',
                    title: 'Welcome to HIVE!',
                    description: 'Complete your profile and explore different spaces to get personalized recommendations.',
                    type: 'recommendation',
                    priority: 'high',
                    actionable: true,
                    action: {
                        label: 'Complete Profile'
                    }
                },
                {
                    id: 'insight_2',
                    title: 'Discover Tools',
                    description: 'Browse the tool library to find productivity tools that match your academic needs.',
                    type: 'recommendation',
                    priority: 'medium',
                    actionable: true,
                    action: {
                        label: 'Browse Tools'
                    }
                }
            ],
            goals: [
                {
                    id: 'goal_1',
                    title: 'First Week Goal',
                    description: 'Explore the platform and join your first space',
                    target: 5,
                    current: 2,
                    unit: 'hours',
                    deadline: new Date(Date.now() + 518400000).toISOString(), // 6 days
                    category: 'weekly',
                    color: 'blue'
                }
            ],
            timeRange: 'week',
            weeklyStats: {
                totalHours: 2,
                avgSessionLength: 60,
                mostActiveDay: 'Today',
                preferredTimeSlot: 'N/A',
                spacesVisited: 1,
                toolsUsed: 2
            }
        },
        isLoading: false
    }
};
// Focused on goals view
export const GoalsFocused = {
    args: {
        data: {
            ...mockActivityTrackerData,
            goals: [
                {
                    id: 'goal_1',
                    title: 'Daily Study Streak',
                    description: 'Study for at least 2 hours every day',
                    target: 14,
                    current: 12,
                    unit: 'days',
                    deadline: new Date(Date.now() + 172800000).toISOString(),
                    category: 'daily',
                    color: 'blue'
                },
                {
                    id: 'goal_2',
                    title: 'Weekly Tool Mastery',
                    description: 'Learn 3 new productivity tools each week',
                    target: 3,
                    current: 2,
                    unit: 'tools',
                    deadline: new Date(Date.now() + 259200000).toISOString(),
                    category: 'weekly',
                    color: 'purple'
                },
                {
                    id: 'goal_3',
                    title: 'Monthly Space Exploration',
                    description: 'Join and actively participate in 5 new spaces',
                    target: 5,
                    current: 3,
                    unit: 'spaces',
                    deadline: new Date(Date.now() + 2592000000).toISOString(), // 30 days
                    category: 'monthly',
                    color: 'green'
                },
                {
                    id: 'goal_4',
                    title: 'GPA Improvement',
                    description: 'Maintain a 3.5+ GPA this semester',
                    target: 3.5,
                    current: 3.2,
                    unit: 'GPA',
                    deadline: new Date(Date.now() + 7776000000).toISOString(), // 90 days
                    category: 'monthly',
                    color: 'orange'
                }
            ]
        },
        isLoading: false
    }
};
// Academic insights focused
export const AcademicInsights = {
    args: {
        data: {
            ...mockActivityTrackerData,
            insights: [
                {
                    id: 'insight_1',
                    title: 'Study Pattern Optimization',
                    description: 'Your retention rate is 23% higher during morning sessions (8-11 AM)',
                    type: 'recommendation',
                    priority: 'high',
                    actionable: true,
                    action: {
                        label: 'Schedule Morning Study'
                    }
                },
                {
                    id: 'insight_2',
                    title: 'Subject Balance Alert',
                    description: 'You\'ve spent 70% of time on CS subjects. Consider balancing with other courses.',
                    type: 'warning',
                    priority: 'medium',
                    actionable: true,
                    action: {
                        label: 'View Subject Balance'
                    }
                },
                {
                    id: 'insight_3',
                    title: 'Tool Synergy Achievement',
                    description: 'Using Study Timer + GPA Calculator together improved your productivity by 35%',
                    type: 'achievement',
                    priority: 'low',
                    actionable: false
                },
                {
                    id: 'insight_4',
                    title: 'Social Learning Boost',
                    description: 'Study group sessions show 40% better engagement. Join more collaborative spaces.',
                    type: 'recommendation',
                    priority: 'medium',
                    actionable: true,
                    action: {
                        label: 'Find Study Groups'
                    }
                }
            ]
        },
        isLoading: false
    }
};
// Mobile viewport
export const Mobile = {
    args: {
        data: mockActivityTrackerData,
        isLoading: false
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
// Dark mode variant
export const DarkMode = {
    args: {
        data: mockActivityTrackerData,
        isLoading: false
    },
    parameters: {
        backgrounds: { default: 'dark' }
    }
};
// Interactive demo with all actions
export const InteractiveDemo = {
    args: {
        data: mockActivityTrackerData,
        isLoading: false,
        onTimeRangeChange: (range) => {
            console.log(`Time range changed to: ${range}`);
        },
        onRefresh: () => {
            console.log('Activity data refreshed');
        },
        onExport: () => {
            console.log('Export activity data requested');
        },
        onGoalUpdate: (goalId, newTarget) => {
            console.log(`Goal ${goalId} target updated to: ${newTarget}`);
        }
    }
};
// Empty state - no activity
export const EmptyState = {
    args: {
        data: {
            metrics: [
                {
                    id: 'total_time',
                    name: 'Total Time',
                    value: 0,
                    unit: 'hours',
                    change: 0,
                    changeType: 'neutral',
                    color: 'blue',
                    icon: _jsx(Clock, { className: "h-4 w-4" })
                },
                {
                    id: 'spaces_visited',
                    name: 'Spaces',
                    value: 0,
                    unit: 'spaces',
                    change: 0,
                    changeType: 'neutral',
                    color: 'green',
                    icon: _jsx(Users, { className: "h-4 w-4" })
                },
                {
                    id: 'tools_used',
                    name: 'Tools',
                    value: 0,
                    unit: 'tools',
                    change: 0,
                    changeType: 'neutral',
                    color: 'purple',
                    icon: _jsx(Zap, { className: "h-4 w-4" })
                },
                {
                    id: 'goals_completed',
                    name: 'Goals',
                    value: 0,
                    unit: 'completed',
                    change: 0,
                    changeType: 'neutral',
                    color: 'orange',
                    icon: _jsx(Target, { className: "h-4 w-4" })
                }
            ],
            sessions: [],
            insights: [
                {
                    id: 'insight_1',
                    title: 'Start Your Journey',
                    description: 'Begin by exploring spaces and setting your first learning goals.',
                    type: 'recommendation',
                    priority: 'high',
                    actionable: true,
                    action: {
                        label: 'Get Started'
                    }
                }
            ],
            goals: [],
            timeRange: 'week',
            weeklyStats: {
                totalHours: 0,
                avgSessionLength: 0,
                mostActiveDay: 'N/A',
                preferredTimeSlot: 'N/A',
                spacesVisited: 0,
                toolsUsed: 0
            }
        },
        isLoading: false
    }
};
//# sourceMappingURL=activity-tracker.stories.js.map