// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/select'

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' }, // HIVE background
      ],
    },
  },
  argTypes: {},
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

// Brand showcase demonstrating all select variants and features
export const BrandShowcase: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground font-headline">
          HIVE Select Components
        </h3>
        <p className="text-sm text-muted">
          Dark-first select components with HIVE motion timing and monochrome aesthetic
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Basic Select</label>
          <Select>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grouped Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Grouped Select</label>
          <Select>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a space type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Academic</SelectLabel>
                <SelectItem value="study-group">Study Group</SelectItem>
                <SelectItem value="project-team">Project Team</SelectItem>
                <SelectItem value="research">Research</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Social</SelectLabel>
                <SelectItem value="club">Club</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="hangout">Hangout</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Disabled State */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Disabled Select</label>
          <Select disabled>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Full Width */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Width Select</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your university" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stanford">Stanford University</SelectItem>
              <SelectItem value="berkeley">UC Berkeley</SelectItem>
              <SelectItem value="ucla">UCLA</SelectItem>
              <SelectItem value="usc">USC</SelectItem>
              <SelectItem value="mit">MIT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
}

// Real-world examples showing practical usage in HIVE app
export const SpaceSettings: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6 p-6 bg-surface-01 rounded-lg border border-border">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground font-headline">
          Space Settings
        </h3>
        <p className="text-sm text-muted">
          Configure your study space preferences
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Privacy Level</label>
          <Select defaultValue="invite-only">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">🌍 Public - Anyone can join</SelectItem>
              <SelectItem value="university">🏛️ University only</SelectItem>
              <SelectItem value="invite-only">🔒 Invite only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Study Focus</label>
          <Select defaultValue="computer-science">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>STEM</SelectLabel>
                <SelectItem value="computer-science">💻 Computer Science</SelectItem>
                <SelectItem value="mathematics">📐 Mathematics</SelectItem>
                <SelectItem value="engineering">⚙️ Engineering</SelectItem>
                <SelectItem value="physics">🔬 Physics</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Liberal Arts</SelectLabel>
                <SelectItem value="literature">📚 Literature</SelectItem>
                <SelectItem value="history">🏛️ History</SelectItem>
                <SelectItem value="psychology">🧠 Psychology</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Meeting Schedule</label>
          <Select defaultValue="flexible">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">📅 Daily</SelectItem>
              <SelectItem value="weekly">📆 Weekly</SelectItem>
              <SelectItem value="biweekly">🗓️ Bi-weekly</SelectItem>
              <SelectItem value="flexible">⏰ Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground font-headline">
          Profile Information
        </h3>
        <p className="text-sm text-muted">
          Complete your HIVE profile
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Graduation Year</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
              <SelectItem value="2028">2028</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Study Preferences</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="How do you prefer to study?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quiet">🤫 Quiet environments</SelectItem>
              <SelectItem value="collaborative">👥 Group discussions</SelectItem>
              <SelectItem value="music">🎵 With background music</SelectItem>
              <SelectItem value="structured">📋 Structured sessions</SelectItem>
              <SelectItem value="flexible">🌊 Go with the flow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Availability</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="When are you most active?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">🌅 Early morning (6-10 AM)</SelectItem>
              <SelectItem value="midday">☀️ Midday (10 AM-2 PM)</SelectItem>
              <SelectItem value="afternoon">🌤️ Afternoon (2-6 PM)</SelectItem>
              <SelectItem value="evening">🌙 Evening (6-10 PM)</SelectItem>
              <SelectItem value="night">🌃 Night owl (10 PM+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
}
