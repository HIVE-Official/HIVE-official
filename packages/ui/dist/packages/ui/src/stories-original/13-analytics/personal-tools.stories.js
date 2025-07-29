import { jsx as _jsx } from "react/jsx-runtime";
import { PersonalTools, mockPersonalToolsData } from '../../components/dashboard/personal-tools';
import { Calculator, Timer, CheckSquare, FileText, Link, Target } from 'lucide-react';
const meta = {
    title: 'Dashboard/PersonalTools',
    component: PersonalTools,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Personal Tools Component

The Personal Tools component provides a comprehensive interface for managing and interacting with personalized academic and productivity tools. Features include:

- **Category-based Organization**: Tools organized by Academic, Productivity, Social, and Wellness categories
- **Quick Actions**: Direct input fields for adding data to tools (grades, study sessions, tasks, etc.)
- **Real-time Data Display**: Live statistics and progress tracking for each tool
- **Activity Monitoring**: Recent tool usage history and patterns
- **Interactive Interface**: Smooth animations and responsive design

## Tool Categories

- **Academic**: GPA Calculator, Citation Manager, Course Planner
- **Productivity**: Study Timer, Task Manager, Link Vault
- **Social**: Group Coordination, Event Planning, Communication
- **Wellness**: Goal Tracker, Habit Builder, Mood Journal

## Design System

Built with HIVE's liquid metal motion system and category-specific color coding for intuitive navigation.
        `
            }
        }
    },
    argTypes: {
        isLoading: {
            control: 'boolean',
            description: 'Shows skeleton loading state'
        },
        onToolAction: {
            action: 'tool-action',
            description: 'Callback when tool action is performed'
        },
        onAddTool: {
            action: 'add-tool',
            description: 'Callback when add tool button is clicked'
        }
    }
};
export default meta;
// Default story with comprehensive tool set
export const Default = {
    args: {
        data: mockPersonalToolsData,
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
// New user with minimal tools
export const NewUser = {
    args: {
        data: {
            tools: [
                {
                    id: 'gpa_calculator',
                    name: 'GPA Calculator',
                    description: 'Track and calculate your cumulative GPA',
                    icon: _jsx(Calculator, { className: "h-4 w-4" }),
                    category: 'academic',
                    isActive: false,
                    quickAction: { label: 'Grade', value: 'A', unit: 'grade' }
                },
                {
                    id: 'study_timer',
                    name: 'Study Timer',
                    description: 'Track study sessions and breaks',
                    icon: _jsx(Timer, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: false,
                    quickAction: { label: 'Session', value: '25', unit: 'min' }
                }
            ],
            quickStats: {
                gpa: 0.0,
                studyHours: 0,
                tasksCompleted: 0,
                upcomingDeadlines: 1
            },
            recentActivities: [
                {
                    toolId: 'welcome',
                    toolName: 'Welcome Guide',
                    action: 'Completed setup',
                    timestamp: '2024-12-14T10:00:00Z'
                }
            ]
        },
        isLoading: false
    }
};
// Super active user with many tools and high usage
export const SuperActiveUser = {
    args: {
        data: {
            tools: [
                {
                    id: 'gpa_calculator',
                    name: 'GPA Calculator',
                    description: 'Track and calculate your cumulative GPA',
                    icon: _jsx(Calculator, { className: "h-4 w-4" }),
                    category: 'academic',
                    isActive: true,
                    lastUsed: '2024-12-14T10:00:00Z',
                    data: { currentGPA: 3.89, totalCredits: 78 },
                    quickAction: { label: 'Grade', value: 'A', unit: 'grade' }
                },
                {
                    id: 'study_timer',
                    name: 'Study Timer',
                    description: 'Track study sessions and breaks',
                    icon: _jsx(Timer, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: true,
                    lastUsed: '2024-12-14T09:30:00Z',
                    data: { todayMinutes: 240, weekMinutes: 1800 },
                    quickAction: { label: 'Session', value: '25', unit: 'min' }
                },
                {
                    id: 'task_manager',
                    name: 'Task Manager',
                    description: 'Organize assignments and deadlines',
                    icon: _jsx(CheckSquare, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: true,
                    lastUsed: '2024-12-14T08:15:00Z',
                    data: { completed: 23, total: 28 },
                    quickAction: { label: 'Task', value: '', unit: '' }
                },
                {
                    id: 'citation_manager',
                    name: 'Citation Manager',
                    description: 'Organize research sources and citations',
                    icon: _jsx(FileText, { className: "h-4 w-4" }),
                    category: 'academic',
                    isActive: true,
                    lastUsed: '2024-12-14T07:45:00Z',
                    data: { totalSources: 45, recentCitations: 12 },
                    quickAction: { label: 'Source', value: '', unit: 'URL' }
                },
                {
                    id: 'link_vault',
                    name: 'Link Vault',
                    description: 'Save and organize useful links',
                    icon: _jsx(Link, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: true,
                    lastUsed: '2024-12-13T16:45:00Z',
                    data: { totalLinks: 89, categories: 12 },
                    quickAction: { label: 'Link', value: '', unit: 'URL' }
                },
                {
                    id: 'goal_tracker',
                    name: 'Goal Tracker',
                    description: 'Set and track personal goals',
                    icon: _jsx(Target, { className: "h-4 w-4" }),
                    category: 'wellness',
                    isActive: true,
                    lastUsed: '2024-12-14T07:30:00Z',
                    data: { activeGoals: 8, completedGoals: 15 },
                    quickAction: { label: 'Goal', value: '', unit: '' }
                }
            ],
            quickStats: {
                gpa: 3.89,
                studyHours: 30,
                tasksCompleted: 23,
                upcomingDeadlines: 8
            },
            recentActivities: [
                {
                    toolId: 'gpa_calculator',
                    toolName: 'GPA Calculator',
                    action: 'Added grade',
                    timestamp: '2024-12-14T10:00:00Z',
                    result: 'A (4.0)'
                },
                {
                    toolId: 'study_timer',
                    toolName: 'Study Timer',
                    action: 'Completed session',
                    timestamp: '2024-12-14T09:30:00Z',
                    result: '120 min'
                },
                {
                    toolId: 'task_manager',
                    toolName: 'Task Manager',
                    action: 'Completed task',
                    timestamp: '2024-12-14T08:15:00Z',
                    result: 'Research paper draft'
                },
                {
                    toolId: 'citation_manager',
                    toolName: 'Citation Manager',
                    action: 'Added sources',
                    timestamp: '2024-12-14T07:45:00Z',
                    result: '3 new sources'
                },
                {
                    toolId: 'goal_tracker',
                    toolName: 'Goal Tracker',
                    action: 'Goal completed',
                    timestamp: '2024-12-14T07:30:00Z',
                    result: 'Weekly study target'
                }
            ]
        },
        isLoading: false
    }
};
// Academic-focused tools only
export const AcademicFocus = {
    args: {
        data: {
            tools: [
                {
                    id: 'gpa_calculator',
                    name: 'GPA Calculator',
                    description: 'Track and calculate your cumulative GPA',
                    icon: _jsx(Calculator, { className: "h-4 w-4" }),
                    category: 'academic',
                    isActive: true,
                    lastUsed: '2024-12-14T10:00:00Z',
                    data: { currentGPA: 3.67, totalCredits: 45 },
                    quickAction: { label: 'Grade', value: 'A', unit: 'grade' }
                },
                {
                    id: 'citation_manager',
                    name: 'Citation Manager',
                    description: 'Organize research sources and citations',
                    icon: _jsx(FileText, { className: "h-4 w-4" }),
                    category: 'academic',
                    isActive: true,
                    lastUsed: '2024-12-12T14:20:00Z',
                    data: { totalSources: 15, recentCitations: 5 },
                    quickAction: { label: 'Source', value: '', unit: 'URL' }
                }
            ],
            quickStats: {
                gpa: 3.67,
                studyHours: 12,
                tasksCompleted: 5,
                upcomingDeadlines: 3
            },
            recentActivities: [
                {
                    toolId: 'gpa_calculator',
                    toolName: 'GPA Calculator',
                    action: 'Added grade',
                    timestamp: '2024-12-14T10:00:00Z',
                    result: 'A- (3.7)'
                },
                {
                    toolId: 'citation_manager',
                    toolName: 'Citation Manager',
                    action: 'Added source',
                    timestamp: '2024-12-12T14:20:00Z',
                    result: 'Research article'
                }
            ]
        },
        isLoading: false
    }
};
// Productivity-focused tools only
export const ProductivityFocus = {
    args: {
        data: {
            tools: [
                {
                    id: 'study_timer',
                    name: 'Study Timer',
                    description: 'Track study sessions and breaks',
                    icon: _jsx(Timer, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: true,
                    lastUsed: '2024-12-14T09:30:00Z',
                    data: { todayMinutes: 120, weekMinutes: 480 },
                    quickAction: { label: 'Session', value: '25', unit: 'min' }
                },
                {
                    id: 'task_manager',
                    name: 'Task Manager',
                    description: 'Organize assignments and deadlines',
                    icon: _jsx(CheckSquare, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: true,
                    lastUsed: '2024-12-14T08:15:00Z',
                    data: { completed: 8, total: 12 },
                    quickAction: { label: 'Task', value: '', unit: '' }
                },
                {
                    id: 'link_vault',
                    name: 'Link Vault',
                    description: 'Save and organize useful links',
                    icon: _jsx(Link, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: true,
                    lastUsed: '2024-12-13T16:45:00Z',
                    data: { totalLinks: 23, categories: 5 },
                    quickAction: { label: 'Link', value: '', unit: 'URL' }
                }
            ],
            quickStats: {
                gpa: 3.45,
                studyHours: 8,
                tasksCompleted: 8,
                upcomingDeadlines: 4
            },
            recentActivities: [
                {
                    toolId: 'study_timer',
                    toolName: 'Study Timer',
                    action: 'Completed session',
                    timestamp: '2024-12-14T09:30:00Z',
                    result: '50 min'
                },
                {
                    toolId: 'task_manager',
                    toolName: 'Task Manager',
                    action: 'Completed task',
                    timestamp: '2024-12-14T08:15:00Z',
                    result: 'Math homework'
                },
                {
                    toolId: 'link_vault',
                    toolName: 'Link Vault',
                    action: 'Added link',
                    timestamp: '2024-12-13T16:45:00Z',
                    result: 'Tutorial resource'
                }
            ]
        },
        isLoading: false
    }
};
// Low activity user
export const LowActivity = {
    args: {
        data: {
            tools: [
                {
                    id: 'gpa_calculator',
                    name: 'GPA Calculator',
                    description: 'Track and calculate your cumulative GPA',
                    icon: _jsx(Calculator, { className: "h-4 w-4" }),
                    category: 'academic',
                    isActive: false,
                    lastUsed: '2024-12-10T14:20:00Z',
                    data: { currentGPA: 3.2, totalCredits: 30 },
                    quickAction: { label: 'Grade', value: 'B', unit: 'grade' }
                },
                {
                    id: 'task_manager',
                    name: 'Task Manager',
                    description: 'Organize assignments and deadlines',
                    icon: _jsx(CheckSquare, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: false,
                    lastUsed: '2024-12-09T10:30:00Z',
                    data: { completed: 2, total: 8 },
                    quickAction: { label: 'Task', value: '', unit: '' }
                }
            ],
            quickStats: {
                gpa: 3.2,
                studyHours: 2,
                tasksCompleted: 2,
                upcomingDeadlines: 6
            },
            recentActivities: [
                {
                    toolId: 'gpa_calculator',
                    toolName: 'GPA Calculator',
                    action: 'Viewed GPA',
                    timestamp: '2024-12-10T14:20:00Z'
                },
                {
                    toolId: 'task_manager',
                    toolName: 'Task Manager',
                    action: 'Added task',
                    timestamp: '2024-12-09T10:30:00Z',
                    result: 'Assignment due'
                }
            ]
        },
        isLoading: false
    }
};
// Mobile viewport
export const Mobile = {
    args: {
        data: mockPersonalToolsData,
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
        data: mockPersonalToolsData,
        isLoading: false
    },
    parameters: {
        backgrounds: { default: 'dark' }
    }
};
// Interactive demo with all actions
export const InteractiveDemo = {
    args: {
        data: mockPersonalToolsData,
        isLoading: false,
        onToolAction: (toolId, action, data) => {
            console.log(`Tool Action: ${toolId} - ${action}`, data);
        },
        onAddTool: () => {
            console.log('Add new tool requested');
        }
    }
};
// Empty state - no tools configured
export const EmptyState = {
    args: {
        data: {
            tools: [],
            quickStats: {
                gpa: 0.0,
                studyHours: 0,
                tasksCompleted: 0,
                upcomingDeadlines: 0
            },
            recentActivities: []
        },
        isLoading: false
    }
};
// Tools with mixed activity states
export const MixedActivity = {
    args: {
        data: {
            tools: [
                {
                    id: 'gpa_calculator',
                    name: 'GPA Calculator',
                    description: 'Track and calculate your cumulative GPA',
                    icon: _jsx(Calculator, { className: "h-4 w-4" }),
                    category: 'academic',
                    isActive: true,
                    lastUsed: '2024-12-14T10:00:00Z',
                    data: { currentGPA: 3.67, totalCredits: 45 },
                    quickAction: { label: 'Grade', value: 'A', unit: 'grade' }
                },
                {
                    id: 'study_timer',
                    name: 'Study Timer',
                    description: 'Track study sessions and breaks',
                    icon: _jsx(Timer, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: false,
                    lastUsed: '2024-12-12T09:30:00Z',
                    data: { todayMinutes: 0, weekMinutes: 180 },
                    quickAction: { label: 'Session', value: '25', unit: 'min' }
                },
                {
                    id: 'task_manager',
                    name: 'Task Manager',
                    description: 'Organize assignments and deadlines',
                    icon: _jsx(CheckSquare, { className: "h-4 w-4" }),
                    category: 'productivity',
                    isActive: true,
                    lastUsed: '2024-12-14T08:15:00Z',
                    data: { completed: 8, total: 12 },
                    quickAction: { label: 'Task', value: '', unit: '' }
                },
                {
                    id: 'goal_tracker',
                    name: 'Goal Tracker',
                    description: 'Set and track personal goals',
                    icon: _jsx(Target, { className: "h-4 w-4" }),
                    category: 'wellness',
                    isActive: false,
                    lastUsed: '2024-12-11T07:30:00Z',
                    data: { activeGoals: 3, completedGoals: 7 },
                    quickAction: { label: 'Goal', value: '', unit: '' }
                }
            ],
            quickStats: {
                gpa: 3.67,
                studyHours: 3,
                tasksCompleted: 8,
                upcomingDeadlines: 4
            },
            recentActivities: [
                {
                    toolId: 'gpa_calculator',
                    toolName: 'GPA Calculator',
                    action: 'Added grade',
                    timestamp: '2024-12-14T10:00:00Z',
                    result: 'A- (3.7)'
                },
                {
                    toolId: 'task_manager',
                    toolName: 'Task Manager',
                    action: 'Completed task',
                    timestamp: '2024-12-14T08:15:00Z',
                    result: 'Math homework'
                }
            ]
        },
        isLoading: false
    }
};
//# sourceMappingURL=personal-tools.stories.js.map