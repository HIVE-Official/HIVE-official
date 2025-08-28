"use client";

import React from "react";

interface WelcomeMatProviderProps {
  children: React.ReactNode;
}

// Temporary simplified welcome mat provider to unblock compilation
export const WelcomeMatProvider = ({ children }: WelcomeMatProviderProps) => {
  return <>{children}</>;
};