import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveBadge, FreshmanBadge, ToolLegendBadge, GrindModeBadge, DeansListBadge, AllNighterBadge, TAApprovedBadge, CampusLegendBadge, FinalsWeekBadge } from '../../components/hive-badge';
import { Star, Crown, Zap, Trophy, Users, Clock, CheckCircle, AlertCircle, GraduationCap, BookOpen, Coffee, Code } from 'lucide-react';
const meta = {
    title: '04-HIVE/Badge',
    component: HiveBadge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'HIVE Badge system with campus-specific variants for student life, achievements, and academic status. Features luxury dark styling with heavy radius and semantic colors.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'freshman', 'sophomore', 'junior', 'senior', 'grad', 'phd',
                'tool-newbie', 'tool-builder', 'tool-expert', 'tool-legend',
                'night-owl', 'early-bird', 'grind-mode', 'study-streak',
                'solo-grinder', 'study-buddy', 'group-leader', 'mentor',
                'in-lab', 'office-hours', 'cramming', 'building-tools', 'debugging', 'finals-week',
                'deans-list', 'honors', 'perfect-gpa', 'thesis-defense', 'internship', 'published',
                'midterm-szn', 'exam-prep', 'project-due', 'all-nighter', 'office-hours-hero',
                'ta-approved', 'prof-favorite', 'study-group-mvp', 'tools-guru', 'campus-legend',
                'course-tag', 'major-tag', 'skill-tag', 'tool-tag', 'active-tag'
            ]
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'default', 'lg', 'xl'],
        },
        shape: {
            control: 'select',
            options: ['pill', 'rounded', 'square', 'sharp']
        }
    },
};
export default meta;
export const Default = {
    args: {
        variant: 'course-tag',
        children: 'CS 101',
    },
};
export const AcademicYear = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs(HiveBadge, { variant: "freshman", children: [_jsx(GraduationCap, { className: "w-3 h-3 mr-1" }), "Freshman"] }), _jsx(HiveBadge, { variant: "sophomore", children: "Sophomore" }), _jsx(HiveBadge, { variant: "junior", children: "Junior" }), _jsxs(HiveBadge, { variant: "senior", children: [_jsx(Crown, { className: "w-3 h-3 mr-1" }), "Senior"] }), _jsxs(HiveBadge, { variant: "grad", children: [_jsx(BookOpen, { className: "w-3 h-3 mr-1" }), "Graduate"] }), _jsxs(HiveBadge, { variant: "phd", children: [_jsx(Star, { className: "w-3 h-3 mr-1" }), "PhD"] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Academic year badges with progressive luxury styling from freshman to PhD'
            }
        }
    }
};
export const ToolMastery = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs(HiveBadge, { variant: "tool-newbie", children: [_jsx(Code, { className: "w-3 h-3 mr-1" }), "Tool Newbie"] }), _jsx(HiveBadge, { variant: "tool-builder", children: "Tool Builder" }), _jsx(HiveBadge, { variant: "tool-expert", children: "Tool Expert" }), _jsxs(HiveBadge, { variant: "tool-legend", children: [_jsx(Zap, { className: "w-3 h-3 mr-1" }), "Tool Legend"] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Tool building mastery progression with increasing gold accent'
            }
        }
    }
};
export const StudyPatterns = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs(HiveBadge, { variant: "night-owl", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), "Night Owl"] }), _jsxs(HiveBadge, { variant: "early-bird", children: [_jsx(Coffee, { className: "w-3 h-3 mr-1" }), "Early Bird"] }), _jsxs(HiveBadge, { variant: "grind-mode", children: [_jsx(Zap, { className: "w-3 h-3 mr-1" }), "Grind Mode"] }), _jsxs(HiveBadge, { variant: "study-streak", children: [_jsx(Trophy, { className: "w-3 h-3 mr-1" }), "Study Streak"] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Study pattern badges reflecting different learning styles and habits'
            }
        }
    }
};
export const Achievements = {
    render: () => (_jsxs("div", { className: "space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Academic Achievements" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(HiveBadge, { variant: "deans-list", children: [_jsx(Trophy, { className: "w-3 h-3 mr-1" }), "Dean's List"] }), _jsxs(HiveBadge, { variant: "honors", children: [_jsx(Star, { className: "w-3 h-3 mr-1" }), "Honors"] }), _jsxs(HiveBadge, { variant: "perfect-gpa", children: [_jsx(Crown, { className: "w-3 h-3 mr-1" }), "Perfect GPA"] }), _jsx(HiveBadge, { variant: "thesis-defense", children: "Thesis Defense" }), _jsx(HiveBadge, { variant: "published", children: "Published" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Elite Status" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(HiveBadge, { variant: "ta-approved", children: [_jsx(CheckCircle, { className: "w-3 h-3 mr-1" }), "TA Approved"] }), _jsxs(HiveBadge, { variant: "prof-favorite", children: [_jsx(Star, { className: "w-3 h-3 mr-1" }), "Prof Favorite"] }), _jsxs(HiveBadge, { variant: "tools-guru", children: [_jsx(Code, { className: "w-3 h-3 mr-1" }), "Tools Guru"] }), _jsxs(HiveBadge, { variant: "campus-legend", children: [_jsx(Crown, { className: "w-3 h-3 mr-1" }), "Campus Legend"] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Achievement badges with luxury gold styling for academic and social recognition'
            }
        }
    }
};
export const CampusLife = {
    render: () => (_jsxs("div", { className: "space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Current Activity" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(HiveBadge, { variant: "in-lab", children: [_jsx(Code, { className: "w-3 h-3 mr-1" }), "In Lab"] }), _jsx(HiveBadge, { variant: "office-hours", children: "Office Hours" }), _jsxs(HiveBadge, { variant: "cramming", children: [_jsx(BookOpen, { className: "w-3 h-3 mr-1" }), "Cramming"] }), _jsxs(HiveBadge, { variant: "building-tools", children: [_jsx(Zap, { className: "w-3 h-3 mr-1" }), "Building Tools"] }), _jsx(HiveBadge, { variant: "debugging", children: "Debugging" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Urgent States" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(HiveBadge, { variant: "finals-week", children: [_jsx(AlertCircle, { className: "w-3 h-3 mr-1" }), "Finals Week"] }), _jsx(HiveBadge, { variant: "midterm-szn", children: "Midterm Season" }), _jsxs(HiveBadge, { variant: "project-due", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), "Project Due"] }), _jsx(HiveBadge, { variant: "all-nighter", children: "All-Nighter" }), _jsxs(HiveBadge, { variant: "office-hours-hero", children: [_jsx(Trophy, { className: "w-3 h-3 mr-1" }), "Office Hours Hero"] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Campus life activity badges reflecting real student experiences and study states'
            }
        }
    }
};
export const PreBuiltComponents = {
    render: () => (_jsxs("div", { className: "space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Pre-built Badge Components" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Ready-to-use badges for common campus scenarios" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Academic Year" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(FreshmanBadge, {}), _jsx(DeansListBadge, {}), _jsx(CampusLegendBadge, {})] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Study Modes" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(GrindModeBadge, {}), _jsx(AllNighterBadge, {}), _jsx(FinalsWeekBadge, {})] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Recognition" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(ToolLegendBadge, { count: 12 }), _jsx(TAApprovedBadge, {})] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Pre-built badge components for quick implementation of common campus scenarios'
            }
        }
    }
};
export const SizesAndShapes = {
    render: () => (_jsxs("div", { className: "space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Badge Sizes" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveBadge, { variant: "deans-list", size: "xs", children: "XS" }), _jsx(HiveBadge, { variant: "deans-list", size: "sm", children: "Small" }), _jsx(HiveBadge, { variant: "deans-list", size: "default", children: "Default" }), _jsx(HiveBadge, { variant: "deans-list", size: "lg", children: "Large" }), _jsx(HiveBadge, { variant: "deans-list", size: "xl", children: "Extra Large" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Badge Shapes" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveBadge, { variant: "tool-legend", shape: "pill", children: "Pill Shape" }), _jsx(HiveBadge, { variant: "tool-legend", shape: "rounded", children: "Rounded" }), _jsx(HiveBadge, { variant: "tool-legend", shape: "square", children: "Square" }), _jsx(HiveBadge, { variant: "tool-legend", shape: "sharp", children: "Sharp" })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Size and shape variants for different design contexts'
            }
        }
    }
};
export const CampusProfileDemo = {
    render: () => (_jsxs("div", { className: "max-w-md mx-auto p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center", children: _jsx(Users, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Sarah Chen" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Computer Science \u2022 Class of 2025" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-2", children: "Academic Status" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(HiveBadge, { variant: "senior", children: "Senior" }), _jsx(HiveBadge, { variant: "deans-list", children: "Dean's List" }), _jsx(HiveBadge, { variant: "ta-approved", children: "TA Approved" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-2", children: "Tool Building" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(HiveBadge, { variant: "tool-legend", children: "Tool Legend" }), _jsx(HiveBadge, { variant: "building-tools", children: "Building Tools" }), _jsx(HiveBadge, { variant: "tools-guru", children: "Tools Guru" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-2", children: "Current State" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(HiveBadge, { variant: "finals-week", children: "Finals Week" }), _jsx(HiveBadge, { variant: "cramming", children: "Cramming" }), _jsx(HiveBadge, { variant: "office-hours-hero", children: "Office Hours Hero" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-2", children: "Tags" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(HiveBadge, { variant: "course-tag", size: "sm", children: "CS 361" }), _jsx(HiveBadge, { variant: "major-tag", size: "sm", children: "Computer Science" }), _jsx(HiveBadge, { variant: "skill-tag", size: "sm", children: "React" }), _jsx(HiveBadge, { variant: "tool-tag", size: "sm", children: "GPA Calculator" })] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Realistic student profile showing how multiple badge types work together to tell a story'
            }
        }
    }
};
//# sourceMappingURL=hive-badge.stories.js.map