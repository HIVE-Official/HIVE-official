import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  PollModal,
  EventModal,
  TaskModal,
  ResourceModal,
} from "../../atomic/organisms/tool-action-modals";
import { Button } from "../../atomic/atoms/button";

/**
 * # Tool Action Modals
 *
 * Interactive modals for creating default tools in Spaces: Poll, Event, Task, Resource.
 * These appear when clicking tool buttons in the SpaceToolsPanel.
 *
 * ## HIVE Tool System
 * - **Default Tools**: Available in every space
 * - **Quick Creation**: Simple inline forms
 * - **Smart Defaults**: Templates and presets
 * - **Feed Integration**: Results appear in space feed
 *
 * ## Features
 * - **Poll Modal**: 2-5 options, anonymous voting, auto-close
 * - **Event Modal**: Quick templates (Meeting/Social/Workshop), RSVP limits
 * - **Task Modal**: Priority levels, deadline tracking
 * - **Resource Modal**: Upload or link, announcement option
 *
 * ## Usage
 * ```tsx
 * <PollModal
 *   open={pollModalOpen}
 *   onOpenChange={setPollModalOpen}
 *   onSubmit={(data) => createPoll(data)}
 * />
 * ```
 */
const meta = {
  title: "05-HiveLab/ToolActionModals",
  component: PollModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PollModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Poll creation modal
 */
export const PollModalStory: Story = {
  name: "Poll Modal",
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          <span className="mr-2">📊</span>
          Create Poll
        </Button>
        <PollModal
          open={open}
          onOpenChange={setOpen}
          onSubmit={(data) => {
            console.log("Poll data:", data);
            alert(`Poll Created!\n\nQuestion: ${data.question}\nOptions: ${data.options.join(", ")}\nAnonymous: ${data.settings.anonymous}\nMultiple Choice: ${data.settings.multipleChoice}`);
          }}
        />
      </>
    );
  },
};

/**
 * Event creation modal
 */
export const EventModalStory: Story = {
  name: "Event Modal",
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          <span className="mr-2">📅</span>
          Create Event
        </Button>
        <EventModal
          open={open}
          onOpenChange={setOpen}
          onSubmit={(data) => {
            console.log("Event data:", data);
            alert(`Event Created!\n\nTitle: ${data.title}\nStart: ${data.startTime}\nLocation: ${data.location || "Not specified"}\nRSVP Limit: ${data.rsvpLimit || "Unlimited"}`);
          }}
        />
      </>
    );
  },
};

/**
 * Task creation modal
 */
export const TaskModalStory: Story = {
  name: "Task Modal",
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          <span className="mr-2">📋</span>
          Create Task
        </Button>
        <TaskModal
          open={open}
          onOpenChange={setOpen}
          onSubmit={(data) => {
            console.log("Task data:", data);
            alert(`Task Created!\n\nTitle: ${data.title}\nDue: ${data.dueDate}\nPriority: ${data.priority.toUpperCase()}\nDescription: ${data.description || "None"}`);
          }}
        />
      </>
    );
  },
};

/**
 * Resource upload/link modal
 */
export const ResourceModalStory: Story = {
  name: "Resource Modal",
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          <span className="mr-2">📚</span>
          Add Resource
        </Button>
        <ResourceModal
          open={open}
          onOpenChange={setOpen}
          onSubmit={(data) => {
            console.log("Resource data:", data);
            alert(`Resource Added!\n\nType: ${data.type}\nTitle: ${data.title}\nURL: ${data.url || "N/A"}\nPost Announcement: ${data.postAnnouncement}`);
          }}
        />
      </>
    );
  },
};

/**
 * All modals together (interactive demo)
 */
export const AllToolModals: Story = {
  name: "All Tool Modals",
  render: () => {
    const [pollOpen, setPollOpen] = React.useState(false);
    const [eventOpen, setEventOpen] = React.useState(false);
    const [taskOpen, setTaskOpen] = React.useState(false);
    const [resourceOpen, setResourceOpen] = React.useState(false);

    return (
      <div className="flex flex-col gap-3 p-6 bg-background rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-2">Default Tools</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click any tool to see its creation modal
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => setPollOpen(true)}
          >
            <span className="text-2xl">📊</span>
            <span className="text-sm">Poll</span>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => setEventOpen(true)}
          >
            <span className="text-2xl">📅</span>
            <span className="text-sm">Event</span>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => setTaskOpen(true)}
          >
            <span className="text-2xl">📋</span>
            <span className="text-sm">Task</span>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => setResourceOpen(true)}
          >
            <span className="text-2xl">📚</span>
            <span className="text-sm">Resource</span>
          </Button>
        </div>

        {/* Modals */}
        <PollModal
          open={pollOpen}
          onOpenChange={setPollOpen}
          onSubmit={(data) => {
            console.log("Poll:", data);
            alert(`Poll created: ${data.question}`);
          }}
        />

        <EventModal
          open={eventOpen}
          onOpenChange={setEventOpen}
          onSubmit={(data) => {
            console.log("Event:", data);
            alert(`Event created: ${data.title}`);
          }}
        />

        <TaskModal
          open={taskOpen}
          onOpenChange={setTaskOpen}
          onSubmit={(data) => {
            console.log("Task:", data);
            alert(`Task created: ${data.title}`);
          }}
        />

        <ResourceModal
          open={resourceOpen}
          onOpenChange={setResourceOpen}
          onSubmit={(data) => {
            console.log("Resource:", data);
            alert(`Resource added: ${data.title}`);
          }}
        />
      </div>
    );
  },
};
