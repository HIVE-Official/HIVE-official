// Bounded Context Owner: Community Guild
// Centralized policy helpers for Spaces permissions.

import type { SpaceSnapshot } from "@core";
import { SPACE_ROLE_PERMISSIONS } from "./service";

export const getMembership = (space: SpaceSnapshot, profileId: string) =>
  space.members.find((m) => m.profileId === profileId) ?? null;

export const canPin = (space: SpaceSnapshot, profileId: string): boolean => {
  const membership = getMembership(space, profileId);
  return Boolean(membership && SPACE_ROLE_PERMISSIONS.canPin.has(membership.role));
};

export const canModerate = (space: SpaceSnapshot, profileId: string): boolean => {
  const membership = getMembership(space, profileId);
  return Boolean(membership && SPACE_ROLE_PERMISSIONS.canModerate.has(membership.role));
};

export const canUpdateRoles = canPin;

