// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Button, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "../index";

const meta: Meta = { title: "Molecules/Toast A11y" };
export default meta;
type Story = StoryObj;

export const Announce: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setOpen(true), 300);
      return () => clearTimeout(t);
    }, []);
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast open={open} onOpenChange={setOpen} role="status">
          <div className="grid gap-1">
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>Profile updated successfully.</ToastDescription>
          </div>
          <ToastClose aria-label="Close" />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  }
};

