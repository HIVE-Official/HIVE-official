// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../index";

const meta: Meta = { title: "A11y/Tabs", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const RovingFocus: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Tabs defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
          <TabsTrigger value="three">Three</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel</TabsContent>
        <TabsContent value="two">Second panel</TabsContent>
        <TabsContent value="three">Third panel</TabsContent>
      </Tabs>
      <p className="mt-2 text-caption font-caption text-muted-foreground">Use Arrow keys within the tablist; Tab moves to the panel.</p>
    </div>
  )
};
