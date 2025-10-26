// Bounded Context Owner: Community Guild
import {
  SpaceAggregate,
  type SpaceSnapshot
} from "@core";

const campusId = "ub-buffalo";

const createSpaceSnapshot = (input: {
  id: string;
  leaderId: string;
  name: string;
  description: string;
  type: "student_organization" | "university_organization" | "greek_life" | "residential";
  tags: readonly string[];
  settings?: { maxMembers?: number; postingPolicy?: "members" | "leaders_only"; joinPolicy?: "open" | "request" | "invite_only"; mediaApprovalPolicy?: "leaders_only" | "all" | "disabled" };
  additionalMembers?: readonly { profileId: string; role?: "admin" | "moderator" | "member" }[];
}): SpaceSnapshot => {
  const creation = SpaceAggregate.create({
    id: input.id,
    campusId,
    leaderId: input.leaderId,
    name: input.name,
    description: input.description,
    type: input.type,
    visibility: "campus",
    tags: input.tags,
    settings: input.settings ?? {}
  });

  if (!creation.ok) {
    throw new Error(`Failed to seed space: ${creation.error}`);
  }

  const aggregate = creation.value!;

  (input.additionalMembers ?? []).forEach((member) => {
    const result = aggregate.addMember(member.profileId, {
      campusId,
      role: member.role
    });
    if (!result.ok) {
      throw new Error(`Failed to seed member: ${result.error}`);
    }
  });

  aggregate.pullDomainEvents();
  return aggregate.toSnapshot();
};

export const seedSpaceSnapshots: readonly SpaceSnapshot[] = [
  createSpaceSnapshot({
    id: "space-robotics",
    leaderId: "profile-jwrhineh",
    name: "Robotics Guild",
    description: "Build autonomous bots, prep for competitions, and share hardware knowledge.",
    type: "student_organization",
    tags: ["engineering", "hardware", "ai"],
    settings: { maxMembers: 200 },
    additionalMembers: [
      { profileId: "profile-luca", role: "admin" },
      { profileId: "profile-nia" }
    ]
  }),
  createSpaceSnapshot({
    id: "space-panic-relief",
    leaderId: "profile-nia",
    name: "Panic Relief",
    description: "24/7 peer support hub for burnout, anxious nights, and accountability check-ins.",
    type: "university_organization",
    tags: ["wellness", "support", "late-night"],
    additionalMembers: [
      { profileId: "profile-jwrhineh" },
      { profileId: "profile-jordan" },
      { profileId: "profile-kai" }
    ]
  }),
  createSpaceSnapshot({
    id: "space-dorm-richmond",
    leaderId: "profile-jordan",
    name: "Richmond 7th Floor",
    description: "Our floor's shared calendar, rides, and late-night snack coordination.",
    type: "residential",
    tags: ["dorm", "coordination", "events"],
    settings: { maxMembers: 30, postingPolicy: "members", joinPolicy: "request" },
    additionalMembers: [
      { profileId: "profile-jwrhineh", role: "moderator" },
      { profileId: "profile-sam" },
      { profileId: "profile-lee" }
    ]
  }),
  createSpaceSnapshot({
    id: "space-phi-theta",
    leaderId: "profile-sam",
    name: "Phi Theta Chapter",
    description: "Coordinate philanthropy events, socials, and chapter operations.",
    type: "greek_life",
    tags: ["philanthropy", "social", "greek-life"],
    settings: { maxMembers: 120, postingPolicy: "leaders_only", joinPolicy: "request" },
    additionalMembers: [
      { profileId: "profile-lee", role: "admin" },
      { profileId: "profile-kai" }
    ]
  })
];
