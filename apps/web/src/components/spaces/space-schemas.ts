// Bounded Context Owner: Community Guild
import { z } from "zod";

export const SpaceMemberSchema = z.object({
  profileId: z.string(),
  role: z.string(),
  joinedAt: z.string(),
  presence: z
    .object({
      status: z.enum(["online", "recent", "offline"]).default("offline"),
      lastActive: z.string().default(new Date(0).toISOString())
    })
    .default({ status: "offline", lastActive: new Date(0).toISOString() })
});

export const SpaceDetailApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(""),
  type: z.string(),
  visibility: z.string(),
  tags: z.array(z.string()).default([]),
  leaderId: z.string(),
  memberCount: z.number().default(0),
  members: z.array(SpaceMemberSchema).default([]),
  membership: z
    .object({ role: z.string().nullable().default(null) })
    .nullable()
    .default(null),
  tagline: z.string().nullable().default(null),
  accentIcon: z.string().nullable().default(null),
  pattern: z.string().nullable().default(null),
  onlineNow: z.number().default(0),
  activityScore: z.number().default(0),
  urgency: z.string().default("low"),
  helperIds: z.array(z.string()).default([]),
  recentPosts: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        excerpt: z.string().default(""),
        timestamp: z.string()
      })
    )
    .default([]),
  upcomingEvents: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        startAt: z.string(),
        location: z.string(),
        description: z.string()
      })
    )
    .default([]),
  guidelines: z.array(z.string()).default([]),
  posts: z.array(z.unknown()).default([]),
  postingPolicy: z.string().optional(),
  shareToCampusAllowed: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const ClientSpaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(""),
  tags: z.array(z.string()).default([]),
  memberCount: z.number().default(0),
  membership: z
    .object({ role: z.string().nullable().default(null) })
    .nullable()
    .default(null),
  type: z.string().default(""),
  visibility: z.string().default(""),
  tagline: z.string().nullable().default(null),
  accentIcon: z.string().nullable().default(null),
  pattern: z.string().nullable().default(null),
  onlineNow: z.number().default(0),
  activityScore: z.number().default(0),
  urgency: z.string().default("low")
});

export const ClientSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().default(""),
  spaces: z.array(ClientSpaceSchema)
});

export const ClientFilterSchema = z.object({
  id: z.string(),
  label: z.string(),
  count: z.number().int().nonnegative()
});

export const CatalogPresentationSchema = z.object({
  joined: z.array(ClientSpaceSchema),
  discover: z.array(ClientSpaceSchema),
  recommended: z.array(ClientSpaceSchema),
  sections: z.array(ClientSectionSchema),
  filters: z.array(ClientFilterSchema)
});
