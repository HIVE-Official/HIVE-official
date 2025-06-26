"use client";
import React from "react";
// import { SpaceFeed } from "@hive/ui";
import type { FeedPost } from "@hive/core";

interface FeedProps {
  spaceId: string;
  initialPosts?: FeedPost[];
}

export function Feed({ spaceId, initialPosts: _initialPosts }: FeedProps) {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-white mb-2">
          Space Feed Coming Soon
        </h3>
        <p className="text-gray-400">
          This space ({spaceId}) will soon have a dynamic feed with posts, discussions, and updates.
        </p>
      </div>
    </div>
  );
}
