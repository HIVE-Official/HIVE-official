import type { Meta, StoryObj } from "@storybook/react";
import { AboutPreview } from "@/organisms/spaces/context-rail";
import { spaceRobotics } from "@/fixtures/spaces/space-robotics";

const meta: Meta<typeof AboutPreview> = {
  title: "Organisms/Spaces/Context Rail/About Preview",
  component: AboutPreview,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof AboutPreview>;

export const Basic: Story = {
  args: {
    description: spaceRobotics.description,
    tags: spaceRobotics.tags,
    featuredLinks: spaceRobotics.featuredLinks,
    isVerified: spaceRobotics.isVerified,
    spaceType: "Student Organization",
  },
};

export const LongDescriptionAndTags: Story = {
  args: {
    description:
      "Build autonomous bots, prep for competitions, and share hardware knowledge. We meet Tuesdays and Thursdays; newcomers welcome. This long description should clamp to three lines in the rail.",
    tags: [
      "engineering",
      "hardware",
      "ai",
      "competitions",
      "soldering",
      "cad",
      "electronics",
      "firmware",
    ],
    featuredLinks: [
      { label: "Resources doc", url: "https://ub.edu/robotics/resources" },
      { label: "Parts request form", url: "https://forms.gle/parts-request" },
    ],
    isVerified: true,
    spaceType: "Student Organization",
  },
};

