import { CalendarCard } from '../../components/profile/calendar-card';
const meta = {
    title: 'Profile/CalendarCard',
    component: CalendarCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A comprehensive calendar card component for the HIVE profile system that displays upcoming events, calendar connections, and scheduling conflicts.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            control: { type: 'select' },
            options: ['loading', 'default', 'empty', 'error', 'sync-failed'],
        },
        variant: {
            control: { type: 'radio' },
            options: ['desktop', 'mobile'],
        },
    },
};
export default meta;
// Mock data
const mockEvents = [
    {
        id: '1',
        title: 'CS 101 Lecture',
        time: '2:00 PM',
        type: 'academic',
        location: 'Davis Hall, Room 101',
        attendees: ['Prof. Johnson'],
        metadata: {
            professor: 'Prof. Johnson',
            room: '101',
            buildingCode: 'DAVIS'
        }
    },
    {
        id: '2',
        title: 'Study Group',
        time: '4:00 PM',
        type: 'study',
        location: 'CS Majors Space',
        attendees: ['Alice', 'Bob', 'Charlie'],
        metadata: {
            spaceId: 'cs-majors',
            rsvpStatus: 'yes'
        }
    },
    {
        id: '3',
        title: 'Pizza Social',
        time: '6:00 PM',
        type: 'social',
        location: 'Student Union',
        attendees: ['Everyone'],
        metadata: {
            rsvpStatus: 'pending'
        }
    },
    {
        id: '4',
        title: 'Online Meeting',
        time: '8:00 PM',
        type: 'work',
        location: 'Zoom',
        attendees: ['Team Lead'],
        isAllDay: false,
        hasReminder: true
    }
];
const mockConnections = [
    {
        id: 'google',
        name: 'Google',
        type: 'google',
        status: 'connected',
        lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        color: 'var(--hive-status-info)'
    },
    {
        id: 'university',
        name: 'University',
        type: 'university',
        status: 'connected',
        lastSync: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        color: 'var(--hive-brand-secondary)'
    }
];
const mockConflicts = [
    {
        id: 'conflict-1',
        events: [mockEvents[1], mockEvents[2]], // Study Group and Pizza Social
        severity: 'minor',
        suggestion: 'Join study group late at 5:30 PM',
        canAutoResolve: false
    }
];
const mockData = {
    nextEvent: mockEvents[0],
    upcomingEvents: mockEvents.slice(1),
    todaysEvents: mockEvents,
    connections: mockConnections,
    conflicts: mockConflicts,
    lastUpdated: new Date()
};
// Stories
export const Default = {
    args: {
        state: 'default',
        data: mockData,
        variant: 'desktop',
    },
};
export const Mobile = {
    args: {
        state: 'default',
        data: mockData,
        variant: 'mobile',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile2',
        },
    },
};
export const Loading = {
    args: {
        state: 'loading',
        variant: 'desktop',
    },
};
export const LoadingMobile = {
    args: {
        state: 'loading',
        variant: 'mobile',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile2',
        },
    },
};
export const Empty = {
    args: {
        state: 'empty',
        variant: 'desktop',
    },
};
export const EmptyMobile = {
    args: {
        state: 'empty',
        variant: 'mobile',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile2',
        },
    },
};
export const SyncError = {
    args: {
        state: 'sync-failed',
        data: {
            ...mockData,
            connections: [
                {
                    id: 'google',
                    name: 'Google',
                    type: 'google',
                    status: 'error',
                    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                    color: 'var(--hive-status-info)'
                },
                ...mockConnections.slice(1)
            ]
        },
        variant: 'desktop',
    },
};
export const SyncErrorMobile = {
    args: {
        state: 'sync-failed',
        data: {
            ...mockData,
            connections: [
                {
                    id: 'google',
                    name: 'Google',
                    type: 'google',
                    status: 'error',
                    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                    color: 'var(--hive-status-info)'
                },
                ...mockConnections.slice(1)
            ]
        },
        variant: 'mobile',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile2',
        },
    },
};
export const WithConflicts = {
    args: {
        state: 'default',
        data: {
            ...mockData,
            conflicts: [
                {
                    id: 'conflict-1',
                    events: [mockEvents[1], mockEvents[2]],
                    severity: 'major',
                    suggestion: 'Move office hours to 3:00 PM slot or join study group late at 5:30 PM',
                    canAutoResolve: false
                }
            ]
        },
        variant: 'desktop',
    },
};
export const NoUpcomingEvents = {
    args: {
        state: 'default',
        data: {
            ...mockData,
            nextEvent: undefined,
            upcomingEvents: [],
            todaysEvents: []
        },
        variant: 'desktop',
    },
};
// Interactive stories with actions
export const Interactive = {
    args: {
        state: 'default',
        data: mockData,
        variant: 'desktop',
        onViewCalendar: () => console.log('View calendar clicked'),
        onConnectCalendar: (type) => console.log('Connect calendar:', type),
        onAddEvent: () => console.log('Add event clicked'),
        onResolveConflict: (conflictId) => console.log('Resolve conflict:', conflictId),
        onSyncCalendar: (connectionId) => console.log('Sync calendar:', connectionId),
        onEventClick: (event) => console.log('Event clicked:', event),
    },
};
// Time-based variants (simulating different times of day)
export const MorningView = {
    name: 'Morning View (6AM-12PM)',
    args: {
        state: 'default',
        data: mockData,
        variant: 'desktop',
    },
};
export const EveningView = {
    name: 'Evening View (6PM-12AM)',
    args: {
        state: 'default',
        data: {
            ...mockData,
            nextEvent: {
                ...mockEvents[2],
                title: 'Evening Study Session',
                time: '7:00 PM'
            }
        },
        variant: 'desktop',
    },
};
// COMPREHENSIVE USER SCENARIOS
// Busy Day Scenario
export const BusyDaySchedule = {
    name: '🔥 Busy Day (8 Events)',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'morning-lecture',
                title: 'Advanced Algorithms',
                time: '15 minutes',
                type: 'academic',
                location: 'Computer Science Building 201',
                attendees: ['Prof. Martinez', '47 students'],
                metadata: {
                    professor: 'Prof. Martinez',
                    courseCRN: 'CS4820',
                    buildingCode: 'CSB'
                }
            },
            upcomingEvents: [
                {
                    id: 'lab',
                    title: 'Data Structures Lab',
                    time: '11:00 AM',
                    type: 'academic',
                    location: 'CS Lab Room 105',
                    attendees: ['TA Sarah', 'Lab partners']
                },
                {
                    id: 'lunch',
                    title: 'Study Group + Lunch',
                    time: '12:30 PM',
                    type: 'study',
                    location: 'CS Majors Space',
                    attendees: ['Alex', 'Jordan', 'Casey'],
                    metadata: {
                        spaceId: 'cs-majors',
                        rsvpStatus: 'yes'
                    }
                },
                {
                    id: 'office-hours',
                    title: 'Office Hours - Prof. Kim',
                    time: '2:00 PM',
                    type: 'academic',
                    location: 'Faculty Office',
                    attendees: ['Prof. Kim']
                },
                {
                    id: 'interview-prep',
                    title: 'Mock Interview Session',
                    time: '3:30 PM',
                    type: 'work',
                    location: 'Career Center',
                    attendees: ['Career Counselor']
                },
                {
                    id: 'gym',
                    title: 'Workout',
                    time: '5:00 PM',
                    type: 'personal',
                    location: 'Campus Gym',
                    attendees: ['Gym buddy']
                },
                {
                    id: 'dinner-social',
                    title: 'CS Club Dinner',
                    time: '6:30 PM',
                    type: 'social',
                    location: 'Student Union',
                    attendees: ['CS Club members']
                },
                {
                    id: 'study-night',
                    title: 'Final Project Work',
                    time: '8:00 PM',
                    type: 'study',
                    location: 'Library Study Room',
                    attendees: ['Project team']
                }
            ],
            todaysEvents: [], // Will be populated with all events
            connections: [
                {
                    id: 'google',
                    name: 'Google',
                    type: 'google',
                    status: 'connected',
                    lastSync: new Date(Date.now() - 1 * 60 * 1000),
                    color: 'var(--hive-status-info)'
                },
                {
                    id: 'university',
                    name: 'University',
                    type: 'university',
                    status: 'connected',
                    lastSync: new Date(Date.now() - 30 * 60 * 1000),
                    color: 'var(--hive-brand-secondary)'
                },
                {
                    id: 'outlook',
                    name: 'Outlook',
                    type: 'outlook',
                    status: 'syncing',
                    lastSync: new Date(Date.now() - 10 * 60 * 1000),
                    color: '#0078d4'
                }
            ],
            conflicts: []
        },
        variant: 'desktop',
    },
};
// Exam Week Scenario
export const ExamWeekSchedule = {
    name: '📚 Exam Week (High Stress)',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'final-exam',
                title: '🚨 FINAL EXAM - Calculus III',
                time: '30 minutes',
                type: 'academic',
                location: 'Math Building, Room 200',
                attendees: ['Prof. Thompson', 'Class'],
                metadata: {
                    examDuration: '3 hours',
                    isHighStakes: true,
                    professor: 'Prof. Thompson'
                }
            },
            upcomingEvents: [
                {
                    id: 'study-break',
                    title: '15-min Study Break',
                    time: '10:30 AM',
                    type: 'personal',
                    location: 'Quiet Study Area',
                    attendees: ['You']
                },
                {
                    id: 'physics-final',
                    title: '⚡ FINAL - Physics II',
                    time: '2:00 PM',
                    type: 'academic',
                    location: 'Science Auditorium',
                    attendees: ['Prof. Wilson', 'Class']
                },
                {
                    id: 'stress-relief',
                    title: 'Yoga/Meditation',
                    time: '6:00 PM',
                    type: 'personal',
                    location: 'Wellness Center',
                    attendees: ['Instructor']
                }
            ],
            todaysEvents: [],
            connections: mockConnections,
            conflicts: [
                {
                    id: 'study-overlap',
                    events: [
                        {
                            id: 'group-study',
                            title: 'Calc III Study Group',
                            time: '8:00 AM',
                            type: 'study',
                            location: 'Library',
                            attendees: ['Study partners']
                        },
                        {
                            id: 'final-exam',
                            title: '🚨 FINAL EXAM - Calculus III',
                            time: '9:00 AM',
                            type: 'academic',
                            location: 'Math Building',
                            attendees: ['Prof. Thompson']
                        }
                    ],
                    severity: 'major',
                    suggestion: 'End study group 30 minutes early for mental prep time',
                    canAutoResolve: false
                }
            ]
        },
        variant: 'desktop',
    },
};
// Social/Party Schedule
export const SocialWeekend = {
    name: '🎉 Social Weekend',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'pregame',
                title: 'Dorm Floor Pregame',
                time: '45 minutes',
                type: 'social',
                location: 'Johnson Hall - 3rd Floor',
                attendees: ['Floor mates', '12 people'],
                metadata: {
                    theme: 'Throwback Party',
                    dresscode: '2000s themed'
                }
            },
            upcomingEvents: [
                {
                    id: 'house-party',
                    title: 'Sigma Chi House Party',
                    time: '9:30 PM',
                    type: 'social',
                    location: 'Greek Row',
                    attendees: ['Everyone']
                },
                {
                    id: 'late-night-food',
                    title: 'Late Night Food Run',
                    time: '1:00 AM',
                    type: 'social',
                    location: '24hr Diner',
                    attendees: ['Squad']
                },
                {
                    id: 'recovery-brunch',
                    title: '🥞 Recovery Brunch',
                    time: 'Tomorrow 11:00 AM',
                    type: 'social',
                    location: 'Campus Cafe',
                    attendees: ['Survivors from last night']
                }
            ],
            todaysEvents: [],
            connections: mockConnections,
            conflicts: []
        },
        variant: 'desktop',
    },
};
// Multiple Calendar Conflicts
export const ConflictChaos = {
    name: '⚠️ Scheduling Conflicts (Multiple)',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'meeting1',
                title: 'Group Project Meeting',
                time: '20 minutes',
                type: 'academic',
                location: 'Library Study Room',
                attendees: ['Project Team']
            },
            upcomingEvents: [
                {
                    id: 'meeting2',
                    title: 'RA Floor Meeting (Required)',
                    time: '2:00 PM',
                    type: 'meeting',
                    location: 'Dorm Common Room',
                    attendees: ['RA', 'Floor residents']
                },
                {
                    id: 'interview',
                    title: 'Internship Interview',
                    time: '2:30 PM',
                    type: 'work',
                    location: 'Video Call',
                    attendees: ['HR Manager']
                }
            ],
            todaysEvents: [],
            connections: [
                {
                    id: 'google',
                    name: 'Google',
                    type: 'google',
                    status: 'error',
                    lastSync: new Date(Date.now() - 4 * 60 * 60 * 1000),
                    color: 'var(--hive-status-info)'
                },
                {
                    id: 'university',
                    name: 'University',
                    type: 'university',
                    status: 'connected',
                    lastSync: new Date(Date.now() - 15 * 60 * 1000),
                    color: 'var(--hive-brand-secondary)'
                }
            ],
            conflicts: [
                {
                    id: 'double-booking-1',
                    events: [
                        {
                            id: 'meeting2',
                            title: 'RA Floor Meeting (Required)',
                            time: '2:00 PM',
                            type: 'meeting',
                            location: 'Dorm Common Room',
                            attendees: ['RA']
                        },
                        {
                            id: 'interview',
                            title: 'Internship Interview',
                            time: '2:30 PM',
                            type: 'work',
                            location: 'Video Call',
                            attendees: ['HR Manager']
                        }
                    ],
                    severity: 'major',
                    suggestion: 'Ask RA to move meeting or reschedule interview',
                    canAutoResolve: false
                },
                {
                    id: 'travel-conflict',
                    events: [
                        {
                            id: 'class',
                            title: 'Biology Lecture',
                            time: '3:45 PM',
                            type: 'academic',
                            location: 'Science Building (15 min walk)',
                            attendees: ['Prof. Davis']
                        },
                        {
                            id: 'interview-end',
                            title: 'Interview Expected End',
                            time: '3:30 PM',
                            type: 'work',
                            location: 'Video Call',
                            attendees: []
                        }
                    ],
                    severity: 'minor',
                    suggestion: 'Interview may run long - inform professor of potential delay',
                    canAutoResolve: false
                }
            ]
        },
        variant: 'desktop',
    },
};
// Success/Achievement Day
export const AchievementDay = {
    name: '🏆 Achievement Day (Wins)',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'presentation',
                title: '🎯 Senior Capstone Presentation',
                time: '1 hour',
                type: 'milestone',
                location: 'Engineering Auditorium',
                attendees: ['Faculty Panel', 'Family', 'Friends'],
                metadata: {
                    isHighStakes: true,
                    duration: '20 minutes + Q&A'
                }
            },
            upcomingEvents: [
                {
                    id: 'celebration',
                    title: '🎉 Presentation Celebration',
                    time: '12:00 PM',
                    type: 'social',
                    location: 'Campus Restaurant',
                    attendees: ['Family', 'Close friends']
                },
                {
                    id: 'internship-offer',
                    title: '📞 Internship Offer Call',
                    time: '3:00 PM',
                    type: 'work',
                    location: 'Private Space',
                    attendees: ['Google Recruiter']
                },
                {
                    id: 'victory-party',
                    title: '🍾 Success Party',
                    time: '7:00 PM',
                    type: 'social',
                    location: 'Rooftop Party',
                    attendees: ['Squad', 'CS friends']
                }
            ],
            todaysEvents: [],
            connections: mockConnections,
            conflicts: []
        },
        variant: 'desktop',
    },
};
// International Student Schedule
export const InternationalStudentSchedule = {
    name: '🌍 International Student (Time Zone Challenges)',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'family-call',
                title: '📞 Family Call (Tokyo)',
                time: '30 minutes',
                type: 'personal',
                location: 'Dorm Room',
                attendees: ['Parents', 'Sister'],
                metadata: {
                    timezone: 'JST (16 hours ahead)',
                    duration: '1 hour'
                }
            },
            upcomingEvents: [
                {
                    id: 'esl-tutoring',
                    title: 'ESL Writing Tutoring',
                    time: '2:00 PM',
                    type: 'academic',
                    location: 'Writing Center',
                    attendees: ['Tutor Sarah']
                },
                {
                    id: 'cultural-event',
                    title: 'International Students Mixer',
                    time: '6:00 PM',
                    type: 'social',
                    location: 'International House',
                    attendees: ['International students']
                },
                {
                    id: 'late-night-study',
                    title: 'Late Night Study (Quiet Time)',
                    time: '10:00 PM',
                    type: 'study',
                    location: '24hr Study Room',
                    attendees: ['You']
                }
            ],
            todaysEvents: [],
            connections: mockConnections,
            conflicts: [
                {
                    id: 'timezone-confusion',
                    events: [
                        {
                            id: 'family-call',
                            title: 'Family Call (Planned for Tokyo morning)',
                            time: '7:00 AM PST',
                            type: 'personal',
                            location: 'Dorm',
                            attendees: ['Family']
                        },
                        {
                            id: 'early-class',
                            title: 'Morning Calculus',
                            time: '8:00 AM PST',
                            type: 'academic',
                            location: 'Math Building',
                            attendees: ['Prof. Johnson']
                        }
                    ],
                    severity: 'minor',
                    suggestion: 'Keep family call short or move to break time',
                    canAutoResolve: false
                }
            ]
        },
        variant: 'desktop',
    },
};
// Accessibility & Special Needs
export const AccessibilitySchedule = {
    name: '♿ Accessibility Features',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'accessible-exam',
                title: '📝 Extended Time Exam',
                time: '45 minutes',
                type: 'academic',
                location: 'Testing Center - Quiet Room',
                attendees: ['Proctor'],
                metadata: {
                    accommodations: 'Extended time (1.5x), Quiet room, Large print',
                    duration: '4.5 hours'
                }
            },
            upcomingEvents: [
                {
                    id: 'mobility-break',
                    title: '🚶 Movement Break',
                    time: '2:00 PM',
                    type: 'personal',
                    location: 'Accessible Outdoor Space',
                    attendees: ['You']
                },
                {
                    id: 'therapy',
                    title: 'Physical Therapy',
                    time: '4:00 PM',
                    type: 'personal',
                    location: 'Campus Health Center',
                    attendees: ['PT Sarah']
                },
                {
                    id: 'study-group-accessible',
                    title: 'Study Group (ASL Interpreter)',
                    time: '7:00 PM',
                    type: 'study',
                    location: 'Accessible Study Room',
                    attendees: ['Study group', 'Interpreter']
                }
            ],
            todaysEvents: [],
            connections: mockConnections,
            conflicts: []
        },
        variant: 'desktop',
    },
};
// EDGE CASES & ERROR SCENARIOS
// Calendar Sync Issues
export const SyncNightmare = {
    name: '💥 Calendar Sync Nightmare',
    args: {
        state: 'sync-failed',
        data: {
            nextEvent: undefined,
            upcomingEvents: [],
            todaysEvents: [
                // Cached/stale events from last successful sync
                {
                    id: 'stale-1',
                    title: 'POSSIBLY CANCELLED: CS Lecture',
                    time: '2 hours ago',
                    type: 'academic',
                    location: 'Unknown - Check manually',
                    attendees: ['Prof. ???']
                }
            ],
            connections: [
                {
                    id: 'google',
                    name: 'Google',
                    type: 'google',
                    status: 'error',
                    lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                    color: 'var(--hive-status-info)'
                },
                {
                    id: 'outlook',
                    name: 'Outlook',
                    type: 'outlook',
                    status: 'error',
                    lastSync: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                    color: '#0078d4'
                },
                {
                    id: 'university',
                    name: 'University',
                    type: 'university',
                    status: 'error',
                    lastSync: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                    color: 'var(--hive-brand-secondary)'
                }
            ],
            conflicts: []
        },
        variant: 'desktop',
    },
};
// Network Offline
export const OfflineMode = {
    name: '📶 Offline Mode (Cached Data)',
    args: {
        state: 'error',
        data: {
            nextEvent: {
                id: 'cached-event',
                title: '(OFFLINE) Biology Lab',
                time: '1 hour (approx)',
                type: 'academic',
                location: 'Science Building',
                attendees: ['Cached data']
            },
            upcomingEvents: [
                {
                    id: 'cached-2',
                    title: '(OFFLINE) Study Group',
                    time: '3:00 PM (cached)',
                    type: 'study',
                    location: 'Unknown',
                    attendees: ['Cached data']
                }
            ],
            todaysEvents: [],
            connections: [
                {
                    id: 'google',
                    name: 'Google',
                    type: 'google',
                    status: 'error',
                    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    color: 'var(--hive-status-info)'
                }
            ],
            conflicts: []
        },
        variant: 'desktop',
    },
};
// Performance Edge Cases
export const MassiveCalendar = {
    name: '📊 Performance Test (50+ Events)',
    args: {
        state: 'default',
        data: {
            nextEvent: {
                id: 'next-1',
                title: 'Immediate Next Event',
                time: '5 minutes',
                type: 'academic',
                location: 'Building A',
                attendees: ['Someone']
            },
            upcomingEvents: Array.from({ length: 50 }, (_, i) => ({
                id: `event-${i}`,
                title: `Generated Event ${i + 1}`,
                time: `${i + 1}:00 PM`,
                type: ['academic', 'social', 'study', 'work', 'personal'][i % 5],
                location: `Location ${i + 1}`,
                attendees: [`Person ${i + 1}`]
            })),
            todaysEvents: [],
            connections: mockConnections,
            conflicts: []
        },
        variant: 'desktop',
    },
};
//# sourceMappingURL=calendar-card.stories.js.map