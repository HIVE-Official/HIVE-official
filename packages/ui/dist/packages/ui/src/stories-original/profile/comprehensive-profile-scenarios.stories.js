import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProfileSystem } from '../../components/profile/profile-system';
const meta = {
    title: 'Profile/🎯 Comprehensive Scenarios',
    component: ProfileSystem,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Real-world profile scenarios covering all edge cases, user types, and interaction patterns. Each story represents a complete user journey with authentic data and behaviors.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
// REAL UNIVERSITY PERSONAS
// The Overachiever - Pre-Med Student
export const PreMedOverachiever = {
    name: '🩺 Pre-Med Overachiever (Sarah)',
    args: {
        user: {
            id: 'sarah-premed',
            fullName: 'Sarah Kim',
            handle: 'sarahk_premed',
            email: 'sarah.kim@berkeley.edu',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
            major: 'Molecular & Cell Biology + Psychology',
            graduationYear: 2025,
            school: 'UC Berkeley',
            isBuilder: true,
            isPublic: true,
            builderLevel: 'Advanced',
            memberSince: '2021-08-15',
            onlineStatus: 'online',
            timezone: 'PST',
            bio: 'Pre-med track | Research assistant in neuroscience lab | Building tools to help fellow pre-meds survive organic chemistry 🧪',
            interests: ['Medical Research', 'Neuroscience', 'MCAT Prep', 'Volunteering', 'Korean Culture'],
            gpa: 3.94,
            stats: {
                totalSpaces: 12,
                activeSpaces: 9,
                toolsCreated: 7,
                connectionsCount: 89,
                streakDays: 127,
                totalActivity: 2340,
                studyHoursThisWeek: 47,
                clinicalHours: 156,
                researchHours: 89
            },
            achievements: [
                '🏆 Dean\'s List (4 semesters)',
                '🔬 Research Publication Author',
                '📚 Organic Chemistry Tutor',
                '🩺 500+ Clinical Hours'
            ]
        },
        spaces: [
            {
                id: 'ochem',
                name: 'Organic Chemistry Hell',
                type: 'course',
                memberCount: 347,
                unreadCount: 23,
                lastActivity: '3 minutes ago',
                isPinned: true,
                recentPosts: [
                    {
                        id: 'ochem1',
                        author: 'Sarah K.',
                        content: '🧪 Just posted my synthesis reaction flowchart in the study guides section - hope it helps with tomorrow\'s exam!',
                        timestamp: '3 minutes ago',
                        type: 'study-resource',
                        reactions: 47,
                        replies: 12
                    },
                    {
                        id: 'ochem2',
                        author: 'Stressed Student',
                        content: 'Sarah you\'re literally saving my GPA 😭 Thank you for the practice problems!',
                        timestamp: '8 minutes ago',
                        type: 'appreciation',
                        reactions: 23
                    }
                ]
            },
            {
                id: 'neuro-lab',
                name: 'Neuroscience Research Lab',
                type: 'research',
                memberCount: 12,
                unreadCount: 5,
                lastActivity: '1 hour ago',
                recentPosts: [
                    {
                        id: 'lab1',
                        author: 'Dr. Martinez',
                        content: 'Lab meeting tomorrow at 9 AM - Sarah please present your Western blot results',
                        timestamp: '1 hour ago',
                        type: 'announcement'
                    }
                ]
            },
            {
                id: 'mcat-prep',
                name: 'MCAT Warriors 2025',
                type: 'study',
                memberCount: 234,
                unreadCount: 67,
                lastActivity: '30 minutes ago',
                recentPosts: [
                    {
                        id: 'mcat1',
                        author: 'MCAT Survivor',
                        content: 'Just got my scores back - 521! Sarah\'s physics review sessions were clutch 🙏',
                        timestamp: '30 minutes ago',
                        type: 'success-story',
                        reactions: 156
                    }
                ]
            },
            {
                id: 'korean-american',
                name: 'Korean American Students',
                type: 'cultural',
                memberCount: 78,
                unreadCount: 4,
                lastActivity: '2 hours ago'
            }
        ],
        events: [
            {
                id: 'ochem-exam',
                title: '🧪 Organic Chemistry Midterm',
                time: '2 hours',
                type: 'academic',
                location: 'Wheeler Auditorium',
                attendees: ['347 stressed students'],
                metadata: {
                    examWeight: '25% of final grade',
                    duration: '2 hours',
                    calculatorAllowed: false,
                    isHighStakes: true
                }
            },
            {
                id: 'lab-meeting',
                title: 'Research Lab Meeting',
                time: 'Tomorrow 9:00 AM',
                type: 'research',
                location: 'Life Sciences Building',
                attendees: ['Dr. Martinez', 'Lab team'],
                metadata: {
                    presentationRequired: true,
                    topic: 'Western blot analysis'
                }
            },
            {
                id: 'mcat-practice',
                title: 'MCAT Practice Test',
                time: 'Saturday 8:00 AM',
                type: 'study',
                location: 'Main Library',
                attendees: ['MCAT study group'],
                metadata: {
                    duration: '7 hours',
                    testNumber: 'AAMC FL3'
                }
            }
        ],
        connections: [
            {
                id: 'study-partner',
                type: 'academic_overlap',
                message: '12 people in your O-Chem class also take your research seminar',
                people: ['Alex Chen', 'Maria Rodriguez', 'David Park', '+9 others'],
                action: 'Form study groups'
            },
            {
                id: 'research-network',
                type: 'research_collaboration',
                message: 'Your synthesis flowchart is being used by 89 pre-med students',
                people: ['Pre-med students'],
                action: 'View impact analytics'
            },
            {
                id: 'cultural-connection',
                type: 'cultural_overlap',
                message: '6 Korean-American students are also pre-med track',
                people: ['Jenny Kim', 'Chris Lee', '+4 others'],
                action: 'Connect for mentorship'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: ['MCAT Timer', 'GPA Calculator', 'Study Schedule Optimizer', 'Flashcard Generator'],
            createdTools: [
                'O-Chem Reaction Predictor',
                'MCAT Score Tracker',
                'Research Log Manager',
                'Clinical Hours Counter',
                'Medical School Application Timeline',
                'Lab Protocol Generator',
                'Anki Card Automation'
            ],
            comingSoon: ['Medical School Interview Prep', 'Research Paper Citation Tool']
        },
        studyMode: {
            isActive: true,
            focusSubject: 'Organic Chemistry',
            pomodoroCount: 6,
            studyStreak: 12,
            targetHours: 8,
            completedHours: 5.5
        }
    }
};
// The Tech Bro - CS Startup Founder
export const TechStartupFounder = {
    name: '💻 Tech Startup Founder (Marcus)',
    args: {
        user: {
            id: 'marcus-founder',
            fullName: 'Marcus Chen-Williams',
            handle: 'marcusbuilds',
            email: 'marcus.chen.williams@stanford.edu',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            major: 'Computer Science + Management Science',
            graduationYear: 2024,
            school: 'Stanford University',
            isBuilder: true,
            isPublic: true,
            builderLevel: 'Expert',
            memberSince: '2020-09-01',
            onlineStatus: 'online',
            timezone: 'PST',
            bio: 'Founder & CEO @StudyFlow (YC W24) | Forbes 30u30 | Building the future of student productivity | Always recruiting talent 🚀',
            interests: ['Startups', 'Product Design', 'Venture Capital', 'Y Combinator', 'Basketball'],
            startupStatus: 'Recently raised Series A ($12M)',
            stats: {
                totalSpaces: 34,
                activeSpaces: 18,
                toolsCreated: 23,
                connectionsCount: 456,
                streakDays: 89,
                totalActivity: 5670,
                startupMetrics: {
                    revenue: '$50K MRR',
                    users: '12K students',
                    teamSize: 8
                }
            },
            achievements: [
                '🚀 Y Combinator W24',
                '💰 Series A: $12M raised',
                '📰 Forbes 30 Under 30',
                '🏆 Stanford Entrepreneur of the Year'
            ]
        },
        spaces: [
            {
                id: 'yc-batch',
                name: 'Y Combinator W24',
                type: 'startup',
                memberCount: 89,
                unreadCount: 34,
                lastActivity: '5 minutes ago',
                isPinned: true,
                recentPosts: [
                    {
                        id: 'yc1',
                        author: 'Marcus C-W',
                        content: '🎉 Just closed our Series A! $12M to scale StudyFlow. Thanks to the YC family for the support!',
                        timestamp: '5 minutes ago',
                        type: 'milestone',
                        reactions: 234,
                        replies: 67
                    },
                    {
                        id: 'yc2',
                        author: 'Batch Mate',
                        content: 'Congrats Marcus! 🔥 Your growth trajectory is insane - 50% MoM for 8 months straight',
                        timestamp: '12 minutes ago',
                        type: 'congratulations'
                    }
                ]
            },
            {
                id: 'stanford-cs',
                name: 'Stanford CS',
                type: 'academic',
                memberCount: 1234,
                unreadCount: 89,
                lastActivity: '20 minutes ago',
                recentPosts: [
                    {
                        id: 'cs1',
                        author: 'Recruiting Team',
                        content: 'Marcus (StudyFlow) is looking for Stanford CS seniors - full-time SWE roles, competitive equity',
                        timestamp: '20 minutes ago',
                        type: 'job-posting',
                        reactions: 45,
                        replies: 23
                    }
                ]
            },
            {
                id: 'founders-circle',
                name: 'Stanford Founders Circle',
                type: 'networking',
                memberCount: 156,
                unreadCount: 12,
                lastActivity: '1 hour ago'
            },
            {
                id: 'basketball',
                name: 'Intramural Basketball',
                type: 'recreation',
                memberCount: 23,
                unreadCount: 3,
                lastActivity: '3 hours ago'
            }
        ],
        events: [
            {
                id: 'board-meeting',
                title: '💼 Board Meeting',
                time: '1 hour',
                type: 'work',
                location: 'Sand Hill Road (Zoom backup)',
                attendees: ['Board members', 'Leadership team'],
                metadata: {
                    agenda: 'Series A update, Q4 metrics, hiring plan',
                    duration: '2 hours',
                    isHighStakes: true
                }
            },
            {
                id: 'recruiting-call',
                title: '🎯 Senior Engineer Interview',
                time: '3:00 PM',
                type: 'work',
                location: 'StudyFlow Office',
                attendees: ['Engineering candidate'],
                metadata: {
                    role: 'Senior Full-Stack Engineer',
                    candidateSchool: 'MIT'
                }
            },
            {
                id: 'demo-day-prep',
                title: '📊 Demo Day Rehearsal',
                time: '5:00 PM',
                type: 'work',
                location: 'YC Office',
                attendees: ['YC Partners', 'Batch'],
                metadata: {
                    pitchLength: '2 minutes',
                    audienceSize: '400+ investors'
                }
            },
            {
                id: 'basketball-game',
                title: '🏀 Championship Game',
                time: 'Tomorrow 6:00 PM',
                type: 'recreation',
                location: 'Stanford Rec Center',
                attendees: ['Team', 'Supporters']
            }
        ],
        connections: [
            {
                id: 'stanford-talent',
                type: 'talent_pipeline',
                message: '47 Stanford CS students are interested in startup opportunities',
                people: ['Top CS students'],
                action: 'Schedule recruiting calls'
            },
            {
                id: 'founder-network',
                type: 'founder_connections',
                message: '8 YC founders want to do integrations with StudyFlow',
                people: ['YC founder network'],
                action: 'Explore partnerships'
            },
            {
                id: 'investor-network',
                type: 'investor_interest',
                message: '12 VCs from Demo Day want to follow up',
                people: ['Tier 1 VCs'],
                action: 'Schedule investor meetings'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: ['Pitch Deck Generator', 'Fundraising Tracker', 'Team Management', 'Metrics Dashboard'],
            createdTools: [
                'StudyFlow Core Platform',
                'YC Application Assistant',
                'Investor CRM',
                'Startup Metrics Tracker',
                'Team Hiring Pipeline',
                'Demo Day Timer',
                'Board Report Generator'
            ],
            comingSoon: ['AI Pitch Coach', 'Venture Capital Database']
        },
        startupMode: {
            isActive: true,
            company: 'StudyFlow',
            stage: 'Series A',
            teamSize: 8,
            monthlyRecurringRevenue: '$50,000',
            burnRate: '$45,000',
            runway: '18 months'
        }
    }
};
// The Struggling Student - Community College Transfer
export const CommunityCollegeTransfer = {
    name: '📚 Community College Transfer (Alex)',
    args: {
        user: {
            id: 'alex-transfer',
            fullName: 'Alex Rivera',
            handle: 'alexr_transfer',
            email: 'alex.rivera@state.edu',
            avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
            major: 'Computer Science',
            graduationYear: 2026,
            school: 'State University',
            isBuilder: false,
            isPublic: false,
            memberSince: '2024-01-15',
            onlineStatus: 'online',
            timezone: 'PST',
            bio: 'CC transfer student | First-gen college | Working part-time while studying CS | Taking it one day at a time 🌱',
            interests: ['Programming', 'Financial Literacy', 'Community College Advocacy', 'Video Games'],
            financialAid: {
                pellGrant: true,
                workStudy: true,
                scholarships: ['Transfer Student Success Grant']
            },
            stats: {
                totalSpaces: 4,
                activeSpaces: 3,
                toolsCreated: 0,
                connectionsCount: 12,
                streakDays: 8,
                totalActivity: 134,
                gpa: 3.2,
                creditHours: 15,
                workHoursPerWeek: 20
            }
        },
        spaces: [
            {
                id: 'cs-101',
                name: 'Intro to Programming',
                type: 'course',
                memberCount: 234,
                unreadCount: 8,
                lastActivity: '45 minutes ago',
                recentPosts: [
                    {
                        id: 'cs101-1',
                        author: 'Professor Johnson',
                        content: 'Programming assignment 3 is due Friday. Office hours extended this week.',
                        timestamp: '45 minutes ago',
                        type: 'announcement'
                    },
                    {
                        id: 'cs101-2',
                        author: 'Study Buddy',
                        content: 'Anyone want to work through the debugging lab together? I\'m stuck on the loop logic',
                        timestamp: '2 hours ago',
                        type: 'study-request',
                        replies: 7
                    }
                ]
            },
            {
                id: 'transfer-students',
                name: 'Transfer Student Support',
                type: 'support',
                memberCount: 89,
                unreadCount: 3,
                lastActivity: '1 hour ago',
                recentPosts: [
                    {
                        id: 'transfer-1',
                        author: 'Advisor Sarah',
                        content: 'Reminder: Transfer student orientation next week. Free lunch and course planning help!',
                        timestamp: '1 hour ago',
                        type: 'announcement'
                    }
                ]
            },
            {
                id: 'work-study',
                name: 'Work Study Students',
                type: 'employment',
                memberCount: 156,
                unreadCount: 2,
                lastActivity: '3 hours ago',
                recentPosts: [
                    {
                        id: 'work-1',
                        author: 'Campus Employment',
                        content: 'New work-study position: IT Help Desk. Flexible hours, great for CS students!',
                        timestamp: '3 hours ago',
                        type: 'job-posting',
                        reactions: 23
                    }
                ]
            }
        ],
        events: [
            {
                id: 'work-shift',
                title: '💼 Campus Library Shift',
                time: '30 minutes',
                type: 'work',
                location: 'Main Library Front Desk',
                attendees: ['Supervisor Jennifer'],
                metadata: {
                    hoursPerWeek: 15,
                    hourlyWage: '$12.50',
                    isWorkStudy: true
                }
            },
            {
                id: 'cs-lecture',
                title: 'Programming Fundamentals',
                time: '2:00 PM',
                type: 'academic',
                location: 'Engineering Building 102',
                attendees: ['Prof. Johnson', 'Class'],
                metadata: {
                    assignment: 'Debug Lab due Friday'
                }
            },
            {
                id: 'tutoring',
                title: 'Free Math Tutoring',
                time: '4:00 PM',
                type: 'academic',
                location: 'Academic Success Center',
                attendees: ['Math tutor'],
                metadata: {
                    subject: 'Calculus I',
                    isFree: true
                }
            },
            {
                id: 'dinner-work',
                title: 'Dinner Break (15 min)',
                time: '6:00 PM',
                type: 'personal',
                location: 'Campus Food Bank',
                attendees: ['You'],
                metadata: {
                    budgetFriendly: true
                }
            }
        ],
        connections: [
            {
                id: 'transfer-support',
                type: 'peer_support',
                message: '8 other transfer students are in your CS program',
                people: ['Fellow transfer students'],
                action: 'Join study group'
            },
            {
                id: 'work-study-network',
                type: 'work_connections',
                message: '12 work-study students also work on campus',
                people: ['Work-study peers'],
                action: 'Share job opportunities'
            },
            {
                id: 'first-gen-support',
                type: 'background_similarity',
                message: '23 first-generation students are in similar situations',
                people: ['First-gen student network'],
                action: 'Connect for support'
            }
        ],
        hiveLab: {
            isLocked: true,
            availableTools: ['Study Timer', 'GPA Calculator'],
            createdTools: [],
            comingSoon: ['Financial Aid Calculator', 'Course Planning Assistant'],
            unlockRequirements: 'Complete first semester or join 2 more study spaces'
        },
        financialStress: {
            isActive: true,
            workStudyBalance: 'high',
            scholarshipDeadlines: 2,
            budgetConcerns: true
        },
        academicSupport: {
            hasTutor: true,
            usingWritingCenter: true,
            attendingStudyGroups: true,
            advisorMeetings: 'bi-weekly'
        }
    }
};
// The Social Butterfly - Greek Life President
export const GreekLifePresident = {
    name: '🏛️ Greek Life President (Madison)',
    args: {
        user: {
            id: 'madison-greek',
            fullName: 'Madison Taylor',
            handle: 'madisont_dg',
            email: 'madison.taylor@vanderbilt.edu',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            major: 'Communications + Business',
            graduationYear: 2025,
            school: 'Vanderbilt University',
            isBuilder: false,
            isPublic: true,
            memberSince: '2021-08-20',
            onlineStatus: 'online',
            timezone: 'CST',
            bio: 'Delta Gamma President | Homecoming Chair | Southern belle with big dreams | Always down for brunch and planning events 💕',
            interests: ['Event Planning', 'Public Relations', 'Southern Culture', 'Fashion', 'Networking'],
            greekLife: {
                organization: 'Delta Gamma',
                position: 'Chapter President',
                yearJoined: 2022,
                leadership: ['President (2024)', 'Vice President (2023)', 'Social Chair (2022)']
            },
            stats: {
                totalSpaces: 18,
                activeSpaces: 12,
                toolsCreated: 2,
                connectionsCount: 234,
                streakDays: 45,
                totalActivity: 1890,
                eventsPlanned: 23,
                fundraisingTotal: '$45000'
            }
        },
        spaces: [
            {
                id: 'delta-gamma',
                name: 'Delta Gamma - Vanderbilt',
                type: 'organization',
                memberCount: 156,
                unreadCount: 47,
                lastActivity: '2 minutes ago',
                isPinned: true,
                recentPosts: [
                    {
                        id: 'dg-1',
                        author: 'Madison T.',
                        content: '🌟 Chapter meeting tonight at 7 PM! We\'re finalizing Homecoming plans and announcing Big/Little reveals!',
                        timestamp: '2 minutes ago',
                        type: 'announcement',
                        reactions: 89,
                        replies: 34,
                        isPinned: true
                    },
                    {
                        id: 'dg-2',
                        author: 'Social Chair Emma',
                        content: 'Formal dress shopping this weekend! Who\'s in for Hillsboro Village? 💃',
                        timestamp: '20 minutes ago',
                        type: 'social-planning',
                        reactions: 67,
                        replies: 28
                    }
                ]
            },
            {
                id: 'panhellenic',
                name: 'Panhellenic Council',
                type: 'greek-life',
                memberCount: 12,
                unreadCount: 8,
                lastActivity: '15 minutes ago',
                recentPosts: [
                    {
                        id: 'pan-1',
                        author: 'Madison T.',
                        content: '📊 Homecoming fundraising update: We\'re at $67K towards our $75K goal! Let\'s push through the final week!',
                        timestamp: '15 minutes ago',
                        type: 'fundraising-update',
                        reactions: 45
                    }
                ]
            },
            {
                id: 'homecoming-committee',
                name: 'Homecoming Planning',
                type: 'event-planning',
                memberCount: 34,
                unreadCount: 23,
                lastActivity: '8 minutes ago',
                recentPosts: [
                    {
                        id: 'hc-1',
                        author: 'Venue Coordinator',
                        content: 'Music City Center confirmed for Saturday night! Need final headcount by tomorrow.',
                        timestamp: '8 minutes ago',
                        type: 'logistics',
                        reactions: 23
                    }
                ]
            },
            {
                id: 'business-communications',
                name: 'Business Communications',
                type: 'course',
                memberCount: 89,
                unreadCount: 4,
                lastActivity: '1 hour ago'
            }
        ],
        events: [
            {
                id: 'chapter-meeting',
                title: '🌟 DG Chapter Meeting',
                time: '45 minutes',
                type: 'meeting',
                location: 'Delta Gamma House',
                attendees: ['Active members (156)'],
                metadata: {
                    agenda: 'Homecoming updates, Big/Little reveals, formal planning',
                    duration: '90 minutes',
                    isRequired: true
                }
            },
            {
                id: 'homecoming-venue-visit',
                title: '🏛️ Final Venue Walkthrough',
                time: '10:00 AM Tomorrow',
                type: 'event-planning',
                location: 'Music City Center',
                attendees: ['Event planning committee'],
                metadata: {
                    purpose: 'Final logistics check',
                    isLeadershipRequired: true
                }
            },
            {
                id: 'brunch-fundraiser',
                title: '🥂 Brunch Fundraiser',
                time: 'Sunday 11:00 AM',
                type: 'social',
                location: 'The Gulch',
                attendees: ['Alumni', 'Parents', 'Active members'],
                metadata: {
                    fundraisingGoal: '$8000',
                    expectedAttendees: 120
                }
            },
            {
                id: 'formal-planning',
                title: '👗 Formal Planning Session',
                time: 'Monday 6:00 PM',
                type: 'meeting',
                location: 'Delta Gamma House',
                attendees: ['Social committee']
            }
        ],
        connections: [
            {
                id: 'greek-leaders',
                type: 'leadership_network',
                message: '11 other chapter presidents want to collaborate on joint events',
                people: ['Greek life presidents'],
                action: 'Plan inter-greek mixer'
            },
            {
                id: 'alumni-network',
                type: 'alumni_connections',
                message: '45 Delta Gamma alumni are in Nashville and want to mentor',
                people: ['DG alumni in Nashville'],
                action: 'Organize mentorship program'
            },
            {
                id: 'event-vendors',
                type: 'professional_network',
                message: '8 Nashville event vendors want to partner for future events',
                people: ['Nashville event industry'],
                action: 'Build vendor relationships'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: ['Event Planner', 'Fundraising Tracker', 'RSVP Manager', 'Budget Calculator'],
            createdTools: [
                'Greek Life Event Coordinator',
                'Chapter Communication Hub'
            ],
            comingSoon: ['Alumni Database', 'Recruitment Management System']
        },
        eventManagement: {
            isActive: true,
            upcomingEvents: 7,
            totalBudget: '$75000',
            vendorRelationships: 12,
            attendeeCapacity: 450
        }
    }
};
// The Graduate Student - PhD Researcher
export const PhDResearcher = {
    name: '🎓 PhD Researcher (Dr. James)',
    args: {
        user: {
            id: 'james-phd',
            fullName: 'James Okonkwo',
            handle: 'jamesokonkwo_phd',
            email: 'james.okonkwo@mit.edu',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            major: 'Computer Science - AI/ML Track',
            graduationYear: 2025,
            school: 'MIT',
            isBuilder: true,
            isPublic: true,
            builderLevel: 'Expert',
            memberSince: '2019-09-01',
            onlineStatus: 'online',
            timezone: 'EST',
            bio: 'PhD Candidate in AI/ML | Research focus: Federated Learning | Teaching fellow | Nigerian-American building bridges between tech and academia 🧠',
            interests: ['Machine Learning', 'Research', 'Teaching', 'African Tech', 'Basketball'],
            academicStatus: {
                year: 'PhD Year 6',
                advisor: 'Prof. Regina Barzilay',
                dissertationStatus: 'Writing Phase',
                expectedDefense: 'Spring 2025'
            },
            stats: {
                totalSpaces: 15,
                activeSpaces: 8,
                toolsCreated: 11,
                connectionsCount: 167,
                streakDays: 234,
                totalActivity: 3456,
                publicationsCount: 8,
                citationCount: 342,
                teachingHours: 120
            },
            achievements: [
                '📜 8 Publications (3 first-author)',
                '🏆 Best Paper Award - NeurIPS 2023',
                '👨‍🏫 Outstanding Teaching Fellow',
                '🎯 NSF Graduate Research Fellowship'
            ]
        },
        spaces: [
            {
                id: 'mit-csail',
                name: 'MIT CSAIL',
                type: 'research',
                memberCount: 234,
                unreadCount: 12,
                lastActivity: '20 minutes ago',
                isPinned: true,
                recentPosts: [
                    {
                        id: 'csail-1',
                        author: 'James O.',
                        content: '📊 Just submitted our federated learning paper to ICLR 2025! Exciting results on privacy-preserving distributed training.',
                        timestamp: '20 minutes ago',
                        type: 'research-update',
                        reactions: 67,
                        replies: 23
                    },
                    {
                        id: 'csail-2',
                        author: 'Lab Mate Sarah',
                        content: 'James your paper submission gives me hope for my own work! Any advice on handling reviewer feedback?',
                        timestamp: '45 minutes ago',
                        type: 'mentorship-request'
                    }
                ]
            },
            {
                id: 'federated-learning',
                name: 'Federated Learning Research Group',
                type: 'research',
                memberCount: 23,
                unreadCount: 5,
                lastActivity: '1 hour ago',
                recentPosts: [
                    {
                        id: 'fl-1',
                        author: 'Prof. Barzilay',
                        content: 'James excellent progress on the differential privacy extensions. Let\'s discuss industry applications.',
                        timestamp: '1 hour ago',
                        type: 'advisor-feedback'
                    }
                ]
            },
            {
                id: 'teaching-fellows',
                name: 'MIT Teaching Fellows',
                type: 'teaching',
                memberCount: 45,
                unreadCount: 8,
                lastActivity: '30 minutes ago',
                recentPosts: [
                    {
                        id: 'tf-1',
                        author: 'James O.',
                        content: 'Office hours update: Added Saturday sessions for 6.034 students struggling with search algorithms. Room 32-271.',
                        timestamp: '30 minutes ago',
                        type: 'teaching-update',
                        reactions: 34
                    }
                ]
            },
            {
                id: 'african-scholars',
                name: 'African Scholars at MIT',
                type: 'cultural',
                memberCount: 67,
                unreadCount: 4,
                lastActivity: '2 hours ago'
            }
        ],
        events: [
            {
                id: 'dissertation-defense',
                title: '🎯 Dissertation Defense',
                time: '3 months',
                type: 'milestone',
                location: 'MIT Room 32-G449',
                attendees: ['Defense committee', 'Lab mates', 'Family'],
                metadata: {
                    dissertationTitle: 'Privacy-Preserving Federated Learning in Heterogeneous Environments',
                    committee: ['Prof. Barzilay', 'Prof. Rus', 'Prof. Song'],
                    duration: '60 minutes presentation + 30 minutes Q&A',
                    isHighStakes: true
                }
            },
            {
                id: 'iclr-submission',
                title: '📝 ICLR Paper Revision Due',
                time: '2 days',
                type: 'research',
                location: 'CSAIL Office',
                attendees: ['Co-authors'],
                metadata: {
                    paperTitle: 'Differential Privacy in Cross-Device Federated Learning',
                    revisionRound: 2,
                    reviewerComments: 'Minor revisions requested'
                }
            },
            {
                id: 'teaching-class',
                title: '👨‍🏫 6.034 AI Class',
                time: 'Tomorrow 10:00 AM',
                type: 'teaching',
                location: 'MIT Lecture Hall 26-100',
                attendees: ['150 undergraduates'],
                metadata: {
                    topic: 'Neural Networks and Backpropagation',
                    duration: '90 minutes'
                }
            },
            {
                id: 'lab-meeting',
                title: '🔬 Weekly Lab Meeting',
                time: 'Friday 2:00 PM',
                type: 'research',
                location: 'CSAIL Conference Room',
                attendees: ['Research group'],
                metadata: {
                    presentationSlot: 'James - 15 minutes on latest results'
                }
            }
        ],
        connections: [
            {
                id: 'research-network',
                type: 'research_collaboration',
                message: '12 researchers worldwide are citing your federated learning work',
                people: ['Global AI researchers'],
                action: 'Explore collaborations'
            },
            {
                id: 'industry-interest',
                type: 'industry_outreach',
                message: '6 tech companies want to discuss your research for potential partnerships',
                people: ['Google, Microsoft, Apple, etc.'],
                action: 'Schedule industry talks'
            },
            {
                id: 'mentorship-requests',
                type: 'mentorship_opportunities',
                message: '23 undergraduates and masters students want research mentorship',
                people: ['MIT students'],
                action: 'Set up mentorship program'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: ['Research Paper Manager', 'Citation Tracker', 'Teaching Assistant', 'Conference Deadline Tracker'],
            createdTools: [
                'Federated Learning Simulator',
                'Privacy Budget Calculator',
                'Academic Writing Assistant',
                'Research Timeline Planner',
                'Teaching Material Generator',
                'Conference Submission Tracker',
                'Collaboration Network Mapper'
            ],
            comingSoon: ['Academic Job Market Helper', 'Industry Transition Planner']
        },
        researchMode: {
            isActive: true,
            currentPaper: 'ICLR 2025 Submission',
            experimentsRunning: 3,
            deadlinesPending: 5,
            collaboratorCount: 8
        },
        teachingMode: {
            isActive: true,
            coursesTeaching: ['6.034 Artificial Intelligence'],
            studentsCount: 150,
            officeHoursPerWeek: 6,
            gradingPending: 23
        }
    }
};
// COMPARISON STORY - Multiple Students Side by Side
export const StudentComparison = {
    name: '📊 Student Comparison (All Types)',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A side-by-side comparison of different student profiles to understand how the same components serve different user needs.',
            },
        },
    },
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-8 p-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Pre-Med Overachiever" }), _jsx(ProfileSystem, { ...PreMedOverachiever.args })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Community College Transfer" }), _jsx(ProfileSystem, { ...CommunityCollegeTransfer.args })] })] }))
};
//# sourceMappingURL=comprehensive-profile-scenarios.stories.js.map