import type { InterestOption, MajorOption, ResidentialSpaceOption } from "@core";

export const majorsFixture: MajorOption[] = [
  { id: "cs", name: "Computer Science", college: "School of Engineering" },
  { id: "design", name: "Design", college: "College of Arts" },
  { id: "business", name: "Business Administration", college: "School of Management" }
];

export const interestsFixture: InterestOption[] = [
  { id: "build-products", label: "Building products", category: "Build" },
  { id: "campus-life", label: "Campus initiatives", category: "Community" },
  { id: "hackathons", label: "Hackathons", category: "Tech" },
  { id: "creator", label: "Creator economy", category: "Media" }
];

export const residentialSpacesFixture: ResidentialSpaceOption[] = [
  { id: "north-campus", spaceId: "north-campus", name: "North Campus", campusId: "ub-buffalo", cta: "Join cohort" },
  { id: "south-campus", spaceId: "south-campus", name: "South Campus", campusId: "ub-buffalo", cta: "Preview space" }
];

export const catalogFixture = {
  majors: majorsFixture,
  interests: interestsFixture,
  residentialSpaces: residentialSpacesFixture
};
