import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveTable, HiveButton, HiveBadge, DefaultRowActions } from '../../components';
import { Users, Activity, Star, Download, Filter, Plus, BarChart3, GraduationCap, Building, Wrench, Code } from 'lucide-react';
const meta = {
    title: '04-HIVE/Table System',
    component: HiveTable,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'HIVE Table System with matte obsidian glass design and liquid metal motion. Advanced data tables with sorting, filtering, pagination, selection, and expansion. Features magnetic interactions, real-time updates, and sophisticated campus data management.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'premium', 'minimal'],
            description: 'Table visual style',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Table size and spacing',
        },
        sortable: {
            control: 'boolean',
            description: 'Enable column sorting',
        },
        filterable: {
            control: 'boolean',
            description: 'Enable data filtering',
        },
        selectable: {
            control: 'boolean',
            description: 'Enable row selection',
        },
        expandable: {
            control: 'boolean',
            description: 'Enable row expansion',
        },
        paginated: {
            control: 'boolean',
            description: 'Enable pagination',
        },
    },
    tags: ['autodocs'],
};
export default meta;
// Mock data for stories
const mockSpaceData = [
    {
        id: '1',
        name: 'Computer Science Hub',
        type: 'Academic',
        members: 245,
        activity: 89,
        status: 'Active',
        created: '2024-01-15',
        owner: 'Dr. Sarah Johnson',
        privacy: 'Public',
        lastActivity: '2 hours ago',
        tools: 12,
        description: 'Central hub for CS students to collaborate on projects, share resources, and connect with faculty.',
        category: 'STEM',
        verified: true,
        posts: 156,
        engagement: 4.8
    },
    {
        id: '2',
        name: 'Design Studio',
        type: 'Creative',
        members: 89,
        activity: 76,
        status: 'Active',
        created: '2024-02-03',
        owner: 'Alex Chen',
        privacy: 'Public',
        lastActivity: '5 minutes ago',
        tools: 8,
        description: 'Creative workspace for visual design, UX/UI projects, and artistic collaboration.',
        category: 'Arts',
        verified: true,
        posts: 234,
        engagement: 4.6
    },
    {
        id: '3',
        name: 'AI Research Lab',
        type: 'Academic',
        members: 67,
        activity: 45,
        status: 'Dormant',
        created: '2024-01-28',
        owner: 'Prof. Michael Davis',
        privacy: 'Private',
        lastActivity: '2 days ago',
        tools: 15,
        description: 'Advanced research in machine learning, neural networks, and artificial intelligence.',
        category: 'Research',
        verified: true,
        posts: 45,
        engagement: 4.9
    },
    {
        id: '4',
        name: 'Startup Incubator',
        type: 'Business',
        members: 156,
        activity: 92,
        status: 'Active',
        created: '2024-01-10',
        owner: 'Emma Rodriguez',
        privacy: 'Public',
        lastActivity: '1 hour ago',
        tools: 20,
        description: 'Entrepreneurship hub for launching student startups and business ventures.',
        category: 'Business',
        verified: true,
        posts: 89,
        engagement: 4.7
    },
    {
        id: '5',
        name: 'Gaming Community',
        type: 'Social',
        members: 312,
        activity: 95,
        status: 'Active',
        created: '2023-12-20',
        owner: 'Jake Thompson',
        privacy: 'Public',
        lastActivity: '30 minutes ago',
        tools: 6,
        description: 'Gaming enthusiasts, esports teams, and casual gamers connecting and competing.',
        category: 'Recreation',
        verified: false,
        posts: 445,
        engagement: 4.2
    },
    {
        id: '6',
        name: 'Engineering Workshop',
        type: 'Academic',
        members: 178,
        activity: 82,
        status: 'Active',
        created: '2024-02-15',
        owner: 'Prof. Lisa Wang',
        privacy: 'Public',
        lastActivity: '45 minutes ago',
        tools: 18,
        description: 'Hands-on engineering projects, 3D printing, robotics, and hardware development.',
        category: 'STEM',
        verified: true,
        posts: 123,
        engagement: 4.5
    },
    {
        id: '7',
        name: 'Study Groups Central',
        type: 'Academic',
        members: 523,
        activity: 78,
        status: 'Active',
        created: '2023-09-01',
        owner: 'Student Council',
        privacy: 'Public',
        lastActivity: '15 minutes ago',
        tools: 9,
        description: 'Organize study sessions, find study partners, and share academic resources.',
        category: 'Academic Support',
        verified: true,
        posts: 667,
        engagement: 4.4
    },
    {
        id: '8',
        name: 'Music Production',
        type: 'Creative',
        members: 94,
        activity: 65,
        status: 'Active',
        created: '2024-01-20',
        owner: 'Marcus Johnson',
        privacy: 'Public',
        lastActivity: '3 hours ago',
        tools: 11,
        description: 'Music creation, audio engineering, and collaborative music projects.',
        category: 'Arts',
        verified: false,
        posts: 78,
        engagement: 4.3
    }
];
// Student performance data
const mockStudentData = [
    {
        id: 'S001',
        name: 'Alice Chen',
        email: 'alice.chen@university.edu',
        major: 'Computer Science',
        year: 'Junior',
        gpa: 3.85,
        credits: 87,
        spaces: 5,
        tools: 12,
        posts: 34,
        lastActive: '2024-02-20',
        status: 'Active',
        achievements: ['Dean\'s List', 'Hackathon Winner'],
        mentor: 'Dr. Sarah Johnson'
    },
    {
        id: 'S002',
        name: 'Marcus Rivera',
        email: 'marcus.rivera@university.edu',
        major: 'Mechanical Engineering',
        year: 'Senior',
        gpa: 3.67,
        credits: 118,
        spaces: 3,
        tools: 8,
        posts: 22,
        lastActive: '2024-02-21',
        status: 'Active',
        achievements: ['Engineering Excellence'],
        mentor: 'Prof. Lisa Wang'
    },
    {
        id: 'S003',
        name: 'Sofia Rodriguez',
        email: 'sofia.rodriguez@university.edu',
        major: 'Business Administration',
        year: 'Sophomore',
        gpa: 3.92,
        credits: 56,
        spaces: 7,
        tools: 15,
        posts: 56,
        lastActive: '2024-02-19',
        status: 'Active',
        achievements: ['Startup Pitch Winner', 'Dean\'s List'],
        mentor: 'Emma Rodriguez'
    },
    {
        id: 'S004',
        name: 'David Kim',
        email: 'david.kim@university.edu',
        major: 'Graphic Design',
        year: 'Freshman',
        gpa: 3.45,
        credits: 28,
        spaces: 4,
        tools: 6,
        posts: 18,
        lastActive: '2024-02-18',
        status: 'Active',
        achievements: ['Design Competition Finalist'],
        mentor: 'Alex Chen'
    },
    {
        id: 'S005',
        name: 'Emma Thompson',
        email: 'emma.thompson@university.edu',
        major: 'Data Science',
        year: 'Graduate',
        gpa: 3.96,
        credits: 142,
        spaces: 6,
        tools: 20,
        posts: 67,
        lastActive: '2024-02-21',
        status: 'Active',
        achievements: ['Research Excellence', 'Teaching Assistant'],
        mentor: 'Prof. Michael Davis'
    }
];
// Tool usage analytics data
const mockToolData = [
    {
        id: 'T001',
        name: 'GPA Calculator Pro',
        category: 'Academic',
        creator: 'Alice Chen',
        uses: 1245,
        rating: 4.8,
        created: '2024-01-10',
        lastUpdated: '2024-02-15',
        status: 'Active',
        downloads: 2340,
        spaces: 15,
        description: 'Advanced GPA calculator with semester planning and what-if scenarios'
    },
    {
        id: 'T002',
        name: 'Study Timer',
        category: 'Productivity',
        creator: 'Marcus Rivera',
        uses: 2156,
        rating: 4.6,
        created: '2023-11-20',
        lastUpdated: '2024-02-10',
        status: 'Active',
        downloads: 3120,
        spaces: 23,
        description: 'Pomodoro timer with focus tracking and study analytics'
    },
    {
        id: 'T003',
        name: 'Research Citation Manager',
        category: 'Academic',
        creator: 'Emma Thompson',
        uses: 867,
        rating: 4.9,
        created: '2024-01-25',
        lastUpdated: '2024-02-18',
        status: 'Active',
        downloads: 1456,
        spaces: 8,
        description: 'Organize research papers and generate citations in multiple formats'
    },
    {
        id: 'T004',
        name: 'Design Feedback Board',
        category: 'Creative',
        creator: 'David Kim',
        uses: 543,
        rating: 4.4,
        created: '2024-02-01',
        lastUpdated: '2024-02-20',
        status: 'Beta',
        downloads: 789,
        spaces: 6,
        description: 'Collaborative design review and feedback collection tool'
    },
    {
        id: 'T005',
        name: 'Campus Event Tracker',
        category: 'Social',
        creator: 'Sofia Rodriguez',
        uses: 934,
        rating: 4.3,
        created: '2024-01-05',
        lastUpdated: '2024-02-12',
        status: 'Active',
        downloads: 1678,
        spaces: 12,
        description: 'Track campus events, RSVPs, and build your social calendar'
    }
];
const spaceColumns = [
    {
        id: 'name',
        header: 'Space Name',
        accessor: 'name',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-500/20", children: [row.original.type === 'Academic' && _jsx(GraduationCap, { className: "text-yellow-400", size: 16 }), row.original.type === 'Creative' && _jsx(Code, { className: "text-yellow-400", size: 16 }), row.original.type === 'Business' && _jsx(Building, { className: "text-yellow-400", size: 16 }), row.original.type === 'Social' && _jsx(Users, { className: "text-yellow-400", size: 16 })] }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium text-[var(--hive-text-primary)] flex items-center space-x-2", children: [row.original.name, row.original.verified && _jsx(Star, { className: "text-yellow-400", size: 12 })] }), _jsx("div", { className: "text-xs text-gray-400", children: row.original.owner })] })] })),
    },
    {
        id: 'type',
        header: 'Type',
        accessor: 'type',
        sortable: true,
        filterable: true,
        cell: ({ row }) => (_jsx(HiveBadge, { variant: row.original.type === 'Academic' ? 'academic' :
                row.original.type === 'Creative' ? 'creative' :
                    row.original.type === 'Business' ? 'business' : 'social', children: row.original.type })),
    },
    {
        id: 'members',
        header: 'Members',
        accessor: 'members',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { size: 14, className: "text-gray-400" }), _jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: row.original.members.toLocaleString() })] })),
    },
    {
        id: 'activity',
        header: 'Activity',
        accessor: 'activity',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-20 bg-gray-700 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full transition-all duration-300 ${row.original.activity >= 80 ? 'bg-green-500' :
                            row.original.activity >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`, style: { width: `${row.original.activity}%` } }) }), _jsxs("span", { className: "text-sm text-gray-400 min-w-8", children: [row.original.activity, "%"] })] })),
    },
    {
        id: 'engagement',
        header: 'Rating',
        accessor: 'engagement',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "text-yellow-400", size: 14 }), _jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: row.original.engagement })] })),
    },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        sortable: true,
        filterable: true,
        cell: ({ row }) => (_jsx(HiveBadge, { variant: row.original.status === 'Active' ? 'success' : 'warning', children: row.original.status })),
    },
    {
        id: 'tools',
        header: 'Tools',
        accessor: 'tools',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Wrench, { size: 14, className: "text-gray-400" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.original.tools })] })),
    },
    {
        id: 'lastActivity',
        header: 'Last Activity',
        accessor: 'lastActivity',
        sortable: true,
        cell: ({ row }) => (_jsx("span", { className: "text-sm text-gray-400", children: row.original.lastActivity })),
    }
];
// Student data columns
const studentColumns = [
    {
        id: 'name',
        header: 'Student',
        accessor: 'name',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/20", children: _jsx("span", { className: "text-sm font-medium text-blue-400", children: row.original.name.split(' ').map((n) => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: row.original.name }), _jsx("div", { className: "text-xs text-gray-400", children: row.original.email })] })] })),
    },
    {
        id: 'major',
        header: 'Major',
        accessor: 'major',
        sortable: true,
        filterable: true,
        cell: ({ row }) => (_jsxs("div", { children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: row.original.major }), _jsx("div", { className: "text-xs text-gray-400", children: row.original.year })] })),
    },
    {
        id: 'gpa',
        header: 'GPA',
        accessor: 'gpa',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsx("div", { className: "flex items-center space-x-2", children: _jsx("div", { className: `px-2 py-1 rounded-lg text-xs font-medium ${row.original.gpa >= 3.8 ? 'bg-green-500/20 text-green-400' :
                    row.original.gpa >= 3.5 ? 'bg-yellow-500/20 text-yellow-400' :
                        row.original.gpa >= 3.0 ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`, children: row.original.gpa.toFixed(2) }) })),
    },
    {
        id: 'credits',
        header: 'Credits',
        accessor: 'credits',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.original.credits })),
    },
    {
        id: 'engagement',
        header: 'Engagement',
        accessor: (row) => row.spaces + row.tools + row.posts,
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-4 text-xs", children: [_jsxs("span", { className: "text-gray-400", children: ["Spaces: ", row.original.spaces] }), _jsxs("span", { className: "text-gray-400", children: ["Tools: ", row.original.tools] })] }), _jsxs("div", { className: "text-[var(--hive-text-primary)] font-medium", children: [row.original.posts, " posts"] })] })),
    },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        sortable: true,
        cell: ({ row }) => (_jsx(HiveBadge, { variant: "success", children: row.original.status })),
    }
];
// Tool analytics columns
const toolColumns = [
    {
        id: 'name',
        header: 'Tool',
        accessor: 'name',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: row.original.name }), _jsx("div", { className: "text-xs text-gray-400", children: row.original.creator })] })),
    },
    {
        id: 'category',
        header: 'Category',
        accessor: 'category',
        sortable: true,
        filterable: true,
        cell: ({ row }) => (_jsx(HiveBadge, { variant: row.original.category === 'Academic' ? 'academic' :
                row.original.category === 'Creative' ? 'creative' :
                    row.original.category === 'Productivity' ? 'business' : 'social', children: row.original.category })),
    },
    {
        id: 'uses',
        header: 'Uses',
        accessor: 'uses',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Activity, { size: 14, className: "text-gray-400" }), _jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: row.original.uses.toLocaleString() })] })),
    },
    {
        id: 'rating',
        header: 'Rating',
        accessor: 'rating',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "text-yellow-400", size: 14 }), _jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: row.original.rating })] })),
    },
    {
        id: 'downloads',
        header: 'Downloads',
        accessor: 'downloads',
        type: 'number',
        sortable: true,
        cell: ({ row }) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Download, { size: 14, className: "text-gray-400" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.original.downloads.toLocaleString() })] })),
    },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        sortable: true,
        filterable: true,
        cell: ({ row }) => (_jsx(HiveBadge, { variant: row.original.status === 'Active' ? 'success' :
                row.original.status === 'Beta' ? 'warning' : 'default', children: row.original.status })),
    }
];
export const BasicTable = {
    render: (args) => (_jsxs("div", { className: "w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Campus Spaces" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Manage and overview all campus collaboration spaces" })] }), _jsx(HiveTable, { ...args, data: mockSpaceData, columns: spaceColumns, className: "w-full", rowActions: (row) => (_jsx(DefaultRowActions, { onView: () => console.log('View', row), onEdit: () => console.log('Edit', row), onDelete: () => console.log('Delete', row) })) })] })),
    args: {
        variant: 'default',
        density: 'default',
        sortable: true,
        searchable: true,
        pagination: true,
        pageSize: 5,
    },
};
export const PremiumTable = {
    render: (args) => (_jsxs("div", { className: "w-full max-w-7xl p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Premium Space Management" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Advanced space analytics and management dashboard" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(HiveButton, { variant: "outline", children: [_jsx(Download, { size: 16, className: "mr-2" }), "Export Data"] }), _jsxs(HiveButton, { variant: "premium", children: [_jsx(Plus, { size: 16, className: "mr-2" }), "Create Space"] })] })] }), _jsx(HiveTable, { ...args, data: mockSpaceData, columns: spaceColumns, className: "w-full", toolbar: _jsxs("div", { className: "flex space-x-2", children: [_jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(Filter, { size: 14, className: "mr-2" }), "Filters"] }), _jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(BarChart3, { size: 14, className: "mr-2" }), "Analytics"] })] }), bulkActions: _jsxs("div", { className: "flex space-x-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Archive" }), _jsx(HiveButton, { variant: "destructive", size: "sm", children: "Delete" })] }), rowActions: (row) => (_jsx(DefaultRowActions, { onView: () => console.log('View', row), onEdit: () => console.log('Edit', row), onDelete: () => console.log('Delete', row) })), expandable: true, expandedRowRender: (row) => (_jsx("div", { className: "p-6 space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Space Details" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Description:" }), _jsx("span", { className: "text-[var(--hive-text-primary)] max-w-48 text-right", children: row.description })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Category:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.category })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Created:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.created })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Privacy:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.privacy })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Performance Metrics" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-400", children: "Engagement Score" }), _jsxs("span", { className: "text-[var(--hive-text-primary)]", children: [row.engagement, "/5.0"] })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-2", children: _jsx("div", { className: "bg-yellow-500 h-2 rounded-full transition-all", style: { width: `${(row.engagement / 5) * 100}%` } }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [_jsxs("div", { className: "text-center p-2 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: row.posts }), _jsx("div", { className: "text-gray-400", children: "Posts" })] }), _jsxs("div", { className: "text-center p-2 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: row.tools }), _jsx("div", { className: "text-gray-400", children: "Tools" })] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Quick Actions" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(HiveButton, { size: "sm", variant: "outline", children: "Manage Members" }), _jsx(HiveButton, { size: "sm", variant: "outline", children: "View Analytics" }), _jsx(HiveButton, { size: "sm", variant: "outline", children: "Edit Settings" }), _jsx(HiveButton, { size: "sm", variant: "outline", children: "Export Data" })] })] })] }) })) })] })),
    args: {
        variant: 'premium',
        density: 'default',
        sortable: true,
        searchable: true,
        filterable: true,
        selectable: true,
        pagination: true,
        pageSize: 4,
    },
};
export const StudentAnalytics = {
    render: () => (_jsxs("div", { className: "w-full max-w-7xl p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Student Performance Analytics" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Track student engagement and academic progress" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(HiveButton, { variant: "outline", children: [_jsx(Download, { size: 16, className: "mr-2" }), "Export Report"] }), _jsxs(HiveButton, { variant: "premium", children: [_jsx(BarChart3, { size: 16, className: "mr-2" }), "Generate Insights"] })] })] }), _jsx(HiveTable, { variant: "premium", density: "default", data: mockStudentData, columns: studentColumns, className: "w-full", sortable: true, searchable: true, filterable: true, selectable: true, pagination: true, pageSize: 5, expandable: true, expandedRowRender: (row) => (_jsx("div", { className: "p-6 space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Academic Details" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Mentor:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.mentor })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Last Active:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.lastActive })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Total Credits:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.credits })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Achievements" }), _jsx("div", { className: "space-y-2", children: row.achievements.map((achievement, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Trophy, { className: "text-yellow-400", size: 14 }), _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm", children: achievement })] }, index))) })] })] }) })) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Student analytics table with academic performance tracking, GPA visualization, and detailed student profiles'
            }
        }
    }
};
export const ToolAnalytics = {
    render: () => (_jsxs("div", { className: "w-full max-w-6xl p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "HIVE Tool Analytics" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Monitor tool usage, ratings, and performance metrics" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(HiveButton, { variant: "outline", children: [_jsx(Filter, { size: 16, className: "mr-2" }), "Filter Tools"] }), _jsxs(HiveButton, { variant: "premium", children: [_jsx(Plus, { size: 16, className: "mr-2" }), "Add Tool"] })] })] }), _jsx(HiveTable, { variant: "default", density: "default", data: mockToolData, columns: toolColumns, className: "w-full", sortable: true, searchable: true, filterable: true, pagination: true, pageSize: 6, expandable: true, expandedRowRender: (row) => (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Tool Details" }), _jsx("p", { className: "text-gray-300 text-sm leading-relaxed mb-4", children: row.description }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Created:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.created })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Last Updated:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.lastUpdated })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Used in Spaces:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: row.spaces })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Performance Metrics" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "text-center p-3 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: row.uses.toLocaleString() }), _jsx("div", { className: "text-gray-400 text-xs", children: "Total Uses" })] }), _jsxs("div", { className: "text-center p-3 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: row.downloads.toLocaleString() }), _jsx("div", { className: "text-gray-400 text-xs", children: "Downloads" })] }), _jsxs("div", { className: "text-center p-3 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-xl font-semibold text-yellow-400", children: row.rating }), _jsx("div", { className: "text-gray-400 text-xs", children: "Rating" })] }), _jsxs("div", { className: "text-center p-3 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: row.spaces }), _jsx("div", { className: "text-gray-400 text-xs", children: "Spaces" })] })] })] })] }) })) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Tool analytics dashboard showing usage metrics, ratings, and detailed tool information'
            }
        }
    }
};
export const DensityVariations = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Compact Density" }), _jsx(HiveTable, { variant: "minimal", density: "compact", data: mockSpaceData.slice(0, 3), columns: spaceColumns.slice(0, 5), className: "w-full", pagination: false })] }), _jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Default Density" }), _jsx(HiveTable, { variant: "default", density: "default", data: mockSpaceData.slice(0, 3), columns: spaceColumns.slice(0, 5), className: "w-full", pagination: false })] }), _jsxs("div", { className: "w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Spacious Density" }), _jsx(HiveTable, { variant: "premium", density: "spacious", data: mockSpaceData.slice(0, 3), columns: spaceColumns.slice(0, 5), className: "w-full", pagination: false })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different table density options for various UI contexts and space requirements'
            }
        }
    }
};
export const LoadingAndStates = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "w-full max-w-5xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Loading State" }), _jsx(HiveTable, { variant: "default", density: "default", data: [], columns: spaceColumns.slice(0, 5), className: "w-full", loading: true, pagination: false })] }), _jsxs("div", { className: "w-full max-w-5xl p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Empty State" }), _jsx(HiveTable, { variant: "default", density: "default", data: [], columns: spaceColumns.slice(0, 5), className: "w-full", loading: false, pagination: false, empty: _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDFD7\uFE0F" }), _jsx("div", { className: "text-xl font-medium text-[var(--hive-text-primary)] mb-2", children: "No spaces found" }), _jsx("div", { className: "text-gray-400 mb-6", children: "Get started by creating your first campus space" }), _jsxs(HiveButton, { variant: "premium", children: [_jsx(Plus, { size: 16, className: "mr-2" }), "Create Space"] })] }) })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Loading states and empty states with custom empty content'
            }
        }
    }
};
export const InteractiveFeatures = {
    render: () => {
        const [selectedRows, setSelectedRows] = useState([]);
        const [sortBy, setSortBy] = useState('');
        const [searchQuery, setSearchQuery] = useState('');
        return (_jsxs("div", { className: "w-full max-w-7xl p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Interactive Table Features" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Full-featured table with selection, sorting, searching, and bulk actions" })] }), selectedRows.length > 0 && (_jsx("div", { className: "mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-yellow-400 font-medium", children: [selectedRows.length, " space", selectedRows.length > 1 ? 's' : '', " selected"] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(HiveButton, { size: "sm", variant: "outline", children: [_jsx(Download, { size: 14, className: "mr-1" }), "Export"] }), _jsx(HiveButton, { size: "sm", variant: "outline", children: "Archive" }), _jsx(HiveButton, { size: "sm", variant: "destructive", children: "Delete" })] })] }) })), _jsx(HiveTable, { variant: "default", density: "default", data: mockSpaceData, columns: spaceColumns, className: "w-full", sortable: true, searchable: true, selectable: true, pagination: true, pageSize: 5, onSelect: setSelectedRows, onSort: (sort) => setSortBy(`${sort.column} ${sort.direction}`), onSearch: setSearchQuery, toolbar: _jsxs("div", { className: "flex space-x-2", children: [_jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(Filter, { size: 14, className: "mr-2" }), "Advanced Filters"] }), _jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(BarChart3, { size: 14, className: "mr-2" }), "View Analytics"] })] }), bulkActions: selectedRows.length > 0 ? (_jsxs("div", { className: "flex space-x-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Bulk Edit" }), _jsx(HiveButton, { variant: "destructive", size: "sm", children: "Bulk Delete" })] })) : undefined, rowActions: (row) => (_jsx(DefaultRowActions, { onView: () => console.log('View', row.name), onEdit: () => console.log('Edit', row.name), onDelete: () => console.log('Delete', row.name) })) }), _jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[var(--hive-text-primary)]/5 rounded-xl", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "Current Sort" }), _jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: sortBy || 'None' })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "Search Query" }), _jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: searchQuery || 'None' })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "Selected Rows" }), _jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: selectedRows.length })] })] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive table with all features: selection, sorting, searching, bulk actions, and real-time state feedback'
            }
        }
    }
};
//# sourceMappingURL=hive-table-system.stories.js.map