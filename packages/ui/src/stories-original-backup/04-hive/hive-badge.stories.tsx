import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveBadge,
  FreshmanBadge,
  ToolLegendBadge,
  GrindModeBadge,
  DeansListBadge,
  AllNighterBadge,
  TAApprovedBadge,
  CampusLegendBadge,
  FinalsWeekBadge
} from '../../components/hive-badge';
import { 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  Sparkles,
  Trophy,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Coffee,
  Code
} from 'lucide-react';

const meta: Meta<typeof HiveBadge> = {
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
type Story = StoryObj<typeof HiveBadge>;

export const Default: Story = {
  args: {
    variant: 'course-tag',
    children: 'CS 101',
  },
};

export const AcademicYear: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveBadge variant="freshman">
        <GraduationCap className="w-3 h-3 mr-1" />
        Freshman
      </HiveBadge>
      <HiveBadge variant="sophomore">Sophomore</HiveBadge>
      <HiveBadge variant="junior">Junior</HiveBadge>
      <HiveBadge variant="senior">
        <Crown className="w-3 h-3 mr-1" />
        Senior
      </HiveBadge>
      <HiveBadge variant="grad">
        <BookOpen className="w-3 h-3 mr-1" />
        Graduate
      </HiveBadge>
      <HiveBadge variant="phd">
        <Star className="w-3 h-3 mr-1" />
        PhD
      </HiveBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Academic year badges with progressive luxury styling from freshman to PhD'
      }
    }
  }
};

export const ToolMastery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveBadge variant="tool-newbie">
        <Code className="w-3 h-3 mr-1" />
        Tool Newbie
      </HiveBadge>
      <HiveBadge variant="tool-builder">Tool Builder</HiveBadge>
      <HiveBadge variant="tool-expert">Tool Expert</HiveBadge>
      <HiveBadge variant="tool-legend">
        <Zap className="w-3 h-3 mr-1" />
        Tool Legend
      </HiveBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tool building mastery progression with increasing gold accent'
      }
    }
  }
};

export const StudyPatterns: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveBadge variant="night-owl">
        <Clock className="w-3 h-3 mr-1" />
        Night Owl
      </HiveBadge>
      <HiveBadge variant="early-bird">
        <Coffee className="w-3 h-3 mr-1" />
        Early Bird
      </HiveBadge>
      <HiveBadge variant="grind-mode">
        <Zap className="w-3 h-3 mr-1" />
        Grind Mode
      </HiveBadge>
      <HiveBadge variant="study-streak">
        <Trophy className="w-3 h-3 mr-1" />
        Study Streak
      </HiveBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Study pattern badges reflecting different learning styles and habits'
      }
    }
  }
};

export const Achievements: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Academic Achievements</h4>
        <div className="flex flex-wrap gap-3">
          <HiveBadge variant="deans-list">
            <Trophy className="w-3 h-3 mr-1" />
            Dean's List
          </HiveBadge>
          <HiveBadge variant="honors">
            <Star className="w-3 h-3 mr-1" />
            Honors
          </HiveBadge>
          <HiveBadge variant="perfect-gpa">
            <Crown className="w-3 h-3 mr-1" />
            Perfect GPA
          </HiveBadge>
          <HiveBadge variant="thesis-defense">Thesis Defense</HiveBadge>
          <HiveBadge variant="published">Published</HiveBadge>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Elite Status</h4>
        <div className="flex flex-wrap gap-3">
          <HiveBadge variant="ta-approved">
            <CheckCircle className="w-3 h-3 mr-1" />
            TA Approved
          </HiveBadge>
          <HiveBadge variant="prof-favorite">
            <Star className="w-3 h-3 mr-1" />
            Prof Favorite
          </HiveBadge>
          <HiveBadge variant="tools-guru">
            <Code className="w-3 h-3 mr-1" />
            Tools Guru
          </HiveBadge>
          <HiveBadge variant="campus-legend">
            <Crown className="w-3 h-3 mr-1" />
            Campus Legend
          </HiveBadge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Achievement badges with luxury gold styling for academic and social recognition'
      }
    }
  }
};

export const CampusLife: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Current Activity</h4>
        <div className="flex flex-wrap gap-3">
          <HiveBadge variant="in-lab">
            <Code className="w-3 h-3 mr-1" />
            In Lab
          </HiveBadge>
          <HiveBadge variant="office-hours">Office Hours</HiveBadge>
          <HiveBadge variant="cramming">
            <BookOpen className="w-3 h-3 mr-1" />
            Cramming
          </HiveBadge>
          <HiveBadge variant="building-tools">
            <Zap className="w-3 h-3 mr-1" />
            Building Tools
          </HiveBadge>
          <HiveBadge variant="debugging">Debugging</HiveBadge>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Urgent States</h4>
        <div className="flex flex-wrap gap-3">
          <HiveBadge variant="finals-week">
            <AlertCircle className="w-3 h-3 mr-1" />
            Finals Week
          </HiveBadge>
          <HiveBadge variant="midterm-szn">Midterm Season</HiveBadge>
          <HiveBadge variant="project-due">
            <Clock className="w-3 h-3 mr-1" />
            Project Due
          </HiveBadge>
          <HiveBadge variant="all-nighter">All-Nighter</HiveBadge>
          <HiveBadge variant="office-hours-hero">
            <Trophy className="w-3 h-3 mr-1" />
            Office Hours Hero
          </HiveBadge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus life activity badges reflecting real student experiences and study states'
      }
    }
  }
};

export const PreBuiltComponents: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">Pre-built Badge Components</h3>
        <p className="text-[var(--hive-text-secondary)]">Ready-to-use badges for common campus scenarios</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-[var(--hive-text-primary)]">Academic Year</h4>
          <div className="flex flex-wrap gap-3">
            <FreshmanBadge />
            <DeansListBadge />
            <CampusLegendBadge />
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-[var(--hive-text-primary)]">Study Modes</h4>
          <div className="flex flex-wrap gap-3">
            <GrindModeBadge />
            <AllNighterBadge />
            <FinalsWeekBadge />
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-[var(--hive-text-primary)]">Recognition</h4>
          <div className="flex flex-wrap gap-3">
            <ToolLegendBadge count={12} />
            <TAApprovedBadge />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pre-built badge components for quick implementation of common campus scenarios'
      }
    }
  }
};

export const SizesAndShapes: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Badge Sizes</h4>
        <div className="flex items-center gap-4">
          <HiveBadge variant="deans-list" size="xs">XS</HiveBadge>
          <HiveBadge variant="deans-list" size="sm">Small</HiveBadge>
          <HiveBadge variant="deans-list" size="default">Default</HiveBadge>
          <HiveBadge variant="deans-list" size="lg">Large</HiveBadge>
          <HiveBadge variant="deans-list" size="xl">Extra Large</HiveBadge>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Badge Shapes</h4>
        <div className="flex items-center gap-4">
          <HiveBadge variant="tool-legend" shape="pill">Pill Shape</HiveBadge>
          <HiveBadge variant="tool-legend" shape="rounded">Rounded</HiveBadge>
          <HiveBadge variant="tool-legend" shape="square">Square</HiveBadge>
          <HiveBadge variant="tool-legend" shape="sharp">Sharp</HiveBadge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size and shape variants for different design contexts'
      }
    }
  }
};

export const CampusProfileDemo: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Users className="w-8 h-8 text-[var(--hive-text-primary)]" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Sarah Chen</h3>
        <p className="text-[var(--hive-text-secondary)]">Computer Science • Class of 2025</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2">Academic Status</h4>
          <div className="flex flex-wrap gap-2">
            <HiveBadge variant="senior">Senior</HiveBadge>
            <HiveBadge variant="deans-list">Dean's List</HiveBadge>
            <HiveBadge variant="ta-approved">TA Approved</HiveBadge>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2">Tool Building</h4>
          <div className="flex flex-wrap gap-2">
            <HiveBadge variant="tool-legend">Tool Legend</HiveBadge>
            <HiveBadge variant="building-tools">Building Tools</HiveBadge>
            <HiveBadge variant="tools-guru">Tools Guru</HiveBadge>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2">Current State</h4>
          <div className="flex flex-wrap gap-2">
            <HiveBadge variant="finals-week">Finals Week</HiveBadge>
            <HiveBadge variant="cramming">Cramming</HiveBadge>
            <HiveBadge variant="office-hours-hero">Office Hours Hero</HiveBadge>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            <HiveBadge variant="course-tag" size="sm">CS 361</HiveBadge>
            <HiveBadge variant="major-tag" size="sm">Computer Science</HiveBadge>
            <HiveBadge variant="skill-tag" size="sm">React</HiveBadge>
            <HiveBadge variant="tool-tag" size="sm">GPA Calculator</HiveBadge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic student profile showing how multiple badge types work together to tell a story'
      }
    }
  }
};