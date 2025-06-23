import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SpaceShowcaseCard } from "./space-showcase-card";
import { EventAnnouncementCard } from "./event-announcement-card";
import { UGCPostCard } from "./ugc-post-card";
import { mockSpace, mockEvent, mockPost } from "./mock-data";

const meta: Meta = {
  title: "Content/Card System",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
  },
};

export default meta;

export const SpaceShowcase: StoryObj<typeof SpaceShowcaseCard> = {
  name: "Space Showcase Card",
  args: {
    space: mockSpace,
  },
  render: (args) => (
    <div className="w-[380px]">
      <SpaceShowcaseCard {...args} />
    </div>
  ),
};

export const EventAnnouncement: StoryObj<typeof EventAnnouncementCard> = {
  name: "Event Announcement Card",
  args: {
    event: mockEvent,
  },
  render: (args) => (
    <div className="w-[380px]">
      <EventAnnouncementCard {...args} />
    </div>
  ),
};

export const UGCPost: StoryObj<typeof UGCPostCard> = {
  name: "User-Generated Content Card",
  args: {
    post: mockPost,
  },
  render: (args) => (
    <div className="w-[380px]">
      <UGCPostCard {...args} />
    </div>
  ),
};

export const CardGrid: StoryObj = {
  name: "System Overview",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="p-8 bg-[#0A0A0A]">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <SpaceShowcaseCard space={mockSpace} />
        <EventAnnouncementCard event={mockEvent} />
        <UGCPostCard post={mockPost} />
        <SpaceShowcaseCard space={{ ...mockSpace, isJoined: true }} />
        <EventAnnouncementCard event={{ ...mockEvent, isAttending: true }} />
        <UGCPostCard
          post={{
            ...mockPost,
            userInteractions: { ...mockPost.userInteractions, hasLiked: true },
          }}
        />
      </div>
    </div>
  ),
}; 