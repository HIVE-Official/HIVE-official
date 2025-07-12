"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
// import { Navbar } from "@hive/ui";
// import { HivePage } from "@hive/ui";
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
  className: _className,
  background: _background = "canvas",
  disableTransitions: _disableTransitions = false,
  metadata: _metadata,
}: PageWrapperProps) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/auth") || pathname.startsWith("/welcome");

  if (isAuthPage) {
    return <main className="min-h-screen bg-[#0A0A0A] text-white">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-white">
      {/* <Navbar /> */}
      <main className="pt-16">
        <div className="mx-auto max-w-7xl">{children}</div>
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            {/* Navigation shortcuts, trending topics, etc. */}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">{children}</div>

        {/* Right Sidebar - Hidden on smaller screens */}
        <div className="hidden xl:block">
          <div className="sticky top-20">
            {/* Suggested connections, upcoming events, etc. */}
          </div>
        </div>
      </div>
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

/** Profile and settings wrapper */
export function ProfilePageWrapper({
  children,
  className,
  ...props
}: Omit<PageWrapperProps, "background">) {
  return (
    <PageWrapper
      background="elevated"
      className={cn("pb-16", className)}
      {...props}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </PageWrapper>
  );
}

/** Spaces detail wrapper */
export function SpacePageWrapper({
  children,
  className,
  ...props
}: Omit<PageWrapperProps, "background">) {
  return (
    <PageWrapper
      background="canvas"
      className={cn("pb-16", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
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
