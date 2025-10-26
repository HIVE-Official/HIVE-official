import type { Meta, StoryObj } from "@storybook/react";
import { Composer } from "@/organisms/spaces/composer";
import * as React from "react";

const meta: Meta<typeof Composer> = {
  title: "Organisms/Spaces/Composer",
  component: Composer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Composer>;

export const Default: Story = {
  args: {
    preflight: null,
  },
};

export const LeadersOnlyPreflight: Story = {
  args: {
    preflight: { variant: "warning", heading: "Leaders-only posting", body: "Only leaders can post in this space." },
  },
};

export const PlusMenu: Story = {
  render: (args) => {
    const [log, setLog] = React.useState<string | null>(null);
    return (
      <div className="space-y-4">
        <Composer
          {...args}
          allowEvents
          allowForms
          allowPolls
          isLeader
          onCreatePost={() => setLog("Text action")}
          onCreateEvent={() => setLog("Event action")}
          onCreatePoll={() => setLog("Poll action")}
          onCreateForm={() => setLog("Form action")}
          onCreateAnnouncement={() => setLog("Announcement action")}
        />
        {log && <div className="text-caption text-muted-foreground">{log}</div>}
      </div>
    );
  },
  args: {
    preflight: null,
  },
};
