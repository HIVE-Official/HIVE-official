// Bounded Context Owner: Identity & Access Management Guild
import { getAutoJoinCampusConfig } from "../../../data/auto-join";
import type { ProfileProps } from "../aggregates/profile.aggregate";
import type { SpaceAssignment } from "../events/profile-onboarded.event";

const FALLBACK_COMMUNITY_SPACES: readonly SpaceAssignment[] = [
  { id: "space-welcome", name: "Welcome to Hive" },
  { id: "space-new-students", name: "New Students Hub" },
  { id: "space-campus-updates", name: "Campus Updates" }
];

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatName = (template: string | undefined, major: string, year?: number) => {
  if (!template) {
    return year ? `${major} Class of ${year}` : `${major} Cohort`;
  }
  if (template.includes("{year}")) {
    if (year) {
      return template.replace("{year}", String(year));
    }
    return template
      .replace("Class of {year}", "Cohort")
      .replace("{year}", "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  return template;
};

export interface AutoJoinAssignments {
  readonly defaultSpaces: readonly SpaceAssignment[];
  readonly cohortSpaces: readonly SpaceAssignment[];
}

export const resolveAutoJoinAssignments = (props: ProfileProps): AutoJoinAssignments => {
  const config = getAutoJoinCampusConfig(props.campusId);
  const defaults = config?.defaults ?? FALLBACK_COMMUNITY_SPACES;
  const defaultAssignments = new Map<string, SpaceAssignment>();

  defaults.forEach((space) => {
    defaultAssignments.set(space.id, { id: space.id, name: space.name });
  });

  const residential = props.residentialSelection;
  if (residential?.spaceId) {
    const override = config?.residential?.[residential.spaceId];
    if (override) {
      defaultAssignments.set(override.id, { id: override.id, name: override.name });
    } else {
      defaultAssignments.set(residential.spaceId, {
        id: residential.spaceId,
        name: residential.name ?? residential.spaceId
      });
    }
  }

  const cohortAssignments: SpaceAssignment[] = [];
  const academic = props.academicInfo;
  if (academic?.majors && academic.majors.length > 0) {
    const seen = new Set<string>();
    academic.majors.forEach((major) => {
      const slug = slugify(major);
      const override = config?.cohorts?.[slug];
      const year = academic.graduationYear;
      let id: string;
      let name: string;

      if (override) {
        id = year ? `${override.prefix}-${year}` : override.prefix;
        name = formatName(override.nameTemplate, major, year);
      } else {
        const baseId = `cohort-${slug}`;
        id = year ? `${baseId}-${year}` : baseId;
        name = year ? `${major} Class of ${year}` : `${major} Cohort`;
      }

      if (!seen.has(id)) {
        seen.add(id);
        cohortAssignments.push({ id, name });
      }
    });
  }

  return {
    defaultSpaces: Array.from(defaultAssignments.values()),
    cohortSpaces: cohortAssignments
  };
};

export const fallbackCommunitySpaces = (): readonly SpaceAssignment[] => FALLBACK_COMMUNITY_SPACES;
