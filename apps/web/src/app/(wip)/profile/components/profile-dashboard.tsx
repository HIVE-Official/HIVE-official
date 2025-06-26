"use client";

import React from "react";
import type { AuthUser } from "@hive/auth-logic";
// import { BentoProfileDashboard } from "@hive/ui";

interface ProfileDashboardProps {
  user: AuthUser;
}

export function ProfileDashboard({ user }: ProfileDashboardProps) {
  return (
    <div>
      <h2>Profile Dashboard</h2>
      <p>Welcome, {user.fullName}</p>
    </div>
  );
}
