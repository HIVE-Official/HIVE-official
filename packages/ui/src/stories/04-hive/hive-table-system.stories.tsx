import React, { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveTable, HiveButton, HiveBadge, DefaultRowActions } from '../../components';
import { 
  Users, 
  Activity, 
  Calendar, 
  Star, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Filter,
  Plus,
  Search,
  BarChart3,
  GraduationCap,
  Building,
  Coffee,
  BookOpen,
  Wrench,
  Code
} from 'lucide-react';

const meta: Meta<typeof HiveTable> = {
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
type Story = StoryObj<typeof meta>;

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
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-500/20">
          {row.original.type === 'Academic' && <GraduationCap className="text-yellow-400" size={16} />}
          {row.original.type === 'Creative' && <Code className="text-yellow-400" size={16} />}
          {row.original.type === 'Business' && <Building className="text-yellow-400" size={16} />}
          {row.original.type === 'Social' && <Users className="text-yellow-400" size={16} />}
        </div>
        <div>
          <div className="font-medium text-white flex items-center space-x-2">
            {row.original.name}
            {row.original.verified && <Star className="text-yellow-400" size={12} />}
          </div>
          <div className="text-xs text-gray-400">{row.original.owner}</div>
        </div>
      </div>
    ),
  },
  {
    id: 'type',
    header: 'Type',
    accessor: 'type',
    sortable: true,
    filterable: true,
    cell: ({ row }: any) => (
      <HiveBadge variant={
        row.original.type === 'Academic' ? 'academic' :
        row.original.type === 'Creative' ? 'creative' :
        row.original.type === 'Business' ? 'business' : 'social'
      }>
        {row.original.type}
      </HiveBadge>
    ),
  },
  {
    id: 'members',
    header: 'Members',
    accessor: 'members',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-2">
        <Users size={14} className="text-gray-400" />
        <span className="text-white font-medium">
          {row.original.members.toLocaleString()}
        </span>
      </div>
    ),
  },
  {
    id: 'activity',
    header: 'Activity',
    accessor: 'activity',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-3">
        <div className="w-20 bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              row.original.activity >= 80 ? 'bg-green-500' :
              row.original.activity >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${row.original.activity}%` }}
          />
        </div>
        <span className="text-sm text-gray-400 min-w-[32px]">{row.original.activity}%</span>
      </div>
    ),
  },
  {
    id: 'engagement',
    header: 'Rating',
    accessor: 'engagement',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-1">
        <Star className="text-yellow-400" size={14} />
        <span className="text-white font-medium">{row.original.engagement}</span>
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    sortable: true,
    filterable: true,
    cell: ({ row }: any) => (
      <HiveBadge variant={row.original.status === 'Active' ? 'success' : 'warning'}>
        {row.original.status}
      </HiveBadge>
    ),
  },
  {
    id: 'tools',
    header: 'Tools',
    accessor: 'tools',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-2">
        <Wrench size={14} className="text-gray-400" />
        <span className="text-white">{row.original.tools}</span>
      </div>
    ),
  },
  {
    id: 'lastActivity',
    header: 'Last Activity',
    accessor: 'lastActivity',
    sortable: true,
    cell: ({ row }: any) => (
      <span className="text-sm text-gray-400">{row.original.lastActivity}</span>
    ),
  }
];

// Student data columns
const studentColumns = [
  {
    id: 'name',
    header: 'Student',
    accessor: 'name',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/20">
          <span className="text-sm font-medium text-blue-400">
            {row.original.name.split(' ').map((n: string) => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium text-white">{row.original.name}</div>
          <div className="text-xs text-gray-400">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  {
    id: 'major',
    header: 'Major',
    accessor: 'major',
    sortable: true,
    filterable: true,
    cell: ({ row }: any) => (
      <div>
        <div className="text-white font-medium">{row.original.major}</div>
        <div className="text-xs text-gray-400">{row.original.year}</div>
      </div>
    ),
  },
  {
    id: 'gpa',
    header: 'GPA',
    accessor: 'gpa',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-2">
        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
          row.original.gpa >= 3.8 ? 'bg-green-500/20 text-green-400' :
          row.original.gpa >= 3.5 ? 'bg-yellow-500/20 text-yellow-400' :
          row.original.gpa >= 3.0 ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {row.original.gpa.toFixed(2)}
        </div>
      </div>
    ),
  },
  {
    id: 'credits',
    header: 'Credits',
    accessor: 'credits',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <span className="text-white">{row.original.credits}</span>
    ),
  },
  {
    id: 'engagement',
    header: 'Engagement',
    accessor: (row: any) => row.spaces + row.tools + row.posts,
    sortable: true,
    cell: ({ row }: any) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-4 text-xs">
          <span className="text-gray-400">Spaces: {row.original.spaces}</span>
          <span className="text-gray-400">Tools: {row.original.tools}</span>
        </div>
        <div className="text-white font-medium">{row.original.posts} posts</div>
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    sortable: true,
    cell: ({ row }: any) => (
      <HiveBadge variant="success">
        {row.original.status}
      </HiveBadge>
    ),
  }
];

// Tool analytics columns
const toolColumns = [
  {
    id: 'name',
    header: 'Tool',
    accessor: 'name',
    sortable: true,
    cell: ({ row }: any) => (
      <div>
        <div className="font-medium text-white">{row.original.name}</div>
        <div className="text-xs text-gray-400">{row.original.creator}</div>
      </div>
    ),
  },
  {
    id: 'category',
    header: 'Category',
    accessor: 'category',
    sortable: true,
    filterable: true,
    cell: ({ row }: any) => (
      <HiveBadge variant={
        row.original.category === 'Academic' ? 'academic' :
        row.original.category === 'Creative' ? 'creative' :
        row.original.category === 'Productivity' ? 'business' : 'social'
      }>
        {row.original.category}
      </HiveBadge>
    ),
  },
  {
    id: 'uses',
    header: 'Uses',
    accessor: 'uses',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-2">
        <Activity size={14} className="text-gray-400" />
        <span className="text-white font-medium">{row.original.uses.toLocaleString()}</span>
      </div>
    ),
  },
  {
    id: 'rating',
    header: 'Rating',
    accessor: 'rating',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-1">
        <Star className="text-yellow-400" size={14} />
        <span className="text-white font-medium">{row.original.rating}</span>
      </div>
    ),
  },
  {
    id: 'downloads',
    header: 'Downloads',
    accessor: 'downloads',
    type: 'number',
    sortable: true,
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-2">
        <Download size={14} className="text-gray-400" />
        <span className="text-white">{row.original.downloads.toLocaleString()}</span>
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    sortable: true,
    filterable: true,
    cell: ({ row }: any) => (
      <HiveBadge variant={
        row.original.status === 'Active' ? 'success' :
        row.original.status === 'Beta' ? 'warning' : 'default'
      }>
        {row.original.status}
      </HiveBadge>
    ),
  }
];

export const BasicTable: Story = {
  render: (args) => (
    <div className="w-full max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Campus Spaces</h3>
        <p className="text-[var(--hive-text-secondary)]">Manage and overview all campus collaboration spaces</p>
      </div>
      <HiveTable
        {...args}
        data={mockSpaceData}
        columns={spaceColumns}
        className="w-full"
        rowActions={(row) => (
          <DefaultRowActions
            onView={() => console.log('View', row)}
            onEdit={() => console.log('Edit', row)}
            onDelete={() => console.log('Delete', row)}
          />
        )}
      />
    </div>
  ),
  args: {
    variant: 'default',
    density: 'default',
    sortable: true,
    searchable: true,
    pagination: true,
    pageSize: 5,
  },
};

export const PremiumTable: Story = {
  render: (args) => (
    <div className="w-full max-w-7xl p-8 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">Premium Space Management</h3>
          <p className="text-[var(--hive-text-secondary)]">Advanced space analytics and management dashboard</p>
        </div>
        <div className="flex space-x-3">
          <HiveButton variant="outline">
            <Download size={16} className="mr-2" />
            Export Data
          </HiveButton>
          <HiveButton variant="premium">
            <Plus size={16} className="mr-2" />
            Create Space
          </HiveButton>
        </div>
      </div>
      
      <HiveTable
        {...args}
        data={mockSpaceData}
        columns={spaceColumns}
        className="w-full"
        toolbar={
          <div className="flex space-x-2">
            <HiveButton variant="outline" size="sm">
              <Filter size={14} className="mr-2" />
              Filters
            </HiveButton>
            <HiveButton variant="outline" size="sm">
              <BarChart3 size={14} className="mr-2" />
              Analytics
            </HiveButton>
          </div>
        }
        bulkActions={
          <div className="flex space-x-2">
            <HiveButton variant="outline" size="sm">Archive</HiveButton>
            <HiveButton variant="destructive" size="sm">Delete</HiveButton>
          </div>
        }
        rowActions={(row) => (
          <DefaultRowActions
            onView={() => console.log('View', row)}
            onEdit={() => console.log('Edit', row)}
            onDelete={() => console.log('Delete', row)}
          />
        )}
        expandable={true}
        expandedRowRender={(row) => (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Space Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Description:</span>
                    <span className="text-white max-w-48 text-right">{row.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{row.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{row.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Privacy:</span>
                    <span className="text-white">{row.privacy}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Engagement Score</span>
                      <span className="text-white">{row.engagement}/5.0</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all" 
                        style={{ width: `${(row.engagement / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-lg font-semibold text-white">{row.posts}</div>
                      <div className="text-gray-400">Posts</div>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded-lg">
                      <div className="text-lg font-semibold text-white">{row.tools}</div>
                      <div className="text-gray-400">Tools</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <HiveButton size="sm" variant="outline">Manage Members</HiveButton>
                  <HiveButton size="sm" variant="outline">View Analytics</HiveButton>
                  <HiveButton size="sm" variant="outline">Edit Settings</HiveButton>
                  <HiveButton size="sm" variant="outline">Export Data</HiveButton>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  ),
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

export const StudentAnalytics: Story = {
  render: () => (
    <div className="w-full max-w-7xl p-8 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">Student Performance Analytics</h3>
          <p className="text-[var(--hive-text-secondary)]">Track student engagement and academic progress</p>
        </div>
        <div className="flex space-x-3">
          <HiveButton variant="outline">
            <Download size={16} className="mr-2" />
            Export Report
          </HiveButton>
          <HiveButton variant="premium">
            <BarChart3 size={16} className="mr-2" />
            Generate Insights
          </HiveButton>
        </div>
      </div>
      
      <HiveTable
        variant="premium"
        density="default"
        data={mockStudentData}
        columns={studentColumns}
        className="w-full"
        sortable={true}
        searchable={true}
        filterable={true}
        selectable={true}
        pagination={true}
        pageSize={5}
        expandable={true}
        expandedRowRender={(row) => (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Academic Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mentor:</span>
                    <span className="text-white">{row.mentor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Active:</span>
                    <span className="text-white">{row.lastActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Credits:</span>
                    <span className="text-white">{row.credits}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-3">Achievements</h4>
                <div className="space-y-2">
                  {row.achievements.map((achievement: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Trophy className="text-yellow-400" size={14} />
                      <span className="text-white text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Student analytics table with academic performance tracking, GPA visualization, and detailed student profiles'
      }
    }
  }
};

export const ToolAnalytics: Story = {
  render: () => (
    <div className="w-full max-w-6xl p-8 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">HIVE Tool Analytics</h3>
          <p className="text-[var(--hive-text-secondary)]">Monitor tool usage, ratings, and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <HiveButton variant="outline">
            <Filter size={16} className="mr-2" />
            Filter Tools
          </HiveButton>
          <HiveButton variant="premium">
            <Plus size={16} className="mr-2" />
            Add Tool
          </HiveButton>
        </div>
      </div>
      
      <HiveTable
        variant="default"
        density="default"
        data={mockToolData}
        columns={toolColumns}
        className="w-full"
        sortable={true}
        searchable={true}
        filterable={true}
        pagination={true}
        pageSize={6}
        expandable={true}
        expandedRowRender={(row) => (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Tool Details</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{row.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{row.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white">{row.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Used in Spaces:</span>
                    <span className="text-white">{row.spaces}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-semibold text-white">{row.uses.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">Total Uses</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-semibold text-white">{row.downloads.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">Downloads</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-semibold text-yellow-400">{row.rating}</div>
                    <div className="text-gray-400 text-xs">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-semibold text-white">{row.spaces}</div>
                    <div className="text-gray-400 text-xs">Spaces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tool analytics dashboard showing usage metrics, ratings, and detailed tool information'
      }
    }
  }
};

export const DensityVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">Compact Density</h4>
        <HiveTable
          variant="minimal"
          density="compact"
          data={mockSpaceData.slice(0, 3)}
          columns={spaceColumns.slice(0, 5)}
          className="w-full"
          pagination={false}
        />
      </div>
      
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">Default Density</h4>
        <HiveTable
          variant="default"
          density="default"
          data={mockSpaceData.slice(0, 3)}
          columns={spaceColumns.slice(0, 5)}
          className="w-full"
          pagination={false}
        />
      </div>
      
      <div className="w-full max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">Spacious Density</h4>
        <HiveTable
          variant="premium"
          density="spacious"
          data={mockSpaceData.slice(0, 3)}
          columns={spaceColumns.slice(0, 5)}
          className="w-full"
          pagination={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different table density options for various UI contexts and space requirements'
      }
    }
  }
};

export const LoadingAndStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-full max-w-5xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">Loading State</h4>
        <HiveTable
          variant="default"
          density="default"
          data={[]}
          columns={spaceColumns.slice(0, 5)}
          className="w-full"
          loading={true}
          pagination={false}
        />
      </div>
      
      <div className="w-full max-w-5xl p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">Empty State</h4>
        <HiveTable
          variant="default"
          density="default"
          data={[]}
          columns={spaceColumns.slice(0, 5)}
          className="w-full"
          loading={false}
          pagination={false}
          empty={
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏗️</div>
              <div className="text-xl font-medium text-white mb-2">No spaces found</div>
              <div className="text-gray-400 mb-6">Get started by creating your first campus space</div>
              <HiveButton variant="premium">
                <Plus size={16} className="mr-2" />
                Create Space
              </HiveButton>
            </div>
          }
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states and empty states with custom empty content'
      }
    }
  }
};

export const InteractiveFeatures: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    return (
      <div className="w-full max-w-7xl p-8 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white mb-2">Interactive Table Features</h3>
          <p className="text-[var(--hive-text-secondary)]">Full-featured table with selection, sorting, searching, and bulk actions</p>
        </div>
        
        {selectedRows.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-medium">
                {selectedRows.length} space{selectedRows.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-2">
                <HiveButton size="sm" variant="outline">
                  <Download size={14} className="mr-1" />
                  Export
                </HiveButton>
                <HiveButton size="sm" variant="outline">Archive</HiveButton>
                <HiveButton size="sm" variant="destructive">Delete</HiveButton>
              </div>
            </div>
          </div>
        )}
        
        <HiveTable
          variant="default"
          density="default"
          data={mockSpaceData}
          columns={spaceColumns}
          className="w-full"
          sortable={true}
          searchable={true}
          selectable={true}
          pagination={true}
          pageSize={5}
          onSelect={setSelectedRows}
          onSort={(sort) => setSortBy(`${sort.column} ${sort.direction}`)}
          onSearch={setSearchQuery}
          toolbar={
            <div className="flex space-x-2">
              <HiveButton variant="outline" size="sm">
                <Filter size={14} className="mr-2" />
                Advanced Filters
              </HiveButton>
              <HiveButton variant="outline" size="sm">
                <BarChart3 size={14} className="mr-2" />
                View Analytics
              </HiveButton>
            </div>
          }
          bulkActions={
            selectedRows.length > 0 ? (
              <div className="flex space-x-2">
                <HiveButton variant="outline" size="sm">Bulk Edit</HiveButton>
                <HiveButton variant="destructive" size="sm">Bulk Delete</HiveButton>
              </div>
            ) : undefined
          }
          rowActions={(row) => (
            <DefaultRowActions
              onView={() => console.log('View', row.name)}
              onEdit={() => console.log('Edit', row.name)}
              onDelete={() => console.log('Delete', row.name)}
            />
          )}
        />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
          <div>
            <div className="text-sm text-gray-400">Current Sort</div>
            <div className="text-white font-medium">{sortBy || 'None'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Search Query</div>
            <div className="text-white font-medium">{searchQuery || 'None'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Selected Rows</div>
            <div className="text-white font-medium">{selectedRows.length}</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive table with all features: selection, sorting, searching, bulk actions, and real-time state feedback'
      }
    }
  }
};

