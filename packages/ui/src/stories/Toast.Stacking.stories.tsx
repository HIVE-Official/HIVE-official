// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Toaster, toast } from "../index";

const meta: Meta = { title: "Feedback/Toast Stacking" };
export default meta;
type Story = StoryObj;

export const Stacking: Story = {
  render: () => {
    const fire = () => {
      toast({ title: "Saved", description: "Changes have been saved." });
      setTimeout(() => toast({ title: "Synced", description: "Synced to cloud." }), 200);
      setTimeout(() => toast({ title: "Done", description: "All tasks complete." }), 400);
    };
    return (
      <div className="space-y-4">
        <Button onClick={fire}>Fire 3 toasts</Button>
        <Toaster />
      </div>
    );
  }
};

