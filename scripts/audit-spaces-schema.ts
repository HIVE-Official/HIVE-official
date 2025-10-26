#!/usr/bin/env node
// Bounded Context Owner: Community Guild
/**
 * Audits the current Spaces seed dataset and (optionally) a connected Firestore instance
 * to ensure every document matches the v1 schema contract.
 *
 * Usage:
 *   pnpm audit:spaces
 *
 * Provide Firebase credentials (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)
 * to audit live data. Without credentials, the script still validates the local seed fixtures.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { register, loadConfig } from "tsconfig-paths";
import type { Firestore } from "firebase-admin/firestore";

const configResult = loadConfig(resolve(process.cwd(), "apps/web/tsconfig.json"));
if (configResult.resultType === "failed") {
  throw new Error(`Failed to load tsconfig: ${configResult.message}`);
}
const { absoluteBaseUrl, paths = {} } = configResult;
register({
  baseUrl: absoluteBaseUrl,
  paths
});

const bootstrap = async () => {
  const [{ firebaseFirestore }, { seedSpaceSnapshots }, { seedSpacePostSnapshots }] =
    await Promise.all([
      import("../apps/web/src/server/firebase/admin"),
      import("../apps/web/src/server/spaces/fixtures"),
      import("../apps/web/src/server/spaces/post-fixtures")
    ]);
  await runAudit(firebaseFirestore, seedSpaceSnapshots, seedSpacePostSnapshots);
};

type Finding = {
  scope: "seed" | "firestore";
  spaceId: string;
  message: string;
};

const REQUIRED_SPACE_FIELDS = ["campusId", "name", "description", "type", "visibility"] as const;
const REQUIRED_POST_FIELDS = [
  "spaceId",
  "authorId",
  "authorHandle",
  "content",
  "createdAt",
  "updatedAt",
  "kind",
  "audience",
  "moderationStatus"
] as const;

async function auditSeedData(seedSpaceSnapshots: any[], seedSpacePostSnapshots: any[]): Promise<Finding[]> {
  const findings: Finding[] = [];

  for (const space of seedSpaceSnapshots) {
    for (const field of REQUIRED_SPACE_FIELDS) {
      if (!(field in space)) {
        findings.push({
          scope: "seed",
          spaceId: space.id,
          message: `Missing field '${field}' on seed snapshot`
        });
      }
    }

    const postingPolicy = space.settings?.postingPolicy;
    if (postingPolicy !== "members" && postingPolicy !== "leaders_only") {
      findings.push({
        scope: "seed",
        spaceId: space.id,
        message: "settings.postingPolicy must be 'members' or 'leaders_only'"
      });
    }

    const memberRoles = new Map<string, string>();
    for (const member of space.members) {
      if (!member.profileId) {
        findings.push({
          scope: "seed",
          spaceId: space.id,
          message: "Found member with empty profileId"
        });
        continue;
      }
      if (memberRoles.has(member.profileId)) {
        findings.push({
          scope: "seed",
          spaceId: space.id,
          message: `Duplicate member entry for profile '${member.profileId}'`
        });
      }
      memberRoles.set(member.profileId, member.role);
    }
    if (!memberRoles.has(space.leaderId)) {
      findings.push({
        scope: "seed",
        spaceId: space.id,
        message: "Leader is not present in members[] array"
      });
    }
  }

  for (const post of seedSpacePostSnapshots) {
    for (const field of REQUIRED_POST_FIELDS) {
      if (!(field in post)) {
        findings.push({
          scope: "seed",
          spaceId: post.spaceId,
          message: `Post '${post.id}' missing field '${field}'`
        });
      }
    }
    if (post.pinnedAt && post.pinExpiresAt && post.pinExpiresAt <= post.pinnedAt) {
      findings.push({
        scope: "seed",
        spaceId: post.spaceId,
        message: `Post '${post.id}' has pinExpiresAt <= pinnedAt`
      });
    }
  }

  return findings;
}

async function auditFirestore(firebaseFirestore: () => Firestore): Promise<Finding[]> {
  const findings: Finding[] = [];
  try {
    const db = firebaseFirestore();
    const spacesSnapshot = await db.collection("spaces").get();

    for (const doc of spacesSnapshot.docs) {
      const data = doc.data() ?? {};
      for (const field of REQUIRED_SPACE_FIELDS) {
        if (!(field in data)) {
          findings.push({
            scope: "firestore",
            spaceId: doc.id,
            message: `Missing field '${field}'`
          });
        }
      }

      if (!data.memberRoles || typeof data.memberRoles !== "object") {
        findings.push({
          scope: "firestore",
          spaceId: doc.id,
          message: "Missing memberRoles map required by security rules"
        });
      } else if (data.members) {
        for (const member of data.members as Array<{ profileId: string; role: string }>) {
          if (!data.memberRoles[member.profileId]) {
            findings.push({
              scope: "firestore",
              spaceId: doc.id,
              message: `memberRoles missing entry for '${member.profileId}'`
            });
          }
        }
      }

      const policy = data.settings?.postingPolicy;
      if (policy !== "members" && policy !== "leaders_only") {
        findings.push({
          scope: "firestore",
          spaceId: doc.id,
          message: "settings.postingPolicy missing or invalid"
        });
      }

      const posts = await db.collection("spaces").doc(doc.id).collection("posts").get();
      for (const postDoc of posts.docs) {
        const post = postDoc.data() ?? {};
        for (const field of REQUIRED_POST_FIELDS) {
          if (!(field in post)) {
            findings.push({
              scope: "firestore",
              spaceId: doc.id,
              message: `Post '${postDoc.id}' missing field '${field}'`
            });
          }
        }

        const pinnedAt = convertToDate(post.pinnedAt);
        const pinExpiresAt = convertToDate(post.pinExpiresAt);
        if (pinnedAt && pinExpiresAt && pinExpiresAt.getTime() <= pinnedAt.getTime()) {
          findings.push({
            scope: "firestore",
            spaceId: doc.id,
            message: `Post '${postDoc.id}' has pinExpiresAt <= pinnedAt`
          });
        }
      }
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn("⚠️  Firestore audit skipped:", reason);
  }
  return findings;
}

function convertToDate(input: unknown): Date | null {
  if (!input) return null;
  if (input instanceof Date) return input;
  if (typeof input === "object" && "toDate" in (input as any) && typeof (input as any).toDate === "function") {
    return (input as { toDate: () => Date }).toDate();
  }
  const parsed = new Date(input as string);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

async function runAudit(
  firebaseFirestore: () => FirebaseFirestore.Firestore,
  seedSpaceSnapshots: any[],
  seedSpacePostSnapshots: any[]
) {
  console.info("🔎 Auditing Spaces schema compliance…");

  const seedFindings = await auditSeedData(seedSpaceSnapshots, seedSpacePostSnapshots);
  const firestoreFindings = await auditFirestore(firebaseFirestore);
  const allFindings = [...seedFindings, ...firestoreFindings];

  if (allFindings.length === 0) {
    console.info("✅ No schema mismatches detected.");
    process.exit(0);
  }

  console.info(`⚠️  Found ${allFindings.length} schema issue(s):`);
  for (const finding of allFindings) {
    console.info(` - [${finding.scope}] ${finding.spaceId}: ${finding.message}`);
  }
  process.exitCode = 1;
}

bootstrap().catch((error) => {
  console.error("Audit failed:", error);
  process.exit(1);
});
