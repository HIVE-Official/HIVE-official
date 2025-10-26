// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { MobileTabBar } from "../index";
import { Home, Users, User, FlaskConical, Settings } from "lucide-react";

const meta: Meta = {
  title: "Layouts/MobileTabBar",
  parameters: { layout: "fullscreen" }
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <div className="relative h-[40vh] bg-muted/20">
      <div className="p-4 text-sm text-muted-foreground">Resize to mobile to view the tab bar.</div>
      <MobileTabBar
        activeId="spaces"
        items={[
          { id: "feed", label: "Feed", href: "#feed", icon: Home },
          { id: "spaces", label: "Spaces", href: "#spaces", icon: Users, badge: 3 },
          { id: "create", label: "Create", href: "#create", icon: FlaskConical, accent: true },
          { id: "profile", label: "Me", href: "#profile", icon: User },
          { id: "settings", label: "Settings", href: "#settings", icon: Settings }
        ]}
      />
    </div>
  )
};

