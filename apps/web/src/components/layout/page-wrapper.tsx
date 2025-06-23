"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@hive/ui";
import { useAuth } from "@/lib/auth";
import { HivePage } from "@hive/ui";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Page background treatment */
  background?: "default" | "canvas" | "elevated";
  /** Disable page transitions */
  disableTransitions?: boolean;
  /** Custom metadata for the page */
  metadata?: {
    title?: string;
    description?: string;
    layoutId?: string;
  };
}

/**
 * Standard page wrapper for all HIVE app routes
 * Provides consistent transitions, backgrounds, and layout
 */
export function PageWrapper({
  children,
  className,
  background = "canvas",
  disableTransitions = false,
  metadata,
}: PageWrapperProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAuthPage =
    pathname.startsWith("/auth") || pathname.startsWith("/welcome");

  if (isAuthPage) {
    return <main className="min-h-screen bg-black text-white">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-bg-root font-body text-text-primary">
      <Navbar user={user} />
      <main className="pt-16">
        <HivePage
          metadata={{
            background,
            layoutId: metadata?.layoutId,
          }}
          disableTransitions={disableTransitions}
          className={cn(
            // Standard page styles
            "min-h-screen",
            // Responsive padding
            "px-4 py-6 md:px-6 lg:px-8",
            // Performance optimization
            "will-change-transform",
            className
          )}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </HivePage>
      </main>
    </div>
  );
}

/**
 * Specialized wrappers for different page types
 */

/** Feed-style pages with infinite scroll */
export function FeedPageWrapper({
  children,
  className,
  ...props
}: Omit<PageWrapperProps, "background">) {
  return (
    <PageWrapper
      background="canvas"
      className={cn("px-0 py-0", className)} // Feed handles its own spacing
      {...props}
    >
      {children}
    </PageWrapper>
  );
}

/** Modal-style pages */
export function ModalPageWrapper({
  children,
  className,
  ...props
}: Omit<PageWrapperProps, "background">) {
  return (
    <PageWrapper
      background="elevated"
      className={cn("flex items-center justify-center p-4", className)}
      {...props}
    >
      <div className="w-full max-w-md">{children}</div>
    </PageWrapper>
  );
}

/** Profile and dashboard pages */
export function DashboardPageWrapper({
  children,
  className,
  ...props
}: Omit<PageWrapperProps, "background">) {
  return (
    <PageWrapper
      background="canvas"
      className={cn("pb-12", className)}
      {...props}
    >
      {children}
    </PageWrapper>
  );
}

/** Onboarding flow pages */
export function OnboardingPageWrapper({
  children,
  className,
  ...props
}: Omit<PageWrapperProps, "background">) {
  return (
    <PageWrapper
      background="canvas"
      className={cn("flex items-center justify-center min-h-screen", className)}
      {...props}
    >
      <div className="w-full max-w-2xl">{children}</div>
    </PageWrapper>
  );
}
