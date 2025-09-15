"use client";

import { useState, useEffect } from "react";
import { logger } from '@hive/core/utils/logger';

import { 
  HiveCard as Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  HiveButton as Button,
  Badge,
  Input,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Avatar,
  AvatarFallback
} from "@hive/ui";
import { 
  Search,
  Eye,
  Check,
  X,
  Clock,
  User,
  Code,
  Shield,
  AlertTriangle,
  Download,
  ExternalLink,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  PlayCircle
} from "lucide-react";
import { useAdminAuth } from "../lib/auth";
import { toast } from "sonner";

interface ToolSubmission {
  id: string;
  name: string;
  description: string;
  category: string;
  submittedBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'needs_changes' | 'archived';
  version: string;
  sourceCode?: string;
  demoUrl?: string;
  documentationUrl?: string;
  screenshots: string[];
  
  // Review Process
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewComments?: string;
  approvalReason?: string;
  rejectionReason?: string;
  
  // Tool Details
  permissions: string[];
  targetAudience: 'all' | 'students' | 'faculty' | 'specific';
  visibility: 'public' | 'campus' | 'private';
  installCount?: number;
  rating?: number;
  
  // Security & Compliance
  securityReview: {
    status: 'pending' | 'approved' | 'rejected';
    reviewer?: string;
    notes?: string;
    checkedAt?: Date;
  };
  
  // Testing
  testingStatus: {
    automated: 'pending' | 'passed' | 'failed';
    manual: 'pending' | 'passed' | 'failed';
    performance: 'pending' | 'passed' | 'failed';
    notes?: string;
  };
}

interface ReviewNote {
  id: string;
  toolId: string;
  reviewerId: string;
  reviewerName: string;
  message: string;
  type: 'comment' | 'concern' | 'approval' | 'rejection';
  timestamp: Date;
  resolved?: boolean;
}

export function ToolApprovalSystem() {
  const { admin } = useAdminAuth();
  const [toolSubmissions, setToolSubmissions] = useState<ToolSubmission[]>([]);
  const [reviewNotes, setReviewNotes] = useState<ReviewNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTool, setSelectedTool] = useState<ToolSubmission | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | 'needs_changes' | null>(null);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    initializeToolSubmissions();
  }, []);

  const initializeToolSubmissions = () => {
    // Mock data - In production, this would fetch from Firebase
    const mockSubmissions: ToolSubmission[] = [
      {
        id: 'tool-1',
        name: 'Study Group Scheduler',
        description: 'Helps students schedule and manage study group sessions with integrated calendar sync and reminder notifications.',
        category: 'productivity',
        submittedBy: {
          id: 'user1',
          name: 'Alex Chen',
          email: 'achen@buffalo.edu',
          avatar: '/avatars/alex.jpg'
        },
        submittedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
        status: 'pending',
        version: '1.0.0',
        sourceCode: 'https://github.com/alexchen/study-scheduler',
        demoUrl: 'https://study-scheduler-demo.vercel.app',
        documentationUrl: 'https://docs.study-scheduler.com',
        screenshots: ['/screenshots/scheduler1.jpg', '/screenshots/scheduler2.jpg'],
        permissions: ['calendar:read', 'notifications:send', 'users:read'],
        targetAudience: 'students',
        visibility: 'campus',
        securityReview: {
          status: 'pending'
        },
        testingStatus: {
          automated: 'passed',
          manual: 'pending',
          performance: 'pending'
        }
      },
      {
        id: 'tool-2',
        name: 'Grade Calculator Plus',
        description: 'Advanced grade calculator with GPA tracking, what-if scenarios, and semester planning.',
        category: 'academic',
        submittedBy: {
          id: 'user2',
          name: 'Maria Rodriguez',
          email: 'mrodriguez@buffalo.edu'
        },
        submittedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
        status: 'needs_changes',
        version: '2.1.0',
        sourceCode: 'https://github.com/maria/grade-calc',
        demoUrl: 'https://gradecalc.maria.dev',
        screenshots: ['/screenshots/calc1.jpg'],
        permissions: ['grades:read'],
        targetAudience: 'students',
        visibility: 'public',
        reviewedBy: 'admin@hive.com',
        reviewedAt: new Date(Date.now() - 86400000 * 2),
        reviewComments: 'Great concept! Please address the performance issues with large datasets and add proper error handling for edge cases.',
        securityReview: {
          status: 'approved',
          reviewer: 'security@hive.com',
          notes: 'No security concerns found. Proper input validation implemented.',
          checkedAt: new Date(Date.now() - 86400000 * 3)
        },
        testingStatus: {
          automated: 'passed',
          manual: 'failed',
          performance: 'failed',
          notes: 'Performance degrades with >1000 grade entries. Memory optimization needed.'
        }
      },
      {
        id: 'tool-3',
        name: 'Library Resource Finder',
        description: 'Search and locate library resources, check availability, and reserve books/equipment.',
        category: 'academic',
        submittedBy: {
          id: 'user3',
          name: 'David Kim',
          email: 'dkim@buffalo.edu'
        },
        submittedAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
        status: 'approved',
        version: '1.2.1',
        sourceCode: 'https://github.com/davidk/library-finder',
        demoUrl: 'https://libfinder.hive.app',
        documentationUrl: 'https://docs.libfinder.hive.app',
        screenshots: ['/screenshots/lib1.jpg', '/screenshots/lib2.jpg', '/screenshots/lib3.jpg'],
        permissions: ['library:read', 'reservations:write'],
        targetAudience: 'all',
        visibility: 'campus',
        installCount: 1247,
        rating: 4.8,
        reviewedBy: 'admin@hive.com',
        reviewedAt: new Date(Date.now() - 86400000 * 10),
        approvalReason: 'Excellent implementation. High user engagement and positive feedback. Security review passed.',
        securityReview: {
          status: 'approved',
          reviewer: 'security@hive.com',
          notes: 'Comprehensive security review completed. All best practices followed.',
          checkedAt: new Date(Date.now() - 86400000 * 12)
        },
        testingStatus: {
          automated: 'passed',
          manual: 'passed',
          performance: 'passed',
          notes: 'All tests passed. Performance excellent under load.'
        }
      },
      {
        id: 'tool-4',
        name: 'Campus Events Tracker',
        description: 'Track campus events, RSVP, and get personalized recommendations based on interests.',
        category: 'social',
        submittedBy: {
          id: 'user4',
          name: 'Sarah Johnson',
          email: 'sjohnson@buffalo.edu'
        },
        submittedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
        status: 'rejected',
        version: '0.9.2',
        sourceCode: 'https://github.com/sarah/events-tracker',
        screenshots: ['/screenshots/events1.jpg'],
        permissions: ['events:read', 'users:read', 'notifications:send', 'location:read'],
        targetAudience: 'students',
        visibility: 'campus',
        reviewedBy: 'admin@hive.com',
        reviewedAt: new Date(),
        rejectionReason: 'Security concerns: Excessive permissions requested. Location tracking not justified. Privacy policy missing.',
        securityReview: {
          status: 'rejected',
          reviewer: 'security@hive.com',
          notes: 'REJECTED: Requests unnecessary location permissions. No privacy policy provided. Data handling practices unclear.',
          checkedAt: new Date(Date.now() - 86400000)
        },
        testingStatus: {
          automated: 'failed',
          manual: 'pending',
          performance: 'pending',
          notes: 'Multiple security vulnerabilities found in automated testing.'
        }
      }
    ];

    const mockReviewNotes: ReviewNote[] = [
      {
        id: 'note-1',
        toolId: 'tool-2',
        reviewerId: 'admin1',
        reviewerName: 'Admin User',
        message: 'The performance testing showed issues with large datasets. Consider implementing pagination or lazy loading.',
        type: 'concern',
        timestamp: new Date(Date.now() - 86400000 * 2)
      },
      {
        id: 'note-2',
        toolId: 'tool-2',
        reviewerId: 'tester1',
        reviewerName: 'QA Tester',
        message: 'Manual testing revealed UI inconsistencies on mobile devices. Needs responsive design improvements.',
        type: 'concern',
        timestamp: new Date(Date.now() - 86400000 * 1)
      }
    ];

    setToolSubmissions(mockSubmissions);
    setReviewNotes(mockReviewNotes);
    setLoading(false);
  };

  const handleReviewTool = async (toolId: string, action: 'approve' | 'reject' | 'needs_changes', comment: string) => {
    if (!admin) return;

    try {
      // Update tool status
      setToolSubmissions(prev => prev.map(tool => 
        tool.id === toolId ? {
          ...tool,
          status: action === 'approve' ? 'approved' : action,
          reviewedBy: admin.email,
          reviewedAt: new Date(),
          reviewComments: comment,
          ...(action === 'approve' ? { approvalReason: comment } : {}),
          ...(action === 'reject' ? { rejectionReason: comment } : {})
        } : tool
      ));

      // Add review note
      const newNote: ReviewNote = {
        id: Date.now().toString(),
        toolId,
        reviewerId: admin.id,
        reviewerName: admin.email,
        message: comment,
        type: action === 'approve' ? 'approval' : action === 'reject' ? 'rejection' : 'comment',
        timestamp: new Date()
      };

      setReviewNotes(prev => [newNote, ...prev]);

      toast.success(`Tool ${action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'marked for changes'} successfully`);
      setShowReviewDialog(false);
      setSelectedTool(null);
      setReviewComment("");
    } catch (error) {
      logger.error('Error reviewing tool:', error);
      toast.error('Failed to review tool');
    }
  };

  const filteredSubmissions = toolSubmissions.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.submittedBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading tool submissions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Tool Approval System</h2>
          <p className="text-gray-400">Review and manage community-submitted tools</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            {toolSubmissions.filter(t => t.status === 'pending').length} Pending Review
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Pending Review</p>
                <p className="text-2xl font-bold text-white">
                  {toolSubmissions.filter(t => t.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-white">
                  {toolSubmissions.filter(t => t.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Need Changes</p>
                <p className="text-2xl font-bold text-white">
                  {toolSubmissions.filter(t => t.status === 'needs_changes').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-white">
                  {toolSubmissions.filter(t => t.status === 'rejected').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search tools, authors, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="needs_changes">Needs Changes</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="utility">Utility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tool Submissions */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">Tool Submissions ({filteredSubmissions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No tool submissions found</p>
              </div>
            ) : (
              filteredSubmissions.map((tool) => (
                <ToolSubmissionCard
                  key={tool.id}
                  tool={tool}
                  onSelect={() => setSelectedTool(tool)}
                  onReview={(action) => {
                    setSelectedTool(tool);
                    setReviewAction(action);
                    setShowReviewDialog(true);
                  }}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === 'approve' ? 'Approve Tool' :
               reviewAction === 'reject' ? 'Reject Tool' :
               'Request Changes'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTool && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-white">{selectedTool.name}</h4>
                <p className="text-gray-400 text-sm mt-1">{selectedTool.description}</p>
              </div>
              
              <div className="space-y-2">
                <Label>
                  {reviewAction === 'approve' ? 'Approval Comments' :
                   reviewAction === 'reject' ? 'Rejection Reason' :
                   'Required Changes'}
                </Label>
                <Textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={
                    reviewAction === 'approve' ? 'Explain why this tool is being approved...' :
                    reviewAction === 'reject' ? 'Explain why this tool is being rejected...' :
                    'Describe what changes are needed...'
                  }
                  className="bg-gray-800 border-gray-600"
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowReviewDialog(false);
                    setReviewComment("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => reviewAction && selectedTool && handleReviewTool(selectedTool.id, reviewAction, reviewComment)}
                  disabled={!reviewComment.trim()}
                  className={
                    reviewAction === 'approve' ? "bg-green-600 hover:bg-green-700" :
                    reviewAction === 'reject' ? "bg-red-600 hover:bg-red-700" :
                    "bg-orange-600 hover:bg-orange-700"
                  }
                >
                  {reviewAction === 'approve' ? 'Approve Tool' :
                   reviewAction === 'reject' ? 'Reject Tool' :
                   'Request Changes'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Tool Details Dialog */}
      {selectedTool && !showReviewDialog && (
        <ToolDetailsDialog
          tool={selectedTool}
          reviewNotes={reviewNotes.filter(note => note.toolId === selectedTool.id)}
          onClose={() => setSelectedTool(null)}
          onReview={(action) => {
            setReviewAction(action);
            setShowReviewDialog(true);
          }}
        />
      )}
    </div>
  );
}

interface ToolSubmissionCardProps {
  tool: ToolSubmission;
  onSelect: () => void;
  onReview: (action: 'approve' | 'reject' | 'needs_changes') => void;
}

function ToolSubmissionCard({ tool, onSelect, onReview }: ToolSubmissionCardProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 
              className="text-lg font-semibold text-white cursor-pointer hover:text-orange-400"
              onClick={onSelect}
            >
              {tool.name}
            </h3>
            
            <div className="px-2 py-1 rounded-full text-xs font-medium border text-gray-400 bg-gray-400/10 border-gray-400/20">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {tool.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            
            <Badge variant="outline" className="text-xs">
              {tool.category}
            </Badge>
          </div>
          
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{tool.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{tool.submittedBy.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{tool.submittedAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Code className="w-3 h-3" />
              <span>v{tool.version}</span>
            </div>
            {tool.installCount && (
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>{tool.installCount} installs</span>
              </div>
            )}
          </div>
          
          {/* Security & Testing Status */}
          <div className="flex items-center gap-4 text-xs">
            <div className={`flex items-center gap-1 ${
              tool.securityReview.status === 'approved' ? 'text-green-400' :
              tool.securityReview.status === 'rejected' ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              <Shield className="w-3 h-3" />
              <span>Security: {tool.securityReview.status}</span>
            </div>
            <div className={`flex items-center gap-1 ${
              Object.values(tool.testingStatus).every(status => status === 'passed') ? 'text-green-400' :
              Object.values(tool.testingStatus).some(status => status === 'failed') ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              <CheckCircle className="w-3 h-3" />
              <span>Testing: {
                Object.values(tool.testingStatus).every(status => status === 'passed') ? 'Passed' :
                Object.values(tool.testingStatus).some(status => status === 'failed') ? 'Failed' :
                'In Progress'
              }</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <Button size="sm" variant="ghost" onClick={onSelect}>
            <Eye className="w-4 h-4" />
          </Button>
          
          {tool.status === 'pending' && (
            <>
              <Button 
                size="sm" 
                onClick={() => onReview('approve')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={() => onReview('needs_changes')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <AlertTriangle className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={() => onReview('reject')}
                className="bg-red-600 hover:bg-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Review Comments */}
      {tool.reviewComments && (
        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border-l-4 border-orange-500">
          <div className="text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-orange-400 font-medium">Review Comments:</span>
              {tool.reviewedBy && (
                <span className="text-gray-500 text-xs">by {tool.reviewedBy}</span>
              )}
            </div>
            <p className="text-gray-300">{tool.reviewComments}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface ToolDetailsDialogProps {
  tool: ToolSubmission;
  reviewNotes: ReviewNote[];
  onClose: () => void;
  onReview: (action: 'approve' | 'reject' | 'needs_changes') => void;
}

function ToolDetailsDialog({ tool, reviewNotes, onClose, onReview }: ToolDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {tool.name}
            <Badge variant="outline" className="ml-2">
              v{tool.version}
            </Badge>
            <div className="px-2 py-1 rounded-full text-xs font-medium border text-gray-400 bg-gray-400/10 border-gray-400/20">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {tool.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Tool Information</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">Description:</span>
                    <p className="text-gray-300 mt-1">{tool.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">Category:</span>
                    <Badge variant="outline">{tool.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">Target Audience:</span>
                    <span className="text-gray-300">{tool.targetAudience}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">Visibility:</span>
                    <span className="text-gray-300">{tool.visibility}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Submission Details</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">Submitted by:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback>{tool.submittedBy.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-gray-300">{tool.submittedBy.name}</span>
                      <span className="text-gray-500">({tool.submittedBy.email})</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Submitted:</span>
                    <span className="text-gray-300 ml-2">{tool.submittedAt.toLocaleString()}</span>
                  </div>
                  {tool.reviewedAt && (
                    <div>
                      <span className="text-gray-400">Reviewed:</span>
                      <span className="text-gray-300 ml-2">{tool.reviewedAt.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-2">Resources</h4>
              <div className="flex flex-wrap gap-2">
                {tool.sourceCode && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={tool.sourceCode} target="_blank" rel="noopener noreferrer">
                      <Code className="w-3 h-3 mr-1" />
                      Source Code
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                )}
                {tool.demoUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={tool.demoUrl} target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="w-3 h-3 mr-1" />
                      Demo
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                )}
                {tool.documentationUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={tool.documentationUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-3 h-3 mr-1" />
                      Documentation
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Permissions */}
            <div>
              <h4 className="font-semibold text-white mb-2">Requested Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {tool.permissions.map(permission => (
                  <Badge key={permission} variant="outline" className="text-orange-400 border-orange-400">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">Security Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Status:</span>
                    <div className={`px-2 py-1 rounded text-sm ${
                      tool.securityReview.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      tool.securityReview.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {tool.securityReview.status.toUpperCase()}
                    </div>
                  </div>
                  
                  {tool.securityReview.reviewer && (
                    <div>
                      <span className="text-gray-400">Reviewed by:</span>
                      <span className="text-gray-300 ml-2">{tool.securityReview.reviewer}</span>
                    </div>
                  )}
                  
                  {tool.securityReview.notes && (
                    <div>
                      <span className="text-gray-400">Notes:</span>
                      <p className="text-gray-300 mt-1">{tool.securityReview.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-4">
            <div className="grid gap-4">
              {Object.entries(tool.testingStatus).map(([testType, status]) => {
                if (testType === 'notes') return null;
                
                return (
                  <Card key={testType} className="border-gray-700 bg-gray-800/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white capitalize">{testType.replace('_', ' ')} Testing</h4>
                        <div className={`px-2 py-1 rounded text-sm ${
                          status === 'passed' ? 'bg-green-500/20 text-green-400' :
                          status === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {status.toUpperCase()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {tool.testingStatus.notes && (
                <Card className="border-gray-700 bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Testing Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{tool.testingStatus.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="space-y-4">
              {reviewNotes.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No review notes yet</p>
              ) : (
                reviewNotes.map(note => (
                  <div key={note.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          note.type === 'approval' ? 'bg-green-500/20 text-green-400' :
                          note.type === 'rejection' ? 'bg-red-500/20 text-red-400' :
                          note.type === 'concern' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-blue-500/20 text-blue-400'
                        }>
                          {note.type}
                        </Badge>
                        <span className="text-sm text-gray-400">{note.reviewerName}</span>
                      </div>
                      <span className="text-xs text-gray-500">{note.timestamp.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-300">{note.message}</p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t border-gray-700">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          
          {tool.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                onClick={() => onReview('reject')}
                variant="destructive"
              >
                Reject
              </Button>
              <Button 
                onClick={() => onReview('needs_changes')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Request Changes
              </Button>
              <Button 
                onClick={() => onReview('approve')}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

