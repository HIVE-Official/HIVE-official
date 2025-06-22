import type { Meta, StoryObj } from "@storybook/react";
import { AcademicCard } from "../components/profile/tiles/academic-card";

const meta: Meta<typeof AcademicCard> = {
  title: "Profile/Tiles/AcademicCard",
  component: AcademicCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0A0A0A" }],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px] h-[110px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockLayout = {
  id: "academic.card",
  x: 0,
  y: 0,
  width: 3,
  height: 1,
  isVisible: true,
  isPinned: false,
};

export const Default: Story = {
  args: {
    user: {
      major: "Computer Science",
      graduationYear: 2025,
    },
    layout: mockLayout,
    isEditing: false,
  },
};

export const LongMajorName: Story = {
  args: {
    user: {
      major: "Biomedical Engineering",
      graduationYear: 2024,
    },
    layout: mockLayout,
    isEditing: false,
  },
};

export const GraduateStudent: Story = {
  args: {
    user: {
      major: "PhD Computer Science",
      graduationYear: 2026,
    },
    layout: mockLayout,
    isEditing: false,
  },
};

export const EditMode: Story = {
  args: {
    user: {
      major: "Data Science",
      graduationYear: 2025,
    },
    layout: mockLayout,
    isEditing: true,
  },
};
