// Bounded Context Owner: Spaces Domain Guild
import React from "react";
import { Alert, AlertDescription, AlertTitle, Button } from "@/index";

export interface ModerationGhostBannerProps {
  reportCount?: number;
  onUnhide?: () => void;
  onRemove?: () => void;
  onEscalate?: () => void;
  onViewReports?: () => void;
}

export const ModerationGhostBanner: React.FC<ModerationGhostBannerProps> = ({
  reportCount = 0,
  onUnhide,
  onRemove,
  onEscalate,
  onViewReports,
}) => (
  <Alert variant="warning" className="border-dashed">
    <AlertTitle>Auto-hidden</AlertTitle>
    <AlertDescription>
      This post is hidden for members after {reportCount} reports. Leaders can review and take action.
    </AlertDescription>
    <div className="mt-2 flex flex-wrap gap-2">
      <Button size="sm" onClick={onUnhide} variant="secondary">Unhide</Button>
      <Button size="sm" onClick={onRemove} variant="outline">Remove</Button>
      <Button size="sm" onClick={onEscalate} variant="outline">Escalate</Button>
      <Button size="sm" onClick={onViewReports} variant="ghost">View reports</Button>
    </div>
  </Alert>
);

export const ReportButton: React.FC<{ onReport?: () => void }> = ({ onReport }) => (
  <Button size="sm" variant="ghost" onClick={onReport} aria-label="Report content">Report</Button>
);

