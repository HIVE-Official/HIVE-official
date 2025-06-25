import type { Meta, StoryObj } from "@storybook/react";
import { Lock, Settings } from "lucide-react";
import {
  SpaceHeaderRoot,
  SpaceHeaderDetails,
  SpaceHeaderInfo,
  SpaceHeaderName,
  SpaceHeaderMeta,
  SpaceHeaderActions,
} from "./SpaceHeader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import React from "react";

const meta: Meta<typeof SpaceHeaderRoot> = {
  component: SpaceHeaderRoot,
  title: "Spaces/SpaceHeader",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpaceHeaderRoot>;

export const GuestView: Story = {
  render: (args) => (
    <SpaceHeaderRoot {...args}>
      <SpaceHeaderDetails>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/hive.png" alt="Hive" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <SpaceHeaderInfo>
          <SpaceHeaderName>Hive Engineering</SpaceHeaderName>
          <SpaceHeaderMeta>2,345 members</SpaceHeaderMeta>
        </SpaceHeaderInfo>
      </SpaceHeaderDetails>
      <SpaceHeaderActions>
        <Button variant="primary">Join Space</Button>
      </SpaceHeaderActions>
    </SpaceHeaderRoot>
  ),
};

export const MemberView: Story = {
  render: (args) => (
    <SpaceHeaderRoot {...args}>
      <SpaceHeaderDetails>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/hive.png" alt="Hive" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <SpaceHeaderInfo>
          <SpaceHeaderName>Hive Engineering</SpaceHeaderName>
          <SpaceHeaderMeta>2,345 members</SpaceHeaderMeta>
        </SpaceHeaderInfo>
      </SpaceHeaderDetails>
      <SpaceHeaderActions>
        <Button variant="secondary">Joined</Button>
      </SpaceHeaderActions>
    </SpaceHeaderRoot>
  ),
};

export const AdminView: Story = {
  render: (args) => (
    <SpaceHeaderRoot {...args}>
      <SpaceHeaderDetails>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/hive.png" alt="Hive" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <SpaceHeaderInfo>
          <SpaceHeaderName>Hive Engineering</SpaceHeaderName>
          <SpaceHeaderMeta>2,345 members</SpaceHeaderMeta>
        </SpaceHeaderInfo>
      </SpaceHeaderDetails>
      <SpaceHeaderActions>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SpaceHeaderActions>
    </SpaceHeaderRoot>
  ),
};

export const PrivateSpace: Story = {
  render: (args) => (
    <SpaceHeaderRoot {...args}>
      <SpaceHeaderDetails>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/hive.png" alt="Hive" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <SpaceHeaderInfo>
          <SpaceHeaderName>
            Secret Hive Council <Lock className="h-4 w-4 text-neutral-400" />
          </SpaceHeaderName>
          <SpaceHeaderMeta>Private • 42 members</SpaceHeaderMeta>
        </SpaceHeaderInfo>
      </SpaceHeaderDetails>
      <SpaceHeaderActions>
        <Button variant="secondary" disabled>
          Request to Join
        </Button>
      </SpaceHeaderActions>
    </SpaceHeaderRoot>
  ),
};

export const LoadingState: Story = {
  render: (args) => (
    <SpaceHeaderRoot {...args}>
      <SpaceHeaderDetails>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </SpaceHeaderDetails>
      <Skeleton className="h-10 w-[120px]" />
    </SpaceHeaderRoot>
  ),
};
