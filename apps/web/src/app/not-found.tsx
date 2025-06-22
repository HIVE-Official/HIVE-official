"use client";

import React from "react";
import { useAuth } from "@hive/hooks";
import { NotFound } from "@hive/ui";

export default function NotFoundPage() {
  const { user, loading } = useAuth();

  // Determine where to send users when they click the CTA.
  const ctaHref = loading ? "#" : user ? "/feed" : "/";

  // While auth state is resolving, we can just render nothing to avoid flash.
  if (loading) {
    return null;
  }

  return <NotFound ctaHref={ctaHref} />;
}
