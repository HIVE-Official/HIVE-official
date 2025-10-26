// Bounded Context Owner: Identity & Access Management Guild
import ubBuffalo from "./ub-buffalo.json";

export interface AutoJoinSpaceConfig {
  readonly id: string;
  readonly name: string;
}

export interface AutoJoinCampusConfig {
  readonly campusId: string;
  readonly defaults: readonly AutoJoinSpaceConfig[];
  readonly residential?: Record<string, AutoJoinSpaceConfig>;
  readonly cohorts?: Record<
    string,
    {
      readonly prefix: string;
      readonly nameTemplate?: string;
    }
  >;
}

const configs = new Map<string, AutoJoinCampusConfig>(
  [[ubBuffalo.campusId, ubBuffalo as AutoJoinCampusConfig]]
);

export const getAutoJoinCampusConfig = (campusId: string): AutoJoinCampusConfig | undefined =>
  configs.get(campusId);
