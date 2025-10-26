export interface SpaceSummaryFixture {
  id: string;
  name: string;
  description: string;
  campusId: string;
}

export const recommendedSpacesFixture: SpaceSummaryFixture[] = [
  {
    id: "space-build-lab",
    name: "Build Lab",
    description: "Ship experiments with other builders.",
    campusId: "ub-buffalo"
  },
  {
    id: "space-leadership",
    name: "Leadership Council",
    description: "Align campus leaders each week.",
    campusId: "ub-buffalo"
  },
  {
    id: "space-innovation-guild",
    name: "Innovation Guild",
    description: "Prototype campus experiences with peers.",
    campusId: "ub-buffalo"
  }
];

export const searchableSpacesFixture: SpaceSummaryFixture[] = [
  ...recommendedSpacesFixture,
  {
    id: "space-hivelab-ops",
    name: "HiveLAB Operations",
    description: "Coordinate pilots across campus.",
    campusId: "ub-buffalo"
  }
];
