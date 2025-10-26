import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Composer } from "@/organisms/spaces/composer";

const meta: Meta<typeof Composer> = {
  title: "Organisms/Spaces/Composer/Tools",
  component: Composer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Composer>;

export const SlashAndSearch: Story = {
  render: (args) => {
    const [log, setLog] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <p className="text-caption text-muted-foreground">Type "/" inside the field to open the tools menu. Use arrow keys and Enter.</p>
        <Composer
          {...args}
          allowEvents
          allowForms
          allowPolls
          role="leader"
          onCreatePost={() => setLog("Create: Text")}
          onCreateEvent={() => setLog("Create: Event")}
          onCreatePoll={() => setLog("Create: Poll")}
          onCreateForm={() => setLog("Create: Form")}
          onCreateAnnouncement={() => setLog("Create: Announcement")}
        />
        {log && <div className="text-caption text-muted-foreground">{log}</div>}
      </div>
    );
  },
  args: {
    preflight: null,
  },
};

export const MemberGating: Story = {
  render: (args) => {
    const [log, setLog] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <p className="text-caption text-muted-foreground">Member view: Event is propose-only; Announcement hidden.</p>
        <Composer
          {...args}
          allowEvents
          allowForms
          allowPolls
          role="member"
          policy={{ posting: "members", event: "members_with_approval" }}
          onCreatePost={() => setLog("Create: Text")}
          onProposeEvent={() => setLog("Propose: Event")}
          onCreatePoll={() => setLog("Create: Poll")}
          onCreateForm={() => setLog("Create: Form")}
        />
        {log && <div className="text-caption text-muted-foreground">{log}</div>}
      </div>
    );
  },
  args: {
    preflight: null,
  },
};

export const MemberLeadersOnlyEvent: Story = {
  render: (args) => (
    <div className="space-y-2">
      <p className="text-caption text-muted-foreground">Member view: Event is leaders-only (disabled with tooltip).</p>
      <Composer
        {...args}
        allowEvents
        allowForms
        allowPolls
        role="member"
        policy={{ posting: "members", event: "leaders_only" }}
      />
    </div>
  ),
  args: { preflight: null },
};
