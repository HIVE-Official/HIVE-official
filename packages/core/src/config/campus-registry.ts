// Bounded Context Owner: Identity & Access Management Guild
import campusesJson from "../../../../config/campuses.json";

export interface CampusRecord {
  readonly campusId: string;
  readonly name: string;
  readonly emailDomains: readonly string[];
  readonly default?: boolean;
}

interface CampusRegistryData {
  readonly campuses: readonly CampusRecord[];
}

const data = campusesJson as CampusRegistryData;

const campusByDomain = new Map<string, CampusRecord>();
const campusById = new Map<string, CampusRecord>();

for (const campus of data.campuses) {
  campusById.set(campus.campusId, campus);
  for (const domain of campus.emailDomains) {
    campusByDomain.set(domain.toLowerCase(), campus);
  }
}

const defaultCampus =
  data.campuses.find((campus) => campus.default) ?? data.campuses[0] ?? null;

export const CampusRegistry = {
  list(): readonly CampusRecord[] {
    return data.campuses;
  },

  findByDomain(domain: string): CampusRecord | undefined {
    return campusByDomain.get(domain.toLowerCase());
  },

  findById(campusId: string): CampusRecord | undefined {
    return campusById.get(campusId);
  },

  getDefault(): CampusRecord {
    if (!defaultCampus) {
      throw new Error("No default campus configured");
    }

    return defaultCampus;
  }
};

export type CampusRegistryType = typeof CampusRegistry;
