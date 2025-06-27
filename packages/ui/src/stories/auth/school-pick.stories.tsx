import type { Meta, StoryObj } from '@storybook/react'
import { SchoolPick, type School } from '../../components/auth/school-pick'

const meta: Meta<typeof SchoolPick> = {
  title: 'Auth/SchoolPick',
  component: SchoolPick,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Enhanced campus selection interface with Framer Motion animations, search functionality, and sticky continue button.'
      }
    }
  },
  argTypes: {
    onSchoolSelect: { action: 'school-selected' },
    onCreateSchool: { action: 'school-created' }
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="min-h-screen bg-background">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

const mockSchools: School[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open',
    isFeatured: true,
    spotsLeft: 347,
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'coming-soon',
    spotsLeft: 3,
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    domain: 'columbia.edu',
    status: 'coming-soon',
    spotsLeft: 3,
  },
  {
    id: 'nyu',
    name: 'New York University',
    domain: 'nyu.edu',
    status: 'waitlist',
    waitlistCount: 156,
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syr.edu',
    status: 'waitlist',
    waitlistCount: 89,
  },
]

export const Default: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: (school: School) => console.log('Selected school:', school),
    onCreateSchool: (schoolName: string) => console.log('Creating school:', schoolName)
  }
}

export const WithOpenSchoolsOnly: Story = {
  args: {
    schools: mockSchools.filter(school => school.status === 'open'),
    onSchoolSelect: (school: School) => console.log('Selected school:', school),
    onCreateSchool: (schoolName: string) => console.log('Creating school:', schoolName)
  }
}

export const WithComingSoonSchoolsOnly: Story = {
  args: {
    schools: mockSchools.filter(school => school.status === 'coming-soon'),
    onSchoolSelect: (school: School) => console.log('Selected school:', school),
    onCreateSchool: (schoolName: string) => console.log('Creating school:', schoolName)
  }
}

export const WithWaitlistSchoolsOnly: Story = {
  args: {
    schools: mockSchools.filter(school => school.status === 'waitlist'),
    onSchoolSelect: (school: School) => console.log('Selected school:', school),
    onCreateSchool: (schoolName: string) => console.log('Creating school:', schoolName)
  }
}

export const EmptyState: Story = {
  args: {
    schools: [],
    onSchoolSelect: (school: School) => console.log('Selected school:', school),
    onCreateSchool: (schoolName: string) => console.log('Creating school:', schoolName)
  }
}

export const WithSearchResults: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: (school: School) => console.log('Selected school:', school),
    onCreateSchool: (schoolName: string) => console.log('Creating school:', schoolName)
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the search functionality and filtered results with smooth animations.'
      }
    }
  }
} 