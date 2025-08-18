"use client";

import { Button } from "@hive/ui";

export function BuilderQueue() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">
        No pending builder applications
      </div>

      {/* TODO: Implement builder approval queue */}
      <div className="space-y-2">
        <div className="rounded-md border border-gray-600 bg-gray-800/50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Sample Application</div>
              <div className="text-sm text-gray-400">user@example.com</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Reject
              </Button>
              <Button variant="primary" size="sm">
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
