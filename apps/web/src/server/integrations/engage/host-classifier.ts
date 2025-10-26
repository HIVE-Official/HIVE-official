// Bounded Context Owner: Community Guild
// Classify Engage host/org names and categories into HIVE SpaceType

import type { SpaceType } from "@core";

const CONTAINS_ANY = (s: string, words: readonly string[]) =>
  words.some((w) => s.includes(w));

import { KNOWN_GREEK_NAMES } from "./greek-names";

const GREEK_MARKERS = [
  "fraternity",
  "sorority",
  "greek",
] as const;

const RESIDENTIAL_MARKERS = [
  "hall council",
  "residence hall",
  "residential life",
  "residence life",
  "rha",
  "ra council",
  "dorm",
  "apartment"
] as const;

const UNIVERSITY_MARKERS = [
  "center",
  "office",
  "department",
  "division",
  "school of",
  "college of",
  "university",
  "career design center"
] as const;

export function classifySpaceTypeFromHost(hostName: string, categories: readonly string[] = []): SpaceType {
  const host = hostName.toLowerCase();
  const cats = categories.map((c) => c.toLowerCase());

  // Strong Greek signals
  const isKnownGreek = KNOWN_GREEK_NAMES.some((g) => host.includes(g));
  const hasGreekOrgWord = CONTAINS_ANY(host, [...GREEK_MARKERS, "nphc", "panhellenic", "inter-greek"]);
  const hasGreekLetters = /\b(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)\b/i.test(host);

  if (cats.includes("greek life") || isKnownGreek || hasGreekOrgWord || (hasGreekLetters && !/student\s+chapter/i.test(host))) {
    return "greek_life";
  }
  if (cats.includes("residential") || CONTAINS_ANY(host, RESIDENTIAL_MARKERS)) {
    return "residential";
  }
  if (cats.includes("university") || CONTAINS_ANY(host, UNIVERSITY_MARKERS)) {
    return "university_organization" as SpaceType;
  }
  return "student_organization" as SpaceType;
}

export function defaultJoinPolicyForType(type: SpaceType): "open" | "request" {
  if (type === "greek_life" || type === "residential") return "request";
  return "open";
}
