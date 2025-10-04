import type { Meta, StoryObj } from "@storybook/react";
import { InlineToolsWidget } from "../../atomic/molecules/inline-tools-widget";
import {
  InlineEventForm,
  InlinePollForm,
  InlineTaskForm,
  InlineResourceForm,
  type EventFormData,
  type PollFormData,
  type TaskFormData,
  type ResourceFormData
} from "../../atomic/molecules/inline-tool-forms";
import { useState } from "react";

/**
 * # Inline Tools System - SPEC Compliant ✅
 *
 * Demonstrates the 4 inline tools that replace separate "Tools View":
 * - 📅 Event: Create space events (leaders only)
 * - 📊 Poll: Quick polls (all members)
 * - 📋 Task: Assign tasks (leaders only)
 * - 📚 Resource: Upload resources (members after 7 days)
 *
 * ## SPEC Requirements Met:
 * - ✅ Tools are inline forms, not separate views
 * - ✅ Leader-only permissions (Event, Task)
 * - ✅ New member restrictions (Resource after 7 days)
 * - ✅ Grid layout in sidebar widget
 * - ✅ Forms appear in composer area when clicked
 *
 * ## Next Steps:
 * 1. Integrate forms into SpaceLayout post composer
 * 2. Connect to API endpoints
 * 3. Add slash commands (/poll, /event, etc)
 */

const meta = {
  title: "03-Spaces/Inline Tools (SPEC-Compliant)",
  component: InlineToolsWidget,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# SPEC-Compliant Inline Tools

These replace the deprecated "Tools View" concept. Instead of switching to a tools screen,
users click a tool button and an inline form appears in the post composer area.

**Leader Tools:**
- 📅 Event (create space events)
- 📋 Task (assign tasks to members)

**All Members:**
- 📊 Poll (quick polls)

**Members (after 7 days):**
- 📚 Resource (upload files or links)
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InlineToolsWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Demo Component
const InlineToolsDemo = ({ isLeader }: { isLeader: boolean }) => {
  const [activeForm, setActiveForm] = useState<"event" | "poll" | "task" | "resource" | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);

  const handleEventSubmit = (data: EventFormData) => {
    console.log("Event created:", data);
    setSubmissions([...submissions, { type: "event", data, timestamp: new Date() }]);
    setActiveForm(null);
  };

  const handlePollSubmit = (data: PollFormData) => {
    console.log("Poll created:", data);
    setSubmissions([...submissions, { type: "poll", data, timestamp: new Date() }]);
    setActiveForm(null);
  };

  const handleTaskSubmit = (data: TaskFormData) => {
    console.log("Task created:", data);
    setSubmissions([...submissions, { type: "task", data, timestamp: new Date() }]);
    setActiveForm(null);
  };

  const handleResourceSubmit = (data: ResourceFormData) => {
    console.log("Resource uploaded:", data);
    setSubmissions([...submissions, { type: "resource", data, timestamp: new Date() }]);
    setActiveForm(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 bg-[#000000]">
      {/* Header */}
      <div className="border-b border-white/8 pb-4">
        <h2 className="text-xl font-semibold text-white mb-2">Inline Tools Demo</h2>
        <p className="text-sm text-white/70">
          {isLeader ? "Leader Mode: All tools available" : "Member Mode: Event and Task disabled"}
        </p>
      </div>

      {/* Tools Widget */}
      <div className="rounded-lg border border-white/8 bg-[#0c0c0c] p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-2">Quick Tools</h3>
          <p className="text-xs text-white/50">Click a tool to see the creation form</p>
        </div>
        <InlineToolsWidget
          isLeader={isLeader}
          isNewMember={false}
          onCreateEvent={() => setActiveForm("event")}
          onCreatePoll={() => setActiveForm("poll")}
          onCreateTask={() => setActiveForm("task")}
          onUploadResource={() => setActiveForm("resource")}
        />
      </div>

      {/* Active Form */}
      {activeForm && (
        <div className="rounded-lg border border-[#FFD700]/30 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {activeForm === "event" && (
            <InlineEventForm
              onSubmit={handleEventSubmit}
              onCancel={() => setActiveForm(null)}
            />
          )}
          {activeForm === "poll" && (
            <InlinePollForm
              onSubmit={handlePollSubmit}
              onCancel={() => setActiveForm(null)}
            />
          )}
          {activeForm === "task" && (
            <InlineTaskForm
              onSubmit={handleTaskSubmit}
              onCancel={() => setActiveForm(null)}
            />
          )}
          {activeForm === "resource" && (
            <InlineResourceForm
              onSubmit={handleResourceSubmit}
              onCancel={() => setActiveForm(null)}
            />
          )}
        </div>
      )}

      {/* Submissions Log */}
      {submissions.length > 0 && (
        <div className="rounded-lg border border-white/8 bg-[#0c0c0c] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">
            Created Items ({submissions.length})
          </h3>
          <div className="space-y-3">
            {submissions.map((sub, idx) => (
              <div key={idx} className="p-3 rounded border border-white/8 bg-[#000000]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">
                    {sub.type === "event" && "📅"}
                    {sub.type === "poll" && "📊"}
                    {sub.type === "task" && "📋"}
                    {sub.type === "resource" && "📚"}
                  </span>
                  <span className="text-sm font-medium text-white capitalize">{sub.type}</span>
                  <span className="text-xs text-white/50 ml-auto">
                    {sub.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <pre className="text-xs text-white/70 overflow-x-auto">
                  {JSON.stringify(sub.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Leader can use all 4 tools
 */
export const LeaderMode: Story = {
  render: () => <InlineToolsDemo isLeader={true} />,
};

/**
 * Regular members can only use Poll and Resource tools
 */
export const MemberMode: Story = {
  render: () => <InlineToolsDemo isLeader={false} />,
};

/**
 * Just the tools widget (no forms)
 */
export const WidgetOnly: Story = {
  args: {
    isLeader: true,
    isNewMember: false,
    onCreateEvent: () => console.log("Event clicked"),
    onCreatePoll: () => console.log("Poll clicked"),
    onCreateTask: () => console.log("Task clicked"),
    onUploadResource: () => console.log("Resource clicked"),
  },
};

/**
 * New member (< 7 days) - Resource tool disabled
 */
export const NewMemberRestriction: Story = {
  args: {
    isLeader: false,
    isNewMember: true,
    onCreateEvent: () => console.log("Event clicked"),
    onCreatePoll: () => console.log("Poll clicked"),
    onCreateTask: () => console.log("Task clicked"),
    onUploadResource: () => console.log("Resource clicked"),
  },
};
