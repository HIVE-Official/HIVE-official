import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Result } from "@core";
import type { SpaceSnapshot } from "@core";
import { SpaceAutoJoinService, type SpaceAssignmentInput } from "./space-auto-join.service";

const okResult = (value?: Partial<SpaceSnapshot>): Result<SpaceSnapshot> => ({
  ok: true,
  value: {
    id: "space-test",
    campusId: "ub-buffalo",
    name: "Test Space",
    description: "",
    type: "student_organization",
    visibility: "campus",
    tags: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    leaderId: "profile-leader",
    settings: { isInviteOnly: false, postingPolicy: "members", joinPolicy: "open" },
    members: [],
    ...(value ?? {})
  } satisfies SpaceSnapshot
});

const errResult = (error: string): Result<SpaceSnapshot> => ({
  ok: false,
  error
});

describe("SpaceAutoJoinService", () => {
  const defaultSpaces: readonly SpaceAssignmentInput[] = [
    { id: "space-welcome", name: "Welcome to Hive" },
    { id: "space-off-campus-students", name: "Off-Campus Students Network" }
  ];

  const cohortSpaces: readonly SpaceAssignmentInput[] = [
    { id: "space-cohort-business-administration-2026", name: "Business Administration Class of 2026" }
  ];

  const logger = {
    info: vi.fn(),
    warn: vi.fn()
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("joins each unique space for the profile", async () => {
    const joinSpace = vi.fn().mockResolvedValue(okResult());
    const service = new SpaceAutoJoinService({ joinSpace, logger });

    await service.assign({
      profileId: "profile-jacob",
      campusId: "ub-buffalo",
      defaultSpaces,
      cohortSpaces
    });

    expect(joinSpace).toHaveBeenCalledTimes(3);
    expect(joinSpace).toHaveBeenCalledWith({
      spaceId: "space-welcome",
      profileId: "profile-jacob",
      campusId: "ub-buffalo"
    });
    expect(joinSpace).toHaveBeenCalledWith({
      spaceId: "space-off-campus-students",
      profileId: "profile-jacob",
      campusId: "ub-buffalo"
    });
    expect(joinSpace).toHaveBeenCalledWith({
      spaceId: "space-cohort-business-administration-2026",
      profileId: "profile-jacob",
      campusId: "ub-buffalo"
    });
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it("ignores duplicate space assignments", async () => {
    const joinSpace = vi.fn().mockResolvedValue(okResult());
    const service = new SpaceAutoJoinService({ joinSpace, logger });

    await service.assign({
      profileId: "profile-jacob",
      campusId: "ub-buffalo",
      defaultSpaces: [{ id: "space-welcome", name: "Welcome to Hive" }],
      cohortSpaces: [{ id: "space-welcome", name: "Duplicate" }]
    });

    expect(joinSpace).toHaveBeenCalledTimes(1);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it("logs a warning when joining fails for reasons other than already joined", async () => {
    const joinSpace = vi
      .fn()
      .mockResolvedValueOnce(okResult())
      .mockResolvedValueOnce(errResult("Space not found"));
    const service = new SpaceAutoJoinService({ joinSpace, logger });

    await service.assign({
      profileId: "profile-jacob",
      campusId: "ub-buffalo",
      defaultSpaces: defaultSpaces,
      cohortSpaces: []
    });

    expect(logger.warn).toHaveBeenCalledWith("space.auto_join.failed", {
      profileId: "profile-jacob",
      spaceId: "space-off-campus-students",
      error: "Space not found"
    });
  });

  it("logs info when member already joined", async () => {
    const joinSpace = vi
      .fn()
      .mockResolvedValueOnce(okResult())
      .mockResolvedValueOnce(errResult("Member already joined this space"));
    const service = new SpaceAutoJoinService({ joinSpace, logger });

    await service.assign({
      profileId: "profile-jacob",
      campusId: "ub-buffalo",
      defaultSpaces: defaultSpaces,
      cohortSpaces: []
    });

    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith("space.auto_join.already_member", {
      profileId: "profile-jacob",
      spaceId: "space-off-campus-students"
    });
  });
});
