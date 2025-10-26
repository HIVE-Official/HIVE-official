// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../index";

const meta: Meta = {
  title: "Molecules/Tabs",
  parameters: {
    layout: "centered"
  }
};

export default meta;

type Story = StoryObj;

export const CampusInsights: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-between">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="builders">Builders</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <h3 className="text-h4 font-h4 text-foreground">At a glance</h3>
          <p className="mt-2 text-body-sm font-body-sm text-muted-foreground">
            Campus activity is up 18% this week. Spotlight cards drove the largest share of participation, followed by Orientation Crew events.
          </p>
        </TabsContent>
        <TabsContent value="engagement">
          <h3 className="text-h4 font-h4 text-foreground">Engagement</h3>
          <ul className="mt-3 space-y-2 text-body-sm font-body-sm text-muted-foreground">
            <li>• Session length average: 7m 12s</li>
            <li>• Daily rituals completed: 482 (+12%)</li>
            <li>• Social boosts redeemed: 61 (record high)</li>
          </ul>
        </TabsContent>
        <TabsContent value="builders">
          <h3 className="text-h4 font-h4 text-foreground">Builder queue</h3>
          <p className="mt-2 text-body-sm font-body-sm text-muted-foreground">
            Five new builders are awaiting onboarding. Flagged submissions are below the threshold, so fast-track approvals are available.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
};
