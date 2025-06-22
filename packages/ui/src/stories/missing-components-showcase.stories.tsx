import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";
import {
  ProfileHeader,
  AcademicSection,
  BuilderDashboard,
  RitualTimer,
  CategoryGrid,
  TemplateSelector,
} from "../components";
import { TopStrip, type TopStripTile } from "../components/feed/top-strip";
import { Crown, Users, GraduationCap } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "HIVE/Missing Components Showcase",
  component: Button,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample data
const sampleUser = {
  id: "user1",
  displayName: "Sarah Chen",
  handle: "sarahc",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
  campusId: "ub",
  campusName: "University at Buffalo",
  major: "Computer Science",
  graduationYear: 2025,
  isBuilder: true,
  builderApprovedAt: new Date("2024-09-15"),
  isVerified: true,
};

const sampleAcademicInfo = {
  major: "Computer Science",
  graduationYear: 2025,
  classStanding: "senior" as const,
  academicInterests: ["Machine Learning", "Web Development", "UI/UX Design"],
  autoJoinedSpaces: [
    { id: "cs-major", name: "CS Major Space", memberCount: 247 },
    { id: "cs-seniors", name: "CS Class of 2025", memberCount: 89 },
  ],
};

const sampleBuilderStats = {
  isBuilder: true,
  builderApprovedAt: new Date("2024-09-15"),
  toolsCreated: 5,
  totalEngagement: 1247,
  totalViews: 3891,
  recentTools: [
    {
      id: "poll1",
      name: "Dining Hall Survey",
      type: "poll" as const,
      totalViews: 892,
      totalInteractions: 234,
      createdAt: new Date("2024-12-15"),
      isPublished: true,
    },
    {
      id: "rsvp1",
      name: "Study Group RSVP",
      type: "rsvp" as const,
      totalViews: 156,
      totalInteractions: 45,
      createdAt: new Date("2024-12-10"),
      isPublished: true,
    },
  ],
  achievements: ["First Tool", "100+ Interactions", "Community Builder"],
};

const sampleTopStripTiles: TopStripTile[] = [
  {
    id: "ritual1",
    type: "ritual_countdown",
    priority: 100,
    data: {
      title: "First Light Ritual",
      description: "Share your first post to unlock emoji reactions",
    },
    expiresAt: new Date(Date.now() + 86400000),
    campusId: "ub",
  },
  {
    id: "space1",
    type: "space_opening",
    priority: 90,
    data: {
      title: "Greek Life Spaces Opening",
      description: "New fraternities and sororities now available",
    },
    expiresAt: new Date(Date.now() + 172800000),
    campusId: "ub",
  },
  {
    id: "tool1",
    type: "tool_reveal",
    priority: 80,
    data: {
      title: "New Poll Tool Available",
      description: "Create interactive polls for your community",
    },
    expiresAt: new Date(Date.now() + 259200000),
    campusId: "ub",
  },
];

const sampleCategories = [
  {
    id: "academics" as const,
    name: "Academic Spaces",
    description:
      "Connect with classmates in your major, courses, and academic interests.",
    joinType: "auto_join" as const,
    requiresBuilder: false,
    builderApproved: true,
    memberCount: 1247,
    isAutoJoined: true,
    autoJoinInfo: "CS Major",
  },
  {
    id: "residential" as const,
    name: "Residential",
    description: "Your dorm floor and residential community connections.",
    joinType: "auto_join" as const,
    requiresBuilder: false,
    builderApproved: true,
    memberCount: 89,
    isAutoJoined: true,
    autoJoinInfo: "Ellicott Complex",
  },
  {
    id: "student_orgs" as const,
    name: "Student Organizations",
    description: "Join clubs, societies, and student-run organizations.",
    joinType: "open" as const,
    requiresBuilder: false,
    builderApproved: true,
    memberCount: 2341,
  },
  {
    id: "greek_life" as const,
    name: "Greek Life",
    description: "Fraternities and sororities with exclusive member access.",
    joinType: "invite_only" as const,
    requiresBuilder: true,
    builderApproved: false,
    memberCount: 156,
  },
  {
    id: "university_orgs" as const,
    name: "University Organizations",
    description: "Official university departments and faculty-managed spaces.",
    joinType: "faculty_controlled" as const,
    requiresBuilder: true,
    builderApproved: true,
    memberCount: 445,
  },
];

export const ProfileComponents: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
          Profile Header
        </h2>
        <ProfileHeader
          user={sampleUser}
          isOwner={true}
          onEditProfile={() => console.log("Edit profile")}
          onSettings={() => console.log("Settings")}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
          Academic Section
        </h2>
        <AcademicSection
          academicInfo={sampleAcademicInfo}
          isOwner={true}
          onEdit={() => console.log("Edit academic info")}
          onSpaceClick={(spaceId) => console.log("Navigate to space:", spaceId)}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
          Builder Dashboard
        </h2>
        <BuilderDashboard
          builderStats={sampleBuilderStats}
          isOwner={true}
          onCreateTool={() => console.log("Create tool")}
          onViewTool={(toolId) => console.log("View tool:", toolId)}
          onViewHiveLAB={() => console.log("View HiveLAB")}
        />
      </div>
    </div>
  ),
};

export const FeedComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
          Top Strip System Rail
        </h2>
        <TopStrip
          tiles={sampleTopStripTiles}
          onTileClick={(tile) => console.log("Tile clicked:", tile)}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
          Ritual Timer
        </h2>
        <div className="max-w-md">
          <RitualTimer
            ritualId="ritual1"
            title="First Light Ritual"
            description="Share your first post on HIVE to unlock emoji reactions for the entire campus community."
            startTime={new Date(Date.now() + 3600000)} // Starts in 1 hour
            endTime={new Date(Date.now() + 90000000)} // Ends in 25 hours
            participantCount={47}
            participantGoal={100}
            onJoinRitual={() => console.log("Join ritual")}
          />
        </div>
      </div>
    </div>
  ),
};

export const SpaceComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
          Category Grid
        </h2>
        <CategoryGrid
          categories={sampleCategories}
          onCategoryClick={(categoryId) =>
            console.log("Category clicked:", categoryId)
          }
        />
      </div>
    </div>
  ),
};

export const HiveLABComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
          Template Selector
        </h2>
        <TemplateSelector
          onSelectTemplate={(templateId) =>
            console.log("Template selected:", templateId)
          }
        />
      </div>
    </div>
  ),
};

export const AllComponents: Story = {
  render: () => (
    <div className="space-y-12">
      {/* Feed Components */}
      <section>
        <h1 className="text-2xl font-bold text-text-primary mb-6 font-display">
          Feed & Ritual Components
        </h1>
        <div className="space-y-6">
          <TopStrip
            tiles={sampleTopStripTiles}
            onTileClick={(tile) => console.log("Tile clicked:", tile)}
          />
          <div className="max-w-md">
            <RitualTimer
              ritualId="ritual1"
              title="First Light Ritual"
              description="Share your first post on HIVE to unlock emoji reactions."
              startTime={new Date(Date.now() + 3600000)}
              endTime={new Date(Date.now() + 90000000)}
              participantCount={47}
              participantGoal={100}
              onJoinRitual={() => console.log("Join ritual")}
            />
          </div>
        </div>
      </section>

      {/* Profile Components */}
      <section>
        <h1 className="text-2xl font-bold text-text-primary mb-6 font-display">
          Profile Components
        </h1>
        <div className="space-y-6 max-w-4xl">
          <ProfileHeader
            user={sampleUser}
            isOwner={true}
            onEditProfile={() => console.log("Edit profile")}
            onSettings={() => console.log("Settings")}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AcademicSection
              academicInfo={sampleAcademicInfo}
              isOwner={true}
              onEdit={() => console.log("Edit academic info")}
              onSpaceClick={(spaceId) =>
                console.log("Navigate to space:", spaceId)
              }
            />
            <BuilderDashboard
              builderStats={sampleBuilderStats}
              isOwner={true}
              onCreateTool={() => console.log("Create tool")}
              onViewTool={(toolId) => console.log("View tool:", toolId)}
              onViewHiveLAB={() => console.log("View HiveLAB")}
            />
          </div>
        </div>
      </section>

      {/* Space Components */}
      <section>
        <h1 className="text-2xl font-bold text-text-primary mb-6 font-display">
          Space Components
        </h1>
        <CategoryGrid
          categories={sampleCategories}
          onCategoryClick={(categoryId) =>
            console.log("Category clicked:", categoryId)
          }
        />
      </section>

      {/* HiveLAB Components */}
      <section>
        <h1 className="text-2xl font-bold text-text-primary mb-6 font-display">
          HiveLAB Components
        </h1>
        <TemplateSelector
          onSelectTemplate={(templateId) =>
            console.log("Template selected:", templateId)
          }
        />
      </section>
    </div>
  ),
};
