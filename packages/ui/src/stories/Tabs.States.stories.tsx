// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../index";

const meta: Meta<typeof Tabs> = {
  title: "States/Tabs",
  component: Tabs,
  parameters: { layout: "centered" }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <Tabs defaultValue="one">
        <TabsList className="w-full justify-between">
          <TabsTrigger value="one">Overview</TabsTrigger>
          <TabsTrigger value="two">Details</TabsTrigger>
          <TabsTrigger value="three">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Overview content</TabsContent>
        <TabsContent value="two">Details content</TabsContent>
        <TabsContent value="three">Activity content</TabsContent>
      </Tabs>
    </div>
  )
};

