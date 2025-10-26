// Bounded Context Owner: HiveLab Guild
import type { ToolSnapshot } from "@core";
import { toolService } from "../service";
import { spaceService } from "../../spaces/service";

export interface ToolDeploymentReconciliationResult {
  readonly scanned: number;
  readonly reconciled: number;
  readonly removedSpaceIds: number;
}

const isMaintainedByEditors = (tool: ToolSnapshot, space: { members: readonly { profileId: string }[] }) => {
  return tool.permissions.canEdit.some((editorId) =>
    space.members.some((member) => member.profileId === editorId)
  );
};

export class ToolDeploymentReconciliationJob {
  async run(): Promise<ToolDeploymentReconciliationResult> {
    const tools = await toolService.listAllTools();
    let reconciled = 0;
    let removedSpaceIds = 0;

    for (const tool of tools) {
      if (tool.deployedTo.length === 0) {
        continue;
      }

      const validSpaceIds: string[] = [];

      for (const spaceId of tool.deployedTo) {
        const space = await spaceService.getSpaceById(spaceId);
        if (!space) {
          removedSpaceIds += 1;
          continue;
        }

        if (space.campusId !== tool.campusId) {
          removedSpaceIds += 1;
          continue;
        }

        if (!isMaintainedByEditors(tool, { members: space.members })) {
          removedSpaceIds += 1;
          continue;
        }

        validSpaceIds.push(spaceId);
      }

      const needsReconcile = validSpaceIds.length !== tool.deployedTo.length;
      if (needsReconcile) {
        reconciled += 1;
        await toolService.reconcileDeployments({
          toolId: tool.id,
          profileId: "system",
          spaceIds: validSpaceIds
        });
      }
    }

    return {
      scanned: tools.length,
      reconciled,
      removedSpaceIds
    };
  }
}
