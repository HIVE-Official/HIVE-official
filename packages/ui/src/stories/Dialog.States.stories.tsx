// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../index";

const meta: Meta = {
  title: "States/Dialog",
  parameters: { layout: "centered" }
};

export default meta;

type Story = StoryObj;

export const Closed: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Optional description text.</DialogDescription>
        </DialogHeader>
        <p className="text-body-sm font-body-sm text-muted-foreground">Body content goes here.</p>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant={"brand" as any}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export const Open: Story = {
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open by default</DialogTitle>
          <DialogDescription>Used to preview the elevated style.</DialogDescription>
        </DialogHeader>
        <p className="text-body-sm font-body-sm text-muted-foreground">Body content goes here.</p>
        <DialogFooter>
          <Button variant="ghost">Dismiss</Button>
          <Button variant={"brand" as any}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
