#!/usr/bin/env ts-node
// Bounded Context Owner: Community Guild

import { firebaseFirestore } from "../apps/web/src/server/firebase/admin";
import { seedSpaceSnapshots } from "../apps/web/src/server/spaces/fixtures";
import { seedSpacePostSnapshots } from "../apps/web/src/server/spaces/post-fixtures";
import { seedSpaceEvents } from "../apps/web/src/server/spaces/event-fixtures";

async function seed() {
  const db = firebaseFirestore();
  console.info("Seeding spaces...");

  for (const space of seedSpaceSnapshots) {
    const memberRoles = space.members.reduce<Record<string, string>>((acc, member) => {
      acc[member.profileId] = member.role;
      return acc;
    }, {});

    await db.collection("spaces").doc(space.id).set({
      ...space,
      createdAt: space.createdAt,
      updatedAt: space.updatedAt,
      settings: {
        ...space.settings,
        postingPolicy: space.settings?.postingPolicy ?? "members"
      },
      memberRoles,
      members: space.members.map((member) => ({
        ...member,
        joinedAt: member.joinedAt
      }))
    });
  }

  console.info("Seeding posts...");
  for (const post of seedSpacePostSnapshots) {
    await db
      .collection("spaces")
      .doc(post.spaceId)
      .collection("posts")
      .doc(post.id)
      .set({
        ...post,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      });
  }

  console.info("Seeding events...");
  for (const event of seedSpaceEvents) {
    await db
      .collection("spaces")
      .doc(event.spaceId)
      .collection("events")
      .doc(event.id)
      .set({
        ...event,
        startAt: event.startAt,
        isDeleted: false
      });
  }

  console.info("Done.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed", error);
  process.exit(1);
});
