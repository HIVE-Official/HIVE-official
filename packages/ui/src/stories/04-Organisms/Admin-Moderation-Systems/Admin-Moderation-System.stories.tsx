import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { 
  Shield,
  AlertTriangle,
  Eye,
  EyeOff,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  MessageCircle,
  Flag,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  BarChart3,
  TrendingUp,
  AlertCircle,
  UserCheck,
  UserX,
  MessageSquare,
  Hash,
  Calendar,
  Activity,
  Settings,
  Zap,
  FileText,
  Mail,
  Phone,
  MapPin,
  School
} from 'lucide-react';

/**
 * # HIVE Admin & Moderation System
 * 
 * Comprehensive administrative tools for managing the UB HIVE platform community.
 * Designed for campus administrators, moderators, and student leaders to maintain 
 * a safe, productive, and engaging environment for all UB students.
 * 
 * ## Key Features:
 * - **Content Moderation**: Review reported posts, comments, and user behavior
 * - **User Management**: Handle user accounts, roles, and campus verification
 * - **Community Analytics**: Track platform health and engagement metrics
 * - **Space Management**: Moderate campus spaces and approve new communities
 * - **Security Tools**: Monitor for abuse, spam, and safety violations
 * - **Campus Integration**: UB-specific administrative features and policies
 */

// Create a component wrapper for the story
const AdminModerationSystem = () => (
  <div className="p-6 space-y-8">
    <h2 className="text-2xl font-semibold">Admin & Moderation System</h2>
    <p className="text-muted-foreground">Campus administration and content moderation tools</p>
  </div>
);

const meta: Meta<typeof AdminModerationSystem> = {
  component: AdminModerationSystem,
  title: '12-Live Frontend/Admin & Moderation System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete administrative and moderation system for managing HIVE campus community'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Mock Data
const mockReports = [
  {
    id: 'r001',
    type: 'post',
    reason: 'Inappropriate content',
    status: 'pending',
    priority: 'high',
    reportedAt: '2024-08-09T08:30:00Z',
    reporter: {
      id: 'u001',
      name: 'Sarah Chen',
      handle: 'sarah.chen',
      email: 'schen@buffalo.edu'
    },
    content: {
      id: 'p001',
      type: 'post',
      text: 'Anyone want to share answers for the CS101 final?',
      author: {
        name: 'Mike Johnson',
        handle: 'mike.j',
        email: 'mjohnson@buffalo.edu'
      },
      space: 'CS 101 Study Group',
      createdAt: '2024-08-09T07:15:00Z'
    },
    description: 'This post is encouraging academic dishonesty'
  },
  {
    id: 'r002',
    type: 'user',
    reason: 'Spam behavior',
    status: 'pending',
    priority: 'medium',
    reportedAt: '2024-08-09T09:45:00Z',
    reporter: {
      id: 'u002',
      name: 'Alex Rivera',
      handle: 'alex.rivera',
      email: 'arivera@buffalo.edu'
    },
    content: {
      id: 'u003',
      type: 'user',
      author: {
        name: 'Bot Account',
        handle: 'promo.bot',
        email: 'bot@buffalo.edu'
      },
      text: 'User sending promotional messages to multiple students',
      createdAt: '2024-08-09T09:00:00Z'
    },
    description: 'This user is spamming students with promotional content for external services'
  }
];

const mockUsers = [
  {
    id: 'u001',
    name: 'Sarah Chen',
    handle: 'sarah.chen', 
    email: 'schen@buffalo.edu',
    role: 'student',
    status: 'active',
    graduationYear: '2026',
    major: 'Computer Science',
    dorm: 'Ellicott Complex',
    joinedAt: '2024-07-15T00:00:00Z',
    lastActive: '2024-08-09T10:30:00Z',
    stats: {
      postsCreated: 47,
      spacesJoined: 12,
      toolsCreated: 3,
      reportsReceived: 0,
      actionsHistory: []
    }
  },
  {
    id: 'u002', 
    name: 'Mike Johnson',
    handle: 'mike.j',
    email: 'mjohnson@buffalo.edu',
    role: 'student',
    status: 'warned',
    graduationYear: '2025',
    major: 'Business',
    dorm: 'South Campus',
    joinedAt: '2024-06-20T00:00:00Z',
    lastActive: '2024-08-09T09:15:00Z',
    stats: {
      postsCreated: 23,
      spacesJoined: 8,
      toolsCreated: 0,
      reportsReceived: 2,
      actionsHistory: [
        { action: 'warning', reason: 'Academic dishonesty post', date: '2024-08-09T10:00:00Z' }
      ]
    }
  }
];

const mockSpaces = [
  {
    id: 's001',
    name: 'CS 101 Study Group',
    type: 'academic',
    status: 'active',
    memberCount: 234,
    postsThisWeek: 45,
    moderators: ['sarah.chen', 'prof.smith'],
    createdAt: '2024-07-01T00:00:00Z',
    reportsCount: 3,
    flags: ['academic-integrity-concern']
  },
  {
    id: 's002',
    name: 'Ellicott Complex',
    type: 'housing',
    status: 'active', 
    memberCount: 892,
    postsThisWeek: 78,
    moderators: ['ra.jones', 'ellicott.admin'],
    createdAt: '2024-06-15T00:00:00Z',
    reportsCount: 1,
    flags: []
  }
];

const mockAnalytics = {
  dailyActiveUsers: 2847,
  weeklyActiveUsers: 4521,
  totalUsers: 5892,
  newUsersThisWeek: 156,
  totalPosts: 12456,
  postsThisWeek: 892,
  totalSpaces: 78,
  activeSpaces: 67,
  reportsThisWeek: 23,
  resolvedReports: 18,
  pendingReports: 12,
  averageResponseTime: '4.2 hours'
};

// Admin State Management
const useAdminState = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all',
    dateRange: '7d'
  });

  return {
    activeTab,
    setActiveTab,
    selectedReport,
    setSelectedReport,
    selectedUser,
    setSelectedUser,
    filters,
    setFilters
  };
};

// Admin Layout Component
const AdminLayout = ({ 
  children, 
  title, 
  subtitle,
  actions
}: { 
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) => (
  <div className="min-h-screen bg-black text-white">
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Shield className="mr-3 h-8 w-8 text-red-400" />
              {title}
            </h1>
            {subtitle && <p className="text-gray-400 mt-2">{subtitle}</p>}
          </div>
          {actions}
        </div>
        <Separator className="bg-gray-800" />
      </div>
      
      {children}
    </div>
  </div>
);

// Dashboard Tab
const AdminDashboard = () => (
  <div className="space-y-6">
    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Daily Active Users</p>
              <p className="text-3xl font-bold text-green-400">{mockAnalytics.dailyActiveUsers.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-green-400" />
          </div>
          <div className="mt-2 flex items-center text-xs">
            <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
            <span className="text-green-400">+12% vs yesterday</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Reports</p>
              <p className="text-3xl font-bold text-yellow-400">{mockAnalytics.pendingReports}</p>
            </div>
            <Flag className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="mt-2 flex items-center text-xs">
            <Clock className="h-3 w-3 text-yellow-400 mr-1" />
            <span className="text-yellow-400">Avg {mockAnalytics.averageResponseTime} response</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Posts This Week</p>
              <p className="text-3xl font-bold text-blue-400">{mockAnalytics.postsThisWeek}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-blue-400" />
          </div>
          <div className="mt-2 flex items-center text-xs">
            <TrendingUp className="h-3 w-3 text-blue-400 mr-1" />
            <span className="text-blue-400">+8% vs last week</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Spaces</p>
              <p className="text-3xl font-bold text-purple-400">{mockAnalytics.activeSpaces}</p>
            </div>
            <Hash className="h-8 w-8 text-purple-400" />
          </div>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-500">of {mockAnalytics.totalSpaces} total</span>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Recent Reports
          </CardTitle>
          <CardDescription className="text-gray-400">
            Latest community reports requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockReports.slice(0, 3).map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={report.priority === 'high' ? 'destructive' : 'secondary'}>
                    {report.priority}
                  </Badge>
                  <span className="text-sm text-gray-400">{report.reason}</span>
                </div>
                <p className="text-sm text-white">
                  {report.content.type === 'post' ? 'Post' : 'User'}: {report.content.author.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(report.reportedAt).toLocaleDateString()}
                </p>
              </div>
              <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Campus Activity
          </CardTitle>
          <CardDescription className="text-gray-400">
            UB student engagement trends
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Academic Spaces</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div className="w-3/4 bg-green-500 h-2 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Housing Communities</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div className="w-4/5 bg-blue-500 h-2 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">80%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Student Organizations</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div className="w-3/5 bg-purple-500 h-2 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Campus Events</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div className="w-2/3 bg-yellow-500 h-2 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">67%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Campus Safety Alert */}
    <Alert className="border-amber-800 bg-amber-900/20">
      <School className="h-4 w-4 text-amber-400" />
      <AlertDescription className="text-amber-200">
        <strong>Campus Integration Status:</strong> HIVE is fully integrated with UB systems. 
        All students verified via @buffalo.edu authentication. Platform health: excellent.
      </AlertDescription>
    </Alert>
  </div>
);

// Moderation Queue Tab
const ModerationQueue = ({ 
  state 
}: { 
  state: ReturnType<typeof useAdminState> 
}) => (
  <div className="space-y-6">
    {/* Filters */}
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Label className="text-sm text-white">Filters:</Label>
          </div>
          <Select value={state.filters.status} onValueChange={(value) => 
            state.setFilters({...state.filters, status: value})
          }>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={state.filters.priority} onValueChange={(value) => 
            state.setFilters({...state.filters, priority: value})
          }>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={state.filters.type} onValueChange={(value) => 
            state.setFilters({...state.filters, type: value})
          }>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="post">Posts</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="space">Spaces</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1"></div>
          <Button variant="secondary" size="sm" className="border-gray-700 text-gray-300">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>

    {/* Reports List */}
    <div className="space-y-4">
      {mockReports.map((report) => (
        <Card key={report.id} className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Badge variant={report.priority === 'high' ? 'destructive' : report.priority === 'medium' ? 'default' : 'secondary'}>
                    {report.priority} priority
                  </Badge>
                  <Badge variant="secondary" className="border-gray-700 text-gray-300">
                    {report.content.type}
                  </Badge>
                  <Badge variant={report.status === 'pending' ? 'destructive' : 'default'}>
                    {report.status}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(report.reportedAt).toLocaleString()}
                  </span>
                </div>

                {/* Report Details */}
                <div>
                  <p className="text-white font-medium mb-1">{report.reason}</p>
                  <p className="text-gray-400 text-sm">{report.description}</p>
                </div>

                {/* Content Preview */}
                <div className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-gray-700 text-white text-xs">
                        {report.content.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white">{report.content.author.name}</span>
                    <span className="text-xs text-gray-500">@{report.content.author.handle}</span>
                    {report.content.type === 'post' && (
                      <span className="text-xs text-gray-500">in {(report.content as any).space}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300">
                    {report.content.text}
                  </p>
                </div>

                {/* Reporter Info */}
                <div className="text-xs text-gray-500">
                  Reported by: {report.reporter.name} (@{report.reporter.handle})
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 ml-4">
                <Button 
                  size="sm" 
                  className="bg-green-900 hover:bg-green-800 text-green-300"
                  onClick={() => state.setSelectedReport(report)}
                >
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Review
                </Button>
                <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                  <Eye className="mr-1 h-4 w-4" />
                  View Full
                </Button>
                <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                  <MoreHorizontal className="mr-1 h-4 w-4" />
                  More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Report Review Modal */}
    {state.selectedReport && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="bg-gray-900 border-gray-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Review Report: {state.selectedReport.reason}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => state.setSelectedReport(null)}
                className="text-gray-400"
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Decision Actions */}
            <div className="space-y-3">
              <Label className="text-white">Moderation Action:</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-green-900 hover:bg-green-800 text-green-300">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve (No Action)
                </Button>
                <Button className="bg-yellow-900 hover:bg-yellow-800 text-yellow-300">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Issue Warning
                </Button>
                <Button className="bg-red-900 hover:bg-red-800 text-red-300">
                  <Ban className="mr-2 h-4 w-4" />
                  Remove Content
                </Button>
                <Button className="bg-red-900 hover:bg-red-800 text-red-300">
                  <UserX className="mr-2 h-4 w-4" />
                  Suspend User
                </Button>
              </div>
            </div>

            {/* Action Notes */}
            <div className="space-y-2">
              <Label className="text-white">Moderation Notes:</Label>
              <Textarea 
                className="bg-gray-800 border-gray-700 text-white resize-none"
                rows={3}
                placeholder="Document your decision and reasoning..."
              />
            </div>

            {/* UB Policy Reference */}
            <Alert className="border-blue-800 bg-blue-900/20">
              <FileText className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                <strong>UB Policy Reference:</strong> Academic integrity violations should be 
                reported to the Academic Integrity Office. Consider educational intervention 
                before punitive action for first-time offenses.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-3">
              <Button 
                variant="secondary" 
                onClick={() => state.setSelectedReport(null)}
                className="border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Submit Decision
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )}
  </div>
);

// User Management Tab
const UserManagement = ({ 
  state 
}: { 
  state: ReturnType<typeof useAdminState> 
}) => (
  <div className="space-y-6">
    {/* Search & Filters */}
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search users by name, handle, or email..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="warned">Warned</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    {/* Users List */}
    <div className="space-y-4">
      {mockUsers.map((user) => (
        <Card key={user.id} className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gray-700 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {user.status}
                    </Badge>
                    <Badge variant="secondary" className="border-gray-700 text-gray-300">
                      {user.role}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>@{user.handle} " {user.email}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {user.major}, Class of {user.graduationYear}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.dorm}
                      </span>
                    </div>
                    <p>Last active: {new Date(user.lastActive).toLocaleDateString()}</p>
                  </div>

                  {/* User Stats */}
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span>{user.stats.postsCreated} posts</span>
                    <span>{user.stats.spacesJoined} spaces</span>
                    <span>{user.stats.toolsCreated} tools</span>
                    {user.stats.reportsReceived > 0 && (
                      <span className="text-yellow-400">
                        {user.stats.reportsReceived} reports
                      </span>
                    )}
                  </div>

                  {/* Action History */}
                  {user.stats.actionsHistory.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Recent actions:</p>
                      {user.stats.actionsHistory.map((action, idx) => (
                        <div key={idx} className="text-xs text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded">
                          {action.action}: {action.reason} ({new Date(action.date).toLocaleDateString()})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* User Actions */}
              <div className="flex flex-col gap-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="border-gray-700 text-gray-300"
                  onClick={() => state.setSelectedUser(user)}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  View Profile
                </Button>
                <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                  <Mail className="mr-1 h-4 w-4" />
                  Contact
                </Button>
                <Button size="sm" variant="secondary" className="border-yellow-700 text-yellow-300">
                  <AlertTriangle className="mr-1 h-4 w-4" />
                  Warn
                </Button>
                <Button size="sm" variant="secondary" className="border-red-700 text-red-300">
                  <Ban className="mr-1 h-4 w-4" />
                  Suspend
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Spaces Management Tab  
const SpaceManagement = () => (
  <div className="space-y-6">
    {/* Spaces Overview */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 text-center">
          <Hash className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{mockAnalytics.totalSpaces}</p>
          <p className="text-sm text-gray-400">Total Spaces</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{mockAnalytics.activeSpaces}</p>
          <p className="text-sm text-gray-400">Active Spaces</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 text-center">
          <Flag className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">5</p>
          <p className="text-sm text-gray-400">Flagged Spaces</p>
        </CardContent>
      </Card>
    </div>

    {/* Spaces List */}
    <div className="space-y-4">
      {mockSpaces.map((space) => (
        <Card key={space.id} className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{space.name}</h3>
                  <Badge variant="secondary" className="border-gray-700 text-gray-300">
                    {space.type}
                  </Badge>
                  <Badge variant={space.status === 'active' ? 'default' : 'destructive'}>
                    {space.status}
                  </Badge>
                  {space.flags.length > 0 && (
                    <Badge variant="destructive">
                      <Flag className="mr-1 h-3 w-3" />
                      Flagged
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                  <div>
                    <Users className="h-4 w-4 inline mr-1" />
                    {space.memberCount} members
                  </div>
                  <div>
                    <MessageCircle className="h-4 w-4 inline mr-1" />
                    {space.postsThisWeek} posts/week
                  </div>
                  <div>
                    <Flag className="h-4 w-4 inline mr-1" />
                    {space.reportsCount} reports
                  </div>
                  <div>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Created {new Date(space.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  <span>Moderators: </span>
                  {space.moderators.map((mod, idx) => (
                    <span key={mod} className="text-white">
                      @{mod}{idx < space.moderators.length - 1 && ', '}
                    </span>
                  ))}
                </div>

                {space.flags.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Flags:</p>
                    {space.flags.map((flag) => (
                      <div key={flag} className="text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded inline-block mr-2">
                        {flag}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                  <Eye className="mr-1 h-4 w-4" />
                  View
                </Button>
                <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                  <Settings className="mr-1 h-4 w-4" />
                  Manage
                </Button>
                <Button size="sm" variant="secondary" className="border-yellow-700 text-yellow-300">
                  <Flag className="mr-1 h-4 w-4" />
                  Flag
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Main Admin System Component
const AdminSystem = () => {
  const adminState = useAdminState();

  return (
    <AdminLayout 
      title="HIVE Administration" 
      subtitle="University at Buffalo community management"
      actions={
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="border-green-700 text-green-300">
            <CheckCircle className="mr-1 h-3 w-3" />
            System Healthy
          </Badge>
          <Button variant="secondary" className="border-gray-700 text-gray-300">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      }
    >
      <Tabs value={adminState.activeTab} onValueChange={adminState.setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 text-gray-300">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="moderation" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Flag className="mr-2 h-4 w-4" />
            Moderation
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="spaces" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Hash className="mr-2 h-4 w-4" />
            Spaces
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="moderation">
            <ModerationQueue state={adminState} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement state={adminState} />
          </TabsContent>

          <TabsContent value="spaces">
            <SpaceManagement />
          </TabsContent>
        </div>
      </Tabs>
    </AdminLayout>
  );
};

// Story Exports
export const CompleteAdminSystem: Story = {
  render: () => <AdminSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete administrative and moderation system for managing HIVE campus community'
      }
    }
  }
};

export const AdminDashboardOnly: Story = {
  render: () => (
    <AdminLayout title="Admin Dashboard" subtitle="System overview and key metrics">
      <AdminDashboard />
    </AdminLayout>
  )
};

export const ModerationQueueOnly: Story = {
  render: () => {
    const adminState = useAdminState();
    return (
      <AdminLayout title="Moderation Queue" subtitle="Review and manage community reports">
        <ModerationQueue state={adminState} />
      </AdminLayout>
    );
  }
};

export const UserManagementOnly: Story = {
  render: () => {
    const adminState = useAdminState();
    return (
      <AdminLayout title="User Management" subtitle="Manage UB student accounts and roles">
        <UserManagement state={adminState} />
      </AdminLayout>
    );
  }
};

export const MobileAdminExperience: Story = {
  render: () => <AdminSystem />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized admin interface for managing HIVE on-the-go'
      }
    }
  }
};