"use client";
import React from 'react';
// import { useAuth } from "@hive/hooks";
// import { WelcomeMat, useWelcomeMat } from "@hive/ui";

export function WelcomeMatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simply return children wrapped in a Fragment to maintain provider context
  return <>{children}</>;
}
