import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "../../atomic/atoms/calendar";
import { useState } from "react";

const meta = {
  title: "11-Shared/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border border-border" />;
  },
};
