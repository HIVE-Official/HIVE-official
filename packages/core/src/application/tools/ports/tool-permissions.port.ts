// Bounded Context Owner: HiveLab Guild
import type { ToolSnapshot } from "../../../domain/tools/aggregates/tool.aggregate";

export interface ToolPermissionsPort {
  canViewCampusCatalog(input: { profileId: string; campusId: string }): Promise<boolean>;
  canCreateTool(input: { profileId: string; campusId: string }): Promise<boolean>;
  canManageTool(input: { profileId: string; tool: ToolSnapshot }): Promise<boolean>;
}
