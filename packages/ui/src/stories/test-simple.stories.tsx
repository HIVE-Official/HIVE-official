import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button, Card } from "@hive/ui";

function SimpleTest() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#111111] border-[#2A2A2A] p-8">
        <h1 className="text-white text-2xl mb-4">Simple Test</h1>
        <Button className="w-full">Test Button</Button>
      </Card>
    </div>
  );
}

const meta: Meta = {
  title: "Test/Simple",
  component: SimpleTest,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SimpleTest>;

export const Default: Story = {
  name: "Simple Test",
};
