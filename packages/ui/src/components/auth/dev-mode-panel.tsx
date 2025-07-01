"use client";

import React from "react";
import { Card } from "../card";
import { Wrench } from "lucide-react";

interface DevModePanelProps {
  userEmail?: string | null;
}

export function DevModePanel({ userEmail }: DevModePanelProps) {
  // Only render in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Temporary: Simple dev panel until dev mode functionality is implemented
  return (
    <Card className="fixed bottom-4 right-4 p-4 w-80 bg-zinc-900 border border-zinc-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          <h3 className="font-medium">Developer Mode</h3>
        </div>
        <span className="text-xs text-zinc-400">Coming Soon</span>
      </div>
      
      <div className="text-sm text-zinc-400">
        <p>Developer tools will be available in future releases.</p>
        <p className="mt-2">Current user: {userEmail || 'Not logged in'}</p>
      </div>
    </Card>
  );
} 