import type { Meta, StoryObj } from "@storybook/react";
import { Home, Compass, User } from "lucide-react";
import {
  BottomNavBarRoot,
  BottomNavBarContent,
  BottomNavBarItem,
  BottomNavBarIcon,
  BottomNavBarLabel,
  BottomNavBarIndicator,
} from "./BottomNavBar";
import React from "react";

const meta: Meta<typeof BottomNavBarRoot> = {
  component: BottomNavBarRoot,
  title: "Navigation/BottomNavBar",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "hive-dark",
      values: [
        { name: "hive-dark", value: "#0A0A0A" },
        { name: "light", value: "#F9F9F9" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomNavBarRoot>;

export const Default: Story = {
  render: (args) => (
    <div className="h-screen bg-neutral-900">
      <BottomNavBarRoot {...args}>
        <BottomNavBarContent>
          <BottomNavBarItem isActive>
            <BottomNavBarIndicator />
            <BottomNavBarIcon>
              <Home />
            </BottomNavBarIcon>
            <BottomNavBarLabel>Feed</BottomNavBarLabel>
          </BottomNavBarItem>
          <BottomNavBarItem>
            <BottomNavBarIcon>
              <Compass />
            </BottomNavBarIcon>
            <BottomNavBarLabel>Spaces</BottomNavBarLabel>
          </BottomNavBarItem>
          <BottomNavBarItem>
            <BottomNavBarIcon>
              <User />
            </BottomNavBarIcon>
            <BottomNavBarLabel>Profile</BottomNavBarLabel>
          </BottomNavBarItem>
        </BottomNavBarContent>
      </BottomNavBarRoot>
    </div>
  ),
};

export const SecondItemSelected: Story = {
  render: (args) => (
    <div className="h-screen bg-neutral-900">
      <BottomNavBarRoot {...args}>
        <BottomNavBarContent>
          <BottomNavBarItem>
            <BottomNavBarIcon>
              <Home />
            </BottomNavBarIcon>
            <BottomNavBarLabel>Feed</BottomNavBarLabel>
          </BottomNavBarItem>
          <BottomNavBarItem isActive>
            <BottomNavBarIndicator />
            <BottomNavBarIcon>
              <Compass />
            </BottomNavBarIcon>
            <BottomNavBarLabel>Spaces</BottomNavBarLabel>
          </BottomNavBarItem>
          <BottomNavBarItem>
            <BottomNavBarIcon>
              <User />
            </BottomNavBarIcon>
            <BottomNavBarLabel>Profile</BottomNavBarLabel>
          </BottomNavBarItem>
        </BottomNavBarContent>
      </BottomNavBarRoot>
    </div>
  ),
};
