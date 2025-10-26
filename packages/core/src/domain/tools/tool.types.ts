// Bounded Context Owner: HiveLab Guild
// Defines core types and enums for Tools (HiveLab) across the platform.

export type ToolStatus = "draft" | "limited_run" | "certified" | "archived";
export type ToolVisibility = "private" | "space" | "campus" | "public";
export type ToolTestHealth = "looks_good" | "heads_up" | "fix_required";

export interface ToolTestStatus {
  lastRunAt?: Date;
  blockingIssueCount: number;
  health: ToolTestHealth;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: string;

  createdBy: string; // userId
  spaceId?: string; // optional owning space

  status: ToolStatus;
  limitedRunEndsAt?: Date;
  visibility: ToolVisibility;
  version: number;
  lastTest?: ToolTestStatus;

  uses: number;
  rating: number; // 0-5

  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
