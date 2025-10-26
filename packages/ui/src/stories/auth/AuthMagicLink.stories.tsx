import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { EntryHero } from "@/organisms/auth/entry-hero";
import { AuthMagicLinkCard } from "@/organisms/auth/auth-magic-link-card";

const meta: Meta = {
  title: "Auth/Magic Link",
};
export default meta;

export const EntryCampusPulse: StoryObj = {
  render: () => (
    <div className="p-6">
      <EntryHero onGetStarted={() => {}} onWhatIsHive={() => {}} />
    </div>
  ),
};

export const MagicLinkCard: StoryObj = {
  render: () => (
    <div className="p-6">
      <AuthMagicLinkCard />
    </div>
  ),
};

