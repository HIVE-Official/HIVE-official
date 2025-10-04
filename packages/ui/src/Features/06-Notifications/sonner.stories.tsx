import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "../../atomic/atoms/sonner";
import { Button } from "../../atomic/atoms/button";
import { toast } from "sonner";

const meta = {
  title: "06-Notifications/Sonner",
  component: Toaster,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() => toast("Event has been created")}
        className="transition-all duration-flowing ease-liquid"
      >
        Show Toast
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() => toast("Event Created", {
          description: "Your event has been successfully created and saved.",
        })}
        className="transition-all duration-flowing ease-liquid"
      >
        Toast with Description
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() => toast("Event Created", {
          action: {
            label: "Undo",
            onClick: () => toast("Undo clicked"),
          },
        })}
        className="transition-all duration-flowing ease-liquid"
      >
        Toast with Action
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => toast.success("Success!")}>Success</Button>
        <Button onClick={() => toast.error("Error!")}>Error</Button>
        <Button onClick={() => toast.warning("Warning!")}>Warning</Button>
        <Button onClick={() => toast.info("Info!")}>Info</Button>
        <Button onClick={() => toast.loading("Loading...")}>Loading</Button>
        <Button
          onClick={() => {
            const promise = new Promise((resolve) => setTimeout(resolve, 2000));
            toast.promise(promise, {
              loading: "Loading...",
              success: "Success!",
              error: "Error!",
            });
          }}
        >
          Promise
        </Button>
      </div>
    </div>
  ),
};
