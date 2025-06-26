"use client";

import { useState } from "react";
import { Button } from "@hive/ui";

export function UserLookup() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by email, handle, or user ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <Button variant="default" size="sm">
          Search
        </Button>
      </div>

      {/* TODO: Implement user search results */}
      <div className="text-sm text-gray-400">
        Enter a search term to find users
      </div>
    </div>
  );
}
