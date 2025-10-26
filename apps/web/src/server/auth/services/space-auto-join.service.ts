// Bounded Context Owner: Identity & Access Management Guild

import type { Result } from "@core";
import type { SpaceSnapshot } from "@core";

export interface SpaceAssignmentInput {
  readonly id: string;
  readonly name: string;
}

export interface SpaceAutoJoinPayload {
  readonly profileId: string;
  readonly campusId: string;
  readonly defaultSpaces: readonly SpaceAssignmentInput[];
  readonly cohortSpaces: readonly SpaceAssignmentInput[];
}

export interface SpaceAutoJoinDependencies {
  joinSpace: (input: { spaceId: string; profileId: string; campusId: string }) => Promise<Result<SpaceSnapshot>>;
  logger?: Pick<Console, "info" | "warn">;
}

export class SpaceAutoJoinService {
  constructor(private readonly deps: SpaceAutoJoinDependencies) {}

  async assign(payload: SpaceAutoJoinPayload): Promise<void> {
    const logger = this.deps.logger ?? globalThis.console;
    if (process.env.NODE_ENV !== "test") {
      logger.info?.("space.auto_join.start", {
        profileId: payload.profileId,
        campusId: payload.campusId,
        defaultSpaces: payload.defaultSpaces.map((space) => space.id),
        cohortSpaces: payload.cohortSpaces.map((space) => space.id)
      });
    }

    const uniqueSpaces = new Map<string, SpaceAssignmentInput>();
    [...payload.defaultSpaces, ...payload.cohortSpaces].forEach((space) => {
      if (space?.id) {
        uniqueSpaces.set(space.id, space);
      }
    });

    for (const space of uniqueSpaces.values()) {
      const result = await this.deps.joinSpace({
        spaceId: space.id,
        profileId: payload.profileId,
        campusId: payload.campusId
      });

      if (result.ok) {
        if (process.env.NODE_ENV !== "test") {
          logger.info?.("space.auto_join.success", {
            profileId: payload.profileId,
            spaceId: space.id
          });
        }
        continue;
      }

      const error = result.error ?? "Unknown error";
      if (error.includes("already joined")) {
        logger.info?.("space.auto_join.already_member", {
          profileId: payload.profileId,
          spaceId: space.id
        });
        continue;
      }

      logger.warn?.("space.auto_join.failed", {
        profileId: payload.profileId,
        spaceId: space.id,
        error
      });
    }
  }
}
