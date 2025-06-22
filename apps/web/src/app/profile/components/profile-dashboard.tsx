"use client";

import React from "react";
import type { User } from "@hive/core";
import { BentoProfileDashboard } from "@hive/ui";

interface ProfileDashboardProps {
  user: User;
}

export const ProfileDashboard = ({ user }: ProfileDashboardProps) => {
  return <BentoProfileDashboard user={user} />;
};
