"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Temporary simplified error boundary to unblock compilation
export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return <>{children}</>;
};