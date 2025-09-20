import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  UBAdminMetricsOverview, 
  UBModerationQueue,
  UBAdminQuickActions,
  UBCampusMetrics,
  UBModerationItem
} from './ub-admin-dashboard';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof UBAdminMetricsOverview> = {
  title: 'Admin System/UB Campus Admin Dashboard',
  component: UBAdminMetricsOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# UB Campus Admin Dashboard

The UB Campus Admin Dashboard provides comprehensive oversight and management tools specifically designed for University at Buffalo campus administrators. This system enables effective governance of the HIVE platform within the UB community.

## Key Features

- **UB-Specific Metrics**: Student demographics, campus spaces, dorm analytics, academic departments
- **Content Moderation**: Campus-appropriate content review with UB context (buildings, dorms, courses)
- **System Health**: Real-time monitoring of platform performance and costs
- **Quick Actions**: Campus notifications, data exports, security reports, system maintenance
- **Campus Safety**: Tools for managing campus-wide communications and emergency responses

## Admin Capabilities

### Student Management
- Track verified @buffalo.edu accounts
- Monitor student engagement by class year and major
- Manage new student onboarding and verification

### Campus Content Oversight
- Review space creation requests for campus appropriateness
- Moderate tools and content for academic standards
- Ensure compliance with university policies

### System Operations
- Monitor platform costs and performance
- Generate reports for university administration
- Maintain data backups and security protocols

## Usage in HIVE Platform

This dashboard serves as the central command center for UB campus administration, allowing:
1. Daily monitoring of campus platform health
2. Proactive content moderation and policy enforcement
3. Data-driven decision making for campus digital strategy
4. Rapid response to campus incidents or policy changes
5. Regular reporting to university leadership

The goal is providing administrators with the tools they need to maintain a safe, productive digital campus environment.
        `
      }
    }
  },
  argTypes: {
    // No direct interactions with metrics overview
  }
};

export default meta;
type Story = StoryObj<typeof UBAdminMetricsOverview>;

// =============================================================================
// MOCK DATA FOR UB CAMPUS ADMIN
// =============================================================================

const mockUBCampusMetrics: UBCampusMetrics = {
  platform: {
    name: 'HIVE Campus',
    version: '1.2.4',
    environment: 'production',
    university: 'University at Buffalo',
    campus: 'All Campuses'
  },
  students: {
    total: 8947,
    active: 6234,
    newThisWeek: 127,
    byYear: {
      'Freshman': 2345,
      'Sophomore': 2156,
      'Junior': 1987,
      'Senior': 1689,
      'Graduate': 770
    },
    byMajor: {
      'Computer Science': 1456,
      'Engineering': 1234,
      'Business': 987,
      'Medicine': 654,
      'Liberal Arts': 543,
      'Other': 4073
    },
    byDorm: {
      'Ellicott Complex': 1247,
      'Governors Complex': 892,
      'Creekside Village': 567,
      'South Campus': 445,
      'Off-Campus': 5796
    },
    verified: 8234,
    pendingVerification: 713
  },
  spaces: {
    total: 156,
    active: 134,
    dormant: 18,
    needsModeration: 4,
    byCategory: {
      'Academic': { count: 45, members: 2345 },
      'Residential': { count: 38, members: 1876 },
      'Social': { count: 29, members: 1543 },
      'Athletic': { count: 22, members: 987 },
      'Cultural': { count: 22, members: 765 }
    },
    totalMembers: 7516,
    averageEngagement: 67
  },
  tools: {
    total: 234,
    active: 189,
    pendingReview: 12,
    deployments: 156,
    byCategory: {
      'Study Tools': 67,
      'Campus Life': 45,
      'Social': 38,
      'Academic': 34,
      'Coordination': 29,
      'Other': 21
    },
    usage: {
      dailyActive: 1234,
      weeklyActive: 3456,
      monthlyActive: 5678
    }
  },
  rituals: {
    total: 12,
    active: 3,
    completed: 7,
    participation: {
      current: 2847,
      total: 8947,
      rate: 32
    },
    campusImpact: 78
  },
  content: {
    posts: 12456,
    comments: 34567,
    reported: 23,
    moderated: 156,
    flagged: 45,
    approved: 12234
  },
  system: {
    status: 'healthy',
    uptime: 2678400, // 31 days
    performance: {
      responseTime: 245,
      errorRate: 0.02,
      throughput: 1234
    },
    storage: {
      used: 234,
      total: 500,
      percentage: 47
    },
    costs: {
      monthly: 1245,
      daily: 42,
      trend: 'stable'
    }
  }
};

const mockModerationItems: UBModerationItem[] = [
  {
    id: 'mod-1',
    type: 'space',
    title: 'Ellicott East Floor 3 Study Group',
    description: 'Request to create a private study space for residents of Ellicott East 3rd floor',
    author: {
      id: 'user-1',
      name: 'Sarah Chen',
      handle: 'schen24',
      email: 'schen24@buffalo.edu'
    },
    reason: 'New space creation requires administrative approval for residential buildings',
    severity: 'low',
    status: 'pending',
    createdAt: '2024-08-14T10:30:00Z',
    campusContext: {
      building: 'Ellicott Complex',
      dorm: 'Ellicott East',
      department: 'Residential Life'
    }
  },
  {
    id: 'mod-2',
    type: 'tool',
    title: 'CSE 331 Grade Calculator',
    description: 'Tool for calculating final grades in Data Structures course with UB grading scale',
    author: {
      id: 'user-2',
      name: 'Alex Rodriguez',
      handle: 'alexr24',
      email: 'alexr24@buffalo.edu'
    },
    reportedBy: {
      id: 'user-3',
      name: 'Prof. Johnson',
      handle: 'profj'
    },
    reason: 'Tool may violate academic integrity policies by providing grade calculations',
    severity: 'medium',
    status: 'pending',
    createdAt: '2024-08-14T08:15:00Z',
    campusContext: {
      department: 'Computer Science & Engineering',
      course: 'CSE 331'
    }
  },
  {
    id: 'mod-3',
    type: 'post',
    title: 'Controversial Political Post',
    description: 'Post discussing campus political issues with potentially inflammatory content',
    author: {
      id: 'user-4',
      name: 'Anonymous User',
      handle: 'student123',
      email: 'student123@buffalo.edu'
    },
    reportedBy: {
      id: 'user-5',
      name: 'Maya Patel',
      handle: 'mpatel24'
    },
    reason: 'Content reported for potential policy violations and inflammatory language',
    severity: 'high',
    status: 'pending',
    createdAt: '2024-08-14T07:45:00Z',
    campusContext: {
      building: 'Student Union'
    }
  },
  {
    id: 'mod-4',
    type: 'user',
    title: 'Spam Account Activity',
    description: 'User account showing patterns of automated posting and spam behavior',
    author: {
      id: 'user-6',
      name: 'Suspicious Account',
      handle: 'spam_user',
      email: 'fake@buffalo.edu'
    },
    reason: 'Account flagged by automated systems for spam behavior and suspicious activity patterns',
    severity: 'critical',
    status: 'pending',
    createdAt: '2024-08-14T06:20:00Z',
    campusContext: {}
  }
];

// =============================================================================
// ADMIN METRICS OVERVIEW STORIES
// =============================================================================

export const CompleteDashboard: Story = {
  args: {
    metrics: mockUBCampusMetrics
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete UB campus admin dashboard showing all key metrics, student demographics, and system health.'
      }
    }
  }
};

export const DevelopmentEnvironment: Story = {
  args: {
    metrics: {
      ...mockUBCampusMetrics,
      platform: {
        ...mockUBCampusMetrics.platform,
        environment: 'development'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Admin dashboard in development environment with different visual indicators.'
      }
    }
  }
};

export const SystemWarningState: Story = {
  args: {
    metrics: {
      ...mockUBCampusMetrics,
      system: {
        ...mockUBCampusMetrics.system,
        status: 'warning',
        performance: {
          responseTime: 1245,
          errorRate: 0.05,
          throughput: 567
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing system warning state with elevated response times and error rates.'
      }
    }
  }
};

export const HighModerationLoad: Story = {
  args: {
    metrics: {
      ...mockUBCampusMetrics,
      spaces: {
        ...mockUBCampusMetrics.spaces,
        needsModeration: 15
      },
      tools: {
        ...mockUBCampusMetrics.tools,
        pendingReview: 34
      },
      content: {
        ...mockUBCampusMetrics.content,
        reported: 67,
        flagged: 123
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard during high moderation load with many pending items requiring admin attention.'
      }
    }
  }
};

// =============================================================================
// MODERATION QUEUE STORIES
// =============================================================================

export const ModerationQueue: StoryObj<typeof UBModerationQueue> = {
  render: () => (
    <UBModerationQueue
      items={mockModerationItems}
      onApprove={action('approve-item')}
      onReject={action('reject-item')}
      onEscalate={action('escalate-item')}
      onView={action('view-item')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Moderation queue showing various types of content requiring admin review with UB campus context.'
      }
    }
  }
};

export const EmptyModerationQueue: StoryObj<typeof UBModerationQueue> = {
  render: () => (
    <UBModerationQueue
      items={[]}
      onApprove={action('approve-empty')}
      onReject={action('reject-empty')}
      onEscalate={action('escalate-empty')}
      onView={action('view-empty')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty moderation queue state when no items require admin attention.'
      }
    }
  }
};

export const CriticalModerationItems: StoryObj<typeof UBModerationQueue> = {
  render: () => (
    <UBModerationQueue
      items={mockModerationItems.filter(item => item.severity === 'critical')}
      onApprove={action('approve-critical')}
      onReject={action('reject-critical')}
      onEscalate={action('escalate-critical')}
      onView={action('view-critical')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Moderation queue filtered to show only critical items requiring immediate attention.'
      }
    }
  }
};

// =============================================================================
// QUICK ACTIONS STORIES
// =============================================================================

export const AdminQuickActions: StoryObj<typeof UBAdminQuickActions> = {
  render: () => (
    <UBAdminQuickActions
      onSendCampusNotification={action('send-notification')}
      onExportUserData={action('export-data')}
      onGenerateReport={action('generate-report')}
      onSystemMaintenance={action('system-maintenance')}
      onBackupData={action('backup-data')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Quick action panel for common admin tasks like notifications, reports, and system maintenance.'
      }
    }
  }
};

// =============================================================================
// CAMPUS SCENARIO STORIES
// =============================================================================

export const OrientationWeekDashboard: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Admin Dashboard During Orientation Week 🎓
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          High activity period with new student onboarding and increased platform usage
        </p>
      </div>
      
      <UBAdminMetricsOverview
        metrics={{
          ...mockUBCampusMetrics,
          students: {
            ...mockUBCampusMetrics.students,
            newThisWeek: 456,
            pendingVerification: 234,
            active: 7234
          },
          spaces: {
            ...mockUBCampusMetrics.spaces,
            needsModeration: 12
          },
          content: {
            ...mockUBCampusMetrics.content,
            posts: 15678,
            reported: 34
          }
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Admin dashboard during orientation week showing increased activity and new student verification load.'
      }
    }
  }
};

export const FinalsWeekDashboard: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Admin Dashboard During Finals Week 📚
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Peak usage period with high stress and increased need for moderation
        </p>
      </div>
      
      <UBAdminMetricsOverview
        metrics={{
          ...mockUBCampusMetrics,
          tools: {
            ...mockUBCampusMetrics.tools,
            usage: {
              dailyActive: 2345,
              weeklyActive: 6789,
              monthlyActive: 8947
            },
            pendingReview: 23
          },
          rituals: {
            ...mockUBCampusMetrics.rituals,
            active: 1,
            participation: {
              current: 4567,
              total: 8947,
              rate: 51
            }
          },
          system: {
            ...mockUBCampusMetrics.system,
            performance: {
              responseTime: 345,
              errorRate: 0.03,
              throughput: 2345
            }
          }
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Admin dashboard during finals week showing peak tool usage and system load.'
      }
    }
  }
};

export const SystemMaintenanceMode: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          System Maintenance Period 🔧
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Scheduled maintenance with reduced system performance
        </p>
      </div>
      
      <UBAdminMetricsOverview
        metrics={{
          ...mockUBCampusMetrics,
          system: {
            ...mockUBCampusMetrics.system,
            status: 'warning',
            performance: {
              responseTime: 567,
              errorRate: 0.01,
              throughput: 234
            }
          },
          students: {
            ...mockUBCampusMetrics.students,
            active: 3456
          }
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Admin dashboard during system maintenance showing reduced performance and user activity.'
      }
    }
  }
};

// =============================================================================
// COMPLETE ADMIN WORKFLOW STORIES
// =============================================================================

export const CompleteAdminWorkflow: Story = {
  render: () => {
    const [metrics, setMetrics] = React.useState(mockUBCampusMetrics);
    const [moderationItems, setModerationItems] = React.useState(mockModerationItems);
    
    const handleApproval = (itemId: string) => {
      setModerationItems(prev => prev.filter(item => item.id !== itemId));
      setMetrics(prev => ({
        ...prev,
        content: {
          ...prev.content,
          approved: prev.content.approved + 1,
          reported: Math.max(0, prev.content.reported - 1)
        }
      }));
      action('workflow-approve')(itemId);
    };
    
    const handleRejection = (itemId: string) => {
      setModerationItems(prev => prev.filter(item => item.id !== itemId));
      setMetrics(prev => ({
        ...prev,
        content: {
          ...prev.content,
          moderated: prev.content.moderated + 1,
          reported: Math.max(0, prev.content.reported - 1)
        }
      }));
      action('workflow-reject')(itemId);
    };
    
    return (
      <div className="space-y-6">
        <div className="text-center pb-6">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            Interactive Admin Workflow
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Try approving or rejecting moderation items to see real-time dashboard updates
          </p>
        </div>
        
        <UBAdminMetricsOverview metrics={metrics} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UBModerationQueue
            items={moderationItems}
            onApprove={handleApproval}
            onReject={handleRejection}
            onEscalate={action('workflow-escalate')}
            onView={action('workflow-view')}
          />
          
          <UBAdminQuickActions
            onSendCampusNotification={action('workflow-notification')}
            onExportUserData={action('workflow-export')}
            onGenerateReport={action('workflow-report')}
            onSystemMaintenance={action('workflow-maintenance')}
            onBackupData={action('workflow-backup')}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete interactive admin workflow showing real-time updates as moderation actions are taken.'
      }
    }
  }
};

// =============================================================================
// MOBILE RESPONSIVE STORIES
// =============================================================================

export const MobileAdminDashboard: Story = {
  args: {
    metrics: mockUBCampusMetrics
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized admin dashboard with stacked layout and touch-friendly interactions.'
      }
    }
  }
};

export const MobileModerationQueue: StoryObj<typeof UBModerationQueue> = {
  render: () => (
    <UBModerationQueue
      items={mockModerationItems.slice(0, 2)}
      onApprove={action('mobile-approve')}
      onReject={action('mobile-reject')}
      onEscalate={action('mobile-escalate')}
      onView={action('mobile-view')}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile moderation queue with compact card layout and thumb-friendly action buttons.'
      }
    }
  }
};