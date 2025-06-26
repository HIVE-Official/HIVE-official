"use client";
// import { useAuth } from "@hive/hooks";
// import { WelcomeMat, useWelcomeMat } from "@hive/ui";

export function WelcomeMatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
