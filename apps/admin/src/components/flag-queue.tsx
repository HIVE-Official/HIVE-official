"use client";

import { Button } from "@hive/ui";

export function FlagQueue() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">No flagged content to review</div>

      {/* TODO: Implement content flag queue */}
      <div className="space-y-3">
        <div className="rounded-md border border-gray-600 bg-gray-800/50 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-400">
                  Inappropriate Content
                </span>
                <span className="text-xs text-gray-400">2 reports</span>
              </div>
              <div className="text-sm text-white mb-2">
                &quot;This is sample flagged content that would appear
                here...&quot;
              </div>
              <div className="text-xs text-gray-400">
                Posted by @sampleuser in #general
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <Button variant="outline" size="sm">
                Dismiss
              </Button>
              <Button variant="destructive" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
