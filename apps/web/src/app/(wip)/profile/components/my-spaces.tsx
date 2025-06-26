"use client";
import React from "react";
// Unused imports removed - will be used when spaces integration is implemented
// import { useEffect, useState } from "react";
// import { SpaceCard } from "@hive/ui";
// import { useAuth } from "@hive/hooks";
// import type { Space } from "@hive/core";
// import Link from "next/link";
// import { Plus } from "lucide-react";

// Unused function - will be used when spaces integration is implemented
// async function fetchMySpaces(token: string | null): Promise<Space[]> {
//   if (!token) return [];
//   const response = await fetch("/api/profile/my-spaces", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch user's spaces");
//   }
//   return response.json();
// }

export function MySpaces() {
  return (
    <div>
      <h2>My Spaces</h2>
    </div>
  );
}
