import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCard } from '../../../components/spaces/space-card';

const meta: Meta<typeof SpaceCard> = {
  title: '🏢 Spaces/Discovery/SpaceCard',
  component: SpaceCard,
  parameters: {
    docs: {
      description: {
        component: 'Individual space cards for discovery and browsing.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceCard>;

export const Default: Story = {
  args: {
    space: {
      id: 'cs-101-fall-2024',
      name: 'CS 101: Intro to Programming',
      description: 'Study group and resource sharing for Computer Science 101',
      memberCount: 47,
      category: 'Academic',
      isPrivate: false,
      university: 'University at Buffalo',
    },
  },
};

export const DormFloor: Story = {
  args: {
    space: {
      id: 'governors-5th-floor',
      name: 'Governors 5th Floor',
      description: 'Floor community for coordinating events, study sessions, and building friendships',
      memberCount: 28,
      category: 'Residence Hall',
      isPrivate: true,
      university: 'University at Buffalo',
      tags: ['dorm', 'community', 'events'],
    },
  },
};

export const StudentClub: Story = {
  args: {
    space: {
      id: 'ub-robotics-club',
      name: 'UB Robotics Club',
      description: 'Building robots, competing in tournaments, and sharing engineering knowledge',
      memberCount: 82,
      category: 'Student Organization',
      isPrivate: false,
      university: 'University at Buffalo',
      tags: ['robotics', 'engineering', 'competition'],
      verified: true,
    },
  },
};

export const StudyGroup: Story = {
  args: {
    space: {
      id: 'calc-2-study-group',
      name: 'Calc 2 Study Group',
      description: 'Weekly study sessions, homework help, and exam prep for Calculus 2',
      memberCount: 15,
      category: 'Study Group',
      isPrivate: false,
      university: 'University at Buffalo',
      tags: ['mathematics', 'study', 'tutoring'],
      meetingTime: 'Wednesdays 7pm',
    },
  },
};

export const UBSpacesGrid: Story = {
  name: 'UB Spaces Grid',
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <SpaceCard
        space={{
          id: 'cs-department',
          name: 'UB Computer Science',
          description: 'Official space for CS majors, announcements, and department updates',
          memberCount: 312,
          category: 'Department',
          isPrivate: false,
          university: 'University at Buffalo',
          verified: true,
          tags: ['computer-science', 'official'],
        }}
      />
      
      <SpaceCard
        space={{
          id: 'ellicott-complex',
          name: 'Ellicott Complex',
          description: 'Connecting all Ellicott residents for events and community building',
          memberCount: 156,
          category: 'Residence Hall',
          isPrivate: true,
          university: 'University at Buffalo',
          tags: ['dorm', 'community'],
        }}
      />
      
      <SpaceCard
        space={{
          id: 'pre-med-society',
          name: 'Pre-Med Society',
          description: 'Supporting pre-medical students with resources, advice, and connections',
          memberCount: 89,
          category: 'Student Organization',
          isPrivate: false,
          university: 'University at Buffalo',
          verified: true,
          tags: ['pre-med', 'healthcare'],
        }}
      />
      
      <SpaceCard
        space={{
          id: 'intro-biology-study',
          name: 'Intro Biology Study Hub',
          description: 'Study materials, practice tests, and peer tutoring for BIO 101',
          memberCount: 67,
          category: 'Study Group',
          isPrivate: false,
          university: 'University at Buffalo',
          tags: ['biology', 'study', 'tutoring'],
        }}
      />
      
      <SpaceCard
        space={{
          id: 'ub-gaming-lounge',
          name: 'UB Gaming Lounge',
          description: 'Connecting gamers across campus for tournaments and casual play',
          memberCount: 203,
          category: 'Interest Group',
          isPrivate: false,
          university: 'University at Buffalo',
          tags: ['gaming', 'esports', 'tournaments'],
        }}
      />
      
      <SpaceCard
        space={{
          id: 'marketing-club',
          name: 'UB Marketing Club',
          description: 'Professional development, networking, and real-world marketing experience',
          memberCount: 94,
          category: 'Student Organization',
          isPrivate: false,
          university: 'University at Buffalo',
          verified: true,
          tags: ['marketing', 'business', 'networking'],
        }}
      />
    </div>
  ),
};