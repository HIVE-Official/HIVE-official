import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileLayout, 
  SpaceLayout, 
  FeedLayout, 
  HiveLabLayout, 
  RitualLayout,
  SplitLayout,
  ModalLayout
} from '../../components/shell/page-layouts';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Card } from '../../atomic/molecules/card';

// Mock component for Storybook CSF compliance
const PageLayoutsShell = () => <div>Page Layouts Shell</div>;

const meta: Meta<typeof PageLayoutsShell> = {
  title: '05-Shell/Page Layouts',
  component: PageLayoutsShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Platform page layouts for the 5 core sections: Profile, Spaces, Feed, HiveLAB, and Rituals. Each layout is optimized for its specific use case while maintaining design system consistency.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Mock components for demonstration
const MockHeader = ({ title }: { title: string }) => (
  <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6 mb-6">
    <h1 className="text-2xl font-bold text-hive-text-primary">{title}</h1>
    <p className="text-hive-text-secondary mt-2">Header content area</p>
  </div>
);

const MockCard = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-4 h-full">
    <h3 className="font-semibold text-hive-text-primary mb-2">{title}</h3>
    <div className="text-hive-text-secondary text-sm">
      {children || "Content area"}
    </div>
  </div>
);

export const ProfileLayoutDemo: Story = {
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-6">
      <ProfileLayout
        header={<MockHeader title="Jacob's Campus Dashboard" />}
        quickActions={
          <div className="flex gap-2">
            <Button>Create Tool</Button>
            <Button variant="outline">Join Space</Button>
          </div>
        }
        calendar={<MockCard title="Smart Calendar" />}
        personalTools={<MockCard title="Personal Tools" />}
        spaceMemberships={<MockCard title="My Spaces" />}
        activityFeed={<MockCard title="Recent Activity" />}
      />
    </div>
  ),
};

export const SpaceLayoutDemo: Story = {
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-6">
      <SpaceLayout
        spaceHeader={<MockHeader title="CS 101 Study Group" />}
        pinned={<MockCard title="Pinned Content" />}
        posts={<MockCard title="Posts & Discussions" />}
        events={<MockCard title="Upcoming Events" />}
        toolsStack={<MockCard title="Shared Tools" />}
        chat={<MockCard title="Group Chat" />}
        members={<MockCard title="Members (24)" />}
      />
    </div>
  ),
};

export const FeedLayoutDemo: Story = {
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-6">
      <FeedLayout
        feedHeader={<MockHeader title="Campus Feed" />}
        feedFilters={
          <div className="flex gap-2">
            <Button size="sm">All</Button>
            <Button size="sm" variant="outline">Tools</Button>
            <Button size="sm" variant="outline">Events</Button>
            <Button size="sm" variant="outline">Spaces</Button>
          </div>
        }
        feedContent={
          <div className="space-y-4">
            <MockCard title="Tool Shared: Study Timer" />
            <MockCard title="Event: Design Workshop" />
            <MockCard title="New Member: Sarah J." />
          </div>
        }
        feedSidebar={
          <div className="space-y-4">
            <MockCard title="Trending Tools" />
            <MockCard title="Active Spaces" />
          </div>
        }
      />
    </div>
  ),
};

export const HiveLabLayoutDemo: Story = {
  render: () => (
    <div className="min-h-screen bg-hive-background-primary">
      <HiveLabLayout
        builderHeader={
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-hive-text-primary">HiveLAB Tool Builder</h1>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Preview</Button>
              <Button size="sm">Publish</Button>
            </div>
          </div>
        }
        elementLibrary={<MockCard title="Element Library" />}
        designCanvas={<MockCard title="Design Canvas" />}
        propertiesPanel={<MockCard title="Properties Panel" />}
        previewArea={<MockCard title="Live Preview" />}
      />
    </div>
  ),
};

export const RitualLayoutDemo: Story = {
  render: () => (
    <RitualLayout
      ritualBackground="gradient"
      centered={true}
      maxWidth="4xl"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-hive-text-primary">Welcome to HIVE</h1>
        <p className="text-xl text-hive-text-secondary">
          Your campus social utility platform
        </p>
        <div className="flex justify-center gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </RitualLayout>
  ),
};

export const SplitLayoutDemo: Story = {
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-6">
      <SplitLayout
        splitRatio="1:2"
        leftPanel={<MockCard title="Sidebar Content" />}
        rightPanel={<MockCard title="Main Content Area" />}
      />
    </div>
  ),
};

export const ModalLayoutDemo: Story = {
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-6 relative">
      <MockCard title="Background Content" />
      <ModalLayout
        isOpen={true}
        onClose={() => {}}
        size="md"
        backdrop="blur"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-hive-text-primary">Modal Title</h2>
          <p className="text-hive-text-secondary">
            This is a modal overlay using the ModalLayout component.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </div>
        </div>
      </ModalLayout>
    </div>
  ),
};